export enum RouteTypes {
  home = '/:suiteId?/:appId?/:context?/',
}

export interface HomeRouteParams {
  suiteId?: string;
  appId?: string;
  context?: string;
}
