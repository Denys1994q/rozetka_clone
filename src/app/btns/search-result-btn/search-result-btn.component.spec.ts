import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultBtnComponent } from './search-result-btn.component';

describe('SearchResultBtnComponent', () => {
  let component: SearchResultBtnComponent;
  let fixture: ComponentFixture<SearchResultBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchResultBtnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchResultBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
