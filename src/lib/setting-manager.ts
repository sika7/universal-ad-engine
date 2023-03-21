export interface IUniversalAdSetting {
  id: string;
  template: string;
}

class SettingManager {
  data: IUniversalAdSetting[] = [];

  constructor() {}

  add(data: IUniversalAdSetting) {
    this.data.push(data);
  }
}

export const settingManager = new SettingManager();
