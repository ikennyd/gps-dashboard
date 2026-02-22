# 🚀 GPS Dashboard - Setup Guide

## Começando Rapidamente

### 1️⃣ **Criar Projeto Supabase** (5 min)

1. Acesse https://supabase.com
2. Faça login ou crie conta
3. Clique em **"New Project"**
4. Preencha:
   - **Project Name**: `gps-dashboard`
   - **Database Password**: Guarde com segurança!
   - **Region**: Escolha a mais próxima de você
5. Aguarde criação (2-3 minutos)

### 2️⃣ **Obter Credenciais**

No dashboard do Supabase:

1. Vá para **Settings → API**
2. Copie:
   - **Project URL** → `SUPABASE_URL`
   - **anon public** → `SUPABASE_ANON_KEY`
   - **service_role secret** → `SUPABASE_SERVICE_ROLE_KEY`

### 3️⃣ **Atualizar .env**

```bash
# Edite .env com suas credenciais
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiI...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiI...
```

### 4️⃣ **Rodar Migrations**

1. No Supabase, vá para **SQL Editor**
2. Clique em **"New Query"**
3. Copie todo o conteúdo de: `backend/database/migrations/001_init.sql`
4. Cole no editor SQL
5. Clique em **"RUN"** (canto superior direito)
6. Aguarde sucesso (deve levar 10-30 segundos)

### 5️⃣ **Verificar Tabelas**

No Supabase:
1. Vá para **Table Editor**
2. Você deve ver 4 tabelas:
   - ✅ `users`
   - ✅ `customers`
   - ✅ `products`
   - ✅ `sales`

### 6️⃣ **Instalar Dependências**

```bash
npm install
```

### 7️⃣ **Rodar Projeto**

```bash
# Terminal 1 - Backend (porta 5000)
npm run dev:backend

# Terminal 2 - Frontend (porta 3000)
npm run dev:frontend
```

### 8️⃣ **Testar Login**

1. Acesse http://localhost:3000
2. Use credenciais padrão (ou crie nova conta):
   - Email: `admin@example.com`
   - Senha: `hashed_password_here` (ou a que você definir)

---

## 📋 Checklist de Setup

- [ ] Projeto Supabase criado
- [ ] Credenciais copiadas para .env
- [ ] Migrations SQL executadas
- [ ] Tabelas visíveis no Supabase
- [ ] npm install executado
- [ ] Backend rodando (porta 5000)
- [ ] Frontend rodando (porta 3000)
- [ ] Login funcionando
- [ ] Dashboard carregando dados

---

## 🐛 Troubleshooting

### Erro: "Connection refused"
**Solução**: Verifique se `SUPABASE_URL` está correto em `.env`

### Erro: "Invalid API key"
**Solução**: Copie `SUPABASE_ANON_KEY` novamente do dashboard

### Erro: "Table doesn't exist"
**Solução**: Rode as migrations SQL novamente no SQL Editor do Supabase

### Frontend não conecta ao backend
**Solução**: Verifique se backend está rodando na porta 5000

### Dados não aparecem no dashboard
**Solução**: Verifique se as tabelas têm dados (vá ao Table Editor do Supabase)

---

## 🔐 Segurança

### Antes de Produção:

- [ ] Mude `JWT_SECRET` em `.env` para algo forte
- [ ] Configure CORS corretamente em `backend/server.js`
- [ ] Configure RLS policies no Supabase
- [ ] Habilite autenticação via email/password
- [ ] Configura backup automático

---

## 📚 Próximos Passos

1. **Implementar Autenticação Real**: Use Supabase Auth
2. **Integrar Gráficos**: Use Chart.js ou Recharts
3. **Deploy**: Vercel (frontend) + Render (backend)
4. **Monitoramento**: Sentry para error tracking

---

## 💡 Comandos Úteis

```bash
# Ver logs do backend
npm run dev:backend

# Build frontend para produção
npm run build:frontend

# Testar conexão com API
curl http://localhost:5000/api/health

# Ver variáveis de ambiente
cat .env | grep SUPABASE
```

---

## 📞 Suporte

- [Supabase Docs](https://supabase.com/docs)
- [React Docs](https://react.dev)
- [Express Docs](https://expressjs.com)

---

**GPS Dashboard está pronto! 🚀**
