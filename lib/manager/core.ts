// import { ObjectValidator } from "@sika7/validator/lib/objectValidator";
// import { isHttps } from "@sika7/validator/lib/plugins/isHttps";
// import { isInteger } from "@sika7/validator/lib/plugins/isInteger";
// import { isNumber } from "@sika7/validator/lib/plugins/isNumber";
// import { isString } from "@sika7/validator/lib/plugins/isString";
// import { isUrl } from "@sika7/validator/lib/plugins/isUrl";
import { Common, common } from "../common";
import { UniversalAdCore } from "../core";
import { Plugin } from "../template/plugin";
import { WebComponentWrapper } from "../wrapper/web-components";

export interface Setting {
  id: string;
  parameter?: Record<string, any>;
}

function attach(setting: Setting, template: Plugin, common: Common) {
  return new WebComponentWrapper({
    id: setting.id,
    core: new UniversalAdCore({
      common: common,
      template: template.template(),
      apiSetting: template.api,
    }),
  });
}

export function makeUnit({
  setting,
  plugin,
  common,
}: {
  setting: Setting;
  plugin: Plugin;
  common: Common;
}) {
  try {
    const elm = attach(setting, plugin, common);
    if (!elm) return;
    elm.render();
    if (setting?.parameter) {
      elm.pull(setting?.parameter);
    }
    return elm;
  } catch (error) {
    throw new Error("An error has occurred.");
  }
}

class PluginController {
  private plugin: Plugin;
  private common: Common;
  constructor(param: { common: Common; plugin: Plugin }) {
    this.plugin = param.plugin;
    this.common = param.common;
  }

  attach(setting: Setting) {
    makeUnit({ setting, plugin: this.plugin, common: this.common });
  }
}

class Core {
  // private validator = new ObjectValidator();
  private common: Common;

  constructor() {
    const name = "universal-ad-unit";
    if (!customElements.get(name)) {
      customElements.define(name, WebComponentWrapper);
    }

    // this.validator.use(isNumber());
    // this.validator.use(isString());
    // this.validator.use(isHttps());
    // this.validator.use(isUrl());
    // this.validator.use(isInteger());

    this.common = common({
      validator: (setting, value) => {
        // const result = this.validator.validation(setting, value);
        // if (result) return true;
        return false;
      },
      log: ({ message }) => console.log(message),
      debug: ({ message }) => console.log(message),
    });
  }

  make(template: Plugin) {
    return new PluginController({
      common: this.common,
      plugin: template,
    });
  }
}

export const UniversalAd = new Core();
