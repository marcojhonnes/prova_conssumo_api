// Prova Consumo API com Fetch (2 tentativas)
// 1
// [JS-A14] A empresa XYZ está desenvolvendo uma aplicação web interativa para amantes de cachorros.
//  O objetivo principal é criar uma galeria de raças de cachorros que permita 
// aos usuários visualizar imagens aleatórias de diferentes raças. Cada raça será representada 
// por um botão, e ao clicar em um botão, a aplicação deve exibir uma seleção de imagens da raça 
// correspondente.

// Requisitos Funcionais:

// Listagem de Raças:

// A aplicação deve obter a lista de raças de cachorros da API do 
// Dog CEO (https://dog.ceo/api/breeds/list/all) e exibi-las como botões na página inicial.

// Exibição de Imagens:

// Ao clicar em um botão de raça, a aplicação deve solicitar imagens aleatórias dessa 
// raça da API (https://dog.ceo/api/breed/{breed}/images/random/4) e exibi-las dinamicamente na página.

// Layout Responsivo:

// O layout da aplicação deve ser responsivo para garantir uma experiência de usuário consistente
// em dispositivos desktop e móveis.

// Estilo Visual Atraente:

// Utilize boas práticas de design para criar uma interface visual atraente e amigável para o usuário
// Isso inclui a escolha de cores, fontes e o posicionamento adequado dos elementos na página.

// Tratamento de Erros:
// Implemente um tratamento adequado para lidar com possíveis erros durante as solicitações à API,
//  garantindo uma experiência de usuário suave.

// A resposta deve ser enviada em uma das seguintes formas:
// Arquivo Zipado
// Link do GitHub (Repositório Público)
// Link do Drive (Acesso para qualquer pessoa com o link)

// Ex01. Concluam a função para criar o card, Adicionem 3 produtos a lista (o array), e façam uma função que lista todos os produtos do array (criando um card para cada produto)
// let produtosState = [];

// // Função que vai receber o produto e criar uma tag HTML
// function Produto(produto) {
//   /*
//     produto = {
//         id: int,
//         title: string,
//         price: number,
//         image: string
//     }
//     */

//   // 1. Criar uma div com o document.createElement
//   const divProduto = document.createElement("div");
//   divProduto.classList.add("produto");

//   // 2. Criar a imagem e atribuir a chave "image" ao atributo "src"
//   const imgProduto = document.createElement("img");
//   imgProduto.setAttribute("src", produto.image);

//   // 3. Criar um h2 para colocar como conteudo a chave "title"
//   const tituloProduto = document.createElement("h2");
//   tituloProduto.textContent = produto.title;

//   // 4. Criar um paragrafo para colocar como conteudo a chave "price"
//   const paragrafoPreco = document.createElement("p");
//   // Formatar para uma moeda
//   paragrafoPreco.textContent = produto.price.toLocaleString('pt-BR', {
//     style: "currency",
//     currency: "BRL",
//   });

//   // 5. Envolver o h2 e o paragrafo em uma div com a classe "content" utilizando o appendChild
//   const divContent = document.createElement("div");
//   divContent.classList.add("content");

//   divContent.appendChild(tituloProduto);
//   divContent.appendChild(paragrafoPreco);

//   // 6. Criar o botão e colocar como texto "Ver Mais"
//   const divFooter = document.createElement("div");
//   divFooter.classList.add("footer");

//   const botaoVerMais = document.createElement("button");
//   botaoVerMais.textContent = "Ver Mais";

//   divFooter.appendChild(botaoVerMais)

//   // Ao final, adicione todos os elementos no card, na sua respectiva ordem
//   divProduto.appendChild(imgProduto);
//   divProduto.appendChild(divContent);
//   divProduto.appendChild(divFooter);

//   return divProduto;
// }

// // Função que lista os produtos
// function listarProdutos(produtos) {
//   // Capturar o main com o document.getElementById
//   const produtosList = document.getElementById("produtos");
//   produtosList.innerHTML = ''

