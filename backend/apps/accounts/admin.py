from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, TeacherProfile, StudentProfile, Lead


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ['email', 'full_name', 'role', 'is_active', 'date_joined']
    list_filter = ['role', 'is_active', 'is_staff']
    search_fields = ['email', 'full_name', 'phone']
    ordering = ['-date_joined']
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('full_name', 'phone', 'profile_photo')}),
        ('Role & Permissions', {'fields': ('role', 'is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Dates', {'fields': ('date_joined',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'full_name', 'phone', 'role', 'password1', 'password2'),
        }),
    )
    readonly_fields = ['date_joined']


@admin.register(TeacherProfile)
class TeacherProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'specialization', 'experience_years', 'is_available', 'total_students']
    list_filter = ['is_available']
    search_fields = ['user__email', 'user__full_name', 'specialization']
    readonly_fields = ['total_students', 'total_earnings']


@admin.register(StudentProfile)
class StudentProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'preferred_time_slot', 'country', 'created_at']
    list_filter = ['preferred_time_slot', 'country']
    search_fields = ['user__email', 'user__full_name']

@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'phone_number', 'is_contacted', 'created_at']
    list_filter = ['is_contacted', 'created_at']
    search_fields = ['full_name', 'phone_number', 'email']
    list_editable = ['is_contacted']
    ordering = ['-created_at']
