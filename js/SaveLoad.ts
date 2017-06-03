interface IStorages {
  localStorage: LocalStorage;
}

interface LocalStorage {
  get(key: string): any;
  set(key: string, value: any): void;

  keys(): string[];
}

declare var Storages: IStorages;

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
        var control = controls[key];

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
