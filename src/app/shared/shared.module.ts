import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SortDirective } from './directives/sort.directive';
import { UserStatusDirective } from './directives/user-status.directive';

@NgModule({
  declarations: [
    SortDirective,
    UserStatusDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SortDirective,
    UserStatusDirective
  ]
})
export class SharedModule { }
