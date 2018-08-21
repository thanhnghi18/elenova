import {Route} from '@angular/router';

import {ReceptionComponent} from './reception.component';


export const applicationReceptionRoute: Route = {
  path: 'application/reception',
  component: ReceptionComponent,
  data: {
    authorities: [],
    pageTitle: 'global.menu.account.password'
  },
  children: [
    { path: 'tennatA/shop1', component: ReceptionComponent },
    { path: 'tennatA/shop2', component: ReceptionComponent },
    { path: 'tennatB/shop1', component: ReceptionComponent },
    { path: 'tennatB/shop2', component: ReceptionComponent },
    { path: '**', redirectTo:'404' }
  ]
};
