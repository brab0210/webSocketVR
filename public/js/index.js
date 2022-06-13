//const socket = io.connect('http://192.168.100.14:6677',{'forceNew':true});
const socket = io();


socket.on('messages',function(data){
    //console.log(data);
    render(data);
});

function render(data){
    let html = data.map(function(message, index){
        return (`<div class="message">
            <strong>${message.nickname}</strong> dice:
            <p>${message.text}</p>
        </div>`);
    }).join(' ');

    let msg = document.getElementById('message');
    msg.innerHTML = html;
    msg.scrollTop = msg.scrollHeight;
}

function addMessage(e){
    let message = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value,
    };
    document.getElementById('nickname').style.display= 'none';
    socket.emit('add-message', message);
    document.getElementById('text').innerText = "";
    return false;
}
    



