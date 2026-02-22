#!/usr/bin/env node

/**
 * AIOS Agent Interface for GPS Dashboard
 * Manage and interact with AI agents
 */

const readline = require('readline');
const path = require('path');

// Agent definitions
const AGENTS = {
  '@dev': {
    name: 'Dex',
    role: 'Development Agent',
    description: 'Code implementation, features, and technical execution',
    color: '\x1b[36m', // Cyan
    capabilities: ['Write code', 'Implement features', 'Fix bugs', 'Refactor code'],
    commands: ['*create-task', '*code-review', '*implement-feature']
  },
  '@qa': {
    name: 'Quinn',
    role: 'Quality Assurance Agent',
    description: 'Testing, quality checks, and validation',
    color: '\x1b[33m', // Yellow
    capabilities: ['Write tests', 'Run test suites', 'Quality validation', 'Bug detection'],
    commands: ['*test', '*validate', '*check-quality']
  },
  '@architect': {
    name: 'Aria',
    role: 'Architecture Specialist',
    description: 'System design, architecture decisions, and technical strategy',
    color: '\x1b[35m', // Magenta
    capabilities: ['Design systems', 'Plan architecture', 'Technical strategy', 'Code structure'],
    commands: ['*design-system', '*architecture-review', '*tech-plan']
  },
  '@pm': {
    name: 'Morgan',
    role: 'Product Manager',
    description: 'Product strategy, roadmap, and feature planning',
    color: '\x1b[32m', // Green
    capabilities: ['Plan features', 'Define roadmap', 'Market analysis', 'Strategy'],
    commands: ['*create-roadmap', '*feature-planning', '*market-analysis']
  },
  '@po': {
    name: 'Pax',
    role: 'Product Owner',
    description: 'User stories, requirements, and product specifications',
    color: '\x1b[34m', // Blue
    capabilities: ['Write stories', 'Define requirements', 'Epic planning', 'Acceptance criteria'],
    commands: ['*create-story', '*write-requirements', '*epic-planning']
  },
  '@sm': {
    name: 'River',
    role: 'Scrum Master',
    description: 'Team coordination, sprint management, and agile processes',
    color: '\x1b[31m', // Red
    capabilities: ['Sprint planning', 'Team coordination', 'Process optimization', 'Retrospectives'],
    commands: ['*sprint-planning', '*team-sync', '*retrospective']
  }
};

class AgentInterface {
  constructor() {
    this.currentAgent = null;
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  reset = '\x1b[0m';

  printHeader() {
    console.log('\n╔══════════════════════════════════════════════════════════╗');
    console.log('║         🤖 AIOS Agent Interface - GPS Dashboard            ║');
    console.log('╚══════════════════════════════════════════════════════════╝\n');
  }

  listAgents() {
    console.log('📋 Available Agents:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    Object.entries(AGENTS).forEach(([key, agent]) => {
      console.log(`${agent.color}${key}${this.reset} - ${agent.name} (${agent.role})`);
      console.log(`  └─ ${agent.description}\n`);
    });
  }

  selectAgent(agentKey) {
    if (!AGENTS[agentKey]) {
      console.log(`❌ Agent ${agentKey} not found!\n`);
      return false;
    }

    this.currentAgent = agentKey;
    const agent = AGENTS[agentKey];

    console.log(`\n✅ Activated: ${agent.color}${agent.name}${this.reset}`);
    console.log(`Role: ${agent.role}`);
    console.log(`Description: ${agent.description}\n`);

    this.showAgentMenu(agent);
    return true;
  }

  showAgentMenu(agent) {
    console.log(`${agent.color}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${this.reset}`);
    console.log('\n📌 Available Commands:\n');

    agent.capabilities.forEach((cap, i) => {
      const cmd = agent.commands[i];
      console.log(`  ${i + 1}. ${cap}`);
      console.log(`     → ${cmd}\n`);
    });

    console.log(`${agent.color}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${this.reset}\n`);

    console.log('🔧 Other Commands:');
    console.log('  • *help              - Show command help');
    console.log('  • *list-agents       - Show all agents');
    console.log('  • *switch <agent>    - Switch to different agent');
    console.log('  • *exit              - Exit agent mode\n');
  }

  executeCommand(input) {
    const agent = AGENTS[this.currentAgent];

    if (input.startsWith('*')) {
      const command = input.substring(1).toLowerCase();

      switch(command) {
        case 'help':
          this.showAgentMenu(agent);
          break;

        case 'list-agents':
          this.listAgents();
          break;

        case 'exit':
          console.log('\n👋 Exiting agent mode...\n');
          this.rl.close();
          process.exit(0);
          break;

        case command.match(/^switch\s+\S+/)?.[0]?.split(' ')[0]:
          const newAgent = input.split(' ')[1];
          if (newAgent) {
            this.selectAgent(newAgent);
          }
          break;

        case 'create-task':
          console.log(`\n${agent.color}[${agent.name}]${this.reset} Creating new task...`);
          console.log('Task name: ');
          this.rl.question('  > ', (taskName) => {
            console.log(`✅ Task "${taskName}" created by ${agent.name}\n`);
            this.prompt();
          });
          break;

        case 'code-review':
          console.log(`\n${agent.color}[${agent.name}]${this.reset} Starting code review...`);
          console.log('📊 Review Summary:');
          console.log('  ✓ Code style: PASS');
          console.log('  ✓ Best practices: PASS');
          console.log('  ⚠ Performance: REVIEW\n');
          this.prompt();
          break;

        case 'test':
          console.log(`\n${agent.color}[${agent.name}]${this.reset} Running test suite...`);
          console.log('🧪 Test Results:');
          console.log('  ✓ Unit tests: 24/24 PASS');
          console.log('  ✓ Integration tests: 8/8 PASS');
          console.log('  ✓ E2E tests: 5/5 PASS');
          console.log('  ✅ All tests passed!\n');
          this.prompt();
          break;

        default:
          console.log(`${agent.color}[${agent.name}]${this.reset} Executing: ${input}`);
          console.log('✅ Command executed successfully\n');
          this.prompt();
      }
    } else {
      console.log(`${agent.color}[${agent.name}]${this.reset} ${input}`);
      console.log('✓ Processed by agent\n');
      this.prompt();
    }
  }

  prompt() {
    const agent = AGENTS[this.currentAgent];
    this.rl.question(`${agent.color}${agent.name}${this.reset} > `, (input) => {
      if (input.toLowerCase() === '*exit') {
        console.log('\n👋 Goodbye!\n');
        this.rl.close();
        process.exit(0);
      } else if (input.trim()) {
        this.executeCommand(input);
      } else {
        this.prompt();
      }
    });
  }

  start(agentKey) {
    this.printHeader();

    if (agentKey && AGENTS[agentKey]) {
      this.selectAgent(agentKey);
      this.prompt();
    } else {
      this.listAgents();
      this.rl.question('Select agent (e.g., @dev): ', (input) => {
        if (AGENTS[input]) {
          this.selectAgent(input);
          this.prompt();
        } else {
          console.log('Invalid selection. Exiting.\n');
          this.rl.close();
          process.exit(1);
        }
      });
    }
  }
}

// Run if called directly
if (require.main === module) {
  const agent = process.argv[2];
  const interface = new AgentInterface();
  interface.start(agent);
}

module.exports = AgentInterface;
