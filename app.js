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

    return {
        addItem : function(type,description,value){
            var newItem,ID;
            if(data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            if(type === 'exp'){
                newItem = new Expense(ID,description,value);
            } else if(type === 'inc'){
                newItem = new Income(ID,description,value);
            }
            data.allItems[type].push(newItem);
            return newItem;
        },
        testing : function(){
            console.log(data);
        }
    };
    
})();

var UIcontroller = (function() {
    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
    };

    var formatNumber = function(num, type) {
        var numSplit, int, dec, type;
        num = Math.abs(num);
        num = num.toFixed(2);

        numSplit = num.split('.');

        int = numSplit[0];
        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3); //input 23510, output 23,510
        }

        dec = numSplit[1];

        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;

    };


    return {
        getInput :function(){
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value
            };
        } ,

        addListItem: function(obj, type) {
            var html, newHtml, element;
            
            if (type === 'inc') {
                element = DOMStrings.incomeContainer;
                
                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMStrings.expensesContainer;
                
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));
            
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        clearFields: function(){
            var fields,fieldArray;
            fields = document.querySelectorAll(DOMStrings.inputDescription + ',' + DOMStrings.inputValue);
            fieldArray = Array.prototype.slice.call(fields);
            fieldArray.forEach(function(current, index, fieldArray){
                current.value = "";
            });
        },

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
        var input,newItem;
        input = UICtrl.getInput();
        newItem = budgetCtlr.addItem(input.type,input.description,input.value);
        UICtrl.addListItem(newItem, input.type);
        UICtrl.clearFields();
    }

    return {
        init: function(){
            console.log("started");
            setupEventListeners();
        }
    }

})(budgetController,UIcontroller);

controller.init();