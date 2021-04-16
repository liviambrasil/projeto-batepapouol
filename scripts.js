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

function displaySidebar () {
    let filter = document.querySelector(".darkBackground");
    let sidebar = document.querySelector(".sidebar");
    filter.classList.remove("hide");
    sidebar.classList.add("display-sidebar");
    console.log("foi");
    getContacts();
}

function getContacts () {
    let contacts = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants");
    contacts.then(renderContacts);
}

function renderContacts (contactsData){
    let contactList = document.querySelector(".contactlist");
    let contact1 = "<!---->";
    let usercontact;
    
    for (let i=0 ; i<contactsData.data.length; i++) {
        usercontact = `
            <div class="contact">
                <ion-icon name="person-circle"></ion-icon>
                <p>${contactsData.data[i].name}</p>
            </div>`;

    
    contact1 += usercontact;
    }

contactList.innerHTML = contact1;
console.log(contact1);
}
