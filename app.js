var budgetController = (function() {
    var Expense= function(id,description,value){
        this.id = id;
        this.description= description;
        this.value = value;
    }
    var Income= function(id,description,value){
        this.id = id;
        this.description= description;
        this.value = value;
    }
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals : {
            exp: 0,
            inc: 0
        }
    };

})();

var UIcontroller = (function() {
    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    };
    return {
        getInput :function(){
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value
            };
        } ,
        getDOMStrings: function(){
            return DOMStrings;
        }
    }
})();

var controller = (function(budgetCtlr,UICtrl){

    var setupEventListeners = function(){
        var DOM = UICtrl.getDOMStrings();
        document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);
    document.addEventListener('keypress',function(){
        if(event.keyCode === 13 || event.which === 13)
            ctrlAddItem();
    });
    }
    
    var ctrlAddItem = function(){
        var input = UICtrl.getInput();
        console.log(input);
    }

    return {
        init: function(){
            console.log("started");
            setupEventListeners();
        }
    }

})(budgetController,UIcontroller);

controller.init();