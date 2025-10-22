import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { ContactFormComponent, ContactFormValue } from './contact-form.component';

describe('ContactFormComponent', () => {
  let fixture: ComponentFixture<ContactFormComponent>;
  let component: ContactFormComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactFormComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('emits submitted event with form value when valid', () => {
    const emitted: ContactFormValue[] = [];
    component.submitted.subscribe((value) => emitted.push(value));

    component.form.setValue({
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
    });

    component.submit();

    expect(emitted).toEqual([
      {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
      },
    ]);
  });

  it('marks controls as touched when invalid submit', () => {
    expect(component.form.invalid).toBeTrue();

    component.submit();

    expect(component.form.controls.name.touched).toBeTrue();
    expect(component.form.controls.email.touched).toBeTrue();
  });

  it('resets the form and emits cancel event', () => {
    const cancelledSpy = jasmine.createSpy('cancelled');
    component.cancelled.subscribe(cancelledSpy);

    component.form.setValue({
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
    });

    component.cancel();

    expect(component.form.value).toEqual({
      name: '',
      email: '',
    });
    expect(cancelledSpy).toHaveBeenCalled();
  });

  it('computes disableSubmit from pending and validity', () => {
    expect(component.disableSubmit()).toBeTrue();

    component.form.setValue({
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
    });

    expect(component.disableSubmit()).toBeFalse();

    fixture.componentRef.setInput('pending', true);
    fixture.detectChanges();
    expect(component.disableSubmit()).toBeTrue();
  });
});
