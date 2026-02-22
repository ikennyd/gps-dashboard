#!/usr/bin/env node

/**
 * GPS Dashboard - Setup Validation Script
 *
 * Validates:
 * - Environment configuration
 * - Dependencies installation
 * - Database connectivity
 * - Directory structure
 * - Essential files
 * - AIOS integration
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('');
  log(`\n╔═══════════════════════════════════════════════════════════╗`, 'cyan');
  log(`║ ${title.padEnd(57)} ║`, 'cyan');
  log(`╚═══════════════════════════════════════════════════════════╝`, 'cyan');
}

function check(condition, passMessage, failMessage) {
  if (condition) {
    log(`✅ ${passMessage}`, 'green');
    return true;
  } else {
    log(`❌ ${failMessage}`, 'red');
    return false;
  }
}

const results = {
  passed: 0,
  failed: 0,
  warnings: 0,
};

// ============================================================================
// 1. ENVIRONMENT & CONFIGURATION
// ============================================================================
logSection('1. ENVIRONMENT & CONFIGURATION');

const envFile = path.join(__dirname, '.env');
const envExampleFile = path.join(__dirname, '.env.example');

const hasEnv = check(
  fs.existsSync(envFile),
  '.env file exists',
  '.env file not found (create with: cp .env.example .env)'
);
if (hasEnv) results.passed++; else results.failed++;

const hasEnvExample = check(
  fs.existsSync(envExampleFile),
  '.env.example file exists',
  '.env.example file not found'
);
if (hasEnvExample) results.passed++; else results.failed++;

// Check environment variables
let hasSupabaseUrl = false;
let hasSupabaseKey = false;
let hasJwtSecret = false;

if (hasEnv) {
  const env = fs.readFileSync(envFile, 'utf8');
  hasSupabaseUrl = check(
    env.includes('SUPABASE_URL=') && env.includes('https://'),
    'SUPABASE_URL is configured',
    'SUPABASE_URL is missing or invalid'
  );
  if (hasSupabaseUrl) results.passed++; else results.failed++;

  hasSupabaseKey = check(
    env.includes('SUPABASE_ANON_KEY=') && env.split('SUPABASE_ANON_KEY=')[1]?.trim().length > 10,
    'SUPABASE_ANON_KEY is configured',
    'SUPABASE_ANON_KEY is missing or invalid'
  );
  if (hasSupabaseKey) results.passed++; else results.failed++;

  hasJwtSecret = check(
    env.includes('JWT_SECRET=') && env.split('JWT_SECRET=')[1]?.trim().length > 10,
    'JWT_SECRET is configured',
    'JWT_SECRET is missing or weak'
  );
  if (hasJwtSecret) results.passed++; else results.failed++;
}

// ============================================================================
// 2. DIRECTORY STRUCTURE
// ============================================================================
logSection('2. DIRECTORY STRUCTURE');

const requiredDirs = [
  'src',
  'backend',
  'supabase',
  'docs',
  'public',
];

requiredDirs.forEach((dir) => {
  const exists = fs.existsSync(path.join(__dirname, dir));
  const result = check(
    exists,
    `✓ ${dir}/ directory exists`,
    `✗ ${dir}/ directory missing`
  );
  if (result) results.passed++; else results.failed++;
});

// ============================================================================
// 3. ESSENTIAL FILES
// ============================================================================
logSection('3. ESSENTIAL FILES');

const requiredFiles = [
  'package.json',
  'CLAUDE.md',
  'SETUP_GUIDE.md',
  'backend/server.js',
  'src/App.jsx',
  'supabase/docs/SCHEMA.md',
];

requiredFiles.forEach((file) => {
  const exists = fs.existsSync(path.join(__dirname, file));
  const result = check(
    exists,
    `✓ ${file}`,
    `✗ ${file} missing`
  );
  if (result) results.passed++; else results.failed++;
});

// ============================================================================
// 4. DEPENDENCIES
// ============================================================================
logSection('4. DEPENDENCIES');

const hasNodeModules = check(
  fs.existsSync(path.join(__dirname, 'node_modules')),
  'node_modules/ directory exists',
  'node_modules/ not found - run: npm install'
);
if (hasNodeModules) results.passed++; else results.failed++;

const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));

const requiredPackages = ['express', 'react', 'axios', '@supabase/supabase-js'];
requiredPackages.forEach((pkg) => {
  const isDev = packageJson.devDependencies?.[pkg];
  const isProd = packageJson.dependencies?.[pkg];
  const exists = isDev || isProd;

  const result = check(
    exists,
    `✓ ${pkg} is installed`,
    `✗ ${pkg} is missing`
  );
  if (result) results.passed++; else results.failed++;
});

// ============================================================================
// 5. GIT CONFIGURATION
// ============================================================================
logSection('5. GIT CONFIGURATION');

try {
  const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
  check(true, 'Git repository initialized', '');
  results.passed++;

  // Check if .gitignore is properly configured
  const gitignore = fs.readFileSync('.gitignore', 'utf8');
  const hasNodeModulesIgnored = check(
    gitignore.includes('node_modules/'),
    '.gitignore excludes node_modules/',
    '.gitignore missing node_modules/ entry'
  );
  if (hasNodeModulesIgnored) results.passed++; else results.failed++;

  const hasEnvIgnored = check(
    gitignore.includes('.env'),
    '.gitignore excludes .env files',
    '.gitignore missing .env entry'
  );
  if (hasEnvIgnored) results.passed++; else results.failed++;

  const hasAiosIgnored = check(
    gitignore.includes('aios-core/'),
    '.gitignore excludes aios-core/',
    '.gitignore missing aios-core/ entry'
  );
  if (hasAiosIgnored) results.passed++; else results.failed++;
} catch (error) {
  log('Git not properly initialized', 'yellow');
  results.warnings++;
}

// ============================================================================
// 6. AIOS INTEGRATION
// ============================================================================
logSection('6. AIOS INTEGRATION');

const hasAiosDir = check(
  fs.existsSync(path.join(__dirname, '.aios-core')) || fs.existsSync(path.join(__dirname, 'aios-core')),
  'AIOS framework is installed',
  'AIOS framework not found'
);
if (hasAiosDir) results.passed++; else results.failed++;

const hasAgentsJs = check(
  fs.existsSync(path.join(__dirname, 'agents.js')),
  'agents.js entry point exists',
  'agents.js missing'
);
if (hasAgentsJs) results.passed++; else results.failed++;

const hasIndexJs = check(
  fs.existsSync(path.join(__dirname, 'index.js')),
  'index.js status script exists',
  'index.js missing'
);
if (hasIndexJs) results.passed++; else results.failed++;

// ============================================================================
// 7. DATABASE CONNECTIVITY (Optional)
// ============================================================================
logSection('7. DATABASE CONNECTIVITY (Optional)');

if (hasEnv && hasSupabaseUrl && hasSupabaseKey) {
  try {
    const testScript = path.join(__dirname, 'test-supabase.js');
    if (fs.existsSync(testScript)) {
      log('Found test-supabase.js - run manually with:', 'yellow');
      log('  node test-supabase.js', 'cyan');
      results.warnings++;
    }
  } catch (error) {
    log(`Database test skipped: ${error.message}`, 'yellow');
    results.warnings++;
  }
} else {
  log('⚠️  Skipping database connectivity test (.env not fully configured)', 'yellow');
  results.warnings++;
}

// ============================================================================
// 8. DEVELOPMENT SERVERS
// ============================================================================
logSection('8. DEVELOPMENT SERVERS');

const hasBackendServer = check(
  fs.existsSync(path.join(__dirname, 'backend/server.js')),
  'Backend server (Express) configured',
  'Backend server not found'
);
if (hasBackendServer) results.passed++; else results.failed++;

const hasFrontendConfig = check(
  fs.existsSync(path.join(__dirname, 'vite.config.js')) ||
  fs.existsSync(path.join(__dirname, 'vite.config.ts')),
  'Frontend build config (Vite) exists',
  'Vite config not found'
);
if (hasFrontendConfig) results.passed++; else results.failed++;

// ============================================================================
// SUMMARY
// ============================================================================
logSection('VALIDATION SUMMARY');

const total = results.passed + results.failed;
const successRate = total > 0 ? Math.round((results.passed / total) * 100) : 0;

log(`\n📊 Results:`, 'cyan');
log(`   ✅ Passed:  ${results.passed}/${total}`, 'green');
log(`   ❌ Failed:  ${results.failed}/${total}`, results.failed > 0 ? 'red' : 'green');
if (results.warnings > 0) {
  log(`   ⚠️  Warnings: ${results.warnings}`, 'yellow');
}

log(`\n📈 Success Rate: ${successRate}%\n`, successRate >= 80 ? 'green' : 'yellow');

if (results.failed === 0) {
  log(`✅ All checks passed! Your setup is ready to go.`, 'green');
  log(`\n📖 Next Steps:`, 'cyan');
  log(`   1. Configure your database: node test-supabase.js`, 'cyan');
  log(`   2. Start backend:  npm run dev:backend`, 'cyan');
  log(`   3. Start frontend: npm run dev:frontend`, 'cyan');
  log(`   4. Access dashboard: http://localhost:5173`, 'cyan');
} else {
  log(`⚠️  Some checks failed. Please fix the issues above.`, 'red');
  log(`\n💡 Common fixes:`, 'yellow');
  log(`   - Missing dependencies: npm install`, 'yellow');
  log(`   - Missing .env: cp .env.example .env`, 'yellow');
  log(`   - AIOS not installed: npx aios-core install`, 'yellow');
}

log(`\n🔗 Documentation:`, 'cyan');
log(`   - SETUP_GUIDE.md: Installation and configuration`, 'cyan');
log(`   - docs/architecture/system-architecture.md: Full design`, 'cyan');
log(`   - docs/frontend/frontend-spec.md: UI/UX specs`, 'cyan');
log(`   - CLAUDE.md: Development guidelines`, 'cyan');

console.log('');

process.exit(results.failed > 0 ? 1 : 0);
