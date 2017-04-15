var inquirer = require("inquirer"),
    fs = require('fs');

function BasicCard(front, back){
    this.front = front;
    this.back = back;
}

var child = new BasicCard('Testing front', 'Testing Back');





function ClozeCard(text, cloze){
    this.text = text;
    this.cloze = cloze;

}

ClozeCard.prototype.partial = function () {

    if(this.text.includes(this.cloze)){
        return this.text.replace(this.cloze, '....');
    }
    else{
        return "Sorry, value doesn't exist";
    }
};



inquirer.prompt({
    type: 'list',
    name: 'cards',
    message: 'Choose your card?',
    choices: ['BasicCard', 'Clozure']
}).then(function (data) {
    if(data.cards === 'BasicCard'){
        return inquirer.prompt([
            {
                type: 'input',
                name: 'front',
                message: 'Add your front message'
            }, {
                type: 'input',
                name: 'back',
                message: 'Add your back message'
            }
        ]);
    }

    else{
        return inquirer.prompt([
            {
                type: 'input',
                name: 'text',
                message: 'Add your text message'
            }, {
                type: 'input',
                name: 'cloze',
                message: 'Add your deletion message'
            }
        ]);
    }


}).then(function(data){

        if(data.front){
            var basic = new BasicCard(data.front, data.back);
            addCards({data: basic});

        }
        else{
            var firstPresident = new ClozeCard(data.text, data.cloze);
            addCards({data: firstPresident, partial: firstPresident.partial()});
        }


    })
    .catch(function (err) {
     console.log(err);
});





var addCards = function (add) {
    fs.readFile('./Users/User1/flashcard/js.js/data.json', 'utf8', function (error, data) {
        if(error) throw error;

        var arr = JSON.parse(data);

        arr.cards.push(add);

        fs.writeFile('./Users/User1/flashcard/js.js/data.json', JSON.stringify(arr), 'utf8', function (err) {
            if(err) throw err;
            console.log("Process completed!!!");
        });
    });
};
