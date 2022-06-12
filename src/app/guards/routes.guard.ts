import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutesGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot) {
    const PRODUCT_ID = parseInt(route.queryParams['id'], 0);
    let prdouctHasId = true;
    prdouctHasId = PRODUCT_ID ? true : false;
    return prdouctHasId;
  }
}
