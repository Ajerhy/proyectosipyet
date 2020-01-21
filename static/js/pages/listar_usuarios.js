var ListarUsuarios = function () {

    var TUsuarios = function() {

         
        /*
         * Initialize DataTables, with no sorting on the 'details' column
         */
        oTable = $('#Usuarios_table').dataTable( {
            "responsive": true,
            "bPaginate": true,
            'aaSorting': [],
            'aLengthMenu': [[10, 25, 50, 100, -1], [10, 25, 50, 100, 'Todos']],
            'bProcessing': true,
            'bServerSide': true,
            'sAjaxSource': base_url+'_usuarios/tabla',
            "oSearch": {'bCaseInsensitive': false},
            sDom: 'lfrtipL',
		    oSelectable: {
		    	bSingleRowSelect: true,
		        iColNumber:1,
		        sIdColumnName: 'id_usuario',
		        bShowControls: false,
		        fnSelectionChanged: function(selection) {
		            if (selection.fnGetSize() > 0){
		            	id_usuario= selection.fnGetIds();
		            	//alert(id_libro);
		            }
		        }
		    },
            'fnRowCallback': function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
                $(nRow).attr('id', 'tr'+aData['id_usuario']);//asigna un id a cada fila
            },
            'iDisplayLength' : 10,//cantidad de registros mostrados por pagina
            "fnServerData": function(sSource, aoData, fnCallback) {
                    $.ajax
                        ({
                            'dataType': 'json',
                            'type'    : 'POST',
                            'url'     : sSource,
                            'data'    : aoData,
                            'success' : fnCallback,
                            'complete': function(){
                                $('#b_editar, #b_borrar, #b_restaurar').attr('disabled', true);
                            }
                        });
                    //aoData.push( { "name": 'search_card', "value": 'search_card' } );
                    //$.getJSON( sSource, aoData, function (json) { fnCallback(json) });
                    },
            'aoColumns': [
                { 'mData': "id_usuario", "bSortable": false, "bSearchable": false,"sClass" :"text-center",
                'mRender': function(data, type, full) {//data, type, full
                    //var id = obj.aData['id'];
                    //Colocando un CHECKBOX en la columna 1
                    return '<input type="checkbox" class="checkboxes" name="check_id" id="check_id" value="'+data+'"/>';
                }},
                { "mData": "nombres"},
                { "mData": "apellidos"},
                { "mData": "telefono"},
                { "mData": "ci"},
                { "mData": "usuario"},
                { "mData": "tipotext"}
		    ],
            'bJQueryUI': false
        }).columnFilter();
        var tableWrapper = jQuery('#sample_1_wrapper');

        $('#Usuarios_table').on('click','tbody tr td .checkboxes',function () {
            //alert('SI');
            
            var boxes = $("input:checkbox");
            boxes.not(this).attr('checked', false);
            
            //jQuery.uniform.update(set);
            $('tr').removeClass("selected");//Quitando el color celeste de toda la fila que estaba seleccionada anteriormente
            if($(".checkboxes").is(':checked')) {//Si hay un registro seleccionado
                $(this).parents('tr').addClass("selected");
                $('#b_editar, #b_borrar, #b_restaurar').attr('disabled', false);
            } else {
                $('#b_editar, #b_borrar, #b_restaurar').attr('disabled', true);
            }
            //var checkall =$(this).parents('.portlet-body:eq(0)').find(':checkbox').attr('checked', this.checked);
            //$.uniform.update(set);
        });
    };

    return {

        //main function to initiate the module
        init: function () {
            
            if (!jQuery().dataTable) {
                return;
            }

            TUsuarios();
            
        }

    };

}();
var del_usuario=function(){
    return {
        init: function(){
            var id=$('#check_id:checked').val();
            if($(".checkboxes").is(':checked')){
                bootbox.dialog({
                    message: 'Est&aacute; seguro de eliminar al usuario seleccionado?',
                    title: 'BORRAR USUARIO?',
                    buttons: {
                        success: {
                            label: 'NO!',
                            className: 'btn-success',
                            callback: function() {
                              //alert("great success");
                            }
                        },
                        danger: {
                            label: 'SI!',
                            className: 'btn-danger',
                            callback: function() {
                                $.ajax({
                                    url: base_url+'_usuarios/eliminar',
                                    type:'POST',
                                    dataType:'json',
                                    data: "id="+id,
                                    beforeSend:function(){
                                        //$('#content').append('<div class="loading-img"></div>');
                                    },
                                    success:function(response){
                                        switch(response.estado){
                                            case 'correcto':
                                                $("#tr"+id).slideUp();
                                                $('#b_editar, #b_borrar, #b_restaurar').attr('disabled', true);
                                                toastr.success("El usuario fue eliminado correctamente", "CORRECTO");
                                                break;
                                            case 'error': 
                                                toastr.error("Ocurri&oacute; un error al eliminar el usuario", "ERROR");
                                                break;
                                            default:
                                                toastr.error("Error desconocido al eliminar el usuario", "ERROR");
                                        }
                                    }
                                });
                            }
                        }
                    }
                });
            }else{
                toastr.warning("Debe seleccionar un registro para eliminar", "ERROR");
            }
        }
    };
}();
var upd_usuario=function(){
    return {
        init: function(){
            var id=$('#check_id:checked').val();
            if($(".checkboxes").is(':checked')){
                $.blockUI({ message: '<h5><img src="'+base_url+'libs/img/ajax-loader.gif" /> Cargando espere por favor...</h5>' });
                $.ajax({
                    url: base_url+"_usuarios/modificar",
                    type:"POST",
                    data: 'id='+id,
                    success:function(msj){
                        $.unblockUI();
                        $("#divEditar").html(msj).modal();
                    },
                    error:function(error){
                        toastr.error("Ocurri&oacute; un error al realizar la petici&oacute;n "+error, "ERROR");
                    }
                });
            }else{
                toastr.warning("Debe seleccionar un registro para editar", "ERROR");
            }
        }
    };
}();
var new_usuario=function(){
    return {
        init: function(){
            $("#nuevo_usuario_link").click();
        }
    };
}();
var res_password=function(){
    return {
        init: function(){
            var id=$('#check_id:checked').val();
            if($(".checkboxes").is(':checked')){
                bootbox.dialog({
                    message: 'La contrase&ntilde;a del usuario seleccionado se restablecer&aacute; a:<br><center><strong>1234</strong></center><br/>Est&aacute; seguro de restablecer la contrase&ntilde;a?',
                    title: 'RESTABLECER CONTRASE&Ntilde;A DEL USUARIO?',
                    buttons: {
                        success: {
                            label: 'NO!',
                            className: 'btn-success',
                            callback: function() {
                              //alert("great success");
                            }
                        },
                        danger: {
                            label: 'SI!',
                            className: 'btn-danger',
                            callback: function() {
                                $.ajax({
                                    url: base_url+'_usuarios/restore_password',
                                    type:'POST',
                                    dataType:'json',
                                    data: "id="+id,
                                    beforeSend:function(){
                                        //$('#content').append('<div class="loading-img"></div>');
                                    },
                                    success:function(response){
                                        switch(response.estado){
                                            case 'correcto':
                                                toastr.success("La contrase&ntilde;a del usuario fue restablecida correctamente", "CORRECTO");
                                                break;
                                            case 'error': 
                                                toastr.error("Ocurri&oacute; un error al restablecer la contrase&ntilde;a del usuario", "ERROR");
                                                break;
                                            default:
                                                toastr.error("Error desconocido al restablecer la contrase&ntilde;a del usuario", "ERROR");
                                        }
                                    }
                                });
                            }
                        }
                    }
                });
            }else{
                toastr.warning("Debe seleccionar un registro para restablecer contrase&ntilde;a", "ERROR");
            }
        }
    };
}();