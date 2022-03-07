import { ConfirmDialogComponent } from './../../shared/components/confirm-dialog/confirm-dialog.component';
import { ErrorDialogComponent } from './../../shared/components/error-dialog/error-dialog.component';
import { Course } from './../model/course';
import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { catchError, Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CrudDialogComponent } from 'src/app/shared/components/crud-dialog/crud-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  course!: Course;
  courses$: Observable<Course[]>;
  displayedColumns = ['name', 'category', 'action'];

  constructor(
      private courseServices: CoursesService,
      public dialog: MatDialog
    ) {
    this.courses$ = this.courseServices.list()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar cursos.');
        return of([])
      })
      );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data:  errorMsg,
    });
  }

  openDialog(course: Course | null): void {
    const dialogRef = this.dialog.open(CrudDialogComponent, {
      minWidth: '200px',
      data: course
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed.');
      if (result != null) {
        if (result._id != null) {
          console.log('Editar curso: ' + result.name);
        } else {
          console.log('Criar curso: ' + result.name);
        }
        this.courses$ = this.courseServices.list();
      }
    });
  }

  deleteCourse(course: Course): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: course,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed.');
      if (result != null) {
        this.courses$ = this.courseServices.list();
      }
    });
  }

  ngOnInit(): void {

  }

}
