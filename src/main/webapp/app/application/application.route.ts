import {Routes} from '@angular/router';

import {
  applicationWelcomeRoute,
  applicationReceptionRoute,
  applicationConfirmationRoute,
  applicationFinishionRoute
} from './';

const APPLICATION_ROUTES = [
  applicationWelcomeRoute,
  applicationReceptionRoute,
  applicationConfirmationRoute,
  applicationFinishionRoute
];

export const applicationState: Routes = [{
  path: '',
  children: APPLICATION_ROUTES
}];
