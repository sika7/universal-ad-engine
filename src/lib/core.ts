import { Debugger } from "./debugger";
import { Logger } from "./logger";

type TypeUniversalAdTemplate = "default" | "iframe";

interface Config {
  template: TypeUniversalAdTemplate;
  logger?: Logger;
  debugger?: Debugger;
}

class UniversalAdConfig {
  config: Config[] = [];

  constructor() {}

  insertConfig(config: Config[]) {
    this.config = config;
  }

  setConfig() {}
}

class UniversalAdModule {
  constructor() {}

  importModule() {}

  appendModule() {}
}

export class Core {
  config: UniversalAdConfig;
  module: UniversalAdModule;

  constructor() {
    this.config = new UniversalAdConfig();
    this.module = new UniversalAdModule();
  }

  main(configs: Config[]) {
    this.config.insertConfig(configs);
    this.module.importModule();
  }

  request() {}
}
