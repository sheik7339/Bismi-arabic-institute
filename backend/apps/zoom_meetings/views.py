from rest_framework import generics, permissions
from django_filters.rest_framework import DjangoFilterBackend

from .models import ZoomMeeting
from .serializers import ZoomMeetingSerializer, StudentZoomMeetingSerializer
from apps.accounts.permissions import IsAdminUser, IsTeacherUser, IsStudentUser, IsAdminOrTeacher


class AdminZoomMeetingListCreateView(generics.ListCreateAPIView):
    """Admin/Teacher: list all meetings or create a new one."""
    serializer_class = ZoomMeetingSerializer
    permission_classes = [IsAdminOrTeacher]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['is_active', 'meeting_type', 'teacher']

    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return ZoomMeeting.objects.all().select_related('teacher', 'student')
        return ZoomMeeting.objects.filter(
            teacher=user
        ).select_related('teacher', 'student')

    def perform_create(self, serializer):
        user = self.request.user
        if user.role == 'teacher':
            serializer.save(teacher=user)
        else:
            serializer.save()


class AdminZoomMeetingDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Admin/Teacher: manage a specific meeting."""
    serializer_class = ZoomMeetingSerializer
    permission_classes = [IsAdminOrTeacher]
    queryset = ZoomMeeting.objects.all()


class StudentZoomMeetingView(generics.ListAPIView):
    """Student: view their own Zoom meetings."""
    serializer_class = StudentZoomMeetingSerializer
    permission_classes = [IsStudentUser]

    def get_queryset(self):
        return ZoomMeeting.objects.filter(
            student=self.request.user,
            is_active=True
        ).select_related('teacher')
