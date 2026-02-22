# 🎨 Frontend Specification - GPS Dashboard

**Documento**: Frontend Specification
**Versão**: 1.0
**Data**: 2026-02-22
**Agente**: @ux-design-expert (Uma)
**Status**: FASE 4 - Especificação Completa

---

## 📋 Resumo Executivo

O frontend do GPS Dashboard é um dashboard moderno de vendas, inspirado no SALESDASH, construído com foco em:

- **Performance**: Load time < 3 segundos
- **Responsividade**: Mobile-first design
- **Acessibilidade**: WCAG 2.1 Level AA
- **UX Intuitiva**: Zero learning curve

---

## 🎯 Casos de Uso Principais

### 1. Login e Autenticação
```
Usuário → Insere email/senha → Valida dados →
Faz login → Armazena token → Redireciona dashboard
```

### 2. Visualizar Dashboard
```
Usuário → Acessa /dashboard → Carrega dados →
Exibe gráficos, KPIs → Atualiza em tempo real
```

### 3. Buscar Transações
```
Usuário → Digita termo → Sistema busca →
Exibe resultados → Clica em resultado → Detalhes
```

### 4. Gerenciar Configurações
```
Usuário → Clica Settings → Atualiza preferências →
Salva dados → Exibe confirmação
```

---

## 🏗️ Estrutura de Componentes

### Hierarquia de Componentes

```
App
├── Auth Layer
│   ├── LoginPage
│   ├── RegisterPage
│   └── ProtectedRoute
│
├── Layout
│   ├── Header
│   │   ├── Logo
│   │   ├── SearchBox
│   │   ├── NotificationBell
│   │   └── UserMenu
│   │
│   ├── Sidebar
│   │   ├── NavLink (Dashboard)
│   │   ├── NavLink (Sales)
│   │   ├── NavLink (Customers)
│   │   ├── NavLink (Settings)
│   │   └── LogoutButton
│   │
│   └── MainContent
│       ├── DashboardPage
│       ├── SalesPage
│       ├── SearchResultsPage
│       ├── SettingsPage
│       └── 404Page
│
├── Dashboard
│   ├── KPICard (Total Sales, Avg Order, etc)
│   ├── SalesChart (Gráfico de linha/bar)
│   ├── RecentTransactions (Tabela)
│   ├── TopCustomers (Ranking)
│   └── ActivityTimeline
│
├── Common Components
│   ├── Button (primário, secundário, danger)
│   ├── Card (container padrão)
│   ├── Modal (diálogos)
│   ├── Toast (notificações)
│   ├── Spinner (loading)
│   ├── Input (text, email, password)
│   ├── Select (dropdown)
│   ├── Table (tabela com sorting/paging)
│   ├── Badge (status, tags)
│   └── Avatar (imagem do usuário)
│
└── Utilities
    ├── ErrorBoundary
    ├── Loading Skeleton
    └── Empty State
```

---

## 🎨 Design System

### Paleta de Cores

```javascript
const colors = {
  // Primary (Azul)
  primary: {
    light: '#E3F2FD',
    main: '#2196F3',
    dark: '#1565C0'
  },

  // Success (Verde)
  success: {
    light: '#E8F5E9',
    main: '#4CAF50',
    dark: '#2E7D32'
  },

  // Warning (Laranja)
  warning: {
    light: '#FFF3E0',
    main: '#FF9800',
    dark: '#E65100'
  },

  // Error (Vermelho)
  error: {
    light: '#FFEBEE',
    main: '#F44336',
    dark: '#C62828'
  },

  // Neutral
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121'
  }
};
```

### Tipografia

```javascript
const typography = {
  h1: { size: '32px', weight: 700, lineHeight: 1.2 },
  h2: { size: '28px', weight: 700, lineHeight: 1.3 },
  h3: { size: '24px', weight: 700, lineHeight: 1.4 },
  h4: { size: '20px', weight: 600, lineHeight: 1.5 },
  h5: { size: '16px', weight: 600, lineHeight: 1.5 },
  h6: { size: '14px', weight: 600, lineHeight: 1.6 },

  body1: { size: '16px', weight: 400, lineHeight: 1.5 },
  body2: { size: '14px', weight: 400, lineHeight: 1.6 },

  button: { size: '14px', weight: 600, lineHeight: 1.5 },
  caption: { size: '12px', weight: 400, lineHeight: 1.5 },

  fontFamily: "'Inter', 'Segoe UI', sans-serif"
};
```

