import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

interface DialogData {
  caption: string;
  okCaption: string;
}

@Component({
  selector: 'app-dialog-alert',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './dialog-alert.component.html',
  styleUrls: ['./dialog-alert.component.scss']
})
export class DialogAlertComponent {
  constructor(public dialogRef: MatDialogRef<string>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
}
