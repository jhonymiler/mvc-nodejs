let g_switchery = [];
let g_checkOne = [];

jQuery(document).ready(function(){
    initFunction();
    // ----------------------------------------------------- //

    if(jQuery(".modal").length)
    {
        jQuery('.modal').on({
            'show.bs.modal': function() {
                var idx = jQuery('.modal:visible').length;
                jQuery(this).css('z-index', 1040 + (10 * idx));
                var url = jQuery(this).find('[data-url]').data('url');
                if (url != undefined && url != '') {
                    var id = jQuery(this).attr('id');
                    jQuery('#'+id+' .modal-body').load(url);
                }
            },
            'shown.bs.modal': function() {
                var idx = (jQuery('.modal:visible').length) - 1; // elevar o pano de fundo após a animação.
                jQuery('.modal-backdrop').not('.stacked')
                .css('z-index', 1039 + (10 * idx))
                .addClass('stacked');
            },
            'hidden.bs.modal': function() {
                if (jQuery('.modal:visible').length > 0) {
                    // restaure a classe modal-open para o elemento body, para que a rolagem funcione
                    // corretamente após desempilhar um modal.
                    setTimeout(function() {
                        jQuery(document.body).addClass('modal-open');
                    }, 0);
                }
            }
        });
    }
});

function webservice(metodo, controller, funcao, dados, callBackFunction = null, showLoading = true) {
    var user = getLocalStorage("userUID");
    var urlParam = window.location.search;
    var urlParam = (urlParam.length == 0) ? `?token=${user.Chave}` : urlParam += `&token=${user.Chave}`;

    var jsonData = JSON.stringify(jQuery.extend({}, dados));
    console.log(jsonData);
    var url = "/backend/" + controller + "/" + funcao + urlParam;
    var _retorno = { status: false, msg: "", erro: "Não foi possivel consultar o webservice. Tente novamente mais tarde!" };

    jQuery.ajax({
            type: metodo,
            dataType: "json",
            data: jsonData,
            url: url,
            async: true,
            contentType: "application/json; charset=utf-8",
            beforeSend: function() {
                if (showLoading) {
                    CustomLoading();
                }
            }
        })
        .done(function(Retorno) {
            _retorno = Retorno;
        })

    .fail(function(Retorno) {

    })

    .always(function(Retorno) {
        if (showLoading) {
            CustomUnloading();
        }
        if (callBackFunction != null) {
            callBackFunction(Retorno);
        }

    });
    return _retorno;
}

function CustomLoading() {
    jQuery('body').prepend('<div class="CustomLoading">' +
        '</div>' +
        '<div class="CustomLoading2">' +
        '	<div class="CustomLoading22">' +
        '   	<div class="ball"></div>' +
        '   	<div class="ball1"></div>' +
        '   	<div class="CustomTexto">Aguarde um instante...<br>Estamos processando sua solicitação</div>' +
        '	</div>' +
        '</div>');
}

function CustomUnloading() {
    jQuery('.ball').remove();
    jQuery('.ball1').remove();
    jQuery('.CustomTexto').remove();
    jQuery('.CustomLoading2').remove();
    jQuery('.CustomLoading').remove();
}

function ValidAuth(doc){
	var params = getUrlParametro();
	
    var d = getLocalStorage('userUID');
	if (d.Session == undefined){
        if(jQuery("#page").val() != "login"){            
            doc.css("display", "none");
            IrPara("/frontend/index.html");
        }
	} else {
        if(jQuery("#page").val() == "login"){            
            IrPara("/frontend/pages/index.html");
        }
        else{
            doc.css("display", "block");
        }
	}
}

//Captura dados da URL
function getUrlParametro() {
    var prmstr = window.location.search.substr(1);
    return prmstr != null && prmstr != "" ? transformeArray(prmstr) : {};
}

//Trasforma dados em array
function transformeArray(prmstr) {
    var params = {};
    var prmarr = prmstr.split("&");
    for (var i = 0; i < prmarr.length; i++) {
        var tmparr = prmarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }
    return params;
}

function IrPara(page) {
    window.location.replace(page);
}

