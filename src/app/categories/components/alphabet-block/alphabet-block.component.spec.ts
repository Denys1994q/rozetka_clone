import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlphabetBlockComponent } from './alphabet-block.component';

describe('AlphabetBlockComponent', () => {
  let component: AlphabetBlockComponent;
  let fixture: ComponentFixture<AlphabetBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlphabetBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlphabetBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
