import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactModule } from './contact/contact.module';
import { HomeModule } from './home/home.module';
import { PublicComponent } from './public.component';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => HomeModule),
      },
      {
        path: 'contact',
        loadChildren: () =>
          import('./contact/contact.module').then(
            (m) => ContactModule
          ),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
