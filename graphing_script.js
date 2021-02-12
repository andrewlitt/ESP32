varwebSocket, dataPlot;
varmaxDataPoints = 20;
constmaxValue = 200000000;
constmaxLow = maxValue * 0.5;
constmaxMedium = maxValue * 0.2;
constmaxHigh = maxValue * 0.3;
functioninit() {
    webSocket = newWebSocket('ws://' + window.location.hostname + ':81/');
    dataPlot = newChart(document.getElementById("chart"), {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                data: [],
                label: "Low",
                backgroundColor: "#D6E9C6"
            }, {
                data: [],
                label: "Moderate",
                backgroundColor: "#FAEBCC"
            }, {
                data: [],
                label: "High",
                backgroundColor: "#EBCCD1"
            }, ]
        },
        options: {
            responsive: false,
            animation: false,
            scales: {
                xAxes: [{
                    stacked: true
                }],
                yAxes: [{
                    display: true,
                    stacked: true,
                    ticks: {
                        beginAtZero: true,
                        steps: 1000,
                        stepValue: 500,
                        max: maxValue
                    }
                }]
            }
        }
    });
    webSocket.onmessage = function(event) {
        vardata = JSON.parse(event.data);
        dataPlot.data.labels = [];
        dataPlot.data.datasets[0].data = [];
        dataPlot.data.datasets[1].data = [];
        dataPlot.data.datasets[2].data = [];
        data.forEach(function(element) {
            dataPlot.data.labels.push(element.bin);
            varlowValue = Math.min(maxLow, element.value);
            dataPlot.data.datasets[0].data.push(lowValue);
            varmediumValue = Math.min(Math.max(0, element.value - lowValue), maxMedium);
            dataPlot.data.datasets[1].data.push(mediumValue);
            varhighValue = Math.max(0, element.value - lowValue - mediumValue);
            dataPlot.data.datasets[2].data.push(highValue);
        });
        dataPlot.update();
    }
}