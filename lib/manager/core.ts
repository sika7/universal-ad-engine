import { attachWebComponent } from "../wrapper/web-components";
import { Common, common } from "../common";
import { makeUnit } from "../core";
import { Plugin } from "../template/plugin";

type FactorySetting = {
  common: Common;
  plugin: Plugin;
};

class Factory {
  private setting: FactorySetting;
  constructor(setting: FactorySetting) {
    this.setting = setting;
    Object.freeze(this);
  }

  makeUnit(id: string) {
    return makeUnit({ ...this.setting, id });
  }
}

export class Core {
  private common: Common;

  constructor(commonSetting: Common) {
    attachWebComponent("universal-ad-unit");
    this.common = common(commonSetting);
    Object.freeze(this);
  }

  makeFactory(plugin: Plugin) {
    return new Factory({
      common: this.common,
      plugin,
    });
  }
}
