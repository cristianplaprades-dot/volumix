# Plan — Retomar MVP de validación de demanda (Volumix)

Continuar la transformación de TechReserve Club en plataforma MVP para medir demanda real, sin cobros ni ventas simuladas. Se retoma desde la estructura de base de datos ya creada.

## Alcance de esta fase

1. **Campaña piloto pública**
   - Ruta: `/validacion/unitree-go2-pro`
   - Badge "CAMPAÑA EN VALIDACIÓN" y disclaimer de precios orientativos.
   - Producto: Unitree Go2 Pro, categoría Robótica, mercado España.
   - Precios: referencia ≈ 3.995 €, objetivo colectivo 3.500–3.700 €, ahorro potencial hasta ≈ 500 €.
   - Estado: "Midiendo demanda".
   - Texto visible explicando que se reúnen compradores para negociar con proveedores.

2. **CTA y formulario de interés**
   - Botón principal: "ME INTERESA — SIN COMPROMISO".
   - Formulario: nombre, email, país, código postal, unidades, rango de precio máximo aceptado.
   - Checkbox "Avísame cuando se consiga un precio definitivo".
   - Consentimiento de privacidad.
   - Validación de email y prevención de duplicados por campaña.
   - Mensaje post-registro: "Ya formas parte del grupo de compradores interesados. No has realizado ninguna compra ni adquirido ningún compromiso de pago. Te avisaremos cuando tengamos una oferta negociada."

3. **Contador de demanda real**
   - Mostrar X / 25 interesados con barra visual.
   - Mensaje dinámico: "Faltan N compradores para alcanzar nuestro primer objetivo de negociación."
   - Datos 100 % reales de la base de datos; 0 si no hay registros.

4. **Efecto viral**
   - Tras registrarse, mostrar "INVITA A OTROS COMPRADORES".
   - Compartir por WhatsApp, Telegram, email y copiar enlace.
   - Texto sugerido incluye Unitree Go2 Pro y la posibilidad de negociar mejor precio.

5. **Panel de administración**
   - Ruta privada `/admin` con autenticación y rol admin.
   - Sección "VALIDACIÓN DE DEMANDA".
   - Métricas: visitantes, interesados, conversión visita→interesado, unidades potenciales, precio máximo medio, distribución por rangos de precio, países, códigos postales, fechas de registro, fuentes de tráfico, referidos.
   - Tabla completa de interesados.
   - Embudo: VISITA → VER PRODUCTO → ME INTERESA → FORMULARIO COMPLETADO → INTERESADO VALIDADO → COMPARTIR CAMPAÑA.
   - Exportar datos a CSV.

6. **Integración con la web existente**
   - Mantener diseño, navegación y funcionalidades actuales.
   - Reemplazar CTAs de compra directa por "Me interesa — sin compromiso" donde corresponda.
   - No activar cobros, depósitos, wallet, compra automática ni pedidos a proveedores.

## Fuera de alcance

- Cobros, depósitos, wallet, compra automática, pedidos a proveedores.
- Stripe no se usa en esta campaña aunque la infraestructura exista.

## Entregable

Un MVP funcional en el proyecto actual: campaña pública de validación, formulario real, contador real, invitación viral y panel admin con exportación CSV, verificado en móvil y escritorio.

