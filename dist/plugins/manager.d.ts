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
export declare class PluginManager {
    private pluginsDir;
    private commandsDir;
    private skillsDir;
    constructor(projectRoot: string);
    /**
     * 扫描并加载所有插件
     */
    loadPlugins(): Promise<void>;
    /**
     * 扫描插件目录
     */
    private scanPlugins;
    /**
     * 加载单个插件
     */
    private loadPlugin;
    /**
     * 读取插件配置
     */
    private loadConfig;
    /**
     * 注入插件命令
     */
    private injectCommands;
    /**
     * 注入插件 Skills
     */
    private injectSkills;
    /**
     * 列出所有已安装的插件
     */
    listPlugins(): Promise<PluginConfig[]>;
    /**
     * 安装插件
     */
    installPlugin(pluginName: string, source?: string): Promise<void>;
    /**
     * 移除插件
     */
    removePlugin(pluginName: string): Promise<void>;
}
export {};
//# sourceMappingURL=manager.d.ts.map