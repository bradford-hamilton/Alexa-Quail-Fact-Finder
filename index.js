/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

var APP_ID = "amzn1.echo-sdk-ams.app.4158bf9e-2b87-446e-b929-20a19cceb1b9";

var QUAIL_FACTS = [
    "Quail weigh 5-10 ounces depending on the species.",
    "Quail are roughly 6-12 inches depending on the species.",
    "A quails flight speed is anywhere between thirty and forty miles per hour.",
    "Quail favorite foods are insects, waste grains, weed seeds, and berries.",
    "Quail preferred habitats are brushy areas throughout the country.",
    "Quail average nest initiation is early summer.",
    "For most quails, the length of incubation is twenty three to twenty five days.",
    "Quail average first hatch is at the end of June.",
    "A quails average clutch size is seven to twenty eight, depending on the species.",
    "A quails average nest success is forty to sixty percent.",
    "Quail have one to two broods per year. They are persistent renesters.",
    "The average rate of quail chick survival is forty to fifty percent.",
    "Quail major nest predators include raccoon, opossum, snake, and skunk.",
    "Quail major adult predators include human, hawk, fox, and owl.",
    "Rarely, if ever, does a quail die of old age. In fact, the average life span is less than 1 year. Quail are a prey species and face major sources of mortality beginning the day it is laid in the nest as an egg. On average, seventy to 80 percent of the nation's quail population is lost each year. This high mortality rate is off set by large broods of wild quail.",
    "Quail are birds that are typically found in small flocks, otherwise known as coveys.",
    "Quail spend most of their lives in a relatively small area, with groups of eight to twenty five birds common in a single covey.",
    "Scaled quail, also known as blue quail, are known for their blue scaled appearance. Along with its scaly markings, the bird is easily identified by its white crest that resembles a tuft of cotton.",
    "With the smallest range in the United States, the Mearn's quail is found in southern Texas, New Mexico, Arizona, and Mexico. They live in mountain areas populated with oak and juniper trees, as well as grasslands.",
    "Gambel's quail, also known as desert quail, are located in dry regions of the southwestern United States. Gambel's quail are easily recognized by their top knots and scaly plumage on their undersides.",
    "The largest quail species found in the United States, Mountain quail possess a unique characteristic of two straight feathers that arch over the back. These birds are easily recognized by their top knots, which are shorter in the female.",
    "California quail, also known as valley quail, are the most popular of the five species of western quail. These birds have a curving crest or plume, made of six feathers, that droops forward. It is black in males and brown for females. The flanks are brown with white streaks.",
    "Bobwhite quail are the most common species of quail. The bobwhite is often referred to as the number one game bird of the eastern and southern United States. The name bobwhite derives from its characteristic whistling call. Males have a white throat and brow stripe bordered by black compared to brown colored females."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

var QuailFacts = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
QuailFacts.prototype = Object.create(AlexaSkill.prototype);
QuailFacts.prototype.constructor = QuailFacts;

QuailFacts.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("QuailFacts onSessionStarted requestId: " + sessionStartedRequest.requestId +
        ", sessionId: " + session.sessionId);
};

QuailFacts.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("QuailFacts onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
QuailFacts.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("QuailFacts onSessionEnded requestId: " + sessionEndedRequest.requestId +
        ", sessionId: " + session.sessionId);
};

QuailFacts.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask Quail Facts tell me a quail fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random quail fact from the quail facts list
    var factIndex = Math.floor(Math.random() * QUAIL_FACTS.length);
    var fact = QUAIL_FACTS[factIndex];

    var speechOutput = "Here's your quail fact: " + fact;

    response.tellWithCard(speechOutput, "QuailFacts", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    var quailFact = new QuailFacts();
    quailFact.execute(event, context);
};
