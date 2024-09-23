/**
 * @author LANE Romuald 😎 <laneromuald@gmail.com>
 */

window.onload = function() {

        canvas = document.getElementById("jardin");
        if (!canvas) {
            alert("Impossible de récupérer le canvas");
            return;
        }
        contexte = canvas.getContext("2d");
        if (!contexte) {
            alert("Impossible de récupérer le context du canvas");
            return;
        }
        document.addEventListener("keydown", keySprint);
        //speed
        denov = 5;
        vitesse = 1000 / denov;
        intervalID = setInterval(main, vitesse);

    }
    //variables Globales
snakeheadx = 25;
snakeheady = 25;
fruitx = 250;
fruity = 250;
largeur = hauteur = 25;
deplacex = 0;
deplacey = 0;

//head of snake
serpent = new Image();
serpent.src = "Images/Serpent/headd.png";
corps = new Image();
corps.src = "Images/Serpent/body.png";
back = new Image();
back.src = "Images/Interface/back.png";

//les fruits
f1 = new Image();
f1.src = "Images/Fruits/bananes.png";
f2 = new Image();
f2.src = "Images/Fruits/orange.png";
f3 = new Image();
f3.src = "Images/Fruits/lemon.png";
f4 = new Image();
f4.src = "Images/Fruits/avoca.png";
f5 = new Image();
f5.src = "Images/Fruits/mango.png";

//A  présent  pour  plus  de  logique  ne  laissons  pas  le  serpent  faire  un  demi-tour  sur  lui-même la variable tour
tour = 0;

//depalcei
depalcei = 500;

//pause
gamepause = false;

//control snake move
trace = [];
tailleTrace = 3;
// trace.push({snakeheadx:snakeheadx,snakeheady:snakeheady});
// trace.push({x:snakeheadx,y:snakeheady});

//tableau de fruits
fruits = [f1, f2, f3, f4, f5];
fruitsuivant = 3;

//variable pour score
score = 0;
banane = 0;
bmaj = document.getElementById("bananescounter");
orange = 0;
omaj = document.getElementById("orangecounter");
lemon = 0;
lmaj = document.getElementById("lemoncounter");
avoca = 0;
amaj = document.getElementById("avocacounter");
mango = 0;
mmaj = document.getElementById("mangocounter");
scoremaj = document.getElementById("valeurscore");

collisionbody = false;
attenterand = 0;

//la gestion du time
centi = 0;
mili = 0;
sec = 0;
sec_ = 0;
m = 0;
n = 3;
startingMinutes = 3;
go = startingMinutes * 60;
afficher = n + ":" + m + "0";
//document.getElementById("valeurTime").innerHTML = afficher;
energie = 0;
flou = 0;
posx = 200;
posy = 518;


