import { BadRequestException } from '@nestjs/common';
import { Request } from 'express';

const SPREADSHEET_FORMATS = [
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];

const IMAGE_FORMATS = ['image/jpeg', 'image/png'];

export const ALLOWED_FORMATS = ['application/pdf', ...IMAGE_FORMATS, ...SPREADSHEET_FORMATS];

export const MAX_FILE_SIZE = 1024 * 1000; // 10mb

export const FILE_UPLOAD_PATH = './storage/files';
export const IMAGE_UPLOAD_PATH = './storage/images';
export const SPREADSHEET_UPLOAD_PATH = './storage/spreadsheet';

export const MULTER_UPLOAD_OPTIONS = {
  dest: FILE_UPLOAD_PATH,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
  fileFilter(
    req: Request,
    file: {
      fieldname: string;
      originalname: string;
      encoding: string;
      mimetype: string;
      size: number;
      destination: string;
      filename: string;
      path: string;
      buffer: Buffer;
    },
    callback: (error: Error | null, acceptFile: boolean) => void,
  ): void {
    if (!ALLOWED_FORMATS.includes(file.mimetype)) {
      callback(new BadRequestException('Invalid file type'), false);
    }

    callback(null, true);
  },
};

export const MULTER_UPLOAD_SPREADSHEET_OPTIONS = {
  ...MULTER_UPLOAD_OPTIONS,
  dest: SPREADSHEET_UPLOAD_PATH,
  fileFilter(
    req: Request,
    file: {
      fieldname: string;
      originalname: string;
      encoding: string;
      mimetype: string;
      size: number;
      destination: string;
      filename: string;
      path: string;
      buffer: Buffer;
    },
    callback: (error: Error | null, acceptFile: boolean) => void,
  ): void {
    if (!SPREADSHEET_FORMATS.includes(file.mimetype)) {
      callback(new BadRequestException('Invalid file type'), false);
    }

    callback(null, true);
  },
};

export const MULTER_UPLOAD_IMAGE_OPTIONS = {
  ...MULTER_UPLOAD_OPTIONS,
  dest: IMAGE_UPLOAD_PATH,
  fileFilter(
    req: Request,
    file: {
      fieldname: string;
      originalname: string;
      encoding: string;
      mimetype: string;
      size: number;
      destination: string;
      filename: string;
      path: string;
      buffer: Buffer;
    },
    callback: (error: Error | null, acceptFile: boolean) => void,
  ): void {
    if (!IMAGE_FORMATS.includes(file.mimetype)) {
      callback(new BadRequestException('Invalid file type'), false);
    }

    callback(null, true);
  },
};
