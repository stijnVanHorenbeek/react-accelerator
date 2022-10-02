To start the exercise, checkout branch ch00 and follow along with the ch00.md in the exercises folder. When we move on to the next chapter, you can keep working from your solution, or if you'd like to catch up you can checkout the next chapter branch as a new starting point.

If you want to keep working on your own solution: you can get the exercise code from another branch into yours with the `git restore` git command (or the old version: `git checkout`)

for example: to get the exercise from chapter 2 into your branch (the branches,chapters and the exercises have the same name)
`git restore --source ch02 -- exercises/ch02.md`

For the inquisitive readers: the -- tells git restore to stop interpreting any more arguments as options. This allows us to give the filename of the file we need.
