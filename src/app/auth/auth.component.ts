import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { loginModel } from '../Models/loginModel';
import { userModel } from '../Models/userModel';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  loginModel = new loginModel() ;
  userModel = new userModel();
  constructor(private auth: AuthService) {}

  ngOnInit(): void {}
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  onSubmit() {
     debugger;
     this.loginModel.email = this.loginForm.controls['email'].value;
     this.loginModel.password = this.loginForm.controls['password'].value;
     this.userModel = this.auth.login(this.loginModel);
     console.warn(this.userModel);
  }
}
