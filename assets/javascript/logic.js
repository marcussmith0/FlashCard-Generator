$( document ).ready(function() {

	var basicCardsImport = require("./flashcards-basic.js");
	var clozeCardsImport = require("./flashcards-cloze.js");


	var frontContentExists = false;
	var inputContent;

	var frontCard;
	var backCard;

	var cardTypeChoice;

	var flashCards = [];

	$("#input-box").css("display", "none");



	$("#basicCard").on("click", function() {
		console.log("the basicCard button was clicked!");

		cardTypeChoice = "basic";

		front();

	});

	$("#clozeCard").on("click", function() {
		console.log("the clozeCard button was clicked!");

		cardTypeChoice = "cloze";

		front();


	});


	function front () {

		$("#theButtons").css("display", "none");
		$("#message").empty();
		$("#message").text("What would you like on the front?");
		$("#input-box").css("display", "block");

	}

	function back() {

		$("#theButtons").css("display", "none");
		$("#message").empty();
		$("#message").text("What would you like on the back?");
		$("#input-box").css("display", "block");

	}

	function cardType () {

		if(cardTypeChoice === "basic") {

			makeBasicCard();

		} else if (cardTypeChoice === "cloze") {

			makeClozeCard();

		}

	}

	$("#user-send").on("click", function(e) {

		e.preventDefault();

		inputContent = $("#user-input").val().trim();

		determineSide();


	});

	function determineSide() {

		if(frontContentExists === false) {


			frontCard = inputContent;

			frontContentExists = true;

			back();



		} else if (frontContentExists === true) {


			backCard = inputContent;

			frontContentExists = false;

			console.log(frontCard);
			console.log(backCard);

			cardType();


		}


	}

	function makeBasicCard () {

		var basicCardsImport = new Basic(frontCard, backCard);

		console.log("the flash card front is: " + basicCardsImport.front);
		console.log("the flash card back is: " + basicCardsImport.back);



	}

	function makeClozeCard () {

		var basicCardsImport = new Basic(frontCard, backCard);



	}

	

});