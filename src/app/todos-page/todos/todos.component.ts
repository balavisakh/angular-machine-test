import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  urlId:any;
  todos:any;
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getIdFromUrl();
    this.getToDos();
  }

  navBack() {
    this.router.navigate(['list']);
  }

  getIdFromUrl() {
    this.activatedRoute.params.subscribe((urlId)=>{
      this.urlId = urlId.id;
    })
  }

  getToDos() {
    this.userService.getToDosById(this.urlId).subscribe((todos)=>{
      this.todos = todos;
      console.log(this.todos,"todos");
    })
  }
}
