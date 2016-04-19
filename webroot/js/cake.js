/**
 * Created by adali on 11/16/2015.
 */

/* simulates async login activity */
var doLogin = function (ms, cb) {
    setTimeout(function () {
        if (typeof cb == 'function')
            cb();
    }, ms);
};

$('#btnLogin').click(function () {
    var btn = $(this);
    btn.button("loading");

    // perform login / async callback here

    doLogin(3000, function () {
        btn.button("reset"); // reset button after login callback returns
    });


});
