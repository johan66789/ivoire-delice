// -------------------------
// Initialisation EmailJS
// -------------------------
// Initialisez Email.js avec votre User ID
emailjs.init("x4J8GXcocfoeFg_O9");

// -------------------------
// Quand le DOM est chargé
// -------------------------
document.addEventListener("DOMContentLoaded", () => {
    const btnEnvoyer = document.querySelector(".boutton-envoyer");
    btnEnvoyer.addEventListener("click", sendEmail);
});

// -------------------------
// Fonction principale : envoi du mail
// -------------------------
function sendEmail() {
    const email = document.getElementById('email').value.trim();
    const objet = document.getElementById('objet').value.trim();
    const message = document.getElementById('message').value.trim();
    const name = document.getElementById('nom').value.trim();

    // ✅ Validation simple
    if (!email || !objet || !message || !name) {
        alert("Veuillez remplir tous les champs du formulaire.");
        return;
    }

    // ⚡ Bloquer le formulaire + afficher loading
    document.getElementById("formulaire").inert = true;
    document.getElementById("loading-icon").style.display = "block";

    // Paramètres pour EmailJS
    const templateParams = {
        to_email: email,
        email_subject: objet,
        email_message: message,
        user_name: name
    };

    // -------------------------
    // Envoi principal
    // -------------------------
    emailjs.send('service_bcshjk8', 'template_k2cz4qd', templateParams)
        .then(() => {
            // Reset du formulaire
            document.getElementById("formulaire").reset();
            document.getElementById("loading-icon").style.display = "none";
            document.getElementById("formulaire").inert = false;

            // ⚡ Afficher modal succès
            const successModal = new bootstrap.Modal(
                document.getElementById("successModal")
            );
            successModal.show();

            // ⚡ Envoi automatique à l’utilisateur
            sendresponse(email.toLowerCase(), name);

        })
        .catch(error => {
            console.error('Erreur envoi principal :', error);

            document.getElementById("loading-icon").style.display = "none";
            document.getElementById("formulaire").inert = false;

            // ⚡ Afficher modal erreur
            const errorModal = new bootstrap.Modal(
                document.getElementById("errorModal")
            );
            errorModal.show();
        });
}

// -------------------------
// Fonction réponse automatique à l’utilisateur
// -------------------------
function sendresponse(ReceiveEmail, ReceiveName) {
    const templateParam = {
        from_email: ReceiveEmail,
        from_name: ReceiveName
    };

    emailjs.send('service_bcshjk8', 'template_tvghlme', templateParam)
        .then(response => {
            console.log('Réponse automatique envoyée avec succès :', response);
        })
        .catch(error => {
            console.error('Erreur lors de la réponse automatique :', error);
        });
}




