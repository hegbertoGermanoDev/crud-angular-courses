import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppMaterialModule } from './app-material/app-material.module';
import { CrudDialogComponent } from './components/crud-dialog/crud-dialog.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { CategoryPipe } from './pipes/category.pipe';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    ErrorDialogComponent,
    CategoryPipe,
    CrudDialogComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [
    ErrorDialogComponent,
    CategoryPipe,
    CrudDialogComponent
  ]
})
export class SharedModule { }
