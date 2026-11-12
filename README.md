# SYX Tienda Online — Primera versión funcional

## Qué incluye

- Tienda pública responsive, logo escrito en Calistoga y texto secundario en Montserrat.
- Categorías de SYX, televisores nuevos/outlet, filtros por pulgadas, controles por tipo y búsqueda por marca/código.
- Fichas con precios de lista y efectivo, consultas y carrito por WhatsApp 11 3843-7425.
- Página de servicio técnico.
- Admin con Firebase Authentication, Firestore y controles de acceso, edición de productos e importación CSV.
- Imágenes locales en `public/assets/`. **No usa Cloud Storage y no requiere Blaze** para esta arquitectura dentro de las cuotas gratuitas de Spark.

## Requisitos en Windows

1. Instalar Node.js LTS si no está instalado.
2. Abrir una terminal dentro de la carpeta `syx-tienda-online`.
3. Ejecutar `npm install` y después `npm run dev`.
4. Abrir la URL local que aparezca (habitualmente http://localhost:5173).
5. Para publicar, instalar CLI: `npm install -g firebase-tools`, ejecutar `firebase login`, y después `npm run deploy`.

## ¡Importante! Primer administrador

1. En Firebase Console > Authentication > Users, crear un usuario de **correo y contraseña**.
2. Copiar el UID de ese usuario.
3. En Firestore Console, crear colección `admins`, documento cuyo ID sea exactamente ese UID, con campos: `active` (boolean) `true`, `role` (string) `owner`.
4. Abrir `/admin` e iniciar sesión con el correo y contraseña que configuraste.
5. La colección `admins` está protegida para que el público no pueda autoasignarse permisos. El primer documento se crea desde la consola de Firebase.
6. Publicar las reglas con `npm run deploy` **antes de permitir el uso público**.

## Imágenes en assets

Guardar cada control como `public/assets/controles/LCD-520.webp`, `TV-181.webp`, etc. Para otros productos, crear carpetas por categoría. La ruta del documento es `/assets/controles/LCD-520.webp`. Requiere volver a publicar Hosting al agregar imágenes; no al editar precios en Firestore.

## Importación de controles

Ingresar a Admin > Productos > Importar CSV. Archivo delimitado por coma o punto y coma con columnas:

`sku;nombre;categoria;tipo;marcas;efectivo;lista;imagen;publicacion`

- `marcas` usa `|` para separar múltiples marcas.
- `tipo` usa uno de: `tube`, `smart`, `voice`, `air`, `deco`, `bluray`, `audio`, `home`, `projector`, `car`.
- `categoria` para controles es `remotes`.
- Al omitir precios se aplican tarifas por código: TV/LCD/SIN/OR/AUD/HOM/BLU/PRO/CAR 14k efectivo y 18k lista; AR 16k y 20k; IRF/RF 26k y 30k.
- Al omitir imagen se utiliza `/assets/controles/<sku>.webp`.
- Evitar la importación de CSV de procedencia desconocida; revisá siempre los datos antes de cargar.

Hay un archivo `plantilla_importacion_controles.csv` con **12 controles de muestra** verificados como códigos y marcas en el catálogo PDF. No significa que sea el catálogo completo ni que haya stock disponible. Pueden importarse para probar la tienda.

## Observaciones y límites de esta versión

- No se ha hecho el despliegue en tu cuenta ni creado tu primer administrador (requiere tus acciones en Firebase).
- La pantalla principal muestra productos desde Firestore; antes de importar los primeros productos, se verá vacía, no datos inventados.
- No se han incorporado todas las imágenes ni el catálogo completo de 51 páginas; eso requiere una revisión de recortes y códigos.
- El admin tiene edición individual y CSV; quedan para la siguiente etapa la edición global de tarifas, banners editables, historial de auditoría y edición de datos comerciales.
- Búsqueda actual sobre los primeros 500 productos publicados; para catálogos muy grandes hay que incorporar un motor de búsqueda indexado y paginación real de Firestore. La UI ya pagina los resultados visuales, pero eso no equivale a paginación de base de datos.
- El campo `cost` y los datos internos sensibles deben almacenarse aparte, con reglas más restrictivas; esta primera versión **no almacena costos**, para evitar exponerlos junto a productos públicos.
- Para mayor seguridad, evaluaremos validación de esquemas en reglas y permisos diferenciados de editor/owner antes de permitir múltiples administradores.
