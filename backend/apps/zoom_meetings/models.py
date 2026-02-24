from django.db import models
from django.contrib.auth import get_user_model
from apps.courses.models import Enrollment

User = get_user_model()


class ZoomMeeting(models.Model):
    """
    Stores Zoom meeting links for teacher-student sessions.
    Designed to be compatible with Zoom API integration in the future.
    """

    class MeetingType(models.TextChoices):
        REGULAR = 'regular', 'Regular Class'
        ASSESSMENT = 'assessment', 'Assessment'
        MAKEUP = 'makeup', 'Makeup Class'
        DEMO = 'demo', 'Demo Class'

    enrollment = models.ForeignKey(
        Enrollment,
        on_delete=models.CASCADE,
        related_name='zoom_meetings',
        null=True,
        blank=True
    )
    teacher = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='created_zoom_meetings',
        limit_choices_to={'role__in': ('teacher', 'admin')}
    )
    student = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='zoom_meetings_as_student',
        limit_choices_to={'role': 'student'}
    )
    meeting_type = models.CharField(
        max_length=15,
        choices=MeetingType.choices,
        default=MeetingType.REGULAR
    )
    title = models.CharField(max_length=200)
    zoom_meeting_id = models.CharField(max_length=100, blank=True)
    zoom_link = models.URLField()
    zoom_password = models.CharField(max_length=50, blank=True)
    scheduled_at = models.DateTimeField()
    duration_minutes = models.PositiveIntegerField(default=60)
    is_recurring = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'zoom_meetings'
        verbose_name = 'Zoom Meeting'
        verbose_name_plural = 'Zoom Meetings'
        ordering = ['-scheduled_at']

    def __str__(self):
        return f"{self.title} - {self.scheduled_at.strftime('%Y-%m-%d %H:%M')}"
