# 🚀 **GUÍA DE DEPLOYMENT EN RAILWAY**

## 📋 **PREPARACIÓN PREVIA**

### ✅ **Frontend (Este proyecto)**
- ✅ Build configurado y funcionando
- ✅ Variables de entorno preparadas
- ✅ Railway.json configurado
- ✅ Vite optimizado para producción

### ⚙️ **Backend (Separado)**
- ⚠️ **IMPORTANTE**: El backend debe deployarse por separado
- 📍 **Ubicación**: `../backend-verificador-precios-chila/`

---

## 🔧 **DEPLOYMENT DEL FRONTEND**

### **1. 📤 Subir a GitHub** (Requerido para Railway)
```bash
# En la carpeta del frontend
git init
git add .
git commit -m "Initial commit - Frontend Verificador Precios"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/frontend-verificador-precios.git
git push -u origin main
```

### **2. 🚂 Railway Deployment**
1. Ve a [Railway.app](https://railway.app)
2. Conecta tu cuenta de GitHub
3. Selecciona "New Project"
4. Elige "Deploy from GitHub repo"
5. Selecciona el repositorio del frontend
6. Railway detectará automáticamente que es un proyecto Vite

### **3. ⚙️ Variables de Entorno en Railway**
Configura esta variable en Railway:
```
VITE_API_URL=https://tu-backend-url.railway.app/api
```

### **4. 🔧 Configuración Automática**
Railway usará estos archivos automáticamente:
- `package.json` → Detecta dependencias
- `railway.json` → Configuración de deployment
- `vite.config.ts` → Build optimizado

---

## 🗄️ **DEPLOYMENT DEL BACKEND** (Por separado)

### **1. 📤 Subir Backend a GitHub**
```bash
# En la carpeta del backend
cd ../backend-verificador-precios-chila
git init
git add .
git commit -m "Initial commit - Backend Verificador Precios"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/backend-verificador-precios.git
git push -u origin main
```

### **2. 🚂 Deploy Backend en Railway**
1. Crea OTRO proyecto en Railway
2. Conecta el repositorio del backend
3. Configura variables de entorno:
   ```
   MONGODB_URI=tu_mongodb_connection_string
   PORT=4000
   NODE_ENV=production
   ```

### **3. 🔗 Obtener URL del Backend**
Railway te dará una URL como:
```
https://backend-verificador-precios-production.up.railway.app
```

### **4. 🔄 Actualizar Frontend**
Actualiza la variable `VITE_API_URL` en Railway con la URL del backend.

---

## 🌐 **ALTERNATIVAS DE DEPLOYMENT**

### **Frontend:**
- ✅ **Railway** (Recomendado)
- ✅ **Vercel** - Para proyectos React
- ✅ **Netlify** - Incluye redirects
- ✅ **GitHub Pages** - Gratis para repos públicos

### **Backend:**
- ✅ **Railway** (Recomendado)
- ✅ **Render** - Plan gratuito disponible
- ✅ **Heroku** - Clásico para Node.js
- ✅ **DigitalOcean** - App Platform

---

## 🔍 **VERIFICACIÓN POST-DEPLOYMENT**

### **✅ Checklist Final:**
- [ ] Frontend desplegado y funcionando
- [ ] Backend desplegado y funcionando
- [ ] Variables de entorno configuradas
- [ ] Conexión a MongoDB funcionando
- [ ] API endpoints respondiendo
- [ ] CORS configurado correctamente
- [ ] CRUD de productos funcionando

### **🐛 Troubleshooting Común:**
1. **Error de CORS**: Verifica que el backend tenga CORS habilitado
2. **API no responde**: Verifica la URL en `VITE_API_URL`
3. **Base de datos**: Verifica `MONGODB_URI` en el backend
4. **Build falla**: Ejecuta `npm run build` localmente primero

---

## 🎉 **¡LISTO!**

Una vez completados estos pasos, tendrás:
- 🌐 **Frontend** funcionando en Railway
- 🗄️ **Backend** funcionando en Railway  
- 💾 **Base de datos** MongoDB conectada
- 🔗 **Comunicación** entre frontend y backend
- 📱 **Aplicación completa** lista para usar

### **📱 URLs Finales:**
- **Frontend**: `https://tu-frontend.railway.app`
- **Backend**: `https://tu-backend.railway.app`
- **API**: `https://tu-backend.railway.app/api/productos`

¡Tu Verificador de Precios estará online y funcionando! 🚀
