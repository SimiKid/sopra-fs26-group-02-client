
<p align="center">
  <img src="./public/images/readme/wwlogo.png" alt="Weather Wizards Logo" width="300"/>
</p>

<p align="center" style="font-size: 60px; font-weight: bold">
  Weather Wizards
</p>

<h4 align="center">

[![contributors](https://img.shields.io/github/contributors-anon/SimiKid/sopra-fs26-group-02-client?color=yellow&style=flat-square)](https://github.com/SimiKid/sopra-fs26-group-02-client/graphs/contributors)
[![license](https://img.shields.io/badge/apache%202.0-blue.svg?style=flat-square&label=license)](https://opensource.org/licenses/Apache-2.0)

<h2 align="left">🧙 Introduction</h2> 
<p> Weather Wizards is a turn-based multiplayer wizard battle game where real-world weather directly influences combat strategy. Players can either join a battle through a shared game code with friends or quickly enter a random matchmaking battle against another player. Before combat begins, each player selects a wizard class and is then shown the live arena location for the upcoming battle. Based on the current real-world weather conditions at that location players must predict which attacks will be most effective and choose three spells accordingly. These live weather conditions modify the attack damage, forcing players to adapt their strategy and think ahead. </p> 
<h3 align="left">Goal</h3> <p> The goal of Weather Wizards is to create a fast-paced multiplayer browser game that combines simple turn-based combat with dynamic gameplay variation through live external data. By connecting weather conditions to spell effectiveness, every battle feels different and encourages players to experiment with strategies, attack combinations, and wizard classes. </p>
<h3 align="left">Motivation</h3> <p> Many browser games rely on static rules and repetitive gameplay, which can make matches feel predictable over time. We wanted to create a multiplayer experience that stays fresh by integrating real-world live weather data directly into gameplay mechanics. Instead of fixed arenas and strategies, Weather Wizards forces players to adapt to changing battle conditions and make strategic decisions based on the current environment. </p>


## Table of contents

- [Technologies](#technologies)
- [High-level components](#high-level-components)
- [Launch and Deployment](#launch-and-deployment)
- [Illustrations and Game Flow](#illustrations-and-game-flow)
- [Roadmap](#roadmap)
- [Authors and Acknowledgements](#authors)
- [License](#license)

<a name="technologies"></a>

## Technologies
- **[Next.js](https://nextjs.org/)** - React framework used for building the frontend and handling routing, rendering, and deployment optimization.
- **[React](https://react.dev/)** - JavaScript library for creating interactive and dynamic user interfaces.
- **[TypeScript](https://www.typescriptlang.org/)** - Strongly typed extension of JavaScript that improves code safety and maintainability.
- **[Vercel](https://vercel.com/)** - Cloud deployment platform optimized for hosting and deploying Next.js applications.
- **[STOMP.js](https://stomp-js.github.io/stomp-websocket/)** - Messaging protocol library used for real-time communication over WebSockets.
- **[SockJS](https://github.com/sockjs)** - WebSocket fallback library ensuring stable real-time communication across different environments.
- **[Ant Design (AntD)](https://ant.design/)** - React UI component library used for building consistent and responsive interface elements.

<a name="high-level-components"></a>

## High level components

### Authentication - [`Login`](./app/login/page.tsx), [`Register`](./app/register/page.tsx)
The authentication pages allow new users to create an account and existing users to log in. After a successful login, the user token is stored locally and used to access protected multiplayer features and persistent player data.

### Lobby and Matchmaking - [`Lobby`](./app/lobby/page.tsx)
The lobby acts as the central hub of the game. From here, players can create a  battle which generates a game code, join an existing lobby with the shared game code, or instantly queue for a random quick match.

### Game Setup - [`Wizard Selection`](./app/games/[gameCode]/wizards/page.tsx), [`Attack Selection`](./app/games/[gameCode]/attacks/page.tsx) 
Before the battle starts, players first choose a wizard class with different strengths and weaknesses. Afterwards, a random real-world arena location is shown and players must predict the live weather conditions there in order to choose the three most effective attacks for the upcoming battle.

### Battle System - [`Battle`](./app/games/[gameCode]/battles/page.tsx), [`useBattle`](./app/hooks/useBattle.ts)
The battle system contains the main real-time gameplay of Weather Wizards. It manages turn-based combat, spell usage, weather effects, health updates, emotes, timers, and the final result screen. The component communicates with the backend through [`WebSockets`](./app/api/websocketService.ts) so both players receive synchronized live updates during combat.

### Player Statistics and Navigation - [`Leaderboard`](./app/leaderboard/page.tsx), [`History`](./app/history/page.tsx), [`Header`](./app/components/layout/AppHeader.tsx)
The leaderboard and history pages allow players to track their progress, compare performance with others, and revisit previous battles. The shared header connects the main parts of the application by providing quick navigation between the lobby, leaderboard, battle history, and logout functionality.

<a name="launch-and-deployment"></a>

## Launch and Deployment

### Prerequisites

Before running the client locally, make sure the following tools are installed:

- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)

The backend server should also be running locally on: `http://localhost:8080`

### Installation

First you will need to clone the repository:

```bash
git clone https://github.com/SimiKid/sopra-fs26-group-02-client
cd sopra-fs26-group-02-client
```

Install the dependencies (Next.js, React, Ant Design, STOMP.js, and SockJS):

`npm install`

### Optional Nix Setup

The project contains an optional Nix/direnv setup script for developers who want to use the predefined development environment from the project template.

Run:

`source setup.sh`

After the installation, you may be prompted to allow direnv. In that case, run:

`direnv allow`

### Local

Start the development server:

`npm run dev`

The client will then be available at:

`http://localhost:3000`


### Production Build

Create the production build:

`npm run build`


Start the production version:

`npm run start`

### Releases

New client releases are created by merging changes into the `main` branch.  

A GitHub Actions workflow is triggered automatically on every push to `main`. It installs the dependencies and deploys the newest production version to Vercel.



<a name="illustrations-and-game-flow"></a>

## Illustrations and Game Flow

The following GIF showcases the complete gameplay flow of Weather Wizards from landing page to the final battle results:

![Weather Wizards Flow](./public/images/readme/WeatherWizards.gif)

### User Flow
When opening Weather Wizards, players first arrive at the landing page where they are introduced to the game concept and the role of live weather in battles. From there, users can either register a new account or log into an existing one.

After authentication, players enter the main lobby, which acts as the central hub of the game. Here, players can view leaderboard information, access their battle history, create a private game with a shared code, join an existing lobby, or instantly enter a random quick match against another online player.

Once matched, players enter the selection phase. First, they choose one of the available wizard classes with different strengths and weaknesses. Afterwards, players are shown the real-world arena location for the upcoming battle and must strategically select three attacks based on the weather conditions they expect at that location.

<h4 align="center">The following wizards and attacks can be selected:</h4>
<center>
    <img src="./public/images/readme/wizardselection.png" alt="Wizard Selection" width="600"/>
</center>

<center>
    <img src="./public/images/readme/attackselection.png" alt="Wizard Selection" width="600"/>
</center>


After both players confirm their selections, the battle begins. Players take turns attacking each other in real time while adapting to the current weather conditions shown visually through the arena background and battle information. By hovering over attacks, players can see whether a spell is strong or weak under the current conditions. An emote chat also allows communication during battle.

At the end of the match, a victory or defeat screen displays battle statistics such as total damage dealt, weather conditions, turns played, and the attacks used during combat. Players can then immediately request a rematch or return to the lobby to start another battle.

<a name="roadmap"></a>

## Roadmap

- **Reward System**  
  Introduce a progression system where players earn in-game currency or rewards after each battle.

- **Cosmetics Shop**  
  Expand the reward system with a cosmetics shop where players can spend earned currency on wizard skins, spell effects, emotes, and different arena themes to personalize their gameplay experience.

- **Sound and Music**  
  Add background music, spell sound effects, and battle audio cues to improve the atmosphere.
<a name="authors"></a>

## Authors

|  |  |
|------|--------|
| Simone Martinecz | [![GitHub followers](https://img.shields.io/github/followers/SimiKid?label=Follow&style=social)](https://github.com/SimiKid) |
| Liv Rusert | [![GitHub followers](https://img.shields.io/github/followers/liv519?label=Follow&style=social)](https://github.com/liv519) | 
| Oliver Haas | [![GitHub followers](https://img.shields.io/github/followers/OHaas61?label=Follow&style=social)](https://github.com/OHaas61) |
| Noel Gehrig | [![GitHub followers](https://img.shields.io/github/followers/noelgehrig?label=Follow&style=social)](https://github.com/noelgehrig) |
| Sven Kariyawasam | [![GitHub followers](https://img.shields.io/github/followers/swimch?label=Follow&style=social)](https://github.com/swimch) |


<a name="acknowledgement"></a>
### Acknowledgement

Special thanks to our Teaching Assistant **[Lucio Canepa](https://github.com/luciocanepa)** who supported us during the making of Weather Wizards.

<a name="license"></a>
## License
We publish the code under the terms of the [Apache 2.0 License](https://github.com/SimiKid/sopra-fs26-group-02-server/blob/main/LICENSE) that allows distribution, modification, and commercial use. This software, however, comes without any warranty or liability.
