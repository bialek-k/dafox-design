import React, { useState, useEffect } from 'react';
// import { activeProperty } from '../../utilities/acviteProperty';

// import { changeConfigName } from '../../utilities/changeConfigName';
// import Select from './Select';

const Configuration = ({ product, setIncrement }): React.ReactElement => {
  // const [state, setState] = useState({});

  // const configOptions = activeProperty(product.attributes.config);

  // const optionChangeHandler = (id, configName) => {
  //   const configOption = configOptions.find(
  //     (configOption) => configOption.name === configName
  //   );
  //   const selectedItem = configOption.options.find(
  //     (option) => option.id === id
  //   );

  //   setState((prevState) => ({
  //     ...prevState,
  //     [configName]: selectedItem.id,
  //   }));
  // };

  // const totalIncrement = Object.keys(state).reduce((total, name) => {
  //   const id = state[name];
  //   const currentIncrement = configOptions
  //     .find((co) => co.name === name)
  //     .options.find((o) => o.id === id).increase;
  //   return total + currentIncrement;
  // }, 0);

  // useEffect(() => {
  //   setIncrement(totalIncrement);
  // }, [totalIncrement]);

  return (
    <div className='wrapper'>
      <p>CONFIG</p>
      {/* <div className='option mt-5'>
        {configOptions.map((config, index) => {
          const name = changeConfigName(config.name);
          return (
            <div key={name} className='py-1'>
              <div className='flex py-2 border px-3 rounded-md max-w-sm '>
                <div className='0 w-40'>
                  <p className='font-bold mr-5 '>{name}:</p>
                </div>
                <Select
                  options={config.options}
                  onChange={(id) => optionChangeHandler(id, config.name)}
                />
              </div>
            </div>
          );
        })}
      </div> */}
    </div>
  );
};

export default Configuration;
