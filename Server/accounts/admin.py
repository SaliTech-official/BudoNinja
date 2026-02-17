from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth import get_user_model
from . models import OTP
from .forms import UserCreationForm, UserChangeForm

User = get_user_model()


class UserAdmin(BaseUserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm

    list_display = ('full_name', 'phone_number', 'is_admin', 'is_active', 'is_verified')
    list_filter = ('phone_number', 'is_admin')
    search_fields = ('phone_number',)
    ordering = ('full_name',)

    fieldsets = (
        ('Main', {'fields': ('phone_number', 'national_code', 'birthday', 'gender', 'province', 'city')}),
        ('Permissions', {'fields': ('is_admin', 'is_active', 'last_login', 'is_superuser', 'is_verified', 'groups', 'user_permissions')}),
    )

    add_fieldsets = (
        (None, {'fields': ('phone_number', 'national_code', 'password')}),
    )

    readonly_fields = ('last_login',)
    filter_horizontal = ('groups', 'user_permissions')

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        if not request.user.is_superuser:
            form.base_fields['is_superuser'].disabled = True
        return form



admin.site.register(User, UserAdmin)
admin.site.register(OTP)