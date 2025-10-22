import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { ContactsStore } from './contacts.store';
import { ContactsApi, ContactDto } from './contacts.api';
import { CreateContactPayload } from './contact.model';

describe('ContactsStore', () => {
  let store: ContactsStore;
  let api: jasmine.SpyObj<ContactsApi>;

  const dto: ContactDto = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
  };

  beforeEach(() => {
    api = jasmine.createSpyObj<ContactsApi>('ContactsApi', ['list', 'create']);

    TestBed.configureTestingModule({
      providers: [{ provide: ContactsApi, useValue: api }, ContactsStore],
    });

    store = TestBed.inject(ContactsStore);
  });

  it('loads contacts on success', () => {
    api.list.and.returnValue(of([dto]));

    store.loadAll();

    expect(store.contacts()).toEqual([
      {
        id: dto.id,
        name: dto.name,
        email: dto.email,
      },
    ]);
    expect(store.error()).toBeNull();
    expect(store.isLoading()).toBeFalse();
    expect(store.hasLoaded()).toBeTrue();
  });

  it('exposes an error when loading fails', () => {
    api.list.and.returnValue(
      throwError(() => new HttpErrorResponse({ status: 500, statusText: 'Server error' }))
    );

    store.loadAll();

    expect(store.contacts()).toEqual([]);
    expect(store.error()).toContain('Server error');
    expect(store.hasLoaded()).toBeFalse();
  });

  it('appends a contact on creation success', () => {
    api.list.and.returnValue(of([]));
    api.create.and.returnValue(of(dto));

    store.loadAll();
    store.create(payloadFrom(dto));

    expect(store.contacts()).toHaveSize(1);
    expect(store.creationStatus()).toBe('success');
    expect(store.creationError()).toBeNull();
  });

  it('exposes an error when creation fails', () => {
    api.list.and.returnValue(of([]));
    api.create.and.returnValue(
      throwError(() => new HttpErrorResponse({ status: 400, statusText: 'Bad request' }))
    );

    store.loadAll();
    store.create(payloadFrom(dto));

    expect(store.contacts()).toEqual([]);
    expect(store.creationStatus()).toBe('error');
    expect(store.creationError()).toContain('Bad request');
  });

  function payloadFrom(contact: ContactDto): CreateContactPayload {
    return {
      name: contact.name,
      email: contact.email,
    };
  }
});
