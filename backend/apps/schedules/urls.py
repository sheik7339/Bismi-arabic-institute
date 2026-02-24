from django.urls import path
from . import views

urlpatterns = [
    path('admin/', views.AdminScheduleListCreateView.as_view(), name='admin-schedule-list'),
    path('admin/<int:pk>/', views.AdminScheduleDetailView.as_view(), name='admin-schedule-detail'),
    path('my-schedule/', views.StudentScheduleView.as_view(), name='student-schedule'),
    path('teaching-schedule/', views.TeacherScheduleView.as_view(), name='teacher-schedule'),
]
