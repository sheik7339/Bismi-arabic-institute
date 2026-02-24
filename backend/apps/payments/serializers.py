from rest_framework import serializers
from .models import Subscription, Payment


class SubscriptionSerializer(serializers.ModelSerializer):
    is_active = serializers.ReadOnlyField()
    days_remaining = serializers.ReadOnlyField()
    student_name = serializers.CharField(source='student.full_name', read_only=True)
    student_email = serializers.CharField(source='student.email', read_only=True)

    class Meta:
        model = Subscription
        fields = [
            'id', 'student', 'student_name', 'student_email',
            'status', 'start_date', 'end_date', 'amount',
            'auto_renew', 'is_active', 'days_remaining',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'is_active', 'days_remaining', 'created_at', 'updated_at']


class PaymentSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.full_name', read_only=True)

    class Meta:
        model = Payment
        fields = [
            'id', 'student', 'student_name', 'subscription',
            'amount', 'currency', 'status', 'method',
            'transaction_id', 'payment_date', 'notes', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']


class CreateSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = ['student', 'start_date', 'end_date', 'amount', 'auto_renew']

    def validate_student(self, value):
        if value.role != 'student':
            raise serializers.ValidationError('User is not a student.')
        return value


class RecordPaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['student', 'subscription', 'amount', 'method', 'transaction_id', 'notes']

    def validate_student(self, value):
        if value.role != 'student':
            raise serializers.ValidationError('User is not a student.')
        return value
