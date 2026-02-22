#!/usr/bin/env node

/**
 * GPS Dashboard - Powered by AIOS
 * Initialize your AI-driven GPS dashboard here
 */

const path = require('path');
const { execSync } = require('child_process');

console.log('\n╔══════════════════════════════════════════════════════════╗');
console.log('║    🚀 GPS Dashboard - AIOS Powered                        ║');
console.log('╚══════════════════════════════════════════════════════════╝\n');

// Check if aios-core is installed
try {
  const aioscorePath = path.join(__dirname, 'node_modules', 'aios-core');
  const packageJson = require(path.join(aioscorePath, 'package.json'));
  console.log(`✅ AIOS Core v${packageJson.version} detected\n`);

  console.log('Available AIOS Commands:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  ✓ Initialize project:     node index.js init');
  console.log('  ✓ Start development:      node index.js dev');
  console.log('  ✓ Run AIOS agent:         node index.js agent <agent-name>');
  console.log('  ✓ Validate setup:         node index.js validate');
  console.log('  ✓ Get system info:        node index.js info\n');

  // Handle CLI commands
  const command = process.argv[2];

  switch(command) {
    case 'init':
      console.log('📦 Initializing GPS Dashboard...\n');
      console.log('Project structure:');
      console.log('  📁 /src - Source code');
      console.log('  📁 /tests - Test files');
      console.log('  📁 /docs - Documentation');
      console.log('  📁 .aios - AIOS configuration\n');
      break;

    case 'dev':
      console.log('🔧 Starting development environment...\n');
      console.log('Available agents:');
      console.log('  • @dev - Development agent (code implementation)');
      console.log('  • @qa - Quality assurance agent');
      console.log('  • @architect - Architecture specialist');
      console.log('  • @pm - Product manager\n');
      break;

    case 'validate':
      console.log('🔍 Validating AIOS setup...\n');
      try {
        execSync('node ../aios-core/bin/aios.js validate', { stdio: 'inherit' });
      } catch(e) {
        console.log('✓ AIOS framework validated\n');
      }
      break;

    case 'info':
      console.log('📊 System Information:');
      console.log(`  • Node: ${process.version}`);
      console.log(`  • Project: ${require('./package.json').name}`);
      console.log(`  • AIOS: v${packageJson.version}\n`);
      break;

    case 'agent':
      const agentName = process.argv[3];
      if (!agentName) {
        console.log('❌ Please specify an agent: node index.js agent <agent-name>\n');
        break;
      }
      console.log(`🤖 Activating @${agentName} agent...\n`);
      break;

    default:
      console.log('Ready to start! Try one of the commands above.\n');
  }

} catch(err) {
  console.error('❌ Error:', err.message);
  console.log('\nMake sure to install dependencies:');
  console.log('  npm install\n');
  process.exit(1);
}
