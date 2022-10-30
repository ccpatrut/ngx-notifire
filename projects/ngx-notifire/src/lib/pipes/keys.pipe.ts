import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys',
  pure: false,
})
/**
 * Extract object keys pipe
 */
export class KeysPipe implements PipeTransform {
  transform(value: any): any {
    if (!value) {
      return value;
    }
    return Object.keys(value);
  }
}
