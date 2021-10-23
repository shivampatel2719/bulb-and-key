import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map,tap } from "rxjs/operators";
import { ReviewPageServices } from "./review-page.service";

@Injectable({providedIn: 'root'})
export class AuthGaurd implements CanActivate {
    constructor(
        private reviewpageServices : ReviewPageServices,
        private router: Router) {
    }
    
    canActivate(route : ActivatedRouteSnapshot,router: RouterStateSnapshot) : boolean | 
    Promise<boolean | UrlTree> | Observable<boolean | UrlTree>{
        
        return this.reviewpageServices.selectedImage.pipe(map(image => {
            const isAuth = !!image;
            if(isAuth) {
                return isAuth;
            }
            else {
                return this.router.createUrlTree(['/review-page']);
            }
        }));
    }
}