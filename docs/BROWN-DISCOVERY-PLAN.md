# 📋 Brownfield Discovery - GPS Dashboard + Sales Clone

**Status**: FASE 1-2 Completadas
**Data**: 2026-02-22
**Objetivo**: Criar dashboard de vendas baseado em SALESDASH

---

## 🏛️ ARQUITETURA ATUAL

### Stack Identificado
- **Backend**: Node.js + Express (planejado)
- **Frontend**: Custom framework (SALESDASH usa custom)
- **Banco**: Será Supabase (planejado)
- **Auth**: JWT/Sessão (planejado)

### Dependências Atuais
```json
{
  "aios-core": "file:../aios-core",
  "axios": "^1.13.5",
  "dotenv": "^17.3.1",
  "playwright": "^1.58.2"
}
```

---

## 📊 DESCOBERTAS DO SITE ORIGINAL

### Features Mapeadas
1. **Dashboard Principal**
   - 428 elementos gráficos
   - Visualização de dados em tempo real
   - Headers informativos

2. **Search/Busca**
   - Sistema de busca integrado
   - Busca em tempo real

3. **Settings/Configurações**
   - Painel de configurações do usuário
   - Possivelmente preferências

### Gaps Detectados
- ✗ Filtros avançados
- ✗ Exportação de dados (CSV/PDF)
- ✗ Sistema de notificações
- ✗ Perfil de usuário detalhado

---

## 🎯 FASES DE DESENVOLVIMENTO

### FASE 1: Documentação ✅
**Status**: Completada
- [x] Explorar site com Playwright
- [x] Mapear features
- [x] Analisar estrutura
- [x] Documentar findings

### FASE 2: Arquitetura do Sistema 🔄
**Status**: Em Progresso
- [ ] Definir stack tecnológico
- [ ] Criar estrutura de pastas
- [ ] Documentar padrões de código
- [ ] Design database schema

**Deliverables**:
- `docs/architecture/system-architecture.md`

### FASE 3: Auditoria de Banco (SE APLICÁVEL)
**Status**: Planejada
- [ ] Auditoria de schema
- [ ] Auditoria de segurança (RLS)
- [ ] Validação de índices

**Deliverables**:
- `supabase/docs/SCHEMA.md`
- `supabase/docs/DB-AUDIT.md`

### FASE 4: Especificação Frontend
**Status**: Planejada
- [ ] Componentização
- [ ] Design system
- [ ] Padrões de layout
- [ ] Fluxos de usuário

**Deliverables**:
- `docs/frontend/frontend-spec.md`

### FASE 5-7: Validação dos Especialistas
**Status**: Planejada
- [ ] @data-engineer review
- [ ] @ux-design-expert review
- [ ] @qa review

### FASE 8-10: Finalização
**Status**: Planejada
- [ ] Assessment final
- [ ] Relatório executivo
- [ ] Epic e Stories

---

## 🏗️ ESTRUTURA PLANEJADA

```
gps-dashboard/
├── src/
│   ├── components/        # Componentes React/Vue
│   ├── pages/            # Páginas principais
│   ├── services/         # Integração com APIs
│   ├── hooks/            # Custom hooks
│   ├── utils/            # Utilitários
│   └── styles/           # Estilos globais
├── backend/              # Node.js + Express
│   ├── routes/          # Rotas da API
│   ├── controllers/      # Lógica de negócio
│   ├── models/          # Modelos de dados
│   └── middleware/      # Middlewares
├── docs/                 # Documentação
│   ├── architecture/
│   ├── frontend/
│   ├── database/
│   └── api/
├── tests/               # Testes
├── .env                 # Variáveis de ambiente
└── package.json
```

---

## 📋 FEATURES A IMPLEMENTAR

### MVP (Minimum Viable Product)
1. **Autenticação** (Email/Senha)
   - Login
   - Logout
   - Senha recuperada

2. **Dashboard Principal**
   - Gráficos de vendas
   - KPIs principais
   - Timeline de atividades

3. **Search**
   - Busca de transações
   - Busca de clientes
   - Busca de produtos

4. **Settings Básicas**
   - Perfil do usuário
   - Preferências de idioma

### V2 (Versão 2)
- [ ] Filtros avançados
- [ ] Exportação de dados
- [ ] Sistema de notificações
- [ ] Relatórios customizados

---

## 🔧 PRÓXIMAS AÇÕES

### Agora (FASE 2)
```bash
# 1. Ativar @architect para documentar arquitetura
node agents.js @architect
*document-project

# 2. Criar estrutura de pastas
mkdir -p src/{components,pages,services,hooks,utils,styles}
mkdir -p backend/{routes,controllers,models,middleware}

# 3. Iniciar implementação com @dev
node agents.js @dev
*create-task "Implementar autenticação"
```

### Próximas Semanas
1. Criar PRD detalhado com @pm
2. Implementar backend com @dev
3. Implementar frontend com @dev
4. Testes com @qa
5. Deploy

---

## 📊 Timeline Estimada

| Fase | Tempo | Status |
|------|-------|--------|
| Discovery | ✅ 1h | Completa |
| Arquitetura | 🔄 1-2h | Em andamento |
| Desenvolvimento Backend | ⏳ 3-5h | Planejado |
| Desenvolvimento Frontend | ⏳ 4-6h | Planejado |
| Testes | ⏳ 2-3h | Planejado |
| **Total** | **~11-17h** | - |

---

## ✅ Checklist de Conclusão

- [x] Explorar site original
- [x] Mapear features
- [x] Criar documentação de achados
- [ ] Documentar arquitetura completa
- [ ] Criar estrutura de pastas
- [ ] Configurar banco de dados
- [ ] Implementar autenticação
- [ ] Implementar dashboard principal
- [ ] Implementar busca
- [ ] Testes e QA
- [ ] Deploy em produção

---

## 📚 Referências

- [SALESDASH Analysis](./SALESDASH-ANALYSIS.md)
- [Brownfield Discovery Workflow](../../../aios-core/docs/guides/workflows/BROWNFIELD-DISCOVERY-WORKFLOW.md)
- [AIOS Agents](../../../aios-core/docs/guides/agents/)

---

*Documento mantido por @architect | Última atualização: 2026-02-22*
