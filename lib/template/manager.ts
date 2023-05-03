import { Plugin } from 'template/plugin';

class TemplateManager {
  private data: Record<string, Plugin> = {};

  freezed() {
    Object.freeze(this.data);
    Object.freeze(this);
  }

  add(name: string, data: Plugin) {
    try {
      this.data[name] = data;
    } catch (error) {
      throw new Error('Adding templates is currently freezed.');
    }
  }

  find(name: string) {
    return this.data[name];
  }
}

export const templateManager = new TemplateManager();
