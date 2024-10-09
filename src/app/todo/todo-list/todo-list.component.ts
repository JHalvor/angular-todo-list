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
    this.todos$.subscribe((todos) => {
      console.log(todos)
      // todos.forEach((todo) => {
      //   console.log(todo.title);
      // });
    });
  }


  constructor(private readonly todoService: TodoService) {}

  // todos = this.todoService.todos;

  // updateTodo(todo: Todo) {
  //   this.todoService.updateTodo(todo);
  // }

  // async newTodo(title: string) {
  //   await this.todoService.addTodo(title);
  //   this.todos = this.todoService.todos;
  // }
}
