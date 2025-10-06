package fr.vignouds.crmauteur.contact.domain.ports.in;

import fr.vignouds.crmauteur.contact.domain.Contact;

import java.util.List;

public interface ListContactsUseCase {
    List<Contact> getAllContacts();
}

