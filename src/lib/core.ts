import { IUniversalAdSetting, settingManager } from "./setting-manager";
import { templateManager, TPluginTemplate } from "./template-manager";
import { WebComponentWrapper } from "./web-components-wrapper";

function attach(setting: IUniversalAdSetting | undefined) {
  if (!setting) return;
  const myClass = templateManager.createInstance(setting.template);
  if (!myClass) throw new Error("No template registration found.");
  return new WebComponentWrapper(setting.id, myClass(), setting?.api);
}

class Core {
  constructor() {
    customElements.define("universal-ad-unit", WebComponentWrapper);
  }

  templates(templates: TPluginTemplate[]) {
    for (const template of templates) {
      templateManager.add(template);
    }
  }

  freezed() {
    templateManager.freezed();
    settingManager.freezed();
  }

  addUnit(data: IUniversalAdSetting) {
    settingManager.add(data);
  }

  showUnit(id: string) {
    try {
      const setting = settingManager.get(id);
      const elm = attach(setting);
      if (!elm) return;
      elm.render();
      elm.pull();
      new Error("no setting");
    } catch (error) {
      throw new Error("An error has occurred.");
    }
  }
}

export const UniversalAd = new Core();
