const TOPIC_ILLUSTRATIONS = {
    FRONT: {
        caption: 'Desenvolvedor Front-End UI/UX',
        svg: `<svg viewBox="0 0 100 100" class="w-full h-full fill-none stroke-current text-[var(--primary-color)] stroke-2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="50" cy="25" r="12" />
            <line x1="50" y1="37" x2="50" y2="65" />
            <line x1="50" y1="45" x2="30" y2="55" />
            <line x1="50" y1="45" x2="70" y2="55" />
            <line x1="50" y1="65" x2="35" y2="90" />
            <line x1="50" y1="65" x2="65" y2="90" />
            <rect x="20" y="50" width="25" height="18" rx="2" class="fill-slate-900/80 stroke-current" />
            <polyline points="26,56 22,59 26,62" />
            <polyline points="38,56 42,59 38,62" />
        </svg>`
    },
    BACK: {
        caption: 'Arquiteto Back-End & APIs',
        svg: `<svg viewBox="0 0 100 100" class="w-full h-full fill-none stroke-current text-[var(--primary-color)] stroke-2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="30" cy="25" r="10" />
            <line x1="30" y1="35" x2="30" y2="65" />
            <line x1="30" y1="45" x2="55" y2="40" />
            <line x1="30" y1="65" x2="18" y2="90" />
            <line x1="30" y1="65" x2="42" y2="90" />
            <rect x="55" y="25" width="35" height="15" rx="3" class="fill-slate-900/80 stroke-current" />
            <rect x="55" y="45" width="35" height="15" rx="3" class="fill-slate-900/80 stroke-current" />
            <rect x="55" y="65" width="35" height="15" rx="3" class="fill-slate-900/80 stroke-current" />
            <circle cx="62" cy="32.5" r="1.5" class="fill-current" />
            <circle cx="62" cy="52.5" r="1.5" class="fill-current" />
            <circle cx="62" cy="72.5" r="1.5" class="fill-current" />
        </svg>`
    },
    DESIGN: {
        caption: 'Designer de Produtos Digitais',
        svg: `<svg viewBox="0 0 100 100" class="w-full h-full fill-none stroke-current text-[var(--primary-color)] stroke-2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="50" cy="22" r="10" />
            <line x1="50" y1="32" x2="50" y2="60" />
            <line x1="50" y1="40" x2="25" y2="30" />
            <line x1="50" y1="40" x2="75" y2="30" />
            <line x1="50" y1="60" x2="35" y2="88" />
            <line x1="50" y1="60" x2="65" y2="88" />
            <path d="M 20 25 C 20 15, 35 15, 35 25 C 35 35, 20 35, 20 25 Z" class="fill-slate-900/80 stroke-current" />
            <circle cx="25" cy="22" r="2" class="fill-current" />
            <circle cx="30" cy="28" r="2" class="fill-current" />
        </svg>`
    },
    AWS: {
        caption: 'Especialista em Nuvem AWS',
        svg: `<svg viewBox="0 0 100 100" class="w-full h-full fill-none stroke-current text-[var(--primary-color)] stroke-2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M 25 60 A 18 18 0 0 1 40 32 A 22 22 0 0 1 80 40 A 16 16 0 0 1 75 60 Z" class="fill-slate-900/80 stroke-current" />
            <circle cx="50" cy="70" r="8" />
            <line x1="50" y1="78" x2="50" y2="92" />
            <line x1="50" y1="82" x2="38" y2="88" />
            <line x1="50" y1="82" x2="62" y2="88" />
            <line x1="50" y1="60" x2="50" y2="48" />
        </svg>`
    },
    DEFAULT: {
        caption: 'Especialista Técnico',
        svg: `<svg viewBox="0 0 100 100" class="w-full h-full fill-none stroke-current text-[var(--primary-color)] stroke-2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="50" cy="30" r="14" />
            <line x1="50" y1="44" x2="50" y2="70" />
            <line x1="50" y1="52" x2="25" y2="40" />
            <line x1="50" y1="52" x2="75" y2="40" />
            <line x1="50" y1="70" x2="32" y2="92" />
            <line x1="50" y1="70" x2="68" y2="92" />
            <polygon points="50,18 53,26 62,26 55,31 58,39 50,34 42,39 45,31 38,26 47,26" class="fill-amber-400 stroke-none" />
        </svg>`
    }
};

