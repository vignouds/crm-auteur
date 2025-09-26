package fr.vignouds.crmauteur.contact.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SpringDataContactRepository extends JpaRepository<ContactEntity, Long> {
    Optional<ContactEntity> findByEmail(String email);
}
