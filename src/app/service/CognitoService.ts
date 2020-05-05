import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class CognitoService {
    constructor(private http: HttpClient) { }
    exchangeCodeWithToken(code_callback: string): Observable<any> {
        const details = {
            grant_type: 'authorization_code',
            code: code_callback,
            scope: 'openid+profile',
            redirect_uri: environment.redirectURL
        }

        const formBody = Object.keys(details)
            .map((key: string) => {
                `${encodeURIComponent(key)}=${encodeURIComponent(details[key])}`
            })
            .join('&')
        return this.http.post<any>(environment.cognitoTokenURL, formBody, {
            responseType: 'json',
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Basic ' + btoa(`${environment.client_id}:${environment.client_secret}`)
            })
        })
      
    }
}



  // const details = {
        //     grant_type: 'authorization_code',
        //     code: code_callback,
        //     scope: 'openid+profile',
        //     redirect_uri: environment.redirectURL
        //   };
        //   const formBody = Object.keys(details)
        //                          .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(details[key])}`)
        //                          .join('&');
      
        //   return this.http.post<any>(environment.cognitoTokenURL,
        //     formBody, {
        //       responseType: 'json',
        //       headers: new HttpHeaders({
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //         Authorization: 'Basic ' + btoa(`${environment.client_id}:${environment.client_secret}`)
        //         })
        //       });