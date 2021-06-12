#!/usr/bin/env ts-node-transpile-only

import { ippCrawler } from './crawler';
import { TEN_MINUTES, wait } from './utils';

(async () => {
  while (true) {
    ippCrawler();
    await wait(TEN_MINUTES);
  }
})();
