$(window).load(function () {

    jQuery(function () {
        jQuery('#start').datetimepicker(
            {format: 'YYYY-MM-DD'}
        );
        jQuery('#end').datetimepicker(
            {format: 'YYYY-MM-DD'}
        );
        jQuery("#start").on("dp.change", function (e) {
            jQuery('#end').data("DateTimePicker").setMinDate(e.date);
        });
        jQuery("#end").on("dp.change", function (e) {
            jQuery('#start').data("DateTimePicker").setMaxDate(e.date);
        });

        $("#end").change(function () {
            diffDate();
        });

        $("#start").change(function () {
            diffDate();
        });
    });
    function diffDate() {
        var start = new Date($("#start").find("input").val());
        var end = new Date($("#end").find("input").val());
        if (start == "Invalid Date" || end == "Invalid Date") {
            $("#different").val("");
        }
        else {
            var days = (end - start) / (1000 * 60 * 60 * 24);
            $("#different").val(days + 1);
        }
    }
    diffDate();
});
