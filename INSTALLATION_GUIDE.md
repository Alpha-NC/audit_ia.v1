# 🚀 Guide d'Installation - Workflow n8n Audit IA → Notion

## 📋 Vue d'ensemble

Ce workflow n8n capture automatiquement les soumissions du formulaire **Audit IA** depuis GitHub Pages et les enregistre dans votre base de données Notion avec un mapping personnalisé.

---

## 🎯 Fonctionnalités

✅ **Réception sécurisée** : Validation du token pour chaque requête  
✅ **Mapping automatique** : Toutes les données du formulaire sont correctement mappées  
✅ **Gestion des UTM** : Support complet des paramètres UTM (source, medium, campaign, term, content)  
✅ **Réponse structurée** : Retourne un JSON avec pageId et pageUrl  
✅ **Gestion d'erreurs** : Réponses 401 pour token invalide, 500 pour erreurs Notion  

---

## 📦 Prérequis

### 1. Compte n8n
- Version n8n >= 1.0
- Accès à une instance n8n (self-hosted ou cloud)
- URL : `https://n8n.srv1159833.hstgr.cloud`

### 2. Compte Notion
- Base de données Notion configurée avec les propriétés appropriées
- Token d'intégration Notion

### 3. Formulaire
- Formulaire déployé sur GitHub Pages
- Repository : `Alpha-NC/audit_ia.v1`

---

## 🔧 Étape 1 : Configuration de Notion

### 1.1 Créer une Intégration Notion

1. Allez sur [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Cliquez sur **"+ Nouvelle intégration"**
3. Nommez-la : **"Audit IA Integration"**
4. Sélectionnez l'espace de travail
5. **Capacités** : Cochez "Lire le contenu", "Mettre à jour le contenu", "Insérer du contenu"
6. Cliquez sur **"Soumettre"**
7. **Copiez le token** (commence par `secret_...`)

### 1.2 Créer/Configurer la Base de Données Notion

Créez une base de données avec **exactement** ces propriétés :

| Nom de la propriété | Type Notion | Obligatoire |
|---------------------|-------------|-------------|
| **Nom** (Title) | Title | ✅ Oui |
| submittedAt | Rich Text | Non |
| sessionId | Rich Text | Non |
| trackingTag | Rich Text | Non |
| company_name | Rich Text | Non |
| contact_name | Rich Text | Non |
| contact_email | Email | Non |
| contact_phone | Phone | Non |
| q1_people | Number | Non |
| q5_automation_tools | Rich Text | Non |
| biggestChallenge | Rich Text | Non |
| ref | Rich Text | Non |
| variant | Rich Text | Non |
| utmSource | Rich Text | Non |
| utmMedium | Rich Text | Non |
| utmCampaign | Rich Text | Non |
| utmTerm | Rich Text | Non |
| utmContent | Rich Text | Non |

**⚠️ Important** : Les noms de propriétés doivent correspondre **EXACTEMENT** (sensible à la casse).

### 1.3 Partager la Base avec l'Intégration

1. Ouvrez votre base de données Notion
2. Cliquez sur les **"..."** (3 points) en haut à droite
3. Sélectionnez **"Connexions"** → **"Connecter à"**
4. Cherchez et sélectionnez **"Audit IA Integration"**
5. Confirmez le partage

### 1.4 Récupérer l'ID de la Base de Données

L'ID se trouve dans l'URL de votre base :

```
https://www.notion.so/workspace/DATABASE_ID?v=...
                              ^^^^^^^^^^^^^^^^
                              Copiez cette partie
```

Exemple :
```
https://www.notion.so/myworkspace/2dbad0a3584680fda994f42283f48ff6?v=123
                                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                  ID = 2dbad0a3584680fda994f42283f48ff6
```

---

## 🎨 Étape 2 : Import du Workflow dans n8n

### 2.1 Se Connecter à n8n

1. Accédez à votre instance n8n : `https://n8n.srv1159833.hstgr.cloud`
2. Connectez-vous avec vos identifiants

### 2.2 Importer le Workflow

1. Dans n8n, cliquez sur **"Workflows"** dans le menu
2. Cliquez sur **"Importer à partir d'un fichier"**
3. Sélectionnez le fichier : **`n8n_workflow_simple_optimal.json`**
4. Le workflow sera importé avec 5 nodes :
   - **Webhook** : Réception des données
   - **IF Token OK** : Validation du token
   - **Notion Create Page** : Création dans Notion
   - **Respond 200** : Réponse de succès
   - **Respond 401** : Réponse d'erreur token

### 2.3 Configurer les Credentials Notion

1. Cliquez sur le node **"Notion Create Page"**
2. Dans le champ **"Credential to connect with"**, cliquez sur **"Create New"**
3. Collez votre **Token d'intégration Notion** (de l'étape 1.1)
4. Nommez le credential : **"Notion API - Audit IA"**
5. Cliquez sur **"Save"**

