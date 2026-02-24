from rest_framework import status, generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer, UserSerializer
from .models import User
from django.contrib.auth import authenticate

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer
    
    def create(self, request, *args, **kwargs):
        print(f"📝 Inscription reçue: {request.data.get('email')}")
        response = super().create(request, *args, **kwargs)
        print(f"✅ Utilisateur créé: {response.data}")
        return response

class UserDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        return self.request.user

class EmailTokenObtainPairView(APIView):
    permission_classes = (permissions.AllowAny,)
    
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        print(f"🔐 Login attempt: {email}")
        
        if not email or not password:
            return Response(
                {'detail': 'Email et mot de passe requis'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Chercher l'utilisateur par email
        try:
            user = User.objects.get(email=email)
            print(f"✅ User found: {user.username}")
        except User.DoesNotExist:
            print(f"❌ No user with email: {email}")
            return Response(
                {'detail': 'Aucun compte actif n\'a été trouvé avec les identifiants fournis'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        # Vérifier le mot de passe
        if not user.check_password(password):
            print(f"❌ Wrong password for: {email}")
            return Response(
                {'detail': 'Aucun compte actif n\'a été trouvé avec les identifiants fournis'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        # Vérifier que le compte est actif
        if not user.is_active:
            print(f"❌ Inactive user: {email}")
            return Response(
                {'detail': 'Ce compte est désactivé'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        print(f"✅ Authentication successful for: {email}")
        
        # Générer les tokens
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })