import { Link } from "components/Link";
import { FormattedMessage } from "react-intl";
import { components } from "react-select";
import paths from "util/paths";

export const CustomMenu = (props) => {
  return (
    <components.Menu {...props}>
      <div className="px-6 pt-4 pb-10 space-y-6 tablet:space-y-0">
        {props.children}

        <div className="border-b border-darkblue-30 tablet:pt-4"></div>
        <div className="tablet:pt-6">
          <p className="mt-1">
            <FormattedMessage
              defaultMessage="Finner du ikke det du leter etter?"
              description=""
            />
          </p>
          <p>
            <Link to={paths.searchPage}>
              <FormattedMessage
                defaultMessage="Prøv et annet søkeord eller fortsett søket i våre arkivsider med enda flere søkeverktøy"
                description=""
              />
            </Link>
          </p>
        </div>
      </div>
    </components.Menu>
  );
};
