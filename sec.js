const base_url="https://api.frankfurter.app/latest?";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");




for(let select of dropdowns){
    for(currcode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText= currcode;
        newOption.value= currcode;
        if(select.name==="from"&&currcode==="USD"){
            newOption.selected= "selected";
        }
        else if(select.name==="to"&&currcode==="INR"){
            newOption.selected = "select";

        }
        select.append(newOption);
    }

    select.addEventListener("change" , (evt)=>{
        updateFlag(evt.target);
    });
}

const updateExchangeRate = async()=>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    
    if(amtVal===""||amtVal<1){
     amtVal=1;
     amount.value = "1";
    }
    
    const url = `${base_url}amount=${amtVal}&from=${fromCurr.value}&to=${toCurr.value}`;
    
    let response = await fetch(url);
    let data = await response.json();
    let rate = data.rates[toCurr.value];
    
    
     
    
    msg.innerText = `${amtVal} ${fromCurr.value} = ${rate}  ${toCurr.value}`
}

const updateFlag=(element)=>{
    let currcode = element.value;
    let countryCode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;

}



btn.addEventListener("click" ,  (evt)=>{
   evt.preventDefault();
   updateExchangeRate();
  

   
});

window.addEventListener("load",()=>{
    updateExchangeRate();
 });

