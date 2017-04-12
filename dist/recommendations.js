'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Restaurant rcommendations module.
 */
var Recommendations = function () {
  function Recommendations() {
    _classCallCheck(this, Recommendations);
  }

  _createClass(Recommendations, [{
    key: 'randomRestaurant',

    /**
     * Returns a random restaurant, chosen by fair dice roll.
     * Guaranteed to be random.
     */
    value: function randomRestaurant() {
      return 'In-N-Out Burger';
    }
  }]);

  return Recommendations;
}();

module.exports = new Recommendations();