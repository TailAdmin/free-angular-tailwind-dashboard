import { Component } from '@angular/core';
import { ComponentCardComponent } from '../../../shared/components/common/component-card/component-card.component';
import { PageBreadcrumbComponent } from '../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { ButtonVariantsComponent } from '../../../shared/components/ui/button/button-variants/button-variants.component';
import { ButtonSizesComponent } from '../../../shared/components/ui/button/button-sizes/button-sizes.component';
import { ButtonWithIconComponent } from '../../../shared/components/ui/button/button-with-icon/button-with-icon.component';
import { ButtonGroupDemoComponent } from '../../../shared/components/ui/button/button-group-demo/button-group-demo.component';

@Component({
  selector: 'app-buttons',
  imports: [
    ComponentCardComponent,
    PageBreadcrumbComponent,
    ButtonVariantsComponent,
    ButtonSizesComponent,
    ButtonWithIconComponent,
    ButtonGroupDemoComponent,
  ],
  templateUrl: './buttons.component.html',
})
export class ButtonsComponent {}
