var GifDancer = function(top, left) {
  Dancer.call(this, top, left, 0);

  var idx = Math.round(Math.random() * 5);
  this.$node = $('<div class="animaldancer catdancer"><x-gif src="' + this.gifs[idx][0] + '" bpm="' + (window.bpms / this.gifs[idx][1]) + '"></x-gif></div>');
  this.$node.attr('data-bpm-factor', this.gifs[idx][1]);
  this.setPosition(top, left);

  var dragObj = null;
  function draggable(obj) {
    obj.onmousedown = function(){
      dragObj = obj;
    };
  }

  document.onmouseup = function(e){
    dragObj = null;
  };

  document.onmousemove = function(e){
    var x = e.pageX;
    var y = e.pageY;

    if (dragObj == null || x > $('body').width() - 100 || y > $('body').height() - 100 || x < 10 || y < 10) {
        return;
    }
    dragObj.style.left = x +"px";
    dragObj.style.top= y +"px";
  };

  draggable(this.$node[0]);

  var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  var uniqid = randLetter + Date.now();
  this.$node.attr('id', uniqid);
  this.$node.on('click', function (event) {
    if (window.explosionMode) {
      var id = $(this).attr('id');
      var left = $(this).css('left');
      var top = $(this).css('top');
      var explosion = $('<div class="explosion"><x-gif src="assets/images/explosion.gif" n-times="0" bpm="20"></x-gif></div>');
      explosion.css({
        top: top,
        left: left
      });
      $('body').append(explosion);
      // Rewind, in case we are blowing up another cat while the sound is still playing.
      $('audio.explosion')[0].currentTime = 0;
      $('audio.explosion')[0].play();

      // Use the /deep/ operator to go into the shadow DOM.
      setTimeout(function () {
      $('body').css({
        animation: 'shake 0.35s cubic-bezier(.36,.07,.19,.97) both',
        transform: 'translate3d(0, 0, 0)',
        'backface-visibility': 'hidden',
        perspective: '1000px'
      });
        $('#' + id + ' /deep/ img').explode({
          omitLastLine : false,
          radius : 300,
          noRadius : false,
          minRadius : 20,
          release : true,
          fadeTime : 100,
          recycle : true,
          recycleDelay : 200,
          fill : true,
          explodeTime : 1000,
          maxAngle : 360,
          gravity : 0,
          round : false,
          groundDistance : 400
        });
      }, 100);
      var currentGif = $(this);
      setTimeout(function () {
        $('body').css({
          animation: '',
          transform: '',
          'backface-visibility' : '',
          perspective: ''
        });
        currentGif.remove();
        explosion.remove();
      }, 2000);
    }
  });

};

GifDancer.prototype = Object.create(Dancer.prototype);
GifDancer.prototype.constructor = GifDancer;


GifDancer.prototype.step = function(){
  Dancer.prototype.step.call(this);
};
