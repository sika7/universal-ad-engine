import { dataObject } from "@sika7/validator";

export type Common = {
  validator: (
    validatorSetting: Record<string, string>,
    value: dataObject
  ) => boolean;
  log: (data: { message: string; data?: object; type: string }) => void;
  debug: (data: { message: string; data?: object }) => void;
};

export function common(option: Partial<Common>): Common {
  const defaultOption = {
    validator: () => false,
    log: () => {
      return;
    },
    debug: () => {
      return;
    },
  };

  return Object.freeze({ ...defaultOption, ...option });
}
