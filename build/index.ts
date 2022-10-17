import fs from 'fs-extra';
import { getPackageJson } from '../src/utils/env';
import { getPath } from '../src/utils/path';
const buildInit = async () => {
  const pkgJson = await getPackageJson();
  pkgJson['bin'] = {
    'xianzao-cli': 'index.js',
  };
  // 去掉husky
  delete pkgJson.scripts.prepare;
  pkgJson['main'] = 'index.js';
  fs.outputFileSync(getPath('./dist/package.json'), JSON.stringify(pkgJson));
  fs.copyFileSync(getPath('./README.md'), './dist/README.md');
};

buildInit();
