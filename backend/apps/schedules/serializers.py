from rest_framework import serializers
from .models import Schedule


class ScheduleSerializer(serializers.ModelSerializer):
    teacher_name = serializers.CharField(source='teacher.full_name', read_only=True)
    student_name = serializers.CharField(source='student.full_name', read_only=True)
    day_name = serializers.CharField(source='get_day_of_week_display', read_only=True)
    time_slot_display = serializers.CharField(source='get_time_slot_display', read_only=True)

    class Meta:
        model = Schedule
        fields = [
            'id', 'enrollment', 'teacher', 'teacher_name',
            'student', 'student_name', 'day_of_week', 'day_name',
            'time_slot', 'time_slot_display', 'start_time', 'end_time',
            'is_active', 'notes', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'teacher_name', 'student_name', 'day_name', 'created_at', 'updated_at']


class CreateScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = ['enrollment', 'teacher', 'student', 'day_of_week', 'time_slot', 'start_time', 'end_time', 'notes']

    def validate(self, attrs):
        if attrs.get('start_time') and attrs.get('end_time'):
            if attrs['start_time'] >= attrs['end_time']:
                raise serializers.ValidationError('End time must be after start time.')
        return attrs
