class Node {
    constructor(keyword, url) {
        this.keyword = keyword;
        this.url = url;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(keyword, url) {
        this.root = this._insertRec(this.root, keyword, url);
    }

    _insertRec(node, keyword, url) {
        if (node === null) {
            return new Node(keyword, url);
        }

        if (keyword < node.keyword) {
            node.left = this._insertRec(node.left, keyword, url);
        } else if (keyword > node.keyword) {
            node.right = this._insertRec(node.right, keyword, url);
        }

        return node;
    }

    search(keyword) {
        return this._searchRec(this.root, keyword);
    }

    _searchRec(node, keyword) {
        if (node === null || node.keyword === keyword) {
            return node ? node.url : null;
        }

        if (keyword < node.keyword) {
            return this._searchRec(node.left, keyword);
        }

        return this._searchRec(node.right, keyword);
    }
}

const bst = new BinarySearchTree();

const data = [
    { keyword: 'gatos', url: 'https://www.example.com/cats' },
    { keyword: 'cachorros', url: 'https://www.example.com/dogs' },
    { keyword: 'receitas', url: 'https://www.example.com/recipes' },
    { keyword: 'tecnologia', url: 'https://www.example.com/technology' },
    { keyword: 'noticias', url: 'https://www.example.com/news' },
    { keyword: 'esportes', url: 'https://www.example.com/sports' },
    { keyword: 'viagens', url: 'https://www.example.com/travel' },
    { keyword: 'jogos', url: 'https://www.example.com/games' },
    { keyword: 'comida', url: 'https://www.example.com/food' },
    { keyword: 'aprendizado', url: 'https://www.example.com/learning' }
];

function buildTreeFromData() {
    for (const item of data) {
        bst.insert(item.keyword, item.url);
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
        searchResult.innerHTML = `Site encontrado para a pesquisa "${searchTerm}": <a href="${result}">${result}</a>`;
    } else {
        searchResult.innerHTML = `Nenhum site encontrado para a pesquisa "${searchTerm}"`;
    }
});