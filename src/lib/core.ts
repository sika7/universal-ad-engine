import { apiRequest, RequiredApiSetting } from "./api";
import { executeMethod, generate, IUniversalAdTemplate } from "./template/main";

export class UniversalAdCore {
  template: IUniversalAdTemplate;

  constructor(template: IUniversalAdTemplate) {
    this.template = template;
    Object.freeze(this);
  }

  async pull(apiSetting: RequiredApiSetting) {
    const { url, type, parameter } = apiSetting;
    return apiRequest(type, url, parameter)
      .then((value: any) => {
        // const result = this.validator.validation(validation, value);
        // if (result)
        //   throw new Error(`validation error.${result.errorMessage}`);
        return value;
      })
      .then((value: any) => {
        if (!this.template) {
          throw new Error("template not found.");
        }
        this.template.update(value);
      })
      .catch(() => {
        // throw new Error("API request failed.");
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
