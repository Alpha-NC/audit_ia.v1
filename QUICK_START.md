# ⚡ Quick Start - Workflow n8n Audit IA → Notion

> 🚀 **Installation en 10 minutes chrono !**

---

## 📦 Ce qui est inclus

✅ **2 workflows n8n** prêts à importer  
✅ **Script de test** automatisé  
✅ **Documentation complète** (3 guides détaillés)  
✅ **Référence des champs** du formulaire  

---

## 🎯 Installation Express (10 minutes)

### ⏱️ Étape 1 : Notion (5 min)

1. **Créer l'intégration** : [notion.so/my-integrations](https://www.notion.so/my-integrations)
   - Cliquez sur "+ New integration"
   - Nom : "Audit IA Integration"
   - Copiez le token (secret_...)

2. **Créer la base de données** avec ces propriétés :

   | Propriété | Type |
   |-----------|------|
   | **Nom** | Title |
   | submittedAt | Rich Text |
   | sessionId | Rich Text |
   | trackingTag | Rich Text |
   | company_name | Rich Text |
   | contact_name | Rich Text |
   | **contact_email** | **Email** |
   | **contact_phone** | **Phone** |
   | **q1_people** | **Number** |
   | q5_automation_tools | Rich Text |
   | biggestChallenge | Rich Text |
   | ref | Rich Text |
   | variant | Rich Text |
   | utmSource | Rich Text |
   | utmMedium | Rich Text |
   | utmCampaign | Rich Text |
   | utmTerm | Rich Text |
   | utmContent | Rich Text |

3. **Partager la base** : "..." → "Connections" → Sélectionner "Audit IA Integration"

4. **Copier l'ID** de la base depuis l'URL :
   ```
   https://www.notion.so/workspace/DATABASE_ID?v=...
                                   ^^^^^^^^^^^^^^^^
   ```

---

### ⏱️ Étape 2 : n8n (3 min)

1. **Importer le workflow**
   - Ouvrir n8n : [https://n8n.srv1159833.hstgr.cloud](https://n8n.srv1159833.hstgr.cloud)
   - "Import from File" → **`n8n_workflow_simple_optimal.json`**

2. **Configurer Notion**
   - Cliquer sur node "Notion Create Page"
   - "Credential to connect with" → "Create New"
   - Coller votre token Notion
   - Save

3. **Configurer l'ID de la base**
   - Dans le même node
   - Remplacer `={{ $env.NOTION_DATABASE_ID }}` par votre ID

4. **Activer**
   - Switch en haut à droite : OFF → **ON**

---

### ⏱️ Étape 3 : Test (2 min)

**Option A : Test automatique**
```bash
chmod +x test_webhook.sh
./test_webhook.sh
```

**Option B : Test manuel avec curl**
```bash
curl -X POST "https://n8n.srv1159833.hstgr.cloud/webhook/audit-ia?token=Vn3pK8tQm2Yx7Lw9aR4cJ6uZ1sF5hD0eGqB3nP7rT9wX2kM" \
  -H "Content-Type: application/json" \
  -d '{
    "company_name": "Test Company",
    "contact_email": "test@example.com",
    "contact_phone": "+33612345678",
    "q1_people": 5
  }'
```

**Option C : Test depuis le formulaire**
- Aller sur [https://alpha-nc.github.io/audit_ia.v1/](https://alpha-nc.github.io/audit_ia.v1/)
- Remplir et soumettre
- Vérifier dans Notion

---

## ✅ C'est Fait !

Votre workflow est opérationnel. Les soumissions du formulaire apparaissent automatiquement dans Notion !

---

## 📚 Documentation Complète

Pour plus de détails, consultez :

| Guide | Contenu |
|-------|---------|
| **WORKFLOW_README.md** | 📖 Vue d'ensemble complète |
| **INSTALLATION_GUIDE.md** | 🔧 Installation pas-à-pas détaillée |
| **NOTION_SETUP.md** | 🎨 Configuration Notion détaillée |
| **FORM_REFERENCE.md** | 📋 Référence des 24+ champs |

---

## 🧪 Vérifications

- [ ] ✅ Page créée dans Notion avec le bon titre
- [ ] ✅ Email cliquable (type Email)
- [ ] ✅ Téléphone formaté (type Phone)
- [ ] ✅ q1_people est un nombre (type Number)
- [ ] ✅ Tous les champs UTM remplis

---

## 🐛 Problèmes Courants

### "Token invalide" (401)
→ Vérifiez que le token dans n8n = token dans l'URL

### "Database not found"
→ Vérifiez que la base est partagée (Connections)

### "Invalid property"
→ Vérifiez que toutes les propriétés existent (sensible à la casse)

### Champs vides
→ Consultez les Executions dans n8n pour voir les données reçues

---

## 🎉 Félicitations !

Votre intégration Audit IA → Notion est maintenant **en production** !

---

## 📊 Résumé Technique

| Élément | Valeur |
|---------|--------|
| **Workflow** | n8n_workflow_simple_optimal.json |
| **Endpoint** | https://n8n.srv1159833.hstgr.cloud/webhook/audit-ia |
| **Méthode** | POST JSON |
| **Sécurité** | Token validation |
| **Champs mappés** | 18+ propriétés |
| **Temps d'intégration** | ~10 min |

---

<div align="center">

**Made with ❤️ for Alpha No-Code**

[🔙 Retour au README principal](./WORKFLOW_README.md)

</div>
