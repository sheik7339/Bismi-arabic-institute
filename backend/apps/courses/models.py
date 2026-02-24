from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Course(models.Model):
    """
    Represents an Arabic or Quran learning course offered on the platform.
    """

    class Level(models.TextChoices):
        BEGINNER = 'beginner', 'Beginner'
        INTERMEDIATE = 'intermediate', 'Intermediate'
        ADVANCED = 'advanced', 'Advanced'

    class Language(models.TextChoices):
        ARABIC = 'arabic', 'Arabic'
        QURAN = 'quran', 'Quran'
        TAJWEED = 'tajweed', 'Tajweed'
        ISLAMIC_STUDIES = 'islamic_studies', 'Islamic Studies'

    title = models.CharField(max_length=200)
    description = models.TextField()
    course_type = models.CharField(max_length=20, choices=Language.choices, default=Language.ARABIC)
    level = models.CharField(max_length=15, choices=Level.choices, default=Level.BEGINNER)
    duration_months = models.PositiveIntegerField(default=3)
    price_per_month = models.DecimalField(max_digits=10, decimal_places=2, default=500.00)
    max_students = models.PositiveIntegerField(default=5)
    thumbnail = models.ImageField(upload_to='courses/', blank=True, null=True)
    syllabus = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    created_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name='created_courses',
        limit_choices_to={'role': 'admin'}
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'courses'
        verbose_name = 'Course'
        verbose_name_plural = 'Courses'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} ({self.course_type} - {self.level})"

    @property
    def enrolled_count(self):
        return self.enrollments.filter(is_active=True).count()


class Enrollment(models.Model):
    """
    Tracks which student is enrolled in which course, assigned to which teacher.
    """

    class Status(models.TextChoices):
        ACTIVE = 'active', 'Active'
        PAUSED = 'paused', 'Paused'
        COMPLETED = 'completed', 'Completed'
        CANCELLED = 'cancelled', 'Cancelled'

    student = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='enrollments',
        limit_choices_to={'role': 'student'}
    )
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name='enrollments'
    )
    teacher = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='enrollments_as_teacher',
        limit_choices_to={'role': 'teacher'}
    )
    status = models.CharField(max_length=15, choices=Status.choices, default=Status.ACTIVE)
    is_active = models.BooleanField(default=True)
    enrolled_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    notes = models.TextField(blank=True)

    class Meta:
        db_table = 'enrollments'
        verbose_name = 'Enrollment'
        verbose_name_plural = 'Enrollments'
        unique_together = [('student', 'course')]
        ordering = ['-enrolled_at']

    def __str__(self):
        return f"{self.student.full_name} → {self.course.title} (Teacher: {self.teacher.full_name if self.teacher else 'Unassigned'})"
