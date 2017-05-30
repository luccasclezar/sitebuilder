Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
    return this;
};

function getElementByIdentifier(id, element) {
    if (!element) element = "#siteArea";

    var siteArea = $(element).children();
    for (var i = 0; i < siteArea.length; i++) {
        if ($(siteArea[i]).data('identifier') === id)
            return siteArea[i];

        if ($(siteArea[i]).children().length > 0 && siteArea[i].nodeName !== 'I') {
            var search = getElementByIdentifier(id, siteArea[i]);
            if (search)
                return search;
        }
    }
}

function getObjectKeyIndex(obj, keyToFind) {
    var i = 0, key;

    for (key in obj) {
        if (key == keyToFind) {
            return i;
        }

        i++;
    }

    return null;
}

function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function populateList(childrenArray, iteration) {
    for (var i = 0; i < childrenArray.length; i++) {
        var control = controls[$(childrenArray[i]).data('identifier')];

        var addedChild = $('<div class="listControl"><p>' + control.type + '</p></div>');
        $(addedChild).data('identifier', control.identifier + 10000);
        $('#controlsList').append(addedChild);

        $(addedChild).click(function () {
            if (!isScrolledIntoView(this)) {
                $('#siteArea').stop().animate({ scrollTop: this.getBoundingClientRect().top }, 400, 'easeInOutCubic');
            }

            var identifier = $(this).data('identifier') - 10000;
            openMenu(controls[identifier].type, getElementByIdentifier(identifier));
        });

        $(addedChild).css('text-indent', 16 + iteration * 32);

        if (control.type === 'Container' && $(childrenArray[i]).children().length > 0) {
            populateList($(childrenArray[i]).children(), iteration + 1);
        }
    }
}

function processFile(evt, element) {
    var tgt = evt.target || window.event.srcElement,
        files = tgt.files;

    // FileReader support
    if (FileReader && files && files.length) {
        var fr = new FileReader();
        fr.onload = function () {
            element.src = fr.result;
        }
        fr.readAsDataURL(files[0]);
    }
}

function removeAll(object, key) {
    for (var objKey in object) {
        obj = object[objKey];
        if (obj.children && obj.children[key]) {
            var index = obj.children.indexOf(key);
            obj.children.splice(index, 1);
        }
    }
}

function swapElements(elm1, elm2) {
    var parent1, next1,
        parent2, next2;

    parent1 = elm1.parentNode;
    next1 = elm1.nextSibling;
    parent2 = elm2.parentNode;
    next2 = elm2.nextSibling;

    parent1.insertBefore(elm2, next1);
    parent2.insertBefore(elm1, next2);
}