//fonction principale de notre jeu le main
function main() {

    //le timer ce lance des lorsquons commence a jouer
    //sablIterv=setInterval(sablier,1000/8);
    //time();

    //Le snake se deplace 
    snakeheadx += deplacex * largeur;
    snakeheady += deplacey * hauteur;

    //place au Game Over
    gameover();
    contexte.clearRect(0, 0, canvas.width, canvas.height); // efface la zone de canvas
    contexte.fillStyle = "#DEB887";
    contexte.fillRect(0, 0, canvas.width, canvas.height);
    // la longueur et la largeur de fillRect sont donnees en pixels
    //fillRect permet de construire des rectangle plein
    contexte.strokeStyle = 'red';
    //strokeRect permet de construire des contours
    contexte.strokeRect(0, 0, canvas.width, canvas.height)
    contexte.drawImage(back, 0, 0);

    //le serpent et son corps
    for (var i = 0; i < trace.length; i++) {
        //contexte.fillRect(trace[i].snakeheadx,trace[i].snakeheady,largeur,hauteur);
        contexte.drawImage(corps, trace[i].snakeheadx, trace[i].snakeheady);
        //if(trace[i].snakeheadx==snakeheadx && trace[i].snakeheady==snakeheady) {

        //	tailleTrace = 3;
        //}

    }

    contexte.drawImage(serpent, snakeheadx, snakeheady);
    //contexte.drawImage(serpent,snakeheadx-25, snakeheady-25);
    //push() ajoute un ou plusieurs éléments à la fin d'un tableau et retourne la nouvelle taille du tableau.
    trace.push({ snakeheadx: snakeheadx, snakeheady: snakeheady });
    while (trace.length > tailleTrace) {
        //shift() permet de retirer le premier élément d'un tableau et de renvoyer cet élément.
        // Cette méthode modifie la longueur du tableau.
        trace.shift();

    }

    //collision du serpent avec lui meme
    if (trace.length > 3) {
        for (var jo = 0; jo < trace.length - 1; jo++) {
            // la position lenngth - 1 est celle de la tête elle n'a pas besoin d'être inclut dans le test avec elle même!
            if ((trace[jo].snakeheadx == trace[trace.length - 1].snakeheadx) && (trace[jo].snakeheady == trace[trace.length - 1].snakeheady)) {
                collisionbody = true;
                gameover();
                break;
            }
        }
    }

    // et si le serpent mange un fruit
    if (fruitx == snakeheadx && fruity == snakeheady) {
        document.getElementById('colis').play();
        energie++;
        if (fruitsuivant == 0) {
            banane++;
            bmaj.innerHTML = banane;
        }
        if (fruitsuivant == 1) {
            orange++;
            omaj.innerHTML = orange;
        }
        if (fruitsuivant == 2) {
            lemon++;
            lmaj.innerHTML = lemon;
        }
        if (fruitsuivant == 4) {
            mango++;
            mmaj.innerHTML = mango;
        }
        if (fruitsuivant == 3) {
            avoca++;
            amaj.innerHTML = avoca;
        }

        fruitsuivant = Math.trunc(Math.random() * 5); //on random pour l'indice du prochain fruit
        //flou=2+Math.trunc(m/n);
        flou = 1 + 60 - m;
        score += flou;
        majScore(score);
        m = 0;
        n = 3;
        go = startingMinutes * 60;
        tailleTrace++;
        // coordonnees fruits par random 
        fruitx = Math.round(Math.random() * (canvas.width - largeur) / largeur) * largeur;
        fruity = Math.round(Math.random() * (canvas.height - hauteur) / hauteur) * hauteur;
        for (var i = 0; i < trace.length; i++) {
            if (trace[i].snakeheadx == fruitx && trace[i].snakeheady == fruity) {
                fruitx = Math.round(Math.random() * (canvas.width - largeur) / largeur) * largeur;
                fruity = Math.round(Math.random() * (canvas.height - hauteur) / hauteur) * hauteur;
            }
        }

    }

    //nous decidons qu'apres 100 secondes si le serpent n'a pqs encore consomme la pomme  on deplace sa position
    else {
        attenterand = attenterand + 2;
        if (attenterand > 100) {
            attenterand = 0;
            // coordonnees fruits par random 
            fruitx = Math.round(Math.random() * (canvas.width - largeur) / largeur) * largeur;
            fruity = Math.round(Math.random() * (canvas.height - hauteur) / hauteur) * hauteur;
            for (var i = 0; i < trace.length; i++) {
                if (trace[i].snakeheadx == fruitx && trace[i].snakeheady == fruity) {
                    fruitx = Math.round(Math.random() * (canvas.width - largeur) / largeur) * largeur;
                    fruity = Math.round(Math.random() * (canvas.height - hauteur) / hauteur) * hauteur;
                }
            }
            fruitsuivant = Math.trunc(Math.random() * 5); //on random pour l'indice du prochain fruit
        }

    }
    //probleme
    if (fruitx > 500) {
        fruitx = 250;
    }
    if (fruitx < 5) {
        fruitx = 250;
    }
    if (fruity > 500) {
        fruity = 250;
    }
    if (fruity < 5) {
        fruity = 250;
    }
    contexte.drawImage(fruits[fruitsuivant], fruitx, fruity);

    //Le Chono;
    contexte.fillStyle = '#2c3e50';
    contexte.fillRect(0, 500, 525, 25);
    contexte.font = 'bold 20px sans-serif';
    contexte.strokeStyle = '#2c3e50';
    contexte.fillStyle = 'white';
    contexte.textBaseline = 'middle';

    contexte.strokeText('TIME: ' + n + ':' + m, posx, posy);
    contexte.fillText('TIME: ' + n + ':' + m, posx, posy);

    //acceleration
    //apres 6 fruits conseomme le jeux accelere
    if (energie > 3) {
        energie = 0;

        clearInterval(intervalID);
        denov = denov + 1;
        vitesse = 1000 / denov;
        intervalID = setInterval(main, vitesse);
    }

}

