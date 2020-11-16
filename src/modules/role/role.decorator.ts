import { SetMetadata } from '@nestjs/common';
import { CustomDecorator } from '@nestjs/common/decorators/core/set-metadata.decorator';

export const HasRole = (...roles: string[]): CustomDecorator => SetMetadata('roles', roles);
