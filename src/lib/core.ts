import { IUniversalAdSetting, settingManager } from "./setting-manager";
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

  addUnit(data: IUniversalAdSetting) {
    settingManager.add(data);
  }

  showUnit(id: string) {
    try {
      const setting = settingManager.get(id);
      if (setting) {
        const myClass = templateManager.createInstance(setting.template);
        if (myClass) new WebComponentWrapper(setting.id, myClass());
      }
      new Error("no setting");
    } catch (error) {
      throw new Error("エラーが発生しました");
    }
  }
}

export const core = new Core();
