from rest_framework import serializers
from .models import ZoomMeeting


class ZoomMeetingSerializer(serializers.ModelSerializer):
    teacher_name = serializers.CharField(source='teacher.full_name', read_only=True)
    student_name = serializers.CharField(source='student.full_name', read_only=True, allow_null=True)

    class Meta:
        model = ZoomMeeting
        fields = [
            'id', 'enrollment', 'teacher', 'teacher_name',
            'student', 'student_name', 'meeting_type', 'title',
            'zoom_meeting_id', 'zoom_link', 'zoom_password',
            'scheduled_at', 'duration_minutes', 'is_recurring',
            'is_active', 'notes', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'teacher_name', 'student_name', 'created_at', 'updated_at']


class StudentZoomMeetingSerializer(serializers.ModelSerializer):
    """Student-safe serializer — does not expose all admin details."""
    teacher_name = serializers.CharField(source='teacher.full_name', read_only=True)

    class Meta:
        model = ZoomMeeting
        fields = [
            'id', 'title', 'teacher_name', 'meeting_type',
            'zoom_link', 'zoom_password', 'scheduled_at',
            'duration_minutes', 'is_recurring', 'notes'
        ]
