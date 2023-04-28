import { ObjectValidator } from "@sika7/validator/lib/objectValidator";
import { isHttps } from "@sika7/validator/lib/plugins/isHttps";
import { isInteger } from "@sika7/validator/lib/plugins/isInteger";
import { isNumber } from "@sika7/validator/lib/plugins/isNumber";
import { isString } from "@sika7/validator/lib/plugins/isString";
import { isUrl } from "@sika7/validator/lib/plugins/isUrl";
import { IPluginTemplate, templateManager } from "./template-manager";
import { WebComponentWrapper } from "./front/web-components-wrapper";

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

    this.validator.use(isNumber());
    this.validator.use(isString());
    this.validator.use(isHttps());
    this.validator.use(isUrl());
    this.validator.use(isInteger());
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
