import { useGetMatches } from 'api/useGetMatches';
import './Matches.scss';

export const Matches = () => {
  const { data } = useGetMatches();

  return <div className="matches">Matches</div>;
};
