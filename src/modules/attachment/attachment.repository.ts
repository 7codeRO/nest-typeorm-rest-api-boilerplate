import { EntityRepository, Repository } from 'typeorm';

import { Attachment } from './attachment.entity';

@EntityRepository(Attachment)
export class AttachmentRepository extends Repository<Attachment> {}
