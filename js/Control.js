var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var id = 0;
function updateColors(control) {
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
var Control = /** @class */ (function () {
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
    return Control;
}());
var ButtonControl = /** @class */ (function (_super) {
    __extends(ButtonControl, _super);
    function ButtonControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.needsContainer = true;
        _this.color = "Primary";
        _this.text = "DEFAULT";
        _this.fontColor = "TextPrimaryWhite";
        _this.fontSize = "";
        _this.type = "Button";
        return _this;
    }
    return ButtonControl;
}(Control));
var ContainerControl = /** @class */ (function (_super) {
    __extends(ContainerControl, _super);
    function ContainerControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.color = "Background";
        _this.elevation = "";
        _this.inset = "";
        _this.source = "";
        _this.paddingLeft = "";
        _this.paddingTop = "";
        _this.paddingRight = "";
        _this.paddingBottom = "";
        _this.type = "Container";
        _this.children = [];
        return _this;
    }
    return ContainerControl;
}(Control));
var ImageControl = /** @class */ (function (_super) {
    __extends(ImageControl, _super);
    function ImageControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.aspect = "";
        _this.elevation = "";
        _this.source = "";
        _this.type = "Image";
        return _this;
    }
    return ImageControl;
}(Control));
var LabelControl = /** @class */ (function (_super) {
    __extends(LabelControl, _super);
    function LabelControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.needsContainer = true;
        _this.fontColor = "TextPrimary";
        _this.fontSize = "";
        _this.horizontalTextAlignment = "";
        _this.text = "";
        _this.type = "Label";
        return _this;
    }
    return LabelControl;
}(Control));
//# sourceMappingURL=Control.js.map