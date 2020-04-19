import React from 'react';
import Select from 'react-select';

const PlayerDropdown = () =>{
  return (
    <Select 
      onChange={e=>(console.log(e['value']))}
      options={options} />
  );

}

export default PlayerDropdown;