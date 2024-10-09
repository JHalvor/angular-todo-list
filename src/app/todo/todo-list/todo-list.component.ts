import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  todos$ = new Observable<Todo[]>();
  ngOnInit(): void {
    this.todos$ = this.todoService.getTodos();
    console.log("Init:")
    this.logTodos();
  }

  logTodos(): void {
    this.todos$.subscribe((todos) => {
      console.log(todos)
    });
  }

  constructor(private readonly todoService: TodoService) {}

  async updateTodo(id: Number, todo: Todo) {
    await (await this.todoService.updateTodo(id, todo)).subscribe(
      response => {
        console.log('Success:', response);
        this.todos$ = this.todoService.getTodos();
      },
      error => {
        console.error('Error:', error);
      }
    )
    console.log("Updated:")
    this.logTodos();
  }

  async newTodo(title: string) {
    await (await this.todoService.addTodo(title)).subscribe(
      response => {
        console.log('Success:', response);
        this.todos$ = this.todoService.getTodos();
      },
      error => {
        console.error('Error:', error);
      }
    )
    console.log("Added:")
    this.logTodos();
  }
}
