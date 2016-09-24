/**
 * Created by root on 01/09/16.
 */
angular.module('donacion')
  .controller('CrearSolicitudDonacionController',function ($scope,CentrosDonacionService,PacientesService,CurrentUserService,TiposSolicitudesService,DireccionesService,SolicitudesService,GruposSanguineosService) {
    //Obtengo los centros de donacion
    $scope.centrosDonacion = CentrosDonacionService.listadoCentros().query();

    // Obtengo las provincias de la API.
    $scope.provincias = DireccionesService.getProvincias().query();

    // Según la provincia elegida obtengo sus localidades.
    $scope.obtenerLocalidades = function(idprov) {
      $scope.localidades = DireccionesService.getLocalidades(idprov).query();
    };

    //Obtengo los tipos de solicitudes
    $scope.tiposSolicitudes = TiposSolicitudesService.query();
    //Obtengo los grupos sanguineos
    $scope.gruposSanguineos = GruposSanguineosService.listadoGruposSanguineos().query({},function(){
      $scope.check = {}
      angular.forEach($scope.gruposSanguineos,function (valor,clave) {
        $scope.check[valor.id] = false
      })
    });

    //Objeto que contendra los datos de la solicitud
    $scope.solicitud = {
      paciente: undefined,
      gruposSanguineos:[],
      imagenesSolicitud : {}
    }
    function gs(idGS){
      this.id = idGS
    }
    // funcion para agregar o quitar grupos sanguineos dentro de los seleccionados
    $scope.addGrupoSanguineo = function (grupo) {
      var seEncontro = false
      angular.forEach($scope.solicitud.gruposSanguineos,function(valor,clave){
        if (valor == grupo.id){
          $scope.solicitud.gruposSanguineos.splice(clave,1)
          seEncontro = true
          $scope.check[grupo.id] = false

        }
      })
      if (seEncontro == false){
        $scope.solicitud.gruposSanguineos.push(grupo.id)
        $scope.check[grupo.id] = true
      }
    }
    $scope.solicitud.fechaPublicacion = new Date();
    // <---- DatePicker fecha de inicio
    $scope.fechaInicioDPOptions = {
      initDate: new Date(2016, 0, 1),
      minDate: new Date(),
      datepickerMode: 'year'
    };
    $scope.fechaFinDPOptions = {
      initDate: new Date(2016, 0, 1),
      minDate: new Date(),
      datepickerMode: 'year'
    };
    $scope.fechaNacimientoDPOptions = {
      initDate: new Date(1980, 0, 1),
      minDate: new Date(1920,0,1),
      maxDate: new Date(),
      datepickerMode: 'year'
    };
    $scope.fechaDPInicio = {
      opened: false
    };
    $scope.fechaDPFin = {
      opened: false
    };
    $scope.fechaDPNacimiento = {
      opened: false
    };

    $scope.format = "dd/MM/yyyy";

    $scope.openDatePicker = function(picker) {
      if (picker == "fechaInicio")
        $scope.fechaDPInicio.opened = true;
      if (picker == "fechaFin")
        $scope.fechaDPFin.opened = true;
      if (picker == "nacimiento")
        $scope.fechaDPNacimiento.opened = true;
    };

    // DatePicker fecha de nacimiento ---->

    $scope.crearSolicitud = function (video) {
   /*  PacientesService.crearPaciente($scope.solicitud).success(function (data,response) {
        $scope.solicitud.paciente = data
        if ($scope.solicitud.video.files[0] != undefined) {
          SolicitudesService.crearSolicitudDonacion($scope.solicitud, $scope.currentUser.registro.id,video)
        }
        else{
          SolicitudesService.crearSolicitudDonacion($scope.solicitud, $scope.currentUser.registro.id)
        }
     })*/
     $scope.solicitud.paciente.id =2
     SolicitudesService.crearSolicitudDonacion($scope.solicitud, $scope.currentUser.registro.id)
    }
  })
