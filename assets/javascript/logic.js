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
		

		cardTypeChoice = "basic";

		front();

	});

	$("#clozeCard").on("click", function() {

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

			cardType();


		}


	}

	function makeBasicCard () {

		var basicCardsImport = new Basic(frontCard, backCard);
	}

	function makeClozeCard () {


		var clozeCardsImport = new ClozeCard(frontCard, backCard);



	}

	

});