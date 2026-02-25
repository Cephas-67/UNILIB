from django.db import models

from authentication.models import User
import uuid
import os

# Choix du storage dynamique
if os.environ.get('DATABASE_URL') and os.environ.get('CLOUDINARY_CLOUD_NAME'):
    from cloudinary_storage.storage import MediaCloudinaryStorage
    fichier_storage = MediaCloudinaryStorage()
else:
    from django.core.files.storage import FileSystemStorage
    fichier_storage = FileSystemStorage()

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
    fichier = models.FileField(upload_to='resources/%Y/%m/', storage=fichier_storage)
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='resources')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'resources'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.titre} ({self.matiere})"


class CoursPratique(models.Model):
    DIFFICULTE_CHOICES = [
        ('debutant', 'Débutant'),
        ('intermediaire', 'Intermédiaire'),
        ('avance', 'Avancé'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    titre = models.CharField(max_length=255)
    description = models.TextField()
    difficulte = models.CharField(max_length=20, choices=DIFFICULTE_CHOICES, default='debutant')
    stack = models.JSONField(default=list)  # Liste de technologies
    apis = models.JSONField(default=list)   # Liste d'APIs/modules
    etapes = models.JSONField(default=list) # Liste des étapes
    liens = models.JSONField(default=list)  # Liste de {label, url}
    fichier_zip = models.FileField(upload_to='cours/%Y/%m/', storage=fichier_storage, blank=True, null=True)
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cours_pratiques')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'cours_pratiques'
        ordering = ['-created_at']
        verbose_name_plural = 'Cours Pratiques'
    
    def __str__(self):
        return self.titre


class EmploiDuTemps(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    titre = models.CharField(max_length=255, default='Emploi du temps officiel')
    fichier_pdf = models.FileField(upload_to='emploi_temps/', storage=fichier_storage)
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='emplois_temps')
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)  # Un seul actif à la fois
    
    class Meta:
        db_table = 'emploi_temps'
        ordering = ['-created_at']
        verbose_name_plural = 'Emplois du Temps'
    
    def __str__(self):
        return f"{self.titre} - {self.created_at.strftime('%d/%m/%Y')}"
    
    def save(self, *args, **kwargs):
        # Désactiver tous les autres emplois du temps si celui-ci est actif
        if self.is_active:
            EmploiDuTemps.objects.filter(is_active=True).update(is_active=False)
        super().save(*args, **kwargs)
    
    
    