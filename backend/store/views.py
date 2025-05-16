# store/views.py

from rest_framework import generics
from .models import Product
from .serializers import ProductSerializer
from django.http import HttpResponse
from django.shortcuts import render


def home(request):
    return render(request, 'home.html')  # این مسیر باید دقیقاً به home.html اشاره کنه

class ProductListView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductDetailView(generics.RetrieveAPIView):   # 👈 اینو اضافه کن
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    

# Create your views here.