const DEFAULT_STATE = {
    template: 'wireframe',
    primaryColor: '#f59e0b',
    bgColor: '#0f172a',
    textColor: '#f1f5f9',
    fontFamily: "'Inter', sans-serif",
    fontScale: '1.0',
    cardRadius: '12px',
    activeTopic: 'FRONT',
    topics: [
        { key: 'FRONT', name: 'FRONT', desc: 'Desenvolvimento de interfaces modernas, responsivas e interativas utilizando React, Vue, Tailwind CSS e TypeScript.', imgUrl: null },
        { key: 'BACK', name: 'BACK', desc: 'Construção de APIs RESTful de alta performance, arquitetura de microsserviços, Node.js, Python e SQL/NoSQL.', imgUrl: null },
        { key: 'DESIGN', name: 'DESIGN', desc: 'Criação de protótipos interativos de alta fidelidade, sistemas de design UI/UX e experiência do usuário focada no produto.', imgUrl: null },
        { key: 'AWS', name: 'AWS', desc: 'Arquitetura Serverless em nuvem, configuração de Buckets S3, distribuições CloudFront e esteiras de CI/CD.', imgUrl: null }
    ],
    content: {
        name: 'Wellerson Morais',
        bio: 'Arquiteto de Nuvem & Desenvolvedor Full Stack apaixonado por criar portfólios elegantes usando tecnologia de ponta na AWS.',
        avatar: ''
    },
    sections: {
        about: true,
        skills: true,
        certs: true
    },
    skills: ['JavaScript', 'TypeScript', 'Vite', 'React', 'HTML', 'CSS', 'Node.js', 'AWS S3', 'CloudFront'],
    certs: [
        { name: 'AWS Cloud Practitioner', type: 'PDF' },
        { name: 'AWS Solutions Architect', type: 'PDF' },
        { name: 'Developer Associate', type: 'IMG' }
    ]
};

const API_URL = 'https://h26oarm1s7.execute-api.us-east-2.amazonaws.com';

let state = JSON.parse(JSON.stringify(DEFAULT_STATE));
let isPreviewMode = false;
let isReadOnly = false;

window.onload = async function() {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('user');

    if (userId) {
        try {
            await loadPortfolioFromCloud(userId);
            isReadOnly = true;
            isPreviewMode = true;
            updatePreviewModeUI();
        } catch (e) {
            console.error('Erro ao carregar portfólio da API', e);
            state = JSON.parse(JSON.stringify(DEFAULT_STATE));
        }
    } else {
        state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    }

    syncUIWithState();
    renderPortfolio();
};

function syncUIWithState() {
    document.getElementById('primary-color').value = state.primaryColor;
    document.getElementById('primary-color-text').value = state.primaryColor;
    document.getElementById('bg-color').value = state.bgColor;
    document.getElementById('bg-color-text').value = state.bgColor;
    document.getElementById('text-color').value = state.textColor || '#f1f5f9';
    document.getElementById('text-color-text').value = state.textColor || '#f1f5f9';

    document.getElementById('font-family-select').value = state.fontFamily;
    document.getElementById('font-scale').value = state.fontScale;
    document.getElementById('border-radius').value = parseInt(state.cardRadius);

    document.getElementById('content-name').value = state.content.name;
    document.getElementById('content-bio').value = state.content.bio;

    document.getElementById('chk-sec-about').checked = state.sections.about;
    document.getElementById('chk-sec-skills').checked = state.sections.skills;
    document.getElementById('chk-sec-certs').checked = state.sections.certs;

    if (state.content.avatar) {
        const img = document.getElementById('avatar-image');
        const fallback = document.getElementById('avatar-fallback');
        img.src = state.content.avatar;
        img.classList.remove('hidden');
        fallback.classList.add('hidden');
    }

    renderEditorTopicsList();
    updateTemplateButtonsUI(state.template);
    updatePreviewModeUI();
}

function renderEditorTopicsList() {
    const listContainer = document.getElementById('editor-topics-list');
    if (!listContainer) return;
    listContainer.innerHTML = '';

    state.topics.forEach((topic) => {
        const item = document.createElement('div');
        item.className = 'bg-slate-900 border border-slate-800 rounded p-2 flex flex-col gap-1.5';

        const header = document.createElement('div');
        header.className = 'flex justify-between items-center';

        const title = document.createElement('span');
        title.className = 'text-[11px] font-bold text-amber-400 font-mono';
        title.innerText = topic.name;
        header.appendChild(title);

        if (state.topics.length > 1) {
            const delBtn = document.createElement('button');
            delBtn.className = 'text-rose-400 hover:text-rose-300 text-[10px]';
            delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
            delBtn.onclick = () => removeTopic(topic.key);
            header.appendChild(delBtn);
        }

        item.appendChild(header);

        const descInput = document.createElement('textarea');
        descInput.rows = 2;
        descInput.className = 'w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-[10px] text-slate-300 resize-none';
        descInput.value = topic.desc;
        descInput.oninput = (e) => updateTopicDesc(topic.key, e.target.value);
        item.appendChild(descInput);

        listContainer.appendChild(item);
    });
}

function updateTemplateButtonsUI(tmpl) {
    const templates = ['wireframe', 'tech', 'minimal'];
    templates.forEach((t) => {
        const btn = document.getElementById('btn-tmpl-' + t);
        if (btn) {
            if (t === tmpl) {
                btn.className = 'p-2 text-[11px] font-medium rounded-lg border bg-slate-900 border-amber-500/50 text-amber-400 hover:bg-slate-800 transition text-center leading-tight';
            } else {
                btn.className = 'p-2 text-[11px] font-medium rounded-lg border bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 transition text-center leading-tight';
            }
        }
    });
}

function renderPortfolio() {
    const canvas = document.getElementById('portfolio-canvas');
    canvas.style.setProperty('--primary-color', state.primaryColor);
    canvas.style.setProperty('--bg-color', state.bgColor);
    canvas.style.setProperty('--text-color', state.textColor || '#f1f5f9');
    canvas.style.setProperty('--font-family', state.fontFamily);
    canvas.style.setProperty('--font-scale', state.fontScale);
    canvas.style.setProperty('--card-radius', state.cardRadius);

    document.getElementById('view-name').innerText = state.content.name;
    document.getElementById('view-bio').innerText = state.content.bio;

    const viewRoleContainer = document.getElementById('view-role-container');
    viewRoleContainer.innerHTML = '';

    state.topics.forEach((topic) => {
        const cleanKey = topic.key.toUpperCase();
        const btn = document.createElement('button');
        const isActive = (state.activeTopic || state.topics[0].key).toUpperCase() === cleanKey;

        btn.className = isActive
            ? 'text-[11px] font-mono font-bold tracking-wider uppercase px-3 py-1 rounded shadow-md transition transform scale-105 bg-[var(--primary-color)] text-slate-950'
            : 'text-[11px] font-mono font-semibold tracking-wider uppercase px-3 py-1 rounded border border-slate-700/80 text-slate-300 bg-slate-800/60 hover:border-[var(--primary-color)] transition';

        btn.innerText = topic.name;
        btn.onclick = () => selectTopic(cleanKey);
        viewRoleContainer.appendChild(btn);
    });

    const activeTopicObj = state.topics.find((t) => t.key.toUpperCase() === (state.activeTopic || 'FRONT').toUpperCase()) || state.topics[0];
    document.getElementById('topic-exp-title').innerText = `Experiência ${activeTopicObj.name}`;
    document.getElementById('topic-exp-desc').innerText = activeTopicObj.desc;

    renderCenterIllustration();

    toggleElementDisplay('sec-about', state.sections.about);
    toggleElementDisplay('sec-skills', state.sections.skills);
    toggleElementDisplay('sec-certs', state.sections.certs);

    const skillsList = document.getElementById('skills-list');
    skillsList.innerHTML = '';
    state.skills.forEach((skill) => {
        const skillTag = document.createElement('div');
        skillTag.className = 'flex items-center gap-1.5 bg-slate-800/50 border border-slate-700/60 rounded-md px-2 py-0.5 text-[11px] font-[var(--font-family)]';
        skillTag.style.color = 'var(--text-color)';

        const skillText = document.createElement('span');
        skillText.innerText = skill;
        skillTag.appendChild(skillText);

if (!isReadOnly) {
                const delBtn = document.createElement('button');
                delBtn.className = 'edit-control text-rose-500 hover:text-rose-400 ml-1 cursor-pointer';
                delBtn.innerHTML = '<i class="fa-solid fa-xmark text-[10px]"></i>';
                delBtn.onclick = () => removeSkill(skill);
                skillTag.appendChild(delBtn);
            }

        skillsList.appendChild(skillTag);
    });

    const certsGrid = document.getElementById('certs-grid');
    certsGrid.innerHTML = '';
    state.certs.forEach((cert) => {
        const certCard = document.createElement('div');
        certCard.className = 'bg-slate-800/30 border border-slate-800 rounded-[var(--card-radius)] p-3 flex flex-col items-center justify-center text-center gap-1.5 group relative hover:border-[var(--primary-color)] transition';

        const iconWrapper = document.createElement('div');
        iconWrapper.className = 'w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-[var(--primary-color)]';
        iconWrapper.innerHTML = cert.type === 'PDF'
            ? '<i class="fa-solid fa-file-pdf text-xs"></i>'
            : '<i class="fa-solid fa-file-image text-xs"></i>';
        certCard.appendChild(iconWrapper);

        const title = document.createElement('span');
        title.className = 'text-[10px] font-medium leading-snug font-[var(--font-family)] line-clamp-2';
        title.style.color = 'var(--text-color)';
        title.innerText = cert.name;
        certCard.appendChild(title);

if (!isReadOnly) {
                    const delCertBtn = document.createElement('button');
                    delCertBtn.className = 'edit-control absolute top-1 right-1 text-rose-500 opacity-0 group-hover:opacity-100 transition';
                    delCertBtn.innerHTML = '<i class="fa-solid fa-xmark text-[10px]"></i>';
                    delCertBtn.onclick = () => removeCert(cert.name);
                    certCard.appendChild(delCertBtn);
                }

        certsGrid.appendChild(certCard);
    });

    updateURLDisplay();
}

function promptAddTopic() {
    const name = prompt('Nome da nova especialidade (ex: DEVOPS, MOBILE, AI):');
    if (name && name.trim() !== '') {
        const key = name.trim().toUpperCase();
        if (!state.topics.some((t) => t.key === key)) {
            const desc = prompt(`Descrição da sua experiência em ${key}:`) || `Especialista em desenvolvimento e soluções para ${key}.`;
            state.topics.push({ key, name: key, desc });
            state.activeTopic = key;
            syncUIWithState();
            renderPortfolio();
        }
    }
}

function removeTopic(key) {
    if (state.topics.length <= 1) return;
    state.topics = state.topics.filter((t) => t.key !== key);
    if (state.activeTopic === key) {
        state.activeTopic = state.topics[0].key;
    }
    syncUIWithState();
    renderPortfolio();
}

function updateTopicDesc(key, desc) {
    const t = state.topics.find((top) => top.key === key);
    if (t) {
        t.desc = desc;
        renderPortfolio();
    }
}

function selectTopic(topicKey) {
    state.activeTopic = topicKey;
    renderPortfolio();
}

function renderCenterIllustration() {
    const key = (state.activeTopic || 'FRONT').toUpperCase();
    const activeTopicObj = state.topics.find((t) => t.key.toUpperCase() === key) || state.topics[0];
    const data = TOPIC_ILLUSTRATIONS[key] || TOPIC_ILLUSTRATIONS.DEFAULT;

    document.getElementById('active-topic-badge').innerText = key;
    document.getElementById('illustration-caption').innerText = activeTopicObj.name + ' - Especialidade';

    const illustrationBox = document.getElementById('center-illustration-box');

    if (activeTopicObj.imgUrl) {
        illustrationBox.innerHTML = `<img src="${activeTopicObj.imgUrl}" class="w-full h-full object-contain rounded-md" alt="Ilustração ${activeTopicObj.name}">`;
    } else {
        illustrationBox.innerHTML = data.svg;
    }
}

function updateStyleVar(variable, value) {
    if (variable === '--primary-color') state.primaryColor = value;
    if (variable === '--bg-color') state.bgColor = value;
    if (variable === '--text-color') state.textColor = value;
    if (variable === '--font-family') state.fontFamily = value;
    if (variable === '--font-scale') state.fontScale = value;
    if (variable === '--card-radius') state.cardRadius = value;

    syncUIWithState();
    renderPortfolio();
}

function updateContent(key, value) {
    state.content[key] = value;
    renderPortfolio();
}

function toggleElementDisplay(id, visible) {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('hidden', !visible);
}

function toggleSection(section, value) {
    state.sections[section] = value;
    const chk = document.getElementById('chk-sec-' + section);
    if (chk) chk.checked = value;
    renderPortfolio();
}

function setTemplate(tmpl) {
    state.template = tmpl;

    if (tmpl === 'wireframe') {
        state.primaryColor = '#f59e0b';
        state.bgColor = '#0f172a';
        state.textColor = '#f1f5f9';
        state.fontFamily = "'Inter', sans-serif";
        state.cardRadius = '12px';
    } else if (tmpl === 'tech') {
        state.primaryColor = '#10b981';
        state.bgColor = '#090d16';
        state.textColor = '#e2e8f0';
        state.fontFamily = "'JetBrains Mono', monospace";
        state.cardRadius = '6px';
    } else if (tmpl === 'minimal') {
        state.primaryColor = '#6366f1';
        state.bgColor = '#fafafa';
        state.textColor = '#0f172a';
        state.fontFamily = "'Inter', sans-serif";
        state.cardRadius = '16px';
    }

    syncUIWithState();
    renderPortfolio();
}

function promptAddSkill() {
    const skill = prompt('Nome da nova habilidade:');
    if (skill && skill.trim() !== '') {
        if (!state.skills.includes(skill.trim())) {
            state.skills.push(skill.trim());
            renderPortfolio();
        }
    }
}

function removeSkill(skill) {
    state.skills = state.skills.filter((s) => s !== skill);
    renderPortfolio();
}

function promptAddCert() {
    const name = prompt('Nome do Certificado:');
    if (name && name.trim() !== '') {
        const type = confirm('O formato é PDF? (Cancelar para Imagem)') ? 'PDF' : 'IMG';
        state.certs.push({ name: name.trim(), type });
        renderPortfolio();
    }
}

function removeCert(name) {
    state.certs = state.certs.filter((c) => c.name !== name);
    renderPortfolio();
}

function triggerAvatarUpload() {
    document.getElementById('avatar-file-input').click();
}

function loadAvatar(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            state.content.avatar = e.target.result;
            const img = document.getElementById('avatar-image');
            const fallback = document.getElementById('avatar-fallback');
            img.src = e.target.result;
            img.classList.remove('hidden');
            fallback.classList.add('hidden');
            renderPortfolio();
        };
        reader.readAsDataURL(file);
    }
}

function triggerTopicImageUpload() {
    document.getElementById('topic-image-input').click();
}

function loadTopicImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const activeKey = state.activeTopic.toUpperCase();
            const topicIndex = state.topics.findIndex((t) => t.key.toUpperCase() === activeKey);

            if (topicIndex !== -1) {
                state.topics[topicIndex].imgUrl = e.target.result;
                renderPortfolio();
            }
        };
        reader.readAsDataURL(file);
    }
}

function togglePreviewMode() {
    if (isReadOnly) return;
    isPreviewMode = !isPreviewMode;
    updatePreviewModeUI();
}

