# Advent of code 2022

My code solutions for Advent of Code 2022. SPOILERS!

https://adventofcode.com/2022

Node setup from - https://github.com/colt/express-ts

## Aim & Focus

Advent of code releases a new coding problem to solve everyday during December. It gives you points based on how quickly you solve the problem after it is released.

I don't care about that.

I'm aiming to improve my code quality, problem solving skills and readability. For me, I would consider it a failure if the way I solve the problem is not easily understandable to another developer.

As a caveat I do know that there are two parts to each question and so not thinking about scalability from the first part can make the second part more difficult/need a complete rewrite

I also use github copilot but for these challenges I turned it off.

![r_1934712_e9JRV](https://user-images.githubusercontent.com/14803518/205957807-16ef2491-75ca-43b2-9fa0-47330840ecf2.jpg)

## Process Dairy

### Day One - Calorie Counting

Setup project with node and typescript and make a readable output. This was way more annoying then the day 1 problem tbh as I wanted hot reloading but in the end gave up on that as it was taking too long.

1. Looking at the data, it looks like splitting it into a useable format is the best bet. Something like grouping the groups into its own array.
2. With some anticipation for part two, decided to reorganize the data into an array of objects, where each object is an Elf which has 3 properties of Elf number, food array, and the total calories of that Elf's stack
3. Make array of all the totals, and output the highest.

#### (Part 2)

4.  Very happy with my converted JSON, as this allowed me to get the top 3 results quite easily. Using the new JSON array of objects, sort it by highest totals. Then get the top 3 and return the sum.

### Day Two - Rucksack Reorganization

1. Put into JSON format! Array of objects (rucksacks) with `compartment one` and `compartment two` which are the strings split up equally
2. Create a points mapper for the duplicate letters (gift item)
3. Map through the rucksacks and get the duplicate letters in both containers, translate them into points and then sum them up
