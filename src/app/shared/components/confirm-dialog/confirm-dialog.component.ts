import { Course } from './../../../courses/model/course';
import { CoursesService } from './../../../courses/services/courses.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(
      @Inject(MAT_DIALOG_DATA)
      public data: Course,
      private courseServices: CoursesService,
      public dialogRef: MatDialogRef<ConfirmDialogComponent>
    ) { }

  ngOnInit(): void {
  }

  confirmarExclusao(id: number): void {
    this.courseServices.delete(id).subscribe( data => {
      this.courseServices.list();
    });
  }

  cancelarExclusao(cancelar: any): void {
    this.dialogRef.close(cancelar);
  }

}
