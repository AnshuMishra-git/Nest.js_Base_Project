import { HttpStatus } from '@nestjs/common';

export class ResponseHelper {
  static success(data: any, message: string = 'Success', statusCode: HttpStatus = HttpStatus.OK) {
    return {
      status: 'success',
      message,
      data,
      statusCode
    };
  }

  static error(message: string = 'Internal Server Error', statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,) {
    return {
      status: 'error',
      message,
      statusCode,
    };
  }

  static failure(message: string = 'Failure', statusCode: HttpStatus = HttpStatus.BAD_REQUEST) {
    return {
      status: 'failure',
      message,
      statusCode,
    };
  }
}
