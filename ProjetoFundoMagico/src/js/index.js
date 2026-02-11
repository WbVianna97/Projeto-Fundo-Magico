document.addEventListener("DOMContentLoaded", function () {
    //**console.log("Document is ready!"); teste inicial */
    const formulario = document.querySelector(".form-group");
    const descricaoInput = document.getElementById("description");
    const codigoHtml = document.getElementById("html-code");
    const codigoCss = document.getElementById("css-code");
    const secaoPreview = document.getElementById("preview-section");

    formulario.addEventListener("submit", async function (evento) {
        evento.preventDefault(); //evita o carregamento da página
        const descricao = descricaoInput.value.trim(); // Remove espaços em branco no início e no fim
        if (!descricao) {
            return; // Se a descrição estiver vazia, não faz nada
        }
        console.log(descricao);
        mostrarCarregamento(true);

        //Realizar uma requisição para o HTTP(POST)  para  a API do n8n, enviar a descrição como parte do corpo da requisição
        try {
            const resposta = await fetch("https://wbvianna.app.n8n.cloud/webhook/fundo-magico", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ descricao }),

            });
            const dados = await resposta.json();

            codigoHtml.textContent = dados.html || " ";
            codigoCss.textContent = dados.css || " ";

            secaoPreview.style.display = "block";
            secaoPreview.innerHTML = dados.html || " ";



            //console.log(dados);

            // aplicando o CSS animado ao fundo da página

            let tagEstilo = document.getElementById("estilo-dinamico");
            //se essa atg já existir, remover ela antes de criar uma nova
            if (tagEstilo) {
                tagEstilo.remove();
            }
            if (dados.css) {
                tagEstilo = document.createElement("style");
                tagEstilo.id = "estilo-dinamico";
                tagEstilo.textContent = dados.css;
                document.head.appendChild(tagEstilo);
            }




        } catch (error) {
            console.error("Erro ao gerar o background:", error);
            codigoHtml.textContent = "Não consegui gerar o HTML, tente novamente.";
            codigoCss.textContent = "Não consegui gerar o CSS, tente novamente.";
            secaoPreview.innerHTML = "";

        } finally {
            mostrarCarregamento(false);

        }




    });

    function mostrarCarregamento(estaCarregando) {
        const botaoEnviar = document.getElementById("generate-btn");
        if (estaCarregando) {
            botaoEnviar.textContent = "Gerando seu Background...";
        } else {
            botaoEnviar.textContent = "Gerar Background Mágico";
        }

    }


});






