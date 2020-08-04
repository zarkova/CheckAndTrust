import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

constructor(private http: HttpClient) { }

baseUrl = "https://localhost:44341/api/Role/";

getAllRoles(){
  return this.http.get(this.baseUrl + 'GetAll');
}

addRole(role){
  return this.http.post(this.baseUrl + 'AddRole?roleDescription=' + role.roleDescription, null);
}

}