//   // Para cada produto da lista (utilizando um for), vocês vão criar um produto com a função "Produto" e utilizar o appendChild para adicionar no main
//   for (let produto of produtos) {
//     const cardProduto = Produto(produto)
//     produtosList.appendChild(cardProduto)
//   }
// }

// // Ex02. Implementem a função "handleListarProdutos" que irá consumir a API da FakeStore e listar os produtos em tela
// // Função que é chamada ao carregar a tela
// async function handleListarProdutos() {
//     // 1. Consumir nossa API ()
//     // const response = await fetch(apiUrl)
//     // ...
//     const response = await fetch('https://dog.ceo/api/breeds/list/all')
//     const produtos = await response.json()

//     // 2. Listar os Produtos (chamando a função)
//     listarProdutos(produtos)
// }

// window.addEventListener("DOMContentLoaded", handleListarProdutos)

// // Ex03. Implementem a funcionalidade de listar produtos pela categoria ("handleListarProdutosPelaCategoria"), que irá ser chamada quando o usuário mudar a categoria, depois consumir a API para buscar os produtos somente daquela categoria.

// Função para buscar dados das categorias 



// 1. Seletores do DOM
const botao = document.getElementById('btn');
const selectElement = document.getElementById('cachorro');
const fotosContainer = document.getElementById('fotos-container');

// Verifica se os elementos essenciais existem
if (!botao || !selectElement || !fotosContainer) {
    console.error("Erro: Um ou mais elementos DOM necessários (btn, cachorro, fotos-container) não foram encontrados.");
}

// --- Função para buscar e exibir fotos de uma raça específica ---
async function handleFotosRacas() {
    // Limpa o contêiner de fotos anterior
    fotosContainer.innerHTML = '<h2>Carregando fotos...</h2>';

    // Obtém o valor selecionado e converte para minúsculas
    const select = selectElement.value.toLowerCase();
    
    // O endpoint 'images' retorna TODAS as imagens, o que pode ser demais. 
    // Mudei para 'images/random/10' para retornar 10 imagens aleatórias.
    const url = `https://dog.ceo/api/breed/${select}/images/random/10`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
             // Tenta extrair a mensagem de erro do JSON
            const errorData = await response.json();
            throw new Error(`Erro ${response.status}: Raça não encontrada ou outro erro da API. Mensagem: ${errorData.message}`);
        }

        const data = await response.json();
        const urlsImagens = data.message;
        
        // Remove a mensagem de 'Carregando...'
        fotosContainer.innerHTML = ''; 

        if (urlsImagens && urlsImagens.length > 0) {
            // Adiciona as imagens ao container
            urlsImagens.forEach(url => {
                const img = document.createElement('img');
                img.src = url;
                img.alt = `Foto de cachorro da raça ${select}`;
                img.classList.add('dog-image'); // Adicione uma classe para estilização
                fotosContainer.appendChild(img);
            });
        } else {
            fotosContainer.innerHTML = `<p>Nenhuma foto encontrada para a raça <strong>${select}</strong>.</p>`;
        }
        
    } catch (error) {
        console.error("Erro ao buscar fotos:", error.message);
        fotosContainer.innerHTML = `<p style="color: red;">Ops! Não foi possível carregar as fotos. Detalhe: ${error.message}</p>`;
    }
}

