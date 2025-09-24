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
