import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from 'src/app/core/todo.service';
import { from, of, switchMap } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAlertComponent } from 'src/app/shared/dialog-alert/dialog-alert.component';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-todo-edit',
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
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.scss']
})
export class TodoEditComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private todoService = inject(TodoService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  dialog = inject(MatDialog);
  todoForm!: FormGroup;
  isSubmitting = false;

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
    })

    this.route.params
      .pipe(
        switchMap((params: any) => {
          if (params.id) {
            this.isSubmitting = true;
            return from(this.todoService.getTodo(params.id))
          } else {
            return of('NO PARAM ID');
          }
        })
      )
      .subscribe({
        next: params => {
          console.log(params);
          this.isSubmitting = false;
          if (params) {
            this.todoForm.patchValue({
              name: params.name,
              description: params.description,
            })
          } else {
            this.showAlert('Todo not found', () => this.router.navigate(['/todo']))
          }
        },
        error: err => {
          console.log('GET TODO ERROR : ', err);
          this.isSubmitting = false;
          this.showAlert('Error loading todo', () => this.router.navigate(['/todo']))
        }
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
  }

}
