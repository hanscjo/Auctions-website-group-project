# Prosjekt

BudBua AS - Ny nettside med funksjonalitet

### Forhåndskrav

For å kjøre prosjektet trengs npm: https://www.npmjs.com/get-npm

### Installering

1. Klon repoen med SSH/HTTP i ønsket lokasjon.
2. Gå inn i mappen og npm install.
3. Start server ved å skrive node server.js
4. Gå inn i client-mappen og skriv npm start
5. Koden vil nå kjøre i localhost:3000

## Bygd Med

* MERN - MySQL, Express, ReactJS, NodeJS

 #### Back-end
* [MySQL](https://www.mysql.com/) - Databasehåndterings-program
* [Express](https://expressjs.com/) - Web applikasjons rammeverk for Node.js
* [Node](https://nodejs.org/en/) - Server-side JavaScript

 #### Front-end
* [JavaScript](https://www.javascript.com/) - Programmeringsspråket for HTML og Web
* [Babel](https://babeljs.io/) - JavaScript kompilator
* [Webpack](https://webpack.js.org/) - "Module bundler" for moderne JavaScript applikasjoner
* [ReactJS](https://reactjs.org/) - JavaScript biblotek for å bygge brukergrensesnitt

## Git-conventions
### Branches:
* master: oppdateres kun ved deployment (merge fra dev)
* dev: utviklings branches, oppdateres jenvlig
* feat/feature-name: en branch som lager eller forbedrer funksjonalitet av en feature
* design/area-name: en branch som forbedrer brukeropplevelsen til en feature
* fix/bug-name: en branch som skal korrigere en bug

### Pull requests
* To utviklere skal godkjenne merge requests før den merges inn i dev
* Bruk alltid "Squash and merge" som merge-options (merge inn i dev)

## Mappe struktur

### client 
client is the client-side (frontend) part of the application

#### containers
stateful components that manages other components 

#### components
stateless components 

#### assets
pictures used in the project

#### hoc
used for layout purposes
