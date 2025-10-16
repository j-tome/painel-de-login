function logar(event){
    event.preventDefault();

    let emailLogin = document.getElementById("emailLogin").value.trim();
    let senhaLogin = document.getElementById("senhaLogin").value.trim();
    let lembrarSenha = document.getElementById("lembrarSenha").checked;

    if(emailLogin == "admin@gmail.com" && senhaLogin == "admin"){
        location.href = "index.html";
        if(lembrarSenha){
            localStorage.setItem("emailLogin", emailLogin)
            localStorage.setItem("senhaLogin", senhaLogin)
        } else{
            localStorage.removeItem("emailLogin", emailLogin)
            localStorage.removeItem("senhaLogin", senhaLogin)
        }
    } else{
        alert("Usuário ou senha incorretos!")
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