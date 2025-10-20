#!/usr/bin/env node

import { Command } from '@commander-js/extra-typings';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs-extra';
import ora from 'ora';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { getVersion, getVersionInfo } from './version.js';
import { PluginManager } from './plugins/manager.js';
import { ensureProjectRoot, getProjectInfo } from './utils/project.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();

// 显示欢迎横幅
function displayBanner(): void {
  const banner = `
╔═══════════════════════════════════════╗
║  📚  Novel Writer Skills  📝          ║
║  Claude Code 专用小说创作工具        ║
╚═══════════════════════════════════════╝
`;
  console.log(chalk.cyan(banner));
  console.log(chalk.gray(`  ${getVersionInfo()}\n`));
}

displayBanner();

program
  .name('novelwrite')
  .description(chalk.cyan('Novel Writer Skills - Claude Code 专用小说创作工具'))
  .version(getVersion(), '-v, --version', '显示版本号')
  .helpOption('-h, --help', '显示帮助信息');

// init 命令 - 初始化小说项目
program
  .command('init')
  .argument('[name]', '小说项目名称')
  .option('--here', '在当前目录初始化')
  .option('--plugins <names>', '预装插件，逗号分隔')
  .option('--no-git', '跳过 Git 初始化')
  .description('初始化一个新的小说项目')
  .action(async (name, options) => {
    const spinner = ora('正在初始化小说项目...').start();

    try {
      // 确定项目路径
      let projectPath: string;
      if (options.here) {
        projectPath = process.cwd();
        name = path.basename(projectPath);
      } else {
        if (!name) {
          spinner.fail('请提供项目名称或使用 --here 参数');
          process.exit(1);
        }
        projectPath = path.join(process.cwd(), name);
        if (await fs.pathExists(projectPath)) {
          spinner.fail(`项目目录 "${name}" 已存在`);
          process.exit(1);
        }
        await fs.ensureDir(projectPath);
      }

      // 创建基础项目结构
      const baseDirs = [
        '.specify',
        '.specify/memory',
        '.specify/templates',
        '.claude',
        '.claude/commands',
        '.claude/skills',
        'stories',
        'spec',
        'spec/tracking',
        'spec/knowledge'
      ];

      for (const dir of baseDirs) {
        await fs.ensureDir(path.join(projectPath, dir));
      }

      // 创建基础配置文件
      const config = {
        name,
        type: 'novel',
        ai: 'claude',
        created: new Date().toISOString(),
        version: getVersion()
      };

      await fs.writeJson(path.join(projectPath, '.specify', 'config.json'), config, { spaces: 2 });

      // 从 novel-writer-skills 包复制模板文件
      const packageRoot = path.resolve(__dirname, '..');

      // 复制命令文件
      const commandsSource = path.join(packageRoot, 'templates', 'commands');
      const commandsDest = path.join(projectPath, '.claude', 'commands');
      if (await fs.pathExists(commandsSource)) {
        await fs.copy(commandsSource, commandsDest);
        spinner.text = '已安装 Slash Commands...';
      }

      // 复制 Skills 文件
      const skillsSource = path.join(packageRoot, 'templates', 'skills');
      const skillsDest = path.join(projectPath, '.claude', 'skills');
      if (await fs.pathExists(skillsSource)) {
        await fs.copy(skillsSource, skillsDest);
        spinner.text = '已安装 Agent Skills...';
      }

      // 复制模板文件到 .specify/templates
      const fullTemplatesDir = path.join(packageRoot, 'templates');
      if (await fs.pathExists(fullTemplatesDir)) {
        const userTemplatesDir = path.join(projectPath, '.specify', 'templates');
        await fs.copy(fullTemplatesDir, userTemplatesDir, { overwrite: false });
      }

      // 复制 memory 文件
      const memoryDir = path.join(packageRoot, 'templates', 'memory');
      if (await fs.pathExists(memoryDir)) {
        const userMemoryDir = path.join(projectPath, '.specify', 'memory');
        await fs.copy(memoryDir, userMemoryDir);
      }

      // 复制追踪文件模板
      const trackingTemplatesDir = path.join(packageRoot, 'templates', 'tracking');
      if (await fs.pathExists(trackingTemplatesDir)) {
        const userTrackingDir = path.join(projectPath, 'spec', 'tracking');
        await fs.copy(trackingTemplatesDir, userTrackingDir);
      }

      // 复制知识库模板（项目特定）
      const knowledgeTemplatesDir = path.join(packageRoot, 'templates', 'knowledge');
      if (await fs.pathExists(knowledgeTemplatesDir)) {
        const userKnowledgeDir = path.join(projectPath, 'spec', 'knowledge');
        await fs.copy(knowledgeTemplatesDir, userKnowledgeDir);
      }

      // 复制通用知识库系统（v1.0新增）
      const knowledgeBaseDir = path.join(packageRoot, 'templates', 'knowledge-base');
      if (await fs.pathExists(knowledgeBaseDir)) {
        const claudeKnowledgeBaseDir = path.join(projectPath, '.claude', 'knowledge-base');
        await fs.copy(knowledgeBaseDir, claudeKnowledgeBaseDir);
        spinner.text = '已安装知识库系统...';
      }

      // 如果指定了 --plugins，安装插件
      if (options.plugins) {
        spinner.text = '安装插件...';
        const pluginNames = options.plugins.split(',').map((p: string) => p.trim());
        const pluginManager = new PluginManager(projectPath);

        for (const pluginName of pluginNames) {
          const builtinPluginPath = path.join(packageRoot, 'plugins', pluginName);
          if (await fs.pathExists(builtinPluginPath)) {
            await pluginManager.installPlugin(pluginName, builtinPluginPath);
          } else {
            console.log(chalk.yellow(`\n警告: 插件 "${pluginName}" 未找到`));
          }
        }
      }

      // Git 初始化
      if (options.git !== false) {
        try {
          execSync('git init', { cwd: projectPath, stdio: 'ignore' });

          const gitignore = `# 临时文件
*.tmp
*.swp
.DS_Store

# 编辑器配置
.vscode/
.idea/

# AI 缓存
.ai-cache/

# 节点模块
node_modules/
`;
          await fs.writeFile(path.join(projectPath, '.gitignore'), gitignore);
          execSync('git add .', { cwd: projectPath, stdio: 'ignore' });
          execSync('git commit -m "初始化小说项目"', { cwd: projectPath, stdio: 'ignore' });
        } catch {
          console.log(chalk.yellow('\n提示: Git 初始化失败，但项目已创建成功'));
        }
      }

      spinner.succeed(chalk.green(`小说项目 "${name}" 创建成功！`));

      // 显示后续步骤
      console.log('\n' + chalk.cyan('接下来:'));
      console.log(chalk.gray('─────────────────────────────'));

      if (!options.here) {
        console.log(`  1. ${chalk.white(`cd ${name}`)} - 进入项目目录`);
      }

      console.log(`  2. ${chalk.white('在 Claude Code 中打开项目')}`);
      console.log(`  3. 使用以下斜杠命令开始创作:`);

      console.log('\n' + chalk.yellow('     📝 七步方法论:'));
      console.log(`     ${chalk.cyan('/constitution')} - 创建创作宪法，定义核心原则`);
      console.log(`     ${chalk.cyan('/specify')}      - 定义故事规格，明确要创造什么`);
      console.log(`     ${chalk.cyan('/clarify')}      - 澄清关键决策点，明确模糊之处`);
      console.log(`     ${chalk.cyan('/plan')}         - 制定技术方案，决定如何创作`);
      console.log(`     ${chalk.cyan('/tasks')}        - 分解执行任务，生成可执行清单`);
      console.log(`     ${chalk.cyan('/write')}        - AI 辅助写作章节内容`);
      console.log(`     ${chalk.cyan('/analyze')}      - 综合验证分析，确保质量一致`);

      console.log('\n' + chalk.yellow('     📊 追踪管理命令:'));
      console.log(`     ${chalk.cyan('/track-init')}  - 初始化追踪系统`);
      console.log(`     ${chalk.cyan('/track')}       - 综合追踪更新`);
      console.log(`     ${chalk.cyan('/plot-check')}  - 检查情节一致性`);
      console.log(`     ${chalk.cyan('/timeline')}    - 管理故事时间线`);

      console.log('\n' + chalk.gray('Agent Skills 会自动激活，无需手动调用'));
      console.log(chalk.dim('提示: 斜杠命令在 Claude Code 内部使用，不是在终端中'));

    } catch (error) {
      spinner.fail(chalk.red('项目初始化失败'));
      console.error(error);
      process.exit(1);
    }
  });

