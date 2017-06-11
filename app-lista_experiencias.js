(function() {


// Initialize Firebase
            const config = {
                apiKey: "AIzaSyA-f9NMWCpap1SmlKs9nVWkTX9LJNAOSC0",
                authDomain: "mbandgsr.firebaseapp.com",
                databaseURL: "https://mbandgsr.firebaseio.com",
                projectId: "mbandgsr",
                storageBucket: "mbandgsr.appspot.com",
                messagingSenderId: "457411073799"
            };
            firebase.initializeApp(config);
            
            ///////////////////////////////////////////////////////////////////////////////////
            
            const ulList = document.getElementById('lista');
            
            const dbRefObject = firebase.database().ref().child('users');
            
            // Obtenemos el email del usuario logueado
            const email_login = sessionStorage.myvar;
//            console.log(email_login);
            
            dbRefObject.on('child_added', snap => {
                if (snap.val().email == email_login) {
                    console.log(snap.key);
                    const dbRefExperiencias = dbRefObject.child(snap.key).child('Experiencias');
                    dbRefExperiencias.on('child_added', snap => {
//                        console.log(snap.key);
                        const li = document.createElement('a');
                        li.innerText = snap.key;
                        li.href="data.html";
                        li.className="list-group-item"; 
                        ulList.appendChild(li);
                    });

                }
            });
            
            ulList.addEventListener('click', function(e) {
                if (e.target.tagName.toLowerCase() === 'a'){
                    console.log(e.target.innerHTML);  // Check if the element is a LI
                    sessionStorage.experiencia_seleccionada = e.target.innerHTML;
                    window.location.href = "data.html";
                }
            });

}());