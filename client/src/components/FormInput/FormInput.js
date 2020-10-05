import React from 'react';


const FormInput = (props) => {

  return (

    <div className="form-group">
      <label htmlFor={props.name}>{props.label}</label>
      <input type={props.type}
        className="form-control"
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        placeholder={`Please provide ${props.label}`}
      />
    </div>
  );
}

export default FormInput;