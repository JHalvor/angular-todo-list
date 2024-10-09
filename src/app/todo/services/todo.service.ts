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
  private todoList: Todo[] = [
    {
      id: this.todoId++,
      title: 'serve the app',
      completed: true,
    },
    {
      id: this.todoId++,
      title: 'familiarise yourself with the codebase',
      completed: false,
    },
    {
      id: this.todoId++,
      title: 'start talking to the api',
      completed: false,
    },
  ];
  
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

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    // TODO: replace with a PUT request
    const foundTodo = this.todoList.find((todo) => todo.id === updatedTodo.id);
    if (!foundTodo) {
      throw new Error('todo not found');
    }
    Object.assign(foundTodo, updatedTodo);

    return foundTodo;
  }
}
