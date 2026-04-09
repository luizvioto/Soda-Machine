let url = "https://api.jsonbin.io/v3/b/69d64173aaba882197d7779a";

let selected = null;

fetch(url)
    .then(resposta => resposta.json())
    .then(function(dados){
        const sodaListContainer = document.getElementById("sodaListContainer");
        const listaBebidas = dados.record.bebidas;

        listaBebidas.forEach(bebida => {
            const botao = document.createElement("button");
            botao.innerHTML = `${bebida.sabor}`;

            botao.addEventListener('click', () => {
                const preco = document.getElementById("price");
                preco.innerHTML = `Preço<br>${bebida.preco.toFixed(2)}`;
                selected = bebida;
                
            });

            sodaListContainer.appendChild(botao);
        });
        console.log(dados);
    })
    .catch(erro => console.error("Erro: ", erro));

const moeda25 = document.getElementById("coin25");
const moeda50 = document.getElementById("coin50");
const moeda100 = document.getElementById("coin100");
const dropzone = document.getElementById("sodaMachineContainer");
const cash = document.getElementById("cash");

moeda25.draggable = true;
moeda50.draggable = true;
moeda100.draggable = true;

let valorArrastado;
let saldo = 0;

moeda25.ondragstart = function(e) {
    valorArrastado = 0.25;
}

moeda50.ondragstart = function(e) {
    valorArrastado = 0.5;
}

moeda100.ondragstart = function(e) {
    valorArrastado = 1.0;
}

dropzone.ondragover = function(e) {
    e.preventDefault();
}

dropzone.ondrop = function(e){
    saldo += valorArrastado;
    cash.innerHTML = `Saldo:<br>${saldo.toFixed(2)}`;
}

const confirm = document.getElementById("confirm");
const output = document.getElementById("output");
confirm.addEventListener('click', () => {
    if(selected==null){
        output.innerHTML = "Nenhuma bebida selecionada";
    }else if(selected.preco > saldo){
        output.innerHTML = "Saldo insuficiente";
    }else{
        output.innerHTML = `Refrigerante ${selected.sabor} liberado`;
        if(saldo>selected.preco){
            output.innerHTML += `<br>Troco: ${(saldo-selected.preco).toFixed(2)}`;
        }
        saldo = saldo - selected.preco;
        cash.innerHTML = `Saldo:<br>${saldo.toFixed(2)}`;
    }
});

