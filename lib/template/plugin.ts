import { RequestType } from "../api";
import { IUniversalAdTemplate } from "./main";

export interface ApiSetting {
  url: string;
  type: RequestType;
  validation: Record<string, string>;
}

export interface Plugin {
  api: ApiSetting;
  template: () => IUniversalAdTemplate;
}
