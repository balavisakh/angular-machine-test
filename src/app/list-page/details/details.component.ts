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
    this.getEditedData();
  }

  deleteUser(id) {
    this.userService.deleteUser(id).subscribe(()=>{
      
      // console.log("idd" ,this.selectedRows.findIndex((user:any)=> user.id === id));
      this.selectedRows.splice(this.selectedRows.findIndex((user:any)=> user.id === id),1);
      alert(`user ${id} deleted`);
      console.log(`user ${id} deleted`);
    });
  }

  editUser(id) {
    this.router.navigate(['edit-user',id])
  }

  viewTodos(id) {
    this.router.navigate(['view-todos',id]);
  }

  getEditedData() {
    setTimeout(() => {
      this.editedData = this.userService.getEditedUser();
    console.log(this.editedData,"editedData");
    }, 2000);
  }

}
