import { Response } from "express";

interface ResponseOptions<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;
  meta?: Record<string, unknown>;
}

export const sendResponse = <T>(res: Response, options: ResponseOptions<T>) => {
  const { statusCode, success, message, data, meta } = options;

  return res.status(statusCode).json({
    success,
    message,
    data,
    meta,
  });
};
