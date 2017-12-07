var id = 0;

function updateColors (control) {
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

class Control {
    identifier = id++;
    type = "";
    needsContainer = false;

    horizontalAlignment = "";
    verticalAlignment = "";

    marginLeft = "";
    marginTop = "";
    marginRight = "";
    marginBottom = "";

    left = "";
    top = "";
    right = "";
    bottom = "";
    width = "";
    height = "";
}

class ButtonControl extends Control {
    needsContainer = true;

    color = "Primary";
    text = "DEFAULT";
    fontColor = "TextPrimaryWhite";
    fontSize = "";

    type = "Button";
}

class ContainerControl extends Control {

    color = "Background";
    elevation = "";
    inset = "";
    source = "";

    paddingLeft = "";
    paddingTop = "";
    paddingRight = "";
    paddingBottom = "";

    type = "Container";
    children = [];
}

class ImageControl extends Control {
    aspect = "";
    elevation = "";
    source = "";

    type = "Image";
}

class LabelControl extends Control {
    needsContainer = true;

    fontColor = "TextPrimary";
    fontSize = "";
    horizontalTextAlignment = "";
    text = "";

    type = "Label";
}
