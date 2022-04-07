

jQuery(document).ready(function(){
    localStorageExpires();//Auto executa a limpeza
});

function localStorageExpires()
{
    var
        toRemove = [],                      //Itens para serem removidos
        currentDate = new Date().getTime(); //Data atual em milissegundos

    for (var i = 0, j = localStorage.length; i < j; i++) {
        var key = localStorage.key(i);
        var current = localStorage.getItem(key);

        //Verifica se o formato do item para evitar conflitar com outras aplicações
        if (current && /^\{(.*?)\}$/.test(current)) {

            //Decodifica de volta para JSON
            current = JSON.parse(current);

            //Checa a chave expires do item especifico se for mais antigo que a data atual ele salva no array
            if (current.expires && current.expires <= currentDate) {
                toRemove.push(key);

                localStorage.removeItem('SessionUID');
            }
        }
    }

    // Remove itens que já passaram do tempo
    // Se remover no primeiro loop isto poderia afetar a ordem,
    // pois quando se remove um item geralmente o objeto ou array são reordenados
    for (var i = toRemove.length - 1; i >= 0; i--) 
    {
        localStorage.removeItem(toRemove[i]);
    }
}

//Declare isto
function setLocalStorage(chave, valor, minutos)
{
    var expirarem = (new Date().getTime()) + (60000 * minutos);

    localStorage.setItem(chave, JSON.stringify({
        "value": valor,
        "expires": expirarem
    }));
}

function getLocalStorage(chave)
{
    localStorageExpires();//Limpa itens

    var itemValue = localStorage[chave];

    if (itemValue && /^\{(.*?)\}$/.test(itemValue)) {

        //Decodifica de volta para JSON
        var current = JSON.parse(itemValue);

        return current.value;
    }

    return false;
}

function getSessionStorage(chave)
{
    var itemValue = sessionStorage.getItem(chave);

    if (itemValue && /^\{(.*?)\}$/.test(itemValue)) {

        //Decodifica de volta para JSON
        var current = JSON.parse(itemValue);

        return current;
    }

    return false;
}
