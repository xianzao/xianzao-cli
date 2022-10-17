// 开始分析项目
import { getPackageJson, initProjectInfo } from './utils/env';
import { debugError, debugInfo, debugProcess, debugTxt } from './utils/debug';
import { eslintInit } from './core/eslint';
import { huskyInit } from './core/husky';
import { eslintIgnoreInit } from './core/eslintignore';
import { commitLintInit } from './core/commitlint';
import { specialFn } from './core/special';
import { vscodeInit } from './core/vscode';

export const start = async (base: string) => {
  const pckJson = await getPackageJson(base);

  await initProjectInfo(pckJson);

  try {
    // 安装eslint 和 prettier 并自动生成配置文件
    await eslintInit();
    // 安装 husky 并自动生成配置文件
    await huskyInit();
    // 生成.vscode 配置文件 支持自动格式化代码
    await commitLintInit();
    // 添加eslint忽略文件
    await eslintIgnoreInit();
    // 针对Vue3模板特殊处理
    await specialFn();
    // 格式化VSCode格式
    await vscodeInit();

    debugInfo('success!');
    // 部分版本依赖可能有冲突，建议重新安装node modules
    debugProcess('请重新安装依赖！npm install or yarn');
    debugTxt(``);
  } catch (error) {
    debugError(JSON.stringify(error));
  }
};
