import { configOptions2 } from './configProperty';

export const activeProperty = (data) => {
  const convertData = Object.entries(data).filter((key) => key[1] === true);

  let configArray = [];
  convertData.forEach((key) => {
    configArray.push({ name: key[0] });
  });

  const res = configArray.map((obj) => {
    const name = configOptions2.findIndex((el) => el['name'] == obj['name']);
    const { options } = name !== -1 ? configOptions2[name] : {};
    return {
      ...obj,
      options,
    };
  });

  return res;
};
