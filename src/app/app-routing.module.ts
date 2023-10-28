import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralTableComponent } from './modules/general-table/general-table.component';
import { BriefInformationComponent } from './modules/brief-information/brief-information.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'general-table',
    pathMatch: 'full'
  },
  {
    path: 'general-table',
    component: GeneralTableComponent,
    children: [
      {
        path: 'general-table',
        loadChildren: () => import('./modules/general-table/general-table.module').then(m => m.GeneralTableModule),
      }
    ]
  },
  {
    path: 'brief-information',
    component: BriefInformationComponent,
    children: [
      {
        path: 'brief-information',
        loadChildren: () => import('./modules/brief-information/brief-information.module').then(m => m.BriefInformationModule),
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
