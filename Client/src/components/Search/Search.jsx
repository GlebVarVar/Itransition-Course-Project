
import { useState, useContext } from 'react';
import { languageContext } from '../Contexts/Contexts';

import { Dropdown } from 'semantic-ui-react'

import './Search.css';



const  DropdownExampleAllowAdditions = (props) => {

    const {language} = useContext(languageContext);
    const {tags, setTags} = props;

  const [options, setOptions] =useState(props.alltags);
  

  const handleAddition = (e, { value }) => {
    setOptions([{ text: value, value }, ...options])
  }

  const handleChange = (e, { value }) => {
      console.log(value);
      setTags( value);
    };
  
  
    return (
      <Dropdown
        style={{borderColor: "#0d6efd"}}
        options={options}
        placeholder={language.addTags}
        search
        selection
        fluid
        multiple
        allowAdditions
        value={tags}
        onAddItem={handleAddition}
        onChange={handleChange}
      />
    )
  
}

export default DropdownExampleAllowAdditions