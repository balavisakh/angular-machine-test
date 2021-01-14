import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  api_url = environment.api_url;
  constructor(private http: HttpClient) { }

  getAllUsers():Observable<any> {
    return this.http.get(this.api_url + '/users');
  }

  deleteUser(id:number):Observable<any> {
    return this.http.delete(this.api_url + `/users/${id}`);
  }

  getUserById(id:number):Observable<any> {
    return this.http.get(this.api_url + `/users/${id}`);
  }

  updateUserById(id,body):Observable<any>  {
    return this.http.put(this.api_url + `/users/${id}`,body);
  }

  getToDosById(id):Observable<any>  {
    return this.http.get(this.api_url + `/users/${id}/todos`);
  }
}
