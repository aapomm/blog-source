---
title: Log Surfing
date: 2016-06-29 06:35 UTC
tags:
---

# Log Surfing
<div class='right-align'>
  <small class='js-reading-time'></small>
</div>

> “`less` is more, but more `more` than `more` is, so `more` is less `less`, so use more `less` if you want less `more`."  — [Slackware Linux Essentials](http://www.slackbook.org/html/book.html)

## Sisyphean Task
One of the responsibilities in my line of work is managing a **production application**. From time to time, bugs are found in the app and it would be my job to find and fix it. There are scenarios when the bug is replicable in the local environment, an easy and simple task, but unfortunately, most of them are not. To find those bugs, I would have to scour through the *millions* of lines of logs to find out what went wrong (a task equivalent to finding an assassin in a haystack). Luckily, there are `Unix` tools to help me with this. Just as the Map and Boots help Dora reach her goal, these tools help me find the source of the problems. I would go over those tools and how and why I use them for this specific task.

<figure>
  <img src='/images/log-surfing/totally-kyle.png'></img>
  <div>
    <figcaption>
      I'd like to think that I'm as cool as this guy. (from The Amanda Show)
    </figcaption>
  </div>
</figure>

## Tail and Less
  There were times when I had to track the additions to a log file to know the real time changes and interactions with the application. In those situations I usually use the `tail -f` command. This command **actively follows the end of the file** and updates the screen as it goes. This is particularly useful when tracking the updates in the production logs as you play with the application. Unfortunately, due to its maturity, the application I manage has enough active users that it would be difficult to see the actual logs that I myself have caused.

  When investigating a bug, the more frequent scenario that I find myself in is looking through a log file for a specific day and exploring the part in which the bug occured. Sadly, opening a file with, on average, 2 million lines eat up the memory like a Chrome tab. This is where the `less` command comes in. The `less` command **opens and pages a file** in case it is too big for your screen. With this command, you can scroll through the file, view it at a specific line, show line numbers, or even edit it (I don’t recommend this, though). You can, if you want, open the file in the `vi` editor but for various reasons stated [here](https://news.ycombinator.com/item?id=9291405), some sysadmins prefer the `less` command.

## Grep
  I don’t have all the time in the world to sift through millions of lines of application logs, so I use the handy unix tool called `grep` to find what I’m looking for. The `grep` command simply **takes a pattern and searches a file or a list of files for that specific pattern** then outputs all the lines found to the standard output. Sometimes, by only using `grep` I am able to see the whole cause of the bug (the `-B` and `-A` options for `grep` to buffer the output lines really helps) but, it doesn’t happen all the time.

In a Rails application, I usually search for the whole **error message** for specific errors, `FATAL` in the case that it isn’t specific, or even attributes such as ID or email address of the culpable corrupted records. I pair this with the `-n` option to determine the specific line in the file, then I use `less +LINE_NUMBER` to open the file at that line number. From there, I investigate the logs and hopefully get an idea of what happened.

It is also important to note that `grep` allows for **regular expression pattern searches**. This allows us to flexibly search for terms that don’t have to be exact. I have used this a few times to search for Rails log patterns with an id of a record, without actually knowing the id.

<figure>
  <img src='https://upload.wikimedia.org/wikipedia/commons/8/8b/Climbing-wall.jpg'></img>
  <div>
    <figcaption>
      There's a grep joke in here somewhere. (From wikipedia)
    </figcaption>
  </div>
</figure>

## Sed
  The `grep` command doesn’t always give me a short, clean todo list. Sometimes, when my search pattern is too general, I get a lot of results that it would be unrealistic to tackle them all. To solve this, I had to find a way to somehow crop a section from the log file that is relevant to what I’m looking for and from there, `grep` my search pattern.

The command that would help me do this is `sed`, which is short for **stream editor**. `sed` simply **modifies an input and writes it to the standard output**. Think of it as a filter or a middleman that modifies the incoming data to your specific liking to the output.

`sed` has many [uses](http://www.grymoire.com/Unix/Sed.html), but for the purposes of log surfing, I use its ability to cut a file. Specifically, I use `sed` to **extract a certain range of lines** (usually around the time when the bug most likely occurred) from the log file. There are many ways to do this using `sed`, but for simplicity’s sake and without getting into too much detail I use:

~~~ bash

sed ‘<start_line>,<end_line>!d’ <file_name>
~~~

  From here, I could just simply pipe it to grep or to a new file for better flexibility.

## GoSURF

  That’s about it! If you’re like me, stuck with maintaining a production application and reading millions of lines of logs, I hope this short article has and will help you with that mundane endeavour! If you have any questions, corrections, or better log surfing suggestions, don’t hesitate to [hit me up](mailto:aaronpomanaloto@gmail.com).


<div class='right-align'>
  <div class='qed-box' data-target='#final-note'></div>
</div>

<p id='final-note' class='hidden'>
  I hope this helped you sleep like a log. Heh. Heh
</p>
