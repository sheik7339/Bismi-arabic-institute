from rest_framework import generics, permissions
from .models import Schedule
from .serializers import ScheduleSerializer, CreateScheduleSerializer
from apps.accounts.permissions import IsAdminUser, IsTeacherUser, IsStudentUser


class AdminScheduleListCreateView(generics.ListCreateAPIView):
    """Admin: list all schedules or create new one."""
    permission_classes = [IsAdminUser]
    queryset = Schedule.objects.all().select_related('teacher', 'student', 'enrollment')

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CreateScheduleSerializer
        return ScheduleSerializer


class AdminScheduleDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Admin: retrieve, update, or delete a schedule."""
    serializer_class = ScheduleSerializer
    permission_classes = [IsAdminUser]
    queryset = Schedule.objects.all()


class StudentScheduleView(generics.ListAPIView):
    """Student: view only their own schedules."""
    serializer_class = ScheduleSerializer
    permission_classes = [IsStudentUser]

    def get_queryset(self):
        return Schedule.objects.filter(
            student=self.request.user,
            is_active=True
        ).select_related('teacher', 'enrollment')


class TeacherScheduleView(generics.ListAPIView):
    """Teacher: view all their teaching schedules."""
    serializer_class = ScheduleSerializer
    permission_classes = [IsTeacherUser]

    def get_queryset(self):
        return Schedule.objects.filter(
            teacher=self.request.user,
            is_active=True
        ).select_related('student', 'enrollment')
