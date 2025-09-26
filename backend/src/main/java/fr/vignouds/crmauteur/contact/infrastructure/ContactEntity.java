package fr.vignouds.crmauteur.contact.infrastructure;

import fr.vignouds.crmauteur.contact.domain.Contact;
import fr.vignouds.crmauteur.contact.domain.Email;
import jakarta.persistence.*;

@Entity
@Table(name = "contact")
public class ContactEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false, unique = true)
    private String email;

    protected ContactEntity() {
        // constructeur JPA
    }

    public ContactEntity(String name, String email) {
        this.name = name;
        this.email = email;
    }

    public static ContactEntity fromDomain(Contact contact) {
        return new ContactEntity(contact.getName(), contact.getEmail().getValue());
    }

    public Contact toDomain() {
        return new Contact(name, new Email(email));
    }
}
