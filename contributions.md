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
|                    | 16.04.2026 | [Link to Commit 2](https://github.com/SimiKid/sopra-fs26-group-02-server/commit/8c0953162fb95c66106885165f2e87379df8a685) | Add BattleService turn resolution, WebSocket controller, and battle DTOs | Implements core battle logic including damage calculation, turn switching, win condition detection, and real-time broadcasting of battle state to both clients via WebSocket |
| **liv519**         | [16.04.2026]   | [Link to Commit 1](https://github.com/SimiKid/sopra-fs26-group-02-server/pull/110/changes/28c956170861a2dbfbafe4c84a462886e15819f9)| Build multiplier for each element for all weather options | Important for the calculation of the damage |
|                    | [19.04.2026]   | [Link to Commit 2](https://github.com/SimiKid/sopra-fs26-group-02-server/pull/110/changes/8354fd85e121d6664298104c2e80dc47675a2a1a) | damage calculation for given attack | Important logic for calculation of the damage as well as calculating and saving the new hp of a player |

--- 

## Contributions Week 5 - 20.04.2026 to 24.04.2026

| **Student**        | **Date** | **Link to Commit** | **Description**                 | **Relevance**                       |
| ------------------ | -------- | ------------------ | ------------------------------- | ----------------------------------- |
| **SimiKid**        | 20.04.2026 | [Link to Commit 1](https://github.com/SimiKid/sopra-fs26-group-02-client/commit/00a9feaf45ad2cd76a77be0130774a74be3cb793) | Fixed hardcoded WebSocket URL | Without this fix, the deployed Vercel frontend could not connect to the backend because the WebSocket client was pointing at localhost:8080 |
|                    | 20.04.2026   | [Link to Commit 2](https://github.com/SimiKid/sopra-fs26-group-02-client/commit/ad5587ea437f5259ec3ccac30f75ee7a37b09c79) | Change join game ame frontend to POST| Feedback week 2&3 |
|                    | 20.04.2026 | [Link to Commit 3](https://github.com/SimiKid/sopra-fs26-group-02-server/commit/f7f2eed2d94bd7efbfd2bb04e0ee6298ba1fb713) | Refactor join endpoint and simplify  checks | Feedback week 2&3 |
|                    | 20.04.2026 | [Link to Commit 4](https://github.com/SimiKid/sopra-fs26-group-02-server/commit/d12b9e91a9d4aab3478b0e3ba7f333dba59a7001) | Add GET /games/{gameCode}/attacks endpoint | Feedback week 4: replace useLocalStorage with backend fetch |
|                    | 20.04.2026 | [Link to Commit 5](https://github.com/SimiKid/sopra-fs26-group-02-client/commit/27d0b9e368b428b335d0550c3e20bd2090038dd2)| refactor battle: fetch selected attacks from backend and tidy up battle page  | Replaced localStorage based attack persistence with a backend fetch, fixes empty-attacks-after-refresh bug, and refactored the battle page for readability. |
|                    | 21.04.2026   | [Link to Commit 6](https://github.com/SimiKid/sopra-fs26-group-02-server/pull/117/changes/3bf2564a9aacc2354583a129861ec23563d2eb38) [Link to Commit 7](https://github.com/SimiKid/sopra-fs26-group-02-server/pull/117/changes/093966740ae5a380db4ff443987eacb76c014d80) | refactor player: link Player to GameSession via gameSessionId | Without the player beeing connected to a game we can not say what wizerd X a user had in game Y. We need to know this to be able to diplay the game history |
|                    | 22.04.2026   | [Link to Commit 8](https://github.com/SimiKid/sopra-fs26-group-02-server/commit/e712d29d12aec4d00d5f66487a6d20f151285a6b) | Broadcast battle state after transaction commit to release DB locks before network send, added broadcast timing log.| Improve PROD battle preformance |
|                    | 22.04.2026   | [Link to Commit 9](https://github.com/SimiKid/sopra-fs26-group-02-server/commit/60cf80d6b2736d0bf674347f124e3123933501df) [Link to Commit 10](https://github.com/SimiKid/sopra-fs26-group-02-server/commit/e8876cd0b7220bde94bf6999a0aa8edb0447a188)| Switch App Engine to Flexible env | Make WebSocket work on PROD |
|                    | 22.04.2026   | [Link to Commit 11](https://github.com/SimiKid/sopra-fs26-group-02-client/commit/775b096ec2c788a78640336222e7d85bc506f43b) | Gate battle-page fetches on token hydration to fix 401s | Prevents 401 errors on the battle page by gating fetches until the auth token has hydrated from storage.|
|                    | 22.04.2026   | [Link to Commit 12](https://github.com/SimiKid/sopra-fs26-group-02-client/commit/f1a8f9366e47ef72810a81319af16bfd72084708) | Gate attack-selection fetches on token hydration to fix 401s | Prevents 401 errors on the attack page by gating fetches until the auth token has hydrated from storage. |
|                    | 22.04.2026 | [Link to Commit 13](https://github.com/SimiKid/sopra-fs26-group-02-server/pull/132/commits/ea5981d) | Delete dead code and unused fields | Code hygiene: removes unused DTOs, services, and tests that accumulated during development.|
|                    | 22.04.2026 | [Link to Commit 14](https://github.com/SimiKid/sopra-fs26-group-02-server/pull/132/commits/645eb5b) [Link to Commit 15](https://github.com/SimiKid/sopra-fs26-group-02-server/pull/132/commits/af8c0ea)| Lowercase interceptor package, dedupe BattleStateDTO construction | Aligns package naming with Java conventions and removes duplicated DTO construction logic shared between BattleService and AttackService |
|                    | 22.04.2026 | [Link to Commit 16](https://github.com/SimiKid/sopra-fs26-group-02-server/pull/132/commits/743273f) | Add class-level headers and inline notes | Improves code readability and onboarding for teammates by documenting logic |
|                    | 22.04.2026 | [Link to Commit 17](https://github.com/SimiKid/sopra-fs26-group-02-server/pull/132/commits/fc9ff7d) | Cover battle mechanics, logout, and rematch controller in tests | Increases backend test coverage on critical game flows (battle, logout, rematch) to catch regressions before deployment |
|                    | 23.04.2026 | [Link to Commit 18](https://github.com/SimiKid/sopra-fs26-group-02-server/pull/132/commits/6c6f6dc) | Add integration tests for user, game session, and auth services | Adds end-to-end integration tests validating user, game session, and auth flows against the real Spring context, closing gaps left|
| **swimch**         | 21.04.2026   | [Link to Commit 1](https://github.com/SimiKid/sopra-fs26-group-02-server/commit/f117284d90ac58e08dd05180c4f7d5a8b227a36e) | Fixed session management to clear current session for users after a round ends | This enables a user to play mutliple matches. Before, a new account had to be created to play again |
|                    | 21.04.2026   | [Link to Commit 2](https://github.com/SimiKid/sopra-fs26-group-02-server/commit/ffd4cb5036876a30e8203ea65b594154c9ea1e97) | Added revenge attacks to enable the secod player to play the same amount of turns as the starting player. | This makes the game fairer and removes the advantage for the starting player. |
| **noelgehrig**     | [date]   | [Link to Commit 1] | [Brief description of the task] | [Why this contribution is relevant] |
|                    | [date]   | [Link to Commit 2] | [Brief description of the task] | [Why this contribution is relevant] |
| **OHaas61**        | 20.04.2026 | [Link to Commit 1](https://github.com/SimiKid/sopra-fs26-group-02-server/commit/d1df79337890b6bae026b1200378f9b708a7b2ff) | Add BattleResult type for battle result API response | Models the response shape of GET /games/{gameCode}/battles/result so it can be used in the frontend |
|                    | 21.04.2026 | [Link to Commit 2](https://github.com/SimiKid/sopra-fs26-group-02-client/commit/65b7a724899b7a3fb626e87c8cd14ceeee552dc9) | Fetch and display final battle stats on game over screen | Calls the result endpoint when the battle ends and renders damage dealt, turns played and weather conditions to the player |
|                    | 21.04.2026 | [Link to Commit 3](https://github.com/SimiKid/sopra-fs26-group-02-server/commit/73cbefb4c2e3e24935203c8ca4e8cc39ee8feb8f) | Implement rematch backend with flag coordination and new game creation | Allows both players to request a rematch, creating a fresh game session when both accept  |
|                    | 21.04.2026 | [Link to Commit 4](https://github.com/SimiKid/sopra-fs26-group-02-client/commit/dd0267be278706b01040dc8faca2c977b4633d49) |Add Play Again button with polling and 30s timeout to end screen | Redirects both players to wizard selection once the rematch game is ready  |
| **liv519**         | [20.04.2026]   | [Link to Commit 1](https://github.com/SimiKid/sopra-fs26-group-02-server/commit/1e42babc21d55dba32d01698f6d3f7a13a844de2) | When a player doesn't make an attack within 30 seconds, one out of his three attacks is randomly executed | that the gameflow won't stop even though one player won't make a move |
|                    | [20.04.2026]   | [Link to Commit 2](https://github.com/SimiKid/sopra-fs26-group-02-client/commit/3deaa44893cfa6e1043ccc7d37b679dd120038dd) | 30 seconds countdown on battle page | that the player knows how much time he has left |
|                    | [22.04.2026]   | [Link to Commit 3](https://github.com/SimiKid/sopra-fs26-group-02-server/commit/1f23cc3000dc49f570418c912f2dbbf6464c14dc) | logout endpoint | to make it possible that a user can logout |
|                    | [22.04.2026]   | [Link to Commit 4](https://github.com/SimiKid/sopra-fs26-group-02-client/commit/49a1e0f65319bdd76eb9c4c065060c15764638cb) | logout button | logout button in header so a user can see quickly the option to logout|


---

## Contributions Week 6 - 25.04.2026 to 03.05.2026

| **Student**        | **Date** | **Link to Commit** | **Description**                 | **Relevance**                       |
| ------------------ | -------- | ------------------ | ------------------------------- | ----------------------------------- |
| **SimiKid**        | 21.04.2026 | [Link to Commit 1](https://github.com/SimiKid/sopra-fs26-group-02-server/commit/4b2cc3fd893209a739f480e532dc243b2a480b5d) | Add GET /users/me/games endpoint for game history| Implements US-20 (View My Game History). Returns the authenticated user's finished games sorted most recent first, with date, location, weather, wizard classes, and win/loss/draw result. Data the profile page needs to show for past battles.|
|                    | 21.04.2026   | [Link to Commit 2](https://github.com/SimiKid/sopra-fs26-group-02-client/commit/82cbda98e9fe212abc62ec676f0c69b2330d7c83) | Add profile page with battle history, auth-gated header nav, and login redirect for protected routes| Users can track past battles. Also introduces the shared AppHeader nav and a reusable route guard that future authenticated pages can rely on. |
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
