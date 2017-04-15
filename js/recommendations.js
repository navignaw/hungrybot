/**
 * Restaurant recommendations module.
 */
const FLAVOR_TEXT = [
  'Hungry for a bite? Let me find a good restaurant for you...',
  'Here is a 5-star recommendation, hand-picked by our culinary experts:',
  'After searching THE CLOUD using MACHINE LEARNING, I\'ve found the perfect one for you:',
  'Did you know each recommendation is randomly selected from a database of millions? Check it out!',
  'One juicy restaurant recommendation coming right up!',
  'Stomach grumbling? Try this place. I know you\'ll love it.',
  'A burger a day keeps the doctor away! Have at it.',
  'I don\'t mean to brag, but can anyone else find you such a perfect eatery?',
  'I can tell you want a taste of this from the look in your eye.',
  'Searching for restaurant... ooh, this here is a good one.',
  'After crawling the web, I found a place that will make you feel REAL GOOD.',
];

class Recommendations {
  randomFlavorText() {
    return FLAVOR_TEXT[Math.floor(Math.random() * FLAVOR_TEXT.length)];
  }

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
