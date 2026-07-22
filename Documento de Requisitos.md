# DevFolio Builder - Requisitos Atualizados

## 1. Objetivo
O projeto consiste em um construtor de portfólios interativos voltado a desenvolvedores e arquitetos de nuvem, com foco em deploy estático em AWS S3 + CloudFront.

## 2. Arquitetura e estrutura
- O front-end deve ser estático e compatível com abertura direta no navegador.
- A base de código deve ficar organizada em uma pasta dedicada de front-end para facilitar futuras expansões.
- Os arquivos principais são: frontend/index.html, frontend/style.css e frontend/app.js.
- O projeto deve funcionar sem build step, sem servidor web e sem dependências de runtime.

## 3. Regras de negócio
- O usuário pode personalizar cores, fontes, conteúdo, temas, habilidades e certificados.
- O estado do portfólio deve ser salvo localmente como rascunho.
- O botão Share gera um link público que abre a visualização do portfólio em modo somente leitura.
- O link compartilhado não deve disponibilizar o painel de edição nem o modo de edição em nenhuma circunstância.
- Nenhuma ação de exclusão, incluindo habilidades, certificados ou outros elementos editáveis, deve ser acessível no modo compartilhado.
- O fluxo de compartilhamento deve preservar o conteúdo customizado e exibir a versão publicada do portfólio.

## 4. Interações esperadas
- O painel lateral controla a aparência e o conteúdo do portfólio.
- O preview atualiza automaticamente conforme o usuário altera os campos.
- O modo de visualização pública é o padrão para links compartilhados.
- A edição fica restrita à experiência local do construtor.
