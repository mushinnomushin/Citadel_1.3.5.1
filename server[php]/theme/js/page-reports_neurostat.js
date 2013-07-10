var obj_keys = function(o){
    var keys = [];
    for (var k in o)
        if (o.hasOwnProperty(k))
            keys.push(k);
    return keys;
};

var obj_vals = function(o){
    var keys = [];
    for (var k in o)
        if (o.hasOwnProperty(k))
            keys.push(o[k]);
    return keys;
}

// firstloginstat, timestat
$(function(){
    var sets = {
        chart: {
            renderTo: 'timestat',
            type: 'column',
            height: 250
        },
        title: { text: 'Login time' },
        legend: { enabled: false },
        xAxis: {
            categories: obj_keys(window.data.timestat),
            labels: {
                step: 2,
                rotation: -90,
                align: 'right'
            }
        },
        yAxis: {
            min: 0,
            title: { text: 'Count' }
        },
        tooltip: {
            formatter: function() { return ''+ this.x +': '+ this.y +' logins'; }
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
                     name: 'Logins',
                     data: obj_vals(window.data.timestat)
                 },
                 {
                     name: 'Fist login',
                     data: obj_vals(window.data.firstloginstat)
                 }]
    };

    // firstloginstat
    sets.chart.renderTo = 'firstloginstat';
    sets.title.text = 'First Login time';
    sets.yAxis.title.text = 'Count';
    sets.colors = ['#AA4643'];
    sets.xAxis.categories = obj_keys(window.data.firstloginstat);
    sets.series = [{ data: obj_vals(window.data.firstloginstat) }];
    var chart = new Highcharts.Chart(sets);

    // timestat
    sets.chart.renderTo = 'timestat';
    sets.title.text = 'Login time';
    sets.yAxis.title.text = 'Count';
    sets.colors = ['#4572A7'];
    sets.xAxis.categories = obj_keys(window.data.timestat);
    sets.series = [{ data: obj_vals(window.data.timestat) }];

    var chart = new Highcharts.Chart(sets);
});

// scattertime
$(function(){
    var sets = {
        chart: {
            renderTo: 'scattertime',
            type: 'scatter',
            height: 500,
            zoomType: 'x',
        },
        colors: ['#92A8CD'],
        title: { text: 'Complete login history' },
        legend: { enabled: false },
        xAxis: {
            type: 'datetime',
            maxZoom: 14 * 24 * 3600000, // fourteen days
            labels: {
                step: 1,
                rotation: -45,
                align: 'right'
            }
        },
        yAxis: {
            type: 'datetime',
            dateTimeLabelFormats: { // don't display the dummy year
                month: '',
                year: ''
            },
            title: { text: 'Login time' }
        },
        tooltip: {
            formatter: function() {
                return Highcharts.dateFormat('%e. %b', this.x) +': '+ Highcharts.dateFormat('%H:%I:%S', this.y);
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{ data: (function(data){
            for (var i=0; i<data.length; i++){
                data[i][0] = 1000*data[i][0];
                data[i][1] = 1000*data[i][1]*60;
            }
            return data;
        })(window.data.scattertime) }]
    };
    console.log(sets);
    var chart = new Highcharts.Chart(sets);
});