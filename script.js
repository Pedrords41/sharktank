function login(){

    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;

    if(email === "" || senha === ""){
        alert("Preencha todos os campos");
        return;
    }

    localStorage.setItem("usuario", email);

    window.location.href = "dashboard.html";
}

function logout(){

    localStorage.removeItem("usuario");

    window.location.href = "index.html";
}

function salvarTarefa(){

    let titulo = document.getElementById("titulo").value;
    let descricao = document.getElementById("descricao").value;
    let data = document.getElementById("data").value;
    let prioridade = document.getElementById("prioridade").value;

    if(
        titulo === "" ||
        descricao === "" ||
        data === ""
    ){
        alert("Preencha todos os campos");
        return;
    }

    let tarefa = {
        titulo,
        descricao,
        data,
        prioridade
    };

    let tarefas =
        JSON.parse(localStorage.getItem("tarefas")) || [];

    tarefas.push(tarefa);

    localStorage.setItem(
        "tarefas",
        JSON.stringify(tarefas)
    );

    alert("Tarefa cadastrada!");

    window.location.href = "dashboard.html";
}

function listarTarefas(){

    let lista =
        document.getElementById("listaTarefas");

    if(!lista) return;

    let tarefas =
        JSON.parse(localStorage.getItem("tarefas")) || [];

    lista.innerHTML = "";

    tarefas.forEach((tarefa,index)=>{

        lista.innerHTML += `
        <div class="task">

            <h3>${tarefa.titulo}</h3>

            <p>
                ${tarefa.descricao}
            </p>

            <p>
                <strong>Prazo:</strong>
                ${tarefa.data}
            </p>

            <p>
                <strong>Prioridade:</strong>
                ${tarefa.prioridade}
            </p>

            <button onclick="excluirTarefa(${index})">
                Excluir
            </button>

        </div>
        `;
    });
}

function excluirTarefa(index){

    let tarefas =
        JSON.parse(localStorage.getItem("tarefas")) || [];

    tarefas.splice(index,1);

    localStorage.setItem(
        "tarefas",
        JSON.stringify(tarefas)
    );

    listarTarefas();
}