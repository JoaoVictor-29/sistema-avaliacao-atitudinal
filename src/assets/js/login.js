console.log('Javascript carregado');


const usuarios = [
    {
        email: "aluno@escola.com",
        senha: "123456",
        perfil: "estudante"
    },
    {
        email: "professor@escola.com",
        senha: "123456",
        perfil: "professor"
    },
    {
        email: "cordenacao@escola.com",
        senha: "123456",
        perfil: "cordenacao"
    },
    {
        email: "responsavel@escola.com",
        senha: "123456",
        perfil: "responsavel"
    },
]

const formulario = document.getElementById("form-login")

formulario.addEventListener("submit", function(event){
    
    event.preventDefault(); //evita a página ser recarregada antes da validação

    const email = document.getElementById("email").value.trim().toLowerCase(); //value pega o valor digitado pelo usuario
                                                                               //trim() remove espaços desnecessários
                                                                               //toLowerCase transforma o email em letras
                                                                               //minusculas    
     const senha = document.getElementById("senha").value;
     
     const usuarioEncontrado = usuarios.find(function(usuario){
        return usuario.email === email && usuario.senha === senha;
     })


    if(usuarioEncontrado){
    switch(usuarioEncontrado.perfil){
        case "estudante":
            window.location.href = "pages/estudante/jornada.html";
            break;

        case "professor":
            window.location.href = "pages/professor/turmas.html";
            break;

        case "cordenacao":
            window.location.href = "pages/cordenacao/painel.html";
            break;

        case "responsavel":
            window.location.href = "pages/responsavel/evolucao.html";
            break;
    }
    }else{
        alert("Email ou senha incorretos!");
    }
})