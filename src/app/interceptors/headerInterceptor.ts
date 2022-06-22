import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor,HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable() 
export class HeadersInterceptor implements HttpInterceptor{
    token:any;
    
    constructor(){
        this.token = localStorage.getItem('token');
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
         if(this.token){
            const myReq=req.clone(
                {
    
                    headers:req.headers.set("Authorization","Bearer "+this.token)
                }
             );
             console.log(myReq)
              return next.handle(myReq);
         }else{
            return next.handle(req);
         }
       
    }



}
