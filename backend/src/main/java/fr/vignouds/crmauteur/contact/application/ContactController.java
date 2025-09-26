package fr.vignouds.crmauteur.contact.application;

import fr.vignouds.crmauteur.contact.domain.Contact;
import fr.vignouds.crmauteur.contact.domain.ports.in.CreateContactUseCase;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contacts")
public class ContactController {

    private final CreateContactUseCase createContactUseCase;

    public ContactController(CreateContactUseCase createContactUseCase) {
        this.createContactUseCase = createContactUseCase;
    }

    @PostMapping
    public ResponseEntity<ContactResponse> createContact(@RequestBody CreateContactRequest request) {
        Contact contact = createContactUseCase.createContact(request.name(), request.email());
        return ResponseEntity.ok(new ContactResponse(contact.getName(), contact.getEmail().getValue()));
    }

    public record CreateContactRequest(String name, String email) {}
    public record ContactResponse(String name, String email) {}
}
