package fr.vignouds.crmauteur.contact.domain.ports.in;

import fr.vignouds.crmauteur.contact.domain.Contact;

public interface CreateContactUseCase {
    Contact createContact(String name, String email);
}

