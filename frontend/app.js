// ... (mantenha as configurações globais e funções auxiliares)

// 1. CORREÇÃO DO "PISCAR" (FOUC) - Modificação no window.onload
window.onload = async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('user');

    if (userId) {
        // ESCONDE A INTERFACE DE EDIÇÃO IMEDIATAMENTE (Síncrono)
        isPreviewMode = true;
        isReadOnly = true;
        
        // Garante que a UI de preview seja ativada ANTES da chamada de rede
        document.getElementById('editor-panel').classList.add('hidden');
        document.querySelectorAll('.edit-control').forEach(el => el.classList.add('hidden'));
        document.getElementById('edit-indicator').classList.add('hidden');
        document.getElementById('btn-preview-mode').classList.add('hidden'); // Oculta o botão de sair do preview se for link compartilhado

        // Opcional: Feedback visual de carregamento
        document.getElementById('view-name').innerText = "Carregando...";

        // SÓ AGORA faz a requisição demorada (Assíncrono)
        await loadPortfolioFromCloud(userId);
    } else {
        // ... (lógica existente para carregar rascunho local)
    }

    syncUIWithState();
    renderPortfolio();
};

// ... (mantenha a função savePortfolioToCloud e outras funções inalteradas)

// 2. NOVA FUNCIONALIDADE: Modificação no promptAddCert
function promptAddCert() {
    const name = prompt("Nome do Certificado:");
    if (name && name.trim() !== '') {
        // Usar confirm para perguntar se quer anexar um arquivo
        const attachFile = confirm("Deseja anexar um arquivo (PDF ou Imagem) para este certificado?");
        
        if (attachFile) {
            // Se sim, cria um input de arquivo oculto e clica nele
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = '.pdf, image/*';
            fileInput.onchange = (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const fileData = event.target.result;
                        const type = file.type.startsWith('image/') ? 'IMG' : 'PDF';
                        
                        state.certs.push({ 
                            name: name.trim(), 
                            type: type,
                            fileData: fileData, // Armazena a imagem/PDF em base64
                            fileName: file.name
                        });
                        renderPortfolio();
                    };
                    reader.readAsDataURL(file); // Converte para Base64
                }
            };
            fileInput.click();
        } else {
             // Se não quiser arquivo, cria o certificado apenas com o nome
             const type = confirm("O formato é PDF? (Cancelar para Imagem)") ? 'PDF' : 'IMG';
             state.certs.push({ name: name.trim(), type: type, fileData: null });
             renderPortfolio();
        }
    }
}

// 3. NOVA FUNCIONALIDADE: Atualização no renderPortfolio para exibir o link
// ... (dentro de renderPortfolio, na parte que renderiza os certificados)
const certsGrid = document.getElementById('certs-grid');
certsGrid.innerHTML = '';
state.certs.forEach(cert => {
    const certCard = document.createElement('div');
    certCard.className = 'bg-slate-800/30 border border-slate-800 rounded-[var(--card-radius)] p-3 flex flex-col items-center justify-center text-center gap-1.5 group relative hover:border-[var(--primary-color)] transition';
    
    // NOVO: Tornar o card clicável se houver arquivo
    if (cert.fileData) {
        certCard.classList.add('cursor-pointer');
        certCard.onclick = () => {
            // Abre o PDF ou imagem em uma nova aba
            const newTab = window.open();
            if(cert.type === 'PDF') {
                newTab.document.write(`<iframe src="${cert.fileData}" width="100%" height="100%" style="border:none;"></iframe>`);
            } else {
                 newTab.document.write(`<img src="${cert.fileData}" style="max-width:100%;">`);
            }
        };
    }

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
    
    // NOVO: Indicador visual de que há um arquivo anexado
    if(cert.fileData){
        const attachmentIcon = document.createElement('i');
        attachmentIcon.className = "fa-solid fa-paperclip text-[8px] text-slate-400 absolute bottom-1 right-1";
        certCard.appendChild(attachmentIcon);
    }

    const delCertBtn = document.createElement('button');
    delCertBtn.className = 'edit-control absolute top-1 right-1 text-rose-500 opacity-0 group-hover:opacity-100 transition';
    delCertBtn.innerHTML = '<i class="fa-solid fa-xmark text-[10px]"></i>';
    // Impede o clique no botão de deletar de abrir o arquivo acidentalmente
    delCertBtn.onclick = (e) => { e.stopPropagation(); removeCert(cert.name); };
    certCard.appendChild(delCertBtn);
    
    certsGrid.appendChild(certCard);
});
// ...