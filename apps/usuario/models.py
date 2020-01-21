from django.db import models

class EstadoModel(models.Model):
    #id = models.UUIDField('id', default=uuid.uuid4, primary_key=True, unique=True, null=False, blank=False,editable=False)
    descripcion = models.TextField('descripcion', blank=True, null=True)
    direccion_ip = models.GenericIPAddressField(blank=True, null=True)
    creacion = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    modificacion = models.DateTimeField(auto_now=True, blank=True, null=True)
    estado = models.BooleanField(default=True)
    #uc = models.CharField(max_length=100, blank=True,null=True)
    #uc = models.ForeignKey(Usuario,blank=True,null=True,on_delete=models.CASCADE)#usuario creo
    uc = models.IntegerField(blank=True, null=True)
    #um =models.ForeignKey(User,on_delete=models.CASCADE)#usuario modifico
    #um = models.CharField(max_length=100, blank=True,null=True)
    um = models.IntegerField(blank=True,null=True)

    class Meta:
        abstract = True

