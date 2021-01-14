import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-or-edit',
  templateUrl: './add-or-edit.component.html',
  styleUrls: ['./add-or-edit.component.css']
})
export class AddOrEditComponent implements OnInit {
  urlId:any;
  userDetails:any;

  userId = new FormControl('', [Validators.required])
  userName = new FormControl('', [Validators.required])
  userEmail = new FormControl('', [Validators.required, Validators.email])
  userWebsite = new FormControl('', [Validators.required])
  userCompany = new FormControl('', [Validators.required])
  country = new FormControl('', [Validators.required])
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private fb:FormBuilder, private router: Router) { }

  userFormGroup = this.fb.group({
    userId: this.userId,
    userName: this.userName,
    userEmail: this.userEmail,
    userWebsite: this.userWebsite,
    userCompany: this.userCompany
  })
  ngOnInit(): void {
    this.getUrlId();
    this.getUserByUrlId();
  }

  getUrlId() {
    this.activatedRoute.params.subscribe((urlId)=>{
      this.urlId = urlId.id;
      console.log(this.urlId,"urlId");
    });
  }

  getUserByUrlId() {
    this.userService.getUserById(this.urlId).subscribe((user)=>{
      this.userDetails = user;
      this.userFormGroup.patchValue({
        userId: this.userDetails.id,
        userName: this.userDetails.username,
        userEmail: this.userDetails.email,
        userWebsite: this.userDetails.website,
        userCompany: this.userDetails.company.name
      })
      console.log(user,"userById")
    });
  }

  getErrorUserId() {
    if(this.userId.hasError('required')) {
      return 'Enter User Id'
    }
  }

  getErrorUserName() {
    if(this.userName.hasError('required')) {
      return 'Enter User Name'
    }
  }

  getErrorUserEmail() {
    if(this.userEmail.hasError('required')) {
      return 'Enter User email'
    }
    return 'Enter valid email'
  }

  getErrorUserWebsite() {
    if(this.userId.hasError('required')) {
      return 'Enter User website'
    }
  }

    getErrorUserCompany() {
      if(this.userId.hasError('required')) {
        return 'Enter User Company'
      }
  }

  userUpdate() {
    if(this.userFormGroup.valid) {
      const body = this.userFormGroup.value;
      this.userService.updateUserById(this.urlId,body).subscribe(()=>{
        this.router.navigate(['']);
        console.log(`user updated`);
      })
    }
    else {
      this.userFormGroup.markAllAsTouched();
      return;
    }
    
  }

}
