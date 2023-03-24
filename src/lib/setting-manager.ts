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
  data: IUniversalAdSetting[] = [];

  constructor() {}

  add(data: IUniversalAdSetting) {
    this.data.push(data);
  }

  get(id: string) {
    return this.data.find((item) => item.id === id);
  }
}

export const settingManager = new SettingManager();
