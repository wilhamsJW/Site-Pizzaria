//Estou fazendo um sistema de pizza todo em JS puro. 25/05/2020 12:25
//Em uma arquivo chamado pizzas.js encontra um array com as fotos e descrições de cada pizza
//Vamos mapear este array


/*
const c = (el)=>{                                                          //função para substituir o document... posso fazer essa função anõnima sem o uso das chaves, já q é so pra retornar
return document.querySelector(el);
}
*/

let modalQt = 1;                                                          //var criada para uso do botão mais + do modal, esse botão aumenta a quantidade de pizza pedida ao usuário                                                       
let modalKey = 0;                                                        //sendo usada pra fazer o carrinho de compras

//forma reduzida do código acima
const c = (el)=>document.querySelector(el);                             //função para substituir o document... posso fazer essa função anõnima sem o uso das chaves, já q é so pra retornar
const cs = (el)=>document.querySelectorAll(el);

//add elementos no bowser
pizzaJson.map( (item, index) => {                                   //o método map mapeia cada item do meu array pizzJson, se olhar no console verá isso, map manipula cada objeto do meu array  
                                                                   //parâmetro item conrresponde  a cada pizza, e o index á numerção de cada array q começa do 0                                      
                          
    let pizzaItem = c('.models .pizza-item').cloneNode(true);    //.models .pizza-item = uma class dentro de outra class,
                                                                //o método clodeNode, duplica o elemento ou clona, coloquei todas as pizzas na interface via js

    c('.pizza-area').append(pizzaItem);                       //apeend add o elemento na interface, add extamente 7 graças ao map, a var pizzItem recebeu um clone acima pra poder executar o html 7 vezes de acordo com a quantidade de itens no array
    
    //pizzaItem.setAttribute('data-key', index);            //data-key é o 1º parãmetro, poderia ser qq nome, mas qndo nos refereciamos a data sabemos q é algo relacionado á própria class ou div
    //esta linha de código se encontra abaixo, linha 37.   //index é o 2º parâmetro, index aqui representa as numerações de 0 á 6 do meu array,(só temos 6 objetos), e é o mesmo parãmetro do inicio lá em map, 
                                                          //esse 2º parâmetro é o valor desejado, poderia ser value, é o novo valor desejado do atributo  
                                                         //setAttribute = Adiciona um novo atributo ou modifica o valor de um atributo existente num elemento específico.

    pizzaItem.querySelector('.pizza-item--img img').src = item.img; 
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;         //está add os nomes das pizzas conforme o array pizzaJson, item.name é uma propriedade de pizzaJson, 
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description; //item é o parâmetro e name é a propriedade de pizzaJson
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;






    //Evento de click para abrir o modal 
    pizzaItem.querySelector('a').addEventListener('click', (e) => {              //função criada para o modal(area mostrada após receber um click em cima de uma pizza), ao aparcer vai receber um efeito simples,

        e.preventDefault();                                                    //evita um comportamento padrão de carregamento da página ao clickar na foto 



        //setAttribute e getAttribute me trás as propriedades do array e a posição de cada um.
        //com isto consegui postar no modal exatamente a pizza clickada de forma dinâmica, sem precisar ter que fazer vários modals no css


        pizzaItem.setAttribute('data-key', index);                            //explicação acima linha 27.             
        let key = e.target.closest('.pizza-item').getAttribute('data-key');  //target se referencia ao próprio elemento, como aqui se trata de um click, ele sente esse clcik da tag a do href do html, se vc olhar um pouquinho acima de desse bloco verá q ele se referencia a tag a
                                                                            //closest retorna o ancestral mais próximo, em relação ao elemento atual, que possui o seletor fornecido como parâmetro, o parâmetro dele ou o seletor dele é pizza item, ele irá achar a class pizza-item mais próximo da tag a
                                                                           //por fim dei um getAttribute ou seja estou pegando o atributo data-key q foi criado neste escopo, assim tenho a chave de cada pizza, saberei qual posição do meu array clikado ou qual pizza foi clikada, veja isso no console

        modalQt = 1;                                                          //var criada para uso do botão de soma mais + do modal, esse botão aumenta a quantidade de pizza pedida ao usuário                                                       
                                                                             //assim q o modal abrir a var está presente aqui resetando o número para um, sem esta var declarada com 1, aparecerá a última quantidade escolhida, caso o usuário feche e abre de novo o modal, esta var foi declarada como global
                                                                         
        modalKey = key;                                                    //sendo usada pra guardar a pizza clikada, estou usando ela no carrinho de compras

        console.log(`PIZZA CLIKADA: ${key}`);                            //este console mostra exatamente qual pizza clikada, com a interação do setAttribute e getAttribute

        c('.pizzaBig img').src = pizzaJson[key].img;                    //falta uma img
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;            //key é área clikada e também é esta var acima e name é o name do array pizzaJson q contém os nomes de todas as pizzas
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;

        //c('.pizzaInfo--size.selected').classList.remove('selected');                         //size.selected = estou me referindo a ambas as class se eu coloco um espaço me refiro a outro elemento/ estou retirando a marcação de azul feita no css, a cor azul é inidicada quando o usuário clikar e escolher o tamanho da pizza
                                                                                            

        cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{                                 //forEach = vai rodar esta função para cada um dos itens ou das class escolhida, temos três class com o mesmo valor, por isso fiz um forEach pra aplicar a função em cada uma delas
                                                                                           //O parâmetro chamado size é o item do array pizzaJson, chamei de outro nome pq item já existe nesse contexto, e o segundo parâmetro é a ordem dos itens de 0 á 6. os nomes dos parâmetros podem ser qq um

          if(sizeIndex == 2) {                                                            //add a classList selected para ficar marcada a opção da pizza grande, 2 é o index do tamanho da pizza grande 
              size.classList.add('selected');
          }  
          size.querySelector('span').innerHTML =  pizzaJson[key].sizes[sizeIndex];      //sizeIndex é o valor atual que foi clikado pelo usuário, por isso q tenho q colocar sizes[sizeIndex], se coloco só size
                                                                                       //ele vai buscar de forma aleátória na array, com sizeIndex ele busca a propriedade em questão clicada pelo user, porém a var key é a responsável por me trazer a posição e a propriedade do array em questão  
                                                                                   
        });

        //c('.pizzaInfo--qt').innerHTML = modalQt;

        c('.pizzaWindowArea').style.opacity = 0;                         //somente para que o modal nao abra de froma brusca e sim lentamente
        c('.pizzaWindowArea').style.display = 'flex';
        setTimeout(()=>{c('.pizzaWindowArea').style.opacity = 1},300); //opacidade indo de 0 á 1 em 300 milisegundos
    });

        //c('.pizza-area').append(pizzaItem);    //apeend add o elemento na interface, add extamente 7 graças ao map, a var pizzItem recebeu um clone acima pra poder executar o html 7 vezes de acordo com a quantidade de itens no array

});


