import { ObjectValidator } from "@sika7/validator/lib/objectValidator";
import { IValidatePlugin } from "@sika7/validator/lib/types";
import { IPluginTemplate, templateManager } from "./template-manager";
import { WebComponentWrapper } from "./web-components-wrapper";

function attach(
  setting: IUniversalAdSetting | undefined,
  validator: ObjectValidator
) {
  if (!setting) return;
  const data = templateManager.find(setting.template);
  if (!data) throw new Error("No template registration found.");
  return new WebComponentWrapper(
    setting.id,
    data.template(),
    data.api,
    setting.parameter,
    validator
  );
}

export interface IUniversalAdSetting {
  id: string;
  template: string;
  parameter?: Record<string, any>;
}

class Core {
  private validator = new ObjectValidator();

  constructor() {
    const name = "universal-ad-unit";
    if (!customElements.get(name)) {
      customElements.define(name, WebComponentWrapper);
    }
  }

  validation(plugin: IValidatePlugin) {
    this.validator.use(plugin);
  }

  use(template: IPluginTemplate) {
    templateManager.add(template);
  }

  freezed() {
    templateManager.freezed();
  }

  show(data: IUniversalAdSetting) {
    try {
      const elm = attach(data, this.validator);
      if (!elm) return;
      elm.render();
      if (data?.parameter) {
        elm.pull();
      }
      new Error("no setting");
    } catch (error) {
      throw new Error("An error has occurred.");
    }
  }
}

export const UniversalAd = new Core();
