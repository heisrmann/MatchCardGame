var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

$(document).ready(function() {
  var $game = $('#game');
  var arrNumsShuffled = MatchGame.generateCardValues();
  MatchGame.renderCards(arrNumsShuffled, $game);
});

/*
  Generates and returns an array of matching card values.
*/

MatchGame.generateCardValues = function () {
  
  // initial pairs (16 cards) 
  var arrSequence = [];
  
  for (var s = 1; s <= 8; s++) {
    arrSequence.push(s);
    arrSequence.push(s);
  }

  // shuffle: randomize,remove, and push
  var arrCardsShuffled = [];
  
  while (arrSequence.length > 0) {
    var idxRandom = Math.floor(Math.random() * arrSequence.length);
    var numCard = arrSequence.splice(idxRandom, 1)[0];
    arrCardsShuffled.push(numCard);
  }
  
  return arrCardsShuffled;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(arrCardsShuffled, $game) {
  var arrColors = [
      'hsl(25, 85%, 65%)'
    , 'hsl(55, 85%, 65%)'
    , 'hsl(90, 85%, 65%)'
    , 'hsl(160, 85%, 65%)'
    , 'hsl(220, 85%, 65%)'
    , 'hsl(265, 85%, 65%)'
    , 'hsl(310, 85%, 65%)'
    , 'hsl(360, 85%, 65%)'];

  $game.empty();
  $game.data('arrCardsFlipped', []);

  for (var i = 0; i < arrCardsShuffled.length; i++) {
    var numCard = arrCardsShuffled[i];
    var color = arrColors[numCard - 1];
    var data = {
      value: numCard,
      color: color,
      isFlipped: false
    };

    var $cardElement = $('<div class="col-xs-3 card"></div>');
    $cardElement.data(data);

    $game.append($cardElement);
  }

  $('.card').click(function() {
    MatchGame.flipCard($(this), $('#game'));
  });
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
*/

MatchGame.flipCard = function($card, $game) {
  if ($card.data('isFlipped')) {
    return;
  }

  $card.css('background-color', $card.data('color'))
      .text($card.data('value'))
      .data('isFlipped', true);

  var arrCardsFlipped = $game.data('arrCardsFlipped');
  arrCardsFlipped.push($card);

  if (arrCardsFlipped.length === 2) {
    if (arrCardsFlipped[0].data('value') === arrCardsFlipped[1].data('value')) {
      var cssCardsMatch = {
        backgroundColor: 'rgb(153, 153, 153)',
        color: 'rgb(204, 204, 204)'
      };
      arrCardsFlipped[0].css(cssCardsMatch);
      arrCardsFlipped[1].css(cssCardsMatch);
    } else {
      var card1 = arrCardsFlipped[0];
      var card2 = arrCardsFlipped[1];
      window.setTimeout(function() {
        card1.css('background-color', 'rgb(32, 64, 86)')
            .text('')
            .data('isFlipped', false);
        card2.css('background-color', 'rgb(32, 64, 86)')
            .text('')
            .data('isFlipped', false);
      }, 480);
    }
    $game.data('arrCardsFlipped', []);
  }
};

