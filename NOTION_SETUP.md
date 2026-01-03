# 🎨 Guide de Configuration Notion - Base de Données Audit IA

## 📋 Objectif

Créer une base de données Notion optimisée pour recevoir et organiser les soumissions du formulaire **Audit IA**.

---

## 🏗️ Étape 1 : Créer la Base de Données

### Méthode 1 : Création Manuelle

1. Ouvrez Notion
2. Créez une nouvelle page : **"Audit IA - Leads"**
3. Tapez `/table` et sélectionnez **"Table - Inline"**
4. Une base de données vide sera créée

### Méthode 2 : Dupliquer un Template

Utilisez ce lien pour dupliquer un template pré-configuré :
```
[À venir - Template Notion public]
```

---

## 📊 Étape 2 : Configurer les Propriétés

Voici **TOUTES** les propriétés à créer avec leurs types exacts :

### Propriétés Obligatoires

#### 1. **Nom** (Title)
- **Type** : Title
- **Description** : Nom du lead (auto-rempli : company_name OU contact_name OU contact_email)
- **Configuration** : C'est la propriété titre par défaut, déjà présente

#### 2. **submittedAt**
- **Type** : Rich Text
- **Description** : Date et heure de soumission du formulaire
- **Exemple** : `2026-01-02T15:30:00Z`

#### 3. **sessionId**
- **Type** : Rich Text
- **Description** : Identifiant unique de la session
- **Exemple** : `sess_abc123xyz789`

#### 4. **trackingTag**
- **Type** : Rich Text
- **Description** : Tag de suivi personnalisé
- **Exemple** : `landing-page-v2`

#### 5. **company_name**
- **Type** : Rich Text
- **Description** : Nom de l'entreprise
- **Exemple** : `Alpha No-Code SARL`

#### 6. **contact_name**
- **Type** : Rich Text
- **Description** : Nom complet du contact
- **Exemple** : `Jean Dupont`

#### 7. **contact_email**
- **Type** : Email ⚠️
- **Description** : Email du contact
- **Exemple** : `jean.dupont@example.com`
- **Important** : Utilisez le type **Email**, pas Rich Text

#### 8. **contact_phone**
- **Type** : Phone Number ⚠️
- **Description** : Téléphone du contact
- **Exemple** : `+33 6 12 34 56 78`
- **Important** : Utilisez le type **Phone**, pas Rich Text

#### 9. **q1_people**
- **Type** : Number ⚠️
- **Description** : Nombre de personnes dans l'entreprise
- **Exemple** : `5`
- **Important** : Utilisez le type **Number**, pas Rich Text

#### 10. **q5_automation_tools**
- **Type** : Rich Text
- **Description** : Outils d'automatisation utilisés
- **Exemple** : `Zapier, Make, n8n`

#### 11. **biggestChallenge**
- **Type** : Rich Text (ou Text si vous voulez plus de caractères)
- **Description** : Plus grand défi / première tâche à automatiser
- **Exemple** : `Gestion du temps et suivi des prospects`

### Propriétés de Tracking (UTM)

#### 12. **ref**
- **Type** : Rich Text
- **Description** : Référence externe
- **Exemple** : `newsletter-jan-2026`

#### 13. **variant**
- **Type** : Rich Text
- **Description** : Variante du formulaire (A/B testing)
- **Exemple** : `variant-a`

#### 14. **utmSource**
- **Type** : Rich Text ou Select
- **Description** : Source marketing (Google, Facebook, LinkedIn...)
- **Exemple** : `google`
- **Conseil** : Utilisez **Select** pour avoir des valeurs prédéfinies

#### 15. **utmMedium**
- **Type** : Rich Text ou Select
- **Description** : Médium marketing (cpc, email, social...)
- **Exemple** : `cpc`

#### 16. **utmCampaign**
- **Type** : Rich Text
- **Description** : Nom de la campagne marketing
- **Exemple** : `audit-ia-launch-2026`

#### 17. **utmTerm**
- **Type** : Rich Text
- **Description** : Terme de recherche (pour Google Ads)
- **Exemple** : `automatisation intelligence artificielle`

