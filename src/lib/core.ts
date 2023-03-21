import { settingManager } from "./setting-manager";
import { templateManager, TPluginTemplate } from "./template-manager";
import { WebComponentWrapper } from "./web-components-wrapper";

class Core {
  constructor() {
    customElements.define("universal-ad-unit", WebComponentWrapper);
  }

  templates(templates: TPluginTemplate[]) {
    for (const template of templates) {
      templateManager.add(template);
    }
  }

  main() {
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
