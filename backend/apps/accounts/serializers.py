from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model
from .models import TeacherProfile, StudentProfile, Lead


class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = ['id', 'full_name', 'email', 'phone_number', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']

User = get_user_model()


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Custom JWT token serializer that includes user role and info in the token payload.
    """

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['full_name'] = user.full_name
        token['role'] = user.role
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data['user'] = {
            'id': self.user.id,
            'email': self.user.email,
            'full_name': self.user.full_name,
            'role': self.user.role,
        }
        return data


class StudentProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentProfile
        fields = [
            'id', 'preferred_time_slot', 'age', 'country',
            'city', 'guardian_name', 'guardian_phone', 'notes',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class TeacherProfileSerializer(serializers.ModelSerializer):
    total_students = serializers.ReadOnlyField()
    total_earnings = serializers.ReadOnlyField()

    class Meta:
        model = TeacherProfile
        fields = [
            'id', 'bio', 'specialization', 'qualifications',
            'experience_years', 'zoom_personal_link', 'is_available',
            'total_students', 'total_earnings', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'total_students', 'total_earnings', 'created_at', 'updated_at']


class UserSerializer(serializers.ModelSerializer):
    """Full user serializer (for admin use)."""
    student_profile = StudentProfileSerializer(read_only=True)
    teacher_profile = TeacherProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = [
            'id', 'email', 'full_name', 'phone', 'role',
            'profile_photo', 'is_active', 'date_joined',
            'student_profile', 'teacher_profile'
        ]
        read_only_fields = ['id', 'date_joined']


class RegisterSerializer(serializers.ModelSerializer):
    """Serializer for user registration."""
    password = serializers.CharField(write_only=True, min_length=8)
    password_confirm = serializers.CharField(write_only=True)
    preferred_time_slot = serializers.ChoiceField(
        choices=StudentProfile.TimeSlot.choices,
        required=False,
        default='morning'
    )

    class Meta:
        model = User
        fields = [
            'email', 'full_name', 'phone', 'password',
            'password_confirm', 'preferred_time_slot'
        ]

    def validate(self, attrs):
        if attrs['password'] != attrs.pop('password_confirm'):
            raise serializers.ValidationError({'password': 'Passwords do not match.'})
        return attrs

    def create(self, validated_data):
        preferred_time_slot = validated_data.pop('preferred_time_slot', 'morning')
        password = validated_data.pop('password')
        user = User.objects.create_user(
            password=password,
            role=User.Role.STUDENT,
            **validated_data
        )
        StudentProfile.objects.create(
            user=user,
            preferred_time_slot=preferred_time_slot
        )
        return user


class UserProfileUpdateSerializer(serializers.ModelSerializer):
    """Serializer for updating a user's own profile."""

    class Meta:
        model = User
        fields = ['full_name', 'phone', 'profile_photo']


class AdminCreateTeacherSerializer(serializers.ModelSerializer):
    """Serializer for admin to create teacher accounts."""
    password = serializers.CharField(write_only=True, min_length=8)
    bio = serializers.CharField(required=False, default='')
    specialization = serializers.CharField(required=False, default='')
    qualifications = serializers.CharField(required=False, default='')
    experience_years = serializers.IntegerField(required=False, default=0)

    class Meta:
        model = User
        fields = [
            'email', 'full_name', 'phone', 'password',
            'bio', 'specialization', 'qualifications', 'experience_years'
        ]

    def create(self, validated_data):
        bio = validated_data.pop('bio', '')
        specialization = validated_data.pop('specialization', '')
        qualifications = validated_data.pop('qualifications', '')
        experience_years = validated_data.pop('experience_years', 0)
        password = validated_data.pop('password')

        user = User.objects.create_user(
            password=password,
            role=User.Role.TEACHER,
            **validated_data
        )
        TeacherProfile.objects.create(
            user=user,
            bio=bio,
            specialization=specialization,
            qualifications=qualifications,
            experience_years=experience_years,
        )
        return user


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, min_length=8)
    new_password_confirm = serializers.CharField(required=True)

    def validate(self, attrs):
        if attrs['new_password'] != attrs['new_password_confirm']:
            raise serializers.ValidationError({'new_password': 'New passwords do not match.'})
        return attrs
