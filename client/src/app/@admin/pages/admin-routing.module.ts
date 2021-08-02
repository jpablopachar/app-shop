import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then(
            (m) => DashboardModule
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./users/users.module').then(
            (m) => UsersComponent
          ),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
