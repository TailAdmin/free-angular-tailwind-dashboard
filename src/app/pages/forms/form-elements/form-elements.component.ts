import { Component } from '@angular/core';
import { PageBreadcrumbComponent } from '../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { DefaultInputsComponent } from '../../../shared/components/form/form-elements/default-inputs/default-inputs.component';
import { SelectInputsComponent } from '../../../shared/components/form/form-elements/select-inputs/select-inputs.component';
import { TextAreaInputComponent } from '../../../shared/components/form/form-elements/textarea-input/textarea-input.component';
import { InputStatesComponent } from '../../../shared/components/form/form-elements/input-states/input-states.component';
import { InputGroupComponent } from '../../../shared/components/form/form-elements/input-group/input-group.component';
import { FileInputComponent } from '../../../shared/components/form/form-elements/file-input/file-input.component';
import { CheckboxInputsComponent } from '../../../shared/components/form/form-elements/checkbox-inputs/checkbox-inputs.component';
import { RadioButtonsComponent } from '../../../shared/components/form/form-elements/radio-buttons/radio-buttons.component';
import { ToggleSwitchComponent } from '../../../shared/components/form/form-elements/toggle-switch/toggle-switch.component';
import { DropzoneComponent } from '../../../shared/components/form/form-elements/dropzone/dropzone.component';

@Component({
  selector: 'app-form-elements',
  imports: [
    PageBreadcrumbComponent,
    DefaultInputsComponent,
    SelectInputsComponent,
    TextAreaInputComponent,
    InputStatesComponent,
    InputGroupComponent,
    FileInputComponent,
    CheckboxInputsComponent,
    RadioButtonsComponent,
    ToggleSwitchComponent,
    DropzoneComponent,
  ],
  templateUrl: './form-elements.component.html',
  styles: ``,
})
export class FormElementsComponent {}
