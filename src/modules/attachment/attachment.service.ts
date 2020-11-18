import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';

import { FileType } from './attachment.dto';
import { Attachment } from './attachment.entity';
import { AttachmentRepository } from './attachment.repository';
import { MyLogger } from '../logger/logger.service';
import { ATTACHMENT_NOT_FOUND } from '../../shared/constants/strings';

@Injectable()
export class AttachmentService {
  constructor(private attachmentRepository: AttachmentRepository, private logger: MyLogger) {
    this.logger.setContext('LoggerService');
  }

  async findById(id: number): Promise<Attachment> {
    const attachment = await this.attachmentRepository.findOne(id);

    if (!attachment) {
      throw new NotFoundException(ATTACHMENT_NOT_FOUND);
    }

    return attachment;
  }

  create(file: FileType): Promise<Attachment> {
    const insert = {
      ...file,
      name: file.originalname,
    };
    return this.attachmentRepository.save(insert);
  }

  async delete(id: number): Promise<boolean> {
    const attachment = await this.attachmentRepository.findOne(id);
    if (!attachment) {
      throw new NotFoundException(ATTACHMENT_NOT_FOUND);
    }

    try {
      this.attachmentRepository.delete(id);
      fs.unlinkSync(attachment.path);
      return true;
    } catch (e) {
      this.logger.error(e);
      return false;
    }
  }
}
