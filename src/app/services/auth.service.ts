import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loginModel } from '../Models/loginModel';
import { userModel } from '../Models/userModel';
import { environment } from 'src/environments/environment';
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
   login(model:loginModel){
     const formData = new FormData();
     const userData = new userModel();
     
     debugger;
     formData.append('email',model.email);
     formData.append('password',model.password);
     this.http.post<userModel>(environment.url+ "Auth/login", formData)
     .subscribe((user: userModel) => {
       console.log(user);
       userData.id=user.id;
       userData.userName=user.userName;
       userData.token=user.token;
       userData.type=user.type;
      }) as unknown as userModel
    return userData;
  }
   //#endregion
}
