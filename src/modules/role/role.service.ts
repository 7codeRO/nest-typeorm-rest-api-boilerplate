import { Injectable } from '@nestjs/common';

import { ROLES } from '../../shared/constants/constants';

@Injectable()
export class RoleService {
  getRoles(): string[] {
    return Object.values(ROLES);
  }
}
