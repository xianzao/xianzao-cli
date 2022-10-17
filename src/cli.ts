import cac from 'cac';
import { start } from './start';
import { setEnv } from './utils/env';
import { name } from '../package.json';

const cli = cac(name);

export default () => {
  cli
    .command('[root]')
    .alias('alias')
    .action(async (_root, options) => {
      let base: string = options.base;
      if (!base) {
        // 项目的最终路径
        base = process.cwd();
      }
      setEnv('base', base);
      await start(base);
    });

  cli.help();
  cli.version('1.0.0');
  cli.parse();
};
