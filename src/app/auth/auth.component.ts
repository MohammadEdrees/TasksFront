import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { loginModel } from '../Models/loginModel';
import { userModel } from '../Models/userModel';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  loginModel!: loginModel;
  userModel = new userModel();
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  async onSubmit() {
    this.loginModel = new loginModel();
    this.loginModel.email = this.loginForm.controls['email'].value;
    this.loginModel.password = this.loginForm.controls['password'].value;

    await this.auth.loginApi(this.loginModel)
    .subscribe((user: any) => {

      this.userModel.id = user.id;
      this.userModel.userName = user.userName;
      this.userModel.token = user.token;
      this.userModel.type = user.type;

      localStorage.setItem('userType', user.type);
      localStorage.setItem('userId', user.id);
      localStorage.setItem('token', user.token);
       
      if (this.userModel.token)
       {
        this.router.navigate(['home']);
       } else
       {
        alert('check internet or tey again');
       }
    });
  }
}
