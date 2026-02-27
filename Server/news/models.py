from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=64)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = "Categories"


class News(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="newses")
    author = models.CharField(max_length=128)
    title = models.CharField(max_length=360)
    image = models.ImageField(upload_to="news_images/%Y/%m/%d/")
    content = models.TextField()
    is_public = models.BooleanField(default=False)

    # dates
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} - {self.is_public}"
    
    class Meta:
        verbose_name_plural = "Newses"
    


