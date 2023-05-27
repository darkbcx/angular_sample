import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from 'src/app/core/todo.service';
import { catchError, from, of, startWith } from 'rxjs';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  private todoService = inject(TodoService);

  todos:any[] = [];

  ngOnInit(): void {
    this.todoService.onCreate.subscribe(res => {
      console.log('ON CREATE SUB : ', res);
      this.todos.push(res)
    });

    this.todoService.getAll()
      .then(todos => this.todos = todos)
      .catch(err => console.log('ERR : ', err))
  }

}
