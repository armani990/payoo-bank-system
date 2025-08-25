const validPin=1212
const transactionData=[]
// add money
function getInputValueNumber(id){
   const inputField = document.getElementById(id)
   const inputFieldValue = inputField.value
   const inputFeildValueNumber = parseInt(inputFieldValue)
   return inputFeildValueNumber;
}
function getInputValue(id){
    const inputField=document.getElementById(id)
    const inputFieldValue = inputField.value
    return inputFieldValue
}
// function to get inner text 
function getInnerText(id){
    const element = document.getElementById(id)
    const elementValue = element.innerText
    const elementValueNumber= parseInt(elementValue)
    return elementValueNumber
}

// to set innertext 
function setInnerText(value){
    const availableBalanceElement=document.getElementById('available-balance')
    availableBalanceElement.innerText = value
}
// toggle function
function togoleHandler(id){
    const forms = document.getElementsByClassName('form'); // <-- ঠিক করা হলো
    for(const form of forms){
        form.style.display = 'none';
    }
    document.getElementById(id).style.display = 'block';
}

// togol button color stylw
function toggolButton(id){
    const formBtns = document.getElementsByClassName('form-btn')

    for(const btn of formBtns){
        btn.classList.remove('border-[#0874f2]', 'bg-[#0874f20d]'); // ✅ সঠিক
        btn.classList.add('border-gray-300')
    }
    document.getElementById(id).classList.remove('border-gray-300')
    document.getElementById(id).classList.add('border-[#0874f2]','bg-[#0874f20d]')
}

// add-money
document.getElementById('add-money-btn').addEventListener('click', function(e){
 e.preventDefault()
//  console.log('add btn')
const bank =getInputValue('bank')
const accountNumber = document.getElementById('account-number').value
const amount =getInputValueNumber('add-amount')
if(amount<=0){
    alert('invalid amount')
    return;
}
const pin = getInputValueNumber('add-pin')
// console.log(bank,accountNumber,amount,pin)
const availableBalance = getInnerText('available-balance')
console.log(amount,availableBalance)

if(accountNumber.length<11){
    alert('please  provide valid account number')
    return;
}

if(pin !==validPin){
    alert('provide your valid pin number')
    return;
}
const totalAvailabe = amount+availableBalance

setInnerText(totalAvailabe);

const data = {
    name:'Add money',
    date: new Date().toLocaleTimeString()
}
transactionData.push(data)

})
// cashout feature
const pinAgent =1212
document.getElementById('withdraw-btn').addEventListener('click', function(e){
    e.preventDefault()
    // console.log('click button')
    const amount =getInputValueNumber('withdraw-amount')
    const availableBalance = getInnerText('available-balance')

    if(amount<=0 || amount>availableBalance){
        alert('invalid amount')
        return;
    }
    // console.log(amount,availableBalance)
    const agentNumber = document.getElementById('agent-number').value
    const agentPin= document.getElementById('add-pin-w').value

    if(agentNumber.length<11){
        alert('please provide your agent number')
        return;
    }
    if(pinAgent!=agentPin ){
        alert('provide your correct pin')
        return;
    }

    const totalNewAvailable = availableBalance-amount
    console.log(totalNewAvailable)

    setInnerText(totalNewAvailable)

    const data = {
    name:'Cashout',
    date: new Date().toLocaleTimeString()
}
transactionData.push(data)
})
// transfer feature

document.getElementById('send-btn').addEventListener('click', function(e){
    e.preventDefault();

    const receiverId = document.getElementById('transfer-id').value;
    const amount = getInputValueNumber('send-amount');
    const pin = getInputValueNumber('add-pin-send');
    const availableBalance = getInnerText('available-balance');

    // validation
    if(receiverId.length < 11){
        alert('Please enter a valid 11 digit account number');
        return;
    }
    if(pin !== validPin){
        alert('Wrong pin number');
        return;
    }
    if(amount <= 0 || isNaN(amount)){
        alert('Please enter a valid amount');
        return;
    }
    if(amount > availableBalance){
        alert('Insufficient balance!');
        return;
    }

    // update balance
    const newBalance = availableBalance - amount;
    setInnerText(newBalance);

    alert(`Successfully transferred ${amount} Tk to account ${receiverId}`);

    const data = {
    name:'Transfer Money',
    date: new Date().toLocaleTimeString()
}
transactionData.push(data)
});

