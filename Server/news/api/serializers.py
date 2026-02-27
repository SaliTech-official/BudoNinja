from rest_framework import serializers
from news.models import News
from news.custom_relational_fields import CustomCategoryField


class GetNewsSerializer(serializers.ModelSerializer):
    category = CustomCategoryField(read_only=True)
    class Meta:
        model = News
        fields = ('category', 'title', 'image', 'created_at')