import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotePercentComponent } from './vote-percent.component';

describe('VotePercentComponent', () => {
  let component: VotePercentComponent;
  let fixture: ComponentFixture<VotePercentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VotePercentComponent]
    });
    fixture = TestBed.createComponent(VotePercentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
