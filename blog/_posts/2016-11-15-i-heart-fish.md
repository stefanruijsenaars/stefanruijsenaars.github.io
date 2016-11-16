---
layout: post
comments: true
title: I ❤️ fish 
---

After learning that a good friend would "rather go to prison than use bash", I decided to finally give fish a try.

{% twitter https://twitter.com/damiankloip/status/720967983926009856 %}

Fish, as in [fish](https://fishshell.com), his preferred shell :)

Most of my developer friends use bash (some of the more hardcore ones use zsh), and personally I have been using bash almost every day since I was 13. I have grown very fond of it since, as besides my browser, it's probably the place I spend the most time in. But having used fish for a few months as my default shell, I am now a convert, and likely will remain one.

Fish comes with a whole bunch of goodies. While most of them are possible in bash as well, with fish they all work out of the box, with no configuration needed.

To me, the killer ones are the **autosuggestions** and the **tab completion**. Fish suggests commands in a very smart way, based on your history, previous completion picks, and valid file paths (including [implicit cd](https://github.com/fish-shell/fish-shell/issues/22)). As you type a command, you'll see the suggestion right after the cursor, in gray. To accept, you only need to press right arrow. Fish will also make a great guess whenever you press tab. If there is more than one completion, you can tab through all the possible ones. And when you do it for a command line option, it integrates with the man pages, showing all the available options, and does lots and lots of general purpose and program-specific [completions](http://fishshell.com/docs/current/index.html#completion) (git, mount, ssh, su, ...).

Further awesome features include:

- No hidden settings, all the special features are on by default
- Very fancy colors (256 of them), which truly offer extra visual feedback
- Loooong command history (!)
- Skips duplicates in your history
- For partial commands, the up arrow shows matching commands from your history only
- Wildcards
- A web based configuration interface
- It's *fast*
- A fantastic [design document](http://fishshell.com/docs/current/design.html) outlining their design philosophy (the "Configurability is the root of all evil" one had me wildly nodding my head)
- Backward history search (similar to ctrl+r in bash) using [re-search](https://github.com/jbonjean/re-search)

[Oh my fish](https://github.com/oh-my-fish/oh-my-fish) is also a very cool framework for the fish shell, adding such things as git integration (showing your current branch/git status), fancy themes, and the [z](https://github.com/rupa/z) plugin, a fantastic tool allowing you to navigate to your most used directories using fuzzy commands.

Overall this shell is just "the next level of convenience" (also © [Daniel Wehner](https://twitter.com/da_wehner/status/598589852888801282), and a true pleasure to use. It's here to stay for me, and I strongly encourage you to give it a try as well, so [install it now!](https://fishshell.com/#platform_tabs)

Just a note: this is not a POSIX shell -- you may need to run things with `bash -c` or use tools like [bass](https://github.com/edc/bass). Fish also comes with its own scripting language, I haven't bothered to look into it yet -- I still do my scripting in bash.
