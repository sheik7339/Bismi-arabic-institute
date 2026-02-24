from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Course, Enrollment

User = get_user_model()


class CourseSerializer(serializers.ModelSerializer):
    enrolled_count = serializers.ReadOnlyField()
    created_by_name = serializers.CharField(source='created_by.full_name', read_only=True)

    class Meta:
        model = Course
        fields = [
            'id', 'title', 'description', 'course_type', 'level',
            'duration_months', 'price_per_month', 'max_students',
            'thumbnail', 'syllabus', 'is_active', 'enrolled_count',
            'created_by_name', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'enrolled_count', 'created_by_name', 'created_at', 'updated_at']


class EnrollmentStudentSerializer(serializers.ModelSerializer):
    """Student-facing enrollment serializer."""
    course = CourseSerializer(read_only=True)
    teacher_name = serializers.CharField(source='teacher.full_name', read_only=True)
    teacher_email = serializers.CharField(source='teacher.email', read_only=True)

    class Meta:
        model = Enrollment
        fields = [
            'id', 'course', 'teacher_name', 'teacher_email',
            'status', 'is_active', 'enrolled_at', 'notes'
        ]
        read_only_fields = ['id', 'enrolled_at']


class EnrollmentAdminSerializer(serializers.ModelSerializer):
    """Admin-facing enrollment serializer with full details."""
    course_title = serializers.CharField(source='course.title', read_only=True)
    student_name = serializers.CharField(source='student.full_name', read_only=True)
    student_email = serializers.CharField(source='student.email', read_only=True)
    teacher_name = serializers.CharField(source='teacher.full_name', read_only=True, allow_null=True)

    class Meta:
        model = Enrollment
        fields = [
            'id', 'student', 'student_name', 'student_email',
            'course', 'course_title', 'teacher', 'teacher_name',
            'status', 'is_active', 'enrolled_at', 'completed_at', 'notes'
        ]
        read_only_fields = ['id', 'enrolled_at']


class CreateEnrollmentSerializer(serializers.ModelSerializer):
    """Serializer for admin to enroll a student in a course."""

    class Meta:
        model = Enrollment
        fields = ['student', 'course', 'teacher', 'notes']

    def validate(self, attrs):
        student = attrs.get('student')
        course = attrs.get('course')
        if student and student.role != 'student':
            raise serializers.ValidationError({'student': 'Selected user is not a student.'})
        teacher = attrs.get('teacher')
        if teacher and teacher.role != 'teacher':
            raise serializers.ValidationError({'teacher': 'Selected user is not a teacher.'})
        if Enrollment.objects.filter(student=student, course=course).exists():
            raise serializers.ValidationError('This student is already enrolled in this course.')
        return attrs


class AssignTeacherSerializer(serializers.ModelSerializer):
    """Serializer for admin to assign/reassign a teacher to an enrollment."""

    class Meta:
        model = Enrollment
        fields = ['teacher']

    def validate_teacher(self, value):
        if value and value.role != 'teacher':
            raise serializers.ValidationError('Selected user is not a teacher.')
        return value
