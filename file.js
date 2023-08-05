// elements needed 

let nextBtn = document.getElementsByClassName("next-btn");
let previousBtn = document.getElementsByClassName("previous-btn");
let pageSlides = document.getElementsByClassName("steps");
let currentSlide = 0;
let valid = true;
let infoGetters  = document.getElementsByClassName("info-getters");
let alert = document.getElementsByClassName("alert-message");
const stepIndicator = document.getElementsByClassName("step-indicator");
const usernameGetter = infoGetters[0];
const emailGetter = infoGetters[1];
const phoneNoGetter = infoGetters[2];

// displaying the first slide and indicator
pageSlides[currentSlide ].classList.add("active");
stepIndicator[currentSlide].classList.add("taken");


// checking validity of inputs value 
function validateInputs(getter, regexp, index,format,maxLenght,minLenght) {
    let infoValue = getter.value.trim();

    let alertMessage = alert[index];


    if (infoValue === ""){

        alertMessage.textContent = "this field is reqired";
        getter.classList.add("wrong");
        valid = false;
        return;

    } else if (!infoValue.match(regexp)){

        alertMessage.textContent = `wrong format ${format} only`;
        getter.classList.add("wrong");
        valid = false;
        return;

    } else if (infoValue.length < minLenght){

        alertMessage.textContent = `Cannot be less than ${minLenght}`;
        getter.classList.add("wrong");
        valid = false;
        return;

    } else if (infoValue.length > maxLenght){

        alertMessage.textContent = `Cannot be greater than ${maxLenght}`;
        getter.classList.add("wrong");
        valid = false;
        return;

    }else{

        alertMessage.textContent = "";
        getter.classList.remove("wrong");

    }
}



//  performancing validity on each input while value is been passed into it 
usernameGetter.addEventListener("input", function () {
    validateInputs(usernameGetter, /^[A-Za-z ]+$/, 0, "letters", 50, 5); 
})

emailGetter.addEventListener("input", function () {
    validateInputs(emailGetter, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 1, "emails");
})

phoneNoGetter.addEventListener("input", function () {
    validateInputs(phoneNoGetter, /^[0-9]+$/, 2, "numbers", 11, 11);
})


// function to remove any alert message while each input is in focus mode 
Array.from(infoGetters).forEach( function (getter,index){
    getter.addEventListener("input", function() {
        if(alert[index]){
            getter.classList.remove("wrong");
            alert[index].textContent = "";
            valid = true;
        }
    })
})




// function that check for validty status of each input and return corresponding alert 
function infoChecker () {

    valid = true;

    validateInputs(usernameGetter,/^[A-Za-z ]+$/,0,"letters",50,5);

    validateInputs(emailGetter, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,1,"emails");

    validateInputs(phoneNoGetter, /^[0-9]+$/, 2 , "numbers" , 11 , 11);

    return valid;
}


    
// first slide next button function to check if all input fileds are valid
nextBtn[0].addEventListener("click", function () {
    if( infoChecker()){
        pageSlides[currentSlide].classList.remove("active");
        stepIndicator[currentSlide].classList.remove("taken")
        currentSlide++;
        pageSlides[currentSlide].classList.add("active");
        stepIndicator[currentSlide].classList.add("taken");
    }
})
    


// plan slection functonalities
let plansItem = document.getElementsByClassName("plans-item");
let selectedPlan;
let amount = [];



// function to select plan in which when one plan is selcted its active while other is set to non active 
for (let i = 0; i < plansItem.length; i++) {

    plansItem[i].addEventListener('click', function planSelection() {

        for (let x of plansItem) {
            x.classList.remove("selected");
        }

        this.classList.add("selected");

        if (this.classList.contains("selected")) {

            const selectedPlanName = this.querySelector(".plans-name").textContent;
            const selectedPlanAmount = this.querySelector(".plans-amount").textContent;

            selectedPlan = {
                name: selectedPlanName,
                amount: selectedPlanAmount
            };
            console.log(selectedPlan)
            amount = [];
            amount.push(selectedPlanAmount);
            checkOut();
        }
    });
}

