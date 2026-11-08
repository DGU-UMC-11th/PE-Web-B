import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import type { Response } from "express";
import { QueryFailedError } from "typeorm";

@Catch(HttpException, QueryFailedError)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException | QueryFailedError, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse<Response>();

        // DB UNIQUE 위반(MySQL ER_DUP_ENTRY)도 같은 형식의 409로 변환
        if (exception instanceof QueryFailedError) {
            const driverError = exception.driverError as { code?: string };
            if (driverError?.code !== "ER_DUP_ENTRY") throw exception;
            response.status(HttpStatus.CONFLICT).json({
                isSuccess: false,
                code: "COMMON4091",
                message: "이미 존재하는 데이터입니다.",
                result: null,
            });
            return;
        }

        const status = exception.getStatus();
        const body = exception.getResponse();
        const obj = typeof body === "string" ? { message: body } : (body as { message: string | string[]; code?: string });

        response.status(status).json({
            isSuccess: false,
            code: obj.code ?? "COMMON" + status, // 서비스가 지정한 code 우선
            message: Array.isArray(obj.message) ? obj.message[0] : obj.message,
            result: null,
        });
    }
}
