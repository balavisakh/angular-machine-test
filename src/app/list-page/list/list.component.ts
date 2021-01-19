import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  users;
  selectedUsers = [];
  displayedColumns: string[] = ['select', 'id', 'username', 'email'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selection = new SelectionModel(true, []);
  subscription: Subscription;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getUsersFromUserService();
    this.userService.subject.subscribe(() => {
      console.log("subject trigger")
      this.selectedUsers = [];
      this.getUsersFromUserService();
    });
    // this.getUser();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // getUser(): void {
  //   this.userService.getAllUsers().subscribe((posts)=>{
  //     this.users = posts;
  //     this.dataSource.data = this.users;
  //     // console.log(this.users,"userUsers");
  //   })
  // }

  getUsersFromUserService() {
    if (this.userService.getSubscribedUsers()?.length) {
      this.dataSource.data = this.userService.getSubscribedUsers();
      this.getSelectedUsers(this.dataSource.data);
      console.log(this.dataSource.data, 'all datas');
      return;
    } else {
      this.userService.getAllUsersAsShareData().subscribe((data) => {
        this.dataSource.data = data;
        console.log(this.dataSource.data, 'all');
      });
    }
  }
  getSelectedUsers(users: any[]) {
    users.forEach((user) => {
      if (user.isChecked) {
        this.selectedUsers.push(user);
      }
    });
    console.log(this.selectedUsers, 'sel');
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    //  console.log(this.selection.selected);
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }

  toggleAndRowSelect($event, row) {
    row.isChecked = $event.checked;
    if ($event.checked === true) {
      this.selectedUsers.push(row);
    } else {
      this.selectedUsers.splice(this.selectedUsers.indexOf(row), 1);
    }
    this.selectedUsers.splice(this.selectedUsers.indexOf(row), 1);
    console.log(this.selectedUsers);
  }

  toggleAndselectAllrows($event) {
    console.log(this.selection.selected, 'sss');
    this.selectedUsers = this.selection.selected;
    this.selectedUsers.forEach((user) => {
      user.isChecked = $event.checked;
    });
    console.log(this.selectedUsers, 'all');
  }

  addUser() {
    this.router.navigate(['add-user']);
  }
}
