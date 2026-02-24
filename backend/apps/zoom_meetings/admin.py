from django.contrib import admin
from .models import ZoomMeeting


@admin.register(ZoomMeeting)
class ZoomMeetingAdmin(admin.ModelAdmin):
    list_display = ['title', 'teacher', 'student', 'meeting_type', 'scheduled_at', 'is_active']
    list_filter = ['meeting_type', 'is_active', 'is_recurring']
    search_fields = ['title', 'teacher__full_name', 'student__full_name', 'zoom_meeting_id']
    readonly_fields = ['created_at', 'updated_at']
