import { mapToDefaultMetadata } from "./common";
import { ContentType, IContent } from "./content";
import { IApiShippingCompany } from "./krigsseilerregisteret-api/shippingCompany";

export type IShippingCompanyBase = IContent; // Expand to interface if type needs additional properties

export type IShippingCompany = IShippingCompanyBase; // Expand to interface if type needs additional properties

export const mapToIShippingCompanyBase = (
  data: IApiShippingCompany
): IShippingCompanyBase => {
  return {
    id: data.id,
    displayName: data.displayName,
    type: ContentType.SHIPPINGCOMPANY,
    metadata: mapToDefaultMetadata(data),
  };
};

export const mapToIShippingCompany = (
  data: IApiShippingCompany
): IShippingCompany => {
  return {
    ...mapToIShippingCompanyBase(data),
  };
};
