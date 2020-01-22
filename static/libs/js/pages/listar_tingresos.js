var ListarTingresos = function () {

    var TTingreso = function() {
         
        /*
         * Initialize DataTables, with no sorting on the 'details' column
         */
        oTable = $('#tingresos_table').dataTable( {
            "responsive": true,
            "columns": [{
                "orderable": false
            }, {
                "orderable": true
            }, {
                "orderable": true
            }],
            'aaSorting': [],
            'aLengthMenu': [[10, 25, 50, 100, -1], [10, 25, 50, 100, 'Todos']],
            'bProcessing': true,
            'bServerSide': true,
            'sAjaxSource': base_url+'_tipoingresos/datos_json',
            "oSearch": {'bCaseInsensitive': false},
            'sDom': 'lfrtipL',
            'fnRowCallback': function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
                $(nRow).attr('id', 'tr'+aData['id_tipoingreso']);//asigna un id a cada fila
                return nRow;
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
                                $('#b_editar, #b_borrar').attr('disabled', true);
                            }
                        });
                    //aoData.push( { "name": 'search_card', "value": 'search_card' } );
                    //$.getJSON( sSource, aoData, function (json) { fnCallback(json) });
                    },
            'aoColumns': [
                { 'mData': "id_tipoingreso","sTitle": "<input type='checkbox' class='checkboxes' disabled='true'/>", "bSortable": false, "bSearchable": false,"sClass" :"text-center",
                'mRender': function(data, type, full) {//data, type, full
                    //var id = obj.aData['id'];
                    //Colocando un CHECKBOX en la columna 1
                    return '<input type="checkbox" class="checkboxes" name="check_id" id="check_id" value="'+data+'"/>';
                }},
                { "mData": "nombre","sTitle": "NOMBRE"},
                { "mData": "descripcion","sTitle": "DESCRIPCI&Oacute;N"}
		    ],
            'bJQueryUI': false
        });
        var tableWrapper = jQuery('#sample_1_wrapper');

        $('#tingresos_table').on('click','tbody tr td .checkboxes',function () {
            //alert('SI');
            
            var boxes = $("input:checkbox");
            boxes.not(this).attr('checked', false);
            
            //jQuery.uniform.update(set);
            $('tr').removeClass("selected");//Quitando el color celeste de toda la fila que estaba seleccionada anteriormente
            if($(".checkboxes").is(':checked')) {//Si hay un registro seleccionado
                $(this).parents('tr').addClass("selected");
                $('#b_editar, #b_borrar').attr('disabled', false);
            } else {
                $('#b_editar, #b_borrar').attr('disabled', true);
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

            TTingreso();
            
        }

    };

}();
var del_tingreso=function(){
    return {
        init: function(){
            var id=$('#check_id:checked').val();
            if($(".checkboxes").is(':checked')){
                bootbox.dialog({
                    message: 'Est&aacute; seguro de eliminar el tipo de ingreso seleccionado?',
                    title: 'BORRAR TIPO DE INGRESO?',
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
                                    url: base_url+'_tipoingresos/eliminar',
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
                                                $('#b_editar, #b_borrar').attr('disabled', true);
                                                toastr.success("El tipo de ingreso fue eliminado correctamente", "CORRECTO");
                                                break;
                                            case 'error': 
                                                toastr.error("Ocurri&oacute; un error al eliminar el tipo de ingreso", "ERROR");
                                                break;
                                            default:
                                                toastr.error("Error desconocido al eliminar el tipo de ingreso", "ERROR");
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
var upd_tingreso=function(){
    return {
        init: function(){
            var id=$('#check_id:checked').val();
            if($(".checkboxes").is(':checked')){
                $.blockUI({ message: '<h5><img src="'+base_url+'libs/img/ajax-loader.gif" /> Cargando espere por favor...</h5>' });
                $.ajax({
                    url: base_url+"_tipoingresos/editar",
                    type:"POST",
                    data: 'id='+id,
                    success:function(msj){
                        $.unblockUI();
                        $("#divNuevoTipo").html(msj).modal();
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
var new_tingreso=function(){
    return {
        init: function(){
            $("#nuevo_tipo_ingreso_link").click();
        }
    };
}();