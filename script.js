class Node {
    constructor(keyword, urls) {
        this.keyword = keyword;
        this.urls = urls;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(keyword, urls) {
        this.root = this._insertRec(this.root, keyword, urls);
    }

    _insertRec(node, keyword, urls) {
        if (node === null) {
            return new Node(keyword, urls);
        }

        if (keyword < node.keyword) {
            node.left = this._insertRec(node.left, keyword, urls);
        } else if (keyword > node.keyword) {
            node.right = this._insertRec(node.right, keyword, urls);
        }

        return node;
    }

    search(keyword) {
        return this._searchRec(this.root, keyword);
    }

    _searchRec(node, keyword) {
        if (node === null || node.keyword === keyword) {
            return node ? node.urls : null;
        }

        if (keyword < node.keyword) {
            return this._searchRec(node.left, keyword);
        }

        return this._searchRec(node.right, keyword);
    }
}

const bst = new BinarySearchTree();

const data = [
    {
        keyword: 'animais',
        urls: [
            {
                url: 'https://brasilescola.uol.com.br/animais',
                title: 'Animais: imagens, tipos, nomes de A a Z',
                description: 'Os animais são seres eucariotos, multicelulares e heterotróficos.'
            },
            {
                url: 'https://www.cnnbrasil.com.br/tudo-sobre/animais/',
                title: 'Animais - Notícias e tudo sobre',
                description: 'Conteúdos, Notícias e Tudo sobre Animais. Reportagens, entrevistas, breaking news e mais.'
            }
        ]
    },
    {
        keyword: 'noticias',
        urls: [
            {
                url: 'https://g1.globo.com/',
                title: 'g1 - O portal de notícias da Globo',
                description: 'Últimas notícias do Brasil e do mundo.'
            },
            {
                url: 'https://noticias.uol.com.br/',
                title: 'UOL Notícias | Notícias do Dia no Brasil e no Mundo',
                description: 'Veja as principais notícias e manchetes do dia no Brasil e no Mundo.'
            }
        ]
    },
    {
        keyword: 'receitas',
        urls: [
            {
                url: 'https://receitas.globo.com/',
                title: 'Receitas - Tem tudo no Receitas',
                description: 'Descubra receitas incríveis para suas refeições.'
            },
            {
                url: 'https://www.tudogostoso.com.br/',
                title: 'TudoGostoso - Onde nascem todas as receitas',
                description: 'Conheça as 197946 melhores receitas disponíveis no TudoGostoso como: Bolo de cenoura.'
            }
        ]
    },
    {
        keyword: 'tecnologia',
        urls: [
            {
                url: 'https://www.tecmundo.com.br/tecnologia',
                title: 'Tecnologia | Tudo Sobre',
                description: 'Notícias e artigos sobre novas tecnologias.'
            },
            {
                url: 'https://www.techtudo.com.br/',
                title: 'TechTudo: tecnologia, celular, computador e games',
                description: 'As principais notícias de tecnologia, reviews de celulares, TVs e computadores.'
            }
        ]
    },
    {
        keyword: 'esportes',
        urls: [
            {
                url: 'https://ge.globo.com/',
                title: 'ge.globo - É esporte sempre',
                description: 'No ge.globo você encontra a melhor cobertura sobre o Futebol e Outros Esportes, no Brasil e no Mundo.'
            },
            {
                url: 'https://www.espn.com.br/',
                title: 'ESPN Brasil - Tudo Pelo Esporte',
                description: 'Casa do futebol brasileiro e internacional, da NBA, NFL, MLB e do tênis.'
            }
        ]
    }
];

function buildTreeFromData() {
    for (const item of data) {
        bst.insert(item.keyword, item.urls);
    }
}

buildTreeFromData();

const searchForm = document.getElementById("searchForm");
const searchKeyword = document.getElementById("searchKeyword");
const searchResult = document.getElementById("searchResult");

searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const searchTerm = searchKeyword.value;
    const result = bst.search(searchTerm);

    if (result) {
        searchResult.innerHTML = "";

        searchResult.innerHTML += `Sites encontrados para a pesquisa "${searchTerm}":<br><br>`;
        for (const urlData of result) {
            searchResult.innerHTML += `<p><a target="_blank" href="${urlData.url}" class="text-blue-800 font-bold">${urlData.title}</a><br>${urlData.description}</p><br>`;
        }
    } else {
        searchResult.innerHTML = `<p class="text-red-500 font-bold">Nenhum site encontrado para a pesquisa "${searchTerm}".`;
    }
});

