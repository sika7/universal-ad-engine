import { apiRequest, RequiredApiSetting } from "./api";
import { Common } from "./common";
import { executeMethod, generate, IUniversalAdTemplate } from "./template/main";

export class UniversalAdCore {
  template: IUniversalAdTemplate;
  common: Common;

  constructor(data: { common: Common; template: IUniversalAdTemplate }) {
    const { common, template } = data;
    this.template = template;
    this.common = common;
    Object.freeze(this);
  }

  async pull(apiSetting: RequiredApiSetting) {
    const { url, type, parameter, validation } = apiSetting;
    return apiRequest(type, url, parameter)
      .then((value: any) => {
        const { validator } = this.common;
        if (validator(validation, value)) throw new Error(`validation error.`);
        return value;
      })
      .then((value: any) => {
        this.template.update(value);
      })
      .catch(() => {
        const { log } = this.common;
        log({ message: "API request failed.", type: "critical" });
      });
  }

  generate() {
    return generate(this.template);
  }

  executeMethod(atter: string) {
    executeMethod(this.template, atter);
  }
}

// export class DataContainer<T> {
//   data: T;
//
//   constructor(defaultData: T) {
//     this.data = defaultData;
//     return this;
//   }
//
//   merge(data: T): T {
//     return { ...this.data, ...data };
//   }
//
//   newData(data: T): DataContainer<T> {
//     return new DataContainer({ ...this.data, ...data });
//   }
// }
