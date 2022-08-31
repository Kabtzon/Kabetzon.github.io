//variables generales
let tarjetas_destapadas= 0;
let tarjeta1 = null;
let tarjeta2 = null;
let resultado_1 = null;
let resultado_2 = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timer_inical = timer;
let tiempo_regresivo_id = null;

let win_Audio = new Audio ('./SOUNDS/WIN.wav'); 
let click_Audio = new Audio ('./SOUNDS/CLICK.wav'); 
let lose_Audio = new Audio ('./SOUNDS/LOOSE.wav'); 
let right_Audio = new Audio ('./SOUNDS/RIGHT.wav'); 
let wrong_Audio = new Audio ('./SOUNDS/WRONG.wav'); 

//apuntado a HTML
let mostrar_movimientos = document.getElementById('movimientos');
let mostrar_aciertos = document.getElementById('aciertos');
let mostrar_tiempo = document.getElementById('tiempo_rest');

//numeros aleatorios
let num=[1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
num=num.sort(()=>{return Math.random()-0.5});
console.log(num);

//temporizador
function contartimepo(){
    tiempo_regresivo_id = setInterval(()=>{
        timer --;
        mostrar_tiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if(timer == 0){
            clearInterval(tiempo_regresivo_id);
            bloquear_tarjetas();
        } 
    },1000)
}

function bloquear_tarjetas(){
    for(let i =0; i <=15; i++){
        let tarjeta_bloquead = document.getElementById(i);
        tarjeta_bloquead.innerHTML = num[i];
        
        tarjeta_bloquead.disabled = true;

    }
}

//principal Function
function destapar(id){
    if (temporizador==false){
        contartimepo();
        temporizador= true;
    }


    tarjetas_destapadas++;
    console.log(tarjetas_destapadas);

    if(tarjetas_destapadas == 1){
        tarjeta1 = document.getElementById(id);
        resultado_1 = num[id];
        tarjeta1.innerHTML = num[id];
        click_Audio.play();
        //deshabilitar boton precionado
        tarjeta1.disabled = true;
    }else if(tarjetas_destapadas == 2){
        tarjeta2 = document.getElementById(id);
        resultado_2 = num[id];
        tarjeta2.innerHTML = num[id];
        click_Audio.play();
        //deshabilitar boton precionado
        tarjeta2.disabled = true;
        //incrementar movimientos
        movimientos++;
        mostrar_movimientos.innerHTML = `Movimientos: ${movimientos}`
        if (resultado_1 == resultado_2){
            //contador tarjetas destapadas
            tarjetas_destapadas =0;
            //aumentar aciertos
            aciertos++;
            mostrar_aciertos.innerHTML = `Aciertos= ${aciertos}`
            right_Audio.play();
            if(aciertos==8){
                win_Audio.play();
                clearInterval(tiempo_regresivo_id);
                mostrar_aciertos.innerHTML = `Aciertos= ${aciertos} 💥💥💥`
                mostrar_movimientos.innerHTML= `Movimientos: ${movimientos}💥💥💥`
                mostrar_tiempo.innerHTML= `Felicidades 🔥🔥🔥solo demoraste : ${timer_inical-timer} segundos💥💥`
            }
        }else{
            //mostrar por un rato los resultados
            setTimeout(()=>{
                tarjeta2.innerHTML = '¿?';
                tarjeta1.innerHTML = '¿?';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                wrong_Audio.play();
                tarjetas_destapadas = 0;
            },450);
        }
    }
}