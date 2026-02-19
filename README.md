# Rena Hukuk / Rena Law Web Sitesi

## Yerel Sunucu ile Çalıştırma

Siteyi düzgün görüntülemek için (fotoğraflar, bayraklar vb.) bir yerel sunucu kullanmanız önerilir. Aşağıdaki yöntemlerden birini kullanabilirsiniz:

### Yöntem 1: Node.js (npx serve)
Node.js kuruluysa:
```bash
npx serve .
```
Tarayıcıda `http://localhost:3000` adresine gidin.

### Yöntem 2: Python
Python kuruluysa:
```bash
# Python 3
python -m http.server 8080
```
Tarayıcıda `http://localhost:8080` adresine gidin.

### Yöntem 3: VS Code Live Server
1. VS Code'da "Live Server" uzantısını yükleyin
2. `index.html` dosyasına sağ tıklayın
3. "Open with Live Server" seçin

### Yöntem 4: PHP
PHP kuruluysa:
```bash
php -S localhost:8000
```
Tarayıcıda `http://localhost:8000` adresine gidin.

---

**Not:** `index.html` dosyasını doğrudan (çift tıklayarak) açmak bazı tarayıcılarda güvenlik kısıtlamaları nedeniyle sorunlara yol açabilir. Bu nedenle yerel sunucu kullanmanız önerilir.
