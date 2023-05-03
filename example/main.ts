import pluginBnner from 'plugins/bnner';
import { Root } from 'root';
import { validator } from 'validator';

const root = new Root({
  validator: (setting, value) => {
    const result = validator.validation(setting, value);
    if (result) return true;
    return false;
  },
  log: ({ message }) => console.log(message),
  debug: ({ message }) => console.log(message),
});

const factory = root.makeFactory(pluginBnner('https://localhost:8000', 'get'));

const unit = factory.makeUnit('app');

unit.pull({});
