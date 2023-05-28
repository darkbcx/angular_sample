import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TodoService } from 'src/app/core/todo.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAlertComponent } from 'src/app/shared/dialog-alert/dialog-alert.component';
import { RouterModule,Router } from '@angular/router';

@Component({
  selector: 'app-todo-add',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.scss']
})
export class TodoAddComponent implements OnInit {
  private fb = inject(FormBuilder);
  private todoService = inject(TodoService);
  private router = inject(Router);

  dialog = inject(MatDialog);
  todoForm!: FormGroup;
  isSubmitting = false;

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
    })
  }

  private showAlert(caption: string, callback?: () => void) {
    this.dialog
      .open(DialogAlertComponent, {
        data: {
          caption,
          okCaption: 'Continue'
        }
      })
      .afterClosed()
      .subscribe(callback)
  }

  async onSubmit(todoForm: FormGroup) {
    this.isSubmitting = true;
    console.log('VALID : ', todoForm.valid ? 'YES' : 'NO')
    console.log(todoForm.value);
    try {
      const res = await this.todoService.createTodo(todoForm.value);
      console.log('ADD RESULT : ', res);
      this.showAlert('Todo Added', () => {
        console.log('ADDED');
        this.isSubmitting = false;
        this.router.navigate(['/todo'])
      })
    } catch(err) {
      this.showAlert('Error Adding Todo', () => {
        console.log('ERROR : ', err);
        this.isSubmitting = false;
      })

    }
  }

}
