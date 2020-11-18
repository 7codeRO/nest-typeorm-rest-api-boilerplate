import { Injectable } from '@nestjs/common';

import { AttachmentInterface } from './attachment.interface';
import { FileType } from './attachment.dto';
import { AttachmentService } from './attachment.service';
import { Attachment } from './attachment.entity';

@Injectable()
export class AttachmentSpreadsheetService implements AttachmentInterface {
  constructor(private attachmentService: AttachmentService) {}

  async handleUpload(file: FileType): Promise<Attachment> {
    return this.attachmentService.create(file);
  }
}
