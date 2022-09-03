import { useState } from 'react';
import { Avatar, ListItemText, Menu, MenuItem } from '@mui/material';
import { ImageCarousel, SectionCard } from 'components';
import { formatPostDate } from 'shared/functions';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './Post.scss';
import { useProfileInfo } from 'pages/Profile/useProfileInfo';

type PostPropsType = {
  id: string;
  avatar: string;
  user: string;
  date: Date;
  text: string;
  isPost: boolean;
  images: string[];
  onShowPostPhotos: (
    selectedPhoto: number | null,
    photos: {
      image: string;
      label: string;
    }[]
  ) => void;
  onEditPost: (postId: string, photos: string[], text: string) => void;
  onDeletePost: (postId: string) => void;
};

export const Post = ({
  id,
  avatar,
  user,
  date,
  text,
  images,
  isPost,
  onShowPostPhotos,
  onDeletePost,
  onEditPost,
}: PostPropsType) => {
  const { isOwner } = useProfileInfo();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleModalClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const handleModalClose = () => setAnchorEl(null);

  const onPostImageClick = (index: number) =>
    onShowPostPhotos(
      index,
      images.map((image) => ({
        image,
        label: `${text} ${formatPostDate(date)}`,
      }))
    );

  return (
    <SectionCard>
      <div className="post__user">
        {isOwner && (
          <IconButton onClick={handleModalClick} className="post__button">
            <MoreHorizIcon />
          </IconButton>
        )}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleModalClose}
        >
          {isPost && (
            <MenuItem
              onClick={() => {
                onEditPost(id, images, text);
                handleModalClose();
              }}
            >
              <EditIcon className="post__icon" />
              <ListItemText>Edytuj</ListItemText>
            </MenuItem>
          )}
          <MenuItem
            onClick={() => {
              onDeletePost(id);
              handleModalClose();
            }}
          >
            <DeleteIcon className="post__icon" />
            <ListItemText>Usuń</ListItemText>
          </MenuItem>
        </Menu>
        <Avatar src={avatar} />
        <div>
          <p className="post__name">{user}</p>
          <div className="post__date">{formatPostDate(date)}</div>
        </div>
      </div>
      <p className="post__text">{text}</p>
      <ImageCarousel onClick={onPostImageClick} images={images} />
    </SectionCard>
  );
};
