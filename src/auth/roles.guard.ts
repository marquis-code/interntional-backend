import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY, PERMISSIONS_KEY } from './decorators';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Check roles
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Check permissions
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If neither roles nor permissions are set, allow access
    if (!requiredRoles && !requiredPermissions) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('No user found in request');
    }

    // SUPER_ADMIN bypasses all checks
    if (user.role === 'SUPER_ADMIN') {
      return true;
    }

    // Check roles if specified
    if (requiredRoles && requiredRoles.length > 0) {
      const hasRole = requiredRoles.includes(user.role);
      if (!hasRole) {
        throw new ForbiddenException(`Requires one of roles: ${requiredRoles.join(', ')}`);
      }
    }

    // Check permissions if specified
    if (requiredPermissions && requiredPermissions.length > 0) {
      const userPermissions: string[] = user.permissions || [];
      const hasPermission = requiredPermissions.some((p) => userPermissions.includes(p));
      if (!hasPermission) {
        throw new ForbiddenException(`Requires one of permissions: ${requiredPermissions.join(', ')}`);
      }
    }

    return true;
  }
}
