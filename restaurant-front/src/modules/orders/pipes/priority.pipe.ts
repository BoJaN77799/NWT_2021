import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priority'
})
export class PriorityPipe implements PipeTransform {

  transform(value: number | null, itemType: string | null): string {
    if(itemType === 'DRINK') return '';
    if(value === 0) return '[I]'
    if(value === 1) return '[II]';
    if(value === 2) return '[III]';
    return '[Default]';
  }

}
