const listaEditaveis = document.getElementById("lista-editaveis")
const listaPublicados = document.getElementById("lista-publicados")

const registros = JSON.parse(
    localStorage.getItem("registrosAtitudinais")
) || []

console.log('Registros encontrados: ', registros);

//calcula se passaram 24h desde o registro
const PRAZO_REVISAO = 24 * 60 * 60 * 1000 //convertendo 24hrs para milisegundos

function editar(registro){
    const dataRegistro = new Date(registro.data).getTime() //recupera data do registro e transforma em um numero de ms

    const dataAtual = Date.now()

    const tempoPassado = dataAtual - dataRegistro

    return Number.isFinite(dataRegistro) && //aqui impede que um regisytro sem data ou invalida
           tempoPassado >= 0 &&             //seja tratado como editável
           tempoPassado < PRAZO_REVISAO
}
