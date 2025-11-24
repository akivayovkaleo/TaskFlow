# TaskFlow: Gerenciador de Tarefas Completo

## 🚀 Visão Geral

O TaskFlow é um gerenciador de tarefas completo, projetado para ajudar indivíduos e equipes a organizar, colaborar e alcançar seus objetivos com mais eficiência. Construído com as tecnologias mais modernas, o TaskFlow oferece uma experiência de usuário fluida e intuitiva, com recursos avançados para o gerenciamento de projetos de qualquer tamanho.

## ✨ Recursos

-   **Autenticação de Usuários**: Sistema de registro e login seguro com o Firebase Authentication.
-   **Gerenciamento de Tarefas (CRUD)**: Crie, leia, atualize e exclua tarefas com facilidade.
-   **Subtarefas e Prioridades**: Divida tarefas complexas em subtarefas e defina níveis de prioridade (baixa, média, alta).
-   **Quadro Kanban**: Visualize e gerencie o fluxo de trabalho de forma intuitiva, movendo tarefas entre as colunas "A Fazer", "Fazendo" e "Concluído".
-   **Visualização em Calendário**: Acompanhe os prazos e planeje suas tarefas com uma visão de calendário integrada.
-   **Painel com Gráficos**: Monitore o progresso com um painel visual, que exibe gráficos de tarefas por status e prioridade.
-   **Acessibilidade**: Integrado com o widget VLibras para a tradução de conteúdo para a Língua Brasileira de Sinais.

## 🛠️ Tecnologias Utilizadas

-   **Frontend**: [Next.js](https://nextjs.org/) (React Framework)
-   **Backend e Banco de Dados**: [Firebase](https://firebase.google.com/) (Authentication, Firestore)
-   **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI/UX**: [Aceternity UI](https://ui.aceternity.com/), [Tremor](https://www.tremor.so/)
-   **Arrastar e Soltar**: [@dnd-kit/core](https://dndkit.com/)
-   **Validação de Formulários**: [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/)
-   **Notificações**: [React Hot Toast](https://react-hot-toast.com/)

## ⚙️ Configuração do Ambiente

Siga os passos abaixo para configurar e executar o projeto em seu ambiente de desenvolvimento local.

### Pré-requisitos

-   [Node.js](https://nodejs.org/) (versão 18 ou superior)
-   [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/taskflow.git
    cd taskflow
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure o Firebase:**
    -   Crie um novo projeto no [Firebase Console](https://console.firebase.google.com/).
    -   Adicione um novo aplicativo da web ao seu projeto.
    -   Copie as credenciais do Firebase (apiKey, authDomain, etc.).

4.  **Configure as Variáveis de Ambiente:**
    -   Crie um arquivo `.env.local` na raiz do projeto.
    -   Adicione as credenciais do Firebase ao arquivo, como no exemplo abaixo:
        ```
        NEXT_PUBLIC_FIREBASE_API_KEY="SUA_API_KEY"
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="SEU_AUTH_DOMAIN"
        NEXT_PUBLIC_FIREBASE_PROJECT_ID="SEU_PROJECT_ID"
        NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="SEU_STORAGE_BUCKET"
        NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="SEU_MESSAGING_SENDER_ID"
        NEXT_PUBLIC_FIREBASE_APP_ID="SEU_APP_ID"
        NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="SEU_MEASUREMENT_ID"
        ```

### Scripts Disponíveis

-   **Para iniciar o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    Abra [http://localhost:3000](http://localhost:3000) em seu navegador para ver a aplicação.

-   **Para construir a aplicação para produção:**
    ```bash
    npm run build
    ```

-   **Para iniciar a aplicação em modo de produção:**
    ```bash
    npm run start
    ```

-   **Para executar o linter:**
    ```bash
    npm run lint
    ```
