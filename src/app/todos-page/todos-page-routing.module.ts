import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodosComponent } from './todos/todos.component';


const routes: Routes = [
  {
    path: '',
    component: TodosComponent
  },
  {
    path: 'list',
    loadChildren: () => import('../list-page/list-page.module').then(m => m.ListPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodosPageRoutingModule { }