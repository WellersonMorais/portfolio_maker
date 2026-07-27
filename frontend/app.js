// Substitua o bloco do DEFAULT_STATE por este:
const DEFAULT_STATE = {
    portfolioId: '',
    template: 'RegularMode',
    primaryColor: '#0b80f5',
    bgColor: '#0f172a',
    textColor: '#f1f5f9',
    fontFamily: "'Inter', sans-serif",
    fontScale: '1.0',
    cardRadius: '12px',
    activeTopic: 'FRONT',
    topics: [
        { key: 'FRONT', name: 'Area 1', desc: 'Descreva aqui as suas principais habilidades, ferramentas utilizadas e experiências relacionadas a esta área de atuação.', imgUrl: null },
        { key: 'BACK', name: 'Area 2', desc: 'Use este espaço para detalhar seus conhecimentos técnicos, metodologias ou projetos de destaque neste tópico.', imgUrl: null },
        { key: 'DESIGN', name: 'Area 3', desc: 'Explique sua proficiência, histórico profissional e como você aplica esses conhecimentos na prática.', imgUrl: null },
        { key: 'AWS', name: 'Area 4', desc: 'Destaque competências adicionais, ferramentas específicas ou diferenciais que complementam o seu perfil.', imgUrl: null }
    ],
    content: {
        name: 'Seu Nome e Sobrenome',
        bio: 'Breve resumo profissional. Use este espaço para descrever quem você é, sua trajetória, suas principais competências e seus objetivos de carreira.',
        avatar: ''
    },
    sections: {
        about: true,
        skills: true,
        certs: true
    },
    // NOVO FORMATO DE SKILLS (Isolado por Tópico):
    skills: {
        FRONT: ['Competência 1', 'Competência 2', 'Competência 3'],
        BACK: ['Competência 1', 'Competência 2'],
        DESIGN: ['Competência 1', 'Competência 2', 'Competência 3'],
        AWS: ['Competência 1', 'Competência 2']
    },
    certs: [
        { name: 'Nome da Certificação ou Curso 1', type: 'PDF', topic: 'AWS' },
        { name: 'Nome da Certificação ou Curso 2', type: 'PDF', topic: 'AWS' },
        { name: 'Nome do Projeto ou Prêmio', type: 'IMG', topic: 'BACK' }
    ]
};
const API_URL = 'https://h26oarm1s7.execute-api.us-east-2.amazonaws.com';

let state = JSON.parse(JSON.stringify(DEFAULT_STATE));
let isPreviewMode = false;
let isReadOnly = false;

window.onload = async function() {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('user');
    const savedId = localStorage.getItem('meuPortfolioId'); 

    if (userId) {
        // MODO PÚBLICO
        isReadOnly = true;
        isPreviewMode = true;
        updatePreviewModeUI();

        try {
            await loadPortfolioFromCloud(userId);
        } catch (e) {
            console.error('Erro ao carregar portfólio', e);
            state = JSON.parse(JSON.stringify(DEFAULT_STATE));
        }
    } else if (savedId) {
        // MODO EDIÇÃO
        try {
            // Carrega o rascunho local mais recente se existir
            const localDraft = localStorage.getItem('draft_portfolio_' + savedId);
            if (localDraft) {
                state = JSON.parse(localDraft);
            } else {
                await loadPortfolioFromCloud(savedId);
            }
        } catch (e) {
            state = JSON.parse(JSON.stringify(DEFAULT_STATE));
        }
    } else {
        state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    }
    
    syncUIWithState();
    renderPortfolio();

    // 🚀 INICIA O AUTO-SAVE A CADA 5 SEGUNDOS
    startAutoSave(5);
}

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
        img.src = state.content.avatar;
        img.classList.remove('hidden');
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
        item.className = 'topic-editor-card';

        const header = document.createElement('div');
        header.className = 'topic-editor-card__header';

        const title = document.createElement('span');
        title.className = 'topic-editor-card__title';
        title.innerText = topic.name;
        header.appendChild(title);

        if (state.topics.length > 1) {
            const delBtn = document.createElement('button');
            delBtn.className = 'topic-editor-card__delete';
            delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
            delBtn.onclick = () => removeTopic(topic.key);
            header.appendChild(delBtn);
        }

        item.appendChild(header);

        const descInput = document.createElement('textarea');
        descInput.rows = 2;
        descInput.className = 'topic-editor-card__textarea';
        descInput.value = topic.desc;
        descInput.oninput = (e) => updateTopicDesc(topic.key, e.target.value);
        item.appendChild(descInput);

        listContainer.appendChild(item);
    });
}

