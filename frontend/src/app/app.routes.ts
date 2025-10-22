import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'contacts',
    pathMatch: 'full',
  },
  {
    path: 'contacts',
    loadComponent: () =>
      import('./features/contacts/list/contact-list-page.component').then(
        (m) => m.ContactListPageComponent
      ),
  },
  {
    path: 'contacts/new',
    loadComponent: () =>
      import('./features/contacts/create/contact-create-page.component').then(
        (m) => m.ContactCreatePageComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'contacts',
  },
];
