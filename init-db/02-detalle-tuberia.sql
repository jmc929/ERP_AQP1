-- Crear la tabla detalle_tuberia que no existe en cloud_backup.sql
-- pero sí está definida en el schema de Prisma y es usada por el backend

CREATE TABLE IF NOT EXISTS public.detalle_tuberia (
    id_detalle_tuberia SERIAL PRIMARY KEY,
    diametro_manguera character varying(255),
    pn_manguera character varying(255),
    calibre_manguera character varying(255),
    presion_manguera character varying(255),
    id_producto_tuberia integer,
    CONSTRAINT tuberia FOREIGN KEY (id_producto_tuberia)
        REFERENCES public.producto (id_producto)
        ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE INDEX IF NOT EXISTS fki_m ON public.detalle_tuberia (id_producto_tuberia);

-- Verificar que se creó correctamente
DO $$
BEGIN
    RAISE NOTICE 'Tabla detalle_tuberia creada/verificada exitosamente';
END $$;
