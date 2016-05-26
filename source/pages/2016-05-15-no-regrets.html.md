---
title: No Regrets
date: 2016-05-15 07:37 UTC
tags:
---

# No Regrets
<div class='right-align'>
  <small class='js-reading-time'></small>
</div>

> “Life can only be understood backwards; but it must be lived forwards.” - Søren Kierkegaard

## Self-Loathe
Imagine yourself maintaining an old application to investigate a bug or to do some refactoring. While surfing through the code, you encounter a module that is very hard to read, has logic with interweaving behaviour, and even five-screen-long functions. Because of this, you start getting mad at the programmer who wrote this arcane syntax.

“Who even thinks like this?”, you tell yourself.

“This is a complete disregard for the other programmers!”

You then check in `git` who in the nine circles of hell committed this monstrosity. The one who violated the sanctity of your art and craftsmanship. Your tormentor.

And then you see, next to the commit hash, the perpetrator’s name and email along with the date. You almost faint as you discover that it’s yours all along! From two years ago!

“I hate that guy”, you mutter under your breath as you concede to the fact that you were an idiot.

I have experienced this more times than I care to admit, especially with seeing code made from where I was just starting out. But, as stupid as they may look, they serve as a good learning tool. As embarrassing as it is for me, I'm going to share some of those terribly written code so that we may learn from them (and you from yours --- unless of course you always write perfect code).


## I’m a Professional! I think.

(Note: this section contains snippets from Rails and ReactJS applications I worked in.)

1.

~~~ ruby

properties *( Date::ABBR_DAYNAMES.map { |day| day.downcase.to_sym } )
~~~

I remember writing this code and claiming it as the sexiest use of ruby statement yet! I took advantage of ruby’s splat operator coupled with some `Enumerable` magic to pass as arguments to `properties` (from [reform](https://github.com/apotonick/reform) gem). Looking back at this snippet, it doesn’t seem as beautiful as I thought it was. It’s frustratingly unreadable! Donald Knuth once said that programming is not telling the computer how to do something, it’s telling someone else how they would instruct the computer to do something. This mess clearly violates that.

If I were to refactor this, I would instead loop through the days and call the singular method `property` for each of the days. It would be longer, but a lot more readable.

2.

~~~ ruby

self.model.errors.each do |h, k|
  . . .
end
~~~

At first glance, there seems to be nothing wrong with with this code. It looks like an ordinary ruby block that iterates through a hash. But what if I put inside the block a complex set of logical statements that use the two local block variables `h` and `k`. Would you still be able to read it effectively? Probably. But imagine how easier it would be if we just use a more explicit naming convention like `attribute` for `h` and `error` for `k`. The logical statements in the block would read more smoothly like it’s written in the english language. Surely, the future maintainers of this code will build a shrine in your name if you do that.

3.

~~~ ruby

def validate_party_size slot
  slots = slot.slot_assignments
  . . .
end
~~~

For context, the Rails application where this example is from uses a `Slot` model that has many `SlotAssignments`. From there, you could probably see now where this code fails. I recall writing this code thinking that it’s probably readable enough. Spoiler alert! It’s not. If you look at the method, we use a variable named `slot` (that contains a `Slot`) and another variable named `slots` (that contains `SlotAssignments`). It’s a short and easy name to write, but unnecessarily ambiguous because below the assignment are complex statements that use them both. Months later after writing this snippet, I mistakenly acted upon the variable `slots` as if it was an instance of a `Slot` when, apparently, it isn't.

The obvious and simple fix here is to use the name `slot_assignments` instead of just `slots`.

4.

~~~ scss

.flex.nav {
  > * {
    width: 16.66% !important;
  }

  > .large {
    width: 33.33% !important;
  }

  > .small {
    width: 10% !important;
  }
}
~~~

One of the hardest things that I did when I started learning web development is writing clean CSS. At that time, it seemed to me that there are many ways to style an element. If you want to position an element, you could use `position`, `flex`, negative margins, or even some hack-ish padding. You could pair that with the fact that there are many ways to write CSS. So, when I was starting out, I probably wrote the worst CSS in existence. Much to my chagrin, this is one example.

There are many things wrong in this snippet. From the top, I specifically included `flex` in the rule without actually using any flex properties inside the block. This rule would stop working if ever I decide to stop using `flex` and would be considered as tedious change because of unnecessary coupling.

Another mistake is using `*`. I basically created a default style that every child of `nav` would be forced to follow. If I decide to add a different rule from the wildcard, I would have to add another class, defeating its purpose. Also, using `*` is generally [slow](http://www.stevesouders.com/blog/2009/06/18/simplifying-css-selectors/). A good alternative to this is to create another class `nav-item` for each child to have. If I would have to add a child to `nav` with no styling, I will simply just omit the `nav-item` class.

And lastly, the unnecessary use of `!important`. This can generally be avoided by proper use of CSS [specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity).

5.

~~~

render: function(){
  return (
    <div className='mdl-cell mdl-cell--12-col'>
      <table className='mdl-data-table'>
        <thead>
          <tr>
            <th>
              Import CSV
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <form>
                <input name='cards-file' type='file' ref='fileInput' />
                <a href='#' onClick={this._handleSubmit}>Submit</a>
              </form>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
~~~

This snippet is from a ReactJS application that I helped develop. It uses JSX in its components which, in my opinion, looks ugly and out place. Though I think we can all agree that it works well with ReactJS and is a necessary evil. Sadly, this enabled me to create this monolithic chunk of disaster waiting to happen.

If we’re talking about pure HTML, then there’s nothing wrong with this. HTML promotes this kind of horrific indentation. But this is not HTML. The whole weight of the component seems to be resting solely in its `render` function. What if I later decide to add more columns, or more rows? What if I want to dynamically add the table data instead? What if, among all the rows of table data, I want to edit a single cell? This code will quickly go from 0 to 100 and will rapidly become unreadable and unmaintainable.

One way to fix this is to refactor the headers and the table body off the `render` function to their own corresponding functions (ex. `_tableHeader` and `_tableBody`). Then you simply call those functions in `render`. This way, if you ever have changes in the table header or in the table body, you would only have to change their respective functions and `render` will remain untouched.

6+.

I have encountered many more obvious past blunders such as methods that return `nil`, obese MVC models, and multi-lined ternary operators that I'll save you from in the interest of brevity.

## You should go and love yourself
I hated my old code and the coder who wrote them for giving me troubles in the present. But the hate I feel has a deeper meaning than just being pure loathe. This hate means that I acknowledged my past mistakes. This hate signifies that I have learned from these errors to avoid making them. This hate implies that I’m better than I was before. So ironically, this hate symbolizes love. Love for myself for improving. Love for myself today for being better than I was yesterday. And ultimately, love for myself for being one step closer to being a master of this craft.

I've learned not to be too hard on myself and accepted that making mistakes is part of being human. Nobody is perfect. Besides, your past self made mistakes so that your future self won't make them!

I guess the takeaway from all of this is that, as cliche as it sounds, we shouldn’t be embarrassed by our mistakes. Instead, we should learn from them! As disciples of self-improvement, we must not stop learning so we can be the best we can be.

<div class='right-align'>
  <div class='qed-box' data-target='#final-note'></div>
</div>

<p id='final-note' class='hidden'>
  It should be noted that when writing this article, I was in permanent cringe. This is my programming version of /r/blunderyears.
</p>