// bonus feature
document.getElementById('bonus-get-btn').addEventListener('click', function(e){
    e.preventDefault();

    const coupon = getInputValue('bonus-id'); // ✅ তোমার helper function
    const availableBalance = getInnerText('available-balance');

    let bonusAmount = 0;

    // demo coupon list
    if(coupon === 'BONUS1000'){
        bonusAmount = 1000;
    } 
    else if(coupon === 'BONUS500'){
        bonusAmount = 500;
    }
    else if(coupon === 'BONUS200'){
        bonusAmount = 200;
    }
    else {
        alert('Invalid coupon code!');
        return;
    }

    const newBalance = availableBalance + bonusAmount;
    setInnerText(newBalance);   // ✅ reusable

    alert(`🎉 You got ${bonusAmount} Tk bonus!`);
    const data = {
    name:'Bonus',
    date: new Date().toLocaleTimeString()
}
transactionData.push(data)
});
// bill feature
document.getElementById('pay-bill-btn').addEventListener('click', function(e){
    e.preventDefault();

    const bank = getInputValue('bank-pay'); // select value
    const billNumber = getInputValue('pay-bill-number');
    const amount = getInputValueNumber('pay-amount');
    const pin = getInputValueNumber('pay-pin');
    const availableBalance = getInnerText('available-balance');

    // validation
    if(bank === 'Select back'){
        alert('Please select a bank to pay');
        return;
    }
    if(billNumber.length < 11){
        alert('Please enter a valid 11 digit biller account number');
        return;
    }
    if(pin !== validPin){
        alert('Wrong pin number');
        return;
    }
    if(isNaN(amount) || amount <= 0){
        alert('Please enter a valid amount');
        return;
    }
    if(amount > availableBalance){
        alert('Insufficient balance!');
        return;
    }

    // update balance
    const newBalance = availableBalance - amount;
    setInnerText(newBalance); // reusable function

    alert(`💸 Successfully paid ${amount} Tk to ${billNumber} via ${bank}`);

    const data = {
    name:'Payment Bill',
    date: new Date().toLocaleTimeString()
}
transactionData.push(data)
});
// show tramsaction 
document.getElementById('transaction-button').addEventListener('click',function(){
    const transactionContainer = document.getElementById('transaction-container')
    transactionContainer.innerText= ''

    for(const data of transactionData){
        const div = document.createElement('div')
        div.innerHTML =`<div class="bg-white rounded-xl mt-3 p-3 flex justify-between items-center">
            <div class="flex items-center">
                <div class="bg-[#f4f5f7] p-3 rounded-full">
                    <img src="./assets/wallet1.png" class="mx-auto" alt="">
                </div>
                <div class="ml-3">
                    <h1>${data.name}</h1>
                    <p>${data.date}</p>
                </div>
            </div>
            <i class="fa-solid fa-ellipsis-vertical"></i>
       </div>
         
        `

        transactionContainer.appendChild(div)
    }
})

// toggoling feature
document.getElementById('add-button').addEventListener('click', function(){
    togoleHandler('add-money-parent')
    toggolButton('add-button')
})

document.getElementById('cash-out-button').addEventListener('click', function(){
    togoleHandler('cash-out-parent')
    toggolButton('cash-out-button')
})
document.getElementById('transfer-button').addEventListener('click', function(){
    togoleHandler('transfer-money-parent')
    toggolButton('transfer-button')
})
document.getElementById('bonus-button').addEventListener('click', function(){
    togoleHandler('get-bonus-parent')
    toggolButton('bonus-button')
     
})
document.getElementById('bill-button').addEventListener('click', function(){
    togoleHandler('pay-bill-parent')
    toggolButton('bill-button')
    
})
document.getElementById('transaction-button').addEventListener('click', function(){
    togoleHandler('transaction-money-parent')
    toggolButton('transaction-button') // ✅ ঠিক করা
})


