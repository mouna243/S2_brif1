  // Variables globales
        let moves = 0;
        let timer = 0;
        let timerInterval;
        let flippedCards = [];
        let matchedPairs = 0;
        let gameStarted = false;

        // Fonction de mélange 
        function emoji() {
            const container = document.getElementById('cart_container');
            const cart = Array.from(container.children);
            
            // Réinitialiser le jeu
            resetGame();
            
            // Mélanger les cartes
            for (let i = cart.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                container.insertBefore(cart[j], cart[i]);
            }
        }

        // Fonction pour afficher les emojis au clic
        function showEmojiOnClick() {
            const carts = document.querySelectorAll('.cart');
            
            carts.forEach(cart => {
                cart.addEventListener('click', function() {
                    // Ne pas permettre de cliquer sur une carte déjà retournée ou appariée
                    if (this.classList.contains('flipped') || this.classList.contains('matched') || flippedCards.length === 2) {
                        return;
                    }
                    
                    // Démarrer le chronomètre au premier clic
                    if (!gameStarted) {
                        startTimer();
                        gameStarted = true;
                    }
                    
                    // Récupérer l'emoji depuis l'attribut data-emoji
                    const emoji = this.getAttribute('data-emoji');
                    
                    // Afficher l'emoji dans la carte
                    this.textContent = emoji;
                    this.classList.add('flipped');
                    
                    // Ajouter à la liste des cartes retournées
                    flippedCards.push(this);
                    
                    console.log(`Emoji cliqué : ${emoji}`);
                    
                    // Vérifier si deux cartes sont retournées
                    if (flippedCards.length === 2) {
                        moves++;
                        document.getElementById('move').textContent = moves;
                        checkMatch();
                    }
                });
            });
        }

        // Vérifier si les deux cartes correspondent
        function checkMatch() {
            const card1 = flippedCards[0];
            const card2 = flippedCards[1];
            
            if (card1.getAttribute('data-emoji') === card2.getAttribute('data-emoji')) {
                // Cartes correspondantes
                card1.classList.add('matched');
                card2.classList.add('matched');
                flippedCards = [];
                matchedPairs++;
                
                // Vérifier si le jeu est terminé
                if (matchedPairs === 6) { // 6 paires
                    endGame();
                }
            } else {
                // Cartes ne correspondent pas - les cacher après un délai
                setTimeout(() => {
                    card1.textContent = '';
                    card2.textContent = '';
                    card1.classList.remove('flipped');
                    card2.classList.remove('flipped');
                    flippedCards = [];
                }, 1000);
            }
        }

        // Démarrer le chronomètre
        function startTimer() {
            timerInterval = setInterval(() => {
                timer++;
                document.getElementById('timer').textContent = timer;
            }, 1000);
        }

        // Réinitialiser le jeu
        function resetGame() {
            const carts = document.querySelectorAll('.cart');
            
            // Réinitialiser l'état des cartes
            carts.forEach(cart => {
                cart.textContent = '';
                cart.classList.remove('flipped', 'matched');
            });
            
            // Réinitialiser les variables
            moves = 0;
            timer = 0;
            flippedCards = [];
            matchedPairs = 0;
            gameStarted = false;
            
            // Mettre à jour l'affichage
            document.getElementById('move').textContent = moves;
            document.getElementById('timer').textContent = timer;
            
            // Arrêter le chronomètre
            if (timerInterval) {
                clearInterval(timerInterval);
            }
        }

        // Terminer le jeu
        function endGame() {
            clearInterval(timerInterval);
            setTimeout(() => {
                alert(`Félicitations ! Vous avez gagné en ${moves} mouvements et ${timer} secondes !`);
            }, 500);
        }

        // Initialiser le jeu au chargement
        document.addEventListener('DOMContentLoaded', function() {
            showEmojiOnClick();
            // Mélanger les cartes au démarrage
            emoji();
        });