function montaMenu(menu) {
    let nav_ul = document.createElement('ul');
    nav_ul.classList.add('nav', 'navbar-nav');

    for (let i = 0; i < menu.length; i++) {
        var texto = menu[i].texto;
        var id = menu[i].id;
        var classe = menu[i].classe;
        var icone = menu[i].icone;
        var link = menu[i].link;

        let li_menu = document.createElement('li');
        let i_menu = document.createElement('i');
        let a_menu = document.createElement('a');

        if (menu[i].filho.length > 0) {
            li_menu = document.createElement('li');
            li_menu.classList.add('menu-item-has-children', 'dropdown');

            i_menu = document.createElement('i');
            i_menu.classList.add('menu-icon', icone.split(' ')[0], icone.split(' ')[1]);

            a_menu = document.createElement('a');
            a_menu.href = link;
            a_menu.classList.add('dropdown-toggle');
            a_menu.setAttribute('data-toggle', 'dropdown');
            a_menu.setAttribute('aria-haspopup', 'true');
            a_menu.setAttribute('aria-expanded', 'false');
            a_menu.setAttribute('id', id);

            a_menu.appendChild(i_menu);
            a_menu.appendChild(document.createTextNode(texto));

            let ul_menu_filho = document.createElement('ul');
            ul_menu_filho.classList.add('sub-menu', 'children', 'dropdown-menu');

            for (let j = 0; j < menu[i].filho.length; j++) {
                var filho_texto = menu[i].filho[j].texto;
                var filho_id = menu[i].filho[j].id;
                var filho_classe = menu[i].filho[j].classe;
                var filho_icone = menu[i].filho[j].icone;
                var filho_link = menu[i].filho[j].link;

                let li_menu_filho = document.createElement('li');

                let i_menu_filho = document.createElement('i');
                i_menu_filho.classList.add('menu-icon', filho_icone.split(' ')[0], filho_icone.split(' ')[1]);

                let a_menu_filho = document.createElement('a');
                a_menu_filho.classList.add(filho_classe);
                a_menu_filho.setAttribute('id', filho_id);
                a_menu_filho.href = filho_link;

                a_menu_filho.appendChild(document.createTextNode(filho_texto));

                li_menu_filho.appendChild(i_menu_filho);
                li_menu_filho.appendChild(a_menu_filho);

                ul_menu_filho.appendChild(li_menu_filho);
            }

            li_menu.appendChild(a_menu);
            li_menu.appendChild(ul_menu_filho);
        } else {
            li_menu = document.createElement('li');
            li_menu.classList.add('active');

            i_menu = document.createElement('i');
            i_menu.classList.add('menu-icon', icone.split(' ')[0], icone.split(' ')[1]);

            a_menu = document.createElement('a');
            a_menu.href = link;
            a_menu.setAttribute('id', id);

            a_menu.appendChild(i_menu);
            a_menu.appendChild(document.createTextNode(texto));

            li_menu.appendChild(a_menu);
        }

        nav_ul.appendChild(li_menu);
    }
    document.getElementById('main-menu').appendChild(nav_ul);
}

function criaTabela(idTable, theadArray) {
    let table = document.createElement('table');
    table.classList.add('table', 'table-striped', 'table-bordered', 'table-sm');
    table.setAttribute('id', idTable);

    let thead = document.createElement('thead');
    let trthead = document.createElement('tr');
    jQuery.each(theadArray, function(i, val) {
        let th = document.createElement('th');
        th.appendChild(document.createTextNode(val));

        trthead.appendChild(th);
    });

    thead.appendChild(trthead);
    table.appendChild(thead);

    return table
}

function initDataTable(table, objDataTable) {
    objDataTable = objDataTable || {
                                        "keys": false,
                                        "responsive": true,
                                        "lengthMenu": [
                                            [5, 7, 15, 30, 50, 100],
                                            [5, 7, 15, 30, 50, 100]
                                        ],
                                        "pageLength": 7,
                                        "language": {
                                            "lengthMenu": "Exibir _MENU_ registros por página",
                                            "zeroRecords": "Não a dados a serem exibidos.",
                                            "info": "Exibindo página _PAGE_ de _PAGES_",
                                            "infoEmpty": "Nenhum registro disponível",
                                            "infoFiltered": "(filtrado de _MAX_ registros)",
                                            "paginate": {
                                                "previous": "<",
                                                "next": ">"
                                            },
                                            "search": "Filtrar :"
                                        },
                                    }

    return jQuery(table).DataTable(objDataTable);
}

function Notificar(msg = "") {
    jQuery.dialog({
        title: 'Notificação',
        content: msg,
        type: 'orange',
        typeAnimated: true,
    });
}

function NotificarAlerta(texto, tipoMsg){
    var _tipoMsg = tipoMsg || 'info';

    switch(_tipoMsg){
        case 'notice':
            PNotify.notice({
                title: 'Notificação',
                text: texto,
                delay: 3000
            });
        break;

        case 'info':
            PNotify.info({
                title: 'Notificação',
                text: texto,
                delay: 3000
            });
        break;

        case 'success':
            PNotify.success({
                title: 'Notificação',
                text: texto,
                delay: 3000
            });
        break;
    }
}

