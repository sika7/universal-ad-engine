import { RequestType } from "api";
import { Template } from "template/main";

export interface ApiSetting {
  url: string;
  type: RequestType;
  validation: Record<string, string>;
}

export interface Plugin {
  api: ApiSetting;
  template: () => Template;
}
