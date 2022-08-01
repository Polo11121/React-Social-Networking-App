import { ChangeEvent, useState } from 'react';
import { Avatar } from '@mui/material';
import {
  Button,
  SectionCard,
  Textarea,
  ImagePicker,
  ImageCarousel,
} from 'components';
import { useAddPost } from 'api/useAddPost';
import { useAuthContext } from 'contexts/AuthContext';
import './AddPost.scss';

export const AddPost = () => {
  const { userInfo } = useAuthContext();
  const [postValues, setPostValues] = useState<{
    text: string;
    photos: null | FileList;
  }>({
    text: '',
    photos: null,
  });

  const changeInputHandler = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setPostValues((prevState) => ({ ...prevState, text: event.target.value }));

  const changPhotoHandler = (photos: File | FileList | null) =>
    setPostValues((prevState) => ({
      ...prevState,
      photos: photos as FileList,
    }));

  const addPostOnSuccess = () => setPostValues({ text: '', photos: null });

  const { mutate, isLoading } = useAddPost(addPostOnSuccess);

  const addPostHandler = () => {
    const formData = new FormData();
    if (postValues.photos) {
      Array.from(postValues.photos).forEach((photo) =>
        formData.append('images', photo as Blob)
      );
    }
    formData.append('description', postValues.text);
    formData.append('user', userInfo._id);

    mutate(formData);
  };

  const isButtonDisabled =
    isLoading || !(postValues.photos || postValues.text.trim());

  return (
    <SectionCard>
      <div className="add-post">
        <div className="add-post__input-container">
          <Avatar src={userInfo.profileImage} />
          <Textarea
            placeholder="O czym myślisz ?"
            value={postValues.text}
            onChange={changeInputHandler}
            name="post"
          />
        </div>
        {postValues.photos && (
          <ImageCarousel
            images={Array.from(postValues.photos).map((photo) =>
              URL.createObjectURL(photo)
            )}
          />
        )}
        <div className="add-post__buttons">
          <ImagePicker
            isMultiple
            text="Dodaj zdjęcie"
            handleFile={changPhotoHandler}
          />
          <Button
            isDisabled={isButtonDisabled}
            onClick={addPostHandler}
            text="Dodaj przemyślenie"
            buttonStyleType="primary"
          />
        </div>
      </div>
    </SectionCard>
  );
};