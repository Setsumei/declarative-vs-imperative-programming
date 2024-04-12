import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
	public mockIsAdmin: boolean = true;

  public getUserData$(): Observable<User> {
    return this.mockIsAdmin
      ? of({
          name: 'admin',
          isAdmin: true,
        }).pipe(delay(200))
      : of({
          name: 'user',
          isAdmin: false,
        }).pipe(delay(200));
  }

  public getData$(filter?: string): Observable<Array<Todo>> {

	  if(this.mockIsAdmin && !filter){
		  throw Error('no filter!');
	  }

    return of([
      {
        userId: 1,
        id: 1,
        title: 'delectus aut autem',
        completed: false,
      },
      {
        userId: 1,
        id: 2,
        title: 'quis ut nam facilis et officia qui',
        completed: false,
      },
      {
        userId: 1,
        id: 3,
        title: 'fugiat veniam minus',
        completed: false,
      },
      {
        userId: 1,
        id: 4,
        title: 'et porro tempora',
        completed: true,
      },
      {
        userId: 1,
        id: 5,
        title:
          'laboriosam mollitia et enim quasi adipisci quia provident illum',
        completed: false,
      },
      {
        userId: 1,
        id: 6,
        title: 'qui ullam ratione quibusdam voluptatem quia omnis',
        completed: false,
      },
      {
        userId: 1,
        id: 7,
        title: 'illo expedita consequatur quia in',
        completed: false,
      },
    ].filter(
		(item) => !filter || Math.random() > 0.5
	)).pipe(delay(400));
  }
}

export interface User {
  name: string;
  isAdmin: boolean;
}

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
