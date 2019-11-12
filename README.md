# DIBNovember2019

This repository represents my code for the November 2019 r/dataisbeautiful data viz contest.

## Background
After my last entry back in March, I was really wanting to learn more about making interactive data visualizations, and, 
specifically, I wanted to learn to use D3. Over the past several months (when the baby would allow) I've devoted a lot of
time to learning HTML, CSS, Javascript and D3. What is presented here is my first use of d3 outside of the various training modules
I've been working with. If you see any ways in which I can improve (of which I'm sure there are innumerable), I would love to hear
any and all suggestions!

## November Contest Link

[A link to the contest post](https://www.reddit.com/r/dataisbeautiful/comments/drgz68/battle_dataviz_battle_for_the_month_of_november/)

## Dataset

The dataset for this month's contest comes from the [World Cube Association](https://www.worldcubeassociation.org/results/misc/export.html)

## Data Wrangling

The first thing I needed to do was figure out what I could even do with this data. There is an amazing amount of it, and I didn't feel
quite ready to tackle the entire world. Luckily, I had just completed the chapter in 
[Interactive Data Visualization for the Web](https://alignedleft.com/work/d3-book) concerning geomapping and it promised to be both
and interesting way to present a subset of the data, while also allowing me to build off of examples that I had been working through
in the book (I wasn't quite ready to release the training wheels!). 

Having chosen to make an interactive choropleth, I decided to limit the scope of the visualization to
just competitions in the United States, and, further, to only 3x3 cube events.

In the "rCode" folder you can find my code (data_wrangle.R) that was used to generate the JSON dataset (www/data/us_avg_best.json). The code references only two files from the WCA data (not included in this repository, sorry!). They are the competitions dataset (WCA_export_Competitions.tsv) and the results dataset (WCA_export_Results.tsv).

There were two issues that I encounted while messing with the data.

1. When specifying encoding, R prefers the use of the "encoding" option instead of the "fileEncoding". Not 100% sure why.
2. The competitions file contained double quotes, which R, by default, tries to use to determine variables. I had to use the quote="" option to have R ignore those.

## Creating the visualization

Like I said, I specifically chose to do a Choropleth because I had just done an example of one and felt like it would be a good continuation. I further wanted to mess around with various interactive elements. If you've read Interactive Data Visualization for the Web, you'll probably recognize several places where I used examples from the book and updated to suit the needs of the visualization.

## Acknowledgements

1. [Interactive Data Visualization for the Web](https://alignedleft.com/work/d3-book): If you can't tell, I really loved this book. It is extremely well written and has great examples to follow along with.
2. [Codecademy](https://www.codecademy.com/): I'm deep into the Web Development track and owe it a lot, especially in teaching me how Javascript, HTML, and CSS work together to create interactivity. 
