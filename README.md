# Volumix — copia para continuar en Bolt

Código recuperado de Group Collective (Lovable), con una campaña piloto de validación del Unitree Go2 Pro. No se procesan pagos ni pedidos.

Comprobado: TypeScript sin errores, compilación de cliente y servidor, arranque de la versión compilada y respuesta HTTP 200 en la portada y la campaña piloto con la base de datos existente. No se han enviado registros de prueba. El acceso real al panel queda pendiente de crear la cuenta del propietario y asignar su rol.

## Desarrollo

1. Instala Node.js 22 o superior y ejecuta `npm install`.
2. Copia `.env.example` a `.env`. Configura la URL y la clave publicable de Supabase en las variables de servidor y en las variables `VITE_`.
3. Ejecuta `npm run dev`.

La copia local conserva un `.env` configurado; este archivo no debe subirse a GitHub. No se necesita una clave `service_role` para el formulario público ni para el panel con sesión autenticada.

## Importación a Bolt desde GitHub

Sube el contenido de esta carpeta a la raíz de un repositorio privado. Excluye `.env`, `node_modules` y archivos de compilación. En la página inicial de Bolt, abre GitHub, conecta tu cuenta, selecciona el repositorio y pulsa `Choose this repository`. Configura las variables de entorno antes de ejecutar la aplicación.

Guía oficial: https://support.bolt.new/integrations/lovable-import

## Pantallas

- `/`: web existente y acceso a la campaña piloto.
- `/validacion/unitree-go2-pro`: contador real, formulario sin compromiso y enlaces de invitación.
- `/auth`: acceso con una cuenta Supabase existente.
- `/admin`: métricas y exportación CSV; requiere el rol `admin` en `user_roles`.

La base de datos existente permanece en Lovable Cloud / Supabase. Subir el código a GitHub no migra esa base de datos. El proyecto no tenía usuarios ni administradores en la comprobación inicial: se debe crear la cuenta del propietario y asignar su rol desde la consola de administración antes de usar el panel.

La imagen original `src/assets/hero.jpg` no pudo recuperarse como binario mediante el conector. Se sustituyó por una fotografía genérica para evitar una importación rota.

El plan original de desarrollo se conserva en `.lovable/plan/`. La migración SQL inicial se conserva en `supabase/migrations/`; no la ejecutes otra vez sobre la base ya creada.

## Prompt para seguir en Bolt

> Continúa este proyecto Volumix sin reconstruirlo. Conserva el diseño existente y la campaña `/validacion/unitree-go2-pro`. Comprueba primero las variables de Supabase y la compilación. Mantén los registros reales, el contador y la protección del panel por rol admin. No actives cobros, pedidos ni suscripciones. Revisa la privacidad y completa la configuración de la cuenta del propietario antes de publicar.
