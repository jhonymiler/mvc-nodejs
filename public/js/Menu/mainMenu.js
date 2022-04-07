$(document).ready(function(){
  nthTabs = $("#example").nthTabs();
    // https://www.jqueryscript.net/other/dynamic-tabs-creation-bootstrap-nth.html
    $(".openTab").on("click", function () {      
        var id = this.id;
        if (document.getElementById(`nth-tab-${id}`) != null) {
          nthTabs.setActTab(`#nth-tab-${id}`) ;
        }else{
          var titulo = $(`#${id} .menu-title`).text();
          // var id = Math.ceil(Math.random() * 1000);
          nthTabs.addTab({
              id: "nth-tab-" + id,
              title: titulo,
              content: criaTab(id),
              active: true,
              allowClose: true,
              location: true,
              fadeIn: true,
          })

          // $(`#nth-tab-${id} .nth-tabs-content`).load( "../pages/estrutura_tab.html");

          $(`#btnConsultar_${id}`).on("click", function () {
            initGrid(id);
          });

          $(`#query_selector_${id}`).select2();
          $(`#query_selector_${id}`).on("change", function () {
            console.log(this.value); 
          });
        }
  });
});

// Função para controlar tamanho das fontes da página através dos botões no header //
var $btnAumentar = $("#btnAumentar");
var $btnReset = $("#btnReset");
var $btnDiminuir = $("#btnDiminuir");
var $elemento = $("body").find("*");
var fonts = [];
var reset = [];

(function obterTamanhoFonte() {
  for (var i = 0; i < $elemento.length; i++) {
    fonts.push(parseFloat($elemento.eq(i).css('font-size')));
    reset.push(parseFloat($elemento.eq(i).css('font-size')));
  }
})()

$btnAumentar.on('click', function() {
  for (var i = 0; i < $elemento.length; i++) {
    ++fonts[i];
    $elemento.eq(i).css('font-size', fonts[i]);
  }
});

$btnDiminuir.on('click', function() {
  for (var i = 0; i < $elemento.length; i++) {
    --fonts[i];
    $elemento.eq(i).css('font-size', fonts[i]);
  }
});

$btnReset.on('click', function() {
  for (var i = 0; i < $elemento.length; i++) {
    $elemento.eq(i).css('font-size', reset[i]);
    fonts[i] = reset[i];
  }
});
///////////////////////////////////////////////////////////////////////////////////////////