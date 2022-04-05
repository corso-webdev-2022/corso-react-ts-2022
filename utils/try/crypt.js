
{/*
simple implementation :
https://stackoverflow.com/questions/18279141/javascript-string-encryption-and-decryption
https://dev.to/paragonie/message-encryption-in-javascript-and-php-cg9
https://www.shellhacks.com/encrypt-decrypt-file-password-openssl/
*/}

const _DEBUG = false;

// il corpo della funzione è chiuso tra le partentesi ()
// mi serve se voglio tenere il codice in linea, in quannto console.log non restituisce nulla
// cosi senza andare a capo con il ; , gli diciamo "fai questo e poi questo"

const logger = (msg, val) => (console.log(msg, val), val);

/**  identity
  funzione identità, restituisce il paramentro passato, funzione apparentemente inutile,
    ma comoda da passare ai map con una condizione che indica se trasformare o no i valori,
    nel nostro caso la utilizziamo per non eseguire il log di debug
*/

const identity = val => val;

/** log
  chiama il logger se _DEBUG = true, se no l'identità che non esegue il console.log
  log è dichiarato come funzione che prende msg, e restituisce una funzione che prende val,
  in questo modo è utile per passare ulteriori parametri a funzioni di map,
  log('textToChar') --> questo restituisce val=> _DEBUG ? logger(msg, val) : identity;
  che è la funzione di map che mi interessa, la quale passa il parametro del valore

  msg trovandosi dentro la prima funzione, la seconda che è figlia, vede il valore
  evitiamo cosi di utilizzare una variabile esterna.

 * */
const log = msg => val => _DEBUG ? logger(msg, val) : val; // se _DEBUG = false, restituisci il valore, come bypass al map e non esegue il log

const crypt = (salt, text) => {

    // la mia stringa viene trasformata in un array di codice  carattere
    const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
    // trasformo i valori decimali di char, in base esadecimale
    // l'esadecimale è esprimere un numero con un solo carattere,
    // avendi 16 valori e il mio numero massimo con un carattere è 9,
    // il 10, 11, 12, 13, 14, 15 li scrivo con 1 carattere non numerico a, b, c, d, e , f
    // quindi un suo singolo numero può avere i seguenti valori
    // 0, 1, 2, 3,   4, 5, 6, 7,   8, 9, A, B,   C, D, E, F
    // sono 16 caratteri in totale
    // se cambio .toString(16) con .toString(20) creo una altra base, e cambio l'algoritmo

    const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);

    // dentro a ^ b , ^ è l'operatore XOR che è Bitwise Operators
    // a & b significa a and b, che è diverso a  a && b , che siginfica se vero o falso
    // a & b, signica trasformare direttame i bit dei valori,
    // se ho 3 che è un binario 11 e 2 che è in binario 10
    // e faccio 3 & 2 significa fare :
    // 11 AND
    // 10
    // risultato 10
    // quindi come se faccessi la somma , prendo la prima colonna e facco 1 and 0 che è 0
    // la seconda 1 && 1 che è 1, quindi diventa 1 e 1
    // invece se faccio 3 | 2
    // 11 OR
    // 10
    // risultato 11
    // invece se faccio 3 ^ 2

    // faccio lo XOR, cio se :
    // 0 XOR 0 = 0
    // 0 XOR 1 = 1
    // 1 XOR 0 = 1
    // 1 XOR 1 = 0

    // funziona quasi come l'or ma è vero solo se i due valori sono diversi, se uguali è falso

    const criptoLogic = (a, b) => log('a=')(a ^ b);

    // qui cicla salt, la mia chiave per descrittografare,
    // e usa la funzione textToChars che  la trasforma in char che sono numeri
    // poi fa il reduce, prendendo il primo char di salt,
    //  e il singolo char code passato da map(textToChars) che è il mio testo (text) da crittografare,
    // il risultato quindi del primo carattere di text, viene fatto lo XOR con il carattere code,
    // che è il carattere corrente di salt

    const applySaltToChar = (code) => textToChars(salt).reduce(criptoLogic, code);
    const alphaChar ='@!][()/%$£?-#=;:'; // 16 caratteri
    const insertAlpha = (acc, byte, i, word) =>{
        if (i<1) return acc;
        const isLess = byte < word[i-1];
        const  nAplha =  parseInt(byte, 16); // prende un carattere di alphaChar alla posizione
        
        console.log(`acc=${acc} byte=${byte} car= ${car}`);
        return acc;
    };

    return text
        .split("")
        .map(textToChars).map(log('textToChar'))
        .map(applySaltToChar).map(log('applySaltToChar'))
        .map(byteHex).map(log('byteHex'))
        .reduce(insertAlpha, [])
        .join("");
};

const decrypt = (salt, encoded) => {
    const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
    const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
    return encoded
        .match(/.{1,2}/g)
        .map((hex) => parseInt(hex, 16))
        .map(applySaltToChar)
        .map((charCode) => String.fromCharCode(charCode))
        .join("");
};

const errorMissingPar = `
Error missing param !!
call crypt with key master, and word to crypt like this :

crypt myKey wordToCrypt
or crypt myKey wordToDecrypt -D for decrypt
`
const manText =`
crypt utility

examples :

crypt myPasswordMaster google.com

Generate this password that I dont need to rember !! :

12AB36334CC35F245F

I remeber myPasswordMaster, for all my generate password,
When i need password for goole.com I call the same command 

crypt myPasswordMaster google.com
for show the password

if I use for another site : 

crypt myPasswordMaster github.com
generate different password based on site domain example :

23AAB4414C2D33F22

Where i can read with same command like before. 

If i want see the original site , by generare password 

crypt myPasswordMaster 12AB36334CC35F245F -D

this command give back the name of the site 
google.com

and this crypt myPasswordMaster 12AB36334CC35F245F -D
github.com`;

function readParam(){
    const [salt, text, param] = process.argv.slice(2); // prende i primi 2 argomenti della console
    // return console.log('xxx', salt, text);
    if (!salt || !text) return console.log(errorMissingPar);
    const op = !!param && !!param[1] ? param[1].toUpperCase() : ''; // legge i parametri senza il - davanti
const isDecyipt = op === 'D';
// console.log(`\nmaster key = ${salt}`);
// console.log(`word to ${isDecyipt ? 'decrypt' : 'crypt'} = ${text}`);
const opFunc = () => isDecyipt ? decrypt : crypt;

console.log(`
${ isDecyipt ? 'decrypt :\n' : 'password generate :\n'}
${isDecyipt ? decrypt(salt, text) : crypt(salt, text)}
`);
}

const usageText = `
usage examples :

    crypt myPasswordMaster google.com

    use -D for last argument for decrypt
`;

readParam();

