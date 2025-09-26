package fr.vignouds.crmauteur.contact.domain;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class EmailTest {

    @Test
    void shouldAcceptValidEmail() {
        Email email = new Email("alice@example.com");
        assertEquals("alice@example.com", email.getValue());
    }

    @Test
    void shouldRejectInvalidEmail() {
        assertThrows(IllegalArgumentException.class,
                () -> new Email("not-an-email"));
    }

    @Test
    void shouldRejectNullEmail() {
        assertThrows(IllegalArgumentException.class,
                () -> new Email(null));
    }

    @Test
    void shouldRejectEmptyEmail() {
        assertThrows(IllegalArgumentException.class,
                () -> new Email("   "));
    }
}
