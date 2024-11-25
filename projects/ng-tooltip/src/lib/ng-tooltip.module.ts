import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TooltipComponent } from './ng-tooltip.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [TooltipComponent],
  exports: [TooltipComponent],
})
export class TooltipModule {}
