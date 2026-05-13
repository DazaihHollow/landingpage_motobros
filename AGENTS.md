# AGENTS.md - Landing Page MotoBros

## Proyecto
Landing page corporativa para empresa de motos "MotoBros". Estilo moderno y vanguardista.

## Restricciones Técnicas (CRÍTICO)
- **0 dependencias externas** - No NPM, no CDN, no frameworks
- Solo: HTML5, CSS3, Vanilla JS
- No Bootstrap, Tailwind, jQuery, ni librerías externas

## Estructura de Archivos
```
/proyecto
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── assets/
    └── (imágenes locales)
```

## Secciones Requeridas (en orden)
1. **Header**: Navbar con logo a la izquierda, botones CTA a la derecha para scroll a otras secciones
2. **Hero**: Título breve (beneficio claro) + Subtítulo complementario
3. **Carrusel**: Imágenes del producto/empresa
4. **CTA Principal**: Botón contrastante que scrollee a catálogo/productos
5. **Marcas**: Sección de marcas aliadas o a la venta
6. **Beneficios**: 3 columnas con tarjeta (icono + título + descripción). Enfoque problema/solución
7. **Características**: Bloques alternados texto/imagen. Bullet points para escaneo visual
8. **Nosotros**: Imagen + texto institucional (identidad de la empresa)
9. **Testimonios**: Citas de clientes satisfechos
10. **FAQ**: Acordeones (soporte, devoluciones, requisitos técnicos)
11. **Contacto**: Formulario + links a redes sociales
12. **Footer**: Legal (privacidad, términos) + Copyright

## Detalles de Implementación
- **Mobile-first**: Diseño responsive, estructura para celular
- **Documentación**: Español (comentarios, textos, nombres de clases)
- **Estilo**: Moderno y vanguardista - evitar lo genérico
- **Navegación**: Los CTA del header deben hacer scroll suave a las secciones

## Preguntas para el usuario antes de comenzar
1. ¿Tienes imágenes/logo de la marca o debo usar placeholders?
2. ¿Cuál es el nombre/texto del negocio (para el headline)?
3. ¿Qué coloresdefine la marca? (para estilos CSS)
4. ¿Qué información va en la sección "Nosotros"?
5. ¿Cuáles son las 3 marcas aliadas a mostrar?
6. ¿Tienes testimonios reales o debo crear ejemplos?
7. ¿Qué preguntas frecuentes debo incluir?
8. ¿Links a qué redes sociales?
9. ¿El formulario es solovisual o necesita funcionalidar de envío?
10. ¿Hay políticas de privacidad y términos reales o genero plantillas?