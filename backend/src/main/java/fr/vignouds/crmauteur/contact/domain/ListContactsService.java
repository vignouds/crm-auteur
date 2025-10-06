package fr.vignouds.crmauteur.contact.domain;

import fr.vignouds.crmauteur.contact.domain.ports.in.ListContactsUseCase;
import fr.vignouds.crmauteur.contact.domain.ports.out.ContactRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ListContactsService implements ListContactsUseCase {

    private final ContactRepository repository;

    public ListContactsService(ContactRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Contact> getAllContacts() {
        return repository.getAll();
    }
}
