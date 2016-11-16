var CatDancer = function(top, left, timeBetweenSteps) {
  this.gifs = [
    // second argument is the BPMs.
    ['assets/images/cat1.gif', 2],
    ['assets/images/cat2.gif', 2],
    ['assets/images/cat3.gif', 4],
    ['assets/images/cat4.gif', 2],
    ['assets/images/cat5.gif', 2],
    ['assets/images/cat6.gif', 2],
  ];
  GifDancer.call(this, top, left, timeBetweenSteps);
};

CatDancer.prototype = Object.create(Dancer.prototype);
CatDancer.prototype.constructor = CatDancer;
