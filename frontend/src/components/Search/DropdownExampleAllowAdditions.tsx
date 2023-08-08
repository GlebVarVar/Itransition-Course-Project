import { useState, useContext, FC } from 'react';
import { languageContext } from '../Contexts/Contexts';

import { Dropdown } from 'semantic-ui-react';

import './Search.scss';

import { useTranslation } from 'react-i18next';

interface DropdownExampleAllowAdditionsProps {
  tags: any;
  setTags: any;
  alltags: any;
}

export const DropdownExampleAllowAdditions: FC<DropdownExampleAllowAdditionsProps> = ({
  tags,
  setTags,
  alltags,
}) => {
  const { t } = useTranslation();

  const [options, setOptions] = useState(alltags);

  const handleAddition = (e, { value }) => {
    setOptions([{ text: value, value }, ...options]);
  };

  const handleChange = (e, { value }) => {
    setTags(value);
  };

  return (
    <Dropdown
      style={{ borderColor: '#0d6efd' }}
      options={options}
      placeholder={t("addTags")}
      search
      selection
      fluid
      multiple
      allowAdditions
      value={tags}
      onAddItem={handleAddition}
      onChange={handleChange}
    />
  );
};
