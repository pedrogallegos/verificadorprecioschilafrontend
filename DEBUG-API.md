# 🔧 TEST DE CONEXIÓN AL BACKEND

## ✅ Verifica que el backend funciona:
Abre en tu navegador:
```
https://verificador-precios-next-backend-production.up.railway.app/api/productos
```

## ✅ Variable de entorno correcta para Railway:
```
VITE_API_URL=https://verificador-precios-next-backend-production.up.railway.app/api
```

## ✅ URLs completas que se formarán:
- GET productos: https://verificador-precios-next-backend-production.up.railway.app/api/productos
- POST producto: https://verificador-precios-next-backend-production.up.railway.app/api/productos
- GET búsqueda: https://verificador-precios-next-backend-production.up.railway.app/api/productos/search

## 🐛 Si sigue fallando:
1. Verifica que el backend esté corriendo
2. Verifica que no tenga problemas de CORS
3. Revisa los logs del backend en Railway
