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

/********** SNACKBAR **********/
var snackbar = null;
function showSnackbar(text) {
    if (snackbar === null) {
        $(document.body).append('<div style="position: fixed; top: 100%" class="shadow-3" id="snackbar">' + text + '<button id="snackbarButton" onclick="closeSnackbar()">Close</button></div>');
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
/********** SNACKBAR end **********/


/********** SAVE/LOAD **********/
function supportsStorage() {
    return ('localStorage' in window) && window['localStorage'] !== null;
}

function load() {
    $('#savesList').empty();

    var savedKeys = Storages.localStorage.keys();
    for (var key in savedKeys) {
        if (key === 'move') break;

        if (savedKeys[key].includes('controls')) {
            var saveName = savedKeys[key].split('_')[0];

            var entry = $('<p class="saveEntry">' + saveName + '</p>');
            $('#savesList').append(entry);

            $(entry).click(function () {
                loadProject($(this).text());
            });
        }
    }
    Waves.attach('.saveEntry');

    $('#loadDialog').css('visibility', 'visible');
    $('#loadDialog').animate({ opacity: 1 }, 250);
}

function loadProject(name) {
    closeMenu();
    $('#siteArea').empty();

    controls = Storages.localStorage.get(name + '_controls');
    $('#siteArea').append(Storages.localStorage.get(name + '_elements'));
    id = Storages.localStorage.get(name + '_id');
    theme = Storages.localStorage.get(name + '_theme');

    for (var key in controls) {
        control = controls[key];

        var element = getElementByIdentifier(control.identifier);
        $(element).click(function (e) {
            openMenu(controls[$(this).data('identifier')].type, this);
            e.stopPropagation();
        });
    }

    dialogCancel('loadDialog');
}

function save() {
    $('#saveDialog').css('visibility', 'visible');
    $('#saveDialog').animate({ opacity: 1 }, 250);
}

function dialogSave() {
    for (var key in controls) {
        var control = controls[key];

        var element = getElementByIdentifier(control.identifier);
        $(element).attr('data-identifier', control.identifier);
    }

    Storages.localStorage.set($('#saveName').val() + "_controls", controls);
    Storages.localStorage.set($('#saveName').val() + "_elements", $('#siteArea').html());
    Storages.localStorage.set($('#saveName').val() + "_id", id);
    Storages.localStorage.set($('#saveName').val() + "_theme", theme);
    dialogCancel('saveDialog');
}

function dialogCancel(dialog) {
    $('#' + dialog).animate({ opacity: 0 }, 250, function () { $('#' + dialog).css('visibility', 'hidden'); });
}
/********** SAVE/LOAD end **********/