import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from 'src/app/core/todo.service';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogConfirmComponent } from 'src/app/shared';
import { Subscription, from, of, switchMap } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, OnDestroy {
  private todoService = inject(TodoService);

  dialog = inject(MatDialog);
  displayedColumns: string[] = ['name', 'description', 'action'];
  todos: any[] = [];
  onCreateSubscription = this.todoService.onCreate.subscribe(res => {
    console.log('ON CREATE SUB : ', res);
    if (res) this.todos.push(res)
  });
  onDeleteSubscription = this.todoService.onDelete.subscribe(res => {
    console.log('ON DELETE SUB : ', res);
    if (res) {
      this.todos = this.todos.filter(el => el.id !== res.id)
    }
  });
  onUpdateSubscription = this.todoService.onUpdate.subscribe(res => {
    console.log('ON UPDATE SUB : ', res);
    if (res) {
      this.todos = this.todos.map(el => {
        if (el.id === res.id) {
          return res;
        } else {
          return el;
        }
      })
    }
  });

  ngOnInit(): void {
    this.todoService.getAll()
      .then(todos => this.todos = todos)
      .catch(err => console.log('ERR : ', err))
  }

  ngOnDestroy(): void {
    this.onCreateSubscription.unsubscribe();
    this.onDeleteSubscription.unsubscribe();
    this.onUpdateSubscription.unsubscribe();
  }

  deleteTodo(todoId: string) {
    console.log('TODO ID : ', todoId);
    this.dialog
      .open(DialogConfirmComponent, {
        data: { caption: 'Delete Todo?', okCaption: 'DELETE' }
      })
      .afterClosed()
      .pipe(
        switchMap(res => {
          if (res === 'OK') {
            return from(this.todoService.deleteTodo(todoId))
          }
          return of('CANCEL DELETING')
        })
      )
      .subscribe({
        next: res => console.log('NEXT : ', res),
        error: err => console.log('ERROR : ', err),
        complete: () => console.log('COMPLETE')
      })
  }

}
