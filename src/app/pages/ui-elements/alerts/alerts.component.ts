import { Component } from '@angular/core';
import { ComponentCardComponent } from '../../../shared/components/common/component-card/component-card.component';
import { PageBreadcrumbComponent } from '../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { DefaultAlertComponent } from '../../../shared/components/ui/alert/default-alert/default-alert.component';
import { SuccessAlertComponent } from '../../../shared/components/ui/alert/success-alert/success-alert.component';
import { WarningAlertComponent } from '../../../shared/components/ui/alert/warning-alert/warning-alert.component';
import { ErrorAlertComponent } from '../../../shared/components/ui/alert/error-alert/error-alert.component';
import { InfoAlertComponent } from '../../../shared/components/ui/alert/info-alert/info-alert.component';

@Component({
  selector: 'app-alerts',
  imports: [
    ComponentCardComponent,
    PageBreadcrumbComponent,
    DefaultAlertComponent,
    SuccessAlertComponent,
    WarningAlertComponent,
    ErrorAlertComponent,
    InfoAlertComponent,
  ],
  templateUrl: './alerts.component.html',
  styles: ``
})
export class AlertsComponent {

}
