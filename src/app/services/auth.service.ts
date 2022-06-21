import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loginModel } from '../Models/loginModel';
import { userModel } from '../Models/userModel';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
 @Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  loginModel!:loginModel;
  //#region Constructor
  constructor(private http:HttpClient) {
  }
  //#endregion
  //#region Login
  loginApi(model:loginModel):Observable<any>{
    const formData = new FormData();
     formData.append('email',model.email);
     formData.append('password',model.password);
    return  this.http.post<any>(environment.url+ "Auth/login", formData)
  }
 
   //#endregion
}
