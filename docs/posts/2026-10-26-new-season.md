---
title: New season, new name, new everything
date: 2026-10-26
---

College basketball is back in a week, which means it's time to dust off the site! I spent the offseason rebuilding pretty much everything under the hood, so here's a rundown of what's new for 2026-27 and where to find it.

First things first: **the name**. Back in February I said I might drop the "AI" from my name, and I followed through. The site is now **grantley cbb**. Same ratings, same bracketology, same guy, just without a name that makes people assume a chatbot is picking their 8/9 games.


## Under the hood

- **New data source.** Last year I was scraping ESPN box scores every morning and praying nothing broke. This year everything comes from [CollegeBasketballData](https://collegebasketballdata.com), which gives me cleaner box scores *and* full play-by-play with who was on the floor for every possession. That last part is what made most of the new features below possible.
- **Daily updates, every morning.** Ratings, predictions, brackets, and player pages all rebuild automatically overnight, so everything is current before the first tip of the day.


## Player ratings

I had this running at the end of last season and have made some minor tweaks. But to recap:

- Head to **Player Ratings → Full Rankings** for every D1 player. The main number is **RAPM**: points per 100 possessions a player adds compared to an average player, split into offense (ORAPM) and defense (DRAPM). It's built from who was actually on the floor and what happened, adjusted for teammates and opponents, with a box-score prior so small samples don't go haywire.
- Every player has their own **player page**: season stats, a game log, a shot chart, trends over the season, and a dropdown to jump back to previous seasons.
- **Team Page → Lineup Ratings** shows how every lineup combination has performed.


## Preseason projections

This is the one I'm most excited about. Before a single game is played, every team and player gets a projection built from their roster:

- **Returners** start from last season's rating, with a bump for typical player development.
- **Transfers** carry their rating over, adjusted for the jump (or drop) in competition level.
- **Freshmen** are projected from their recruiting ranking, based on how similar recruits have actually played in their first year.
- Minutes are projected from each team's depth chart.

This was challenging to put together, especially estimating freshman impact and roles/minutes per game. Both will update as games start being played!

Check out **Team Ratings → Preseason Projections** and **Player Ratings → Preseason Projections** for the full lists. I tested this by projecting last season using only what was known in October 2025: the projections lined up well with how teams actually finished (a 0.83 correlation with their final ratings), and the average miss on a team's net rating was about 5 points per 100 possessions. The preseason rating doesn't disappear once games start, either. It counts as about four games' worth of evidence and fades out as the real results pile up, so a fluky first week won't send anyone flying up or down the rankings.

<figure style="text-align:center">
  <img src="posts/preseason_players.png" alt="Top 10 players in the preseason projections" width="700">
  <figcaption style="color:#8b949e; font-size:0.98em; margin-top:0.1em;">
    My top 10 players heading into the season, led by Michigan State's Jeremy Fears Jr.
  </figcaption>
</figure>

A note on rosters: projections are only as good as the rosters behind them. Some teams' official rosters are still catching up with the portal, and those are marked *roster not updated*. I'll re-run as the season begins and random judges continue determining eligibility.


## Game predictions and a tracker to keep me honest

- Every game now has a **projected score and win probability**. You'll see them on team pages, in **Game Results**, and on the welcome page's Biggest Games.
- When I backtested this on the last two seasons, it picked the winner about 72% of the time and missed the final margin by about 9 points on average, roughly in line with the Vegas closing spread.
- New page: **Game Results → Prediction Tracker**. Every prediction is **locked at tip-off**, so if I have a team winning by 10 and they win by 40, I don't get to quietly update the prediction afterward. It tracks winners picked, how far off the scores were, whether my win probabilities are honest (do my 70% favorites actually win 70% of the time?), and how I'm doing against the spread and over/unders. You can filter by conference or team to see who I have figured out and who keeps burning me.
- **Today's picks** sit at the top of the tracker, with my projected spread and total next to the betting line, plus a flag when I disagree with the market by 4+ points. **These aren't betting picks!** The market is really, really good, and being even with it is the goal. But it'll be fun to watch.


## Bracketology

- In February I said we definitely DO NOT need to expand to more than 68 teams. Well. **The field is now 76 teams**, so the bracket has 12 play-in games: 6 between the lowest automatic qualifiers and 6 between the last at-large teams in.

<figure style="text-align:center">
  <img src="posts/bracket_preseason.png" alt="Preseason projected 76-team bracket" width="800">
  <figcaption style="color:#8b949e; font-size:0.98em; margin-top:0.1em;">
    The preseason projected field: 76 teams, with the 24 play-in teams marked PI
  </figcaption>
</figure>

- My selection score (SLCT) is now fit to the actual committee decisions from the last three seasons. Tested on seasons it wasn't fit to, it correctly picked 106 of 114 at-large teams.
- **My Bracket now projects to Selection Sunday.** Last year the bracket was "if the season ended today", which gets weird in November when a team is 3-0 against nobody. Now each team's résumé is projected to the end of the season by playing out the rest of their schedule with my game predictions. There's a toggle if you still want the "if the season ended today" version. In backtests, the projected bracket picked more of the eventual field in December and January and seeded it better all season.
- Remember those seed odds and "what if they lose two more games" tweets? They're on the site now and update daily. **Seed Odds** simulates the rest of the season 10,000 times for every team.
- **Team Page → Resume Simulator** lets you click W or L on any upcoming game and watch a team's tournament odds and projected seed change. It also knows the difference between a bad loss and a good one: losing to the best team on your schedule barely moves the needle, but losing to the worst one *really* does.
- **Bubble Watch** now includes a projected WAB column, so you can see who has a soft finishing stretch and who doesn't.


## Odds and ends

- **Box scores** for every game, with a win probability chart showing how the game swung.
- **Past seasons:** most pages have a season dropdown, so you can go back and browse team pages and results all the way to 2021-22, and player ratings back to 2023-24.
- **Biggest Upsets** is now measured against the locked pre-game prediction, so an upset is judged by what was expected *before* the game, not after.


That's it for now! The season tips off November 1st (Villanova and Notre Dame in Rome, of all places), and everything will start filling in with real results from there. As always, if you have feature requests or spot something that looks off, give me a shout on [Twitter](https://x.com/GrantleyCBB). (Still not calling it X.)
