# Advent of code 2022

My code solutions for Advent of Code 2022. WATCH OUT, SPOILERS!

https://adventofcode.com/2022

Node with Typescript setup from - https://github.com/colt/express-ts

## Aim & Focus

Advent of code releases a new coding problem to solve everyday during December. It gives you points based on how quickly you solve the problem after it is released.

I don't care about that.

I'm aiming to improve my code quality, problem solving skills and readability. For me, I would consider it a failure if the way I solve the problem is not easily understandable to another developer.

As a caveat I do know that there are two parts to each question and so not thinking about scalability from the first part can make the second part more difficult/need a complete rewrite

I also use github copilot but for these challenges I turned it off.

![r_1934712_e9JRV](https://user-images.githubusercontent.com/14803518/205957807-16ef2491-75ca-43b2-9fa0-47330840ecf2.jpg)

## Installation

```
git clone https://github.com/puyanwei/advent-of-code-2022.git
cd advent-of-code-2022
npm install
```

Type `npm start` to run node on the code for the answers
Type `npm test` to run the jest tests

## Dairy

### Day One - Calorie Counting

Setup project with node and typescript and make a readable output. This was way more annoying then the day 1 problem tbh as I wanted hot reloading but in the end gave up on that as it was taking too long.

1. Looking at the data, it looks like splitting it into a useable format is the best bet. Something like grouping the groups into its own array.
2. With some anticipation for part two, decided to reorganize the data into an array of objects, where each object is an Elf which has 3 properties of Elf number, food array, and the total calories of that Elf's stack
3. Make array of all the totals, and output the highest.

#### (Part 2)

4.  Very happy with my converted JSON, as this allowed me to get the top 3 results quite easily. Using the new JSON array of objects, sort it by highest totals. Then get the top 3 and return the sum.

### Day Three - Rucksack Reorganization

Opps I missed day two lol!

1. Put into JSON format! Array of objects (rucksacks) with `compartment one` and `compartment two` which are the strings split up equally
2. Create a points mapper for the duplicate letters (gift item)
3. Map through the rucksacks and get the duplicate letters in both containers, translate them into points and then sum them up
4. Decided to add a key/value pair of `duplicateLetter` to the object so I don't have to re-loop through the array again.
5. Also added tests for the letter duplicate function for confidence. It is helpful for debugging and refactoring. I will add tests when I think its helpful (more complex functions where things could break if other parts of the code are changed)

#### (Part 2)

6. Write a function based off checkDuplicateLetter() which checks 3 words instead of 2 for duplicate letters
7. Make a new object which groups 3 rucksacks together and use the function in (6) to check the duplicate letter. This function was a bit tough so I wrote some tests for it. In the end I used the same function which compared two words, and added a third which compared that to the result of the two words.
8. With an array of the letters, convert the numbers and sum them up
9. ~~Refactored with a different method, combine all words together and just check for duplicates as one combined string~~ This doesn't work due to the fact that some words are going to have duplicate letters in them therefore skewing the results (Kinda went on tangent here but then went back to (7))

### Day Two - Rock, Paper, Scissors

1. Work out points - Rock (A/X) is 1, Paper (B/Y) is 2, Scissors (C/Z) is 3. Win = 6, Draw = 3, Lose = 0
   All combos - My choice is 2nd
   A X ROCK/ROCK DRAW 4pts
   B X PAPER/ROCK LOSE 1pts
   C X SCISSORS/ROCK WIN 7pts
   A Y ROCK/PAPER WIN 8pts
   B Y PAPER/PAPER DRAW 5pts
   C Y SCISSORS/PAPER LOSE 2pts
   A Z ROCK/SCISSORS LOSE 3pts
   B Z PAPER/SCISSORS WIN 9pts
   C Z SCISSORS/SCISSORS DRAW 6pts

   2. Anticipating part 2, although I can just map the points out, I predict it will be better to create my own array of objects, where each object is a match, and has opponent choice, my choice, score
   3. Loop through object's scores and sum them up
