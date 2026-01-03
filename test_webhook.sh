#!/bin/bash

# 🧪 Script de Test - Workflow n8n Audit IA → Notion
# Ce script teste l'endpoint webhook avec différents scénarios

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
WEBHOOK_URL="https://n8n.srv1159833.hstgr.cloud/webhook/audit-ia"
VALID_TOKEN="Vn3pK8tQm2Yx7Lw9aR4cJ6uZ1sF5hD0eGqB3nP7rT9wX2kM"
INVALID_TOKEN="invalid_token_123"

echo -e "${BLUE}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║           Test Workflow n8n - Audit IA → Notion              ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Fonction pour tester un endpoint
test_endpoint() {
    local test_name="$1"
    local url="$2"
    local data="$3"
    local expected_status="$4"
    
    echo -e "${YELLOW}► Test: ${test_name}${NC}"
    echo -e "  URL: ${url}"
    echo ""
    
    response=$(curl -s -w "\n%{http_code}" -X POST "$url" \
        -H "Content-Type: application/json" \
        -d "$data")
    
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')
    
    echo -e "  Réponse HTTP: ${http_code}"
    echo -e "  Body: ${body}"
    echo ""
    
    if [ "$http_code" -eq "$expected_status" ]; then
        echo -e "${GREEN}✓ Test réussi !${NC}"
    else
        echo -e "${RED}✗ Test échoué ! (attendu: ${expected_status}, reçu: ${http_code})${NC}"
    fi
    
    echo ""
    echo "─────────────────────────────────────────────────────────────────"
    echo ""
}

# Test 1 : Token valide avec toutes les données
echo -e "${BLUE}[1/5] Test avec token valide et données complètes${NC}"
test_endpoint \
    "Token valide + Données complètes" \
    "${WEBHOOK_URL}?token=${VALID_TOKEN}" \
    '{
        "company_name": "Alpha No-Code SARL",
        "contact_firstname": "Jean",
        "contact_lastname": "Dupont",
        "contact_email": "jean.dupont@alphanocode.com",
        "contact_phone": "+33612345678",
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
        "sessionId": "sess_test_abc123xyz",
        "trackingTag": "landing-v2",
        "ref": "newsletter-jan",
        "variant": "variant-a",
        "utmSource": "google",
        "utmMedium": "cpc",
        "utmCampaign": "audit-ia-launch-2026",
        "utmTerm": "automatisation ia",
        "utmContent": "cta-blue"
    }' \
    200

# Test 2 : Token valide avec données minimales
echo -e "${BLUE}[2/5] Test avec token valide et données minimales${NC}"
test_endpoint \
    "Token valide + Données minimales" \
    "${WEBHOOK_URL}?token=${VALID_TOKEN}" \
    '{
        "contact_email": "minimal@test.com",
        "contact_phone": "+33698765432",
        "q1_people": 1,
        "submittedAt": "2026-01-02T16:00:00Z"
    }' \
    200

# Test 3 : Token invalide
echo -e "${BLUE}[3/5] Test avec token invalide${NC}"
test_endpoint \
    "Token invalide" \
    "${WEBHOOK_URL}?token=${INVALID_TOKEN}" \
    '{
        "contact_email": "test@example.com",
        "q1_people": 3
    }' \
    401

# Test 4 : Sans token
echo -e "${BLUE}[4/5] Test sans token${NC}"
test_endpoint \
    "Sans token" \
    "${WEBHOOK_URL}" \
    '{
        "contact_email": "test@example.com",
        "q1_people": 3
    }' \
    401

# Test 5 : Token valide avec UTM alternatifs (utm_source au lieu de utmSource)
echo -e "${BLUE}[5/5] Test avec format UTM alternatif${NC}"
test_endpoint \
    "Token valide + UTM alternatifs" \
    "${WEBHOOK_URL}?token=${VALID_TOKEN}" \
    '{
        "company_name": "Test UTM Company",
        "contact_email": "utm@test.com",
        "contact_phone": "+33611223344",
        "q1_people": 8,
        "utm_source": "facebook",
        "utm_medium": "social",
        "utm_campaign": "fb-ads-jan-2026",
        "utm_term": "automation",
        "utm_content": "carousel-ad-1",
        "submittedAt": "2026-01-02T17:00:00Z"
    }' \
    200

echo -e "${BLUE}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                      Tests terminés !                          ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${YELLOW}Vérifiez maintenant votre base Notion pour confirmer que les pages ont été créées.${NC}"
echo ""
