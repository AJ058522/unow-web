import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SortDirective } from './directives/sort.directive';
import { UserStatusDirective } from './directives/user-status.directive';
import { UserStatusPipe } from './pipes/user-status.pipe';

@NgModule({
  declarations: [
    SortDirective,
    UserStatusDirective,
    UserStatusPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SortDirective,
    UserStatusDirective,
    UserStatusPipe
  ]
})
export class SharedModule { }
