import { IApiAwardStatistics } from "./krigsseilerregisteret-api/awardStatistics";

export interface IAwardStatistics {
  numberOfReceivers: number;
}

export const mapToIAwardStatistics = (
  data: IApiAwardStatistics
): IAwardStatistics => {
  return {
    numberOfReceivers: data.numberOfReceivers,
  };
};
