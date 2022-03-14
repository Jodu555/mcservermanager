# mcservermanager

A npm api to manage the Minecraft Server Process and handle all kinds of stuff with it

## Think of a way to select a version

The Problem their is that for spigot-1.8.8 is another Java Version then for 1.18 for example
So i have to think about a sdk manager like **sdkman** or **Jabba** later i could implement
support for both of them!

## Ideas

- [ ] Make an seperated versions folder so the the program dont have to download the versions over and over

## Error Solutions

- The Interactive Shell Problem:
  As I figured out the way sdkman works is over the .bashrc file which can proviced shortcuts and more
  BUT in a normal nodejs child-process these shell shortcuts ar not activated (idk why)!
  This applies also to .sh Scripts for example their the fix is to add this as shebang:
  `#!/bin/bash -i` the tag i stands for Interactive and then you can use them also in .sh files
  For nodejs the fix is similar `child_process.spawn('bash', ['-i'])` I added the i flag!
  Hope this explanation helps a bit!
  My Research Sources for this problem:
  - https://unix.stackexchange.com/questions/1496/why-doesnt-my-bash-script-recognize-aliases
  - https://stackoverflow.com/questions/27458502/how-to-run-interactive-shell-command-inside-node-js
