import { Injectable, NgZone } from '@angular/core';
import { Observable, timer, BehaviorSubject, Subscription } from 'rxjs';
import { tap, filter } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class TimerManagerService {
  readonly initialValue = 0;
  private timers: {
    id: number;
    subj$: BehaviorSubject<number>;
    isRunning: boolean;
  }[] = [];
  
  timersSub: Subscription;

  constructor(private ngZone: NgZone) {    
  }

  getTimer(id: number): Observable<number> {
    const newTimer = this.createTimer();
    this.timers.push({ id, subj$: newTimer, isRunning: false });
    return newTimer.asObservable();
  }
  private createTimer() {
    return new BehaviorSubject<number>(this.initialValue);
  }
  public playTimer(id: number): void {
    const timer = this.timers.find((x) => x.id === id);
    if (timer) {
      timer.isRunning = true;
      this.runTimers();
    }
  }
  public pauseTimer(id: number): void {
    const timer = this.timers.find((x) => x.id === id);
    if (timer) {
      timer.isRunning = false;
      this.runTimers();
    }
  }

  private runTimers(): void {
    if(this.timers.findIndex((y) => y.isRunning) >= 0) {
      if(this.timersSub && !this.timersSub.closed){
        return;
      }
      this.timersSub = timer(0, 1000)
      .pipe(
        filter((x) => this.timers.findIndex((y) => y.isRunning) >= 0),
        tap(() => {
          this.ngZone.runOutsideAngular(() => {
            this.timers
              .filter((x) => x.isRunning)
              .forEach((subj) => subj.subj$.next(subj.subj$.value + 1));
          });
        })
      )
      .subscribe();
    } else {
      this.timersSub && this.timersSub.unsubscribe();
    }    
  }
}
