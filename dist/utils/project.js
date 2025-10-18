import fs from 'fs-extra';
import path from 'path';
/**
 * 检测当前目录是否是 novel-writer-skills 项目
 */
export async function isProjectRoot(dir) {
    const configPath = path.join(dir, '.specify', 'config.json');
    return await fs.pathExists(configPath);
}
/**
 * 向上查找项目根目录
 */
export async function findProjectRoot(startDir = process.cwd()) {
    let currentDir = startDir;
    while (true) {
        if (await isProjectRoot(currentDir)) {
            return currentDir;
        }
        const parentDir = path.dirname(currentDir);
        // 已到达文件系统根目录
        if (parentDir === currentDir) {
            return null;
        }
        currentDir = parentDir;
    }
}
/**
 * 确保在项目根目录，否则抛出错误
 */
export async function ensureProjectRoot() {
    const projectRoot = await findProjectRoot();
    if (!projectRoot) {
        throw new Error('NOT_IN_PROJECT');
    }
    return projectRoot;
}
/**
 * 获取项目信息
 */
export async function getProjectInfo(projectPath) {
    try {
        const configPath = path.join(projectPath, '.specify', 'config.json');
        if (!await fs.pathExists(configPath)) {
            return null;
        }
        const config = await fs.readJson(configPath);
        return {
            name: config.name || path.basename(projectPath),
            version: config.version || 'unknown',
            hasClaudeDir: await fs.pathExists(path.join(projectPath, '.claude')),
            hasSpecifyDir: await fs.pathExists(path.join(projectPath, '.specify')),
            hasStoriesDir: await fs.pathExists(path.join(projectPath, 'stories'))
        };
    }
    catch {
        return null;
    }
}
//# sourceMappingURL=project.js.map