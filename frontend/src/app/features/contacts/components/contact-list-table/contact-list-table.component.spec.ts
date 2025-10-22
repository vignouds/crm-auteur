import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { ContactListTableComponent } from './contact-list-table.component';
import { Contact } from '@app/core/contacts/contact.model';

describe('ContactListTableComponent', () => {
  let fixture: ComponentFixture<ContactListTableComponent>;
  let component: ContactListTableComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactListTableComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactListTableComponent);
    component = fixture.componentInstance;
  });

  it('renders rows for provided contacts', () => {
    const contacts: Contact[] = [
      { id: '1', name: 'Ada Lovelace', email: 'ada@example.com' },
      { id: '2', name: 'Alan Turing', email: 'alan@example.com' },
    ];

    fixture.componentRef.setInput('contacts', contacts);
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tr.mat-mdc-row'));
    expect(rows.length).toBe(contacts.length);
    expect(rows[0].nativeElement.textContent).toContain('Ada Lovelace');
    expect(rows[1].nativeElement.textContent).toContain('alan@example.com');
  });

  it('shows loading state', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Chargement en cours');
  });

  it('shows the provided error message and emits reload on click', () => {
    const reloadSpy = jasmine.createSpy('reload');
    component.reload.subscribe(reloadSpy);

    fixture.componentRef.setInput('error', true);
    fixture.componentRef.setInput('errorMessage', 'Oops');
    fixture.detectChanges();

    const state = fixture.debugElement.query(By.css('.contact-table__state--error'));
    expect(state.nativeElement.textContent).toContain('Oops');

    state.query(By.css('button')).nativeElement.click();
    expect(reloadSpy).toHaveBeenCalled();
  });
});
