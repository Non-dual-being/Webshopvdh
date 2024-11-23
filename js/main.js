"use strict";

const tekenteller = document.getElementById('tekenTeller');
const voornaamInputveld = document.querySelector('#persoonVoornaam');
const voornaamInputveldMelding = document.querySelector('#persoonVoornaamMelding');
const achternaamInputveld = document.querySelector('#persoonAchternaam');
const achternaamInputveldMelding = document.querySelector('#persoonAchternaamMelding');
const emailadresInputveld = document.querySelector('#emailadres');
const emailadresInputveldMelding = document.querySelector('#emailadresMelding');
const textareaInputveld = document.getElementById('vragenVerzoeken');
const textareaInputveldMelding = document.getElementById('vragenVerzoekenMelding');

// Toon foutmelding
function toonFoutmelding(foutElement, foutmelding, cssClasse, element, duur = 10000) {
    foutElement.textContent = foutmelding;
    foutElement.style.display = "block";
    foutElement.classList.add(cssClasse);

    const parent = element.offsetParent; // De dichtstbijzijnde gepositioneerde ouder
    const rect = element.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();

    // Bereken de positie relatief aan de ouder
    foutElement.style.left = `${rect.left - parentRect.left}px`;
    foutElement.style.top = `${rect.top - parentRect.top - foutElement.offsetHeight - 50}px`;



    setTimeout(() => {
        hideFoutmelding(foutElement);
    }, duur);
}

function hideFoutmelding(foutElement) {
    foutElement.style.opacity = "0.5"; // Fade-out
    setTimeout(() => {
        foutElement.style.display = "none"; // Volledig verbergen
        foutElement.textContent = ""; // Wis de foutmelding
        foutElement.opacity = "1";
        foutElement.className = "form__Melding"; // Reset klassen
    }, 600);
}


// Verberg foutmelding en herstel stijl
function hideFoutmelding(foutElement) {
    setTimeout(() => {
        foutElement.textContent = ""; // Wis de foutmelding
        foutElement.style.display = "none";
        foutElement.classList = "";
        foutElement.classList.add("form__Melding"); // Reset de klassen naar alleen de algemene klass
    }, 600);
}


function valideerVoornaam(waarde) {
    const maxLength = 50;
    const onlyLetters = /^[\p{L}\s.-]*$/u;
     // Deze regex controleert of een string alleen letters, spaties, punten, en koppeltekens bevat.
    // 
    // /^         -> Begin van de string (anchor).
    // [          -> Begin van een tekenklasse (set van toegestane tekens).
    // \p{L}      -> Een Unicode-teken dat wordt herkend als een letter (bijv. a-z, A-Z, á, é, etc. in alle talen).
    // \s         -> Een spatie, tab, of ander witruimtekarakter.
    // .          -> Een punt (letterlijk).
    // -          -> Een koppelstreepje (letterlijk).
    // ]          -> Einde van de tekenklasse.
    // *          -> Staat 0 of meer herhalingen van de bovenstaande tekens toe.
    // $          -> Einde van de string (anchor).
    // u          -> Unicode-modus om \p{L} goed te laten werken.

    if (waarde.length === 0) {
        return { type: "melding", message: "Dit veld mag niet leeg blijven." };
    }

    if (waarde.length > maxLength) {
        return { type: "fout", message: `De voornaam mag maximaal ${maxLength} tekens bevatten.` };
    } else if (!onlyLetters.test(waarde)) {
        return { type: "fout", message: "De voornaam mag alleen letters, een punt of een koppelteken bevatten." };
    }

    return null; // Geen foutmelding of melding
}


function valideerAchternaam(waarde) {
    const maxLength = 50;
    const onlyLetters = /^[\p{L}\s.-]*$/u;

    if (waarde.length === 0) {
        return { type: "melding", message: "Dit veld mag niet leeg blijven." };
    }
    

    if (waarde.length > maxLength) {
        return { type: "fout", message: `De achternaam mag maximaal ${maxLength} tekens bevatten.` };
    } else if (!onlyLetters.test(waarde)) {
        return { type: "fout", message: "De achternaam mag alleen letters, een punt of een koppelteken bevatten." };
    }
    return null; // Geen foutmelding
}

