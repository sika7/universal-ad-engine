interface Config {
  template: string;
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

  main() {

  }
}
