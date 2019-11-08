import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBooks'
})
export class FilterBooksPipe implements PipeTransform {

  public transform(values: any[], filter: string): any[] {
    if (!values || !values.length) return [];
    if (!filter) return values;

    return values.filter(v => {
        let match = false;

        Object.keys(v).forEach(k => {
            if (typeof v[k] === 'string') {
                match = match || v[k].indexOf(filter) >= 0;
            } else {
                match = match || v[k] == filter; // == intentinally
            }
        });

        return match;
    });
}


}