// check 命令 - 检查环境
program
  .command('check')
  .description('检查系统环境和 Claude Code')
  .action(() => {
    console.log(chalk.cyan('检查系统环境...\n'));

    const checks = [
      { name: 'Node.js', command: 'node --version', installed: false },
      { name: 'Git', command: 'git --version', installed: false }
    ];

    checks.forEach(check => {
      try {
        const version = execSync(check.command, { encoding: 'utf-8' }).trim();
        check.installed = true;
        console.log(chalk.green('✓') + ` ${check.name} 已安装 (${version})`);
      } catch {
        console.log(chalk.yellow('⚠') + ` ${check.name} 未安装`);
      }
    });

    console.log('\n' + chalk.cyan('Claude Code 检测:'));
    console.log(chalk.gray('请确保已安装 Claude Code 并可以正常使用'));
    console.log(chalk.gray('下载地址: https://claude.ai/download'));

    console.log('\n' + chalk.green('环境检查完成！'));
  });

// plugin 命令 - 插件管理
program
  .command('plugin')
  .description('插件管理 (使用 plugin:list, plugin:add, plugin:remove)')
  .action(() => {
    console.log(chalk.cyan('\n📦 插件管理命令:\n'));
    console.log('  novelwrite plugin:list              - 列出已安装的插件');
    console.log('  novelwrite plugin:add <name>        - 安装插件');
    console.log('  novelwrite plugin:remove <name>     - 移除插件');
    console.log('\n' + chalk.gray('可用插件:'));
    console.log('  authentic-voice   - 真实人声写作插件');
  });

