# Audit IA (Wizard 7 pages) — GitHub Pages → n8n

## 1) Configuration
- Ouvrez `schema.json`
- Remplacez :
  - `submission.endpoint` par votre URL n8n (webhook PROD)
  - Exemple : `https://votre-n8n.com/webhook/audit-ia?token=VOTRE_TOKEN`

## 2) GitHub Pages
Settings → Pages → Deploy from branch → main → /(root)

## 3) CORS côté n8n (obligatoire)
Ajoutez dans la réponse du workflow (Respond to Webhook) :
- Access-Control-Allow-Origin: *
- Access-Control-Allow-Headers: Content-Type
- Access-Control-Allow-Methods: POST, OPTIONS

Si CORS bloque, vous verrez un message d’erreur côté page.

## 4) URL unique / tracking
Ajoutez vos paramètres :
- ?utm_source=linkedin&utm_medium=post&utm_campaign=audit_v1&variant=carousel
- ?ref=partenaireX&campaign=deal_2026

Ils arrivent dans `meta.tracking.params` + `meta.tracking.tag`.
