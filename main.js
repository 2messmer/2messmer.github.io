// Sélectionnez l'écran d'affichage
const display = document.getElementById('display');

// Sélectionnez tous les boutons dans la grille
const buttons = document.querySelectorAll('.buttons button');

// Ajoutez un écouteur d'événement à chaque bouton
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;

        // Logique du bouton "C" (Clear)
        if (buttonText === 'C') {
            display.value = '';
        } 
        // Logique du bouton "=" (Calculer)
        else if (button.id === 'calculate') {
            try {
                // Utilisation de eval() pour effectuer le calcul. 
                // Pour un projet professionnel, il serait préférable d'utiliser une solution plus sûre.
                display.value = eval(display.value.replace(/×/g, '*').replace(/÷/g, '/'));
            } catch (e) {
                display.value = 'Erreur';
            }
        } 
        // Logique des autres boutons (chiffres et opérateurs)
        else {
            display.value += buttonText;
        }
    });
});
