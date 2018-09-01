(function() {

    var i = 0;

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
                        
                        const d = document.createElement('div');
                        d.className = 'block';
                        
                        const a = document.createElement('a');
                        var key = snap.key; // nombre de experiencia
                    
                        a.innerText = key;
                        a.href="lista_usuarios.html";
                        a.style.fontWeight="bold";
                        a.style.fontSize = "large";
                        a.className="list-group-item"; 
                        a.style.borderColor = "#BEB7A4";
                        a.style.borderWidth = "2px";
                        a.style.borderRadius = "10px";
                        
                        var fechaRealizacion = snap.child("fechaRealizacion").val(); 
                        var fecha = document.createElement("span");
                        fecha.fontWeight="italic";
                        fecha.fontStyle="italic";
                        fecha.innerHTML = " - " + "<i>" + fechaRealizacion + "</i>";
                        
                        var terminada = snap.child("pruebaTerminada").val(); 
                        var terminadaHTML = document.createElement("span");
                        terminadaHTML.fontWeight="bold";
                        terminadaHTML.style.fontSize = "14px";
                        if (terminada == "si") {
                            terminadaHTML.innerHTML = " Finalizada";
                            terminadaHTML.style.color="#29BF12";
                        }
                        else {
                            terminadaHTML.innerHTML =  " Pendiente";
                            terminadaHTML.style.color="#F17300";
                        }
                        
                        var descripcion = document.createElement("p");
                        descripcion.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in elementum justo. Sed in quam eget mi sodales vestibulum. Proin ut laoreet sapien. Nunc malesuada ullamcorper augue, vel varius quam ornare quis. Donec sodales efficitur velit, a aliquet massa dictum non. Mauris suscipit fermentum sapien in maximus";
                        descripcion.style.fontSize = "12px";
                        descripcion.style.fontStyle="italic";
                        
                        a.appendChild(fecha);
                        a.appendChild(descripcion);
                        a.appendChild(terminadaHTML);
                        
                        const tr = document.createElement('tr');
                        const td = document.createElement('td');
                        
                        // Tabla Striped
                        if (i % 2 == 0) 
                            a.style.background = "#E3E4DB";
                            
                        td.appendChild(a);
                        tr.appendChild(td);
                        ulList.appendChild(tr);
                        i++;
                    });

                }
            });
            
            ulList.addEventListener('click', function(e) {
                if (e.target.tagName.toLowerCase() === 'a'){
                    console.log(e.target.innerHTML);  // Check if the element is a LI
                    var experiencia_id = e.target.innerHTML
                    experiencia_id = experiencia_id.substr(0, experiencia_id.indexOf('<')); ;
                    
                    console.log(experiencia_id);
//                    sessionStorage.experiencia_seleccionada = experiencia_id.substring(13,17) + experiencia_id.substring(10,12) + experiencia_id.substring(7,9) + experiencia_id.substring(35,37) + experiencia_id.substring(38,40);
                    sessionStorage.experiencia_seleccionada = experiencia_id;
//                    window.location.href = "data.html";
                    window.location.href = "lista_usuarios.html";
                }
            });

}());