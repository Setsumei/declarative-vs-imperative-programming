import {Component, inject, Signal, signal, WritableSignal} from '@angular/core';
import {DataService, Todo} from "../data-service.service";
import {Observable, Subject, switchMap, tap} from "rxjs";
import {toObservable, toSignal} from "@angular/core/rxjs-interop";

@Component({
	selector: 'app-declarative-impl',
	standalone: true,
	imports: [],
	templateUrl: './declarative.component.html',
})
export class DeclarativeComponent {
	public dataService: DataService = inject(DataService);
	public _textFilter$: Subject<string> = new Subject<string>();
	public textFilter: Signal<string | undefined> = toSignal(this._textFilter$);

	public todos: Signal<Array<Todo> | undefined> = toSignal(
		this.dataService.getUserData$().pipe(
			switchMap((user) =>
				user.isAdmin ?
					this._textFilter$.pipe(switchMap(textFilter => this.dataService.getData$(textFilter)))
					: this.dataService.getData$())
		)
	);

	public updateTextFilter(textFilter: string): void {
		this._textFilter$.next(textFilter);
	}
}
