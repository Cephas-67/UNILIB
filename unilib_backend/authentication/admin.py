from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ['email', 'username', 'prenom', 'nom', 'filiere', 'promotion', 'is_staff']
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('nom', 'prenom', 'filiere', 'promotion', 'semestre', 'role', 'avatar')}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ('nom', 'prenom', 'filiere', 'promotion', 'semestre', 'role', 'email')}),
    )

admin.site.register(User, CustomUserAdmin)
