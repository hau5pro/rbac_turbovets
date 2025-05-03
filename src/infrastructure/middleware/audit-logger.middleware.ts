// src/middleware/audit-logger.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';

import { RequestWithUser } from '../interfaces';

@Injectable()
export class AuditLoggerMiddleware implements NestMiddleware {
  use(req: RequestWithUser, _: Response, next: NextFunction) {
    const user = req.user;
    console.log({
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.originalUrl,
      user: user?.id ?? 'Unauthenticated',
      body: req.body,
      query: req.query,
    });

    next();
  }
}