//Eventos do Modal - Ativando os botôes de cancelar o botão mobile voltar
function closeModal() {

    c('.pizzaWindowArea').style.opacity = 0;                  //1° passo é colocar opacity = 0; para q o usuário não o veja mais
    setTimeout(()=>{                                         //2° passo é add o método setTimeout e na função executamos um código no css para colocar o display como none, dessa forma o modal sumirá da tela, removendo-o por completo  
        c('.pizzaWindowArea').style.display = 'none';
    }, 500);                                               //essa ocorrerá em 500 milisegundos ou meio segundo

}
cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{  //aqui chamamos as classes e fizemos um forEach pra poder add nas duas classe, item é apenas o parâmetro da função q vai ser executada
    item.addEventListener('click', closeModal);                                  //por fim add o evento de escuta que é o click e chamei a function closeModal pra ser executada
});



//Eventos do botão de menos e mais do Modal
c('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
    if(modalQt > 1) {                                          //essa verificação é pra a ação ser executada apenas se a var for maior q 1, para que o usuário não fique apertando o botão menos e gerando números negativos, pois ele não pode pedir -5 pizzas por exemplo
    modalQt--;
    c('.pizzaInfo--qt').innerHTML = modalQt;                  //modalQt é var q está sendo alterada pelo click do usuário
    }
});

