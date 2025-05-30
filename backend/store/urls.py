# store/urls.py

from django.urls import path
from .views import ProductListView, ProductDetailView
from . import views


urlpatterns = [
    path('', views.home, name='home'),
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    

]
