import { picturesIcons } from 'shared/constants/icons';

export const PicturesIcon = ({ numberOf }: { numberOf: number }) => {
  // @ts-ignore:
  const Icon = picturesIcons[numberOf > 9 ? 9 : numberOf - 1];

  return <Icon data-tip data-for="pictures-icon" />;
};
