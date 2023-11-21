import React, { useState } from 'react';

const Option = ({ index }) => {
  const [optionValue, setOptionValue] = useState([...optionValue, {optionValue : ''}]);
  console.log(optionValue);
  return (
    <div className="form-group mt-3">
      <label>Option {index + 1}</label>
      <input
        type="text"
        className="form-control mt-2"
        name={`option${index + 1}`}
        placeholder={`Option ${index + 1}`}
        onChange={(e)=>setOptionValue(e.target.value)}
      />
    </div>
  );
};

export default Option;
