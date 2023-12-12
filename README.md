# Krigsseilerregisteret Public Web v2

## Setup

VS Code is the recommended IDE for contributing to this project.

To get started, run the following commands in your terminal:

- `npm install`
- `npm run dev`

### Recommended extensions

Install the recommended extensions. In VS Code, open the Command Palette (`Ctrl+Shift+P`), select "Extensions: Show Recommended Extensions" and install those.

### Code formatting

Prettier is used for code formatting. The default values of Prettier are used in this project, and so there is no need for a `.prettierrc` config file. Prettier formats on save in VS Code. To format the entire project, run `npx prettier --write .`.

We use [Tailwind CSS](https://tailwindcss.com/) for styling. To keep things tidy, we use the package Rustywind for sorting of classes in JSX elements (i.e. the values for `className`). To tidy up classes (e.g. before making a PR), run Rustywind with this command: `npm run rustywind-fix`.

Some snippets are defined for the project, for example for creating a React component. To use them, start typing `krs-`, and a suggestion will appear.

### Project structure

Source files are within the `src` folder. The following is a description of how the project is structured within:

- The `pages` folder defines the routing in the app. [Read more in the Next.js documentation.](https://nextjs.org/docs/basic-features/pages) Keep code to a minimum, the point of `pages` is to define the routing of the app and preferably nothing else. Components in `pages` import from `features`.
- `features` contains page-specific code: components, helper functions, internationalization definitions and so forth. Code is organized in folders according to domain logic. Top-level are exported so they can be used in `pages`.
- `components` contains components that are used across _two or more_ features, and where there is a benefit to abstraction (ref. premature abstraction). Components are declared inside folders named the same as the component. An index.ts file exports the component for usage outside of the folder. Helper functions and sub-components are also placed within the same folder.
- `domain` defines the domain objects, and how the mapping from API results to domain objects works. The subfolder `krigsseilerregisteret-api` holds the API interface definitions.
- `lang` contains the compiled messages for internationalization (see below for more on i18n).
- `hooks` contains [hooks](https://reactjs.org/docs/hooks-intro.html) used across two or more features.
- `styles` contains Tailwind style customization in `globals.css`.
- `util` contains helper functions and constants used across two or more features.

In general, use [barrel files](https://github.com/basarat/typescript-book/blob/master/docs/tips/barrel.md) to control what's exported from a module and avoid deeply nested imports. The generate a barrel file, open a file in the target folder and run `ts-barrelr` using `Ctrl+Alt+B` or searching for "Barrel" in the Command Palette.

## Internationalization (i18n) and localization (l10n)

### Usage of `react-intl` and `formatjs`

I18n is handled using `react-intl` and `formatjs`. Messages are declared in the code with `react-intl` syntax, and `formatjs` takes care of extraction and compilation. Have a look at [their documentation to get an intro](https://formatjs.io/docs/react-intl).

In the code, declare messages like this, and write the default messages in Norwegian:

```
<FormattedMessage
  description="En beskjed" // Description should be a string literal
  defaultMessage="Jeg heter {name}" // Message should be a string literal
  values={
    {
      name: userName,
    }
  }
  />
```

Sometimes it is not possible to use the `react-intl` components, e.g. when you need to pass a serializable object instead of a `FormattedMessage` component. In that case you can use the imperative API with the `intl` object (see the [imperative API docs](https://formatjs.io/docs/react-intl/api) for more information.)

## Extract and add missing translation

As part of the build process, new translations are extracted and added to the following files:

- src/lang/messages.json
- src/lang/locales/no.json
- src/lang/locales/en.json

Adjust the added translationss in en.json and no.json (if needed) and run `npm run build` again to generate updated compiled language files.

## Accessibility (a11y)

Accessibility is checked with the `jsx-a11y` plugin.

## Flags

The flags in `public/images/flags` were downloaded from [the GitHub repository country-flag-icons](https://github.com/purecatamphetamine/country-flag-icons/tree/gh-pages/3x2). The PNG flags in the `custom` folder were obtained from Krigsseilerregisteret Web v1 repository.
