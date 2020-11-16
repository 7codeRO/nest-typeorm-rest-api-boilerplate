import { HttpStatus, Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request, Response } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class ApiService {
  /**
   *
   * @param req
   */
  constructor(@Inject(REQUEST) private readonly req: Request) {}

  /**
   *
   * @param {e.Response} res
   * @param {number} affected
   * @returns {e.Response<{status: string}>}
   */
  handleRes(res: Response, affected: number): Response<{ status: string }> {
    if (affected === 0) {
      return res.status(HttpStatus.NOT_FOUND).json({
        status: 'error',
        error: 'Item not found',
      });
    }

    return res.status(HttpStatus.OK).json({ status: 'success' });
  }
}
