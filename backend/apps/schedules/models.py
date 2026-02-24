from django.db import models
from django.contrib.auth import get_user_model
from apps.courses.models import Enrollment

User = get_user_model()


class Schedule(models.Model):
    """
    Represents a recurring class schedule for a student-teacher pair.
    """

    class DayOfWeek(models.IntegerChoices):
        MONDAY = 0, 'Monday'
        TUESDAY = 1, 'Tuesday'
        WEDNESDAY = 2, 'Wednesday'
        THURSDAY = 3, 'Thursday'
        FRIDAY = 4, 'Friday'
        SATURDAY = 5, 'Saturday'
        SUNDAY = 6, 'Sunday'

    class TimeSlot(models.TextChoices):
        MORNING = 'morning', 'Morning (6AM - 12PM)'
        EVENING = 'evening', 'Evening (12PM - 6PM)'
        NIGHT = 'night', 'Night (6PM - 10PM)'

    enrollment = models.ForeignKey(
        Enrollment,
        on_delete=models.CASCADE,
        related_name='schedules'
    )
    teacher = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='teaching_schedules',
        limit_choices_to={'role': 'teacher'}
    )
    student = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='learning_schedules',
        limit_choices_to={'role': 'student'}
    )
    day_of_week = models.IntegerField(choices=DayOfWeek.choices)
    time_slot = models.CharField(max_length=10, choices=TimeSlot.choices)
    start_time = models.TimeField()
    end_time = models.TimeField()
    is_active = models.BooleanField(default=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'schedules'
        verbose_name = 'Schedule'
        verbose_name_plural = 'Schedules'
        ordering = ['day_of_week', 'start_time']

    def __str__(self):
        return (
            f"{self.get_day_of_week_display()} {self.start_time} - "
            f"{self.student.full_name} with {self.teacher.full_name}"
        )
