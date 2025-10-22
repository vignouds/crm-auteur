import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { ContactsStore } from '@app/core/contacts/contacts.store';
import {
  ContactFormComponent,
  ContactFormValue,
} from '../components/contact-form/contact-form.component';

@Component({
  selector: 'app-contact-create-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, ContactFormComponent],
  templateUrl: './contact-create-page.component.html',
  styleUrls: ['./contact-create-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactCreatePageComponent {
  private readonly contactsStore = inject(ContactsStore);
  private readonly router = inject(Router);

  readonly isSubmitting = computed(() => this.contactsStore.creationStatus() === 'pending');
  readonly submitError = this.contactsStore.creationError;

  constructor() {
    effect(
      () => {
        if (this.contactsStore.creationStatus() === 'success') {
          void this.router.navigate(['/contacts']);
          this.contactsStore.resetCreationState();
        }
      },
      { allowSignalWrites: true }
    );
  }

  createContact(formValue: ContactFormValue): void {
    this.contactsStore.create(formValue);
  }

  resetForm(): void {
    this.contactsStore.resetCreationState();
  }
}
