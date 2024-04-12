import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImperativeComponentComponent } from './imperative-component.component';

describe('ImperativeComponentComponent', () => {
  let component: ImperativeComponentComponent;
  let fixture: ComponentFixture<ImperativeComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImperativeComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImperativeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
