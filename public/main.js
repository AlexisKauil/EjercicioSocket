var socket = io.connect('http://192.168.60.248:8081',{ 'forceNew': true });

socket.on('messages', function(data) {
  console.log(data);
  render(data);
})

function render (data) {
  var html = data.map(function(elem, index) {
    let html_string= string_expresion(elem.text);
    return(`<div class = "container-elements">
              <strong class="autor">${elem.author}</strong>:
              <em class="menssage">${elem.text}</em>
            </div> ${html_string}`);
  }).join(" ");

  document.getElementById('messages').innerHTML = html;
}

function addMessage(e) {
  var message = {
    author: document.getElementById('username').value,
    text: document.getElementById('texto').value    
  };
  socket.emit('new-message', message);
  return false;
}

let string_expresion = (date) => {
let vocales,palabras,mayusculas,numeros,ultimovocal;

    let vocal= date.match(/[aeiouAEIOUáéíóú]/gim,"");

        if(vocal === null){
          vocales = 0;
        }else {
          vocales = vocal.length;
        }

    let palabra = date.match(/(\w|á|é|í|ó|ú|ü|ñ|Ñ|Á|É|Í|Ó|Ú)+[\s\n\r\t,\.;:"'\(\)\{\}\[\]$]*/g);
        if(palabra === null){
          palabras = 0;
        }else{
          palabras = palabra.length;
        }

    let contenido = date.match(/(\b[A-Z|ÁÉÍÓÚ])[a-z|áéíóú|A-Z|ÁÉÍÓÚ]*/g);
        if(contenido === null){
          mayusculas = 0;
        }else{
          mayusculas = contenido.length;
        }

    let numero = date.match(/[0-9\b]/g,"");
        if(numero === null){
          numeros = 0;
        }else{
          numeros = numero.length;
        }

    let novocal = date.match(/[^aeiou\W\d]\b/g,"");
        if(novocal === null){
          ultimovocal = 0;
        }else{
          ultimovocal = novocal.length;
        }

        return `<p class="results"> 
                  (Vocales: ${vocales}) <br> (Palabras: ${palabras}) <br>(Numeros: ${numeros})<br> (Iniciomayuscula: ${mayusculas}) <br>(Terminacion no vocal: ${ultimovocal})</p>`;
        }


