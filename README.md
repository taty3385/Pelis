# 🎬 Películas App

Una aplicación web moderna y responsiva para explorar películas, construida con React y Material-UI. Permite a los usuarios descubrir películas populares, buscar títulos específicos, ver detalles completos y gestionar una lista de favoritos.

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4.10-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Material-UI](https://img.shields.io/badge/Material--UI-6.1.6-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)

## ✨ Características

### 🎯 **Funcionalidades Principales**
- **Exploración de Películas**: Navega por categorías como populares, mejor valoradas y próximos estrenos
- **Búsqueda Avanzada**: Encuentra películas por título con resultados en tiempo real
- **Detalles Completos**: Información detallada incluyendo sinopsis, reparto, valoraciones y tráilers
- **Sistema de Favoritos**: Guarda y gestiona tus películas favoritas con persistencia local
- **Navegación Intuitiva**: Acceso directo desde favoritos a detalles de películas

### 📱 **Diseño Responsivo**
- **Mobile First**: Optimizado para dispositivos móviles
- **Breakpoints Personalizados**: Adaptación perfecta en todos los tamaños de pantalla
- **Interface Moderna**: Diseño limpio y atractivo con Material-UI
- **Carruseles Interactivos**: Navegación fluida con Swiper.js

### ⚡ **Rendimiento**
- **Carga Rápida**: Optimización con Vite para builds ultrarrápidos
- **Gestión de Estados**: Context API para manejo eficiente del estado global
- **Lazy Loading**: Carga optimizada de imágenes
- **Fallbacks Inteligentes**: Imágenes de respaldo para mejor experiencia de usuario

## 🚀 Demo en Vivo

🌐 **[Ver Aplicación](https://pelis-taty3385.vercel.app)** - Desplegada en Vercel

## 🛠️ Tecnologías Utilizadas

### **Frontend Core**
- **React 18.3.1** - Biblioteca de interfaces de usuario
- **React Router DOM 6.28.0** - Enrutamiento del lado del cliente
- **Vite 5.4.10** - Herramienta de construcción ultrarrápida

### **UI/UX**
- **Material-UI 6.1.6** - Componentes de interfaz de usuario
- **Emotion** - Librería de CSS-in-JS
- **Styled Components** - Estilos personalizados
- **Swiper.js 11.1.14** - Carruseles y sliders modernos

### **HTTP & APIs**
- **Axios 1.7.7** - Cliente HTTP para llamadas a la API
- **The Movie Database (TMDB) API** - Fuente de datos de películas

### **Desarrollo y Calidad**
- **ESLint** - Linter para calidad de código
- **Git** - Control de versiones
- **Vercel** - Plataforma de despliegue

## 📁 Estructura del Proyecto

```
peliculas/
├── public/
│   ├── Pochoclos.png          # Logo de la aplicación
│   ├── vite.svg               # Ícono de Vite
│   └── _redirects             # Configuración para routing
├── src/
│   ├── Components/
│   │   ├── CarrucelMovie.jsx  # Carrusel de películas
│   │   ├── CarrucelPlay.jsx   # Carrusel de reproducción
│   │   ├── Category.jsx       # Vista de categorías
│   │   ├── ModalComponent.jsx # Modal reutilizable
│   │   ├── movieCard.jsx      # Tarjeta de película
│   │   └── Nabvar.jsx         # Barra de navegación
│   ├── Context/
│   │   └── favoritos.jsx      # Context para favoritos
│   ├── Hooks/
│   │   └── useMovie.js        # Hook personalizado para películas
│   ├── Views/
│   │   ├── Detalle.jsx        # Vista de detalles de película
│   │   ├── Home.jsx           # Página principal
│   │   └── Search.jsx         # Vista de búsqueda
│   ├── assets/
│   │   ├── img-no-disponible.jpg # Imagen de fallback
│   │   └── react.svg          # Logo de React
│   ├── style/
│   │   └── Search.style.js    # Estilos para búsqueda
│   ├── App.jsx                # Componente principal
│   ├── App.css                # Estilos globales
│   ├── main.jsx               # Punto de entrada
│   └── index.css              # Estilos base
├── .env                       # Variables de entorno
├── vercel.json                # Configuración de Vercel
├── vite.config.js             # Configuración de Vite
└── package.json               # Dependencias y scripts
```

## 🔧 Instalación y Configuración

### **Prerrequisitos**
- Node.js 16+ y npm
- Una cuenta en [The Movie Database (TMDB)](https://www.themoviedb.org/settings/api)

### **1. Clonar el Repositorio**
```bash
git clone https://github.com/taty3385/Pelis.git
cd Pelis
```

### **2. Instalar Dependencias**
```bash
npm install
```

### **3. Configurar Variables de Entorno**
Crea un archivo `.env` en la raíz del proyecto:
```env
VITE_API_KEY="tu_api_key_de_tmdb_aqui"
```

### **4. Ejecutar en Desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### **5. Construir para Producción**
```bash
npm run build
```

### **6. Vista Previa de Producción**
```bash
npm run preview
```

## 🌟 Características Técnicas

### **Gestión de Estado**
- **Context API** para estado global de favoritos
- **localStorage** para persistencia de datos
- **Custom Hooks** para lógica reutilizable

### **Enrutamiento**
- **React Router** con enrutamiento del lado del cliente
- **Parámetros dinámicos** para detalles de películas
- **Navegación programática** entre vistas

### **Responsive Design**
- **Breakpoints personalizados** para diferentes dispositivos
- **Grid system** de Material-UI
- **Flexbox** para layouts flexibles

### **Optimizaciones**
- **Code splitting** automático con Vite
- **Lazy loading** de componentes
- **Fallback de imágenes** para mejor UX

## 🎨 Funcionalidades Destacadas

### **Sistema de Favoritos**
- ❤️ Agregar/quitar películas de favoritos
- 💾 Persistencia en localStorage
- 🗑️ Eliminación desde modal de favoritos
- 🔄 Sincronización en tiempo real

### **Búsqueda Inteligente**
- 🔍 Búsqueda en tiempo real
- 📱 Resultados responsivos
- ⚡ Interfaz optimizada

### **Navegación Fluida**
- 🎯 Navegación directa desde favoritos
- 🔗 URLs amigables para compartir
- ↩️ Historial de navegación

## 🚀 Despliegue

### **Vercel (Recomendado)**
La aplicación está configurada para despliegue automático en Vercel:

1. Fork este repositorio
2. Conecta tu cuenta de Vercel con GitHub
3. Importa el proyecto en Vercel
4. Configura la variable de entorno `VITE_API_KEY`
5. ¡Deploy automático en cada push!

### **Otras Plataformas**
También compatible con:
- Netlify
- GitHub Pages
- Firebase Hosting

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Si quieres contribuir:

1. **Fork** el proyecto
2. **Crea** una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abre** un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Autor

**Tamara** - [@taty3385](https://github.com/taty3385)

## 🙏 Agradecimientos

- [The Movie Database (TMDB)](https://www.themoviedb.org/) por la API
- [Material-UI](https://mui.com/) por los componentes
- [Swiper.js](https://swiperjs.com/) por los carruseles
- [Vite](https://vitejs.dev/) por la herramienta de construcción

---

⭐ **¡Dale una estrella al proyecto si te gustó!** ⭐