// --- Função para carregar a lista de raças no <select> ---
async function handleCarregarRacas() {
    let url = "https://dog.ceo/api/breeds/list/all";
    
    // Desabilita o select enquanto carrega
    selectElement.disabled = true;
    selectElement.innerHTML = '<option>Carregando raças...</option>'; 

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Erro ${response.status}: Falha ao buscar a lista de raças.`);
        }

        const data = await response.json();
        // A lista de raças está no objeto 'message'
        const listaRaças = data.message;

        // Limpa o select e adiciona a opção padrão
        selectElement.innerHTML = '<option value="" disabled selected>Selecione uma Raça</option>'; 
        
        // Itera sobre as raças e as adiciona como <option>
        for (const racaPrincipal in listaRaças) {
            const subRaças = listaRaças[racaPrincipal];

            if (subRaças.length === 0) {
                // Adiciona raça principal (Ex: 'hound')
                const option = document.createElement('option');
                option.value = racaPrincipal;
                // Capitaliza a primeira letra para melhor exibição
                option.textContent = racaPrincipal.charAt(0).toUpperCase() + racaPrincipal.slice(1);
                selectElement.appendChild(option);
            } else {
                // Adiciona sub-raças (Ex: 'hound-afghan')
                subRaças.forEach(subRaca => {
                    const nomeCompleto = `${racaPrincipal}-${subRaca}`;
                    const nomeExibicao = `${subRaca.charAt(0).toUpperCase() + subRaca.slice(1)} ${racaPrincipal.charAt(0).toUpperCase() + racaPrincipal.slice(1)}`;

                    const option = document.createElement('option');
                    option.value = nomeCompleto;
                    option.textContent = nomeExibicao;
                    selectElement.appendChild(option);
                });
            }
        }
        
        // Habilita o select após carregar
        selectElement.disabled = false;

    } catch (error) {
        console.error("Erro ao carregar raças:", error.message);
        selectElement.innerHTML = '<option value="" disabled>Erro ao carregar a lista de raças</option>';
    }
}

// 3. Listeners de Eventos
botao.addEventListener('click', handleFotosRacas);
window.addEventListener("DOMContentLoaded", handleCarregarRacas);

//window.addEventListener('DOMContentLoaded', handleCarregarraças)

// Buscando Select de categoria.
// const selectCategoria = document.getElementById('category')

// Função para carregar as raças na tela
// async function handleCarregarraças() {
//     // Busca as raças do backend
//     const raças = await buscarraças()

//     const labelRaça = {
//     //      "electronics": "Eletrônico",
//     //     "jewelery": "Joias",
//     //     "men's clothing": "Roupas Masculinas",
//     //     "women's clothing": "Roupas Femininas"
//             "Affenpinscher": "Affenpinscher",
//                 "African": "African",
//                 "Aireadade": "Aireadade",
//                 "Akita": "Akita",
//                 "Appenzeller": "Appenzeller",
//                 "Kelpie Australian": "Kelpie Australian",
//                 "Sheper Australian": "Sheper Australian",
//                 "India Bakharwal": "India Bakharwal",
//                 "Basenji": "Basenji",
//                 "Beagle": "Beagle",
//                 "Bluetick": "Bluetick",
//                 "Borzoi": "Borzoi",
//                 "Bouvier": "Bouvier",
//                 "Boxer": "Boxer",
//                 "Brabancon": "Brabancon",
//                 "Briard": "Briard",
//                 "Norwegian Buhund": "Norwegian Buhund",
//                 "Boston Bulldog": "Boston Bulldog",
//                 "English Bulldog": "English Bulldog",
//                 "French Bulldog": "French Bulldog"
//     }
// }
//     const labelRaca = {
//         raças = {
//             //         id: int,
//             //         title: string,
//             //         price: number,
//             //         image: string
//             //     }
//     }

//     // Para cada categoria, crie uma opção e adicione-a no select
//     for (let raça of raças) {
//         const raçaOption = document.createElement('option') 
//         raçaOption.value = raça
//         raçaOption.textContent = labelRaça[raça]

//         selectraça.appendChild(raçaOption)
//     }
// }

// window.addEventListener("DOMContentLoaded", handleCarregarraças)

// async function handleListarProdutosPelaraça() {
//     // 1. Buscar Valor do Select (Select.value)
//     const category = selectraça.value

//     // 2. Consumir API para buscar pela raça (https://fakestoreapi.com/products/category/{raça})
//     const response = await fetch(`https://fakestoreapi.com/products/category/${category}`)
//     const products = await response.json()

//     // 3. Listar os Produtos (chamando a função)
//     listarProdutos(products)
// } 

// selectraça.addEventListener("change", handleListarProdutosPelaraça)
