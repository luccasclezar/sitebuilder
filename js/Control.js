var id = 0;

updateColors = function (control) {
    for (var key in control) {
        if (key !== 'updateColors' && key.toLowerCase().includes('color')) {
            var val = control[key].charAt(0).toLowerCase() + control[key].slice(1);

            if (val === 'primary' || val === 'primaryDark' || val === 'accent'
                || val === 'background' || val === 'backgroundDark' || val === 'card'
                || val === 'textPrimary' || val === 'textSecondary' || val === 'textDisabled'
                || val === 'textPrimaryWhite' || val === 'textSecondaryWhite' || val === 'textDisabledWhite'
                || val === 'textPrimaryBlack' || val === 'textSecondaryBlack' || val === 'textDisabledBlack') {
                var cssAttr = "";
                switch (key) {
                    case 'color':
                        cssAttr = 'background-color';
                        break;
                    case 'fontColor':
                        cssAttr = 'color';
                        break;
                }

                var hashtag = !theme[val].includes('r') && !theme[val].includes('#') ? "#" : "";
                $(getElementByIdentifier(control.identifier)).css(cssAttr, hashtag + theme[val]);
            }
        }
    }
}

function getCopy(control) {
    var copiedControl = JSON.parse(JSON.stringify(control));
    copiedControl.identifier = id++;

    return copiedControl;
}

function Control() {
    this.identifier = id++;
    this.type = "";
    this.needsContainer = false;

    this.horizontalAlignment = "";
    this.verticalAlignment = "";

    this.marginLeft = "";
    this.marginTop = "";
    this.marginRight = "";
    this.marginBottom = "";

    this.left = "";
    this.top = "";
    this.right = "";
    this.bottom = "";
    this.width = "";
    this.height = "";
}

function ButtonControl() {
    Control.apply(this, arguments);
    this.needsContainer = true;

    this.color = "Primary";
    this.text = "DEFAULT";
    this.fontColor = "TextPrimaryWhite";
    this.fontSize = "";

    this.type = "Button";
}

function ContainerControl() {
    Control.apply(this, arguments);

    this.color = "Background";
    this.elevation = "";
    this.inset = "";
    this.source = "";

    this.paddingLeft = "";
    this.paddingTop = "";
    this.paddingRight = "";
    this.paddingBottom = "";

    this.type = "Container";
    this.children = [];
}

function ImageControl() {
    Control.apply(this, arguments);

    this.aspect = "";
    this.elevation = "";
    this.source = "";

    this.type = "Image";
}

function LabelControl() {
    Control.apply(this, arguments);
    this.needsContainer = true;

    this.fontColor = "TextPrimary";
    this.fontSize = "";
    this.horizontalTextAlignment = "";
    this.text = "";

    this.type = "Label";
}