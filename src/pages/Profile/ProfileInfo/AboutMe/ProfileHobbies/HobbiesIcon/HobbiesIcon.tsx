import { hobbiesIcons } from 'shared/consts/icons';

export const HobbiesIcon = ({
  iconName,
  className,
}: {
  iconName: string;
  className?: string;
}) => {
  // @ts-ignore:
  const Icon = hobbiesIcons[iconName];

  return <Icon className={className} />;
};
