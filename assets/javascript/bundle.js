///////////////////////////////// i don't know what the heck this is, it was put in here by browsify/////////////////////////////////////////////////////

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

function Basic(front, back) {

    if(!(this instanceof Basic)) {
     return new Basic(front, back);
    }

    this.front = front;
    this.back = back;
}

function ClozeCard(fullText, deletion) {

    if(!(this instanceof ClozeCard)) {
     return new ClozeCard(fullText, deletion);
    }

    this.deletion = deletion;
    this.fullText = fullText;
    this.partialText = this.fullText.replace(this.deletion, ".......");
	this.wordExists = true;

    if (this.partialText === this.fullText) {
        this.wordExists = false;
    }
    
}

module.exports = Basic;
module.exports = ClozeCard;
},{}],2:[function(require,module,exports){


function ClozeCard(fullText, deletion) {

    if(!(this instanceof ClozeCard)) {
     return new ClozeCard(fullText, deletion);
    }

    this.deletion = deletion;
    this.fullText = fullText;
    this.partialText = this.fullText.replace(this.deletion, ".......");
    this.wordExists = true;

    if (this.partialText === this.fullText) {
        this.wordExists = false;
    }
}

module.exports = ClozeCard;
},{}],3:[function(require,module,exports){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$( document ).ready(function() {

	$("#input-box").css("display", "none");
	$("#start").css("display", "none");
	$('[data-toggle="tooltip"]').tooltip();

	var basicCardsImport = require("./flashcards-basic.js");
	var clozeCardsImport = require("./flashcards-cloze.js");

	// all useful global variable that i will be changing in my functions below
	var frontContentExists = false;
	var inputContent;

	var frontCard;
	var backCard;

	var cardTypeChoice;

	var flashCards = [];


	$("#basicCard").on("click", function() {

		cardTypeChoice = "basic";

		front();

	});
															// user chooses which type of card they want to create
	$("#clozeCard").on("click", function() {

		cardTypeChoice = "cloze";

		front();

	});

	function front () {

		if (cardTypeChoice === "basic") {

			$("#theButtons").css("display", "none");
			$("#message").empty();
			$("#message").text("What would you like on the front?");				//the buttons will show																			
			$("#input-box").css("display", "block");								//with a message

			if(flashCards.length) {
				$("#flashcards-length").html("Number of cards you made: ");
				$("#flashcards-numbers").html(flashCards.length);
			}

		} else if(cardTypeChoice === "cloze") {

			$("#theButtons").css("display", "none");
			$("#message").empty();
			$("#message").text("What statment would you like on the front?").css("color", "black");
			$("#input-box").css("display", "block");

			if(flashCards.length) {

				$("#flashcards-length").html("Number of cards you made: ");
				$("#flashcards-numbers").html(flashCards.length);
				
			}

		}
	
	}

	//will run after and only after content was put on the front of the card

	function back() {

		if (cardTypeChoice === "basic") {

			$("#theButtons").css("display", "none");
			$("#message").empty();
			$("#message").text("What would you like on the back?");
			$("#input-box").css("display", "block");

		} else if(cardTypeChoice === "cloze") {						

			$("#theButtons").css("display", "none");
			$("#message").empty();
			$("#message").text("What word would you like to be deleted?");
			$("#input-box").css("display", "block");

		}

	}

	//determines which type of card to make

	function cardType () {

		if(cardTypeChoice === "basic") {

			makeBasicCard();

		} else if (cardTypeChoice === "cloze") {

			makeClozeCard();

		}

	}

	//this is where the user puts in the values that they want of the front and back

	$("#user-send").on("click", function(e) {

		e.preventDefault();

		inputContent = $("#user-input").val().trim();

		$("#user-input").val("");

		determineSide();

	});

	//this is what they click when they want to start studying

	$("#start").on("click", function(e){

		e.preventDefault();

		$("#everything").hide();

		presentCard();

	});

	//displays next card by calling presentCard() again

	$("#next-button").on("click", function(e){
		e.preventDefault();

		presentCard();
	});

	//lets the user add additional cards after they have start studying

	$("#add-card").on("click", function(e){
		e.preventDefault();

		$("#everything").css("display", "block");
		$("#next-button").css("display", "none");
		$("#card").css("display", "none");
		$("#add-card").css("display", "none");

		front();

	})

	// this shows the card to the user
	function presentCard () {

		$("#card").flip({
			axis: 'y',
			trigger: 'click'
		});
		
		$("#card").css("display", "block");
		$("#next-button").css("display", "block");
		$("#add-card").css("display", "block");

		var cardIndex = Math.floor((Math.random() * flashCards.length ));

		if (cardTypeChoice === "basic") {


			$(".front").html(
							  "<h2> Front </h2>" + "\n" +
							  "<h3>" + flashCards[cardIndex].front + "</h3>");

			$(".back").html(
							"<h2> Back </h2>" + "\n" +
							"<h3>" + flashCards[cardIndex].back + "</h3>"
																		);

		} else if (cardTypeChoice === "cloze") {

			$(".front").html(
							  "<h2> Front </h2>" + "\n" +
							  "<h3>" + flashCards[cardIndex].partialText + "</h3>");

			$(".back").html(
							"<h2> Back </h2>" + "\n" +
							"<h3>" + flashCards[cardIndex].deletion + "</h3>"
																		);


		}

	}

	//determines which side of the card needs data input on it

	function determineSide() {

		if(frontContentExists === false) {

			frontCard = inputContent;

			frontContentExists = true;

			back();

		} else if (frontContentExists === true) {

			backCard = inputContent;

			frontContentExists = false;

			cardType();

		}

	}

	// creates a basic card by using basicCardsImport

	function makeBasicCard () {

		var basicCardsImport = new Basic(frontCard, backCard);

		flashCards.push(basicCardsImport);

		if (flashCards.length >= 2) {

			$("#start").css("display", "block");
			front();

		} else {

			front();

		}

	}

	// creates a cloze card by using clozeCardsImport

	function makeClozeCard () {

		var clozeCardsImport = new ClozeCard(frontCard, backCard);

		if(!clozeCardsImport.wordExists) {

			$("#message").empty();
			$("#message").text("That word doesn't exist in the statement! Try again.").css("color", "red");

			setTimeout(function(){
            	front();
        	},2000);

		} else if (clozeCardsImport.fullText === clozeCardsImport.deletion) {

			$("#message").empty();
			$("#message").text("You can't delete the whole statement! Try again.").css("color", "red");

			setTimeout(function(){
            	front();
        	},2000);

		} else {

			flashCards.push(clozeCardsImport);

			if (flashCards.length >= 2) {

				$("#start").css("display", "block");
				front();

			} else {

				front();

			}

		}

	}	

});
},{"./flashcards-basic.js":1,"./flashcards-cloze.js":2}]},{},[3]);
