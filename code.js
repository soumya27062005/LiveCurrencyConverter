const dropdowns = document.querySelectorAll(".dropdowns select");
const btn = document.querySelector("form button");

const toCurrency = document.querySelector(".to select");
const fromCurrency = document.querySelector(".from select");

const globalAmount = document.querySelector(".amount input");

const resultInput = document.querySelector(".result input");

const API = "https://www.amdoren.com/api/currency.php?api_key=evdrBJjGdW48T5yJps9mCTAVd6DWaW&";


for (let select of dropdowns) {
    for (let code of Object.keys(countryList)) {
        let opt = document.createElement("option");

        opt.innerText = code;
        opt.value = code;

        if (select.name === "from" && code === "PKR")
            opt.selected = "selected";

        if (select.name === "to" && code === "USD")
            opt.selected = "selected";

        select.append(opt);
    }

    select.addEventListener("change", (evt) => {
        updateflag(evt.target);
    });

    updateflag(select);
}


function updateflag(element) {
    let currcode = element.value;

    let cntrycode = countryList[currcode];

    let newsrc =
        `https://flagsapi.com/${cntrycode}/flat/64.png`;

    let img =
        element.parentElement.querySelector("img");

    img.src = newsrc;
}


btn.addEventListener("click", async (evt) => {

    evt.preventDefault();

    let amtVal = globalAmount.value;

    if (amtVal === "" || amtVal <= 0) {
        alert("Enter valid amount");
        globalAmount.value = "0.00";
        return;
    }


    const URL =
        `${API}from=${fromCurrency.value}&to=${toCurrency.value}&amount=${amtVal}`;


    try {

        const res = await fetch(URL);

        const data = await res.json();


        if (data.error === 0) {

            resultInput.value = data.amount;

        }
        else {

            alert("Conversion failed");

        }

    }

    catch (err) {

        console.log(err);

        alert("API error");

    }

});
