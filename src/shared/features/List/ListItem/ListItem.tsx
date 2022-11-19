import { ReactNode, Dispatch, SetStateAction } from 'react';
import { IconButton } from '@mui/material';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import classNames from 'classnames';
import './ListItem.scss';

type ListItemPropsType = {
  cells: ReactNode[];
  title: string;
  children: ReactNode;
  onExpandListItem: Dispatch<SetStateAction<boolean>>;
  isListItemExpand: boolean;
  testId?: string;
};

export const ListItem = ({
  cells,
  title,
  children,
  onExpandListItem,
  isListItemExpand,
  testId,
}: ListItemPropsType) => {
  const changeInfoVisibilityHandler = () =>
    onExpandListItem((prevState) => !prevState);

  return (
    <div className="list-item">
      <div className="list-item__content">
        <IconButton
          data-testid={`${testId}-expand-button`}
          onClick={changeInfoVisibilityHandler}
          disableRipple
          className="list-item__icon-button"
        >
          <ExpandCircleDownOutlinedIcon
            className={classNames('list-item__icon', {
              'list-item__icon--rotate': isListItemExpand,
            })}
          />
        </IconButton>
        <div className="list-item__cells">
          {cells.map((cell, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={`${cell}-${index}`} className="list-item__cell">
              {cell}
            </div>
          ))}
        </div>
      </div>
      <div
        className={classNames('list-item__info', {
          'list-item__info--hidden': !isListItemExpand,
        })}
      >
        <div className="list-item__title">{title}</div>
        <div className="list-item__info-content">{children}</div>
      </div>
    </div>
  );
};
