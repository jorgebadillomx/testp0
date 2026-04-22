# Notas para entrevistadores

## Bugs sembrados intencionalmente

1. `POST /api/quotes` responde `200` en vez de `201`.
2. La API permite `age < 0`.
3. La API acepta `zipCode` vacío o espacios.
4. `GET /api/products` tiene una latencia artificial de ~4 segundos.
5. Login inválido muestra el mensaje incorrecto: `Usuario creado exitosamente`.
6. Después de crear una cotización, la tabla no refresca automáticamente.
7. El test UI inicial usa `waitForTimeout(5000)`.
8. Los tests iniciales cubren happy path de forma muy superficial.
