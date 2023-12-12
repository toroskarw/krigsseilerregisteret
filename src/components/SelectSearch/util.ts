import {
  ApiArchiveType,
  IApiArchive,
  IApiArchiveResultBase,
} from "domain/krigsseilerregisteret-api/archive";
import paths from "util/paths";

export type OptionType = { [key: string]: string };
export type OptionsType = Array<OptionType>;

export type GroupType = {
  [key: string]: string | OptionsType; // Group label
  options: OptionsType;
};

export const mapToFrontPageSearch = (
  data: IApiArchive<IApiArchiveResultBase, null>
): GroupType[] => {
  const options = {
    label: "Søketreff",
    options: data._embedded.results.map((res) => {
      let type: string;
      let path: string;
      let place: string;
      let year: string;
      let month: string;
      let day: string;
      if (res.type == ApiArchiveType.SJOMANN) {
        type = "seafarer";
        path = paths.seafarer(res.id);
        place = res.summaryProperties.fodested;
        year = res.summaryProperties.fodtAar;
        month = res.summaryProperties.fodtMaaned;
        day = res.summaryProperties.fodtDag;
      } else if (res.type == ApiArchiveType.SKIP) {
        type = "ship";
        path = paths.ship(res.id);
        year = res.summaryProperties.byggeaar;
      }
      return {
        label: res.title,
        value: res.id.toString(),
        type: type,
        path: path,
        place: place,
        year: year,
        month: month,
        day: day,
      };
    }),
  };
  return [options];
};
