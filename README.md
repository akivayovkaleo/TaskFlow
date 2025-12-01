# 🎯 TaskFlow - Gestor de Tarefas Completo

![TaskFlow](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js) ![Firebase](https://img.shields.io/badge/Firebase-Latest-orange?style=flat-square&logo=firebase) ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-blue?style=flat-square&logo=tailwind-css)

Um gestor de tarefas completo e funcional desenvolvido com **Next.js 14+**, **Firebase Firestore**, **Tailwind CSS** e tecnologias modernas. O TaskFlow oferece uma experiência intuitiva e produtiva com Dashboard analytics, Kanban interativo, Calendário integrado e muito mais.

## ✨ Características Principais

### 🏠 Landing Page
- Apresentação elegante e responsiva
- Menu responsivo com navegação
- Call-to-action com links para login/cadastro
- Footer institucional com redes sociais
- Animações smooth com Framer Motion

### 👤 Autenticação
- Sistema de cadastro com validação forte de senha
- Login com email e senha
- Autenticação segura com Firebase Authentication
- Redirecionamento automático para dashboard
- Logout com confirmação

### 📊 Dashboard Principal
- Métricas chave em cards visuais (Total, Pendentes, Concluídas, Vencidas)
- 3+ Gráficos Tremor (LineChart, DonutChart, BarChart)
- Estatísticas em tempo real
- Links rápidos para outras seções

### ✅ Gestão Completa de Tarefas (CRUD)
- Criar, ler, atualizar e deletar tarefas
- Campos: título, descrição, data de vencimento, prioridade
- Prioridades: Baixa, Média, Alta
- Status: A Fazer, Fazendo, Concluído
- Sub-tarefas com título e status
- Barra de progresso automática
- Filtros por status com contadores

### 📅 Calendário FullCalendar
- Visualização mensal de tarefas
- Cores por prioridade e status
- Clique em evento para ver detalhes
- Sidebar com informações completas
- Links diretos para editar tarefa

### 🎯 Quadro Kanban com Drag and Drop
- 3 colunas: A Fazer, Fazendo, Concluído
- Drag and drop intuitivo com DND Kit
- Atualização automática de status
- Indicadores visuais de prioridade
- Contador de sub-tarefas

### 🎨 Design Profissional
- **Azul Marinho** (#001a4d): Cor primária
- **Azul Bebê** (#87ceeb): Cor secundária
- **Vermelho Crimsón** (#dc143c): Ação/alerta
- Design responsivo mobile-first
- Animações smooth com Framer Motion
- Temas claro/escuro

### ♿ Acessibilidade Digital (6+ Recursos)
1. **VLibras** - Tradução para Libras (obrigatório) ✅
2. **Ajuste de Tamanho de Fonte** - +/- com persistência ✅
3. **Temas Claro/Escuro** - Suporte completo ✅
4. **ARIA Labels** - Para leitores de tela ✅
5. **Navegação por Teclado** - Suporte completo ✅
6. **Cores Contrastantes** - Alto contraste ✅

## 🛠️ Stack Tecnológico

### Core
- **Framework**: Next.js 14+ (App Router)
- **Linguagem**: TypeScript
- **Styling**: Tailwind CSS 3.4

### Backend & Dados
- **Banco**: Firebase Firestore
- **Auth**: Firebase Authentication
- **API**: Next.js Route Handlers

### Frontend & UI
- **Componentes**: Tremor, Aceternity UI
- **Ícones**: Lucide React
- **Animações**: Framer Motion
- **Temas**: next-themes
- **Notificações**: Sonner

### Funcionalidades
- **Formulários**: React Hook Form + Zod
- **Calendário**: FullCalendar
- **Drag & Drop**: DND Kit
- **Requisições**: Axios

## 📦 Instalação Rápida

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Passos

**1. Clone o repositório**
```bash
git clone https://github.com/seu-usuario/taskflow.git
cd TaskFlow
```

**2. Instale dependências**
```bash
npm install
```

**3. Configure `.env.local`**
```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDp4QoEQOfafdvm9vSpIkEp-z34ZZTPfV8
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=task-a4d9d.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=task-a4d9d
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=task-a4d9d.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=92480963776
NEXT_PUBLIC_FIREBASE_APP_ID=1:92480963776:web:ae8dec696895038b339925
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-JY0SSLJ1DR
```

**4. Inicie o servidor**
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) 🚀

## 📝 Scripts Disponíveis

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build para produção
npm run start        # Inicia em modo produção
npm run lint         # Executa linter
```

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── layout.tsx               # Layout raiz
│   ├── dashboard/page.tsx       # Dashboard
│   ├── tasks/
│   │   ├── page.tsx             # Lista de tarefas
│   │   ├── new/page.tsx         # Criar tarefa
│   │   └── [id]/page.tsx        # Detalhes
│   ├── kanban/page.tsx          # Quadro Kanban
│   ├── calendar/page.tsx        # Calendário
│   └── (auth)/
│       ├── sign-up/page.tsx
│       └── sign-in/page.tsx
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── TaskForm.tsx
│   ├── TaskList.tsx
│   └── ...
├── hooks/
│   ├── useAuth.tsx              # Autenticação
│   └── useTasks.tsx             # Tarefas
├── lib/
│   ├── firebaseConfig.ts
│   ├── schemas.ts
│   └── utils.ts
└── types/
    └── task.ts
```

## 🎯 Funcionalidades Detalhadas

### Sistema de Autenticação
✅ Cadastro com validação forte  
✅ Login seguro  
✅ Logout  
✅ Proteção de rotas  
✅ Mensagens de erro claras  

### Tarefas
✅ CRUD completo  
✅ Filtros por status  
✅ Ordenação por prioridade  
✅ Busca por título  
✅ Atualização em tempo real  

### Sub-tarefas
✅ Adicionar/remover  
✅ Marcar como concluída  
✅ Progresso automático  
✅ Lista interativa  

### Dashboard
✅ Gráficos em tempo real  
✅ Métricas chave  
✅ Links rápidos  
✅ Responsivo  

### Kanban
✅ Drag and drop intuitivo  
✅ Atualização automática  
✅ Indicadores visuais  
✅ Mobile-friendly  

### Calendário
✅ Visualização mensal  
✅ Cores por prioridade  
✅ Detalhes em sidebar  
✅ Links para edição  

## 🌐 Deploy

### Vercel (Recomendado)
1. Push para GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Importe repositório
4. Adicione env vars
5. Deploy automático

### Outras Plataformas
- Netlify
- AWS Amplify
- Firebase Hosting

## 📊 Requisitos Atendidos

### Requisitos Funcionais ✅
- [x] Landing page com responsivo
- [x] Cadastro de usuário com validações
- [x] Sistema de login com Firebase
- [x] Dashboard com métricas
- [x] Gestão completa de tarefas (CRUD)
- [x] Sub-tarefas com barra de progresso
- [x] Calendário FullCalendar
- [x] Quadro Kanban com Drag & Drop
- [x] Página de detalhes da tarefa
- [x] 6+ recursos de acessibilidade

### Stack Tecnológico ✅
- [x] Next.js 14+ (App Router)
- [x] TypeScript
- [x] Firebase Firestore
- [x] Firebase Authentication
- [x] Tailwind CSS
- [x] Axios
- [x] Tremor
- [x] Aceternity UI
- [x] Framer Motion
- [x] Lucide React
- [x] next-themes
- [x] React Hook Form
- [x] Zod
- [x] FullCalendar
- [x] DND Kit
- [x] Sonner

### Arquitetura ✅
- [x] Estrutura modular e escalável
- [x] App Router com Server/Client Components
- [x] Componentes reutilizáveis
- [x] Tipagem forte com TypeScript
- [x] Padrão Atomic Design

## 📝 Notas Importantes

- Todas as cores seguem o padrão: Azul Marinho, Azul Bebê, Vermelho
- VLibras está habilitado na página
- Dados salvos em Firestore em tempo real
- Autenticação obrigatória para recursos principais
- Responsivo para dispositivos móveis

## 🤝 Contribuindo

Contribuições são bem-vindas!

## 📄 Licença

MIT License

## 👨‍💻 Desenvolvido com ❤️

Desenvolvido para aumentar sua produtividade usando **Next.js 14+**, **Firebase** e **Tailwind CSS**.
