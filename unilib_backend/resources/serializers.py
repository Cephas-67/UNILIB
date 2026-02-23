from rest_framework import serializers
from .models import Resource

class ResourceSerializer(serializers.ModelSerializer):
    uploaded_by_name = serializers.SerializerMethodField()
    fichier_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Resource
        fields = '__all__'
        read_only_fields = ['id', 'uploaded_by', 'created_at', 'updated_at']
    
    def get_uploaded_by_name(self, obj):
        return f"{obj.uploaded_by.prenom} {obj.uploaded_by.nom}"
    
    def get_fichier_url(self, obj):
        if obj.fichier:
            return obj.fichier.url
        return None