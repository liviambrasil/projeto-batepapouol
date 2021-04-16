let username = prompt ("Qual é o seu nome?");
let text = document.querySelector("input");

function verifyName () {
    const requestname = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants",{name: username});
    requestname.then(setInterval(presenceControll, 5000))
    requestname.catch(repeatPrompt)
}

verifyName ();

function presenceControll () {
    axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/status", {name: username});
}

function repeatPrompt () {
    username = prompt("Digite um nome que não esteja em uso");
    verifyName ();
}

function getData () {
    const info = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages");
    info.then(renderMessages);
}

getData();

function renderMessages (content) {

    const chat = document.querySelector(".chat");
    let messages;

    console.log (content);
    for(i=0 ; i<content.data.length ; i++) {

        if (content.data[i].type === "status"){
            messageContent =
            `<div class="message gray">
                <p class=time>${content.data[i].time}</p>
                <p><span class=name ${content.data[i].type}>${content.data[i].from}</span> para <span class=name>${content.data[i].to}</span>: ${content.data[i].text}</p>
            </div>
            `
        }
        if (content.data[i].type === "private_message"){
            messageContent =
            `<div class="message red">
                <p class=time>${content.data[i].time}</p>
                <p><span class=name ${content.data[i].type}>${content.data[i].from}</span> para <span class=name>${content.data[i].to}</span>: ${content.data[i].text}</p>
            </div>
            `
        }
        if (content.data[i].type === "message"){
            messageContent =
            `<div class="message white">
                <p class=time>${content.data[i].time}</p>
                <p><span class=name ${content.data[i].type}>${content.data[i].from}</span> para <span class=name>${content.data[i].to}</span>: ${content.data[i].text}</p>
            </div>
            `
        }
        messages += messageContent;
        chat.innerHTML = messages;

    }     
    automaticSroll ();
}

setInterval (getData,3000)

function automaticSroll () {
    const lastMessage = document.querySelector(".message:last-child");
    lastMessage.scrollIntoView();
    console.log(lastMessage)
}

function sendMessage () {
    let verifyMessage = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages",
    {   from: `${username}`,
        to: "Todos",
        text: `${text.value}`,
        type: "message"
    })
    text.value = "";

    verifyMessage.then(getData);
    verifyMessage.catch(window.location.reload);
}

