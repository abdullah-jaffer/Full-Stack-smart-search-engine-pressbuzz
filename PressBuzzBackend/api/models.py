from django.db import models


class Article(models.Model):
    title = models.CharField(max_length=300)
    pub_date = models.DateTimeField('date published')
    category = models.CharField(max_length=100)
    cover_image = models.CharField(max_length=700)
    content = models.TextField()
    author = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.title


class Comment(models.Model):
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    user = models.CharField(max_length=200)
    comment = models.TextField()

    def __str__(self):
        return self.comment
