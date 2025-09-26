package fr.vignouds.crmauteur.contact.domain;

import fr.vignouds.crmauteur.contact.domain.ports.in.CreateContactUseCase;
import fr.vignouds.crmauteur.contact.domain.ports.out.ContactRepository;
import fr.vignouds.crmauteur.shared.DomainException;
import fr.vignouds.crmauteur.shared.ErrorCode;
import org.springframework.stereotype.Service;

@Service
public class ContactService implements CreateContactUseCase {

    private final ContactRepository repository;

    public ContactService(ContactRepository repository) {
        this.repository = repository;
    }

    @Override
    public Contact createContact(String name, String email) {
        Email vo = new Email(email);

        repository.findByEmail(vo).ifPresent(c -> {
            throw new DomainException(ErrorCode.CONTACT_ALREADY_EXISTS, "Contact déjà existant avec l'email: " + email);
        });

        Contact contact = new Contact(name, vo);
        return repository.save(contact);
    }
}
