function moveUp() {
    var currentIndex = $(contextMenuControlRef).index();

    if (currentIndex !== 0) {
        swapElements(contextMenuControlRef, $(contextMenuControlRef).parent().children()[currentIndex - 1]);
    }
}

function moveDown() {
    var currentIndex = $(contextMenuControlRef).index();

    if (currentIndex !== $(contextMenuControlRef).parent().children().length - 1) {
        swapElements(contextMenuControlRef, $(contextMenuControlRef).parent().children()[currentIndex + 1]);
    }
}

function clearImageClicked() {
    $(contextMenuControlRef).children()[0].src = "../images/default_image.jpg";
    controls[$(contextMenuControlRef).data('identifier')].source = null;
}

function closeMenu() {
    $(contextMenuControlRef).css('border', 'none');
    $('#contextMenu').css('visibility', 'hidden');
    contextMenuControlRef = null;
    contextMenuVisible = false;
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
        $(contextMenuControlRef).css('margin-left', $('#marginLeftProperty').val());
        controls[$(contextMenuControlRef).data('identifier')].marginLeft = $('#marginLeftProperty').val();
    });
    $('#marginTopProperty').on('input', function () {
        $(contextMenuControlRef).css('margin-top', $('#marginTopProperty').val());
        controls[$(contextMenuControlRef).data('identifier')].marginTop = $('#marginTopProperty').val();
    });
    $('#marginRightProperty').on('input', function () {
        $(contextMenuControlRef).css('margin-right', $('#marginRightProperty').val());
        controls[$(contextMenuControlRef).data('identifier')].marginRight = $('#marginRightProperty').val();
    });
    $('#marginBottomProperty').on('input', function () {
        $(contextMenuControlRef).css('margin-bottom', $('#marginBottomProperty').val());
        controls[$(contextMenuControlRef).data('identifier')].marginBottom = $('#marginBottomProperty').val();
    });
    /********** Margin end **********/

    /********** Padding **********/
    $('#paddingLeftProperty').on('input', function () {
        $(contextMenuControlRef).css('padding-left', $('#paddingLeftProperty').val());
        controls[$(contextMenuControlRef).data('identifier')].paddingLeft = $('#paddingLeftProperty').val();
        calculateWidth(contextMenuControlRef);
    });
    $('#paddingTopProperty').on('input', function () {
        $(contextMenuControlRef).css('padding-top', $('#paddingTopProperty').val());
        controls[$(contextMenuControlRef).data('identifier')].paddingTop = $('#paddingTopProperty').val();
    });
    $('#paddingRightProperty').on('input', function () {
        $(contextMenuControlRef).css('padding-right', $('#paddingRightProperty').val());
        controls[$(contextMenuControlRef).data('identifier')].paddingRight = $('#paddingRightProperty').val();
        calculateWidth(contextMenuControlRef);
    });
    $('#paddingBottomProperty').on('input', function () {
        $(contextMenuControlRef).css('padding-bottom', $('#paddingBottomProperty').val());
        controls[$(contextMenuControlRef).data('identifier')].paddingBottom = $('#paddingBottomProperty').val();
    });
    /********** Padding end **********/

    /********** Position **********/
    $('#leftProperty').on('input', function () {
        $(contextMenuControlRef).css('left', $('#leftProperty').val());
        controls[$(contextMenuControlRef).data('identifier')].left = $('#leftProperty').val();
        calculateWidth(contextMenuControlRef);
    });
    $('#topProperty').on('input', function () {
        $(contextMenuControlRef).css('top', $('#topProperty').val());
        controls[$(contextMenuControlRef).data('identifier')].top = $('#topProperty').val();
    });
    $('#rightProperty').on('input', function () {
        controls[$(contextMenuControlRef).data('identifier')].right = $('#rightProperty').val();
        calculateWidth(contextMenuControlRef);
    });
    $('#bottomProperty').on('input', function () {
        $(contextMenuControlRef).css('bottom', $('#bottomProperty').val());
        controls[$(contextMenuControlRef).data('identifier')].bottom = $('#bottomProperty').val();
    });
    $('#widthProperty').on('input', function () {
        controls[$(contextMenuControlRef).data('identifier')].width = $('#widthProperty').val();
        calculateWidth(contextMenuControlRef);
    });
    $('#heightProperty').on('input', function () {
        $(contextMenuControlRef).css('height', $('#heightProperty').val());
        controls[$(contextMenuControlRef).data('identifier')].height = $('#heightProperty').val();
    });
    /********** Position end **********/

    $('#colorProperty').on('input', function () {
        var val = $('#colorProperty').val();
        controls[$(contextMenuControlRef).data('identifier')].color = val;

        if (val.includes('#'))
            $(contextMenuControlRef).css('background-color', val);
        else
            updateColors(controls[$(contextMenuControlRef).data('identifier')]);
    });
    $('#elevationProperty').on('input', function () {
        var isInset = ($('#div-insetProperty:checked').val() === 'on');
        var elevationValue = $('#elevationProperty').val();

        $(contextMenuControlRef).css('box-shadow',
            '0 ' + (!isInset ? elevationValue + 'px ' : '0 ') + (parseInt(elevationValue) + elevationValue * .5) + 'px rgba(0,0,0, .4)' + (isInset ? ' inset' : ""));

        $(contextMenuControlRef).css('z-index', $('#insetProperty:checked').val() !== 'on' ? $('#elevationProperty').val() : '0');
        controls[$(contextMenuControlRef).data('identifier')].elevation = $('#elevationProperty').val();
    });
    $('#fileSourceProperty').on('change', function (evt) {
        if ($('#fileSourceProperty').val()) {
            $(contextMenuControlRef).children()[0].src = processFile(evt, $(contextMenuControlRef).children()[0]);
            controls[$(contextMenuControlRef).data('identifier')].source = $('#urlSourceProperty').val();
        }
        else {
            $(contextMenuControlRef).children()[0].src = "../images/default_image.jpg";
            controls[$(contextMenuControlRef).data('identifier')].source = null;
        }
    });
    $('#fontColorProperty').on('input', function () {
        var val = $('#fontColorProperty').val();
        controls[$(contextMenuControlRef).data('identifier')].fontColor = val;

        if (val.includes('#'))
            $(contextMenuControlRef).css('color', val);
        else
            updateColors(controls[$(contextMenuControlRef).data('identifier')]);
    });
    $('#fontSizeProperty').on('input', function () {
        $(contextMenuControlRef).css('font-size', $('#fontSizeProperty').val());
        controls[$(contextMenuControlRef).data('identifier')].fontSize = $('#fontSizeProperty').val();
    });
    $('#heightProperty').on('input', function () {
        if (controls[$(contextMenuControlRef).data('identifier')].type !== 'Image')
            $(contextMenuControlRef).css('height', $('#heightProperty').val());
        else
            $($(contextMenuControlRef).children()[0]).css('height', $('#heightProperty').val());

        controls[$(contextMenuControlRef).data('identifier')].height = $('#heightProperty').val();
    });
    $('#horizontalTextAlignmentProperty').on('input', function () {
        $(contextMenuControlRef).css('text-align', $('#horizontalTextAlignmentProperty').val());
        controls[$(contextMenuControlRef).data('identifier')].horizontalTextAlignment = $('#horizontalTextAlignmentProperty').val();
    });
    $('#insetProperty').change(function () {
        if (this.checked && !$(contextMenuControlRef).css('box-shadow').includes('inset')) {
            $(contextMenuControlRef).css('box-shadow', $(contextMenuControlRef).css('box-shadow') + ' inset');
        }

        if (!this.checked && $(contextMenuControlRef).css('box-shadow').includes('inset')) {
            $(contextMenuControlRef).css('box-shadow', $(contextMenuControlRef).css('box-shadow').replace(' inset', ''));
        }

        $(contextMenuControlRef).css('z-index', !this.checked ? $('#elevationProperty').val() : '0');
        controls[$(contextMenuControlRef).data('identifier')].inset = $('#insetProperty').val();
    });
    $('#textProperty').on('input', function () {
        contextMenuControlRef.innerHTML = $('#textProperty').val().split("\n").join("<br>");
        controls[$(contextMenuControlRef).data('identifier')].text = $('#textProperty').val().split("\n").join("<br>");
    });
}

