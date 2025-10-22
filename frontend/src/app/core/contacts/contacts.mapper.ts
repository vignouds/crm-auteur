import { Injectable } from '@angular/core';

import { ContactDto } from './contacts.api';
import { Contact } from './contact.model';

@Injectable({ providedIn: 'root' })
export class ContactsMapper {
  toModel(dto: ContactDto): Contact {
    return {
      id: String(dto.id),
      name: dto.name,
      email: dto.email,
    };
  }

  toModels(dtos: ContactDto[]): Contact[] {
    return dtos.map((dto) => this.toModel(dto));
  }
}
