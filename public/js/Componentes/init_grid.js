function initGrid(idTab) {
    $(`#divTableGrid_${idTab}`).html("");

    let tabela = document.createElement('table')
    tabela.setAttribute('id',`tableGrid_${idTab}`)
    tabela.setAttribute('class','table table-striped table-bordered table-sm nowrap dt-responsive')
    tabela.setAttribute('cellspacing','0')
    tabela.setAttribute('width','100%')
    
    let thead = document.createElement('thead')
    let tr = document.createElement('tr')
    
    let th = document.createElement('th')
    th.textContent = 'Nome'
    tr.append(th)

    th = document.createElement('th')
    th.textContent = 'Cargo'
    tr.append(th)

    th = document.createElement('th')
    th.textContent = 'Escritório'
    tr.append(th)

    th = document.createElement('th')
    th.textContent = 'Ramal'
    tr.append(th)

    th = document.createElement('th')
    th.textContent = 'Data de inicio'
    tr.append(th)

    th = document.createElement('th')
    th.textContent = 'Salário'
    tr.append(th)
    
    thead.append(tr)
    let tbody = document.createElement('tbody')
    tbody.setAttribute('id','tablebody')
    
    tabela.append(thead)
    tabela.append(tbody)

    let array = [
        [ "Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "R$320,800" ],
        [ "Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "R$170,750" ],
        [ "Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "R$86,000" ],
        [ "Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "6224", "2012/03/29", "R$433,060" ],
        [ "Airi Satou", "Accountant", "Tokyo", "5407", "2008/11/28", "R$162,700" ],
        [ "Brielle Williamson", "Integration Specialist", "New York", "4804", "2012/12/02", "R$372,000" ],
        [ "Herrod Chandler", "Sales Assistant", "San Francisco", "9608", "2012/08/06", "R$137,500" ],
        [ "Rhona Davidson", "Integration Specialist", "Tokyo", "6200", "2010/10/14", "R$327,900" ],
        [ "Colleen Hurst", "Javascript Developer", "San Francisco", "2360", "2009/09/15", "R$205,500" ],
        [ "Sonya Frost", "Software Engineer", "Edinburgh", "1667", "2008/12/13", "R$103,600" ],
        [ "Jena Gaines", "Office Manager", "London", "3814", "2008/12/19", "R$90,560" ],
        [ "Quinn Flynn", "Support Lead", "Edinburgh", "9497", "2013/03/03", "R$342,000" ],
        [ "Charde Marshall", "Regional Director", "San Francisco", "6741", "2008/10/16", "R$470,600" ],
        [ "Haley Kennedy", "Senior Marketing Designer", "London", "3597", "2012/12/18", "R$313,500" ],
        [ "Tatyana Fitzpatrick", "Regional Director", "London", "1965", "2010/03/17", "R$385,750" ],
        [ "Michael Silva", "Marketing Designer", "London", "1581", "2012/11/27", "R$198,500" ],
        [ "Paul Byrd", "Chief Financial Officer (CFO)", "New York", "3059", "2010/06/09", "R$725,000" ],
        [ "Gloria Little", "Systems Administrator", "New York", "1721", "2009/04/10", "R$237,500" ],
        [ "Bradley Greer", "Software Engineer", "London", "2558", "2012/10/13", "R$132,000" ],
        [ "Dai Rios", "Personnel Lead", "Edinburgh", "2290", "2012/09/26", "R$217,500" ],
        [ "Jenette Caldwell", "Development Lead", "New York", "1937", "2011/09/03", "R$345,000" ],
        [ "Yuri Berry", "Chief Marketing Officer (CMO)", "New York", "6154", "2009/06/25", "R$675,000" ],
        [ "Caesar Vance", "Pre-Sales Support", "New York", "8330", "2011/12/12", "R$106,450" ],
        [ "Doris Wilder", "Sales Assistant", "Sydney", "3023", "2010/09/20", "R$85,600" ],
        [ "Angelica Ramos", "Chief Executive Officer (CEO)", "London", "5797", "2009/10/09", "R$1,200,000" ],
        [ "Gavin Joyce", "Developer", "Edinburgh", "8822", "2010/12/22", "R$92,575" ],
        [ "Jennifer Chang", "Regional Director", "Singapore", "9239", "2010/11/14", "R$357,650" ],
        [ "Brenden Wagner", "Software Engineer", "San Francisco", "1314", "2011/06/07", "R$206,850" ],
        [ "Fiona Green", "Chief Operating Officer (COO)", "San Francisco", "2947", "2010/03/11", "R$850,000" ],
        [ "Shou Itou", "Regional Marketing", "Tokyo", "8899", "2011/08/14", "R$163,000" ],
        [ "Michelle House", "Integration Specialist", "Sydney", "2769", "2011/06/02", "R$95,400" ],
        [ "Suki Burks", "Developer", "London", "6832", "2009/10/22", "R$114,500" ],
        [ "Prescott Bartlett", "Technical Author", "London", "3606", "2011/05/07", "R$145,000" ],
        [ "Gavin Cortez", "Team Leader", "San Francisco", "2860", "2008/10/26", "R$235,500" ],
        [ "Martena Mccray", "Post-Sales support", "Edinburgh", "8240", "2011/03/09", "R$324,050" ],
        [ "Unity Butler", "Marketing Designer", "San Francisco", "5384", "2009/12/09", "R$85,675" ]
    ];
    
    // let tabela = document.createElement('table');
    // tabela.classList.add('table', 'table-striped', 'table-bordered', 'table-sm');
    // tabela.setAttribute('id', 'tableGrid');
    document.getElementById(`divTableGrid_${idTab}`).appendChild(tabela);

    let table = jQuery(`#tableGrid_${idTab}`).DataTable({
        // "columns": [
        //     { "data": "cod_etapa" },
        //     { "data": "roteiro_op" },
        //     { "data": "saldo" },
        //     { "data": "peso" }
        // ],
        "data": array,
        "keys": false,
        "responsive": true,
        "lengthMenu": [[5, 7, 10, 30, 50, 100], [5, 7, 10, 30, 50, 100]],
    });

    // var table = $('#tableGrid').DataTable({
    //     data: array,
    //     columns: [
    //         { title: "Nome" },
    //         { title: "Posição" },
    //         { title: "Escritório" },
    //         { title: "Ramal" },
    //         { title: "Data de inicio" },
    //         { title: "Salario" }
    //     ],
    //     buttons: [
    //         {
    //         extend: 'print',
    //         autoPrint: false,
    //         },
    //         'copyHtml5',
    //         'excelHtml5',
    //         'csvHtml5',
    //         'pdfHtml5'
    //     ]
    // });
    
    $(`#print_btn_${idTab}`).on("click", function() {
        table.button( '.buttons-print' ).trigger();
    });
    
    $(`#copy_btn_${idTab}`).on("click", function() {
        table.button( '.buttons-copy' ).trigger();
    });
    
    $(`#excel_btn_${idTab}`).on("click", function() {
        table.button( '.buttons-excel' ).trigger();
    });
    
    $(`#csv_btn_${idTab}`).on("click", function() {
        table.button( '.buttons-csv' ).trigger();
    });
    
    $(`#pdf_btn_${idTab}`).on("click", function() {
        table.button( '.buttons-pdf' ).trigger();
    });
}