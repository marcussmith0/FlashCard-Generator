

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

var rapper = new ClozeCard("Kendrick Lamar is the greatest rapper of all time!.", "Kendrick Lamar");

console.log(rapper.fullText);
console.log(rapper.partialText);
console.log(rapper.deletion);

module.exports = ClozeCard;