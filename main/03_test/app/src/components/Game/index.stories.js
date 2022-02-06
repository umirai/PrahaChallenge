import React from "react";

import { Game } from ".";

export default {
  title: 'Game',
  component: Game,
}

const Template = (args) => <Game {...args} />;

export const Default = Template.bind({});