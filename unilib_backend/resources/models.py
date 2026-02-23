from django.db import models
from authentication.models import User
import uuid

class Resource(models.Model):
    TYPE_CHOICES = [
        ('cours', 'Cours'),
        ('td', 'TD'),
        ('tp', 'TP'),
        ('examen', 'Examen'),
        ('rattrapage', 'Rattrapage'),
        ('correction', 'Correction'),
    ]
    
    FILIERE_CHOICES = [
        ('toutes','Toutes'),
        ('genie_logiciel', 'Génie Logiciel'),
        ('intelligence_artificielle', 'Intelligence Artificielle'),
        ('securite_informatique', 'Securite Informatique'),
        ('seiot', 'SEiot'),
        ('internet_multimedia', 'Internet Multimédia'),
    ]
    
    PROMOTION_CHOICES = [
        ('l1', 'Licence 1'),
        ('l2', 'Licence 2'),
        ('l3', 'Licence 3'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    titre = models.CharField(max_length=255)
    matiere = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    type_ressource = models.CharField(max_length=20, choices=TYPE_CHOICES)
    filiere = models.CharField(max_length=50, choices=FILIERE_CHOICES)
    promotion = models.CharField(max_length=10, choices=PROMOTION_CHOICES)
    semestre = models.IntegerField()
    fichier = models.FileField(upload_to='resources/%Y/%m/')
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='resources')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'resources'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.titre} ({self.matiere})"