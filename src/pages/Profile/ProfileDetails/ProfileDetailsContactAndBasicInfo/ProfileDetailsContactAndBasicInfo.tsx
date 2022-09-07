import { ChangeEventHandler } from 'react';
import { AddHoc } from 'components';
import { useProfileDetails } from 'pages/Profile/ProfileDetails/useProfileDetails';

export const ProfileDetailsContactAndBasicInfo = () => {
  const {
    adHocsConcat,
    adHocsBasicInfo,
    interestedGendersAdHoc,
    isLoading,
    isOwner,
  } = useProfileDetails();

  return (
    <>
      <h2>Dane kontaktowe</h2>
      {adHocsConcat.map(
        ({
          initialValue,
          name,
          placeholder,
          value,
          onChange,
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
            key={`${placeholder}-${name}`}
            isDisabled={
              isLoading || value === initialValue || (!initialValue && !value)
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
      <h2>Podstawowe informacje</h2>
      {adHocsBasicInfo.map(
        ({
          initialValue,
          name,
          placeholder,
          value,
          onChange,
          Icon,
          displayText,
          onSubmit,
          onDelete,
          onClose,
          inputType,
          options,
          displayValue,
          hideDelete,
          disableEdit,
        }) => (
          <AddHoc
            displayOnly={!isOwner}
            disableEdit={disableEdit}
            hideDelete={hideDelete}
            displayValue={displayValue}
            key={`${placeholder}-${name}`}
            isDisabled={
              isLoading || value === initialValue || (!initialValue && !value)
            }
            options={options}
            onSubmit={onSubmit}
            inputType={inputType}
            onDelete={onDelete}
            onClose={onClose}
            placeholder={placeholder}
            value={value}
            onChange={onChange as ChangeEventHandler<HTMLInputElement>}
            name={name}
            Icon={<Icon fontSize="large" />}
            displayText={displayText}
          />
        )
      )}{' '}
      <h2>Zainteresowania</h2>
      {interestedGendersAdHoc.map(
        ({
          initialValue,
          name,
          placeholder,
          value,
          onChange,
          Icon,
          displayText,
          onSubmit,
          onDelete,
          onClose,
          inputType,
          options,
          displayValue,
          label,
          disableEdit,
        }) => (
          <AddHoc
            disableEdit={disableEdit}
            displayOnly={!isOwner}
            label={label}
            displayValue={displayValue}
            key={`${placeholder}-${name}`}
            isDisabled={
              isLoading || value === initialValue || (!initialValue && !value)
            }
            options={options}
            onSubmit={onSubmit}
            inputType={inputType}
            onDelete={onDelete}
            onClose={onClose}
            placeholder={placeholder}
            value={value}
            onChange={onChange as ChangeEventHandler<HTMLInputElement>}
            name={name}
            Icon={<Icon fontSize="large" />}
            displayText={displayText}
          />
        )
      )}
    </>
  );
};
