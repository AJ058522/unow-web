import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userStatus'
})
export class UserStatusPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    let name: string;

    switch(value){
      case 1:
        name = 'Contratado';
      break;

      case 2:
        name = 'Reritado';
      break;
    }
    return name;
  }

}
