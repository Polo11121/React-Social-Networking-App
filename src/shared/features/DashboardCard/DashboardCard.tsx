import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';
import { adjustColor } from 'shared/functions';
import { NavLink } from 'react-router-dom';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import './DashboardCard.scss';

type DashboardCardPropsType = {
  count: number;
  title: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string;
  };
  color: string;
  path: string;
};

export const DashboardCard = ({
  count,
  title,
  Icon,
  color,
  path,
}: DashboardCardPropsType) => (
  <div className="dashboard-card" style={{ backgroundColor: color }}>
    <div className="dashboard-card__content">
      <div className="dashboard-card__info">
        <div className="dashboard-card__count">{count || 0}</div>
        <div className="dashboard-card__title">{title}</div>
      </div>
      <Icon
        sx={{ color: `${adjustColor(color, -20)}` }}
        className="dashboard-card__icon"
      />
    </div>
    <NavLink
      to={path}
      className="dashboard-card__more"
      style={{ backgroundColor: `${adjustColor(color, -20)}` }}
    >
      Wiecej informacji
      <ArrowCircleRightIcon sx={{ width: 16, height: 16 }} />
    </NavLink>
  </div>
);
