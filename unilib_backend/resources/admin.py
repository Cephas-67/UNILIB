from django.contrib import admin
from .models import Resource

@admin.register(Resource)
class ResourceAdmin(admin.ModelAdmin):
    list_display = ['titre', 'matiere', 'type_ressource', 'filiere', 'promotion', 'semestre', 'uploaded_by', 'created_at']
    list_filter = ['type_ressource', 'filiere', 'promotion', 'semestre']
    search_fields = ['titre', 'matiere', 'description']
    
from .models import Resource, CoursPratique, EmploiDuTemps

@admin.register(CoursPratique)
class CoursPratiqueAdmin(admin.ModelAdmin):
    list_display = ['titre', 'difficulte', 'uploaded_by', 'created_at']
    list_filter = ['difficulte', 'created_at']
    search_fields = ['titre', 'description']
    readonly_fields = ['created_at', 'updated_at']

@admin.register(EmploiDuTemps)
class EmploiDuTempsAdmin(admin.ModelAdmin):
    list_display = ['titre', 'is_active', 'uploaded_by', 'created_at']
    list_filter = ['is_active', 'created_at']
    readonly_fields = ['created_at']