#### 18. **utmContent**
- **Type** : Rich Text
- **Description** : Contenu spécifique (version de l'annonce)
- **Exemple** : `cta-button-blue`

---

## ✅ Récapitulatif des Types

| Propriété | Type Notion | Critique |
|-----------|-------------|----------|
| Nom | Title | ⚠️ Obligatoire |
| submittedAt | Rich Text | |
| sessionId | Rich Text | |
| trackingTag | Rich Text | |
| company_name | Rich Text | |
| contact_name | Rich Text | |
| **contact_email** | **Email** | ⚠️ Type spécifique |
| **contact_phone** | **Phone** | ⚠️ Type spécifique |
| **q1_people** | **Number** | ⚠️ Type spécifique |
| q5_automation_tools | Rich Text | |
| biggestChallenge | Rich Text / Text | |
| ref | Rich Text | |
| variant | Rich Text | |
| utmSource | Rich Text / Select | |
| utmMedium | Rich Text / Select | |
| utmCampaign | Rich Text | |
| utmTerm | Rich Text | |
| utmContent | Rich Text | |

---

## 🎯 Propriétés Additionnelles (Recommandées)

Pour améliorer la gestion des leads, ajoutez ces propriétés :

### **Statut**
- **Type** : Select
- **Options** :
  - 🟡 Nouveau (jaune)
  - 🔵 En cours (bleu)
  - 🟢 Contacté (vert)
  - ⚪ Qualifié (gris)
  - 🔴 Non pertinent (rouge)
  - ✅ Client (vert foncé)

### **Score**
- **Type** : Number
- **Description** : Score de qualification du lead (0-100)

### **Date de Premier Contact**
- **Type** : Date
- **Description** : Date du premier contact effectué

### **Responsable**
- **Type** : Person
- **Description** : Membre de l'équipe assigné au lead

### **Budget Mensuel**
- **Type** : Number
- **Format** : Currency (€)
- **Description** : Budget que le client est prêt à investir (q9_budget)

### **ROI Attendu**
- **Type** : Number
- **Format** : Percent (%)
- **Description** : ROI minimum attendu (q10_roi)

### **Notes**
- **Type** : Text
- **Description** : Notes libres sur le lead

---

## 🔧 Étape 3 : Configurer les Vues

### Vue 1 : Tous les Leads (Table)

**Configuration par défaut** : Affiche tous les leads dans une table

**Colonnes visibles** :
- Nom
- contact_email
- contact_phone
- company_name
- Statut
- submittedAt
- utmSource

**Tri** : Par `submittedAt` (décroissant) pour voir les plus récents en premier

### Vue 2 : Nouveaux Leads (Board)

**Type** : Board (Kanban)
**Groupé par** : Statut
**Filtre** : Statut = "Nouveau" ou "En cours"

### Vue 3 : Par Source (Gallery)

**Type** : Gallery
**Groupé par** : utmSource
**Affichage** : Compact
**Propriété de prévisualisation** : company_name

### Vue 4 : Timeline

**Type** : Timeline
**Propriété de date** : submittedAt
**Groupé par** : Responsable

---

## 🔗 Étape 4 : Partager avec l'Intégration

### 4.1 Créer l'Intégration

1. Allez sur [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Cliquez sur **"+ New integration"**
3. Remplissez :
   - **Name** : `Audit IA Integration`
   - **Associated workspace** : Sélectionnez votre espace
   - **Type** : Internal
4. **Capabilities** (Capacités) :
   - ✅ Read content
   - ✅ Update content
   - ✅ Insert content
   - ⬜ Read comments (optionnel)
   - ⬜ Insert comments (optionnel)
5. Cliquez sur **"Submit"**
6. **Copiez le Internal Integration Token** (secret_...)

### 4.2 Connecter la Base à l'Intégration

1. Ouvrez votre base de données **"Audit IA - Leads"**
2. Cliquez sur **"..."** (3 points) en haut à droite
3. Sélectionnez **"Connections"** ou **"Connect to"**
4. Cherchez **"Audit IA Integration"**
5. Cliquez dessus pour connecter
6. Confirmez l'accès

✅ **Votre base est maintenant accessible par l'intégration !**

---

## 🆔 Étape 5 : Récupérer l'ID de la Base

L'ID de votre base se trouve dans l'URL :

### Format de l'URL Notion

```
https://www.notion.so/workspace/DATABASE_ID?v=VIEW_ID
                              ^^^^^^^^^^^^^^^^
                              C'est l'ID de la base
```

### Exemple Concret

**URL complète** :
```
https://www.notion.so/alphanocode/2dbad0a3584680fda994f42283f48ff6?v=1234567890abcdef
```

**ID de la base** :
```
2dbad0a3584680fda994f42283f48ff6
```

### Comment le trouver ?

1. Ouvrez votre base de données dans Notion
2. Regardez l'URL dans votre navigateur
3. L'ID est la longue chaîne entre le nom de l'espace et le `?v=`

**Format de l'ID** :
- 32 caractères hexadécimaux
- Pas de tirets (si vous voyez des tirets, enlevez-les)
- Exemple : `2dbad0a3584680fda994f42283f48ff6`

---

## 🧪 Étape 6 : Tester la Configuration

### Test via l'API Notion

Vous pouvez tester que tout fonctionne avec curl :

```bash
curl -X POST https://api.notion.com/v1/pages \
  -H "Authorization: Bearer secret_VOTRE_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Notion-Version: 2022-06-28" \
  -d '{
    "parent": { "database_id": "VOTRE_DATABASE_ID" },
    "properties": {
      "Nom": {
        "title": [
          {
            "text": {
              "content": "Test Lead"
            }
          }
        ]
      },
      "contact_email": {
        "email": "test@example.com"
      }
    }
  }'
```

**Réponse attendue** : Un JSON avec l'objet page créé

---

## 📋 Checklist Complète

Avant de passer à n8n, vérifiez :

- [ ] Base de données créée dans Notion
- [ ] Propriété **"Nom"** (Title) existe
- [ ] Propriété **"contact_email"** (Email) existe
- [ ] Propriété **"contact_phone"** (Phone) existe
- [ ] Propriété **"q1_people"** (Number) existe
- [ ] Toutes les autres propriétés Rich Text créées
- [ ] Intégration créée sur notion.so/my-integrations
- [ ] Token d'intégration copié (secret_...)
- [ ] Base partagée avec l'intégration (Connections)
- [ ] ID de la base récupéré depuis l'URL
- [ ] Test API réussi (optionnel)

---

## 🎨 Template SQL pour Créer Rapidement les Propriétés

Si vous utilisez l'API Notion ou un script, voici les propriétés en JSON :

```json
{
  "Nom": { "title": {} },
  "submittedAt": { "rich_text": {} },
  "sessionId": { "rich_text": {} },
  "trackingTag": { "rich_text": {} },
  "company_name": { "rich_text": {} },
  "contact_name": { "rich_text": {} },
  "contact_email": { "email": {} },
  "contact_phone": { "phone_number": {} },
  "q1_people": { "number": {} },
  "q5_automation_tools": { "rich_text": {} },
  "biggestChallenge": { "rich_text": {} },
  "ref": { "rich_text": {} },
  "variant": { "rich_text": {} },
  "utmSource": { "rich_text": {} },
  "utmMedium": { "rich_text": {} },
  "utmCampaign": { "rich_text": {} },
  "utmTerm": { "rich_text": {} },
  "utmContent": { "rich_text": {} }
}
```

---

## 🔍 Dépannage

### Erreur : "Integration not found"

**Cause** : L'intégration n'existe pas ou n'est pas dans le bon workspace  
**Solution** : Vérifiez que vous avez créé l'intégration dans le bon espace de travail

### Erreur : "Database not found"

**Cause** : La base n'est pas partagée avec l'intégration  
**Solution** : Allez dans Connections et ajoutez l'intégration

### Erreur : "Property XYZ does not exist"

**Cause** : Le nom de la propriété ne correspond pas exactement  
**Solution** : Vérifiez la casse et l'orthographe (sensible à la casse)

### Erreur : "Invalid email format"

**Cause** : La propriété n'est pas de type "Email"  
**Solution** : Recréez la propriété avec le type "Email"

---

## 📞 Ressources

- [Documentation Notion API](https://developers.notion.com/)
- [Create a database page](https://developers.notion.com/reference/post-page)
- [Property values](https://developers.notion.com/reference/property-value-object)

---

**✅ Configuration Notion terminée ! Vous pouvez maintenant passer à l'import du workflow n8n.**

---

**Version** : 1.0.0  
**Date** : 2026-01-02  
**Projet** : Alpha-NC / Audit IA v1
