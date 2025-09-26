package fr.vignouds.crmauteur.contact.domain;

import java.util.Objects;

public class Contact {

    private final String name;
    private final Email email;

    public Contact(String name, Email email) {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("Name cannot be null or empty");
        }
        if (email == null) {
            throw new IllegalArgumentException("Email cannot be null");
        }
        this.name = name.trim();
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public Email getEmail() {
        return email;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Contact contact)) return false;
        return Objects.equals(email, contact.email); // unicité basée sur email
    }

    @Override
    public int hashCode() {
        return Objects.hash(email);
    }
}
