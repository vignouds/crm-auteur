# Cas d'usage

## UC1 : Ajouter un contact
**Acteur** : l’auteur (utilisateur du CRM).  

**But** : enregistrer un nouveau contact dans le système.  

**Préconditions** :  
- L’email fourni doit être valide.  
- Aucun autre contact avec le même email ne doit déjà exister.  

**Scénario nominal** :  
1. L’auteur saisit le nom et l’email du contact.  
2. Le système vérifie la validité de l’email.  
3. Le système vérifie l’unicité de l’email.  
4. Le système enregistre le nouveau contact.  
5. Le système confirme l’ajout.  

**Exceptions** :  
- Si l’email est invalide → erreur “Email invalide”.  
- Si l’email existe déjà → erreur “Contact déjà existant”.  

# UC2 : Afficher l’ensemble des contacts
**Acteur :** Auteur (utilisateur du CRM)  
**But :** Consulter la liste complète des contacts enregistrés  

### Scénario nominal
1. L’auteur ouvre la page “Contacts”.
2. Le système récupère tous les contacts depuis le domaine.
3. Le système renvoie la liste.
4. Le front affiche les résultats.

### Exceptions
- Aucun contact → liste vide.

### Interface
`GET /api/contacts`
Réponse :
```json
[
  {"name": "Alice", "email": "alice@example.com"},
  {"name": "Bob", "email": "bob@example.com"}
]

