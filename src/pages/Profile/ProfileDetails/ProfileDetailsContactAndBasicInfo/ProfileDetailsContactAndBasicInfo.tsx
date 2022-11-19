import { AddHoc, Input, Select } from 'components';
import { BirthDatePicker } from 'shared/features/BirthDatePicker/BirthDatePicker';
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
          Icon,
          displayText,
          changeHandler,
          submitHandler,
          closeHandler,
          deleteHandler,
        }) => (
          <AddHoc
            displayOnly={!isOwner}
            key={name}
            isDisabled={isLoading || value === initialValue || !value.trim()}
            onSubmit={submitHandler}
            onDelete={deleteHandler}
            onClose={closeHandler}
            placeholder={placeholder}
            value={value}
            Icon={<Icon fontSize="large" />}
            displayText={displayText}
            testId={name}
          >
            <Input
              style={{ margin: '0' }}
              placeholder={capitalizeFirstLetter(placeholder)}
              value={value as string}
              onChange={changeHandler}
              name={name}
              testId={`addHoc-${name}-input`}
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
          Icon,
          displayText,
          changeHandler,
          submitHandler,
          closeHandler,
          deleteHandler,
          hideDelete,
        }) => (
          <AddHoc
            hideDelete={hideDelete}
            displayOnly={!isOwner}
            key={name}
            isDisabled={isLoading || value === initialValue || !value.trim()}
            onSubmit={submitHandler}
            onDelete={deleteHandler}
            onClose={closeHandler}
            placeholder={placeholder}
            value={value}
            Icon={<Icon fontSize="large" />}
            displayText={displayText}
            testId={name}
          >
            <Input
              style={{ margin: '0' }}
              placeholder={capitalizeFirstLetter(placeholder)}
              value={value}
              onChange={changeHandler}
              name={name}
              testId={`addHoc-${name}-input`}
            />
          </AddHoc>
        )
      )}
      <AddHoc
        hideDelete
        displayOnly={!isOwner}
        key={gender.name}
        isDisabled={isLoading || gender.value.value === gender.initialValue}
        onSubmit={gender.submitHandler}
        onClose={gender.closeHandler}
        placeholder={gender.placeholder}
        value={gender.value.value}
        Icon={<gender.Icon fontSize="large" />}
        displayText={gender.displayText}
        displayValue={gender.displayValue}
        testId="gender"
      >
        <Select
          value={gender.value}
          placeholder={gender.placeholder}
          onChange={gender.changeHandler}
          options={gender.options}
          inputId="addHoc-gender-select"
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
        onSubmit={birthDate.submitHandler}
        onClose={birthDate.closeHandler}
        placeholder={birthDate.placeholder}
        value={birthDate.value}
        Icon={<birthDate.Icon fontSize="large" />}
        displayText={birthDate.displayText}
        displayValue={birthDate.displayValue}
        testId="birthDate"
      >
        <BirthDatePicker
          testId="addHoc-birthDate-select"
          error={birthDate.error}
          value={birthDate.value}
          onChange={birthDate.changeHandler}
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
        onDelete={interestedGenders.deleteHandler}
        onSubmit={interestedGenders.submitHandler}
        onClose={interestedGenders.closeHandler}
        placeholder={interestedGenders.placeholder}
        value={interestedGenders.value?.value}
        Icon={<interestedGenders.Icon fontSize="large" />}
        displayText={interestedGenders.displayText}
        displayValue={interestedGenders.displayValue}
        testId="interestedGenders"
      >
        <Select
          value={interestedGenders.value}
          placeholder={capitalizeFirstLetter(interestedGenders.placeholder)}
          onChange={interestedGenders.changeHandler}
          options={interestedGenders.options}
          inputId="addHoc-interestedGenders-select"
        />
      </AddHoc>
    </>
  );
};
