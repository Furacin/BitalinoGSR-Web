var sujetos = [];

(function() {

var cont = 0;
    
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
//                            const a = document.createElement('a');
                            var key = snap.key;
                            
//                            a.innerText = key;
//                            a.href="data.html";
//                            a.style.fontStyle = "italic";
//                            a.style.fontSize = "large";
//                            a.className="list-group-item"; 
//                            ulList.appendChild(a);
                            
                            const tr = document.createElement('tr');
                            const td = document.createElement('td');

                            var link = document.createElement('a');
    //                        link.href="lista_usuarios.html";

                            var div = document.createElement('div');
                            var a = document.createElement('a');
                            var img = document.createElement('div');

                            var i = document.createElement('i');
                            i.style.padding = "8px";
                            img.appendChild(i);

                            div.className = "media";
                            a.className = "pull-left";
                            a.appendChild(img);

                            var div2 = document.createElement('div');
                            div2.className = "media-body";

                            var span = document.createElement('div');
                            var sexo = snap.child("sexo").val(); 
                            span.className = "media-meta pull-right";
                            if (sexo == "Femenino") {
                                var fa = document.createElement('i');
                                fa.className = "fa fa-venus fa-lg";
                                span.appendChild(fa);
                                span.style.color="#000000";
                            }
                            else {
                                var fa = document.createElement('i');
                                fa.className = "fa fa-mars fa-lg";
                                span.appendChild(fa);
                                span.style.color="#000000";
                            }
//                            span.innerHTML = sexo;

                            var h4 = document.createElement('h4');
                            h4.className = "title";
                            h4.innerHTML = snap.child("nombre").val() + " " + snap.child("apellidos").val();

                            var span2 = document.createElement('span');
                            span2.className = "pull-right";
                            var tipo = snap.child("opcion_multimedia").val(); 
                          
                            span2.style.color="#000000";
                            if (tipo == "Sólo Vídeo") {
                                span2.innerHTML = "Vídeo";
                                span2.style.background = "#FF6F59";
                                span2.style.fontWeight = "bold"
                                span2.style.fontSize = "16px";
                                i.className = "fa fa-file-video-o fa-2x";
                            }
                            else {
                                if (tipo == "Sólo Audio") {
                                    span2.innerHTML = "Audio";
                                    span2.style.background = "#87F5FB";
                                    span2.style.fontWeight = "bold";
                                    span2.style.fontSize = "16px";
                                    i.className = "fa fa-file-audio-o fa-2x";
                                }
                                else {
                                    span2.innerHTML = "Sin multimedia";
                                    span2.style.color = "#000000";
                                    span2.style.background = "#CEC3C1";
                                    span2.style.fontWeight = "bold";
                                    span2.style.fontSize = "16px";
                                    i.className = "fa fa-times fa-2x";
                                }
                            } 
                            var p = document.createElement('p');
                            var descripcion = snap.child("descripcion").val();
                            p.innerHTML = descripcion;
                            p.className = "summary";

                            h4.appendChild(span2);

                            div2.appendChild(span);
                            div2.appendChild(h4);
                            div2.appendChild(p);

                            div.appendChild(a);
                            div.appendChild(div2);

                            link.appendChild(div);

                            td.id = cont;
                            td.onclick = reply_click; 
                            td.appendChild(link);
                            tr.appendChild(td);
                            ulList.appendChild(tr);

                            sujetos.push(key);
                            cont++;
                        }
                    });

                }
            });
            
//            ulList.addEventListener('click', function(e) {
//                if (e.target.tagName.toLowerCase() === 'a'){
//                    console.log(e.target.innerHTML);  // Check if the element is a LI
//                    var usuario_id = e.target.innerHTML;
//                    console.log(usuario_id);
////                    sessionStorage.experiencia_seleccionada = experiencia_id.substring(13,17) + experiencia_id.substring(10,12) + experiencia_id.substring(7,9) + experiencia_id.substring(35,37) + experiencia_id.substring(38,40);
//                    sessionStorage.usuario_seleccionado = usuario_id;
//                    window.location.href = "data.html";
//                }
//            });

}());

var reply_click = function()
{
    // Obtenemos el id del td seleccionado y ex
    sessionStorage.usuario_seleccionado = sujetos[this.id];
//    console.log(experiencias[this.id]);
    window.location.href = "data.html";
}