import { turmas  } from "../data/mock-data.js";

const listaEstudantes = document.getElementById("lista-estudantes")
const listaturmas = document.getElementById("lista-turmas")

const turmaAtual = turmas[0]

turmaAtual.estudantes.forEach((estudante) => {
    const botao = document.createElement("button")
    botao.type = "button"
    botao.classList.add("card-estudante")
    //botao.textContent = estudante.nome // coloca o nome do estudante dentro do botao
    botao.dataset.estudanteId = estudante.id

    const avatar = document.createElement("div")
    avatar.classList.add("avatar-estudante")

    const nome = document.createElement("span")
    nome.classList.add("nome-estudante")
    nome.textContent = estudante.nome

    const clicar = document.createElement("span")
    clicar.classList.add("nome-estudante")
    nome.textContent = estudante.nome
    botao.append(avatar, nome, clicar)

    
    botao.addEventListener("click", () => {
        window.abrirRegistroRapido(estudante.id, estudante.nome)
    })

    listaEstudantes.appendChild(botao) // insere o botao dentro da div no turmas.html
})

//se o id da turma for diferente do id da turma atual ent mantenha essa turma no novo array
const outrasTurmas = turmas.filter((turma) => {
    return turma.id !== turmaAtual.id
})

outrasTurmas.forEach((turma) => {
    const botao = document.createElement("button")
    botao.type = "button"
    botao.classList.add("cartao-turma")
    const nomeTurma = document.createElement("strong")
    nomeTurma.textContent = turma.nome
    const horárioTurma = document.createElement("span")
    horárioTurma.textContent = turma.horário
    botao.appendChild(nomeTurma)
    botao.appendChild(horárioTurma)
    listaturmas.appendChild(botao)
})


/*console.log('Turma atual', turmaAtual);
console.log('Lista de estudantes', listaEstudantes);
console.log('Lista de turmas', listaturmas);*/