### 2.4 Configurer l'ID de la Base

1. Toujours dans le node **"Notion Create Page"**
2. Remplacez `={{ $env.NOTION_DATABASE_ID }}` par votre ID de base
3. **OU** configurez une variable d'environnement :
   - Allez dans **Settings** → **Environment Variables**
   - Ajoutez : `NOTION_DATABASE_ID` = `votre_id_de_base`

### 2.5 Activer le Workflow

1. En haut à droite, activez le workflow (switch **OFF** → **ON**)
2. Le webhook sera automatiquement créé
3. Copiez l'**URL du webhook** qui apparaît dans le node "Webhook"

**Format de l'URL :**
```
https://n8n.srv1159833.hstgr.cloud/webhook/audit-ia?token=Vn3pK8tQm2Yx7Lw9aR4cJ6uZ1sF5hD0eGqB3nP7rT9wX2kM
```

---

## 🔗 Étape 3 : Configuration du Formulaire GitHub

### 3.1 Vérifier le Fichier schema.json

Le fichier `schema.json` du formulaire doit contenir :

```json
{
  "submission": {
    "endpoint": "https://n8n.srv1159833.hstgr.cloud/webhook/audit-ia?token=Vn3pK8tQm2Yx7Lw9aR4cJ6uZ1sF5hD0eGqB3nP7rT9wX2kM",
    "method": "POST",
    "contentType": "application/json"
  }
}
```

✅ **C'est déjà configuré dans votre projet !**

### 3.2 Déployer sur GitHub Pages

Si ce n'est pas déjà fait :

```bash
cd /path/to/Alpha-NC/audit_ia.v1
git add .
git commit -m "Configure n8n webhook endpoint"
git push origin main
```

Les GitHub Actions déploieront automatiquement sur GitHub Pages.

---

## 🧪 Étape 4 : Test du Workflow

### 4.1 Test Manuel via n8n

1. Dans n8n, cliquez sur **"Execute Workflow"**
2. Cliquez sur **"Listen for Test Event"** dans le node Webhook
3. Envoyez une requête test avec curl :

```bash
curl -X POST "https://n8n.srv1159833.hstgr.cloud/webhook/audit-ia?token=Vn3pK8tQm2Yx7Lw9aR4cJ6uZ1sF5hD0eGqB3nP7rT9wX2kM" \
  -H "Content-Type: application/json" \
  -d '{
    "company_name": "Test Company",
    "contact_name": "Jean Dupont",
    "contact_email": "jean.dupont@test.com",
    "contact_phone": "+33612345678",
    "q1_people": 5,
    "q5_automation_tools": "Zapier, Make",
    "biggestChallenge": "Gestion du temps",
    "submittedAt": "2026-01-02T15:30:00Z",
    "sessionId": "test-session-123",
    "utmSource": "google",
    "utmMedium": "cpc",
    "utmCampaign": "audit-ia-2026"
  }'
```

**Réponse attendue :**
```json
{
  "ok": true,
  "receivedAt": "2026-01-02T15:30:00.000Z",
  "pageId": "abc123...",
  "pageUrl": "https://notion.so/..."
}
```

### 4.2 Test depuis le Formulaire

1. Accédez à votre formulaire : `https://alpha-nc.github.io/audit_ia.v1/`
2. Remplissez toutes les questions
3. Soumettez le formulaire
4. Vérifiez dans Notion qu'une nouvelle page a été créée

### 4.3 Vérification dans Notion

1. Ouvrez votre base de données Notion
2. La dernière ligne doit contenir toutes les données du formulaire
3. Vérifiez que le titre est bien formaté (company_name, contact_name ou contact_email)

---

## 📊 Mapping des Données

Voici comment les données du formulaire sont mappées vers Notion :

| Champ Formulaire | Champ Notion | Expression n8n |
|-----------------|--------------|----------------|
| company_name | company_name | `={{ $json.company_name }}` |
| contact_firstname + contact_lastname | contact_name | `={{ $json.contact_firstname + ' ' + $json.contact_lastname }}` |
| contact_email | contact_email | `={{ $json.contact_email }}` (type: email) |
| contact_phone | contact_phone | `={{ $json.contact_phone }}` (type: phone) |
| q1_people | q1_people | `={{ Number($json.q1_people) }}` (type: number) |
| q5_automation_tools | q5_automation_tools | `={{ $json.q5_automation_tools }}` |
| q3_pains / q8_first_task | biggestChallenge | `={{ $json.biggestChallenge \|\| $json.q3_pains \|\| $json.q8_first_task }}` |
| submittedAt | submittedAt | `={{ $json.submittedAt }}` |
| sessionId | sessionId | `={{ $json.sessionId }}` |
| trackingTag | trackingTag | `={{ $json.trackingTag }}` |
| ref | ref | `={{ $json.ref }}` |
| variant | variant | `={{ $json.variant }}` |
| utmSource / utm_source | utmSource | `={{ $json.utmSource \|\| $json.utm_source }}` |
| utmMedium / utm_medium | utmMedium | `={{ $json.utmMedium \|\| $json.utm_medium }}` |
| utmCampaign / utm_campaign | utmCampaign | `={{ $json.utmCampaign \|\| $json.utm_campaign }}` |
| utmTerm / utm_term | utmTerm | `={{ $json.utmTerm \|\| $json.utm_term }}` |
| utmContent / utm_content | utmContent | `={{ $json.utmContent \|\| $json.utm_content }}` |

