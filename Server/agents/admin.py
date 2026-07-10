from django.contrib import admin
from .models import Teacher

@admin.register(Teacher)
class TeacherAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'branch', 'level', 'province', 'is_senior')
    list_filter = ('is_senior', 'province')
    search_fields = ('full_name',)
    
