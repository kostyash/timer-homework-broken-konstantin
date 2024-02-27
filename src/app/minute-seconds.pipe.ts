import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minuteSeconds',
})
export class MinuteSecondsPipe implements PipeTransform {
  transform(value: number): string {
    const min = Math.floor(value / 60);
    const sec = value - min * 60;
    return `${min < 10 ? 0 : ''}${min}:${sec < 10 ? 0 : ''}${sec}`;
  }
}
