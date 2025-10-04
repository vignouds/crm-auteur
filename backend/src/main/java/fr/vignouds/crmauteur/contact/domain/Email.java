package fr.vignouds.crmauteur.contact.domain;

import fr.vignouds.crmauteur.shared.DomainException;
import fr.vignouds.crmauteur.shared.ErrorCode;

import java.util.Objects;
import java.util.regex.Pattern;

public class Email {

    private static final Pattern EMAIL_REGEX =
            Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$");

    private final String value;

    public Email(String value) {
        if (value == null || value.isBlank()) {
            throw new DomainException(ErrorCode.INVALID_EMAIL, "L'email ne peut pas être nul ou vide");
        }
        if (!EMAIL_REGEX.matcher(value).matches()) {
            throw new DomainException(ErrorCode.INVALID_EMAIL, "Format email invalide : " + value);
        }
        this.value = value.toLowerCase().trim(); // normalisation
    }

    public String getValue() {
        return value;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Email email)) return false;
        return Objects.equals(value, email.value);
    }

    @Override
    public int hashCode() {
        return Objects.hash(value);
    }

    @Override
    public String toString() {
        return value;
    }
}
