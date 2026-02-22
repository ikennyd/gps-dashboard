# Deploying GPS Dashboard to Render

## ⚡ Quick Start (3 Minutos, Sem Terminal!)

### 1. **Acesse Render**
https://render.com

### 2. **Faça Login com GitHub**
- Clique em "Sign Up"
- Escolha "Continue with GitHub"
- Autorize Render a acessar seus repositórios

### 3. **Crie um Novo Serviço**
- Clique em "New +"
- Escolha "Web Service"

### 4. **Selecione o Repositório**
- Procure por `gps-dashboard`
- Clique em "Connect"

### 5. **Configure o Serviço**
```
Name: gps-dashboard
Environment: Node
Branch: main
Build Command: npm install && npm run build
Start Command: node backend/server.js
Plan: Free
```

### 6. **Variáveis de Ambiente**
Clique em "Add Environment Variable" e adicione:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `SUPABASE_URL` | `https://mjtnfthhuamklgqoggzt.supabase.co` |
| `SUPABASE_ANON_KEY` | `sb_publishable_absvsOU9FlWBaZYJrZNFvg_oS5L3bZj` |
| `JWT_SECRET` | `your-secret-key-change-in-production-12345` |

### 7. **Deploy!**
- Clique em "Create Web Service"
- Render fará o build e deploy automaticamente
- Aguarde ~2 minutos

### 8. **Pronto! 🎉**
Render mostrará a URL do seu app:
```
https://gps-dashboard-xxxx.onrender.com
```

---

## 🎯 O que Render fará automaticamente:

✅ Build do backend com `npm install && npm run build`
✅ Serve os arquivos estáticos do frontend
✅ Inicia o servidor Express
✅ Health checks automáticos
✅ Redeploy automático quando você faz push no GitHub
✅ Logs em tempo real

---

## 📊 Plano Free do Render

- ✅ Hospedagem grátis
- ✅ HTTPS automático
- ✅ Custom domain (opcional)
- ⚠️ App dorme após 15 min de inatividade (normal em free tier)

**Para sempre online, upgrade para plano pago ($5-10/mês)**

---

## 🔗 Após o Deploy

### Ver o App
```
https://gps-dashboard-xxxx.onrender.com
```

### Ver Logs
Clique em "Logs" no painel do Render

### Variáveis de Ambiente
Clique em "Environment" para editar/adicionar

### Redeploy Manual
Clique em "Manual Deploy" → "Deploy Latest Commit"

### Custom Domain
Environment → "Custom Domain" → Adicione seu domínio

---

## 📱 Conectar Frontend ao Backend

Agora que o backend está online, atualize a URL da API no Vercel:

### No Painel do Vercel:
1. Vá para: https://vercel.com/dashboard
2. Selecione `gps-dashboard`
3. Settings → Environment Variables
4. Adicione:
   ```
   VITE_API_URL=https://gps-dashboard-xxxx.onrender.com
   ```
5. Redeploy (seu frontend usará essa URL)

---

## 🧪 Testando após Deploy

### Backend Health Check
```
GET https://gps-dashboard-xxxx.onrender.com/api/health
```

Resposta esperada:
```json
{
  "status": "OK",
  "timestamp": "2026-02-22T...",
  "service": "GPS Dashboard Backend"
}
```

### API Info
```
GET https://gps-dashboard-xxxx.onrender.com/api/info
```

### Login
```
POST https://gps-dashboard-xxxx.onrender.com/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

---

## 🚀 Arquitetura Final

```
Frontend (Vercel)
├── React + Vite
└── URL: https://gps-dashboard-pi.vercel.app
        ↓
Backend (Render)
├── Express.js
├── Serve frontend estático
└── URL: https://gps-dashboard-xxxx.onrender.com
        ↓
Database (Supabase)
├── PostgreSQL
└── URL: https://mjtnfthhuamklgqoggzt.supabase.co
```

---

## 📋 Troubleshooting

### "Build Command Failed"
- Verifique os logs do Render
- Certifique-se que `npm run build` funciona localmente

### "App keeps sleeping"
- Use plano pago para uptime 24/7
- Ou adicione um cron job externo para pingar periodicamente

### "404 - Not Found"
- Verifique que `render.yaml` está na raiz do projeto
- Certifique-se que `Start Command` está correto

### "Environment variables not working"
- Abra os logs do Render para ver os valores
- Redeploy após adicionar variáveis

---

## 💡 Próximos Passos

1. ✅ Criar serviço no Render (3 min)
2. ✅ Obter URL do backend
3. ✅ Atualizar frontend com URL do API
4. ✅ Testar conexão frontend ↔ backend
5. ⏳ Configurar custom domain (opcional)

---

## 🔐 Segurança

⚠️ **As credenciais estão no `render.yaml` (não faça push!)**

Para produção, recomenda-se:
1. Não commitar credenciais no Git
2. Usar secrets do Render Dashboard
3. Rotacionar JWT_SECRET periodicamente
4. Usar variáveis de ambiente para cada environment

---

## 📞 Suporte

- **Render Docs**: https://render.com/docs
- **Status Page**: https://status.render.com
- **Community**: https://render.com/community

---

*Last Updated: 2026-02-22*
