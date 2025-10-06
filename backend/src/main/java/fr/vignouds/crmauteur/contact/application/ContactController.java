package fr.vignouds.crmauteur.contact.application;

import fr.vignouds.crmauteur.contact.domain.Contact;
import fr.vignouds.crmauteur.contact.domain.ports.in.CreateContactUseCase;
import fr.vignouds.crmauteur.contact.domain.ports.in.ListContactsUseCase;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contacts")
public class ContactController {

    private final CreateContactUseCase createContactUseCase;
    private final ListContactsUseCase listContactsUseCase;

    public ContactController(CreateContactUseCase createContactUseCase, ListContactsUseCase listContactsUseCase) {
        this.createContactUseCase = createContactUseCase;
        this.listContactsUseCase = listContactsUseCase;
    }

    @PostMapping
    public ResponseEntity<ContactResponse> createContact(@RequestBody CreateContactRequest request) {
        Contact contact = createContactUseCase.createContact(request.name(), request.email());
        return ResponseEntity.ok(new ContactResponse(contact.getName(), contact.getEmail().getValue()));
    }

    @GetMapping
    public ResponseEntity<List<ContactResponse>> getAllContacts() {
        return ResponseEntity.ok(
                listContactsUseCase.getAllContacts()
                        .stream()
                        .map(contact -> new ContactResponse(contact.getName(), contact.getEmail().getValue()))
                        .toList()
        );
    }

    public record CreateContactRequest(String name, String email) {}
    public record ContactResponse(String name, String email) {}
}
