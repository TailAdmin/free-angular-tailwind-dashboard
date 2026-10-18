import { Component } from '@angular/core';
import { PageBreadcrumbComponent } from '../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { ComponentCardComponent } from '../../../shared/components/common/component-card/component-card.component';
import { SolidVariantComponent } from '../../../shared/components/ui/badge/solid-variant/solid-variant.component';
import { LightVariantComponent } from '../../../shared/components/ui/badge/light-variant/light-variant.component';
import { GhostVariantComponent } from '../../../shared/components/ui/badge/ghost-variant/ghost-variant.component';
import { SolidVariantWithLeadingIconComponent } from '../../../shared/components/ui/badge/solid-variant-with-leading-icon/solid-variant-with-leading-icon.component';
import { LightVariantWithLeadingIconComponent } from '../../../shared/components/ui/badge/light-variant-with-leading-icon/light-variant-with-leading-icon.component';
import { GhostVariantWithLeadingIconComponent } from '../../../shared/components/ui/badge/ghost-variant-with-leading-icon/ghost-variant-with-leading-icon.component';
import { SolidVariantWithTrailingIconComponent } from '../../../shared/components/ui/badge/solid-variant-with-trailing-icon/solid-variant-with-trailing-icon.component';
import { LightVariantWithTrailingIconComponent } from '../../../shared/components/ui/badge/light-variant-with-trailing-icon/light-variant-with-trailing-icon.component';
import { GhostVariantWithTrailingIconComponent } from '../../../shared/components/ui/badge/ghost-variant-with-trailing-icon/ghost-variant-with-trailing-icon.component';

@Component({
  selector: 'app-badges',
  imports: [
    PageBreadcrumbComponent,
    ComponentCardComponent,
    SolidVariantComponent,
    LightVariantComponent,
    GhostVariantComponent,
    SolidVariantWithLeadingIconComponent,
    LightVariantWithLeadingIconComponent,
    GhostVariantWithLeadingIconComponent,
    SolidVariantWithTrailingIconComponent,
    LightVariantWithTrailingIconComponent,
    GhostVariantWithTrailingIconComponent,
  ],
  templateUrl: './badges.component.html',
})
export class BadgesComponent {}
