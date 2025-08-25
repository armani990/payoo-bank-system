document.getElementById('login-btn').addEventListener('click', function(){
    // console.log('login')
    const mobileNumber = 01812952990
    const pin = 1212
    const mobileNumberValue = document.getElementById('mobile-num').value
    const mobileNumberValueConvert= parseInt(mobileNumberValue)
    const pinNumberValue= document.getElementById('pin').value
    const pinNumberValueConverted = parseInt(pinNumberValue);
    // console.log(mobileNumberValueConvert,pinNumberValueConverted)

    if(mobileNumberValueConvert===mobileNumber && pinNumberValueConverted===pin){
       window.location.href="./main.html"
    }else{
        alert('invalid process')
    }
})