export const changeConfigName = (name: string): string => {
  switch (name) {
    case "boki":
      name = "Boki";
      break;
    case "gora_i_dol":
      name = "Góra i dół";
      break;
    case "kolor_nici":
      name = "Kolor nici";
      break;
    case "pasek_gora":
      name = "Pasek na górze ";
      break;
    case "blenda":
      name = "Blenda";
      break;
    case "multifunkcja":
      name = "Multifunkcja";
      break;
    case "airbag":
      name = "Airbag";
      break;
  }
  return name;
};