program
  .command('plugin:list')
  .description('列出已安装的插件')
  .action(async () => {
    try {
      const projectPath = await ensureProjectRoot();
      const projectInfo = await getProjectInfo(projectPath);

      if (!projectInfo) {
        console.log(chalk.red('❌ 无法读取项目信息'));
        process.exit(1);
      }

      const pluginManager = new PluginManager(projectPath);
      const plugins = await pluginManager.listPlugins();

      console.log(chalk.cyan('\n📦 已安装的插件\n'));
      console.log(chalk.gray(`项目: ${path.basename(projectPath)}\n`));

      if (plugins.length === 0) {
        console.log(chalk.yellow('暂无插件'));
        console.log(chalk.gray('\n使用 "novel-skills plugin:add <name>" 安装插件'));
        console.log(chalk.gray('可用插件: authentic-voice\n'));
        return;
      }

      for (const plugin of plugins) {
        console.log(chalk.yellow(`  ${plugin.name}`) + ` (v${plugin.version})`);
        console.log(chalk.gray(`    ${plugin.description}`));

        if (plugin.commands && plugin.commands.length > 0) {
          console.log(chalk.gray(`    命令: ${plugin.commands.map(c => `/${c.id}`).join(', ')}`));
        }

        if (plugin.skills && plugin.skills.length > 0) {
          console.log(chalk.gray(`    Skills: ${plugin.skills.map(s => s.id).join(', ')}`));
        }
        console.log('');
      }
    } catch (error: any) {
      if (error.message === 'NOT_IN_PROJECT') {
        console.log(chalk.red('\n❌ 当前目录不是 novelwrite 项目'));
        console.log(chalk.gray('   请在项目根目录运行此命令\n'));
        process.exit(1);
      }

      console.error(chalk.red('❌ 列出插件失败:'), error);
      process.exit(1);
    }
  });

program
  .command('plugin:add <name>')
  .description('安装插件')
  .action(async (name) => {
    try {
      const projectPath = await ensureProjectRoot();
      const projectInfo = await getProjectInfo(projectPath);

      if (!projectInfo) {
        console.log(chalk.red('❌ 无法读取项目信息'));
        process.exit(1);
      }

      console.log(chalk.cyan('\n📦 NovelWrite 插件安装\n'));
      console.log(chalk.gray(`项目版本: ${projectInfo.version}\n`));

      const packageRoot = path.resolve(__dirname, '..');
      const builtinPluginPath = path.join(packageRoot, 'plugins', name);

      if (!await fs.pathExists(builtinPluginPath)) {
        console.log(chalk.red(`❌ 插件 ${name} 未找到\n`));
        console.log(chalk.gray('可用插件:'));
        console.log(chalk.gray('  - authentic-voice (真实人声插件)'));
        process.exit(1);
      }

      const spinner = ora('正在安装插件...').start();
      const pluginManager = new PluginManager(projectPath);

      await pluginManager.installPlugin(name, builtinPluginPath);
      spinner.succeed(chalk.green('插件安装成功！\n'));

    } catch (error: any) {
      if (error.message === 'NOT_IN_PROJECT') {
        console.log(chalk.red('\n❌ 当前目录不是 novelwrite 项目'));
        console.log(chalk.gray('   请在项目根目录运行此命令\n'));
        process.exit(1);
      }

      console.log(chalk.red('\n❌ 安装插件失败'));
      console.error(chalk.gray(error.message || error));
      console.log('');
      process.exit(1);
    }
  });

program
  .command('plugin:remove <name>')
  .description('移除插件')
  .action(async (name) => {
    try {
      const projectPath = await ensureProjectRoot();
      const pluginManager = new PluginManager(projectPath);

      console.log(chalk.cyan('\n📦 NovelWrite 插件移除\n'));
      console.log(chalk.gray(`准备移除插件: ${name}\n`));

      const spinner = ora('正在移除插件...').start();
      await pluginManager.removePlugin(name);
      spinner.succeed(chalk.green('插件移除成功！\n'));
    } catch (error: any) {
      if (error.message === 'NOT_IN_PROJECT') {
        console.log(chalk.red('\n❌ 当前目录不是 novelwrite 项目'));
        console.log(chalk.gray('   请在项目根目录运行此命令\n'));
        process.exit(1);
      }

      console.log(chalk.red('\n❌ 移除插件失败'));
      console.error(chalk.gray(error.message || error));
      console.log('');
      process.exit(1);
    }
  });

