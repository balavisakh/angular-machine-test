import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddOrEditComponent } from './add-or-edit/add-or-edit.component';

import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'edit-user/:id',
    component: AddOrEditComponent
  },
  {
    path: 'view-todos/:id',
    loadChildren: () => import('../todos-page/todos-page.module').then(m => m.TodosPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListPageRoutingModule { }