import { defineMessages } from "react-intl";

export const war = defineMessages({
  ww1: {
    defaultMessage: "Første verdenskrig",
    description: "Translation of facet value for Participated in war",
  },
  ww2: {
    defaultMessage: "Andre verdenskrig",
    description: "Translation of facet value for Participated in war",
  },
});

export const typeOfShip = defineMessages({
  marineskip: {
    defaultMessage: "Marineskip",
    description: "Translation of facet value for Type of ship",
  },
  handelsskip: {
    defaultMessage: "Sivilt skip",
    description: "Translation of facet value for Type of ship",
  },
});

export const gender = defineMessages({
  m: {
    defaultMessage: "Mann",
    description: "Translation of facet value for Gender",
  },
  k: {
    defaultMessage: "Kvinne",
    description: "Translation of facet value for Gender",
  },
});

export const diedInWW2 = defineMessages({
  "0": {
    defaultMessage: "Nei, omkom ikke under 2. verdenskrig",
    description: "Translation of facet value for DiedWW2",
  },
  "1": {
    defaultMessage: "Ja, omkom under 2. verdenskrig",
    description: "Translation of facet value for DiedWW2",
  },
});

export const whalingExpedition = defineMessages({
  "0": {
    defaultMessage: "Nei, deltok ikke i hvalfangstekspedisjonen 1939 - 1945",
    description: "Translation of facet value for Whaling expedition",
  },
  "1": {
    defaultMessage: "Ja, deltok i hvalfangstekspedisjonen 1939 - 1945",
    description: "Translation of facet value for Whaling expedition",
  },
});
