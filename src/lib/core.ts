import { settingManager } from "./setting-manager";
import { importPluginTemplate, templateManager } from "./template-manager";
import { WebComponentWrapper } from "./web-components-wrapper";

class Core {
  constructor() {}

  templates(templates: importPluginTemplate[]) {
    templateManager.addConfig(templates);
  }

  main() {
    customElements.define("universal-ad-unit", WebComponentWrapper);

    settingManager.add({ id: "#app", template: "test" });

    try {
      for (const setting of settingManager.data) {
        const myClass = templateManager.createInstance(setting.template);
        if (myClass) new WebComponentWrapper(setting.id, myClass());
      }
    } catch (error) {
      throw new Error('エラーが発生しました');
    }
  }

  request() {}
}

export const core = new Core();
