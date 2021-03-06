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

#from apps.usuario.models import Usuario
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
class LoginView(TemplateView):
    login_url = 'usuario:index'
    template_name = "sapb/apps/usuarios/index.html"  # url
