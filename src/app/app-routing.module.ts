import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUsersComponent } from './list-users/list-users.component';
import { ListTasksComponent } from './list-tasks/list-tasks.component'
const routes: Routes = [
  { path: 'users', component:ListUsersComponent  },
  { path: '', component:ListTasksComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
