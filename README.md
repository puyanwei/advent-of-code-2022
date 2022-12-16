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

## Dairy (Probs wont make sense to anyone else this is just me recording my thoughts and process)

### Day One - Calorie Counting

Setup project with node and typescript and make a readable output. This was way more annoying then the day 1 problem tbh as I wanted hot reloading but in the end gave up on that as it was taking too long.

1. Looking at the data, it looks like splitting it into a useable format is the best bet. Something like grouping the groups into its own array.
2. With some anticipation for part two, decided to reorganize the data into an array of objects, where each object is an Elf which has 3 properties of Elf number, food array, and the total calories of that Elf's stack
3. Make array of all the totals, and output the highest.

#### Part 2

4.  Very happy with my converted JSON, as this allowed me to get the top 3 results quite easily. Using the new JSON array of objects, sort it by highest totals. Then get the top 3 and return the sum.

### Day Two - Rock, Paper, Scissors

<img width="1015" alt="image" src="https://user-images.githubusercontent.com/14803518/206601949-df8cee8e-b2c4-4732-a37f-2abfafac7b7f.png">

2. In anticipating part 2, although I can just map the points out, I predict it will be better to create my own array of objects, where each object is a match, and has opponent choice, my choice, score
3. Loop through object's scores and sum them up

#### Part 2

4. X = lose, Y = draw, Z = win
5. I think I can refactor existing function to switch round the ordering of the calculations and sum up the scores again
6. Forgot that the mapping of the scores are different now that your own outcome is different to part 1. So will need to remap this and recalculate the scores.

### Day Three - Rucksack Reorganization

Opps I missed day two lol! I did this before the day 2 challenge...

1. Put into JSON format! Array of objects (rucksacks) with `compartment one` and `compartment two` which are the strings split up equally
2. Create a points mapper for the duplicate letters (gift item)
3. Map through the rucksacks and get the duplicate letters in both containers, translate them into points and then sum them up
4. Decided to add a key/value pair of `duplicateLetter` to the object so I don't have to re-loop through the array again.
5. Also added tests for the letter duplicate function for confidence. It is helpful for debugging and refactoring. I will add tests when I think its helpful (more complex functions where things could break if other parts of the code are changed)

#### Part 2

6. Write a function based off checkDuplicateLetter() which checks 3 words instead of 2 for duplicate letters
7. Make a new object which groups 3 rucksacks together and use the function in (6) to check the duplicate letter. This function was a bit tough so I wrote some tests for it. In the end I used the same function which compared two words, and added a third which compared that to the result of the two words.
8. With an array of the letters, convert the numbers and sum them up
9. ~~Refactored with a different method, combine all words together and just check for duplicates as one combined string~~ This doesn't work due to the fact that some words are going to have duplicate letters in them therefore skewing the results (Kinda went on tangent here but then went back to (7))

### Day Four - Camp Cleanup

1. Write out a test using the example.
2. As per usual, gonna reformat the data into JSON object as it has served me well for part 2s.
3. Each object is an assigned cleanup team, inside that there will be `firstSection`, `secondSection`, and a boolean `isOverlapping`
4. The sections will be mapped into another object based on a text split. The overlap calculation will be checking if the starting number is larger than the starting number of the second section, as well as the ending number being larger than the second section, if both are true, it should be overlapping

This went pretty straightforward but I had overlooked 3 things:

1. Numbers being the same counting as one section, eg 1-1 is section 1. Resolved by checking if they're the same and the checking it against the highest number
2. Not realising that same numbers count as being within another section. Solved by using >= or <= instead
3. That it didn't matter which section contained the other, it can go either way!

#### Part 2

4. Should be easy enough to modify the existing function to say if any number's range includes another then its an overlap
5. Oh how wrong I was!! Was very confusing due to the extra possiblities that can occur. Was very confusing, really needed tests to help me do this step by step.

### Day Five - Supply Stacks

1. This task comprises of a lot of stacks (arrays) where elements are moving in and out of each other.
2. Modify the current object into JSON format so that its workable with. What I'm thinking of is to have an object with 9 key value pairs, where all of those represent a stack and has a value of an array. So it will be an object with 9 arrays.
3. With tests, code out a function which takes in a command, the starting stack and the target stack. Might need to abstract out another function which translates the text commands. Note the order of the stacks, it might need reversing of the number of elements that get moved.
4. Collect up the crate letters on top of the stacks for the answer.

Was pretty straightforward until getting the final answer. I had the wrong starting example and also forgot use the whole dataset! I had shorted the original data set for testing and have it so it didn't show a crazy amount of logs in the console.

#### Part 2

5. The payoff to my elaberate JSON formatting code? Should just need to take out the reverse() in my moveCrate function!

Added an optional boolean to the `moveStacks()` function, as well as some tests as this didn't work correctly. In the end this was due to my initial stacks array's reference getting mixed up with part 1's calculations.

I attempted to use the newly added `structuredClone` to clone the object, but this is only available in node v17, and I am not sure how I can enforce this version with this project. So in the end I just made an actual copy for the 2nd part to reference.

### Day Six - Tuning Trouble

1. Explore with Sets and strings, wondering if they work without being in an array like normal arrays? Sets are good to use as a comparison as they don't repeat elements. Also explore `includes` for strings, might be better then using a ===
2. Need a way of looping through the long input string which only takes a string of four letters. Each move should push out the last letter and add in the first letter. Possible recursion?
3. Write tests to help with visibility in writing this function. Doesn't look like I'm going to reformat the data into a JSON object this time!

#### Part 2

4. Due to the code being split out into smaller functions, I generalised the function to take in a length word to adjust for part 2, wrote some extra tests and made sure they passed. Did make a bit of a tangent today so brought it back to the part 1 commit. Got it working then refactored.

### Day 7 - No Space Left On Devie

1. In solving the problem as fast as possible, I would assume that we would want to keep track of the `cd` commands to see how deep into the file system we are, and sum up the numbers there. However with the anticipation of part 2, I would like to put the data into JSON format so that its flexible to use for it.
2. Write up the interface for the object. This should be a tree style recursive object, with nodes and children (which contains more nodes). There should be a `file` interface which contains information about the files that are not nodes.
3. Using the example, write a test for the expected object.
4. Once the object is completed, use a loop/recursion to sum up the sizes of all directories
5. Sum up the sizes of all the directories that are under 100k for the answer

Ended up creating an extra object before resolving the main file tree object. This first object splits the commands into an array of command objects, which puts the listing files into one object so that it can be used later.

I am for sure taking longer on this due to my curiosity on how a file tree could be organised and coded. In hignsight I should have added tests for this first commands object like I have for the main file tree one.

STARTED AGAIN!! Really went down a deep dark rabbit hole there...

TIL - There's no in built method which combines `.filter` (returns elements forfilling condition) and `.map` (returns what you want per element). So for now, use them chained up! Filter first then mapping is cleaner!

Q1. How can we calculate the total size of a directory if it contains other directories when their totals haven't been calculated yet, as that is included in the final sum calculation?

A1. Could add levels, and sort by that, but need a parent reference too. Then should be able to update bottom up. However, would the state be affected by this live updating during the loop? Might cause some state issues?
A2. Could start at the top and keep drilling down each level until it forfills a directory total, then once done move back upwards. Same state problem might happen tho, could just stop the loop once it forfills a total and rerun it...
