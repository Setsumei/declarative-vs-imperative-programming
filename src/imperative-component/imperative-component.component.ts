import {Component, inject, signal, WritableSignal} from '@angular/core';
import {DataService, Item} from "../data-service.service";

@Component({
	selector: 'app-imperative-impl',
	standalone: true,
	imports: [],
	templateUrl: './imperative-component.component.html',
})
export class ImperativeComponentComponent {
	public dataService: DataService = inject(DataService);
	public items: WritableSignal<Array<Item>> = signal([]);
	public isAdmin: boolean = false;
	public textFilter: WritableSignal<string> = signal('');

	constructor() {
		this.dataService.getUserData$().subscribe(
			user => {
				if (user.isAdmin) {
					this.isAdmin = true;
				}
			}
		)
		this.fetchData();
	}

	public updateTextFilter(textFilter: string): void {
		this.textFilter.set(textFilter);
		this.fetchData();
	}

	public async fetchData(){
		if (this.isAdmin) {
			if (this.textFilter) {
				this.dataService.getData$(this.textFilter()).subscribe(data => {
					this.items.set(data ?? []);
				})
			} else {
				// optional throw error
			}
		} else {
			this.dataService.getData$().subscribe(
				data => {
					this.items.set(data ?? []);
				}
			)
		}
	}


}
