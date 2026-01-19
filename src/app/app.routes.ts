import { Routes } from '@angular/router';

export const routes: Routes = [
  // Production routes
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
  },

  // Development showcase routes - access via /dev
  {
    path: 'dev',
    loadComponent: () =>
      import('./layout/shell.component').then((m) => m.ShellComponent),
    children: [
      {
        path: '',
        redirectTo: 'components',
        pathMatch: 'full',
      },
      {
        path: 'components',
        loadComponent: () =>
          import('./pages/shared-components/shared-components.page').then(
            (m) => m.SharedComponentsPage
          ),
      },
      {
        path: 'form-components',
        loadComponent: () =>
          import('./pages/form-components/form-components.page').then(
            (m) => m.FormComponentsPage
          ),
      },
      {
        path: 'overlay-components',
        loadComponent: () =>
          import('./pages/overlay-components/overlay-components.page').then(
            (m) => m.OverlayComponentsPage
          ),
      },
      {
        path: 'navigation-components',
        loadComponent: () =>
          import('./pages/navigation-components/navigation-components.page').then(
            (m) => m.NavigationComponentsPage
          ),
      },
      {
        path: 'data-display',
        loadComponent: () =>
          import('./pages/data-display/data-display.page').then(
            (m) => m.DataDisplayPage
          ),
      },
      {
        path: 'controls',
        loadComponent: () =>
          import('./pages/controls/controls.page').then(
            (m) => m.ControlsPage
          ),
      },
      {
        path: 'app-elements',
        loadComponent: () =>
          import('./pages/app-elements/app-elements.page').then(
            (m) => m.AppElementsPage
          ),
      },
    ],
  },
];
