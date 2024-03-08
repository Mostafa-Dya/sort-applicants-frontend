import { Injectable } from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'navigation',
    title: '',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'sort-applicants',
        title: 'Sort Applicants',
        type: 'item',
        url: '/sort-applicants',
        icon: 'feather icon-home',
        classes: 'nav-item',
      },
    ],
  },
  {
    id: 'ui-element',
    title: '',
    type: 'group',
    icon: 'icon-ui',
    children: [
      {
        id: 'basic',
        title: 'Component',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          // {
          //   id: 'button',
          //   title: 'Button',
          //   type: 'item',
          //   url: '/basic/button',
          // },
          // {
          //   id: 'job-description',
          //   title: 'Job Description',
          //   type: 'item',
          //   url: '/basic/job-description-details',
          // },
          // {
          //   id: 'breadcrumb-pagination',
          //   title: 'Breadcrumb & Pagination',
          //   type: 'item',
          //   url: '/basic/breadcrumb-paging',
          // },
          // {
          //   id: 'collapse',
          //   title: 'Collapse',
          //   type: 'item',
          //   url: '/basic/collapse',
          // },
          // {
          //   id: 'tabs-pills',
          //   title: 'Tabs & Pills',
          //   type: 'item',
          //   url: '/basic/tabs-pills',
          // },
          {
            id: 'job-description-card',
            title: 'Job description card',
            type: 'item',
            url: '/basic/job-description-card',
          },
          {
            id: 'governorate',
            title: 'Governorate',
            type: 'item',
            url: '/basic/governorate',
          },
          
          {
            id: 'public-entities',
            title: 'Public Entities',
            type: 'item',
            url: '/basic/public-entities',
          },
          {
            id: 'scientific-certificate',
            title: 'Scientific Certificate',
            type: 'item',
            url: '/basic/scientific-certificate',
          },
          {
            id: 'applicants',
            title: 'Applicants',
            type: 'item',
            url: '/basic/applicants',
          },

          // {
          //   id: 'applicants-data',
          //   title: 'Applicants',
          //   type: 'item',
          //   url: '/basic/applicants-data',
          // },
          
        ],
      },
    ],
  },
  // {
  //   id: 'forms',
  //   title: 'Forms & Tables',
  //   type: 'group',
  //   icon: 'icon-group',
  //   children: [
  //     {
  //       id: 'forms-element',
  //       title: 'Form Elements',
  //       type: 'item',
  //       url: '/forms/basic',
  //       classes: 'nav-item',
  //       icon: 'feather icon-file-text',
  //     },
  //     {
  //       id: 'tables',
  //       title: 'Tables',
  //       type: 'item',
  //       url: '/tables/bootstrap',
  //       classes: 'nav-item',
  //       icon: 'feather icon-server',
  //     },
  //   ],
  // },
  // {
  //   id: 'chart-maps',
  //   title: 'Chart',
  //   type: 'group',
  //   icon: 'icon-charts',
  //   children: [
  //     {
  //       id: 'apexChart',
  //       title: 'ApexChart',
  //       type: 'item',
  //       url: 'apexchart',
  //       classes: 'nav-item',
  //       icon: 'feather icon-pie-chart',
  //     },
  //   ],
  // },
  // {
  //   id: 'pages',
  //   title: 'Pages',
  //   type: 'group',
  //   icon: 'icon-pages',
  //   children: [
  //     {
  //       id: 'auth',
  //       title: 'Authentication',
  //       type: 'collapse',
  //       icon: 'feather icon-lock',
  //       children: [
  //         {
  //           id: 'signup',
  //           title: 'Sign up',
  //           type: 'item',
  //           url: '/signup',
  //           target: true,
  //           breadcrumbs: false,
  //         },
  //         {
  //           id: 'signin',
  //           title: 'Sign in',
  //           type: 'item',
  //           url: '/login',
  //           target: true,
  //           breadcrumbs: false,
  //         },
  //       ],
  //     },
  //     {
  //       id: 'sample-page',
  //       title: 'Sample Page',
  //       type: 'item',
  //       url: '/sample-page',
  //       classes: 'nav-item',
  //       icon: 'feather icon-sidebar',
  //     },
  //   ],
  // },
];

@Injectable()
export class NavigationItem {
  constructor(){}
  get() {
    return NavigationItems;
  }
}
