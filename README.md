# Advent of code 2022

My code solutions for Advent of Code 2022. SPOILERS!

https://adventofcode.com/2022

Node setup from - https://github.com/colt/express-ts

## Aim

Advent of code releases a new coding problem to solve everyday during December. It gives you points based on how quickly you solve the problem after it is released.

I don't care about that.

I'm aiming to improve my code quality, problem solving skills and readability. For me, I would consider it a failure if the way I solve the problem is not easily understandable to another developer.

As a caveat I do know that there are two parts to each question and so not thinking about scalability from the first part can make the second part more difficult/need a complete rewrite

I also use github copilot but for these challenges I turned it off.

![r_1934712_e9JRV](https://user-images.githubusercontent.com/14803518/205957807-16ef2491-75ca-43b2-9fa0-47330840ecf2.jpg)

## Process Dairy

Setup node with typescript and make a readable output or something. This was way more annoying then the day 1 problem tbh

Day One ###

1. Looking at the data, it looks like splitting it into a useable format is the best bet. Something like grouping the groups into its own array.
2. With some anticipation for part two, decided to reorganize the data into an array of objects, where each object is an Elf which has 3 properties of Elf number, food array, and the total calories of that Elf's stack
3. Make array of all the totals, and output the highest.

4. Very happy with my converted JSON, as this allowed me to get the top 3 results quite easily. Using the new JSON array of objects, sort it by highest totals. Then get the top 3 and return the sum.
