import { Spinner } from 'components';

export const WithLoader = ({
  children,
  isLoading,
}: {
  children: JSX.Element | JSX.Element[];
  isLoading: boolean;
}) => (isLoading ? <Spinner /> : <>{children}</>);
