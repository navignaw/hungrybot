/**
 * Restaurant rcommendations module.
 */
class Recommendations {
  /**
   * Returns a random restaurant, chosen by fair dice roll.
   * Guaranteed to be random.
   */
  randomRestaurant() {
    return {
      title: 'In-N-Out Burger',
      location: 'Sunnyvale, CA',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/InNOut.svg/1200px-InNOut.svg.png',
      yelpUrl: 'https://www.yelp.com/biz/in-n-out-burger-sunnyvale',
      mapsUrl: 'https://www.google.com/maps/place/In-N-Out+Burger/@37.3609484,-122.095005,12z/',
    };
  }
}

module.exports = new Recommendations();