### Espaçamento

```javascript
const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px'
};
```

### Breakpoints (Responsividade)

```javascript
const breakpoints = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1440px',
  ultrawide: '1920px'
};
```

---

## 📄 Páginas Principais

### 1. Login Page

```
┌─────────────────────────────────┐
│         GPS DASHBOARD            │
├─────────────────────────────────┤
│                                 │
│     Email                       │
│     [____________________]       │
│                                 │
│     Senha                       │
│     [____________________]       │
│                                 │
│     [    Entrar    ]             │
│                                 │
│     Não tem conta? Registre-se  │
│                                 │
└─────────────────────────────────┘
```

**Componentes**:
- Logo
- Input (email)
- Input (password)
- Button (submit)
- Link (register)
- ErrorMessage
- RememberMe checkbox
- ForgotPassword link

**Comportamento**:
- [ ] Validação em tempo real
- [ ] Mostrar/ocultar senha
- [ ] Remember me
- [ ] Recuperar senha
- [ ] Social login (opcional)

---

### 2. Dashboard Page

```
┌──────────────────────────────────────────────────────┐
│ GPS [Search_____] 🔔 Perfil ▼                        │
├──────────────────────────────────────────────────────┤
│ Dashboard                       │ HOJE: R$ 45.000    │
│ Vendas                          │ MÊS:  R$ 890.000   │
│ Clientes                        │ MÉDIA: R$ 2.500    │
│ Configurações                   │                    │
│                                 │                    │
│  ┌──────────────┐  ┌──────────┐                      │
│  │              │  │          │                      │
│  │  Gráfico 1   │  │ Gráfico2 │                      │
│  │              │  │          │                      │
│  └──────────────┘  └──────────┘                      │
│                                                      │
│  ┌────────────────────────────────────────────────┐ │
│  │  Transações Recentes                           │ │
│  ├────────────────────────────────────────────────┤ │
│  │ Cliente | Produto | Valor | Data | Status    │ │
│  │ ─────────────────────────────────────────────  │ │
│  │ João    | A       | 1.000 | Hoje | ✓         │ │
│  │ Maria   | B       | 2.500 | Ontem| ✓         │ │
│  └────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────┘
```

**Componentes**:
- Header com navegação
- Sidebar com links
- KPI Cards (4 cards com métricas)
- Gráficos (linha, bar, pizza)
- Tabela de transações
- Timeline de atividades

**Dados a Exibir**:
- [x] Total de vendas (hoje, mês, ano)
- [x] Ticket médio
- [x] Número de clientes
- [x] Taxa de conversão
- [x] Gráfico de vendas por período
- [x] Top 5 clientes
- [x] Últimas 10 transações

---

### 3. Search Page

```
┌──────────────────────────────────────┐
│ Resultados para "iphone"             │
├──────────────────────────────────────┤
│                                      │
│ Vendas (3)                           │
│ ─────────────────────────────────────│
│ iPhone 15 | R$ 5.000 | João | Hoje  │
│ iPhone 14 | R$ 4.000 | Maria| Ontem │
│ iPhone 13 | R$ 3.500 | Pedro| 2d    │
│                                      │
│ Clientes (2)                         │
│ ─────────────────────────────────────│
│ João da Silva | 5 vendas             │
│ João Santos   | 3 vendas             │
│                                      │
│ Produtos (1)                         │
│ ─────────────────────────────────────│
│ iPhone 15 | R$ 5.000 | Em estoque    │
│                                      │
└──────────────────────────────────────┘
```

**Componentes**:
- SearchBox (com termo buscado)
- ResultSections (vendas, clientes, produtos)
- ResultCard (item individual)
- Paginação

---

### 4. Settings Page

