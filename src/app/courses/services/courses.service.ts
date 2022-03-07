import { Course } from './../model/course';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, first, tap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = 'api/courses';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Course[]>(this.API)
    .pipe(
      first(),
      delay(500),
      tap(courses => console.log(courses))
    );
  }

  insert(course: Course): Observable<Course> {
    return this.httpClient.post<Course>(this.API, course);
  }

  filter(_id: number): Observable<Course> {
    return this.httpClient.get<Course>(this.API);
  }

  update(course: Course): Observable<Course> {
    return this.httpClient.put<Course>(`${this.API}/${course._id}`, course);
  }

  delete(_id: number): Observable<Object> {
    return this.httpClient.delete(`${this.API}/${_id}`);
  }
}
