var numeroNota = 0;

function criarElemento(element, classList = [], funcao, valor, placeholder) {
    const el = document.createElement(element);

    if (classList) {
        for (let i = 0; i < classList.length; i++) {
            el.classList.add(classList[i]);
        }
    }

    if (funcao) {
        el.addEventListener("click", function() {
            window[funcao.nome](funcao.valor);
        });
    }

    if (valor != null) {
        el.innerHTML = valor;
    }

    if (placeholder != null) {
        el.placeholder = placeholder;
    }

    return el;
}

function adicionarNota(quantidadeNotas) {
    const container = document.getElementById("container-notas");

    for (var i = 0; i < quantidadeNotas; i++) {
        numeroNota++; 

        const nota = criarElemento("div", ["row"]);
        container.appendChild(nota);
    
        const texto = criarElemento("p", ["mr-2"], null, "Nota " + numeroNota);
        nota.appendChild(texto);
    
        const valor = criarElemento("input", ["mr-2", "valor"], null, null, "Nota");
        nota.appendChild(valor);
    
        const peso = criarElemento("input", ["peso"], null, null, "Peso");
        nota.appendChild(peso);
    }
}

function calcularMedia() {
    const valores = document.getElementsByClassName("valor");
    const pesos = document.getElementsByClassName("peso");
    let somaPesos = 0;
    let soma = 0;
    let qtdNotas = 0;

    for (let i = 0; i < valores.length; i++) {
        const valor = valores[i];
        
        if (valor.value) {
            qtdNotas++;
            peso = pesos[i].value ? parseFloat(pesos[i].value) : 1; 
            soma += parseInt(valor.value) * peso;
            somaPesos += peso;
        }
    }

    const media = soma / somaPesos;
    const inputMedia = document.getElementById("input-media");
    inputMedia.value = media;
}

function media() {
    const container = document.getElementById("container-media");

    /* Inputs de notas */

    const divNotas = criarElemento("div");
    divNotas.id = "container-notas";
    container.appendChild(divNotas);
    
    adicionarNota(3);

    /* Adicionar nota */

    const btnAdicionarNota = criarElemento("button", ["btn", "btn-info", "mt-3"], { nome: "adicionarNota", valor: 1 }, "Adicionar Nota");
    btnAdicionarNota.id = "btn-add-nota";
    container.appendChild(btnAdicionarNota);

    /* Divisor */

    const divisor = criarElemento("hr");
    container.appendChild(divisor);

    /* Media */

    const divMedia = criarElemento("div", ["row"]);
    divMedia.id = "container-media";
    container.appendChild(divMedia);
    
    const textoMedia = criarElemento("p", ["mr-2", "font-weight-bold"], null, "Média");
    divMedia.appendChild(textoMedia);

    const inputMedia = criarElemento("input", [], null, null, "Média");
    inputMedia.id = "input-media";
    divMedia.appendChild(inputMedia);

    const btnCalcularMedia = criarElemento("button", ["btn", "btn-success", "ml-2"], { nome: "calcularMedia", valor: 0 }, "Calcular");
    divMedia.appendChild(btnCalcularMedia);
}

media();