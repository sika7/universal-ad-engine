import { RequestType } from "./api";

export interface IUniversalAdApi {
  url: string;
  type: RequestType;
  data: Record<string, any>;
}

export interface IUniversalAdSetting {
  id: string;
  template: string;
  api?: IUniversalAdApi;
}

class SettingManager {
  private freeze = false;
  data: IUniversalAdSetting[] = [];

  constructor() {}

  freezed() {
    this.freeze = true;
  }

  add(data: IUniversalAdSetting) {
    if (this.freeze) return;
    this.data.push(data);
  }

  get(id: string) {
    return this.data.find((item) => item.id === id);
  }
}

export const settingManager = new SettingManager();