**Titre de la page Notion** :
```javascript
={{ $json.company_name || $json.contact_name || $json.contact_email || "Lead Audit IA" }}
```

---

## 🔐 Sécurité

### Token de Sécurité

Le workflow vérifie que chaque requête contient le token :
```
?token=Vn3pK8tQm2Yx7Lw9aR4cJ6uZ1sF5hD0eGqB3nP7rT9wX2kM
```

**⚠️ Important** :
- Ne partagez JAMAIS ce token publiquement
- Si compromis, générez un nouveau token et mettez à jour :
  - Le node "IF Token OK" dans n8n
  - Le fichier `schema.json` dans GitHub
  - L'URL du webhook

### Changer le Token

Pour générer un nouveau token sécurisé :

```bash
# Linux/Mac
openssl rand -base64 32 | tr -d '/' | cut -c1-40

# Ou en Python
python3 -c "import secrets; print(secrets.token_urlsafe(30))"
```

---

## 🐛 Dépannage

### Erreur : "Token invalide"

**Cause** : Le token dans l'URL ne correspond pas  
**Solution** :
1. Vérifiez le node "IF Token OK"
2. Assurez-vous que le token est identique dans `schema.json`

### Erreur : "Database not found"

**Cause** : L'intégration n'a pas accès à la base  
**Solution** :
1. Vérifiez que vous avez partagé la base avec l'intégration
2. Vérifiez l'ID de la base dans le node Notion

### Erreur : "Invalid property"

**Cause** : Une propriété dans le node Notion n'existe pas dans la base  
**Solution** :
1. Vérifiez que TOUTES les propriétés existent dans Notion
2. Les noms doivent correspondre EXACTEMENT (sensible à la casse)

### Pas de données reçues

**Solution** :
1. Vérifiez que le workflow est **activé** (switch ON)
2. Testez l'endpoint avec curl (voir section Test)
3. Vérifiez les logs d'exécution dans n8n

### Données manquantes dans Notion

**Solution** :
1. Vérifiez le type de champ (email, phone, number, rich_text)
2. Certains champs peuvent être vides si non fournis dans le formulaire
3. Consultez les executions logs dans n8n pour voir les données reçues

---

## 📈 Monitoring et Logs

### Consulter les Exécutions

1. Dans n8n, cliquez sur **"Executions"**
2. Vous verrez toutes les exécutions du workflow
3. Cliquez sur une exécution pour voir :
   - Les données reçues
   - Le résultat de chaque node
   - Les erreurs éventuelles

### Activer les Logs Détaillés

Dans n8n, vous pouvez activer les logs pour déboguer :

1. Settings → Environment Variables
2. Ajoutez : `N8N_LOG_LEVEL=debug`

---

## 🎉 Workflow Opérationnel

Une fois configuré, voici ce qui se passe :

1. **Utilisateur remplit le formulaire** sur GitHub Pages
2. **Formulaire envoie les données** vers n8n (POST JSON)
3. **n8n vérifie le token** (sécurité)
4. **n8n crée une page** dans Notion avec toutes les données
5. **n8n retourne une réponse** avec pageId et pageUrl
6. **Formulaire affiche** le message de succès

✅ **Automatique, sécurisé et en temps réel !**

---

## 📞 Support

Pour toute question :

1. Consultez les logs d'exécution dans n8n
2. Vérifiez la documentation Notion API : https://developers.notion.com/
3. Vérifiez la documentation n8n : https://docs.n8n.io/

---

## 📝 Résumé des Fichiers

| Fichier | Description |
|---------|-------------|
| `n8n_workflow_simple_optimal.json` | **Workflow n8n prêt à importer** (recommandé) |
| `n8n_workflow_audit_ia_optimal.json` | Workflow avec plus de nodes (version étendue) |
| `INSTALLATION_GUIDE.md` | Ce guide d'installation |
| `NOTION_SETUP.md` | Guide détaillé configuration Notion |
| `schema.json` | Configuration du formulaire |

---

**Version** : 1.0.0  
**Date** : 2026-01-02  
**Projet** : Alpha-NC / Audit IA v1
