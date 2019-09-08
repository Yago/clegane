import { configure, addDecorator } from '@storybook/react';
import { jsxDecorator } from 'storybook-addon-jsx';

addDecorator(jsxDecorator);

const loadStories = () => {
  const req = require.context('../src', true, /\.stories\.jsx$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);