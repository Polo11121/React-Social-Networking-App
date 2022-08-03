import { useState } from 'react';
import { Avatar, ListItemText, Menu, MenuItem } from '@mui/material';
import { ImageCarousel, SectionCard } from 'components';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './Post.scss';

type PostTypeProps = {
  id: string;
  avatar: string;
  user: string;
  date: Date;
  text: string;
  images: string[];
  onShowPostPhotos: (selectedPhoto: null | number, photos: string[]) => void;
  onEditPost: (postId: string, photos: string[], text: string) => void;
  onDeletePost: (postId: string) => void;
};

const formatPostDate = (date: Date) =>
  new Date(date).toLocaleDateString('pl-PL', {
    hour: '2-digit',
    minute: '2-digit',
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });

export const Post = ({
  id,
  avatar,
  user,
  date,
  text,
  images,
  onShowPostPhotos,
  onDeletePost,
  onEditPost,
}: PostTypeProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleModalClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const handleModalClose = () => setAnchorEl(null);

  const onPostImageClick = (index: number) => onShowPostPhotos(index, images);

  return (
    <SectionCard>
      <div className="post__user">
        <IconButton onClick={handleModalClick} className="post__button">
          <MoreHorizIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleModalClose}>
          <MenuItem
            onClick={() => {
              onEditPost(id, images, text);
              handleModalClose();
            }}
          >
            <EditIcon className="post__icon" />
            <ListItemText>Edytuj</ListItemText>
          </MenuItem>
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
