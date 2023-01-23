// Primeira coisa: SE VIROU O DIA:
let hoje = new Date()
let dia = hoje.getDate()


// gera lista conforme os nomes dos carros do arquivo nomesCarros.js :
const primeiroDaLista = document.querySelector("#primeiroDaLista")
nomesCarros.map(a => {
    let novoCarro = `<option>${a}</option>`
    primeiroDaLista.insertAdjacentHTML('afterend', novoCarro)
})


// Função para limpar todos os inputs:
function limpaFormulario() {
    // apaga valores anterioremente fornecidos:
    document.querySelector("#nroAula").value = ""
    document.querySelector("#ladvValue").value = ""
    document.querySelector("#cpfValue").value = ""
    document.querySelector("#rgValue").value = ""
    document.querySelector("#instrutor").value = ""
    document.querySelector("#categoria").value = ""
    document.querySelector("#placa").selectedIndex = "0"
}

// função para impedir que o usuário ao pressinar TAB ou ENTER mude de campo (input)
// além de tb apagar o valor do campo:
const inputs = document.querySelectorAll('input')
inputs.forEach(a => {
    a.addEventListener('keydown', e => {
        if (e.keyCode == 9 || e.keyCode == 13) {
            e.preventDefault()
            a.value = ''
        }
    })
})

// função em que qdo o usuário foca no nro da aula, os demais campos são limpos, para evitar
// ... que o usuário preencha os campos de CPF e RG antes do nro de Aula:
const nroAulaInput = document.querySelector('#nroAula')
nroAulaInput.addEventListener('focus', () => {
    limpaFormulario()
})




// Função dinâmica para contar os digitos (caracteres) de campos e validar:
function contaDigitos(id, dig, campo){
    // console.log(id)
    let elemento = document.querySelector(`#${id}`)
    // console.log(elemento)
    let valor = elemento.value
    // console.log(valor)

    valor = valor.replace(/[^\d]+/g, '')
    // se o nro de digitos é menor que o informado na função, dá mensagem de erro:
    if (valor.length < dig) {
        elemento.value = ''
        alert(`${campo} inválido.`)
        elemento.focus()
    } else {
        elemento.value = valor
    }    

}


// função sobre CPF (< 11 digitos)
const cpfInput = document.querySelector('#cpfValue')
cpfInput.addEventListener('change', () => {
        contaDigitos("cpfValue", 11, "CPF")
})


// função para validar campo da LADV (se com menos de X digitos...)
const ladvInput = document.querySelector('#ladvValue')
ladvInput.addEventListener('change', () => {
        contaDigitos("ladvValue", 9, "LADV")
})


// função sobre RG (< 8 digitos)
const rgValue = document.querySelector('#rgValue')
rgValue.addEventListener('change', () => {
        contaDigitos("rgValue", 8, "RG")
})




// função para validar o nro de aula conforme id gerado pelo sistema do Abel:
// dispara quando foca no próx input (ladv): 
ladvInput.addEventListener('focus', () => {
    let nroAulaValue = document.querySelector('#nroAula').value

    // trim
    let nroAula = nroAulaValue.replace(/ /g,'')
    console.log(nroAula)

    // let exemplo = "012345xx89"
    // corte será 'xx'

    let corte = nroAula.split("").slice(-4, -2).join("")
    // console.log(corte)

    let hoje = new Date()
    let dia = hoje.getDate().toString()
    // console.log(dia)

    if (corte!==dia){
        // nao é igual: ERRO + alerta de nro incorreto + apaga campo
        alert('AVISO DO SISTEMA: O Número identificador da aula está incorreto. Favor comunicar um responsável.')
        document.querySelector('#nroAula').value = ''
        ladvInput.blur()
    }

})



// função para não tornar visivel o botao para abrir o site do Detran, caso algum campo esteja em branco


