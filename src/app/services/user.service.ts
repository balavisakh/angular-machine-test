import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  api_url = environment.api_url;
  editedUser = [];
  userDetailsArray:any = [];
  constructor(private http: HttpClient) {}
  subject =  new Subject<any>();
  
  sendUserDetails() {
    this.subject.next("hai");
}
  
  // getAllUsers():Observable<any> {
  //   return this.http.get(this.api_url + '/users');
  // }

  getAllUsersAsShareData(){
    return this.http.get(this.api_url + '/users').pipe(map((userDetails) =>{
      this.userDetailsArray = userDetails;
      return this.userDetailsArray;
    }))
  }

  getSubscribedUsers() {
    // console.log(this.userDetailsArray,"subs");
    return this.userDetailsArray;
    
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

  addUser(body):Observable<any> {
    return this.http.post(this.api_url + `/users`,body);
  }

  sendEditedUser(editedValues) {
    // this.editedUser = editedValues;
    if(editedValues.id){
      this.userDetailsArray = this.userDetailsArray.map((userDetails:any) =>{
        if(userDetails.id === editedValues.id){
          userDetails.email = editedValues.userEmail;
            userDetails.website=editedValues.userWebsite;
            userDetails['company']['name']=editedValues.userCompany;
            // userDetails.name=editedValues.userName;
            userDetails.username=editedValues.userName;
          };
          return userDetails;
      })
    }
    console.log(this.editedUser,"edit_service_data");
    // if(this.editedUser["isChecked"]=== true){
    //   this.editedUser = editedValues;
    // }
    // else {
    //   this.editedUser.splice(this.editedUser.indexOf(editedValues),1);
    // }
  }

  getEditedUser() {
    return this.editedUser;
  }
}
