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

  get(id: string) {
    return this.data.find(item => item.id === id);
  }
}

export const settingManager = new SettingManager();