/*
        // função para validar CPF:
        function _cpf(cpf) {
            cpf = cpf.replace(/[^\d]+/g, '');
            if (cpf == '') return false;
            if (cpf.length != 11 ||
                cpf == "00000000000" ||
                cpf == "11111111111" ||
                cpf == "22222222222" ||
                cpf == "33333333333" ||
                cpf == "44444444444" ||
                cpf == "55555555555" ||
                cpf == "66666666666" ||
                cpf == "77777777777" ||
                cpf == "88888888888" ||
                cpf == "99999999999")
                return false;
            add = 0;
            for (i = 0; i < 9; i++)
                add += parseInt(cpf.charAt(i)) * (10 - i);
            rev = 11 - (add % 11);
            if (rev == 10 || rev == 11)
                rev = 0;
            if (rev != parseInt(cpf.charAt(9)))
                return false;
            add = 0;
            for (i = 0; i < 10; i++)
                add += parseInt(cpf.charAt(i)) * (11 - i);
            rev = 11 - (add % 11);
            if (rev == 10 || rev == 11)
                rev = 0;
            if (rev != parseInt(cpf.charAt(10)))
                return false;
            return true;
        }

        function validarCPF(el) {
            if (!_cpf(el.value)) {

                alert("CPF inválido!" + el.value);

                // apaga o valor
                el.value = "";
            }
        }


        const cpfInput = document.querySelector('#cpfValue')
        cpfInput.addEventListener('change', () => {
            let valor = cpfInput.value
            validarCPF(valor)
        })

*/



// Elemento dos botões:
const btAbre = document.querySelector("#bt_abre")
const btFecha = document.querySelector("#bt_fecha")
let janelaDetran, estadoBtAbre, estadoBtFecha


let aulaTipo

function verificaBotoes() {
    //console.log("função: Verifica Botoes..")
    let contador2 = setTimeout(verificaBotoes, 1000)
    if (estadoBtAbre != btAbre.style.backgroundColor || estadoBtFecha != btFecha.style.backgroundColor) {
        fechaFormulario()
        janelaDetran.close()
        estadoBtAbre = btAbre.style.backgroundColor
        estadoBtFecha = btFecha.style.backgroundColor
        clearTimeout(contador2)
    }
}

function acessoDetran() {
    //estadoBtAbre = btAbre.style.backgroundColor
    //estadoBtFecha = btFecha.style.backgroundColor
    // abaixo - só funciona em firefox (depois de fazer alterações no about:config ... dom.disable_window_open_feature.location = false
    janelaDetran = window.open("http://www.e-cnhsp.sp.gov.br/gefor/", '_blank', 'locationbar=0')
    let ipEpoch = new Date().getTime()
    // ABAIXO: funciona perfeitamente se o Detran não tivesse bloqueado abrir com iframe!!
    //janelaDetran = window.open("./statics/dominio.html?id=" + ipEpoch)
    verificaBotoes()
}

// FUNÇÃO DO SUBMIT:
function gravaAula() {
    fechaFormulario()  // Oculta tela de formulário e volta a estar tela dos 2 botões
    acessoDetran()
}

// Função para abrir o formulário quando usuário pressiona um botão verde: 
function abreFormulario() {
    limpaFormulario()
    document.querySelector(".formulario").style.display = 'flex'
    document.querySelector("#bt").style.display = 'block'
    //document.querySelector(".abertura").style.display = 'none'
    document.getElementById('areaFormulario').scrollIntoView({ behavior: 'smooth' })
}

function fechaFormulario() {
    // o inverso de abreFormulario() 
    document.querySelector(".formulario").style.display = 'none'
    document.querySelector(".nroAula").style.display = 'none'
    document.querySelector("#bt").style.display = 'none'
    document.querySelector("#rodape").style.display = "none"

    //document.querySelector(".abertura").style.display = 'flex'
}


// Funções para mudar o estado dos dois botões:
function abreVerde() {
    btAbre.style.backgroundColor = "green"
    btAbre.addEventListener("click", abreFormulario)
    //estadoBtAbre = 'green'
    aulaTipo = "Abertura de Aula"
    document.getElementById('tipoAula').value = aulaTipo
}

function fechaVerde() {
    btFecha.style.backgroundColor = "green"
    btFecha.addEventListener("click", abreFormulario)
    //estadoBtFecha = 'green'
    aulaTipo = "Fechamento de Aula"
    document.getElementById('tipoAula').value = aulaTipo
}

