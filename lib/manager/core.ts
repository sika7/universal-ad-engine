import { ObjectValidator } from "@sika7/validator/lib/objectValidator";
import { isHttps } from "@sika7/validator/lib/plugins/isHttps";
import { isInteger } from "@sika7/validator/lib/plugins/isInteger";
import { isNumber } from "@sika7/validator/lib/plugins/isNumber";
import { isString } from "@sika7/validator/lib/plugins/isString";
import { isUrl } from "@sika7/validator/lib/plugins/isUrl";
import { Common, common } from "../common";
import { UniversalAdCore } from "../core";
import { Plugin } from "../template/plugin";
import { WebComponentWrapper } from "../wrapper/web-components";

function attach(
  setting: IUniversalAdSetting | undefined,
  template: Plugin,
  common: Common
) {
  if (!setting) return;
  if (!template) throw new Error("No template registration found.");
  return new WebComponentWrapper({
    id: setting.id,
    core: new UniversalAdCore({
      common: common,
      template: template.template(),
    }),
    apiData: template.api,
    common: common,
  });
}

export interface IUniversalAdSetting {
  id: string;
  parameter?: Record<string, any>;
}

class PluginController {
  private template: Plugin;
  private common: Common;
  constructor(param: { common: Common; template: Plugin }) {
    this.template = param.template;
    this.common = param.common;
  }

  attach(data: IUniversalAdSetting) {
    try {
      const elm = attach(data, this.template, this.common);
      if (!elm) return;
      elm.render();
      if (data?.parameter) {
        elm.pull(data?.parameter);
      }
      new Error("no setting");
    } catch (error) {
      throw new Error("An error has occurred.");
    }
  }
}

class Core {
  private validator = new ObjectValidator();
  private common: Common;

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

    this.common = common({
      validator: (setting, value) => {
        const result = this.validator.validation(setting, value);
        if (result) return true;
        return false;
      },
      log: ({ message }) => console.log(message),
      debug: ({ message }) => console.log(message),
    });
  }

  make(template: Plugin) {
    return new PluginController({
      common: this.common,
      template,
    });
  }
}

export const UniversalAd = new Core();
