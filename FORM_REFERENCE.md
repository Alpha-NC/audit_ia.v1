# 📋 Référence Complète des Questions du Formulaire Audit IA

## 🎯 Informations Générales

| Champ | Description |
|-------|-------------|
| **Titre** | Audit IA – 10 Questions |
| **Brand** | Alpha No-Code |
| **Objectif** | Identifier rapidement vos points de friction, chiffrer un potentiel de gain, et proposer une première trajectoire |
| **Langue** | fr-FR (Français) |

---

## 📝 Section 1 : Contexte de l'entreprise

### Question 1 : Nombre de personnes
- **ID** : `q1_people`
- **Label** : Combien de personnes travaillent actuellement dans votre entreprise (vous inclus) ?
- **Type** : Number
- **Unité** : personnes
- **Placeholder** : Ex. : 1, 7, 25…
- **Obligatoire** : Oui
- **Min** : 0
- **Step** : 1

### Question 2 : Domaine d'activité
- **ID** : `q2_domain`
- **Label** : Quel est le domaine principal de votre activité ?
- **Type** : Text
- **Placeholder** : Ex. : artisanat, agence marketing, cabinet HSE…
- **Obligatoire** : Oui

### Question 3 : Difficultés opérationnelles
- **ID** : `q3_pains`
- **Label** : Quelles sont aujourd'hui les trois principales difficultés opérationnelles ?
- **Type** : Textarea
- **Rows** : 4
- **Placeholder** : Ex. : gestion du temps, prospection, suivi client…
- **Obligatoire** : Oui

---

## 🔧 Section 2 : Vos processus actuels

### Question 4 : Heures de tâches répétitives
- **ID** : `q4_hours`
- **Label** : Combien d'heures par semaine consacrez-vous à des tâches répétitives ?
- **Type** : Number
- **Unité** : h / semaine
- **Placeholder** : Ex. : 2,5
- **Obligatoire** : Oui
- **Min** : 0
- **Step** : 0.5

### Question 5 : Solutions d'automatisation actuelles
- **ID** : `q5_automation_tools`
- **Label** : Utilisez-vous déjà des solutions ou logiciels d'automatisation ? Si oui, lesquels ?
- **Type** : Textarea
- **Rows** : 3
- **Placeholder** : Ex. : Zapier, Make, n8n, règles Gmail, macros Excel…
- **Obligatoire** : Non

### Question 6 : Outils principaux
- **ID** : `q6_main_tools`
- **Label** : Quels sont vos outils principaux (CRM, comptabilité, communication, gestion de projet…) ?
- **Type** : Textarea
- **Rows** : 3
- **Placeholder** : Ex. : HubSpot, Sage, Notion, Google Drive, WhatsApp, Trello…
- **Obligatoire** : Non

---

## 🤖 Section 3 : Vos besoins en IA

### Question 7 : Test d'outil IA
- **ID** : `q7_ai_tested`
- **Label** : Avez-vous déjà testé un outil d'intelligence artificielle (comme ChatGPT) ?
- **Type** : Radio
- **Options** :
  - `oui` : Oui
  - `non` : Non
- **Obligatoire** : Oui

### Question 7.1 : Utilisation de l'IA (conditionnelle)
- **ID** : `q7_ai_usage`
- **Label** : Si oui, pour quelle utilisation ?
- **Type** : Textarea
- **Rows** : 3
- **Placeholder** : Ex. : rédiger des emails, faire des devis, générer des idées…
- **Obligatoire** : Non
- **Condition** : Affichée si `q7_ai_tested` = "oui"

### Question 8 : Première tâche à automatiser
- **ID** : `q8_first_task`
- **Label** : Quelle est la première tâche que vous aimeriez voir automatisée pour gagner du temps ou en efficacité ?
- **Type** : Textarea
- **Rows** : 4
- **Placeholder** : Ex. : relances impayés, suivi prospects, création de devis, planning…
- **Obligatoire** : Oui

### Question 9 : Budget mensuel
- **ID** : `q9_budget`
- **Label** : Quel budget seriez-vous prêt à investir chaque mois pour une solution d'automatisation par l'IA ?
- **Type** : Number
- **Unité** : € / mois
- **Placeholder** : Ex. : 149
- **Obligatoire** : Oui
- **Min** : 0
- **Step** : 10

---

## 🎯 Section 4 : Vos objectifs

### Question 10 : ROI attendu
- **ID** : `q10_roi`
- **Label** : Quel retour sur investissement (ROI) minimum attendez-vous pour considérer l'adoption de l'IA comme pertinente ?
- **Type** : Number
- **Unité** : %
- **Placeholder** : Ex. : 30
- **Obligatoire** : Oui
- **Min** : 0
- **Step** : 1

---

## 👤 Coordonnées

### Prénom
- **ID** : `contact_firstname`
- **Label** : Prénom
- **Type** : Text
- **Placeholder** : Votre prénom
- **Obligatoire** : Oui

