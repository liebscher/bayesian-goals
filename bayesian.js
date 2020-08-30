// Time spent reading for personal interest varied greatly by age. Individuals age 75
//      and over averaged 44 minutes of reading per day, whereas individuals ages 15 to 44
//      read on average for 10 minutes or less per day. (See table 11A.)
// - Bureau of Labor Statistics (2020) https://www.bls.gov/news.release/atus.nr0.htm
// variance calculated by downloading ATUS data and summarizing duration over reading activity code


// The typical American read 4 books in 2015
// Average book is 400 words -> 1,600 pages per year -> 4.38 pages / day
// https://www.pewresearch.org/fact-tank/2015/10/19/slightly-fewer-americans-are-reading-print-books-new-survey-finds/
// https://www.theguardian.com/books/2015/dec/10/are-books-getting-longer-survey-marlon-james-hanya-yanagihara

var prior_parameters = {
  "hours": {
    "mean0": 0.1667,
    "k0": 1,
    "variance0": 0.93,
    "df0": 1
  },
  "pages": {
    "mean0": 4.38,
    "k0": 1,
    "variance0": 80,
    "df0": 1
  }
}


// calculate mean
var mean = (v) => v.reduce((a,b) => a + b) / v.length

// calculate variance
var vr = (v) => {
  let m = mean(v)
  return (v.reduce((a,cv) => a + (cv-m)*(cv-m), 0)) / (v.length - 1)
}

// calculate the analytical marginal posterior
var marginal_posterior_parameters = (data, unit) => {
  let _prior = prior_parameters[unit]

  let n = data.length

  // without data, just return the prior parameters
  if (n == 0) {
    return {
      "mean": _prior.mean0,
      "k": _prior.k0,
      "variance": _prior.variance0,
      "df": _prior.df0,
      "n": 0
    }
  }

  let dmean = mean(data)

  // analytical form from Gelman et al (2003)
  let _k = _prior.k0 + n
  let _mean = (_prior.k0 * _prior.mean0)/_k + (n * dmean)/_k
  let _df = _prior.df0 + n
  let _variance = _prior.df0 * _prior.variance0 +
                  (n - 1) * vr(data) +
                  _prior.k0 * n * Math.pow(dmean - _prior.mean0, 2) / _k

  _variance = _variance / _df

  return {
    "mean": _mean,
    "k": _k,
    "variance": _variance,
    "df": _df,
    "n": n
  }
}

var marginal_posterior_density = (parameters) => {

}
