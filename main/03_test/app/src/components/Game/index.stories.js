import React from "react";

import { Game } from ".";

export default {
  title: 'Game',
  component: Game,
}

const Template = (args) => <Game {...args} />;

export const Default = Template.bind({});
Default.args = {
  history: [{ squares: Array(9).fill(null) }]
}

export const Draw = Template.bind({});
Draw.args = {
  history: [{ squares: ["X", "O", "X", "O", "X", "X", "O", "X", "O"] }]
}