function abreVermelho() {
    btAbre.style.backgroundColor = "red"
    btAbre.removeEventListener("click", abreFormulario)
    //estadoBtAbre = 'red'
    if (btFecha.style.backgroundColor == "red") {
        document.querySelector(".areaLoading").classList.remove("oculta")
        //fechaFormulario()
    } else {
        document.querySelector(".areaLoading").classList.add("oculta")
    }
}

function fechaVermelho() {
    btFecha.style.backgroundColor = "red"
    btFecha.removeEventListener("click", abreFormulario)
    //estadoBtFecha = 'red'
    // caso o outro botão tb esteja vermelho, vai rodar animação de processando...
    if (btAbre.style.backgroundColor == "red") {
        document.querySelector(".areaLoading").classList.remove("oculta")
        //fechaFormulario()
    } else {
        document.querySelector(".areaLoading").classList.add("oculta")
    }
}


// Função para mostrar a data de hoje:
function mostraDia() {
    let hoje = new Date()
    let nroDiaSemana = hoje.getDay() // 0=Domingo, 1=Segunda, etc...

    dia = hoje.getDate().toString()
    if (dia.length < 2) {
        dia = `0${dia}`
    }
    let mes = hoje.getMonth() + 1
    mes = mes.toString()
    if (mes.length < 2) {
        mes = `0${mes}`
    }
    let ano = hoje.getFullYear()
    let data = `${dia}/${mes}/${ano}`

    let diaSemana = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"]
    document.querySelector("#dataLogin").innerHTML = `HOJE: ${data} - ${diaSemana[nroDiaSemana].toUpperCase()}`
}


// Atualiza horario na página e verifica estado dos botões (se ficam verdes ou vermelhos):
function verificaHorarios() {
    estadoBtAbre = btAbre.style.backgroundColor
    estadoBtFecha = btFecha.style.backgroundColor
    hoje = new Date()
    // imprime constantemente o horário atualizado da tela:
    let horario = hoje.toTimeString().split(" ")[0]
    document.querySelector("#horaLogin").innerText = `${horario}`

    // variáveis para definição de hora e minuto dentro dos horários disponíveis de abertura/fechamento de aula:
    let nroDiaSemana = hoje.getDay()
    let hora = hoje.getHours()
    let minuto = hoje.getMinutes()

    //console.log("Abre Aula: DE: " + hrsAbreAula[hora].de + " ATÉ: " + hrsAbreAula[hora].ate + " ou abre Aula: DE: " + hrsAbreAula2[hora].de + " ATÉ: " + hrsAbreAula2[hora].ate)
    //console.log("Fecha Aula: DE: " + hrsFechaAula[hora].de + " ATÉ: " + hrsFechaAula[hora].ate + " ou Fecha Aula: DE: " + hrsFechaAula2[hora].de + " ATÉ: " + hrsFechaAula2[hora].ate)
    // simulação manual:
    // nroDiaSemana = 6    // para simular sábado.
    // hora = 14
    // minuto = 19
    // minuto = 50 // 2 botoes red


    // variáveis que serão usadas para receber horarios de abertura e fechamento de aulas:
    let varAbre1, varAbre2, varFecha1, varFecha2

    varAbre1 = hrsAbreAula
    varAbre2 = hrsAbreAula2
    varFecha1 = hrsFechaAula
    varFecha2 = hrsFechaAula2


    // controla cor e evento dos botões conforme o horário atual:
    // verifica estado do botao de abrir:
    if (minuto >= varAbre1[hora].de && minuto <= varAbre1[hora].ate) {
        abreVerde()
    } else if (minuto >= varAbre2[hora].de && minuto <= varAbre2[hora].ate) {
        abreVerde()
    } else {
        abreVermelho()
        // fecha as abas abertas... (do detran ou do cadastro por exemplo.)
    }

    // verifica estado do botao de fechar:
    if (minuto >= varFecha1[hora].de && minuto <= varFecha1[hora].ate) {
        // fecha as abas abertas... (do detran e/ou do cadastro por exemplo.)
        fechaVerde()
    } else if (minuto >= varFecha2[hora].de && minuto <= varFecha2[hora].ate) {
        fechaVerde()
    } else {
        fechaVermelho()
    }
    // A cada segundo atualiza esta mesma função para atualizar horário (chamando novamente a função): 
    setTimeout(verificaHorarios, 1000)
}


