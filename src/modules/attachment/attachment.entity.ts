import { Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

import { Column } from 'typeorm/index';

@Entity()
export class Attachment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  path: string;

  @Column()
  mimetype: string;

  @Column()
  size: number;

  @CreateDateColumn()
  createdAt: string;
}
