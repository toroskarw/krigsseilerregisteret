import { useIntl } from "react-intl";
import { IFacetValue } from "../../domain/archive";
import { Facet, IBaseFacetProps } from "./Facet";

export const alphabetQueryParamName = "startsWithLetter";

const lettersOfTheAlphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "æ",
  "ø",
  "å",
];

export const Alphabet = (props: IBaseFacetProps) => {
  const intl = useIntl();

  const lookup = {};
  props.facet.forEach((facet) => {
    lookup[facet.id] = facet;
  });

  const fullAlphabetFacets: Array<IFacetValue> = [];
  lettersOfTheAlphabet.forEach((letter) => {
    if (lookup[letter]) {
      fullAlphabetFacets.push(lookup[letter.toLowerCase()]);
    } else {
      fullAlphabetFacets.push({
        id: letter,
        count: 0,
        disabled: true,
      });
    }
  });

  return (
    <Facet
      {...props}
      facet={fullAlphabetFacets}
      placeholder={intl.formatMessage({
        defaultMessage: "Vis bare innhold som starter på",
        description: "Facet starting with letter",
      })}
      queryParamName={alphabetQueryParamName}
      facetIdToDisplayName={(value) => {
        return value.toUpperCase();
      }}
      instanceId={alphabetQueryParamName}
    />
  );
};
