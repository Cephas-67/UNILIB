from django.contrib import admin
from .models import Resource

@admin.register(Resource)
class ResourceAdmin(admin.ModelAdmin):
    list_display = ['titre', 'matiere', 'type_ressource', 'filiere', 'promotion', 'semestre', 'uploaded_by', 'created_at']
    list_filter = ['type_ressource', 'filiere', 'promotion', 'semestre']
    search_fields = ['titre', 'matiere', 'description']