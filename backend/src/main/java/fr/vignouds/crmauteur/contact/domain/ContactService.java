package fr.vignouds.crmauteur.contact.domain;

import fr.vignouds.crmauteur.contact.domain.ports.in.CreateContactUseCase;
import fr.vignouds.crmauteur.contact.domain.ports.out.ContactRepository;

public class ContactService implements CreateContactUseCase {

    private final ContactRepository repository;

    public ContactService(ContactRepository repository) {
        this.repository = repository;
    }

    @Override
    public Contact createContact(String name, String email) {
        Email vo = new Email(email);

        repository.findByEmail(vo).ifPresent(c -> {
            throw new IllegalArgumentException("Contact already exists with email: " + email);
        });

        Contact contact = new Contact(name, vo);
        return repository.save(contact);
    }
}
