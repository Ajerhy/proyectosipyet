"""
from apps.usuarios.form.forms_usuarios import LoginUsuarioForm,\
    ActualizarUsuarioForm,ActualizarPasswordForm,\
    UsuarioForm,UsuarioForm1
"""
from django.views.generic import (CreateView, UpdateView, DetailView, TemplateView, View, DeleteView,ListView)
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render, redirect, get_object_or_404
from django.http import (HttpResponseRedirect,JsonResponse, HttpResponse,Http404)

import json

from apps.usuario.models import Perfil
from apps.usuario.form.forms_perfil import LoginUsuarioPerfilForm
#from apps.alquiler.models import Servicio
#from apps.estacionamiento.models import Servicio

from django.contrib.auth.hashers import check_password
from django.contrib.auth import authenticate
from django.contrib.auth import login as login_django
from django.contrib.auth import logout as logout_django
from django.contrib.auth.decorators import login_required
from django.contrib.auth import update_session_auth_hash

from django.urls import reverse_lazy, reverse
from django.contrib import messages
from django.contrib.messages.views import SuccessMessageMixin
from django.db.models import Q


# Login
class LoginPerfilView(TemplateView,LoginRequiredMixin):
    login_url = 'usuario:index'
    template_name = "sipyet/apps/usuario/index.html"#url
    success_url = reverse_lazy("usuario:dashboard")#url

    def get_context_data(self, **kwargs):
        context = super(LoginPerfilView, self).get_context_data(**kwargs)
        return context

    def dispatch(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return HttpResponseRedirect(self.success_url)
        return super(LoginPerfilView, self).dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        form = LoginUsuarioPerfilForm(request.POST, request=request)
        if form.is_valid():
            # user = Perfil.objects.filter(usuario=request.POST.get('usuario')).first()
            perfil = Perfil.objects.filter(usuario=request.POST.get('usuario')).first()

            if perfil is not None:
                if perfil.estado:
                    perfil = authenticate(
                        usuario=request.POST.get('usuario'),
                        password=request.POST.get('password'))
                    if perfil is not None:
                        login_django(request, perfil)
                        return redirect('usuario:dashboard')
                        # return HttpResponseRedirect('usuarios:dashboard')
                    return render(request, "sipyet/apps/usuario/index.html", {
                        "error": True,
                        "message": "Tu nombre de usuario y contraseña no coinciden. Inténtalo de nuevo."}
                                  )
                return render(request, "sipyet/apps/usuario/index.html", {
                    "error": True,
                    "message": "Su cuenta está inactiva. Por favor, póngase en contacto con el administrador"}
                              )
            return render(request, "sipyet/apps/usuario/index.html", {
                "error": True,
                "message": "Tu cuenta no se encuentra. Por favor, póngase en contacto con el administrador"}
                          )
        return render(request, "sipyet/apps/usuario/index.html", {
            # "error": True,
            # "message": "Tu nombre de Usuario y Contraseña no coinciden. Inténtalo de nuevo."
            "form": form
        })

#Dashboard
class DashboardView(LoginRequiredMixin,TemplateView):
    template_name = 'sipyet/apps/dashboard.html'
    login_url = 'usuario:index'

#Salir
@login_required(login_url='usuario:index')
def LogoutView(request):
    logout_django(request)
    return redirect('usuario:index')

#manual
def manual(request):
    template_name = 'sipyet/apps/add.html'
    return render(request, template_name)
#    return render(request, template_name='sapb/apps/dashboard.html')

class PerfilUsuarioListarView(TemplateView):
    template_name = 'sipyet/apps/usuario/perfil/listar.html'
    #login_url = 'usuario:index'