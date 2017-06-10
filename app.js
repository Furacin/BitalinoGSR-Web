(function() {
    
    // Obtenemos el email del usuario logueado
    const email_login = sessionStorage.myvar;
    const experiencia = sessionStorage.experiencia_seleccionada;
//    console.log(email_login);
    
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
    
    
    dbRefObject.on('child_added', snap => {
//        var firebase_key = snap.val();
//        var key_email = key.email;
//        console.log(snap.val().email);
        if (snap.val().email == email_login) {
//            console.log("hola");
//            user_key = snap.key;
//            console.log(snap.key);
            
            const dbRefList = firebase.database().ref().child('users').child(snap.key).child('Experiencias').child(experiencia).child('Datos Graficas').child('GSR');
            const dbRefList2 = firebase.database().ref().child('users').child(snap.key).child('Experiencias').child(experiencia).child('Datos Graficas').child('FC');
            const dbRefList3 = firebase.database().ref().child('users').child(snap.key).child('Experiencias').child(experiencia).child('Datos Graficas').child('Temperatura');
            
            // Sincronizar objectos con la web
            dbRefList.on('value', snap => {
                var data = snap.val();  

                var ctx = document.getElementById('myChart').getContext('2d');
                var myChart = new Chart(ctx, {
                  type: 'line',
                  data: {
                    datasets: [{
                      label: 'Resistencia Galvánica de la piel',
                      data: data,
                      backgroundColor: "rgba(153,255,51,0.4)"
                    }]
                  }
                });
            });

            dbRefList2.on('value', snap => {
                var data = snap.val();  

                var ctx = document.getElementById('myChart2').getContext('2d');
                var myChart = new Chart(ctx, {
                  type: 'line',
                  data: {
                    datasets: [{
                      label: 'Frecuencia Cardíaca',
                      data: data,
                      backgroundColor: "rgba(153,255,51,0.4)"
                    }]
                  }
                });
            });

            dbRefList3.on('value', snap => {
                var data = snap.val();  

                var ctx = document.getElementById('myChart3').getContext('2d');
                var myChart = new Chart(ctx, {
                  type: 'line',
                  data: {
                    datasets: [{
                      label: 'Temperatura',
                      data: data,
                      backgroundColor: "rgba(153,255,51,0.4)"
                    }]
                  }
                });
            });
        }
        
        ///////////////////////////////////////////////////////////////////////////////////////
        
//        var storageRef = firebase.storage().ref('investigador@gmail.com/Vídeos/201706080054.3gpp');
        var storage = firebase.storage();
        var storageRef = storage.ref();
        var tangRef = storageRef.child('investigador@gmail.com/Vídeos/201706080054');
        
        tangRef.getDownloadURL().then(function(url) 
        {
            var test = url
            document.querySelector('video').src = test;
            console.log(url);
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