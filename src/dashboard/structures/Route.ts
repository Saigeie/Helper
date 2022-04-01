import { RouteType } from "../types/RouteTypes";

export class Route {
  constructor(routeOptions: RouteType) {
    Object.assign(this, routeOptions);
  }
}
