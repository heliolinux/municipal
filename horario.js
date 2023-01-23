// http://worldtimeapi.org/api/ip

// http://worldclockapi.com/api/json/utc/now


let site1 = "http://worldtimeapi.org/api/timezone/America/Sao_Paulo"
let site2 = "http://worldclockapi.com/api/json/utc/now"

let varGlobal, diaTempo, mesTempo, anoTempo, horaCompletaTempo, horaTempo, minutoTempo

// laço para voltar a executar a cada minuto:

fetch(site1)
    .then(response => {
        return response.json();
    }).then(data => {
        // Work with JSON data here
        // console.log("HORARIO --->" + data);
        varGlobal = data
        let tempo = varGlobal.datetime
        diaTempo =  tempo.split('T')[0].split('-')[2]
        mesTempo =  tempo.split('T')[0].split('-')[1]
        anoTempo =  tempo.split('T')[0].split('-')[0]
        horaCompletaTempo = tempo.split('T')[1].split('.')[0]
        horatempo = horaCompletaTempo.split(':')[0]
        minutoTempo = horaCompletaTempo.split(':')[1]

    }).catch(err => {
        // Do something for an error here
    });


// Atribui ao InnerHTMl o horario/data da tela a cada minuto atualizado:



setTimeout(atualizaHorario, 1000)