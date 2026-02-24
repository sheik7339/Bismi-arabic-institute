"""
URL configuration for amma_matharasa project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from django.http import JsonResponse

def health_check(request):
    try:
        from apps.accounts.models import User
        count = User.objects.count()
        return JsonResponse({
            'status': 'ok',
            'database': 'connected',
            'user_count': count,
            'message': 'Bismi Academy Backend is running'
        })
    except Exception as e:
        import traceback
        return JsonResponse({
            'status': 'error',
            'database': 'failed',
            'error': str(e),
            'traceback': traceback.format_exc()
        }, status=500)

urlpatterns = [
    path('', health_check, name='health-check'),
    path('admin/', admin.site.urls),
    path('api/auth/', include('apps.accounts.urls')),
    path('api/courses/', include('apps.courses.urls')),
    path('api/schedules/', include('apps.schedules.urls')),
    path('api/payments/', include('apps.payments.urls')),
    path('api/zoom/', include('apps.zoom_meetings.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
