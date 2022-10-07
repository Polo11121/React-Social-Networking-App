import { useProfileDetails } from 'pages/Profile/ProfileDetails/useProfileDetails';
import { AddHoc, Input } from 'components';
import { capitalizeFirstLetter } from 'shared/functions';

export const ProfileWorkAndEducation = () => {
  const { adHocsWorkAndEducation, isLoading, isOwner } = useProfileDetails();

  return (
    <>
      {adHocsWorkAndEducation.map(
        ({
          initialValue,
          name,
          placeholder,
          value,
          onChange,
          Icon,
          displayText,
          onSubmit,
          onClose,
          onDelete,
        }) => (
          <AddHoc
            displayOnly={!isOwner}
            key={name}
            isDisabled={
              isLoading ||
              value === initialValue ||
              (!initialValue && !value.trim())
            }
            onSubmit={onSubmit}
            onDelete={onDelete}
            onClose={onClose}
            placeholder={placeholder}
            value={value}
            Icon={<Icon fontSize="large" />}
            displayText={displayText}
          >
            <Input
              style={{ margin: '0' }}
              placeholder={capitalizeFirstLetter(placeholder)}
              value={value}
              onChange={onChange}
              name={name}
            />
          </AddHoc>
        )
      )}
    </>
  );
};
