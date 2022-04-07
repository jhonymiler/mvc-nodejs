function initDataRocks(idTab) {
    // setTimeout(() => {
        debugger;
        var pivot = new WebDataRocks({
            container: `#wdr-component_${idTab}`,
            toolbar: true,
            report: {
                dataSource: {
                    data: getData()
                }
                ,reportFilters: [{
                          "uniqueName": "Leads"
                      }, {
                          "uniqueName": "Período"
                      },{
                          "uniqueName": "Investimento em marketing"
                      },{
                          "uniqueName": "Novos clientes"
                      },{
                          "uniqueName": "País do cliente"
                      },{
                          "uniqueName": "Vendas incrementais"
                      },
                ],measures: [
                  {
                      "uniqueName": "Investimento em marketing",
                      "aggregation": "sum"
                  }
                ],
            },
            reportcomplete: function() {
                pivot.off("reportcomplete");
                pivotTableReportComplete = true;
                createGoogleChart();
            }
        });
        var pivotTableReportComplete = false;
    var googleChartsLoaded = false;
    
    google.charts.load('current', {
        'packages': ['corechart']
    });
    google.charts.setOnLoadCallback(onGoogleChartsLoaded);
    
    function onGoogleChartsLoaded() {
        googleChartsLoaded = true;
        if (pivotTableReportComplete) {
            createGoogleChart();
        }
    }
    
    function createGoogleChart() {
        if (googleChartsLoaded) {
            pivot.googlecharts.getData({
                    type: "column"
                },
                drawChart,
                drawChart
            );
        }
    }
    
    function drawChart(_data) {
        var data = google.visualization.arrayToDataTable(_data.data);
    
        var options = {
            title: "Soma das vendas incrementais ao longo dos anos",
            legend: {
                position: 'top'
            },
            is3D: true,
            colors: ['#66ccff', '#e0440e']
        };
    
        var chart = new google.visualization.ColumnChart(document.getElementById(`googlechart-container_${idTab}`));
        chart.draw(data, options);
    }
    
    
    function getData() {
        return [{
                "Período": {
                    "type": "year/quarter/month/day"
                },
                "País do cliente": {
                    "type": "string"
                },
                "Vendas incrementais": {
                    "type": "number"
                },
                "Leads": {
                    "type": "number"
                },
                "Novos clientes": {
                    "type": "number"
                },
                "Investimento em marketing": {
                    "type": "number"
                }
            },
            {
                "Investimento em marketing": 1000,
                "Período": "2018-06-01",
                "País do cliente": "Australia",
                "Vendas incrementais": 980,
                "Leads": 225,
                "Novos clientes": 50
            },
            {
                "Investimento em marketing": 800,
                "Período": "2018-07-01",
                "País do cliente": "Canada",
                "Vendas incrementais": 5020,
                "Leads": 90,
                "Novos clientes": 78
            },
            {
                "Investimento em marketing": 460,
                "Período": "2018-08-01",
                "País do cliente": "France",
                "Vendas incrementais": 2070,
                "Leads": 134,
                "Novos clientes": 37
            },
            {
                "Investimento em marketing": 520,
                "Período": "2017-01-01",
                "País do cliente": "Germany",
                "Vendas incrementais": 340,
                "Leads": 120,
                "Novos clientes": 70
            },
            {
                "Investimento em marketing": 520,
                "Período": "2017-02-01",
                "País do cliente": "Germany",
                "Vendas incrementais": 780,
                "Leads": 230,
                "Novos clientes": 60
            },
            {
                "Investimento em marketing": 520,
                "Período": "2017-03-01",
                "País do cliente": "Germany",
                "Vendas incrementais": 1220,
                "Leads": 200,
                "Novos clientes": 40
            },
            {
                "Investimento em marketing": 520,
                "Período": "2017-04-01",
                "País do cliente": "Germany",
                "Vendas incrementais": 1510,
                "Leads": 270,
                "Novos clientes": 30
            },
            {
                "Investimento em marketing": 520,
                "Período": "2017-05-01",
                "País do cliente": "Germany",
                "Vendas incrementais": 2060,
                "Leads": 200,
                "Novos clientes": 70
            },
            {
                "Investimento em marketing": 670,
                "Período": "2017-06-01",
                "País do cliente": "United Kingdom",
                "Vendas incrementais": 126,
                "Leads": 115,
                "Novos clientes": 30
            },
            {
                "Investimento em marketing": 550,
                "Período": "2017-07-01",
                "País do cliente": "United States",
                "Vendas incrementais": 1246,
                "Leads": 88,
                "Novos clientes": 38
            },
            {
                "Investimento em marketing": 1150,
                "Período": "2017-08-01",
                "País do cliente": "Australia",
                "Vendas incrementais": 680,
                "Leads": 56,
                "Novos clientes": 70
            },
            {
                "Investimento em marketing": 980,
                "Período": "2017-09-01",
                "País do cliente": "Canada",
                "Vendas incrementais": 1241,
                "Leads": 50,
                "Novos clientes": 60
            },
            {
                "Investimento em marketing": 500,
                "Período": "2017-10-01",
                "País do cliente": "Canada",
                "Vendas incrementais": 1241,
                "Leads": 219,
                "Novos clientes": 40
            },
            {
                "Investimento em marketing": 2458,
                "Período": "2017-11-01",
                "País do cliente": "France",
                "Vendas incrementais": 1300,
                "Leads": 67,
                "Novos clientes": 30
            },
            {
                "Investimento em marketing": 1400,
                "Período": "2017-12-01",
                "País do cliente": "Germany",
                "Vendas incrementais": 780,
                "Leads": 343,
                "Novos clientes": 22
            },
            {
                "Investimento em marketing": 700,
                "Período": "2018-01-01",
                "País do cliente": "Canada",
                "Vendas incrementais": 501,
                "Leads": 90,
                "Novos clientes": 9
            },
            {
                "Investimento em marketing": 800,
                "Período": "2018-02-01",
                "País do cliente": "Canada",
                "Vendas incrementais": 501,
                "Leads": 159,
                "Novos clientes": 9
            },
            {
                "Investimento em marketing": 900,
                "Período": "2018-03-01",
                "País do cliente": "Canada",
                "Vendas incrementais": 501,
                "Leads": 123,
                "Novos clientes": 9
            },
            {
                "Investimento em marketing": 400,
                "Período": "2018-04-01",
                "País do cliente": "Canada",
                "Vendas incrementais": 279,
                "Leads": 216,
                "Novos clientes": 9
            }
        ]
    }
    // }, 200);
    webdatarocks.on('reportchange', function() {
        var cuboJson = pivot.getReport();
        localStorage.setItem('estadoCubo', JSON.stringify(cuboJson));
    });
    
    var estadoAtual = localStorage.getItem('estadoCubo');
    if (estadoAtual != undefined) {
        pivot.setReport(JSON.parse(estadoAtual));
    }
    
}