function updateTemplateButtonsUI(tmpl) {
    const templates = ['RegularMode', 'tech', 'minimal'];
    templates.forEach((t) => {
        const btn = document.getElementById('btn-tmpl-' + t);
        if (btn) {
            btn.className = 'template-btn';
            if (t === tmpl) {
                btn.classList.add('template-btn--active');
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

        btn.className = 'topic-pill';
        if (isActive) {
            btn.classList.add('active');
        }

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
    
    // Obtém a chave da área atual (ex: FRONT, BACK, etc.)
    const activeKey = (state.activeTopic || state.topics[0]?.key || 'FRONT').toUpperCase();
    
    // Suporte para o novo formato (Objeto) com Fallback para o antigo (Array)
    let currentSkills = [];
    if (Array.isArray(state.skills)) {
        currentSkills = state.skills;
    } else if (state.skills && state.skills[activeKey]) {
        currentSkills = state.skills[activeKey];
    }

    currentSkills.forEach((skill) => {
        const skillTag = document.createElement('div');
        skillTag.className = 'skill-tag';
        skillTag.style.color = 'var(--text-color)';

        const skillText = document.createElement('span');
        skillText.innerText = skill;
        skillTag.appendChild(skillText);

        if (!isReadOnly) {
            const delBtn = document.createElement('button');
            delBtn.className = 'edit-control skill-tag__remove';
            delBtn.innerHTML = '<i class="fa-solid fa-xmark text-[10px]"></i>';
            delBtn.onclick = () => removeSkill(skill);
            skillTag.appendChild(delBtn);
        }

        skillsList.appendChild(skillTag);
    });

    // Atualiza o título da seção para mostrar a Area atual
    const certsTitleEl = document.querySelector('#sec-certs .section-card__title');
    if (certsTitleEl) {
        certsTitleEl.innerText = `Certificados - ${activeTopicObj.name}`;
    }

    const certsGrid = document.getElementById('certs-grid');
    certsGrid.innerHTML = '';
    
    // Filtra os certificados para mostrar apenas os da Area atual
    // (O fallback "!cert.topic && state.activeTopic === 'FRONT'" garante que certificados antigos não quebrem)
    const filteredCerts = state.certs.filter(cert => 
        cert.topic === state.activeTopic || (!cert.topic && state.activeTopic === 'FRONT')
    );
    
    filteredCerts.forEach((cert) => {
        const certCard = document.createElement('div');
        certCard.className = 'cert-card';
        certCard.style.cursor = 'pointer'; 
        
        // Evento para abrir o arquivo em uma nova aba de forma segura (Blob)
        certCard.onclick = () => {
            if (cert.url) {
                fetch(cert.url)
                    .then(res => res.blob())
                    .then(blob => {
                        const blobUrl = URL.createObjectURL(blob);
                        window.open(blobUrl, '_blank');
                        setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
                    })
                    .catch(() => alert("Erro ao tentar abrir o arquivo."));
            } else {
                alert("Este certificado de rascunho ainda não possui um arquivo anexado.");
            }
        };

        // Cria a caixa da miniatura
        const mediaWrapper = document.createElement('div');
        mediaWrapper.style.width = '100%';
        mediaWrapper.style.aspectRatio = '1 / 1'; // <-- FORÇA O FORMATO QUADRADO
        mediaWrapper.style.borderRadius = '8px';
        mediaWrapper.style.overflow = 'hidden';
        mediaWrapper.style.display = 'flex';
        mediaWrapper.style.alignItems = 'center';
        mediaWrapper.style.justifyContent = 'center';
        mediaWrapper.style.background = 'rgba(15, 23, 42, 0.6)';
        mediaWrapper.style.marginBottom = '8px';

        // Se a miniatura existir (imagem ou PDF extraído com sucesso), exibe ela
        if (cert.thumbnailUrl) {
            mediaWrapper.innerHTML = `<img src="${cert.thumbnailUrl}" style="width: 100%; height: 100%; object-fit: cover;" alt="Thumbnail de ${cert.name}">`;
        } else {
            // Fallback (caso a geração falhe ou para os certificados iniciais sem arquivo)
            mediaWrapper.innerHTML = cert.type === 'PDF'
                ? '<i class="fa-solid fa-file-pdf" style="font-size: 2.5rem; color: #f43f5e; opacity: 0.8;"></i>'
                : '<i class="fa-solid fa-file-image" style="font-size: 2.5rem; color: var(--primary-color); opacity: 0.5;"></i>';
        }
        
        certCard.appendChild(mediaWrapper);
        
        // Cria o título
        const title = document.createElement('span');
        title.className = 'cert-card__title';
        title.style.color = 'var(--text-color)';
        title.innerText = cert.name;
        certCard.appendChild(title);

        // Cria o botão de excluir
        if (!isReadOnly) {
            const delCertBtn = document.createElement('button');
            delCertBtn.className = 'edit-control cert-card__delete';
            delCertBtn.style.position = 'relative'; 
            delCertBtn.style.zIndex = '10'; // Garante que o clique no X não abra o arquivo
            delCertBtn.innerHTML = '<i class="fa-solid fa-xmark text-[10px]"></i>';
            delCertBtn.onclick = (e) => {
                e.stopPropagation(); // Impede a ação de abrir o PDF
                removeCert(cert.name);
            };
            certCard.appendChild(delCertBtn);
        }
        certsGrid.appendChild(certCard);
    });
}

function promptAddTopic() {
    const name = prompt('Nome da nova Area (ex: DEVOPS, MOBILE, AI):');
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
    
    document.getElementById('active-topic-badge').innerText = key;
    
    const illustrationBox = document.getElementById('center-illustration-box');
    
    if (activeTopicObj.imgUrl) {
        illustrationBox.innerHTML = `<img src="${activeTopicObj.imgUrl}" class="w-full h-full object-contain rounded-md" alt="Ilustração ${activeTopicObj.name}">`;
    } else {
        // Placeholder simples com um ícone de imagem
        illustrationBox.innerHTML = `
            <div style="display:flex; align-items:center; justify-content:center; width:100%; height:100%; background:rgba(30,41,59,0.5); border-radius:8px;">
                <i class="fa-solid fa-image" style="font-size: 2rem; opacity: 0.5;"></i>
            </div>
        `;
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

    if (tmpl === 'RegularMode') {
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
        const activeKey = (state.activeTopic || state.topics[0]?.key || 'FRONT').toUpperCase();

        // Se state.skills ainda for um Array antigo, converte para Objeto
        if (Array.isArray(state.skills) || !state.skills) {
            state.skills = { FRONT: [], BACK: [], DESIGN: [], AWS: [] };
        }

        if (!state.skills[activeKey]) {
            state.skills[activeKey] = [];
        }

        if (!state.skills[activeKey].includes(skill.trim())) {
            state.skills[activeKey].push(skill.trim());
            renderPortfolio();
        }
    }
}

function removeSkill(skill) {
    const activeKey = (state.activeTopic || state.topics[0]?.key || 'FRONT').toUpperCase();

    if (Array.isArray(state.skills)) {
        state.skills = state.skills.filter((s) => s !== skill);
    } else if (state.skills && state.skills[activeKey]) {
        state.skills[activeKey] = state.skills[activeKey].filter((s) => s !== skill);
    }

    renderPortfolio();
}

function promptAddCert() {
    // Aciona o input oculto para abrir a janela de seleção de arquivos
    document.getElementById('cert-file-input').click();
}

function loadCertFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const name = prompt('Digite o nome deste certificado:');
    if (!name || name.trim() === '') {
        event.target.value = ''; 
        return;
    }

    const reader = new FileReader();
    reader.onload = async function(e) {
        const isPDF = file.type === 'application/pdf';
        const fileBase64 = e.target.result;
        
        let thumbnailUrl = fileBase64; // Se for imagem, a thumbnail é a própria imagem

        if (isPDF) {
            try {
                // Remove o cabeçalho do base64 (data:application/pdf;base64,) para o PDF.js
                const base64Data = fileBase64.split(',')[1];
                const pdfData = atob(base64Data);
                const uint8Array = new Uint8Array(pdfData.length);
                for (let i = 0; i < pdfData.length; i++) {
                    uint8Array[i] = pdfData.charCodeAt(i);
                }

                // Carrega o PDF e extrai a página 1
                const pdf = await pdfjsLib.getDocument({ data: uint8Array }).promise;
                const page = await pdf.getPage(1);
                
                // Cria um canvas temporário para desenhar a página
                const viewport = page.getViewport({ scale: 0.25 }); // Escala reduzida para ficar leve
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                // Renderiza e converte para imagem JPG
                await page.render({ canvasContext: context, viewport: viewport }).promise;
                thumbnailUrl = canvas.toDataURL('image/jpeg', 0.4);
            } catch (error) {
                console.error("Erro ao gerar capa do PDF:", error);
                thumbnailUrl = null; // Falha silenciosa, cai para o ícone padrão
            }
        }
        
        // Salva o certificado com a URL do arquivo E a URL da miniatura
        state.certs.push({ 
            name: name.trim(), 
            type: isPDF ? 'PDF' : 'IMG',
            url: fileBase64,
            thumbnailUrl: thumbnailUrl,
            topic: state.activeTopic // <-- Salva a Area atual junto com o certificado!
        });
        
        renderPortfolio();
    };
    
    reader.readAsDataURL(file);
    event.target.value = ''; 
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
            img.src = e.target.result;
            img.classList.remove('hidden');
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
    const editBadge = document.getElementById('edit-indicator');
    const indicators = document.querySelectorAll('.edit-control');
    const btn = document.getElementById('btn-preview-mode');
    const icon = document.getElementById('preview-icon');
    const text = document.getElementById('preview-text');

    // Função auxiliar para evitar repetição
    const toggleVisibility = (hide) => {
        sidebar?.classList.toggle('hidden', hide);
        editBadge?.classList.toggle('hidden', hide);
        indicators?.forEach(el => el.classList.toggle('hidden', hide));
    };

    if (isReadOnly) {
        toggleVisibility(true);
        btn?.classList.add('hidden');
        return;
    }

    // Alterna a visibilidade baseada no modo atual
    toggleVisibility(isPreviewMode);

    // Usa um 'if' curto apenas para alterar o ícone/texto, se eles existirem no HTML
    if (icon) icon.className = isPreviewMode ? 'fa-solid fa-pen-to-square' : 'fa-solid fa-eye-slash';
    if (text) text.innerText = isPreviewMode ? 'Modo de Edição' : 'Modo Visualização';
    
    if (btn) {
        btn.className = isPreviewMode 
            ? 'bg-amber-600 hover:bg-amber-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 shadow-md shadow-amber-950/25'
            : 'bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 border border-slate-700';
        btn.classList.remove('hidden');
    }
}

async function savePortfolioToCloud() {
    const btn = document.querySelector('button[onclick="savePortfolioToCloud()"]');
    
    try {
        if (btn) btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';
        if (!API_URL) throw new Error('API_URL não configurada.');

        if (!state.portfolioId) {
            state.portfolioId = (typeof crypto !== 'undefined' && crypto.randomUUID) 
                ? crypto.randomUUID() 
                : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
        }

        // --- SOLUÇÃO RÁPIDA: Cria uma cópia limpando os arquivos gigantes antes de enviar ---
        const stateToSave = JSON.parse(JSON.stringify(state));

        if (stateToSave.certs && Array.isArray(stateToSave.certs)) {
            stateToSave.certs = stateToSave.certs.map(cert => {
                // Se o arquivo/PDF for um Base64 grande (começa com data: e é maior que 50kb), 
                // removemos a propriedade 'url' pesada e deixamos apenas a thumbnail leve
                if (cert.url && cert.url.startsWith('data:') && cert.url.length > 50000) {
                    return {
                        name: cert.name,
                        type: cert.type,
                        topic: cert.topic,
                        thumbnailUrl: cert.thumbnailUrl // Mantém a miniatura leve que você gerou!
                    };
                }
                return cert;
            });
        }

        // Limpa também a foto de perfil/avatar caso seja uma imagem gigantesca
        if (stateToSave.content && stateToSave.content.avatar && stateToSave.content.avatar.length > 200000) {
            alert('Sua imagem de perfil é muito grande! Escolha uma imagem menor para conseguir salvar.');
            if (btn) btn.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> Salvar na Nuvem';
            return;
        }

        // Faz o envio com o payload leve
        const response = await fetch(API_URL + '/portfolio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(stateToSave)
        });

        const responseText = await response.text();
        if (!response.ok) throw new Error(responseText || 'Falha ao salvar no backend');
        
        alert('Portfólio salvo com sucesso!');
        localStorage.setItem('meuPortfolioId', state.portfolioId);
    } catch (error) {
        console.error('Erro de comunicação:', error);
        alert('Falha ao tentar salvar na nuvem: ' + error.message);
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
    // Garante que o usuário salvou antes de tentar compartilhar
    if (!state.portfolioId) {
        alert("Você precisa salvar o portfólio na nuvem pelo menos uma vez para gerar o link público!");
        return;
    }

    const baseUrl = window.location.origin + window.location.pathname;
    const fullShareUrl = baseUrl + '?user=' + state.portfolioId;

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

// Variável para controlar o timer do Auto-Save
let autoSaveTimer = null;

function startAutoSave(intervalSeconds = 5) {
    // Não ativa o Auto-Save se estiver no modo de apenas leitura (visitante)
    if (isReadOnly) return;

    // Cancela qualquer timer anterior para evitar múltiplos processos rodando
    if (autoSaveTimer) clearInterval(autoSaveTimer);

    autoSaveTimer = setInterval(async () => {
        try {
            // 1. Garante que exista um ID gerado
            if (!state.portfolioId) {
                state.portfolioId = (typeof crypto !== 'undefined' && crypto.randomUUID) 
                    ? crypto.randomUUID() 
                    : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                        return v.toString(16);
                    });
            }

            // 2. Salva o Rascunho Instantâneo no Navegador (Garante que F5 não perca nada)
            localStorage.setItem('meuPortfolioId', state.portfolioId);
            localStorage.setItem('draft_portfolio_' + state.portfolioId, JSON.stringify(state));

            // 3. Atualiza um indicador visual silencioso de salvamento (opcional)
            const editBadge = document.getElementById('edit-indicator');
            if (editBadge) {
                editBadge.innerHTML = '<i class="fa-solid fa-cloud-arrow-up fa-spin"></i> Salvo automaticamente';
                setTimeout(() => {
                    if (editBadge) editBadge.innerHTML = '<i class="fa-solid fa-circle-check"></i> Rascunho Salvo';
                }, 1500);
            }

        } catch (e) {
            console.warn('Falha no auto-save local:', e);
        }
    }, intervalSeconds * 1000);
}