### Nom
- **ID** : `contact_lastname`
- **Label** : Nom
- **Type** : Text
- **Placeholder** : Votre nom
- **Obligatoire** : Oui

### Téléphone
- **ID** : `contact_phone`
- **Label** : Téléphone
- **Type** : Tel
- **Placeholder** : 06 12 34 56 78
- **Obligatoire** : Oui

### Email
- **ID** : `contact_email`
- **Label** : Email
- **Type** : Email
- **Placeholder** : nom@domaine.com
- **Obligatoire** : Oui

### Entreprise
- **ID** : `company_name`
- **Label** : Entreprise
- **Type** : Text
- **Placeholder** : Nom de l'entreprise
- **Obligatoire** : Non

---

## 🔍 Champs de Tracking (Automatiques)

### Tracking de Base
- **submittedAt** : Date et heure de soumission (ISO 8601)
- **sessionId** : Identifiant unique de session
- **trackingTag** : Tag de suivi personnalisé

### Paramètres UTM
- **utmSource** / **utm_source** : Source marketing (ex: google, facebook)
- **utmMedium** / **utm_medium** : Médium marketing (ex: cpc, email)
- **utmCampaign** / **utm_campaign** : Nom de la campagne
- **utmTerm** / **utm_term** : Terme de recherche
- **utmContent** / **utm_content** : Contenu spécifique

### Paramètres Additionnels
- **ref** : Référence externe
- **variant** : Variante du formulaire (A/B testing)

---

## 📤 Configuration de Soumission

### Endpoint
```
https://n8n.srv1159833.hstgr.cloud/webhook/audit-ia?token=Vn3pK8tQm2Yx7Lw9aR4cJ6uZ1sF5hD0eGqB3nP7rT9wX2kM
```

### Méthode
- **HTTP Method** : POST
- **Content-Type** : application/json

### Exemple de Payload JSON

```json
{
  "company_name": "Alpha No-Code SARL",
  "contact_firstname": "Jean",
  "contact_lastname": "Dupont",
  "contact_email": "jean.dupont@alphanocode.com",
  "contact_phone": "+33612345678",
  "contact_name": "Jean Dupont",
  "q1_people": 5,
  "q2_domain": "Agence digitale",
  "q3_pains": "Gestion du temps, prospection, suivi client",
  "q4_hours": 10,
  "q5_automation_tools": "Zapier, Make",
  "q6_main_tools": "HubSpot, Notion, Google Drive",
  "q7_ai_tested": "oui",
  "q7_ai_usage": "Rédaction emails, génération idées",
  "q8_first_task": "Relances automatiques des impayés",
  "q9_budget": 249,
  "q10_roi": 50,
  "biggestChallenge": "Automatiser la prospection",
  "submittedAt": "2026-01-02T15:30:00Z",
  "sessionId": "sess_abc123xyz",
  "trackingTag": "landing-v2",
  "ref": "newsletter-jan",
  "variant": "variant-a",
  "utmSource": "google",
  "utmMedium": "cpc",
  "utmCampaign": "audit-ia-launch-2026",
  "utmTerm": "automatisation ia",
  "utmContent": "cta-blue"
}
```

---

## 📊 Résumé Statistique

| Catégorie | Nombre |
|-----------|--------|
| **Sections** | 4 |
| **Questions** | 10 (+ 1 conditionnelle) |
| **Champs de contact** | 5 |
| **Champs de tracking** | 8 |
| **Total champs** | 24+ |
| **Champs obligatoires** | 8 |
| **Champs optionnels** | 16+ |

---

## 🎨 Message de Succès

### Titre
**Étape suivante**

### Sous-titre
Bravo — vous êtes officiellement sur la bonne voie du changement.

### Texte
Après réception du questionnaire, vous recevrez un plan d'action clair et personnalisé pour intégrer l'IA simplement, efficacement et de façon mesurable.

---

## 📝 Notes pour les Développeurs

### Champs Calculés
- **contact_name** : Concaténation de `contact_firstname` + `contact_lastname`
- **biggestChallenge** : Peut provenir de `q3_pains` ou `q8_first_task`

### Formats Spéciaux
- **Dates** : ISO 8601 (ex: `2026-01-02T15:30:00Z`)
- **Téléphone** : Format international recommandé (ex: `+33612345678`)
- **Email** : Validation HTML5

### Tracking
- **includeReferrer** : Oui
- **includeUserAgent** : Oui
- **includeAllParams** : Non (whitelist seulement)

### Paramètres Autorisés
```json
[
  "utm_source", "utm_medium", "utm_campaign",
  "utm_content", "utm_term",
  "source", "campaign", "medium", "content", "term",
  "ref", "variant", "token"
]
```

---

**Version** : 1.0.0  
**Date** : 2026-01-02  
**Source** : schema.json (Alpha-NC/audit_ia.v1)