// upgrade 命令 - 升级现有项目
program
  .command('upgrade')
  .option('--commands', '更新命令文件')
  .option('--skills', '更新 Skills 文件')
  .option('--knowledge-base', '更新知识库系统')
  .option('--all', '更新所有内容')
  .option('-y, --yes', '跳过确认提示')
  .description('升级现有项目到最新版本')
  .action(async (options) => {
    const projectPath = process.cwd();
    const packageRoot = path.resolve(__dirname, '..');

    try {
      const configPath = path.join(projectPath, '.specify', 'config.json');
      if (!await fs.pathExists(configPath)) {
        console.log(chalk.red('❌ 当前目录不是 novel-writer-skills 项目'));
        process.exit(1);
      }

      const config = await fs.readJson(configPath);
      const projectVersion = config.version || '未知';

      console.log(chalk.cyan('\n📦 NovelWrite 项目升级\n'));
      console.log(chalk.gray(`当前版本: ${projectVersion}`));
      console.log(chalk.gray(`目标版本: ${getVersion()}\n`));

      let updateCommands = options.all || options.commands || false;
      let updateSkills = options.all || options.skills || false;
      let updateKnowledgeBase = options.all || options.knowledgeBase || false;

      if (!updateCommands && !updateSkills && !updateKnowledgeBase) {
        updateCommands = true;
        updateSkills = true;
        updateKnowledgeBase = true;
      }

      if (!options.yes) {
        const inquirer = (await import('inquirer')).default;
        const answers = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'proceed',
            message: '确认执行升级?',
            default: true
          }
        ]);

        if (!answers.proceed) {
          console.log(chalk.yellow('\n升级已取消'));
          process.exit(0);
        }
      }

      const spinner = ora('正在升级项目...').start();

      if (updateCommands) {
        spinner.text = '更新 Slash Commands...';
        const commandsSource = path.join(packageRoot, 'templates', 'commands');
        const commandsDest = path.join(projectPath, '.claude', 'commands');
        if (await fs.pathExists(commandsSource)) {
          await fs.copy(commandsSource, commandsDest, { overwrite: true });
        }
      }

      if (updateSkills) {
        spinner.text = '更新 Agent Skills...';
        const skillsSource = path.join(packageRoot, 'templates', 'skills');
        const skillsDest = path.join(projectPath, '.claude', 'skills');
        if (await fs.pathExists(skillsSource)) {
          await fs.copy(skillsSource, skillsDest, { overwrite: true });
        }
      }

      if (updateKnowledgeBase) {
        spinner.text = '更新知识库系统...';
        const knowledgeBaseSource = path.join(packageRoot, 'templates', 'knowledge-base');
        const knowledgeBaseDest = path.join(projectPath, '.claude', 'knowledge-base');
        if (await fs.pathExists(knowledgeBaseSource)) {
          await fs.copy(knowledgeBaseSource, knowledgeBaseDest, { overwrite: true });
        }
      }

      config.version = getVersion();
      await fs.writeJson(configPath, config, { spaces: 2 });

      spinner.succeed(chalk.green('升级完成！\n'));

      console.log(chalk.cyan('✨ 升级内容:'));
      if (updateCommands) console.log('  • Slash Commands 已更新');
      if (updateSkills) console.log('  • Agent Skills 已更新');
      if (updateKnowledgeBase) console.log('  • 知识库系统 已更新（包括 styles/ 和 requirements/）');
      console.log(`  • 版本号: ${projectVersion} → ${getVersion()}`);

    } catch (error) {
      console.error(chalk.red('\n❌ 升级失败:'), error);
      process.exit(1);
    }
  });

// 自定义帮助信息
program.on('--help', () => {
  console.log('');
  console.log(chalk.yellow('使用示例:'));
  console.log('');
  console.log('  $ novelwrite init my-story      # 创建新项目');
  console.log('  $ novelwrite init --here        # 在当前目录初始化');
  console.log('  $ novelwrite check              # 检查环境');
  console.log('  $ novelwrite plugin:list        # 列出插件');
  console.log('');
  console.log(chalk.gray('更多信息: https://github.com/wordflowlab/novel-writer-skills'));
});

// 解析命令行参数
program.parse(process.argv);

// 如果没有提供任何命令，显示帮助信息
if (!process.argv.slice(2).length) {
  program.outputHelp();
}

