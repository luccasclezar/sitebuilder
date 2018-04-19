declare var Waves;

var copiedControl: Control;
var copiedElement: any;

function copy(element = null) {
    if (!contextMenuControlRef && !element) {
        showSnackbar("Select a Control.");
        return;
    }

    if (!element)
        showSnackbar("Copied!");

    if (!element) element = contextMenuControlRef;

    copiedControl = getCopy(controls[$(element).data('identifier')]);
    copiedElement = getElementByIdentifier($(element).data('identifier'), null);
}

function paste() {
    if (!copiedControl || !copiedElement || (copiedControl.needsContainer && !(controls[$(contextMenuControlRef).data('identifier')].type === 'Container'))) {
        showSnackbar("Select a container.");
        return;
    }

    var appendTo = contextMenuControlRef ? contextMenuControlRef : document.getElementById('siteArea');

    $(appendTo).append(copiedElement.outerHTML);
    Waves.attach(appendTo.className, ['no-pointer']);

    var addedElement = $(appendTo).children()[$(contextMenuControlRef).children().length - 1];

    controls[copiedControl.identifier] = copiedControl;
    $(addedElement).data('identifier', copiedControl.identifier);
    updateColors(copiedControl);

    controls[$(appendTo).data('identifier')].children.push(copiedControl.identifier);

    $(addedElement).click(function (e) {
        openMenu(controls[$(addedElement).data('identifier')].type, addedElement);
        e.stopPropagation();
    });

    copy(copiedElement);
}

function moveUp() {
    var currentIndex = $(contextMenuControlRef).index();

    if (currentIndex !== 0) {
        swapElements((contextMenuControlRef).get(0), $(contextMenuControlRef).parent().children()[currentIndex - 1]);
    }
}

function moveDown() {
    var currentIndex = $(contextMenuControlRef).index();

    if (currentIndex !== $(contextMenuControlRef).parent().children().length - 1) {
        swapElements($(contextMenuControlRef).get(0), $(contextMenuControlRef).parent().children()[currentIndex + 1]);
    }
}

function clearImageClicked() {
    if (controls[$(contextMenuControlRef).data('identifier')].type == "Image")
        (contextMenuControlRef as HTMLImageElement).src = "../images/default_image.jpg";
    else if (controls[$(contextMenuControlRef).data('identifier')].type == "Container")
        $(contextMenuControlRef).css('background-image', "url()");

    controls[$(contextMenuControlRef).data('identifier')].source = null;
}

function closeMenu() {
    $(contextMenuControlRef).css('border', 'none');
    contextMenuControlRef = null;
    contextMenuVisible = false;

    $('#siteArea').transition({ bottom: 0 }, 300, 'easeInOutCubic');
    $('#contextMenu').transition({ y: 320 }, 250, 'easeInOutCubic', function () {
        $('#contextMenu').css('visibility', 'hidden');
    });
}

function deleteControl() {
    delete controls[$(contextMenuControlRef).data('identifier')];
    $(contextMenuControlRef).remove();
    closeMenu();
}

function calculateWidth(element) {
    var control = controls[$(element).data('identifier')];
    var left = control.left ? control.left : '0px';
    var right = control.right ? control.right : '0px';
    var width = control.width ? control.width : '100%';
    var paddingLeft = control.paddingLeft ? control.paddingLeft : '0px';
    var paddingRight = control.paddingRight ? control.paddingRight : '0px';

    if (!left.includes('px') && !left.includes('%'))
        left += 'px';

    if (!right.includes('px') && !right.includes('%'))
        right += 'px';

    if (!paddingLeft.includes('px') && !paddingLeft.includes('%'))
        paddingLeft += 'px';

    if (!paddingRight.includes('px') && !paddingRight.includes('%'))
        paddingRight += 'px';

    if (!width.includes('px') && !width.includes('%'))
        width += 'px';

    $(contextMenuControlRef).css('width', 'calc(' + width + ' - (' + left + ' + ' + right + ' + ' + paddingLeft + ' + ' + paddingRight + '))');
}

