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
    
//    var holaMundo = document.getElementById('holaMundo');
//          var dbRef = firebase.database().ref().child('users').child('fe06b1b1-4add-41fe-b1c7-2bcc907e42d3').child('email');
//          dbRef.on('value', snap => holaMundo.innerText = snap.val());   
    
    // Obtener elementos
    const ulList = document.getElementById('lista');
    
    // Crear referencias
    const dbRefObject = firebase.database().ref().child('users');
    const dbRefList = dbRefObject.child('fe06b1b1-4add-41fe-b1c7-2bcc907e42d3').child('Experiencias').child('201706082356').child('Datos Graficas').child('GSR');
//    const dbRefList = dbRefObject.child('habilidades');
    
    var valores_fc = [];
    
    // Sincronizar objectos con la web
    dbRefList.on('value', snap => {
        var data = snap.val();  
        
//        valores_fc.push({title: data.title, content: data.content});
        
        const li = document.createElement('li'); 
        li.innerText = data;
        ulList.appendChild(li);
        
        var ctx = document.getElementById('myChart').getContext('2d');
//        ctx.height = 300;
//        ctx.width = 300;
        var myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            datasets: [{
              label: 'gsr',
              data: data,
              backgroundColor: "rgba(153,255,51,0.4)"
            }]
          }
        });
    });

    
}());