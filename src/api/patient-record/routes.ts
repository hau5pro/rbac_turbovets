import { Routes } from 'src/infrastructure/interfaces';

export class PatientRecordRoutes extends Routes {
  static rootRoute = 'records';

  static create = 'create';
  static get = 'get';
  static update = 'update';
  static delete = 'delete';

  static getFullRoute(route: string): string {
    return `/${PatientRecordRoutes.rootRoute}/${route}`;
  }
}
