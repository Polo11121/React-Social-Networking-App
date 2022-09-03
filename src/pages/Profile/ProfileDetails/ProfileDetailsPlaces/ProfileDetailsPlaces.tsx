import { useProfileDetails } from 'pages/Profile/ProfileDetails/useProfileDetails';
import { AddHoc } from 'components';

export const ProfileDetailsPlaces = () => {
  const { adHocsPlaces, isLoading, isOwner } = useProfileDetails();

  return (
    <>
      <h2>Wcześniejsze miejsca zamieszkania</h2>
      {adHocsPlaces.map(
        ({
          initialValue,
          name,
          placeholder,
          value,
          onChange,
          Icon,
          disableEdit,
          displayText,
          onSubmit,
          onDelete,
          onClose,
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
