# Audit IA — GitHub Pages → n8n (FIX V2)

## 1) Endpoint n8n
Le formulaire envoie vers :
https://n8n.srv1159833.hstgr.cloud/webhook/audit-ia?token=Vn3pK8tQm2Yx7Lw9aR4cJ6uZ1sF5hD0eGqB3nP7rT9wX2kM

## 2) Import workflow n8n
Importer `n8n_workflow_import.json` dans n8n.

⚠️ Le workflow inclut :
- IF Token OK (vérifie `query.token`)
- Notion Create Page (titre lisible)
- Respond 200 renvoie un JSON: {ok:true, receivedAt, pageId}

## 3) IMPORTANT (Notion)
Dans le node Notion, les propriétés utilisées sont :
- company_name (rich_text)
- contact_email (email)

Si ta base Notion n’a pas ces propriétés EXACTEMENT, il faut les créer ou adapter les clés.

## 4) Test
Sur GitHub Pages, envoi → F12 → Network → POST
Tu dois voir en réponse :
{"ok":true, "receivedAt":"...", "pageId":"..."}
