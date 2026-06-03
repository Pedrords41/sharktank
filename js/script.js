// LOGIN

function login(){

    let email =
    document.getElementById("email").value;

    email = email.trim();

    if(email === ""){

        alert("Digite um e-mail.");

        return;
    }

    if(!email.includes("@")){

        alert("Digite um e-mail válido.");

        return;
    }

    localStorage.setItem(
        "usuarioAtual",
        email
    );

    if(
        localStorage.getItem(email)
        === null
    ){

        localStorage.setItem(
            email,
            JSON.stringify([])
        );

    }

    window.location.href =
    "dashboard.html";

}


// LOGOUT

function logout(){

    localStorage.removeItem(
        "usuarioAtual"
    );

    window.location =
    "index.html";

}

// SALVAR TAREFA

function salvarTarefa(){

    const titulo =
    document.getElementById("titulo").value;

    const descricao =
    document.getElementById("descricao").value;

    const materia =
    document.getElementById("materia").value;

    const data =
    document.getElementById("data").value;

    const prioridade =
    document.getElementById("prioridade").value;

    if(titulo === ""){

        alert(
            "Digite um título."
        );

        return;
    }

    if(descricao === ""){

        alert(
            "Digite uma descrição."
        );

        return;
    }

    if(materia === ""){

        alert(
            "Selecione uma matéria."
        );

        return;
    }

    if(data === ""){

        alert(
            "Selecione uma data."
        );

        return;
    }

    const usuario =

    localStorage.getItem(
        "usuarioAtual"
    );

    let tarefas =

    JSON.parse(
        localStorage.getItem(
            usuario
        )
    ) || [];

    tarefas.push({

        titulo,
        descricao,
        materia,
        data,
        prioridade

    });

    localStorage.setItem(

        usuario,

        JSON.stringify(
            tarefas
        )

    );

    alert(
        "Tarefa salva!"
    );

    window.location =
    "dashboard.html";

}

// DASHBOARD

function carregarDashboard(){

    const usuario =

    localStorage.getItem(
        "usuarioAtual"
    );

    if(!usuario){

        window.location =
        "index.html";

        return;
    }

    document.getElementById(
        "usuario"
    ).innerText = usuario;

    let tarefas =

    JSON.parse(
        localStorage.getItem(
            usuario
        )
    ) || [];

    const lista =

    document.getElementById(
        "listaTarefas"
    );

    lista.innerHTML = "";

    let alta = 0;
    let media = 0;
    let baixa = 0;

    tarefas.forEach(

        (tarefa,index)=>{

            if(
                tarefa.prioridade
                === "Alta"
            ){
                alta++;
            }

            if(
                tarefa.prioridade
                === "Média"
            ){
                media++;
            }

            if(
                tarefa.prioridade
                === "Baixa"
            ){
                baixa++;
            }

            let classe = "";

            if(
                tarefa.prioridade
                === "Alta"
            ){
                classe = "alta";
            }

            if(
                tarefa.prioridade
                === "Média"
            ){
                classe = "media";
            }

            if(
                tarefa.prioridade
                === "Baixa"
            ){
                classe = "baixa";
            }

            lista.innerHTML += `

            <div class="task-card">

                <div class="task-header">

                    <h3>
                        ${tarefa.titulo}
                    </h3>

                    <span
                    class="prioridade ${classe}">
                        ${tarefa.prioridade}
                    </span>

                </div>

                <p>

                    <strong>
                    Matéria:
                    </strong>

                    ${tarefa.materia}

                </p>

                <p>
                    ${tarefa.descricao}
                </p>

                <p>

                    📅

                    ${formatarData(
                        tarefa.data
                    )}

                </p>

                <button

                class="excluir"

                onclick="excluirTarefa(${index})"

                >

                Excluir

                </button>

            </div>

            `;
        }
    );

    document.getElementById(
        "totalTarefas"
    ).innerText = tarefas.length;

    document.getElementById(
        "alta"
    ).innerText = alta;

    document.getElementById(
        "media"
    ).innerText = media;

    document.getElementById(
        "baixa"
    ).innerText = baixa;

}

// EXCLUIR

function excluirTarefa(index){

    const usuario =

    localStorage.getItem(
        "usuarioAtual"
    );

    let tarefas =

    JSON.parse(
        localStorage.getItem(
            usuario
        )
    ) || [];

    const confirmar =

    confirm(
        "Deseja excluir esta tarefa?"
    );

    if(!confirmar){

        return;
    }

    tarefas.splice(index,1);

    localStorage.setItem(

        usuario,

        JSON.stringify(
            tarefas
        )

    );

    carregarDashboard();

}

function formatarData(data){

    const partes = data.split("-");

    return partes[2] + "/" +
           partes[1] + "/" +
           partes[0];
}