function valideerEmail(waarde) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const maxLength = 100; // Maximale lengte van het e-mailadres

    // Deze regex controleert of een string een geldig e-mailadres is volgens een basismodel.
    //
    // /^               -> Begin van de string (anchor).
    // [a-zA-Z0-9._%+-] -> Een tekenklasse die letters (hoofd- en kleine letters), cijfers, 
    //                     punten (.), underscores (_), procenttekens (%), plus (+), of mintekens (-) toestaat.
    // +                -> Staat 1 of meer herhalingen van de bovenstaande tekens toe (lokale e-mailadres-gedeelte).
    // @                -> Een apenstaartje (@), vereist als scheiding tussen de lokale en domeingedeelten.
    // [a-zA-Z0-9.-]    -> Een tekenklasse die letters, cijfers, punten (.), en koppeltekens (-) toestaat (domeinnaam-gedeelte).
    // +                -> Staat 1 of meer herhalingen van de bovenstaande tekens toe.
    // \.               -> Een letterlijke punt (.) die de scheiding tussen de domeinnaam en de extensie markeert.
    // [a-zA-Z]{2,}     -> Een reeks van minimaal 2 letters die de extensie vertegenwoordigt (bijv. "com", "org").
    // $                -> Einde van de string (anchor).


    if (waarde.length === 0) {
        return "Dit veld mag niet leeg blijven."; 
    }
    

    if (waarde.length > maxLength) {
        return `Het e-mailadres mag maximaal ${maxLength} tekens bevatten.`;
    } else if (!emailRegex.test(waarde)) {
        return "Voer een geldig e-mailadres in zoals henk.deschepper@hotmail.com";
    }
    return ""; // Geen foutmelding
}

function valideerVragenenOpmerkingen(waarde) {
    const maxLength = 600;  
    const vragenenOpmerkingenRegex = /^[A-Za-z0-9\s.,:?!]+$/;

    if (waarde.length === 0){
        return "";
    }
    
    if (waarde.length > maxLength) {
        return `Dit veld mag max ${maxLength} tekens bevatten.`;
    } else if (!vragenenOpmerkingenRegex.test(waarde)) {
        return "Speciale tekens zoals } of / kunnen niet gebruikt worden";
    }
    return ""; // Geen foutmelding
}

function verzendknopMelding(waarde) {
   return {type: "melding", message: waarde}
}

function verzendknopFoutMelding(waarde) {
    return {type: "fout", message: waarde}
 }

// Algemene validatiefunctie
function valideerInvoer(veld, foutElement, validatieFunctie) {
    const waarde = veld.value.trim(); // Haal de waarde van het veld op
    const validatieResultaat = validatieFunctie(waarde);

    function applyFieldStyle (veld, type) {
        if (type === "fout") {
        veld.style.borderColor = "rgba(255, 165, 0, 0.8)"; // Oranje rand
        veld.style.boxShadow = "0 0 8px rgba(255, 165, 0, 0.5)"; // Oranje schaduw
        veld.style.outline = "none"; // Geen outline
        veld.style.transition = "border-color 0.3s ease, box-shadow 0.3s ease"; // Overgangseffect
        } else if (type === "melding" || "reset") {
        veld.style.borderColor = ""; // Oranje rand
        veld.style.boxShadow = ""; // Oranje schaduw
        veld.style.outline = ""; // Geen outline
        veld.style.transition = ""; // Overgangseffect
        }
    }

    if (validatieResultaat) {
        const { type, message } = validatieResultaat;

        // Voeg focus toe bij fout
        if (type === "fout") {
            veld.focus();
            toonFoutmelding(foutElement, message, "form__Foutmelding", veld);
            applyFieldStyle(veld, type);
         
            
        } else if (type === "melding") {
            toonFoutmelding(foutElement, message, "form__Infomelding", veld);
            applyFieldStyle(veld, type);

        }

        return false;
    } else {
        hideFoutmelding(foutElement); // Verberg foutmelding
        applyFieldStyle(veld, "reset");
        return true;
    }
}


function tekenTellerUpdate () {

    const maxTekens = 600;
    let resterendeTekens = '';
    if (textareaInputveld.value.length >= 0 && textareaInputveld.value.length < 601) {
        tekenteller.style.display = 'block';
        resterendeTekens = maxTekens - textareaInputveld.value.trimStart().length;
        console.log(textareaInputveld.value.trimStart().length);
        tekenteller.textContent = `${resterendeTekens} tekens over`;    
    }
}

function hideTekenteller () {
    tekenteller.style.display = 'none';
}

textareaInputveld.addEventListener('input', tekenTellerUpdate); 
textareaInputveld.addEventListener('input', tekenTellerUpdate); 
voornaamInputveld.addEventListener("blur", () => {
    valideerInvoer(voornaamInputveld, voornaamInputveldMelding, valideerVoornaam);
});

achternaamInputveld.addEventListener("blur", () => {
    valideerInvoer(achternaamInputveld, achternaamInputveldMelding, valideerAchternaam);
});



