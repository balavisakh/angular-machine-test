import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosComponent } from './todos/todos.component';
import { TodosPageRoutingModule } from './todos-page-routing.module'; 
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [TodosComponent],
  imports: [
    CommonModule,
    TodosPageRoutingModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class TodosPageModule { }
