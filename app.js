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
        
    ///////////////////////////////////////////////////////////////////////////////////////
    
    const dbRefList2 = dbRefObject.child('fe06b1b1-4add-41fe-b1c7-2bcc907e42d3').child('Experiencias').child('201706082356').child('Datos Graficas').child('FC');
    
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
    
    ///////////////////////////////////////////////////////////////////////////////////////
    
    const dbRefList3 = dbRefObject.child('fe06b1b1-4add-41fe-b1c7-2bcc907e42d3').child('Experiencias').child('201706082356').child('Datos Graficas').child('Temperatura');
    
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
    
}());