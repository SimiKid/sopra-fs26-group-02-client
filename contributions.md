# Contributions

Every member has to complete at least 2 meaningful tasks per week, where a
single development task should have a granularity of 0.5-1 day. The completed
tasks have to be shown in the weekly TA meetings. You have one "Joker" to miss
one weekly TA meeting and another "Joker" to once skip continuous progress over
the remaining weeks of the course. Please note that you cannot make up for
"missed" continuous progress, but you can "work ahead" by completing twice the
amount of work in one week to skip progress on a subsequent week without using
your "Joker". Please communicate your planning **ahead of time**.

Note: If a team member fails to show continuous progress after using their
Joker, they will individually fail the overall course (unless there is a valid
reason).

**You MUST**:

- Have two meaningful contributions per week.

**You CAN**:

- Have more than one commit per contribution.
- Have more than two contributions per week.
- Link issues to contributions descriptions for better traceability.

**You CANNOT**:

- Link the same commit more than once.
- Use a commit authored by another GitHub user.

---

## Contributions Week 1 - 21.03.2026 to 29.03.2026

| **Student**        | **Date** | **Link to Commit** | **Description**                 | **Relevance**                       |
| ------------------ | -------- | ------------------ | ------------------------------- | ----------------------------------- |
| **SimiKid**        | 27.03.2026   | [Link to Commit 1](https://github.com/SimiKid/sopra-fs26-group-02-client/commit/3f1e762e699497a98d631a0e7ebb60360632a287) | Store and manage auth token client-side — wires token from localStorage into ApiService via useApi hook, attaching X-Token header to all requests | Required for all authenticated API calls without this no protected endpoint can be reached after login |
|                    | 28.03.2026   | [Link to Commit 2](https://github.com/SimiKid/sopra-fs26-group-02-client/commit/ae20ffcf59f3f47d7a582abcbf43140ee309a2e8) | Create Game UI — lobby page with Create Game button, game code display, clipboard copy, join game input and polling for opponent | Implements the core lobby flow that allows two players to connect and start a game session|
|                    | 29.03.2026   | [Link to Commit 3](https://github.com/SimiKid/sopra-fs26-group-02-client/commit/a1841e526a524a727013aea3faac5c385bd31859) | Fix create game API call — send player1Id in request body instead of empty object | Without player1Id the backend cannot associate the game session with the logged-in user|
| **swimch**         | 27.03.2026   | [Link to Commit 1](https://github.com/SimiKid/sopra-fs26-group-02-server/commit/badef42f6b0c210e62e7f0b048ae8c672e81e947) | Implementation of game creation with random game code generation | This is required for the for starting the whole game session |
|                    | 27.03.2026   | [Link to Commit 2](https://github.com/SimiKid/sopra-fs26-group-02-server/commit/b16a112a26dd493306eca9882929c65583a671d8) | Implementation of the expiration of game sessions if no one joins after 10 minutes | This keeps the game repository free of old, unused game sessions |
| **noelgehrig**     | 26.03.2026   | [Link to Commit 1](https://github.com/SimiKid/sopra-fs26-group-02-client/commit/3b6875c7e51115ac931ab71bb92873888ca56995) | Cleanup of frontend template | Provides a foundation for all future contributions so others can start working. |
|                    | 27.03.2026   | [Link to Commit 2](https://github.com/SimiKid/sopra-fs26-group-02-client/commit/e2860f41e1a502a1b38a21f6e4c4514a2fbabbbf) | I implemented the login page and the general design foundation | Provides a colour and font template for all future pages in the frontend. With login page, users can be redirected to the lobby.  |
| **OHaas61**        | 26.03.2026   | [Link to Commit 1](https://github.com/SimiKid/sopra-fs26-group-02-server/commit/adb0ce98a4b4a0f4d3e08848290c1c6ba8877568) | Removing the palceholder code provided by the template | To start the project without any code we did not want to implement |
|                    | 27.03.2026   | [Link to Commit 2](https://github.com/SimiKid/sopra-fs26-group-02-server/commit/0f5061f2af51dc733f1158623a49049cfecfed16)| Implement user registration endpoint with unique username validation, blank input check, and tests  | Allows new players to create an account |
|                    | 28.03.2026   | [Link to Commit 3](https://github.com/SimiKid/sopra-fs26-group-02-server/commit/0fbd7afdd30f5656c72864218c3d8f69efd45da0)| Implement login endpoint with token generation and tests | Allows registered players to log in and receive a token |
| **liv519**         | 28.03.2026   | [Link to Commit 1](https://github.com/SimiKid/sopra-fs26-group-02-server/commit/9ea33ef5272a0f64e96185ab6dd2c924b713ff05) | added the logic for the authenticaton token used later on in endpoints | to make sure only loged in users with a token can for example create games. |
|                    | 29.03.2026   | [Link to Commit 2](https://github.com/SimiKid/sopra-fs26-group-02-client/commit/6496ff1881c02dba35c774653701a8a2f3fec2f0) | Completed the waiting page with a countdown and cancel button | to match userstory 1 |

---

## Contributions Week 2 & 3 - 30.03.2026 to 12.04.2026

| **Student**        | **Date** | **Link to Commit** | **Description**                 | **Relevance**                       |
| ------------------ | -------- | ------------------ | ------------------------------- | ----------------------------------- |
| **SimiKid**        | 09.04.2026   | [Link to Commit 1](https://github.com/SimiKid/sopra-fs26-group-02-server/commit/1a96a00cc0369d63f630e2fcb1c72cfa6a2189ba) | Implement join game endpoint with game code validation, join logic and error handling | Allows a second player to join an existing game session using a game code |
|                    | 09.04.2026   | [Link to Commit 2](https://github.com/SimiKid/sopra-fs26-group-02-server/commit/7d6f0e02c5ef92ef6d15d968eeeac5279e3d4430) | Add Swagger/OpenAPI documentation for all endpoints and DTOs | Provides a shared API documentation for frontend and backend development |
| **swimch**         | 09.04.2026   | [Link to Commit 1](https://github.com/SimiKid/sopra-fs26-group-02-client/commit/5114817261ae2e4163261e56e7cd4c8b7336fe02) | added functional wizard selection page | Is necessary for the game configuration |
|                    | 12.04.2026   | [Link to Commit 2](https://github.com/SimiKid/sopra-fs26-group-02-client/commit/cc2d5fdfeb7dccd59e3f429e701fb38b70b41ee9) | Implemented feedback into wizard selection frontend | Keeps the code clean & maintainable |
| **noelgehrig**     | 09.04.2026   | [Link to Commit 1](https://github.com/SimiKid/sopra-fs26-group-02-client/commit/5a5b42c160a01fcffe6626ee96538d28778c3fdd) | Implemented the confirmation screen in the lobby that renders once both players join via a game code, including polling to detect player readiness, automatic redirection to the wizard selection, and added better error handling. | This feature ensures both players are synchronized in real time by continuously polling the game state, allowing the frontend to react immediately once all participants have joined and are ready. This is the transition from single user experience to when both players get connected and can now do gameplay decisions (wizard, attacks). |
|                    | 12.04.2026   | [Link to Commit 2](https://github.com/SimiKid/sopra-fs26-group-02-client/commit/fae9f27b1a7821dee1973782757279fcbaece146) | Implemented the attack selection page, including UI layout, selection logic (max. 3 attacks), and  backend API calls with token-based authentication. | Player can now do the core gameplay decisions (choose his attacks) and from there on will later be redirect directly to the battle.  |
| **OHaas61**        | 09.04.2026   | [Link to Commit 1](https://github.com/SimiKid/sopra-fs26-group-02-server/commit/30f96d0ab480f3da06e9f0cda18f26ddca2a63be) | Add WizardClass enum with stats and GET /wizard endpoint | Defines the four wizard classes with HP and attack multipliers and exposes them via an authenticated endpoint so the frontend can display the selection screen |
|                    | 10.04.2026   | [Link to Commit 2](https://github.com/SimiKid/sopra-fs26-group-02-server/commit/add3028d778316044991f1089e0adee79e0a1e20) | Add PUT /game/{gameCode}/players/{userId}/wizard endpoint with wizard selection service logic, gambler HP randomization, player creation on game join, and controller/service tests | Implements the full wizard selection flow including saving the chosen class, calculating initial HP based on class multipliers, randomly assigning HP for the Gambler Wizard, creating Player entities when games are created and joined |
| **liv519**         | 01.4.2026   | [Link to Commit 1](https://github.com/SimiKid/sopra-fs26-group-02-server/pull/95/changes/0f4a0f659051470fcd5e1c3243ee29284d25fc63) | added a delete gamecode endpoint for when player cancel or the time expires when creating a game | to keep the database clean |
|                    | 08.4.2026   | [Link to Commit 2](https://github.com/SimiKid/sopra-fs26-group-02-server/pull/102/changes/13fff6b0569247257beaf1b3cecee6b790660962) | implemented get attacks endpoint and attack as well as element entity | relevant for the attack functionality |
|                    | 09.4.2026   | [Link to Commit 3](https://github.com/SimiKid/sopra-fs26-group-02-server/pull/102/changes/a19c55b6101d340d0596ad8e7bc161428b8b0ba3) | implemented put endpoint for attacks | allows players to set their attacks before starting a game |

---

## Contributions Week 4 - 13.04.2026 to 19.04.2026

| **Student**        | **Date** | **Link to Commit** | **Description**                 | **Relevance**                       |
| ------------------ | -------- | ------------------ | ------------------------------- | ----------------------------------- |
| **SimiKid**        | 17.04.2026   | [Link to Commit 1](https://github.com/SimiKid/sopra-fs26-group-02-client/commit/c3935a36b6fdd31cef00b1fa5167acff3d15b5a1) | Implement US-11a attack selection UI with STOMP/SockJS, turn-aware AttackInterface, WebSocketService and useBattle hook, battle page | Enables real-time turn-based combat after players finish attack configuration |
|                    | 17.04.2026   | [Link to Commit 2](https://github.com/SimiKid/sopra-fs26-group-02-server/commit/5a8072e30d00878e737195967e0ee9b27c22599e) | Fix backend battle system and WebSocket state management| Provides essential backend infrastructure for real-time multiplayer battles, enables frontend battle UI functionality.|
|                    | 19.04.2026   | [Link to Commit 3](https://github.com/SimiKid/sopra-fs26-group-02-client/commit/65308f723a6e33139e48de28f69858d5a3b66c81) | Add wizard to battle UI and redesign battle UI| Display wizards in frontend.|
| **swimch**         | 18.04.2026   | [Link to Commit 1](https://github.com/SimiKid/sopra-fs26-group-02-server/commit/def54224b8cb8542ee08e96400cae56b42c32ca9) | Added 30 locations and random choosing on game creation | Every game needs a random arena location to set the weather for the battle |
|                    | 19.04.2026   | [Link to Commit 2](https://github.com/SimiKid/sopra-fs26-group-02-server/commit/ba33ca8133ddd9bef17ebe6932b7cd2a393898d4) | Implemented calls to the openweather API | Necessary to set the weather according to the arena location |
| **noelgehrig**     | 19.04.2026   | [Link to Commit 1](https://github.com/SimiKid/sopra-fs26-group-02-server/commit/335348eb05624274ae4e89026a6ec313dc1b3d53) | Fixed websocket synchronization for the battle with REST fallback and added backend BattleStateDTO support for required information in the frontend. | Ensures stable real-time multiplayer gameplay by keeping both clients synchronized and providing all necessary battle data to the frontend. |
|                    | 19.04.2026   | [Link to Commit 2](https://github.com/SimiKid/sopra-fs26-group-02-client/commit/31d90f2511a55b5735511a9a3bbe150926c995d3) | Implemented battle UI fighter panels displaying players, HP bars, and other feedback. | Gameplay interface improvement that gives players clear real-time battle information and improves user experience during fights. |
| **OHaas61**        | 15.04.2026  | [Link to Commit 1](https://github.com/SimiKid/sopra-fs26-group-02-server/commit/4301df34bb53bffcaa732100b9ce652aee5bbea6) | Add WebSocket STOMP configuration and random first player selection on battle start | Enables WebSocket infrastructure for real-time battle communication and determines which player attacks first when both players are ready |
|                    | 16.04.2026 | https[Link to Commit 2](://github.com/SimiKid/sopra-fs26-group-02-server/commit/8c0953162fb95c66106885165f2e87379df8a685) | Add BattleService turn resolution, WebSocket controller, and battle DTOs | Implements core battle logic including damage calculation, turn switching, win condition detection, and real-time broadcasting of battle state to both clients via WebSocket |
| **liv519**         | [date]   | [Link to Commit 1] | [Brief description of the task] | [Why this contribution is relevant] |
|                    | [date]   | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |

--- 

## Contributions Week 5 - 20.04.2026 to 24.04.2026

| **Student**        | **Date** | **Link to Commit** | **Description**                 | **Relevance**                       |
| ------------------ | -------- | ------------------ | ------------------------------- | ----------------------------------- |
| **SimiKid**        | [date]   | [Link to Commit 1] | [Brief description of the task] | [Why this contribution is relevant] |
|                    | [date]   | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **swimch**         | [date]   | [Link to Commit 1] | [Brief description of the task] | [Why this contribution is relevant] |
|                    | [date]   | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **noelgehrig**     | [date]   | [Link to Commit 1] | [Brief description of the task] | [Why this contribution is relevant] |
|                    | [date]   | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **OHaas61**        | [date]   | [Link to Commit 1] | [Brief description of the task] | [Why this contribution is relevant] |
|                    | [date]   | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **liv519**         | [date]   | [Link to Commit 1] | [Brief description of the task] | [Why this contribution is relevant] |
|                    | [date]   | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |

---

## Contributions Week 6 - 25.04.2026 to 03.05.2026

| **Student**        | **Date** | **Link to Commit** | **Description**                 | **Relevance**                       |
| ------------------ | -------- | ------------------ | ------------------------------- | ----------------------------------- |
| **SimiKid**        | [date]   | [Link to Commit 1] | [Brief description of the task] | [Why this contribution is relevant] |
|                    | [date]   | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **swimch**         | [date]   | [Link to Commit 1] | [Brief description of the task] | [Why this contribution is relevant] |
|                    | [date]   | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **noelgehrig**     | [date]   | [Link to Commit 1] | [Brief description of the task] | [Why this contribution is relevant] |
|                    | [date]   | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **OHaas61**        | [date]   | [Link to Commit 1] | [Brief description of the task] | [Why this contribution is relevant] |
|                    | [date]   | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **liv519**         | [date]   | [Link to Commit 1] | [Brief description of the task] | [Why this contribution is relevant] |
|                    | [date]   | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |

---

## Contributions Week 7 - 04.05.2026 to 10.05.2026

| **Student**        | **Date** | **Link to Commit** | **Description**                 | **Relevance**                       |
| ------------------ | -------- | ------------------ | ------------------------------- | ----------------------------------- |
| **SimiKid**        | [date]   | [Link to Commit 1] | [Brief description of the task] | [Why this contribution is relevant] |
|                    | [date]   | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **swimch**         | [date]   | [Link to Commit 1] | [Brief description of the task] | [Why this contribution is relevant] |
|                    | [date]   | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **noelgehrig**     | [date]   | [Link to Commit 1] | [Brief description of the task] | [Why this contribution is relevant] |
|                    | [date]   | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **OHaas61**        | [date]   | [Link to Commit 1] | [Brief description of the task] | [Why this contribution is relevant] |
|                    | [date]   | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **liv519**         | [date]   | [Link to Commit 1] | [Brief description of the task] | [Why this contribution is relevant] |
|                    | [date]   | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |

---

## Contributions Week 8 - 11.05.2026 to 17.05.2026

| **Student**        | **Date** | **Link to Commit** | **Description**                 | **Relevance**                       |
| ------------------ | -------- | ------------------ | ------------------------------- | ----------------------------------- |
| **SimiKid**        | [date]   | [Link to Commit 1] | [Brief description of the task] | [Why this contribution is relevant] |
|                    | [date]   | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **swimch**         | [date]   | [Link to Commit 1] | [Brief description of the task] | [Why this contribution is relevant] |
|                    | [date]   | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **noelgehrig**     | [date]   | [Link to Commit 1] | [Brief description of the task] | [Why this contribution is relevant] |
|                    | [date]   | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **OHaas61**        | [date]   | [Link to Commit 1] | [Brief description of the task] | [Why this contribution is relevant] |
|                    | [date]   | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **liv519**         | [date]   | [Link to Commit 1] | [Brief description of the task] | [Why this contribution is relevant] |
|                    | [date]   | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |

---

## Contributions Week 8 - 18.05.2026 to 22.05.2026

| **Student**        | **Date** | **Link to Commit** | **Description**                 | **Relevance**                       |
| ------------------ | -------- | ------------------ | ------------------------------- | ----------------------------------- |
| **SimiKid**        | [date]   | [Link to Commit 1] | [Brief description of the task] | [Why this contribution is relevant] |
|                    | [date]   | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **swimch**         | [date]   | [Link to Commit 1] | [Brief description of the task] | [Why this contribution is relevant] |
|                    | [date]   | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **noelgehrig**     | [date]   | [Link to Commit 1] | [Brief description of the task] | [Why this contribution is relevant] |
|                    | [date]   | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **OHaas61**        | [date]   | [Link to Commit 1] | [Brief description of the task] | [Why this contribution is relevant] |
|                    | [date]   | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **liv519**         | [date]   | [Link to Commit 1] | [Brief description of the task] | [Why this contribution is relevant] |
|                    | [date]   | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
