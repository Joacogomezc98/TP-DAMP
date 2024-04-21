import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'date2string',
  standalone: true
})
export class Date2stringPipe implements PipeTransform {

  transform(value: Date): string {
    if (!value) return '';
    return moment(value).format('DD/MM/YYYY HH:mm')
  }

}
