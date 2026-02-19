# -*- coding: utf-8 -*-
import os

# Bu script images/team klasorundeki dosyalari bulur
klasor = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'images', 'team')

print("Aranan klasor:", klasor)
print("Klasor var mi:", os.path.exists(klasor))
print()

if not os.path.exists(klasor):
    print("HATA: images/team klasoru bulunamadi!")
    print("Lutfen proje klasorunde images/team/ yolunu olusturun.")
    input("Cikmak icin Enter'a basin...")
    exit(1)

dosyalar = [f for f in os.listdir(klasor) 
            if f.lower().endswith(('.jpg', '.jpeg', '.png', '.gif'))]

if not dosyalar:
    print("HATA: images/team klasorunde hic resim dosyasi yok!")
    print("3 fotoografi (aziz-demir.jpg, hatice-reyya-demir.jpg, zeynep-rana-bayraktar.jpg)")
    print("ismiyle bu klasore ekleyin.")
    input("Cikmak icin Enter'a basin...")
    exit(1)

print("Bulunan dosyalar:")
for d in dosyalar:
    print("  -", d)

# Kullaniciya eslestirme sor
print()
print("Bu 3 kisi icin hangi dosya kullanilsin?")
print("(Sirasiyla: Aziz Demir, Hatice Reyya Demir, Zeynep Rana Bayraktar)")
print("Dosya numarasini yazin (ornek: 1 2 3 veya 0 1 2):")
for i, d in enumerate(dosyalar):
    print("  ", i, "=", d)

input("\nBu script sadece kontrol icin. Devam etmek icin Enter...")
