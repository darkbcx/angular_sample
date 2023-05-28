import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  caption: string;
  okCaption?: string;
  cancelCaption?: string;
}

@Component({
  selector: 'app-dialog-confirm',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogConfirmComponent {
  constructor(public dialogRef: MatDialogRef<string>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

}
