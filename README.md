# 🚀 Workflow n8n Optimal : Audit IA → Notion

[![n8n](https://img.shields.io/badge/n8n-Workflow-FF6D5A?style=flat-square&logo=n8n)](https://n8n.io)
[![Notion](https://img.shields.io/badge/Notion-Database-000000?style=flat-square&logo=notion)](https://notion.so)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-success?style=flat-square)]()

> **Intégration automatique optimisée** : Formulaire Audit IA (GitHub Pages) → Base de données Notion via n8n

---

## 📋 Vue d'ensemble

Ce projet fournit un **workflow n8n clé en main** pour automatiser l'intégration complète des soumissions du formulaire **Audit IA** dans votre base de données Notion.

### ✨ Nouveautés v2.0

- ✅ **18+ champs mappés** (vs 2 champs dans v1)
- ✅ **Support UTM complet** (tracking marketing)
- ✅ **Validation de token** renforcée
- ✅ **Documentation complète** (50+ pages)
- ✅ **Script de test** automatisé (5 scénarios)
- ✅ **Mapping intelligent** avec fallbacks

---

## ⚡ Installation Express

### Option 1 : Quick Start (10 minutes)

```bash
# 1. Lire le guide rapide
cat QUICK_START.md

# 2. Configurer Notion (5 min)
# → Créer intégration + base de données
# → Voir NOTION_SETUP.md

# 3. Importer le workflow n8n (3 min)
# → Import "n8n_workflow_simple_optimal.json"
# → Configurer credentials Notion

# 4. Tester (2 min)
chmod +x test_webhook.sh
./test_webhook.sh
```

### Option 2 : Installation Détaillée

👉 **Consultez** : [INSTALLATION_GUIDE.md](./INSTALLATION_GUIDE.md)

---

## 📦 Fichiers du Projet

| Fichier | Description | Priorité |
|---------|-------------|----------|
| **n8n_workflow_simple_optimal.json** | ⭐ Workflow n8n à importer | 🔴 Critique |
| **QUICK_START.md** | ⚡ Installation en 10 minutes | 🔴 Critique |
| **INSTALLATION_GUIDE.md** | 📖 Guide complet pas-à-pas | 🔴 Critique |
| **NOTION_SETUP.md** | 🎨 Configuration Notion détaillée | 🔴 Critique |
| **WORKFLOW_README.md** | 📋 Documentation technique complète | 🟡 Important |
| **FORM_REFERENCE.md** | 📋 Référence des 24+ champs | 🟢 Utile |
| **PROJECT_INDEX.md** | 📦 Index de tous les fichiers | 🟢 Utile |
| **test_webhook.sh** | 🧪 Script de test (5 scénarios) | 🟢 Utile |

---

## 🎯 Fonctionnalités

### 🔐 Sécurité
- Validation du token sur chaque requête
- Réponse 401 pour requêtes non autorisées
- Token stocké dans l'URL du webhook

### 📊 Mapping Complet

**18+ champs mappés automatiquement** :

| Catégorie | Champs |
|-----------|--------|
| **Contact** | company_name, contact_name, contact_email, contact_phone |
| **Questions** | q1_people, q2_domain, q3_pains, q4_hours, q5_automation_tools, q6_main_tools, q7_ai_tested, q7_ai_usage, q8_first_task, q9_budget, q10_roi |
| **Tracking** | submittedAt, sessionId, trackingTag, ref, variant |
| **UTM** | utmSource, utmMedium, utmCampaign, utmTerm, utmContent |

### 🎯 Mapping Intelligent

- **Fallbacks** : `utmSource || utm_source`
- **Concaténation** : `contact_firstname + contact_lastname → contact_name`
- **Titre auto** : `company_name || contact_name || contact_email || "Lead Audit IA"`
- **Types stricts** : Email, Phone, Number, Rich Text

---

## 🏗️ Architecture

```
┌──────────────────┐
│  GitHub Pages    │  Formulaire Audit IA
│  Alpha-NC/       │  https://alpha-nc.github.io/audit_ia.v1/
│  audit_ia.v1     │
└────────┬─────────┘
         │ POST JSON + token
         ▼
┌──────────────────┐
│  n8n Webhook     │  Endpoint sécurisé
│  Trigger         │  https://n8n.srv1159833.hstgr.cloud/webhook/audit-ia
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  IF Token OK     │  Validation sécurité
└────────┬─────────┘
         │ ✅ token valide
         ▼
┌──────────────────┐
│  Notion API      │  Création page avec 18+ champs
│  Create Page     │  Mapping automatique
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Response 200    │  {"ok":true, "pageId":"...", "pageUrl":"..."}
└──────────────────┘
```

---

## 🧪 Tests

### Test Automatique (Recommandé)

```bash
chmod +x test_webhook.sh
./test_webhook.sh
```

**5 scénarios testés** :
1. ✅ Token valide + Données complètes (200)
2. ✅ Token valide + Données minimales (200)
3. ❌ Token invalide (401)
4. ❌ Sans token (401)
5. ✅ Format UTM alternatif (200)

### Test Manuel

```bash
curl -X POST "https://n8n.srv1159833.hstgr.cloud/webhook/audit-ia?token=Vn3pK8tQm2Yx7Lw9aR4cJ6uZ1sF5hD0eGqB3nP7rT9wX2kM" \
  -H "Content-Type: application/json" \
  -d '{
    "company_name": "Test Company",
    "contact_email": "test@example.com",
    "contact_phone": "+33612345678",
    "q1_people": 5,
    "utmSource": "google"
  }'
```

---

## 📖 Documentation

| Guide | Contenu | Lien |
|-------|---------|------|
| **Quick Start** | Installation en 10 minutes | [QUICK_START.md](./QUICK_START.md) |
| **Installation** | Guide complet pas-à-pas | [INSTALLATION_GUIDE.md](./INSTALLATION_GUIDE.md) |
| **Notion Setup** | Configuration Notion détaillée | [NOTION_SETUP.md](./NOTION_SETUP.md) |
| **Workflow Doc** | Documentation technique | [WORKFLOW_README.md](./WORKFLOW_README.md) |
| **Form Reference** | Référence des champs | [FORM_REFERENCE.md](./FORM_REFERENCE.md) |
| **Project Index** | Index des fichiers | [PROJECT_INDEX.md](./PROJECT_INDEX.md) |

---

## 🔧 Configuration

### Endpoint n8n
```
https://n8n.srv1159833.hstgr.cloud/webhook/audit-ia?token=Vn3pK8tQm2Yx7Lw9aR4cJ6uZ1sF5hD0eGqB3nP7rT9wX2kM
```

### Propriétés Notion Requises

**Types stricts** (ne pas se tromper) :
- **Nom** : Title
- **contact_email** : **Email** (pas Rich Text)
- **contact_phone** : **Phone** (pas Rich Text)
- **q1_people** : **Number** (pas Rich Text)

**Autres** : Rich Text
- submittedAt, sessionId, trackingTag, company_name, contact_name
- q5_automation_tools, biggestChallenge, ref, variant
- utmSource, utmMedium, utmCampaign, utmTerm, utmContent

👉 **Liste complète** : [NOTION_SETUP.md](./NOTION_SETUP.md)

---

## 🐛 Dépannage Rapide

### ❌ "Token invalide" (401)
→ Vérifiez le node "IF Token OK" dans n8n

### ❌ "Database not found"
→ Partagez la base Notion avec l'intégration (Connections)

### ❌ "Invalid property"
→ Vérifiez que toutes les propriétés existent (sensible à la casse)

### ❌ Champs vides
→ Consultez "Executions" dans n8n pour voir les données reçues

👉 **Guide complet** : [INSTALLATION_GUIDE.md#dépannage](./INSTALLATION_GUIDE.md)

---

## 📊 Statistiques

| Métrique | Valeur |
|----------|--------|
| **Champs mappés** | 18+ propriétés |
| **Temps d'installation** | ~10 minutes |
| **Tests automatisés** | 5 scénarios |
| **Documentation** | 50+ pages |
| **Workflows** | 2 versions (simple + étendu) |

---

## 📅 Historique

### Version 2.0 (2026-01-02) - Actuelle
- ✅ Mapping de 18+ champs (vs 2 dans v1)
- ✅ Support UTM complet
- ✅ Documentation complète (6 guides)
- ✅ Script de test automatisé
- ✅ Mapping intelligent avec fallbacks

### Version 1.0 (Ancienne)
- Mapping basique (company_name, contact_email)
- Documentation minimale
- Pas de tests automatisés

---

## ✅ Checklist d'Installation

- [ ] Lire **QUICK_START.md**
- [ ] Créer intégration Notion
- [ ] Créer base de données (18 propriétés)
- [ ] Partager base avec intégration
- [ ] Importer **n8n_workflow_simple_optimal.json**
- [ ] Configurer credentials Notion
- [ ] Configurer DATABASE_ID
- [ ] Activer workflow (ON)
- [ ] Lancer **test_webhook.sh**
- [ ] Vérifier données dans Notion

---

## 🤝 Support

1. Consultez [INSTALLATION_GUIDE.md](./INSTALLATION_GUIDE.md) (section Dépannage)
2. Vérifiez les logs d'exécution dans n8n
3. Lancez `./test_webhook.sh` pour diagnostiquer

---

## 🔗 Liens Utiles

- **Formulaire** : https://alpha-nc.github.io/audit_ia.v1/
- **Repository** : https://github.com/Alpha-NC/audit_ia.v1
- **n8n** : https://n8n.srv1159833.hstgr.cloud
- **Notion API** : https://developers.notion.com/

---

<div align="center">

**🎉 Workflow Opérationnel en 10 Minutes !**

Made with ❤️ for **Alpha No-Code**

Version 2.0.0 | 2026-01-02

[📖 Quick Start](./QUICK_START.md) • [🔧 Installation](./INSTALLATION_GUIDE.md) • [🎨 Notion Setup](./NOTION_SETUP.md)

</div>
