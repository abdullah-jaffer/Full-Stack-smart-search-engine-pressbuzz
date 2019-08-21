from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('sentiments/', views.sentiments, name='sentiments'),
    path('articles/', views.article_data, name='article_data')
]
