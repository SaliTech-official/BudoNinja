from django.contrib import admin
from .models import Course, Category


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'teacher__full_name', 'capacity', 'duration', 'price')
    search_fields = ('title',)


admin.site.register(Category)