from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone

User = get_user_model()


class Subscription(models.Model):
    """
    Tracks a student's monthly subscription status.
    """

    class Status(models.TextChoices):
        ACTIVE = 'active', 'Active'
        EXPIRED = 'expired', 'Expired'
        CANCELLED = 'cancelled', 'Cancelled'
        TRIAL = 'trial', 'Trial'

    student = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='subscription',
        limit_choices_to={'role': 'student'}
    )
    status = models.CharField(max_length=15, choices=Status.choices, default=Status.ACTIVE)
    start_date = models.DateField()
    end_date = models.DateField()
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=500.00)
    auto_renew = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'subscriptions'
        verbose_name = 'Subscription'
        verbose_name_plural = 'Subscriptions'
        ordering = ['-created_at']

    def __str__(self):
        return f"Subscription: {self.student.full_name} ({self.status})"

    @property
    def is_active(self):
        return self.status == self.Status.ACTIVE and self.end_date >= timezone.now().date()

    @property
    def days_remaining(self):
        if self.is_active:
            return (self.end_date - timezone.now().date()).days
        return 0


class Payment(models.Model):
    """
    Individual payment records for subscriptions.
    Structured to support real payment gateway integration.
    """

    class Status(models.TextChoices):
        PENDING = 'pending', 'Pending'
        COMPLETED = 'completed', 'Completed'
        FAILED = 'failed', 'Failed'
        REFUNDED = 'refunded', 'Refunded'

    class Method(models.TextChoices):
        UPI = 'upi', 'UPI'
        CARD = 'card', 'Card'
        NETBANKING = 'netbanking', 'Net Banking'
        CASH = 'cash', 'Cash'
        OTHER = 'other', 'Other'

    student = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='payments',
        limit_choices_to={'role': 'student'}
    )
    subscription = models.ForeignKey(
        Subscription,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='payments'
    )
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, default='INR')
    status = models.CharField(max_length=15, choices=Status.choices, default=Status.PENDING)
    method = models.CharField(max_length=15, choices=Method.choices, default=Method.UPI)
    transaction_id = models.CharField(max_length=200, blank=True)
    gateway_response = models.JSONField(default=dict, blank=True)
    payment_date = models.DateTimeField(default=timezone.now)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'payments'
        verbose_name = 'Payment'
        verbose_name_plural = 'Payments'
        ordering = ['-payment_date']

    def __str__(self):
        return f"Payment ₹{self.amount} by {self.student.full_name} ({self.status})"
