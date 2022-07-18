import { Story, Meta } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ErrorText } from 'components';
import { ErrorTextType } from 'components/ErrorText/ErrorText';

export default {
  component: ErrorText,
  title: 'ErrorText',
} as Meta;

const Template: Story<ErrorTextType> = (args) => {
  return (
    <Router>
      <ErrorText {...args} />
    </Router>
  );
};

export const Default = Template.bind({});
Default.args = { text: 'Test Error' };
