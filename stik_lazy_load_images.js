(function() {
  stik.boundary({
    as: 'global',
    to: window
  });

  stik.boundary({
    as: 'lazyPicture',
    from: 'behavior',
    resolvable: true,
    to: function(global) {
      return function(elm, opts) {
        var defineListeners, inView, obj, offset, removeListeners, throttle, _throttle;
        if (opts == null) {
          opts = {};
        }
        obj = {};
        offset = parseInt(opts.offset || 0);
        throttle = parseInt(opts.throttle || 250);
        defineListeners = function() {
          if (document.addEventListener) {
            global.addEventListener('scroll', _throttle, false);
            return global.addEventListener('load', _throttle, false);
          } else {
            global.attachEvent('onscroll', _throttle);
            return global.attachEvent('onload', _throttle);
          }
        };
        removeListeners = function() {
          if (document.removeEventListener) {
            return global.removeEventListener('scroll', _throttle);
          } else {
            return global.detachEvent('onscroll', _throttle);
          }
        };
        _throttle = function() {
          var poll;
          clearTimeout(poll);
          return poll = setTimeout(obj.loadImage, throttle);
        };
        inView = function() {
          var coords;
          coords = elm.getBoundingClientRect();
          return (coords.top >= 0 && coords.left >= 0 && coords.top) <= (window.innerHeight || document.documentElement.clientHeight) + offset;
        };
        obj.loadImage = function() {
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

}).call(this);
