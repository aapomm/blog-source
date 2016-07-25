---
title: Slack-ing Off
date: 2016-07-25 07:22 UTC
tags:
---

# Slack-ing Off
<div class='right-align'>
  <small class='js-reading-time'></small>
</div>

> “We are here on Earth to fart around, and don't let anybody tell you different.” - Kurt Vonnegut


# Hello! Goodbye!

Messaging applications have become increasingly popular lately, one of which is **Slack**, our office's messenger of choice. On the outside, Slack just seems like a normal chat platform with channels and groups with a design tinged with a dash of hipster. But what I like about it most, on the inside, is an extensible [API](https://api.slack.com/) used for making your own chat bot or Slack integration.

What follows in this article are the integrations that I made on the Slack platform using the API. As an engineer, I noticed some problems that my coworkers have been facing so I made the solutions in Slack that they can easily use. I try to make the world a better place, you know? (Not really, I just a had a lot of spare time to goof around at one point).


# magic-conch
  `the-magic-conch` arose from our (my colleagues and I) daily dilemma of choosing a place to eat an afternoon snack. I decided to create this integration after getting sick of eating the **Chicken Cheese Dog** of Family Mart as the default go-to food when our indecision fail us. `the-magic-conch` is an integration that **randomly selects a restaurant from a list that the whole team can manage**.

  I decided to craft this integration’s server using **Rails API**, which is pretty much Ruby on Rails without the views. The implementation is relatively simple: an `Eat` model to handle the choices and an `Eat` controller to facilitate the CRUD actions for managing the choices. Thinking I would hook it up to Slack with CRUD commands (and to keep it clean), I used the [Factory Pattern](https://en.wikipedia.org/wiki/Factory_method_pattern) to split up the logic for the different command behaviors. Then, I deployed the finished server to **Heroku**.

  After testing it with Slack, I noticed a big problem. Because I used the free tier in Heroku, the server **sleeps when it hasn’t received a request for 30 minutes**. So when someone uses the integration when the server is in slumber, the “boot-up” time delays the reply and causes Slack to issue an error. The obvious solution would be to upgrade the server’s tier. But since this is just a hobby project, it will not get used enough to warrant an upgrade. However, the downside to free tier servers is that they are [forced to sleep 6 hours everyday regardless of the frequency of its received requests](https://devcenter.heroku.com/articles/free-dyno-hours#quota). Another suggested solution is to use a New Relic plugin and configure it to track the status of the server. That way, the plugin’s constant checkup of the server would keep it awake. Unfortunately, I wasn’t able to make it work. The solution that I settled with is to use [Kaffeine](http://kaffeine.herokuapp.com/). When you register your Heroku app to Kaffeine, it pings it at 30 minute intervals to keep it awake. It also keeps into account the forced 6 hour sleeping time!

  After showing it to my co-workers, we religiously followed its suggestions for a few days until deciding that we don’t really want a randomly decided restaurant. We already ate at Jollibee twice this week! So for future improvements, I could add weights to each of the restaurants and maybe sprinkle some machine learning in there to improve the suggestions.

  You can see `the-magic-conch` source code [here](https://github.com/aapomm/the-magic-conch)!

# song-please
  `song-please` is a Slack integration that **figures out the song title and artist given the lyrics**. This idea originated from all the days I got the last song syndrome from listening to the catchy, mainstream songs played in the office (thanks Don). As someone who lives under a rock, I have no clue what the title of the songs are and who sang them. I just want to find out so I can update my favorite playlist in Spotify and the setlist in my shower concerts. And thus, the `song-please` integration was born.

  A few months before, I found a [Python script](https://github.com/yask123/Instant-Music-Downloader) that automatically downloads a song given the song’s lyrics. I found out (using my meager Python literacy) that it simply queries off of Youtube. Using that logic (thanks to [@yask123](https://github.com/yask123)), I decided use that method and integrate it to Slack.

  I chose to use **Sinatra** for the server since I wanted it to be simple, light and I wanted to learn it. Then, to do the Youtube query, I simply used the [API](https://developers.google.com/youtube/) provided by Google. This involved mundane steps such as applying your application to Google Developers to get your **Developer’s Key**, but fortunately, the implementation was fairly straightforward. Next, after manual endpoint testing with **Postman**, I deployed it to **Heroku**. And finally, to make it all work, I just hooked-up the server’s endpoint to a **slash command** in Slack (`/songpls`).

  Like the other one, I encountered a major problem. To better illustrate it, I should tell you that the main flow of the integration goes like this:

  1. Slack sends out a payload to my server endpoint
  1. My server queries from the Youtube API
  1. The API sends back the needed data.
  1. And my server sends it back to Slack as a reply.

  Talking with the Youtube API (Step 2) takes a while that it delays the integration’s reply to Slack. Because of that, Slack issues an error to the user.

  I fixed the issue by **delegating the Youtube API query task to a thread**. This way, the whole process of talking to the third party service is done in the background. This allows the server to return a reply to Slack so that it won’t have to wait.

  If you’re interested, you can see the code [here](https://github.com/aapomm/song-please)!

# ---

  And there you have it! I had fun tinkering with the Slack API and making integrations for it. It was a great learning experience. I want to make more in the future so I’ll try to keep my eye out on more problems that need solving (or more parts of the world that need some better-ing). It just might be the next big thing.

  [insert cool outro music here]

<div class='right-align'>
  <div class='qed-box' data-target='#final-note'></div>
</div>

<p id='final-note' class='hidden'>
  /songpls You and me got a whole lot of history
</p>
