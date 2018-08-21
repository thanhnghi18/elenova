import {Route} from '@angular/router';

import {FinishComponent} from './finish.component';

export const applicationFinishionRoute: Route = {
  path: 'application/finish',
  component: FinishComponent,
  data: {
    authorities: [],
    pageTitle: 'global.menu.account.password'
  }
};
