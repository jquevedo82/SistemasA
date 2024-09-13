import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSweetComponent } from './modal-sweet.component';

describe('ModalSweetComponent', () => {
  let component: ModalSweetComponent;
  let fixture: ComponentFixture<ModalSweetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalSweetComponent]
    });
    fixture = TestBed.createComponent(ModalSweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
