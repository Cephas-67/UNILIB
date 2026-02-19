from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'nom', 'prenom', 'filiere', 'promotion', 'semestre', 'role', 'avatar']
        read_only_fields = ['id']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'nom', 'prenom', 'filiere', 'promotion', 'semestre']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            nom=validated_data['nom'],
            prenom=validated_data['prenom'],
            filiere=validated_data.get('filiere', ''),
            promotion=validated_data.get('promotion', ''),
            semestre=validated_data.get('semestre', '')
        )
        return user
