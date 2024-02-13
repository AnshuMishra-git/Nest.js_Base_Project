import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus(): {status: string, code: number} {
    return {"status":"ok", code :200};
  }
}
