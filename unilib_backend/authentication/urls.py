from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import RegisterView, UserDetailView, EmailTokenObtainPairView, get_dashboard_stats

urlpatterns = [
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('login/', EmailTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('me/', UserDetailView.as_view(), name='user_detail'),
    path('dashboard-stats/', get_dashboard_stats, name='dashboard_stats'),
]
