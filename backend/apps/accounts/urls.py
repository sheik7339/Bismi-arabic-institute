from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    # Auth endpoints
    path('login/', views.LoginView.as_view(), name='auth-login'),
    path('register/', views.RegisterView.as_view(), name='auth-register'),
    path('google/', views.GoogleLoginView.as_view(), name='auth-google'),
    path('logout/', views.LogoutView.as_view(), name='auth-logout'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path('me/', views.MeView.as_view(), name='auth-me'),
    path('change-password/', views.ChangePasswordView.as_view(), name='change-password'),

    # Public
    path('teachers/', views.TeacherListView.as_view(), name='public-teachers'),
    path('inquiry/', views.LeadCreateView.as_view(), name='auth-inquiry'),

    # Teacher-specific
    path('teacher/profile/', views.TeacherProfileView.as_view(), name='teacher-profile'),

    # Student-specific
    path('student/profile/', views.StudentProfileView.as_view(), name='student-profile'),

    # Admin-only endpoints
    path('admin/users/', views.AdminUserListView.as_view(), name='admin-users'),
    path('admin/users/<int:pk>/', views.AdminUserDetailView.as_view(), name='admin-user-detail'),
    path('admin/users/<int:pk>/toggle-active/', views.AdminUserToggleActiveView.as_view(), name='admin-user-toggle'),
    path('admin/teachers/create/', views.AdminCreateTeacherView.as_view(), name='admin-create-teacher'),
    path('admin/students/', views.AdminStudentListView.as_view(), name='admin-students'),
    path('admin/teachers/', views.AdminTeacherListView.as_view(), name='admin-teachers'),
    path('admin/dashboard-stats/', views.DashboardStatsView.as_view(), name='admin-dashboard-stats'),
]
