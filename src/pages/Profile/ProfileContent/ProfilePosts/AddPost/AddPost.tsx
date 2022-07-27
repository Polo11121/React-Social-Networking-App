import { Avatar } from '@mui/material';
import { Button, SectionCard, Textarea, ImagePicker } from 'components';
import { useForm } from 'shared/hooks/useForm';
import './AddPost.scss';

export const AddPost = () => {
  const formik = useForm({
    initialValues: { post: '', password: '' },
    mutate: () => {},
  });

  return (
    <SectionCard>
      <form className="add-post">
        <div className="add-post__input-container">
          <Avatar />
          <Textarea
            placeholder="O czym myślisz ?"
            value={formik.values.post}
            onChange={formik.handleChange}
            name="post"
          />
        </div>
        <div className="add-post__buttons">
          <ImagePicker
            text="Dodaj zdjęcie"
            handleFile={(file: File | null) => {}}
          />
          <Button text="Dodaj przemyślenie" buttonStyleType="primary" />
        </div>
      </form>
    </SectionCard>
  );
};
