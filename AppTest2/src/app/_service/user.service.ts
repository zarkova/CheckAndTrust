import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = "https://localhost:44341/api/Employee/";


constructor(private http: HttpClient) { }

changePassword(info)
{
  return this.http.put(this.baseUrl + 'UpdateEmployeePassword', info);
}


}
