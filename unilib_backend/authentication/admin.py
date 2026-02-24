from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, ResponsableCode
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

@admin.register(ResponsableCode)
class ResponsableCodeAdmin(admin.ModelAdmin):
    list_display = ['code', 'used', 'created_by', 'created_at', 'used_by', 'used_at']
    list_filter = ['used', 'created_at']
    search_fields = ['code']
    readonly_fields = ['created_at', 'used_at', 'used_by']
    
    def save_model(self, request, obj, form, change):
        if not change:  # Si nouveau code
            obj.created_by = request.user
        super().save_model(request, obj, form, change)
