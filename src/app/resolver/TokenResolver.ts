import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { CognitoService } from '../service/CognitoService';
@Injectable()
export class TokenResolver implements Resolve<any>{
    constructor(private cognitoService: CognitoService, private location: Location,
        private router: Router){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        const urlParams: URLSearchParams = new URLSearchParams(window.location.search)
        const code: string = urlParams.get('code');
        if(!code){
            return of(null)
        }
        return this.getTokenFromCognito(code).pipe(
            finalize(() => {
                this.location.replaceState(window.location.pathname);
            })
        );
    }

    getTokenFromCognito(code: string): Observable<any>{
        return this.cognitoService.exchangeCodeWithToken(code).pipe(
            switchMap((response: any) => {
                console.log("Response :", response)
                localStorage.setItem('token', response.id_token);

                if(response){
                    this.router.navigate(["dashboard"])
                }
                return of(response)
            })
        )

        // this.cognitoService.exchangeCodeWithToken(code)
    }
}
