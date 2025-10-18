import fs from 'fs-extra';
import path from 'path';
import yaml from 'js-yaml';
import { logger } from '../utils/logger.js';

interface PluginConfig {
  name: string;
  version: string;
  description: string;
  type: 'feature' | 'expert' | 'workflow';
  commands?: Array<{
    id: string;
    file: string;
    description: string;
  }>;
  skills?: Array<{
    id: string;
    file: string;
    description: string;
  }>;
  dependencies?: {
    core: string;
  };
  installation?: {
    message?: string;
  };
}

export class PluginManager {
  private pluginsDir: string;
  private commandsDir: string;
  private skillsDir: string;

  constructor(projectRoot: string) {
    this.pluginsDir = path.join(projectRoot, 'plugins');
    this.commandsDir = path.join(projectRoot, '.claude', 'commands');
    this.skillsDir = path.join(projectRoot, '.claude', 'skills');
  }

  /**
   * 扫描并加载所有插件
   */
  async loadPlugins(): Promise<void> {
    try {
      await fs.ensureDir(this.pluginsDir);
      const plugins = await this.scanPlugins();

      if (plugins.length === 0) {
        logger.info('没有发现插件');
        return;
      }

      logger.info(`发现 ${plugins.length} 个插件`);

      for (const pluginName of plugins) {
        await this.loadPlugin(pluginName);
      }

      logger.success('所有插件加载完成');
    } catch (error) {
      logger.error('加载插件失败:', error);
    }
  }

  /**
   * 扫描插件目录
   */
  private async scanPlugins(): Promise<string[]> {
    try {
      if (!await fs.pathExists(this.pluginsDir)) {
        return [];
      }

      const entries = await fs.readdir(this.pluginsDir, { withFileTypes: true });
      const plugins = [];

      for (const entry of entries) {
        if (entry.isDirectory()) {
          const configPath = path.join(this.pluginsDir, entry.name, 'config.yaml');
          if (await fs.pathExists(configPath)) {
            plugins.push(entry.name);
          }
        }
      }

      return plugins;
    } catch (error) {
      logger.error('扫描插件目录失败:', error);
      return [];
    }
  }

  /**
   * 加载单个插件
   */
  private async loadPlugin(pluginName: string): Promise<void> {
    try {
      logger.info(`加载插件: ${pluginName}`);

      const configPath = path.join(this.pluginsDir, pluginName, 'config.yaml');
      const config = await this.loadConfig(configPath);

      if (!config) {
        logger.warn(`插件 ${pluginName} 配置无效`);
        return;
      }

      // 注入命令
      if (config.commands && config.commands.length > 0) {
        await this.injectCommands(pluginName, config.commands);
      }

      // 注入 Skills
      if (config.skills && config.skills.length > 0) {
        await this.injectSkills(pluginName, config.skills);
      }

      logger.success(`插件 ${pluginName} 加载成功`);

      if (config.installation?.message) {
        console.log(config.installation.message);
      }
    } catch (error) {
      logger.error(`加载插件 ${pluginName} 失败:`, error);
    }
  }

  /**
   * 读取插件配置
   */
  private async loadConfig(configPath: string): Promise<PluginConfig | null> {
    try {
      const content = await fs.readFile(configPath, 'utf-8');
      const config = yaml.load(content) as PluginConfig;

      if (!config.name || !config.version) {
        return null;
      }

      return config;
    } catch (error) {
      logger.error(`读取配置文件失败: ${configPath}`, error);
      return null;
    }
  }

  /**
   * 注入插件命令
   */
  private async injectCommands(
    pluginName: string,
    commands: PluginConfig['commands']
  ): Promise<void> {
    if (!commands) return;

    for (const cmd of commands) {
      try {
        const sourcePath = path.join(this.pluginsDir, pluginName, cmd.file);
        const destPath = path.join(this.commandsDir, `${cmd.id}.md`);

        await fs.ensureDir(this.commandsDir);
        await fs.copy(sourcePath, destPath);
        logger.debug(`注入命令: /${cmd.id}`);
      } catch (error) {
        logger.error(`注入命令 ${cmd.id} 失败:`, error);
      }
    }
  }

  /**
   * 注入插件 Skills
   */
  private async injectSkills(
    pluginName: string,
    skills: PluginConfig['skills']
  ): Promise<void> {
    if (!skills) return;

    for (const skill of skills) {
      try {
        const sourcePath = path.join(this.pluginsDir, pluginName, skill.file);
        const destPath = path.join(this.skillsDir, pluginName, path.basename(skill.file));

        await fs.ensureDir(path.dirname(destPath));
        await fs.copy(sourcePath, destPath);
        logger.debug(`注入 Skill: ${skill.id}`);
      } catch (error) {
        logger.error(`注入 Skill ${skill.id} 失败:`, error);
      }
    }
  }

  /**
   * 列出所有已安装的插件
   */
  async listPlugins(): Promise<PluginConfig[]> {
    const plugins = await this.scanPlugins();
    const configs: PluginConfig[] = [];

    for (const pluginName of plugins) {
      const configPath = path.join(this.pluginsDir, pluginName, 'config.yaml');
      const config = await this.loadConfig(configPath);
      if (config) {
        configs.push(config);
      }
    }

    return configs;
  }

  /**
   * 安装插件
   */
  async installPlugin(pluginName: string, source?: string): Promise<void> {
    try {
      logger.info(`安装插件: ${pluginName}`);

      if (source) {
        const destPath = path.join(this.pluginsDir, pluginName);
        await fs.copy(source, destPath);
      } else {
        logger.warn('远程安装功能尚未实现');
        return;
      }

      await this.loadPlugin(pluginName);
      logger.success(`插件 ${pluginName} 安装成功`);
    } catch (error) {
      logger.error(`安装插件 ${pluginName} 失败:`, error);
      throw error;
    }
  }

  /**
   * 移除插件
   */
  async removePlugin(pluginName: string): Promise<void> {
    try {
      logger.info(`移除插件: ${pluginName}`);

      // 删除插件目录
      const pluginPath = path.join(this.pluginsDir, pluginName);
      await fs.remove(pluginPath);

      // 删除注入的命令
      if (await fs.pathExists(this.commandsDir)) {
        const commandFiles = await fs.readdir(this.commandsDir);
        for (const file of commandFiles) {
          // 这里简化处理，实际应该读取插件配置来确定要删除的文件
          // 暂时跳过，因为我们需要知道哪些命令属于这个插件
        }
      }

      // 删除注入的 Skills
      const pluginSkillsDir = path.join(this.skillsDir, pluginName);
      if (await fs.pathExists(pluginSkillsDir)) {
        await fs.remove(pluginSkillsDir);
      }

      logger.success(`插件 ${pluginName} 移除成功`);
    } catch (error) {
      logger.error(`移除插件 ${pluginName} 失败:`, error);
      throw error;
    }
  }
}

