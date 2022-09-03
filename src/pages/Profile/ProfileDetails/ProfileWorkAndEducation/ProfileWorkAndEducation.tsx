import { useProfileDetails } from 'pages/Profile/ProfileDetails/useProfileDetails';
import { AddHoc } from 'components';

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
          disableEdit,
          onSubmit,
          onClose,
          onDelete,
        }) => (
          <AddHoc
            displayOnly={!isOwner}
            disableEdit={disableEdit}
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
            onChange={onChange}
            name={name}
            Icon={<Icon fontSize="large" />}
            displayText={displayText}
          />
        )
      )}
    </>
  );
};
