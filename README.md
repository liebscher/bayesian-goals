# Bayesian Goals

This is a compact web app that helps users **set achievable reading goals** using their past history of reading. **A realistic reading goal should be specific, measurable, attainable, and time-bound**. The backbone of the calculations is the assumption that we can model reading paces in pages per day and hours per day, and both are normally distributed (yes, a strong assumption), thus allowing us to compute a Bayesian posterior distribution by updating the prior with a personal reading history.

If a user wants to read 30 minutes a day, everyday for the next month, there's some probability they will reach this goal: roughly 40% probability, since the average American reads about 10 minutes per day, plus or minus a bit (From the [Bureau of Labor Statistics](https://www.bls.gov/news.release/atus.nr0.htm)). Yet, if over the past two days the user has read 60 minutes each day, intuitively the probability that they meet their 30 minute goal should increase. Now, we estimate there is an 80% probability the user will their goal. **This web app attempts to address a gap in how individuals set achievable reading goals.**

# Installation

To view and interact, visit [github.com/liebscher/bayesian-goals](https://github.com/liebscher/bayesian-goals).

To develop, clone this repository and open `index.html` in a browser. The application is created with vanilla ES6 JavaScript, and should therefore function on most modern computers.

# Contributing

Please file an issue or email **@liebscher** at alexliebscher0@gmail.com.

# Statistics

If you're curious, here's a run down of the statistics behind the scenes (in `bayesian.js`).

First, we assume that pages per day and hours per day are normally distributed. This is obviously false, since neither can be negative. However, it heavily simplifies the problem. Specifically, it allows us to compute analytical forms of the prior, likelihood, and posterior distributions. The priors are weakly informative gaussian distributions set using national averages (more info the file). The likelihood is also gaussian, with unknown mean and variance, and makes use of the data supplied by the users. Following a bit of algebra, we can multiply these two distributions (See Gelman et al., 2013, Chp 3) to find the posterior distribution. In its analytical form, this is just a scaled Student's-t distribution with degrees of freedom equal to one plus the number of data elements.

In the end, we can use the PDF of the posterior to calculate the area under the curve in the upper tail, based on the quantile set by the user-supplied goal.

# Acknowledgements

The beautiful graphs are developed with [Highcharts](https://www.highcharts.com/).
