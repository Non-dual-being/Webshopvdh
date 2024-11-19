"use strict";

const tekenteller = document.getElementById('tekenTeller');
const textarea = document.getElementById('vragenVerzoeken');

function tekenTellerUpdate () {

    const maxTekens = 600;
    let resterendeTekens = '';
    if (textarea.value.length >= 0 && textarea.value.length < 601) {
        tekenteller.style.display = 'block';
        resterendeTekens = maxTekens - textarea.value.trimStart().length;
        console.log(textarea.value.trimStart().length);
        tekenteller.textContent = `${resterendeTekens} tekens over`;    
    }

}

function hideTekenteller () {
    tekenteller.style.display = 'hidden';
}


textarea.addEventListener('input', tekenTellerUpdate); 
textarea.addEventListener('input', tekenTellerUpdate); 


