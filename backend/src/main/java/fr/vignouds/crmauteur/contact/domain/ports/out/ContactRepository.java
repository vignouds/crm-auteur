package fr.vignouds.crmauteur.contact.domain.ports.out;

import fr.vignouds.crmauteur.contact.domain.Contact;
import fr.vignouds.crmauteur.contact.domain.Email;

import java.util.Optional;

public interface ContactRepository {
    Optional<Contact> findByEmail(Email email);
    Contact save(Contact contact);
}
