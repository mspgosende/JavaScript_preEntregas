
console.table(productos);
const carro = JSON.parse(localStorage.getItem('carro')) || []; 
let tablaBody = document.getElementById('tablabody');
let contenedorProds = document.getElementById('misprods');


function renderizarProductos(listaProds){
    contenedorProds.innerHTML='';
    for(const prod of listaProds){
        contenedorProds.innerHTML+=`
            <div class="card col-sm-2">
                <img class="card-img-top" src=${prod.foto} alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${prod.nombre}</h5>
                    <p class="card-text">$ ${prod.precio}</p>
                    <button id=${prod.id} class="btn btn-primary compra">Comprar</button>
                </div>
            </div>
        `;
    }

  
    let botones = document.getElementsByClassName('compra');
    for(const boton of botones){

        boton.addEventListener('click',()=>{
            const prodACarro = productos.find((producto) => producto.id == boton.id);
            console.log(prodACarro);
            agregarACarrito(prodACarro);
        })
        boton.onmouseover = () => {
            boton.classList.replace('btn-primary','btn-warning');
        }
        boton.onmouseout = () => {
            boton.classList.replace('btn-warning','btn-primary');
        }
    }


}

renderizarProductos(productos);

function agregarACarrito(producto){
    carro.push(producto);
    console.table(carro);
    tablaBody.innerHTML += `
        <tr>
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
        </tr>
    `;
    //total
    let total = carro.reduce((ac,prod)=> ac + prod.precio,0);
    console.log(total);
    document.getElementById('total').innerText = `Total a pagar $:${total}`;
    localStorage.setItem('carro',JSON.stringify(carro));
}


let filtro = document.getElementById('filtro');
let min = document.getElementById('min');
let max = document.getElementById('max');


function filtrarPorPrecio(precioMin, precioMax){
    const filtrados = productos.filter((prod)=> (prod.precio >= precioMin) && (prod.precio <=precioMax));
    sessionStorage.setItem('filtrados',JSON.stringify(filtrados));
    return filtrados;
}

filtro.onclick = () => {
    console.log('click');
    console.log(min.value, max.value);
    if((min.value != '')&&(max.value != '')&&(min.value < max.value)){
        let listaFiltrados = filtrarPorPrecio(min.value, max.value);
        console.log(listaFiltrados);
        renderizarProductos(listaFiltrados);
    }
}
