import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoggedInOutService {

  baseUrl = "https://localhost:44341/api/Login/";

constructor(private http: HttpClient) { }

getAllAtWork(){
  return this.http.get(this.baseUrl + 'GetAllAtWork');

}

getByIdAtWork(id){
  return this.http.get(this.baseUrl + 'GetAtWorkByEmployeeId?id=' + id);
}

loginAtWork(){
  return this.http.put(this.baseUrl + 'LoginAtWork', null);
}

logoutFromWork()
{
  return this.http.put(this.baseUrl + 'LogoutFromWork', null);
}

getUserHistory(id){
  return this.http.get(this.baseUrl + 'GetLoginHistoryByEmployeeId?id=' + id);
}

getAllHustory(){
  return this.http.get(this.baseUrl + 'GetLoginHistory');
}
}
