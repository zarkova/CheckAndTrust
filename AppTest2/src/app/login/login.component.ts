import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';
import { AlertifyService } from '../_service/alertify.service';
import { Router } from '@angular/router';
// import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  // loginForm: FormGroup;

  url: string = "/assets/nelilogo3.png"

  constructor(public authService: AuthService, private alertify: AlertifyService,
    private router: Router){ }

  ngOnInit() {
    //  this.loginForm = new FormGroup({
    //    user: new FormControl('', Validators.required),
    //    password: new FormControl('', Validators.required)
    //  })
    
    
  }

  logIn(){
    this.authService.login(this.model).subscribe(next =>{
      this.alertify.success('Logged in successfuly');
    }, error =>{
      //console.log(error.message);
      this.alertify.error(error.message);
    }, () =>{
      this.router.navigate(['/account']);
    });
  }

  loggedIn(){
    // const token = localStorage.getItem('token');
    // return !!token;
    return this.authService.loggedIIn();
  }

  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.alertify.message('LOGOUT');
    this.router.navigate(['/home']);
  }
}
