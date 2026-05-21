
<p align="center">
  <img src="./public/images/readme/wwlogo.png" alt="Weather Wizards Logo" width="300"/>
</p>

<p align="center" style="font-size: 30px;">
  <i style="font-weight: bold;">Weather Wizards</i>
</p>

<h4 align="center">

[![contributors](https://img.shields.io/github/contributors-anon/SimiKid/sopra-fs26-group-02-client?color=yellow&style=flat-square)](https://github.com/SimiKid/sopra-fs26-group-02-client/graphs/contributors)
[![license](https://img.shields.io/badge/apache%202.0-blue.svg?style=flat-square&label=license)](https://opensource.org/licenses/Apache-2.0)

<h2 align="left">🧙 Introduction</h2> <p> Weather Wizards Introduction </p> 
<h3 align="left">Goal</h3> <p> Goal </p>
<h3 align="left">Motivation</h3> <p> Motivation </p>


## Table of contents

- [Technologies](#technologies)
- [High-level components](#high-level-components)
- [Launch and Deployment](#launch-and-deployment)
- [Game Flow](#game-flow)
- [Roadmap](#roadmap)
- [Authors & Acknowledgements](#authors)
- [License](#license)

<a name="technologies"></a>

## Technologies
- **[Next.js](https://nextjs.org/)**
- **[React](https://react.dev/)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Vercel](https://vercel.com/)**
- **[STOMP.js](https://stomp-js.github.io/stomp-websocket/)**
- **[SockJS](https://github.com/sockjs)**
- **[Ant Design (AntD)](https://ant.design/)**

<a name="high-level-components"></a>

## High level components

### [`Landing page`](./app/page.tsx)
tutorial & navigation to authentication

### Authentication - [`Login`](./app/login/page.tsx), [`Register`](./app/register/page.tsx)
login or register

### [`Lobby`](./app/lobby/page.tsx)
Lobby of the game with stuff

### Selection - [`Wizards`](./app/games/wizards/page.tsx), [`Attacks`](./app/games/attacks/page.tsx) 
First select wizard & then attacks

### [`Battle`](./app/games/battle/page.tsx)
Battle & Endscreen

### Header - [`Leaderboard`](./app/leaderboard/page.tsx), [`History`](./app/history/page.tsx)
Leaderboard, History, back to lobby

## Launch and Deployment

First you will need to clone the repository
`git clone https://github.com/SimiKid/sopra-fs26-group-02-client`

To Do: add instructions

<a name="game-flow"></a>

## Game Flow

![Weather Wizards Flow](./public/images/readme/WeatherWizards.gif)


<div style="text-align: center;">
    <img src="./public/images/readme/wizardselection.png" alt="Wizard Selection" width="600"/>
</div>

<div style="text-align: center;">
    <img src="./public/images/readme/attackselection.png" alt="Attack Selection" width="600"/>
</div>

<a name="roadmap"></a>

## Roadmap

- Customizable profile
- Cosmetics shop
- Sound

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

Special thanks to our TA **[Lucio Canepa](https://github.com/luciocanepa)** who supported us during the making of Weather Wizards.

<a name="license"></a>
## License
We publish the code under the terms of the [Apache 2.0 License](https://github.com/SimiKid/sopra-fs26-group-02-server/blob/main/LICENSE) that allows distribution, modification, and commercial use. This software, however, comes without any warranty or liability.
