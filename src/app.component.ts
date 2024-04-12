import {
	ImperativeComponentComponent
} from "./imperative-component/imperative-component.component";
import {DataService} from "./data-service.service";
import {BehaviorSubject, delay, Observable, Subject} from "rxjs";
import {AsyncPipe, CommonModule} from "@angular/common";
import {Component, inject} from "@angular/core";

@Component({
	selector: 'app-root',
	standalone: true, imports: [ImperativeComponentComponent, CommonModule],
	template: `
      <h2>
          <button (click)="toggleUserType()">Toggle</button>
          Current User: {{dataService.mockIsAdmin ? 'Admin' : 'Normal user'}}
      </h2>

      <ng-container *ngIf="showComponents$ | async">
          <app-imperative-component></app-imperative-component>
      </ng-container>
  `,
})
export class AppComponent {
	name = 'Angular';
	public dataService: DataService = inject(DataService);

	// needed to force a new creaton of components
	// in normal app you can't change user logged in during the app run
	private _showComponents$: Subject<boolean> = new BehaviorSubject<boolean>(true);
	public showComponents$: Observable<boolean> = this._showComponents$.pipe(delay(10))

	public toggleUserType(){
		this.dataService.mockIsAdmin = !this.dataService.mockIsAdmin;
		this.reloadComponents();
	}

	public reloadComponents(): void{
		this._showComponents$.next(false);
		this._showComponents$.next(true);
	}
}
