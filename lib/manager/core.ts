import {
  isHttps,
  isInteger,
  isNumber,
  isString,
  isUrl,
  ObjectValidator,
} from "@sika7/validator";
import { Common, common } from "../common";
import { UniversalAdCore } from "../core";
import { Plugin } from "../template/plugin";
import { WebComponentWrapper } from "../wrapper/web-components";

type Unit = {
  id: string;
  common: Common;
  plugin: Plugin;
};

function attach({ id, common, plugin }: Unit) {
  return new WebComponentWrapper({
    id: id,
    core: new UniversalAdCore({
      common: common,
      template: plugin.template(),
      apiSetting: plugin.api,
    }),
  });
}

export function makeUnit(unit: Unit) {
  try {
    const elm = attach(unit);
    if (!elm) {
      throw new Error("create error");
    }
    elm.render();
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

  attach(id: string) {
    makeUnit({ id, plugin: this.plugin, common: this.common });
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
      plugin: template,
    });
  }
}

export const UniversalAd = new Core();
