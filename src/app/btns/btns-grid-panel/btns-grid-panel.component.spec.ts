import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnsGridPanelComponent } from './btns-grid-panel.component';

describe('BtnsGridPanelComponent', () => {
  let component: BtnsGridPanelComponent;
  let fixture: ComponentFixture<BtnsGridPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnsGridPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnsGridPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
