var snackbar = null;
function showSnackbar(text) {
    if (snackbar === null) {
        $(document.body).append('<div style="position: fixed; top: 100%" id="snackbar">' + text + '<button id="snackbarButton" onclick="closeSnackbar()">Close</button></div>');
        Waves.attach('#snackbarButton');
        snackbar = $('#snackbar');
        $('#snackbar').transition({ y: '-64px' }, 300, 'easeInOutCubic');
    }
    else {
        $('#snackbar').transition({ y: '64px' }, 300, 'easeInOutCubic', function () {
            $(this).remove();
            $(document.body).append('<div style="position: fixed; top: 100%" class="shadow-3" id="snackbar">' + text + '<button id="snackbarButton" onclick="closeSnackbar()">Close</button></div>');
            Waves.attach('#snackbarButton');
            snackbar = $('#snackbar');
            $('#snackbar').transition({ y: '-64px' }, 300, 'easeInOutCubic');
        });
    }
}
function closeSnackbar() {
    if (snackbar !== null) {
        $('#snackbar').transition({ y: '64px' }, 300, 'easeInOutCubic', function () {
            $(this).remove();
            snackbar = null;
        });
    }
}
//# sourceMappingURL=Snackbar.js.map