# -*- coding: utf-8 -*-
"""
Bu script images/team klasorundeki dosyalari bulur ve HTML dosyalarini gunceller.
Scripti calistirmak icin: Bu dosyaya cift tiklayin veya "python foto-duzelt.py" yazin.
"""
import os
import re

base_dir = os.path.dirname(os.path.abspath(__file__))
team_dir = os.path.join(base_dir, 'images', 'team')

# images/team yoksa team/ dene (kök dizinde)
if not os.path.exists(team_dir):
    team_dir = os.path.join(base_dir, 'team')

print("Klasor:", team_dir)

if not os.path.exists(team_dir):
    os.makedirs(team_dir)
    print("OLUSTURULDU: team klasoru (images/team yerine)")
    print("3 fotoografi su isimlerle team/ klasorune koyun:")
    print("  - aziz-demir.jpg")
    print("  - hatice-reyya-demir.jpg")  
    print("  - zeynep-rana-bayraktar.jpg")
    input("\nEnter ile cik...")
    exit(0)

# Tum resim dosyalarini bul
files = [f for f in os.listdir(team_dir) 
         if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
files.sort()

if len(files) < 3:
    print("UYARI: En az 3 resim gerekli. Bulunan:", len(files))
    for f in files:
        print("  -", f)
    input("\nEnter ile cik...")
    exit(1)

# Eslestirme: aziz, reyya/hatice, zeynep iceren dosyalari bul
def find_file(keywords):
    for f in files:
        if any(k in f.lower() for k in keywords):
            return f
    return None

aziz = find_file(['aziz'])
reyya = find_file(['reyya', 'hatice'])
zeynep = find_file(['zeynep', 'rana'])

# Bulunamazsa siraya gore al
if not aziz: aziz = files[0]
if not reyya: reyya = files[1] if len(files) > 1 else files[0]
if not zeynep: zeynep = files[2] if len(files) > 2 else files[0]

print("Eslestirme:")
print("  Aziz Demir:", aziz)
print("  Hatice Reyya Demir:", reyya)
print("  Zeynep Rana Bayraktar:", zeynep)

# Path: team/ veya images/team/
rel_team = 'team' if 'team' in team_dir and 'images' not in team_dir else 'images/team'
path_prefix = '/' + rel_team + '/'

# HTML dosyalarini guncelle
html_files = [
    os.path.join(base_dir, 'tr', 'index.html'),
    os.path.join(base_dir, 'en', 'index.html'),
    os.path.join(base_dir, 'fr', 'index.html'),
]

for html_path in html_files:
    if not os.path.exists(html_path):
        continue
    with open(html_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = re.sub(r'src="[^"]*aziz-demir[^"]*"', 
                     'src="' + path_prefix + aziz + '"', content, flags=re.I)
    content = re.sub(r'src="[^"]*hatice-reyya-demir[^"]*"', 
                     'src="' + path_prefix + reyya + '"', content, flags=re.I)
    content = re.sub(r'src="[^"]*zeynep-rana-bayraktar[^"]*"', 
                     'src="' + path_prefix + zeynep + '"', content, flags=re.I)
    
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Guncellendi:", html_path)

print("\nTAMAMLANDI! sunucu-baslat.bat ile sunucuyu baslatin.")
input("Cikmak icin Enter...")
