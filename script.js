//Estou fazendo um sistema de pizza todo em JS puro. 25/05/2020 12:25
//Em uma arquivo chamado pizzas.js encontra um array com as fotos e descrições de cada pizza
//Vamos mapear este array


/*
const c = (el)=>{                                                          //função para substituir o document... posso fazer essa função anõnima sem o uso das chaves, já q é so pra retornar
return document.querySelector(el);
}
*/

//forma reduzida do código acima
const c = (el)=>document.querySelector(el);
const cs = (el)=>document.querySelectorAll(el);

//add elementos no bowser
pizzaJson.map( (item, index) => {                                  //o método map mapeia cada item do meu array pizzJson, se olhar no console verá isso  
                                                                  //parâmetro item conrresponde  a cada pizza, e o index á numerção de cada array q começa do 0                                      
                          
    let pizzaItem = c('.models .pizza-item').cloneNode(true);   //.models .pizza-item = uma class dentro de outra class,
                                                               //o método clodeNode, duplica o elemento ou clona, coloquei todas as pizzas no browser via js
    c('.pizza-area').append(pizzaItem);                       //apeend add o elemento no browser
    
    pizzaItem.querySelector('.pizza-item--img img').src = item.img; 
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;         //está add os nomes das pizzas conforme o array pizzaJson, item.name é uma propriedade de pizzaJson, 
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.description; //item é o parâmetro e name é a propriedade de pizzaJson
    pizzaItem.querySelector('.pizza-item--name').innerHTML = `R$ ${item.price.toFixed(2)}`;

      

});