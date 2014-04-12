stik.boundary({
  as: 'lazyPicture',
  from: 'behavior',
  resolvable: true,
  to: function($window, $h){
    return function(elm, opts){
      var obj = {},
          offset,
          throttle;

      if (opts == null) { opts = {}; }

      offset = parseInt(opts.offset || 0);
      throttle = parseInt(opts.throttle || 250);

      function defineListeners(){
        if (document.addEventListener) {
          $window.addEventListener('scroll', $h.debounce(_throttle, 100), false);
          return $window.addEventListener('load', _throttle, false);
        } else {
          $window.attachEvent('onscroll', $h.debounce(_throttle, 100));
          return $window.attachEvent('onload', _throttle);
        }
      }

      function removeListeners(){
        if (document.removeEventListener) {
          return $window.removeEventListener('scroll', _throttle);
        } else {
          return $window.detachEvent('onscroll', _throttle);
        }
      }

      function _throttle(){
        var poll;
        clearTimeout(poll);
        return poll = setTimeout(obj.loadImage, throttle);
      }

      function inView(){
        return distanceFromTop() <= consideredArea();
      }

      function distanceFromTop(){
        var coords = elm.getBoundingClientRect();
        return coords.top >= 0 && coords.left >= 0 && coords.top;
      }

      function consideredArea(){
        return ($window.innerHeight || document.documentElement.clientHeight) + offset;
      }

      obj.loadImage = function loadImage(){
        if (inView() && elm.hasAttribute('data-src')) {
          elm.style.background = 'url(' + elm.getAttribute('data-src') + ')';
          elm.removeAttribute('data-src');
          return removeListeners();
        }
      };

      defineListeners();
      obj.loadImage();

      return obj;
    };
  }
});
