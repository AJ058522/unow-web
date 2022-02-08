import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserPermissionsService {

  permissions: Array<any> = [
    {
      role_id: 1,
      permissions: [
        'config.list',
        'users.list',
        'franchises.list',
        'franchises.store',
        'franchises.update',
        'franchises.destroy',
        'packages.list',
        'services.list',
        'schedules.list',
        'vehicle-type.list'
      ]
    },
    {
      role_id: 2,
      permissions: [
        'franchises.list',
        'franchises-packages.list',
        'orders.list',
      ]
    },
    {
      role_id: 3,
      permissions: [
        'users.list',
        'franchises-packages.list',
        'orders.list',
        'schedules.list',
      ]
    },
    {
      role_id: 4,
      permissions: []
    }
  ];

  constructor() { }

  getUserPermissions(roleId: number) {
    const result = this.permissions.find(permission => permission.role_id === roleId);
    return result;
  }
}
