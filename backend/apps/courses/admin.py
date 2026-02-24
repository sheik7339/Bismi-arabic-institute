from django.contrib import admin
from .models import Course, Enrollment


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ['title', 'course_type', 'level', 'price_per_month', 'enrolled_count', 'is_active']
    list_filter = ['course_type', 'level', 'is_active']
    search_fields = ['title', 'description']
    readonly_fields = ['enrolled_count', 'created_at', 'updated_at']


@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ['student', 'course', 'teacher', 'status', 'is_active', 'enrolled_at']
    list_filter = ['status', 'is_active', 'course']
    search_fields = ['student__full_name', 'student__email', 'course__title']
    raw_id_fields = ['student', 'teacher']
