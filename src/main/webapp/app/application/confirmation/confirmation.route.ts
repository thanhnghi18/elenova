import {Route} from '@angular/router';

import {ConfirmationComponent} from './confirmation.component';

export const applicationConfirmationRoute: Route = {
  path: 'application/confirmation',
  component: ConfirmationComponent,
  data: {
    authorities: [],
    pageTitle: 'global.menu.account.password'
  }
};
