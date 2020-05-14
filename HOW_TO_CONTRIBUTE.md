# Tiddy

## Setup

- Fork the repository and clone.
- Setup your local develop and master branches to have an upstream that points to this repository so you can pull easily.
- setup your local `.env` file file using the sample provided in `.env.sample`
- We use docker for our deployment and we implore you to do the same in development. A docker file has been setup for this. You will need to have docker setup on your machine.

> - Run `docker build -t tiddy .` to build a local copy of your image.
> - To start the app locally with docker, run `docker run -p [internal_port]:[external_port] tiddy`. You can also add the `-d` flag to run it in the background.

## Slack Scopes

- If a new permission scope is being added, ensure that you update the installation button as well.

## Common Gatchas
 
- While working, you may install a package that has not defined types. Typescript would flag this and you will need to add an ambient type to the @types folder. Take the following steps below to get past this:

> - Add a folder with the name prescribed by the linter to the @types folder of the root directory.
> - Add an `index.d.ts` file to the newly added folder.
> - Add a simple declarative statement for the package's import i.e: `declare module '@slack/interactive-messages';`
> - Save and run `npm run setup` to move the new ambient type to the node_modules.