c('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    modalQt++;
    c('.pizzaInfo--qt').innerHTML = modalQt;               //modalQt é var q está sendo alterada pelo click do usuário

});


//Botão Pequeno, Médio e Grande do Modal
cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{                         //size é o parâmetro equivalente ao nome de cada pizza clikada ou do item q foi clikado, sizeIndex gera  aposição do array                  
    
    size.addEventListener('click', (e)=>{                                 //pizzaInfo--size.selected é a class q por padrão está sendo add ao botão de pizza grande como marketing, então após o click peco  
        c('.pizzaInfo--size.selected').classList.remove('selected');     //pra q essa class seja removida
        size.classList.add('selected');                                 //nesta linha peço para o size add a class selected, size é o parâmetro da pizza em questão clikada, então a pista clikada passará obter a class selectede e será mostrada ao usuário o tamanho escolhido por ele da pizza 
    });

});


//Carrinho de Compras
//Temos que inserir aqui 3 informaçôes, Qual é a pizza, o tamanho e a quantas pizzas são.
//Com os consoles presentes dará pra ver o passo a passo de como obtive as informações para o carrinho

let cart = [];
c('.pizzaInfo--addButton').addEventListener('click', ()=>{

  //Qual é a pizza?  
  //console.log(`Pizza: ${modalKey}`);                                     //modalKey guarda a última pizza clikada 

  //Tamanho da pizza?
  let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));  //pizzaInfo--size.selected é a pizza escolhida pelo usuário, é a pizza em questão, eu definir isso quando fiz os botôes P, M e G 
                                                                                //getAttribute('data-key'); está me trazendo os valores de data-key, esses valores foram definidos no html, dessa forma eu sei qual o tamanho da pizza q o usuário quer pelo data-key
                                                                               //parseInt apenas pra converter uma string em número inteiro, pq estava como string, vi pelo console 
  //console.log(`Tamanho: ${size}`);

  //Quantas pizzas?
  //console.log(`Quantidade: ${modalQt}`);


  let indentifier = pizzaJson[modalKey].id + '&' + size;                        //modalKey guarda a última pizza clikada, estou pegando a id direto do pizzaJson, precisamente a id da pizza escolhida armazenada dentro do modalKey, este size é a var criada acima