// second slide  nextBtn  to show the third slide if any plan is slected 
let selected = true;
nextBtn[1].addEventListener("click", function () {
    selected = true;
    if (!selectedPlan) {

        selected = false;
        window.alert("You have to select a plan");
        return;

    } else {
        pageSlides[currentSlide].classList.remove("active");
        stepIndicator[currentSlide].classList.remove("taken");
        currentSlide++;
        pageSlides[currentSlide].classList.add("active");
        stepIndicator[currentSlide].classList.add("taken");
    }
});




// previous buttons funtionalities



// add on functionalities 
let addOnsItem = document.getElementsByClassName("add-ons-item");
let selectionList = [];
let charge = [];

for(let i = 0; i < addOnsItem.length; i++){
    addOnsItem[i].addEventListener("click", function () {
        selectAddOn(this);
    })
}

// function to select each add on and add them to an array to be displayed in the cart 
function selectAddOn(selecter) {
let selectedServiceName, selectedServiceCharge, indexOfService, addOnSelector;
    if (!selecter.classList.contains("selected")) {
        selecter.classList.add("selected");
        let serviceName = selecter.getElementsByClassName("services")[0];
        let serviceCharge = selecter.getElementsByClassName("add-ons-charges")[0];
        addOnSelector = selecter.getElementsByClassName("add-ons-selector")[0];
        addOnSelector.checked = true;

        selectedServiceName = serviceName.textContent;
        selectedServiceCharge = serviceCharge.textContent;
        indexOfService = Array.from(addOnsItem).indexOf(selecter);

        selectionList.push({
            name: selectedServiceName,
            charge: selectedServiceCharge,
            index: indexOfService
        });
        charge.push(selectedServiceCharge);
        console.log(JSON.stringify(charge));
        console.log(JSON.stringify(selectionList));
    } else {
        selecter.classList.remove("selected");
        let theIndex = Array.from(addOnsItem).indexOf(selecter);
        let removeIndex = selectionList.findIndex(item => item.index === theIndex);
        selectionList.splice(removeIndex, 1);
        charge.splice(removeIndex, 1);
        addOnSelector = selecter.getElementsByClassName("add-ons-selector")[0];
        addOnSelector.checked = false;
        console.log(JSON.stringify(selectionList));
        console.log(JSON.stringify(charge));
    }
    checkOut();
}


// addOnSelector input-checkbox performing add-on-slection function 
let addOnSelector = document.getElementsByClassName("add-ons-selector");
 for(let i = 0; i < addOnSelector.length; i++){
    addOnSelector[i].addEventListener("click", function() {
        selectAddOn(addOnsItem[i])
})
}


//  check out infos

// function to display each item and amount 
function checkOut() {

    let addOnsDisplay = document.getElementById("add-ons-selections");
    const planNameDisplay = document.getElementById("plan-name-display");
    const planAmountDisplay = document.getElementById("plan-amount-display");
    
    // clear any existing text 
    addOnsDisplay.innerHTML = "";
    planNameDisplay.textContent = "";
    planAmountDisplay.textContent = "";

    selectionList.forEach(item => {
        let checkOutService = `<div class="item-list">
          <p>${item.name}</p>
         <p class="amount-mounter">$${item.charge}<span class="duration">/mo</span></p>
          </div>`;
        addOnsDisplay.innerHTML += checkOutService;
    });

    planNameDisplay.textContent = selectedPlan.name;
    planAmountDisplay.textContent = selectedPlan.amount;

    totalCheckOutAmount();
}



// function to calculate the toatal amount of item selected 
// let totalAmount = [...amount, ...charge];
function totalCheckOutAmount() {

     let totalAmount = [...amount, ...charge];
     let totalAmountDisplayer = document.getElementById("total-amount")
     totalAmountDisplayer.textContent  = "";
     let total = 0;
     for (let i = 0; i < totalAmount.length; i++) {
        total += (Number(totalAmount[i]));
     }
    totalAmountDisplayer.textContent = total;
}




// function to go 2 steps backward to change the plan
const planChangerBtn = document.getElementById("plan-changer-btn");

