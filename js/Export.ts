function codeClicked() {
    for (var key in controls) {
        var control = controls[key];

        var element = getElementByIdentifier(control.identifier);
        $(element).attr('data-identifier', null);
    }

    Waves.calm('.defaultDiv');
    Waves.calm('.childDiv');
    Waves.calm('.defaultImage');
    Waves.calm('.fullImage');
    Waves.calm('.defaultLabel');
    Waves.calm('.materialButton');
    Waves.calm('.floatingMaterialButton');

    var code = $('#codeText');
    code.text("<!DOCTYPE html><html><head><link href=http://fonts.googleapis.com/icon?family=Roboto' rel='stylesheet'><style>.shadow-1{box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24)}.shadow-2{box-shadow:0 3px 6px rgba(0,0,0,.16),0 3px 6px rgba(0,0,0,.23)}.shadow-3{box-shadow:0 10px 20px rgba(0,0,0,.19),0 6px 6px rgba(0,0,0,.23)}.shadow-4{box-shadow:0 14px 28px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.22)}.shadow-5{box-shadow:0 19px 38px rgba(0,0,0,.3),0 15px 12px rgba(0,0,0,.22)}body{margin:0;font-family:Roboto;pointer-events:auto}p{word-wrap:break-word}button{border:none}:focus{outline:0}.defaultImage,.fullImage{object-fit:cover;width:100%}.childDiv,.defaultDiv,.defaultLabel{position:relative}.defaultDiv{height:156px;width:100%;background-color:#EEE;background-repeat:no-repeat;background-size:cover}.childDiv{height:126px;width:156px;background-color:#FFF;border-radius:2px}.defaultImage{height:60%}.fullImage{height:256px}.defaultLabel{width:100%;font-size:22px;line-height:1.4;margin:0;text-align:center}.floatingMaterialButton,.materialButton{color:#FF3D00;font-size:16px;padding:8px 16px}.materialButton{background-color:transparent}.floatingMaterialButton{background-color:#fff;border-radius:2px;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);transition:box-shadow .3s}.floatingMaterialButton:hover{box-shadow:0 3px 6px rgba(0,0,0,.16),0 3px 6px rgba(0,0,0,.23)}</style><body>");
    code.text(code.text() + $('#siteArea').html());
    code.text(code.text() + "</body></html>");

    $('#codeDialog').css('visibility', 'visible');
    $('#codeDialog').transition({ opacity: 1 });

    Waves.attach('.defaultDiv');
    Waves.attach('.childDiv');
    Waves.attach('.defaultImage');
    Waves.attach('.fullImage');
    Waves.attach('.defaultLabel');
    Waves.attach('.materialButton');
    Waves.attach('.floatingMaterialButton');
}
