from django.urls import path
from . import views

urlpatterns = [
    # Admin subscriptions
    path('subscriptions/', views.AdminSubscriptionListCreateView.as_view(), name='admin-subscriptions'),
    path('subscriptions/<int:pk>/', views.AdminSubscriptionDetailView.as_view(), name='admin-subscription-detail'),

    # Admin payments
    path('admin/payments/', views.AdminPaymentListCreateView.as_view(), name='admin-payments'),

    # Revenue report
    path('revenue/', views.AdminRevenueReportView.as_view(), name='revenue-report'),

    # Student
    path('my-subscription/', views.StudentSubscriptionView.as_view(), name='my-subscription'),
    path('my-payments/', views.StudentPaymentHistoryView.as_view(), name='my-payments'),
]
