import fs from 'fs-extra';
import { writeInPkg } from '../utils/tool';
import { getPackageJson, getEnv } from '../utils/env';
import { prettierrcInit } from '../template/prettierrc';
import { eslintrcFn } from '../template/eslintrc';
import { getPath } from '../utils/path';

const baseDep = [
  'eslint@^7.25.0',
  'prettier@^2.7.1',
  'eslint-friendly-formatter@^4.0.1',
  'eslint-plugin-prettier@^4.0.0',
  'eslint-plugin-html@^6.2.0',
  'eslint-config-prettier@^8.5.0',
];

export const eslintInit = async () => {
  let devDependencies: string[] = baseDep;
  if (getEnv('isVue2')) {
    devDependencies = [...baseDep, 'eslint-plugin-vue@^6.2.2'];
  }
  if (getEnv('isVue3')) {
    devDependencies = [...baseDep, 'eslint-plugin-vue@^9.2.0', '@typescript-eslint/parser@^5.30.7'];
  }
  if (getEnv('isReact')) {
    devDependencies = [
      ...baseDep,
      'eslint-plugin-react@^7.30.1',
      'eslint-plugin-jsx-a11y@^6.6.1',
      '@typescript-eslint/parser@^5.30.7',
      '@typescript-eslint/eslint-plugin@5.30.7',
    ];
  }
  // writeInPkg 只是把依赖写入到package中
  await writeInPkg(devDependencies, 'devDependencies');
  fs.outputFileSync(getPath('./.eslintrc.js'), eslintrcFn());
  fs.outputFileSync(getPath('./.prettierrc'), prettierrcInit);

  let pkgJson = await getPackageJson();
  if (pkgJson['eslintConfig']) {
    delete pkgJson.eslintConfig;
  }
  fs.writeJsonSync(getPath('package.json'), pkgJson, { spaces: 2 });
};
