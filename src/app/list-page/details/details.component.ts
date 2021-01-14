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
  ngOnInit(): void {
  }

  deleteUser(id) {
    this.userService.deleteUser(id).subscribe();
    alert(`user ${id} deleted`);
    console.log(`user ${id} deleted`);
  }

  editUser(id) {
    this.router.navigate(['edit-user',id])
  }

  viewTodos(id) {
    this.router.navigate(['view-todos',id]);
  }

}
