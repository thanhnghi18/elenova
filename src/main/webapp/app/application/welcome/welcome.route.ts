import {Route} from '@angular/router';

import {WelcomeComponent} from './welcome.component';

export const applicationWelcomeRoute: Route = {
  path: 'welcome',
  component: WelcomeComponent,
  data: {
    authorities: [],
    pageTitle: 'global.menu.account.password'
  }
};
