from rest_framework import serializers
from news.models import News, Category
from news.custom_relational_fields import CustomCategoryField


class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class GetNewsSerializer(serializers.ModelSerializer):
    category = CustomCategoryField(read_only=True)
    class Meta:
        model = News
        fields = ('id', 'category', 'author', 'title', 'image', 'content', 'created_at')


