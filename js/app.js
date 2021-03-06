'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

const Recommendations = require('./recommendations.js');

const ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN;
const REQUEST_URI = 'https://graph.facebook.com/v2.6/me/messages';

app.set('port', (process.env.PORT || 5000));

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// Process application/json
app.use(bodyParser.json());

// Index route
app.get('/', function(req, res) {
  res.send('Welcome to the land of sizzling sausages.');
});

// Read and respond to requests.
app.post('/webhook/', function(req, res) {
  const data = req.body;

  // Make sure this is a page subscription
  if (data.object == 'page') {
    data.entry.forEach(function(pageEntry) {
      const pageId = pageEntry.id;
      const timeOfEvent = pageEntry.time;

      // Iterate over each messaging event
      pageEntry.messaging.forEach(function(messagingEvent) {
        if (messagingEvent.message) {
          receivedMessage(messagingEvent);
        } else if (messagingEvent.postback) {
          receivedPostback(messagingEvent);
        }
      });
    });
  }
  res.sendStatus(200);
});


/**
 * Process message data and respond accordingly.
 */
function receivedMessage(event) {
  const senderId = event.sender.id;
  const recipientId = event.recipient.id;
  const timeOfMessage = event.timestamp;
  const message = event.message;

  console.log("Received message for user %d and page %d at %d with message:",
    senderId, recipientId, timeOfMessage);
  console.log(JSON.stringify(message));

  const flavorText = Recommendations.randomFlavorText();
  callSendAPI(getSenderActionTemplate(senderId, 'typing_on'));
  setTimeout(() => {
    callSendAPI(getTextTemplate(senderId, flavorText));
    setTimeout(() => {
      const restaurant = Recommendations.randomRestaurant();
      callSendAPI(getMessageTemplate(senderId, restaurant));
    }, 1000);
  }, 2000);
}


/**
 * Process postback data and respond accordingly.
 */
function receivedPostback(event) {
  // TODO: implement!
  console.log('postback not yet implemented');
}


/**
 * Creates a json object for a generic Send API action using the provided
 * recipient id and sender action.
 */
function getSenderActionTemplate(recipientId, senderAction) {
  return {
    recipient: {
      id: recipientId
    },
    sender_action: senderAction
  };
}


/**
 * Creates a json object for a generic Send API message using the provided
 * recipient id and text string.
 */
function getTextTemplate(recipientId, messageText) {
  return {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
    },
  };
}

/**
 * Creates a json object for a generic Send API message using the provided
 * recipient id and restaurant data.
 */
function getMessageTemplate(recipientId, restaurant) {
  return {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          elements: [
            {
              title: restaurant.title,
              image_url: restaurant.imageUrl,
              subtitle: restaurant.location,
              default_action: {
                type: 'web_url',
                url: restaurant.yelpUrl,
                messenger_extensions: true,
                webview_height_ratio: 'tall',
              },
              buttons: [
                {
                  type: 'web_url',
                  title: 'View on Yelp',
                  url: restaurant.yelpUrl,
                }, {
                  type: 'web_url',
                  title: 'Directions',
                  url: restaurant.mapsUrl,
                }
              ]
            }
          ]
        }
      }
    }
  };
}


/**
 * Call the Send API with a response.
 */
function callSendAPI(messageData) {
  console.log('sending request', messageData);
  request({
    uri: REQUEST_URI,
    qs: {access_token: ACCESS_TOKEN},
    method: 'POST',
    json: messageData,
  }, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      const recipientId = body.recipient_id;
      const messageId = body.message_id;

      if (messageId) {
        console.log("Successfully sent message with id %s to recipient %s", 
          messageId, recipientId);
      } else {
      console.log("Successfully called Send API for recipient %s", 
        recipientId);
      }
    } else {
      console.error("Failed calling Send API", response.statusCode, response.statusMessage, body.error);
    }
  });
}


// Spin up the server
app.listen(app.get('port'), function() {
  console.log('running on port', app.get('port'));
});
