// 开始分析项目
import { getPackageJson, initProjectInfo } from './utils/env'
import { eslintInit } from './core/eslint'
import { huskyInit } from './core/husky'
import { eslintIgnoreInit } from './core/eslintignore'
import { commitLintInit } from './core/commitlint'
import { specialFn } from './core/special'
import { vscodeInit } from './core/vscode'
import { debugError, debugProcess, debugTxt } from './utils/debug'
import { hasElementInArray } from './utils/tool'
import { answerType } from './interface'

export const start = async (base: string, answers: answerType) => {
  const pckJson = await getPackageJson(base)

  const { vue3 = false, plugins = [] } = answers

  await initProjectInfo(pckJson)

  try {
    // 针对Vue3模板特殊处理
    vue3 && (await specialFn())

    // 安装eslint 和 prettier 并自动生成配置文件
    hasElementInArray(plugins, 'eslint') && (await eslintInit())

    // 添加eslint忽略文件
    hasElementInArray(plugins, 'eslint') && (await eslintIgnoreInit())

    // 安装 husky 并自动生成配置文件
    hasElementInArray(plugins, 'husky') && (await huskyInit())

    // 生成.vscode 配置文件 支持自动格式化代码
    hasElementInArray(plugins, 'commitLint') && (await commitLintInit())

    // 格式化VSCode格式
    hasElementInArray(plugins, 'vscode') && (await vscodeInit())

    debugProcess(
      `恭喜您，成功注册${vue3 ? 'vue3' : ''} ${hasElementInArray(plugins, 'eslint')} ${hasElementInArray(plugins, 'husky')} ${hasElementInArray(
        plugins,
        'commitLint'
      )} ${hasElementInArray(plugins, 'vscode')} 插件`
    )

    // 部分版本依赖可能有冲突，建议重新安装node modules
    debugProcess('请重新安装依赖！npm install or yarn')
    debugTxt(``)
  } catch (error) {
    debugError(JSON.stringify(error))
  }
}
