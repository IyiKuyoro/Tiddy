# Tiddy

## Setup

- Fork the repository and clone.
- Setup your local develop and master branches to have an upstream that points to this repository so you can pull easily
- You can install all dependencies and setup the needed files by running `npm run setup`.

## Slack Scopes

- If a new permission scope is being added, ensure that you update the installation button as well.

## Common Gatchas

- While working, you may install a package that has not defined types. Typescript would flag this and you will need to add an ambient type to the @types folder. Take the following steps below to get past this:

> - Add a folder with the name prescribed by the linter to the @types folder of the root directory.
> - Add an `index.d.ts` file to the newly added folder.
> - Add a simple declarative statement for the package's import i.e: `declare module '@slack/interactive-messages';`
> - Save and run `npm run setup` to move the new ambient type to the node_modules.
