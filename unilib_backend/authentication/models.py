from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    filiere = models.CharField(max_length=100, blank=True, null=True)
    promotion = models.CharField(max_length=20, blank=True, null=True)
    semestre = models.CharField(max_length=20, blank=True, null=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    role = models.CharField(max_length=20, choices=[('etudiant', 'Etudiant'), ('admin', 'Admin')], default='etudiant')

    def __str__(self):
        return f"{self.prenom} {self.nom} ({self.email})"
