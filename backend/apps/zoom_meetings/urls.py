from django.urls import path
from . import views

urlpatterns = [
    path('', views.AdminZoomMeetingListCreateView.as_view(), name='zoom-list-create'),
    path('<int:pk>/', views.AdminZoomMeetingDetailView.as_view(), name='zoom-detail'),
    path('my-meetings/', views.StudentZoomMeetingView.as_view(), name='student-meetings'),
]
