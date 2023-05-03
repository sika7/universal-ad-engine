import { Common, common } from 'common';
import { Core } from 'core';
import { Plugin } from 'template/plugin';
import { WebComponentWrapper, attachWebComponent } from 'wrapper/web-components';

type Unit = {
  id: string;
  common: Common;
  plugin: Plugin;
};

type FactorySetting = {
  common: Common;
  plugin: Plugin;
};

function makeUnit(unit: Unit) {
  try {
    const elm = attach(unit);
    elm.render();
    return elm;
  } catch (error) {
    throw new Error('An error has occurred.');
  }
}

function attach({ id, common, plugin }: Unit) {
  return new WebComponentWrapper({
    id: id,
    core: new Core({
      common: common,
      template: plugin.template(),
      apiSetting: plugin.api,
    }),
  });
}

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

export class Root {
  private common: Common;

  constructor(commonSetting: Common) {
    attachWebComponent('universal-ad-unit');
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
