# **P6 Construisez une API sécurisée pour une application d'avis gastronomique**

## 1. Créer un dossier hot takes

> ➡️ ouvrez le dans VScode

## 2. Cloner le Ffont

> ➡️ $ git clone <https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6.git>
>
> - suivez le README.MD du front

## 3. Cloner le back

> ➡️ $ git clone <https://github.com/Cartoine/P6_AntoineCarrel_10102021>
>
> ➡️ cd backend
>
> ➡️ npm install
>
> ➡️ créer les dossiers manquant
>
> ➡️ npm start

### ⚠️ Prérequis

> Avant d'accéder à l'application vous avez plusieurs choses a faire:
>
> - créer le dossier images
> - créer une bdd mongodb
> - créer le dossier .env

## 📡 mongodb

> 1️⃣ créer un nouveau projet
>
> 2️⃣ créer une basse de données
>
> 3️⃣ Ajouter un nouvel utilisateur (lecture et ecriture dans n'importe quelle BDD)
>
> 4️⃣ Créer les autorisation d'accées a la bdd dans accés au réseau (autoriser l'accés de n'importe ou)
>
> 5️⃣ dans databses -> connect -> Connect your application
>
> 6️⃣ copier le liens et renplacer les éléments dans le .env
>
> mongodb+srv://**DB_USER**:<**>DB_PASSWORD**>@**HOST<**/**DB_NAME**?retryWrites=true&w=majority

### 🔒 Fichier .env

> PORT=3000
> DB_USER="your db user "
> DB_PASSWORD="your pasword"
> DB_NAME="Le nom de votre bdd"
> HOST="ce qui ce trouve aprés le @ dans l'adresse de connection mongodb "
