import { ReactNode } from 'react';
import { Story, Meta } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Header } from 'components';

export default {
  component: Header,
  title: 'Header',
} as Meta;

const Template: Story<{ children?: ReactNode }> = (args) => (
  <Router>
    <Header {...args} />
  </Router>
);

export const Default = Template.bind({});
