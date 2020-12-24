// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// Add your functions below:
function validCred(array) {
    const arrLength = array.length;
    const checkDigit = array[arrLength-1];
    let luhnArray = [];
    luhnArray.unshift(checkDigit);
    let luhnDigit;
    
    // modify all the digits according to Luhn
    for(let i = 0; i <= arrLength-2; i++){
        currentElement = array[arrLength-2-i]
        if(i%2===0){
            doubling = currentElement*2;
            if(doubling > 9){
                luhnDigit = doubling - 9;
            } else {
                luhnDigit = doubling;
            }
        } else{
            luhnDigit = currentElement;
        }
        luhnArray.unshift(luhnDigit);
    }
    
    // sum all the digits
    total = luhnArray.reduce(function(acc, curr){return acc+=curr});

    //checkModulo
    isValid = (total%10 === 0);
    return isValid;

}



function findInvalidCards(cardArray){
    let isValid;
    let areInvalid = [];
    for(let i in cardArray){
        currentCard = cardArray[i];
        isValid = validCred(currentCard);
        if (!isValid){
            areInvalid.push(currentCard);
        }
    }
    return areInvalid;
}


function idInvalidCardCompanies(invalidCards){
    let cardCompanies = {
        3: {name: 'Amex', isValid: true}
        , 4: {name: 'Visa', isValid: true}
        , 5: {name: 'Masercard', isValid: true}
        , 6: {name: 'Discover', isValid: true} 
    };

    let invalidCompanies = []
    let firstDigit;   
    let thisCardCompany;

    for (let i in invalidCards){
        firstDigit = invalidCards[i][0];
        thisCardCompany = cardCompanies[firstDigit].name ;
        if (thisCardCompany){
            cardCompanies[firstDigit].isValid = false;
        } else{
            console.log(`Card company not recognised - first digit: ${firstDigit}`)
        }
    }

    for(let j in cardCompanies){
        
        if (!cardCompanies[j].isValid){
            invalidCompanies.push(cardCompanies[j].name);
        }

    }

    return(invalidCompanies);
}

//console.log(idInvalidCardCompanies(findInvalidCards(batch)))

//console.log(findInvalidCards([valid1, valid2, valid3, valid4, valid5]));// Shouldn't print anything

//console.log(findInvalidCards([invalid1, invalid2, invalid3, invalid4, invalid5])); // Should print all of the numbers

//console.log(findInvalidCards(batch)); // Test what the mystery numbers are




function stringToArray(str){
    return str.split('').map(value => parseInt(value,10))
}


console.log(validCred(stringToArray('4532650863897014')));


