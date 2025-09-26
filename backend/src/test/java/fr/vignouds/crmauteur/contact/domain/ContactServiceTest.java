package fr.vignouds.crmauteur.contact.domain;

import fr.vignouds.crmauteur.contact.domain.ports.out.ContactRepository;
import fr.vignouds.crmauteur.shared.DomainException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ContactServiceTest {

    private ContactRepository repository;
    private ContactService service;

    @BeforeEach
    void setUp() {
        repository = mock(ContactRepository.class);
        service = new ContactService(repository);
    }

    @Test
    void shouldCreateNewContact() {
        when(repository.findByEmail(new Email("alice@example.com")))
                .thenReturn(Optional.empty());
        when(repository.save(any(Contact.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        Contact contact = service.createContact("Alice", "alice@example.com");

        assertEquals("Alice", contact.getName());
        assertEquals("alice@example.com", contact.getEmail().getValue());
        verify(repository).save(contact);
    }

    @Test
    void shouldThrowWhenContactAlreadyExists() {
        Email email = new Email("bob@example.com");
        when(repository.findByEmail(email)).thenReturn(Optional.of(new Contact("Bob", email)));

        assertThrows(DomainException.class,
                () -> service.createContact("Bob", "bob@example.com"));
    }
}
