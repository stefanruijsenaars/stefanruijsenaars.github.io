var DogDancer = function(top, left, timeBetweenSteps) {
  this.gifs = [
    // second argument is the BPMs.
    ['assets/images/dog1.gif', 2],
    ['assets/images/dog2.gif', 2],
    ['assets/images/dog3.gif', 1],
    ['assets/images/dog4.gif', 2],
    ['assets/images/dog5.gif', 2],
    ['assets/images/dog6.gif', 2],
    ['assets/images/dog7.gif', 2]
  ];
  GifDancer.call(this, top, left, timeBetweenSteps);
};

DogDancer.prototype = Object.create(GifDancer.prototype);
DogDancer.prototype.constructor = DogDancer;
