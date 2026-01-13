(function(){



    let btnRegister = document.querySelector("#btn-registro")

    btnRegister.addEventListener('click', () => {

        let username = document.querySelector("#reg-username")
        let email = document.querySelector("#reg-email")
        let password = document.querySelector("#reg-password")
        let confpassword = document.querySelector("#reg-conf-password")

        if(password.value.trim() != confpassword.value.trim()){
            alert("Las contraseñas no coinciden")
        }
    })



})();