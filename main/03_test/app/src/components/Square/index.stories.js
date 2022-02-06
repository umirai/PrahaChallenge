import React from "react";

import { Square } from ".";

export default {
  title: 'Square',
  component: Square,
}

const Template = (args) => <Square {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: null
}

export const X = Template.bind({});
X.args = {
  value: 'X'
}

export const O = Template.bind({});
O.args = {
  value: 'O'
}

export const Sankaku = Template.bind({});
Sankaku.args = {
  value: '△'
}