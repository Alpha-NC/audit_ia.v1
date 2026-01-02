(function(){
  const $ = (sel, el=document) => el.querySelector(sel);

  function createEl(tag, attrs={}, children=[]){
    const el = document.createElement(tag);
    for (const [k,v] of Object.entries(attrs)){
      if (k === "class") el.className = v;
      else if (v === true) el.setAttribute(k,k);
      else if (v !== false && v != null) el.setAttribute(k, String(v));
    }
    (Array.isArray(children)?children:[children]).forEach(ch=>{
      if (ch == null) return;
      if (typeof ch === "string") el.appendChild(document.createTextNode(ch));
      else el.appendChild(ch);
    });
    return el;
  }

  function setHidden(el, hidden){
    el.classList.toggle("hidden", !!hidden);
    const input = el.querySelector("input, textarea, select");
    if (input){
      input.disabled = !!hidden;
      if (hidden){
        input.dataset.wasRequired = input.required ? "1" : "0";
        input.required = false;
      } else {
        if (input.dataset.wasRequired === "1") input.required = true;
      }
    }
  }

  function safeUUID(){
    try{
      if (crypto && crypto.randomUUID) return crypto.randomUUID();
    }catch(_){}
    return "sid_" + Math.random().toString(16).slice(2) + "_" + Date.now();
  }

  // ✅ URL UNIQUE / TRACKING (UTM + ref/variant + sessionId)
  function buildTracking(schema){
    const cfg = (schema && schema.tracking) || {};
    if (cfg.enabled === false) return {};

    const url = new URL(window.location.href);
    const sp = url.searchParams;

    const allow = Array.isArray(cfg.allowParams) ? cfg.allowParams : [];
    const includeAll = !!cfg.includeAllParams;

    const params = {};
    for (const [k,v] of sp.entries()){
      if (includeAll || allow.includes(k)){
        params[k] = v;
      }
    }

    // alias for simplicity (?source=linkedin)
    const alias = (from, to) => { if (params[from] && !params[to]) params[to] = params[from]; };
    alias("source","utm_source");
    alias("medium","utm_medium");
    alias("campaign","utm_campaign");
    alias("content","utm_content");
    alias("term","utm_term");

    const LS_KEY = "alphaNC_audit_sessionId";
    let sessionId = localStorage.getItem(LS_KEY);
    if (!sessionId){
      sessionId = safeUUID();
      localStorage.setItem(LS_KEY, sessionId);
    }

    const firstSeenKey = "alphaNC_audit_firstSeenAt";
    let firstSeenAt = localStorage.getItem(firstSeenKey);
    if (!firstSeenAt){
      firstSeenAt = new Date().toISOString();
      localStorage.setItem(firstSeenKey, firstSeenAt);
    }

    const tracking = {
      sessionId,
      firstSeenAt,
      pageUrl: window.location.href,
      path: window.location.pathname,
      params,
      tag:
        params.utm_campaign ||
        params.ref ||
        params.variant ||
        params.utm_source ||
        "direct"
    };

    if (cfg.includeReferrer) tracking.referrer = document.referrer || "";
    if (cfg.includeUserAgent) tracking.userAgent = navigator.userAgent || "";

    return tracking;
  }

  function renderField(q){
    const field = createEl("div", { class: `field ${q.layout || ""}`.trim(), "data-qid": q.id });
    const label = createEl("label", { for: q.id });

    const labelText = q.number ? `${q.number}. ${q.label}` : q.label;
    label.appendChild(document.createTextNode(labelText + " "));
    if (q.required){
      label.appendChild(createEl("span", { class:"req-star" }, ["*"]));
    }
    field.appendChild(label);

    const control = createEl("div", { class:"control" });

    if (q.type === "textarea"){
      control.appendChild(createEl("textarea", {
        id:q.id, name:q.id, rows:q.rows || 3,
        placeholder: q.placeholder || "Votre réponse…",
        required: !!q.required
      }));
    } else if (q.type === "radio"){
      const wrap = createEl("div", { class:"options", role:"radiogroup", "aria-label": q.label });
      (q.options || []).forEach((opt, idx)=>{
        const oid = `${q.id}_${idx}`;
        const input = createEl("input", { type:"radio", id:oid, name:q.id, value:opt.value, required: !!q.required });
        wrap.appendChild(createEl("label", { class:"option", for:oid }, [
          input,
          createEl("span", {}, [opt.label])
        ]));
      });
      control.appendChild(wrap);
    } else {
      const input = createEl("input", {
        type: q.type || "text",
        id:q.id, name:q.id,
        placeholder: q.placeholder || "Votre réponse…",
        required: !!q.required
      });
      if (q.type === "number"){
        input.inputMode = "decimal";
        if (q.min != null) input.min = q.min;
        if (q.step != null) input.step = q.step;
      }
      control.appendChild(input);
      if (q.unit){
        input.classList.add("has-unit");
        control.appendChild(createEl("span", { class:"unit" }, [q.unit]));
      }
    }

    field.appendChild(control);
    return field;
  }

  function applyLayouts(schema){
    const thirds = new Set(["q1_people","q4_hours","q9_budget","q10_roi"]);
    schema.sections.forEach(s=>{
      s.questions.forEach(q=>{
        if (!q.layout && thirds.has(q.id)) q.layout = "third";
      });
    });
    (schema.contact && schema.contact.fields || []).forEach(f=>{
      if (!f.layout && (f.id === "contact_firstname" || f.id === "contact_lastname" || f.id === "contact_email")) f.layout = "half";
    });
  }

  function buildPages(schema){
    applyLayouts(schema);

    const pages = [];
    const mount = $("#pages");
    mount.innerHTML = "";

    // Page 1: Hero
    const p1 = createEl("section", { class:"page", "data-step":"1" });
    p1.appendChild(createEl("div", { class:"hero" }, [
      createEl("div", { class:"logo" }, [ createEl("img", { src:(schema.assets && schema.assets.logo) || "alpha-nc-logo.png", alt:"Logo Alpha No-Code" }) ]),
      createEl("h1", {}, [(schema.meta && schema.meta.title) || "Audit IA – 10 Questions"]),
      createEl("p", {}, [(schema.meta && schema.meta.subtitle) || ""])
    ]));
    p1.appendChild(createEl("div", { class:"card" }, [
      createEl("div", { style:"font-weight:700; color:#1D2B64; margin-bottom:8px;" }, ["Comment ça marche ?"]),
      createEl("div", { style:"color:#64748B; line-height:1.55; margin-bottom:20px;" }, [
        "5 étapes rapides. Répondez simplement."
      ]),
      createEl("button", { 
        type:"button", 
        class:"btn hero-start-btn",
        id:"btnStart"
      }, ["Commencer"])
    ]));
    pages.push(p1);

    // Pages 2-5: sections (4 sections = 4 étapes)
    const mapping = [
      {step:2, idx:0},
      {step:3, idx:1},
      {step:4, idx:2},
      {step:5, idx:3}
    ];
    mapping.forEach(({step, idx})=>{
      const sec = schema.sections[idx];
      const page = createEl("section", { class:"page", "data-step": String(step) });
      const card = createEl("div", { class:"card" });
      card.appendChild(createEl("h2", { class:"section-title" }, [sec.title]));
      const grid = createEl("div", { class:"grid" });
      sec.questions.forEach(q=> grid.appendChild(renderField(q)));
      card.appendChild(grid);
      page.appendChild(card);
      pages.push(page);
    });

    // Page 6: contact + send (5ème étape)
    const p6 = createEl("section", { class:"page", "data-step":"6" });
    const c6 = createEl("div", { class:"card" });
    c6.appendChild(createEl("h2", { class:"section-title" }, [(schema.contact && schema.contact.title) || "Coordonnées"]));
    const g6 = createEl("div", { class:"grid" });
    (schema.contact && schema.contact.fields || []).forEach(q => g6.appendChild(renderField(Object.assign({}, q, { number:null }))));
    c6.appendChild(g6);
    p6.appendChild(c6);

    p6.appendChild(createEl("div", { class:"card", style:"margin-top:14px;" }, [
      createEl("div", { style:"font-weight:800; color:#1D2B64; font-size:18px; margin-bottom:6px;" }, ["Prêt à envoyer ?"]),
      createEl("div", { style:"color:#64748B; line-height:1.55;" }, ["Cliquez sur “Envoyer” dans le bandeau du bas."])
    ]));
    pages.push(p6);

    // Page 7: success
    const p7 = createEl("section", { class:"page", "data-step":"7" });
    const c7 = createEl("div", { class:"card success" });
    c7.appendChild(createEl("div", { class:"success-badge" }, ["✅ Félicitations"]));
    c7.appendChild(createEl("h2", {}, [(schema.success && schema.success.subtitle) || "Bravo — vous êtes sur la bonne voie."]));
    c7.appendChild(createEl("p", {}, [(schema.success && schema.success.text) || ""]));
    p7.appendChild(c7);
    pages.push(p7);

    pages.forEach(p => mount.appendChild(p));
    return pages;
  }

  function groupsInfo(form){
    const inputs = Array.from(form.querySelectorAll("input, textarea")).filter(el => el.name && !el.disabled);
    const radioNames = new Set(inputs.filter(i=>i.type==="radio").map(i=>i.name));
    const nonRadio = inputs.filter(i=>i.type!=="radio");
    return { radioNames, nonRadio };
  }

  function updateProgress(){
    const form = $("#audit-form");
    const info = groupsInfo(form);

    const answeredNonRadio = info.nonRadio.filter(el => String(el.value || "").trim().length > 0).length;
    let answeredRadios = 0;
    info.radioNames.forEach(name=>{
      if (form.querySelector(`input[type="radio"][name="${CSS.escape(name)}"]:checked`)) answeredRadios++;
    });

    const total = info.nonRadio.length + info.radioNames.size;
    const done = answeredNonRadio + answeredRadios;
    const pct = total ? Math.round((done/total)*100) : 0;

    $("#progress-bar").style.width = `${pct}%`;
    $("#progress-label").textContent = `${pct}% complété`;

    if (wizard.step === 6 || wizard.step === 7){
      $("#progress-bar").style.width = "100%";
      $("#progress-label").textContent = "100% complété";
    }
  }

  function validatePage(step){
    const page = wizard.pages.find(p => p.getAttribute("data-step") === String(step));
    if (!page) return true;
    const invalid = page.querySelector(":invalid");
    if (!invalid) return true;
    invalid.focus({ preventScroll:false });
    invalid.scrollIntoView({ behavior:"smooth", block:"center" });
    return false;
  }

  function getFormData(){
    const fd = new FormData($("#audit-form"));
    const obj = {};
    for (const [k,v] of fd.entries()) obj[k] = v;
    return obj;
  }

  function wireConditional(schema){
    const form = $("#audit-form");
    const conditionals = [];

    schema.sections.forEach(sec=>{
      sec.questions.forEach(q=>{
        if (q.showWhen){
          const wrap = form.querySelector(`[data-qid="${CSS.escape(q.id)}"]`);
          if (wrap) conditionals.push({ q, wrap });
        }
      });
    });

    function evalAll(){
      conditionals.forEach(({q, wrap})=>{
        const depName = q.showWhen.field;
        const dep = form.querySelector(`[name="${CSS.escape(depName)}"]:checked`) || form.querySelector(`[name="${CSS.escape(depName)}"]`);
        const val = (dep && dep.value) || "";
        setHidden(wrap, val !== q.showWhen.equals);
      });
    }

    form.addEventListener("change", evalAll);
    evalAll();
  }

  async function sendToN8N(payload){
    const status = $("#status");
    status.style.display = "block";
    status.classList.remove("error");

    const endpoint = wizard.schema && wizard.schema.submission && wizard.schema.submission.endpoint;
    if (!endpoint || endpoint.includes("YOUR-N8N-DOMAIN") || endpoint.includes("CHANGE_ME")){
      status.classList.add("error");
      status.textContent = "⚠️ Endpoint n8n non configuré. Ouvrez schema.json et remplacez l’URL.";
      return false;
    }

    try{
      status.textContent = "Envoi en cours…";
      const res = await fetch("https://corsproxy.io/?" + encodeURIComponent(endpoint), {
        method: "POST",
                      headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("HTTP " + res.status);
      status.textContent = "✅ Réponses envoyées. Merci !";
      return true;
    }catch(err){
      console.error(err);
      status.classList.add("error");
      status.textContent = "⚠️ Envoi bloqué (souvent CORS). Vérifiez les headers côté n8n.";
      return false;
    }
  }

  const wizard = { step: 1, pages: [], schema: null, tracking: {} };

  function showStep(step){
    wizard.step = step;
    wizard.pages.forEach(p => p.classList.toggle("active", p.getAttribute("data-step") === String(step)));

    // Masquer l'objectif sur la page 1
    const objective = $("#objective");
    if (objective) {
      objective.style.display = (step === 1) ? "none" : "block";
    }

    $("#btnBack").style.display = (step === 1 || step === 7) ? "none" : "inline-block";
    $("#btnNext").style.display = (step >= 2 && step <= 5) ? "inline-block" : "none";
    $("#btnSubmit").style.display = (step === 6) ? "inline-block" : "none";

    // Afficher l'étape seulement pour les pages 2-6 (5 étapes)
    if (step === 1) {
      $("#stepLabel").textContent = "";
    } else if (step === 7) {
      $("#stepLabel").textContent = "";
    } else {
      $("#stepLabel").textContent = `Étape ${step - 1} / 5`;
    }

    const status = $("#status");
    status.style.display = "none";
    status.classList.remove("error");

    window.scrollTo({ top: 0, behavior: "smooth" });
    updateProgress();
  }

  async function main(){
    const res = await fetch("./schema.json", { cache: "no-store" });
    if (!res.ok) throw new Error("schema.json introuvable (404). Vérifiez qu’il est à la racine du repo.");
    const schema = await res.json();
    wizard.schema = schema;
    wizard.tracking = buildTracking(schema);

    $("#objective-text").textContent = (schema.meta && schema.meta.objective) || "Objectif : …";

    wizard.pages = buildPages(schema);
    wireConditional(schema);

    const form = $("#audit-form");
    form.addEventListener("input", updateProgress);
    form.addEventListener("change", updateProgress);

    $("#btnBack").addEventListener("click", ()=> {
      if (wizard.step > 1) showStep(wizard.step - 1);
    });

    $("#btnStart").addEventListener("click", ()=> {
      showStep(2);
    });

    $("#btnNext").addEventListener("click", ()=>{
      if (!validatePage(wizard.step)){
        const s = $("#status");
        s.style.display = "block";
        s.classList.add("error");
        s.textContent = "⚠️ Il manque un champ obligatoire sur cette étape.";
        return;
      }
      showStep(Math.min(6, wizard.step + 1));
    });

    $("#btnSubmit").addEventListener("click", async ()=>{
      if (!validatePage(6)){
        const s = $("#status");
        s.style.display = "block";
        s.classList.add("error");
        s.textContent = "⚠️ Vérifiez les champs obligatoires.";
        return;
      }

      const invalid = form.querySelector(":invalid");
      if (invalid){
        const page = invalid.closest(".page");
        if (page) showStep(Number(page.getAttribute("data-step")) || 2);

        setTimeout(()=>{
          invalid.focus({ preventScroll:false });
          invalid.scrollIntoView({ behavior:"smooth", block:"center" });
        }, 150);

        const s = $("#status");
        s.style.display = "block";
        s.classList.add("error");
        s.textContent = "⚠️ Certains champs obligatoires manquent.";
        return;
      }

      const payload = {
        meta: {
          title: schema.meta && schema.meta.title,
          brand: schema.meta && schema.meta.brand,
          submittedAt: new Date().toISOString(),
          tracking: wizard.tracking
        },
        answers: getFormData()
      };

      const ok = await sendToN8N(payload);
      if (ok) showStep(7);
    });


    showStep(1);
    // Masquer l'objectif sur la page 1 au démarrage
    const objective = $("#objective");
    if (objective) {
      objective.style.display = "none";
    }
    console.log("[AlphaNC] tracking:", wizard.tracking);
  }

  main().catch(err=>{
    console.error(err);
    const status = $("#status");
    if (status){
      status.style.display = "block";
      status.classList.add("error");
      status.textContent = "⚠️ Erreur de chargement. Vérifiez que index.html / styles.css / app.js / schema.json sont à la racine du repo GitHub Pages.";
    }
  });
})();
