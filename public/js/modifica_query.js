var editor;
$(".btn-modifica-query").on('click', function () {
    let apelido = this.parentNode.parentNode.firstElementChild.textContent;
    let query = this.parentNode.parentNode.firstElementChild.nextElementSibling.textContent;
    $("#editorModal").modal("show"); 
    $("#queryName").val(apelido);
    require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.26.1/min/vs' }});
    require(["vs/editor/editor.main"], () => {
        editor = monaco.editor.create(document.getElementById('testeQuery'), {
        value: query,
        language: 'sql',
        theme: 'vs-dark',
        });
    });
    $("#salvaQuery").on("click", function () {
        var dados = {
          apelido_consulta: $("#queryName").val(),
          consulta: window.editor.getValue()
        }
        debugger;
        webservice("POST", "ConsultaCustomizada", "insert", dados, function(retorno){
          debugger;
          if (retorno.status) {
              $("#editorModal").modal("hide");
          }
        });
      });
});



$("#newQuery").on('click', function () {
    $("#editorModal").modal("show"); 
    $("#queryName").val('');
    // require is provided by loader.min.js.
    require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.26.1/min/vs' }});
    require(["vs/editor/editor.main"], () => {
        editor = monaco.editor.create(document.getElementById('testeQuery'), {
        language: 'sql',
        theme: 'vs-dark',
        });
    });
});

$("#salvaQuery").on("click", function () {
    debugger;
    var dados = {
      apelido_consulta: $("#queryName").val(),
      query: editor.getValue()
    }
    webservice("POST", "ConsultaCustomizada", "insert", dados, function(retorno){
      if (retorno.status) {
          $("#editorModal").modal("hide");
      }
    });
});