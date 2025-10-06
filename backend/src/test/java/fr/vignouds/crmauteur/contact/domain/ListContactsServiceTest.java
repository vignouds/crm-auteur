package fr.vignouds.crmauteur.contact.domain;

import fr.vignouds.crmauteur.contact.domain.ports.out.ContactRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;

class ListContactsServiceTest {

    private ContactRepository repository;
    private ListContactsService service;

    @BeforeEach
    void setUp() {
        repository = mock(ContactRepository.class);
        service = new ListContactsService(repository);
    }

    @Test
    void shouldReturnAllContacts() {
        var expected = List.of(
                new Contact("Alice", new Email("alice@example.com")),
                new Contact("Bob", new Email("bob@example.com"))
        );

        Mockito.when(repository.getAll()).thenReturn(expected);

        var response = service.getAllContacts();

        assertThat(response).hasSize(2);
        assertThat(response.getFirst().getName()).isEqualTo("Alice");
    }
}
