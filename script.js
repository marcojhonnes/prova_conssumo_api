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



const botao = document.getElementById('btn')
async function handleFotosRacas() {
    const select = (document.getElementById('cachorro').value).toLowerCase()
    try {
        // Consumindo a API no endpoint que trás as categorias
        const response = await fetch(`https://dog.ceo/api/breed/${select}/images`)

        if (!response.ok) {
            throw new Error("Solicitação foi realizada, mas com um status de erro.")
        }
        // Converter os dados para JSON
        const racas = await response.json()
        console.log(racas)
        return racas
    } catch (error) {
        console.error(error.message)
    }
}

botao.addEventListener('click', handleFotosRacas)

async function handleCarregarRacas() {
    let url = "https://dog.ceo/api/breeds/list/all"
    try {
        // Consumindo a API no endpoint que trás as categorias
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error("Solicitação foi realizada, mas com um status de erro.")
        }
        // Converter os dados para JSON
        const racas = await response.json()
        console.log(racas)
        return racas
    } catch (error) {
        console.error(error.message)
    }
}

window.addEventListener("DOMContentLoaded", handleCarregarRacas)

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
