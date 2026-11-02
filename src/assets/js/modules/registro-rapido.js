console.log("JavaScript do registro rápido carregado!");
const modalRegistro = document.getElementById("modal-registro") //busca o elemento <dialog> no htmnl
const nomeEstudante = document.getElementById("nome-estudante");
const notaRegistro = document.getElementById("nota-registro")
const confirmacaoRegistro = document.getElementById("confirmacao-registro")
const botaoFechar = document.getElementById("fechar-registro");
const botaoDimensao = document.querySelectorAll("[data-dimensao]") //procura os elemento que tem esse atributo (data-dimensao)
const botoesTipo = document.querySelectorAll("[data-tipo]")
const secaoTipo = document.getElementById("selecao-tipo") //busca a secao que tem os botoes de avanco e ponto de atencao
const botaoDesfazer = document.getElementById("desfazer-registro")
let registroRealizado = false; //variavel para impedir que o usuario salve o mesmo registro varias vezes clicando varias vezes
let ultimoRegistroId = null //variavel para fazer o botao de desfazer funcionar
let temporizador = null
let estudanteSelecionado = null

window.abrirRegistroRapido = function(id, nome){
    estudanteSelecionado = id
    nomeEstudante.textContent = nome
    dimensaoSelecionada = null
    registroRealizado = false
    notaRegistro.value = ""
    secaoTipo.hidden = true
    clearTimeout(temporizador)
    confirmacaoRegistro.hidden = true
    botaoDesfazer.disabled = true
    ultimoRegistroId = null
    modalRegistro.showModal()
};

//Aqui funciona para detectar quando o professor clica em um dos 5 botoes
let dimensaoSelecionada = null
botaoDimensao.forEach((botao) => { //forEach percorre os botoes encontrados pelo querySelectorAll
    botao.addEventListener("click", () => { // aqui registra uma funcao que sera exec quando um botao for clicado
        dimensaoSelecionada = botao.dataset.dimensao //recupera o valor de data-dimensao
        console.log("Dimensão selecionada", dimensaoSelecionada)
        secaoTipo.hidden = false
        notaRegistro.value = ""
        confirmacaoRegistro.hidden = true
        registroRealizado = false
    })
})

botoesTipo.forEach((botao) => {
    botao.addEventListener("click", () => {
        const tipoSelecionado = botao.dataset.tipo

        if(dimensaoSelecionada == null){
            return;
        }

        if(registroRealizado){
            return;
        }

        const registro = {
            id: Date.now(),
            estudanteId: estudanteSelecionado,
            estudanteNome: nomeEstudante.textContent,
            dimensao: dimensaoSelecionada,
            tipo: tipoSelecionado,
            observacao: notaRegistro.value.trim(), // recupera o texto digitdo e remove espaços desnecessarios
            data: new Date().toISOString() //gera data em um formato padronizado
        }

        ultimoRegistroId = registro.id

        
        //JSON.stringify() para transformar o objeto em texto JSON e JSON.parse() para transformar esse texto denovo em um obj js
        const registrosSalvos = JSON.parse(
            localStorage.getItem("registrosAtitudinais")
        ) || []
        registrosSalvos.push(registro)

        localStorage.setItem( //setitem salva um valor no armazenamento do navegador
            "registrosAtitudinais",
            JSON.stringify(registrosSalvos)
        )

        registroRealizado = true

        modalRegistro.close()

        confirmacaoRegistro.hidden = false

        botaoDesfazer.disabled = false
        clearTimeout(temporizador)
        temporizador = setTimeout(() => {
            botaoDesfazer.disabled = true;
            confirmacaoRegistro.hidden = true
            ultimoRegistroId = null
        }, 5000)
    })
})

botaoDesfazer.addEventListener("click", () => {
    if(ultimoRegistroId === null){
        return;
    }

    if(botaoDesfazer.disabled){
        return;
    }
    clearTimeout(temporizador)

    const registrosSalvos = JSON.parse(
        localStorage.getItem("registrosAtitudinais")
    ) || []

    //aqui o metodo filter percorre os registros e cria um novo array que tem apenas aqueles que satisfem a condicao
    //depois vamos salvar o array atualizado e o registro selecionado é removido
    const registrosAtualizados = registrosSalvos.filter((registro) => {
        return registro.id !== ultimoRegistroId
    })

    localStorage.setItem(
        "registrosAtitudinais",
        JSON.stringify(registrosAtualizados)
    )

    confirmacaoRegistro.hidden = true
    registroRealizado = false
    ultimoRegistroId = null
    botaoDesfazer.disabled = true
})

botaoFechar.addEventListener("click", () =>{
    clearTimeout(temporizador)
    botaoDesfazer.disabled = true
    modalRegistro.close()
})

