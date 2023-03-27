import {
  IUniversalAdSetting,
  IUniversalAdApi,
  settingManager,
} from "./setting-manager";
import { templateManager, TPluginTemplate } from "./template-manager";
import { WebComponentWrapper } from "./web-components-wrapper";
import { getProperty } from "./utility";
import { apiRequest } from "./api";

function pull(
  setting: IUniversalAdSetting | undefined,
  callback: (response: any) => void
) {
  if (!setting) return;
  const api = getProperty(setting, "api") as IUniversalAdApi | undefined;
  if (!api) return;
  apiRequest(api.type, api.url, api?.data)
    .then((value: any) => {
      callback(value);
    })
    .catch(() => {
      throw new Error("API request failed.");
    });
}

function attach(setting: IUniversalAdSetting | undefined) {
  if (!setting) return;
  const myClass = templateManager.createInstance(setting.template);
  if (myClass) new WebComponentWrapper(setting.id, myClass());
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
      attach(setting);
      pull(setting, (value) => {
        attach(setting);
      });
      new Error("no setting");
    } catch (error) {
      throw new Error("An error has occurred.");
    }
  }
}

export const UniversalAd = new Core();
