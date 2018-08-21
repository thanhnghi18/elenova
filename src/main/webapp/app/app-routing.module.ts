import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute, navbarRoute } from './layouts';
import { ReceptionComponent } from './application/reception/reception.component';
import { ConfirmationComponent } from './application/confirmation/confirmation.component';
import { FinishComponent } from './application/finish/finish.component';
import { ErrorComponent } from './layouts/error/error.component';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';

const LAYOUT_ROUTES =[navbarRoute,...errorRoute,];

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                ...LAYOUT_ROUTES,
                {
                    path: 'admin',
                    loadChildren: './admin/admin.module#ElenovaAdminModule'
                },
                {
                    path:'reception/tepco/shopA',
                    component: ReceptionComponent,
                    data: {
                        pageTitle: 'Elenova'
                    }
                },
                {
                    path:'reception/tepco/shopB',
                    component: ReceptionComponent,
                    data: {
                        pageTitle: 'Elenova'
                    }
                },
                {
                    path:'reception/chuden/shopA',
                    component: ReceptionComponent,
                    data: {
                        pageTitle: 'Elenova'
                    }
                },
                {
                    path:'reception/chuden/shopB',
                    component: ReceptionComponent,
                    data: {
                        pageTitle: 'Elenova'
                    }
                },
                {
                    path:'reception/kepco/shopA',
                    component: ReceptionComponent,
                    data: {
                        pageTitle: 'Elenova'
                    }
                },
                {
                    path:'reception/kepco/shopB',
                    component: ReceptionComponent,
                    data: {
                        pageTitle: 'Elenova'
                    }
                },
                {
                    path:'tepco/confirmation',
                    component: ConfirmationComponent,
                    data: {
                        pageTitle: 'Elenova'
                    }
                },
                {
                    path:'chuden/confirmation',
                    component: ConfirmationComponent,
                    data: {
                        pageTitle: 'Elenova'
                    }
                },
                {
                    path:'kepco/confirmation',
                    component: ConfirmationComponent,
                    data: {
                        pageTitle: 'Elenova'
                    }
                },
                {
                    path:'tepco/finish',
                    component: FinishComponent,
                    data: {
                        pageTitle: 'Elenova'
                    }
                },
                {
                    path:'chuden/finish',
                    component: FinishComponent,
                    data: {
                        pageTitle: 'Elenova'
                    }
                },
                {
                    path:'kepco/finish',
                    component: FinishComponent,
                    data: {
                        pageTitle: 'Elenova'
                    }
                },
                {
                    path:'**',
                    component: ErrorComponent,
                    data: {
                        pageTitle: 'Error'
                    }
                }
            ],
            { useHash: true, enableTracing: DEBUG_INFO_ENABLED }
        )
    ],
    exports: [RouterModule]
})
export class ElenovaAppRoutingModule {}
