import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as fs from 'fs';

import { AttachmentImageService } from './attachment-image.service';
import { AttachmentSpreadsheetService } from './attachment-spreadsheet.service';
import {
  MULTER_UPLOAD_IMAGE_OPTIONS,
  MULTER_UPLOAD_OPTIONS,
  MULTER_UPLOAD_SPREADSHEET_OPTIONS,
} from './attachment.constants';
import { AttachmentDto, FileType } from './attachment.dto';
import { Attachment } from './attachment.entity';
import { AttachmentService } from './attachment.service';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { FILE_IS_MISSING, SUCCESS } from '../../shared/constants/strings';
import { BasicResponseDTO, DefaultResponseDTO } from '../../shared/dto/default-response.dto';

@ApiTags('attachment')
@ApiBearerAuth()
@Controller('/attachments')
@UseGuards(JwtAuthGuard)
export class AttachmentController {
  constructor(
    private attachmentService: AttachmentService,
    private fileUploadSpreadsheetService: AttachmentSpreadsheetService,
    private fileUploadImageService: AttachmentImageService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', MULTER_UPLOAD_OPTIONS))
  @ApiOperation({ description: 'Upload file' })
  @ApiBody({ type: AttachmentDto })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'Success', type: BasicResponseDTO })
  @ApiResponse({ status: 400, description: 'Bad Request - File Too Large' })
  async uploadFile(@UploadedFile() file: FileType): Promise<DefaultResponseDTO<Attachment>> {
    if (!file) {
      throw new BadRequestException(FILE_IS_MISSING);
    }

    const attachment = await this.attachmentService.create(file);

    return {
      message: SUCCESS,
      data: attachment,
    };
  }

  @Post('spreadsheet')
  @UseInterceptors(FileInterceptor('file', MULTER_UPLOAD_SPREADSHEET_OPTIONS))
  @ApiOperation({ description: 'Upload file' })
  @ApiBody({ type: AttachmentDto })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'Success', type: BasicResponseDTO })
  @ApiResponse({ status: 400, description: 'Bad Request - File Too Large' })
  async uploadSpreadsheet(@UploadedFile() file: FileType): Promise<DefaultResponseDTO<Attachment>> {
    if (!file) {
      throw new BadRequestException(FILE_IS_MISSING);
    }

    const attachment = await this.fileUploadImageService.handleUpload(file);

    return {
      message: SUCCESS,
      data: attachment,
    };
  }

  @Post('image')
  @UseInterceptors(FileInterceptor('file', MULTER_UPLOAD_IMAGE_OPTIONS))
  @ApiOperation({ description: 'Upload file' })
  @ApiBody({ type: AttachmentDto })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'Success', type: BasicResponseDTO })
  @ApiResponse({ status: 400, description: 'Bad Request - File Too Large' })
  async uploadImage(@UploadedFile() file: FileType): Promise<DefaultResponseDTO<Attachment>> {
    if (!file) {
      throw new BadRequestException(FILE_IS_MISSING);
    }

    const attachment = await this.fileUploadImageService.handleUpload(file);

    return {
      message: SUCCESS,
      data: attachment,
    };
  }

  @Get(':id')
  @ApiOperation({ description: 'Get file' })
  @ApiResponse({ status: 201, description: 'Success', type: BasicResponseDTO })
  @ApiResponse({ status: 404, description: 'Not found - Attachment not found' })
  async getFile(@Param('id', ParseIntPipe) id: number): Promise<DefaultResponseDTO<Attachment>> {
    const attachment = await this.attachmentService.findById(id);

    return {
      message: SUCCESS,
      data: attachment,
    };
  }

  @Get(':id/image')
  @ApiOperation({ description: 'Serve image' })
  @ApiOkResponse({ description: 'Success' })
  @ApiResponse({ status: 404, description: 'Not found - Attachment not found' })
  async serveImage(@Res() res: Response, @Param('id', ParseIntPipe) id: number): Promise<void> {
    const attachment = await this.attachmentService.findById(id);

    res.setHeader('Content-Type', attachment.mimetype);

    return res.sendFile(attachment.path, { root: './' });
  }

  @Get(':id/b64')
  @ApiOperation({ description: 'Serve image' })
  @ApiOkResponse({ description: 'Success' })
  @ApiResponse({ status: 404, description: 'Not found - Attachment not found' })
  async serveBase64(@Res() res: Response, @Param('id', ParseIntPipe) id: number): Promise<void> {
    const attachment = await this.attachmentService.findById(id);
    const contents = fs.readFileSync(attachment.path, { encoding: 'base64' });
    res.send(contents);
  }

  @Get(':id/spreadsheet')
  @ApiOperation({ description: 'Serve spreadsheet' })
  @ApiOkResponse({ description: 'Success' })
  @ApiResponse({ status: 404, description: 'Not found - Attachment not found' })
  async serveSpreadsheet(@Res() res: Response, @Param('id', ParseIntPipe) id: number): Promise<void> {
    const attachment = await this.attachmentService.findById(id);

    res.setHeader('Content-Type', attachment.mimetype);
    res.setHeader('Content-Disposition', `attachment; filename="${attachment.name}"`);

    res.sendFile(attachment.path, { root: './' });
  }

  @Delete(':id')
  @ApiOperation({ description: 'Delete file' })
  @ApiResponse({ status: 201, description: 'Success', type: BasicResponseDTO })
  @ApiResponse({ status: 404, description: 'Not found - Attachment not found' })
  async deleteFile(@Param('id', ParseIntPipe) id: number): Promise<BasicResponseDTO> {
    await this.attachmentService.delete(id);

    return {
      message: SUCCESS,
    };
  }
}
