import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'job-description-details/:id',
        loadComponent: () => import('./job-description-card/add-show-job-description/add-show-job-description.component'),
      },
      {
        path: 'job-description-details',
        loadComponent: () => import('./job-description-card/add-show-job-description/add-show-job-description.component'),
      },
      {
        path: 'button',
        loadComponent: () => import('./basic-button/basic-button.component'),
      },
      {
        path: 'breadcrumb-paging',
        loadComponent: () =>
          import('./breadcrumb-paging/breadcrumb-paging.component'),
      },
      {
        path: 'collapse',
        loadComponent: () =>
          import('./basic-collapse/basic-collapse.component'),
      },
      {
        path: 'tabs-pills',
        loadComponent: () =>
          import('./basic-tabs-pills/basic-tabs-pills.component'),
      },
      {
        path: 'job-description-card',
        loadComponent: () =>
          import('./job-description-card/job-description-card.component'),
      },
      {
        path: 'governorate',
        loadComponent: () =>
          import('./governorate/governorate.component'),
      },
      {
        path: 'public-entities',
        loadComponent: () =>
          import('./public-entities/public-entities.component'),
      },
      {
        path: 'scientific-certificate',
        loadComponent: () =>
          import('./scientific-certificates/scientific-certificates.component'),
      },
      {
        path: 'applicants',
        loadComponent: () =>
          import('./applicants/applicants.component'),
      },
      {
        path: 'applicants-data/:id',
        loadComponent: () =>
          import('./applicants/add-show-applicants/add-show-applicants.component'),
      },
      {
        path: 'applicants-data',
        loadComponent: () =>
          import('./applicants/add-show-applicants/add-show-applicants.component'),
      },
      {
        path: 'sort-applicants',
        loadComponent: () =>
          import('./applicants-job-sorting/applicants-job-sorting.component'),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UiBasicRoutingModule {}
