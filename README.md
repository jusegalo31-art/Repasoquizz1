# ¡EVALUACIÓN FINAL DE INFORMÁTICA! 🚀💻
### Evaluación interactiva con voz para estudiantes de 1° de primaria (5 a 7 años)
**Colegio México • Primer Periodo • Evaluación Final de Informática**

Plataforma de evaluación web inspirada en Quizizz y Kahoot, diseñada especialmente para niños que están en proceso de aprendizaje de la lectura.

---

## 🌟 Características Principales

1. **Voz y Narración Inteligente (Acento Colombiano Natural y Humano)**:
   - Voz con acento colombiano natural, cálido, expresivo y con entonación maternal de profesora infantil para niños de 5 a 7 años.
   - **ElevenLabs con Ajustes Naturales**: Modelo `eleven_multilingual_v2` afinado con estabilidad de `0.40` y estilo de `0.45` para lograr inflexiones humanas auténticas, entonación alegre y pausas naturales de respiración (voz por defecto: `cgSgspJ2msm6clMCkdW9` - Profe Sofia).
   - **Motor de Respaldo Neuronal**: Si no hay clave de ElevenLabs, prioriza voces neuronales colombianas (*Microsoft Salome Online Natural - Colombia* en Edge/Windows) y ajusta velocidad (`0.94`) y tono (`1.04`) para un sonido 100% natural y no sintético.
   - **Expresiones colombianas de aliento**: *"¡Pilas pues!", "¡Ojo al dato!", "¡Qué pilo eres!", "¡Lo hiciste de maravilla!", "¡Tranquilo mi corazón, de los errores también aprendemos!"*.

2. **Diseño de Videojuego Educativo Infantil**:
   - Personaje animado **"Tito el Robot"**: mueve la boca al hablar (lip-sync), pestañea, celebra con estrellas al acertar y da ánimo con el pulgar arriba si se equivoca.
   - **Tarjetas táctiles 3D** en colores Azul, Amarillo y Rojo, con esquinas redondeadas y botones amplios.
   - **Ilustraciones vectoriales claras y amigables** para cada una de las 75 opciones (25 preguntas × 3 opciones), permitiendo presentar la evaluación 100% de manera visual y auditiva.
   - Efectos de sonido sintetizados con **Web Audio API** (sin dependencias de archivos externos que puedan fallar en red escolar).
   - Animación de confeti y celebración.
   - **Retroalimentación no punitiva**: Sin cruces rojas agresivas ni sonidos desagradables.

3. **25 Preguntas de Evaluación Final**:
   - Concepto de computador y máquina de tareas.
   - Dispositivos que también son computadores (celular inteligente, tablet y computador portátil).
   - Partes del computador (monitor, torre/CPU, teclado, ratón).
   - Función de parlantes y cámara web.
   - Letras y números del teclado.
   - Teclas especiales (Barra espaciadora, Enter y Borrar/Backspace).
   - Ratón: puntero/flechita, clic simple, doble clic y arrastrar.
   - Usos de la tecnología (aprender, escribir, dibujar, escuchar música, jugar y comunicarnos por videollamada).
   - **Distribución perfectamente balanceada**: 8 Azul, 8 Amarillo y 9 Rojo distribuidas de forma equitativa en las 3 posiciones.

4. **Sistema de Calificación Oficial (Escala 0 a 10) y Límite de 2 Intentos**:
   - **Máximo 2 intentos por estudiante**: El sistema verifica el nombre del estudiante y permite presentar la evaluación un máximo de 2 veces, conservando su mejor nota definitiva.
   - Fórmula: `Calificación = (Respuestas correctas / 25) × 10` (redondeada a un decimal).
   - Aprobación: **6.0 o superior = APROBADO 🏆**. Menor a 6.0 = **DEBE SEGUIR PRACTICANDO 💡**.
   - Contador de intentos y registro de mejor calificación histórica por estudiante persistido en `localStorage`.

---

## 🚀 Cómo Ejecutar la Aplicación

### Opción 1: Modo Producción (Recomendado para clases y estudiantes)
```bash
# Iniciar el servidor unificado (sirve la web y la API de voz en http://localhost:3001)
npm start
```
Abre tu navegador en: **`http://localhost:3001`**

### Opción 2: Modo Desarrollo
```bash
# Terminal 1: Iniciar el backend
npm run server

# Terminal 2: Iniciar Vite con recarga rápida
npm run dev
```

---

## 🎙️ Configuración de ElevenLabs

Puedes configurar la clave API de dos formas:

1. **Desde la Interfaz Gráfica (Fácil para docentes)**:
   - Haz clic en el botón **"Docente / Voz"** en la esquina superior derecha de la pantalla de inicio.
   - Pega tu clave de API de ElevenLabs (`xi-api-key`) y selecciona la voz recomendada (*Lily - Profe Sofia*, *Sarah*, o *Laura*).
   - Haz clic en **"Guardar Configuración"** y prueba la voz con el botón **"Probar voz"**.

2. **Mediante archivo `.env`**:
   Edita el archivo `.env` en la raíz del proyecto:
   ```env
   ELEVENLABS_API_KEY=tu_clave_aqui
   ELEVENLABS_VOICE_ID=pFZP5JQG7iQjIQuC4Bku
   ELEVENLABS_MODEL_ID=eleven_multilingual_v2
   PORT=3001
   ```

> **Nota**: Si no configuras ninguna clave de ElevenLabs, ¡la aplicación sigue funcionando al 100%! Activa automáticamente el motor Web Speech en español neutro/colombiano.

---

## 📱 Compatibilidad
- **Celulares**: Interfaz vertical adaptada con botones gigantes y sin desplazamientos horizontales.
- **Tablets / iPads**: Cuadrícula de 3 columnas de opciones con gran área táctil.
- **Computadores**: Pantalla completa interactiva con soporte de teclado y ratón.

