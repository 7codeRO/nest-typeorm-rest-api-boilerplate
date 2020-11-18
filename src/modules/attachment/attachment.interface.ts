import { FileType } from './attachment.dto';

export interface AttachmentInterface {
  handleUpload(file: FileType): void;
}
