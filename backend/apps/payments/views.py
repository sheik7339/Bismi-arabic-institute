from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Sum, Count
from django.conf import settings

from .models import Subscription, Payment
from .serializers import (
    SubscriptionSerializer,
    PaymentSerializer,
    CreateSubscriptionSerializer,
    RecordPaymentSerializer,
)
from apps.accounts.permissions import IsAdminUser, IsStudentUser


class AdminSubscriptionListCreateView(generics.ListCreateAPIView):
    """Admin: list all subscriptions or create a new one."""
    permission_classes = [IsAdminUser]
    queryset = Subscription.objects.all().select_related('student')

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CreateSubscriptionSerializer
        return SubscriptionSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        subscription = serializer.save(status=Subscription.Status.ACTIVE)
        return Response(
            SubscriptionSerializer(subscription).data,
            status=status.HTTP_201_CREATED
        )


class AdminSubscriptionDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Admin: manage specific subscription."""
    serializer_class = SubscriptionSerializer
    permission_classes = [IsAdminUser]
    queryset = Subscription.objects.all()


class StudentSubscriptionView(generics.RetrieveAPIView):
    """Student: view their own subscription status."""
    serializer_class = SubscriptionSerializer
    permission_classes = [IsStudentUser]

    def get_object(self):
        try:
            return self.request.user.subscription
        except Subscription.DoesNotExist:
            from rest_framework.exceptions import NotFound
            raise NotFound('No active subscription found.')


class AdminPaymentListCreateView(generics.ListCreateAPIView):
    """Admin: list all payments or record a new payment."""
    permission_classes = [IsAdminUser]
    queryset = Payment.objects.all().select_related('student', 'subscription')

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return RecordPaymentSerializer
        return PaymentSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        payment = serializer.save(status=Payment.Status.COMPLETED)
        return Response(
            PaymentSerializer(payment).data,
            status=status.HTTP_201_CREATED
        )


class StudentPaymentHistoryView(generics.ListAPIView):
    """Student: view their own payment history."""
    serializer_class = PaymentSerializer
    permission_classes = [IsStudentUser]

    def get_queryset(self):
        return Payment.objects.filter(student=self.request.user)


class AdminRevenueReportView(APIView):
    """
    GET /api/payments/revenue/
    Admin: comprehensive revenue reporting and analytics.
    """
    permission_classes = [IsAdminUser]

    def get(self, request):
        from django.contrib.auth import get_user_model
        User = get_user_model()

        total_revenue = Payment.objects.filter(
            status='completed'
        ).aggregate(total=Sum('amount'))['total'] or 0

        monthly_breakdown = (
            Payment.objects
            .filter(status='completed')
            .extra(select={'month': "strftime('%%Y-%%m', payment_date)"})
            .values('month')
            .annotate(total=Sum('amount'), count=Count('id'))
            .order_by('-month')[:12]
        )

        active_students = User.objects.filter(role='student', is_active=True).count()
        active_subscriptions = Subscription.objects.filter(status='active').count()

        return Response({
            'total_revenue_inr': float(total_revenue),
            'active_subscriptions': active_subscriptions,
            'active_students': active_students,
            'monthly_revenue_inr': float(active_students * settings.SUBSCRIPTION_PRICE_INR),
            'teacher_payouts_inr': float(active_students * settings.TEACHER_EARNING_PER_STUDENT),
            'platform_profit_inr': float(active_students * settings.PLATFORM_PROFIT_PER_STUDENT),
            'monthly_breakdown': list(monthly_breakdown),
        })
