from django.contrib import admin
from .models import Chalenge, AgeGroup, WeightCategory


@admin.register(Chalenge)
class ChalengeAdmin(admin.ModelAdmin):
    list_display = ('title', 'place', 'is_open', 'gender', 'chalenge_type', 'date', 'deadline')
    list_filter = ('gender', 'is_open',)
    search_fields = ('title',)


admin.site.register(WeightCategory)
admin.site.register(AgeGroup)