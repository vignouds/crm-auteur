package fr.vignouds.crmauteur.contact.domain;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ContactTest {

    @Test
    void shouldCreateContactWithNameAndEmail() {
        Email email = new Email("bob@example.com");
        Contact contact = new Contact("Bob", email);

        assertEquals("Bob", contact.getName());
        assertEquals(email, contact.getEmail());
    }

    @Test
    void shouldRejectNullName() {
        Email email = new Email("bob@example.com");
        assertThrows(IllegalArgumentException.class,
                () -> new Contact(null, email));
    }

    @Test
    void shouldRejectEmptyName() {
        Email email = new Email("bob@example.com");
        assertThrows(IllegalArgumentException.class,
                () -> new Contact("   ", email));
    }
}
