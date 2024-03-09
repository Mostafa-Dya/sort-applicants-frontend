import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { CanActivateService } from './Auth/can-active.service';
import { AuthAdminService } from './Auth/auth-admin.service';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate:[CanActivateService],
    children: [
      {
        path: '',
        redirectTo: 'basic/job-description-card',
        pathMatch: 'full',
      },
      // {
      //   path: 'dashboard',
      //   loadComponent: () => import('./demo/dashboard/dashboard.component'),
      // },
      {
        path: 'Admin',
        loadComponent: () => import('./theme/layout/admin/admin-page/admin-page.component'),
      },
      {
        path: 'users-permissions/:id',
        loadComponent: () => import('./theme/layout/admin/admin-page/users-permissions/users-permissions.component'),
      },
      {
        path: 'sort-applicants',
        loadComponent: () =>
          import('../../src/app/demo/ui-elements/ui-basic/applicants-job-sorting/applicants-job-sorting.component'),
      },
      {
        path: 'basic',
        loadChildren: () =>
          import('./demo/ui-elements/ui-basic/ui-basic.module').then(
            (m) => m.UiBasicModule,
          ),
      },
      // {
      //   path: 'forms',
      //   canActivate:[AuthAdminService],
      //   loadChildren: () =>
      //     import('./demo/pages/form-elements/form-elements.module').then(
      //       (m) => m.FormElementsModule,
      //     ),
      // },
      // {
      //   path: 'tables',
      //   loadChildren: () =>
      //     import('./demo/pages/tables/tables.module').then(
      //       (m) => m.TablesModule,
      //     ),
      // },
      // {
      //   path: 'apexchart',
      //   loadComponent: () =>
      //     import('./demo/chart/apex-chart/apex-chart.component'),
      // },
      // {
      //   path: 'sample-page',
      //   loadComponent: () =>
      //     import('./demo/extra/sample-page/sample-page.component'),
      // },
    ],
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./demo/pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule,
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
