function criaTab(idTab) {
  return `<header class="toolbar" >
    <div class="btn-group">
        <select id="query_selector_${idTab}" class="btn btn-primary">
            <!-- <option value="">Selecione uma consulta</option> -->
            <option value="Padrão">Padrão</option>
            <option value="Todos usuários">Todos usuários</option>
            <option value="Somente > 1000">Somente > 1000</option>
        </select>
    </div>
    <button data-bs-toggle="modal" data-bs-target="#consultasModal" class="btn btn-sm btn-primary">Editar consultas</button>
    <button id="btnConsultar_${idTab}" class="btn btn-sm btn-primary">Consultar <i class="fa fa-search"></i></button>
    <!-- <div class="btn-group">
        <button type="button" class="btn btn-sm btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Funções
        </button>
        <div class="dropdown-menu">
            <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#editorModal">Editar</a>
            <a onclick="salvar()" class="dropdown-item" href="#">Salvar</a>
            <a class="dropdown-item" href="#">Salvar como</a>
            <a class="dropdown-item" href="#">Filtro</a>
            <a class="dropdown-item" href="#">Excluir</a>
        </div>
    </div> -->
    <div class="btn-group">
        <button type="button" class="btn btn-sm btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Exportar
        </button>
        <div class="dropdown-menu">
            <a id="copy_btn_${idTab}" class="dropdown-item" href="#">Copiar</a>
            <a id="excel_btn_${idTab}" class="dropdown-item" href="#">Excel</a>
            <a id="csv_btn_${idTab}" class="dropdown-item" href="#">CSV</a>
            <a id="pdf_btn_${idTab}" class="dropdown-item" href="#">PDF</a>
        </div>
    </div>
    <!-- <button class="btm-sm btn-primary">Preview <i class="fa fa-eye"></i></button> -->
    <button id="print_btn_${idTab}" class="btn-sm btn-primary">Imprimir <i class="fa fa-print"></i></button>

    
</header>
<ul class="nav nav-pills mb-3 justify-content-end" id="pills-tab" role="tablist">
    <li class="nav-item" role="presentation">
      <button class="nav-link btn-sm active" id="pills-grid-tab" data-bs-toggle="pill" data-bs-target="#pills-grid" type="button" role="tab" aria-controls="pills-grid" aria-selected="true">Grid</button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link btn-sm" onclick="initDataRocks('${idTab}')" id="pills-cubo-tab" data-bs-toggle="pill" data-bs-target="#pills-cubo" type="button" role="tab" aria-controls="pills-cubo" aria-selected="false">Cubo</button>
    </li>
</ul>
<div class="tab-content" id="pills-tabContent">
    <div class="tab-pane fade active show" id="pills-grid" role="tabpanel" aria-labelledby="pills-grid-tab">        
        <!-- <table id="tableGrid" class="table table-sm table-striped table-bordered"></table> -->
        <div id="divTableGrid_${idTab}"></div>
    </div>
    <div class="tab-pane fade" id="pills-cubo" role="tabpanel" aria-labelledby="pills-cubo-tab">
        <div id="wdr-component_${idTab}"></div>
        <div id="googlechart-container_${idTab}" style="height:550px;"></div>
    </div>
</div>`
}