import { IsMimeType } from 'class-validator';

import { Attachment } from './attachment.entity';

export class AttachmentDto {
  @IsMimeType()
  file: BinaryType;
}

export class FileType {
  fieldname: string;

  originalname: string;

  encoding: string;

  mimetype: string;

  destination: string;

  filename: string;

  path: string;

  size: number;
}

export class AttachmentB64Dto extends Attachment {
  base64: string;
}
