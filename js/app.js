

const app = {

    styles: [
        'plain', 'empty', 'black', 'sunny', 'light', 'highlight', 'bloody', 'pink', 'purple', 'water',
    ],
    paletteElem: '',
    choosenColor: 'light',
    init: function() {
        app.createForm();
        app.createPalette();
        app.createPixelBoard(10);     
    },
    //Gestion du click sur les éléments Pixel
    handleClickOnPixel: function (event) {
        // On initalise les variables pour gérer les changements de couleurs
        const pixelElement = event.target;
        const colorClass = 'pixel--' + app.choosenColor;
        
        // Si l'élément contient déjà la classe sélectionnée, on enlève la classe pour retrouver la classe "pixel"
        if (pixelElement.classList.contains(colorClass)) {
            pixelElement.classList.remove(colorClass);
            //Sinon, on supprime la classe actuelle pour ajouter la classe qui a été sélectionnée
        } else {
            pixelElement.classList.remove('pixel--empty', 'pixel--sunny','pixel--purple', 'pixel--pink', 'pixel--plain', 'pixel--light', 'pixel--highlight', 'pixel--bloody', 'pixel--water');
            pixelElement.classList.add(colorClass);
        }
    },

    // On créé le formulaire qui sert à paramétrer la taille de la grille
    createForm: function () {
        // On affiche le titre de l'app dans le formulaire
        const titleElem = document.createElement('h1');
        titleElem.className.add = 'form-title';
        titleElem.textContent = "PixelArt"

        let configElem = document.querySelector('.configuration');
        configElem.appendChild(titleElem);
        // On créé les input de notre formulaire
        app.createConfiguration('Taille de la grille', 'number', true);
        app.createConfiguration('Taille des pixels', 'number', false);
        app.createConfiguration('Valider', 'submit', false);
        // On gère l'envoi du formulaire
        configElem.addEventListener('submit', app.handleSubmitForm);
        
    },

    // On créé les éléments du formulaire pour gérer la taille de la grille
    createConfiguration: function (placeHolderTitle, type, isRequired = false) {
        const inputElem = document.createElement('input');
        inputElem.classList.add('configuration--input')
        inputElem.type = type;
        if (type === 'number') {
            inputElem.placeholder = placeHolderTitle;
        } else {
            inputElem.value = placeHolderTitle;
        }
        if (isRequired) {
            inputElem.setAttribute('required', 'require');
        }
        // on récupère l'élément parent
        let configElem = document.querySelector('.configuration');
        // on ajoute l'enfant au parent
        configElem.appendChild(inputElem);
    },

    // Gestion du formulaire qui gère la taille de la grille
    handleSubmitForm: function (event) {
        // On prévient le rafraîchissement de la page à l'envoi du formulaire
        event.preventDefault();
        console.log(event);
        console.log(event.target[0].valueAsNumber);
        console.log(event.target[1].valueAsNumber);
        
        const gridSize = event.target[0].valueAsNumber;
        const pixelSize = event.target[1].valueAsNumber;
        
        document.querySelector('#invader').innerHTML = '';
        app.createPixelBoard(gridSize, pixelSize);
    },
    // Gestion de la sélection de couleur
    handleColorClick: function(event) {

        console.log('handling color');
        
        const oldColorSelected = document.querySelector('.palette-color--active');
        oldColorSelected.classList.remove('palette-color--active');

        
        event.target.classList.add('palette-color--active');
        app.choosenColor =  event.target.dataset.colorName;
    },

    // On créé la palette de couleur
    createPalette: function(){
        
        app.paletteElem = document.createElement('div');
        app.paletteElem.classList.add('palette')
        
        document.body.appendChild(app.paletteElem);
   
        for (const color of app.styles ) {
            app.addColorToPalette(color);
        }
    },
    // On ajoute les couleurs à la palette
    addColorToPalette: function(color) {
        const colorElem = document.createElement('a');
        colorElem.classList.add('pixel--' + color);

        if (color === app.choosenColor) {
            colorElem.classList.add('palette-color--active');
        }
      
        colorElem.dataset.colorName = color;
        colorElem.addEventListener('click', app.handleColorClick);
        app.paletteElem.appendChild(colorElem);
    },
    

    // On crée le tableau de pixels (la grille)
    createPixelBoard: function (gridSize, pixelSize) {
        let invaderElem = document.querySelector('#invader');
        for (let y = 0; y < gridSize; y++) {
            let lineElem = document.createElement('div');
            lineElem.classList.add('line');

            for (let x = 0; x < gridSize; x++) {
                let pixelElem = document.createElement('span');
                pixelElem.classList.add('pixel');
                
                pixelElem.addEventListener('click', app.handleClickOnPixel);


                if (pixelSize !== NaN) {
                    pixelElem.style.width = pixelSize + 'px';
                    pixelElem.style.height = pixelSize + 'px';
                }
                lineElem.appendChild(pixelElem);
            }
            invaderElem.appendChild(lineElem);
        }
    }
};


app.init();
