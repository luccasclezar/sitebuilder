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

function Control() {
    this.identifier = id++;
    this.type = null;

    this.marginLeft = null;
    this.marginTop = null;
    this.marginRight = null;
    this.marginBottom = null;

    this.left = null;
    this.top = null;
    this.right = null;
    this.bottom = null;
    this.width = null;
    this.height = null;
}

function ButtonControl() {
    Control.apply(this, arguments);

    this.color = "Primary";
    this.text = null;
    this.fontColor = "TextPrimaryWhite";
    this.fontSize = null;

    this.type = "Button";
}

function ContainerControl() {
    Control.apply(this, arguments);

    this.color = "Background";
    this.elevation = null;
    this.inset = null;

    this.paddingLeft = null;
    this.paddingTop = null;
    this.paddingRight = null;
    this.paddingBottom = null;

    this.type = "Container";
    this.children = [];
}

function ImageControl() {
    Control.apply(this, arguments);

    this.aspect = null;
    this.elevation = null;
    this.source = null;

    this.type = "Image";
}

function LabelControl() {
    Control.apply(this, arguments);

    this.fontColor = "TextPrimary";
    this.fontSize = null;
    this.horizontalTextAlignment = null;
    this.text = null;

    this.type = "Label";
}