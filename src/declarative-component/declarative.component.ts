import {Component, inject, Signal} from '@angular/core';
import {DataService, Item, User} from "../data-service.service";
import {map, Observable, share, Subject, switchMap, tap} from "rxjs";
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

	public userData$: Observable<User> = this.dataService.getUserData$().pipe(share());
	public isAdmin: Signal<boolean | undefined> = toSignal(this.userData$.pipe(map(userData => userData.isAdmin)));

	public items: Signal<Array<Item> | undefined> = toSignal(
		this.userData$.pipe(
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
