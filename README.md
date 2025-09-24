# Mini-CRM Auteur

Un projet personnel servant de terrain d’entraînement aux bonnes pratiques de **Software Craftsmanship** :  
- **TDD (Test-Driven Development)**  
- **DDD (Domain-Driven Design)**  
- **Architecture hexagonale (Ports & Adapters)**  
- **Clean Code & principes SOLID**

Le but est de construire un **mini-CRM** adapté aux besoins d’un auteur autoédité :  
- Gérer ses **contacts** (lecteurs, chroniqueurs, partenaires).  
- Créer des **segments** pour cibler des groupes.  
- Planifier et suivre des **campagnes** d’emails.  

Ce dépôt est public afin de montrer la démarche et les pratiques de développement.

---

## 🚀 Stack technique

- **Java 21 (LTS)** – langage principal  
- **Spring Boot 3.x (Spring 6)** – backend REST  
- **Angular 18** – frontend SPA (interface utilisateur)  
- **PostgreSQL 16 (LTS)** – base de données relationnelle  
- **Liquibase** – gestion des migrations de schéma  
- **JUnit 5** – tests unitaires et TDD  
- **Docker & Docker Compose** – conteneurisation (DB + services)  
- **Maven** – build et gestion des dépendances  

---

## 🏗️ Architecture

Le projet suit l’**architecture hexagonale** :  

- **Domaine** : logique métier pure (entités, value objects, agrégats, règles).  
- **Application** : cas d’usage (services applicatifs), définit les ports.  
- **Infrastructure** : implémentations techniques (JPA/PostgreSQL, REST controllers, SMTP…).  
- **Adapters** : branchent le domaine aux détails techniques.  

```text
[ Frontend Angular ] → [ REST API (ports entrants) ] → [ Application Layer ]
                                                     → [ Domain Layer ]
[ PostgreSQL / SMTP ] ← [ Adapters (ports sortants) ]
