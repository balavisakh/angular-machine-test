import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }
  @Input() selectedRows: [];
  editedData = [];
  ngOnInit(): void {
  }

  deleteUser(id) {
    this.userService.deleteUser(id).subscribe(()=>{
      this.userService.getSubscribedUsers().splice(this.userService.getSubscribedUsers().findIndex((user:any)=>
    user.id === id),1);
    console.log(this.userService.getSubscribedUsers(),"hhhhhhhhh");
      console.log(`user ${id} deleted`);
    // console.log(this.selectedRows,"rows")
      // console.log("idd" ,this.selectedRows.findIndex((user:any)=> user.id === id));
      // this.selectedRows.splice(this.selectedRows.findIndex((user:any)=> user.id === id),1);
    });
  }

  editUser(id) {
    this.router.navigate(['edit-user',id])
  }

  viewTodos(id) {
    this.router.navigate(['view-todos',id]);
  }

}