function updatePreviewModeUI() {
    const sidebar = document.getElementById('editor-panel');
    const indicators = document.querySelectorAll('.edit-control');
    const editBadge = document.getElementById('edit-indicator');
    const btn = document.getElementById('btn-preview-mode');
    const icon = document.getElementById('preview-icon');
    const text = document.getElementById('preview-text');

    if (isReadOnly) {
        if (sidebar) sidebar.classList.add('hidden');
        if (editBadge) editBadge.classList.add('hidden');
        indicators.forEach((el) => el.classList.add('hidden'));
        if (btn) {
            btn.classList.add('hidden');
        }
        updateURLDisplay();
        return;
    }

    if (isPreviewMode) {
        sidebar.classList.add('hidden');
        editBadge.classList.add('hidden');
        indicators.forEach((el) => el.classList.add('hidden'));
        icon.className = 'fa-solid fa-pen-to-square';
        text.innerText = 'Modo de Edição';
        btn.className = 'bg-amber-600 hover:bg-amber-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 shadow-md shadow-amber-950/25';
    } else {
        sidebar.classList.remove('hidden');
        editBadge.classList.remove('hidden');
        indicators.forEach((el) => el.classList.remove('hidden'));
        icon.className = 'fa-solid fa-eye-slash';
        text.innerText = 'Modo Visualização';
        btn.className = 'bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 border border-slate-700';
    }
    if (btn) btn.classList.remove('hidden');
    updateURLDisplay();
}

async function savePortfolioToCloud() {
    const btn = document.querySelector('button[onclick="savePortfolioToCloud()"]');

    try {
        if (btn) btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';

        if (!API_URL) {
            throw new Error('API_URL ainda não foi configurada.');
        }

        const response = await fetch(API_URL + '/portfolio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(state)
        });

        const responseText = await response.text();

        if (!response.ok) {
            console.error('Erro da API:', responseText);
            throw new Error(responseText || 'Falha ao salvar no backend');
        }

        alert('Portfólio salvo na Nuvem com sucesso!');
    } catch (error) {
        console.error('Erro de comunicação:', error);
        alert('Falha ao tentar salvar na nuvem.');
    } finally {
        if (btn) btn.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> Salvar na Nuvem';
    }
}

function saveDraft() {
    return savePortfolioToCloud();
}

function resetToDefault() {
    if (confirm('Restaurar o estado original do protótipo?')) {
        state = JSON.parse(JSON.stringify(DEFAULT_STATE));
        syncUIWithState();
        renderPortfolio();
    }
}

async function loadPortfolioFromCloud(userId) {
    if (!API_URL) {
        throw new Error('API_URL ainda não foi configurada.');
    }

    const response = await fetch(API_URL + '/portfolio?user=' + encodeURIComponent(userId));
    if (!response.ok) {
        throw new Error('Falha ao carregar o portfólio da API');
    }

    const payload = await response.json();
    if (payload && typeof payload === 'object') {
        state = { ...DEFAULT_STATE, ...payload };
    } else {
        state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    }
}

function generateShareLink() {
    const userId = (state.content.name || 'portfolio')
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

    const baseUrl = window.location.origin + window.location.pathname;
    const fullShareUrl = baseUrl + '?user=' + userId;

    document.getElementById('share-url-input').value = fullShareUrl;
    document.getElementById('share-modal').classList.remove('hidden');
    document.getElementById('copy-success-msg').classList.add('hidden');
}

function closeShareModal() {
    document.getElementById('share-modal').classList.add('hidden');
}

function copyShareUrl() {
    const input = document.getElementById('share-url-input');
    input.select();
    input.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(input.value).then(() => {
        document.getElementById('copy-success-msg').classList.remove('hidden');
    });
}

function updateURLDisplay() {
    const urlBar = document.getElementById('browser-url');
    const baseUrl = 'https://devfolio.s3-website.us-east-1.amazonaws.com/';
    const userSlug = (state.content.name || 'portfolio')
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

    if (isReadOnly) {
        urlBar.innerText = baseUrl + '?user=' + encodeURIComponent(userSlug);
    } else if (isPreviewMode) {
        urlBar.innerText = baseUrl + '?user=' + encodeURIComponent(userSlug);
    } else {
        urlBar.innerText = baseUrl + 'editor.html';
    }
}
