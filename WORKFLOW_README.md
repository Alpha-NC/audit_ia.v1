# 🚀 Workflow n8n Optimal : Audit IA → Notion

[![n8n](https://img.shields.io/badge/n8n-Workflow-FF6D5A?style=flat-square&logo=n8n)](https://n8n.io)
[![Notion](https://img.shields.io/badge/Notion-Database-000000?style=flat-square&logo=notion)](https://notion.so)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-success?style=flat-square)]()

> Intégration automatique et optimisée des soumissions du formulaire **Audit IA** depuis GitHub Pages vers votre base de données Notion.

---

## 📋 Table des Matières

- [Vue d'ensemble](#-vue-densemble)
- [Fonctionnalités](#-fonctionnalités)
- [Architecture](#-architecture)
- [Installation Rapide](#-installation-rapide)
- [Fichiers du Projet](#-fichiers-du-projet)
- [Mapping des Données](#-mapping-des-données)
- [Tests](#-tests)
- [Dépannage](#-dépannage)
- [Support](#-support)

---

## 🎯 Vue d'ensemble

Ce projet fournit un **workflow n8n clé en main** pour automatiser l'intégration des données du formulaire [Alpha-NC/audit_ia.v1](https://github.com/Alpha-NC/audit_ia.v1) dans une base de données Notion.

### Ce qui est inclus

✅ Workflow n8n prêt à importer (JSON)  
✅ Validation de token de sécurité  
✅ Mapping automatique de tous les champs du formulaire  
✅ Support complet des paramètres UTM  
✅ Gestion d'erreurs robuste  
✅ Scripts de test automatisés  
✅ Documentation complète  

---

## ✨ Fonctionnalités

### 🔐 Sécurité
- Validation du token d'authentification sur chaque requête
- Réponse 401 pour les requêtes non autorisées
- Token stocké dans l'URL du webhook

### 📊 Intégration Complète
- **18+ champs** mappés automatiquement
- Support des champs : text, email, phone, number
- Mapping intelligent avec fallback (ex: `utmSource` ou `utm_source`)
- Titre de page auto-généré : `company_name || contact_name || contact_email || "Lead Audit IA"`

### 🎯 Tracking Marketing
- Support complet des **paramètres UTM** :
  - utmSource / utm_source
  - utmMedium / utm_medium
  - utmCampaign / utm_campaign
  - utmTerm / utm_term
  - utmContent / utm_content
- Champs additionnels : ref, variant, trackingTag

### 📦 Réponses Structurées
- **Succès (200)** :
  ```json
  {
    "ok": true,
    "receivedAt": "2026-01-02T15:30:00.000Z",
    "pageId": "abc123...",
    "pageUrl": "https://notion.so/..."
  }
  ```
- **Erreur Token (401)** :
  ```json
  {
    "ok": false,
    "error": "Token invalide"
  }
  ```

---

## 🏗️ Architecture

```
┌──────────────────┐
│  GitHub Pages    │
│  Formulaire      │
│  Audit IA        │
└────────┬─────────┘
         │ POST JSON
         │ avec token
         ▼
┌──────────────────┐
│  n8n Webhook     │
│  Endpoint        │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  IF Token OK     │◄─── Validation sécurité
└────────┬─────────┘
         │ token valide
         ▼
┌──────────────────┐
│  Notion API      │
│  Create Page     │◄─── Mapping des 18 champs
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Response 200    │◄─── Retourne pageId & URL
│  + pageUrl       │
└──────────────────┘
```

---

## ⚡ Installation Rapide

### Étape 1 : Configuration Notion (5 min)

1. Créez une intégration sur [notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Copiez le token d'intégration
3. Créez une base de données avec les propriétés requises (voir [NOTION_SETUP.md](./NOTION_SETUP.md))
4. Partagez la base avec votre intégration
5. Copiez l'ID de la base depuis l'URL

📖 **Guide détaillé** : [NOTION_SETUP.md](./NOTION_SETUP.md)

### Étape 2 : Import du Workflow n8n (3 min)

1. Connectez-vous à votre instance n8n : `https://n8n.srv1159833.hstgr.cloud`
2. Cliquez sur **"Import from File"**
3. Sélectionnez : **`n8n_workflow_simple_optimal.json`**
4. Configurez les credentials Notion (token)
5. Remplacez `NOTION_DATABASE_ID` par votre ID de base
6. Activez le workflow (switch ON)

📖 **Guide détaillé** : [INSTALLATION_GUIDE.md](./INSTALLATION_GUIDE.md)

### Étape 3 : Vérification (2 min)

Le fichier `schema.json` contient déjà l'URL du webhook :
```json
{
  "submission": {
    "endpoint": "https://n8n.srv1159833.hstgr.cloud/webhook/audit-ia?token=Vn3pK8tQm2Yx7Lw9aR4cJ6uZ1sF5hD0eGqB3nP7rT9wX2kM"
  }
}
```

✅ **Rien à changer si vous utilisez le même token !**

---

## 📂 Fichiers du Projet

| Fichier | Description | Priorité |
|---------|-------------|----------|
| **`n8n_workflow_simple_optimal.json`** | ⭐ **Workflow n8n à importer** (recommandé) | 🔴 Critique |
| **`INSTALLATION_GUIDE.md`** | 📖 Guide d'installation complet pas-à-pas | 🔴 Critique |
| **`NOTION_SETUP.md`** | 🎨 Guide de configuration Notion détaillé | 🔴 Critique |
| `n8n_workflow_audit_ia_optimal.json` | Workflow avec nodes additionnels (version étendue) | 🟡 Optionnel |
| `test_webhook.sh` | 🧪 Script de test automatisé (5 scénarios) | 🟢 Utile |
| `schema.json` | Configuration du formulaire (GitHub Pages) | 🔵 Référence |
| `README.md` | Ce fichier | 📚 Documentation |

---

## 🗺️ Mapping des Données

### Champs Principaux

| Formulaire | Notion | Type Notion | Expression n8n |
|-----------|--------|-------------|----------------|
| company_name | company_name | Rich Text | `={{ $json.company_name }}` |
| contact_firstname + contact_lastname | contact_name | Rich Text | Concaténation |
| contact_email | contact_email | **Email** | `={{ $json.contact_email }}` |
| contact_phone | contact_phone | **Phone** | `={{ $json.contact_phone }}` |
| q1_people | q1_people | **Number** | `={{ Number($json.q1_people) }}` |
| q5_automation_tools | q5_automation_tools | Rich Text | `={{ $json.q5_automation_tools }}` |

### Champs de Tracking

| Formulaire | Notion | Fallback |
|-----------|--------|----------|
| utmSource **ou** utm_source | utmSource | `{{ $json.utmSource \|\| $json.utm_source }}` |
| utmMedium **ou** utm_medium | utmMedium | `{{ $json.utmMedium \|\| $json.utm_medium }}` |
| utmCampaign **ou** utm_campaign | utmCampaign | `{{ $json.utmCampaign \|\| $json.utm_campaign }}` |
| utmTerm **ou** utm_term | utmTerm | `{{ $json.utmTerm \|\| $json.utm_term }}` |
| utmContent **ou** utm_content | utmContent | `{{ $json.utmContent \|\| $json.utm_content }}` |

### Champs Additionnels

| Formulaire | Notion | Description |
|-----------|--------|-------------|
| submittedAt | submittedAt | Date de soumission (ISO 8601) |
| sessionId | sessionId | ID unique de session |
| trackingTag | trackingTag | Tag de tracking personnalisé |
| ref | ref | Référence externe |
| variant | variant | Variante A/B du formulaire |
| q3_pains / q8_first_task | biggestChallenge | Plus grand défi (fallback intelligent) |

### Titre de la Page Notion

```javascript
={{ $json.company_name || $json.contact_name || $json.contact_email || "Lead Audit IA" }}
```

**Priorité** :
1. Nom de l'entreprise
2. Nom du contact
3. Email du contact
4. Fallback : "Lead Audit IA"

---

## 🧪 Tests

### Test Automatisé

Le script `test_webhook.sh` teste 5 scénarios :

```bash
chmod +x test_webhook.sh
./test_webhook.sh
```

**Scénarios testés** :
1. ✅ Token valide + Données complètes
2. ✅ Token valide + Données minimales
3. ❌ Token invalide (attendu: 401)
4. ❌ Sans token (attendu: 401)
5. ✅ Token valide + Format UTM alternatif (utm_source)

### Test Manuel avec curl

```bash
curl -X POST "https://n8n.srv1159833.hstgr.cloud/webhook/audit-ia?token=Vn3pK8tQm2Yx7Lw9aR4cJ6uZ1sF5hD0eGqB3nP7rT9wX2kM" \
  -H "Content-Type: application/json" \
  -d '{
    "company_name": "Test Company",
    "contact_email": "test@example.com",
    "contact_phone": "+33612345678",
    "q1_people": 5,
    "utmSource": "google",
    "utmMedium": "cpc"
  }'
```

**Réponse attendue** :
```json
{
  "ok": true,
  "receivedAt": "2026-01-02T15:30:00.000Z",
  "pageId": "abc123...",
  "pageUrl": "https://www.notion.so/..."
}
```

### Test depuis le Formulaire

1. Accédez à : `https://alpha-nc.github.io/audit_ia.v1/`
2. Remplissez le formulaire
3. Soumettez
4. Vérifiez dans Notion qu'une nouvelle page a été créée

---

## 🐛 Dépannage

### Problème : "Token invalide" (401)

**Causes possibles** :
- Le token dans le workflow ne correspond pas à celui dans l'URL
- Le token est absent de l'URL du webhook

**Solution** :
1. Vérifiez le node "IF Token OK" dans n8n
2. Comparez avec le token dans `schema.json`
3. Assurez-vous que l'URL contient `?token=...`

### Problème : "Database not found"

**Causes possibles** :
- L'intégration n'a pas accès à la base Notion
- L'ID de la base est incorrect

**Solution** :
1. Vérifiez que la base est partagée avec l'intégration (Connections)
2. Vérifiez l'ID dans le node "Notion Create Page"
3. L'ID doit être exact (32 caractères hexadécimaux)

### Problème : "Invalid property"

**Causes possibles** :
- Une propriété du workflow n'existe pas dans Notion
- Le nom ne correspond pas exactement (sensible à la casse)

**Solution** :
1. Vérifiez que TOUTES les propriétés existent dans Notion
2. Les noms doivent correspondre EXACTEMENT (ex: `contact_email`, pas `Contact_Email`)

### Problème : Champs vides dans Notion

**Cause** :
- Les données ne sont pas envoyées par le formulaire
- Le mapping est incorrect

**Solution** :
1. Consultez les **Executions** dans n8n
2. Vérifiez les données reçues dans le node "Webhook"
3. Vérifiez que le champ existe dans le formulaire

### Problème : Type de champ incorrect

**Symptômes** :
- Les emails ne sont pas cliquables
- Les numéros ne sont pas reconnus

**Solution** :
Vérifiez les types dans Notion :
- `contact_email` → Type **Email** (pas Rich Text)
- `contact_phone` → Type **Phone** (pas Rich Text)
- `q1_people` → Type **Number** (pas Rich Text)

---

## 📊 Monitoring

### Consulter les Exécutions dans n8n

1. Cliquez sur **"Executions"** dans n8n
2. Vous verrez toutes les soumissions
3. Cliquez sur une exécution pour voir :
   - Les données reçues
   - Le résultat de chaque node
   - Les erreurs éventuelles

### Statistiques

Le workflow n8n enregistre automatiquement :
- Nombre d'exécutions
- Taux de succès / échec
- Temps d'exécution moyen

---

## 🔐 Sécurité

### Token de Sécurité

Le token actuel est :
```
Vn3pK8tQm2Yx7Lw9aR4cJ6uZ1sF5hD0eGqB3nP7rT9wX2kM
```

⚠️ **Important** :
- **Ne le partagez jamais publiquement**
- Si compromis, générez-en un nouveau

### Générer un Nouveau Token

```bash
# Méthode 1 : OpenSSL
openssl rand -base64 32 | tr -d '/' | cut -c1-40

# Méthode 2 : Python
python3 -c "import secrets; print(secrets.token_urlsafe(30))"
```

Puis mettez à jour :
1. Le node "IF Token OK" dans n8n
2. Le fichier `schema.json` dans GitHub
3. L'URL du webhook

---

## 📈 Améliorations Futures

### Fonctionnalités Potentielles

- [ ] Notification Slack/Email lors d'une nouvelle soumission
- [ ] Score automatique du lead (based on q9_budget, q10_roi)
- [ ] Enrichissement des données (API LinkedIn, Clearbit)
- [ ] Dédoublonnage automatique (même email)
- [ ] Export CSV hebdomadaire
- [ ] Dashboard analytics des soumissions

### Intégrations Possibles

- [ ] Envoyer un email de confirmation (SendGrid)
- [ ] Ajouter le lead au CRM (HubSpot, Salesforce)
- [ ] Créer une tâche de suivi (Todoist, Asana)
- [ ] Notification mobile (Pushover, Telegram)

---

## 🤝 Contribution

Ce workflow a été créé pour **Alpha No-Code**.

Pour toute suggestion ou amélioration :
1. Consultez la documentation
2. Testez en environnement de développement
3. Partagez vos retours

---

## 📞 Support

### Documentation

- 📖 [INSTALLATION_GUIDE.md](./INSTALLATION_GUIDE.md) - Guide d'installation complet
- 🎨 [NOTION_SETUP.md](./NOTION_SETUP.md) - Configuration Notion détaillée

### Ressources Externes

- [Documentation n8n](https://docs.n8n.io/)
- [Documentation Notion API](https://developers.notion.com/)
- [GitHub Repo](https://github.com/Alpha-NC/audit_ia.v1)

---

## 📜 Résumé

| Élément | Valeur |
|---------|--------|
| **Workflow n8n** | `n8n_workflow_simple_optimal.json` |
| **Endpoint webhook** | `https://n8n.srv1159833.hstgr.cloud/webhook/audit-ia` |
| **Token** | `Vn3pK8tQm2Yx7Lw9aR4cJ6uZ1sF5hD0eGqB3nP7rT9wX2kM` |
| **Champs mappés** | 18+ propriétés Notion |
| **Temps d'intégration** | ~10 minutes |
| **Formulaire** | `https://alpha-nc.github.io/audit_ia.v1/` |

---

## ✅ Checklist Finale

Avant de mettre en production :

- [ ] Intégration Notion créée et token copié
- [ ] Base de données Notion créée avec toutes les propriétés
- [ ] Base partagée avec l'intégration
- [ ] Workflow n8n importé et configuré
- [ ] Credentials Notion configurées dans n8n
- [ ] ID de la base configuré dans le workflow
- [ ] Workflow activé (switch ON)
- [ ] Test avec curl réussi
- [ ] Test depuis le formulaire réussi
- [ ] Vérification dans Notion OK

---

<div align="center">

**🎉 Workflow n8n Opérationnel !**

Made with ❤️ for Alpha No-Code  
Version 1.0.0 | 2026-01-02

</div>
