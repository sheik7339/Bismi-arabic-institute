from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter

from .models import Course, Enrollment
from .serializers import (
    CourseSerializer,
    EnrollmentStudentSerializer,
    EnrollmentAdminSerializer,
    CreateEnrollmentSerializer,
    AssignTeacherSerializer,
)
from apps.accounts.permissions import IsAdminUser, IsTeacherUser, IsStudentUser, IsAdminOrTeacher


class PublicCourseListView(generics.ListAPIView):
    """GET /api/courses/ — Public list of active courses."""
    serializer_class = CourseSerializer
    permission_classes = [permissions.AllowAny]
    queryset = Course.objects.filter(is_active=True)
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['course_type', 'level']
    search_fields = ['title', 'description']


class AdminCourseListCreateView(generics.ListCreateAPIView):
    """Admin: list all courses or create new one."""
    serializer_class = CourseSerializer
    permission_classes = [IsAdminUser]
    queryset = Course.objects.all()

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class AdminCourseDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Admin: retrieve, update, or delete a specific course."""
    serializer_class = CourseSerializer
    permission_classes = [IsAdminUser]
    queryset = Course.objects.all()


# ─────────────────────────── ENROLLMENT VIEWS ─────────────────────────────── #

class AdminEnrollmentListCreateView(generics.ListCreateAPIView):
    """Admin: list all enrollments or enroll a student."""
    permission_classes = [IsAdminUser]
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['status', 'is_active', 'course', 'teacher']
    search_fields = ['student__full_name', 'student__email']

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CreateEnrollmentSerializer
        return EnrollmentAdminSerializer

    def get_queryset(self):
        return Enrollment.objects.all().select_related(
            'student', 'course', 'teacher'
        )

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        enrollment = serializer.save()
        return Response(
            EnrollmentAdminSerializer(enrollment).data,
            status=status.HTTP_201_CREATED
        )


class AdminEnrollmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Admin: retrieve, update, or delete a specific enrollment."""
    serializer_class = EnrollmentAdminSerializer
    permission_classes = [IsAdminUser]
    queryset = Enrollment.objects.all().select_related('student', 'course', 'teacher')


class AdminAssignTeacherView(APIView):
    """
    POST /api/courses/enrollments/<id>/assign-teacher/
    Admin assigns or reassigns a teacher to a student's enrollment.
    """
    permission_classes = [IsAdminUser]

    def patch(self, request, pk):
        try:
            enrollment = Enrollment.objects.get(pk=pk)
        except Enrollment.DoesNotExist:
            return Response({'error': 'Enrollment not found.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = AssignTeacherSerializer(enrollment, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({
            'message': 'Teacher assigned successfully.',
            'enrollment': EnrollmentAdminSerializer(enrollment).data
        })


class StudentEnrollmentView(generics.ListAPIView):
    """
    GET /api/courses/my-enrollments/
    Student views their own enrollments with course and teacher info.
    """
    serializer_class = EnrollmentStudentSerializer
    permission_classes = [IsStudentUser]

    def get_queryset(self):
        return Enrollment.objects.filter(
            student=self.request.user,
            is_active=True
        ).select_related('course', 'teacher')


class TeacherEnrollmentView(generics.ListAPIView):
    """
    GET /api/courses/my-students/
    Teacher views all students assigned to them.
    """
    serializer_class = EnrollmentAdminSerializer
    permission_classes = [IsTeacherUser]

    def get_queryset(self):
        return Enrollment.objects.filter(
            teacher=self.request.user,
            is_active=True
        ).select_related('student', 'course')
