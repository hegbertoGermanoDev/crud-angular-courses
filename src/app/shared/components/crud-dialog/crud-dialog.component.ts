import { Course } from './../../../courses/model/course';
import { CoursesService } from './../../../courses/services/courses.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-crud-dialog',
  templateUrl: './crud-dialog.component.html',
  styleUrls: ['./crud-dialog.component.scss']
})
export class CrudDialogComponent implements OnInit {

  public courseForm!: FormGroup;
  public course!: Course;
  public isChange: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Course,
    private fb: FormBuilder,
    private courseService: CoursesService,
    public dialogRef: MatDialogRef<CrudDialogComponent>
  ) { }

  ngOnInit(): void {
    if (this.data != null) {
      this.courseForm = this.fb.group({
        name: [this.data.name, [Validators.required]],
        category: [this.data.category, [Validators.required]]
      });
      this.isChange = true;
    } else {
      this.courseForm = this.fb.group({
        name: ['', [Validators.required]],
        category: ['', [Validators.required]]
      });
      this.isChange = false;
    }
  }

  addCourse(): void {
    if (this.data != null) {
      this.data.name = this.courseForm.value.name;
      this.data.category = this.courseForm.value.category;
      this.dialogRef.close(this.courseService.update(this.data).subscribe(result => {}));
    } else {
      this.dialogRef.close(this.courseService.insert(this.courseForm.value).subscribe(result => {}));
    }
  }

  onCancel(cancelar: any): void {
    this.dialogRef.close(cancelar);
  }

}