function confirmInativar(dados, callback, titulo = "Ativar / Inativar", msg = "Deseja continuar com a solicitação ?", evt = null) {
    jQuery.confirm({
        title: titulo,
        content: msg,
        closeIcon: false,
        type: 'orange',
        typeAnimated: true,
        draggable: false,

        buttons: {
            formSubmit: {
                text: 'Confirmar',
                btnClass: 'btn-primary',
                action: function() {
                    callback(dados, evt);
                }
            },
            cancelar: function() {
                //close
            }
        },

        onContentReady: function() {
            // bind to events
            var jc = this;
            this.$content.find('form').on('submit', function(e) {
                // if the user submits the form by pressing enter in the field.
                e.preventDefault();
                jc.$$formSubmit.trigger('click'); // reference the button and click it
            });
        },
        onOpenBefore: function() {},
        onOpen: function() {},
        onClose: function() {},
        onDestroy: function() {},
        onAction: function() {}
    });
}


function tableRemove(idTable) {
    var tableDestroy = jQuery('#' + idTable).DataTable();
    if (tableDestroy != undefined) {
        tableDestroy.destroy();
        jQuery("#" + idTable).remove();
    }
}

function add_script() {

    var str;
    switch(jQuery("#page").val()){
        case "menu":
            str = '../';
        break;

        case 'login':
            str = '';
        break;

        default:
            str = '../../';
        break;
    }

    var arr = [];
    arr.push(
        `${str}js/localStorage.js`,
        // str + "js/mainTabs.js",
        `${str}js/Tabs/nth-tabs.js`,
        `${str}bibliotecas/DataTables/datatables.js`,
        `${str}bibliotecas/webdatarocks-1.4.4/webdatarocks.toolbar.min.js`,
        `${str}bibliotecas/webdatarocks-1.4.4/webdatarocks.js`,
        `${str}bibliotecas/webdatarocks-1.4.4/webdatarocks.googlecharts.js`,
        `https://www.gstatic.com/charts/loader.js`,
        `${str}bibliotecas/pnotify/node_modules/@pnotify/core/dist/PNotify.js`,
        `${str}js/modifica_query.js`,
        `${str}bibliotecas/select2/dist/js/select2.min.js`,
        `${str}js/Componentes/init_data_rocks.js`,
        `${str}js/Componentes/init_grid.js`,
        `${str}bibliotecas/monaco_editor/loader.js`,
        `${str}js/criaTabs.js`
        ); 

    for (let i = 0; i < arr.length; i++) {
        var link = arr[i];
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = link;

        jQuery("body").append(s);
    }
}

function add_link() {
    var str = '';
    switch(jQuery("#page").val()){
        case "menu": 
            str = '../';
        break;
        case 'login':
            str = '';
        break;
        default:
            str = '../../';
        break;
    }

    var arr = [];
    arr.push(
            "https://use.fontawesome.com/releases/v5.3.1/css/all.css",
            "https://cdnjs.cloudflare.com/ajax/libs/jquery.scrollbar/0.2.11/jquery.scrollbar.min.css",
            `${str}css/tabs/nth-tabs.css`,
            `${str}css/tabs/nth-icons.css`,
            `${str}bibliotecas/DataTables/datatables.min.css`,
            `${str}bibliotecas/webdatarocks-1.4.4/theme/stripedblue/webdatarocks.min.css`,
            `${str}bibliotecas/select2/dist/css/select2.css`,
            `${str}bibliotecas/monaco_editor/editor.main.min.css`
        );
    for (let j = 0; j < arr.length; j++) {
        var link = arr[j];
        var s = document.createElement("link");
        s.rel = "stylesheet";
        s.href = link;

        jQuery("head").append(s);
    }
}

function getObjectForm($form, metodo) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    var getCodigo = 'S';
    if (metodo == "POST") {
        getCodigo = 'N';
    }

    jQuery.map(unindexed_array, function(n, i) {

        switch (getCodigo) {
            case 'S':
                indexed_array[n['name']] = n['value'];
                break;
            case 'N':
                if (!strContem(n['name'], 'cod')) {
                    indexed_array[n['name']] = n['value'];
                }
                break;
        }
    });

    return indexed_array;
}

