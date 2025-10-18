async function logar(event){
    event.preventDefault();

    const emailLogin = document.getElementById("emailLogin").value.trim();
    const senhaLogin = document.getElementById("senhaLogin").value.trim();
    const lembrarSenha = document.getElementById("lembrarSenha").checked;
    
    
    const resposta = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ email: emailLogin, senha: senhaLogin}),
    })

    const data = await resposta.json(); 
    if (resposta.ok) {
        location.href = "index.html";
        if(lembrarSenha){
            localStorage.setItem("emailLogin", emailLogin)
            localStorage.setItem("senhaLogin", senhaLogin)
        } else{
            localStorage.removeItem("emailLogin", emailLogin)
            localStorage.removeItem("senhaLogin", senhaLogin)
        }
    } else {
        alert(data.error || "Usuário ou senha incorretos!");
    }
}

window.onload = function () {
    const emailSalvo = localStorage.getItem("emailLogin");
    const senhaSalva = localStorage.getItem("senhaLogin");

    if(emailSalvo && senhaSalva) {
        document.getElementById("emailLogin").value = emailSalvo;
        document.getElementById("senhaLogin").value = senhaSalva;
        document.getElementById("lembrarSenha").checked = true;
    }
}

const formCadastro = document.getElementById("formCadastro");

if (formCadastro) {
    formCadastro.addEventListener("submit", async function(event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("emailCadastro").value.trim();
        const senha = document.getElementById("senhaCadastro").value.trim();
        const confirmarSenha = document.getElementById("confirmarSenha").value.trim();

        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem!");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/cadastro", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, email, senha })
            });

            const data = await response.json();

            if (response.ok) {
                window.location.href = "login.html";
            } else {
                alert("❌ Erro: " + data.message);
            }

        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro ao conectar ao servidor.");
        }
    });
}