function setGeneralContextMenu() {
    /********** Margin **********/
    $('#marginLeftProperty').on('input', function () {
        $(contextMenuControlRef).css('margin-left', $('#marginLeftProperty').val() as string);
        controls[$(contextMenuControlRef).data('identifier')].marginLeft = $('#marginLeftProperty').val();
    });
    $('#marginTopProperty').on('input', function () {
        $(contextMenuControlRef).css('margin-top', $('#marginTopProperty').val() as string);
        controls[$(contextMenuControlRef).data('identifier')].marginTop = $('#marginTopProperty').val();
    });
    $('#marginRightProperty').on('input', function () {
        $(contextMenuControlRef).css('margin-right', $('#marginRightProperty').val() as string);
        controls[$(contextMenuControlRef).data('identifier')].marginRight = $('#marginRightProperty').val();
    });
    $('#marginBottomProperty').on('input', function () {
        $(contextMenuControlRef).css('margin-bottom', $('#marginBottomProperty').val() as string);
        controls[$(contextMenuControlRef).data('identifier')].marginBottom = $('#marginBottomProperty').val();
    });
    /********** Margin end **********/

    /********** Padding **********/
    $('#paddingLeftProperty').on('input', function () {
        $(contextMenuControlRef).css('padding-left', $('#paddingLeftProperty').val() as string);
        controls[$(contextMenuControlRef).data('identifier')].paddingLeft = $('#paddingLeftProperty').val();
        calculateWidth(contextMenuControlRef);
    });
    $('#paddingTopProperty').on('input', function () {
        $(contextMenuControlRef).css('padding-top', $('#paddingTopProperty').val() as string);
        controls[$(contextMenuControlRef).data('identifier')].paddingTop = $('#paddingTopProperty').val();
    });
    $('#paddingRightProperty').on('input', function () {
        $(contextMenuControlRef).css('padding-right', $('#paddingRightProperty').val() as string);
        controls[$(contextMenuControlRef).data('identifier')].paddingRight = $('#paddingRightProperty').val();
        calculateWidth(contextMenuControlRef);
    });
    $('#paddingBottomProperty').on('input', function () {
        $(contextMenuControlRef).css('padding-bottom', $('#paddingBottomProperty').val() as string);
        controls[$(contextMenuControlRef).data('identifier')].paddingBottom = $('#paddingBottomProperty').val();
    });
    /********** Padding end **********/

    /********** Position **********/
    $('#leftProperty').on('input', function () {
        $(contextMenuControlRef).css('left', $('#leftProperty').val() as string);
        controls[$(contextMenuControlRef).data('identifier')].left = $('#leftProperty').val();
        calculateWidth(contextMenuControlRef);
    });
    $('#topProperty').on('input', function () {
        $(contextMenuControlRef).css('top', $('#topProperty').val() as string);
        controls[$(contextMenuControlRef).data('identifier')].top = $('#topProperty').val();
    });
    $('#rightProperty').on('input', function () {
        controls[$(contextMenuControlRef).data('identifier')].right = $('#rightProperty').val();
        calculateWidth(contextMenuControlRef);
    });
    $('#bottomProperty').on('input', function () {
        $(contextMenuControlRef).css('bottom', $('#bottomProperty').val() as string);
        controls[$(contextMenuControlRef).data('identifier')].bottom = $('#bottomProperty').val();
    });
    $('#widthProperty').on('input', function () {
        controls[$(contextMenuControlRef).data('identifier')].width = $('#widthProperty').val();
        calculateWidth(contextMenuControlRef);
    });
    $('#heightProperty').on('input', function () {
        $(contextMenuControlRef).css('height', $('#heightProperty').val() as string);
        controls[$(contextMenuControlRef).data('identifier')].height = $('#heightProperty').val();
    });
    /********** Position end **********/

    $('#colorProperty').on('input', function () {
        var val = $('#colorProperty').val() as string;
        controls[$(contextMenuControlRef).data('identifier')].color = val;

        if (val.includes('#'))
            $(contextMenuControlRef).css('background-color', val);
        else
            updateColors(controls[$(contextMenuControlRef).data('identifier')]);
    });
    $('#elevationProperty').on('input', function () {
        var isInset = ($('#div-insetProperty:checked').val() === 'on');
        var elevationValue = $('#elevationProperty').val() as string;

        $(contextMenuControlRef).css('box-shadow',
            '0 ' + (!isInset ? elevationValue + 'px ' : '0 ') + (parseInt(elevationValue) + parseInt(elevationValue) * .5) + 'px rgba(0,0,0, .4)' + (isInset ? ' inset' : ""));

        $(contextMenuControlRef).css('z-index', $('#insetProperty:checked').val() as string !== 'on' ? $('#elevationProperty').val() as string : '0');
        controls[$(contextMenuControlRef).data('identifier')].elevation = $('#elevationProperty').val();
    });
    $('#fileSourceProperty').on('change', function (evt) {
        if ($('#fileSourceProperty').val()) {
            if (controls[$(contextMenuControlRef).data('identifier')].type == "Image")
                processFile(evt, $(contextMenuControlRef));
            else if (controls[$(contextMenuControlRef).data('identifier')].type == "Container")
                processFile(evt, $(contextMenuControlRef), true);
        }
        else {
            if (controls[$(contextMenuControlRef).data('identifier')].type == "Image")
                (contextMenuControlRef as HTMLImageElement).src = "../images/default_image.jpg";
            else if (controls[$(contextMenuControlRef).data('identifier')].type == "Container")
                $(contextMenuControlRef).css('background-image', "url()");

            controls[$(contextMenuControlRef).data('identifier')].source = null;
        }
    });
    $('#fontColorProperty').on('input', function () {
        var val = $('#fontColorProperty').val() as string;
        controls[$(contextMenuControlRef).data('identifier')].fontColor = val;

        if (val.includes('#'))
            $(contextMenuControlRef).css('color', val);
        else
            updateColors(controls[$(contextMenuControlRef).data('identifier')]);
    });
    $('#fontSizeProperty').on('input', function () {
        $(contextMenuControlRef).css('font-size', $('#fontSizeProperty').val() as string);
        controls[$(contextMenuControlRef).data('identifier')].fontSize = $('#fontSizeProperty').val();
    });
    $('#heightProperty').on('input', function () {
        if (controls[$(contextMenuControlRef).data('identifier')].type !== 'Image')
            $(contextMenuControlRef).css('height', $('#heightProperty').val() as string);

        controls[$(contextMenuControlRef).data('identifier')].height = $('#heightProperty').val();
    });
    $('#horizontalAlignmentProperty').on('input', function () {
        $(contextMenuControlRef).css('float', $('#horizontalAlignmentProperty').val() as string);
        controls[$(contextMenuControlRef).data('identifier')].horizontalAlignment = $('#horizontalAlignmentProperty').val();
    });
    $('#horizontalTextAlignmentProperty').on('input', function () {
        $(contextMenuControlRef).css('text-align', $('#horizontalTextAlignmentProperty').val() as string);
        controls[$(contextMenuControlRef).data('identifier')].horizontalTextAlignment = $('#horizontalTextAlignmentProperty').val();
    });
    $('#insetProperty').change(function () {
        if ((this as HTMLInputElement).checked && !$(contextMenuControlRef).css('box-shadow').includes('inset')) {
            $(contextMenuControlRef).css('box-shadow', $(contextMenuControlRef).css('box-shadow') + ' inset');
        }

        if (!(this as HTMLInputElement).checked && $(contextMenuControlRef).css('box-shadow').includes('inset')) {
            $(contextMenuControlRef).css('box-shadow', $(contextMenuControlRef).css('box-shadow').replace(' inset', ''));
        }

        $(contextMenuControlRef).css('z-index', !(this as HTMLInputElement).checked ? $('#elevationProperty').val() as string : '0');
        controls[$(contextMenuControlRef).data('identifier')].inset = $('#insetProperty').val();
    });
    $('#textProperty').on('input', function () {
        contextMenuControlRef.innerHTML = ($('#textProperty').val() as string).split("\n").join("<br>");
        controls[$(contextMenuControlRef).data('identifier')].text = ($('#textProperty').val() as string).split("\n").join("<br>");
    });
    $('#verticalAlignmentProperty').on('input', function () {
        $(contextMenuControlRef).css('align-self', $('#verticalAlignmentProperty').val() as string);
        controls[$(contextMenuControlRef).data('identifier')].verticalAlignment = $('#verticalAlignmentProperty').val();
    });
}

