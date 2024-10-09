import { Component, Output } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  showCompleted = false;
  todos: Todo[] = [];

  ngOnInit(): void {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    })
    console.log("Init:")
    this.logTodos();
  }

  toggleShowCompleted() {
    this.showCompleted = !this.showCompleted;
  }

  filteredTodos(): Todo[] {
    return this.todos.filter(todo => this.showCompleted || !todo.completed);
  }

  logTodos(): void {
    console.log(this.todos)
  }

  constructor(private readonly todoService: TodoService) {}

  async updateTodo(id: Number, todo: Todo) {
    await (await this.todoService.updateTodo(id, todo)).subscribe(
      response => {
        console.log('Success:', response);
        this.todoService.getTodos().subscribe(todos => {
          this.todos = todos
        })
      },
      error => {
        console.error('Error:', error);
      }
    )
  }

  async newTodo(title: string) {
    await (await this.todoService.addTodo(title)).subscribe(
      response => {
        console.log('Success:', response);
        this.todoService.getTodos().subscribe(todos => {
          this.todos = todos
        })
      },
      error => {
        console.error('Error:', error);
      }
    )
  }
}
