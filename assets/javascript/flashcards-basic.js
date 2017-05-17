
function Basic(front, back) {

    if(!(this instanceof Basic)) {
     return new Basic(front, back);
    }

    this.front = front;
    this.back = back;
}


module.exports = Basic;