function setContextMenuBindings(control) {
    for (var i = 2; i < $("#contextMenu").children().length; i++) {
        if ($("#contextMenu").children()[i].className !== 'divider')
            $($("#contextMenu").children()[i]).hide();
    }

    for (var key in control) {
        if (key.includes('$') || (typeof control[key] !== 'string' && typeof control[key] !== 'object')) continue;

        if (control[key]) {
            $("#" + key.lowerFirst() + "Property").val(control[key]);
        } else {
            $("#" + key.lowerFirst() + "Property").val("");
        }

        if (key.includes("Left") || key.includes("Top") || key.includes("Right") || key.includes("Bottom")) {
            key = key.replace(new RegExp("Left|Right|Top|Bottom"), "");
        }
        else if (key.includes("width")) {
            key = "position";
        }

        $("#" + key.lowerFirst() + "PropertyDiv").show();
    }
}

function openMenu(type, element) {
    $('#controlName').text(type);

    $('#contextMenu').css('visibility', 'visible');
    $('#contextMenu').transition({ y: -320 }, 300, 'easeInOutCubic');
    $('#siteArea').transition({ bottom: 320 }, 300, 'easeInOutCubic');

    $(contextMenuControlRef).css('border', 'none');
    contextMenuControlRef = element;
    $(contextMenuControlRef).css('border', '1px solid #FF3D00');

    var control = controls[$(contextMenuControlRef).data('identifier')];
    setContextMenuBindings(control);

    contextMenuVisible = true;
}