function replaceStr(str) {
    // FUNCAO PARA REMOVER . - /
    str = str.replace(/\.|\-|\//g, '');
    return str;
}

// FUNCOES DE INICIALIZAÇÃO
function initFunction(evt) {
    add_link();
    add_script();

    ValidAuth($("body"));
    
    // var menu = getLocalStorage('menuUID');
    // montaMenu(menu);
}

function initMultiSwitch(idorclass, utilizaClass, objStyle){

    // https://abpetkov.github.io/switchery/
    var _idOrClass = idorclass || 'js-switch';
    var _utilizaClass = utilizaClass || true;
    var _objStyle = objStyle || {
                                    color              : '#64bd63'
                                    ,secondaryColor    : '#dfdfdf'
                                    ,jackColor         : '#fff'
                                    ,jackSecondaryColor: null
                                    ,className         : 'switchery'
                                    ,disabled          : false
                                    ,disabledOpacity   : 0.5
                                    ,speed             : '0.1s'
                                    ,size              : 'small' 
                                }

    Object.defineProperties(this, {
        "idorclass" : {
            get : function(){ return _idOrClass },
            set : function(value){ _idOrClass = value }
        },

        "utilizaClass" : {
            get : function(){ return _utilizaClass },
            set : function(value){ _utilizaClass = value }
        },

        "objStyle" : {
            get : function(){ return _objStyle },
            set : function(value){ _objStyle = value }
        },
    });

    this.InitSwitchery = function() {
        if(this.utilizaClass){
            var obj = this.objStyle;
            var classeSwitch = this.idorclass;
            var elems = Array.prototype.slice.call(document.querySelectorAll(`.${classeSwitch}`));
            elems.forEach(function(html) {
                g_switchery[html.id] = new Switchery(html, obj);
            });
        }
        else{
            g_switchery[this.idorclass] = new Switchery(jQuery(`#${this.idorclass}`)[0], this.objStyle);
        }
    }
}

function toggleSwitchery(id)
{
    var s = g_switchery[id];
    s.setPosition(true);
   // s.handleOnchange(true);
}


// MASCARA DE TEXTO
function maskCelular(v) {
    v = v.replace(/\D/g, "") //Remove tudo o que não é dígito
    v = v.replace(/^(\d\d)(\d)/g, "($1) $2") //Coloca parênteses em volta dos dois primeiros dígitos
    v = v.replace(/(\d{5})(\d)/, "$1-$2") //Coloca hífen entre o quarto e o quinto dígitos
    return v
}

function maskTelefone(v) {
    v = v.replace(/\D/g, "") //Remove tudo o que não é dígito
    v = v.replace(/^(\d\d)(\d)/g, "($1) $2") //Coloca parênteses em volta dos dois primeiros dígitos
    v = v.replace(/(\d{4})(\d)/, "$1-$2") //Coloca hífen entre o quarto e o quinto dígitos
    return v
}

function maskCpf(v) {
    v = v.replace(/\D/g, "") //Remove tudo o que não é dígito
    v = v.replace(/(\d{3})(\d)/, "$1.$2") //Coloca um ponto entre o terceiro e o quarto dígitos
    v = v.replace(/(\d{3})(\d)/, "$1.$2") //Coloca um ponto entre o terceiro e o quarto dígitos
        //de novo (para o segundo bloco de números)
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2") //Coloca um hífen entre o terceiro e o quarto dígitos
    return v
}

function strContem(str = null, strIntervalo = null) {
    let status;
    if ((str != null && str != "") && (strIntervalo != null && strIntervalo != "")) {
        if (str.indexOf(strIntervalo) !== -1) {
            status = true;
        } else {
            status = false;
        }
    } else {
        Notificar("Não foi possivel efetuar a validação solicitada.");
        status = false;
    }

    return status;
}

function addZeroes(num, len) {
    var numberWithZeroes = String(num);
    var counter = numberWithZeroes.length;
    while(counter < len) {
        numberWithZeroes = "0" + numberWithZeroes;
        counter++;
    }
    return numberWithZeroes;
}

function initModalDinamico(idModal = 'modalid', idBody = 'modalbodyid', title = '') {

    jQuery( `<div class="modal fade" id="${idModal}" tabindex="-1" role="dialog">`+
            `  <div class="modal-dialog modal-xxl" role="document">`+
            `    <div class="modal-content">`+
            `      <div class="modal-header">`+
            `        <h5 class="modal-title">${title}</h5>`+
            `        <button type="button" class="close" data-dismiss="modal" aria-label="Close">`+
            `          <span aria-hidden="true">&times;</span>`+
            `        </button>`+
            `      </div>`+
            `      <div class="modal-body" id="${idBody}">`+
            `         <div id="_dados${idModal}" class="card-body" style="overflow-y: scroll; height: 350px;">`+

            `         </div>`+
            `      </div>`+
            `      <div class="modal-footer">`+
            `        <button type="button" class="btn btn-primary" id="${idModal}_btn_salvar">Salvar</button>`+
            `        <button type="button" class="btn btn-secondary" data-dismiss="modal" id="${idModal}_btn_cancelar">Cancelar</button>`+
            `      </div>`+
            `    </div>`+
            `  </div>`+
            `</div>`).insertAfter('#right-panel');    
    initModalMove();
}
// ------------------------------------------------------------------------------------ //

// ---------------- FUNÇÃO PARA PODER EFETUAR O MOVER DO MODAL EM TELA --------------- //
function initModalMove() {
    jQuery('.modal-dialog').draggable({
        handle: ".modal-header"
    });
}

function openModal(idModal)
{
    jQuery(`#${idModal}`).modal('show');
}

function closeModal(idModal)
{
    jQuery(`#${idModal}`).modal('hide');
}

function DelRow(datatable_id,objeto)
{
	var datatable = jQuery('#'+datatable_id).DataTable();
	var row = jQuery(objeto).parent().parent(); //pega o objeto <tr> através do button
	var rowid = row[0].rowIndex-1 //row[0].rowIndex é o index da <tr> (-1 pois o datatable inicia em zero e o rowIndex inicia em 1)

	datatable.row(row[0].rowIndex-1).remove().draw( false );
}

function AddRow(datatable_id, disableInput = '')
{	
    debugger
	var datatable = jQuery('#'+datatable_id).DataTable();
    let line = datatable.rows().count();

	var nextid = 0;
	var addrowobj = "";

    if(disableInput == 'S'){
        disableInput = 'readonly="true"'
    }

	for (var i = 0; i < line; i++) 
	{
		var alias = "";
		switch(datatable_id)
		{
			case "_tableParametros": 
				alias = "#_nom_parametro" + i;
				addrowobj = "#addlinetableparametro";
			break;
		}

		if (jQuery(alias).length > 0) 
		{
			nextid++;
		}
		else
		{
			break;
		}
	}

    idAddRow = nextid;
	switch(datatable_id)
	{
		case "_tableParametros":
			datatable.row.add([
				`<input id="_nom_parametro${nextid}" name="nom_parametro${nextid}" type="text" class="form-control form-control-sm parametro" autocomplete="false" ${disableInput} />`,
				`<input id="_valor_parametro${nextid}" name="valor_parametro${nextid}" type="text" class="form-control form-control-sm parametro" autocomplete="false" oninput="let p=this.selectionStart;this.value=this.value.toUpperCase();this.setSelectionRange(p, p);" />`,
				`<a id="deltag${nextid}" onclick="DelRow(\'_tableParametros\',this)" class="btn btn-danger btn-sm" title="Remover esta linha"><span class="fa fa-minus text-white"></span></a>`
				]).draw(false);
		break;

		default:

		break;
	}
	datatable.draw(false);
}

function verificaValorExistente(ArrObj, id) {
    let index = ArrObj.findIndex(val => val.Valor == id);
    if(index < 0) {
        return false;
    } else {
        return true 
    }
}

function getRandomIntInclusive(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function atualizaParamURL(url){
    window.history.pushState("", "", url);
}

function convertToCurrency(value) {
    return value.toLocaleString("pt-BR", {
        //style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2
    });
}

function objParse(obj){
    if (typeof obj === 'string') {
        obj = JSON.parse(obj);
    }

    return obj;
}

function newIndice(id){
    var nextid = 0
    while(true)
    {
        if(jQuery(`#${id}${nextid}`).length > 0) 
        {
            nextid++;
        }
        else
        {
            break;
        }
    }

    return nextid;
}

function ehPositivo(numero){
    if(numero < 0) {
        return 0;
    } 
    else{
        return 1;
    }
}

function ajusteDecimais(num, casas) {
    const og = Math.pow(10, casas);
    return Math.floor(num * og) / og;
}

function ajusteFloat(num){
    return Math.round(num * 100) / 100;
}

function setSelectionText(evt){
    evt.setSelectionRange(0, evt.value.length);
}

function adicionaOuRemoveArrObj(key, value) {
    let index = g_checkOne.findIndex(val => val.Valor == value);
    if(index < 0) {
        g_checkOne.push({Param: key, Valor: value});
    } else {
        g_checkOne.splice(index, 1);
    }
}
