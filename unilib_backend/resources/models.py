from django.db import models
from django.conf import settings
from authentication.models import User
import uuid

def get_file_storage():
    """Retourne le storage approprié selon l'environnement"""
    if settings.IS_PRODUCTION and hasattr(settings, 'CLOUDINARY_STORAGE'):
        try:
            from cloudinary_storage.storage import MediaCloudinaryStorage
            return MediaCloudinaryStorage()
        except:
            pass
    from django.core.files.storage import FileSystemStorage
    return FileSystemStorage()

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
        ('genie_logiciel', 'Génie Logiciel'),
        ('intelligence_artificielle', 'Intelligence Artificielle'),
        ('securite_informatique', 'Sécurité Informatique'),
        ('seiot', 'SEIoT'),
        ('internet_multimedia', 'Internet Multimédia'),
    ]
    
    PROMOTION_CHOICES = [
        ('l1', 'L1'),
        ('l2', 'L2'),
        ('l3', 'L3'),
        ('m1', 'M1'),
        ('m2', 'M2'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    titre = models.CharField(max_length=255)
    matiere = models.CharField(max_length=100)
    description = models.TextField(blank=True, default='')
    type_ressource = models.CharField(max_length=20, choices=TYPE_CHOICES)
    filiere = models.CharField(max_length=50, choices=FILIERE_CHOICES)
    promotion = models.CharField(max_length=10, choices=PROMOTION_CHOICES)
    semestre = models.IntegerField()
    format = models.CharField(max_length=10, default='PDF')
    fichier = models.FileField(upload_to='resources/%Y/%m/', storage=get_file_storage)
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='resources')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'resources'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.titre} ({self.matiere})"