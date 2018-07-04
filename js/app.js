
function resetZoomChar1() {
    window.myChart.resetZoom()
}

function resetZoomChar2() {
    window.myChart2.resetZoom()
}

function resetZoomChar3() {
    window.myChart3.resetZoom()
}

function NumeroElementos(length) {
    var elementos = []
    for (var i = 1; i<length+1; i++) {
        elementos.push(i);
    }
    return elementos;
}

// Control de las gráficas 
(function() {
    
//    Chart.plugins.register({
//       afterDatasetsDraw: function(chart) {
//          if (chart.tooltip._active && chart.tooltip._active.length) {
//             var activePoint = chart.tooltip._active[0],
//                ctx = chart.ctx,
//                y_axis = chart.scales['y-axis-0'],
//                x = activePoint.tooltipPosition().x,
//                topY = y_axis.top,
//                bottomY = y_axis.bottom;
//             // draw line
//             ctx.save();
//             ctx.beginPath();
//             ctx.moveTo(x, topY);
//             ctx.lineTo(x, bottomY);
//             ctx.lineWidth = 2;
//             ctx.strokeStyle = '#07C';
//             ctx.stroke();
//             ctx.restore();
//          }
//       }
//    });
    
    
    // Obtenemos el email del usuario logueado
    const email_login = sessionStorage.myvar;
    const experiencia = sessionStorage.experiencia_seleccionada;
    const usuario = sessionStorage.usuario_seleccionado;
    console.log(experiencia);
    console.log(usuario);
    
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
    
    
    // Obtener elementos
//    const ulList = document.getElementById('lista');
    
    // Crear referencias
    const dbRefObject = firebase.database().ref().child('users');
    var chart1;
    
    
    dbRefObject.on('child_added', snap => {
//        var firebase_key = snap.val();
//        var key_email = key.email;
//        console.log(snap.val().email);
        if (snap.val().email == email_login) {
//            console.log("hola");
//            user_key = snap.key;
            console.log(snap.key);
            
            const dbRefList = firebase.database().ref().child('users').child(snap.key).child('Experiencias').child(experiencia).child(usuario).child('Datos Graficas').child('GSR');
            const dbRefList2 = firebase.database().ref().child('users').child(snap.key).child('Experiencias').child(experiencia).child(usuario).child('Datos Graficas').child('FC');
            const dbRefList3 = firebase.database().ref().child('users').child(snap.key).child('Experiencias').child(experiencia).child(usuario).child('Datos Graficas').child('Temperatura');
            
            // Sincronizar objectos con la web
            dbRefList.on('value', snap => {
                var data = snap.val();  

                var ctx = document.getElementById('myChart').getContext('2d');
                var labelElementos = NumeroElementos(data.length);
                
                window.myChar1 = new Chart(document.getElementById('myChart'), {
                type: 'line',
                data: {
                    labels: labelElementos,
                    datasets: [{
                      label: 'Resistencia Galvánica de la piel',
                      data: data,
                      backgroundColor: "rgba(0,0,255,0.6)"
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    },
                    // Container for pan options
                    pan: {
                        // Boolean to enable panning
                        enabled: true,

                        // Panning directions. Remove the appropriate direction to disable 
                        // Eg. 'y' would only allow panning in the y direction
                        mode: 'xy'
                    },

                    // Container for zoom options
                    zoom: {
                        // Boolean to enable zooming
                        enabled: true,

                        // Zooming directions. Remove the appropriate direction to disable 
                        // Eg. 'y' would only allow zooming in the y direction
                        mode: 'x',
                    }
                }
            });
                
            });
            
            //window.myChar1 = chart1;
//            var meta = chart1.getDatasetMeta(0);
//            var x = meta.data[1]._model.x
//            var y = meta.data[1]._model.y
//            console.log(x);
//            console.log(y);

            dbRefList2.on('value', snap => {
                var data = snap.val();  

                var ctx = document.getElementById('myChart2').getContext('2d');
                var labelElementos = NumeroElementos(data.length);
                window.myChart2 = new Chart(ctx, {
                  type: 'line',
                  data: {
                      labels: labelElementos,
                    datasets: [{
                      label: 'Frecuencia Cardíaca',
                      data: data,
                      backgroundColor: "rgba(255,0,0,0.6)"
                    }]
                  },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    },
                    // Container for pan options
                    pan: {
                        // Boolean to enable panning
                        enabled: true,

                        // Panning directions. Remove the appropriate direction to disable 
                        // Eg. 'y' would only allow panning in the y direction
                        mode: 'xy'
                    },

                    // Container for zoom options
                    zoom: {
                        // Boolean to enable zooming
                        enabled: true,

                        // Zooming directions. Remove the appropriate direction to disable 
                        // Eg. 'y' would only allow zooming in the y direction
                        mode: 'x',
                    }
                }
                });
            });

            dbRefList3.on('value', snap => {
                var data = snap.val();  

                var ctx = document.getElementById('myChart3').getContext('2d');
                var labelElementos = NumeroElementos(data.length);
                window.myChart3 = new Chart(ctx, {
                  type: 'line',
                  data: {
                      labels: labelElementos,
                    datasets: [{
                      label: 'Temperatura',
                      data: data,
                      backgroundColor: "rgba(255,0,255,0.6)"
                    }]
                  },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero:true
                                }
                            }]
                        },
                        // Container for pan options
                        pan: {
                            // Boolean to enable panning
                            enabled: true,

                            // Panning directions. Remove the appropriate direction to disable 
                            // Eg. 'y' would only allow panning in the y direction
                            mode: 'xy'
                        },

                        // Container for zoom options
                        zoom: {
                            // Boolean to enable zooming
                            enabled: true,

                            // Zooming directions. Remove the appropriate direction to disable 
                            // Eg. 'y' would only allow zooming in the y direction
                            mode: 'x',
                        }
                    }
                });
            });
        }
        
        ///////////////////////////////////////////////////////////////////////////////////////
        
        // Vídeo (si lo hay)
        
        var storage = firebase.storage();
        var storageRef = storage.ref();
        
        var tangRef = storageRef.child(email_login + '/Vídeos/' + experiencia + '/' + usuario + '/' + 'video.3gp');
        
