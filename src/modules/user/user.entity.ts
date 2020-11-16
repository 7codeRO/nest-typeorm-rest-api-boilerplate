import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';

import { ROLES } from '../../shared/constants/constants';
import { Exclude } from 'class-transformer';
import crypto from 'crypto';
import { BeforeInsert, BeforeUpdate } from 'typeorm/index';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  email: string;

  @Exclude()
  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  name: string;

  @Column({ enum: ROLES, nullable: false })
  role: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword(): void {
    if (this.password) {
      this.password = crypto.createHmac('sha256', this.password).digest('hex');
    }
  }
}
