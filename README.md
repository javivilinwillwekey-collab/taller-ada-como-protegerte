# Taller ADA · Cómo protegerte

Recurso interactivo para una tutoría de 50 minutos en ESO. Diseñado para proyectar en una pantalla horizontal y manejar desde el ordenador del docente, con participación oral de la clase y una experiencia por parejas.

## Abrir el taller

**[Abrir el taller](https://javivilinwillwekey-collab.github.io/taller-ada-como-protegerte/)**

El alumnado y el profesorado no necesitan una cuenta para utilizarla.

También puede descargarse este repositorio y abrir `index.html` en un navegador actualizado, conservando la carpeta `recursos` junto a los archivos HTML, CSS y JavaScript.

## Preparar la sesión

- Imprimir al 100 % [las tiras de César](recursos/tiras-cesar.pdf): cuatro copias para treinta alumnos. Cada hoja contiene cuatro juegos de dos tiras, con los rótulos ORIGINAL y CIFRADO y sin más textos, con márgenes de 5 mm. Recortar y repartir un juego por pareja.
- Tener papel y lápiz para escribir los mensajes.
- Usar **Preparar taller** en la pantalla inicial y el guion **Cómo dirigirlo**, disponible en cada pantalla con sus tiempos orientativos.

## Recorrido

Contraseñas y laboratorio de ejemplos inventados → verificación en dos pasos y engaños → historia del cifrado, simulador César y práctica con tiras → cifrados actuales → prevención y recuperación → conexiones con flechas y cierre.

El analizador admite ejemplos ficticios escritos libremente. Su resultado es orientativo: no comprueba filtraciones ni certifica la seguridad de una contraseña. Nunca se deben introducir contraseñas reales.

César se adapta al alfabeto español con Ñ: HOLA → KRÑD con clave 3. Es un modelo histórico para aprender; no debe emplearse para proteger información real. El simulador admite claves 1–26 y las tiras impresas están preparadas para 1–5.

## Funcionamiento y fuentes

Web estática, sin cuentas, API, analíticas ni registro de respuestas en la aplicación. Las imágenes y bibliotecas se sirven desde el propio sitio. GitHub puede registrar información de las visitas como parte de su servicio de alojamiento.

El estimador utiliza [zxcvbn de Dropbox](https://github.com/dropbox/zxcvbn), versión 4.4.2, con su [licencia MIT](recursos/vendor/LICENCIA-zxcvbn.txt). Incluye un pequeño vocabulario contextual español. Las infografías son ilustraciones didácticas elaboradas con asistencia de IA y revisadas.

Fuentes: [CISA, contraseñas](https://www.cisa.gov/sites/default/files/2024-09/Secure-Our-World-Passwords-Tip-Sheet.pdf), [NIST SP 800-63B-4](https://pages.nist.gov/800-63-4/sp800-63b.html), [FTC, verificación en dos pasos](https://consumer.ftc.gov/articles/use-two-factor-authentication-protect-your-accounts), [Suetonio, Julio César 56.6](https://lexundria.com/suet_jul/56.6/r), [MDN, TLS](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Transport_Layer_Security), [INCIBE, copias de seguridad](https://www.incibe.es/sites/default/files/contenidos/guias/guia-copias-de-seguridad.pdf).

## Mantenimiento

Los archivos editables son `index.html`, `estilo.css`, `app.js` y `cesar.js`. La configuración de Pages sirve la raíz de la rama `main`. Las actualizaciones conservan la misma dirección web.
