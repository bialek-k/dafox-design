let price = 0;
export const deliveryPrice = (country) => {
  switch (country) {
    case "Poland":
      price = 100;
      break;
    case "UK":
      price = 200;
      break;
    case "Brazil":
      price = 300;
      break;
  }
  return price;
};
