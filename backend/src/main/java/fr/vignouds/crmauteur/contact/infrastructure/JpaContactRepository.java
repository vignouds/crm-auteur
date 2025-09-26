package fr.vignouds.crmauteur.contact.infrastructure;

import fr.vignouds.crmauteur.contact.domain.Contact;
import fr.vignouds.crmauteur.contact.domain.Email;
import fr.vignouds.crmauteur.contact.domain.ports.out.ContactRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class JpaContactRepository implements ContactRepository {

    private final SpringDataContactRepository jpaRepo;

    public JpaContactRepository(SpringDataContactRepository jpaRepo) {
        this.jpaRepo = jpaRepo;
    }

    @Override
    public Optional<Contact> findByEmail(Email email) {
        return jpaRepo.findByEmail(email.getValue())
                .map(ContactEntity::toDomain);
    }

    @Override
    public Contact save(Contact contact) {
        ContactEntity entity = ContactEntity.fromDomain(contact);
        return jpaRepo.save(entity).toDomain();
    }
}
