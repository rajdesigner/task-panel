

import { Component} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'common-text-inputs',
    template: `
    <ng-container [formGroup]="group">
     <mat-label>Operator</mat-label>
    

     <select formControlName="description">
        <option>and</option>
        <option>Or</option>
        <option>eq</option>
        <option>ne</option>
        <option>gt</option>
        <option>ge</option>
        <option>lt</option>
        <option>le</option>
     </select>
    </ng-container>
    `
})
export class CommonTextInputComponent {

    group = new FormGroup({
        description: new FormControl()
    });

}