planChangerBtn.addEventListener("click", function() {
    if (currentSlide > 0) {
        pageSlides[currentSlide].classList.remove("active");
        stepIndicator[currentSlide].classList.remove("taken");
        currentSlide--;
        currentSlide--;
        pageSlides[currentSlide].classList.add("active");
        stepIndicator[currentSlide].classList.add("taken");
    }
})



// plans amount changer functionalities start


let billChanger  = document.getElementById("toggle-check");
    billChanger.addEventListener("click", function () {
        amountChange(this)
    })



// functiom to change the amount and duration to momthly or yearly 

function amountChange(checker) {

    let planDuration = document.getElementsByClassName("duration");
    let discounts = document.getElementsByClassName("discount");
    let billChange = document.getElementsByClassName("charges-amounts-change");
    let planPeriodDisplay = document.getElementById("plan-period-display");
    let planPeriod = document.getElementById("plan-period");
    const monthSelect = document.getElementsByClassName("month")[0];
    const yearSelect = document.getElementsByClassName("year")[0];
    let monthlyBill,yearlyBill;


    if (checker.checked) {
        for( let duration of planDuration){
            duration.textContent = " /yr"
        }

        for ( let item of discounts) {
            item.style.display = "block";
        }

        for( let bill of billChange){
            yearlyBill = parseInt(bill.textContent) * 10;
            bill.textContent = yearlyBill;
        }

        charge = charge.map((item) => item * 10);
        amount = amount.map((item) => item * 10);

        for (let i = 0; i < selectionList.length; i++) {
            selectionList[i].charge = selectionList[i].charge * 10;
        }
        
        selectedPlan.amount = selectedPlan.amount * 10;
        planPeriodDisplay.textContent = "yearly";
        planPeriod.textContent = "year";

        monthSelect.classList.add("previous-duration");
        yearSelect.classList.add("current-duration");
      
    } else {
        
        for ( let duration of planDuration) {
            duration.textContent = " /mo"
        }

        for (let item of discounts) {
            item.style.display = "none";
        }

        for ( let bill of billChange) {
            monthlyBill = parseInt(bill.textContent) / 10;
            bill.textContent = monthlyBill;
        }

        for (let i = 0; i < selectionList.length; i++) {
            selectionList[i].charge = selectionList[i].charge / 10;
        }

        charge = charge.map((item) => item / 10);
        amount = amount.map((item) => item / 10);

        selectedPlan.amount = selectedPlan.amount / 10;
        planPeriodDisplay.textContent = "monthly";
        planPeriod.textContent = "month";

        monthSelect.classList.remove("previous-duration");
        yearSelect.classList.remove("current-duration");
    }
    checkOut();
    
}


//  function for the last other slides nextBtn 
for (let i = 2; i < nextBtn.length; i++) {
    nextBtn[i].addEventListener("click", function () {

        if (currentSlide < pageSlides.length) {
            pageSlides[currentSlide].classList.remove("active");
            stepIndicator[currentSlide].classList.remove("taken");
            currentSlide++;
            pageSlides[currentSlide].classList.add("active");
            stepIndicator[currentSlide].classList.add("taken");
        }

    });
}


// function for  all slides previous btn 
for (let i = 0; i < previousBtn.length; i++) {
    previousBtn[i].addEventListener("click", function () {
        if (currentSlide > 0) {
            pageSlides[currentSlide].classList.remove("active");
            stepIndicator[currentSlide].classList.remove("taken");
            currentSlide--;
            pageSlides[currentSlide].classList.add("active");
            stepIndicator[currentSlide].classList.add("taken");
        }
    });
}



// function to display feedback message after completing the form 
let confirmBtn = document.getElementById("confirm-btn");
confirmBtn.addEventListener("click", function () {
    if (currentSlide < pageSlides.length) {
        document.getElementsByClassName("step-four")[0].classList.remove("active");
        document.getElementsByClassName("step-five")[0].classList.add("active");
        document.getElementsByClassName("step-indicator")[3].classList.remove("taken");
    }
})

