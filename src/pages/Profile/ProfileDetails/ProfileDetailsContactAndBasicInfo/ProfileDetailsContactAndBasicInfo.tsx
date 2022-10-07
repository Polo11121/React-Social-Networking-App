import { AddHoc, Input, Select } from 'components';
import { BirthDatePicker } from 'shared/fixtures/BirthDatePicker/BirthDatePicker';
import { useProfileDetails } from 'pages/Profile/ProfileDetails/useProfileDetails';
import { capitalizeFirstLetter } from 'shared/functions';

export const ProfileDetailsContactAndBasicInfo = () => {
  const {
    adHocsConcat,
    adHocsBasicInfo,
    isLoading,
    isOwner,
    adHocs: { gender, birthDate, age, interestedGenders },
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
        }) => (
          <AddHoc
            displayOnly={!isOwner}
            key={name}
            isDisabled={isLoading || value === initialValue || !value.trim()}
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
              value={value as string}
              onChange={onChange}
              name={name}
            />
          </AddHoc>
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
          hideDelete,
        }) => (
          <AddHoc
            hideDelete={hideDelete}
            displayOnly={!isOwner}
            key={name}
            isDisabled={isLoading || value === initialValue || !value.trim()}
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
      <AddHoc
        hideDelete
        displayOnly={!isOwner}
        key={gender.name}
        isDisabled={isLoading || gender.value.value === gender.initialValue}
        onSubmit={gender.onSubmit}
        onClose={gender.onClose}
        placeholder={gender.placeholder}
        value={gender.value.value}
        Icon={<gender.Icon fontSize="large" />}
        displayText={gender.displayText}
        displayValue={gender.displayValue}
      >
        <Select
          value={gender.value}
          placeholder={gender.placeholder}
          onChange={gender.onChange}
          options={gender.options}
        />
      </AddHoc>
      <AddHoc
        hideDelete
        displayOnly={!isOwner}
        key={birthDate.name}
        isDisabled={Boolean(
          isLoading ||
            birthDate.value.getTime() === birthDate.initialValue.getTime() ||
            birthDate.error
        )}
        onSubmit={birthDate.onSubmit}
        onClose={birthDate.onClose}
        placeholder={birthDate.placeholder}
        value={birthDate.value}
        Icon={<birthDate.Icon fontSize="large" />}
        displayText={birthDate.displayText}
        displayValue={birthDate.displayValue}
      >
        <BirthDatePicker
          error={birthDate.error}
          value={birthDate.value}
          onChange={birthDate.onChange}
        />
      </AddHoc>
      <AddHoc
        displayValue={age.displayValue}
        displayOnly
        Icon={<age.Icon fontSize="large" />}
        displayText={age.displayText}
      />
      <h2>Zainteresowania</h2>
      <AddHoc
        displayOnly={!isOwner}
        key={interestedGenders.name}
        isDisabled={
          isLoading ||
          interestedGenders.value?.value === interestedGenders.initialValue ||
          !interestedGenders.value?.value
        }
        onDelete={interestedGenders.onDelete}
        onSubmit={interestedGenders.onSubmit}
        onClose={interestedGenders.onClose}
        placeholder={interestedGenders.placeholder}
        value={interestedGenders.value?.value}
        Icon={<interestedGenders.Icon fontSize="large" />}
        displayText={interestedGenders.displayText}
        displayValue={interestedGenders.displayValue}
      >
        <Select
          value={interestedGenders.value}
          placeholder={capitalizeFirstLetter(interestedGenders.placeholder)}
          onChange={interestedGenders.onChange}
          options={interestedGenders.options}
        />
      </AddHoc>
    </>
  );
};
