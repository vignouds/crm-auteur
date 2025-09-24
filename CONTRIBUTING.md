# Contributing Guidelines

Merci de ton intérêt pour ce projet 👋  
Ce dépôt est principalement un terrain d’expérimentation autour de **TDD, DDD, architecture hexagonale et Software Craftsmanship**.  

Même si le projet est personnel, ce document décrit les pratiques de contribution afin de garder un workflow clair et rigoureux.

---

## 🧭 Workflow Git

Ce projet suit le modèle **Git Flow simplifié** :

- **main** : contient les versions stables, prêtes à être livrées.  
- **develop** : branche d’intégration pour les développements en cours.  
- **feature/** : une branche par fonctionnalité (ex. `feature/ajout-contact`).  
- **release/** : branches de préparation de release (optionnel si besoin).  
- **hotfix/** : correctifs urgents à partir de `main`.  

---

## ✅ Règles de commit

- Les messages de commit doivent être **clairs et concis**.  
- Format recommandé :  

Exemples :  
- `feat: ajout du use case AjouterContact`  
- `test: ajout de tests unitaires pour Email`  
- `fix: correction validation email invalide`  
- `docs: ajout glossaire DDD`  

---

## 🧪 Tests

- Les contributions doivent inclure des **tests unitaires JUnit 5** (TDD).  
- La logique métier (domaine) doit rester **indépendante des frameworks**.  

---

## 📚 Documentation

- Les livrables DDD sont placés dans le dossier `/docs/`.  
- Merci de maintenir la documentation à jour en même temps que le code.  

---

## 🐳 Docker & Setup

- L’application se lance avec `docker-compose up`.  
- La base de données (PostgreSQL) et les migrations (Liquibase) doivent tourner automatiquement.  

---

## 🎯 Objectif pédagogique

Ce projet sert à illustrer des **bonnes pratiques de conception et de code**.  
La priorité est donnée à la **qualité, la lisibilité et la testabilité** du code.
