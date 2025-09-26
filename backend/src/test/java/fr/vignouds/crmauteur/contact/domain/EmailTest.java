package fr.vignouds.crmauteur.contact.domain;

import fr.vignouds.crmauteur.shared.DomainException;
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
        assertThrows(DomainException.class,
                () -> new Email("not-an-email"));
    }

    @Test
    void shouldRejectNullEmail() {
        assertThrows(DomainException.class,
                () -> new Email(null));
    }

    @Test
    void shouldRejectEmptyEmail() {
        assertThrows(DomainException.class,
                () -> new Email("   "));
    }
}
