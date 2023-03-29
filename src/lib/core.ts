import { RequestType } from "./api";
import { templateManager, TPluginTemplate } from "./template-manager";
import { WebComponentWrapper } from "./web-components-wrapper";

function attach(setting: IUniversalAdSetting | undefined) {
  if (!setting) return;
  const myClass = templateManager.createInstance(setting.template);
  if (!myClass) throw new Error("No template registration found.");
  return new WebComponentWrapper(setting.id, myClass(), setting?.api);
}

export interface IUniversalAdSetting {
  id: string;
  template: string;
  api?: IUniversalAdApi;
}

export interface IUniversalAdApi {
  url: string;
  type: RequestType;
  data: Record<string, any>;
}

class Core {
  constructor() {
    customElements.define("universal-ad-unit", WebComponentWrapper);
  }

  use(template: TPluginTemplate) {
    templateManager.add(template);
  }

  freezed() {
    templateManager.freezed();
  }

  show(data: IUniversalAdSetting) {
    try {
      const elm = attach(data);
      if (!elm) return;
      elm.render();
      if (data?.api) {
        elm.pull();
      }
      new Error("no setting");
    } catch (error) {
      throw new Error("An error has occurred.");
    }
  }
}

export const UniversalAd = new Core();
