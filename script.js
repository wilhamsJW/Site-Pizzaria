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
pizzaJson.map( (item, index) => {                                  //o método map mapeia cada item do meu array pizzJson, se olhar no console verá isso, map manipula cada objeto do meu array  
                                                                  //parâmetro item conrresponde  a cada pizza, e o index á numerção de cada array q começa do 0                                      
                          
    let pizzaItem = c('.models .pizza-item').cloneNode(true);   //.models .pizza-item = uma class dentro de outra class,
                                                               //o método clodeNode, duplica o elemento ou clona, coloquei todas as pizzas na interface via js
                        
    
    //pizzaItem.setAttribute('data-key', index);            //data-key é o 1º parãmetro, poderia ser qq nome, mas qndo nos refereciamos a data sabemos q é algo relacionado á própria class ou div
    //esta linha de código se encontra abaixo, linha 37.   //index é o 2º parâmetro, index aqui representa as numerações de 0 á 6 do meu array,(só temos 6 objetos), e é o mesmo parãmetro do inicio lá em map, 
                                                          //esse 2º parâmetro é o valor desejado, poderia ser value, é o novo valor desejado do atributo  
                                                         //setAttribute = Adiciona um novo atributo ou modifica o valor de um atributo existente num elemento específico.

    pizzaItem.querySelector('.pizza-item--img img').src = item.img; 
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;         //está add os nomes das pizzas conforme o array pizzaJson, item.name é uma propriedade de pizzaJson, 
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description; //item é o parâmetro e name é a propriedade de pizzaJson
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('a').addEventListener('click', (e) => {              //função criada para o modal(area mostrada após receber um click em cima de uma pizza), ao aparcer vai receber um efeito simples,

        e.preventDefault();                                                    //evita um comportamento padrão de carregamento da página ao clickar na foto 

        pizzaItem.setAttribute('data-key', index);                            //explicação acima linha 24.             
        let key = e.target.closest('.pizza-item').getAttribute('data-key');  //target se referencia ao próprio elemento, como aqui se trata de um click, ele sente esse clcik da tag a do href do html, se vc olhar um pouquinho acima de desse bloco verá q ele se referencia a tag a
                                                                            //closest retorna o ancestral mais próximo, em relação ao elemento atual, que possui o seletor fornecido como parâmetro, o parâmetro dele ou o seletor dele é pizza item, ele irá achar a class pizza-item mais próximo da tag a
                                                                           //por fim dei um getAttribute ou seja estou pegando o atributo data-key q foi criado neste escopo, assim tenho a chave de cada pizza, saberei qual posição do meu array clikado ou qual pizza foi clikada, veja isso no console

        console.log(`PIZZA CLIKADA: ${key}`);                            //este console mostra exatamente qual pizza clikada, com a interação do setAttribute e esta linha de código acima

        c('.pizzaBig img').src = pizzaJson[key].img;                    //falta uma img
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;            //key é área clikada e também é esta var acima e name é o name do array pizzaJson q contém os nomes de todas as pizzas
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{                                 //forEach = vai rodar esta função para cada um dos itens ou das class escolhida, temos três class com o mesmo valor, por isso fiz um forEach pra aplicar a função em cada uma delas
                                                                                           //O parâmetro chamado size é o item do array pizzaJson, chamei de outro nome pq item já existe nesse contexto, e o segundo parâmetro é a ordem dos itens de 0 á 6. os nomes dos parâmetros podem ser qq um

          size.querySelector('span').innerHTML =  pizzaJson[key].sizes[sizeIndex];        //sizeIndex é o valor atual que foi clikado pelo usuário, por isso q tenho q colocar sizes[sizeIndex], se coloco só size
                                                                                         //ele vai buscar de forma aleátória na array, com sizeIndex ele busca a propriedade em questão clicada pelo user  
                                                                                   

        });

        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display = 'flex';
        setTimeout(()=>{c('.pizzaWindowArea').style.opacity = 1},300); //opacidade indo de 0 á 1 em 300 milisegundos
    });

        c('.pizza-area').append(pizzaItem);    //apeend add o elemento na interface, add extamente 7 graças ao map

});
