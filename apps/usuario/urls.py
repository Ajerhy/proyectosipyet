from django.urls import path
from django.urls import include, re_path
from django.contrib.auth.decorators import login_required

#Usuario Login

#Perfil Usuario
from apps.usuario.view.views_perfil import LoginView,DashboardView,LogoutView,manual

    #LoginPerfilView,DashboardView,LogoutView,manual,UsuarioPerfilDetalleView1,UsuarioPerfilDetalleView,UsuarioPerfilEditarView,passwordusuarioview

app_name = 'usuario'

urlpatterns = [
    #Login
    #path('index/', LoginView.as_view(), name='index'),
    path('', LoginView.as_view(), name='index'),
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
    path('logout/', LogoutView, name='logout'),
    #info ayuda
    path('menu/', manual, name='menu'),
]