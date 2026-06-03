from django.contrib import admin
from inbox.models import Ticket


@admin.register(Ticket)
class TicketAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'title', 'phone_number', 'created_at', 'status')
    list_filter = ('status',)
    search_fields = ('phone_number',)