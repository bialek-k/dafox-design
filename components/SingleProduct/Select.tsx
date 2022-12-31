import React, { ChangeEvent } from 'react';

interface SelectProps {
  options: any;
  onChange: any;
}

const Select = ({ options, onChange }: SelectProps): React.ReactElement => (
  <select
    onChange={(e) => onChange(Number(e.target.value))}
    className='text-slate-800'>
    {options.map((option) => (
      <option key={option.id} value={option.id}>
        {option.option}
      </option>
    ))}
  </select>
);

export default Select;
