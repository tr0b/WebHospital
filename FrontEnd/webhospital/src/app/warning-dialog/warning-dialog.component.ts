import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

import { Component, OnInit, Inject } from "@angular/core";

export interface DialogData {
  title: string;

  message: string;
}
//Warning Material Dialog for Critical Operations
@Component({
  selector: "app-warning-dialog",

  templateUrl: "./warning-dialog.component.html",

  styleUrls: ["./warning-dialog.component.sass"]
})
export class WarningDialogComponent implements OnInit {
  dialogData: DialogData;

  title: string;

  message: string;

  constructor(
    public dialogRef: MatDialogRef<WarningDialogComponent>,

    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {}

  onConfirm(): void {
    // Close the dialog, return true

    this.dialogRef.close(true);
  }

  onDismiss(): void {
    // Close the dialog, return false

    this.dialogRef.close(false);
  }
}