function setContextMenuBindings(control) {
    for (var i = 2; i < $("#contextMenu").children().length; i++) {
        if ($("#contextMenu").children()[i].className !== 'divider')
            $($("#contextMenu").children()[i]).hide();
    }

    /********** Margin **********/
    if (control.hasOwnProperty('marginLeft')) {
        $('#marginPropertyDiv').show();

        if (control.marginLeft)
            $('#marginLeftProperty').val(control.marginLeft);
        else
            $('#marginLeftProperty').val("");
    }
    if (control.hasOwnProperty('marginTop')) {
        $('#marginPropertyDiv').show();

        if (control.marginTop)
            $('#marginTopProperty').val(control.marginTop);
        else
            $('#marginTopProperty').val("");
    }
    if (control.hasOwnProperty('marginRight')) {
        $('#marginPropertyDiv').show();

        if (control.marginRight)
            $('#marginRightProperty').val(control.marginRight);
        else
            $('#marginRightProperty').val("");
    }
    if (control.hasOwnProperty('marginBottom')) {
        $('#marginPropertyDiv').show();

        if (control.marginBottom)
            $('#marginBottomProperty').val(control.marginBottom);
        else
            $('#marginBottomProperty').val("");
    }
    /********** Margin end **********/

    /********** Padding **********/
    if (control.hasOwnProperty('paddingLeft')) {
        $('#paddingPropertyDiv').show();

        if (control.paddingLeft)
            $('#paddingLeftProperty').val(control.paddingLeft);
        else
            $('#paddingLeftProperty').val('');
    }
    if (control.hasOwnProperty('paddingTop')) {
        $('#paddingPropertyDiv').show();

        if (control.paddingTop)
            $('#paddingTopProperty').val(control.paddingTop);
        else
            $('#paddingTopProperty').val('');
    }
    if (control.hasOwnProperty('paddingRight')) {
        $('#paddingPropertyDiv').show();

        if (control.paddingRight)
            $('#paddingRightProperty').val(control.paddingRight);
        else
            $('#paddingRightProperty').val('');
    }
    if (control.hasOwnProperty('paddingBottom')) {
        $('#paddingPropertyDiv').show();

        if (control.paddingBottom)
            $('#paddingBottomProperty').val(control.paddingBottom);
        else
            $('#paddingBottomProperty').val('');
    }
    /********** Padding end **********/

    /********** Position **********/
    if (control.hasOwnProperty('left')) {
        $('#positionPropertyDiv').show();

        if (control.left)
            $('#leftProperty').val(control.left);
        else
            $('#leftProperty').val("");
    }
    if (control.hasOwnProperty('top')) {
        $('#positionPropertyDiv').show();

        if (control.top)
            $('#topProperty').val(control.top);
        else
            $('#topProperty').val("");
    }
    if (control.hasOwnProperty('right')) {
        $('#positionPropertyDiv').show();

        if (control.right)
            $('#rightProperty').val(control.right);
        else
            $('#rightProperty').val("");
    }
    if (control.hasOwnProperty('bottom')) {
        $('#positionPropertyDiv').show();

        if (control.bottom)
            $('#bottomProperty').val(control.bottom);
        else
            $('#bottomProperty').val("");
    }
    if (control.hasOwnProperty('height')) {
        $('#positionPropertyDiv').show();

        if (control.height)
            $('#heightProperty').val(control.height);
        else
            $('#heightProperty').val("");
    }
    if (control.hasOwnProperty('width')) {
        $('#positionPropertyDiv').show();

        if (control.width)
            $('#widthProperty').val(control.width);
        else
            $('#widthProperty').val("");
    }
    /********** Position end **********/

    if (control.hasOwnProperty('color')) {
        $('#colorPropertyDiv').show();

        if (control.color)
            $('#colorProperty').val(control.color);
        else
            $('#colorProperty').val("");
    }
    if (control.hasOwnProperty('elevation')) {
        $('#elevationPropertyDiv').show();

        if (control.elevation)
            $('#elevationProperty').val(control.elevation);
        else
            $('#elevationProperty').val("");
    }
    if (control.hasOwnProperty('fontColor')) {
        $('#fontColorPropertyDiv').show();

        if (control.fontColor)
            $('#fontColorProperty').val(control.fontColor);
        else
            $('#fontColorProperty').val("");
    }
    if (control.hasOwnProperty('fontSize')) {
        $('#fontSizePropertyDiv').show();

        if (control.fontSize)
            $('#fontSizeProperty').val(control.fontSize);
        else
            $('#fontSizeProperty').val("");
    }
    if (control.hasOwnProperty('height')) {
        $('#heightPropertyDiv').show();

        if (control.height)
            $('#heightProperty').val(control.height);
        else
            $('#heightProperty').val("");
    }
    if (control.hasOwnProperty('horizontalTextAlignment')) {
        $('#horizontalTextAlignmentPropertyDiv').show();

        if (control.horizontalTextAlignment)
            $('#horizontalTextAlignmentProperty').val(control.horizontalTextAlignment);
        else
            $('#horizontalTextAlignmentProperty').val("center");
    }
    if (control.hasOwnProperty('inset')) {
        $('#insetPropertyDiv').show();

        if (control.inset)
            $('#insetProperty').val(control.inset);
        else
            $('#insetProperty').val("");
    }
    if (control.hasOwnProperty('source')) {
        $('#sourcePropertyDiv').show();

        if (control.source && control.source.includes('C:\\'))
            $('#fileSourceProperty').val(control.source);
        else
            $('#fileSourceProperty').val('');
    }
    if (control.hasOwnProperty('text')) {
        $('#textPropertyDiv').show();

        if (control.text)
            $('#textProperty').val(control.text);
        else
            $('#textProperty').val("");
    }
}

function openMenu(type, element) {
    $('#controlName').text(type);

    var offsetBottom = $(element).offset().top + $(element).height() + 8;
    $('#contextMenu').css('top', offsetBottom.toString());
    $('#contextMenu').css('visibility', 'visible');

    $(contextMenuControlRef).css('border', 'none');
    contextMenuControlRef = element;
    $(contextMenuControlRef).css('border', '1px solid #FF3D00');

    var control = controls[$(contextMenuControlRef).data('identifier')];
    setContextMenuBindings(control);

    contextMenuVisible = true;
}