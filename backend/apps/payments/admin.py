from django.contrib import admin
from .models import Subscription, Payment


@admin.register(Subscription)
class SubscriptionAdmin(admin.ModelAdmin):
    list_display = ['student', 'status', 'start_date', 'end_date', 'amount', 'is_active']
    list_filter = ['status', 'auto_renew']
    search_fields = ['student__email', 'student__full_name']
    readonly_fields = ['is_active', 'days_remaining', 'created_at', 'updated_at']


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ['student', 'amount', 'status', 'method', 'payment_date', 'transaction_id']
    list_filter = ['status', 'method']
    search_fields = ['student__email', 'student__full_name', 'transaction_id']
    readonly_fields = ['created_at']
