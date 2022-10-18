import fs from 'fs-extra';
import minimist from 'minimist';

import { getPackageJson } from '../src/utils/env';
import { getPath } from '../src/utils/path';
import { debugInfo } from '../src/utils/debug';

const versionInit = async () => {
  if (!minimist(process.argv.slice(2)).release) return false;

  const pkgJson = await getPackageJson();
  let version = pkgJson.version.split('.');

  version[2] = Number(version[2]) + 1;

  pkgJson['version'] = version.join('.');

  fs.outputFileSync(getPath('./package.json'), JSON.stringify(pkgJson, null, 2));

  debugInfo(`当前版本${pkgJson['version']}`);
};

versionInit();
