import { useState } from 'react';
import { Button } from 'components';
import { FiltersModal } from 'shared/fixtures/Filters/FiltersModal/FiltersModal';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

export const Filters = () => {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  const changeModalVisibilityHandler = () =>
    setIsFiltersModalOpen((prevState) => !prevState);

  return (
    <>
      <Button
        buttonStyleType="secondary"
        Icon={<FilterAltIcon />}
        text="Filtry"
        onClick={changeModalVisibilityHandler}
        testId="open-filters-modal-button"
      />
      {isFiltersModalOpen && (
        <FiltersModal
          isOpen={isFiltersModalOpen}
          onClose={changeModalVisibilityHandler}
        />
      )}
    </>
  );
};
