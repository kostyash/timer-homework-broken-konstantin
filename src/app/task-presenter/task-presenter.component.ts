import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
} from '@angular/core';
import { TaskModel } from '../models/task-model';

@Component({
  selector: 'app-task-presenter',
  templateUrl: './task-presenter.component.html',
  styleUrls: ['./task-presenter.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class TaskPresenterComponent implements OnInit {
  @Input() task: TaskModel;
  @Output() clicked = new EventEmitter<TaskModel>();

  constructor (private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    this.task.name = this.task.name.toUpperCase();
    this.cdr.detectChanges(); 
  }

  public click() {
    this.clicked.emit(this.task);
  }
}
