var budgetController = (function() {

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var data = {
        allItems: {
            expense: [],
            income: []
        },
        totals: {
            expense: 0,
            income: 0
        },
        budget: 0,
        percentage: -1
    }


    return {
        addItem: function(type, desc, val) {
            var newItem, ID;


            if (data.allItems[type].length == 0){
                ID = 1;
            } else {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }


            if (type === 'expense') {
                newItem = new Expense(ID, desc, val);
            } else if (type == 'income') {
                newItem = new Income(ID, desc, val);
            }

            data.allItems[type].push(newItem);

            data.totals[type] += newItem.value;


            return newItem
        
        },
        calculateBudget: function() {
            var sumIncome = data.totals.income - data.totals.expense;
            data.budget = sumIncome;
            if (data.totals.income > data.totals.expense) {
                data.percentage = Math.round((data.totals.expense/sumIncome) * 100);
            } else {
                data.percentage = -1;
            }
            
        },
        getBudget: function() {
            return {
                budget: data.budget,
                totalIncome: data.totals.income,
                totalExpenses: data.totals.expense,
                percentage: data.percentage
            }
        }
    }

})();

var UIController = (function() {

    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        totalIncomeLabel: '.budget__income--value',
        totalExpenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage'

    }

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
            }
        },
        getDOMStrings: function() {
            return DOMStrings;
        },
        addListItem: function(item, type) {

            var html, newHtml, element;

            if (type == 'income') {
                html = '<div class="item clearfix" id=income-%id%> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">+ %value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
                element = DOMStrings.incomeContainer;
            } else if (type === 'expense'){
                html = '<div class="item clearfix" id="expense-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">-%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
                element = DOMStrings.expenseContainer;
            }

            newHtml = html.replace('%id%', item.id);
            newHtml = newHtml.replace('%description%', item.description);
            newHtml = newHtml.replace('%value%', item.value);


            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        clearFields: function() {
            var fields = document.querySelectorAll(DOMStrings.inputDescription + ',' + DOMStrings.inputValue);
            var fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function(current, index, array) {
                current.value = "";
            });

            fieldsArr[0].focus();

        },
        displayBudget: function(obj) {
            document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMStrings.totalIncomeLabel).textContent = obj.totalIncome;
            document.querySelector(DOMStrings.totalExpenseLabel).textContent = obj.totalExpenses;

            if (obj.percentage > 0) {
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMStrings.percentageLabel).textContent = '--';
            }
            
            console.log(obj);
        }
    }

})();

var controller = (function(budgetCtrl, UICtrl) {
    var input, newItem;

    var DOM = UICtrl.getDOMStrings()

    var updateBudget= function() {
        budgetCtrl.calculateBudget();

        var summary = budgetCtrl.getBudget();
        return summary



    };

    var ctrlAddItem = function() {

        input = UICtrl.getInput();

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            UICtrl.addListItem(newItem, input.type);
    
            UICtrl.clearFields();
    
            var budgetAndStuff = updateBudget();

            UICtrl.displayBudget(budgetAndStuff);
        }
    };

    var setUpEventListeners = function() {
        document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function() {
            if (event.keyCode == 13 || event.which == 13) {
                ctrlAddItem();
            }
        });
    }

    return {
        init: function() {
            console.log('Application has started');
            UICtrl.displayBudget({
                budget: 0,
                totalIncome: 0,
                totalExpenses: 0,
                percentage: -1
            });
            setUpEventListeners();
            
        }
    };


})(budgetController, UIController);

controller.init();