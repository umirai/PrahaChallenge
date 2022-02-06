import React from "react";

import { Board } from ".";

export default {
  title: 'Board',
  component: Board,
  argTypes: { onClick: {action: 'clicked'} }
}

const Template = (args) => <Board {...args} />;

export const Default = Template.bind({});
Default.args = {
  squares: Array(9).fill(null)
}

export const FillWithX = Template.bind({});
FillWithX.args = {
  squares: Array(9).fill("X")
}

export const FillWithO = Template.bind({});
FillWithO.args = {
  squares: Array(9).fill("O")
}

export const FillWithSankaku = Template.bind({});
FillWithSankaku.args = {
  squares: Array(9).fill("△")
}
