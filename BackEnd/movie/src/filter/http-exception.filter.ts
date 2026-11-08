import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(HttpException, QueryFailedError)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException | QueryFailedError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    // DB UNIQUE 제약 위반(동시 요청 등)은 마지막 안전망으로 409 처리
    if (exception instanceof QueryFailedError) {
      const code = (exception as { driverError?: { code?: string } })
        .driverError?.code;
      if (code === 'ER_DUP_ENTRY') {
        response.status(HttpStatus.CONFLICT).json({
          isSuccess: false,
          code: 'COMMON409',
          message: '이미 존재하는 데이터입니다.',
          result: null,
        });
        return;
      }
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        isSuccess: false,
        code: 'COMMON500',
        message: '서버 오류가 발생했습니다.',
        result: null,
      });
      return;
    }

    const status = exception.getStatus();
    const body = exception.getResponse();
    const message =
      typeof body === 'string'
        ? body
        : (body as { message: string | string[] }).message;

    response.status(status).json({
      isSuccess: false,
      code: 'COMMON' + status,
      message: Array.isArray(message) ? message[0] : message,
      result: null,
    });
  }
}