//fonction pour time
function sablier() {
    if (go == 0) {
        go = startingMinutes * 60;
    }
    n = Math.floor(go / 60);
    m = go % 60;
    m = m < 10 ? '0' + m : m;
    go--;
    afficher = n + ":" + m;
}

function time() {
    mili++;

    if (mili < 10) {
        m = "0" + mili;
    } else {
        m = mili;
    }

    if (mili == 60) {
        sec++;
        if (sec < 10) {
            sec_ = "0" + sec;
        } else {
            sec_ = sec;
        }

        afficher = sec_ + ":" + m;
        n = sec_;
        mili = 0;
    } else { afficher = n + ":" + m; }
    //document.getElementById("valeurTime").innerHTML = afficher;

    // reglage = window.setTimeout("time();",1000);
}

// fonction Gameover
function gameover() {
    if (snakeheadx < -1 || snakeheadx > depalcei + 1 || snakeheady < -1 || snakeheady > depalcei - 1 || collisionbody == true) {

        contexte.font = 'bold 50px sans-serif';
        contexte.strokeStyle = '#2c3e50';
        contexte.fillStyle = 'white';
        contexte.textBaseline = 'middle';
        contexte.textAlign = 'center';
        contexte.strokeText('Game Over', canvas.width / 2, canvas.height / 2);
        contexte.fillText('Game Over', canvas.width / 2, canvas.height / 2);
        contexte.fillStyle = 'white';
        contexte.strokeStyle = '#2c3e50';
        contexte.font = 'bold 20px sans-serif';
        contexte.strokeText('R pour rejouer !', canvas.width / 2 + 40, canvas.height / 2 + 40);
        contexte.fillText('R pour rejouer !', canvas.width / 2 + 40, canvas.height / 2 + 40);


        clearTime(intervalID);
        //window.location.reload();

    }
}

//fonction pour mettre a jours le score
function majScore(s) {
    scoremaj.innerHTML = s;
}

function randfruits() {
    if (fruitsuivant == 0) {
        f1.src = "Images/Serpent/headd.png";

        fruitsuivant++;
    }
    if (fruitsuivant == 1) {
        f1.src = "Images/Serpent/headb.png";

        fruitsuivant++;
    }
    if (fruitsuivant == 2) {
        f1.src = "Images/Serpent/headh.png";

        fruitsuivant++;
    }
    if (fruitsuivant == 3) {
        f1.src = "Images/Serpent/headg.png";

        fruitsuivant++;
    } else {
        fruitsuivant = 0;
        f1.src = "Images/Serpent/headd.png";


    }

}
//la fonction pause()
function pause() {


    if (!gamepause) {
        intervalID = clearInterval(intervalID);

        gamepause = true;
        contexte.font = 'bold 50px sans-serif';
        contexte.strokeStyle = 'red';
        contexte.fillStyle = 'white';
        contexte.textBaseline = 'middle';
        contexte.textAlign = 'center';
        contexte.strokeText('PAUSE', canvas.width / 2, canvas.height / 2);
        contexte.fillText('PAUSE', canvas.width / 2, canvas.height / 2);

    } else if (gamepause) {
        intervalID = setInterval(main, vitesse);

        gamepause = false;
    }
    //clearTimeout(intervalID);
}

