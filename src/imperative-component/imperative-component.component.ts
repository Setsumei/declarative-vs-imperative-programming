import {Component, inject, signal, WritableSignal} from '@angular/core';
import {DataService, Todo, User} from "../data-service.service";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-imperative-component',
  standalone: true,
  imports: [],
  templateUrl: './imperative-component.component.html',
  styleUrl: './imperative-component.component.css'
})
export class ImperativeComponentComponent {
	public dataService: DataService = inject(DataService);
	public todos: WritableSignal<Array<Todo>> = signal([]);
	public isAdmin: WritableSignal<boolean> = signal(false);
	public textFilter: WritableSignal<string> = signal('');

	constructor() {
		this.dataService.getUserData$().subscribe(
			user => {
				if(user.isAdmin){
					this.isAdmin.set(true);
				}
			}
		)

		this.fetchData();
	}

	public updateTextFilter(textFilter: string): void{
		this.textFilter.set(textFilter);
		this.fetchData();
	}

	public async fetchData(): Promise<void>{
		let todos;

		if(this.isAdmin()){
			if(this.textFilter){
				todos = await firstValueFrom(this.dataService.getData$(this.textFilter()));
			}else{
				// optional throw error
			}
		}else{
			todos = await firstValueFrom(this.dataService.getData$());
		}

		this.todos.set(todos??[]);


	}



}
