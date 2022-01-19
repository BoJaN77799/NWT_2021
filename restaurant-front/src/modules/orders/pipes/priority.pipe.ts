import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priority'
})
export class PriorityPipe implements PipeTransform {

  transform(value: number | null): string {
    if(!value) return 'Default'
    if(value === 1) return 'I';
    if(value === 2) return 'II';
    return 'III';
  }

}
