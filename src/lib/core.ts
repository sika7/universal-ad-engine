import { importPluginTemplate, templateManager } from "./template-manager";
import { WebComponentWrapper } from "./web-components-wrapper";

export class Core {
  constructor() {}

  templates(templates: importPluginTemplate[]) {
    templateManager.addConfig(templates);
  }

  main() {
    customElements.define("universal-ad-unit", WebComponentWrapper);

    const myClass = templateManager.createInstance("test");
    if (myClass) new WebComponentWrapper("#app", myClass());
  }

  request() {}
}
