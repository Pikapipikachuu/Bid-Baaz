# Bid Baaz — Bid · Build · Battle

A self-contained, offline-friendly browser game. No API key or paid service is required to run the game.

## Run
- Extract the ZIP.
- Open `Bid_Baaz/index.html` in a modern browser, or upload the contents of the `Bid_Baaz` folder to any static web host.
- The game uses browser local storage for automatic save/resume during an active auction.

## Arenas
### Marvel Arena
- 39 character roster with user-provided character portraits.
- AI auction and difficulty-linked budgets.
- Comic-inspired matchup tiers and ability/counterplay based team showdown.

### Cricket Auction
- 95-player roster: 70 current-pool players and 25 IPL legends.
- Auction pool scales with team count: 1 AI = 24 players, 2 = 36, 3 = 48, 4 = 60, 5 = 72, 6 = 84.
- 12-player squad cap per team; teams may finish short if they run out of budget.
- Category order: batters, bowlers, wicketkeepers, all-rounders.
- Easy ₹200 Cr, Medium ₹150 Cr, Hard ₹100 Cr; virtual bid increments ₹20L, ₹50L and ₹1 Cr.
- Simulated T20 round-robin league where every team plays every other team once. The champion is decided by league points, with NRR as the tie-breaker. Includes standings, horizontally swipeable innings scorecards, highlights, optional full ball-by-ball commentary, Orange Cap and Purple Cap.

## Save and resume
- Active auctions autosave in browser local storage.
- Pause stops the auction timer and AI bidding.
- Continue Game resumes the saved auction. Exiting to Home keeps the save.

All credits are virtual; there are no real-money wagers or payments.

## Recent UI updates
- Arena-specific setup guidance switches between Marvel and Cricket.
- Refined cool teal accent palette, compact setup summary and slightly taller Enter the auction button.
- Results heading reads “Tournament complete” / “The champions are decided”.
- Cricket scorecards open and close from the same toggle; the Close scorecard control remains available.
- Scorecards use horizontal swipe panels for the first innings, second innings and highlights.