/*Esta função pode ser assim de maneira tradcional ou conforme 
  a linha abaixo de forma simplificada  
  let key = cart.findIndex((item)=>{
    return item.indentifier == indentifier;
});
*/

  let key = cart.findIndex((item)=>item.indentifier == indentifier);           //um função sem as chaves e os parãmetros, como é  uma função de return eu posso fazer isso
                                                                              //findIndex vai procurar por indetifier e vê se identifier é igual á indentifier,(isto é uma comparação ou uma condição)
                                                                             //se for igual o findIndex retorna acima de -1 sendo true, se não achar alguém igual a identifier ou ele mesmo, retornará -1 ou false e cairá no else
                                                                            //ou seja esta comparação pra vê se as pizzas são iguais, pq se for do mesmo sabor e do mesmo tamanho retornará true e apenas somará a quantidade como ordenado no bloco do if       
  if(key > -1){
    cart[key].qt += modalQt;                                              //cart[key].qt += modalQt; key é o item ou a pizza q tá sendo igual a ela mesmo, se ela foi igual a ela mesma cairá nesse if, e somará os valores 
                                                                         //cart[key].qt = quando me referencio a qt o JS já entende q me refrencio á quantidade pois foi declarado dentro de cart.push pela var modalQt, então foi pedido pra somar .qt += a modalQt
                                                                        //modalQt já tem um valor guardado dentro dele pois é responsável por guardar a quantidade de pizzas pedidas

  } else {                                                            //quem cair aqui vai ser os que me trarão -1 do findIndex, lembrando q -1 é algo padrão do método finIndex, se ele não achar niguém pedido ele retorna -1 ou false
                                                                     //caindo aqui nesse else irá receber um push pra ser add novos itens ao carrinho, dentro deste objeto coloco o que quero que seja add neste carrinho   
    cart.push({
        id:pizzaJson[modalKey].id,     //ATENÇÃO:  id:pizzaJson[modalKey].id, ESTA LINHA EU HAVIA TIRADO PQ NÃO VI MUITA NECESSIDADE DELA, MAS ELA ESTÁ ME TRAZENDO TODAS AS PROPRIEDADE DA PIZZA CLIKADA, E ISSO TÁ SENDO DE MUITA IMPORTANÇIA PARA A VISUALIZAÇÃO DO CARRINHO
                                                //E SÓ CONSEGUIR VER PELO CONSOLE OS NOMES E OUTRAS PROPRIEDADE DA PIZZANO CONSOLE DA FUNÇÃO UPDATECART PQ ATIVEI ESSA LINHA DE NOVO, ESTA LINHA ESTÁ CONTRIBUINDO PARA VISUALIZAÇÃO DE QUAL FOI PIZZA FOI ESCOLHIDA PELO USUÁRIO, DESSA FORMA CONSIGO COLOCAR 
                                               //PRA VISUALIZAÇÃO NO CARRINHO PARA O USUÁRIO VER QUAL PISTA ELE ESCOLHEU  
                                              //pizzJson é a array q contém todos os itens, está em outro arquivo, modalKey guarda a última pizza clikada e o .id está me trazendo id da pizza q ele achou em pizzaJson
        indentifier,                                          
        size,                                                              //size foi declarada aí em cima
        qt:modalQt                                                        //modalQt é a var q está sendo usada para guardar a quantidade de pizzas q o usuário pediu, esta var está sendo usada no botão mais 
    });
  }
   updateCart();  //atualiza o carrinho
   closeModal(); //fecha modal
});

/**Se olharmos no console o o array cart, veremos q ele está add e guardando as informações corretamente
 * mas temo um problema, ele não está somando a quantidade de pizzas no carrinho, se o usuário clicka em 
 * uma pizza e escolhe um tamanho e fecha janela e escolhe outra, o carrinho deveria somar a pizza atual coma
 * a pizza anterior, ele tá me trazendo dois arrays separados e distintos um do outro
 */

//Evento botão mobile, para aparecer o carrinho mobile
c('.menu-openner').addEventListener('click', ()=>{

    if(cart.length > 0){
    c('aside').style.left = '0';
    };                                         //está no css dessa forma  left:100vw; alterei para 0 para aparecer o carrinho por completo
})
//fechando o carrinho mobile
c('.menu-closer').addEventListener('click', ()=>{
    c('aside').style.left = '100vw';
});


