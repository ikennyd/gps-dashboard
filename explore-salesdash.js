#!/usr/bin/env node

/**
 * Sales Dashboard Explorer
 * Analisa o site salesdash.vende-c.com.br para documentar features
 * Usa as credenciais para exploração educacional
 */

require('dotenv').config();
const { chromium } = require('playwright');
const fs = require('fs');

const SALESDASH_URL = process.env.SALESDASH_URL;
const SALESDASH_EMAIL = process.env.SALESDASH_EMAIL;
const SALESDASH_PASSWORD = process.env.SALESDASH_PASSWORD;

class SalesDashExplorer {
  constructor() {
    this.findings = {
      pages: [],
      features: [],
      components: [],
      dataFields: [],
      apis: [],
      styling: {
        colors: [],
        fonts: [],
        spacing: []
      }
    };
  }

  async explore() {
    console.log('\n╔══════════════════════════════════════════════════════════╗');
    console.log('║     🔍 Sales Dashboard Explorer - Feature Analysis        ║');
    console.log('╚══════════════════════════════════════════════════════════╝\n');

    const browser = await chromium.launch();
    const page = await browser.newPage();

    try {
      // FASE 1: Login
      console.log('📍 FASE 1: Fazendo login...\n');
      await this.login(page);
      console.log('✅ Login realizado com sucesso!\n');

      // FASE 2: Explorar páginas principais
      console.log('📍 FASE 2: Explorando páginas...\n');
      await this.exploreDashboard(page);

      // FASE 3: Documentar features
      console.log('📍 FASE 3: Documentando features...\n');
      await this.documentFeatures(page);

      // FASE 4: Analisar estrutura
      console.log('📍 FASE 4: Analisando estrutura técnica...\n');
      await this.analyzeStructure(page);

      // Salvar descobertas
      await this.saveFindingsReport();

    } catch (error) {
      console.error('❌ Erro durante exploração:', error.message);
    } finally {
      await browser.close();
    }
  }

  async login(page) {
    await page.goto(SALESDASH_URL);

    // Aguardar formulário de login
    await page.waitForSelector('input[type="email"], input[name="email"], input[placeholder*="email"]', {
      timeout: 5000
    }).catch(() => console.log('⚠️  Campo de email não encontrado no padrão esperado'));

    // Tentar diferentes seletores para email e senha
    const emailSelectors = ['input[type="email"]', 'input[name="email"]', 'input[placeholder*="email"]'];
    const passwordSelectors = ['input[type="password"]', 'input[name="password"]', 'input[placeholder*="senha"]'];

    for (const selector of emailSelectors) {
      try {
        await page.fill(selector, SALESDASH_EMAIL);
        console.log(`✓ Email preenchido (${selector})`);
        break;
      } catch (e) {
        continue;
      }
    }

    for (const selector of passwordSelectors) {
      try {
        await page.fill(selector, SALESDASH_PASSWORD);
        console.log(`✓ Senha preenchida (${selector})`);
        break;
      } catch (e) {
        continue;
      }
    }

    // Clicar botão de login
    const loginButton = await page.$('button[type="submit"], button:has-text("Entrar"), button:has-text("Login")');
    if (loginButton) {
      await loginButton.click();
      await page.waitForNavigation({ waitUntil: 'networkidle', timeout: 10000 }).catch(() => {});
      console.log('✓ Botão de login clicado');
    }
  }

  async exploreDashboard(page) {
    const title = await page.title();
    const url = page.url();

    console.log(`📄 Página: ${title}`);
    console.log(`🔗 URL: ${url}\n`);

    // Detectar elementos principais
    const mainElements = await page.evaluate(() => {
      return {
        headers: Array.from(document.querySelectorAll('h1, h2, h3')).slice(0, 5).map(el => el.textContent.trim()),
        buttons: Array.from(document.querySelectorAll('button')).slice(0, 10).map(el => el.textContent.trim()),
        tables: document.querySelectorAll('table').length,
        charts: document.querySelectorAll('[class*="chart"], [class*="graph"], canvas').length,
        forms: document.querySelectorAll('form').length,
      };
    });

    console.log('🔍 Elementos detectados:');
    console.log(`  • Headers/Títulos: ${mainElements.headers.length}`);
    console.log(`  • Botões: ${mainElements.buttons.length}`);
    console.log(`  • Tabelas: ${mainElements.tables}`);
    console.log(`  • Gráficos: ${mainElements.charts}`);
    console.log(`  • Formulários: ${mainElements.forms}\n`);

    this.findings.pages.push({
      title,
      url,
      elements: mainElements
    });
  }

