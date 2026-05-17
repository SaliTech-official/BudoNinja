from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth import get_user_model
from . models import OTP, Profile, Membership
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
    

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display =("user_full_name", "user_phone_number", "father_name")

    def user_full_name(self, obj):
        return obj.user.full_name
    
    def user_phone_number(self, obj):
        return obj.user.phone_number


@admin.register(Membership)
class MembershipAdmin(admin.ModelAdmin):
    list_display = ('user__full_name', 'user__national_code', 'is_active', 'public_id')
    list_select_related = ('user',)
    list_filter = ('is_active',)
    search_fields = ('public_id',)
    readonly_fields = ('public_id',)


admin.site.register(User, UserAdmin)
admin.site.register(OTP)