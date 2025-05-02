export abstract class Routes {
  static rootRoute: string;
  static getFullRoute(route: string): string {
    return `${Routes.rootRoute}/${route}`;
  }
}
