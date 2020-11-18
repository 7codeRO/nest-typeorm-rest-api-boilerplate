import { Module } from '@nestjs/common';

import { AttachmentController } from './attachment.controller';
import { AttachmentSpreadsheetService } from './attachment-spreadsheet.service';
import { AttachmentImageService } from './attachment-image.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attachment } from './attachment.entity';
import { AttachmentService } from './attachment.service';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([Attachment]), LoggerModule],
  controllers: [AttachmentController],
  providers: [AttachmentService, AttachmentSpreadsheetService, AttachmentImageService],
  exports: [AttachmentService],
})
export class AttachmentModule {}
