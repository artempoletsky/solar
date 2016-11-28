$(function () {
    /*var getData = function (code, callback) {
     var api_url = 'https://query.yahooapis.com/v1/public/yql';
     var query = 'select * from yahoo.finance.quotes where symbol in ("' + code + '")';

     $.get(api_url + '?q=' + query + '&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', callback);

     }*/

    var getImageURL = function (code, period) {
        return 'http://chart.finance.yahoo.com/z?s=' + code + '&t=' + period + '&q=l&l=on';
    };
    var $chartView = $('.chart_view').remove();
    var $container = $('.chart_views');


    $container.on('change', function (e) {
        var target = e.target;
        var $view = $(target).parent('chart_view');
        var value = $view.find('.chart_time_value').val();

        var selectValue = $view.find('.chart_time_select').val();
        var $image = $view.find('img');
        $image.attr('src', getImageURL($image.attr('alt'), value + selectValue));
    });

    $container.on('click', function (e) {
        var target = e.target;
        if (target.className == 'chart_remove') {
            $(target).parent('chart_view').remove();
        }
    });


    $('#add_chart_button').on('click', function (e) {

        var code = $('#add_chart_input').val();

        var imageURL = getImageURL(code, '1d');
        $chartView.find('.chart_image').attr('src', imageURL).attr('alt', code);

        $container.append($chartView.clone());
    });
});