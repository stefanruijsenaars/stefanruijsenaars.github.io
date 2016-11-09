$(document).ready(function() {
  window.dancers = [];
  window.bpms = 0;
  window.explosionMode = false;

  $('.dropABomb').on('click', function (event) {
    var images = $('.animaldancer /deep/ img');
    if (images.length > 0) {
      var bomb = $('<div class="bomb"><img src="assets/images/bomb.png" alt="" /></div>');
      $('body').append(bomb);
      var explosion = $('<div class="explosion"><x-gif src="assets/images/explosion.gif" n-times="0" bpm="20"></x-gif></div>');
      setTimeout(function() {
        $('audio.bomb')[0].play();
        $(explosion).css({
          top: '65%',
          left: '50%'
        });
        $('body').append(explosion);
        $('body').css({
          animation: 'shake 0.15s cubic-bezier(.36,.07,.19,.97) both',
          transform: 'translate3d(0, 0, 0)',
          'backface-visibility': 'hidden',
          perspective: '1000px'
        });
        setTimeout(function () {
          images.explode({
            omitLastLine : false,
            radius : 300,
            noRadius : false,
            minRadius : 20,
            release : true,
            fadeTime : 100,
            recycle : true,
            recycleDelay : 200,
            fill : true,
            explodeTime : 400,
            maxAngle : 360,
            gravity : 0,
            round : false,
            groundDistance : 400
          });
        }, 1);
        $('.bomb img').explode({
          omitLastLine : false,
          radius : 300,
          noRadius : false,
          minRadius : 20,
          release : true,
          fadeTime : 100,
          recycle : true,
          recycleDelay : 200,
          fill : true,
          explodeTime : 400,
          maxAngle : 360,
          gravity : 0,
          round : false,
          groundDistance : 400
        });
      }, 1900);
      $(bomb).animate({
        top: '50%',
        left: '45%'
      }, 1500, 'easeInQuint');
      setTimeout(function () {
        images.remove();
        $(bomb).remove();
        explosion.remove();
        $('.frames-wrapper').remove();
      }, 4000);
    }
  });

  $('.blowDancerUp').on('click', function (event) {
    if (!window.explosionMode) {
      window.explosionMode = true;
      $('body').css('cursor', 'crosshair');

    } else {
      window.explosionMode = false;
      $('body').css('cursor', 'auto');
    }
  });

  $('.lineUp').on('click', function (event) {
    // percentage
    var currentTopPosition = 50;
    for (var i=0; i < window.dancers.length; i++) {
      var currentDancer = window.dancers[i];
      currentTopPosition += 30 / window.dancers.length;
      currentDancer.$node.animate({
        top : currentTopPosition + '%',
        left : '52%'
      }, 1000);
    }

  });

  $('.toggleMusic1Button').on('click', function(event) {
    var audio = $('audio.music1')[0];
    audio.loop = true;

    if (audio.paused) {
      audio.play();
      window.bpms = 110;
      window.resetBpms();
    } else {
      audio.pause();
    }
  });

  $('.toggleMusic2Button').on('click', function(event) {
    var audio = $('audio.music2')[0];
    audio.loop = true;

    if (audio.paused) {
      audio.play();
      window.bpms = 180;
      window.resetBpms();
    } else {
      audio.pause();
    }
  });

  $('.addDancerButton').on('click', function(event) {
    /* This function sets up the click handlers for the create-dancer
     * buttons on dancefloor.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var dancerMakerFunctionName = $(this).data('dancer-maker-function-name');

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // from https://github.com/substack/point-in-polygon
    function inside(point, vs) {
      // ray-casting algorithm based on
      // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

      var x = point[0], y = point[1];

      var inside = false;
      for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
          var xi = vs[i][0], yi = vs[i][1];
          var xj = vs[j][0], yj = vs[j][1];

          var intersect = ((yi > y) != (yj > y))
              && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
          if (intersect) inside = !inside;
      }

      return inside;
    };
    // make a dancer with a random position
    var generateRelativePosition = function() {
      // Generated based on image map.
      var polygons = [
        [
          [788, 582],
          [5, 900],
          [1227, 906],
          [996, 581]
        ],
        [
          [396, 387],
          [396, 399],
          [473, 417],
          [471, 405]
        ],
        [
          [231, 357],
          [340, 379],
          [339, 388],
          [232, 371]
        ],
        [
          [1163, 517],
          [1162, 531],
          [1306, 579],
          [1309, 568]
        ],
        [
          [438, 5],
          [506, 27],
          [506, 5],
          [438, 27]
        ],
        [
          [70, 125],
          [138, 147],
          [70, 147],
          [138, 125]
        ],
        [
          [796, 338],
          [796, 350],
          [997, 350],
          [997, 338]
        ],
        [
          [538, 567],
          [629, 577],
          [538, 577],
          [629, 567]
        ],
        [
          [582, 113],
          [582, 103],
          [673, 113],
          [673, 103]
        ]
      ];
      for (var i = 0; i < polygons.length; i++) {
        for (var j = 0; j < polygons[i].length; j++) {
          // Divide by dimensions of background image so as to get fractions.
          polygons[i][j][0] = polygons[i][j][0] / 1600;
          polygons[i][j][1] = polygons[i][j][1] / 916;
        }
      }
      var point = [];
      // Offset point by - 0.15 to disallow cats to be added at the bottom, which would generate scrollbars.
      while (point = [Math.random(), Math.random()]) {
        for (var i = 0; i < polygons.length; i++) {
          var polygon = polygons[i];
          if (inside(point, polygon)) {
            // Offset the generated point by the dimensions of the gif so as to ensure that the generated point
            // is located at the bottom middle of the gif (instead of the top left).
            return [point[1] - 0.11, point[0] - 0.04];
          }
        }
      }
    };
    var position = generateRelativePosition();
    var dancer = new dancerMakerFunction(
      position[0] * 100 + '%',
      position[1] * 100 + '%',
      Math.random() * 1000
    );
    $('body').append(dancer.$node);
    window.dancers.push(dancer);
  });

  window.resetBpms = function () {
    var dancers = $('.animaldancer');
    for (var i = 0; i < dancers.length; i++) {
      var currentDancer = $(dancers[i]);
      currentDancer.children().attr('bpm', window.bpms / currentDancer.attr('data-bpm-factor'));
    }
  };

  // From https://codepen.io/msaetre/pen/fDuzC
  var t = 1;
  var radius = 50;
  var squareSize = 6.5;
  var prec = 19.55;
  var fuzzy = 0.001;
  var inc = (Math.PI-fuzzy)/prec;
  var discoBall = document.getElementById("discoBall");

  for(var t=fuzzy; t<Math.PI; t+=inc) {
    var z = radius * Math.cos(t);
    var currentRadius = Math.abs((radius * Math.cos(0) * Math.sin(t)) - (radius * Math.cos(Math.PI) * Math.sin(t))) / 2.5;
    var circumference = Math.abs(2 * Math.PI * currentRadius);
    var squaresThatFit = Math.floor(circumference / squareSize);
    var angleInc = (Math.PI*2-fuzzy) / squaresThatFit;
    for(var i=angleInc/2+fuzzy; i<(Math.PI*2); i+=angleInc) {
      var square = document.createElement("div");
      var squareTile = document.createElement("div");
      squareTile.style.width = squareSize + "px";
      squareTile.style.height = squareSize + "px";
      squareTile.style.transformOrigin = "0 0 0";
      squareTile.style.webkitTransformOrigin = "0 0 0";
      squareTile.style.webkitTransform = "rotate(" + i + "rad) rotateY(" + t + "rad)";
      squareTile.style.transform = "rotate(" + i + "rad) rotateY(" + t + "rad)";
      if((t>1.3 && t<1.9) || (t<-1.3 && t>-1.9)) {
        squareTile.style.backgroundColor = randomColor("bright");
      } else {
        squareTile.style.backgroundColor = randomColor("any");
      }
      square.appendChild(squareTile);
      square.className = "square";
      squareTile.style.webkitAnimation = "reflect 2s linear infinite";
      squareTile.style.webkitAnimationDelay = String(randomNumber(0,20)/10) + "s";
      squareTile.style.animation = "reflect 2s linear infinite";
      squareTile.style.animationDelay = String(randomNumber(0,20)/10) + "s";
      squareTile.style.backfaceVisibility = "hidden";
      var x = radius * Math.cos(i) * Math.sin(t);
      var y = radius * Math.sin(i) * Math.sin(t);
      square.style.webkitTransform = "translateX(" + Math.ceil(x) + "px) translateY(" + y + "px) translateZ(" + z + "px)";
      square.style.transform = "translateX(" + x + "px) translateY(" + y + "px) translateZ(" + z + "px)";
      discoBall.appendChild(square);
    }
  }

  function randomColor(type) {
    var c;
    if(type == "bright") {
      c = randomNumber(130, 255);
    } else {
      c = randomNumber(110, 190);
    }
    return "rgb(" + c + "," + c + "," + c + ")";
  }

  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
});
