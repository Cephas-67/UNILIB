from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Resource, CoursPratique, EmploiDuTemps
from .serializers import ResourceSerializer, CoursPratiqueSerializer, EmploiDuTempsSerializer


class ResourceViewSet(viewsets.ModelViewSet):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(uploaded_by=self.request.user)


class CoursPratiqueViewSet(viewsets.ModelViewSet):
    queryset = CoursPratique.objects.all()
    serializer_class = CoursPratiqueSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        queryset = CoursPratique.objects.all()
        
        # Filtre par difficulté
        difficulte = self.request.query_params.get('difficulte')
        if difficulte:
            queryset = queryset.filter(difficulte=difficulte)
        
        return queryset
    
    def perform_create(self, serializer):
        serializer.save(uploaded_by=self.request.user)


class EmploiDuTempsViewSet(viewsets.ModelViewSet):
    queryset = EmploiDuTemps.objects.all()
    serializer_class = EmploiDuTempsSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    @action(detail=False, methods=['get'])
    def actif(self, request):
        """Récupérer l'emploi du temps actif"""
        emploi = EmploiDuTemps.objects.filter(is_active=True).first()
        if emploi:
            serializer = self.get_serializer(emploi)
            return Response(serializer.data)
        return Response(None)
    
    def perform_create(self, serializer):
        serializer.save(uploaded_by=self.request.user)