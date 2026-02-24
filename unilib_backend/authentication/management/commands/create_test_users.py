from django.core.management.base import BaseCommand
from authentication.models import User

class Command(BaseCommand):
    help = 'Create test users'

    def handle(self, *args, **kwargs):
        # Admin
        if not User.objects.filter(email='admin@unilib.bj').exists():
            admin = User.objects.create_user(
                username='admin',
                email='admin@unilib.bj',
                password='admin123',
                nom='Admin',
                prenom='Super',
                filiere='Administration',
                promotion='Staff',
                role='admin'
            )
            admin.is_staff = True
            admin.is_superuser = True
            admin.save()
            self.stdout.write(self.style.SUCCESS('✅ Admin créé: admin@unilib.bj / admin123'))
        
        # User test
        if not User.objects.filter(email='test@ifri.edu').exists():
            User.objects.create_user(
                username='test',
                email='test@ifri.edu',
                password='test123',
                nom='Test',
                prenom='Utilisateur',
                filiere='Genie Logiciel',
                promotion='L3',
                role='etudiant'
            )
            self.stdout.write(self.style.SUCCESS('✅ User créé: test@ifri.edu / test123'))
        
        self.stdout.write(self.style.SUCCESS('🎉 Utilisateurs créés avec succès !'))