// la fonction keySprint() // deplacement du snake
function keySprint(evenement) {
    sableintervalID = setInterval(sablier, 1000 / 2);
    //sablier();
    switch (evenement.keyCode) {
        case 37: //37 code clavier de la touche de direction gauche
            //if(tour==39){break;}
            deplacex = -1;
            deplacey = 0;
            serpent.src = "Images/Serpent/headg.png";
            tour = evenement.keyCode;
            break;

        case 38: // 38 code clavier de la touche de direction haut
            if (tour == 40) { break; }
            deplacex = 0;
            deplacey = -1;
            serpent.src = "Images/Serpent/headh.png";
            tour = evenement.keyCode;
            break;

        case 39: //39 code clavier de la touche de direction droite
            //if(tour==37){break;}
            deplacex = 1;
            deplacey = 0;
            serpent.src = "Images/Serpent/headd.png";
            tour = evenement.keyCode;
            break;

        case 40: // 40 code clavier de la touche de direction  bas
            if (tour == 38) { break; }
            deplacex = 0;
            deplacey = 1;
            serpent.src = "Images/Serpent/headb.png";
            tour = evenement.keyCode;
            break;

        case 82: // 82 code clavier de la touche r/R , pour restart, reintialiser tous
            denov = 5;
            vitesse = 1000 / denov;
            //variable Glo
            snakeheadx = 25;
            snakeheady = 25;
            fruitx = 250;
            fruity = 250;
            largeur = hauteur = 25;
            deplacex = 0;
            deplacey = 0;
            //head of snake
            serpent = new Image();
            serpent.src = "Images/Serpent/headd.png";
            corps = new Image();
            corps.src = "Images/Serpent/body.png";
            back = new Image();
            back.src = "Images/Interface/back.png";

            //les fruits
            f1 = new Image();
            f1.src = "Images/Fruits/bananes.png";
            f2 = new Image();
            f2.src = "Images/Fruits/orange.png";
            f3 = new Image();
            f3.src = "Images/Fruits/lemon.png";
            f4 = new Image();
            f4.src = "Images/Fruits/avoca.png";
            f5 = new Image();
            f5.src = "Images/Fruits/mango.png";
            //A  présent  pour  plus  de  logique  ne  laissons  pas  le  serpent  faire  un  demi-tour  sur  lui-même la variable tour
            tour = 0;
            //depalcei
            depalcei = 500;
            //pause
            gamepause = false;
            //control snake move
            trace = [];
            tailleTrace = 3;
            // trace.push({snakeheadx:snakeheadx,snakeheady:snakeheady});
            // trace.push({x:snakeheadx,y:snakeheady});
            //tableau de fruits
            fruits = [f1, f2, f3, f4, f5];
            fruitsuivant = 3;

            //var pour score
            score = 0;
            majScore(score);
            banane = 0;
            bmaj.innerHTML = banane;
            bmaj = document.getElementById("bananescounter");
            orange = 0;
            omaj.innerHTML = banane;
            omaj = document.getElementById("orangecounter");
            lemon = 0;
            lmaj.innerHTML = banane;
            lmaj = document.getElementById("lemoncounter");
            avoca = 0;
            amaj.innerHTML = banane;
            amaj = document.getElementById("avocacounter");
            mango = 0;
            mmaj.innerHTML = banane;
            mmaj = document.getElementById("mangocounter");
            scoremaj = document.getElementById("valeurscore");

            collisionbody = false;
            attenterand = 0;
            //le time
            centi = 0;
            mili = 0;
            sec = 0;
            sec_ = 0;
            m = 0;
            n = 3;
            startingMinutes = 3;
            go = startingMinutes * 60;
            afficher = n + ":" + m + "0";
            //document.getElementById("valeurTime").innerHTML = afficher;
            energie = 0;
            flou = 0;
            posx = 200;
            posy = 518;
            //sabler

            break;
        case 80: //  code clavier de la touche p/P, pour pause
            //intervalID=clearInterval(intervalID);

            pause();
            break;

    }

}
/**
 * @author LANE Romuald 😎 <laneromuald@gmail.com>
 */