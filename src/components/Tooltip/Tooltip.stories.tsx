import { Story, Meta } from '@storybook/react';
import { TooltipType } from 'components/Tooltip/Tooltip';
import { Tooltip } from 'components';

export default {
  component: Tooltip,
  title: 'Tooltip',
} as Meta;

const Template: Story<TooltipType> = (args) => (
  <>
    <p data-tip data-for="tooltip" style={{ width: 'fit-content' }}>
      hover here
    </p>
    <Tooltip {...args} id="tooltip" text="tooltip" />
  </>
);

export const Default = Template.bind({});

export const Error = Template.bind({});
Error.args = { type: 'error' };

export const Float = Template.bind({});
Float.args = { effect: 'float' };