//ATUALIZAÇÕES DO CARRINHO 
function updateCart() {
    c('.menu-openner span').innerHTML = cart.length;                                //botão do mobile que tem um símbolo do carrinho para mostrar a quantidade escolhida pelo usuário

    if(cart.length > 0) {
        c('aside').classList.add('show');
        c('.cart').innerHTML = '';                                               //esta linha está zerando os itens do cart append, pq ele estava armazenando valores anteriores e mostrando as escolhas erradas

        
        let subtotal = 0;
        let desconto = 0;
        let total = 0;

         for(let i in cart) {                                                  //O laço for...in, iterage sobre todos as propriedades enumeráveis do objeto e retorna uma string 
                                                                              //com o nome das propriedades e seus respectivos valores.
/**Forma tradicional e forma simplificada abaixo
 * let pizzaItem = pizzaJson.find((item)=>{
    return item.id = cart[i].id;
});
 */         //Forma Simplificada
            let pizzaItem = pizzaJson.find((item)=>item.id == cart[i].id);    //com o find obtivemos todas as propriedades e valores da array pizzaJson, tais como: Nome, imagem, preço etc..
                                                                             //item.id == cart[i].id); item.id está se referindo ao id do pizzJson e cart[i].id é da array cart, estou fazendo uma verifiação
                                                                            //pra saber se ambos são iguais ou diferentes, porém vai sempre ser igual pq este for já é pra pizza clikada em questão, com este for
                                                                           //conseguir obter todas as informaçoes de pizzaJson graças ao for in, que percorre todos os campos da array e ao método find que me retornou propriedade e valores

                subtotal += pizzaItem.price * cart[i].qt;                 //calculando subtotal, qt é a quantidade declarada em cart                                                          
                        
                let cartItem = c('.models .cart--item').cloneNode(true);        //c('.models .cart--item') class do html sendo clonada

                let pizzaSizeName;                                //irá mostrar o tamanho da pizza, porém temos 3 tamanhos diferentes e não podemos mostrar isso através dos valores da array de 0 á 2
                switch(cart[i].size) {                           //cart[i] é a posição atual do array, é a pizza em questão, size foi declarado á cima na array cart como o tamanho da pizza,
                    case 0:                                     //criei 3 casos pq temos o mesmo valor para o mesmo item que  é tamanho, então quando for 0 será = 'P e assim por diante
                        pizzaSizeName = 'P';
                        break;
                    case 1:
                        pizzaSizeName = 'M';
                        break;
                    case 2:
                        pizzaSizeName = 'G';
                        break;         
                }

                let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;                     //obtive esses valores aqui pq a var acima pizzItem está obtendo através do método find todas as propriedades e valores da pizza ou da array pizzaJson

                cartItem.querySelector('img').src = pizzaItem.img;                        //add a img da pizza  
                cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;        //add o nome da pizza e o tamanho, criei esta var acima
                cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;



                //Funcionalidade dos Botôes + e -
                cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{

                    if (cart[i].qt > 1) {
                        cart[i].qt--;
                    } else {
                        cart.splice(i, 1);                             //splice 1° parâmetro é a posição do array e o 2º é a quantidade de item a ser excluído
                    }                                                 //splice excluiu a pizza indesejada
                        
                    updateCart(); //fecha o carrinho                        
                });    
                cartItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
                    cart[i].qt++;
                    updateCart();                                               //vai fechar o carrinho se não tiver itens      
                });   


                c('.cart').append(cartItem);                                //mostrando no carrinho a escolha da pizza e a quantidade                                                         

                //console.log(pizzaItem);                                 //neste console posso ver q ao clikar no botão add carrinho, pizzaItem já tem todas as informções da pizza pra ser usada no carrinho mostrada ao usuário tbm
            
         }

         desconto = subtotal * 0.1;                                    //0.1 foi o desconto de 10%
         total = subtotal - desconto;

         //Exibindo Subtotal, Desconto e Total
         c('.subtotal span:last-child').innerHTML = ` R$ ${subtotal.toFixed(2)} `;             //coloquei last child pq tenho duas tags span, porém quero que pegue á ultima, last-child me retorna o último filho ou eleemnto
         c('.desconto span:last-child').innerHTML = ` R$ ${desconto.toFixed(2)} `;
         c('.total span:last-child').innerHTML    = ` R$ ${total.toFixed(2)} `;


    } else {
        c('aside').classList.remove('show');              //removendo a classList q mostra o carrinho quando chega em zero
        c('aside').style.left = '100vw';                 //estou fechando o carrinho do  mobile quando chega em zero
    }
}


