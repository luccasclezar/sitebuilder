function Theme() {
    this.primary = "#009688";
    this.primaryDark = "#00796B";
    this.accent = "#FF5722";

    this.background = "#EEE";
    this.card = "#FFF";

    this.textPrimary = "rgba(0,0,0, .87)";
    this.textSecondary = "rgba(0,0,0, .54)";
    this.textDisabled = "rgba(0,0,0, .38)";

    this.textPrimaryBlack = "rgba(0,0,0, .87)";
    this.textSecondaryBlack = "rgba(0,0,0, .54)";
    this.textDisabledBlack = "rgba(0,0,0, .38)";

    this.textPrimaryWhite = "rgba(255,255,255, 1)";
    this.textSecondaryWhite = "rgba(255,255,255, .7)";
    this.textDisabledWhite = "rgba(255,255,255, .5)";

    this.updateThemePanel = function() {
        $('#theme-Primary').val(this.primary.replace("#", ""));
        $('#theme-PrimaryDark').val(this.primaryDark.replace("#", ""));
        $('#theme-Accent').val(this.accent.replace("#",""));
        $('#theme-Theme').val(this.background.includes('EEE') ? "light" : "dark");
    }
}

function setThemeBindings() {
    $('#theme-Theme').on('change', function () {
        if (this.value === 'light') {
            theme.background = "#EEE";
            theme.card = "#FFF";
            
            theme.textPrimary = "rgba(0,0,0, .87)";
            theme.textSecondary = "rgba(0,0,0, .54)";
            theme.textDisabled = "rgba(0,0,0, .38)";
        }
        else {
            theme.background = "#303030";
            theme.card = "#424242";
            
            theme.textPrimary = "rgba(255,255,255, 1)";
            theme.textSecondary = "rgba(255,255,255, .7)";
            theme.textDisabled = "rgba(255,255,255, .5)";
        }
        updateColors();
    });
    $('#theme-Primary').on('input', function () {
        theme.primary = this.value;
        updateColors();
    });
    $('#theme-PrimaryDark').on('input', function () {
        theme.primaryDark = this.value;
        updateColors();
    });
    $('#theme-Accent').on('input', function () {
        theme.accent = this.value;
        updateColors();
    });
}

function updateColors() {
    for (var controlKey in controls) {
        controls[controlKey].updateColors();
    }
}