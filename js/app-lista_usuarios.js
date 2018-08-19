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
            const experiencia_seleccionada = sessionStorage.experiencia_seleccionada;
        
            dbRefObject.on('child_added', snap => {
                if (snap.val().email == email_login) {
                    console.log(snap.key);
                    const dbRefExperiencias = dbRefObject.child(snap.key).child('Experiencias').child(experiencia_seleccionada);
                    dbRefExperiencias.on('child_added', snap => {
                        if (snap.key != "fechaRealizacion" && snap.key != "pruebaTerminada") {
    //                        console.log(snap.key);
                            const a = document.createElement('a');
                            var key = snap.key;

    //                        var año = key.substring(0,4);
    //                        var mes = key.substring(4,6);
    //                        var dia = key.substring(6,8);
    //                        var hora = key.substring(8,10);
    //                        var minutos = key.substring(10,12);
    //                        a.innerText = "Fecha: " + dia + "/" + mes + "/" + año + ", Hora de inicio: " + hora + ":" + minutos + "."; 
                            a.innerText = key;
                            a.href="data.html";
                            a.style.fontStyle = "italic";
                            a.style.fontSize = "large";
                            a.className="list-group-item"; 
                            ulList.appendChild(a);
                        }
                    });

                }
            });
            
            ulList.addEventListener('click', function(e) {
                if (e.target.tagName.toLowerCase() === 'a'){
                    console.log(e.target.innerHTML);  // Check if the element is a LI
                    var usuario_id = e.target.innerHTML;
                    console.log(usuario_id);
//                    sessionStorage.experiencia_seleccionada = experiencia_id.substring(13,17) + experiencia_id.substring(10,12) + experiencia_id.substring(7,9) + experiencia_id.substring(35,37) + experiencia_id.substring(38,40);
                    sessionStorage.usuario_seleccionado = usuario_id;
                    window.location.href = "data.html";
                }
            });

}());