// Sélectionnez l'écran d'affichage
const display = document.getElementById('display');

// Sélectionnez tous les boutons dans la grille
const buttons = document.querySelectorAll('.buttons button');

// Ajoutez un écouteur d'événement à chaque bouton
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;

        // --- Logique des Boutons de Commande ---

        // Logique du bouton "C" (Clear ALL)
        if (buttonText === 'C') {
            display.value = '';
        } 
        
        // Logique du bouton "CE" (Clear Entry - Réinitialise l'entrée actuelle)
        // Note: Dans une calculatrice simple, CE agit souvent comme C.
        else if (buttonText === 'CE') {
            display.value = '';
        }

        // Logique du bouton "<-" (Supprimer le dernier caractère)
        // Nous utilisons le code flèche gauche HTML (&larr; ou <-) pour le reconnaître
        else if (buttonText === '←' || buttonText === '<--' || buttonText === '&larr;') {
            display.value = display.value.slice(0, -1);
        }

        // Logique du bouton "+/-" (Changer le signe)
        else if (buttonText === '+/-') {
            // Vérifie si l'affichage n'est pas vide
            if (display.value !== '' && display.value !== 'Erreur') {
                // Change le signe de l'ensemble de l'expression ou du nombre actuel
                if (display.value.startsWith('-')) {
                    display.value = display.value.substring(1); // Enlève le moins
                } else {
                    display.value = '-' + display.value; // Ajoute un moins
                }
            }
        }

        // Logique du bouton "=" (Calculer)
        else if (button.id === 'calculate') {
            try {
                // Remplace la virgule (,) par le point (.) pour le calcul JS
                let expression = display.value.replace(/,/g, '.');
                
                // Remplace les opérateurs x et ÷ par * et /
                expression = expression.replace(/×/g, '*').replace(/÷/g, '/');
                
                // Utilise eval pour effectuer le calcul
                let result = eval(expression);
                
                // Affiche le résultat en utilisant la virgule pour l'utilisateur
                display.value = String(result).replace(/\./g, ',');
                
            } catch (e) {
                display.value = 'Erreur';
            }
        } 
        
        // --- Logique des Chiffres et Opérateurs ---
        
        // Logique pour les chiffres, les opérateurs et la virgule (,)
        else {
            // Remplace le point par la virgule pour la saisie (si vous utilisez le point dans le HTML)
            if (buttonText === '.') {
                display.value += ','; 
            }
            // Gère la virgule pour le style français
            else if (buttonText === ',') {
                // Empêche de taper une autre virgule si le dernier caractère est déjà une virgule
                if (display.value.slice(-1) !== ',') {
                   display.value += ',';
                }
            }
            // Tous les autres boutons (chiffres et opérateurs normaux)
            else {
                display.value += buttonText;
            }
        }
    });
});
