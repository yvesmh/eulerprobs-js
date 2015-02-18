/*
  The following iterative sequence is defined for the set of positive integers:

    n → n/2 (n is even)
    n → 3n + 1 (n is odd)

  Using the rule above and starting with 13, we generate the following sequence:

    13 → 40 → 20 → 10 → 5 → 16 → 8 → 4 → 2 → 1

  It can be seen that this sequence (starting at 13 and finishing at 1) contains 10 terms. Although it has not been proved yet (Collatz Problem), it is thought that all starting numbers finish at 1.

  Which starting number, under one million, produces the longest chain?

  NOTE: Once the chain starts the terms are allowed to go above one million.

 */
(function() {

  function getCollatzChainLength(number) {
    var collatzTerm = 0;

    //since it hasn't been proved that not all numbers end at 1, 
    //it's safe to assume the first 1 million will reach 1
    while(number !== 1) {

      //even
      if(number % 2 === 0) {
        number /= 2;
      } else {
        number = (3 * number) + 1;
      }
      collatzTerm++;
    }

    return collatzTerm;
  }

  function getLargestCollatzStarting(limit) {
    var largestCollatz = 0;
    var largestStarting = 0;

    var collatzTerm;
    for(var i = 2; i <= limit; i++) {
      collatzTerm = getCollatzChainLength(i);
      if(collatzTerm > largestCollatz) {
        largestCollatz = collatzTerm;
        largestStarting = i;
      }
    }

    return largestStarting;
  }

  var answer = getLargestCollatzStarting(1000000);
  console.log('Answer: ' + answer);

})();