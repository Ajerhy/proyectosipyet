from django.db import models
from apps.usuario.models import EstadoModel
from apps.estacionamiento.models import PaqueteEstacionamiento,Espacio,Vehiculo

class Alquiler(EstadoModel):
    espacio = models.ForeignKey(Espacio, null=True, blank=True, on_delete=models.CASCADE)
    vehiculo = models.ForeignKey(Vehiculo, null=True, blank=True, on_delete=models.CASCADE)
    periodotiempo = models.CharField(max_length=60, blank=False, null=False, unique=True,
                                             verbose_name='Perido de Tiempo',
                                             help_text='Ingrese Perido de Tiempo')
    paqueteestacionamiento = models.ForeignKey(PaqueteEstacionamiento, null=True, blank=True, on_delete=models.CASCADE)

    #elegir espacio
    #Seleccione tipo de vehículo
    #Seleccione paquete
    #Costo - Cargar
    #Numero de vehiculo:
    #Nombre del conductor del vehículo
    #Teléfono del conductor del vehículo
    #Correo electrónico del conductor del vehículo
    #Vehículo a tiempo
    #Nota (opcional)