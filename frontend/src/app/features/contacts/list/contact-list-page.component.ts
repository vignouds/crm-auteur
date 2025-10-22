import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, PLATFORM_ID, computed, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ContactsStore } from '@app/core/contacts/contacts.store';
import { ContactListTableComponent } from '../components/contact-list-table/contact-list-table.component';

@Component({
  selector: 'app-contact-list-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, ContactListTableComponent],
  templateUrl: './contact-list-page.component.html',
  styleUrls: ['./contact-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactListPageComponent implements OnInit {
  private readonly contactsStore = inject(ContactsStore);
  private readonly platformId = inject(PLATFORM_ID);

  readonly contacts = this.contactsStore.contacts;
  readonly isLoading = this.contactsStore.isLoading;
  readonly errorMessage = this.contactsStore.error;
  readonly hasError = computed(() => this.errorMessage() !== null);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.contactsStore.ensureLoaded();
    }
  }

  reload(): void {
    this.contactsStore.reload();
  }
}
