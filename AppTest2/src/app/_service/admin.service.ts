import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl = "https://localhost:44341/api/Employee/";

constructor(private http: HttpClient) { }

getUsersWithRole()
{
  return this.http.get(this.baseUrl + 'GetAllEmployees');
}

deleteEmployeeById(id)
{
  return this.http.delete(this.baseUrl + 'DeleteEmployee?id=' + id);
}

updateEmployee(employee){
  return this.http.put(this.baseUrl + 'UpdateEmployee', employee);
}

addEmployee(employee)
{
  return this.http.post(this.baseUrl + 'CreateEmployee', employee);
}
}
