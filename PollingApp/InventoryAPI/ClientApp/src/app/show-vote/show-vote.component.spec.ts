import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowVoteComponent } from './show-vote.component';

describe('ShowVoteComponent', () => {
  let component: ShowVoteComponent;
  let fixture: ComponentFixture<ShowVoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowVoteComponent]
    });
    fixture = TestBed.createComponent(ShowVoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