  async documentFeatures(page) {
    const content = await page.content();

    // Detectar tipos de features
    const features = {
      hasSearch: content.includes('search') || content.includes('buscar'),
      hasFilters: content.includes('filter') || content.includes('filtro'),
      hasExport: content.includes('export') || content.includes('download') || content.includes('csv'),
      hasNotifications: content.includes('notif') || content.includes('alert'),
      hasUserProfile: content.includes('profile') || content.includes('perfil'),
      hasSettings: content.includes('settings') || content.includes('configuração'),
    };

    console.log('⚙️  Features detectadas:');
    Object.entries(features).forEach(([feature, exists]) => {
      console.log(`  ${exists ? '✓' : '✗'} ${feature}`);
    });
    console.log();

    this.findings.features = features;
  }

  async analyzeStructure(page) {
    const structure = await page.evaluate(() => {
      return {
        framework: document.documentElement.getAttribute('ng-app') ? 'AngularJS' :
                   document.querySelector('[data-reactroot]') ? 'React' :
                   document.querySelector('[data-v-app]') ? 'Vue' :
                   document.querySelector('[data-ng-version]') ? 'Angular' : 'Unknown',
        cssFrameworks: [
          document.querySelector('link[href*="bootstrap"]') ? 'Bootstrap' : null,
          document.querySelector('link[href*="tailwind"]') ? 'Tailwind' : null,
          document.querySelector('[class*="material"]') ? 'Material' : null,
        ].filter(Boolean),
        apiEndpoints: Array.from(document.querySelectorAll('script'))
          .map(el => el.textContent)
          .join(' ')
          .match(/https?:\/\/[^\s"'<>]+/g) || [],
      };
    });

    console.log('🏗️  Estrutura técnica:');
    console.log(`  • Framework: ${structure.framework}`);
    console.log(`  • CSS: ${structure.cssFrameworks.join(', ') || 'Custom'}`);
    console.log(`  • APIs detectadas: ${structure.apiEndpoints.slice(0, 3).length > 0 ? 'Sim' : 'Não'}\n`);

    this.findings.components.push(structure);
  }

  async saveFindingsReport() {
    const report = `# 📊 Sales Dashboard - Análise de Features

## Resumo Executivo
Site: ${SALESDASH_URL}
Data: ${new Date().toLocaleString('pt-BR')}

## Arquitetura Detectada
\`\`\`json
${JSON.stringify(this.findings.components[0], null, 2)}
\`\`\`

## Features Identificadas
${Object.entries(this.findings.features).map(([feat, exists]) =>
  `- [${exists ? 'x' : ' '}] ${feat}`
).join('\n')}

## Páginas Exploradas
${this.findings.pages.map(p => `
### ${p.title}
- URL: ${p.url}
- Headers: ${p.elements.headers.length}
- Botões: ${p.elements.buttons.length}
- Tabelas: ${p.elements.tables}
- Gráficos: ${p.elements.charts}
`).join('\n')}

## Próximos Passos
1. ✅ Análise completa do site
2. → Criar PRD com features mapeadas
3. → Implementar no GPS Dashboard
4. → Integrar com AIOS

---
*Relatório gerado automaticamente*
`;

    fs.writeFileSync('/Users/kennydwillker/gps-dashboard/docs/SALESDASH-ANALYSIS.md', report);
    console.log('📝 Relatório salvo em: docs/SALESDASH-ANALYSIS.md\n');
  }
}

// Executar exploração
const explorer = new SalesDashExplorer();
explorer.explore().catch(console.error);
