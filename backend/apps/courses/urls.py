from django.urls import path
from . import views

urlpatterns = [
    # Public
    path('', views.PublicCourseListView.as_view(), name='course-list'),

    # Admin courses
    path('admin/', views.AdminCourseListCreateView.as_view(), name='admin-course-list-create'),
    path('admin/<int:pk>/', views.AdminCourseDetailView.as_view(), name='admin-course-detail'),

    # Admin enrollments
    path('enrollments/', views.AdminEnrollmentListCreateView.as_view(), name='admin-enrollment-list'),
    path('enrollments/<int:pk>/', views.AdminEnrollmentDetailView.as_view(), name='admin-enrollment-detail'),
    path('enrollments/<int:pk>/assign-teacher/', views.AdminAssignTeacherView.as_view(), name='assign-teacher'),

    # Student
    path('my-enrollments/', views.StudentEnrollmentView.as_view(), name='my-enrollments'),

    # Teacher
    path('my-students/', views.TeacherEnrollmentView.as_view(), name='my-students'),
]
