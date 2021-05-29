// setTimeout(function(){
//     console.log('Hola Mundo');
// }, 1000);

const getUsuarioByID = (id, callback) => {
  const usuario = {
    id: id,
    nombre: "Martin",
  };

  setTimeout(() => {
    callback(usuario);
  }, 1500);
};

getUsuarioByID(10, (usuario) => {
    console.log(usuario);
});
