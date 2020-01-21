from django.db import models
from apps.usuario.models import EstadoModel

class Ubicacion(EstadoModel):
    latitudubicacion = models.CharField(max_length=30, blank=True, null=True,
                                              verbose_name = 'Latitud',
                                              help_text = 'Ingrese la Latitud')
    longitudubicacion = models.CharField(max_length=30, blank=True, null=True,
                                              verbose_name = 'Longitud',
                                              help_text = 'Ingrese la Longitud')
    descripcionubicacion = models.CharField(max_length=50, blank=True, null=True,
                                              verbose_name = 'Descripcion de la Ubicacion',
                                              help_text = 'Ingrese Descripcion de la Ubicacion')
    def __str__(self):
        return '%s %s' % (self.latitudubicacion,self.longitudubicacion)

    class Meta:
        verbose_name_plural = "Ubicaciones"

class Estacionamiento(EstadoModel):
    nombreestacionamiento = models.CharField(max_length=50, blank=True, null=True,
                                      verbose_name='Nombre del Estacionamiento',
                                      help_text='Ingrese Nombre del Estacionamiento')
    numeroestacionamiento = models.CharField(max_length=60, blank=False, null=False, unique=True,
                                     verbose_name='Numero de Estacionamiento',
                                     help_text='Ingrese Numero de Estacionamiento')
    ubicacion = models.ForeignKey(Ubicacion, null=True, blank=True, on_delete=models.CASCADE)

class Espacio(EstadoModel):
    numeroespacio = models.CharField(max_length=60, blank=False, null=False, unique=True,
                                             verbose_name='Numero de Espacio',
                                             help_text='Ingrese Numero de Espacio')

class Vehiculo(EstadoModel):
    nombrevehiculo = models.CharField(max_length=50, blank=True, null=True,
                                      verbose_name='Nombre del Vehiculo',
                                      help_text='Ingrese Nombre del Vehiculo')
    siglavehiculo = models.CharField(max_length=10, blank=True, null=True,
                                     verbose_name='Sigla del Vehiculo',
                                     help_text='Ingrese la Sigla del Vehiculo')

class Puerta(EstadoModel):
    nombrepuerta = models.CharField(max_length=50, blank=True, null=True,
                                      verbose_name='Nombre de la Puerta',
                                      help_text='Ingrese Nombre de la Puerta')
    siglapuerta = models.CharField(max_length=10, blank=True, null=True,
                                     verbose_name='Sigla de la Puerta',
                                     help_text='Ingrese la Sigla de la Puerta')
    ubicacion = models.ForeignKey(Ubicacion, null=True, blank=True, on_delete=models.CASCADE)

class Periodo(EstadoModel):
    periodotiempo = models.CharField(max_length=60, blank=False, null=False, unique=True,
                                             verbose_name='Perido de Tiempo',
                                             help_text='Ingrese Perido de Tiempo')

class PaqueteEstacionamiento(EstadoModel):
    nombrepaquete = models.CharField(max_length=50, blank=True, null=True,
                                      verbose_name='Nombre del Paquete',
                                      help_text='Ingrese Nombre del Paquete')
    vehiculo = models.ForeignKey(Vehiculo, null=True, blank=True, on_delete=models.CASCADE)

    periodo = models.ForeignKey(Periodo, null=True, blank=True, on_delete=models.CASCADE)

    preciocobrar = models.CharField(max_length=50, blank=True, null=True,
                                      verbose_name='Precio a Cobrar',
                                      help_text='Ingrese Precio a Cobrar')