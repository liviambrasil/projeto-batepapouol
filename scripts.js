let username = prompt ("Qual é o seu nome?");

function verifyName () {
const requestname = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants",{name: username});
requestname.then(setInterval(presenceControll, 5000))
requestname.catch(repeatPrompt)
}

verifyName ();

function presenceControll (dataname) {
    axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/status", {name: username});
}

function repeatPrompt () {
    username = prompt("Digite um nome que não esteja em uso");
    verifyName ();
}


