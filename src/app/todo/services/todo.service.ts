import { inject, Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);
  private todoId = 1;

  public getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${environment.apiUrl}`);
  }

  async addTodo(title: string): Promise<Observable<Todo>> {
    const todo = {
      id: this.todoId++,
      title: title,
      completed: false,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<Todo>(`${environment.apiUrl}`, JSON.stringify(todo), {headers})
  }

  async updateTodo(id: Number, updatedTodo: Todo): Promise<Observable<Todo>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.put<Todo>(`${environment.apiUrl}/${id}`, JSON.stringify(updatedTodo), {headers})
  }
}
