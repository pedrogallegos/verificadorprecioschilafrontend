# 🔑 VARIABLES DE ENTORNO PARA RAILWAY

## 📋 **CONFIGURACIÓN PASO A PASO**

### **🚂 1. PARA EL FRONTEND**

#### **Variables requeridas en Railway:**

```
VITE_API_URL
```

#### **Valores según el entorno:**

##### **🔧 Desarrollo Local:**
```
VITE_API_URL=http://localhost:4000/api
```

##### **🌐 Producción (Railway):**
```
VITE_API_URL=https://TU-BACKEND-URL.up.railway.app/api
```

---

### **🗄️ 2. PARA EL BACKEND** (Proyecto separado)

#### **Variables requeridas en Railway:**

```
MONGODB_URI
PORT
NODE_ENV
```

#### **Valores recomendados:**

```bash
# Base de datos MongoDB (requerido)
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/verificador_precios

# Puerto (Railway lo maneja automáticamente, pero puedes especificar)
PORT=4000

# Entorno de producción
NODE_ENV=production
```

---

## 🔗 **FLUJO DE CONFIGURACIÓN RECOMENDADO**

### **Orden de deployment:**

1. **🗄️ BACKEND PRIMERO**
   ```
   1. Subir backend a GitHub
   2. Crear proyecto en Railway
   3. Configurar variables de entorno del backend
   4. Desplegar backend
   5. Obtener URL del backend (ej: https://backend-abc123.up.railway.app)
   ```

2. **🎨 FRONTEND DESPUÉS**
   ```
   1. Usar la URL del backend en VITE_API_URL
   2. Subir frontend a GitHub
   3. Crear proyecto en Railway
   4. Configurar VITE_API_URL con la URL real del backend
   5. Desplegar frontend
   ```

---

## 📝 **TEMPLATE DE VARIABLES**

### **Frontend Railway Config:**
```
Nombre: VITE_API_URL
Valor:  https://[BACKEND-URL].up.railway.app/api
```

### **Backend Railway Config:**
```
Nombre: MONGODB_URI
Valor:  mongodb+srv://[usuario]:[password]@[cluster].mongodb.net/verificador_precios

Nombre: PORT  
Valor:  4000

Nombre: NODE_ENV
Valor:  production
```

---

## ⚠️ **IMPORTANTE**

1. **🔒 NUNCA** publiques las variables reales en GitHub
2. **✅ USA** las variables de entorno de Railway para valores sensibles
3. **🔄 REDEPLOYA** después de cambiar variables de entorno
4. **🧪 PRUEBA** la conexión después del deployment

---

## 🐛 **TROUBLESHOOTING**

### **❌ Error común: "Cannot connect to API"**
**Solución:** Verifica que `VITE_API_URL` apunte a la URL correcta del backend

### **❌ Error: "CORS error"**  
**Solución:** Asegúrate de que el backend tenga CORS configurado para la URL del frontend

### **❌ Error: "MongoDB connection failed"**
**Solución:** Verifica que `MONGODB_URI` sea correcta y la IP esté whitelisted en MongoDB Atlas

---

## ✅ **VERIFICACIÓN FINAL**

Una vez configurado, verifica:

1. **Frontend carga** → URL del frontend funciona
2. **API responde** → `https://backend-url/api/productos` devuelve datos
3. **CRUD funciona** → Puedes crear/editar/eliminar productos
4. **Base de datos conecta** → Los datos se guardan correctamente

¡Tu aplicación estará completamente funcional! 🚀
