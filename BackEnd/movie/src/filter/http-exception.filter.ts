import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { ApiException } from '../exception/api.exception.js';

@Catch(HttpException, QueryFailedError)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException | QueryFailedError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    // 1. DB UNIQUE 제약 위반 등 DB 오류 처리
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

    // 2. 일반 HTTP 예외 처리
    const status = exception.getStatus();
    const body = exception.getResponse();

    const message =
      typeof body === 'string'
        ? body
        : (body as { message?: string | string[] }).message;

    // 3. ApiException이면 커스텀 코드 사용
    const code =
      exception instanceof ApiException ? exception.code : 'COMMON' + status;

    response.status(status).json({
      isSuccess: false,
      code,
      message: Array.isArray(message)
        ? message[0]
        : (message ?? exception.message),
      result: null,
    });
  }
}