//        console.log(tangRef);
//        
        tangRef.getDownloadURL().then(function(url) 
        {
            var test = url
            document.querySelector('video').src = test;
        }).catch(function(error) 
        {
            switch (error.code) 
            {
                case 'storage/object_not_found':
                    break;

                case 'storage/unauthorized':
                    break;

                case 'storage/canceled':
                    break;

                case 'storage/unknown':
                    break;
            }
        });
        
    });
    
}());


function lineaVerticalGSR() {
    var imageOffset = 430;
    
            // Duración del vídeo
            var duracionVideo;    
            var video = document.getElementById("video");
            
            setTimeout(function() {
                duracionVideo = video.duration
                console.log(duracionVideo)
            }, 2000);
                
            document.getElementById("verticalLine").style.left = imageOffset.toString() + "px";
            
            // Obtenemos el valor del slider
            var slider = document.getElementById("slider");
       
            // Obtener la posición del slider
//            var position = slider.getBoundingClientRect();
//            var x = position.left;
//            var y = position.right;
//            console.log(x);
//            console.log(y);
            
            slider.addEventListener('input', function(){       
                // Vamos desplazando la línea vertical
                if (slider.value==1) 
                    imageOffset = 430
                else
                    imageOffset = 430 + 4.65*parseInt(slider.value)
                document.getElementById("verticalLine").style.left = imageOffset + "px";
                
                // Movemos el vídeo
                // Dividimos la duración del vídeo entre los 100 steps del slider
                var videoStep = duracionVideo/100
                // Cambiamos el tiempo del vídeo según se mueve el slider
                video.currentTime = videoStep*slider.value
                
            },false);
}