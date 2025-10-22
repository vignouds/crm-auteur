import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { CreateContactPayload } from './contact.model';

export interface ContactDto {
  id: string | number;
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class ContactsApi {
  private readonly http = inject(HttpClient);
  private readonly resourceUrl = 'https://localhost:8080/api/contacts';

  list(): Observable<ContactDto[]> {
    return this.http
      .get(this.resourceUrl, { responseType: 'text' })
      .pipe(map((body) => this.parseAsArray(body)));
  }

  create(payload: CreateContactPayload): Observable<ContactDto> {
    return this.http
      .post(this.resourceUrl, payload, { responseType: 'text' })
      .pipe(map((body) => this.parseAsObject(body)));
  }

  private parseAsArray(body: string): ContactDto[] {
    const parsed = this.parseJson(body);
    if (!Array.isArray(parsed)) {
      throw new Error('INVALID_CONTACTS_PAYLOAD');
    }
    return parsed as ContactDto[];
  }

  private parseAsObject(body: string): ContactDto {
    const parsed = this.parseJson(body);
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      throw new Error('INVALID_CONTACT_PAYLOAD');
    }
    return parsed as ContactDto;
  }

  private parseJson(body: string): unknown {
    try {
      return JSON.parse(body);
    } catch {
      throw new Error('INVALID_JSON_RESPONSE');
    }
  }
}
