from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter

from .models import TeacherProfile, StudentProfile
from .serializers import (
    CustomTokenObtainPairSerializer,
    RegisterSerializer,
    UserSerializer,
    UserProfileUpdateSerializer,
    AdminCreateTeacherSerializer,
    TeacherProfileSerializer,
    StudentProfileSerializer,
    ChangePasswordSerializer,
    LeadSerializer,
)
from .permissions import IsAdminUser, IsTeacherUser, IsStudentUser, IsAdminOrTeacher

User = get_user_model()


class LoginView(TokenObtainPairView):
    """
    POST /api/auth/login/
    Accepts email + password, returns access + refresh tokens with user info.
    """
    serializer_class = CustomTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    """
    POST /api/auth/register/
    Public endpoint for student self-registration.
    """
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(
            {
                'message': 'Registration successful. Please log in.',
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'full_name': user.full_name,
                    'role': user.role,
                }
            },
            status=status.HTTP_201_CREATED
        )


class LogoutView(APIView):
    """
    POST /api/auth/logout/
    Blacklists the refresh token to invalidate the session.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get('refresh')
            if not refresh_token:
                return Response(
                    {'error': 'Refresh token is required.'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({'message': 'Logged out successfully.'}, status=status.HTTP_200_OK)
        except Exception:
            return Response({'error': 'Invalid token.'}, status=status.HTTP_400_BAD_REQUEST)


class MeView(generics.RetrieveUpdateAPIView):
    """
    GET  /api/auth/me/   → Return current user profile
    PATCH /api/auth/me/  → Update current user profile
    """
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method in ('PUT', 'PATCH'):
            return UserProfileUpdateSerializer
        return UserSerializer

    def get_object(self):
        return self.request.user


class ChangePasswordView(APIView):
    """
    POST /api/auth/change-password/
    Allows an authenticated user to change their own password.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = request.user
        if not user.check_password(serializer.validated_data['old_password']):
            return Response(
                {'error': 'Current password is incorrect.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        user.set_password(serializer.validated_data['new_password'])
        user.save()
        return Response({'message': 'Password changed successfully.'})


# ─────────────────────────── ADMIN VIEWS ────────────────────────────────── #

class AdminUserListView(generics.ListAPIView):
    """
    GET /api/auth/admin/users/
    Lists all users (admin only).
    """
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['role', 'is_active']
    search_fields = ['email', 'full_name', 'phone']
    queryset = User.objects.all().select_related(
        'student_profile', 'teacher_profile'
    )


class AdminCreateTeacherView(generics.CreateAPIView):
    """
    POST /api/auth/admin/teachers/create/
    Admin creates a teacher account.
    """
    serializer_class = AdminCreateTeacherSerializer
    permission_classes = [IsAdminUser]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(
            {
                'message': 'Teacher account created successfully.',
                'user': UserSerializer(user).data
            },
            status=status.HTTP_201_CREATED
        )


class AdminUserDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET/PATCH/DELETE /api/auth/admin/users/<id>/
    Admin manages any user.
    """
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]
    queryset = User.objects.all().select_related('student_profile', 'teacher_profile')


class AdminUserToggleActiveView(APIView):
    """
    POST /api/auth/admin/users/<id>/toggle-active/
    Admin can activate or deactivate any user.
    """
    permission_classes = [IsAdminUser]

    def post(self, request, pk):
        try:
            user = User.objects.get(pk=pk)
            user.is_active = not user.is_active
            user.save()
            return Response({
                'message': f"User {'activated' if user.is_active else 'deactivated'} successfully.",
                'is_active': user.is_active
            })
        except User.DoesNotExist:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)


# ─────────────────────────── TEACHER VIEWS ───────────────────────────────── #

class TeacherProfileView(generics.RetrieveUpdateAPIView):
    """
    GET/PATCH /api/auth/teacher/profile/
    Teacher views or updates their own profile.
    """
    serializer_class = TeacherProfileSerializer
    permission_classes = [IsTeacherUser]

    def get_object(self):
        return self.request.user.teacher_profile


class TeacherListView(generics.ListAPIView):
    """
    GET /api/auth/teachers/
    Public list of available teachers.
    """
    serializer_class = TeacherProfileSerializer
    permission_classes = [permissions.AllowAny]
    queryset = TeacherProfile.objects.filter(is_available=True).select_related('user')


# ─────────────────────────── STUDENT VIEWS ───────────────────────────────── #

class StudentProfileView(generics.RetrieveUpdateAPIView):
    """
    GET/PATCH /api/auth/student/profile/
    Student views or updates their own profile.
    """
    serializer_class = StudentProfileSerializer
    permission_classes = [IsStudentUser]

    def get_object(self):
        return self.request.user.student_profile


class AdminStudentListView(generics.ListAPIView):
    """
    GET /api/auth/admin/students/
    Admin views all student profiles.
    """
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]
    queryset = User.objects.filter(role='student').select_related('student_profile')
    filter_backends = [SearchFilter]
    search_fields = ['email', 'full_name']


class AdminTeacherListView(generics.ListAPIView):
    """
    GET /api/auth/admin/teachers/
    Admin views all teacher profiles.
    """
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]
    queryset = User.objects.filter(role='teacher').select_related('teacher_profile')
    filter_backends = [SearchFilter]
    search_fields = ['email', 'full_name']


class DashboardStatsView(APIView):
    """
    GET /api/auth/admin/dashboard-stats/
    Returns high-level analytics for the admin dashboard.
    """
    permission_classes = [IsAdminUser]

    def get(self, request):
        from apps.payments.models import Subscription, Payment
        from django.db.models import Sum
        from django.conf import settings

        total_students = User.objects.filter(role='student', is_active=True).count()
        total_teachers = User.objects.filter(role='teacher', is_active=True).count()
        active_subscriptions = Subscription.objects.filter(status='active').count()
        total_revenue = Payment.objects.filter(
            status='completed'
        ).aggregate(total=Sum('amount'))['total'] or 0
        platform_profit = total_students * settings.PLATFORM_PROFIT_PER_STUDENT

        return Response({
            'total_students': total_students,
            'total_teachers': total_teachers,
            'active_subscriptions': active_subscriptions,
            'total_revenue': float(total_revenue),
            'platform_profit_mtd': float(platform_profit),
            'teacher_payouts_mtd': float(total_students * settings.TEACHER_EARNING_PER_STUDENT),
        })


class LeadCreateView(generics.CreateAPIView):
    """
    POST /api/auth/inquiry/
    Capture a new lead from the Inquiry form.
    """
    serializer_class = LeadSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"message": "Inquiry received successfully. Our team will contact you soon."},
            status=status.HTTP_201_CREATED
        )
