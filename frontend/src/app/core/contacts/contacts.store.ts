import { HttpErrorResponse } from '@angular/common/http';
import { DestroyRef, inject, Injectable, signal, Signal } from '@angular/core';
import { EMPTY } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Contact, CreateContactPayload } from './contact.model';
import { ContactsApi } from './contacts.api';
import { ContactsMapper } from './contacts.mapper';

type CreationStatus = 'idle' | 'pending' | 'success' | 'error';

@Injectable({ providedIn: 'root' })
export class ContactsStore {
  private readonly api = inject(ContactsApi);
  private readonly mapper = inject(ContactsMapper);
  private readonly destroyRef = inject(DestroyRef);

  private readonly contactsSignal = signal<Contact[]>([]);
  private readonly loadingSignal = signal(false);
  private readonly errorSignal = signal<string | null>(null);
  private readonly hasLoadedSignal = signal(false);

  private readonly creationStatusSignal = signal<CreationStatus>('idle');
  private readonly creationErrorSignal = signal<string | null>(null);

  readonly contacts: Signal<Contact[]> = this.contactsSignal.asReadonly();
  readonly isLoading: Signal<boolean> = this.loadingSignal.asReadonly();
  readonly error: Signal<string | null> = this.errorSignal.asReadonly();
  readonly hasLoaded: Signal<boolean> = this.hasLoadedSignal.asReadonly();

  readonly creationStatus: Signal<CreationStatus> = this.creationStatusSignal.asReadonly();
  readonly creationError: Signal<string | null> = this.creationErrorSignal.asReadonly();

  loadAll(): void {
    if (this.loadingSignal()) {
      return;
    }

    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.api
      .list()
      .pipe(
        tap((dtos) => {
          this.contactsSignal.set(this.mapper.toModels(dtos));
          this.hasLoadedSignal.set(true);
        }),
        catchError((error: unknown) => {
          this.errorSignal.set(this.toReadableError(error));
          this.hasLoadedSignal.set(false);
          return EMPTY;
        }),
        finalize(() => this.loadingSignal.set(false)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  ensureLoaded(): void {
    if (!this.hasLoadedSignal()) {
      this.loadAll();
    }
  }

  reload(): void {
    this.hasLoadedSignal.set(false);
    this.loadAll();
  }

  create(payload: CreateContactPayload): void {
    if (this.creationStatusSignal() === 'pending') {
      return;
    }

    this.creationStatusSignal.set('pending');
    this.creationErrorSignal.set(null);

    this.api
      .create(payload)
      .pipe(
        tap((dto) => {
          this.contactsSignal.update((contacts) => [...contacts, this.mapper.toModel(dto)]);
          this.creationStatusSignal.set('success');
        }),
        catchError((error: unknown) => {
          this.creationErrorSignal.set(this.toReadableError(error));
          this.creationStatusSignal.set('error');
          return EMPTY;
        }),
        finalize(() => {
          if (this.creationStatusSignal() === 'pending') {
            this.creationStatusSignal.set('idle');
          }
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  resetCreationState(): void {
    this.creationStatusSignal.set('idle');
    this.creationErrorSignal.set(null);
  }

  private toReadableError(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      const payloadMessage =
        typeof error.error === 'object' && error.error !== null && 'message' in error.error
          ? String((error.error as { message: unknown }).message)
          : undefined;
      return payloadMessage ?? error.message ?? 'Une erreur inattendue est survenue.';
    }

    if (error instanceof Error) {
      switch (error.message) {
        case 'INVALID_JSON_RESPONSE':
        case 'INVALID_CONTACTS_PAYLOAD':
        case 'INVALID_CONTACT_PAYLOAD':
          return 'Réponse inattendue du serveur contacts.';
        default:
          return error.message;
      }
    }

    return 'Une erreur inattendue est survenue.';
  }
}