// Muda caracteres do input conforme instruções em data-tip de index.html:
function defineCategoria() {
    document.querySelector("#categoria").value = document.querySelector("#categoria").value.replace(/1/, "A")
    document.querySelector("#categoria").value = document.querySelector("#categoria").value.replace(/2/, "B")
    document.querySelector("#categoria").value = document.querySelector("#categoria").value.replace(/3/, "C")
    document.querySelector("#categoria").value = document.querySelector("#categoria").value.replace(/4/, "D")
    document.querySelector("#categoria").value = document.querySelector("#categoria").value.replace(/5/, "E")
    document.querySelector("#categoria").blur()
}



// mudar conforme nomes de instrutores de arquivo js...:
function defineInstrutor() {

    let inputInstrutor = document.querySelector("#instrutor")

    let nome = inputInstrutor.value

    // let nome = "Anã"

    nomeM = nome.toUpperCase()

    nomeM = nomeM.replace(/ */g,'')
    .replace('Á','A')
    .replace('Â','A')
    .replace('Ã','A')
    .replace('À','A')
    .replace('É','E')
    .replace('Ê','E')
    .replace('Í','I')
    .replace('Ó','O')
    .replace('Ô','O')
    .replace('Õ','O')
    .replace('Ú','U')


    let compara = nomesInstrutores.includes(nomeM)

    if(!compara){
        alert('ERRO: Instrutor não está cadastrado no sistema.')
        document.querySelector("#instrutor").value = ''
        inputInstrutor.blur()
    }

        /*
        // Anteriormente:
                document.querySelector("#instrutor").value = document.querySelector("#instrutor").value.replace(/1/, "Mário")
                document.querySelector("#instrutor").value = document.querySelector("#instrutor").value.replace(/2/, "Paulo")
                document.querySelector("#instrutor").value = document.querySelector("#instrutor").value.replace(/3/, "Carlos")
                // qquer outro numero que não seja os acima, não se aceitará o valor.
                document.querySelector("#instrutor").value = document.querySelector("#instrutor").value.replace(/4|5|6|7|8|9|0/, "")
                document.querySelector("#instrutor").blur()
        */

}

function apagaCampo(e) {
    e.target.value = ""
}

// Outra variante da função acima (usando this):
function apagaCampo2() {
    this.value = ""
}

function abreEscape(e) {
    //https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_event_mouse_altkey
    // dispara esta função e ao doble-clicar com o Ctrl + Alt, abre pág do Detran:
    if (e.altKey && e.ctrlKey) {
        console.log('alt + ctrl + dblclic')
        gravaAula()
    } else {
        //fechaFormulario()
        location.reload()
    }
}

//document.querySelector("#cpfValue").addEventListener("change", verificaCpf)
document.querySelector("#logoDetran").addEventListener("dblclick", abreEscape)
document.querySelector("#categoria").addEventListener("focus", apagaCampo)
document.querySelector("#instrutor").addEventListener("focus", apagaCampo)
document.querySelector("#instrutor").addEventListener("blur", defineInstrutor)
// document.querySelector("#instrutor").addEventListener("keyup", defineInstrutor)
document.querySelector("#categoria").addEventListener("keyup", defineCategoria)


// Chama as duas funções para mostrar dia e hora:
mostraDia()
verificaHorarios()
verificaBotoes()


// Para fazer TESTES (caso ambos botões estejam em vermelho) basta digitar no console: 
// abreFormulario()

// http://www.e-cnhsp.sp.gov.br
// https://chrome.google.com/webstore/detail/block-site-website-blocke/eiimnmioipafcokbfikbljfdeojpcgbh?hl=pt-BR
// https://www.techtudo.com.br/dicas-e-tutoriais/noticia/2011/01/como-desinstalar-o-internet-explorer.html
