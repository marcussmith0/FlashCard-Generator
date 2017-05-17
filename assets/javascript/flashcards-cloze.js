

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