import { useProfileDetails } from 'pages/Profile/ProfileDetails/useProfileDetails';
import { AddHoc } from 'components';

export const ProfileDetailsOverview = () => {
  const { adHocsOverview, isLoading, isOwner } = useProfileDetails();

  return (
    <>
      {adHocsOverview.map(
        ({
          initialValue,
          name,
          placeholder,
          value,
          onChange,
          label,
          Icon,
          displayText,
          onSubmit,
          onDelete,
          onClose,
          disableEdit,
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
            label={label}
            Icon={<Icon fontSize="large" />}
            displayText={displayText}
          />
        )
      )}
    </>
  );
};
