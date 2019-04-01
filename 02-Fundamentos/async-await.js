/* let getNombre = async () => {
    return 'Martin';
}

console.log(getNombre()) */


let getNombre = () => {
    return new Promise( (resolve,reject)=>{
        setTimeout(() => {
            resolve('Martin')
        }, 3000);
    })
}

let saludo = async () => {

    let nombre = await getNombre();


    return `Hola ${nombre}`;
}

saludo().then(msj => {
    console.log(msj);
})