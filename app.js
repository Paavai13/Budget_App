var budgetController = (function() {

})();

var UIcontroller = (function() {

})();

var controller = (function(budgetCtlr,UICtrl){

    var ctrlAddItem = function(){
        console.log("it works");
    }

    document.querySelector('.add__btn').addEventListener('click',ctrlAddItem);
    document.addEventListener('keypress',function(){
        if(event.keyCode === 13)
            ctrlAddItem();
    });

})(budgetController,UIcontroller);