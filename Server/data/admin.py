from django.contrib import admin
from .models import Province, City

@admin.register(Province)
class ProvineAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ("naem",)


@admin.register(City)
class CityAdmin(admin.ModelAdmin):
    list_display = ('name', 'province')
    list_filter = ('province',)
    search_fields = ('name',)