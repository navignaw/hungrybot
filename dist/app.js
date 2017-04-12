'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

var Recommendations = require('./recommendations.js');

var ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN;
var REQUEST_URI = 'https://graph.facebook.com/v2.6/me/messages';

app.set('port', process.env.PORT || 5000);

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Process application/json
app.use(bodyParser.json());

// Index route
app.get('/', function (req, res) {
  res.send('Welcome to the land of sizzling sausages.');
});

// Read and respond to requests.
app.get('/webhook/', function (req, res) {
  var data = req.body;

  // Make sure this is a page subscription
  if (data.object == 'page') {
    data.entry.forEach(function (pageEntry) {
      var pageId = pageEntry.id;
      var timeOfEvent = pageEntry.time;

      // Iterate over each messaging event
      pageEntry.messaging.forEach(function (messagingEvent) {
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
  var senderId = event.sender.id;
  var recipientId = event.recipient.id;
  var timeOfMessage = event.timestamp;
  var message = event.message;

  console.log("Received message for user %d and page %d at %d with message:", senderId, recipientId, timeOfMessage);
  console.log(JSON.stringify(message));

  sendTextMessage(senderId);
}

/**
 * Process postback data and respond accordingly.
 */
function receivedPostback(event) {
  // TODO: implement!
  console.log('postback not yet implemented');
}

/**
 * Sends a text message using Send API.
 */
function sendTextMessage(recipientId, messageText) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: Recommendations.randomRestaurant()
    }
  };
  callSendAPI(messageData);
}

/**
 * Call the Send API with a response.
 */
function callSendAPI(messageData) {
  request({
    uri: REQUEST_URI,
    qs: { access_token: ACCESS_TOKEN },
    method: 'POST',
    json: messageData
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var recipientId = body.recipient_id;
      var messageId = body.message_id;

      if (messageId) {
        console.log("Successfully sent message with id %s to recipient %s", messageId, recipientId);
      } else {
        console.log("Successfully called Send API for recipient %s", recipientId);
      }
    } else {
      console.error("Failed calling Send API", response.statusCode, response.statusMessage, body.error);
    }
  });
}

// Spin up the server
app.listen(app.get('port'), function () {
  console.log('running on port', app.get('port'));
});