import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url="https://localhost:44306/api/";
  constructor(private http:HttpClient) {
   

   }

   login(){
     return this.http.get<any>("login").subscribe((data)=>{
       console.log(data);
     })
   }
}
