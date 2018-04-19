class Theme {
    primaryDark = "#00796B";
    primary = "#009688";
    accent = "#FF5722";

    background = "#EEE";
    backgroundDark = "#E0E0E0";
    card = "#FFF";

    textPrimary = "rgba(0,0,0, .87)";
    textSecondary = "rgba(0,0,0, .54)";
    textDisabled = "rgba(0,0,0, .38)";

    textPrimaryBlack = "rgba(0,0,0, .87)";
    textSecondaryBlack = "rgba(0,0,0, .54)";
    textDisabledBlack = "rgba(0,0,0, .38)";

    textPrimaryWhite = "rgba(255,255,255, 1)";
    textSecondaryWhite = "rgba(255,255,255, .7)";
    textDisabledWhite = "rgba(255,255,255, .5)";
}

function updateThemePanel() {
    $('#theme-Primary').val(theme.primary.replace("#", ""));
    $('#theme-PrimaryDark').val(theme.primaryDark.replace("#", ""));
    $('#theme-Accent').val(theme.accent.replace("#", ""));
    $('#theme-Theme').val(theme.background.includes('EEE') ? "light" : "dark");
}

function setThemeBindings() {
    $('#theme-Theme').on('change', function () {
        if ((this as HTMLInputElement).value === 'light') {
            theme.background = "#EEE";
            theme.backgroundDark = "#E0E0E0";
            theme.card = "#FFF";

            theme.textPrimary = "rgba(0,0,0, .87)";
            theme.textSecondary = "rgba(0,0,0, .54)";
            theme.textDisabled = "rgba(0,0,0, .38)";
        }
        else {
            theme.background = "#303030";
            theme.backgroundDark = "#212121";
            theme.card = "#424242";

            theme.textPrimary = "rgba(255,255,255, 1)";
            theme.textSecondary = "rgba(255,255,255, .7)";
            theme.textDisabled = "rgba(255,255,255, .5)";
        }
        updateAllColors();
    });
    $('#theme-Primary').on('input', function () {
        theme.primary = (this as HTMLInputElement).value;
        updateAllColors();
    });
    $('#theme-PrimaryDark').on('input', function () {
        theme.primaryDark = (this as HTMLInputElement).value;
        updateAllColors();
    });
    $('#theme-Accent').on('input', function () {
        theme.accent = (this as HTMLInputElement).value;
        updateAllColors();
    });
}

function updateAllColors() {
    for (var controlKey in controls) {
        updateColors(controls[controlKey]);
    }
}
