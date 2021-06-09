if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var addFavorite = document.getElementsByClassName('like')
    console.log('addFavorite', addFavorite);
    for (var i = 0; i < addFavorite.length; i++) {
        var button = addFavorite[i]
        button.addEventListener('click', favorite)
    }

    var removeArticleBtn = document.getElementsByClassName('btn-delete')
    for (var i = 0; i < removeArticleBtn.length; i++) {
        var button = removeArticleBtn[i]
        button.addEventListener('click', removeArticle)
    }

    var quantiteInputs = document.getElementsByClassName('quantite')
    for (var i = 0; i < quantiteInputs.length; i++) {
        var input = quantiteInputs[i]
        input.addEventListener('change', quantiteChanged)
    }

    var add = document.getElementsByClassName('btn-plus')
    for (var i = 0; i < add.length; i++) {
        var button = add[i]
        button.addEventListener('click', addQuantity)
    }

    var remove = document.getElementsByClassName('btn-minus')
    for (var i = 0; i < remove.length; i++) {
        var button = remove[i]
        button.addEventListener('click', removeQuantity)
    }

}


function removeArticle(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updatepannierTotal()
}

function addQuantity(event) {
    var buttonClicked = event.target.parentElement.getElementsByClassName('quantite')[0]
    var prix = parseFloat(buttonClicked.innerText)
    buttonClicked.innerText = prix + 1
    updatepannierTotal()

}

function removeQuantity(event) {
    var buttonClicked = event.target.parentElement.getElementsByClassName('quantite')[0]
    var prix = parseFloat(buttonClicked.innerText)
    if (prix > 0) {
        buttonClicked.innerText = prix - 1
    } else {
        buttonClicked.innerText = 0
    }
    updatepannierTotal()
}

function favorite(event) {
    var buttonClicked = event.target
    if(buttonClicked.clicked) {
        buttonClicked.clicked = ! buttonClicked.clicked;
        buttonClicked.src="Images/black.svg"
    } else {
        buttonClicked.clicked = ! buttonClicked.clicked;
        buttonClicked.src="Images/rouge.svg"
    }
}

function quantiteChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 0
    }
    updatepannierTotal()
}



function updatepannierTotal() {
    var pannierarticleContainer = document.getElementsByClassName('pannier-articles')[0]
    var pannierRows = pannierarticleContainer.getElementsByClassName('pannier-row')
    var total = 0
    var localTotal = 0

    for (var i = 0; i < pannierRows.length; i++) {
        var pannierRow = pannierRows[i]
        var prixElement = pannierRow.getElementsByClassName('pannier-prix')[0]
        var quantiteElement = pannierRow.getElementsByClassName('quantite')[0]
        var prix = parseFloat(prixElement.innerText)        
        var quantite = quantiteElement.innerText
        localTotal = prix * quantite
        pannierRow.getElementsByClassName('local-totals')[0].innerText = localTotal
        total = total + (prix * quantite)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('pannier-total-prix')[0].innerText = 'DZD' + " " + total

}