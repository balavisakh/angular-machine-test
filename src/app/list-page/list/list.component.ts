import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  users: any[];
  selectedUsers  =[];
  displayedColumns: string[] = ['select','id', 'username','email'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selection = new SelectionModel(true, []);
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getUser();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getUser(): void {
    this.userService.getAllUsers().subscribe((posts)=>{
      this.users = posts;
      this.dataSource.data = this.users;
      // console.log(this.users,"userUsers");
    })
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
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  toggleAndRowSelect($event,row) {
    console.log($event);
    if($event.checked === true) {
      this.selectedUsers.push(row)
    }
    else {
      this.selectedUsers.splice(this.selectedUsers.indexOf(row),1);
    }
    console.log(this.selectedUsers);
  }

  toggleAndselectAllrows() {
    console.log(this.selection.selected,"sss")
    this.selectedUsers = this.selection.selected;
    console.log(this.selectedUsers,"all");
  }

  addUser() {
    this.router.navigate(['add-user']);
  }

}
