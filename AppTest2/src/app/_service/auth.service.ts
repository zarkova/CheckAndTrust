import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = "https://localhost:44341/api/Employee/";
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  user: any;

constructor(private http: HttpClient) { }

login(model: any){
  return this.http.post(this.baseUrl + 'Authenticate', model)
    .pipe(
      map((response: any) =>{
        this.user = response;
        if(this.user){
          localStorage.setItem('user', JSON.stringify(this.user));
          localStorage.setItem('token', this.user.token);
          this.decodedToken = this.jwtHelper.decodeToken(this.user.token);
          //console.log(this.decodedToken);
          console.log(this.user.firstName, this.user.lastName, this.user.role.roleDescription);
        }
      })
    )
}

loggedIIn(){

  // const obj = localStorage.getItem('user');
  // const user=JSON.parse(obj);
  // console.log(user.firstName); ако ми се наложи от някъде другаде да си взема user

  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}

roleMatch(allowedRoles): boolean{
  let isMatch = false;
  const userRoles = this.decodedToken.role as Array<string>
  allowedRoles.forEach(element => {
    if(userRoles.includes(element)){
      isMatch = true;
      return;
    }
  });

  return isMatch;
}

//Better spored Koko
getUserFromToken() {
  //const token = localStorage.getItem('token');
  //const decodedToken = this.jwtHelper.decodeToken(token);
  return this.decodedToken;
}

getUserFromLocalStorage = () => localStorage.getItem('user');
}


