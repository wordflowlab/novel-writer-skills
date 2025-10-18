export interface ProjectInfo {
    name: string;
    version: string;
    hasClaudeDir: boolean;
    hasSpecifyDir: boolean;
    hasStoriesDir: boolean;
}
/**
 * 检测当前目录是否是 novel-writer-skills 项目
 */
export declare function isProjectRoot(dir: string): Promise<boolean>;
/**
 * 向上查找项目根目录
 */
export declare function findProjectRoot(startDir?: string): Promise<string | null>;
/**
 * 确保在项目根目录，否则抛出错误
 */
export declare function ensureProjectRoot(): Promise<string>;
/**
 * 获取项目信息
 */
export declare function getProjectInfo(projectPath: string): Promise<ProjectInfo | null>;
//# sourceMappingURL=project.d.ts.map