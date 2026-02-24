from django.contrib import admin
from .models import Schedule


@admin.register(Schedule)
class ScheduleAdmin(admin.ModelAdmin):
    list_display = ['student', 'teacher', 'day_of_week', 'start_time', 'end_time', 'time_slot', 'is_active']
    list_filter = ['day_of_week', 'time_slot', 'is_active']
    search_fields = ['student__full_name', 'teacher__full_name']