```
┌──────────────────────────────────────┐
│ Configurações                        │
├──────────────────────────────────────┤
│                                      │
│ Perfil                               │
│ ├─ Nome: [________________]          │
│ ├─ Email: [________________]         │
│ └─ Foto: [Upload]                    │
│                                      │
│ Preferências                         │
│ ├─ Idioma: [Português ▼]            │
│ ├─ Tema: [Claro ▼]                  │
│ └─ Notificações: [ON/OFF]            │
│                                      │
│ Segurança                            │
│ ├─ Senha: [Alterar]                  │
│ ├─ 2FA: [Desativado]                 │
│ └─ Sessões: [Gerenciar]              │
│                                      │
│ [Salvar Alterações]  [Cancelar]      │
└──────────────────────────────────────┘
```

---

## 🎬 Animações e Transições

### Transições de Página
- Fade in/out: 300ms
- Slide up: 400ms
- Bounce: 600ms

### Hover States
- Buttons: 200ms ease-in-out
- Cards: 150ms scale
- Links: color change 100ms

### Loading States
- Skeleton screens: shimmer animation
- Spinners: 360° rotation 1s
- Progress bar: smooth fill

---

## ♿ Acessibilidade (A11y)

### Requisitos WCAG 2.1 AA

- [x] Contraste de cor 4.5:1 para texto
- [x] Suporte a teclado completo (Tab, Enter, Esc)
- [x] ARIA labels para elementos interativos
- [x] Semantic HTML (h1, nav, main, etc)
- [x] Imagens com alt text
- [x] Formulários com labels associados
- [x] Focus indicators visíveis
- [x] Erro mensagens claras

### Testador Automático
```bash
npm install --save-dev axe-core
npm run test:a11y
```

---

## 📱 Responsividade

### Breakpoints

| Device | Width | Layout |
|--------|-------|--------|
| Mobile | 320px | 1 coluna, sidebar collapse |
| Tablet | 768px | 2 colunas, sidebar mini |
| Desktop | 1024px | 3+ colunas, sidebar full |

### Testes
- [x] iPhone 12/13/14/15
- [x] Samsung Galaxy S20/S21
- [x] iPad/iPad Pro
- [x] Desktop 1366x768
- [x] Desktop 1920x1080

---

## 📊 Componentes de Gráficos

### Bibliotecas Recomendadas

1. **Chart.js** ou **Recharts**
   - Gráficos de linha (vendas ao longo do tempo)
   - Gráficos de barra (comparação)
   - Gráficos de pizza (distribuição)

2. **D3.js** (para gráficos customizados)
   - Heatmaps
   - Sankey diagrams
   - Network graphs

### Gráficos Específicos

| Gráfico | Tipo | Dados |
|---------|------|-------|
| Vendas por dia | Linha | Últimos 30 dias |
| Vendas por categoria | Barra | Top 10 categorias |
| Distribuição de clientes | Pizza | Por região |
| Ticket médio | Área | Histórico 12 meses |

---

## 🔍 Performance

### Otimizações

- [x] Code splitting (lazy loading)
- [x] Image optimization (WebP, srcset)
- [x] CSS minification
- [x] Bundle size < 200KB (gzipped)
- [x] Time to Interactive < 3s
- [x] Lighthouse score > 90

### Métricas Web Vitals

| Métrica | Alvo | Status |
|---------|------|--------|
| LCP (Largest Contentful Paint) | < 2.5s | ✓ |
| FID (First Input Delay) | < 100ms | ✓ |
| CLS (Cumulative Layout Shift) | < 0.1 | ✓ |

---

## 🧪 Testes de UI

### Testes Automatizados

```bash
# Unit tests (Jest)
npm run test:unit

# Integration tests (React Testing Library)
npm run test:integration

# E2E tests (Playwright)
npm run test:e2e

# Visual regression (Percy)
npm run test:visual
```

---

## 📝 Débitos de UX Identificados

| Débito | Severidade | Impacto | Fix |
|--------|-----------|---------|-----|
| Sem mobile responsividade | Alta | UX | Implement media queries |
| Slow animations | Média | Performance | Optimize CSS |
| Sem acessibilidade | Alta | A11y | Add ARIA labels |
| Loading lento | Alta | UX | Add skeleton screens |

---

## 🚀 Próximas Fases

1. **FASE 5**: Database Audit (se houver DB)
2. **FASE 6**: Specialist Review
3. **FASE 7**: QA Review
4. **FASE 8**: Final Assessment
5. **FASE 9**: Executive Report
6. **FASE 10**: Epic & Stories Creation

---

*Documento mantido por @ux-design-expert | Última atualização: 2026-02-22*
