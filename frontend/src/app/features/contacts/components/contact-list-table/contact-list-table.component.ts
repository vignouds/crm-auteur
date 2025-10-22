import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { Contact } from '@app/core/contacts/contact.model';

@Component({
  selector: 'app-contact-list-table',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './contact-list-table.component.html',
  styleUrls: ['./contact-list-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactListTableComponent {
  readonly contacts = input<Contact[]>([]);
  readonly loading = input(false);
  readonly error = input(false);
  readonly errorMessage = input<string | null>(null);

  readonly reload = output<void>();
  readonly displayedColumns: readonly string[] = ['name', 'email'];

  handleReload(): void {
    this.reload.emit();
  }
}
