--
-- PostgreSQL database dump
--

-- \restrict M7CURbdxdUaUzry42CfolQhDLCIm7jeFVqJkmzvL3MipeG091ORJZ4vASK4eX85

-- Dumped from database version 15.15 (Debian 15.15-1.pgdg13+1)
-- Dumped by pg_dump version 18.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: arl; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.arl (
    id_arl integer NOT NULL,
    nombre character varying(150)
);


ALTER TABLE public.arl OWNER TO postgres;

--
-- Name: TABLE arl; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.arl IS 'aqui van las arl que tengan';


--
-- Name: arl_id_arl_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.arl_id_arl_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.arl_id_arl_seq OWNER TO postgres;

--
-- Name: arl_id_arl_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.arl_id_arl_seq OWNED BY public.arl.id_arl;


--
-- Name: bodegas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bodegas (
    id_bodega integer NOT NULL,
    nombre character varying(200),
    id_estado integer
);


ALTER TABLE public.bodegas OWNER TO postgres;

--
-- Name: bodegas_id_bodega_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bodegas_id_bodega_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bodegas_id_bodega_seq OWNER TO postgres;

--
-- Name: bodegas_id_bodega_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bodegas_id_bodega_seq OWNED BY public.bodegas.id_bodega;


--
-- Name: caja_compensacion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.caja_compensacion (
    id_caja_compensacion integer NOT NULL,
    nombre character varying(150)
);


ALTER TABLE public.caja_compensacion OWNER TO postgres;

--
-- Name: TABLE caja_compensacion; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.caja_compensacion IS 'van las entidades de caja de compesacion ';


--
-- Name: caja_compensacion_id_caja_compensacion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.caja_compensacion_id_caja_compensacion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.caja_compensacion_id_caja_compensacion_seq OWNER TO postgres;

--
-- Name: caja_compensacion_id_caja_compensacion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.caja_compensacion_id_caja_compensacion_seq OWNED BY public.caja_compensacion.id_caja_compensacion;


--
-- Name: cajas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cajas (
    id_caja integer NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion text,
    saldo_actual numeric(15,2) DEFAULT 0.00 NOT NULL,
    id_estado integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.cajas OWNER TO postgres;

--
-- Name: TABLE cajas; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.cajas IS 'Cajas registradoras o puntos de venta';


--
-- Name: COLUMN cajas.saldo_actual; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.cajas.saldo_actual IS 'Saldo actual de la caja en el momento';


--
-- Name: cajas_id_caja_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cajas_id_caja_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cajas_id_caja_seq OWNER TO postgres;

--
-- Name: cajas_id_caja_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cajas_id_caja_seq OWNED BY public.cajas.id_caja;


--
-- Name: ciudad; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ciudad (
    id_ciudad integer NOT NULL,
    nombre character varying(150)
);


ALTER TABLE public.ciudad OWNER TO postgres;

--
-- Name: ciudad_id_ciudad_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ciudad_id_ciudad_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ciudad_id_ciudad_seq OWNER TO postgres;

--
-- Name: ciudad_id_ciudad_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ciudad_id_ciudad_seq OWNED BY public.ciudad.id_ciudad;


--
-- Name: clientes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clientes (
    id_cliente integer NOT NULL,
    id_tipo_entidad integer,
    id_tipo_identificacion integer,
    identificacion character varying(70),
    dv integer,
    telefono character varying(70),
    razon_social character varying(300),
    nombre_comercial character varying(300),
    id_ciudad integer,
    direccion character varying(300),
    nombre_contacto character varying(300),
    apellido_contacto character varying(300),
    correo_electronico character varying(300),
    id_tipo_regimen_iva integer,
    id_responsabilidad_fiscal integer,
    id_estado integer DEFAULT 1
);


ALTER TABLE public.clientes OWNER TO postgres;

--
-- Name: clientes_id_cliente_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.clientes_id_cliente_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.clientes_id_cliente_seq OWNER TO postgres;

--
-- Name: clientes_id_cliente_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.clientes_id_cliente_seq OWNED BY public.clientes.id_cliente;


--
-- Name: detalle_deducciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.detalle_deducciones (
    id_detalle_deducciones integer NOT NULL,
    id_nomina integer NOT NULL,
    id_tipo_deduccion integer NOT NULL,
    valor_deduccion numeric(12,2) DEFAULT 0 NOT NULL,
    observaciones text
);


ALTER TABLE public.detalle_deducciones OWNER TO postgres;

--
-- Name: TABLE detalle_deducciones; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.detalle_deducciones IS 'Detalle de deducciones por nómina: un renglón por cada tipo de deducción';


--
-- Name: COLUMN detalle_deducciones.valor_deduccion; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.detalle_deducciones.valor_deduccion IS 'Valor de la deducción aplicada';


--
-- Name: detalle_deducciones_id_detalle_deducciones_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.detalle_deducciones_id_detalle_deducciones_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.detalle_deducciones_id_detalle_deducciones_seq OWNER TO postgres;

--
-- Name: detalle_deducciones_id_detalle_deducciones_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.detalle_deducciones_id_detalle_deducciones_seq OWNED BY public.detalle_deducciones.id_detalle_deducciones;


--
-- Name: detalle_dotacion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.detalle_dotacion (
    detalle_dotacion integer NOT NULL,
    id_entregas_dotacion integer,
    id_tipo_prendas integer,
    cantidad integer,
    talla_entregada character varying(50)
);


ALTER TABLE public.detalle_dotacion OWNER TO postgres;

--
-- Name: detalle_dotacion_detalle_dotacion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.detalle_dotacion_detalle_dotacion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.detalle_dotacion_detalle_dotacion_seq OWNER TO postgres;

--
-- Name: detalle_dotacion_detalle_dotacion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.detalle_dotacion_detalle_dotacion_seq OWNED BY public.detalle_dotacion.detalle_dotacion;


--
-- Name: detalle_factura; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.detalle_factura (
    id_detalle_factura integer NOT NULL,
    id_factura integer,
    id_producto integer,
    cantidad numeric(12,2),
    precio_unitario numeric(12,2),
    descuento numeric(12,2),
    subtotal numeric(12,2),
    id_iva integer,
    iva_valor numeric(12,2),
    id_retefuente integer,
    retefuente_valor numeric(12,2),
    valor_total numeric(12,2),
    porcentaje_descuento numeric(5,2) DEFAULT 0,
    costo_unitario_con_impuesto numeric(12,2)
);


ALTER TABLE public.detalle_factura OWNER TO postgres;

--
-- Name: detalle_factura_id_detalle_factura_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.detalle_factura_id_detalle_factura_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.detalle_factura_id_detalle_factura_seq OWNER TO postgres;

--
-- Name: detalle_factura_id_detalle_factura_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.detalle_factura_id_detalle_factura_seq OWNED BY public.detalle_factura.id_detalle_factura;


--
-- Name: detalle_nomina; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.detalle_nomina (
    id_detalle_nomina integer NOT NULL,
    id_nomina integer NOT NULL,
    id_tipo_hora integer NOT NULL,
    valor_hora numeric(12,2) NOT NULL,
    cantidad_horas numeric(12,2) DEFAULT 0 NOT NULL,
    total numeric(12,2) DEFAULT 0 NOT NULL
);


ALTER TABLE public.detalle_nomina OWNER TO postgres;

--
-- Name: TABLE detalle_nomina; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.detalle_nomina IS 'Detalle de nómina: un renglón por cada tipo de hora de una misma nómina';


--
-- Name: COLUMN detalle_nomina.valor_hora; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.detalle_nomina.valor_hora IS 'Valor de la hora al momento de crear la nómina (valor histórico)';


--
-- Name: COLUMN detalle_nomina.total; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.detalle_nomina.total IS 'Total calculado: cantidad_horas * valor_hora';


--
-- Name: detalle_nomina_id_detalle_nomina_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.detalle_nomina_id_detalle_nomina_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.detalle_nomina_id_detalle_nomina_seq OWNER TO postgres;

--
-- Name: detalle_nomina_id_detalle_nomina_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.detalle_nomina_id_detalle_nomina_seq OWNED BY public.detalle_nomina.id_detalle_nomina;


--
-- Name: detalle_salida; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.detalle_salida (
    id_detalle_salida integer NOT NULL,
    id_salida integer,
    id_producto integer,
    cantidad numeric(12,2),
    precio_unitario numeric(12,2),
    descuento numeric(12,2),
    subtotal numeric(12,2),
    id_iva integer,
    iva_valor numeric(12,2),
    id_retefuente integer,
    retefuente_valor numeric(12,2),
    valor_total numeric(12,2),
    precio_unitario_con_impuesto numeric(18,2) DEFAULT 0
);


ALTER TABLE public.detalle_salida OWNER TO postgres;

--
-- Name: COLUMN detalle_salida.precio_unitario_con_impuesto; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.detalle_salida.precio_unitario_con_impuesto IS 'Precio unitario con IVA incluido. Se calcula como: (subtotal + iva_valor) / cantidad';


--
-- Name: detalle_salida_id_detalle_salida_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.detalle_salida_id_detalle_salida_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.detalle_salida_id_detalle_salida_seq OWNER TO postgres;

--
-- Name: detalle_salida_id_detalle_salida_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.detalle_salida_id_detalle_salida_seq OWNED BY public.detalle_salida.id_detalle_salida;


--
-- Name: entregas_dotaciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.entregas_dotaciones (
    id_entregas_dotaciones integer NOT NULL,
    id_usuarios integer,
    fecha_entrega date,
    foto_acta text
);


ALTER TABLE public.entregas_dotaciones OWNER TO postgres;

--
-- Name: entregas_dotaciones_id_entregas_dotaciones_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.entregas_dotaciones_id_entregas_dotaciones_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.entregas_dotaciones_id_entregas_dotaciones_seq OWNER TO postgres;

--
-- Name: entregas_dotaciones_id_entregas_dotaciones_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.entregas_dotaciones_id_entregas_dotaciones_seq OWNED BY public.entregas_dotaciones.id_entregas_dotaciones;


--
-- Name: eps; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.eps (
    id_eps integer NOT NULL,
    nombre character varying(150)
);


ALTER TABLE public.eps OWNER TO postgres;

--
-- Name: TABLE eps; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.eps IS 'aqui va las eps, el nombre, sura y asi ';


--
-- Name: eps_id_eps_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.eps_id_eps_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.eps_id_eps_seq OWNER TO postgres;

--
-- Name: eps_id_eps_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.eps_id_eps_seq OWNED BY public.eps.id_eps;


--
-- Name: estado; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.estado (
    id_estado integer NOT NULL,
    nombre character varying(120),
    modulo character varying(200),
    color character varying(150),
    descripcion text
);


ALTER TABLE public.estado OWNER TO postgres;

--
-- Name: estado_civil; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.estado_civil (
    id_estado_civil integer NOT NULL,
    nombre character varying(150)
);


ALTER TABLE public.estado_civil OWNER TO postgres;

--
-- Name: TABLE estado_civil; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.estado_civil IS 'si esta soltero, casado, union libre y toda la movie
';


--
-- Name: estado_civil_id_estado_civil_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.estado_civil_id_estado_civil_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.estado_civil_id_estado_civil_seq OWNER TO postgres;

--
-- Name: estado_civil_id_estado_civil_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.estado_civil_id_estado_civil_seq OWNED BY public.estado_civil.id_estado_civil;


--
-- Name: estado_id_estado_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.estado_id_estado_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.estado_id_estado_seq OWNER TO postgres;

--
-- Name: estado_id_estado_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.estado_id_estado_seq OWNED BY public.estado.id_estado;


--
-- Name: facturas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.facturas (
    id_facturas integer NOT NULL,
    id_usuarios integer,
    fecha_creacion date,
    id_proveedor integer,
    numero_factura_proveedor character varying(50),
    total_subtotal numeric(12,2),
    total_descuento numeric(12,2),
    total_iva numeric(12,2),
    total_retencion numeric(12,2),
    total_factura numeric(12,2),
    id_estado integer,
    observaciones text
);


ALTER TABLE public.facturas OWNER TO postgres;

--
-- Name: facturas_id_facturas_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.facturas_id_facturas_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.facturas_id_facturas_seq OWNER TO postgres;

--
-- Name: facturas_id_facturas_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.facturas_id_facturas_seq OWNED BY public.facturas.id_facturas;


--
-- Name: familia_producto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.familia_producto (
    id_familia_producto integer NOT NULL,
    nombre character varying(150)
);


ALTER TABLE public.familia_producto OWNER TO postgres;

--
-- Name: familia_producto_id_familia_producto_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.familia_producto_id_familia_producto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.familia_producto_id_familia_producto_seq OWNER TO postgres;

--
-- Name: familia_producto_id_familia_producto_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.familia_producto_id_familia_producto_seq OWNED BY public.familia_producto.id_familia_producto;


--
-- Name: fondo_pensiones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fondo_pensiones (
    id_fondo_pensiones integer NOT NULL,
    nombre character varying(150)
);


ALTER TABLE public.fondo_pensiones OWNER TO postgres;

--
-- Name: TABLE fondo_pensiones; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.fondo_pensiones IS 'aqui van las entidades de fondo de pension';


--
-- Name: fondo_pensiones_id_fondo_pensiones_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.fondo_pensiones_id_fondo_pensiones_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.fondo_pensiones_id_fondo_pensiones_seq OWNER TO postgres;

--
-- Name: fondo_pensiones_id_fondo_pensiones_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.fondo_pensiones_id_fondo_pensiones_seq OWNED BY public.fondo_pensiones.id_fondo_pensiones;


--
-- Name: grupos_productos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.grupos_productos (
    id_grupos_productos integer NOT NULL,
    nombre character varying(200)
);


ALTER TABLE public.grupos_productos OWNER TO postgres;

--
-- Name: grupos_productos_id_grupos_productos_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.grupos_productos_id_grupos_productos_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.grupos_productos_id_grupos_productos_seq OWNER TO postgres;

--
-- Name: grupos_productos_id_grupos_productos_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.grupos_productos_id_grupos_productos_seq OWNED BY public.grupos_productos.id_grupos_productos;


--
-- Name: inventario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inventario (
    id_inventario integer NOT NULL,
    id_bodega integer,
    id_producto integer,
    id_proveedor integer,
    fecha_ingreso date,
    id_factura integer,
    cantidad_lote numeric(12,2),
    costo_producto numeric(12,2),
    id_traslado integer
);


ALTER TABLE public.inventario OWNER TO postgres;

--
-- Name: inventario_id_inventario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inventario_id_inventario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.inventario_id_inventario_seq OWNER TO postgres;

--
-- Name: inventario_id_inventario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inventario_id_inventario_seq OWNED BY public.inventario.id_inventario;


--
-- Name: ivas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ivas (
    id_iva integer NOT NULL,
    nombre character varying(200),
    valor numeric(12,2)
);


ALTER TABLE public.ivas OWNER TO postgres;

--
-- Name: ivas_id_iva_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ivas_id_iva_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ivas_id_iva_seq OWNER TO postgres;

--
-- Name: ivas_id_iva_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ivas_id_iva_seq OWNED BY public.ivas.id_iva;


--
-- Name: maquinas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.maquinas (
    id_maquina integer NOT NULL,
    id_tipo_maquina integer,
    nombre character varying(255),
    observaciones text
);


ALTER TABLE public.maquinas OWNER TO postgres;

--
-- Name: TABLE maquinas; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.maquinas IS 'Máquinas individuales: pele, aglu, extru1, extru2, extru3, extru4, extru5';


--
-- Name: maquinas_id_maquina_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.maquinas_id_maquina_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.maquinas_id_maquina_seq OWNER TO postgres;

--
-- Name: maquinas_id_maquina_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.maquinas_id_maquina_seq OWNED BY public.maquinas.id_maquina;


--
-- Name: medida; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.medida (
    id_medida integer NOT NULL,
    nombre character varying(100)
);


ALTER TABLE public.medida OWNER TO postgres;

--
-- Name: medida_id_medida_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.medida_id_medida_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.medida_id_medida_seq OWNER TO postgres;

--
-- Name: medida_id_medida_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.medida_id_medida_seq OWNED BY public.medida.id_medida;


--
-- Name: movimiento_caja; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movimiento_caja (
    id_movimiento_caja integer NOT NULL,
    id_caja integer NOT NULL,
    id_tipo_movimiento integer NOT NULL,
    monto numeric(15,2) NOT NULL,
    descripcion text,
    fecha_hora timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    id_usuario integer NOT NULL,
    observaciones text,
    id_estado integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_movimiento_caja_monto_positivo CHECK ((monto > (0)::numeric))
);


ALTER TABLE public.movimiento_caja OWNER TO postgres;

--
-- Name: TABLE movimiento_caja; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.movimiento_caja IS 'Registro de movimientos de dinero en las cajas';


--
-- Name: COLUMN movimiento_caja.monto; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.movimiento_caja.monto IS 'Monto del movimiento (siempre positivo)';


--
-- Name: COLUMN movimiento_caja.fecha_hora; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.movimiento_caja.fecha_hora IS 'Fecha y hora del movimiento';


--
-- Name: movimiento_caja_id_movimiento_caja_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.movimiento_caja_id_movimiento_caja_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.movimiento_caja_id_movimiento_caja_seq OWNER TO postgres;

--
-- Name: movimiento_caja_id_movimiento_caja_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.movimiento_caja_id_movimiento_caja_seq OWNED BY public.movimiento_caja.id_movimiento_caja;


--
-- Name: movimientos_kardex; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movimientos_kardex (
    id_movimientos integer NOT NULL,
    id_bodega integer,
    id_producto integer,
    tipo_movimiento character varying(70),
    tipo_flujo character varying(50),
    cantidad numeric(12,2),
    costo_unitario numeric(12,2),
    costo_total_movimiento numeric(12,2),
    "fecha " timestamp without time zone
);


ALTER TABLE public.movimientos_kardex OWNER TO postgres;

--
-- Name: movimientos_kardex_id_movimientos_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.movimientos_kardex_id_movimientos_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.movimientos_kardex_id_movimientos_seq OWNER TO postgres;

--
-- Name: movimientos_kardex_id_movimientos_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.movimientos_kardex_id_movimientos_seq OWNED BY public.movimientos_kardex.id_movimientos;


--
-- Name: nomina; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.nomina (
    id_nomina integer NOT NULL,
    id_usuario_trabajador integer NOT NULL,
    total_bruto_nomina numeric(12,2) DEFAULT 0 NOT NULL,
    periodo_inicio date NOT NULL,
    periodo_fin date NOT NULL,
    fecha_nomina date NOT NULL,
    id_estado integer DEFAULT 1,
    id_usuario_creador integer,
    total_deducciones numeric(12,2) DEFAULT 0 NOT NULL,
    total_pagar numeric(12,2) DEFAULT 0 NOT NULL,
    observaciones text,
    fecha_creacion timestamp without time zone DEFAULT now(),
    valor_auxilio_transporte numeric(12,2) DEFAULT 0,
    dias_trabajados integer
);


ALTER TABLE public.nomina OWNER TO postgres;

--
-- Name: TABLE nomina; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.nomina IS 'Nómina principal por usuario trabajador y período';


--
-- Name: COLUMN nomina.total_bruto_nomina; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.nomina.total_bruto_nomina IS 'Total bruto antes de deducciones';


--
-- Name: COLUMN nomina.id_usuario_creador; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.nomina.id_usuario_creador IS 'ID del usuario que creó la nómina (el usuario logueado)';


--
-- Name: COLUMN nomina.total_deducciones; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.nomina.total_deducciones IS 'Suma total de todas las deducciones';


--
-- Name: COLUMN nomina.total_pagar; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.nomina.total_pagar IS 'Total a pagar: total_bruto_nomina - total_deducciones';


--
-- Name: COLUMN nomina.valor_auxilio_transporte; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.nomina.valor_auxilio_transporte IS 'Valor del auxilio de transporte para esta nómina';


--
-- Name: COLUMN nomina.dias_trabajados; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.nomina.dias_trabajados IS 'Número de días trabajados en el período de la nómina (ej: 5, 15, 30)';


--
-- Name: nomina_id_nomina_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.nomina_id_nomina_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.nomina_id_nomina_seq OWNER TO postgres;

--
-- Name: nomina_id_nomina_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.nomina_id_nomina_seq OWNED BY public.nomina.id_nomina;


--
-- Name: notas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notas (
    id_notas integer NOT NULL,
    titulo character varying(255) NOT NULL,
    nota text NOT NULL,
    id_usuario integer NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT now(),
    fecha_actualizacion timestamp without time zone DEFAULT now(),
    id_usuario_creador integer
);


ALTER TABLE public.notas OWNER TO postgres;

--
-- Name: COLUMN notas.id_usuario_creador; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.notas.id_usuario_creador IS 'ID del usuario que creó la nota (el usuario logueado al momento de crear)';


--
-- Name: notas_id_notas_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.notas_id_notas_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.notas_id_notas_seq OWNER TO postgres;

--
-- Name: notas_id_notas_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.notas_id_notas_seq OWNED BY public.notas.id_notas;


--
-- Name: produccion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.produccion (
    id_produccion integer NOT NULL,
    id_producto integer,
    id_maquina integer,
    id_usuario integer,
    id_turno integer,
    fecha_hora timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.produccion OWNER TO postgres;

--
-- Name: TABLE produccion; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.produccion IS 'Registro de producción con producto, máquina, usuario y turno';


--
-- Name: produccion_id_produccion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.produccion_id_produccion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.produccion_id_produccion_seq OWNER TO postgres;

--
-- Name: produccion_id_produccion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.produccion_id_produccion_seq OWNED BY public.produccion.id_produccion;


--
-- Name: produccion_medida; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.produccion_medida (
    id_produccion_medida integer NOT NULL,
    id_produccion integer,
    id_medida integer,
    cantidad numeric(12,2)
);


ALTER TABLE public.produccion_medida OWNER TO postgres;

--
-- Name: TABLE produccion_medida; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.produccion_medida IS 'Medidas de producción asociadas a cada registro de producción';


--
-- Name: produccion_medida_id_produccion_medida_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.produccion_medida_id_produccion_medida_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.produccion_medida_id_produccion_medida_seq OWNER TO postgres;

--
-- Name: produccion_medida_id_produccion_medida_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.produccion_medida_id_produccion_medida_seq OWNED BY public.produccion_medida.id_produccion_medida;


--
-- Name: producto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.producto (
    id_producto integer NOT NULL,
    codigo text,
    id_grupos_producto integer,
    nombre text,
    id_familia integer,
    existencia boolean,
    codigo_barras text,
    cantidad_total numeric(12,2),
    cantidad_minima numeric(12,2),
    cantidad_maxima numeric(12,2),
    id_estado integer,
    id_medida integer
);


ALTER TABLE public.producto OWNER TO postgres;

--
-- Name: producto_id_producto_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.producto_id_producto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.producto_id_producto_seq OWNER TO postgres;

--
-- Name: producto_id_producto_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.producto_id_producto_seq OWNED BY public.producto.id_producto;


--
-- Name: producto_x_proveedor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.producto_x_proveedor (
    id_producto_x_proveedor integer NOT NULL,
    id_producto integer,
    id_proveedor integer,
    costo numeric(12,2)
);


ALTER TABLE public.producto_x_proveedor OWNER TO postgres;

--
-- Name: producto_x_proveedor_id_producto_x_proveedor_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.producto_x_proveedor_id_producto_x_proveedor_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.producto_x_proveedor_id_producto_x_proveedor_seq OWNER TO postgres;

--
-- Name: producto_x_proveedor_id_producto_x_proveedor_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.producto_x_proveedor_id_producto_x_proveedor_seq OWNED BY public.producto_x_proveedor.id_producto_x_proveedor;


--
-- Name: proveedor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.proveedor (
    id_proveedor integer NOT NULL,
    id_tipo_entidad integer,
    id_tipo_identificacion integer,
    identificacion character varying(100),
    dv integer,
    telefono character varying(70),
    razon_social character varying(300),
    nombre_comercial character varying(300),
    id_ciudad integer,
    direccion character varying(300),
    nombre_contacto character varying(300),
    apellido_contacto character varying(300),
    correo_electronico character varying(300),
    id_tipo_regimen_iva integer,
    id_responsabilidad_fiscal integer,
    id_estado integer DEFAULT 1
);


ALTER TABLE public.proveedor OWNER TO postgres;

--
-- Name: proveedor_id_proveedor_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.proveedor_id_proveedor_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.proveedor_id_proveedor_seq OWNER TO postgres;

--
-- Name: proveedor_id_proveedor_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.proveedor_id_proveedor_seq OWNED BY public.proveedor.id_proveedor;


--
-- Name: responsabilidad_fiscal; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.responsabilidad_fiscal (
    id_responsabilidad_fiscal integer NOT NULL,
    nombre character varying(150),
    codigo character varying(20)
);


ALTER TABLE public.responsabilidad_fiscal OWNER TO postgres;

--
-- Name: responsabilidad_fiscal_id_responsabilidad_fiscal_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.responsabilidad_fiscal_id_responsabilidad_fiscal_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.responsabilidad_fiscal_id_responsabilidad_fiscal_seq OWNER TO postgres;

--
-- Name: responsabilidad_fiscal_id_responsabilidad_fiscal_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.responsabilidad_fiscal_id_responsabilidad_fiscal_seq OWNED BY public.responsabilidad_fiscal.id_responsabilidad_fiscal;


--
-- Name: retefuente; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.retefuente (
    id_retefuente integer NOT NULL,
    nombre character varying(150),
    valor numeric(12,2)
);


ALTER TABLE public.retefuente OWNER TO postgres;

--
-- Name: retefuente_id_retefuente_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.retefuente_id_retefuente_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.retefuente_id_retefuente_seq OWNER TO postgres;

--
-- Name: retefuente_id_retefuente_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.retefuente_id_retefuente_seq OWNED BY public.retefuente.id_retefuente;


--
-- Name: rol; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rol (
    id_rol integer NOT NULL,
    nombre character varying(150)
);


ALTER TABLE public.rol OWNER TO postgres;

--
-- Name: rol_id_rol_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rol_id_rol_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.rol_id_rol_seq OWNER TO postgres;

--
-- Name: rol_id_rol_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rol_id_rol_seq OWNED BY public.rol.id_rol;


--
-- Name: salidas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.salidas (
    id_salida integer NOT NULL,
    id_usuario integer,
    fecha_creacion date,
    id_cliente integer,
    total_subtotal numeric(12,2),
    total_descuento numeric(12,2),
    total_iva numeric(12,2),
    total_retencion numeric(12,2),
    total_factura numeric(12,2),
    observaciones text
);


ALTER TABLE public.salidas OWNER TO postgres;

--
-- Name: salidas_id_salida_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.salidas_id_salida_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.salidas_id_salida_seq OWNER TO postgres;

--
-- Name: salidas_id_salida_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.salidas_id_salida_seq OWNED BY public.salidas.id_salida;


--
-- Name: tallas_empleados; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tallas_empleados (
    id_tallas_empleados integer NOT NULL,
    id_usuarios integer,
    id_tipo_prendas integer,
    talla character varying(50)
);


ALTER TABLE public.tallas_empleados OWNER TO postgres;

--
-- Name: TABLE tallas_empleados; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.tallas_empleados IS 'aquí van las tablas por trabajador';


--
-- Name: tallas_empleados_id_tallas_empleados_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tallas_empleados_id_tallas_empleados_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tallas_empleados_id_tallas_empleados_seq OWNER TO postgres;

--
-- Name: tallas_empleados_id_tallas_empleados_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tallas_empleados_id_tallas_empleados_seq OWNED BY public.tallas_empleados.id_tallas_empleados;


--
-- Name: tareas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tareas (
    id_tareas integer NOT NULL,
    id_usuarios integer,
    descripcion text,
    fecha_asignacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    id_estado integer DEFAULT 1,
    id_usuario_creador integer
);


ALTER TABLE public.tareas OWNER TO postgres;

--
-- Name: COLUMN tareas.id_usuario_creador; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.tareas.id_usuario_creador IS 'ID del usuario que creó la tarea (el usuario logueado al momento de crear)';


--
-- Name: tareas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tareas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tareas_id_seq OWNER TO postgres;

--
-- Name: tareas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tareas_id_seq OWNED BY public.tareas.id_tareas;


--
-- Name: tipo_contrato; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipo_contrato (
    id_tipo_contrato integer NOT NULL,
    nombre character varying(150)
);


ALTER TABLE public.tipo_contrato OWNER TO postgres;

--
-- Name: TABLE tipo_contrato; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.tipo_contrato IS 'aqui va el tipo de contrato,, como termino indefinido y asi ';


--
-- Name: tipo_contrato_id_tipo_contrato_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tipo_contrato_id_tipo_contrato_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tipo_contrato_id_tipo_contrato_seq OWNER TO postgres;

--
-- Name: tipo_contrato_id_tipo_contrato_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tipo_contrato_id_tipo_contrato_seq OWNED BY public.tipo_contrato.id_tipo_contrato;


--
-- Name: tipo_deduccion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipo_deduccion (
    id_tipo_deduccion integer NOT NULL,
    nombre character varying(150) NOT NULL,
    descripcion text,
    id_estado integer DEFAULT 1
);


ALTER TABLE public.tipo_deduccion OWNER TO postgres;

--
-- Name: TABLE tipo_deduccion; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.tipo_deduccion IS 'Tipos de deducción: salud, pensión, retención en la fuente, préstamos, etc.';


--
-- Name: tipo_deduccion_id_tipo_deduccion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tipo_deduccion_id_tipo_deduccion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tipo_deduccion_id_tipo_deduccion_seq OWNER TO postgres;

--
-- Name: tipo_deduccion_id_tipo_deduccion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tipo_deduccion_id_tipo_deduccion_seq OWNED BY public.tipo_deduccion.id_tipo_deduccion;


--
-- Name: tipo_entidad; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipo_entidad (
    id_tipo_entidad integer NOT NULL,
    nombre character varying(120)
);


ALTER TABLE public.tipo_entidad OWNER TO postgres;

--
-- Name: tipo_entidad_id_tipo_entidad_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tipo_entidad_id_tipo_entidad_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tipo_entidad_id_tipo_entidad_seq OWNER TO postgres;

--
-- Name: tipo_entidad_id_tipo_entidad_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tipo_entidad_id_tipo_entidad_seq OWNED BY public.tipo_entidad.id_tipo_entidad;


--
-- Name: tipo_hora; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipo_hora (
    id_tipo_hora integer NOT NULL,
    nombre character varying(150) NOT NULL,
    horario character varying(200),
    recargo character varying(200),
    valor_hora numeric(12,2) DEFAULT 0 NOT NULL,
    id_estado integer DEFAULT 1
);


ALTER TABLE public.tipo_hora OWNER TO postgres;

--
-- Name: TABLE tipo_hora; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.tipo_hora IS 'Tipos de hora: normal, extra, nocturna, dominical, festivo, etc.';


--
-- Name: COLUMN tipo_hora.horario; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.tipo_hora.horario IS 'Horario al que aplica este tipo de hora';


--
-- Name: COLUMN tipo_hora.recargo; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.tipo_hora.recargo IS 'Tipo de recargo aplicado (ej: 25%, 35%, etc.)';


--
-- Name: tipo_hora_id_tipo_hora_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tipo_hora_id_tipo_hora_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tipo_hora_id_tipo_hora_seq OWNER TO postgres;

--
-- Name: tipo_hora_id_tipo_hora_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tipo_hora_id_tipo_hora_seq OWNED BY public.tipo_hora.id_tipo_hora;


--
-- Name: tipo_identificacion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipo_identificacion (
    id_tipo_identificacion integer NOT NULL,
    nombre character varying(150)
);


ALTER TABLE public.tipo_identificacion OWNER TO postgres;

--
-- Name: TABLE tipo_identificacion; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.tipo_identificacion IS 'aqui van los tipos de identificacion como cedula, tarjeta de idetidad, nit y asi ';


--
-- Name: tipo_identificacion_id_tipo_identificacion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tipo_identificacion_id_tipo_identificacion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tipo_identificacion_id_tipo_identificacion_seq OWNER TO postgres;

--
-- Name: tipo_identificacion_id_tipo_identificacion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tipo_identificacion_id_tipo_identificacion_seq OWNED BY public.tipo_identificacion.id_tipo_identificacion;


--
-- Name: tipo_maquina; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipo_maquina (
    id_tipo_maquina integer NOT NULL,
    nombre character varying(255),
    descripcion text
);


ALTER TABLE public.tipo_maquina OWNER TO postgres;

--
-- Name: TABLE tipo_maquina; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.tipo_maquina IS 'Tipos de máquinas: pele, aglu, extru, etc.';


--
-- Name: tipo_maquina_id_tipo_maquina_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tipo_maquina_id_tipo_maquina_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tipo_maquina_id_tipo_maquina_seq OWNER TO postgres;

--
-- Name: tipo_maquina_id_tipo_maquina_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tipo_maquina_id_tipo_maquina_seq OWNED BY public.tipo_maquina.id_tipo_maquina;


--
-- Name: tipo_movimiento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipo_movimiento (
    id_tipo_movimiento integer NOT NULL,
    nombre character varying(100) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.tipo_movimiento OWNER TO postgres;

--
-- Name: TABLE tipo_movimiento; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.tipo_movimiento IS 'Tipos de movimientos de caja (Ingresos/Egresos)';


--
-- Name: tipo_movimiento_id_tipo_movimiento_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tipo_movimiento_id_tipo_movimiento_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tipo_movimiento_id_tipo_movimiento_seq OWNER TO postgres;

--
-- Name: tipo_movimiento_id_tipo_movimiento_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tipo_movimiento_id_tipo_movimiento_seq OWNED BY public.tipo_movimiento.id_tipo_movimiento;


--
-- Name: tipo_prendas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipo_prendas (
    id_tipo_prendas integer NOT NULL,
    nombre character varying(100)
);


ALTER TABLE public.tipo_prendas OWNER TO postgres;

--
-- Name: TABLE tipo_prendas; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.tipo_prendas IS 'aqui van solo los tipos de prenda de las dotaciones';


--
-- Name: tipo_prendas_id_tipo_prendas_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tipo_prendas_id_tipo_prendas_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tipo_prendas_id_tipo_prendas_seq OWNER TO postgres;

--
-- Name: tipo_prendas_id_tipo_prendas_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tipo_prendas_id_tipo_prendas_seq OWNED BY public.tipo_prendas.id_tipo_prendas;


--
-- Name: tipo_regimen_iva; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipo_regimen_iva (
    id_regimen_iva integer NOT NULL,
    nombre character varying(200)
);


ALTER TABLE public.tipo_regimen_iva OWNER TO postgres;

--
-- Name: tipo_regimen_iva_id_regimen_iva_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tipo_regimen_iva_id_regimen_iva_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tipo_regimen_iva_id_regimen_iva_seq OWNER TO postgres;

--
-- Name: tipo_regimen_iva_id_regimen_iva_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tipo_regimen_iva_id_regimen_iva_seq OWNED BY public.tipo_regimen_iva.id_regimen_iva;


--
-- Name: traslados; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.traslados (
    id_traslado integer NOT NULL,
    fecha_traslado date DEFAULT CURRENT_DATE,
    id_usuario integer,
    bodega_origen_id integer,
    bodega_destino_id integer,
    observacion text
);


ALTER TABLE public.traslados OWNER TO postgres;

--
-- Name: traslados_id_traslado_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.traslados_id_traslado_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.traslados_id_traslado_seq OWNER TO postgres;

--
-- Name: traslados_id_traslado_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.traslados_id_traslado_seq OWNED BY public.traslados.id_traslado;


--
-- Name: turno; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.turno (
    id_turno integer NOT NULL,
    nombre character varying(255),
    horario character varying(255)
);


ALTER TABLE public.turno OWNER TO postgres;

--
-- Name: TABLE turno; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.turno IS 'Tabla para almacenar los turnos de trabajo y sus horarios';


--
-- Name: turno_id_turno_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.turno_id_turno_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.turno_id_turno_seq OWNER TO postgres;

--
-- Name: turno_id_turno_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.turno_id_turno_seq OWNED BY public.turno.id_turno;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id_usuarios integer NOT NULL,
    id_tipo_identificacion integer,
    documento character varying(150),
    nombre character varying(200),
    apellido character varying(200),
    dia_ingreso date,
    id_tipo_contrato integer,
    id_estado_civil integer,
    id_arl integer,
    arl_fecha_ingreso date,
    id_eps integer,
    eps_fecha_ingreso date,
    id_caja_compensacion integer,
    id_fondo_pensiones integer,
    induccion_sst boolean,
    induccion_puesto_trabajo boolean,
    afiliacion_a_beneficiarios boolean,
    nombre_contacto character varying(300),
    telefono_contacto character varying(200),
    direccion character varying,
    celular character varying(200),
    correo_electronico character varying(250),
    firma_reglamento_interno_trabajo boolean,
    firma_elementos_proteccion boolean,
    firma_contrato boolean,
    fecha_nacimiento date,
    password character varying(200),
    id_estado integer
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- Name: TABLE usuarios; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.usuarios IS 'va toda la informacion de los usuarios, todaaaa';


--
-- Name: usuarios_id_usuarios_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_usuarios_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_usuarios_seq OWNER TO postgres;

--
-- Name: usuarios_id_usuarios_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_usuarios_seq OWNED BY public.usuarios.id_usuarios;


--
-- Name: usuarios_x_rol; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios_x_rol (
    id_usuarios_x_rol integer NOT NULL,
    id_usuarios integer,
    id_rol integer
);


ALTER TABLE public.usuarios_x_rol OWNER TO postgres;

--
-- Name: usuarios_x_rol_id_usuarios_x_rol_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_x_rol_id_usuarios_x_rol_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_x_rol_id_usuarios_x_rol_seq OWNER TO postgres;

--
-- Name: usuarios_x_rol_id_usuarios_x_rol_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_x_rol_id_usuarios_x_rol_seq OWNED BY public.usuarios_x_rol.id_usuarios_x_rol;


--
-- Name: vacaciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vacaciones (
    id_vacaciones integer NOT NULL,
    id_usuarios integer,
    fecha_inicio date NOT NULL,
    fecha_fin date NOT NULL
);


ALTER TABLE public.vacaciones OWNER TO postgres;

--
-- Name: TABLE vacaciones; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.vacaciones IS 'aqui van las fechas desde y hasta de las vacaciones ';


--
-- Name: vacaciones_id_vacaciones_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.vacaciones_id_vacaciones_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.vacaciones_id_vacaciones_seq OWNER TO postgres;

--
-- Name: vacaciones_id_vacaciones_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.vacaciones_id_vacaciones_seq OWNED BY public.vacaciones.id_vacaciones;


--
-- Name: valor_auxilio_transporte; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.valor_auxilio_transporte (
    id integer NOT NULL,
    nombre character varying(150),
    valor numeric(12,2) DEFAULT 0 NOT NULL
);


ALTER TABLE public.valor_auxilio_transporte OWNER TO postgres;

--
-- Name: TABLE valor_auxilio_transporte; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.valor_auxilio_transporte IS 'Valor del auxilio de transporte (mensual o por vigencia). Se usa como referencia al crear nóminas.';


--
-- Name: COLUMN valor_auxilio_transporte.nombre; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.valor_auxilio_transporte.nombre IS 'Descripción o etiqueta (ej: Auxilio 2025, Vigente 2025)';


--
-- Name: COLUMN valor_auxilio_transporte.valor; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.valor_auxilio_transporte.valor IS 'Valor en pesos (mensual o el que se use como base)';


--
-- Name: valor_auxilio_transporte_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.valor_auxilio_transporte_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.valor_auxilio_transporte_id_seq OWNER TO postgres;

--
-- Name: valor_auxilio_transporte_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.valor_auxilio_transporte_id_seq OWNED BY public.valor_auxilio_transporte.id;


--
-- Name: arl id_arl; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.arl ALTER COLUMN id_arl SET DEFAULT nextval('public.arl_id_arl_seq'::regclass);


--
-- Name: bodegas id_bodega; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bodegas ALTER COLUMN id_bodega SET DEFAULT nextval('public.bodegas_id_bodega_seq'::regclass);


--
-- Name: caja_compensacion id_caja_compensacion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.caja_compensacion ALTER COLUMN id_caja_compensacion SET DEFAULT nextval('public.caja_compensacion_id_caja_compensacion_seq'::regclass);


--
-- Name: cajas id_caja; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cajas ALTER COLUMN id_caja SET DEFAULT nextval('public.cajas_id_caja_seq'::regclass);


--
-- Name: ciudad id_ciudad; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ciudad ALTER COLUMN id_ciudad SET DEFAULT nextval('public.ciudad_id_ciudad_seq'::regclass);


--
-- Name: clientes id_cliente; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes ALTER COLUMN id_cliente SET DEFAULT nextval('public.clientes_id_cliente_seq'::regclass);


--
-- Name: detalle_deducciones id_detalle_deducciones; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_deducciones ALTER COLUMN id_detalle_deducciones SET DEFAULT nextval('public.detalle_deducciones_id_detalle_deducciones_seq'::regclass);


--
-- Name: detalle_dotacion detalle_dotacion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_dotacion ALTER COLUMN detalle_dotacion SET DEFAULT nextval('public.detalle_dotacion_detalle_dotacion_seq'::regclass);


--
-- Name: detalle_factura id_detalle_factura; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_factura ALTER COLUMN id_detalle_factura SET DEFAULT nextval('public.detalle_factura_id_detalle_factura_seq'::regclass);


--
-- Name: detalle_nomina id_detalle_nomina; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_nomina ALTER COLUMN id_detalle_nomina SET DEFAULT nextval('public.detalle_nomina_id_detalle_nomina_seq'::regclass);


--
-- Name: detalle_salida id_detalle_salida; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_salida ALTER COLUMN id_detalle_salida SET DEFAULT nextval('public.detalle_salida_id_detalle_salida_seq'::regclass);


--
-- Name: entregas_dotaciones id_entregas_dotaciones; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.entregas_dotaciones ALTER COLUMN id_entregas_dotaciones SET DEFAULT nextval('public.entregas_dotaciones_id_entregas_dotaciones_seq'::regclass);


--
-- Name: eps id_eps; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.eps ALTER COLUMN id_eps SET DEFAULT nextval('public.eps_id_eps_seq'::regclass);


--
-- Name: estado id_estado; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estado ALTER COLUMN id_estado SET DEFAULT nextval('public.estado_id_estado_seq'::regclass);


--
-- Name: estado_civil id_estado_civil; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estado_civil ALTER COLUMN id_estado_civil SET DEFAULT nextval('public.estado_civil_id_estado_civil_seq'::regclass);


--
-- Name: facturas id_facturas; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.facturas ALTER COLUMN id_facturas SET DEFAULT nextval('public.facturas_id_facturas_seq'::regclass);


--
-- Name: familia_producto id_familia_producto; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.familia_producto ALTER COLUMN id_familia_producto SET DEFAULT nextval('public.familia_producto_id_familia_producto_seq'::regclass);


--
-- Name: fondo_pensiones id_fondo_pensiones; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fondo_pensiones ALTER COLUMN id_fondo_pensiones SET DEFAULT nextval('public.fondo_pensiones_id_fondo_pensiones_seq'::regclass);


--
-- Name: grupos_productos id_grupos_productos; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grupos_productos ALTER COLUMN id_grupos_productos SET DEFAULT nextval('public.grupos_productos_id_grupos_productos_seq'::regclass);


--
-- Name: inventario id_inventario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventario ALTER COLUMN id_inventario SET DEFAULT nextval('public.inventario_id_inventario_seq'::regclass);


--
-- Name: ivas id_iva; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ivas ALTER COLUMN id_iva SET DEFAULT nextval('public.ivas_id_iva_seq'::regclass);


--
-- Name: maquinas id_maquina; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.maquinas ALTER COLUMN id_maquina SET DEFAULT nextval('public.maquinas_id_maquina_seq'::regclass);


--
-- Name: medida id_medida; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medida ALTER COLUMN id_medida SET DEFAULT nextval('public.medida_id_medida_seq'::regclass);


--
-- Name: movimiento_caja id_movimiento_caja; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movimiento_caja ALTER COLUMN id_movimiento_caja SET DEFAULT nextval('public.movimiento_caja_id_movimiento_caja_seq'::regclass);


--
-- Name: movimientos_kardex id_movimientos; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movimientos_kardex ALTER COLUMN id_movimientos SET DEFAULT nextval('public.movimientos_kardex_id_movimientos_seq'::regclass);


--
-- Name: nomina id_nomina; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nomina ALTER COLUMN id_nomina SET DEFAULT nextval('public.nomina_id_nomina_seq'::regclass);


--
-- Name: notas id_notas; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notas ALTER COLUMN id_notas SET DEFAULT nextval('public.notas_id_notas_seq'::regclass);


--
-- Name: produccion id_produccion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produccion ALTER COLUMN id_produccion SET DEFAULT nextval('public.produccion_id_produccion_seq'::regclass);


--
-- Name: produccion_medida id_produccion_medida; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produccion_medida ALTER COLUMN id_produccion_medida SET DEFAULT nextval('public.produccion_medida_id_produccion_medida_seq'::regclass);


--
-- Name: producto id_producto; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producto ALTER COLUMN id_producto SET DEFAULT nextval('public.producto_id_producto_seq'::regclass);


--
-- Name: producto_x_proveedor id_producto_x_proveedor; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producto_x_proveedor ALTER COLUMN id_producto_x_proveedor SET DEFAULT nextval('public.producto_x_proveedor_id_producto_x_proveedor_seq'::regclass);


--
-- Name: proveedor id_proveedor; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proveedor ALTER COLUMN id_proveedor SET DEFAULT nextval('public.proveedor_id_proveedor_seq'::regclass);


--
-- Name: responsabilidad_fiscal id_responsabilidad_fiscal; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.responsabilidad_fiscal ALTER COLUMN id_responsabilidad_fiscal SET DEFAULT nextval('public.responsabilidad_fiscal_id_responsabilidad_fiscal_seq'::regclass);


--
-- Name: retefuente id_retefuente; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.retefuente ALTER COLUMN id_retefuente SET DEFAULT nextval('public.retefuente_id_retefuente_seq'::regclass);


--
-- Name: rol id_rol; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol ALTER COLUMN id_rol SET DEFAULT nextval('public.rol_id_rol_seq'::regclass);


--
-- Name: salidas id_salida; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.salidas ALTER COLUMN id_salida SET DEFAULT nextval('public.salidas_id_salida_seq'::regclass);


--
-- Name: tallas_empleados id_tallas_empleados; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tallas_empleados ALTER COLUMN id_tallas_empleados SET DEFAULT nextval('public.tallas_empleados_id_tallas_empleados_seq'::regclass);


--
-- Name: tareas id_tareas; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tareas ALTER COLUMN id_tareas SET DEFAULT nextval('public.tareas_id_seq'::regclass);


--
-- Name: tipo_contrato id_tipo_contrato; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_contrato ALTER COLUMN id_tipo_contrato SET DEFAULT nextval('public.tipo_contrato_id_tipo_contrato_seq'::regclass);


--
-- Name: tipo_deduccion id_tipo_deduccion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_deduccion ALTER COLUMN id_tipo_deduccion SET DEFAULT nextval('public.tipo_deduccion_id_tipo_deduccion_seq'::regclass);


--
-- Name: tipo_entidad id_tipo_entidad; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_entidad ALTER COLUMN id_tipo_entidad SET DEFAULT nextval('public.tipo_entidad_id_tipo_entidad_seq'::regclass);


--
-- Name: tipo_hora id_tipo_hora; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_hora ALTER COLUMN id_tipo_hora SET DEFAULT nextval('public.tipo_hora_id_tipo_hora_seq'::regclass);


--
-- Name: tipo_identificacion id_tipo_identificacion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_identificacion ALTER COLUMN id_tipo_identificacion SET DEFAULT nextval('public.tipo_identificacion_id_tipo_identificacion_seq'::regclass);


--
-- Name: tipo_maquina id_tipo_maquina; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_maquina ALTER COLUMN id_tipo_maquina SET DEFAULT nextval('public.tipo_maquina_id_tipo_maquina_seq'::regclass);


--
-- Name: tipo_movimiento id_tipo_movimiento; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_movimiento ALTER COLUMN id_tipo_movimiento SET DEFAULT nextval('public.tipo_movimiento_id_tipo_movimiento_seq'::regclass);


--
-- Name: tipo_prendas id_tipo_prendas; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_prendas ALTER COLUMN id_tipo_prendas SET DEFAULT nextval('public.tipo_prendas_id_tipo_prendas_seq'::regclass);


--
-- Name: tipo_regimen_iva id_regimen_iva; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_regimen_iva ALTER COLUMN id_regimen_iva SET DEFAULT nextval('public.tipo_regimen_iva_id_regimen_iva_seq'::regclass);


--
-- Name: traslados id_traslado; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.traslados ALTER COLUMN id_traslado SET DEFAULT nextval('public.traslados_id_traslado_seq'::regclass);


--
-- Name: turno id_turno; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.turno ALTER COLUMN id_turno SET DEFAULT nextval('public.turno_id_turno_seq'::regclass);


--
-- Name: usuarios id_usuarios; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id_usuarios SET DEFAULT nextval('public.usuarios_id_usuarios_seq'::regclass);


--
-- Name: usuarios_x_rol id_usuarios_x_rol; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios_x_rol ALTER COLUMN id_usuarios_x_rol SET DEFAULT nextval('public.usuarios_x_rol_id_usuarios_x_rol_seq'::regclass);


--
-- Name: vacaciones id_vacaciones; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vacaciones ALTER COLUMN id_vacaciones SET DEFAULT nextval('public.vacaciones_id_vacaciones_seq'::regclass);


--
-- Name: valor_auxilio_transporte id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.valor_auxilio_transporte ALTER COLUMN id SET DEFAULT nextval('public.valor_auxilio_transporte_id_seq'::regclass);


--
-- Data for Name: arl; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.arl (id_arl, nombre) FROM stdin;
1	Sura
2	No aplica (N/A)
\.


--
-- Data for Name: bodegas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bodegas (id_bodega, nombre, id_estado) FROM stdin;
1	Bodega Principal	1
2	Proyecto X	1
3	Proyecto Y	1
4	Sin Asignar	1
5	PRINCIPAL	1
6	CREIXER PEDRO BALLE	1
7	PROCOLHASS SAS	1
8	AGUACATES FLOREZ SAS	1
9	RINCCO	1
10	ESPERANZA HASS SAS	1
11	VALLE ALTO SAS FASE 2	1
12	AGROGANADOS LA COPA SAS	1
13	COLOMBIAN CITRUS SAS	1
14	MATERIA PRIMA Y EMPAQUE	1
15	BEMAT	1
16	PRINCIPE CONEJO	1
17	JORGE MADRID	1
18	LA MANSIÓN	1
19	GANADOS Y PORCINOS MORELIA	1
20	ALSEC OSMOSIS	1
21	LOS MANGOS	1
22	AGREGADOS	1
23	PORCINOS AGUA LINDA	1
24	LA MANSION FASE 2	1
25	DANIEL CAÑAS	1
26	GB SAHAGÚN PT BONITO	1
27	GB VALLEDUPAR CODAZZI	1
28	PEDRO PUELLO	1
29	COMBURED SINALOA	1
30	COMBURED PALMAR DE VARELA	1
31	CASAGRANDE	1
32	CANTABRIA	1
33	MASFINCA	1
34	COMBURED DESCANSO	1
35	SANTACRUZ	1
36	MONTEVERDE	1
37	CANTABRIA FASE2	1
38	GB LA ESTANCIA	1
\.


--
-- Data for Name: caja_compensacion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.caja_compensacion (id_caja_compensacion, nombre) FROM stdin;
1	Comfenalco
2	Comfama
3	No aplica (N/A)
\.


--
-- Data for Name: cajas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cajas (id_caja, nombre, descripcion, saldo_actual, id_estado, created_at, updated_at) FROM stdin;
1	Principal	Caja principal	951000.00	1	2026-02-14 17:01:52.907286	2026-02-14 17:01:52.907286
\.


--
-- Data for Name: ciudad; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ciudad (id_ciudad, nombre) FROM stdin;
1	Medellín - Antioquia
2	Abejorral - Antioquia
3	Abriaquí - Antioquia
4	Alejandría - Antioquia
5	Amagá - Antioquia
6	Amalfi - Antioquia
7	Andes - Antioquia
8	Angelópolis - Antioquia
9	Angostura - Antioquia
10	Anorí - Antioquia
11	Santa Fe de Antioquia - Antioquia
12	Anzá - Antioquia
13	Apartadó - Antioquia
14	Arboletes - Antioquia
15	Argelia - Antioquia
16	Armenia - Antioquia
17	Barbosa - Antioquia
18	Belmira - Antioquia
19	Bello - Antioquia
20	Betania - Antioquia
21	Betulia - Antioquia
22	Ciudad Bolívar - Antioquia
23	Briceño - Antioquia
24	Buriticá - Antioquia
25	Cáceres - Antioquia
26	Caicedo - Antioquia
27	Caldas - Antioquia
28	Campamento - Antioquia
29	Cañasgordas - Antioquia
30	Caracolí - Antioquia
31	Caramanta - Antioquia
32	Carepa - Antioquia
33	El Carmen de Viboral - Antioquia
34	Carolina del Príncipe - Antioquia
35	Caucasia - Antioquia
36	Chigorodó - Antioquia
37	Cisneros - Antioquia
38	Cocorná - Antioquia
39	Concepción - Antioquia
40	Concordia - Antioquia
41	Copacabana - Antioquia
42	Dabeiba - Antioquia
43	Donmatías - Antioquia
44	Ebéjico - Antioquia
45	El Bagre - Antioquia
46	Entrerríos - Antioquia
47	Envigado - Antioquia
48	Fredonia - Antioquia
49	Frontino - Antioquia
50	Giraldo - Antioquia
51	Girardota - Antioquia
52	Gómez Plata - Antioquia
53	Granada - Antioquia
54	Guadalupe - Antioquia
55	Guarne - Antioquia
56	Guatapé - Antioquia
57	Heliconia - Antioquia
58	Hispania - Antioquia
59	Itagüí - Antioquia
60	Ituango - Antioquia
61	Jardín - Antioquia
62	Jericó - Antioquia
63	La Ceja - Antioquia
64	La Estrella - Antioquia
65	La Pintada - Antioquia
66	La Unión - Antioquia
67	Liborina - Antioquia
68	Maceo - Antioquia
69	Marinilla - Antioquia
70	Montebello - Antioquia
71	Murindó - Antioquia
72	Mutatá - Antioquia
73	Nariño - Antioquia
74	Necoclí - Antioquia
75	Nechí - Antioquia
76	Olaya - Antioquia
77	Peque - Antioquia
78	Pueblorrico - Antioquia
79	Puerto Berrío - Antioquia
80	Puerto Nare - Antioquia
81	Puerto Triunfo - Antioquia
82	Remedios - Antioquia
83	El Retiro - Antioquia
84	Rionegro - Antioquia
85	Sabaneta - Antioquia
86	Salgar - Antioquia
87	San Andrés de Cuerquia - Antioquia
88	San Carlos - Antioquia
89	San Francisco - Antioquia
90	San Jerónimo - Antioquia
91	San José de la Montaña - Antioquia
92	San Juan de Urabá - Antioquia
93	San Luis - Antioquia
94	San Pedro de los Milagros - Antioquia
95	San Pedro de Urabá - Antioquia
96	San Rafael - Antioquia
97	San Roque - Antioquia
98	San Vicente Ferrer - Antioquia
99	Santa Bárbara - Antioquia
100	Santa Rosa de Osos - Antioquia
101	Santo Domingo - Antioquia
102	El Santuario - Antioquia
103	Segovia - Antioquia
104	Sonsón - Antioquia
105	Sopetrán - Antioquia
106	Támesis - Antioquia
107	Tarazá - Antioquia
108	Tarso - Antioquia
109	Titiribí - Antioquia
110	Toledo - Antioquia
111	Turbo - Antioquia
112	Uramita - Antioquia
113	Urrao - Antioquia
114	Valdivia - Antioquia
115	Valparaíso - Antioquia
116	Vegachí - Antioquia
117	Venecia - Antioquia
118	Vigía del Fuerte - Antioquia
119	Yalí - Antioquia
120	Yarumal - Antioquia
121	Yolombó - Antioquia
122	Yondó - Antioquia
123	Zaragoza - Antioquia
124	Bogotá D.C.
125	Soacha - Cundinamarca
126	Fusagasugá - Cundinamarca
127	Facatativá - Cundinamarca
128	Zipaquirá - Cundinamarca
129	Chía - Cundinamarca
130	Girardot - Cundinamarca
131	Mosquera - Cundinamarca
132	Madrid - Cundinamarca
133	Funza - Cundinamarca
134	Cajicá - Cundinamarca
135	Sibaté - Cundinamarca
136	Tocancipá - Cundinamarca
137	Tabio - Cundinamarca
138	Tenjo - Cundinamarca
139	Cota - Cundinamarca
140	Sopó - Cundinamarca
141	La Calera - Cundinamarca
142	Guaduas - Cundinamarca
143	Villeta - Cundinamarca
144	Cali - Valle del Cauca
145	Buenaventura - Valle del Cauca
146	Palmira - Valle del Cauca
147	Tuluá - Valle del Cauca
148	Yumbo - Valle del Cauca
149	Cartago - Valle del Cauca
150	Buga - Valle del Cauca
151	Jamundí - Valle del Cauca
152	Candelaria - Valle del Cauca
153	Florida - Valle del Cauca
154	El Cerrito - Valle del Cauca
155	Sevilla - Valle del Cauca
156	Zarzal - Valle del Cauca
157	Manizales - Caldas
158	La Dorada - Caldas
159	Chinchiná - Caldas
160	Villamaría - Caldas
161	Riosucio - Caldas
162	Pereira - Risaralda
163	Dosquebradas - Risaralda
164	Santa Rosa de Cabal - Risaralda
165	La Virginia - Risaralda
166	Armenia - Quindío
167	Calarcá - Quindío
168	Montenegro - Quindío
169	Quimbaya - Quindío
170	La Tebaida - Quindío
171	Bucaramanga - Santander
172	Floridablanca - Santander
173	Barrancabermeja - Santander
174	Girón - Santander
175	Piedecuesta - Santander
176	San Gil - Santander
177	Socorro - Santander
178	Vélez - Santander
179	Cúcuta - Norte de Santander
180	Ocaña - Norte de Santander
181	Villa del Rosario - Norte de Santander
182	Los Patios - Norte de Santander
183	Pamplona - Norte de Santander
184	Tibú - Norte de Santander
185	Barranquilla - Atlántico
186	Soledad - Atlántico
187	Malambo - Atlántico
188	Sabanalarga - Atlántico
189	Cartagena - Bolívar
190	Magangué - Bolívar
191	El Carmen de Bolívar - Bolívar
192	Turbaco - Bolívar
193	Santa Marta - Magdalena
194	Ciénaga - Magdalena
195	Fundación - Magdalena
196	Plato - Magdalena
197	Valledupar - Cesar
198	Aguachica - Cesar
199	Montería - Córdoba
200	Lorica - Córdoba
201	Sahagún - Córdoba
202	Cereté - Córdoba
203	Sincelejo - Sucre
204	Corozal - Sucre
205	Riohacha - La Guajira
206	Maicao - La Guajira
207	Ibagué - Tolima
208	Espinal - Tolima
209	Melgar - Tolima
210	Honda - Tolima
211	Neiva - Huila
212	Pitalito - Huila
213	Garzón - Huila
214	Villavicencio - Meta
215	Acacías - Meta
216	Granada - Meta
217	Pasto - Nariño
218	Tumaco - Nariño
219	Ipiales - Nariño
220	Popayán - Cauca
221	Santander de Quilichao - Cauca
222	Tunja - Boyacá
223	Sogamoso - Boyacá
224	Duitama - Boyacá
225	Chiquinquirá - Boyacá
226	Yopal - Casanare
227	Florencia - Caquetá
228	Quibdó - Chocó
229	Arauca - Arauca
230	San Andrés - Archipiélago
231	Mocoa - Putumayo
232	Leticia - Amazonas
\.


--
-- Data for Name: clientes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.clientes (id_cliente, id_tipo_entidad, id_tipo_identificacion, identificacion, dv, telefono, razon_social, nombre_comercial, id_ciudad, direccion, nombre_contacto, apellido_contacto, correo_electronico, id_tipo_regimen_iva, id_responsabilidad_fiscal, id_estado) FROM stdin;
2	2	1	1041631221	9	32313233	jose sevi	josesito sasaqs	120	Calle 79c #75-37	Gustavo Correa	cor	josemigeul44@gmail.com	1	5	1
4	\N	\N	901773312	\N	 (000) 0000000	12X100PRE S.A.S	12X100PRE S.A.S	\N	\N	12X100PRE S.A.S	\N	juanbermudezcontador@gmail.com	\N	\N	1
5	\N	\N	900259801	\N	 (000) 0000000	180 GRADOS PINTURA ELECTROSTATICA LTDA	180 GRADOS PINTURA ELECTROSTATICA LTDA	\N	\N	180 GRADOS PINTURA ELECTROSTATICA LTDA	\N	pintura180grados@gmail.com	\N	\N	1
6	\N	\N	900940407	\N	 (000) 0000000	2H AGROPECUARIA S.A.S	2H AGROPECUARIA S.A.S	\N	\N	2H AGROPECUARIA S.A.S	\N	construyendo@grupocsm.co	\N	\N	1
7	\N	\N	900843076	\N	 (000) 0000000	3M EXCAVACIONES S.A.S	3M EXCAVACIONES S.A.S	\N	\N	3M EXCAVACIONES S.A.S	\N	ESTACIONLAPALMA@HOTMAIL.COM	\N	\N	1
8	\N	\N	901614744	\N	 (00) 3104240560	4 R HOLDING S.A.S.	4 R HOLDING S.A.S.	\N	\N	4 R HOLDING S.A.S.	\N	seneida.arroyave@carga.com.co	\N	\N	1
9	\N	\N	901614744	\N	\N	4 R HOLDING S.A.S.	SENEIDA ARROYAVE	\N	\N	SENEIDA ARROYAVE	\N	seneida.arroyave@carga.com	\N	\N	1
10	\N	\N	901614744	\N	\N	4 R HOLDING S.A.S.	sixta.valencia @carga.com.co	\N	\N	sixta.valencia @carga.com.co	\N	sixta.valencia@carga.com.co	\N	\N	1
11	\N	\N	811024452	\N	 (000) 0000000	A RECONSTRUIR S.A.S.	A RECONSTRUIR S.A.S.	\N	\N	A RECONSTRUIR S.A.S.	\N	contabilidad@areconstruir.com	\N	\N	1
12	\N	\N	901851380	\N	 (000) 0000000	A&M CINSTRUCTORES S.A.S	A&M CINSTRUCTORES S.A.S	\N	\N	A&M CINSTRUCTORES S.A.S	\N	AYMCONSTRUCTORES@HOTMAIL.COM	\N	\N	1
13	\N	\N	900177402	\N	 (000) 0000000	ACODINSA S.A.S EN REORGANIZACION	ACODINSA S.A.S EN REORGANIZACION	\N	\N	ACODINSA S.A.S EN REORGANIZACION	\N	info@acodinsa.com	\N	\N	1
14	\N	\N	901269728	\N	 (000) 0000000	ACOPLES ALEX JCV SAS	ACOPLES ALEX JCV SAS	\N	\N	ACOPLES ALEX JCV SAS	\N	acoplesalex@hotmail.com	\N	\N	1
15	\N	\N	901010104	\N	 (000) 0000000	ACQUAPACK S.A.S.	ACQUAPACK S.A.S.	\N	\N	ACQUAPACK S.A.S.	\N	acquapack@acquapackcolombia.com	\N	\N	1
16	\N	\N	901502336	\N	 (000) 0000000	ACTUAR M&B S.A.S	ACTUAR M&B S.A.S	\N	\N	ACTUAR M&B S.A.S	\N	ACTUARMBSAS@GMAIL.COM	\N	\N	1
17	\N	\N	811033005	\N	 (000) 0000000	ACUAMETRO S.A.	ACUAMETRO S.A.	\N	\N	ACUAMETRO S.A.	\N	financiera@acuametro.com	\N	\N	1
18	\N	\N	800226360	\N	 (000) 0000000	ACUATUBOS S.A.S.	ACUATUBOS S.A.S.	\N	\N	ACUATUBOS S.A.S.	\N	facturacion@acuatubos.com.co	\N	\N	1
19	\N	\N	901832863	\N	 (000) 0000000	Acueducto cuartas del piste	Acueducto cuartas del piste	\N	\N	Acueducto cuartas del piste	\N	acueductocuartaseldespiste@gmail.com	\N	\N	1
20	\N	\N	811040768	\N	4818980	ACUMULADORES DEL ORIENTE S.A.S.	\N	\N	\N	\N	\N	acorltda@hotmail.com	\N	\N	1
21	\N	\N	811032661	\N	8671109	ACUMULTIVEREDAL LA VETA	\N	\N	\N	\N	\N	acueductolaveta@hotmail.com	\N	\N	1
22	\N	\N	800244387	\N	 (000) 0000000	ADC S.A.S.	ADC S.A.S.	\N	\N	ADC S.A.S.	\N	\N	\N	\N	1
23	\N	\N	70829431	\N	 (000) 0000000	ADOLFO LEON SALAZAR NARANJO	ADOLFO LEON SALAZAR NARANJO	\N	\N	ADOLFO LEON SALAZAR NARANJO	\N	\N	\N	\N	1
24	\N	\N	43527877	\N	 (000) 0000000	ADRIANA MARIA TAMAYO BUSTAMANTE	ADRIANA MARIA TAMAYO BUSTAMANTE	\N	\N	ADRIANA MARIA TAMAYO BUSTAMANTE	\N	\N	\N	\N	1
25	\N	\N	43201425	\N	 (000) 0000000	ADRIANA PATRICIA DE LOS RIOS MAYA	ADRIANA PATRICIA DE LOS RIOS MAYA	\N	\N	ADRIANA PATRICIA DE LOS RIOS MAYA	\N	facturaciongranjaelencuentro@gmail.com	\N	\N	1
26	\N	\N	42682174	\N	 (000) 0000000	ADRIANA PATRICIA SIERRA TOBON	ADRIANA PATRICIA SIERRA TOBON	\N	\N	ADRIANA PATRICIA SIERRA TOBON	\N	ventas-adrianasierra@esfeasy.info	\N	\N	1
27	\N	\N	28152380	\N	 (000) 0000000	ADRIANA YAMILE ACEVEDO PIMIENTO	ADRIANA YAMILE ACEVEDO PIMIENTO	\N	\N	ADRIANA YAMILE ACEVEDO PIMIENTO	\N	electrorepuestosnafacturas@hotmail.com	\N	\N	1
28	\N	\N	890100577	\N	 (000) 0000000	Aerovías del Continente Americano S.A. Avianca	Aerovías del Continente Americano S.A. Avianca	\N	\N	Aerovías del Continente Americano S.A. Avianca	\N	habeasdata@avianca.com	\N	\N	1
29	\N	\N	800106222	\N	 (000) 0000000	AFOROS Y ENCOMIENDAS LTDA	AFOROS Y ENCOMIENDAS LTDA	\N	\N	AFOROS Y ENCOMIENDAS LTDA	\N	aforosyencomiendas@hotmail.com	\N	\N	1
30	\N	\N	890404619	\N	 (000) 0000000	AGENCIA DE ADUANAS ASESORIAS Y SERVICIOS ADUANEROS DE COLOMBIA A NIVEL 1	AGENCIA DE ADUANAS	\N	\N	AGENCIA DE ADUANAS	\N	feproveedores@asercol.com	\N	\N	1
31	\N	\N	900472486	\N	 (000) 0000000	AGENDA DEL MAR COMUNICACIONES S.A.S	AGENDA DEL MAR COMUNICACIONES S.A.S	\N	\N	AGENDA DEL MAR COMUNICACIONES S.A.S	\N	administracion@agendadelmar.com	\N	\N	1
32	\N	\N	901127262	\N	 (00) 3012049311	AGREGADOS ANTIOQUIA PLANTA ZAMORA SAS	AGREGADOS ANTIOQUIA PLANTA ZAMORA SAS	\N	\N	AGREGADOS ANTIOQUIA PLANTA ZAMORA SAS	\N	facturaelectronica@agregadosantioquia.com	\N	\N	1
33	\N	\N	901385641	\N	 (00) 0000000	AGRO BUFALERA HATO MAYOR S.A.S.	AGRO BUFALERA HATO MAYOR S.A.S.	\N	\N	AGRO BUFALERA HATO MAYOR S.A.S.	\N	bufalerahatomayor@gmail.com	\N	\N	1
34	\N	\N	901768708	\N	 (000) 0000000	AGRO E INGENIERIA S.A.S	AGRO E INGENIERIA S.A.S	\N	\N	AGRO E INGENIERIA S.A.S	\N	contabilidad@agroeingenieria.com	\N	\N	1
35	\N	\N	890940735	\N	 (000) 0000000	AGRO SAN DIEGO S.A.S	AGRO SAN DIEGO S.A.S	\N	\N	AGRO SAN DIEGO S.A.S	\N	agrosandiegomedellin20@hotmail.com	\N	\N	1
36	\N	\N	901934981	\N	 (00) 0000000	AGRO SURTICAMPO DONMATÍAS S.A.S	JAIME DE JESUS OSORNO	\N	\N	JAIME DE JESUS OSORNO	\N	agrosurticampodonmatias@gmail.com	\N	\N	1
37	\N	\N	900329928	\N	3123931	AGROBUFALERA LOS AROMOS S.A.	\N	\N	\N	\N	\N	danielcuartas@une.net.co	\N	\N	1
38	\N	\N	901367404	\N	 (00) 0000000	AGRODREX ZOMAC S.A.S	AGRODREX ZOMAC S.A.S	\N	\N	AGRODREX ZOMAC S.A.S	\N	agrodrexzomac@gmail.com	\N	\N	1
39	\N	\N	900575115	\N	 (00) 48670035	AGROEQUIPOS ENTRERRIOS S.A.S.	AGROEQUIPOS ENTRERRIOS S.A.S.	\N	\N	AGROEQUIPOS ENTRERRIOS S.A.S.	\N	compras@agroequiposentrerrios.com	\N	\N	1
40	\N	\N	901971323	\N	 (000) 0000000	AGROFABAL SAS	AGROFABAL SAS	\N	\N	AGROFABAL SAS	\N	manuelare1358@gmail.com	\N	\N	1
41	\N	\N	900490057	\N	 (000) 0000000	AGROFERRETEROS S.A.S	AGROFERRETEROS S.A.S	\N	\N	AGROFERRETEROS S.A.S	\N	agroferreterosfacturas@gmail.com	\N	\N	1
42	\N	\N	824002180	\N	 (000) 0000000	AGROGAMA S.A.S.	AGROGAMA S.A.S.	\N	\N	AGROGAMA S.A.S.	\N	agrogamaltda@gmail.com	\N	\N	1
43	\N	\N	901565282	\N	 (000) 3146307762	AGROGANADERA HATO GRANDE SAS	MARIA ANTONIA LOPERA TOBON	\N	\N	MARIA ANTONIA LOPERA TOBON	\N	AGROGANADERAHATOGRANDE@HOTMAIL.COM	\N	\N	1
44	\N	\N	900512255	\N	 (000) 0000000	AGROGANADERA LA MARIA S.A.S	AGROGANADERA LA MARIA S.A.S	\N	\N	AGROGANADERA LA MARIA S.A.S	\N	AGROGANADERALAMARIASAS@HOTMAIL.COM	\N	\N	1
45	\N	\N	901501236	\N	 (00) 4088580	AGROGANADOS LA COPA SAS	AGROGANADOS LA COPA SAS	\N	\N	AGROGANADOS LA COPA SAS	\N	florezdorance@gmail.com	\N	\N	1
46	\N	\N	900434598	\N	3662839	AGROINDEFUTURO S.A.S	\N	\N	\N	\N	\N	auxcontable2@sondelcauca.com	\N	\N	1
47	\N	\N	900234273	\N	 (000) 4482329	AGROINDUSTRIAS LOS ROBLES S.A.S.	AGROINDUSTRIAS LOS ROBLES S.A.S.	\N	\N	AGROINDUSTRIAS LOS ROBLES S.A.S.	\N	facturacionrobles@cantabria.com.co	\N	\N	1
48	\N	\N	900234273	\N	\N	AGROINDUSTRIAS LOS ROBLES S.A.S.	denis.cardona @cantabria.com.co	\N	\N	denis.cardona @cantabria.com.co	\N	denis.cardona@cantabria.com.co	\N	\N	1
49	\N	\N	900234273	\N	\N	AGROINDUSTRIAS LOS ROBLES S.A.S.	dinis.cardona @cantabria.com.co	\N	\N	dinis.cardona @cantabria.com.co	\N	dinis.cardona@cantabria.com.co	\N	\N	1
50	\N	\N	901636336	\N	 (000) 0000000	AGROINVERSIONES BEMOTI S.A.S	AGROINVERSIONES BEMOTI S.A.S	\N	\N	AGROINVERSIONES BEMOTI S.A.S	\N	BEMOTI@OUTLOOK.COM	\N	\N	1
51	\N	\N	901636336	\N	\N	AGROINVERSIONES BEMOTI S.A.S	bemoti @outlook.com	\N	\N	bemoti @outlook.com	\N	bemoti@outlook.com	\N	\N	1
52	\N	\N	901891097	\N	 (000) 0000000	AGROINVERSIONES TIERRA ADENTRO S.A.S	AGROINVERSIONES TIERRA ADENTRO S.A.S	\N	\N	AGROINVERSIONES TIERRA ADENTRO S.A.S	\N	GCON.SANTIAGO@GMAIL.COM	\N	\N	1
53	\N	\N	900420567	\N	 (000) 0000000	AGROLOMA S.A.S.	AGROLOMA S.A.S.	\N	\N	AGROLOMA S.A.S.	\N	contabilidad@equipodeinversiones.com	\N	\N	1
54	\N	\N	900559850	\N	\N	AGROMIEL EL TORO S.A.S	AGROMIEL EL TORO S.A.S	\N	\N	AGROMIEL EL TORO S.A.S	\N	agromieleltorosas@gmail.com	\N	\N	1
55	\N	\N	900084507	\N	 (000) 0000000	AGRONAN S.A.S	AGRONAN S.A.S	\N	\N	AGRONAN S.A.S	\N	escaner@agrourbanan.com	\N	\N	1
56	\N	\N	800198575	\N	4440755	AGROPECUARIA BAJOGRANDE S.A.	\N	\N	\N	\N	\N	800198575@factureinbox.co	\N	\N	1
57	\N	\N	900893534	\N	 (000) 0000000	AGROPECUARIA ISJ S.A.S	AGROPECUARIA ISJ S.A.S	\N	\N	AGROPECUARIA ISJ S.A.S	\N	agropecuariaisjcontabilidad@gmail.com	\N	\N	1
58	\N	\N	900715404	\N	 (000) 0000000	AGROPECUARIA LA ACACIAS S.A.S	AGROPECUARIA LA ACACIAS S.A.S	\N	\N	AGROPECUARIA LA ACACIAS S.A.S	\N	administrador@motowork.co	\N	\N	1
59	\N	\N	900315951	\N	 (000) 0000000	AGROPECUARIA LA MAGNOLIA S.A.S	AGROPECUARIA LA MAGNOLIA S.A.S	\N	\N	AGROPECUARIA LA MAGNOLIA S.A.S	\N	facturacion@agropecuarialamagnolia.com	\N	\N	1
60	\N	\N	900352493	\N	 (000) 0000000	AGROPECUARIA LA MONTAÑITA S.A.S	AGROPECUARIA LA MONTAÑITA S.A.S	\N	\N	AGROPECUARIA LA MONTAÑITA S.A.S	\N	CONTABILIDADALIHACIENDA@GMAIL.COM	\N	\N	1
61	\N	\N	900180331	\N	 (000) 0000000	AGROPECUARIA LA SORIA S.A.S	AGROPECUARIA LA SORIA S.A.S	\N	\N	AGROPECUARIA LA SORIA S.A.S	\N	contadorsoria@panaca.co	\N	\N	1
62	\N	\N	830502276	\N	 (00) 0000000	AGROPECUARIA LOS ANDES S.A	AGROPECUARIA LOS ANDES S.A	\N	\N	AGROPECUARIA LOS ANDES S.A	\N	danielcuartas@une.net.co	\N	\N	1
63	\N	\N	901482374	\N	 (00) 6043222019	AGROPECUARIA PARA SIEMPRE S.A.S	AGROPECUARIA PARA SIEMPRE SAS	\N	\N	AGROPECUARIA PARA SIEMPRE SAS	\N	901482374@recepciondefacturas.co	\N	\N	1
64	\N	\N	901414447	\N	 (000) 0000000	AGROPECUARIA PORK10 S.A.S	AGROPECUARIA PORK10 S.A.S	\N	\N	AGROPECUARIA PORK10 S.A.S	\N	pork10dm@gmail.com	\N	\N	1
65	\N	\N	900429084	\N	 (000) 0000000	AGROPECUARIA SAN FRANCISCO S.A.S.	AGROPECUARIA SAN FRANCISCO S.A.S.	\N	\N	AGROPECUARIA SAN FRANCISCO S.A.S.	\N	AGROPECUARIASANFRANCISCOSAS@GMAIL.COM	\N	\N	1
66	\N	\N	900711649	\N	2579924	AGROPECUARIA SAN LUCAS S.A.S	\N	\N	\N	\N	\N	agropecuariasanlucas@yahoo.es	\N	\N	1
67	\N	\N	900743133	\N	3221646	AGROSOLUTION MAQUINARIA AGRICOLA S.A.S.	\N	\N	\N	\N	\N	info@agrosolution.co	\N	\N	1
68	\N	\N	901358342	\N	 (000) 0000000	AGROTIENDA TONE S.A.S.	AGROTIENDA TONE S.A.S.	\N	\N	AGROTIENDA TONE S.A.S.	\N	sergiocris80@hotmail.com	\N	\N	1
69	\N	\N	900162495	\N	8608004	AGROTRILLADORA S.A.S	CAROLINA	\N	\N	CAROLINA	\N	agrotrilladorasa@hotmail.com	\N	\N	1
70	\N	\N	900162495	\N	\N	AGROTRILLADORA S.A.S	AGROTRILLADORA	\N	\N	AGROTRILLADORA	\N	agrotrilladorasa@hotmail.com	\N	\N	1
71	\N	\N	901060667	\N	 (000) 4740001	AGUACATES FLOREZ S.A.S.	AGUACATES FLOREZ S.A.S.	\N	\N	AGUACATES FLOREZ S.A.S.	\N	contabilidad@aguacatesflorez.com	\N	\N	1
72	\N	\N	901450966	\N	3187350800	AGUACATES SAN RAFAEL S.A.S.	\N	\N	\N	\N	\N	aguacates.sanrafael@gmail.com	\N	\N	1
73	\N	\N	890919209	\N	 (000) 0000000	AGUAS INDUSTRIALES S.A.S	AGUAS INDUSTRIALES S.A.S	\N	\N	AGUAS INDUSTRIALES S.A.S	\N	aguasindustrialeslab@gmail.com	\N	\N	1
74	\N	\N	901304242	\N	 (000) 0000000	AJ SOLUTIONS COMMUNICATIONS S.A.S	AJ SOLUTIONS COMMUNICATIONS S.A.S	\N	\N	AJ SOLUTIONS COMMUNICATIONS S.A.S	\N	ajsolutionsmed@gmail.com	\N	\N	1
75	\N	\N	901054310	\N	 (000) 0000000	ALATURA MOBILIARIO SAS	ALATURA MOBILIARIO SAS	\N	\N	ALATURA MOBILIARIO SAS	\N	administracion@alatura.com.co	\N	\N	1
76	\N	\N	901054310	\N	\N	ALATURA MOBILIARIO SAS	jero03925@gmail.com	\N	\N	jero03925@gmail.com	\N	jero03925@gmail.com	\N	\N	1
77	\N	\N	8403510	\N	 (000) 0000000	ALBEIRO ANTONIO CORDONA OSORIO	ALBEIRO ANTONIO CORDONA OSORIO	\N	\N	ALBEIRO ANTONIO CORDONA OSORIO	\N	facturacionaqp1@gmail.com	\N	\N	1
78	\N	\N	98455117	\N	 (000) 3128915510	ALBEIRO CORREA GALLEGO	ALBEIRO CORREO GALLEGO	\N	\N	ALBEIRO CORREO GALLEGO	\N	solucionessaim@gmail.com	\N	\N	1
79	\N	\N	70578126	\N	 (000) 0000000	ALBEIRO DE JESUS	ALBEIRO DE JESUS	\N	\N	ALBEIRO DE JESUS	\N	electroesmaltados1@gmail.com	\N	\N	1
80	\N	\N	1085929853	\N	 (00) 0000000	ALBERTH EDISON CUARAN ZUÑIGA	ALBERTH EDISON CUARAN ZUÑIGA	\N	\N	ALBERTH EDISON CUARAN ZUÑIGA	\N	\N	\N	\N	1
81	\N	\N	3538177	\N	 (000) 0000000	ALBERTO ARAQUE OSPINA	ALBERTO ARAQUE OSPINA	\N	\N	ALBERTO ARAQUE OSPINA	\N	GIRALDOBORJA@GMAIL.COM	\N	\N	1
82	\N	\N	10257787	\N	 (000) 0000000	ALBERTO JARAMILLO ECHEVERRI	ALBERTO JARAMILLO ECHEVERRI	\N	\N	ALBERTO JARAMILLO ECHEVERRI	\N	DIRECTORMANIZALEZ@NINANDES.ORG	\N	\N	1
83	\N	\N	70528970	\N	 (000) 0000000	ALBERTO VERTEZA MORA	ALBERTO VERTEZA MORA	\N	\N	ALBERTO VERTEZA MORA	\N	albertoverteza@hotmail.com	\N	\N	1
84	\N	\N	900821419	\N	 (000) 0000000	ALDANA GARCIA Y CIA S.A.S	ALDANA GARCIA Y CIA S.A.S	\N	\N	ALDANA GARCIA Y CIA S.A.S	\N	\N	\N	\N	1
85	\N	\N	71399284	\N	 (000) 0000000	ALDEMAR DE JESUS VALLEJO VALENCIA	ALDEMAR DE JESUS VALLEJO VALENCIA	\N	\N	ALDEMAR DE JESUS VALLEJO VALENCIA	\N	\N	\N	\N	1
86	\N	\N	1020414098	\N	 (000) 0000000	ALEJANDRO GIRALDO WILSON	ALEJANDRO GIRALDO WILSON	\N	\N	ALEJANDRO GIRALDO WILSON	\N	algiraldo888@gmail.com	\N	\N	1
87	\N	\N	71779669	\N	 (000) 0000000	ALEJANDRO LEON LOPERA	ALEJANDRO LEON LOPERA	\N	\N	ALEJANDRO LEON LOPERA	\N	facturacionaqp1@gmail.com	\N	\N	1
88	\N	\N	98554929	\N	 (000) 0000000	ALEJANDRO LOPEZ	ALEJANDRO LOPEZ	\N	\N	ALEJANDRO LOPEZ	\N	alejolopza@hotmail.es	\N	\N	1
89	\N	\N	70511929	\N	 (00) 0000000	ALEJANDRO URIBE GREIFFENSTEIN	ALEJANDRO URIBE GREIFFENSTEIN	\N	\N	ALEJANDRO URIBE GREIFFENSTEIN	\N	alejogrei62@gmail.com	\N	\N	1
90	\N	\N	71339037	\N	 (000) 0000000	ALEJANDRO YEPEZ MONTOYA	ALEJANDRO YEPEZ MONTOYA	\N	\N	ALEJANDRO YEPEZ MONTOYA	\N	alejandroym@hotmail.com	\N	\N	1
91	\N	\N	98661435	\N	 (000) 0000000	ALEX VANEGAS GIMENEZ	ALEX VANEGAS GIMENEZ	\N	\N	ALEX VANEGAS GIMENEZ	\N	advanegas_21@hotmail.com	\N	\N	1
92	\N	\N	71174942	\N	 (000) 0000000	ALEXANDER ANDRES FRANCO ARCILA	ALEXANDER ANDRES FRANCO ARCILA	\N	\N	ALEXANDER ANDRES FRANCO ARCILA	\N	alexander.franco.arcila@gmail.com	\N	\N	1
93	\N	\N	91449834	\N	 (000) 0000000	ALEXANDER PADILLA VEGA	ALEXANDER PADILLA VEGA	\N	\N	ALEXANDER PADILLA VEGA	\N	controlesyvariadores@gmail.com	\N	\N	1
94	\N	\N	1003293545	\N	 (000) 0000000	ALEXANDER VERGARA MARTINEZ	ALEXANDER VERGARA MARTINEZ	\N	\N	ALEXANDER VERGARA MARTINEZ	\N	\N	\N	\N	1
95	\N	\N	1128427565	\N	 (000) 0000000	ALEXANDRA DAVILA ALVAREZ	ALEXANDRA DAVILA ALVAREZ	\N	\N	ALEXANDRA DAVILA ALVAREZ	\N	alexadavila18@gmail.com	\N	\N	1
96	\N	\N	901127062	\N	 (000) 0000000	ALL-TANK S.A.S	ALL-TANK S.A.S	\N	\N	ALL-TANK S.A.S	\N	alltank.sas@gmail.com	\N	\N	1
191	\N	\N	811031651	\N	 (000) 0000000	C.I. ALMASEG S.A	C.I. ALMASEG S.A	\N	\N	C.I. ALMASEG S.A	\N	cialmaseg@hotmail.com	\N	\N	1
97	\N	\N	900877095	\N	 (000) 2893016	ALMACEN CAFEAGRO S.A.S	ALMACEN CAFEAGRO S.A.S	\N	\N	ALMACEN CAFEAGRO S.A.S	\N	almacencafeagro@hotmail.com	\N	\N	1
98	\N	\N	890900608	\N	 (000) 0000000	ALMACENES EXITO S.A	ALMACENES EXITO S.A	\N	\N	ALMACENES EXITO S.A	\N	\N	\N	\N	1
99	\N	\N	900525717	\N	 (000) 0000000	ALMACENES LCC S.A.S	ALMACENES LCC S.A.S	\N	\N	ALMACENES LCC S.A.S	\N	RUBEN.ZAPATA@DOTAKONDOR.COM	\N	\N	1
100	\N	\N	900451449	\N	 (604) 3639819	ALMONTES SAS	ALMONTES SAS	\N	\N	ALMONTES SAS	\N	jomoreno@une.net.co	\N	\N	1
101	\N	\N	900877788	\N	 (000) 0000000	ALONDRA MUEBLES Y COLCHONES SAS	ALONDRA MUEBLES Y COLCHONES SAS	\N	\N	ALONDRA MUEBLES Y COLCHONES SAS	\N	\N	\N	\N	1
102	\N	\N	70722336	\N	 (000) 0000000	ALONSO LOAIZA	ALONSO LOAIZA	\N	\N	ALONSO LOAIZA	\N	facturacionaqp1@gmail.com	\N	\N	1
103	\N	\N	901395853	\N	 (000) 0000000	ALQUIEQUIPOS JERICO S.A.S	ALQUIEQUIPOS JERICO S.A.S	\N	\N	ALQUIEQUIPOS JERICO S.A.S	\N	\N	\N	\N	1
104	\N	\N	900062201	\N	3792909	ALSEC ALIMENTOS SECOS S.A.S.	\N	\N	\N	\N	\N	facturacionelectronica@alsec.com.co	\N	\N	1
105	\N	\N	800147573	\N	3122891851	ALTAMAR S.A.S	MONICA LORA	\N	\N	MONICA LORA	\N	contador@altamarsas.co	\N	\N	1
106	\N	\N	15352018	\N	 (000) 0000000	ALVARO ANTONIO OROZCO RUIZ	ALVARO ANTONIO OROZCO RUIZ	\N	\N	ALVARO ANTONIO OROZCO RUIZ	\N	alvaroorozcoruiz2013@gmail.com	\N	\N	1
107	\N	\N	98544493	\N	 (000) 0000000	ALVARO SANTIAGO SANTAMARIA MEJIA	ALVARO SANTIAGO SANTAMARIA MEJIA	\N	\N	ALVARO SANTIAGO SANTAMARIA MEJIA	\N	unitrade1@unitrade.com.co	\N	\N	1
108	\N	\N	98651456	\N	 (000) 0000000	AMAURIS ENRIQUE PEREZ HOYOS	AMAURIS ENRIQUE PEREZ HOYOS	\N	\N	AMAURIS ENRIQUE PEREZ HOYOS	\N	\N	\N	\N	1
109	\N	\N	901451096	\N	 (000) 0000000	AMBIPLASTICOS DE COLOMBIA SAS	AMBIPLASTICOS DE COLOMBIA SAS	\N	\N	AMBIPLASTICOS DE COLOMBIA SAS	\N	ambiplasticos@gmail.com	\N	\N	1
110	\N	\N	901475794	\N	 (000) 0000000	AMG TECHNOLOGY S.A.S	AMG TECHNOLOGY S.A.S	\N	\N	AMG TECHNOLOGY S.A.S	\N	contabilidadamgtechnology@gmail.com	\N	\N	1
111	\N	\N	1035864060	\N	 (000) 0000000	ANA CRISTINA CARDONA CORRALES	ANA CRISTINA CARDONA CORRALES	\N	\N	ANA CRISTINA CARDONA CORRALES	\N	cristinacardona06@gmail.com	\N	\N	1
112	\N	\N	42892664	\N	 (000) 0000000	ANA LUCIA LOTY MEZGER MUÑOZ	ANA LUCIA LOTY MEZGER MUÑOZ	\N	\N	ANA LUCIA LOTY MEZGER MUÑOZ	\N	facturaacquapack@gmail.com	\N	\N	1
113	\N	\N	39153237	\N	 (000) 0000000	ANA MARIA RESTREPO CHAVEZ	ANA MARIA RESTREPO CHAVEZ	\N	\N	ANA MARIA RESTREPO CHAVEZ	\N	espaciosinteligentespr@gmail.com	\N	\N	1
114	\N	\N	98581982	\N	\N	ANCIZAR ARANGO RENDON	ANCIZAR ARANGO RENDON	\N	\N	ANCIZAR ARANGO RENDON	\N	ancizara985@gmail.com	\N	\N	1
115	\N	\N	1036337058	\N	 (000) 0000000	ANDERSON ARTUNDUAGA CABRERA	ANDERSON ARTUNDUAGA CABRERA	\N	\N	ANDERSON ARTUNDUAGA CABRERA	\N	berta4427@gmail.com	\N	\N	1
116	\N	\N	1033338832	\N	 (00) 3016069399	ANDERSON MURIEL GIRALDO	ANDERSON MURIEL GIRALDO	\N	\N	ANDERSON MURIEL GIRALDO	\N	carbonesandersonmuriel@gmail.com	\N	\N	1
117	\N	\N	71629970	\N	 (000) 0000000	ANDRES AUGUSTO PANIAGUA RESTREPO	ANDRES AUGUSTO PANIAGUA RESTREPO	\N	\N	ANDRES AUGUSTO PANIAGUA RESTREPO	\N	andrespaniaguare71@gmail.com	\N	\N	1
118	\N	\N	4379570	\N	 (000) 0000000	ANDRES CARDONA	ANDRES CARDONA	\N	\N	ANDRES CARDONA	\N	\N	\N	\N	1
119	\N	\N	1036619230	\N	 (000) 0000000	ANDRES CARDONA OROZCO	ANDRES CARDONA	\N	\N	ANDRES CARDONA	\N	CARDONAOROZCOANDRES@GMAIL.COM	\N	\N	1
120	\N	\N	71316894	\N	6016731	ANDRES DAVID GARCIA RUA	ANDRES DAVID GARCIA RUA	\N	\N	ANDRES DAVID GARCIA RUA	\N	garciarua2020@gmail.com	\N	\N	1
121	\N	\N	8162980	\N	 (000) 0000000	ANDRES FELIPE ALVAREZ RESTREPO	ANDRES FELIPE ALVAREZ RESTREPO	\N	\N	ANDRES FELIPE ALVAREZ RESTREPO	\N	ANFEALVAREZ215@HOTMAIL.COM	\N	\N	1
122	\N	\N	1017241586	\N	 (000) 0000000	ANDRES FELIPE CHICA LONDOÑO	ANDRES FELIPE CHICA LONDOÑO	\N	\N	ANDRES FELIPE CHICA LONDOÑO	\N	ANDRES.CHICALONDONO@GMAIL.COM	\N	\N	1
123	\N	\N	71260524	\N	 (000) 0000000	ANDRES FELIPE NARVAEZ  RODRIGUEZ	ANDRES FELIPE NARVAEZ  RODRIGUEZ	\N	\N	ANDRES FELIPE NARVAEZ  RODRIGUEZ	\N	andresnarva@hotmail.com	\N	\N	1
124	\N	\N	100184755	\N	 (000) 0000000	ANDRES FELIPE ZEA MEJIA	ANDRES FELIPE ZEA MEJIA	\N	\N	ANDRES FELIPE ZEA MEJIA	\N	facturacionaqp1@gmail.com	\N	\N	1
125	\N	\N	70508525	\N	 (000) 0000000	ANGEL GUILLERMO GAVIRIA MENESES	ANGEL GUILLERMO GAVIRIA MENESES	\N	\N	ANGEL GUILLERMO GAVIRIA MENESES	\N	\N	\N	\N	1
126	\N	\N	98590773	\N	 (000) 0000000	ANGEL LOPERA MUÑOZ	ANGEL LOPERA MUÑOZ	\N	\N	ANGEL LOPERA MUÑOZ	\N	facturacionaqp1@gmail.com	\N	\N	1
127	\N	\N	8245169	\N	 (00) 0000000	ANGEL MARIA URIBE AGUDELO	ANGEL MARIA URIBE AGUDELO	\N	\N	ANGEL MARIA URIBE AGUDELO	\N	gerencia@codiplax.com.co	\N	\N	1
128	\N	\N	42773683	\N	 (000) 0000000	ANGELA LUCIA MONTOYA  GRANADOS	ANGELA LUCIA MONTOYA  GRANADOS	\N	\N	ANGELA LUCIA MONTOYA  GRANADOS	\N	gerencia@cortardoblar.com	\N	\N	1
129	\N	\N	53076220	\N	 (000) 0000000	ANGELICA VIVIANA MANCERA PARDO	ANGELICA VIVIANA MANCERA PARDO	\N	\N	ANGELICA VIVIANA MANCERA PARDO	\N	\N	\N	\N	1
130	\N	\N	901426228	\N	 (00) 0000000	ANKARAS S.A.S	ANKARAS S.A.S	\N	\N	ANKARAS S.A.S	\N	silicatosgerencia@gmail.com	\N	\N	1
131	\N	\N	901717942	\N	 (000) 0000000	ANTIOQUEÑA DE MAQUINAS SAN JUAN SAS	ANTIOQUEÑA DE MAQUINAS SAN JUAN SAS	\N	\N	ANTIOQUEÑA DE MAQUINAS SAN JUAN SAS	\N	admaquinassanjuan@hotmail.com	\N	\N	1
132	\N	\N	900551404	\N	 (000) 0000000	ANTIOQUEÑA DE QUIMICOS S.A.S	ANTIOQUEÑA DE QUIMICOS S.A.S	\N	\N	ANTIOQUEÑA DE QUIMICOS S.A.S	\N	info@antioqunadequimicos.com	\N	\N	1
133	\N	\N	900327321	\N	 (000) 0000000	ANTIOQUEÑA DE RODAMIENTOS S.A.S.	ANTIOQUEÑA DE RODAMIENTOS S.A.S.	\N	\N	ANTIOQUEÑA DE RODAMIENTOS S.A.S.	\N	cartera@adrgrupo.com	\N	\N	1
134	\N	\N	900590126	\N	 (000) 0000000	AQUAMED INGENIERO S.A.S	AQUAMED INGENIERO S.A.S	\N	\N	AQUAMED INGENIERO S.A.S	\N	AQUAMED.FACTURACION@OUTLOOK.COM	\N	\N	1
135	\N	\N	890907245	\N	 (00) 8608129	ARANGO HERMANOS S.A.S.	ARANGO HERMANOS S.A.S.	\N	\N	ARANGO HERMANOS S.A.S.	\N	facturas@concentradosnutrinor.com	\N	\N	1
136	\N	\N	890907245	\N	8608129	ARANGO HERMANOS S.A.S.	ARANGO HERMANOS S.A.S. facturacion	\N	\N	ARANGO HERMANOS S.A.S. facturacion	\N	facturas@concentradosnutrinor.com	\N	\N	1
137	\N	\N	70288439	\N	 (000) 0000000	ARCADIO DE JESUS HENAO SANCHES	ARCADIO DE JESUS HENAO SANCHES	\N	\N	ARCADIO DE JESUS HENAO SANCHES	\N	\N	\N	\N	1
138	\N	\N	900922797	\N	 (000) 0000000	ARENAR S.A.S.	ARENAR S.A.S.	\N	\N	ARENAR S.A.S.	\N	\N	\N	\N	1
139	\N	\N	70725079	\N	 (000) 0000000	ARGEMIRO HERNANDEZ GRISALES	ARGEMIRO HERNANDEZ GRISALES	\N	\N	ARGEMIRO HERNANDEZ GRISALES	\N	argemiro70@gmail.com	\N	\N	1
140	\N	\N	70041493	\N	 (000) 0000000	ARGIRO RIVERA ZULUAGA	ARGIRO RIVERA ZULUAGA	\N	\N	ARGIRO RIVERA ZULUAGA	\N	riveargiro@gmail.com	\N	\N	1
141	\N	\N	860062854	\N	 (00) 0000000	ARIAS SERNA Y SARAVIA S A S	ARIAS SERNA Y SARAVIA S A S	\N	\N	ARIAS SERNA Y SARAVIA S A S	\N	contabilidad@asys.com.co	\N	\N	1
142	\N	\N	8406837	\N	 (000) 0000000	ARIEL DE JESUS SANCHEZ ROMAN	ARIEL DE JESUS SANCHEZ ROMAN	\N	\N	ARIEL DE JESUS SANCHEZ ROMAN	\N	facturacionaqp1@gmail.com	\N	\N	1
143	\N	\N	900688524	\N	 (000) 0000000	ARMEPLAS PRODALGA S.A.S	ARMEPLAS PRODALGA S.A.S	\N	\N	ARMEPLAS PRODALGA S.A.S	\N	facturacion@prodalca.com.co	\N	\N	1
144	\N	\N	77151830	\N	 (000) 0000000	ARNULFO RAFAEL FONTALVO CHINCHILLA	ARNULFO RAFAEL FONTALVO CHINCHILLA	\N	\N	ARNULFO RAFAEL FONTALVO CHINCHILLA	\N	COMERFONTA15@HOTMAIL.COM	\N	\N	1
145	\N	\N	901454361	\N	 (000) 0000000	ARQUITECTURA DE ANTAÑO S.A.S	ARQUITECTURA DE ANTAÑO S.A.S	\N	\N	ARQUITECTURA DE ANTAÑO S.A.S	\N	gerencia@arquitecturadeantano.com	\N	\N	1
146	\N	\N	901105345	\N	3216472749	ASESORÍAS Y SERVICIOS ARVI S.A.S	\N	\N	\N	\N	\N	slarbol@hotmail.com	\N	\N	1
147	\N	\N	901235010	\N	 (000) 0000000	ASIST ALTURAS S.A.S	ASIST ALTURAS S.A.S	\N	\N	ASIST ALTURAS S.A.S	\N	administracion@asistalturas.co	\N	\N	1
148	\N	\N	125364485	\N	3174399679	asistente proyecto proyecto	asistente proyecto proyecto	\N	\N	asistente proyecto proyecto	\N	\N	\N	\N	1
149	\N	\N	901065862	\N	 (000) 3148904467	ASOCIACION ACUEDUCTO DE LA VEREDA LA CHORRERA	DIEGO  RESTREPO ECHEVARRIA	\N	\N	DIEGO  RESTREPO ECHEVARRIA	\N	ACUEDUCTOCHORRERA@GMAIL.COM	\N	\N	1
150	\N	\N	900328839	\N	 (000) 0000000	ASOCIACION ACUEDUCTO EL LAGO	ASOCIACION ACUEDUCTO EL LAGO	\N	\N	ASOCIACION ACUEDUCTO EL LAGO	\N	ELIANA.ARAQUE@FERBIENES.COM	\N	\N	1
151	\N	\N	901227045	\N	 (000) 0000000	ASOCIACION DE PISCICULTORES DE URABA	ASOCIACION DE PISCICULTORES DE URABA	\N	\N	ASOCIACION DE PISCICULTORES DE URABA	\N	alejandro.vargas@aspiuraba.org	\N	\N	1
152	\N	\N	901073201	\N	 (000) 0000000	ASOCIACION JUNTA ADMINISTRADORA DE ACUEDUCTO LA PEÑA	ASOCIACION JUNTA ADMINISTRADORA DE ACUEDUCTO LA PEÑA	\N	\N	ASOCIACION JUNTA ADMINISTRADORA DE ACUEDUCTO LA PEÑA	\N	contacto@amlapena.org	\N	\N	1
153	\N	\N	9016735291	\N	 (000) 0000000	ASOCIACION JUNTA ADMINISTRADORA DE ACUEDUCTOS Y ZONAS COMUNES MISION PARAISO	ASOCIACION JUNTA ADMINISTRADORA DE ACUEDUCTOS Y ZONAS COMUNES MISION PARAISO	\N	\N	ASOCIACION JUNTA ADMINISTRADORA DE ACUEDUCTOS Y ZONAS COMUNES MISION PARAISO	\N	MISIONPARAISO@GMAIL.COM	\N	\N	1
154	\N	\N	900846822	\N	 (00) 0000000	ASOCIACIÓN RED AMBIENTAL SOLIDARIA SAN ANTONIO DE PRADO	VIVERO ARASOLES	\N	\N	VIVERO ARASOLES	\N	arasolesarasoles@gmail.com	\N	\N	1
155	\N	\N	901033515	\N	 (000) 0000000	ASOCIACION USUARIOS VEREDA ASUNORAL	ASOCIACION USUARIOS VEREDA ASUNORAL	\N	\N	ASOCIACION USUARIOS VEREDA ASUNORAL	\N	acueducto.asunoral@gmail.com	\N	\N	1
156	\N	\N	900105705	\N	 (000) 0000000	ASOLLANOS S.A.S	ASOLLANOS S.A.S	\N	\N	ASOLLANOS S.A.S	\N	riegoasollano96@hotmail.com	\N	\N	1
157	\N	\N	860066741	\N	 (000) 0000000	ASPERSORES COLOMBIANOS LTDA	ASPERSORES COLOMBIANOS LTDA	\N	\N	ASPERSORES COLOMBIANOS LTDA	\N	facruracion@aspercol.com	\N	\N	1
158	\N	\N	900838560	\N	 (000) 0000000	AUDIMED COLOMBIA SAS	AUDIMED COLOMBIA SAS	\N	\N	AUDIMED COLOMBIA SAS	\N	conta.audimed@gmail.com	\N	\N	1
159	\N	\N	900280002	\N	 (000) 0000000	AUDIOLUCES LTDA MEDELLIN	AUDIOLUCES LTDA MEDELLIN	\N	\N	AUDIOLUCES LTDA MEDELLIN	\N	audiolucesltdaf.e@hotmail.com	\N	\N	1
160	\N	\N	6263207	\N	 (000) 0000000	AURELIO MARCO ASTAIZA CONDE	AURELIO MARCO ASTAIZA CONDE	\N	\N	AURELIO MARCO ASTAIZA CONDE	\N	marcoastaizacontab@gmail.com	\N	\N	1
161	\N	\N	890800062	\N	 (000) 0000000	AUTOLEGAL S.A	AUTOLEGAL S.A	\N	\N	AUTOLEGAL S.A	\N	\N	\N	\N	1
162	\N	\N	900535212	\N	 (000) 0000000	AUTOPISTA SUR S.AS.	AUTOPISTA SUR S.AS.	\N	\N	AUTOPISTA SUR S.AS.	\N	\N	\N	\N	1
163	\N	\N	901453963	\N	3187350800	AVOCADOS SANTA ISABEL S.A.S.	\N	\N	\N	\N	\N	avocadosantaisabel@gmail.com	\N	\N	1
164	\N	\N	901781240	\N	 (00) 0000000	AVOMAGIC ZOMAC SAS	AVOMAGIC ZOMAC SAS	\N	\N	AVOMAGIC ZOMAC SAS	\N	avomagicsas@gmail.com	\N	\N	1
165	\N	\N	901558688	\N	 (000) 0000000	AYH ING SOLUCIONES SAS	AYH ING SOLUCIONES SAS	\N	\N	AYH ING SOLUCIONES SAS	\N	HERRERAP1212@GMAIL.COM	\N	\N	1
166	\N	\N	70119204	\N	\N	BAYRON AREIZA GIRALDO	BAYRON AREIZA GIRALDO	\N	\N	BAYRON AREIZA GIRALDO	\N	byronareiza57@gmail.com	\N	\N	1
167	\N	\N	32015343	\N	 (000) 0000000	BEATRIZ ELENA GONZALEZ GARCES	BEATRIZ ELENA GONZALEZ GARCES	\N	\N	BEATRIZ ELENA GONZALEZ GARCES	\N	contabilidadgrales@gmail.com	\N	\N	1
168	\N	\N	43511965	\N	 (000) 0000000	BEATRIZ ELENA MARIN CARO	BEATRIZ ELENA MARIN CARO	\N	\N	BEATRIZ ELENA MARIN CARO	\N	beatrizelenamarincaro@gmail.com	\N	\N	1
169	\N	\N	43616292	\N	3175321	BEATRIZ ELENA VALLEJO ORDOÑEZ	BEATRIZ ELENA VALLEJO ORDOÑEZ	\N	\N	BEATRIZ ELENA VALLEJO ORDOÑEZ	\N	beatrivallejo09@hotmail.com	\N	\N	1
170	\N	\N	901179687	\N	583111	BEMAT COLOMBIA S.A.S	\N	\N	\N	\N	\N	comprasyabastecimiento@bematcolombia.com	\N	\N	1
171	\N	\N	70046952	\N	 (000) 0000000	BERNARDO DE JESUS MUÑOZ GARCA	BERNARDO DE JESUS MUÑOZ GARCA	\N	\N	BERNARDO DE JESUS MUÑOZ GARCA	\N	ferreterialosparqueaderos@hotmail.com	\N	\N	1
172	\N	\N	15323707	\N	 (000) 0000000	BERNARDO ZAPATA  VELAZQUEZ	bernardo zapata velazques	\N	\N	bernardo zapata velazques	\N	bersave17@hotmail.com	\N	\N	1
173	\N	\N	901787267	\N	 (000) 0000000	BETASOLUCIONES S.A.S.	BETASOLUCIONES S.A.S.	\N	\N	BETASOLUCIONES S.A.S.	\N	beta-soluciones2021@outlook.com	\N	\N	1
174	\N	\N	700442785	\N	 (000) 0000000	BIANKA CARRILLO CALLES	BIANKA CARRILLO CALLES	\N	\N	BIANKA CARRILLO CALLES	\N	agudelux80@hotmail.com	\N	\N	1
175	\N	\N	52664112	\N	 (000) 0000000	BIBIANA PESCADOR	BIBIANA PESCADOR	\N	\N	BIBIANA PESCADOR	\N	hotelsahara48@hotmail.com	\N	\N	1
176	\N	\N	15258844	\N	 (000) 0000000	BILIAN ALCIDES JIMENEZ RENDON	BILIAN ALCIDES JIMENEZ RENDON	\N	\N	BILIAN ALCIDES JIMENEZ RENDON	\N	bilianjimenez@hotmail.com	\N	\N	1
177	\N	\N	901213132	\N	 (000) 0000000	BIOCOMBUSTIBLES DEL NORTE SAS	BIOCOMBUSTIBLES DEL NORTE SAS	\N	\N	BIOCOMBUSTIBLES DEL NORTE SAS	\N	biocombustiblesdelnorte@hotmail.com	\N	\N	1
178	\N	\N	900124904	\N	 (000) 0000000	BIOEXPLORA	BIOEXPLORA	\N	\N	BIOEXPLORA	\N	info@bioexplora.com.co	\N	\N	1
179	\N	\N	901718036	\N	 (000) 0000000	BIORECICLA J&J S.A.S	Julio Espinal	\N	\N	Julio Espinal	\N	julioespinalloaiza@gmail.com	\N	\N	1
180	\N	\N	901367718	\N	 (000) 0000000	BIOSERVICIOS JGA S.A.S	BIOSERVICIOS JGA S.A.S	\N	\N	BIOSERVICIOS JGA S.A.S	\N	bioserviciosjga@gmail.com	\N	\N	1
181	\N	\N	39274153	\N	 (000) 0000000	BLANCA NIDIA LONDOÑO MESA	BLANCA NIDIA LONDOÑO MESA	\N	\N	BLANCA NIDIA LONDOÑO MESA	\N	elhacendado70@gmail.com	\N	\N	1
182	\N	\N	21736089	\N	 (000) 0000000	BLANCA ROCIO VALENCIA BETANCUR	BLANCA ROCIO VALENCIA BETANCUR	\N	\N	BLANCA ROCIO VALENCIA BETANCUR	\N	\N	\N	\N	1
183	\N	\N	900860871	\N	 (000) 0000000	BLUE MONKEY ESTUDIO CREATIVO S.A.S	BLUE MONKEY ESTUDIO CREATIVO S.A.S	\N	\N	BLUE MONKEY ESTUDIO CREATIVO S.A.S	\N	info@bluemonkey.com.co	\N	\N	1
184	\N	\N	900747451	\N	 (000) 0000000	BODEGÓN PARA LA CONSTRUCCIÓN S.A.S.	BODEGÓN PARA LA CONSTRUCCIÓN S.A.S.	\N	\N	BODEGÓN PARA LA CONSTRUCCIÓN S.A.S.	\N	contacto@elbodegondelaconstruccion.com	\N	\N	1
185	\N	\N	9006110196	\N	 (000) 0000000	BOTICARIO COLOMBIA SAS	BOTICARIO COLOMBIA SAS	\N	\N	BOTICARIO COLOMBIA SAS	\N	\N	\N	\N	1
186	\N	\N	901446875	\N	 (000) 0000000	BUFALO MIX S.A.S.	BUFALO MIX S.A.S.	\N	\N	BUFALO MIX S.A.S.	\N	planetarica@bufalosmix.com	\N	\N	1
187	\N	\N	901444902	\N	 (000) 0000000	BUSIC COMERCIALIZADORA EL NUEVO INGENIO S.A.S	BUSIC COMERCIALIZADORA EL NUEVO INGENIO S.A.S	\N	\N	BUSIC COMERCIALIZADORA EL NUEVO INGENIO S.A.S	\N	BUSICNUEVOINGENIO@GMAIL.COM	\N	\N	1
188	\N	\N	901639484	\N	 (000) 0000000	BUXURY S.A.S.	BUXURY S.A.S.	\N	\N	BUXURY S.A.S.	\N	contabilidad@buxury.co	\N	\N	1
189	\N	\N	8090935401	\N	 (000) 0000000	BYR INGENIERIA FLUIDO S.A.S	BYR INGENIERIA FLUIDO S.A.S	\N	\N	BYR INGENIERIA FLUIDO S.A.S	\N	CONTABILIDAD@BYR.COM.COM	\N	\N	1
190	\N	\N	900176227	\N	 (000) 0000000	C. M. B. PROYECTOS S.A.S.	C. M. B. PROYECTOS S.A.S.	\N	\N	C. M. B. PROYECTOS S.A.S.	\N	CMB900176227@GMAIL.COM	\N	\N	1
192	\N	\N	800174121	\N	 (000) 0000000	C.I. HIDROGEO S.A.S.	C.I. HIDROGEO S.A.S. MOYA	\N	\N	C.I. HIDROGEO S.A.S. MOYA	\N	pluzangela@hotmail.com	\N	\N	1
193	\N	\N	901787832	\N	 (000) 0000000	CA BOBINADOS SAS	CA BOBINADOS SAS	\N	\N	CA BOBINADOS SAS	\N	contabilidadbobinados@hotmail.com	\N	\N	1
194	\N	\N	811044279	\N	 (000) 0000000	CADENAS Y COMPLEMENTOS S.A.S	CADENAS Y COMPLEMENTOS S.A.S	\N	\N	CADENAS Y COMPLEMENTOS S.A.S	\N	facturacion@cadenasycomplementos.com	\N	\N	1
195	\N	\N	900392211	\N	 (000) 0000000	CAFE DE SANTA BARBARA S.A.S	CAFE DE SANTA BARBARA S.A.S	\N	\N	CAFE DE SANTA BARBARA S.A.S	\N	\N	\N	\N	1
196	\N	\N	900990900	\N	 (000) 0000000	CAJAS YA S.A.S	CAJAS YA S.A.S	\N	\N	CAJAS YA S.A.S	\N	\N	\N	\N	1
197	\N	\N	1099708621	\N	 (000) 0000000	CAMILO MARTINEZ TORO	CAMILO MARTINEZ TORO	\N	\N	CAMILO MARTINEZ TORO	\N	MARTINEZTOROCAMILO@GMAIL.COM	\N	\N	1
198	\N	\N	901083135	\N	 (000) 0000000	CAMISERIA EUROPEA SAS	CAMISERIA EUROPEA SAS	\N	\N	CAMISERIA EUROPEA SAS	\N	CAMISERIAEUROPEASAS@GMAIL.COM	\N	\N	1
199	\N	\N	8437102	\N	 (000) 0000000	CANDELARIO LOZANO	CONSTRUHOGAR Y ACABADOS LOZANO	\N	\N	CONSTRUHOGAR Y ACABADOS LOZANO	\N	candelario.2010@hotmail.com	\N	\N	1
200	\N	\N	901865898	\N	 (000) 0000000	CARBONES LA RAMADA S.A.S	CARBONES LA RAMADA S.A.S	\N	\N	CARBONES LA RAMADA S.A.S	\N	CARBONESLARAMADA@GMAIL.COM	\N	\N	1
201	\N	\N	900503582	\N	 (000) 0000000	CARBONES PUERTA DE OCCIDENTE S.A.S	CARBONES PUERTA DE OCCIDENTE S.A.S	\N	\N	CARBONES PUERTA DE OCCIDENTE S.A.S	\N	pradomontero@hotmail.com	\N	\N	1
202	\N	\N	890903357	\N	 (000) 48473186	CARBONES SAN FERNANDO	CARBONES SAN FERNANDO	\N	\N	CARBONES SAN FERNANDO	\N	recepcionfacturacion@csfdo.com	\N	\N	1
203	\N	\N	1049021155	\N	 (000) 0000000	CARLOS ALBERTO BERNAL PIRATEQUE	CARLOS ALBERTO BERNAL PIRATEQUE	\N	\N	CARLOS ALBERTO BERNAL PIRATEQUE	\N	piratequecarlosalberto@gmail.com	\N	\N	1
204	\N	\N	70089953	\N	 (000) 0000000	CARLOS ALBERTO ESCOBAR RESTREPO	CARLOS ALBERTO ESCOBAR RESTREPO	\N	\N	CARLOS ALBERTO ESCOBAR RESTREPO	\N	\N	\N	\N	1
205	\N	\N	1015276248	\N	 (000) 0000000	CARLOS ALBERTO PARRA MARIN	CARLOS ALBERTO PARRA MARIN	\N	\N	CARLOS ALBERTO PARRA MARIN	\N	petoelmore@gmail.com	\N	\N	1
206	\N	\N	15334981	\N	 (000) 0000000	CARLOS ALBERTO VALLE SANCHEZ	CARLOS ALBERTO VALLE SANCHEZ	\N	\N	CARLOS ALBERTO VALLE SANCHEZ	\N	carlosalbertovallesanchez@gmail.com	\N	\N	1
207	\N	\N	1088257544	\N	 (000) 0000000	CARLOS ANDRES MORROY MORALES	CARLOS ANDRES MORROY MORALES	\N	\N	CARLOS ANDRES MORROY MORALES	\N	MORALESANDRES283@GMAIL.COM	\N	\N	1
208	\N	\N	80312456	\N	 (000) 0000000	CARLOS ANDRES MOYA ROJAS	CARLOS ANDRES MOYA ROJAS	\N	\N	CARLOS ANDRES MOYA ROJAS	\N	abrasivosyadhesivosjm@gmail.com	\N	\N	1
209	\N	\N	71214217	\N	 (000) 0000000	CARLOS ANDRES PEREZ OROZCO	CARLOS ANDRES PEREZ OROZCO	\N	\N	CARLOS ANDRES PEREZ OROZCO	\N	CARLOSANDRESCOMERCIAL@GMAIL.COM	\N	\N	1
210	\N	\N	8355334	\N	 (000) 0000000	CARLOS ANDRES SANCHEZ DUQUE	CARLOS ANDRES SANCHEZ DUQUE	\N	\N	CARLOS ANDRES SANCHEZ DUQUE	\N	\N	\N	\N	1
211	\N	\N	71669322	\N	 (000) 0000000	CARLOS ANIBAL PEÑA GIRALDO	CARLOS ANIBAL PEÑA GIRALDO	\N	\N	CARLOS ANIBAL PEÑA GIRALDO	\N	capena19@hotmail.com	\N	\N	1
212	\N	\N	98486581	\N	 (000) 3007854856	CARLOS ARTURO CARDONA ORTEGA	CARLOS ARTURO CARDONA ORTEGA	\N	\N	CARLOS ARTURO CARDONA ORTEGA	\N	carloss.cardonao@gmail.com	\N	\N	1
213	\N	\N	71737989	\N	 (000) 0000000	CARLOS ARTURO LONDOÑO RAMIREZ	CARLOS ARTURO LONDOÑO RAMIREZ	\N	\N	CARLOS ARTURO LONDOÑO RAMIREZ	\N	\N	\N	\N	1
214	\N	\N	9809774	\N	 (000) 0000000	CARLOS AUGUSTO CRUZ TORRES	CARLOS AUGUSTO CRUZ TORRES	\N	\N	CARLOS AUGUSTO CRUZ TORRES	\N	SERVIELECTRICOCRUZMARMATO@GMAIL.COM	\N	\N	1
215	\N	\N	71535599	\N	 (000) 0000000	CARLOS BETANCUR MIRA	CARLOS BETANCUR MIRA	\N	\N	CARLOS BETANCUR MIRA	\N	cbetancur@geneticaselecta.com.co	\N	\N	1
216	\N	\N	98543355	\N	 (00) 0000000	CARLOS EMILIO LONDIOÑO GUTIERREZ	CARLOS EMILIO LONDIOÑO GUTIERREZ	\N	\N	CARLOS EMILIO LONDIOÑO GUTIERREZ	\N	mvcarlosel@yahoo.com	\N	\N	1
217	\N	\N	8237750	\N	 (000) 0000000	CARLOS ERNESTO MEJIA FONNEGRA	CARLOS ERNESTO MEJIA FONNEGRA	\N	\N	CARLOS ERNESTO MEJIA FONNEGRA	\N	cemejiaf234@gmail.com	\N	\N	1
218	\N	\N	1214717951	\N	\N	CARLOS ESTEBAN MEJIA MONSALVE	CARLOS ESTEBAN MEJIA MONSALVE	\N	\N	CARLOS ESTEBAN MEJIA MONSALVE	\N	estebanmejiamechas317@gmail.com	\N	\N	1
219	\N	\N	3507992	\N	 (000) 0000000	CARLOS GOMEZ GALLEGO	CARLOS GOMEZ GALLEGO	\N	\N	CARLOS GOMEZ GALLEGO	\N	SANTOS270680@HOTMAIL.COM	\N	\N	1
220	\N	\N	70561329	\N	 (000) 0000000	CARLOS HENRIQUE VELEZ MORENO	CARLOS HENRIQUE VELEZ MORENO	\N	\N	CARLOS HENRIQUE VELEZ MORENO	\N	calichev@hotmail.com	\N	\N	1
221	\N	\N	15258198	\N	 (000) 0000000	CARLOS HERNAN ZAPATA CALLE	CARLOS HERNAN ZAPATA CALLE	\N	\N	CARLOS HERNAN ZAPATA CALLE	\N	hzapata06@hotmail.com	\N	\N	1
222	\N	\N	71736015	\N	 (000) 0000000	CARLOS MARIO CASTAÑO VALENCIA	CARLOS MARIO CASTAÑO VALENCIA	\N	\N	CARLOS MARIO CASTAÑO VALENCIA	\N	Juandanca@hotmail.com	\N	\N	1
223	\N	\N	71611748	\N	 (000) 0000000	CARLOS MARIO MONSALVE	CARLOS MARIO MONSALVE	\N	\N	CARLOS MARIO MONSALVE	\N	carlosmariomonsalve24@gmail.com	\N	\N	1
224	\N	\N	15324361	\N	 (00) 0000000	CARLOS MARIO MONTES PALACIO	CARLOS MARIO MONTES PALACIO	\N	\N	CARLOS MARIO MONTES PALACIO	\N	agropecuariayarumal2025@gmail.com	\N	\N	1
225	\N	\N	15324361	\N	3155923010	CARLOS MARIO MONTES PALACIO	CARLOS MARIO MONTES PALACIO	\N	\N	CARLOS MARIO MONTES PALACIO	\N	agropecuariayarumal2025@gmail.com	\N	\N	1
226	\N	\N	98497906	\N	 (000) 0000000	CARLOS MARIO PATIÑO TORO	CARLOS MARIO PATIÑO TORO	\N	\N	CARLOS MARIO PATIÑO TORO	\N	logisticaaqp3@gmail.com	\N	\N	1
227	\N	\N	71606604	\N	 (00) 3014242	CARLOS MARIO RESTREPO GARCES	CARLOS MARIO RESTREPO GARCES	\N	\N	CARLOS MARIO RESTREPO GARCES	\N	CONTABILIDAD.CMRG@CARGA.COM.CO	\N	\N	1
228	\N	\N	1035872935	\N	 (000) 0000000	CARLOS PINEDA	CARLOS PINEDA	\N	\N	CARLOS PINEDA	\N	andrespineda2116@gmail.com	\N	\N	1
229	\N	\N	682600260	\N	 (000) 0000000	CARLOS SANTIAGO MEJIA CORREA	CARLOS SANTIAGO MEJIA CORREA	\N	\N	CARLOS SANTIAGO MEJIA CORREA	\N	REPUBLICATEXTILSAS@GMAIL.COM	\N	\N	1
230	\N	\N	49687887	\N	 (000) 0000000	CARMEN MARBELI AMAYA OVALLE	CARMEN MARBELI AMAYA OVALLE	\N	\N	CARMEN MARBELI AMAYA OVALLE	\N	elavicultorcarmenamaya@hotmail.com	\N	\N	1
231	\N	\N	901673971	\N	 (00) 0000000	CARMENSACHA S.A.S	CARMENSACHA S.A.S	\N	\N	CARMENSACHA S.A.S	\N	contacto@innovacioncontable.com.co	\N	\N	1
232	\N	\N	22647229	\N	 (000) 0000000	CAROL MARCELA NOBMANN ROCHA	CAROL MARCELA NOBMANN ROCHA	\N	\N	CAROL MARCELA NOBMANN ROCHA	\N	gnormagsas@gmail.com	\N	\N	1
233	\N	\N	1037614213	\N	 (000) 0000000	CAROLINA VELEZ GIRALDO	CAROLINA VELEZ GIRALDO	\N	\N	CAROLINA VELEZ GIRALDO	\N	carolina.velez.giraldo@gmail.com	\N	\N	1
234	\N	\N	901168737	\N	 (000) 0000000	CARPEG SAS	CARPEG SAS	\N	\N	CARPEG SAS	\N	\N	\N	\N	1
235	\N	\N	890930490	\N	 (000) 0000000	CARROCERIAS PANAMERICANA SAS	CARROCERIAS PANAMERICANA SAS	\N	\N	CARROCERIAS PANAMERICANA SAS	\N	gloria.urrego@soycp.com	\N	\N	1
236	\N	\N	890937010	\N	 (000) 0000000	CASA FERRETERA S.A.S	CASA FERRETERA S.A.S	\N	\N	CASA FERRETERA S.A.S	\N	\N	\N	\N	1
237	\N	\N	901363894	\N	 (000) 0000000	CASAMALIA S.A.S	CASAMALIA S.A.S	\N	\N	CASAMALIA S.A.S	\N	casamaliafacturacion@gmail.com	\N	\N	1
238	\N	\N	800056670	\N	 (000) 0000000	CAUCHOS ESPECIALES MALACA S.A.S	CAUCHOS ESPECIALES MALACA S.A.S	\N	\N	CAUCHOS ESPECIALES MALACA S.A.S	\N	\N	\N	\N	1
239	\N	\N	811004468	\N	 (000) 0000000	CAUDALES Y PRESIONES S.A.S	CAUDALES Y PRESIONES S.A.S	\N	\N	CAUDALES Y PRESIONES S.A.S	\N	administrativo@qyp.com.co	\N	\N	1
240	\N	\N	811033997	\N	 (000) 0000000	CDEM & CDEB S.A.S.	CDEM & CDEB S.A.S.	\N	\N	CDEM & CDEB S.A.S.	\N	recepcionfacturas@centraldemangueras.com.co	\N	\N	1
241	\N	\N	811033997	\N	\N	CDEM & CDEB S.A.S.	ventas1.medellin @centraldemangueras.com.co	\N	\N	ventas1.medellin @centraldemangueras.com.co	\N	ventas1.medellin@centraldemangueras.com.co	\N	\N	1
242	\N	\N	901456237	\N	 (000) 0000000	CEMAY GROUP SAS	CEMAY GROUP SAS	\N	\N	CEMAY GROUP SAS	\N	cevherdaglioglu@gmail.com	\N	\N	1
243	\N	\N	890100251	\N	 (00) 0000000	CEMENTOS ARGOS S.A	CEMENTOS ARGOS S.A	\N	\N	CEMENTOS ARGOS S.A	\N	correonotificaciones@argos.com.co	\N	\N	1
244	\N	\N	890100251	\N	\N	CEMENTOS ARGOS S.A	contabilidadaqp9@gmail.com	\N	\N	contabilidadaqp9@gmail.com	\N	contabilidadaqp9@gmail.com	\N	\N	1
245	\N	\N	890100251	\N	\N	CEMENTOS ARGOS S.A	rvargasj@argos.com.co	\N	\N	rvargasj@argos.com.co	\N	rvargasj@argos.com.co	\N	\N	1
246	\N	\N	1152212506	\N	 (000) 0000000	CENTRAL DE HERRAMIENTAS	CENTRAL HERRAMIENTAS	\N	\N	CENTRAL HERRAMIENTAS	\N	centralherramientas0436@gmail.com	\N	\N	1
247	\N	\N	901769751	\N	 (000) 0000000	CENTRO TURISTICO SOPETRAN CTS SAS	CENTRO TURISTICO SOPETRAN CTS SAS	\N	\N	CENTRO TURISTICO SOPETRAN CTS SAS	\N	INFOCENTROTURISTICOSOPETRAN@GMAIL.COM	\N	\N	1
248	\N	\N	900639228	\N	 (000) 0000000	CERCAS Y RIEGOS DEL CARIBE SAS	CERCAS Y RIEGOS DEL CARIBE SAS	\N	\N	CERCAS Y RIEGOS DEL CARIBE SAS	\N	cenith.sanjuanelo@alg.com.co	\N	\N	1
249	\N	\N	901265547	\N	 (000) 0000000	CES RED LOGISTICA S.A.S	CES RED LOGISTICA S.A.S	\N	\N	CES RED LOGISTICA S.A.S	\N	\N	\N	\N	1
250	\N	\N	98496821	\N	 (000) 0000000	CESAR AUGUSTO TABORDA SANCHEZ	CESAR AUGUSTO TABORDA SANCHEZ	\N	\N	CESAR AUGUSTO TABORDA SANCHEZ	\N	CSANCHEZ0203@GMAIL.COM	\N	\N	1
251	\N	\N	71800259	\N	 (000) 0000000	CESAR EUGENIO CARBAJAL AREIZA	CESAR EUGENIO CARBAJAL AREIZA	\N	\N	CESAR EUGENIO CARBAJAL AREIZA	\N	carlosmduque@hotmail.es	\N	\N	1
252	\N	\N	71723817	\N	\N	CESAR EUGENIO MARTINEZ RESTREPO	CESAR EUGENIO MARTINEZ RESTREPO	\N	\N	CESAR EUGENIO MARTINEZ RESTREPO	\N	cesaremartinez01@gmail.com	\N	\N	1
253	\N	\N	901290170	\N	 (000) 0000000	CHEF INVESTMENT S.A.S	CHEF INVESTMENT S.A.S	\N	\N	CHEF INVESTMENT S.A.S	\N	facturacion@thechefisback.com	\N	\N	1
254	\N	\N	700007698	\N	 (000) 0000000	CHEN SHAORU	CHEN SHAORU	\N	\N	CHEN SHAORU	\N	\N	\N	\N	1
255	\N	\N	901609924	\N	 (00) 3176707069	CHUSCALITO HASS S.A.S.	CHUSCALITO HASS S.A.S.	\N	\N	CHUSCALITO HASS S.A.S.	\N	chuscalitohass@gmail.com	\N	\N	1
256	\N	\N	901457977	\N	 (000) 0000000	CIBERSACHA S.A.S.	CIBERSACHA S.A.S.	\N	\N	CIBERSACHA S.A.S.	\N	admoncibersacha@gmail.com	\N	\N	1
257	\N	\N	900462911	\N	 (000) 0000000	CICLOLINEA S.A.S.	CICLOLINEA S.A.S.	\N	\N	CICLOLINEA S.A.S.	\N	ciclolineasas@hotmail.com	\N	\N	1
258	\N	\N	900960456	\N	 (000) 0000000	CIMA OCUPACIONAL SAS	CIMA OCUPACIONAL SAS	\N	\N	CIMA OCUPACIONAL SAS	\N	facturacionycartera@cimaocupacional.com.co	\N	\N	1
259	\N	\N	890321924	\N	 (000) 4430801	CINTAS ANDINAS DE COLOMBIA S.A.	CINTAS ANDINAS DE COLOMBIA S.A.	\N	\N	CINTAS ANDINAS DE COLOMBIA S.A.	\N	fe.clientes@cintandina.com	\N	\N	1
260	\N	\N	32460700	\N	3148338025	CLARA EUGENIA ESCOBAR DE GARRIDO	CLARA EUGENIA ESCOBAR DE GARRIDO	\N	\N	CLARA EUGENIA ESCOBAR DE GARRIDO	\N	clara.escobar@udea.edu.co	\N	\N	1
261	\N	\N	1127940670	\N	 (00) 0000000	CLAUDIA BELTRAN	CLAUDIA BELTRAN	\N	\N	CLAUDIA BELTRAN	\N	claudiabeltrans@gmail.com	\N	\N	1
262	\N	\N	1041202379	\N	 (000) 0000000	CLAUDIA MARCELA PINEDA ARIAS	CLAUDIA MARCELA PINEDA ARIAS	\N	\N	CLAUDIA MARCELA PINEDA ARIAS	\N	tornilleriagilcol@gmail.com	\N	\N	1
263	\N	\N	44001226	\N	 (000) 0000000	CLAUDIA PATRICIA CAÑAVERAL AMAYA	CLAUDIA PATRICIA CAÑAVERAL AMAYA	\N	\N	CLAUDIA PATRICIA CAÑAVERAL AMAYA	\N	\N	\N	\N	1
264	\N	\N	43092776	\N	 (000) 0000000	CLAUDIA PATRICIA ZAMBRANO TRIANA	CLAUDIA PATRICIA ZAMBRANO TRIANA	\N	\N	CLAUDIA PATRICIA ZAMBRANO TRIANA	\N	CLINICADELASELLADORAS@GMAIL.COM	\N	\N	1
265	\N	\N	1044502505	\N	 (000) 0000000	CLAUDIA YULIETH GUTIERRES VASQUEZ	CLAUDIA YULIETH GUTIERRES VASQUEZ	\N	\N	CLAUDIA YULIETH GUTIERRES VASQUEZ	\N	cyguva2016@gmail.com	\N	\N	1
266	\N	\N	900186076	\N	 (000) 0000000	COCO RESTREPO S.A.S	COCO RESTREPO S.A.S	\N	\N	COCO RESTREPO S.A.S	\N	nsaldarr@gmail.com	\N	\N	1
267	\N	\N	900993023	\N	 (000) 0000000	COCOROLLO EL ALTICO S.A.S	COCOROLLO EL ALTICO S.A.S	\N	\N	COCOROLLO EL ALTICO S.A.S	\N	analistacontablesur@cocorollo.com	\N	\N	1
268	\N	\N	901300741	\N	 (000) 0000000	COESCO COLOMBIA SAS	COESCO COLOMBIA SAS	\N	\N	COESCO COLOMBIA SAS	\N	\N	\N	\N	1
269	\N	\N	830114921	\N	 (000) 0000000	COLOMBIA MOVIL S.A. ESP	COLOMBIA MOVIL S.A. ESP	\N	\N	COLOMBIA MOVIL S.A. ESP	\N	facturacionelectronica@tigo.com.co	\N	\N	1
270	\N	\N	901703213	\N	 (00) 0000000	COLOMBIAN CITRUS S.A.S	COLOMBIAN CITRUS S.A.S	\N	\N	COLOMBIAN CITRUS S.A.S	\N	ccolombiancitrussas@gmail.com	\N	\N	1
271	\N	\N	890900943	\N	 (000) 0000000	COLOMBIANA DE COMERCIO S.A.	ALKOMPRAR	\N	\N	ALKOMPRAR	\N	servicioalcliente@alkomprar.com.co	\N	\N	1
272	\N	\N	800185306	\N	 (000) 0000000	COLVANES S.A.S	COLVANES S.A.S	\N	\N	COLVANES S.A.S	\N	facturacionelectronica@envia.co	\N	\N	1
273	\N	\N	900675169	\N	 (000) 0000000	COMBURED S.A.S	COMBURED S.A.S	\N	\N	COMBURED S.A.S	\N	combured@combured.co	\N	\N	1
274	\N	\N	830513729	\N	 (000) 0000000	COMBUSTIBLES DE COLOMBIA S.A.	COMBUSTIBLES DE COLOMBIA S.A.	\N	\N	COMBUSTIBLES DE COLOMBIA S.A.	\N	\N	\N	\N	1
275	\N	\N	860061938	\N	 (00) 0000000	COMERCIAL DE RIEGOS LTDA	COMERCIAL DE RIEGOS LTDA	\N	\N	COMERCIAL DE RIEGOS LTDA	\N	FACTURACIONCOMERCIALDERIEGOS@GMAIL.COM	\N	\N	1
276	\N	\N	860061938	\N	\N	COMERCIAL DE RIEGOS LTDA	COMERCIAL DE RIEGOS LTDA	\N	\N	COMERCIAL DE RIEGOS LTDA	\N	contabilidad@comercialderiegos.net	\N	\N	1
277	\N	\N	811004307	\N	 (000) 0000000	COMERCIAL MARLUJOS S.A.S	COMERCIAL MARLUJOS S.A.S	\N	\N	COMERCIAL MARLUJOS S.A.S	\N	\N	\N	\N	1
278	\N	\N	800002026	\N	 (000) 0000000	COMERCIAL MODELO S.A.S	COMERCIAL MODELO S.A.S	\N	\N	COMERCIAL MODELO S.A.S	\N	\N	\N	\N	1
279	\N	\N	900428753	\N	 (000) 0000000	COMERCIALIZADORA AL COSTO S.A.S	COMERCIALIZADORA AL COSTO S.A.S	\N	\N	COMERCIALIZADORA AL COSTO S.A.S	\N	carteraclientes1212@gmail.com	\N	\N	1
280	\N	\N	900811469	\N	 (000) 0000000	COMERCIALIZADORA CALDERIN S.A.S.	COMERCIALIZADORA CALDERIN S.A.S.	\N	\N	COMERCIALIZADORA CALDERIN S.A.S.	\N	calderinmendes@gmail.com	\N	\N	1
281	\N	\N	901180010	\N	 (000) 0000000	COMERCIALIZADORA DE ACCESORIOS LD S.A.S	COMERCIALIZADORA DE ACCESORIOS LD S.A.S	\N	\N	COMERCIALIZADORA DE ACCESORIOS LD S.A.S	\N	\N	\N	\N	1
282	\N	\N	900705286	\N	 (000) 0000000	COMERCIALIZADORA DE MOTOS, PARTES Y ACCESORIOS S.A.S	COMERCIALIZADORA DE MOTOS, PARTES Y ACCESORIOS S.A.S	\N	\N	COMERCIALIZADORA DE MOTOS, PARTES Y ACCESORIOS S.A.S	\N	\N	\N	\N	1
283	\N	\N	900433921	\N	 (00) 8608029	COMERCIALIZADORA E INVERSIONES PRECIADO S.A.S	COMERCIALIZADORA E INVERSIONES PRECIADO S.A.S	\N	\N	COMERCIALIZADORA E INVERSIONES PRECIADO S.A.S	\N	agenciaelcampesino@gmail.com	\N	\N	1
284	\N	\N	900433921	\N	3113243155	COMERCIALIZADORA E INVERSIONES PRECIADO S.A.S	HERNAN PRECIADO	\N	\N	HERNAN PRECIADO	\N	AGENCIAELCAMPESINO@GMAIL.COM	\N	\N	1
285	\N	\N	900433921	\N	\N	COMERCIALIZADORA E INVERSIONES PRECIADO S.A.S	HERNAN	\N	\N	HERNAN	\N	\N	\N	\N	1
286	\N	\N	900433921	\N	\N	COMERCIALIZADORA E INVERSIONES PRECIADO S.A.S	agenciaelcampesino@gmail.com	\N	\N	agenciaelcampesino@gmail.com	\N	agenciaelcampesino@gmail.com	\N	\N	1
287	\N	\N	901030551	\N	 (000) 0000000	COMERCIALIZADORA EL NUEVO MILENIUM MERCANTIL S.A.S	COMERCIALIZADORA EL NUEVO MILENIUM MERCANTIL S.A.S	\N	\N	COMERCIALIZADORA EL NUEVO MILENIUM MERCANTIL S.A.S	\N	mileniummerccantil@gmail.com	\N	\N	1
288	\N	\N	901406268	\N	 (000) 0000000	COMERCIALIZADORA FERRETERIA DOS S.A.S	COMERCIALIZADORA FERRETERIA DOS S.A.S	\N	\N	COMERCIALIZADORA FERRETERIA DOS S.A.S	\N	paulapodes2020@gmail.com	\N	\N	1
289	\N	\N	900727436	\N	 (000) 8536369	COMERCIALIZADORA LOS ALBAÑILES S.A.S	COMERCIALIZADORA LOS ALBAÑILES S.A.S	\N	\N	COMERCIALIZADORA LOS ALBAÑILES S.A.S	\N	facturacionalbaniles@hotmail.com	\N	\N	1
290	\N	\N	901741327	\N	 (000) 0000000	COMERCIALIZADORA MUNEVA MUNDIAL S.A.S	COMERCIALIZADORA MUNEVA MUNDIAL S.A.S	\N	\N	COMERCIALIZADORA MUNEVA MUNDIAL S.A.S	\N	ALVAMUNERAVALENCIA@GMAIL.COM	\N	\N	1
291	\N	\N	901532200	\N	 (000) 0000000	COMERCIALIZADORA MUÑOZ PINEDA S.A.S.	COMERCIALIZADORA MUÑOZ PINEDA S.A.S.	\N	\N	COMERCIALIZADORA MUÑOZ PINEDA S.A.S.	\N	dmsalazar10@gmail.com	\N	\N	1
292	\N	\N	901475031	\N	 (000) 0000000	COMERCIALIZADORA PLASTYVIDRIOS S.A.S	COMERCIALIZADORA PLASTYVIDRIOS S.A.S	\N	\N	COMERCIALIZADORA PLASTYVIDRIOS S.A.S	\N	arseniozapata628@gmail.com	\N	\N	1
293	\N	\N	800190665	\N	 (00) 3528585	COMERCIALIZADORA S.Y E. Y CIA S.A.S	COMERCIALIZADORA S.Y E. Y CIA S.A.S	\N	\N	COMERCIALIZADORA S.Y E. Y CIA S.A.S	\N	compras@sye.com.co	\N	\N	1
294	\N	\N	900466794	\N	 (000) 0000000	COMERCIALIZADORA SERVIENSAMBLE S.A.S	COMERCIALIZADORA SERVIENSAMBLE S.A.S	\N	\N	COMERCIALIZADORA SERVIENSAMBLE S.A.S	\N	serviensamble@serviensamble.com	\N	\N	1
295	\N	\N	901106939	\N	 (000) 0000000	COMERCIALIZADORA SIVELEZ S.A.S	COMERCIALIZADORA SIVELEZ S.A.S	\N	\N	COMERCIALIZADORA SIVELEZ S.A.S	\N	sivelezcompras@gmail.com	\N	\N	1
296	\N	\N	900879821	\N	 (000) 0000000	COMERCIALIZADORA TECNOLOGICA CQV SAS	COMERCIALIZADORA TECNOLOGICA CQV SAS	\N	\N	COMERCIALIZADORA TECNOLOGICA CQV SAS	\N	gerencia@elpuntodelaimpresora.com	\N	\N	1
297	\N	\N	901390958	\N	 (000) 0000000	COMERCIALIZADORA Y PROCESOS MAPEVID S.A.S	COMERCIALIZADORA Y PROCESOS MAPEVID S.A.S	\N	\N	COMERCIALIZADORA Y PROCESOS MAPEVID S.A.S	\N	comercioyprocesosmapevid@gmail.com	\N	\N	1
298	\N	\N	901433296	\N	 (000) 0000000	COMERCIALIZADORA, DEPOSITO Y BLOQUERA SAN MIGUEL S.A.S	COMERCIALIZADORA, DEPOSITO Y BLOQUERA SAN MIGUEL S.A.S	\N	\N	COMERCIALIZADORA, DEPOSITO Y BLOQUERA SAN MIGUEL S.A.S	\N	dianapinedaospina.1969@gmail.com	\N	\N	1
299	\N	\N	901407369	\N	 (000) 0000000	COMERCIO Y PROCESOS PLUS	COMERCIO Y PROCESOS PLUS	\N	\N	COMERCIO Y PROCESOS PLUS	\N	comercioyprocesosplus@hotmail.com	\N	\N	1
300	\N	\N	900734339	\N	 (000) 0000000	COMO CAIDO DEL CIELO SAS	COMO CAIDO DEL CIELO SAS	\N	\N	COMO CAIDO DEL CIELO SAS	\N	\N	\N	\N	1
301	\N	\N	800069933	\N	 (000) 0000000	COMODIN S.A.S.	COMODIN S.A.S.	\N	\N	COMODIN S.A.S.	\N	\N	\N	\N	1
302	\N	\N	811026870	\N	 (00) 0000000	COMPAÑIA IMPULSADORA INMOBILIARIA S.A.	COMPAÑIA IMPULSADORA INMOBILIARIA S.A.	\N	\N	COMPAÑIA IMPULSADORA INMOBILIARIA S.A.	\N	CIMINSA@UNE.NET.CO	\N	\N	1
303	\N	\N	860037013	\N	 (000) 0000000	COMPAÑIA MUNDIAL DE SEGUROS S.A.	COMPAÑIA MUNDIAL DE SEGUROS S.A.	\N	\N	COMPAÑIA MUNDIAL DE SEGUROS S.A.	\N	\N	\N	\N	1
304	\N	\N	900984639	\N	 (000) 0000000	COMPREBUCE S.A.S	COMPREBUCE S.A.S	\N	\N	COMPREBUCE S.A.S	\N	EMPRESACOMPREBUCE@GMAIL.COM	\N	\N	1
305	\N	\N	890936356	\N	 (000) 0000000	CON RIEGO LTDA	CON RIEGO LTDA	\N	\N	CON RIEGO LTDA	\N	conriego1@gmail.com	\N	\N	1
306	\N	\N	800006593	\N	 (000) 0000000	CONFECCIONES MILLAR S.A S	JUAN  RINCON	\N	\N	JUAN  RINCON	\N	administracion@cmillar.co	\N	\N	1
307	\N	\N	901782506	\N	 (000) 0000000	CONJUNTO RESIDENCIAL CONTREE PALMAS-PROPIEDAD HORIZONTAL	DANIELA	\N	\N	DANIELA	\N	contreepalmasph@gmail.com	\N	\N	1
308	\N	\N	901134187	\N	 (000) 0000000	CONSORCIO YARAGUA S.A.S.	CONSORCIO YARAGUA S.A.S.	\N	\N	CONSORCIO YARAGUA S.A.S.	\N	consorcioyaragua@gmail.com	\N	\N	1
309	\N	\N	900862896	\N	 (000) 0000000	CONSTRUACABADOS J&M S.A.S	CONSTRUACABADOS J&M S.A.S	\N	\N	CONSTRUACABADOS J&M S.A.S	\N	construacabadosjym@gmail.com	\N	\N	1
310	\N	\N	901526787	\N	 (000) 0000000	CONSTRUC TIERRA	CONSTRUC TIERRA	\N	\N	CONSTRUC TIERRA	\N	constructierra.sas@gmail.com	\N	\N	1
311	\N	\N	901295686	\N	 (000) 0000000	CONSTRUCCIONES CADEL SAS	CONSTRUCCIONES CADEL SAS	\N	\N	CONSTRUCCIONES CADEL SAS	\N	comprascadelsas@gmail.com	\N	\N	1
312	\N	\N	901684535	\N	 (000) 0000000	CONSTRUCCIONES E INGENIERIA	CONSTRUCCIONES E INGENIERIA	\N	\N	CONSTRUCCIONES E INGENIERIA	\N	constructoracoinges@hotmail.com	\N	\N	1
313	\N	\N	900164459	\N	 (000) 0000000	CONSTRUCCIONES ECHEVERRI HENAO SAS	CONSTRUCCIONES ECHEVERRI HENAO SAS	\N	\N	CONSTRUCCIONES ECHEVERRI HENAO SAS	\N	FACTURACION@CEHSAS.COM.CO	\N	\N	1
314	\N	\N	890922447	\N	 (000) 0000000	CONSTRUCCIONES EL CONDOR S.A	CONSTRUCCIONES EL CONDOR S.A	\N	\N	CONSTRUCCIONES EL CONDOR S.A	\N	notificaciones.judiciales@elcondor.com	\N	\N	1
315	\N	\N	901773858	\N	 (000) 0000000	CONSTRUCCIONES Y FIBRA DE VIBRO S.A.S	CONSTRUCCIONES Y FIBRA DE VIBRO S.A.S	\N	\N	CONSTRUCCIONES Y FIBRA DE VIBRO S.A.S	\N	CONSTRUCCIONESYFIBRADEVIBROSAS@GMAIL.COM	\N	\N	1
316	\N	\N	900492772	\N	 (000) 0000000	CONSTRUCCIONES, MATERIALES Y SUMINISTROS HISPANIA	CONSTRUCCIONES, MATERIALES Y SUMINISTROS HISPANIA	\N	\N	CONSTRUCCIONES, MATERIALES Y SUMINISTROS HISPANIA	\N	\N	\N	\N	1
317	\N	\N	9005014971	\N	 (000) 0000000	CONSTRUCTORA ARBEN S.A.S	CONSTRUCTORA ARBEN S.A.S	\N	\N	CONSTRUCTORA ARBEN S.A.S	\N	construccionesjoar@gmail.com	\N	\N	1
318	\N	\N	890901110	\N	 (00) 0000000	CONSTRUCTORA CONCONCRETO S.A	CONSTRUCTORA CONCONCRETO S.A	\N	\N	CONSTRUCTORA CONCONCRETO S.A	\N	tramiteslegales@conconcreto.com	\N	\N	1
319	\N	\N	900229985	\N	 (00) 0000000	CONSTRUCTORA DURAN OCAMPO S.A.S	CONSTRUCTORA DURAN OCAMPO S.A.S	\N	\N	CONSTRUCTORA DURAN OCAMPO S.A.S	\N	info@duranocampo.com.co	\N	\N	1
320	\N	\N	21978809	\N	 (000) 0000000	CONSUELO DE JESUS RESTREPO ZAPATA	CONSUELO DE JESUS RESTREPO ZAPATA	\N	\N	CONSUELO DE JESUS RESTREPO ZAPATA	\N	CONTABILIDADFERRETERIAVELASGUE@GMAIL.COM	\N	\N	1
321	\N	\N	2,22222E+11	\N	\N	Consumidor Final	Consumidor Final	\N	\N	Consumidor Final	\N	\N	\N	\N	1
322	\N	\N	2,22222E+11	\N	\N	Consumidor Final	ACQUAPACK facturacion	\N	\N	ACQUAPACK facturacion	\N	\N	\N	\N	1
323	\N	\N	2,22222E+11	\N	\N	Consumidor Final	facturacion facturacion	\N	\N	facturacion facturacion	\N	\N	\N	\N	1
324	\N	\N	2,22222E+11	\N	\N	Consumidor Final	FACTURA facturacion	\N	\N	FACTURA facturacion	\N	\N	\N	\N	1
325	\N	\N	2,22222E+11	\N	\N	Consumidor Final	ACQUAPACK facturacion	\N	\N	ACQUAPACK facturacion	\N	\N	\N	\N	1
326	\N	\N	2,22222E+11	\N	\N	Consumidor Final	ALEJANDRO facturacion	\N	\N	ALEJANDRO facturacion	\N	\N	\N	\N	1
327	\N	\N	2,22222E+11	\N	\N	Consumidor Final	factura consumidor	\N	\N	factura consumidor	\N	\N	\N	\N	1
328	\N	\N	2,22222E+11	\N	\N	Consumidor Final	elkin facturacion	\N	\N	elkin facturacion	\N	\N	\N	\N	1
329	\N	\N	2,22222E+11	\N	\N	Consumidor Final	facturación facturacion	\N	\N	facturación facturacion	\N	\N	\N	\N	1
330	\N	\N	22222222222	\N	 (00) 0000000	consumidor final	consumidor final	\N	\N	consumidor final	\N	facturacionaqp1@gmail.com	\N	\N	1
331	\N	\N	901124326	\N	 (000) 0000000	CONTACTO GRUPO COMERCIAL 940 SAS	CONTACTO GRUPO COMERCIAL 940 SAS	\N	\N	CONTACTO GRUPO COMERCIAL 940 SAS	\N	contacto940sas@gmail.com	\N	\N	1
332	\N	\N	900936238	\N	 (000) 0000000	CONTERRA PROMOTORA DE PROYECTOS S.A.S	CONTERRA PROMOTORA DE PROYECTOS S.A.S	\N	\N	CONTERRA PROMOTORA DE PROYECTOS S.A.S	\N	administracion@conterra.com.co	\N	\N	1
333	\N	\N	900931213	\N	 (000) 0000000	CONVECCION GESTORES DE PROYECTOS S.A.S	CONVECCION GESTORES DE PROYECTOS S.A.S	\N	\N	CONVECCION GESTORES DE PROYECTOS S.A.S	\N	JORGE.LOPEZ@CONVECCION.COM	\N	\N	1
334	\N	\N	811016571	\N	 (000) 0000000	COODEXIN CTA	COODEXIN CTA	\N	\N	COODEXIN CTA	\N	contabilidad@coodexin.com	\N	\N	1
335	\N	\N	901336364	\N	 (000) 0000000	COOPERAMBIENTES S.A.S.	COOPERAMBIENTES S.A.S.	\N	\N	COOPERAMBIENTES S.A.S.	\N	\N	\N	\N	1
336	\N	\N	890904478	\N	 (00) 4455555	COOPERATIVA COLANTA	COOPERATIVA COLANTA	\N	\N	COOPERATIVA COLANTA	\N	recepcionfe@colanta.com.co	\N	\N	1
337	\N	\N	890904478	\N	\N	COOPERATIVA COLANTA	colanta	\N	\N	colanta	\N	recepcionfe@colanta.com.co	\N	\N	1
338	\N	\N	890904478	\N	\N	COOPERATIVA COLANTA	caraagrocolanta @colonata.com.co	\N	\N	caraagrocolanta @colonata.com.co	\N	caraagrocolanta@colonata.com.co	\N	\N	1
339	\N	\N	890904478	\N	\N	COOPERATIVA COLANTA	llaagrocolanta @colanta.com	\N	\N	llaagrocolanta @colanta.com	\N	llaagrocolanta@colanta.com	\N	\N	1
340	\N	\N	890904478	\N	\N	COOPERATIVA COLANTA	juansg @colanta.com.co	\N	\N	juansg @colanta.com.co	\N	juansg@colanta.com.co	\N	\N	1
341	\N	\N	811022688	\N	 (000) 0000000	COOPERATIVA FINANCIERA DE ANTIOQUIA	COOPERATIVA FINANCIERA DE ANTIOQUIA	\N	\N	COOPERATIVA FINANCIERA DE ANTIOQUIA	\N	\N	\N	\N	1
342	\N	\N	811015077	\N	811015077	COOPERATIVA LECHERA DE BRICEÑO	\N	\N	\N	\N	\N	coolebri@hotmail.com	\N	\N	1
343	\N	\N	890906570	\N	3137689348	COOPERATIVA MULTIACTIVA DE BRICEÑO	\N	\N	\N	\N	\N	coobrice1380@yahoo.es	\N	\N	1
344	\N	\N	901302387	\N	 (000) 0000000	COOPERATIVA MULTIACTIVA DE CAFICULTORES UNIDOS DE COLOMBIA	COOPERATIVA MULTIACTIVA DE CAFICULTORES UNIDOS DE COLOMBIA	\N	\N	COOPERATIVA MULTIACTIVA DE CAFICULTORES UNIDOS DE COLOMBIA	\N	CAFEUCOL@GMAIL.COM	\N	\N	1
345	\N	\N	890905680	\N	 (000) 0000000	COOPERATIVA NORTEÑA DE TRANSPORTADORES LTDA	COONORTE	\N	\N	COONORTE	\N	info@coonorte.com.co	\N	\N	1
346	\N	\N	890200928	\N	 (000) 0000000	COOPERATIVA SANTANDEREANA DE TRANSPORTADORES	COOPERATIVA SANTANDEREANA DE TRANSPORTADORES	\N	\N	COOPERATIVA SANTANDEREANA DE TRANSPORTADORES	\N	\N	\N	\N	1
347	\N	\N	890908374	\N	 (000) 0000000	COOPETRANSA	COOPETRANSA	\N	\N	COOPETRANSA	\N	contactenos@coopetransa.com	\N	\N	1
348	\N	\N	811033292	\N	 (00) 0000000	COOTRAMA	COOTRAMA	\N	\N	COOTRAMA	\N	\N	\N	\N	1
349	\N	\N	800011924	\N	 (000) 0000000	COPROPIEDAD CENTRAL MAYORISTA DE ANTIOQUIA P.H	COPROPIEDAD CENTRAL MAYORISTA DE ANTIOQUIA P.H	\N	\N	COPROPIEDAD CENTRAL MAYORISTA DE ANTIOQUIA P.H	\N	financiera@lamayorista.com.co	\N	\N	1
350	\N	\N	811000231	\N	 (00) 0000000	CORANTIOQUIA	CORANTIOQUIA	\N	\N	CORANTIOQUIA	\N	\N	\N	\N	1
351	\N	\N	800023421	\N	 (000) 0000000	COREMA S.A.S	COREMA S.A.S	\N	\N	COREMA S.A.S	\N	contabilidad@tuberiastepco.com	\N	\N	1
352	\N	\N	901477967	\N	 (000) 0000000	CORPORACION NACIONAL ECOR	CORPORACION NACIONAL ECOR	\N	\N	CORPORACION NACIONAL ECOR	\N	facturacionecoresiduos@gmail.com	\N	\N	1
353	\N	\N	901020206	\N	 (000) 3006610170	CORPORACION PARA LA RECUPERACION Y APROVECHAMIENTO DE RESIDUOS	CORPORACION PARA LA RECUPERACION Y APROVECHAMIENTO DE RESIDUOS	\N	\N	CORPORACION PARA LA RECUPERACION Y APROVECHAMIENTO DE RESIDUOS	\N	corasearesbanco2@gmail.com	\N	\N	1
354	\N	\N	901876266	\N	 (000) 0000000	CORPORACION SOCIAL AGUAS DEL LLANO	CORPORACION SOCIAL AGUAS DEL LLANO	\N	\N	CORPORACION SOCIAL AGUAS DEL LLANO	\N	sergio.restrepo@alsec.com.co	\N	\N	1
355	\N	\N	900509414	\N	 (000) 0000000	COSECOL S.A.S.	COSECOL S.A.S.	\N	\N	COSECOL S.A.S.	\N	COSECOL@HOTMAIL.ES	\N	\N	1
356	\N	\N	890901821	\N	 (000) 0000000	COSERVICIOS S.A.S	COSERVICIOS S.A.S	\N	\N	COSERVICIOS S.A.S	\N	facturas@coservicios.com	\N	\N	1
357	\N	\N	800048369	\N	 (000) 0000000	COTRACIBOL	COTRACIBOL	\N	\N	COTRACIBOL	\N	\N	\N	\N	1
358	\N	\N	900494422	\N	 (00) 0000000	CREIXER S.A.S	CREIXER S.A.S	\N	\N	CREIXER S.A.S	\N	creixersas@gmail.com	\N	\N	1
359	\N	\N	1000570111	\N	 (000) 0000000	CRISTIAN CAMILO ALCARAZ MASO	CRISTIAN CAMILO ALCARAZ MASO	\N	\N	CRISTIAN CAMILO ALCARAZ MASO	\N	SAMAALCARAZ0906@GMAIL.COM	\N	\N	1
360	\N	\N	1038626874	\N	 (000) 0000000	CRISTIAN CAMILO CORREA RESTREPO	CRISTIAN CAMILO CORREA RESTREPO	\N	\N	CRISTIAN CAMILO CORREA RESTREPO	\N	email@domain.com	\N	\N	1
361	\N	\N	8355858	\N	 (000) 0000000	CRISTIAN CAMILO RUEDA CORREA	CRISTIAN CAMILO RUEDA CORREA	\N	\N	CRISTIAN CAMILO RUEDA CORREA	\N	ccrc1983@hotmail.com	\N	\N	1
362	\N	\N	71369840	\N	 (000) 0000000	CRISTIAN ESTABAN HIGUITA CASTAÑEDA	CRISTIAN ESTABAN HIGUITA CASTAÑEDA	\N	\N	CRISTIAN ESTABAN HIGUITA CASTAÑEDA	\N	cresca83@gmail.com	\N	\N	1
363	\N	\N	860000531	\N	 (000) 0000000	CUSEZAR S A CUSEZAR	CUSEZAR S A CUSEZAR	\N	\N	CUSEZAR S A CUSEZAR	\N	comunicaciones@cusezar.com	\N	\N	1
364	\N	\N	900582765	\N	 (000) 0000000	CYBERPLUS COMPUTADORES S.A.S	CYBERPLUS COMPUTADORES S.A.S	\N	\N	CYBERPLUS COMPUTADORES S.A.S	\N	cyberpluscomputadores@gmail.com	\N	\N	1
365	\N	\N	9007595763	\N	 (000) 0000000	DABALL S.A.S	DABALL S.A.S	\N	\N	DABALL S.A.S	\N	dabalsas@gmail.com	\N	\N	1
366	\N	\N	1058230536	\N	 (000) 0000000	DAHIANA CASTAÑO CADAVID	DAHIANA CASTAÑO CADAVID	\N	\N	DAHIANA CASTAÑO CADAVID	\N	DAHIANA1996CASCADA@HOTMAIL.COM	\N	\N	1
367	\N	\N	1039095466	\N	\N	DAINER PACHECO BAUTISTA	DAINER PACHECO BAUTISTA	\N	\N	DAINER PACHECO BAUTISTA	\N	dainerpacheco2017@gmail.com	\N	\N	1
368	\N	\N	3439687	\N	 (000) 0000000	DAIRO PALACIO PEREZ	DAIRO PALACIO PEREZ	\N	\N	DAIRO PALACIO PEREZ	\N	DAELPA@HOTMAIL.COM	\N	\N	1
369	\N	\N	1037634785	\N	 (000) 0000000	DANIEL CAÑAS VALLEJO	DANIEL CAÑAS VALLEJO	\N	\N	DANIEL CAÑAS VALLEJO	\N	danielcanassantamaria@gmail.com	\N	\N	1
370	\N	\N	1128440969	\N	\N	DANIEL CASTAÑO GRISALES	DANIEL CASTAÑO GRISALES	\N	\N	DANIEL CASTAÑO GRISALES	\N	dcastano074@gmail.com	\N	\N	1
371	\N	\N	1017169841	\N	 (000) 0000000	DANIEL CHAVERRA GOMEZ	DANIEL CHAVERRA GOMEZ	\N	\N	DANIEL CHAVERRA GOMEZ	\N	danielchaverragomez@gmail.com	\N	\N	1
372	\N	\N	1128454891	\N	 (000) 0000000	DANIEL GUZMAN GOMEZ	DANIEL GUZMAN GOMEZ	\N	\N	DANIEL GUZMAN GOMEZ	\N	danielguzmango99@gmail.com	\N	\N	1
373	\N	\N	98545951	\N	 (000) 0000000	DANIEL OCHOA MEJIA	DANIEL OCHOA MEJIA	\N	\N	DANIEL OCHOA MEJIA	\N	DANIELOCHOAM69@HOTMAIL.COM	\N	\N	1
374	\N	\N	1040325684	\N	 (000) 0000000	DANIEL OVIDIO LONDOÑO VELASQUEZ	DANIEL OVIDIO LONDOÑO VELASQUEZ	\N	\N	DANIEL OVIDIO LONDOÑO VELASQUEZ	\N	logisticaaqp3@gmail.com	\N	\N	1
375	\N	\N	71751997	\N	 (000) 0000000	DANIEL SALDARRIAGA	DANIEL SALDARRIAGA	\N	\N	DANIEL SALDARRIAGA	\N	dasaldarri@gmail.com	\N	\N	1
376	\N	\N	1037622546	\N	48502240	DANIELA COSSIO ESCOBAR	DANIELA COSSIO ESCOBAR	\N	\N	DANIELA COSSIO ESCOBAR	\N	facturacionhass@gmail.com	\N	\N	1
377	\N	\N	14698585	\N	 (000) 0000000	DANNY JAIR MORENO	DANNY JAIR MORENO	\N	\N	DANNY JAIR MORENO	\N	comercioexpresscity@gmail.com	\N	\N	1
378	\N	\N	71218925	\N	 (000) 0000000	DARIEL ALIRIO MAZO ACEVEDO	DARIEL ALIRIO MAZO ACEVEDO	\N	\N	DARIEL ALIRIO MAZO ACEVEDO	\N	\N	\N	\N	1
379	\N	\N	71023795	\N	 (000) 0000000	DARLEY ALFONSO GOMEZ TONO	DARLEY ALFONSO GOMEZ TONO	\N	\N	DARLEY ALFONSO GOMEZ TONO	\N	\N	\N	\N	1
380	\N	\N	71613107	\N	 (000) 0000000	DAVID EDUARDO GALLO ESPINOSA	DAVID EDUARDO GALLO ESPINOSA	\N	\N	DAVID EDUARDO GALLO ESPINOSA	\N	davidgalloe@gmail.com	\N	\N	1
381	\N	\N	1097392773	\N	 (000) 0000000	DAVID SÁNCHEZ POSADA	VADID SANCHEZ POSADA	\N	\N	VADID SANCHEZ POSADA	\N	dspmvz@gmail.com	\N	\N	1
382	\N	\N	1037659979	\N	 (000) 0000000	DAVID SIERRA MESA	DAVID SIERRA MESA	\N	\N	DAVID SIERRA MESA	\N	davidsierra_16@hotmail.com	\N	\N	1
383	\N	\N	1060596948	\N	 (000) 0000000	DAVUD MAURICIO GIRALDO MOTARO	DAVUD MAURICIO GIRALDO MOTARO	\N	\N	DAVUD MAURICIO GIRALDO MOTARO	\N	\N	\N	\N	1
384	\N	\N	900241896	\N	 (000) 0000000	DE LAPICES A COHETES S.A.S	DE LAPICES A COHETES S.A.S	\N	\N	DE LAPICES A COHETES S.A.S	\N	facturacion@delapicesacohetes.com	\N	\N	1
385	\N	\N	901485662	\N	 (000) 0000000	DEMEC TECNOLOGIA S.A.S	DEMEC TECNOLOGIA S.A.S	\N	\N	DEMEC TECNOLOGIA S.A.S	\N	facturaciondemec@gmail.com	\N	\N	1
386	\N	\N	43118887	\N	 (000) 0000000	DENIS ARCILA AGUDELO	DENIS ARCILA AGUDELO	\N	\N	DENIS ARCILA AGUDELO	\N	\N	\N	\N	1
387	\N	\N	1127411	\N	\N	DENYS JOSE BRAVO PEREZ	DENYS JOSE BRAVO PEREZ	\N	\N	DENYS JOSE BRAVO PEREZ	\N	acquapack@acquapackcolombia.com	\N	\N	1
388	\N	\N	901300517	\N	 (000) 0000000	DEPOSITO DE MATERIALES AGROPECUARIOS Y FERRETERIA SANTA FE SAS	DEPOSITO DE MATERIALES AGROPECUARIOS Y FERRETERIA SANTA FE SAS	\N	\N	DEPOSITO DE MATERIALES AGROPECUARIOS Y FERRETERIA SANTA FE SAS	\N	depositoagropecuariosantafe@hotmail.com	\N	\N	1
389	\N	\N	901105704	\N	 (00) 8532267	DEPOSITO LA VARIANTE S.A.S.	DEPOSITO LA VARIANTE S.A.S.	\N	\N	DEPOSITO LA VARIANTE S.A.S.	\N	depositolavariante13@hotmail.com	\N	\N	1
390	\N	\N	901577890	\N	 (000) 0000000	DEPOSITO Y COMERCIALIZADORA JEMAPY S.A.S	DEPOSITO Y COMERCIALIZADORA JEMAPY S.A.S	\N	\N	DEPOSITO Y COMERCIALIZADORA JEMAPY S.A.S	\N	dycjemapysas@gmail.com	\N	\N	1
391	\N	\N	901367245	\N	 (000) 0000000	DEPOSITO Y RECUPERADORA DE MATERIALES LA 93 S.A.S.	DEPOSITO Y RECUPERADORA DE MATERIALES LA 93 S.A.S.	\N	\N	DEPOSITO Y RECUPERADORA DE MATERIALES LA 93 S.A.S.	\N	materialesla93@gmail.com	\N	\N	1
392	\N	\N	8407970	\N	 (000) 0000000	DERIAN ALBERTO TOBON GUERRA	DERIAN ALBERTO TOBON GUERRA	\N	\N	DERIAN ALBERTO TOBON GUERRA	\N	DORISTOBONGUE@HOTMAIL.COM	\N	\N	1
393	\N	\N	901597902	\N	 (000) 0000000	DESARROLLO COMERCIAL E INDUSTRIAL O.C SAS	DESARROLLO COMERCIAL E INDUSTRIAL O.C SAS	\N	\N	DESARROLLO COMERCIAL E INDUSTRIAL O.C SAS	\N	decomerindustrialsas@gmail.com	\N	\N	1
394	\N	\N	900610518	\N	 (000) 0000000	DESPEGAR COLOMBIA SAS	DESPEGAR COLOMBIA SAS	\N	\N	DESPEGAR COLOMBIA SAS	\N	prov.despegar.com@la.comfiar.co	\N	\N	1
395	\N	\N	39452711	\N	 (000) 0000000	DIANA AMAYA	DIANA AMAYA	\N	\N	DIANA AMAYA	\N	damaya04@gmail.com	\N	\N	1
396	\N	\N	43454410	\N	 (000) 0000000	DIANA PATRICIA ARANGO PULGARIN	DIANA PATRICIA ARANGO PULGARIN	\N	\N	DIANA PATRICIA ARANGO PULGARIN	\N	sercam68@gmail.com	\N	\N	1
397	\N	\N	8464485	\N	 (000) 0000000	DIEGO ALEJANDRO CASTAÑO	DIEGO ALEJANDRO CASTAÑO	\N	\N	DIEGO ALEJANDRO CASTAÑO	\N	DACH77@MSN.COM	\N	\N	1
398	\N	\N	71773138	\N	 (000) 0000000	DIEGO ALEJANDRO DIAZ HERRERA	DIEGO ALEJANDRO DIAZ HERRERA	\N	\N	DIEGO ALEJANDRO DIAZ HERRERA	\N	FACTURAS.INFRAGRO@GMAIL.COM	\N	\N	1
399	\N	\N	1048017529	\N	 (000) 0000000	DIEGO ALEJANDRO VARGAS FLOREZ	DIEGO ALEJANDRO VARGAS FLOREZ	\N	\N	DIEGO ALEJANDRO VARGAS FLOREZ	\N	davf.2291@gmail.com	\N	\N	1
400	\N	\N	71789965	\N	 (000) 0000000	DIEGO ALEXANDER AGUDELO OROZCO	DIEGO ALEXANDER AGUDELO OROZCO	\N	\N	DIEGO ALEXANDER AGUDELO OROZCO	\N	\N	\N	\N	1
401	\N	\N	1042762096	\N	 (000) 0000000	DIEGO ALFONSO VELASQUEZ RODRIGUEZ	DIEGO ALFONSO VELASQUEZ RODRIGUEZ	\N	\N	DIEGO ALFONSO VELASQUEZ RODRIGUEZ	\N	electroiluminacionesyarumal@gmail.com	\N	\N	1
402	\N	\N	10045106724	\N	 (000) 0000000	DIEGO ALONZO CASTRILLO LONDOÑO	DIEGO ALONZO CASTRILLO LONDOÑO	\N	\N	DIEGO ALONZO CASTRILLO LONDOÑO	\N	diegocastrillon76@gmail.com	\N	\N	1
403	\N	\N	79458799	\N	 (000) 0000000	DIEGO ARTURO PAREJA QUINTERO	DIEGO ARTURO PAREJA QUINTERO	\N	\N	DIEGO ARTURO PAREJA QUINTERO	\N	\N	\N	\N	1
404	\N	\N	70784815	\N	8647694	DIEGO FERNANDO LLANOS SANTOS	DIEGO FERNADO LLANOS SANTA	\N	\N	DIEGO FERNADO LLANOS SANTA	\N	agroinsumosdelcafe@hotmail.com	\N	\N	1
405	\N	\N	71270443	\N	 (000) 0000000	DIEGO MAURICIO URIBE ARANGO	DIEGO MAURICIO URIBE ARANGO	\N	\N	DIEGO MAURICIO URIBE ARANGO	\N	dieguri@dataico-recepcion.com	\N	\N	1
406	\N	\N	71339511	\N	 (000) 0000000	DIEGO MUÑOZ COLORADO	DIEGO MULOZ COLORADO	\N	\N	DIEGO MULOZ COLORADO	\N	facturacionaqp1@gmail.com	\N	\N	1
407	\N	\N	8396143	\N	 (000) 0000000	DIEGO NIETO MARIN	DIEGO NIETO MARIN	\N	\N	DIEGO NIETO MARIN	\N	FACTURACIONAQP1@GMAIL.COM	\N	\N	1
408	\N	\N	1042710070	\N	 (000) 0000000	DIEGO RODRIGUEZ RODRIGUEZ	DIEGO RODRIGUEZ RODRIGUEZ	\N	\N	DIEGO RODRIGUEZ RODRIGUEZ	\N	ALEJODIEGO8710@GMAIL.COM	\N	\N	1
409	\N	\N	98714750	\N	\N	DIEGO VICENTE LASSO MURCIA	DIEGO VICENTE LASSO MURCIA	\N	\N	DIEGO VICENTE LASSO MURCIA	\N	logisticaaqp@gmail.com	\N	\N	1
410	\N	\N	900280333	\N	 (000) 0000000	DIENTEDELEON S.A.S.	DIENTEDELEON S.A.S.	\N	\N	DIENTEDELEON S.A.S.	\N	\N	\N	\N	1
411	\N	\N	890940810	\N	 (000) 0000000	DIGAR S.A.S.	DIGAR S.A.S.	\N	\N	DIGAR S.A.S.	\N	digarsas@gmail.com	\N	\N	1
412	\N	\N	901686805	\N	 (000) 0000000	DIMEVA DISTRIBUIDORA DE MERCANCIAS VARIAS S.A.S.	DIMEVA DISTRIBUIDORA DE MERCANCIAS VARIAS S.A.S.	\N	\N	DIMEVA DISTRIBUIDORA DE MERCANCIAS VARIAS S.A.S.	\N	lamanoferretera2023@gmail.com	\N	\N	1
413	\N	\N	901403531	\N	 (000) 0000000	DISPROQUIMICA SAS	DISPROQUIMICA SAS	\N	\N	DISPROQUIMICA SAS	\N	\N	\N	\N	1
414	\N	\N	811009788	\N	 (000) 0000000	DISTRACOM S.A	DISTRACOM S.A	\N	\N	DISTRACOM S.A	\N	\N	\N	\N	1
415	\N	\N	901650811	\N	 (000) 0000000	DISTRIAZUL S.A.S	DISTRIAZUL S.A.S	\N	\N	DISTRIAZUL S.A.S	\N	\N	\N	\N	1
416	\N	\N	811044614	\N	 (000) 0000000	DISTRIBUCIONES AMBIENTALES SAS	DISTRIBUCIONES AMBIENTALES SAS	\N	\N	DISTRIBUCIONES AMBIENTALES SAS	\N	gerencia@distriambiente.com	\N	\N	1
417	\N	\N	900010430	\N	8544364	DISTRIBUCIONES MUNDO AGRO ANTIOQUIA S.A.S.	\N	\N	\N	\N	\N	facturacionsv@mundo-agro.com	\N	\N	1
418	\N	\N	901386669	\N	 (000) 3103897292	DISTRIBUCIONES RODRIGO VALENCIA SAS	DISTRIBUCIONES RODRIGO VALENCIA SAS	\N	\N	DISTRIBUCIONES RODRIGO VALENCIA SAS	\N	facturasrodrigovalencia@gmail.com	\N	\N	1
419	\N	\N	900923310	\N	 (000) 0000000	DISTRIBUIDORA AGRO-PLUS SAS	DISTRIBUIDORA AGRO-PLUS SAS	\N	\N	DISTRIBUIDORA AGRO-PLUS SAS	\N	facturacion@dagroplus.com	\N	\N	1
420	\N	\N	800188756	\N	 (000) 0000000	DISTRIBUIDORA COLCEMENTOS S.A.S.	DISTRIBUIDORA COLCEMENTOS S.A.S.	\N	\N	DISTRIBUIDORA COLCEMENTOS S.A.S.	\N	\N	\N	\N	1
421	\N	\N	900293681	\N	 (000) 0000000	DISTRIBUIDORA DE REPUESTOS INDUSTRIALES DE COLOMBIA S.A.S.	DISTRIBUIDORA DE REPUESTOS INDUSTRIALES DE COLOMBIA S.A.S.	\N	\N	DISTRIBUIDORA DE REPUESTOS INDUSTRIALES DE COLOMBIA S.A.S.	\N	\N	\N	\N	1
422	\N	\N	900365641	\N	 (000) 0000000	DISTRIBUIDORA L BETANCUR S.A.S.	DISTRIBUIDORA L BETANCUR S.A.S.	\N	\N	DISTRIBUIDORA L BETANCUR S.A.S.	\N	\N	\N	\N	1
423	\N	\N	900195538	\N	 (000) 0000000	DISTRIBUIDORA LJA EU	DISTRIBUIDORA LJA EU	\N	\N	DISTRIBUIDORA LJA EU	\N	distrija.eu@hotmail.com	\N	\N	1
424	\N	\N	811013831	\N	 (000) 0000000	DISTRIFER S.A.S	DISTRIFER S.A.S	\N	\N	DISTRIFER S.A.S	\N	distrifersas@gmail.com	\N	\N	1
425	\N	\N	900881558	\N	 (000) 0000000	DISTRIMANGUERAS Y CORREAS	DISTRIMANGUERAS Y CORREAS	\N	\N	DISTRIMANGUERAS Y CORREAS	\N	DISTRIMANGUERAS2015@GMAIL.COM	\N	\N	1
426	\N	\N	901329480	\N	 (000) 0000000	DISTRISERVIC LA COMARCA, S.A.S.	DISTRISERVIC LA COMARCA, S.A.S.	\N	\N	DISTRISERVIC LA COMARCA, S.A.S.	\N	distriserv.lacomarca@gmail.com	\N	\N	1
427	\N	\N	890905211	\N	 (000) 0000000	DISTRITO ESPECIAL DE CIENCIA TECNOLOGIA E INNOVACION DE MEDELLIN	DISTRITO ESPECIAL DE CIENCIA TECNOLOGIA E INNOVACION DE MEDELLIN	\N	\N	DISTRITO ESPECIAL DE CIENCIA TECNOLOGIA E INNOVACION DE MEDELLIN	\N	\N	\N	\N	1
428	\N	\N	890935922	\N	 (000) 0000000	DOBLAMOS SAS	DOBLAMOS SAS	\N	\N	DOBLAMOS SAS	\N	\N	\N	\N	1
429	\N	\N	901452156	\N	 (000) 0000000	DOMINIO INGENIERIA S.A.S	DOMINIO INGENIERIA S.A.S	\N	\N	DOMINIO INGENIERIA S.A.S	\N	facturacion.dominioing@gmail.com	\N	\N	1
430	\N	\N	42961925	\N	 (000) 0000000	DORA LINA PENAGOS	DORA LINA PENAGOS	\N	\N	DORA LINA PENAGOS	\N	enlacegraficopubli@hotmail.com	\N	\N	1
431	\N	\N	1046908013	\N	 (000) 0000000	DORICELA LOTERO VANEGAS	DORICELA LOTERO VANEGAS	\N	\N	DORICELA LOTERO VANEGAS	\N	granjavillanueva2025@gmail.com	\N	\N	1
432	\N	\N	21549024	\N	 (000) 0000000	DORIS ALEIDA MADRIGAL CANO	DORIS ALEIDA MADRIGAL CANO	\N	\N	DORIS ALEIDA MADRIGAL CANO	\N	\N	\N	\N	1
433	\N	\N	890922113	\N	 (000) 0000000	DROPOPULAR S.A.S.	DROPOPULAR S.A.S.	\N	\N	DROPOPULAR S.A.S.	\N	\N	\N	\N	1
434	\N	\N	1039286409	\N	 (000) 0000000	DUVAN ALONSO HIGUITA USUGA	DUVAN ALONSO HIGUITA USUGA	\N	\N	DUVAN ALONSO HIGUITA USUGA	\N	\N	\N	\N	1
435	\N	\N	901603769	\N	 (000) 0000000	DYH SOLUCIONES E INVERSIONES S.A.S.	DYH SOLUCIONES E INVERSIONES S.A.S.	\N	\N	DYH SOLUCIONES E INVERSIONES S.A.S.	\N	\N	\N	\N	1
436	\N	\N	901498391	\N	 (000) 0000000	ECO SANTO DOMINGO SAS	ECO SANTO DOMINGO SAS	\N	\N	ECO SANTO DOMINGO SAS	\N	admin@riosantodomingo.com	\N	\N	1
437	\N	\N	900963103	\N	 (000) 0000000	ECOLODGE PLAYA ALEGRE S.A.S.	ECOLODGE PLAYA ALEGRE S.A.S.	\N	\N	ECOLODGE PLAYA ALEGRE S.A.S.	\N	playalegre@gmail.com	\N	\N	1
438	\N	\N	800180908	\N	 (000) 0000000	ECU WORLDWIDE (COLOMBIA9 SAS	ECU WORLDWIDE (COLOMBIA9 SAS	\N	\N	ECU WORLDWIDE (COLOMBIA9 SAS	\N	\N	\N	\N	1
439	\N	\N	15324445	\N	 (000) 0000000	EDGAR ELID VALENCIA POSADA	EDGAR ELID VALENCIA POSADA	\N	\N	EDGAR ELID VALENCIA POSADA	\N	ELIDPOSADA42@HOTMAIL.COM	\N	\N	1
440	\N	\N	4996164	\N	\N	EDGAR ENRRIQUE TALAVERA CALATAYUD	EDGAR ENRRIQUE TALAVERA CALATAYUD	\N	\N	EDGAR ENRRIQUE TALAVERA CALATAYUD	\N	edgartalavera025@gmail.com	\N	\N	1
441	\N	\N	890934069	\N	 (00) 0000000	EDIFICIO MIRADOR DEL PARQUE-P.H	EDIFICIO MIRADOR DEL PARQUE-P.H	\N	\N	EDIFICIO MIRADOR DEL PARQUE-P.H	\N	edificiomiradordelparqueph@gmail.com	\N	\N	1
442	\N	\N	901875614	\N	 (000) 0000000	EDIFICIO BRETAÑA S.A.S	EDIFICIO BRETAÑA	\N	\N	EDIFICIO BRETAÑA	\N	EDIFICIOBRETANA7@GMAIL.COM	\N	\N	1
443	\N	\N	98505451	\N	 (000) 0000000	EDINSON CATAÑO LOTERO	EDINSON CATAÑO LOTERO	\N	\N	EDINSON CATAÑO LOTERO	\N	epson524@gmail.com	\N	\N	1
444	\N	\N	98525869	\N	 (000) 0000000	EDISON CARDONA RENDON	EDISON CARDONA RENDON	\N	\N	EDISON CARDONA RENDON	\N	EDISONSR@GMAIL.COM	\N	\N	1
445	\N	\N	1152444779	\N	 (000) 0000000	EDISON GIOVANNY ARISTIZABAL GIRALDO	EDISON GIOVANNY ARISTIZABAL GIRALDO	\N	\N	EDISON GIOVANNY ARISTIZABAL GIRALDO	\N	logisticaaqp3@gmail.com	\N	\N	1
446	\N	\N	15336332	\N	 (000) 0000000	EDISON PUERTA AGUDELO	EDISON PUERTA AGUDELO	\N	\N	EDISON PUERTA AGUDELO	\N	\N	\N	\N	1
447	\N	\N	71020519	\N	 (000) 3103531460	EDNE HUGO HIGUITA CAMPO	EDNE HUGO HIGUITA CAMPO	\N	\N	EDNE HUGO HIGUITA CAMPO	\N	JOHANAPRESIGA@HOTMAIL.COM	\N	\N	1
448	\N	\N	1018343065	\N	 (000) 0000000	EDUAR LEANDRO PEREZ HENAO	EDUAR LEANDRO PEREZ HENAO	\N	\N	EDUAR LEANDRO PEREZ HENAO	\N	perezleandro168@gmail.com	\N	\N	1
449	\N	\N	15355574	\N	 (000) 0000000	EDWAR DE JESUS OTALVARO GARCIA	EDWAR DE JESUS OTALVARO GARCIA	\N	\N	EDWAR DE JESUS OTALVARO GARCIA	\N	\N	\N	\N	1
450	\N	\N	1044500303	\N	 (000) 0000000	EDWIN ARLEY MEDINA MEDINA	EDWIN ARLEY MEDINA MEDINA	\N	\N	EDWIN ARLEY MEDINA MEDINA	\N	logisticaaqp3@gmail.com	\N	\N	1
451	\N	\N	15371216	\N	 (000) 0000000	EDWIN FERNANDO VERGARA RAMIREZ	EDWIN FERNANDO VERGARA RAMIREZ	\N	\N	EDWIN FERNANDO VERGARA RAMIREZ	\N	edwinvergara841007@gmail.com	\N	\N	1
452	\N	\N	98636167	\N	 (000) 0000000	EDWIN HUMBERTO SALAZAR SUAREZ	EDWIN HUMBERTO SALAZAR SUAREZ	\N	\N	EDWIN HUMBERTO SALAZAR SUAREZ	\N	contabilidad@toyodelta.com	\N	\N	1
453	\N	\N	3362144	\N	 (000) 0000000	EDWIN MAURICIO VALENCIA CASTAÑO	EDWIN MAURICIO VALENCIA CASTAÑO	\N	\N	EDWIN MAURICIO VALENCIA CASTAÑO	\N	\N	\N	\N	1
454	\N	\N	901568475	\N	 (000) 0000000	EFO TELECOMUNICACIONES S.A.S	EFO TELECOMUNICACIONES S.A.S	\N	\N	EFO TELECOMUNICACIONES S.A.S	\N	efotelecomunicacionessas@gmail.com	\N	\N	1
455	\N	\N	71745125	\N	 (000) 0000000	EFRAIN VELASQUEZ OSORIO	EFRAIN VELASQUEZ OSORIO	\N	\N	EFRAIN VELASQUEZ OSORIO	\N	\N	\N	\N	1
456	\N	\N	70825147	\N	 (000) 0000000	EFRAN DE JESUS GIRALDO GIRALDO	EFRAN DE JESUS GIRALDO GIRALDO	\N	\N	EFRAN DE JESUS GIRALDO GIRALDO	\N	IABELLEZAAYPELUQUERO@GMAIL.COM	\N	\N	1
457	\N	\N	1001765026	\N	\N	EIMER ALONSO SEGURO FLOREZ	EIMER ALONSO SEGURO FLOREZ	\N	\N	EIMER ALONSO SEGURO FLOREZ	\N	acquapack@acquapackcolombia.com	\N	\N	1
458	\N	\N	901633305	\N	 (000) 0000000	EL CAMPANO FAB S.A.S	EL CAMPANO FAB S.A.S	\N	\N	EL CAMPANO FAB S.A.S	\N	FAJARDOZANAMARIA@GMAIL.COM	\N	\N	1
459	\N	\N	901108396	\N	 (000) 0000000	EL FUGAZO SAS	EL FUGAZO SAS	\N	\N	EL FUGAZO SAS	\N	fugazocacharros@gmail.com	\N	\N	1
460	\N	\N	900154131	\N	 (000) 0000000	EL LLANO S.A.S BIC	EL LLANO S.A.S BIC	\N	\N	EL LLANO S.A.S BIC	\N	contabilidadbotero@hotmail.com	\N	\N	1
461	\N	\N	901568226	\N	 (000) 0000000	ELECTRICOS JOE S.A.S.	ELECTRICOS JOE S.A.S.	\N	\N	ELECTRICOS JOE S.A.S.	\N	joeelectrico59@outlook.es	\N	\N	1
462	\N	\N	900427263	\N	 (000) 0000000	ELECTRO ANDU S.A.S	ELECTRO ANDU S.A.S	\N	\N	ELECTRO ANDU S.A.S	\N	SECRETARIAELECTROANDU@GMAIL.COM	\N	\N	1
463	\N	\N	98480479	\N	 (000) 0000000	ELI OVIDIO TAVERA ESPINOSA	ELI OVIDIO TAVERA ESPINOSA	\N	\N	ELI OVIDIO TAVERA ESPINOSA	\N	ovidiotavera010407@gmail.com	\N	\N	1
464	\N	\N	43833031	\N	 (000) 0000000	ELIANA VEGA CARDONA	ELIANA VEGA CARDONA	\N	\N	ELIANA VEGA CARDONA	\N	inngeniastudio@gmail.com	\N	\N	1
465	\N	\N	71220105	\N	 (000) 0000000	ELIVER ALVARO BETANCUR CASAS	ELIVER ALVARO BETANCUR CASAS	\N	\N	ELIVER ALVARO BETANCUR CASAS	\N	alvarobetancur418@gmail.com	\N	\N	1
466	\N	\N	1128384065	\N	 (000) 0000000	ELKIN DE JESUS GUZMAN ATEHORTUA	ELKIN DE JESUS GUZMAN ATEHORTUA	\N	\N	ELKIN DE JESUS GUZMAN ATEHORTUA	\N	GUZMANATO281@GMAIL.COM	\N	\N	1
467	\N	\N	1044503147	\N	 (000) 0000000	ELKIN LEON GOMEZ CARDONA	ELKIN LEON GOMEZ CARDONA	\N	\N	ELKIN LEON GOMEZ CARDONA	\N	\N	\N	\N	1
468	\N	\N	13570632	\N	 (000) 0000000	ELVER DE JESUS CARDONA QUICENO	ELVER DE JESUS CARDONA QUICENO	\N	\N	ELVER DE JESUS CARDONA QUICENO	\N	mesacontabilidades@hotmail.com	\N	\N	1
469	\N	\N	98664586	\N	 (000) 0000000	Emerson orlando jaramillo	Emerson orlando jaramillo	\N	\N	Emerson orlando jaramillo	\N	ho.jaramillo@hotmail.com	\N	\N	1
470	\N	\N	15502867	\N	 (000) 0000000	EMIRO JIMENEZ CATAÑO	EMIRO JIMENEZ CATAÑO	\N	\N	EMIRO JIMENEZ CATAÑO	\N	EMIRO-JIMENEZ@HOTMAIL.COM	\N	\N	1
471	\N	\N	25093693	\N	 (000) 0000000	EMPERATRIZ HIDROPO BOTERO	EMPERATRIZ HIDROPO BOTERO	\N	\N	EMPERATRIZ HIDROPO BOTERO	\N	facturaacquapack@gmail.com	\N	\N	1
472	\N	\N	901766093	\N	 (000) 0000000	EMPRESAS VECINAS S.A.S.	EMPRESAS VECINAS S.A.S.	\N	\N	EMPRESAS VECINAS S.A.S.	\N	info@empresasvecinas.com	\N	\N	1
473	\N	\N	890914401	\N	 (000) 0000000	ENCOSTA S.A.S	ENCOSTA S.A.S	\N	\N	ENCOSTA S.A.S	\N	ADMIN@ENCOSTAAMORTIGUADORES.COM	\N	\N	1
474	\N	\N	901256496	\N	 (000) 0000000	ENLACE FERRETERO S.A.S	ENLACE FERRETERO S.A.S	\N	\N	ENLACE FERRETERO S.A.S	\N	factura@enlaceferretero.com.co	\N	\N	1
475	\N	\N	901536278	\N	 (000) 0000000	ENLACE INDUSTRIAL Y RECUPERADORA DEL VALLE DE ABURRA S.A.S	ENLACE INDUSTRIAL Y RECUPERADORA DEL VALLE DE ABURRA S.A.S	\N	\N	ENLACE INDUSTRIAL Y RECUPERADORA DEL VALLE DE ABURRA S.A.S	\N	colombiaenlaceindustrialsas@gmail.com	\N	\N	1
476	\N	\N	8342155	\N	 (000) 0000000	ENRIQUE DUQUE RESTREPO	ENRIQUE DUQUE RESTREPO	\N	\N	ENRIQUE DUQUE RESTREPO	\N	facturacionaqp1@gmail.com	\N	\N	1
477	\N	\N	901034989	\N	 (000) 0000000	EQUILIBRIUM SERVICIO TECNICO S.A.S	EQUILIBRIUM SERVICIO TECNICO S.A.S	\N	\N	EQUILIBRIUM SERVICIO TECNICO S.A.S	\N	equilibriumgymsas@gmail.com	\N	\N	1
478	\N	\N	1764379	\N	 (000) 0000000	ERAIN DARIO FERNANDEZ DAZA	ERAIN DARIO FERNANDEZ DAZA	\N	\N	ERAIN DARIO FERNANDEZ DAZA	\N	edselparqueefrain@gmail.com	\N	\N	1
479	\N	\N	713120846	\N	 (000) 0000000	ERNESTO DE JESUS GUERRA HORTA	ERNESTO DE JESUS GUERRA HORTA	\N	\N	ERNESTO DE JESUS GUERRA HORTA	\N	ERNESTOCHE137@GMAIL.COM	\N	\N	1
480	\N	\N	1069471518	\N	 (000) 0000000	ERNY CASTRILLON CALUME	ERNY CASTRILLON CALUME	\N	\N	ERNY CASTRILLON CALUME	\N	castrillon-27@hotmail.com	\N	\N	1
481	\N	\N	80126145	\N	 (000) 0000000	ERVIN ADOLFO SALAZAR SUAREZ	ERVIN ADOLFO SALAZAR SUAREZ	\N	\N	ERVIN ADOLFO SALAZAR SUAREZ	\N	\N	\N	\N	1
482	\N	\N	901461978	\N	 (00) 3217005123	ESPERANZA HASS S.A.S.	ESPERANZA HASS S.A.S.	\N	\N	ESPERANZA HASS S.A.S.	\N	hasslaesperanza@gmail.com	\N	\N	1
483	\N	\N	901461978	\N	\N	ESPERANZA HASS S.A.S.	ESPERANZA HASS S.A.S.	\N	\N	ESPERANZA HASS S.A.S.	\N	hasslaesperanza@gmail.com	\N	\N	1
484	\N	\N	8283824	\N	 (000) 0000000	ESTABAN DE JESUS ALCARAZ ESCUDERO	ESTABAN DE JESUS ALCARAZ ESCUDERO	\N	\N	ESTABAN DE JESUS ALCARAZ ESCUDERO	\N	devolucioniva@hotmail.com	\N	\N	1
485	\N	\N	900625898	\N	 (000) 0000000	ESTACIONES INNOVADORAS SAS	ESTACIONES INNOVADORAS SAS	\N	\N	ESTACIONES INNOVADORAS SAS	\N	soportefacturaciondian@estinsa.com	\N	\N	1
486	\N	\N	1036639987	\N	 (000) 0000000	ESTEBAN HENAO	ESTEBAN HENAO	\N	\N	ESTEBAN HENAO	\N	geran11026@gmail.com	\N	\N	1
487	\N	\N	1004668547	\N	 (000) 0000000	ESTEBAN SOTO SANCHEZ	ESTEBAN SOTO SANCHEZ	\N	\N	ESTEBAN SOTO SANCHEZ	\N	recuperadorasoto547@gmail.com	\N	\N	1
488	\N	\N	98639908	\N	 (000) 0000000	EUCLIDES PULGARIN RUIZ	EUCLIDES PULGARIN RUIZ	\N	\N	EUCLIDES PULGARIN RUIZ	\N	facturacionaqp1@gmail.com	\N	\N	1
489	\N	\N	4138189	\N	 (000) 0000000	EULISES GORDILLO TORRES	EULISES GORDILLO TORRES	\N	\N	EULISES GORDILLO TORRES	\N	\N	\N	\N	1
490	\N	\N	900533493	\N	 (000) 0000000	EUREKA SOLUCIONES ECOLÓGICAS Y PUBLICITARIAS S.A.S.	EUREKA SOLUCIONES ECOLÓGICAS Y PUBLICITARIAS S.A.S.	\N	\N	EUREKA SOLUCIONES ECOLÓGICAS Y PUBLICITARIAS S.A.S.	\N	asistente@solucioneseureka.co	\N	\N	1
491	\N	\N	901699967	\N	 (000) 0000000	EURO CAMINOS S.A.S	EURO CAMINOS	\N	\N	EURO CAMINOS	\N	EUROCAMIN@GMAIL.COM	\N	\N	1
492	\N	\N	71269037	\N	 (000) 0000000	EVER HURTADO ARDILA	HEBER HURTADO ARDILA	\N	\N	HEBER HURTADO ARDILA	\N	EVEREDUA@GMAIL.COM	\N	\N	1
493	\N	\N	901118007	\N	 (000) 0000000	EXCEDENTES M.S.C. SAS	SILVIA	\N	\N	SILVIA	\N	excedentesmsc@hotmail.com	\N	\N	1
494	\N	\N	901071947	\N	 (000) 0000000	EXPLODRILL S.A.S	EXPLODRILL S.A.S	\N	\N	EXPLODRILL S.A.S	\N	explodrill2020@gmail.com	\N	\N	1
495	\N	\N	890903483	\N	 (00) 5825656	EXPLOTACIONES CARBONIFERAS S A EXCARBON S A	EXPLOTACIONES CARBONIFERAS S A EXCARBON S A	\N	\N	EXPLOTACIONES CARBONIFERAS S A EXCARBON S A	\N	gerencia@excarbonsa.com	\N	\N	1
496	\N	\N	890903483	\N	3137455264	EXPLOTACIONES CARBONIFERAS S A EXCARBON S A	EXPLOTACIONES CARBONIFERAS S A EXCARBON S A	\N	\N	EXPLOTACIONES CARBONIFERAS S A EXCARBON S A	\N	gerencia@excarbonsa.com	\N	\N	1
497	\N	\N	890903483	\N	\N	EXPLOTACIONES CARBONIFERAS S A EXCARBON S A	EXPLOTACIONES CARBONIFERAS S A EXCARBON S A	\N	\N	EXPLOTACIONES CARBONIFERAS S A EXCARBON S A	\N	gerencia@excarbonsa.com	\N	\N	1
498	\N	\N	890100531	\N	 (000) 0000000	EXPRESO BRASILIA S.A	EXPRESO BRASILIA S.A	\N	\N	EXPRESO BRASILIA S.A	\N	kjguerrero@expresobrasilia.com	\N	\N	1
499	\N	\N	71671566	\N	42507042	FABIAN ASMED VELENZUELA HERRERA	FABIAN ASMED VELENZUELA HERRERA	\N	\N	FABIAN ASMED VELENZUELA HERRERA	\N	fabianasmed@hotmail.es	\N	\N	1
500	\N	\N	1065233775	\N	 (000) 0000000	FABIAN DUQUE	FABIAN DUQUE	\N	\N	FABIAN DUQUE	\N	FABIANDUQUESUAREZ@GMAIL.COM	\N	\N	1
501	\N	\N	8162331	\N	 (000) 0000000	FABIAN PENAGOS PENAGOS	FABIAN PENAGOS PENAGOS	\N	\N	FABIAN PENAGOS PENAGOS	\N	penagosfabian@gmail.com	\N	\N	1
502	\N	\N	98483586	\N	 (000) 0000000	FABIAN VALENCIA GARRO	FABIAN VALENCIA GARRO	\N	\N	FABIAN VALENCIA GARRO	\N	favagarro@gmail.com	\N	\N	1
503	\N	\N	901501552	\N	 (000) 0000000	FALCON AUTOMOTRIZ S.A.S	FALCON AUTOMOTRIZ S.A.S	\N	\N	FALCON AUTOMOTRIZ S.A.S	\N	info@autoglasscolombia.com	\N	\N	1
504	\N	\N	900978569	\N	 (000) 0000000	FC Y FC S.A.S	FC Y FC S.A.S	\N	\N	FC Y FC S.A.S	\N	areacontable@fcsas.com.co	\N	\N	1
505	\N	\N	1010072234	\N	 (000) 0000000	FELIPE ANTONIO RODRIGUES PEREZ	FELIPE ANTONIO RODRIGUES PEREZ	\N	\N	FELIPE ANTONIO RODRIGUES PEREZ	\N	logistica3@gmail.com	\N	\N	1
506	\N	\N	71271872	\N	 (000) 0000000	FELIPE GONZALES BUILES	FELIPE GONZALES BUILES	\N	\N	FELIPE GONZALES BUILES	\N	chanvilla@hotmail.com	\N	\N	1
507	\N	\N	901478789	\N	 (00) 0000000	FERCITRIX S.A.S.	FERCITRIX S.A.S.	\N	\N	FERCITRIX S.A.S.	\N	camilafernandez@sondelcauca.com	\N	\N	1
508	\N	\N	900691029	\N	2673707	FERIAGRO AGROPECUARIA SAS	\N	\N	\N	\N	\N	feriagro355@yahoo.com.co	\N	\N	1
509	\N	\N	16715978	\N	 (000) 0000000	FERNANDO GARCIA OSSA	FERNANDO GARCIA OSSA	\N	\N	FERNANDO GARCIA OSSA	\N	FDOGAROSS@UNE.NET.CO	\N	\N	1
510	\N	\N	75046362	\N	 (000) 0000000	FERNANDO PELAEZ PELAEZ	FERNANDO PELAEZ PELAEZ	\N	\N	FERNANDO PELAEZ PELAEZ	\N	pelaezypelaez@hotmail.com	\N	\N	1
511	\N	\N	800060880	\N	 (000) 4483797	FERRAGRO S.A.S.	FERRAGRO S.A.S.	\N	\N	FERRAGRO S.A.S.	\N	servicioalcliente@ferragro.com	\N	\N	1
512	\N	\N	901480869	\N	 (000) 0000000	FERREBOX SAS	FERREBOX SAS	\N	\N	FERREBOX SAS	\N	info@ferrebox.shop	\N	\N	1
513	\N	\N	800198567	\N	 (000) 0000000	FERRECONTROLES S.A.S.	FERRECONTROLES S.A.S.	\N	\N	FERRECONTROLES S.A.S.	\N	800198567recepcion@gmail.com	\N	\N	1
514	\N	\N	901218867	\N	 (000) 0000000	FERREELECTRICOS LA 46MG SAS	FERREELECTRICOS LA 46MG SAS	\N	\N	FERREELECTRICOS LA 46MG SAS	\N	ferremedellin@hotmail.com	\N	\N	1
515	\N	\N	901061899	\N	8513364	FERREMONTAÑA S.A.S.	\N	\N	\N	\N	\N	direccion@ferremontana.com	\N	\N	1
516	\N	\N	901423858	\N	 (000) 0000000	FERRETERIA AGROPLAZA S.A.S	FERRETERIA AGROPLAZA S.A.S	\N	\N	FERRETERIA AGROPLAZA S.A.S	\N	\N	\N	\N	1
517	\N	\N	900621871	\N	 (000) 0000000	FERRETERIA BUCAROS S.A.S	FERRETERIA BUCAROS S.A.S	\N	\N	FERRETERIA BUCAROS S.A.S	\N	comprasbucaros@gmail.com	\N	\N	1
518	\N	\N	811030294	\N	 (604) 3512116	FERRETERIA DISTRIVALVULAS S.A.S.	FERRETERIA DISTRIVALVULAS S.A.S.	\N	\N	FERRETERIA DISTRIVALVULAS S.A.S.	\N	distrivalvulas@distrivalvulas.com	\N	\N	1
519	\N	\N	860534340	\N	 (000) 0000000	FERRETERIA JRC CIA LTDA	FERRETERIA JRC CIA LTDA	\N	\N	FERRETERIA JRC CIA LTDA	\N	info@ferreteriajrc.com	\N	\N	1
520	\N	\N	901560346	\N	 (000) 0000000	FERRETERIA LA CITA SALGAR S.A.S	FERRETERIA LA CITA SALGAR S.A.S	\N	\N	FERRETERIA LA CITA SALGAR S.A.S	\N	901560346@recepciondefacturas.co	\N	\N	1
521	\N	\N	900755906	\N	 (00) 0000000	FERRETERIA LA LUNETA S.A.S	FERRETERIA LA LUNETA S.A.S	\N	\N	FERRETERIA LA LUNETA S.A.S	\N	\N	\N	\N	1
522	\N	\N	811012427	\N	 (000) 4445200	FERRETERÍA LOS FIERROS S.A.S.	FERRETERÍA LOS FIERROS S.A.S.	\N	\N	FERRETERÍA LOS FIERROS S.A.S.	\N	servicioalcliente@losfierros.com.co	\N	\N	1
523	\N	\N	900571841	\N	 (000) 0000000	FERRETERIA METALCORTE Y AFINES SAS	FERRETERIA METALCORTE Y AFINES SAS	\N	\N	FERRETERIA METALCORTE Y AFINES SAS	\N	info@fermetalcorte.com	\N	\N	1
524	\N	\N	901145497	\N	 (000) 0000000	FERRETERIA MODERNA OR SAS	FERRETERIA MODERNA OR SAS	\N	\N	FERRETERIA MODERNA OR SAS	\N	modernafe@gmail.com	\N	\N	1
525	\N	\N	70694448	\N	 (000) 0000000	FERRETERIA PALMAR	FERRETERIA PALMAR	\N	\N	FERRETERIA PALMAR	\N	fernandoquintero_29@hotmail.com	\N	\N	1
526	\N	\N	901036366	\N	 (000) 0000000	FERRETERIA PUNTO AMARILLO LLANOS S.A.S	FERRETERIA PUNTO AMARILLO LLANOS S.A.S	\N	\N	FERRETERIA PUNTO AMARILLO LLANOS S.A.S	\N	deposito@puntoamarillo.co	\N	\N	1
527	\N	\N	901036354	\N	 (000) 8687388	FERRETERIA PUNTO AMARILLO SAN PEDRO S.A.S	FERRETERIA PUNTO AMARILLO SAN PEDRO S.A.S	\N	\N	FERRETERIA PUNTO AMARILLO SAN PEDRO S.A.S	\N	sanpedro@puntoamarillo.com	\N	\N	1
528	\N	\N	901036993	\N	 (00) 8538513	FERRETERIA PUNTO AMARILLO SANTA ROSA S . A. S.	FERRETERIA PUNTO AMARILLO SANTA ROSA S . A. S.	\N	\N	FERRETERIA PUNTO AMARILLO SANTA ROSA S . A. S.	\N	santarosa@puntoamarillo.com	\N	\N	1
529	\N	\N	901037183	\N	 (00) 0000000	FERRETERIA PUNTO AMARILLO YARUMAL S.A.S.	FERRETERIA PUNTO AMARILLO YARUMAL S.A.S.	\N	\N	FERRETERIA PUNTO AMARILLO YARUMAL S.A.S.	\N	administrativo@puntoamarillo.co	\N	\N	1
530	\N	\N	890900490	\N	 (000) 0000000	FERRETERIA TÉCNICA S.A.	FERRETERIA TÉCNICA S.A.	\N	\N	FERRETERIA TÉCNICA S.A.	\N	ferreteriatecnicasa@gmail.com	\N	\N	1
531	\N	\N	800139030	\N	 (000) 0000000	FERRETERIA TORNIDIN SAS	FERRETERIA TORNIDIN SAS	\N	\N	FERRETERIA TORNIDIN SAS	\N	secretariatornidin@hotmail.com	\N	\N	1
532	\N	\N	901271950	\N	 (000) 0000000	FERRETEXAS ZOMAC S.A.S	FERRETEXAS ZOMAC S.A.S	\N	\N	FERRETEXAS ZOMAC S.A.S	\N	ferretexas@gmail.com	\N	\N	1
533	\N	\N	901392828	\N	 (000) 0000000	FERRINGSA SAS	FERRINGSA SAS	\N	\N	FERRINGSA SAS	\N	FERRINGSA@INGFERRINGSA.COM	\N	\N	1
534	\N	\N	901583189	\N	 (000) 0000000	FERRO.SG S.A.S	FERRO.SG S.A.S	\N	\N	FERRO.SG S.A.S	\N	steven19_xp@hotmail.com	\N	\N	1
535	\N	\N	900526272	\N	 (000) 0000000	FERROLAMINAS	FERROLAMINAS	\N	\N	FERROLAMINAS	\N	ventas@ferrolaminas.com.co	\N	\N	1
536	\N	\N	901716629	\N	 (000) 0000000	FIVE CONSULTING GROUP	FIVE CONSULTING GROUP	\N	\N	FIVE CONSULTING GROUP	\N	logistica@fivecgroup.com	\N	\N	1
537	\N	\N	901613059	\N	 (000) 3128728500	FLETES Y SERVICIOS ARANGO S.A.S	FLETES Y SERVICIOS ARANGO S.A.S	\N	\N	FLETES Y SERVICIOS ARANGO S.A.S	\N	fletesyserviciosarangosas@gmail.com	\N	\N	1
538	\N	\N	891400148	\N	 (000) 0000000	FLOTA OCCIDENTAL S.A.	FLOTA OCCIDENTAL S.A.	\N	\N	FLOTA OCCIDENTAL S.A.	\N	SISTEMAS@FLOTAOCCIDENTAL.COM	\N	\N	1
539	\N	\N	901314455	\N	 (000) 0000000	FLUX SOLUCION S.A.S.	FLUX SOLUCION S.A.S.	\N	\N	FLUX SOLUCION S.A.S.	\N	flux.asesor@gmail.com	\N	\N	1
540	\N	\N	890924309	\N	 (000) 0000000	FOLLAJES S.A.S	FOLLAJES S.A.S	\N	\N	FOLLAJES S.A.S	\N	facturacionfollajes@gmail.com	\N	\N	1
541	\N	\N	800180687	\N	 (000) 0000000	FONDO DE INVERSION COLECTIVA ABIERTO FIDUCUENTA	FONDO DE INVERSION COLECTIVA ABIERTO FIDUCUENTA	\N	\N	FONDO DE INVERSION COLECTIVA ABIERTO FIDUCUENTA	\N	\N	\N	\N	1
542	\N	\N	811002052	\N	3220079	FORMA EQUIPOS PARA GIMNASIO S. A. S.	\N	\N	\N	\N	\N	formacontable@une.net.co	\N	\N	1
543	\N	\N	3469427	\N	 (000) 8670096	FRANCISCO ANTONIO LOPERA GIL	FRANCISCO ANTONIO LOPERA GIL	\N	\N	FRANCISCO ANTONIO LOPERA GIL	\N	contabilidad@antoniolopera.com.co	\N	\N	1
544	\N	\N	3469427	\N	\N	FRANCISCO ANTONIO LOPERA GIL	bodega.lunaroja @hotmail.com	\N	\N	bodega.lunaroja @hotmail.com	\N	bodega.lunaroja@hotmail.com	\N	\N	1
545	\N	\N	3469427	\N	\N	FRANCISCO ANTONIO LOPERA GIL	bodega @lunaroja.com.co	\N	\N	bodega @lunaroja.com.co	\N	bodega@lunaroja.com.co	\N	\N	1
546	\N	\N	1044504743	\N	 (000) 3206342677	FRANCISCO GOMEZ	FRANCISCO GOMEZ	\N	\N	FRANCISCO GOMEZ	\N	FJGM1044504743@GMAIL.COM	\N	\N	1
547	\N	\N	908570861	\N	 (000) 0000000	FRANCISCO JAVIER AGUDELO YEPEZ	FRANCISCO JAVIER AGUDELO YEPEZ	\N	\N	FRANCISCO JAVIER AGUDELO YEPEZ	\N	pachoperez60@yahoo.com	\N	\N	1
548	\N	\N	70856326	\N	 (000) 0000000	FRANCISCO JAVIER BENJUMEA	FRANCISCO JAVIER VENJOMEDA	\N	\N	FRANCISCO JAVIER VENJOMEDA	\N	FRANCESCO4930@HOTMAIL.COM	\N	\N	1
549	\N	\N	71588201	\N	 (000) 0000000	Francisco Javier Perez	Francisco Javier Perez	\N	\N	Francisco Javier Perez	\N	pachoperez60@yahoo.com	\N	\N	1
550	\N	\N	70090304	\N	 (000) 0000000	FRANCISCO JAVIER RAMIREZ	FRANCISCO JAVIER RAMIREZ	\N	\N	FRANCISCO JAVIER RAMIREZ	\N	distrilaminasyempaques@hotmail.com	\N	\N	1
551	\N	\N	3465429	\N	 (000) 0000000	FRANCISCO LOPEZ ARTEAGA	FRANCISCO LOPEZ ARTEAGA	\N	\N	FRANCISCO LOPEZ ARTEAGA	\N	arteagalop56@gmail.com	\N	\N	1
552	\N	\N	890941794	\N	 (000) 6042292	FRANCISCO MURILLO S.A.S.	FRANCISCO MURILLO S.A.S.	\N	\N	FRANCISCO MURILLO S.A.S.	\N	\N	\N	\N	1
553	\N	\N	8244359	\N	 (000) 8687275	FRANCISCO URIEL GUERRA MEDINA	FRANCISCO URIEL GUERRA MEDINA	\N	\N	FRANCISCO URIEL GUERRA MEDINA	\N	disfincasp@yahoo.com	\N	\N	1
554	\N	\N	71758772	\N	 (000) 0000000	FRANCISCO VIDAL ROJAS	FRANCISCO VIDAL ROJAS	\N	\N	FRANCISCO VIDAL ROJAS	\N	pachovidal24@gmail.com	\N	\N	1
555	\N	\N	900178348	\N	 (000) 0000000	FRANCORP S.A.S.	FRANCORP S.A.S.	\N	\N	FRANCORP S.A.S.	\N	emisionfe@francorp.com.co	\N	\N	1
556	\N	\N	21992197	\N	 (000) 0000000	FRANCY LICET OSSA CORTES	FRANCY LICET OSSA CORTES	\N	\N	FRANCY LICET OSSA CORTES	\N	licethalex@hotmail.com	\N	\N	1
557	\N	\N	1116542646	\N	 (000) 0000000	FREDY CORREA TORRES	FREDY CORREA TORRES	\N	\N	FREDY CORREA TORRES	\N	mateo.999@hotmail.com	\N	\N	1
558	\N	\N	71716742	\N	 (000) 0000000	FREDY GARCIA GOMEZ	FREDY GARCIA GOMEZ	\N	\N	FREDY GARCIA GOMEZ	\N	FREDY.GARCIA0406@HOTMAIL.COM	\N	\N	1
559	\N	\N	98672387	\N	 (000) 0000000	FREDY RODRIGUEZ CARBAJAL	FREDY RODRIGUEZ CARBAJAL	\N	\N	FREDY RODRIGUEZ CARBAJAL	\N	fredyrodriguez94@hotmail.com	\N	\N	1
560	\N	\N	800209132	\N	 (000) 0000000	FRENOS ESPECIALES S.A.S.	FRENOS ESPECIALES S.A.S.	\N	\N	FRENOS ESPECIALES S.A.S.	\N	frenosesp@une.net.co	\N	\N	1
561	\N	\N	811022593	\N	 (000) 0000000	FRESCAS Y CURTIDAS S.A.	FRESCAS Y CURTIDAS S.A.	\N	\N	FRESCAS Y CURTIDAS S.A.	\N	frescasycurtidas@gmail.com	\N	\N	1
562	\N	\N	901605346	\N	 (000) 0000000	FRIOELECTRIC AM SAS	FRIOELECTRIC AM SAS	\N	\N	FRIOELECTRIC AM SAS	\N	frioelectricam@gmail.com	\N	\N	1
563	\N	\N	86056963	\N	 (000) 0000000	FROILAN ALBERTO PEREZ RODRIGUEZ	FROILAN ALBERTO PEREZ RODRIGUEZ	\N	\N	FROILAN ALBERTO PEREZ RODRIGUEZ	\N	std134froilan@gmail.com	\N	\N	1
564	\N	\N	900161000	\N	 (000) 0000000	FULL MINERIA S A S	FULL MINERIA S A S	\N	\N	FULL MINERIA S A S	\N	fullmineriamedellin@fullmineria.com	\N	\N	1
565	\N	\N	860517395	\N	 (000) 0000000	FUMIGADORES DE COLOMBIA FUMICOL S.A.S.	FUMIGADORES DE COLOMBIA FUMICOL S.A.S.	\N	\N	FUMIGADORES DE COLOMBIA FUMICOL S.A.S.	\N	factura@fumicol.co	\N	\N	1
566	\N	\N	901667440	\N	 (000) 0000000	FUNDACIÓN CAMPAMENTO MONTEVERDE	FUNDACIÓN CAMPAMENTO MONTEVERDE	\N	\N	FUNDACIÓN CAMPAMENTO MONTEVERDE	\N	fcampamentomonteverde@gmail.com	\N	\N	1
567	\N	\N	900410604	\N	3013354757	FUNDACION SALVA TERRA	\N	\N	\N	\N	\N	ana.villegas@fundacionsalvaterra.org	\N	\N	1
568	\N	\N	800022367	\N	 (000) 0000000	FUNDACIÓN SOCYA	FUNDACIÓN SOCYA	\N	\N	FUNDACIÓN SOCYA	\N	facturas@socya.org.co	\N	\N	1
569	\N	\N	900126655	\N	 (000) 3606161	G ALTAMIRA S.A.S	ALTAMIRA SAS	\N	\N	ALTAMIRA SAS	\N	EECHEVERRI@NAVITRANS.COM.CO	\N	\N	1
570	\N	\N	1018410101	\N	 (000) 0000000	GABRIEL ALEJANDRO RAMIREZ ZAMBRANO	GABRIEL ALEJANDRO RAMIREZ ZAMBRANO	\N	\N	GABRIEL ALEJANDRO RAMIREZ ZAMBRANO	\N	\N	\N	\N	1
571	\N	\N	8151729	\N	 (000) 0000000	GABRIEL ARTURO MONTOYA OSPINA	GABRIEL ARTURO MONTOYA OSPINA	\N	\N	GABRIEL ARTURO MONTOYA OSPINA	\N	gabrielanamia1@gmail.com	\N	\N	1
572	\N	\N	8227399	\N	 (000) 0000000	GABRIEL HUMBERTO MELO MELO	GABRIEL HUMBERTO MELO MELO	\N	\N	GABRIEL HUMBERTO MELO MELO	\N	ghmelomelo@gmail.com	\N	\N	1
573	\N	\N	70412916	\N	 (000) 0000000	GABRIEL HUMBERTO RINCON RAMIREZ	GABRIEL HUMBERTO RINCON RAMIREZ	\N	\N	GABRIEL HUMBERTO RINCON RAMIREZ	\N	\N	\N	\N	1
574	\N	\N	1078856441	\N	 (000) 0000000	Gabriel Minota	Gabriel Minota	\N	\N	Gabriel Minota	\N	facturacionaqp1@gmail.com	\N	\N	1
575	\N	\N	900757042	\N	 (000) 3207978097	GALVIS SAN PORCINOS SAS	GALVIS SAN PORCINOS SAS	\N	\N	GALVIS SAN PORCINOS SAS	\N	GALVISSANPORCINOSAS@HOTMAIL.COM	\N	\N	1
576	\N	\N	901678587	\N	 (000) 0000000	GAMERS COLOMBIA SAS	GAMERS COLOMBIA SAS	\N	\N	GAMERS COLOMBIA SAS	\N	gerencia@gamerscolombia.com	\N	\N	1
577	\N	\N	901695344	\N	 (000) 0000000	GANADERIA BETANCUR S.A.S	GANADERIA BETANCUR S.A.S	\N	\N	GANADERIA BETANCUR S.A.S	\N	ganaderia@ganaderiabetancur.com	\N	\N	1
578	\N	\N	901881394	\N	 (00) 0000000	GANADERIA JB S.A.S.	GANADERIA JB S.A.S.	\N	\N	GANADERIA JB S.A.S.	\N	PALMASECA2012@HOTMAIL.COM	\N	\N	1
579	\N	\N	900225054	\N	8670711	GANADERIA LUNA ROJA S.A.S.	\N	\N	\N	\N	\N	auxiliarganaderialr@gmail.com	\N	\N	1
580	\N	\N	811029868	\N	3014242102	GANADOS Y PORCINOS S.A.S.	\N	\N	\N	\N	\N	sixta.valencia@carga.com.co	\N	\N	1
581	\N	\N	890918095	\N	 (00) 0000000	GARLEMA S. A.	GARLEMA	\N	\N	GARLEMA	\N	garlema@egs.com.co	\N	\N	1
582	\N	\N	79319481	\N	 (000) 0000000	GELBERT RAMOS ALARCON	GELBERT RAMOS ALARCON	\N	\N	GELBERT RAMOS ALARCON	\N	resorteswoehler@hotmail.com	\N	\N	1
583	\N	\N	901047292	\N	 (000) 0000000	GEOSYPPLY SOLUCIONES AMBENTALES SAS	GEOSYPPLY SOLUCIONES AMBENTALES SAS	\N	\N	GEOSYPPLY SOLUCIONES AMBENTALES SAS	\N	gerencia@geosupply.com.co	\N	\N	1
584	\N	\N	901046803	\N	 (000) 0000000	GEOTECH INGENIERIA S. A.S	GEOTECH INGENIERIA S. A.S	\N	\N	GEOTECH INGENIERIA S. A.S	\N	FACTURASPROVEEDORES@GEOINGENIERIA.COM.CO	\N	\N	1
585	\N	\N	71649526	\N	 (000) 0000000	GERARDO DE JESUS AREIZA ARENAS	GERARDO DE JESUS AREIZA ARENAS	\N	\N	GERARDO DE JESUS AREIZA ARENAS	\N	oficinaivasro@gmail.com	\N	\N	1
586	\N	\N	70064439	\N	 (000) 3136551168	GERARDO DE JESUS PINEDA RODRIGUEZ	GERARDO DE JESUS PINEDA RODRIGUEZ	\N	\N	GERARDO DE JESUS PINEDA RODRIGUEZ	\N	GERARDOSEMILLAS@GMAIL.COM	\N	\N	1
587	\N	\N	15387154	\N	 (000) 0000000	GERARDO JIMENEZ LOPEZ	GERARDO JIMENEZ LOPEZ	\N	\N	GERARDO JIMENEZ LOPEZ	\N	\N	\N	\N	1
588	\N	\N	713125284	\N	 (000) 0000000	GERMAN ALONSO MARIN MEDINA	GERMAN ALONSO MARIN MEDINA	\N	\N	GERMAN ALONSO MARIN MEDINA	\N	gmarinfacturacion@gmail.com	\N	\N	1
589	\N	\N	70195104	\N	 (000) 0000000	GERMAN ANDRES VELASQUEZ ECHEVERRI	GERMAN ANDRES VELASQUEZ ECHEVERRI	\N	\N	GERMAN ANDRES VELASQUEZ ECHEVERRI	\N	facturacionaqp1@gmail.com	\N	\N	1
590	\N	\N	98516181	\N	 (000) 0000000	GERMAN AUGUSTO ARANGO VARGAS	GERMAN AUGUSTO ARANGO VARGAS	\N	\N	GERMAN AUGUSTO ARANGO VARGAS	\N	germanarangopisos@gmail.com	\N	\N	1
591	\N	\N	70072434	\N	 (000) 0000000	GERMAN DARIO PALACIO RESTREPO	GERMAN DARIO PALACIO RESTREPO	\N	\N	GERMAN DARIO PALACIO RESTREPO	\N	GERMANPALACIO261@GMAIL.COM	\N	\N	1
592	\N	\N	900188051	\N	 (000) 0000000	GESTION Y DESARROLLO AMBIENTE S.A.S E.S.P.	GESTION Y DESARROLLO AMBIENTE S.A.S E.S.P.	\N	\N	GESTION Y DESARROLLO AMBIENTE S.A.S E.S.P.	\N	CONTAGDAESP@GMAIL.COM	\N	\N	1
593	\N	\N	70191118	\N	 (000) 0000000	GILBERTO AVENDAÑO MONSALVE	GILBERTO AVENDAÑO MONSALVE	\N	\N	GILBERTO AVENDAÑO MONSALVE	\N	gavendano711@gmail.com	\N	\N	1
594	\N	\N	71530380	\N	 (000) 0000000	GILDARDO DE JESUS ALVAREZ ZAPATA	GILDARDO DE JESUS ALVAREZ ZAPATA	\N	\N	GILDARDO DE JESUS ALVAREZ ZAPATA	\N	gildardzapata@gmail.com	\N	\N	1
595	\N	\N	42842025	\N	 (000) 0000000	GIOVANA PARRA GIRALDO	GIOVANA PARRA GIRALDO	\N	\N	GIOVANA PARRA GIRALDO	\N	giovanaparrag@hotmail.com	\N	\N	1
596	\N	\N	900495684	\N	 (00) 0000000	GIRAVAN S.A.S	Richar Gamba	\N	\N	Richar Gamba	\N	\N	\N	\N	1
597	\N	\N	43566728	\N	 (000) 0000000	GLADYS EDILIA ALVAREZ GONZALEZ	GLADYS EDILIA ALVAREZ GONZALEZ	\N	\N	GLADYS EDILIA ALVAREZ GONZALEZ	\N	forroslosdeafan@gmail.com	\N	\N	1
598	\N	\N	900053978	\N	 (000) 0000000	GLOBAL MENSAJERIA S.A.S	GLOBAL MENSAJERIA S.A.S	\N	\N	GLOBAL MENSAJERIA S.A.S	\N	recepcionfacturastccms@tcc.com.co	\N	\N	1
599	\N	\N	901623302	\N	 (000) 0000000	GLOBAL SAFETY M.C S.A.S.	GLOBAL SAFETY M.C S.A.S.	\N	\N	GLOBAL SAFETY M.C S.A.S.	\N	globalsafetym.c@gmail.com	\N	\N	1
600	\N	\N	43534315	\N	 (000) 0000000	GLORIA AIDEE SANTANA PERDOMO	GLORIA AIDEE SANTANA PERDOMO	\N	\N	GLORIA AIDEE SANTANA PERDOMO	\N	puntodelpvc@hotmail.com	\N	\N	1
601	\N	\N	43526315	\N	 (000) 0000000	GLORIA CECILIA SALAZAR MARTINEZ	GLORIA CECILIA SALAZAR MARTINEZ	\N	\N	GLORIA CECILIA SALAZAR MARTINEZ	\N	electroantioquia@gmail.com	\N	\N	1
602	\N	\N	43728976	\N	 (000) 0000000	GLORIA MARGARITA RESTREPO SALDARRIAGA	GLORIA MARGARITA RESTREPO SALDARRIAGA	\N	\N	GLORIA MARGARITA RESTREPO SALDARRIAGA	\N	GRESTREPO19@GMAIL.COM	\N	\N	1
603	\N	\N	43569572	\N	 (000) 0000000	GLORIA ROSA ALZATE GIRALDO	GLORIA ROSA ALZATE GIRALDO	\N	\N	GLORIA ROSA ALZATE GIRALDO	\N	litoterminados1@gmail.com	\N	\N	1
604	\N	\N	901897885	\N	 (000) 0000000	GLOVALSERVICIOS  VIG S.A.S	GLOVALSERVICIOS  VIG S.A.S	\N	\N	GLOVALSERVICIOS  VIG S.A.S	\N	herry.villegas@hotmail.com	\N	\N	1
605	\N	\N	901668587	\N	 (000) 0000000	GOLDEN ENERGY S.A.S	GOLDEN ENERGY S.A.S	\N	\N	GOLDEN ENERGY S.A.S	\N	PROYECTOS@SIGMAENERGIAS.COM	\N	\N	1
606	\N	\N	901234532	\N	 (00) 0000000	GOLDEN LIME S.A.S	GOLDEN LIME S.A.S	\N	\N	GOLDEN LIME S.A.S	\N	camilafernandez@sondelcauca.com	\N	\N	1
607	\N	\N	811009734	\N	 (000) 0000000	GOMECO S.A.S	G	\N	\N	G	\N	facturacion@constructoragomeco.com	\N	\N	1
608	\N	\N	890919009	\N	4126420	GOMEZ ESTRADA S.A.S	\N	\N	\N	\N	\N	gomez.estrada06@gmail.com	\N	\N	1
609	\N	\N	98495161	\N	 (000) 0000000	GONZALO AUGUSTO RESTREPO MADRIGAL	GONZALO AUGUSTO RESTREPO MADRIGAL	\N	\N	GONZALO AUGUSTO RESTREPO MADRIGAL	\N	augusto.restrepo@hotmail.com	\N	\N	1
610	\N	\N	901456725	\N	 (000) 0000000	GRAN DIAMANTE HOTEL BOUTIQUE S.A.S.	GRAN DIAMANTE HOTEL BOUTIQUE S.A.S.	\N	\N	GRAN DIAMANTE HOTEL BOUTIQUE S.A.S.	\N	infograndiamante@gmail.com	\N	\N	1
611	\N	\N	901177963	\N	 (000) 0000000	GRANJA BRISAS DE ORO ZOMAC S.A.S	GRANJA BRISAS DE ORO ZOMAC S.A.S	\N	\N	GRANJA BRISAS DE ORO ZOMAC S.A.S	\N	brisasdeorosas@gmail.com	\N	\N	1
612	\N	\N	901797303	\N	 (000) 0000000	GRANJA LA LINDA S.A.S	GRANJA LA LINDA S.A.S	\N	\N	GRANJA LA LINDA S.A.S	\N	ADM.GRANJALALINDA@GMAIL.COM	\N	\N	1
613	\N	\N	901786392	\N	 (000) 0000000	GRANJA SAN FRANCISCO DE ASIS S.A.S	GRANJA SAN FRANCISCO DE ASIS S.A.S	\N	\N	GRANJA SAN FRANCISCO DE ASIS S.A.S	\N	GRANJASANFRANCISCODEASIS1@GMAIL.COM	\N	\N	1
614	\N	\N	901258045	\N	 (000) 0000000	GRUPO ATEHORTUA SAS	GRUPO ATEHORTUA SAS	\N	\N	GRUPO ATEHORTUA SAS	\N	\N	\N	\N	1
615	\N	\N	901959813	\N	 (000) 3178644911	GRUPO AVOHASS S.A.S	JULIO ERNESTO PARRA POSADA	\N	\N	JULIO ERNESTO PARRA POSADA	\N	grupoavohass@gmail.com	\N	\N	1
616	\N	\N	901660835	\N	 (000) 0000000	GRUPO CAMAES S.A.S.	GRUPO CAMAES S.A.S.	\N	\N	GRUPO CAMAES S.A.S.	\N	\N	\N	\N	1
617	\N	\N	901558054	\N	 (000) 0000000	GRUPO COMERCIAL E INDUSTRIAL MILENIUM 2022 SAS	GRUPO COMERCIAL E INDUSTRIAL MILENIUM 2022 SAS	\N	\N	GRUPO COMERCIAL E INDUSTRIAL MILENIUM 2022 SAS	\N	grupocomercialmilenium2022@gmail.com	\N	\N	1
618	\N	\N	900795612	\N	 (000) 0000000	GRUPO DEFA SAS	GRUPO DEFA SAS	\N	\N	GRUPO DEFA SAS	\N	\N	\N	\N	1
619	\N	\N	900459737	\N	 (000) 0000000	GRUPO EDS AUTOGAS S.A.S	GRUPO EDS AUTOGAS S.A.S	\N	\N	GRUPO EDS AUTOGAS S.A.S	\N	camilo.gomez@autogas.com.co	\N	\N	1
620	\N	\N	901368808	\N	 (000) 0000000	GRUPO EDUCACION INTELIGENTE S.A.S	GRUPO EDUCACION INTELIGENTE S.A.S	\N	\N	GRUPO EDUCACION INTELIGENTE S.A.S	\N	facturas@educacioninteligente.org	\N	\N	1
621	\N	\N	901500654	\N	 (000) 0000000	GRUPO EMPRESARIAL COMATCOL S.A.S	GRUPO EMPRESARIAL COMATCOL S.A.S	\N	\N	GRUPO EMPRESARIAL COMATCOL S.A.S	\N	auxiliarcontable2@ecoilenergia.com	\N	\N	1
622	\N	\N	901450319	\N	 (00) 0000000	GRUPO FERRERTERO S.A.S.	GRUPO FERRERTERO S.A.S.	\N	\N	GRUPO FERRERTERO S.A.S.	\N	mymlasgemelas@hotmail.com	\N	\N	1
623	\N	\N	900859210	\N	 (000) 0000000	GRUPO FW S.A.S.	GRUPO FW S.A.S.	\N	\N	GRUPO FW S.A.S.	\N	ceimpuestos@gmail.com	\N	\N	1
624	\N	\N	900006525	\N	 (000) 0000000	GRUPO SAN JUANITO S.A.S.	GRUPO SAN JUANITO S.A.S	\N	\N	GRUPO SAN JUANITO S.A.S	\N	recepcionfacturas@gruposanjuanito.com.co	\N	\N	1
625	\N	\N	800061228	\N	 (000) 0000000	GRUPO SAN PIO	GRUPO SAN PIO	\N	\N	GRUPO SAN PIO	\N	info@gruposanpio.com	\N	\N	1
626	\N	\N	901817783	\N	 (000) 0000000	GRUPO THULE S.A.S	GRUPO THULE S.A.S	\N	\N	GRUPO THULE S.A.S	\N	factelecrelicario@gmail.com	\N	\N	1
627	\N	\N	901627005	\N	 (000) 0000000	GRUPO TORRECAFE S.A.S	GRUPO TORRECAFE S.A.S	\N	\N	GRUPO TORRECAFE S.A.S	\N	ALIMORCAFE@GMAIL.COM	\N	\N	1
628	\N	\N	901866114	\N	 (000) 0000000	GRUPO TRES SEMILLAS S.A.S	GRUPO TRES SEMILLAS S.A.S	\N	\N	GRUPO TRES SEMILLAS S.A.S	\N	grupotressemillas@gmail.com	\N	\N	1
629	\N	\N	901212735	\N	 (000) 0000000	GRUPO VALBUENA & MURCIA S.A.S	GRUPO VALBUENA & MURCIA S.A.S	\N	\N	GRUPO VALBUENA & MURCIA S.A.S	\N	corporativo@vanitybox.com.co	\N	\N	1
630	\N	\N	900226055	\N	 (000) 0000000	GRUPOAQUA S.A.S	GRUPOAQUA S.A.S	\N	\N	GRUPOAQUA S.A.S	\N	admin@grupoaqua.com	\N	\N	1
631	\N	\N	900488634	\N	\N	GUAYAS Y CADENAS S.A.S	GUAYAS Y CADENAS S.A.S	\N	\N	GUAYAS Y CADENAS S.A.S	\N	guayasycadenas@gmail.com	\N	\N	1
632	\N	\N	71384621	\N	 (000) 0000000	GUILLERMO ALBERTO CORREA  HENAO	GUILLERMO ALBERTO CORREA  HENAO	\N	\N	GUILLERMO ALBERTO CORREA  HENAO	\N	metalelectric5021@gmail.com	\N	\N	1
633	\N	\N	70067369	\N	 (000) 0000000	GUILLERMO ANTONIO ARENAS RESTREPO	GUILLERMO ANTONIO ARENAS RESTREPO	\N	\N	GUILLERMO ANTONIO ARENAS RESTREPO	\N	verdun5409@gmail.com	\N	\N	1
634	\N	\N	3589085	\N	 (000) 0000000	GUILLERMO ANTONIO MARIN CORREA	GUILLERMO ANTONIO MARIN CORREA	\N	\N	GUILLERMO ANTONIO MARIN CORREA	\N	\N	\N	\N	1
635	\N	\N	70059515	\N	4127176	GUILLERMO HENAO RESTREPO	GUILLERMO HENAO RESTREPO	\N	\N	GUILLERMO HENAO RESTREPO	\N	GHENAO@UNAL.EDU.CO	\N	\N	1
636	\N	\N	71761162	\N	 (000) 0000000	GUILLERMO LEON BUILES VASQUEZ	GUILLERMO LEON BUILES VASQUEZ	\N	\N	GUILLERMO LEON BUILES VASQUEZ	\N	guille113@hotmail.com	\N	\N	1
637	\N	\N	71582106	\N	 (000) 0000000	GUILLERMO OSPINA PATILLO	GUILLERMO OSPINA PATILLO	\N	\N	GUILLERMO OSPINA PATILLO	\N	\N	\N	\N	1
638	\N	\N	70192245	\N	 (000) 0000000	GUSTAVO ADOLFO MARULANDA	GUSTAVO ADOLFO MARULANDA	\N	\N	GUSTAVO ADOLFO MARULANDA	\N	\N	\N	\N	1
639	\N	\N	88214129	\N	\N	GUSTAVO REMOLINA BECERRA	GUSTAVO REMOLINA BECERRA	\N	\N	GUSTAVO REMOLINA BECERRA	\N	gustavoremolina123@gmail.com	\N	\N	1
640	\N	\N	71083899	\N	 (000) 0000000	GUSTAVO VASQUEZ ESTRADA	GUSTAVO VASQUEZ ESTRADA	\N	\N	GUSTAVO VASQUEZ ESTRADA	\N	gvasquezestrada@gmail.com	\N	\N	1
641	\N	\N	900983573	\N	 (000) 0000000	HACIENDA LA GUADALUPANA S.A.S	HACIENDA LA GUADALUPANA S.A.S	\N	\N	HACIENDA LA GUADALUPANA S.A.S	\N	laguadalupanasas@gmail.com	\N	\N	1
642	\N	\N	71087224	\N	 (000) 0000000	HEBER STIVENSON LOTERO VANEGAS	HEBER STIVENSON LOTERO VANEGAS	\N	\N	HEBER STIVENSON LOTERO VANEGAS	\N	ceballosemanuel227@gmail.com	\N	\N	1
643	\N	\N	98506214	\N	\N	HECTOR ALONSO MARIN MEJIA	HECTOR ALONSO MARIN MEJIA	\N	\N	HECTOR ALONSO MARIN MEJIA	\N	halonsomarinmejia@gmail.com	\N	\N	1
644	\N	\N	71175119	\N	 (000) 0000000	HECTOR ALONSO PINEDA	HECTOR ALONSO PINEDA	\N	\N	HECTOR ALONSO PINEDA	\N	facturacionaqp1@gmail.com	\N	\N	1
645	\N	\N	1037502392	\N	 (000) 0000000	HECTOR DANIEL LOPEZ GIRALDO	HECTOR DANIEL LOPEZ GIRALDO	\N	\N	HECTOR DANIEL LOPEZ GIRALDO	\N	daniel602002@hotmail.com	\N	\N	1
646	\N	\N	79906606	\N	 (000) 0000000	HECTOR SALAZAR CASTILLO	HECTOR SALAZAR CASTILLO	\N	\N	HECTOR SALAZAR CASTILLO	\N	suministrosmec27@gmail.com	\N	\N	1
647	\N	\N	98491805	\N	 (000) 0000000	HENRY HOLGUIN HENAO	HENRY HOLGUIN HENAO	\N	\N	HENRY HOLGUIN HENAO	\N	electricoshenryholguin@gmail.com	\N	\N	1
648	\N	\N	70076859	\N	 (000) 0000000	HERNAN MEZA	HERNAN MEZA	\N	\N	HERNAN MEZA	\N	facturacionaqp1@gmail.com	\N	\N	1
649	\N	\N	15516374	\N	 (000) 0000000	HERNAN TABORDA	HERNAN TABORDA	\N	\N	HERNAN TABORDA	\N	hernantaborda27@gmail.com	\N	\N	1
650	\N	\N	901393262	\N	 (000) 0000000	HERSEGO SAS	HERSEGO SAS	\N	\N	HERSEGO SAS	\N	HERSEGOHERBS@GMAIL.COM	\N	\N	1
651	\N	\N	3588640	\N	8556190	HIDER DE JESUS CASTILLON SUAREZ	HIDER DE JESUS CASTRILLON SUAREZ	\N	\N	HIDER DE JESUS CASTRILLON SUAREZ	\N	ferreteria1@hotmail.com	\N	\N	1
652	\N	\N	901950313	\N	 (000) 0000000	HIDROTEC J&S S.A.S	HIDROTEC J&S S.A.S	\N	\N	HIDROTEC J&S S.A.S	\N	HIDROTEC25@GMAIL.COM	\N	\N	1
653	\N	\N	900448470	\N	 (000) 0000000	HIERROS DE OCCIDENTE FERRETERIAS S.A.S	HIERROS DE OCCIDENTE FERRETERIAS S.A.S	\N	\N	HIERROS DE OCCIDENTE FERRETERIAS S.A.S	\N	\N	\N	\N	1
654	\N	\N	900825228	\N	 (000) 0000000	HL AGROPECUARIA S.A.S	HL AGROPECUARIA S.A.S	\N	\N	HL AGROPECUARIA S.A.S	\N	CONTABILIDAD01@HLCOMBUSTIBLES.COM	\N	\N	1
655	\N	\N	802010030	\N	 (000) 0000000	HOTE SAN BENITO	HOTE SAN BENITO	\N	\N	HOTE SAN BENITO	\N	hotelsanbenito03@gmail.com	\N	\N	1
656	\N	\N	900849466	\N	 (000) 0000000	HOTEL SEXTA AVENIDA INN SAS	HOTEL SEXTA AVENIDA INN SAS	\N	\N	HOTEL SEXTA AVENIDA INN SAS	\N	\N	\N	\N	1
657	\N	\N	900277215	\N	 (000) 0000000	HOTELES DE UPAR SAS	HOTELES DE UPAR SAS	\N	\N	HOTELES DE UPAR SAS	\N	\N	\N	\N	1
658	\N	\N	800211470	\N	 (000) 0000000	HOTELES REGATTA S.A.S.	HOTELES REGATTA S.A.S.	\N	\N	HOTELES REGATTA S.A.S.	\N	\N	\N	\N	1
659	\N	\N	71482123	\N	 (000) 0000000	HUBER ALBERTO GOMEZ	HUBER ALBERTO GOMEZ	\N	\N	HUBER ALBERTO GOMEZ	\N	facturaacquapack@gmail.com	\N	\N	1
660	\N	\N	8129329	\N	 (000) 0000000	HUBERNEY GARCIA MAZO	HUBERNEY GARCIA MAZO	\N	\N	HUBERNEY GARCIA MAZO	\N	webersas@hotmail.com	\N	\N	1
661	\N	\N	80064862	\N	 (000) 3104423175	HUGO ALVAREZ BOLIVAR	HUGO ALVAREZ BOLIVAR	\N	\N	HUGO ALVAREZ BOLIVAR	\N	levante.Ceba@gmail.com	\N	\N	1
662	\N	\N	8307795	\N	 (000) 0000000	HUMBERTO GAVIRIA LONDOÑO	HUMBERTO GAVIRIA LONDOÑO	\N	\N	HUMBERTO GAVIRIA LONDOÑO	\N	humbertogaviria@yahoo.com	\N	\N	1
663	\N	\N	901511050	\N	 (000) 0000000	HYDRO BOMBAS SERVICIOS INTEGRALES S.A.S	HYDRO BOMBAS SERVICIOS INTEGRALES S.A.S	\N	\N	HYDRO BOMBAS SERVICIOS INTEGRALES S.A.S	\N	TESORERIA@HYDROBOMBAS.COM	\N	\N	1
664	\N	\N	800097956	\N	 (000) 0000000	IE INGENIERIA Y ENCONFRADOS S.A.S	IE INGENIERIA Y ENCONFRADOS S.A.S	\N	\N	IE INGENIERIA Y ENCONFRADOS S.A.S	\N	gestiondocumental@encofradosie.co	\N	\N	1
665	\N	\N	15660759	\N	 (00) 0000000	IGNACIO VILLA MARTINEZ	IGNACIO VILLA MARTINEZ	\N	\N	IGNACIO VILLA MARTINEZ	\N	disagrolltda01@hotmail.com	\N	\N	1
666	\N	\N	901155226	\N	 (000) 0000000	IMPRESTAR GRAFICA SAS	IMPRESTAR GRAFICA SAS	\N	\N	IMPRESTAR GRAFICA SAS	\N	IMPRESTARLITOGRAFICA@HOTMAIL.COM	\N	\N	1
667	\N	\N	900812608	\N	 (000) 0000000	INDUSTRIA COLOMBIANA DE PESAS EU	INDUSTRIA COLOMBIANA DE PESAS EU	\N	\N	INDUSTRIA COLOMBIANA DE PESAS EU	\N	facturacionincolpesas@hotmail.com	\N	\N	1
668	\N	\N	901172830	\N	 (000) 0000000	INDUSTRIAL MARKET SAS	INDUSTRIAL MARKET SAS	\N	\N	INDUSTRIAL MARKET SAS	\N	info.industrialmcsas@gmail.com	\N	\N	1
669	\N	\N	901149181	\N	 (000) 0000000	INDUSTRIALES R&D S.A.S	INDUSTRIALES R&D S.A.S	\N	\N	INDUSTRIALES R&D S.A.S	\N	INDUSTRIALESRD@GMAIL.COM	\N	\N	1
670	\N	\N	901740571	\N	 (000) 0000000	INDUSTRIAS ALIMENTICIAS VZ S.A.S.	INDUSTRIAS ALIMENTICIAS VZ S.A.S.	\N	\N	INDUSTRIAS ALIMENTICIAS VZ S.A.S.	\N	\N	\N	\N	1
671	\N	\N	800131750	\N	 (000) 0000000	INDUSTRIAS CORY S.A.S	INDUSTRIAS CORY S.A.S	\N	\N	INDUSTRIAS CORY S.A.S	\N	facturacion@cory.com.co	\N	\N	1
672	\N	\N	811037868	\N	 (000) 0000000	INDUSTRIAS GALVANIZADOS S.A.S	INDUSTRIAS GALVANIZADOS S.A.S	\N	\N	INDUSTRIAS GALVANIZADOS S.A.S	\N	info@indugal.com.co	\N	\N	1
673	\N	\N	890900281	\N	 (000) 0000000	INDUSTRIAS HACEB S.A.	INDUSTRIAS HACEB S.A.	\N	\N	INDUSTRIAS HACEB S.A.	\N	\N	\N	\N	1
674	\N	\N	890320488	\N	 (000) 0000000	INDUSTRIAS MACAR PALMIRA S.A.S	INDUSTRIAS MACAR PALMIRA S.A.S	\N	\N	INDUSTRIAS MACAR PALMIRA S.A.S	\N	facturacion@industriasmacar.com	\N	\N	1
675	\N	\N	890943160	\N	 (000) 0000000	INDUSTRIAS MAMUT SAS	INDUSTRIAS MAMUT SAS	\N	\N	INDUSTRIAS MAMUT SAS	\N	administracion@industriasmamut.com	\N	\N	1
676	\N	\N	901374916	\N	 (000) 0000000	INDUSTRIAS PLASTICAS COPA	INDUSTRIAS PLASTICAS COPA	\N	\N	INDUSTRIAS PLASTICAS COPA	\N	industriasplasticascopacabana@gmail.com	\N	\N	1
677	\N	\N	901502775	\N	 (000) 0000000	INFINITY CROPS S.A.S.	INFINITY CROPS S.A.S.	\N	\N	INFINITY CROPS S.A.S.	\N	info@infinity-crops.com	\N	\N	1
678	\N	\N	900854744	\N	 (000) 0000000	INFO STRATEGY S.A.S	INFO STRATEGY S.A.S	\N	\N	INFO STRATEGY S.A.S	\N	info@infostrategy.co	\N	\N	1
679	\N	\N	901095774	\N	 (000) 0000000	INGEBRONCES S.A.S.	INGEBRONCES S.A.S.	\N	\N	INGEBRONCES S.A.S.	\N	ingebronces@hotmail.com	\N	\N	1
680	\N	\N	811020379	\N	 (000) 0000000	INGENIERIA AMBIENTAL ESPECIALIZADA I.A.E. E.U.	INGENIERIA AMBIENTAL ESPECIALIZADA I.A.E. E.U.	\N	\N	INGENIERIA AMBIENTAL ESPECIALIZADA I.A.E. E.U.	\N	ambientaldavid@yahoo.com	\N	\N	1
681	\N	\N	901421740	\N	 (000) 0000000	INGENIERIA AVANZADA SOLUCIONES Y SERVICIOS S.A.S	INGENIERIA AVANZADA SOLUCIONES Y SERVICIOS	\N	\N	INGENIERIA AVANZADA SOLUCIONES Y SERVICIOS	\N	administrativo@iassingenieria.com	\N	\N	1
682	\N	\N	901060089	\N	 (000) 0000000	INGENIERIA CIVIL & OBRAS S.A.S.	INGENIERIA CIVIL & OBRAS S.A.S.	\N	\N	INGENIERIA CIVIL & OBRAS S.A.S.	\N	facturacion.icyobras@gmail.com	\N	\N	1
683	\N	\N	890932848	\N	 (000) 0000000	INGENIERIA DE AGUA S.A.S	INGENIERIA DE AGUA S.A.S	\N	\N	INGENIERIA DE AGUA S.A.S	\N	compras@ingeaguas.com.co	\N	\N	1
684	\N	\N	900143909	\N	 (000) 0000000	INGENIERIA GUADUA Y ARQUITECTURA S.A.	INGENIERIA GUADUA Y ARQUITECTURA S.A.	\N	\N	INGENIERIA GUADUA Y ARQUITECTURA S.A.	\N	TERMOACUSTICA@YAHOO.COM	\N	\N	1
685	\N	\N	900540930	\N	 (000) 0000000	INGENIO Y SOLUCIONES AMBIENTALES S.A.S	INGENIO Y SOLUCIONES AMBIENTALES S.A.S	\N	\N	INGENIO Y SOLUCIONES AMBIENTALES S.A.S	\N	facturacion@insoambientales.com	\N	\N	1
686	\N	\N	901256344	\N	 (000) 0000000	INGRAS SAS	INGRAS SAS	\N	\N	INGRAS SAS	\N	oasis@ingras.com.co	\N	\N	1
687	\N	\N	901830546	\N	 (000) 0000000	INMOBILIDERES PROPIEDAD RAIZ S.A.S.	INMOBILIDERES PROPIEDAD RAIZ S.A.S.	\N	\N	INMOBILIDERES PROPIEDAD RAIZ S.A.S.	\N	inmobilideres@hotmail.com	\N	\N	1
688	\N	\N	900842149	\N	 (000) 0000000	INSTALACIONES HIDROSANITARIAS JMF S.A.S	INSTALACIONES HIDROSANITARIAS JMF S.A.S	\N	\N	INSTALACIONES HIDROSANITARIAS JMF S.A.S	\N	jairomf3@hotmail.com	\N	\N	1
689	\N	\N	901398547	\N	 (000) 0000000	INSUAGRO MATTERA S.A.S	INSUAGRO MATTERA S.A.S	\N	\N	INSUAGRO MATTERA S.A.S	\N	INSUAGROMATTERA@GMAIL.COM	\N	\N	1
690	\N	\N	901853780	\N	 (000) 0000000	INSUMOS AGROPECUARIOS DE ANTIOQUIA S.A.S.	INSUMOS AGROPECUARIOS DE ANTIOQUIA S.A.S.	\N	\N	INSUMOS AGROPECUARIOS DE ANTIOQUIA S.A.S.	\N	insumosagropecuariosant@gmail.com	\N	\N	1
691	\N	\N	800251569	\N	 (000) 0000000	INTER RAPIDISIMO S.A	INTER RAPIDISIMO S.A	\N	\N	INTER RAPIDISIMO S.A	\N	\N	\N	\N	1
692	\N	\N	900618250	\N	 (000) 0000000	INTERCOMERCIALIZADORA MEAT PACKING S.A.S	INTERCOMERCIALIZADORA MEAT PACKING S.A.S	\N	\N	INTERCOMERCIALIZADORA MEAT PACKING S.A.S	\N	contabilidad@meatpacking.com.co	\N	\N	1
693	\N	\N	900787267	\N	 (000) 0000000	INTERFLON COLOMBIA S.A.S	INTERFLON COLOMBIA S.A.S	\N	\N	INTERFLON COLOMBIA S.A.S	\N	JCLONDONO@INTERFLON.COM	\N	\N	1
694	\N	\N	890940770	\N	 (000) 0000000	INTERNACIONAL DE EMPAQUES S.A.S.	INTERNACIONAL DE EMPAQUES S.A.S.	\N	\N	INTERNACIONAL DE EMPAQUES S.A.S.	\N	ventas.medellin@interempaques.com	\N	\N	1
695	\N	\N	900525907	\N	 (000) 0000000	INVER RIBON S.A.S	INVER RIBON S.A.S	\N	\N	INVER RIBON S.A.S	\N	contabilidadmaquitrans2020@gmail.com	\N	\N	1
696	\N	\N	901427006	\N	 (000) 0000000	INVERAGRO ARANGOS S.A.S.	INVERAGRO ARANGOS S.A.S.	\N	\N	INVERAGRO ARANGOS S.A.S.	\N	inveragroarangos@gmail.com	\N	\N	1
697	\N	\N	890928760	\N	 (000) 0000000	INVERMUR S.A.S	INVERMUR S.A.S	\N	\N	INVERMUR S.A.S	\N	recepcionfacturas.inr@gmail.com	\N	\N	1
698	\N	\N	811044875	\N	 (000) 0000000	INVERSAV S.A.S	INVERSAV S.A.S	\N	\N	INVERSAV S.A.S	\N	facturacion@inversav.com.co	\N	\N	1
699	\N	\N	901610549	\N	 (000) 0000000	INVERSIONES AFLOAT S.A.S.	INVERSIONES AFLOAT S.A.S.	\N	\N	INVERSIONES AFLOAT S.A.S.	\N	contabilidad@afloatadventure.com	\N	\N	1
700	\N	\N	811041739	\N	 (000) 0000000	INVERSIONES ALTOVERO SA	INVERSIONES ALTOVERO SA	\N	\N	INVERSIONES ALTOVERO SA	\N	altoverosa@gmail.com	\N	\N	1
701	\N	\N	901576048	\N	 (000) 0000000	INVERSIONES APLEZ S.A.S	INVERSIONES APLEZ S.A.S	\N	\N	INVERSIONES APLEZ S.A.S	\N	FE@GLINTFX.COM	\N	\N	1
702	\N	\N	901658155	\N	 (000) 0000000	INVERSIONES ARANA CORREA S.A.S	INVERSIONES ARANA CORREA S.A.S	\N	\N	INVERSIONES ARANA CORREA S.A.S	\N	\N	\N	\N	1
703	\N	\N	901658155	\N	\N	INVERSIONES ARANA CORREA S.A.S	facturacion	\N	\N	facturacion	\N	facturacionaqp1@gmail.com	\N	\N	1
704	\N	\N	900585137	\N	 (000) 0000000	INVERSIONES ARIAS SERNA S.A.S	INVERSIONES ARIAS SERNA S.A.S	\N	\N	INVERSIONES ARIAS SERNA S.A.S	\N	inversionesariasserna@gmail.com	\N	\N	1
705	\N	\N	811041675	\N	 (000) 0000000	INVERSIONES ASJ SOCIEDAD POR ACCIONES SIMPLIFICADA	INVERSIONES ASJ SOCIEDAD POR ACCIONES SIMPLIFICADA	\N	\N	INVERSIONES ASJ SOCIEDAD POR ACCIONES SIMPLIFICADA	\N	ASJLA80@GMAIL.CON	\N	\N	1
706	\N	\N	811034240	\N	 (000) 0000000	INVERSIONES B.GOMEZ Y CIA A EN C	INVERSIONES B.GOMEZ Y CIA A EN C	\N	\N	INVERSIONES B.GOMEZ Y CIA A EN C	\N	hcontable@haby.com.co	\N	\N	1
707	\N	\N	901565667	\N	 (000) 0000000	INVERSIONES BRAND S.A.S	INVERSIONES SALAZAR BRAND S.A.S	\N	\N	INVERSIONES SALAZAR BRAND S.A.S	\N	ferreteriatornilad@hotmail.com	\N	\N	1
708	\N	\N	901268667	\N	 (000) 0000000	INVERSIONES C.A.E S.A.S	INVERSIONES C.A.E S.A.S	\N	\N	INVERSIONES C.A.E S.A.S	\N	invercae111@gmail.com	\N	\N	1
709	\N	\N	800108054	\N	3008367042	INVERSIONES CASAGRANDE S.A.S	ALDAIR CORREA	\N	\N	ALDAIR CORREA	\N	fe@inversionescasagrande.com.co	\N	\N	1
710	\N	\N	901982713	\N	 (000) 0000000	INVERSIONES COLBUFALA SAS	INVERSIONES COLBUFALA SAS	\N	\N	INVERSIONES COLBUFALA SAS	\N	principediaz200@gmail.com	\N	\N	1
711	\N	\N	900024694	\N	 (00) 0000000	INVERSIONES EL ENCANTO SOCIEDAD POR ACCIONES SIMPLIFICADA	INVERSIONES EL ENCANTO SOCIEDAD POR ACCIONES SIMPL	\N	\N	INVERSIONES EL ENCANTO SOCIEDAD POR ACCIONES SIMPL	\N	inversioneselencanto20@gmail.com	\N	\N	1
712	\N	\N	901065533	\N	 (000) 0000000	INVERSIONES EL KAISER S.A.S	INVERSIONES EL KAISER S.A.S	\N	\N	INVERSIONES EL KAISER S.A.S	\N	cenavia@yahoo.com	\N	\N	1
713	\N	\N	901841797	\N	 (000) 0000000	INVERSIONES EL PALMAR	INVERSIONES EL PALMAR	\N	\N	INVERSIONES EL PALMAR	\N	contabilidadelpalmarsas@gmail.com	\N	\N	1
714	\N	\N	901238059	\N	 (000) 0000000	INVERSIONES EL REBAÑO S.A.S	José Alfredo Correa	\N	\N	José Alfredo Correa	\N	901238059@factureinbox.co	\N	\N	1
715	\N	\N	900834004	\N	4366130	INVERSIONES GARRIDO & DURANGO S.A.S	\N	\N	\N	\N	\N	gydinversiones@gmail.com	\N	\N	1
716	\N	\N	900727571	\N	 (00) 0000000	INVERSIONES GOMEZ BEDOYA S.A.S	INVERSIONES GOMEZ BEDOYA S.A.S	\N	\N	INVERSIONES GOMEZ BEDOYA S.A.S	\N	facturacion@ingobe.co	\N	\N	1
717	\N	\N	900727571	\N	\N	INVERSIONES GOMEZ BEDOYA S.A.S	ivangomez@diabonos.com	\N	\N	ivangomez@diabonos.com	\N	ivangomez@diabonos.com	\N	\N	1
718	\N	\N	900474264	\N	 (000) 0000000	INVERSIONES HC RAAD S.A.S.	INVERSIONES HC RAAD S.A.S.	\N	\N	INVERSIONES HC RAAD S.A.S.	\N	hoovercastroraad@gmail.com	\N	\N	1
719	\N	\N	900905619	\N	 (000) 0000000	INVERSIONES JARALZA S.A.S.	INVERSIONES JARALZA S.A.S.	\N	\N	INVERSIONES JARALZA S.A.S.	\N	haciendalaconcha@gmail.com	\N	\N	1
720	\N	\N	900504845	\N	 (000) 48534590	INVERSIONES JF S . A . S	INVERSIONES JF S . A . S	\N	\N	INVERSIONES JF S . A . S	\N	compras_jf@hotmail.com	\N	\N	1
721	\N	\N	900238866	\N	 (000) 0000000	INVERSIONES LA 28 SA	INVERSIONES LA 28 SA	\N	\N	INVERSIONES LA 28 SA	\N	colombiafactinversionesla28@gmail.com	\N	\N	1
722	\N	\N	901562128	\N	 (000) 0000000	INVERSIONES LA ALEGRIA VELEZ S.A.S	INVERSIONES LA ALEGRIA VELEZ S.A.S	\N	\N	INVERSIONES LA ALEGRIA VELEZ S.A.S	\N	banbam88@hotmail.com	\N	\N	1
723	\N	\N	901339622	\N	 (000) 0000000	INVERSIONES LA LIBERTAD O&M S.A.S	INVERSIONES LA LIBERTAD O&M S.A.S	\N	\N	INVERSIONES LA LIBERTAD O&M S.A.S	\N	GABRIELOCHOA03@HOTMAIL.COM	\N	\N	1
724	\N	\N	811040857	\N	 (000) 0000000	INVERSIONES LASAN Y CIA S.A.S	INVERSIONES LASAN Y CIA S.A.S	\N	\N	INVERSIONES LASAN Y CIA S.A.S	\N	lasan@lasan.live	\N	\N	1
725	\N	\N	901802405	\N	 (000) 0000000	INVERSIONES LOS GOMELOS SAS	INVERSIONES LOS GOMELOS SAS	\N	\N	INVERSIONES LOS GOMELOS SAS	\N	inversioneslosgomelossas@gmail.com	\N	\N	1
726	\N	\N	901637324	\N	 (000) 0000000	INVERSIONES LOS PERRITOS DEL MONO SAS	INVERSIONES LOS PERRITOS DEL MONO SAS	\N	\N	INVERSIONES LOS PERRITOS DEL MONO SAS	\N	contabilidad@losperritosdelmono.com	\N	\N	1
727	\N	\N	890916099	\N	 (000) 0000000	INVERSIONES LOS TAMARINDOS S.A.S	INVERSIONES LOS TAMARINDOS S.A.S	\N	\N	INVERSIONES LOS TAMARINDOS S.A.S	\N	sameve607@gmail.com	\N	\N	1
728	\N	\N	800122286	\N	 (000) 0000000	INVERSIONES LOTERO PELAEZ Y CIA LTDA	INVERSIONES LOTERO PELAEZ Y CIA LTDA	\N	\N	INVERSIONES LOTERO PELAEZ Y CIA LTDA	\N	terpella65@une.net.co	\N	\N	1
729	\N	\N	901371328	\N	 (000) 0000000	INVERSIONES MAGRO S.A.S	INVERSIONES MAGRO S.A.S	\N	\N	INVERSIONES MAGRO S.A.S	\N	inversionesmaagrosas@gmail.com	\N	\N	1
730	\N	\N	890908065	\N	 (000) 0000000	INVERSIONES MALABAR S.A.S	INVERSIONES MALABAR S.A.S	\N	\N	INVERSIONES MALABAR S.A.S	\N	secretaria@haciendaovejas.com	\N	\N	1
731	\N	\N	890908065	\N	\N	INVERSIONES MALABAR S.A.S	malabar	\N	\N	malabar	\N	contabilidad@haciendaovejas.com	\N	\N	1
732	\N	\N	901368521	\N	3113158279	INVERSIONES METALES PESADOS S.A.S	\N	\N	\N	\N	\N	inversionesmetalespesados@hotmail.com	\N	\N	1
733	\N	\N	901906436	\N	 (000) 0000000	INVERSIONES MINERCOL PIRA S.A.S	INVERSIONES MINERCOL PIRA S.A.S	\N	\N	INVERSIONES MINERCOL PIRA S.A.S	\N	inversionesminercolpirasas@gmail.com	\N	\N	1
734	\N	\N	900149480	\N	 (000) 0000000	INVERSIONES MONTOYA PINEDA S.A	INVERSIONES MONTOYA PINEDA S.A	\N	\N	INVERSIONES MONTOYA PINEDA S.A	\N	facturacionedsprimax@cocorollo.com	\N	\N	1
735	\N	\N	901315384	\N	 (00) 0000000	INVERSIONES MORENO LLANO SAS	INVERSIONES MORENO LLANO SAS	\N	\N	INVERSIONES MORENO LLANO SAS	\N	gerencia@excarbonsa.com	\N	\N	1
736	\N	\N	811012157	\N	3138985	INVERSIONES NAPY S.A.	\N	\N	\N	\N	\N	exoticasyfollajes@gmail.com	\N	\N	1
737	\N	\N	901577928	\N	 (00) 3206325792	INVERSIONES OCHO.RPO SAS	BRYANT  OCHOA RESTREPO	\N	\N	BRYANT  OCHOA RESTREPO	\N	inverochorpo@gmail.com	\N	\N	1
738	\N	\N	900189954	\N	4462727	INVERSIONES PUERCO RICO S.A.	\N	\N	\N	\N	\N	yquintero@covitec.com.co	\N	\N	1
739	\N	\N	890919448	\N	 (000) 0000000	INVERSIONES RIVERA G. S.A.S	INVERSIONES RIVERA G. S.A.S	\N	\N	INVERSIONES RIVERA G. S.A.S	\N	rrivera@une.net.co	\N	\N	1
740	\N	\N	901202921	\N	 (000) 0000000	INVERSIONES RUBIK S.A.S	INVERSIONES RUBIK S.A.S	\N	\N	INVERSIONES RUBIK S.A.S	\N	santiago@santiagocockrada.co	\N	\N	1
741	\N	\N	9005429756	\N	 (000) 0000000	INVERSIONES RUEDA LEON S.A	INVERSIONES RUEDA LEON S.A	\N	\N	INVERSIONES RUEDA LEON S.A	\N	\N	\N	\N	1
742	\N	\N	900227436	\N	 (000) 0000000	INVERSIONES S.T.C S.A.S	INVERSIONES S.T.C S.A.S	\N	\N	INVERSIONES S.T.C S.A.S	\N	jsierra@encofradosie.co	\N	\N	1
743	\N	\N	800222689	\N	 (000) 0000000	INVERSIONES SOGA S.A	INVERSIONES SOGA S.A	\N	\N	INVERSIONES SOGA S.A	\N	siesaferecepcion@siesafe.co	\N	\N	1
744	\N	\N	824001289	\N	 (000) 0000000	INVERSIONES SURTIREPUESTOS LTDA	INVERSIONES SURTIREPUESTOS LTDA	\N	\N	INVERSIONES SURTIREPUESTOS LTDA	\N	surtirepuestos2@gmail.com	\N	\N	1
745	\N	\N	900454511	\N	 (000) 0000000	INVERSIONES TIERRA DULCE S.A.S	INVERSIONES TIERRA DULCE S.A.S	\N	\N	INVERSIONES TIERRA DULCE S.A.S	\N	facturastierradulce@stop.com.co	\N	\N	1
746	\N	\N	830500960	\N	 (000) 0000000	INVERSIONES TODO DROGA SAS	INVERSIONES TODO DROGA SAS	\N	\N	INVERSIONES TODO DROGA SAS	\N	factible@tododrogas.com.co	\N	\N	1
747	\N	\N	901293482	\N	 (000) 0000000	INVERSIONES VAMORA SAS	INVERSIONES VAMORA SAS	\N	\N	INVERSIONES VAMORA SAS	\N	INVEVAMORASAS@GMAIL.COM	\N	\N	1
748	\N	\N	901721987	\N	 (000) 0000000	INVERSIONES VELASQUEZ VALENCIA SAS	INVERSIONES VELASQUEZ VALENCIA SAS	\N	\N	INVERSIONES VELASQUEZ VALENCIA SAS	\N	motoguadanasmedellin@gmail.com	\N	\N	1
749	\N	\N	901118856	\N	 (000) 0000000	INVERSIONES VTE S.A.S	INVERSIONES VTE S.A.S	\N	\N	INVERSIONES VTE S.A.S	\N	contem@msn.com	\N	\N	1
750	\N	\N	901407617	\N	 (000) 0000000	INVERSIONES WEST JEANS S.	INVERSIONES WEST JEANS S.	\N	\N	INVERSIONES WEST JEANS S.	\N	westjeansco@gmail.com	\N	\N	1
751	\N	\N	900155762	\N	 (000) 0000000	INVERSIONES Y PROYECTOS COLIBRI S.A.S.	INVERSIONES Y PROYECTOS COLIBRI S.A.S.	\N	\N	INVERSIONES Y PROYECTOS COLIBRI S.A.S.	\N	enviofacturascolibri@gmail.com	\N	\N	1
752	\N	\N	901646710	\N	 (000) 0000000	INVERSIONES Y SOLUCIONES EL LLANO S.A.S	INVERSIONES Y SOLUCIONES EL LLANO S.A.S	\N	\N	INVERSIONES Y SOLUCIONES EL LLANO S.A.S	\N	inversioneselllanoauxconta@outlook.com	\N	\N	1
753	\N	\N	900904898	\N	 (000) 0000000	INVERSIONES YUMURI S.A.S	INVERSIONE YURUMI S.A.S	\N	\N	INVERSIONE YURUMI S.A.S	\N	alvaro.gomez15@hotmail.com	\N	\N	1
754	\N	\N	901499629	\N	 (000) 0000000	INVERSOCIOS LA TRINIDAD S.A.S	INVERSOCIOS LA TRINIDAD S.A.S	\N	\N	INVERSOCIOS LA TRINIDAD S.A.S	\N	inversocioslatrinidad@gmail.com	\N	\N	1
755	\N	\N	900835787	\N	 (000) 0000000	INVERSORA EGO SAS	INVERSORA EGO SAS	\N	\N	INVERSORA EGO SAS	\N	\N	\N	\N	1
756	\N	\N	901154336	\N	 (000) 0000000	IPS MASMEDICOS IOS S.A.S.	IPS MASMEDICOS IOS S.A.S.	\N	\N	IPS MASMEDICOS IOS S.A.S.	\N	gerenciamasmedicos@masmedellin.com	\N	\N	1
757	\N	\N	1020404262	\N	 (000) 0000000	IRIS BORJA OSORIO	IRIS BORJA OSORIO	\N	\N	IRIS BORJA OSORIO	\N	borjairis2005@gmail.com	\N	\N	1
758	\N	\N	52721744	\N	 (000) 0000000	ISABEL CRISTINA LOPEZ CAÑAS	ISABEL CRISTINA LOPEZ CAÑAS	\N	\N	ISABEL CRISTINA LOPEZ CAÑAS	\N	ISACRISLOPEZ@YAHOO.COM	\N	\N	1
759	\N	\N	71978879	\N	 (000) 0000000	ISIDRO JIMENEZ	ISIDRO JIMENEZ	\N	\N	ISIDRO JIMENEZ	\N	ISIJIMENEZ2020@GMAIL.COM	\N	\N	1
760	\N	\N	1027942133	\N	 (000) 0000000	ISRAEL ANTONIO OSPINA RUEDA	ISRAEL ANTONIO OSPINA RUEDA	\N	\N	ISRAEL ANTONIO OSPINA RUEDA	\N	RECUPERADORAMILLENIUMPLUS@HOTMAIL.COM	\N	\N	1
761	\N	\N	70116922	\N	 (000) 0000000	IVAN DARIO BERMUDEZ BERMUDEZ	IVAN DARIO BERMUDEZ BERMUDEZ	\N	\N	IVAN DARIO BERMUDEZ BERMUDEZ	\N	\N	\N	\N	1
762	\N	\N	70903509	\N	 (000) 0000000	IVAN GIRALDO ALZATE	IVAN GIRALDO ALZATE	\N	\N	IVAN GIRALDO ALZATE	\N	ivangiraldo2005@yahoo.com	\N	\N	1
763	\N	\N	1023724643	\N	 (000) 0000000	JADISON DARIO PARRA CALLE	JADISON DARIO PARRA CALLE	\N	\N	JADISON DARIO PARRA CALLE	\N	\N	\N	\N	1
764	\N	\N	98533429	\N	 (000) 0000000	JAIME ALBERTO ALZATE ZULUAGA	JAIME ALBERTO ALZATE ZULUAGA	\N	\N	JAIME ALBERTO ALZATE ZULUAGA	\N	\N	\N	\N	1
765	\N	\N	71727465	\N	 (000) 0000000	JAIME ALFREDO VALLEJO BURITICA	JAIME ALFREDO VALLEJO BURITICA	\N	\N	JAIME ALFREDO VALLEJO BURITICA	\N	facturacionaqp1@gmail.com	\N	\N	1
766	\N	\N	70566733	\N	 (000) 0000000	JAIME ANDRES ESTRADA GAVIRIA	JAIME ANDRES ESTRADA GAVIRIA	\N	\N	JAIME ANDRES ESTRADA GAVIRIA	\N	estradajaimeandres@yahoo.com	\N	\N	1
767	\N	\N	71535968	\N	 (000) 0000000	JAIME ENRIQUE MIRA ALVAREZ	JAIME ENRIQUE MIRA ALVAREZ	\N	\N	JAIME ENRIQUE MIRA ALVAREZ	\N	logisticaaqp3@gmail.com	\N	\N	1
768	\N	\N	8394924	\N	 (000) 0000000	Jaime Heriberto perez	Jaime Heriberto perez	\N	\N	Jaime Heriberto perez	\N	jhperezn@gmail.com	\N	\N	1
769	\N	\N	98518727	\N	 (000) 3117332023	JAIME HERNAN OBANDO CABRALES	JAIME HERNAN OBANDO CABRALES	\N	\N	JAIME HERNAN OBANDO CABRALES	\N	jh65@hotmail.com	\N	\N	1
770	\N	\N	71774350	\N	 (000) 0000000	JAIME HUMBERTO OROZCO GIL	JAIME HUMBERTO OROZCO GIL	\N	\N	JAIME HUMBERTO OROZCO GIL	\N	cordococu@gmail.com	\N	\N	1
771	\N	\N	11313638	\N	48556104	JAIRO ALBERTO BEDOYA SALAZAR	JAIRO ALBERTO BEDOYA SALAZAR	\N	\N	JAIRO ALBERTO BEDOYA SALAZAR	\N	ferreteriaporvenir01@hotmail.com	\N	\N	1
772	\N	\N	8151936	\N	 (000) 0000000	JAIRO ALBERTO GUERRA CORREA	JAIRO ALBERTO GUERRA CORREA	\N	\N	JAIRO ALBERTO GUERRA CORREA	\N	jadrisanti@gmail.com	\N	\N	1
773	\N	\N	3465397	\N	8663660	JAIRO ALBERTO PINEDA TORRES	JAIRO ALBERTO PINEDA TORRES	\N	\N	JAIRO ALBERTO PINEDA TORRES	\N	recepcionfacturasjairopineda@gmail.com	\N	\N	1
774	\N	\N	8294749	\N	 (000) 3154729298	JAIRO ALBERTO SALDARRIAGA	JAIRO ALBERTO SALDARRIAGA	\N	\N	JAIRO ALBERTO SALDARRIAGA	\N	JAIROSALDARRIAGA2020@GMAIL.COM	\N	\N	1
775	\N	\N	1044507545	\N	 (000) 0000000	JAIRO HUMBERTO POSADA SANCHEZ	JAIRO HUMBERTO POSADA SANCHEZ	\N	\N	JAIRO HUMBERTO POSADA SANCHEZ	\N	logisticaaqp3@gmail.com	\N	\N	1
776	\N	\N	70048495	\N	 (000) 0000000	JAIRO PUERTA GALVIS	JAIRO PUERTA GALVIS	\N	\N	JAIRO PUERTA GALVIS	\N	PUERTAJAIRO@HOTMAIL.COM	\N	\N	1
777	\N	\N	70191676	\N	 (000) 0000000	JAIRO ZAPATA MUÑOZ	JAIRO ZAPATA	\N	\N	JAIRO ZAPATA	\N	jairosantotomas@hotmail.com	\N	\N	1
778	\N	\N	900244460	\N	 (000) 0000000	JASICAROS S.A.S	JASICAROS S.A.S	\N	\N	JASICAROS S.A.S	\N	jasicaros@carga.com.co	\N	\N	1
779	\N	\N	70252108	\N	 (000) 0000000	JAVIER AUGUSTO MUÑOZ GALLO	JAVIER AUGUSTO MUÑOZ GALLO	\N	\N	JAVIER AUGUSTO MUÑOZ GALLO	\N	\N	\N	\N	1
780	\N	\N	1020495752	\N	\N	JAVIER GOMEZ BORJA	JAVIER GOMEZ BORJA	\N	\N	JAVIER GOMEZ BORJA	\N	saicartera@gmail.com	\N	\N	1
781	\N	\N	70092679	\N	 (000) 0000000	JAVIER HUMBERTO RESTREPO GARCES	JAVIER HUMBERTO RESTREPO GARCES	\N	\N	JAVIER HUMBERTO RESTREPO GARCES	\N	javierhrestrepo@gmail.com	\N	\N	1
782	\N	\N	15347600	\N	\N	JAVIER ORLANDO EUSE MADRID	JAVIER ORLANDO EUSE MADRID	\N	\N	JAVIER ORLANDO EUSE MADRID	\N	\N	\N	\N	1
783	\N	\N	901457794	\N	 (000) 0000000	JD BOMBAS Y SERVICIOS SAS	JD BOMBAS Y SERVICIOS SAS	\N	\N	JD BOMBAS Y SERVICIOS SAS	\N	JDBOMBASYSERVICIOS@GMAIL.COM	\N	\N	1
784	\N	\N	1007241307	\N	 (000) 0000000	JEAN CARLOS RUIZ VANEGAZ	JEAN CARLOS RUIZ VANEGAZ	\N	\N	JEAN CARLOS RUIZ VANEGAZ	\N	rvruizv555@hotmail.com	\N	\N	1
785	\N	\N	1125783106	\N	 (000) 0000000	JEAN PAUL RESTREPO SAAVEDRA	JEAN PAUL RESTREPO SAAVEDRA	\N	\N	JEAN PAUL RESTREPO SAAVEDRA	\N	polocaribe@gmail.com	\N	\N	1
786	\N	\N	1036655723	\N	 (000) 0000000	JEFFERSON STIVEN ESTRADA GARCIA	JEFFERSON STIVEN ESTRADA GARCIA	\N	\N	JEFFERSON STIVEN ESTRADA GARCIA	\N	maxbordadosydotaciones@gmail.com	\N	\N	1
787	\N	\N	1128390541	\N	 (000) 0000000	JENNY MARCELA ROLDAN ZAPATA	JENNY MARCELA ROLDAN ZAPATA	\N	\N	JENNY MARCELA ROLDAN ZAPATA	\N	MARCELA10121@HOTMAIL.COM	\N	\N	1
788	\N	\N	1066739393	\N	 (000) 0000000	JESUS ALBERTO ROMERO BARRIOS	JESUS ALBERTO ROMERO BARRIOS	\N	\N	JESUS ALBERTO ROMERO BARRIOS	\N	\N	\N	\N	1
789	\N	\N	70193140	\N	 (000) 0000000	JESUS ALBERTO TAMAYO ZULUAGA	JESUS ALBERTO TAMAYO ZULUAGA	\N	\N	JESUS ALBERTO TAMAYO ZULUAGA	\N	alta-gerencia@hotmail.com	\N	\N	1
790	\N	\N	8015154	\N	 (000) 0000000	JESUS ALEJANDRO LOPERA RAMIREZ	JESUS ALEJANDRO LOPERA RAMIREZ	\N	\N	JESUS ALEJANDRO LOPERA RAMIREZ	\N	almacenrodil@gmail.com	\N	\N	1
791	\N	\N	71526288	\N	 (000) 0000000	JESUS ALVEIRO ALVAREZ	JESUS ALVEIRO ALVAREZ	\N	\N	JESUS ALVEIRO ALVAREZ	\N	jesusalveiroa@gmail.com	\N	\N	1
792	\N	\N	98461660	\N	 (000) 0000000	JESUS ANDRADE VELASQUEZ	JESUS ANDRADE VELASQUEZ	\N	\N	JESUS ANDRADE VELASQUEZ	\N	jv2685002@gmail.com	\N	\N	1
793	\N	\N	74372755	\N	 (000) 0000000	JESUS ANTONIO CORONADO BERMUDEZ	JESUS ANTONIO CORONADO BERMUDEZ	\N	\N	JESUS ANTONIO CORONADO BERMUDEZ	\N	facturacion.acoronado@gmail.com	\N	\N	1
794	\N	\N	71784444	\N	 (000) 0000000	JESUS CLAVIJO	JESUS CLAVIJO	\N	\N	JESUS CLAVIJO	\N	GUILLE.441@HOTMAIL.COM	\N	\N	1
795	\N	\N	8471383	\N	 (000) 0000000	JESUS DELGADO	JESUS DELGADO	\N	\N	JESUS DELGADO	\N	HIDOLFODELGADOCANO@GMAIL.COM	\N	\N	1
796	\N	\N	1067909086	\N	\N	JESUS ESTRELLA	JESUS ESTRELLA	\N	\N	JESUS ESTRELLA	\N	jususdavidestrellaaviles385@gmail.com	\N	\N	1
797	\N	\N	71797967	\N	 (000) 0000000	JHOAN ECHEVERRI URIBE	JHOAN ECHEVERRI URIBE	\N	\N	JHOAN ECHEVERRI URIBE	\N	jecheverri1214@gmail.com	\N	\N	1
798	\N	\N	1044987469	\N	 (000) 0000000	JHOJAN ARANGO PEREZ	JHOHAN ARANGO	\N	\N	JHOHAN ARANGO	\N	facturacionaqp1@gmail.com	\N	\N	1
799	\N	\N	70130855	\N	 (000) 0000000	JHON DARIO CORREA	JHON DARIO CORREA	\N	\N	JHON DARIO CORREA	\N	JHONDACO@HOTMAIL.COM	\N	\N	1
800	\N	\N	1128448473	\N	 (000) 0000000	JHON FREDY VELEZ DUQUE	JHON FREDY VELEZ DUQUE	\N	\N	JHON FREDY VELEZ DUQUE	\N	\N	\N	\N	1
801	\N	\N	8085293	\N	 (000) 0000000	JHON HADER PEREZ CANO	JHON HADER PEREZ CANO	\N	\N	JHON HADER PEREZ CANO	\N	matujo1@hotmail.com	\N	\N	1
849	\N	\N	1041148309	\N	 (000) 0000000	JOSE ALEJANDRO DIEZ UPEGUI	JOSE ALAEJANDRO DIEZ UPEGUI	\N	\N	JOSE ALAEJANDRO DIEZ UPEGUI	\N	\N	\N	\N	1
802	\N	\N	70191653	\N	 (000) 0000000	JHON JAIRO ARANGO BEDOYA	JHON JAIRO ARANGO BEDOYA	\N	\N	JHON JAIRO ARANGO BEDOYA	\N	jhonj.arangob@gmail.com	\N	\N	1
803	\N	\N	98625324	\N	 (000) 0000000	JHON JAIRO GAITAN GARCIA	JHON JAIRO GAITAN GARCIA	\N	\N	JHON JAIRO GAITAN GARCIA	\N	jgaitan77930@gmail.com	\N	\N	1
804	\N	\N	71657102	\N	 (000) 0000000	JHON JAIRO GONZÁLEZ CORDOBA	JHON JAIRO GONZÁLEZ CORDOBA	\N	\N	JHON JAIRO GONZÁLEZ CORDOBA	\N	HERRAJESYVARIOS@GMAIL.COM	\N	\N	1
805	\N	\N	15326448	\N	 (000) 0000000	JHON JAIRO LONDOÑO RESTREPO	JHON JAIRO LONDOÑO RESTREPO	\N	\N	JHON JAIRO LONDOÑO RESTREPO	\N	\N	\N	\N	1
806	\N	\N	15047958	\N	 (000) 0000000	JHON MARIO HERAZO BEDOYA	JHON MARIO HERAZO BEDOYA	\N	\N	JHON MARIO HERAZO BEDOYA	\N	almacenferreagro@gmail.com	\N	\N	1
807	\N	\N	98509591	\N	 (000) 0000000	JHON RAUL GARCIA	JHON RAUL GARCIA	\N	\N	JHON RAUL GARCIA	\N	GARCIAJHONRAUL@GMAIL.COM	\N	\N	1
808	\N	\N	1036953367	\N	 (000) 0000000	JHON SEBASTIAN NOREÑA VERGARA	JHON SEBASTIAN NOREÑA VERGARA	\N	\N	JHON SEBASTIAN NOREÑA VERGARA	\N	juank03115917@gmail.com	\N	\N	1
809	\N	\N	77095615	\N	 (000) 0000000	JHONATAN RIOS	JHONATAN RIOS	\N	\N	JHONATAN RIOS	\N	jhoelrime@gmail.com	\N	\N	1
810	\N	\N	1026061349	\N	\N	JHONIER RIVERA GONZALEZ	JHONIER RIVERA GONZALEZ	\N	\N	JHONIER RIVERA GONZALEZ	\N	jhonierrivera9@gmail.com	\N	\N	1
811	\N	\N	1037368601	\N	 (000) 0000000	JHONY RODRIGUEZ VELASQUEZ	JHONY RODRIGUEZ VELASQUEZ	\N	\N	JHONY RODRIGUEZ VELASQUEZ	\N	FACTURACIONAQP1@GMAIL.COM	\N	\N	1
812	\N	\N	3132867	\N	 (000) 0000000	JHONY TRUJILLO SERNA	JHONY TRUJILLO SERNA	\N	\N	JHONY TRUJILLO SERNA	\N	sarco0328@gmail.com	\N	\N	1
813	\N	\N	70422291	\N	\N	JOHAN ALONSO TABORDA TABORDA	JOHAN ALONSO TABORDA TABORDA	\N	\N	JOHAN ALONSO TABORDA TABORDA	\N	tabordajohanalonso@gmail.com	\N	\N	1
814	\N	\N	71085737	\N	 (000) 0000000	JOHAN BERMUDEZ CAMPO	JOHAN BERMUDEZ CAMPO	\N	\N	JOHAN BERMUDEZ CAMPO	\N	yuni0514@hotmail.com	\N	\N	1
815	\N	\N	1039700103	\N	 (000) 0000000	JOHAN SEBASTIAN BUELVAS MONTOYA	JOHAN SEBASTIAN BUELVAS MONTOYA	\N	\N	JOHAN SEBASTIAN BUELVAS MONTOYA	\N	\N	\N	\N	1
816	\N	\N	1035914596	\N	 (000) 0000000	JOHAN SEBASTIAN GRISALES GIRALDO	JOHAN SEBASTIAN GRISALES GIRALDO	\N	\N	JOHAN SEBASTIAN GRISALES GIRALDO	\N	\N	\N	\N	1
817	\N	\N	15539211	\N	 (000) 0000000	JOHN FREDY GUTIERREZ ARREDONDO	JOHN FREDY GUTIERREZ ARREDONDO	\N	\N	JOHN FREDY GUTIERREZ ARREDONDO	\N	electrowinches06@gmail.com	\N	\N	1
818	\N	\N	15325312	\N	 (000) 0000000	JOHN JAIRO HENAO BARRIENTOS	JOHN JAIRO HENAO BARRIENTOS	\N	\N	JOHN JAIRO HENAO BARRIENTOS	\N	facturacionaqp1@gmail.com	\N	\N	1
819	\N	\N	71951114	\N	 (000) 3217847738	JOHN MARIO GOMEZ MARTINEZ	JOHN MARIO GOMEZ MARTINEZ	\N	\N	JOHN MARIO GOMEZ MARTINEZ	\N	carolinavelezortiz03@gmail.com	\N	\N	1
820	\N	\N	71661304	\N	 (000) 0000000	JOHN WILDER ZAPATA MARIN	JOHN WILDER ZAPATA MARIN	\N	\N	JOHN WILDER ZAPATA MARIN	\N	\N	\N	\N	1
821	\N	\N	1022034140	\N	 (000) 0000000	JOHNATAN ANDRES ARENAS MORALES	JHONATAN ANDRES ARENAS MORALES	\N	\N	JHONATAN ANDRES ARENAS MORALES	\N	moralesjhonatan@hotmail.com	\N	\N	1
822	\N	\N	1000920176	\N	 (000) 0000000	JONATHAN BOLIVAR CASTAÑO	JONATHAN BOLIVAR CASTAÑO	\N	\N	JONATHAN BOLIVAR CASTAÑO	\N	NANOMONTOYA1958@GMAIL.COM	\N	\N	1
823	\N	\N	1040261368	\N	 (000) 0000000	JONH DIEGO ATEHORTUA	JONH DIEGO ATEHORTUA	\N	\N	JONH DIEGO ATEHORTUA	\N	facturacionaqp1@gmail.com	\N	\N	1
824	\N	\N	1089718253	\N	\N	JORDIN ALONSO ALVAREZ PEÑA	JORDIN ALONSO ALVAREZ PEÑA	\N	\N	JORDIN ALONSO ALVAREZ PEÑA	\N	jordinalvarez2004@gmail.com	\N	\N	1
825	\N	\N	71579618	\N	 (000) 0000000	JORGE ALBERTO DE JESUS MADRID VELEZ	JORGE ALBERTO DE JESUS MADRID VELEZ	\N	\N	JORGE ALBERTO DE JESUS MADRID VELEZ	\N	jorge.madrid@udea.edu.co	\N	\N	1
826	\N	\N	70108521	\N	 (000) 0000000	JORGE ALONSO VELASQUEZ LOPEZ	JORGE ALONSO VELASQUEZ LOPEZ	\N	\N	JORGE ALONSO VELASQUEZ LOPEZ	\N	acuiferos@gmail.com	\N	\N	1
827	\N	\N	98551122	\N	 (000) 0000000	JORGE ANDRES CORREA CASTAÑO	JORGE ANDRES CORREA CASTAÑO	\N	\N	JORGE ANDRES CORREA CASTAÑO	\N	\N	\N	\N	1
828	\N	\N	15961315	\N	 (000) 0000000	JORGE ANDRES GRAJALES ARCILA	JORGE ANDRES GRAJALES ARCILA	\N	\N	JORGE ANDRES GRAJALES ARCILA	\N	juanjog@hotmail.com	\N	\N	1
829	\N	\N	1078636680	\N	 (000) 0000000	JORGE ARTURO MUÑOZ FLOREZ	JORGE ARTURO MUÑOZ FLOREZ	\N	\N	JORGE ARTURO MUÑOZ FLOREZ	\N	facturacionaqp1@gmail.com	\N	\N	1
830	\N	\N	71717216	\N	 (000) 0000000	JORGE AUGUSTO BENJAMIN GARCIA	JORGE AUGUSTO BENJAMIN GARCIA	\N	\N	JORGE AUGUSTO BENJAMIN GARCIA	\N	jorgeagarciab.ag@gmail.com	\N	\N	1
831	\N	\N	70561298	\N	 (00) 0000000	JORGE BUSTAMANTE RAMIREZ	JORGE BUSTAMANTE RAMIREZ	\N	\N	JORGE BUSTAMANTE RAMIREZ	\N	frutoselencanto2012@gmail.com	\N	\N	1
832	\N	\N	15523820	\N	 (000) 3113180999	JORGE EDUARDO GARCIA TOBON	JORGE EDUARDO GARCIA TOBON	\N	\N	JORGE EDUARDO GARCIA TOBON	\N	JORGEDUARDOGATO@GMAIL.COM	\N	\N	1
833	\N	\N	8014486	\N	 (000) 0000000	JORGE EDUARDO MONTOYA MONSALVE	JORGE EDUARDO MONTOYA MONSALVE	\N	\N	JORGE EDUARDO MONTOYA MONSALVE	\N	expotornilloslb@hotmail.com	\N	\N	1
834	\N	\N	70780785	\N	 (000) 0000000	JORGE ELIECER VERA TABARES	JORGE ELIECER VERA TABARES	\N	\N	JORGE ELIECER VERA TABARES	\N	distrivera785@gmail.com	\N	\N	1
835	\N	\N	71587220	\N	 (000) 0000000	JORGE HUMBERTO ARANGO SIERRA	JORGE HUMBERTO ARANGO SIERRA	\N	\N	JORGE HUMBERTO ARANGO SIERRA	\N	JARANGOS@LIVE.COM	\N	\N	1
836	\N	\N	70566698	\N	 (000) 0000000	JORGE IGNACIO SANCHEZ RESTREPO	JORGE IGNACIO SANCHEZ RESTREPO	\N	\N	JORGE IGNACIO SANCHEZ RESTREPO	\N	secretariapampas@hotmail.com	\N	\N	1
837	\N	\N	717300571	\N	 (000) 0000000	JORGE IVAN JARAMILLO HERRERAR	JORGE IBAN JARAMILLO HERRERAR	\N	\N	JORGE IBAN JARAMILLO HERRERAR	\N	jorge.jaragro@gmail.com	\N	\N	1
838	\N	\N	3653671	\N	 (000) 0000000	JORGE IVAN VELEZ MARIN	JORGE IVAN VELEZ MARIN	\N	\N	JORGE IVAN VELEZ MARIN	\N	facturacionaqp1@gmail.comI	\N	\N	1
839	\N	\N	71730057	\N	 (000) 5623271	JORGE JARAMILLO HERRERA	JORGE JARAMILLO HERRERA	\N	\N	JORGE JARAMILLO HERRERA	\N	JORGE.JARAGRO@GMAIL.COM	\N	\N	1
840	\N	\N	71617807	\N	 (000) 0000000	JORGE LEON ALVAREZ ESTRADA	JORGE LEON ALVAREZ ESTRADA	\N	\N	JORGE LEON ALVAREZ ESTRADA	\N	\N	\N	\N	1
841	\N	\N	1017133259	\N	 (000) 0000000	JORGE MARIO LOAIZA RESTREPO	JORGE MARIO LOAIZA RESTREPO	\N	\N	JORGE MARIO LOAIZA RESTREPO	\N	jorgemarioloaizarestrepo@gmail.com	\N	\N	1
842	\N	\N	8157070	\N	 (000) 0000000	JORGE MARIO LOPERA MESA	JORGE MARIO LOPERA MESA	\N	\N	JORGE MARIO LOPERA MESA	\N	JOTAMARIOLOPERA@HOTMAIL.COM	\N	\N	1
843	\N	\N	1037614855	\N	 (000) 0000000	JORGE MARIO PALACIO BOTERO	JORGE MARIO PALACIO BOTERO	\N	\N	JORGE MARIO PALACIO BOTERO	\N	jorgemario0408@gmail.com	\N	\N	1
844	\N	\N	98490978	\N	 (000) 0000000	JORGE MARIO SOSSA RAMIREZ	JORGE MARIO SOSSA RAMIREZ	\N	\N	JORGE MARIO SOSSA RAMIREZ	\N	multinegociossossa@gmail.com	\N	\N	1
845	\N	\N	8466177	\N	 (000) 0000000	JORGE ORLANDO ARROYAVE HENAO	JORGE ORLANDO ARROYAVE HENAO	\N	\N	JORGE ORLANDO ARROYAVE HENAO	\N	j.arroyave846@hotmail.com	\N	\N	1
846	\N	\N	70042778	\N	 (000) 3104075175	JORGE VELEZ RODRIGUEZ	JORGE VELEZ RODRIGUEZ	\N	\N	JORGE VELEZ RODRIGUEZ	\N	lucasvelezg@hotmail.com	\N	\N	1
847	\N	\N	800252968	\N	8532733	JOSE ADAN OQUENDO L. E HIJOS LIMITADA	\N	\N	\N	\N	\N	joseadanoquendo.1164@hotmail.com	\N	\N	1
848	\N	\N	3390228	\N	3137500658	JOSE ADAN OQUENDO RODRIGUEZ	JOSE ADAN OQUENDO RODRIGUEZ	\N	\N	JOSE ADAN OQUENDO RODRIGUEZ	\N	oquendoadan@gmail.com	\N	\N	1
850	\N	\N	1036955573	\N	 (000) 0000000	JOSE ALEJANDRO LOPEZ	JOSE ALEJANDRO LOPEZ	\N	\N	JOSE ALEJANDRO LOPEZ	\N	JOSE.LOPEZ.PEREZ35@GMAIL.COM	\N	\N	1
851	\N	\N	15490901	\N	\N	JOSE BOLIVAR ALVAREZ MORENO	JOSE BOLIVAR ALVAREZ MORENO	\N	\N	JOSE BOLIVAR ALVAREZ MORENO	\N	acquapack@acquapackcolombia.com	\N	\N	1
852	\N	\N	1020424506	\N	 (000) 0000000	JOSE DAVID CASTAÑEDA GOMEZ	JOSE DAVID CASTAÑEDA GOMEZ	\N	\N	JOSE DAVID CASTAÑEDA GOMEZ	\N	dacasgo@hotmail.es	\N	\N	1
853	\N	\N	13495144	\N	 (000) 0000000	JOSE DAVID RODRIGUEZ CARRILLO	JOSE DAVID RODRIGUEZ CARRILLO	\N	\N	JOSE DAVID RODRIGUEZ CARRILLO	\N	\N	\N	\N	1
854	\N	\N	71787293	\N	 (000) 0000000	JOSE FERNANDO BUSTAMANTE	JOSE FERNANDO BUSTAMANTE	\N	\N	JOSE FERNANDO BUSTAMANTE	\N	contabilidad@canariam.com	\N	\N	1
855	\N	\N	15382298	\N	 (00) 0000000	JOSE FERNANDO RESTREPO CAMPUZANO	JOSE FERNANDO RESTREPO CAMPUZANO	\N	\N	JOSE FERNANDO RESTREPO CAMPUZANO	\N	josefernandorestrepoc@gmail.com	\N	\N	1
856	\N	\N	71748464	\N	 (000) 0000000	JOSE FREDY RENDON MUNERA	JOSE FREDY RENDON MUNERA	\N	\N	JOSE FREDY RENDON MUNERA	\N	facturacionaqp1@gmail.com	\N	\N	1
857	\N	\N	3347454	\N	 (000) 0000000	JOSE GUILLERMO TRUJILLO VASQUEZ	JOSE GUILLERMO TRUJILLO VASQUEZ	\N	\N	JOSE GUILLERMO TRUJILLO VASQUEZ	\N	equiposypartestrujillo@gmail.com	\N	\N	1
858	\N	\N	3469780	\N	 (000) 0000000	JOSE IBEL ARANGO TAMAÑO	JOSE IBEL ARANGO TAMAÑO	\N	\N	JOSE IBEL ARANGO TAMAÑO	\N	facturacionaqp1@gmail.com	\N	\N	1
859	\N	\N	70221196	\N	 (000) 0000000	JOSE JESUS OSORIO VALENCIA	JOSE JESUS OSORIO VALENCIA	\N	\N	JOSE JESUS OSORIO VALENCIA	\N	jose2615064@gmail.com	\N	\N	1
860	\N	\N	3536751	\N	 (000) 0000000	JOSE JESUS PEREZ VALENCIA	JOSE JESUS PEREZ VALENCIA	\N	\N	JOSE JESUS PEREZ VALENCIA	\N	\N	\N	\N	1
861	\N	\N	109866564	\N	 (000) 0000000	JOSE LUIS BAUTISTA RODRIGUEZ	JOSE LUIS BAUTISTA RODRIGUEZ	\N	\N	JOSE LUIS BAUTISTA RODRIGUEZ	\N	JOSELUISBAUTISTARODRIGUEZ820@GMAIL.COM	\N	\N	1
862	\N	\N	925576891	\N	 (000) 0000000	JOSE LUIS FUENTES LORA	JOSE LUIS FUENTES LORA	\N	\N	JOSE LUIS FUENTES LORA	\N	lorafuentes1@hotmail.com	\N	\N	1
863	\N	\N	92557689	\N	 (000) 0000000	JOSE LUIS LORA FUENTES	JOSE LUIS LORA FUENTES	\N	\N	JOSE LUIS LORA FUENTES	\N	joselora@misena.edu.co	\N	\N	1
864	\N	\N	1041631221	\N	 (000) 0000000	JOSÉ MIGUEL CORREA SÁNCHEZ	JOSÉ MIGUEL CORREA SÁNCHEZ	\N	\N	JOSÉ MIGUEL CORREA SÁNCHEZ	\N	josemigeul44@gmail.com	\N	\N	1
865	\N	\N	3556922	\N	 (000) 0000000	JOSE NARVAEZ VANEGAS	JOSE NARVAEZ VANEGAS	\N	\N	JOSE NARVAEZ VANEGAS	\N	\N	\N	\N	1
866	\N	\N	1017273513	\N	 (000) 0000000	JOSE OSVALDO GOMEZ SUAREZ	JOSE OSVALDO GOMEZ SUAREZ	\N	\N	JOSE OSVALDO GOMEZ SUAREZ	\N	osvaldogomez828@gmail.com	\N	\N	1
867	\N	\N	1109295582	\N	 (000) 0000000	JOSE OTONIEL PARRA POSADA	JOSE OTONIEL PARRA POSADA	\N	\N	JOSE OTONIEL PARRA POSADA	\N	joppag@hotmail.com	\N	\N	1
868	\N	\N	3426735	\N	 (000) 0000000	JOSE PABLO SANCHEZ CASTAÑEDA	JOSE PABLO SANCHEZ CASTAÑEDA	\N	\N	JOSE PABLO SANCHEZ CASTAÑEDA	\N	JPABLOSANCAS41@GMAIL.COM	\N	\N	1
869	\N	\N	71260456	\N	 (000) 0000000	JOSE SEVERO SEPULVEDA IBARRA	JOSE SEVERO SEPULVEDA IBARRA	\N	\N	JOSE SEVERO SEPULVEDA IBARRA	\N	josesepulveiba@gmail.com	\N	\N	1
870	\N	\N	98587663	\N	 (000) 0000000	JOSE ZAPATA JIMENEZ	JOSE ZAPATA GIMENEZ	\N	\N	JOSE ZAPATA GIMENEZ	\N	logisticaaqp3@gmail.com	\N	\N	1
871	\N	\N	1192796030	\N	 (000) 0000000	JOSUE JERONIMO LOPEZ ARISTIZABAL	JOSUE JERONIMO LOPEZ ARISTIZABAL	\N	\N	JOSUE JERONIMO LOPEZ ARISTIZABAL	\N	\N	\N	\N	1
872	\N	\N	811023726	\N	 (000) 3106022623	JOTA URIBE C.E SAS	JOTA URIBE	\N	\N	JOTA URIBE	\N	jotauribece@yahoo.es	\N	\N	1
873	\N	\N	901783055	\N	 (000) 3146896341	JOY PROPIEDAD RAIZ JYM SAS	JOY PROPIEDAD RAIZ JYM SAS	\N	\N	JOY PROPIEDAD RAIZ JYM SAS	\N	JOYPROPIEDADRAIz@HOTMAIL.COM	\N	\N	1
874	\N	\N	98669291	\N	 (000) 0000000	JUAN ALEJANDRO PALACIO	JUAN ALEJANDRO PALACIO	\N	\N	JUAN ALEJANDRO PALACIO	\N	juanalpavi@gmail.com	\N	\N	1
875	\N	\N	71374306	\N	 (000) 0000000	JUAN ALVAREZ MARTINEZ	JUAN ALVAREZ MARTINEZ	\N	\N	JUAN ALVAREZ MARTINEZ	\N	juanjosealvarezmartinez255@gmail.com	\N	\N	1
876	\N	\N	1000759431	\N	 (000) 0000000	JUAN CAMILO CEVALLOS SALAZAR	JUAN CAMILO CEVALLOS SALAZAR	\N	\N	JUAN CAMILO CEVALLOS SALAZAR	\N	2002CEVALLOSCAMILO@GMAIL.COM	\N	\N	1
877	\N	\N	71735143	\N	 (000) 0000000	JUAN CAMILO ESCOBAR PALACIOS	JUAN CAMILO ESCOBAR PALACIOS	\N	\N	JUAN CAMILO ESCOBAR PALACIOS	\N	camilo.vini@hotmail.com	\N	\N	1
878	\N	\N	1128465901	\N	 (000) 0000000	JUAN CAMILO ROLDAN RUIZ	JUAN CAMILO ROLDAN RUIZ	\N	\N	JUAN CAMILO ROLDAN RUIZ	\N	camilo_1335@hotmail.com	\N	\N	1
879	\N	\N	1152699914	\N	 (000) 0000000	JUAN CAMILO SANTANA TABORDA	JUAN CAMILO SANTANA TABORDA	\N	\N	JUAN CAMILO SANTANA TABORDA	\N	innoganservicio@hotmail.com	\N	\N	1
880	\N	\N	1034916259	\N	 (000) 0000000	JUAN CAMILO VILLEGAS QUIROZ	JUAN CAMILO VILLEGAS QUIROZ	\N	\N	JUAN CAMILO VILLEGAS QUIROZ	\N	facturacionaqp1@gmail.com	\N	\N	1
881	\N	\N	98570579	\N	 (000) 0000000	JUAN CARLOS ARANGO BETANCOURT	JUAN CARLOS ARANGO BETANCOURT	\N	\N	JUAN CARLOS ARANGO BETANCOURT	\N	compras.arango@hotmail.com	\N	\N	1
882	\N	\N	98637409	\N	 (000) 3155823178	JUAN CARLOS ARTEAGA	JUAN CARLOS ARTEAGA	\N	\N	JUAN CARLOS ARTEAGA	\N	JUANCW@HOTMAIL.ES	\N	\N	1
883	\N	\N	71772693	\N	 (000) 0000000	JUAN CARLOS ISAZA HENAO	JUAN CARLOS ISAZA HENAO	\N	\N	JUAN CARLOS ISAZA HENAO	\N	jcisazahenao@hotmail.com	\N	\N	1
884	\N	\N	71373753	\N	 (000) 0000000	JUAN CARLOS ORTIZ MONTOYA	JUAN CARLOS ORTIZ MONTOYA	\N	\N	JUAN CARLOS ORTIZ MONTOYA	\N	juancortiz0525@hotmail.com	\N	\N	1
885	\N	\N	1036134613	\N	 (000) 0000000	JUAN CARLOS PAMPLONA INCAPIE	JUAN CARLOS PAMPLONA INCAPIE	\N	\N	JUAN CARLOS PAMPLONA INCAPIE	\N	PAMPLONAJ532@GMAIL.COM	\N	\N	1
886	\N	\N	98534025	\N	 (000) 0000000	JUAN CARLOS PORRAS ZAPATA	JUAN CARLOS PMAS	\N	\N	JUAN CARLOS PMAS	\N	facturacionaqp1@gmail.com	\N	\N	1
887	\N	\N	70107623	\N	 (000) 0000000	JUAN CARLOS SUAREZ VALLEJO	JUAN CARLOS SUAREZ VALLEJO	\N	\N	JUAN CARLOS SUAREZ VALLEJO	\N	juansuarez33@hotmail.com	\N	\N	1
888	\N	\N	70555469	\N	 (000) 0000000	JUAN CARLOS TIRADO JARAMILLO	JUAN CARLOS TIRADO JARAMILLO	\N	\N	JUAN CARLOS TIRADO JARAMILLO	\N	verdemar2010@gmail.com	\N	\N	1
889	\N	\N	1017128033	\N	 (000) 0000000	JUAN CARLOS ZABAL OSORNO	JUAN CARLOS ZABAL OSORNO	\N	\N	JUAN CARLOS ZABAL OSORNO	\N	juank.za@hotmail.com	\N	\N	1
890	\N	\N	1001764362	\N	 (000) 0000000	JUAN CRISTOBAL MORENO ALVAREZ	JUAN CRISTOBAL MORENO ALVAREZ	\N	\N	JUAN CRISTOBAL MORENO ALVAREZ	\N	\N	\N	\N	1
891	\N	\N	1011590914	\N	 (000) 0000000	JUAN DANIEL MANCO RODRIGUEZ	JUAN DANIEL MANCO RODRIGUEZ	\N	\N	JUAN DANIEL MANCO RODRIGUEZ	\N	\N	\N	\N	1
892	\N	\N	78749018	\N	 (000) 0000000	JUAN DAVID BEJARANO BOTERO	JUAN DAVID BEJARANO BOTERO	\N	\N	JUAN DAVID BEJARANO BOTERO	\N	jdbejarano@hotmail.com	\N	\N	1
893	\N	\N	71631285	\N	 (00) 0000000	JUAN DAVID MONDRAGON MUNERA	JUAN DAVID MONDRAGON MUNERA	\N	\N	JUAN DAVID MONDRAGON MUNERA	\N	juandmondragonm@yahoo.com.co	\N	\N	1
894	\N	\N	1033646713	\N	 (000) 0000000	JUAN DAVID PEÑA JARAMILLO	JUAN DAVID PEÑA JARAMILLO	\N	\N	JUAN DAVID PEÑA JARAMILLO	\N	\N	\N	\N	1
895	\N	\N	98773546	\N	 (000) 0000000	JUAN DAVID RESTREPO	JUAN DAVID RESTREPO	\N	\N	JUAN DAVID RESTREPO	\N	RESTREPOJ732@GMAIL.COM	\N	\N	1
896	\N	\N	1041056289	\N	 (000) 0000000	JUAN DAVID VALENCIA RIVERA	JUAN DAVID VALENCIA RIVERA	\N	\N	JUAN DAVID VALENCIA RIVERA	\N	juanvrpb@gmail.com	\N	\N	1
897	\N	\N	1001376262	\N	 (000) 0000000	JUAN DAVID VELEZ ARBOLEDA	JUAN DAVID VELEZ ARBOLEDA	\N	\N	JUAN DAVID VELEZ ARBOLEDA	\N	VELEZA.10@HOTMAIL.COM	\N	\N	1
898	\N	\N	71189572	\N	 (000) 0000000	JUAN DIEGO AGUDELO GOMEZ	JUAN DIEGO AGUDELO GOMEZ	\N	\N	JUAN DIEGO AGUDELO GOMEZ	\N	DIEGOAGUDELO667@GMAIL.COM	\N	\N	1
899	\N	\N	98773156	\N	 (000) 0000000	JUAN DIEGO GOMEZ CARDONA	JUAN DIEGO GOMEZ CARDONA	\N	\N	JUAN DIEGO GOMEZ CARDONA	\N	JUANGOMEZ8602@GMAIL.COM	\N	\N	1
900	\N	\N	1038334691	\N	 (000) 0000000	JUAN ESTABAN RUIZ CARDONA	JUAN ESTABAN RUIZ CARDONA	\N	\N	JUAN ESTABAN RUIZ CARDONA	\N	esteban20ruiz@gmail.com	\N	\N	1
901	\N	\N	1007041033	\N	 (000) 0000000	JUAN ESTEBAN FERNANDEZ CASTRILLON	JUAN ESTEBAN FERNANDEZ CASTRILLON	\N	\N	JUAN ESTEBAN FERNANDEZ CASTRILLON	\N	juanestebanfernandezcastillon@gmail.com	\N	\N	1
902	\N	\N	98656453	\N	 (000) 0000000	JUAN ESTEBAN GEORGE YEPES	JUAN ESTEBAN GEORGE YEPES	\N	\N	JUAN ESTEBAN GEORGE YEPES	\N	georgeyepes@gmail.com	\N	\N	1
903	\N	\N	15381104	\N	 (00) 0000000	JUAN EUGENIO GARCIA PATIÑO	JUAN EUGENIO GARCIA PATIÑO	\N	\N	JUAN EUGENIO GARCIA PATIÑO	\N	jgarcia9888@gmail.com	\N	\N	1
904	\N	\N	15381104	\N	\N	JUAN EUGENIO GARCIA PATIÑO	jgarcia9888 @gmail.com	\N	\N	jgarcia9888 @gmail.com	\N	jgarcia9888@gmail.com	\N	\N	1
905	\N	\N	71335796	\N	 (000) 0000000	JUAN FELIPE HERNANDEZ	JUAN FELIPE HERNANDEZ	\N	\N	JUAN FELIPE HERNANDEZ	\N	arquiservicios@hotmail.com	\N	\N	1
906	\N	\N	98670666	\N	 (000) 0000000	JUAN FELIPE SUAREZ OSPINA	JUAN FELIPE SUAREZ OSPINA	\N	\N	JUAN FELIPE SUAREZ OSPINA	\N	juanpipes@hotmail.com	\N	\N	1
907	\N	\N	1026133961	\N	 (000) 0000000	JUAN FELIPE VIVEROS OSORIO	JUAN FELIPE VIVEROS OSORIO	\N	\N	JUAN FELIPE VIVEROS OSORIO	\N	juanfelipe.viveros@gmail.com	\N	\N	1
908	\N	\N	1044506925	\N	 (00) 45743745	JUAN FERNANDO ROJAS QUINTERO	JUAN FERNANDO ROJAS QUINTERO	\N	\N	JUAN FERNANDO ROJAS QUINTERO	\N	proelectrodecolombia@gmail.com	\N	\N	1
909	\N	\N	71640528	\N	 (000) 0000000	JUAN FERNANDO TOBON VELEZ	JUAN FERNANDO TOBON VELEZ	\N	\N	JUAN FERNANDO TOBON VELEZ	\N	juantobonvelez@hotmail.com	\N	\N	1
910	\N	\N	8031701	\N	 (000) 0000000	JUAN FERNANDO ZAPATA TABORDA	JUAN FERNANDO ZAPATA TABORDA	\N	\N	JUAN FERNANDO ZAPATA TABORDA	\N	ferzapata11@hotmail.com	\N	\N	1
911	\N	\N	8157116	\N	 (000) 0000000	JUAN GABRIEL SALAZAR BARRIENTOS	JUAN GABRIEL SALAZAR BARRIENTOS	\N	\N	JUAN GABRIEL SALAZAR BARRIENTOS	\N	facturacionaqp1@gmail.com	\N	\N	1
912	\N	\N	8264536	\N	 (000) 0000000	JUAN GUILLERMO BERRIO LONDOÑO	JUAN GUILLERMO BERRIO LONDOÑO	\N	\N	JUAN GUILLERMO BERRIO LONDOÑO	\N	juanguillermoberrio@hotmail.com	\N	\N	1
913	\N	\N	75097065	\N	 (000) 0000000	JUAN GUILLERMO DIAZ CALVO	JUAN GUILLERMO DIAZ CALVO	\N	\N	JUAN GUILLERMO DIAZ CALVO	\N	juangui10@yahoo.com	\N	\N	1
914	\N	\N	70509182	\N	 (000) 0000000	JUAN GUILLERMO GONZALEZ MORENO	JUAN GUILLERMO GONZALEZ MORENO	\N	\N	JUAN GUILLERMO GONZALEZ MORENO	\N	JUANGONZA87@HOTMAIL.COM	\N	\N	1
915	\N	\N	1037369935	\N	 (000) 0000000	JUAN GUILLERMO MARIN RAVE	JUAN GUILLERMO MARIN RAVE	\N	\N	JUAN GUILLERMO MARIN RAVE	\N	facturacionaqp1@gmail.com	\N	\N	1
916	\N	\N	70551581	\N	 (000) 0000000	JUAN GUILLERMO VIVERO BELEZ	JUAN GUILLERMO VIVERO BELEZ	\N	\N	JUAN GUILLERMO VIVERO BELEZ	\N	viveros.5@hotmail.com	\N	\N	1
917	\N	\N	3351985	\N	 (000) 0000000	JUAN HUMBERTO MESA OCHOA	JUAN HUMBERTO MESA OCHOA	\N	\N	JUAN HUMBERTO MESA OCHOA	\N	facturaaqp1@gmail.com	\N	\N	1
918	\N	\N	1001236538	\N	\N	JUAN JOSE MUÑOZ	JUAN JOSE MUÑOZ	\N	\N	JUAN JOSE MUÑOZ	\N	sandy43114@gmail.com	\N	\N	1
919	\N	\N	3352192	\N	 (000) 0000000	JUAN JOSE PELAEZ NARANJO	JUAN JOSE PELAEZ NARANJO	\N	\N	JUAN JOSE PELAEZ NARANJO	\N	jpelaeznaranjo@gmail.com	\N	\N	1
920	\N	\N	1017143843	\N	 (000) 0000000	JUAN MANUEL AGUDELO	JUAN MANUEL AGUDELO	\N	\N	JUAN MANUEL AGUDELO	\N	treselementosc@gmail.com	\N	\N	1
921	\N	\N	1017143483	\N	 (000) 0000000	JUAN MANUEL AGUDELO RESTREPO	JUAN MANUEL AGUDELO RESTREPO	\N	\N	JUAN MANUEL AGUDELO RESTREPO	\N	juanagudelo3483@gmail.com	\N	\N	1
922	\N	\N	70049337	\N	3108424350	JUAN MAURICIO GOMEZ OSORIO	JUAN MAURICIO GOMEZ OSORIO	\N	\N	JUAN MAURICIO GOMEZ OSORIO	\N	CONRIEGO@UNE.NET.CO	\N	\N	1
923	\N	\N	1035868213	\N	3105014482	JUAN MIGUEL ARANGO GOMEZ	JUAN MIGUEL ARANGO GOMEZ	\N	\N	JUAN MIGUEL ARANGO GOMEZ	\N	jmarangog05@gmail.com	\N	\N	1
924	\N	\N	98497971	\N	 (00) 0000000	JUAN PABLO CARDONA CORREA	JUAN PABLO CARDONA CORREA	\N	\N	JUAN PABLO CARDONA CORREA	\N	empaquesautosadherentes@gmail.com	\N	\N	1
925	\N	\N	1025643670	\N	 (000) 0000000	JUAN PABLO GOMEZ GOMEZ	JUAN PABLO GOMEZ GOMEZ	\N	\N	JUAN PABLO GOMEZ GOMEZ	\N	facturacionaqp1@gmail.com	\N	\N	1
926	\N	\N	98716695	\N	 (000) 0000000	JUAN PABLO JARAMILLO	JUAN PABLO JARAMILLO	\N	\N	JUAN PABLO JARAMILLO	\N	\N	\N	\N	1
927	\N	\N	1037603907	\N	3104627978	JUAN PABLO LOPEZ MEJIA	JUAN PABLO LOPEZ MEJIA	\N	\N	JUAN PABLO LOPEZ MEJIA	\N	jlopezmejia54@gmail.com	\N	\N	1
928	\N	\N	1216727731	\N	 (000) 0000000	JUAN PABLO MAYA GONZALES	JUAN PABLO MAYA GONZALES	\N	\N	JUAN PABLO MAYA GONZALES	\N	mayita5710@hotmail.com	\N	\N	1
929	\N	\N	1044509248	\N	 (000) 0000000	JUAN RUA PEREZ	JUAN RUA PEREZ	\N	\N	JUAN RUA PEREZ	\N	logisticaaqp3@gmail.com	\N	\N	1
930	\N	\N	1077472595	\N	 (000) 0000000	JUAN STIVEN GIROL BOLIVAR	JUAN STIVEN GIROL BOLIVAR	\N	\N	JUAN STIVEN GIROL BOLIVAR	\N	\N	\N	\N	1
931	\N	\N	3408465	\N	 (000) 0000000	JUAN TAMAYO	JUAN TAMAYO	\N	\N	JUAN TAMAYO	\N	facturacionaqp1@gmail.com	\N	\N	1
932	\N	\N	900536136	\N	 (000) 0000000	JUGUETES BUFFALO E INNOVACIÓN S.A.S	JUGUETES BUFFALO E INNOVACIÓN S.A.S	\N	\N	JUGUETES BUFFALO E INNOVACIÓN S.A.S	\N	fejuguetesbuffalo@gmail.com	\N	\N	1
933	\N	\N	1018228757	\N	 (000) 0000000	JULIAN BALVINA VALENCIA	JULIAN BALVINA VALENCIA	\N	\N	JULIAN BALVINA VALENCIA	\N	facturacionaqp1@gmail.com	\N	\N	1
934	\N	\N	1007504568	\N	 (000) 0000000	JULIAN ESTEBAN PEREZ OSORIO	JULIAN ESTEBAN PEREZ OSORIO	\N	\N	JULIAN ESTEBAN PEREZ OSORIO	\N	\N	\N	\N	1
935	\N	\N	1088278023	\N	 (000) 0000000	JULIAN LOPEZ PATIÑO	JULIAN LOPEZ PATIÑO	\N	\N	JULIAN LOPEZ PATIÑO	\N	\N	\N	\N	1
936	\N	\N	43180997	\N	 (000) 0000000	JULIETTE ALEXANDRA ACEVEDO LOPEZ	JULIETTE ALEXANDRA ACEVEDO LOPEZ	\N	\N	JULIETTE ALEXANDRA ACEVEDO LOPEZ	\N	JULIETTE.GRIFOS@GMAIL.COM	\N	\N	1
937	\N	\N	8357519	\N	 (00) 0000000	JULIO CESAR MOLINA CORREA	JULIO CESAR MOLINA CORREA	\N	\N	JULIO CESAR MOLINA CORREA	\N	ranchograndemolina@hotmail.com	\N	\N	1
938	\N	\N	8351444	\N	 (000) 0000000	JULIO CESAR RESTREPO VASQUEZ	JULIO CESAR RESTREPO VASQUEZ	\N	\N	JULIO CESAR RESTREPO VASQUEZ	\N	Cesarrestrepovasquez@gmail.com	\N	\N	1
939	\N	\N	15345281	\N	 (000) 0000000	JULIO EDUARDO GOMEZ	JULIO EDUARDO GOMEZ	\N	\N	JULIO EDUARDO GOMEZ	\N	salamina512@hotmail.com	\N	\N	1
940	\N	\N	811027427	\N	 (000) 0000000	JUNTA ADMINISTRADORA DEL ACUEDUCTO DE PUEBLITO	JUNTA ADMINISTRADORA DEL ACUEDUCTO DE PUEBLITO	\N	\N	JUNTA ADMINISTRADORA DEL ACUEDUCTO DE PUEBLITO	\N	acueductopueblito@gmail.com	\N	\N	1
941	\N	\N	811017299	\N	 (000) 0000000	JUNTA DE ACCION COMUNAL VEREDA CUATRO ESQUINAS	JUNTA DE ACCION COMUNAL VEREDA CUATRO ESQUINAS	\N	\N	JUNTA DE ACCION COMUNAL VEREDA CUATRO ESQUINAS	\N	CUATROESQUINAS.JA2022@HOTMAIL.COM	\N	\N	1
942	\N	\N	84089346	\N	 (000) 0000000	JUSTINIANO ANTONIO CARRILLO FUENTES	JUSTINIANO ANTONIO CARRILLO FUENTES	\N	\N	JUSTINIANO ANTONIO CARRILLO FUENTES	\N	JUTI1102@HOTMAIL.COM	\N	\N	1
943	\N	\N	78300982	\N	\N	JUSTO MANUEL MACEA MIRANDA	JUSTO MANUEL MACEA MIRANDA	\N	\N	JUSTO MANUEL MACEA MIRANDA	\N	justomanuelmaceamiranda141@gmail.com	\N	\N	1
944	\N	\N	811020419	\N	 (000) 0000000	JV CASTAÑO Y CIA S.A.S	JV CASTAÑO Y CIA S.A.S	\N	\N	JV CASTAÑO Y CIA S.A.S	\N	asintlinejvcastano@gmail.com	\N	\N	1
945	\N	\N	901372643	\N	 (000) 0000000	JYI CONSTRUCCIONES S.A.S	JYI CONSTRUCCIONES S.A.S	\N	\N	JYI CONSTRUCCIONES S.A.S	\N	jyiconstrucciones@hotmail.com	\N	\N	1
946	\N	\N	1026130172	\N	\N	KAROL MILENA TORO TABORDA	KAROL MILENA TORO TABORDA	\N	\N	KAROL MILENA TORO TABORDA	\N	kmtorot@gmail.com	\N	\N	1
947	\N	\N	1003432888	\N	\N	KEVIN FERNANDO MARTINEZ OLEA	KEVIN FERNANDO MARTINEZ OLEA	\N	\N	KEVIN FERNANDO MARTINEZ OLEA	\N	kmartinez1169@gmail.com	\N	\N	1
948	\N	\N	1037572719	\N	 (000) 0000000	KEVIN RAFAEL ISAZA ARANGO	KEVIN RAFAEL ISAZA ARANGO	\N	\N	KEVIN RAFAEL ISAZA ARANGO	\N	isaza86@gmail.com	\N	\N	1
949	\N	\N	1038818884	\N	\N	KEWIN DUBAN NARVAEZ MARTINEZ	KEWIN DUBAN NARVAEZ MARTINEZ	\N	\N	KEWIN DUBAN NARVAEZ MARTINEZ	\N	navaezkevin542@gmail.com	\N	\N	1
950	\N	\N	901885415	\N	 (000) 0000000	KINGS CONSTRUCTORS S.A.S.	KINGS CONSTRUCTORS S.A.S.	\N	\N	KINGS CONSTRUCTORS S.A.S.	\N	freddy.correa2030@gmail.com	\N	\N	1
951	\N	\N	901007356	\N	 (000) 0000000	LA BODEGA DEL AGRO SAS	LA BODEGA DEL AGRO SAS	\N	\N	LA BODEGA DEL AGRO SAS	\N	labodegadelagrosas@gmail.com	\N	\N	1
952	\N	\N	900205667	\N	 (000) 0000000	LA CABALGATA FERRETERA S.A.S	LA CABALGATA FERRETERA S.A.S	\N	\N	LA CABALGATA FERRETERA S.A.S	\N	\N	\N	\N	1
953	\N	\N	901625270	\N	 (000) 0000000	LA CAUTIVA RESTOBAR SAS	LA CAUTIVA RESTOBAR SAS	\N	\N	LA CAUTIVA RESTOBAR SAS	\N	lacautivarestobar.2022@gmail.com	\N	\N	1
954	\N	\N	901140415	\N	 (000) 0000000	LA MIGUERIA S.A.S	LA MIGUERIA S.A.S	\N	\N	LA MIGUERIA S.A.S	\N	\N	\N	\N	1
955	\N	\N	811034562	\N	 (000) 0000000	LA RECETA Y CIA S.A.S	LA RECETA Y CIA S.A.S	\N	\N	LA RECETA Y CIA S.A.S	\N	\N	\N	\N	1
956	\N	\N	901471232	\N	 (000) 3104248477	LA SELVA HASS SAS	LA SELVA HASS SAS	\N	\N	LA SELVA HASS SAS	\N	LASELVAHASS@GMAIL.COM	\N	\N	1
957	\N	\N	901174284	\N	 (000) 0000000	LA ZARZAMORA INVERSIONES S.A.S.	LA ZARZAMORA INVERSIONES S.A.S.	\N	\N	LA ZARZAMORA INVERSIONES S.A.S.	\N	inmobiliariasarg@stop.com.co	\N	\N	1
958	\N	\N	811037075	\N	 (00) 0000000	LACTEOS BETANIA S.A	LACTEOS BETANIA S.A	\N	\N	LACTEOS BETANIA S.A	\N	facturacionelectronica@lacteosbetania.com	\N	\N	1
959	\N	\N	9000046044	\N	 (000) 0000000	LACTEOS EL CORRAL CAMPESINO S.A.S.	LACTEOS EL CORRAL CAMPESINO S.A.S.	\N	\N	LACTEOS EL CORRAL CAMPESINO S.A.S.	\N	contabilidad@elcorral.com.co	\N	\N	1
960	\N	\N	811003494	\N	 (000) 0000000	LADRILLERA EL NORAL S.A.S	LADRILLERA EL NORAL S.A.S	\N	\N	LADRILLERA EL NORAL S.A.S	\N	facturacion@ladrilleraelnoral.net.co	\N	\N	1
961	\N	\N	901349712	\N	 (000) 0000000	LAS CEREZAS S.A.S.	LAS CEREZAS S.A.S.	\N	\N	LAS CEREZAS S.A.S.	\N	\N	\N	\N	1
962	\N	\N	1020495294	\N	 (000) 0000000	LAURA HERRAERA CATAÑEDA	LAURA HERRAERA CATAÑEDA	\N	\N	LAURA HERRAERA CATAÑEDA	\N	facturacionaqp1@gmail.com	\N	\N	1
963	\N	\N	70193412	\N	 (000) 0000000	LEANDRO  ALVEIRO LONDOÑO ARANGO	LEANDRO ALBEIRO LONDOÑO ARANGO	\N	\N	LEANDRO ALBEIRO LONDOÑO ARANGO	\N	lealo70@hotmail.com	\N	\N	1
964	\N	\N	71389564	\N	 (000) 0000000	LEANDRO HENAO RAMIREZ	LEANDRO HENAO RAMIREZ	\N	\N	LEANDRO HENAO RAMIREZ	\N	infohotelmariadelmar@gmail.com	\N	\N	1
965	\N	\N	901477810	\N	 (000) 4503261	LECHERIA BUENA FE SAS	MARIA ALEJANDRA OCHOA GONZALEZ	\N	\N	MARIA ALEJANDRA OCHOA GONZALEZ	\N	LECHERIABUENAFE@GMAIL.COM	\N	\N	1
966	\N	\N	1128480071	\N	 (000) 0000000	LEIDY TATIANA MONSALVE CIFUENTES	LEIDY TATIANA MONSALVE CIFUENTES	\N	\N	LEIDY TATIANA MONSALVE CIFUENTES	\N	ruta52bikers@gmail.com	\N	\N	1
967	\N	\N	71229996	\N	 (00) 0000000	LEINER ANDRES LOPEZ ZAPATA	LEINER ANDRES LOPEZ ZAPATA	\N	\N	LEINER ANDRES LOPEZ ZAPATA	\N	LEINERANDRES@GMAIL.COM	\N	\N	1
968	\N	\N	3599651	\N	 (000) 0000000	LEOBARDO MEDINA RUIZ	LEOBARDO MEDINA RUIZ	\N	\N	LEOBARDO MEDINA RUIZ	\N	Ultralm@hoomal.com	\N	\N	1
969	\N	\N	70002246	\N	 (000) 0000000	LEOCADIO PUERTA OSPINA	LEOCADIO PUERTA OSPINA	\N	\N	LEOCADIO PUERTA OSPINA	\N	leocadio.puerta@gmail.com	\N	\N	1
970	\N	\N	1017272498	\N	 (000) 0000000	LEON ARBOLEDA FERNANDO	LEON ARBOLEDA FERNANDO	\N	\N	LEON ARBOLEDA FERNANDO	\N	\N	\N	\N	1
971	\N	\N	1027940547	\N	 (000) 0000000	LEON CAMILO TORO ARBOLEDA	LEON CAMILO TORO ARBOLEDA	\N	\N	LEON CAMILO TORO ARBOLEDA	\N	\N	\N	\N	1
972	\N	\N	70098591	\N	3218112436	LEON DARIO SIERRA LOPERA	LEON DARIO SIERRA LOPERA	\N	\N	LEON DARIO SIERRA LOPERA	\N	leondariosierra@gmail.com	\N	\N	1
973	\N	\N	98531745	\N	 (000) 0000000	LEONARDO FABIO VELASQUEZ VALLEJO	LEONARDO FABIO VELASQUEZ VALLEJO	\N	\N	LEONARDO FABIO VELASQUEZ VALLEJO	\N	IFVELASQ@UNAL.EDU.CO	\N	\N	1
974	\N	\N	901515985	\N	 (00) 0000000	LEVANTE V.S. S.A.S.	LEVANTE V.S. S.A.S.	\N	\N	LEVANTE V.S. S.A.S.	\N	auxadministrativo@sondelcauca.com	\N	\N	1
975	\N	\N	901289687	\N	 (000) 0000000	LIKE COLORS S.A.S	LIKE COLORS S.A.S	\N	\N	LIKE COLORS S.A.S	\N	LIKECOLORS1@GMAIL.COM	\N	\N	1
976	\N	\N	43573980	\N	 (000) 0000000	LILIANA MARIA BEDOYA SANCHEZ	LILIANA MARIA BEDOYA SANCHEZ	\N	\N	LILIANA MARIA BEDOYA SANCHEZ	\N	lilianabedoyas@gmail.com	\N	\N	1
977	\N	\N	43537025	\N	 (000) 0000000	LILIANA MARIA JARAMILLO ATEHORTUA	LILIANA MARIA JARAMILLO ATEHORTUA	\N	\N	LILIANA MARIA JARAMILLO ATEHORTUA	\N	liliana2645@hotmail.com	\N	\N	1
978	\N	\N	901353531	\N	 (000) 0000000	LILLER INVERSIONES S.A.S	LILLER INVERSIONES S.A.S	\N	\N	LILLER INVERSIONES S.A.S	\N	lillerinversionessas@hotmail.com	\N	\N	1
979	\N	\N	43587312	\N	 (000) 0000000	LINA MARIA PALACIO BOLIVAR	LINA MARIA PALACIO BOLIVAR	\N	\N	LINA MARIA PALACIO BOLIVAR	\N	\N	\N	\N	1
980	\N	\N	1020414345	\N	 (000) 0000000	LINEY MARCELA ZUALAGA CADAVID	LINEY MARCELA ZUALAGA CADAVID	\N	\N	LINEY MARCELA ZUALAGA CADAVID	\N	cornambiente2010@gmail.com	\N	\N	1
981	\N	\N	1037605730	\N	3218565192	LIVER LEANDRO HERNANDEZ TABAREZ	LEANDRO HERNANDEZ TABARES	\N	\N	LEANDRO HERNANDEZ TABARES	\N	leandro.pezyfrio@hotmail.com	\N	\N	1
982	\N	\N	901672764	\N	 (000) 0000000	LLAVES LA COLMENA ENVIGADO S.A.S	LLAVES LA COLMENA ENVIGADO S.A.S	\N	\N	LLAVES LA COLMENA ENVIGADO S.A.S	\N	\N	\N	\N	1
983	\N	\N	900702271	\N	 (000) 0000000	LOC S.A.S	LOC S.A.S	\N	\N	LOC S.A.S	\N	ventas@oscarboleda.com	\N	\N	1
984	\N	\N	900957683	\N	 (000) 0000000	LOGISTICA Y CONSTRUCCIONES COLOMBIA SAS	LOGISTICA Y CONSTRUCCIONES COLOMBIA SAS	\N	\N	LOGISTICA Y CONSTRUCCIONES COLOMBIA SAS	\N	construramasantoto@gmail.com	\N	\N	1
985	\N	\N	901256449	\N	 (000) 0000000	LONDONCOL	LONDONCOL	\N	\N	LONDONCOL	\N	londonco57@gmail.com	\N	\N	1
986	\N	\N	1042774242	\N	 (000) 0000000	LORENA CORREA POSADA	LORENA CORREA POSADA	\N	\N	LORENA CORREA POSADA	\N	\N	\N	\N	1
987	\N	\N	43726614	\N	 (604) 3362788	LORENA ISABEL ORREGO PALACIO	LORENA ISABEL ORREGO PALACIO	\N	\N	LORENA ISABEL ORREGO PALACIO	\N	lorregop99@hotmail.com	\N	\N	1
988	\N	\N	901349893	\N	 (000) 3104075865	LOS MELLOS S & L S.A.S	LOS MELLOS S&L SAS	\N	\N	LOS MELLOS S&L SAS	\N	MARIA_JLLO@HOTMAIL.COM	\N	\N	1
989	\N	\N	901161680	\N	 (000) 0000000	LOS VICTORINOS IMPORTACIONES SAS	LOS VICTORINOS IMPORTACIONES SAS	\N	\N	LOS VICTORINOS IMPORTACIONES SAS	\N	losvictorinosdigital@gmail.com	\N	\N	1
990	\N	\N	900331453	\N	 (000) 4310298	LUBRITODO EL SITIO CORRECTO S.A.S.	LUBRITODO EL SITIO CORRECTO S.A.S.	\N	\N	LUBRITODO EL SITIO CORRECTO S.A.S.	\N	Lubritodocartera@une.net.co	\N	\N	1
991	\N	\N	70253153	\N	 (000) 0000000	LUIS ALBEIRO VERGARA ARISTIZABAL	LUIS ALBEIRO VERGARA ARISTIZABAL	\N	\N	LUIS ALBEIRO VERGARA ARISTIZABAL	\N	SEBAS.VER@HOTMAIL.ES	\N	\N	1
992	\N	\N	16882629	\N	 (000) 0000000	LUIS ALBERTO ALVAREZ PIÑERES	LUIS ALBERTO ALVAREZ PIÑERES	\N	\N	LUIS ALBERTO ALVAREZ PIÑERES	\N	procertplast@gmail.com	\N	\N	1
993	\N	\N	71906356	\N	 (000) 0000000	LUIS ALEXANDER ARANGO TOBON	LUIS ALEXANDER ARANGO TOBON	\N	\N	LUIS ALEXANDER ARANGO TOBON	\N	contabilidadarango@hotmail.com	\N	\N	1
994	\N	\N	70561536	\N	 (000) 0000000	LUIS ALVARO GUZMAN NOREÑA	LUIS ALVARO GUZMAN NOREÑA	\N	\N	LUIS ALVARO GUZMAN NOREÑA	\N	hugno10@hotmail.com	\N	\N	1
995	\N	\N	70001007	\N	 (000) 0000000	LUIS BENITO HENAO MARIN	LUIS BENITO HENAO MARIN	\N	\N	LUIS BENITO HENAO MARIN	\N	benitohenao@hotmail.com	\N	\N	1
996	\N	\N	80503449	\N	 (000) 0000000	LUIS CARLOS AVILA ACEVEDO	LUIS CARLOS AVILA ACEVEDO	\N	\N	LUIS CARLOS AVILA ACEVEDO	\N	luiscar73@hotmail.com	\N	\N	1
997	\N	\N	71598213	\N	 (000) 0000000	LUIS CARLOS CALLE RESTREPO	LUIS CARLOS CALLE RESTREPO	\N	\N	LUIS CARLOS CALLE RESTREPO	\N	lucho.calle.r@gmail.com	\N	\N	1
998	\N	\N	98465812	\N	 (000) 0000000	LUIS EDUARDO ARENAS ALVAREZ	LUIS EDUARDO ARENAS ALVAREZ	\N	\N	LUIS EDUARDO ARENAS ALVAREZ	\N	luiseduardoa875@gmail.com	\N	\N	1
999	\N	\N	79883960	\N	 (000) 0000000	LUIS EDUARDO LIZCANO MONSALVE	LUIS EDUARDO LIZCANO MONSALVE	\N	\N	LUIS EDUARDO LIZCANO MONSALVE	\N	tecnicosespecializadosfactura@gmail.com	\N	\N	1
1000	\N	\N	3448745	\N	 (000) 0000000	LUIS ENRIQUE DUQUE	LUIS ENRIQUE DUQUE	\N	\N	LUIS ENRIQUE DUQUE	\N	facturacionaqp1@gmail.com	\N	\N	1
1001	\N	\N	3420705	\N	 (000) 0000000	LUIS ENRIQUE USUGA MORENO	LUIS ENRIQUE USUGA MORENO	\N	\N	LUIS ENRIQUE USUGA MORENO	\N	enrique.usuga10@gmail.com	\N	\N	1
1002	\N	\N	4446274	\N	 (000) 0000000	LUIS ERNESTO SANCHEZ CANABAL	LUIS ERNESTO SANCHEZ CANABAL	\N	\N	LUIS ERNESTO SANCHEZ CANABAL	\N	facturacionaqp1@gmail.com	\N	\N	1
1003	\N	\N	70692117	\N	\N	LUIS FELIPE ARISTIZABAL GIRALDO	LUIS FELIPE ARISTIZABAL GIRALDO	\N	\N	LUIS FELIPE ARISTIZABAL GIRALDO	\N	\N	\N	\N	1
1004	\N	\N	8173468	\N	 (00) 8212032	LUIS FELIPE PEREZ ESPITIA	LUIS FELIPE PEREZ ESPITIA	\N	\N	LUIS FELIPE PEREZ ESPITIA	\N	Ferreeconomia@hotmail.com	\N	\N	1
1005	\N	\N	98569480	\N	 (000) 0000000	LUIS FERNANDO CASTRILLON	LUIS FERNANDO CASTRILLON	\N	\N	LUIS FERNANDO CASTRILLON	\N	luiscastillo@gmail.com	\N	\N	1
1006	\N	\N	71606491	\N	 (000) 0000000	LUIS FERNANDO LOPERA AGUIRRE	LUIS FERNANDO LOPERA AGUIRRE	\N	\N	LUIS FERNANDO LOPERA AGUIRRE	\N	luisflopera17@gmail.com	\N	\N	1
1007	\N	\N	71051310	\N	 (000) 0000000	LUIS FERNANDO MUÑOZ BOLIVAR	LUIS FERNANDO MUÑOZ BOLIVAR	\N	\N	LUIS FERNANDO MUÑOZ BOLIVAR	\N	logisticaaqp3@gmail.com	\N	\N	1
1008	\N	\N	1035851776	\N	 (000) 0000000	LUIS FERNANDO RODAS	LUIS FERNANDO RODAS	\N	\N	LUIS FERNANDO RODAS	\N	facturacionaqp1@gmail.com	\N	\N	1
1009	\N	\N	71336085	\N	 (000) 0000000	LUIS FERNANDO TRUJILLO SIERRA	LUIS FERNANDO TRUJILLO SIERRA	\N	\N	LUIS FERNANDO TRUJILLO SIERRA	\N	fernando.trujillo.s@hotmail.com	\N	\N	1
1010	\N	\N	10269369	\N	 (000) 0000000	LUIS GONZAGA GUTIERREZ MUÑOZ	LUIS GONZAGA GUTIERREZ MUÑOZ	\N	\N	LUIS GONZAGA GUTIERREZ MUÑOZ	\N	serlugo@hotmail.com	\N	\N	1
1011	\N	\N	3353887	\N	 (000) 0000000	LUIS GUILLERMO HOYOS HOYOS	LUIS GUILLERMO HOYOS HOYOS	\N	\N	LUIS GUILLERMO HOYOS HOYOS	\N	luishoyos1959@gmail.com	\N	\N	1
1012	\N	\N	1044505772	\N	 (000) 0000000	LUIS GUILLERMO PEREZ GUTIERREZ	LUIS GUILLERMO PEREZ GUTIERREZ	\N	\N	LUIS GUILLERMO PEREZ GUTIERREZ	\N	logisticaaqp3@gmail.com	\N	\N	1
1013	\N	\N	3521299	\N	 (000) 0000000	LUIS HERNESTO GUZMAN LOPEZ	LUIS HERNESTO GUZMAN LOPEZ	\N	\N	LUIS HERNESTO GUZMAN LOPEZ	\N	guzmanlopezluis@gmail.com	\N	\N	1
1014	\N	\N	1007299755	\N	 (000) 0000000	LUISA FERNANDA ALVAREZ ROJAS	LUISA FERNANDA ALVAREZ ROJAS	\N	\N	LUISA FERNANDA ALVAREZ ROJAS	\N	\N	\N	\N	1
1015	\N	\N	1036654759	\N	 (000) 3105266291	LUISA FERNANDA PIEDRAHITA	LUISA FERNANDA PIEDRAHITA	\N	\N	LUISA FERNANDA PIEDRAHITA	\N	ACUSENCO@GMAIL.COM	\N	\N	1
1016	\N	\N	1036654759	\N	\N	LUISA FERNANDA PIEDRAHITA	contabilidadaqp1@gmail.com	\N	\N	contabilidadaqp1@gmail.com	\N	contabilidadaqp1@gmail.com	\N	\N	1
1017	\N	\N	43444586	\N	 (000) 0000000	LUZ ADELA GUERRA BEDOYA	LUZ ADELA GUERRA BEDOYA	\N	\N	LUZ ADELA GUERRA BEDOYA	\N	adelitaguerrabedoya@gmail.com	\N	\N	1
1018	\N	\N	39190204	\N	 (000) 0000000	LUZ ADRIANA GONZALEZ TOBON	LUZ ADRIANA GONZALEZ TOBON	\N	\N	LUZ ADRIANA GONZALEZ TOBON	\N	diversionesinfantilesmagicpark@gmail.com	\N	\N	1
1019	\N	\N	25120109	\N	 (000) 0000000	LUZ AMPARO NARVAEZ PEREZ	LUZ AMPARO NARVAEZ PEREZ	\N	\N	LUZ AMPARO NARVAEZ PEREZ	\N	\N	\N	\N	1
1020	\N	\N	1128484020	\N	 (000) 0000000	LUZ ESPERANZA LOPEZ	LUZ ESPERANZA LOPEZ	\N	\N	LUZ ESPERANZA LOPEZ	\N	hopemonsa05@gmail.com	\N	\N	1
1021	\N	\N	50948447	\N	 (000) 0000000	LUZ MARINA MUÑOZ BERROCAL	LUZ MARINA MUÑOZ BERROCAL	\N	\N	LUZ MARINA MUÑOZ BERROCAL	\N	YULIZAVIDAL9@GMAIL.COM	\N	\N	1
1022	\N	\N	43668590	\N	 (000) 3007796954	LUZ MARINA RUIZ PALACIO	LUZ MARINA RUIZ PALACIO	\N	\N	LUZ MARINA RUIZ PALACIO	\N	ruizpalacio.lm@icloud.com	\N	\N	1
1023	\N	\N	24717677	\N	 (000) 0000000	LUZ MERY OSPINA GOMEZ	LUZ MERY OSPINA GOMEZ	\N	\N	LUZ MERY OSPINA GOMEZ	\N	facturacionaqp1@gmail.com	\N	\N	1
1024	\N	\N	42966771	\N	 (000) 0000000	LUZ STELLA CORREA	LUZ STELLA CORREA	\N	\N	LUZ STELLA CORREA	\N	facturaacquapack@gmail.com	\N	\N	1
1025	\N	\N	52968066	\N	 (000) 0000000	LUZ STELLA PEREZ	LUZ STELLA PEREZ	\N	\N	LUZ STELLA PEREZ	\N	edslasmargaritas@gmail.com	\N	\N	1
1026	\N	\N	32447202	\N	 (000) 0000000	LUZ YAMILE RESTREPO VARGAS	LUZ YAMILE RESTREPO VARGAS	\N	\N	LUZ YAMILE RESTREPO VARGAS	\N	emergenciatecnica@hotmail.com	\N	\N	1
1027	\N	\N	811046781	\N	 (000) 0000000	M.P GALAGRO S.A.S	M.P GALAGRO S.A.S	\N	\N	M.P GALAGRO S.A.S	\N	\N	\N	\N	1
1028	\N	\N	901740371	\N	 (000) 0000000	MACAM INGENIERIA S.A.S	MACAM INGENIERIA S.A.S	\N	\N	MACAM INGENIERIA S.A.S	\N	INGENIERIAMACAM@GMAIL.COM	\N	\N	1
1029	\N	\N	900772404	\N	 (000) 0000000	MACAPLAST S.A.S.	MACAPLAST S.A.S.	\N	\N	MACAPLAST S.A.S.	\N	\N	\N	\N	1
1030	\N	\N	900536413	\N	 (000) 0000000	MADERPOL S.A.S.	MADERPOL S.A.S.	\N	\N	MADERPOL S.A.S.	\N	admon@maderpol.com.co	\N	\N	1
1031	\N	\N	901583053	\N	 (000) 0000000	MAKRO ENVASES S.A.S	MAKRO ENVASES S.A.S	\N	\N	MAKRO ENVASES S.A.S	\N	\N	\N	\N	1
1032	\N	\N	900960371	\N	 (000) 0000000	MALLAS Y SILOS S.A.S	MALLAS Y SILOS S.A.S	\N	\N	MALLAS Y SILOS S.A.S	\N	mallasysilossas@gmail.com	\N	\N	1
1033	\N	\N	811023661	\N	 (000) 0000000	MANDAR Y SERVIR S.A.S.	MANDAR Y SERVIR S.A.S.	\N	\N	MANDAR Y SERVIR S.A.S.	\N	\N	\N	\N	1
1034	\N	\N	901284185	\N	 (000) 3502421280	MANECOL	MANECOL	\N	\N	MANECOL	\N	MANECOLSAS@GMAIL.COM	\N	\N	1
1035	\N	\N	900690917	\N	 (00) 3104515236	MANGOS LA ESPERANZA S.A.S.	MANGOS LA ESPERANZA	\N	\N	MANGOS LA ESPERANZA	\N	mangoslaesperanzasas@gmail.com	\N	\N	1
1036	\N	\N	901682721	\N	 (000) 3206256189	MANGUERAS  ECOLOGICAS Y RIEGOS PLASTICOS MERIPLAS SAS	MERIPLAST SAS	\N	\N	MERIPLAST SAS	\N	MERIPLASTSAS@GMAIL.COM	\N	\N	1
1037	\N	\N	900584371	\N	 (00) 4520870	MANGUERAS ACOPLES Y ACCESORIOS SAS	MANGUERAS ACOPLES Y ACCESORIOS SAS	\N	\N	MANGUERAS ACOPLES Y ACCESORIOS SAS	\N	recepcionfacturasmaples@gmail.com	\N	\N	1
1038	\N	\N	900938040	\N	 (000) 0000000	MANGUERAS ECOLOGICAS DE COLOMBIA SAS	MANGUERAS ECOLOGICAS DE COLOMBIA SAS	\N	\N	MANGUERAS ECOLOGICAS DE COLOMBIA SAS	\N	administrativo@ecomangueras.com	\N	\N	1
1039	\N	\N	901510726	\N	 (000) 0000000	MANGUERAS ECOLOGICAS DEL SINU S.AS	MANGUERAS ECOLOGICAS DEL SINU S.AS	\N	\N	MANGUERAS ECOLOGICAS DEL SINU S.AS	\N	manguerasecodelsinu@gmail.com	\N	\N	1
1040	\N	\N	890323716	\N	 (000) 42622218	MANGUERAS INDUSTRIALES LTDA	MANGUERAS INDUSTRIALES LTDA	\N	\N	MANGUERAS INDUSTRIALES LTDA	\N	facturaelectronica@manguerasindustriales.net	\N	\N	1
1041	\N	\N	890323716	\N	\N	MANGUERAS INDUSTRIALES LTDA	mangueras industriales	\N	\N	mangueras industriales	\N	secremedellin@manguerasindustriales.net	\N	\N	1
1042	\N	\N	890323716	\N	\N	MANGUERAS INDUSTRIALES LTDA	facturas @mangurerasindustriales.net	\N	\N	facturas @mangurerasindustriales.net	\N	facturas@mangurerasindustriales.net	\N	\N	1
1043	\N	\N	890910469	\N	 (000) 0000000	MANGUERAS Y BANDAS S.A.S	MANGUERAS Y BANDAS S.A.S	\N	\N	MANGUERAS Y BANDAS S.A.S	\N	comercial@manguerasybandas.com	\N	\N	1
1044	\N	\N	900237546	\N	 (00) 44489011	MANGUERAS Y CORREAS DE ANTIOQUIA S.A.S	MANGUERAS Y CORREAS DE ANTIOQUIA S.A.S	\N	\N	MANGUERAS Y CORREAS DE ANTIOQUIA S.A.S	\N	factura@mancoran.com.co	\N	\N	1
1045	\N	\N	901010506	\N	 (000) 0000000	MANTENIMIENTO INTEGRAL FYS SAS	MANTENIMIENTO INTEGRAL FYS SAS	\N	\N	MANTENIMIENTO INTEGRAL FYS SAS	\N	mantenimientointegralfs@gmail.com	\N	\N	1
1046	\N	\N	15049377	\N	 (000) 0000000	MANUEL ESTEBAN VELASQUEZ SANTERO	MANUEL ESTEBAN VELASQUEZ SANTERO	\N	\N	MANUEL ESTEBAN VELASQUEZ SANTERO	\N	FACTURACION1@GMAIL.COM	\N	\N	1
1047	\N	\N	15000260425	\N	 (000) 0000000	MANUEL SALVADOR ZAPATA	MANUEL SALVADOR ZAPATA	\N	\N	MANUEL SALVADOR ZAPATA	\N	MANUELSAZA@HOTMAIL.COM	\N	\N	1
1048	\N	\N	15421972	\N	 (000) 0000000	MANUELA AGUDELO	MANUELA AGUDELO	\N	\N	MANUELA AGUDELO	\N	\N	\N	\N	1
1049	\N	\N	1152701063	\N	 (000) 0000000	MANUELA SANCHEZ LOPEZ	MANUELA SANCHEZ LOPEZ	\N	\N	MANUELA SANCHEZ LOPEZ	\N	manu.paisa95@hotmail.com	\N	\N	1
1050	\N	\N	830103338	\N	 (000) 0000000	MANUFACTURAS ALGOTEX S.A.S.	MANUFACTURAS ALGOTEX S.A.S.	\N	\N	MANUFACTURAS ALGOTEX S.A.S.	\N	algotex@hotmail.com	\N	\N	1
1051	\N	\N	43432458	\N	 (000) 0000000	MARIA ALBALEDI MONSALVE ZAPATA	MARIA ALBALEDI MONSALVE ZAPATA	\N	\N	MARIA ALBALEDI MONSALVE ZAPATA	\N	RESTAURANTELAFRITANGA110@GMAIL.COM	\N	\N	1
1052	\N	\N	42689458	\N	 (000) 0000000	MARIA CRISTINA BOHORQUEZ RODRIGUEZ	MARIA CRISTINA BOHORQUEZ RODRIGUEZ	\N	\N	MARIA CRISTINA BOHORQUEZ RODRIGUEZ	\N	estopas-ferro@hotmail.com	\N	\N	1
1053	\N	\N	1152446137	\N	 (000) 0000000	MARIA DEL MAR GIRALDO MENDEZ	MARIA DEL MAR GIRALDO MENDEZ	\N	\N	MARIA DEL MAR GIRALDO MENDEZ	\N	hotelgrandiamantecaucasia@gmail.com	\N	\N	1
1054	\N	\N	32498219	\N	 (000) 0000000	MARIA ELENA HENAO DE AGREDO	MARIA ELENA HENAO DE AGREDO	\N	\N	MARIA ELENA HENAO DE AGREDO	\N	\N	\N	\N	1
1055	\N	\N	25000827	\N	 (000) 0000000	MARIA ERCILIA GARCES MARIN	MARIA ERCILIA GARCES MARIN	\N	\N	MARIA ERCILIA GARCES MARIN	\N	\N	\N	\N	1
1056	\N	\N	43814424	\N	 (000) 0000000	MARÍA EUGENIA VELASCO	MARÍA EUGENIA VELASCO	\N	\N	MARÍA EUGENIA VELASCO	\N	\N	\N	\N	1
1057	\N	\N	22240726	\N	 (604) 3104473735	MARIA GLADIS YEPES DE RESTREPO	MARIA GLADIS YEPES DE RESTREPO	\N	\N	MARIA GLADIS YEPES DE RESTREPO	\N	gladisy57@gmail.com	\N	\N	1
1058	\N	\N	1035852255	\N	 (000) 0000000	MARIA ISABEL MURCIA CATAÑO	MARIA ISABEL MURCIA CATAÑO	\N	\N	MARIA ISABEL MURCIA CATAÑO	\N	multiservicios1931@gmail.com	\N	\N	1
1059	\N	\N	1214747193	\N	 (000) 0000000	MARIA JOSE QUINTERO QUINTERO	MARIA JOSE QUINTERO QUINTERO	\N	\N	MARIA JOSE QUINTERO QUINTERO	\N	auracolor2023@gmail.com	\N	\N	1
1060	\N	\N	43569334	\N	 (000) 0000000	MARIA LUISA CECILIA VASQUEZ GUTIERREZ	MARIA LUISA CECILIA VASQUEZ GUTIERREZ	\N	\N	MARIA LUISA CECILIA VASQUEZ GUTIERREZ	\N	\N	\N	\N	1
1061	\N	\N	1041630675	\N	 (000) 0000000	MARÍA PAULA PEREZ SÁNCHEZ	MARÍA PAULA PEREZ SÁNCHEZ	\N	\N	MARÍA PAULA PEREZ SÁNCHEZ	\N	\N	\N	\N	1
1062	\N	\N	42795633	\N	 (000) 0000000	MARIA VICTORIA BOTERO VIEIRA	MARIA VICTORIA BOTERO VIEIRA	\N	\N	MARIA VICTORIA BOTERO VIEIRA	\N	\N	\N	\N	1
1063	\N	\N	43581505	\N	 (000) 0000000	MARIA VICTORIA HERNANDEZ	MARIA VICTORIA HERNANDEZ	\N	\N	MARIA VICTORIA HERNANDEZ	\N	vickytanga@hotmail.com	\N	\N	1
1064	\N	\N	1042762168	\N	\N	MARICELA SANCHEZ GUTIERREZ	MARICELA SANCHEZ GUTIERREZ	\N	\N	MARICELA SANCHEZ GUTIERREZ	\N	rhacquapack@gmail.com	\N	\N	1
1065	\N	\N	21716866	\N	 (000) 0000000	MARIELA VIVERO DE HENAO	MARIELA VIVERO DE HENAO	\N	\N	MARIELA VIVERO DE HENAO	\N	FACTURAAQP1@GMAIL.COM	\N	\N	1
1066	\N	\N	811015014	\N	 (000) 2700283	MARINA VELEZ S.A.S.	MARINA VELEZ S.A.S.	\N	\N	MARINA VELEZ S.A.S.	\N	marinavelezsas@gmail.com	\N	\N	1
1067	\N	\N	3662956	\N	\N	MARIO ANDRES ROJAS ORTIZ	MARIO ANDRES ROJAS ORTIZ	\N	\N	MARIO ANDRES ROJAS ORTIZ	\N	solucionessai@gmail.com	\N	\N	1
1068	\N	\N	8012630	\N	 (000) 0000000	MARIO VIANA DIAZ	MARIO VIANA DIAZ	\N	\N	MARIO VIANA DIAZ	\N	jeancarlosgonzalescardenas@gmail.com	\N	\N	1
1069	\N	\N	901114078	\N	 (000) 0000000	MARIU TROPICAL S.A.S.	MARIU TROPICAL S.A.S.	\N	\N	MARIU TROPICAL S.A.S.	\N	contabilidad@losmartillos.co	\N	\N	1
1070	\N	\N	43342240	\N	\N	MARLENY HURTADO MONTOYA	MARLENY HURTADO MONTOYA	\N	\N	MARLENY HURTADO MONTOYA	\N	materialesconstrufacil@hotmail.com	\N	\N	1
1071	\N	\N	21714685	\N	 (000) 0000000	MARTHA AIDE TAMAYO ZAPATA	MARTHA AIDE TAMAYO ZAPATA	\N	\N	MARTHA AIDE TAMAYO ZAPATA	\N	facturacionaqp1@gmail.com	\N	\N	1
1072	\N	\N	43264863	\N	 (000) 0000000	MARTHA ELENA GUTIERREZ	MARTHA ELENA GUTIERREZ	\N	\N	MARTHA ELENA GUTIERREZ	\N	districomercialbusinec@hotmail.com	\N	\N	1
1073	\N	\N	43094755	\N	 (000) 0000000	MARTHA IRENE VELEZ RESTREPO	MARTHA IRENE VELEZ RESTREPO	\N	\N	MARTHA IRENE VELEZ RESTREPO	\N	marthairenevere@hotmail.com	\N	\N	1
1074	\N	\N	43726168	\N	 (000) 0000000	MARTHA LIGIA OCAMPO GARCÍA	MARTHA LIGIA OCAMPO GARCÍA	\N	\N	MARTHA LIGIA OCAMPO GARCÍA	\N	ocampo.martha0509@gmail.com	\N	\N	1
1075	\N	\N	16781213	\N	 (00) 0000000	MARUAM DAVID ALVAREZ AGUDELO	MARUAM DAVID ALVAREZ AGUDELO	\N	\N	MARUAM DAVID ALVAREZ AGUDELO	\N	maruand21@hotmail.com	\N	\N	1
1076	\N	\N	901099915	\N	 (00) 8607065	MAS CAMPO ZH S.A.S.	MAS CAMPO ZH S.A.S.	\N	\N	MAS CAMPO ZH S.A.S.	\N	mascampozh@gmail.com	\N	\N	1
1077	\N	\N	901099915	\N	\N	MAS CAMPO ZH S.A.S.	MASCAMPO	\N	\N	MASCAMPO	\N	\N	\N	\N	1
1078	\N	\N	901099915	\N	\N	MAS CAMPO ZH S.A.S.	MAS CAMPO	\N	\N	MAS CAMPO	\N	\N	\N	\N	1
1079	\N	\N	901099915	\N	\N	MAS CAMPO ZH S.A.S.	mas campo	\N	\N	mas campo	\N	mascampozh@gmail.com	\N	\N	1
1080	\N	\N	811016603	\N	 (000) 0000000	MASFINCA PRODUCCION S.A.S.	MASFINCA PRODUCCION S.A.S.	\N	\N	MASFINCA PRODUCCION S.A.S.	\N	comprasganaderia@masfinca.com	\N	\N	1
1081	\N	\N	901495579	\N	 (000) 0000000	MASI CONSTRUCCIONES Y CONSULTORIA S.A.S	MASI CONSTRUCCIONES Y CONSULTORIA S.A.S	\N	\N	MASI CONSTRUCCIONES Y CONSULTORIA S.A.S	\N	masi.arquitectur@gmail.com	\N	\N	1
1082	\N	\N	900491889	\N	 (000) 0000000	MASSER SAS	MASSER SAS	\N	\N	MASSER SAS	\N	\N	\N	\N	1
1083	\N	\N	1152465978	\N	 (000) 0000000	MATEO CASTAÑO ESTRADA	MATEO CASTAÑO ESTRADA	\N	\N	MATEO CASTAÑO ESTRADA	\N	MCASTANOE@UNAL.EDU.CO	\N	\N	1
1084	\N	\N	1017218970	\N	 (00) 0000000	MATEO GUTIERREZ MORTIGO	MATEO GUTIERREZ MORTIGO	\N	\N	MATEO GUTIERREZ MORTIGO	\N	mateogm94@hotmail.com	\N	\N	1
1085	\N	\N	1017922552	\N	 (000) 0000000	MATEO PALACIO MEDINA	MATEO PALACIO MEDINA	\N	\N	MATEO PALACIO MEDINA	\N	\N	\N	\N	1
1086	\N	\N	900116036	\N	 (000) 0000000	MATERIALES EL TITAN NUMERO CUATRO S.A.S	MATERIALES EL TITAN NUMERO CUATRO S.A.S	\N	\N	MATERIALES EL TITAN NUMERO CUATRO S.A.S	\N	\N	\N	\N	1
1087	\N	\N	901585563	\N	 (000) 0000000	MATERIALES FERREPATO S.A.S	MATERIALES FERREPATO S.A.S	\N	\N	MATERIALES FERREPATO S.A.S	\N	materialesferrepatosas@gmail.com	\N	\N	1
1088	\N	\N	900933030	\N	 (000) 0000000	MATERIALES Y SUMINISTROS VAHOS BOTEROS S.A.S	MATERIALES Y SUMINISTROS VAHOS BOTEROS S.A.S	\N	\N	MATERIALES Y SUMINISTROS VAHOS BOTEROS S.A.S	\N	VENTAS01.MYS@GMAIL.COM	\N	\N	1
1089	\N	\N	71751849	\N	 (000) 0000000	MAURICIO ALBERTO VALVIN PRECIADO	MAURICIO ALBERTO VALVIN PRECIADO	\N	\N	MAURICIO ALBERTO VALVIN PRECIADO	\N	\N	\N	\N	1
1090	\N	\N	3408489	\N	 (000) 0000000	MAURICIO ARBELAEZ SALAZAR	MAURICIO ARBELAEZ SALAZA	\N	\N	MAURICIO ARBELAEZ SALAZA	\N	KAREY8210@GMAIL.COM	\N	\N	1
1091	\N	\N	80216463	\N	 (000) 0000000	MAURICIO ARTURO URREGO PACHON	MAURICIO ARTURO URREGO PACHON	\N	\N	MAURICIO ARTURO URREGO PACHON	\N	maurregop@gmail.com	\N	\N	1
1092	\N	\N	98564876	\N	 (000) 0000000	MAURICIO LOAIZA MONTOYA	MAURICIO LOAIZA MONTOYA	\N	\N	MAURICIO LOAIZA MONTOYA	\N	tiendainformatica120@gmail.com	\N	\N	1
1093	\N	\N	1035831443	\N	 (000) 0000000	MAURICIO MUNERA JARAMILLO	MAURICIO MUNERA JARAMILLO	\N	\N	MAURICIO MUNERA JARAMILLO	\N	mauromune92@hotmail.com	\N	\N	1
1094	\N	\N	15458348	\N	 (000) 0000000	MAURICIO POSADA GONZALES	MAURICIO POSADA GONZALES	\N	\N	MAURICIO POSADA GONZALES	\N	discalar@gmail.com	\N	\N	1
1095	\N	\N	98558124	\N	 (000) 0000000	MAURICIO RESTREPO POSADA	MAURICIO RESTREPO POSADA	\N	\N	MAURICIO RESTREPO POSADA	\N	MRESTREPOPOSADA@GMAIL.COM	\N	\N	1
1096	\N	\N	900488933	\N	 (000) 0000000	MAXIFER S. A. S.	MAXIFER S. A. S.	\N	\N	MAXIFER S. A. S.	\N	administracion@maxifersas.com	\N	\N	1
1097	\N	\N	98469012	\N	 (00) 0000000	MEDARDO ALFONSO OSORIO ALVAREZ	MEDARDO ALFONSO OSORIO ALVAREZ	\N	\N	MEDARDO ALFONSO OSORIO ALVAREZ	\N	osorioalvarezmedardoalfonso@gmail.com	\N	\N	1
1098	\N	\N	901196936	\N	 (000) 0000000	MEGAJUEGOS HJN S.A.S.	MEGAJUEGOS HJN S.A.S.	\N	\N	MEGAJUEGOS HJN S.A.S.	\N	nato0725@hotmail.com	\N	\N	1
1099	\N	\N	901355674	\N	 (000) 0000000	MEGA-SERVICIOS YOMAR S.A.S.	MEGA-SERVICIOS YOMAR S.A.S.	\N	\N	MEGA-SERVICIOS YOMAR S.A.S.	\N	contabilidad@serviciosyomar.com	\N	\N	1
1100	\N	\N	900306393	\N	 (000) 0000000	METALYCA S.A.S	METALYCA S.A.S	\N	\N	METALYCA S.A.S	\N	gerencia@metalyca.com	\N	\N	1
1101	\N	\N	901551590	\N	 (000) 0000000	METRO CYCLES S.A.S.	METRO CYCLES S.A.S.	\N	\N	METRO CYCLES S.A.S.	\N	contabilidad@metrocycles.co	\N	\N	1
1102	\N	\N	900399450	\N	 (000) 0000000	MF TEXTIL S.A.S	MF TEXTIL S.A.S	\N	\N	MF TEXTIL S.A.S	\N	contabilidad@mftextil.com.co	\N	\N	1
1103	\N	\N	1092851078	\N	 (000) 0000000	MICHEL DAYANNA PASTRANA RAMIREZ	MICHEL DAYANNA PASTRANA RAMIREZ	\N	\N	MICHEL DAYANNA PASTRANA RAMIREZ	\N	micheramirez1517@gmail.com	\N	\N	1
1104	\N	\N	1042708964	\N	 (000) 0000000	MIGUEL ANGEL URIBE	MIGUEL ANGEL URIBE	\N	\N	MIGUEL ANGEL URIBE	\N	ommorh@hotmail.com	\N	\N	1
1105	\N	\N	98665443	\N	 (000) 0000000	MIGUEL JOSÉ OCAMPO ÁNGEL	MIGUEL JOSÉ OCAMPO ÁNGEL	\N	\N	MIGUEL JOSÉ OCAMPO ÁNGEL	\N	\N	\N	\N	1
1106	\N	\N	71595651	\N	 (000) 0000000	MIGUEL RENDON	MIGUEL RENDON	\N	\N	MIGUEL RENDON	\N	miguelon_1290@hotmil.com	\N	\N	1
1107	\N	\N	70470683	\N	 (000) 0000000	MILCIADES QUINTERO SERNA	MILCIADES QUINTERO SERNA	\N	\N	MILCIADES QUINTERO SERNA	\N	bancoelectrico@yahoo.com	\N	\N	1
1108	\N	\N	1007170686	\N	 (000) 0000000	MILLE ALEJANDRO MUÑOZ CARDONA	MILLE ALEJANDRO MUÑOZ CARDONA	\N	\N	MILLE ALEJANDRO MUÑOZ CARDONA	\N	ALEJOM1404@GMAIL.COM	\N	\N	1
1109	\N	\N	890930545	\N	 (000) 0000000	MINCIVIL S.A	MINCIVIL S.A	\N	\N	MINCIVIL S.A	\N	notificaciones@mincivil.com	\N	\N	1
1110	\N	\N	1069872329	\N	 (000) 0000000	MOISES CHAVES ARIAS	MOISES CHAVES ARIAS	\N	\N	MOISES CHAVES ARIAS	\N	moisesariaschavez@gmail.com	\N	\N	1
1111	\N	\N	900573868	\N	 (000) 0000000	MONTACARGAS Y SERVICIOS EL CHAGUALO SAS	MONTACARGAS Y SERVICIOS EL CHAGUALO SAS	\N	\N	MONTACARGAS Y SERVICIOS EL CHAGUALO SAS	\N	oscardmontacarga@hotmail.com	\N	\N	1
1112	\N	\N	830508693	\N	 (000) 0000000	MONTACARGAS Y TRANSPORTES S.A.S	MONTACARGAS Y TRANSPORTES S.A.S	\N	\N	MONTACARGAS Y TRANSPORTES S.A.S	\N	gerencia@mytltda.com	\N	\N	1
1113	\N	\N	901460362	\N	3148902639	MONTANA HASS S.A.S.	\N	\N	\N	\N	\N	facturacionhass@gmail.com	\N	\N	1
1114	\N	\N	43022803	\N	 (000) 0000000	MORELIA DEL CARMEN ARIAS	MORELIA DEL CARMEN ARIAS	\N	\N	MORELIA DEL CARMEN ARIAS	\N	servicomercialnuevavilla@gmail.com	\N	\N	1
1115	\N	\N	901758703	\N	 (000) 0000000	MOTOBOMBAS FRANCISCO JAVIER ARISTIZABAL CA. S.A.S.	MOTOBOMBAS FRANCISCO JAVIER ARISTIZABAL CA. S.A.S.	\N	\N	MOTOBOMBAS FRANCISCO JAVIER ARISTIZABAL CA. S.A.S.	\N	motobombas.javieraristizabals.a.s@gmail.com	\N	\N	1
1116	\N	\N	811037702	\N	 (00) 4121232	MOTOBOMBAS J.V. S.A.	MOTOBOMBAS J.V. S.A.	\N	\N	MOTOBOMBAS J.V. S.A.	\N	motobombasjvsa@hotmail.com	\N	\N	1
1117	\N	\N	900500103	\N	 (000) 2098529	MOTOBOMBAS Y ENERGIA SAS	CARLOS MEDINA PATIÑO	\N	\N	CARLOS MEDINA PATIÑO	\N	MOTOBOMBASYENERGIA@GMAIL.COM	\N	\N	1
1118	\N	\N	901564883	\N	 (000) 0000000	MUEBLES PRACTICOS COLOMBIA S.A.S	MUEBLES PRACTICOS COLOMBIA S.A.S	\N	\N	MUEBLES PRACTICOS COLOMBIA S.A.S	\N	\N	\N	\N	1
1119	\N	\N	901471406	\N	 (00) 0000000	MULTERRAGRO S.A.S	MULTERRAGRO S.A.S	\N	\N	MULTERRAGRO S.A.S	\N	multerragro@gmail.com	\N	\N	1
1120	\N	\N	830057186	\N	 (000) 0000000	MUNDIAL DE TORNILLOS S.A	MUNDIAL DE TORNILLOS S.A	\N	\N	MUNDIAL DE TORNILLOS S.A	\N	\N	\N	\N	1
1121	\N	\N	811012661	\N	 (000) 0000000	MUNDO ALIANZA S.A.S	MUNDO ALIANZA S.A.S	\N	\N	MUNDO ALIANZA S.A.S	\N	\N	\N	\N	1
1122	\N	\N	42795094	\N	 (000) 0000000	MYRIAM ELENA DE ARCILA	MYRIAM ELENA DE ARCILA	\N	\N	MYRIAM ELENA DE ARCILA	\N	facturacionaqp1@gmail.com	\N	\N	1
1123	\N	\N	1026149125	\N	 (000) 0000000	NATALIA ANDREA VANEGAS ARIAS	NATALIA ANDREA VANEGAS ARIAS	\N	\N	NATALIA ANDREA VANEGAS ARIAS	\N	gerencia.dmgraficas@gmail.com	\N	\N	1
1124	\N	\N	901711667	\N	 (000) 0000000	NATURASA SAS	NATURASA SAS	\N	\N	NATURASA SAS	\N	naturasa.sas@gmail.com	\N	\N	1
1125	\N	\N	900904478	\N	 (000) 0000000	NAVEGAREPUESTOS S.A.S	NAVEGAREPUESTOS SAS	\N	\N	NAVEGAREPUESTOS SAS	\N	facturacionmedellin@navegarepuestos.com	\N	\N	1
1126	\N	\N	900827787	\N	 (000) 0000000	NEGOCIOS NEST S.A.S	NEGOCIOS NEST S.A.S	\N	\N	NEGOCIOS NEST S.A.S	\N	info@negociosestrategicos.com	\N	\N	1
1127	\N	\N	1007522593	\N	 (000) 0000000	NEIDER YESID ZAPATA ZAPATA	NEIDER YESID ZAPATA ZAPATA	\N	\N	NEIDER YESID ZAPATA ZAPATA	\N	\N	\N	\N	1
1128	\N	\N	43787505	\N	 (000) 0000000	NELLIVIA DEL SOCORRO RAMIREZ QUINTERO	NELLIVIA DEL SOCORRO RAMIREZ QUINTERO	\N	\N	NELLIVIA DEL SOCORRO RAMIREZ QUINTERO	\N	\N	\N	\N	1
1129	\N	\N	70055243	\N	 (000) 0000000	NERVARDO SERNA  SERNA	NERVARDO SERNA  SERNA	\N	\N	NERVARDO SERNA  SERNA	\N	nebardoserna@hotmail.com	\N	\N	1
1130	\N	\N	18603062	\N	 (000) 0000000	NESTOR ELIBER QUINTERO GRISALES	NESTOR ELIBER QUINTERO GRISALES	\N	\N	NESTOR ELIBER QUINTERO GRISALES	\N	\N	\N	\N	1
1131	\N	\N	8357333	\N	 (000) 0000000	NESTOR OSORIO HOYOS	NESTOR OSORIO HOYOS	\N	\N	NESTOR OSORIO HOYOS	\N	josorio7@hotmail.com	\N	\N	1
1132	\N	\N	900348335	\N	 (000) 0000000	NEUMATICA INDUSTRIAL S.A.S	NEUMATICA INDUSTRIAL S.A.S	\N	\N	NEUMATICA INDUSTRIAL S.A.S	\N	neumaticaindustrials.a.s@gmail.com	\N	\N	1
1133	\N	\N	900511599	\N	 (000) 0000000	NIVEL 10 CONSTRUCTORA E INMOBILIARIA S.A.S	CONSTRUTORA E INMOBILIARIA S.A.S	\N	\N	CONSTRUTORA E INMOBILIARIA S.A.S	\N	ADMON@NIVEL10CONSTRUCTORA.COM	\N	\N	1
1183	\N	\N	16644241	\N	 (000) 3103721505	PEDRO ALZATE	PEDRO ALZATE	\N	\N	PEDRO ALZATE	\N	PEDROALZATE@GMAIL.COM	\N	\N	1
1134	\N	\N	15404360	\N	 (000) 0000000	NOLBERTO ANTONIO BRAN GARCIA	NOLBERTO ANTONIO BRAN GARCIA	\N	\N	NOLBERTO ANTONIO BRAN GARCIA	\N	BIOFINCA@HOTMAIL.COM	\N	\N	1
1135	\N	\N	98591497	\N	 (000) 0000000	NORMAN DARIO HOYOS ZAPATA	NORMAN DARIO HOYOS ZAPATA	\N	\N	NORMAN DARIO HOYOS ZAPATA	\N	nysa1920@hotmail.com	\N	\N	1
1136	\N	\N	901516731	\N	 (000) 0000000	NORTHSHIRE & OLUFSEN INVERSIONES S.A.S.	NORTHSHIRE & OLUFSEN INVERSIONES S.A.S.	\N	\N	NORTHSHIRE & OLUFSEN INVERSIONES S.A.S.	\N	facturacion@nolufsen.com	\N	\N	1
1137	\N	\N	901421730	\N	3662839	NUEVA PELONA S.A.S.	\N	\N	\N	\N	\N	auxadministrativo@sondelcauca.com	\N	\N	1
1138	\N	\N	42901294	\N	 (000) 0000000	OLGA MATILDE SINITAVE GIMENEZ	OLGA MATILDE SINITAVE GIMENEZ	\N	\N	OLGA MATILDE SINITAVE GIMENEZ	\N	matildesinitave818@gmail.com	\N	\N	1
1139	\N	\N	42902259	\N	3105366309	OLGA PATRICIA CHAVARRIA CHAVARRIA	\N	\N	\N	\N	\N	patricia3400@hotmail.com	\N	\N	1
1140	\N	\N	1056800267	\N	 (000) 0000000	OLIMPO MOROY	OLIMPO MOROY	\N	\N	OLIMPO MOROY	\N	facturacionaqp1@gmail.com	\N	\N	1
1141	\N	\N	98561048	\N	 (000) 0000000	OMAR ANDRES IBARRA	OMAR ANDRES IBARRA	\N	\N	OMAR ANDRES IBARRA	\N	OMANIBAR@HOTMAIL.COM	\N	\N	1
1142	\N	\N	8321768	\N	 (000) 0000000	OMAR ARIEL ZAPATA ECHAVARRIA	OMAR ARIEL ZAPATA ECHAVARRIA	\N	\N	OMAR ARIEL ZAPATA ECHAVARRIA	\N	facturacionaqp1@gmail.com	\N	\N	1
1143	\N	\N	70321775	\N	 (000) 0000000	OMAR AUGUSTO CADAVID JARAMILLO	OMAR CADAVID	\N	\N	OMAR CADAVID	\N	facturacionaqp1@gmail.com	\N	\N	1
1144	\N	\N	70254938	\N	 (604) 8654138	OMAR HERNANDO VERGARA ARISTIZABAL	OMAR HERNANDO VERGARA ARISTIZABAL	\N	\N	OMAR HERNANDO VERGARA ARISTIZABAL	\N	granjaelparaiso8@gmail.com	\N	\N	1
1145	\N	\N	900492301	\N	 (000) 0000000	OMEGA ASESORES S.A.S.	OMEGA ASESORES S.A.S.	\N	\N	OMEGA ASESORES S.A.S.	\N	juanpatino1003@hotmail.com	\N	\N	1
1146	\N	\N	901325841	\N	 (000) 0000000	OPERADORA HOTELERA HGM 86 S.A.S.	OPERADORA HOTELERA HGM 86 S.A.S.	\N	\N	OPERADORA HOTELERA HGM 86 S.A.S.	\N	H9910-RE@accor.com	\N	\N	1
1147	\N	\N	901599436	\N	 (000) 0000000	ORIAG S.A.S	ORIAG S.A.S	\N	\N	ORIAG S.A.S	\N	documentos@oriag.com	\N	\N	1
1148	\N	\N	71731537	\N	 (000) 0000000	ORLANDO DE JESUS RUIZ ZAPATA	ORLANDO DE JESUS RUIZ ZAPATA	\N	\N	ORLANDO DE JESUS RUIZ ZAPATA	\N	orlandoruizzapata@hotmail.com	\N	\N	1
1149	\N	\N	8457298	\N	 (000) 0000000	ORLANDO MAYA JARAMILLO	ORLANDO MAYA JARAMILLO	\N	\N	ORLANDO MAYA JARAMILLO	\N	orlandomaya@gmail.com	\N	\N	1
1150	\N	\N	901524471	\N	 (000) 0000000	ORLANDO ZULUAGA NARANJO S.A.S	ORLANDO ZULUAGA NARANJO S.A.S	\N	\N	ORLANDO ZULUAGA NARANJO S.A.S	\N	\N	\N	\N	1
1151	\N	\N	98539617	\N	 (000) 0000000	OSCAR ALBERTO ALVAREZ AGUDELO	OSCAR ALBERTO ALVAREZ AGUDELO	\N	\N	OSCAR ALBERTO ALVAREZ AGUDELO	\N	diegomonsalveg@hotmail.com	\N	\N	1
1152	\N	\N	71718920	\N	 (000) 0000000	OSCAR ALEJANDRO PALACIO RAMIREZ	OSCAR ALEJANDRO PALACIO RAMIREZ	\N	\N	OSCAR ALEJANDRO PALACIO RAMIREZ	\N	bluewomen12@hotmail.com	\N	\N	1
1153	\N	\N	9149882	\N	 (000) 0000000	OSCAR AVILEZ MARTINEZ	OSCAR AVILEZ MARTINEZ	\N	\N	OSCAR AVILEZ MARTINEZ	\N	OSCARDJAM@GMAIL.COM	\N	\N	1
1154	\N	\N	70660826	\N	 (000) 0000000	OSCAR BETANCUR	OSCAR BETANCUR	\N	\N	OSCAR BETANCUR	\N	oscarbetancur1959@gmail.com	\N	\N	1
1155	\N	\N	6219260	\N	 (000) 0000000	OSCAR CASTAÑO RODRIGUEZ	OSCAR CASTAÑO RODRIGUEZ	\N	\N	OSCAR CASTAÑO RODRIGUEZ	\N	Administrativo@maquinariaparaplasticos.com	\N	\N	1
1156	\N	\N	70877705	\N	 (000) 0000000	OSCAR DARIO QUIROZ PARRA	OSCAR DARIO QUIROZ PARRA	\N	\N	OSCAR DARIO QUIROZ PARRA	\N	oscarquirozparra1968@gmail.com	\N	\N	1
1157	\N	\N	70926180	\N	830924	OSCAR DE JESUS MORA LOPEZ	OSCAR DE JESUS MORA LOPEZ	\N	\N	OSCAR DE JESUS MORA LOPEZ	\N	almacafetalm@hotmail.com	\N	\N	1
1158	\N	\N	15538968	\N	 (000) 0000000	OSCAR ENRIQUE GARCIA	OSCAR GARCIA	\N	\N	OSCAR GARCIA	\N	\N	\N	\N	1
1159	\N	\N	1048017161	\N	 (000) 0000000	OSCAR FERNANDO COSSIO MORENO	OSCAR FERNANDO COSSIO MORENO	\N	\N	OSCAR FERNANDO COSSIO MORENO	\N	\N	\N	\N	1
1160	\N	\N	71643979	\N	 (000) 0000000	OSCAR HOYOS GIRALDO	OSCAR HOYOS GIRALDO	\N	\N	OSCAR HOYOS GIRALDO	\N	OSCARWHG@HOTMAIL.COM	\N	\N	1
1161	\N	\N	71117642	\N	 (000) 0000000	OSCAR JARAMILLO	OSCAR JARAMILLO	\N	\N	OSCAR JARAMILLO	\N	oscardajazu@gmail.com	\N	\N	1
1162	\N	\N	8458670	\N	 (000) 0000000	OSCAR JULIO DIES	oscar julio dies	\N	\N	oscar julio dies	\N	facturacionaqp1@gmail.com	\N	\N	1
1163	\N	\N	71787567	\N	 (000) 0000000	OSCAR LEANDRO MEDINA PEREZ	OSCAR LEANDRO MEDINA PEREZ	\N	\N	OSCAR LEANDRO MEDINA PEREZ	\N	olemeperez@gmail.com	\N	\N	1
1164	\N	\N	70110322	\N	 (000) 0000000	OSCAR MANUEL MEDINA MOSCOTE	OSCAR MANUEL MEDINA MOSCOTE	\N	\N	OSCAR MANUEL MEDINA MOSCOTE	\N	omanuelmedina@gmail.com	\N	\N	1
1165	\N	\N	98668926	\N	 (000) 0000000	OSCAR MARIO BRANT MESA	OSCAR MARIO BRANT MESA	\N	\N	OSCAR MARIO BRANT MESA	\N	\N	\N	\N	1
1166	\N	\N	70136499	\N	 (000) 0000000	OSCAR NICOLAS ACEVEDO MENESES	OSCAR NICOLAS ACEVEDO MENESES	\N	\N	OSCAR NICOLAS ACEVEDO MENESES	\N	facturacionaqp1@gmail.com	\N	\N	1
1167	\N	\N	901114013	\N	 (000) 0000000	OSMOTECH S.A.S	OSMOTECH S.A.S	\N	\N	OSMOTECH S.A.S	\N	facturaosmo@gmail.com	\N	\N	1
1168	\N	\N	900948366	\N	 (000) 0000000	OSWALS CONSTRUCTORA S.A.S	OSWALS CONSTRUCTORA S.A.S	\N	\N	OSWALS CONSTRUCTORA S.A.S	\N	OSWALSCONSTRUCTORASAS@GMAIL.COM	\N	\N	1
1169	\N	\N	900824822	\N	 (000) 0000000	OXIMONTAJES Y ESTRUCTURAS J.E. S.A.S.	OXIMONTAJES Y ESTRUCTURAS J.E. S.A.S.	\N	\N	OXIMONTAJES Y ESTRUCTURAS J.E. S.A.S.	\N	oximontajes@gmail.com	\N	\N	1
1170	\N	\N	1152472344	\N	 (000) 0000000	PABLO ANGEL ZAPATA	PABLO ANGEL ZAPATA	\N	\N	PABLO ANGEL ZAPATA	\N	PABLOEYN@GMAIL.COM	\N	\N	1
1171	\N	\N	79275594	\N	 (000) 0000000	PABLO BETANCOURT NUÑEZ	PABLO BETANCOURT NUÑEZ	\N	\N	PABLO BETANCOURT NUÑEZ	\N	ventas@laleyendaagricola.com	\N	\N	1
1172	\N	\N	70321986	\N	 (000) 0000000	PABLO SUAREZ	PABLO SUAREZ	\N	\N	PABLO SUAREZ	\N	malecoqui@hotmail.com	\N	\N	1
1173	\N	\N	830037946	\N	 (000) 0000000	PANAMERICANA LIBRERIA Y PAPELERIA SA	PANAMERICANA LIBRERIA Y PAPELERIA SA	\N	\N	PANAMERICANA LIBRERIA Y PAPELERIA SA	\N	\N	\N	\N	1
1174	\N	\N	1000217585	\N	 (000) 0000000	PAOLA ALEJANDRA CORREDOR ARIAS	PAOLA ALEJANDRA CORREDOR ARIAS	\N	\N	PAOLA ALEJANDRA CORREDOR ARIAS	\N	arias15ale16@gmail.com	\N	\N	1
1175	\N	\N	900567005	\N	 (000) 0000000	PARADOR SANTA ROSA S.A.S	PARADOR SANTA ROSA S.A.S	\N	\N	PARADOR SANTA ROSA S.A.S	\N	\N	\N	\N	1
1176	\N	\N	811019197	\N	 (000) 3524873	PARCELACION PORTON DE LAS FLORES	PARCELACION PORON DE LAS FLORES	\N	\N	PARCELACION PORON DE LAS FLORES	\N	PORTONFLORES1@GMAIL.COM	\N	\N	1
1177	\N	\N	811019197	\N	\N	PARCELACION PORTON DE LAS FLORES	administracion@saimconsultoria.com	\N	\N	administracion@saimconsultoria.com	\N	administracion@saimconsultoria.com	\N	\N	1
1178	\N	\N	901697471	\N	 (000) 0000000	PASSION SILVESTRE S.A.S	PASSION SILVESTRE S.A.S	\N	\N	PASSION SILVESTRE S.A.S	\N	passionsilvestresas@gmail.com	\N	\N	1
1179	\N	\N	901578935	\N	 (000) 0000000	PASTERIA HM SAS	PASTERIA HM SAS	\N	\N	PASTERIA HM SAS	\N	pasteriahm.reciclaje@gmail.com	\N	\N	1
1180	\N	\N	32015956	\N	 (000) 0000000	PATRICIA RIOS	PATRICIA RIOS	\N	\N	PATRICIA RIOS	\N	felectronica@pestalozzi.edu.co	\N	\N	1
1181	\N	\N	1000872998	\N	 (000) 0000000	PAULINA OLAYA CARO	PAULINA OLAYA CARO	\N	\N	PAULINA OLAYA CARO	\N	\N	\N	\N	1
1182	\N	\N	901021264	\N	 (000) 0000000	PBD S.A.S	PBD S.A.S	\N	\N	PBD S.A.S	\N	finanzas@pbdinternational.com	\N	\N	1
1184	\N	\N	73140452	\N	 (000) 0000000	PEDRO ELIAS DOMINGUEZ GOMEZ	PEDRO ELIAS DOMINGUEZ GOMEZ	\N	\N	PEDRO ELIAS DOMINGUEZ GOMEZ	\N	PDOMINGUEZ0106@GMAIL.COM	\N	\N	1
1185	\N	\N	1017171245	\N	\N	PEDRO LUIS MURILLO POSADA	PEDRO LUIS MURILLO POSADA	\N	\N	PEDRO LUIS MURILLO POSADA	\N	rhacquapack@gmail.com	\N	\N	1
1186	\N	\N	15906272	\N	 (000) 0000000	PEDRO NEL RAMIREZ	PEDRO NEL RAMIREZ	\N	\N	PEDRO NEL RAMIREZ	\N	\N	\N	\N	1
1187	\N	\N	71387022	\N	 (000) 3119438	PEDRO OSCAR OCHOA DORIA	PEDRO OSCAR OCHOA DORIA	\N	\N	PEDRO OSCAR OCHOA DORIA	\N	OCHOAPEDRO477@GMAIL.COM	\N	\N	1
1188	\N	\N	1017220316	\N	 (000) 3015539924	PEDRO RAFAEL PUELLO ANAYA	PEDRO RAFAEL PUELLO ANAYA	\N	\N	PEDRO RAFAEL PUELLO ANAYA	\N	prpuelloa@gmail.com	\N	\N	1
1189	\N	\N	890912426	\N	 (000) 0000000	PEREZ Y CARDONA S.A.S	PEREZ Y CARDONA S.A.S	\N	\N	PEREZ Y CARDONA S.A.S	\N	facturaspyc@perezycardona.com.co	\N	\N	1
1190	\N	\N	901179504	\N	 (000) 0000000	PERFORACIONES SANCHEZ S.A.S	PERFORACIONES SANCHEZ S.A.S	\N	\N	PERFORACIONES SANCHEZ S.A.S	\N	perfosansas@hotmail.com	\N	\N	1
1191	\N	\N	901208315	\N	 (000) 0000000	PERSUACION SAS	PERSUACION SAS	\N	\N	PERSUACION SAS	\N	\N	\N	\N	1
1192	\N	\N	901864466	\N	 (000) 0000000	PIEFARGO GANADERIA S.A.S	PIEFARGO GANADERIA S.A.S	\N	\N	PIEFARGO GANADERIA S.A.S	\N	piefargoganaderia@gmail.com	\N	\N	1
1193	\N	\N	43550501	\N	 (000) 0000000	PILAR OCHOA CADAVID	PILAR OCHOA CADAVID	\N	\N	PILAR OCHOA CADAVID	\N	ochoa31@hotmail.com	\N	\N	1
1194	\N	\N	811015511	\N	 (000) 0000000	PISENDE S.A.S	PISENDE S.A.S	\N	\N	PISENDE S.A.S	\N	\N	\N	\N	1
1195	\N	\N	900199018	\N	 (000) 0000000	PLASTIC GROUP SAS	PLASTIC GROUP SAS	\N	\N	PLASTIC GROUP SAS	\N	comercial@plasticgroup.com.co	\N	\N	1
1196	\N	\N	830122420	\N	 (000) 0000000	PLASTICOS Y MADERAS RECICLABLES S.A.S.	PLASTICOS Y MADERAS RECICLABLES S.A.S.	\N	\N	PLASTICOS Y MADERAS RECICLABLES S.A.S.	\N	\N	\N	\N	1
1197	\N	\N	7300376701	\N	 (000) 0000000	PLASTIK SANAYI VE TICARET A.S	PLASTIK SANAYI VE TICARET A.S	\N	\N	PLASTIK SANAYI VE TICARET A.S	\N	poelsan@poelsan.com	\N	\N	1
1198	\N	\N	901143042	\N	3121762	POCES S.A.S.	\N	\N	\N	\N	\N	facturacionpoces@gmail.com	\N	\N	1
1199	\N	\N	901508774	\N	 (000) 0000000	POLISOGAS SAS	POLISOGAS SAS	\N	\N	POLISOGAS SAS	\N	polisogas@gmail.com	\N	\N	1
1200	\N	\N	901599927	\N	 (000) 0000000	PORCI MILK AGROPECUARIA S.A.S	PORCI MILK AGROPECUARIA S.A.S	\N	\N	PORCI MILK AGROPECUARIA S.A.S	\N	porcimilkagropecuaria@gmail.com	\N	\N	1
1201	\N	\N	900677166	\N	 (000) 0000000	PORCICOLA GRANJA SIERRA S.A.S.	PORCICOLA GRANJA SIERRA S.A.S.	\N	\N	PORCICOLA GRANJA SIERRA S.A.S.	\N	lasierrafactel@gmail.com	\N	\N	1
1202	\N	\N	901861340	\N	 (000) 0000000	PORCICOLA LA PALMA S.A.S	PORCICOLA LA PALMA S.A.S	\N	\N	PORCICOLA LA PALMA S.A.S	\N	porcicolapalma@gmail.com	\N	\N	1
1203	\N	\N	900293113	\N	 (00) 2765593	PORCINOS AGUALINDA S.A.S	PORCINOS AGUALINDA S.A.S	\N	\N	PORCINOS AGUALINDA S.A.S	\N	agualinda@une.net.co	\N	\N	1
1204	\N	\N	70115018	\N	 (000) 0000000	PORFIRIO MUÑOZ GRAJALES	PORFIRIO MUÑOZ GRAJALES	\N	\N	PORFIRIO MUÑOZ GRAJALES	\N	munozporfirio7@gmail.com	\N	\N	1
1205	\N	\N	900319753	\N	 (000) 0000000	PRICESMART COLOMBIA S.A.S.	PRICESMART COLOMBIA S.A.S.	\N	\N	PRICESMART COLOMBIA S.A.S.	\N	\N	\N	\N	1
1206	\N	\N	900982270	\N	 (00) 3014079714	PRINCIPE CONEJO S.A.S	PRINCIPE CONEJO S.A.S	\N	\N	PRINCIPE CONEJO S.A.S	\N	administrativo@principeconejo.com	\N	\N	1
1207	\N	\N	900982270	\N	\N	PRINCIPE CONEJO S.A.S	lordlarryposada@gmail.com	\N	\N	lordlarryposada@gmail.com	\N	lordlarryposada@gmail.com	\N	\N	1
1208	\N	\N	901040563	\N	3147937182	PRODUCTORA COLOMBIANA DE AGUACATE HASS S.A.S	\N	\N	\N	\N	\N	ofimedprocolhass@gmail.com	\N	\N	1
1209	\N	\N	890912989	\N	 (000) 0000000	PRODUCTOS I.P.B. SAS	PRODUCTOS I.P.B. SAS	\N	\N	PRODUCTOS I.P.B. SAS	\N	IPBSAS@HOTMAIL.COM	\N	\N	1
1210	\N	\N	901653671	\N	 (000) 0000000	PROMOTORA DE INVERSIONES 1992 SAS	PROMOTORA DE INVERSIONES 1992 SAS	\N	\N	PROMOTORA DE INVERSIONES 1992 SAS	\N	lagranparada92@gmail.com	\N	\N	1
1211	\N	\N	900843854	\N	 (00) 0000000	PROMOTORA DEL AGRO S.A.S	PROMOTORA DEL AGRO S.A.S	\N	\N	PROMOTORA DEL AGRO S.A.S	\N	promotora@promotoraporcina.com.co	\N	\N	1
1212	\N	\N	800249353	\N	 (000) 0000000	PROMOTORA EMPRESARIAL S.A	PROMOTORA EMPRESARIAL S.A	\N	\N	PROMOTORA EMPRESARIAL S.A	\N	facturacionpromotorasa@gmail.com	\N	\N	1
1213	\N	\N	901447652	\N	 (000) 0000000	PROMOTORA URBANICA S.A.S.	PROMOTORA URBANICA S.A.S.	\N	\N	PROMOTORA URBANICA S.A.S.	\N	contabilidad@industriales.co	\N	\N	1
1214	\N	\N	901785501	\N	 (000) 0000000	PROPIEDAD HORIZONTAL -PARCELACION LA PALMICHALA	PROPIEDAD HORIZONTAL -PARCELACION LA PALMICHALA	\N	\N	PROPIEDAD HORIZONTAL -PARCELACION LA PALMICHALA	\N	contactolapalmichala@gmail.com	\N	\N	1
1215	\N	\N	901443572	\N	 (000) 0000000	PROPIEDADES EN DESARROLLO S.A.S.	PROPIEDADES EN DESARROLLO S.A.S.	\N	\N	PROPIEDADES EN DESARROLLO S.A.S.	\N	propendesas@gmail.com	\N	\N	1
1216	\N	\N	890922294	\N	 (000) 0000000	PROTOKIMICA S.A.S.	PROTOKIMICA S.A.S.	\N	\N	PROTOKIMICA S.A.S.	\N	facturaelectronica@protokimica.com	\N	\N	1
1217	\N	\N	901576407	\N	 (00) 0000000	PROVEEDORA Y MISCELANEA LA ECONOMIA DJL S.A.S.	PROVEEDORA Y MISCELANEA LA ECONOMIA DJL S.A.S.	\N	\N	PROVEEDORA Y MISCELANEA LA ECONOMIA DJL S.A.S.	\N	laeconomiasanjuan@hotmail.com	\N	\N	1
1218	\N	\N	901388190	\N	 (000) 0000000	PROVITEX SAS	PROVITEX SAS	\N	\N	PROVITEX SAS	\N	PRODUCCIONTEX2020@GMAIL.COM	\N	\N	1
1219	\N	\N	901546894	\N	 (000) 0000000	PSINFRAESTRUCTURA S.A.S	PSINFRAESTRUCTURA S.A.S	\N	\N	PSINFRAESTRUCTURA S.A.S	\N	psinfraestructura.sas@gmail.com	\N	\N	1
1220	\N	\N	900244907	\N	 (000) 0000000	PUNTO LOGISTICO GLOBAL S.A.S.	PUNTO LOGISTICO GLOBAL S.A.S.	\N	\N	PUNTO LOGISTICO GLOBAL S.A.S.	\N	facturacion.pl@puntologistico.co	\N	\N	1
1221	\N	\N	811046789	\N	 (000) 0000000	PUNTO LOGISTICO S.A.S. EN REORGANIZACION	PUNTO LOGISTICO S.A.S. EN REORGANIZACION	\N	\N	PUNTO LOGISTICO S.A.S. EN REORGANIZACION	\N	facturacion.pl@puntologistico.co	\N	\N	1
1222	\N	\N	900224771	\N	 (000) 0000000	PVC DEL CARIBE S.A.S	PVC DEL CARIBE S.A.S	\N	\N	PVC DEL CARIBE S.A.S	\N	\N	\N	\N	1
1223	\N	\N	900505312	\N	 (000) 0000000	QUE IMPRESIONES S.A.S.	QUE IMPRESIONES S.A.S.	\N	\N	QUE IMPRESIONES S.A.S.	\N	queimpresiones@gmail.com	\N	\N	1
1224	\N	\N	811031411	\N	 (000) 0000000	QUÍMICOS J.M. S.A.S. EN REORGANIZACIÓN EMPRESARIAL	QUÍMICOS J.M. S.A.S. EN REORGANIZACIÓN EMPRESARIAL	\N	\N	QUÍMICOS J.M. S.A.S. EN REORGANIZACIÓN EMPRESARIAL	\N	\N	\N	\N	1
1225	\N	\N	71605151	\N	 (000) 0000000	RAFAEL IGNACIO MOLINA ARANGO	RAFAEL IGNACIO MOLINA ARANGO	\N	\N	RAFAEL IGNACIO MOLINA ARANGO	\N	lgilruiz@yahoo.es	\N	\N	1
1226	\N	\N	98520099	\N	 (000) 0000000	RAMIRO DE JESUS ECHAVARRIA ECHAVARRIA	RAMIRO DE JESUS ECHAVARRIA ECHAVARRIA	\N	\N	RAMIRO DE JESUS ECHAVARRIA ECHAVARRIA	\N	lazog@une.net.co	\N	\N	1
1227	\N	\N	70663404	\N	 (000) 0000000	RAMIRO HERNAN ARTEAGA GONZALEZ	RAMIRO HERNAN ARTEAGA GONZALEZ	\N	\N	RAMIRO HERNAN ARTEAGA GONZALEZ	\N	ferreteria.hnos.arteaga@gmail.com	\N	\N	1
1228	\N	\N	70049548	\N	 (00) 0000000	RAMIRO MESA MORA	RAMIRO MESA MORA	\N	\N	RAMIRO MESA MORA	\N	facturacionaqp1@gmail.com	\N	\N	1
1229	\N	\N	6788255	\N	 (000) 0000000	RAMIRO RIVERA GIRALDO	RAMIRO RIVERA GIRALDO	\N	\N	RAMIRO RIVERA GIRALDO	\N	rrivera@une.net.co	\N	\N	1
1230	\N	\N	2692726	\N	 (00) 0000000	RAMIRO STERLING OREJUELA	RAMIRO STERLING OREJUELA	\N	\N	RAMIRO STERLING OREJUELA	\N	surtimotores-facturacion@hotmail.com	\N	\N	1
1231	\N	\N	43732254	\N	 (000) 0000000	RAQUEL MORENO RUIZ	RAQUEL MORENO RUIZ	\N	\N	RAQUEL MORENO RUIZ	\N	DORAELENAMORENORUIZ@HOTMAIL.COM	\N	\N	1
1232	\N	\N	901216700	\N	 (000) 3013799087	RATTAN COLOMBIA SAS	RATTAN COLOMBIA	\N	\N	RATTAN COLOMBIA	\N	info@rattancolombia.com	\N	\N	1
1233	\N	\N	98623723	\N	 (000) 0000000	RAUL ANDRES MUÑOZ RESTREPO	RAUL ANDRES MUÑOZ RESTREPO	\N	\N	RAUL ANDRES MUÑOZ RESTREPO	\N	raulandremunozrestrepo@gmail.com	\N	\N	1
1234	\N	\N	93115631	\N	 (000) 0000000	RAUL RODRIGUEZ MENDEZ	RAUL RODRIGUEZ MENDEZ	\N	\N	RAUL RODRIGUEZ MENDEZ	\N	rrcontinental@gmail.com	\N	\N	1
1235	\N	\N	900156122	\N	 (000) 0000000	REFORESTADORA INDUSTRIAL Y COMERCIAL DE COLOMBIA S.A.S	RINNCO	\N	\N	RINNCO	\N	dbetancur@stop.com.co	\N	\N	1
1236	\N	\N	811044588	\N	 (000) 2782181	REFRACTARIOS INDUSTRIALES SAS	REFRACTARIOS	\N	\N	REFRACTARIOS	\N	rirrfacturacion@gmail.com	\N	\N	1
1237	\N	\N	901079635	\N	 (000) 0000000	RENOMAX S.A.S.	RENOMAX S.A.S.	\N	\N	RENOMAX S.A.S.	\N	renomaxsas@gmail.com	\N	\N	1
1238	\N	\N	901491223	\N	 (000) 0000000	REPARACIONES ABEL SOLDADURA Y ACCESORIOS S.A.S.	REPARACIONES ABEL SOLDADURA Y ACCESORIOS S.A.S.	\N	\N	REPARACIONES ABEL SOLDADURA Y ACCESORIOS S.A.S.	\N	reparasoldabel@gmail.com	\N	\N	1
1239	\N	\N	890932940	\N	 (000) 0000000	REPARES S.A	REPARES S.A	\N	\N	REPARES S.A	\N	repares@une.net.co	\N	\N	1
1240	\N	\N	900745652	\N	 (000) 0000000	REPUESTOS PAL HOGAR S.A.S	REPUESTOS PAL HOGAR S.A.S	\N	\N	REPUESTOS PAL HOGAR S.A.S	\N	repuestospalhogar@gmail.com	\N	\N	1
1241	\N	\N	900340364	\N	 (000) 0000000	RETROTRAC S.A.S	RETROTRAC S.A.S	\N	\N	RETROTRAC S.A.S	\N	facturacion@retrotrac.com	\N	\N	1
1242	\N	\N	1042764339	\N	 (000) 0000000	RICARDO ANDRES BERRIO OSORIO	ANDRES BERRIO	\N	\N	ANDRES BERRIO	\N	andres.140721@gmail.com	\N	\N	1
1243	\N	\N	71577793	\N	 (000) 0000000	RICARDO DE JESUS CANO BETANCUR	RICARDO DE JESUS CANO BETANCUR	\N	\N	RICARDO DE JESUS CANO BETANCUR	\N	ricarcano59@hotmail.com	\N	\N	1
1244	\N	\N	1128449072	\N	 (000) 0000000	RICARDO VALENCIA	RICARDO VALENCIA	\N	\N	RICARDO VALENCIA	\N	RICHARD.JJVALENCIA@GMAIL.COM	\N	\N	1
1245	\N	\N	70553318	\N	 (000) 0000000	RICARDO VILLA ECHAVARRIA	RICARDO VILLA ECHAVARRIA	\N	\N	RICARDO VILLA ECHAVARRIA	\N	rrivilla@hotmail.com	\N	\N	1
1246	\N	\N	71734228	\N	 (000) 0000000	RICHARD DE JESUS HERNANDEZ CARMONA	RICHARD DE JESUS HERNANDEZ CARMONA	\N	\N	RICHARD DE JESUS HERNANDEZ CARMONA	\N	\N	\N	\N	1
1247	\N	\N	80443573	\N	 (000) 0000000	RICHARD WILLIAM GAMBA REYES	RICHARD WILLIAM GAMBA REYES	\N	\N	RICHARD WILLIAM GAMBA REYES	\N	rgambar@gmail.com	\N	\N	1
1248	\N	\N	900939589	\N	 (000) 0000000	RIVANOZA S.A.S.	RIVANOZA S.A.S.	\N	\N	RIVANOZA S.A.S.	\N	\N	\N	\N	1
1249	\N	\N	71380596	\N	 (000) 0000000	ROBINSON ALEJANDRO GALVIS PARRA	ROBINSON ALEJANDRO GALVIS PARRA	\N	\N	ROBINSON ALEJANDRO GALVIS PARRA	\N	facturacionsolucioneselectricas@hotmail.com	\N	\N	1
1250	\N	\N	1015277228	\N	 (000) 0000000	ROBINSON ARLEY CANO SANCHEZ	ROBINSON ARLEY CANO SANCHEZ	\N	\N	ROBINSON ARLEY CANO SANCHEZ	\N	robinsoncanosanchez@gmail.com	\N	\N	1
1251	\N	\N	15484234	\N	 (000) 0000000	ROBINSON DE JESUS MORENO	ROBINSON DE JESUS MORENO	\N	\N	ROBINSON DE JESUS MORENO	\N	robin1152@hotmail.com	\N	\N	1
1252	\N	\N	8156084	\N	 (000) 0000000	RODOLFO ARANGO	RODOLFO ARANGO	\N	\N	RODOLFO ARANGO	\N	\N	\N	\N	1
1253	\N	\N	8252684	\N	 (000) 0000000	RODRIGO FERREIRA CAMACHO	RODRIGO FERREIRA CAMACHO	\N	\N	RODRIGO FERREIRA CAMACHO	\N	facturacionaqp1@gmail.com	\N	\N	1
1254	\N	\N	70082783	\N	 (000) 0000000	RODRIGO GOMEZ	RODRIGO GOMEZ	\N	\N	RODRIGO GOMEZ	\N	rogolotes2056@hotmail.com	\N	\N	1
1255	\N	\N	8399051	\N	8281265	RODRIGO LENIS SUCERQUIA	RODRIGO LENIS SUCERQUIA	\N	\N	RODRIGO LENIS SUCERQUIA	\N	gestiondocumentalrl@gmail.com	\N	\N	1
1256	\N	\N	70728718	\N	 (000) 0000000	RODRIGO SANCHEZ  ALVAREZ	RODRIGO SANCHEZ GARCIA	\N	\N	RODRIGO SANCHEZ GARCIA	\N	facturacionaqp1@gmail.com	\N	\N	1
1257	\N	\N	6000782006	\N	 (000) 0000000	ROGELIO ACOSTA CANO	ROGELIO ACOSTA CANO	\N	\N	ROGELIO ACOSTA CANO	\N	ABOGADOROGELIOACOSTA@GMAIL.COM	\N	\N	1
1258	\N	\N	17650380	\N	 (000) 0000000	ROGER GUARNIZO PERDOMO	ROGER GUARNIZO PERDOMO	\N	\N	ROGER GUARNIZO PERDOMO	\N	facturacionaqp1@gmail.com	\N	\N	1
1259	\N	\N	98593479	\N	 (000) 0000000	ROLANDO ALBERTO ALVAREZ GRAJALES	ROLANDO ALBERTO ALVAREZ GRAJALES	\N	\N	ROLANDO ALBERTO ALVAREZ GRAJALES	\N	rolando.alvarez@hotmail.com	\N	\N	1
1260	\N	\N	42960789	\N	 (000) 0000000	ROSA ELENA MADRID ARISTIZABAL	ROSA ELENA MADRID ARISTIZABAL	\N	\N	ROSA ELENA MADRID ARISTIZABAL	\N	servicentromargarita@gmail.com	\N	\N	1
1261	\N	\N	49737617	\N	 (000) 0000000	RUTH RUTH MARTINEZ FLOREZ	RUTH RUTH MARTINEZ FLOREZ	\N	\N	RUTH RUTH MARTINEZ FLOREZ	\N	\N	\N	\N	1
1262	\N	\N	900204934	\N	 (000) 0000000	SAC SISTEMAS DE AIRE COMPRIMIDO S.A.S	SAC SISTEMAS DE AIRE COMPRIMIDO S.A.S	\N	\N	SAC SISTEMAS DE AIRE COMPRIMIDO S.A.S	\N	gerencia@sacsistemasdeaire.com	\N	\N	1
1263	\N	\N	901838956	\N	 (000) 0000000	SALDAGRO S.A.S	SALDAGRO S.A.S	\N	\N	SALDAGRO S.A.S	\N	SALDARRI@GMAIL.COM	\N	\N	1
1264	\N	\N	1001773665	\N	 (000) 0000000	SAMUEL SÁNCHEZ LÓPEZ	SAMUEL SÁNCHEZ LÓPEZ	\N	\N	SAMUEL SÁNCHEZ LÓPEZ	\N	samuelsanchez.1206@gmail.com	\N	\N	1
1265	\N	\N	1017926098	\N	 (000) 0000000	SAMUEL VALENTIN MARIN HOYOS	SAMUL VALENTIN MARIN HOYOS	\N	\N	SAMUL VALENTIN MARIN HOYOS	\N	samuelvalentin5013@gmail.com	\N	\N	1
1266	\N	\N	901665537	\N	 (000) 0000000	SANCHO PAISA  S.A.S	SANCHO PAISA  S.A.S	\N	\N	SANCHO PAISA  S.A.S	\N	\N	\N	\N	1
1267	\N	\N	1039450735	\N	 (000) 0000000	SANDRA CAROLINA RAMIREZ LOZANO	SANDRA CAROLINA RAMIREZ LOZANO	\N	\N	SANDRA CAROLINA RAMIREZ LOZANO	\N	accarmona1274@gmail.com	\N	\N	1
1268	\N	\N	21580848	\N	 (000) 0000000	SANDRA HIGUITA HIGUITA	SANDRA HIGUITA	\N	\N	SANDRA HIGUITA	\N	sandrahelena.hh@gmail.com	\N	\N	1
1269	\N	\N	39951347	\N	 (000) 0000000	SANDRA MILENA HERNANDEZ REYES	SANDRA MILENA HERNANDEZ REYES	\N	\N	SANDRA MILENA HERNANDEZ REYES	\N	sandritallanerita25@hotmail.com	\N	\N	1
1270	\N	\N	39287284	\N	 (000) 0000000	SANDRA MILENA NAVARRO SOTELO	SANDRA MILENA NAVARRO SOTELO	\N	\N	SANDRA MILENA NAVARRO SOTELO	\N	agromateriales2005@gmail.com	\N	\N	1
1271	\N	\N	901139599	\N	 (000) 0000000	SANTA COLINA S.A.S	SANTA COLINA S.A.S	\N	\N	SANTA COLINA S.A.S	\N	mesalili@yahoo.com	\N	\N	1
1272	\N	\N	1074714372	\N	\N	SANTIAGO ALEXANDER ALVAREZ PEÑA	SANTIAGO ALEXANDER ALVAREZ PEÑA	\N	\N	SANTIAGO ALEXANDER ALVAREZ PEÑA	\N	acquapack@acquapackcolombia.com	\N	\N	1
1273	\N	\N	1152706467	\N	 (000) 0000000	SANTIAGO ARIAS	SANTIAGO ARIS	\N	\N	SANTIAGO ARIS	\N	\N	\N	\N	1
1274	\N	\N	1000559329	\N	 (000) 0000000	SANTIAGO ARIAS JARAMILLO	SANTIAGO ARIAS JARAMILLO	\N	\N	SANTIAGO ARIAS JARAMILLO	\N	\N	\N	\N	1
1275	\N	\N	1007254008	\N	 (000) 0000000	SANTIAGO ARROYBE BETANCUR	SANTIAGO ARROYBE BETANCUR	\N	\N	SANTIAGO ARROYBE BETANCUR	\N	sbetancur@gmail.com	\N	\N	1
1276	\N	\N	1001774082	\N	 (000) 0000000	SANTIAGO CORREA HIJUELOS	SANTIAGO CORREA HIJUELOS	\N	\N	SANTIAGO CORREA HIJUELOS	\N	santiagohijuelos22@gmail.com	\N	\N	1
1277	\N	\N	1060591286	\N	 (000) 0000000	SANTIAGO GIRALDO GIRALDO	SANTIAGO GIRALDO GIRALDO	\N	\N	SANTIAGO GIRALDO GIRALDO	\N	santi-0106@hotmail.com	\N	\N	1
1278	\N	\N	15389375	\N	 (000) 0000000	SANTIAGO MORENO HERNANDEZ	SANTIAGO MORENO HERNANDEZ	\N	\N	SANTIAGO MORENO HERNANDEZ	\N	santimho@gmail.com	\N	\N	1
1279	\N	\N	1001414371	\N	 (000) 0000000	SANTIAGO PEREZ LONDOÑO	SANTIAGO PEREZ LONDOÑO	\N	\N	SANTIAGO PEREZ LONDOÑO	\N	facturacionaqp1@gmail.com	\N	\N	1
1280	\N	\N	100090310	\N	 (000) 0000000	SANTIAGO RAMIREZ CAICEDO	SANTIAGO RAMIREZ CAICEDO	\N	\N	SANTIAGO RAMIREZ CAICEDO	\N	santiramirez947@gmail.com	\N	\N	1
1281	\N	\N	1000752092	\N	 (000) 0000000	SANTIAGO USUGA PEREZ	SANTIAGO USUGA PEREZ	\N	\N	SANTIAGO USUGA PEREZ	\N	santiagousuga12@gmail.com	\N	\N	1
1282	\N	\N	900219098	\N	 (000) 0000000	SANXEL INGENIERIA S.A.S.	SANXEL	\N	\N	SANXEL	\N	sanxelfacturacion@gmail.com	\N	\N	1
1283	\N	\N	1017172343	\N	 (000) 0000000	SARA ARTEAGA ALVAREZ	SARA ARTEAGA ALVAREZ	\N	\N	SARA ARTEAGA ALVAREZ	\N	saris489@gmail.com	\N	\N	1
1284	\N	\N	1000413274	\N	 (000) 0000000	SARA MARIA HERNANDEZ GUERRA	SARA MARIA HERNANDEZ GUERRA	\N	\N	SARA MARIA HERNANDEZ GUERRA	\N	smhguerra2802@gmail.com	\N	\N	1
1285	\N	\N	900186343	\N	 (000) 0000000	SARO RESTREPO S.A.S	SARO RESTREPO	\N	\N	SARO RESTREPO	\N	jfsalda@gmail.com	\N	\N	1
1286	\N	\N	70509063	\N	 (000) 0000000	SAULO ANTONIO PEREZ PENAGOS	SAULO ANTONIO PEREZ PENAGOS	\N	\N	SAULO ANTONIO PEREZ PENAGOS	\N	\N	\N	\N	1
1287	\N	\N	900734628	\N	 (000) 0000000	SEAL GASKET COMPANY S.A.S	SEAL GASKET COMPANY S.A.S	\N	\N	SEAL GASKET COMPANY S.A.S	\N	rgambar@gmail.com	\N	\N	1
1288	\N	\N	1026141639	\N	 (000) 0000000	SEBASTIAN ANDRES VILLA ARANGO	SEBASTIAN ANDRES VILLA ARANGO	\N	\N	SEBASTIAN ANDRES VILLA ARANGO	\N	ANGELICAVILLACD@GMAIL.COM	\N	\N	1
1289	\N	\N	1193137485	\N	\N	SEBASTIAN DE OSSA ARISTIZABAL	SEBASTIAN DE OSSA ARISTIZABAL	\N	\N	SEBASTIAN DE OSSA ARISTIZABAL	\N	deossasebastian20@gmail.com	\N	\N	1
1290	\N	\N	71269633	\N	 (000) 2514750	SEBASTIAN DIEZ MORENO	SEBASTIAN DIEZ MORENO	\N	\N	SEBASTIAN DIEZ MORENO	\N	alejapinor96@hotmail.com	\N	\N	1
1291	\N	\N	1000746727	\N	 (000) 3505451455	SEBASTIAN GOMEZ ROJAS	SEBASTIAN GOMEZ ROJAS	\N	\N	SEBASTIAN GOMEZ ROJAS	\N	CARNES.SEBASTIANROJAS@GMAIL.COM	\N	\N	1
1292	\N	\N	1000746727	\N	\N	SEBASTIAN GOMEZ ROJAS	SEBASTIAN ROJAS	\N	\N	SEBASTIAN ROJAS	\N	CARNES.SEBASTIANROJAS@GMAIL.COM	\N	\N	1
1293	\N	\N	1037622255	\N	 (000) 0000000	SEBASTIAN GUTIERREZ SUAREZ	SEBASTIAN GUTIERREZ SUAREZ	\N	\N	SEBASTIAN GUTIERREZ SUAREZ	\N	facturacionaqp1@gmail.com	\N	\N	1
1294	\N	\N	1007237709	\N	 (000) 0000000	SEBASTIAN MORA MEJIA	SEBASTIAN MORA MEJIA	\N	\N	SEBASTIAN MORA MEJIA	\N	sebasmoramejia05@gmail.com	\N	\N	1
1295	\N	\N	8356236	\N	 (000) 0000000	SEBASTIAN OSPINA GONZALEZ	SEBASTIAN OSPINA GONZALEZ	\N	\N	SEBASTIAN OSPINA GONZALEZ	\N	JINN1903@GMAIL.COM	\N	\N	1
1296	\N	\N	1035865045	\N	 (000) 0000000	SEBASTIAN RUIZ BALBUENA	SEBASTIAN RUIZ BALBUENA	\N	\N	SEBASTIAN RUIZ BALBUENA	\N	SEBAS280793@GMAIL.COM	\N	\N	1
1297	\N	\N	901480842	\N	 (00) 0000000	SEMBRADOS Y FRUTAS VALLE ALTO S.A.S	SEMBRADOS Y FRUTAS VALLE ALTO S.A.S	\N	\N	SEMBRADOS Y FRUTAS VALLE ALTO S.A.S	\N	vallealto21@gmail.com	\N	\N	1
1298	\N	\N	901547500	\N	 (000) 0000000	SEMEN CARDONA COLOMBIA S.A.S	SEMEN CARDONA COLOMBIA S.A.S	\N	\N	SEMEN CARDONA COLOMBIA S.A.S	\N	CIACOLOMBIA@SEMENCARDONA.COM	\N	\N	1
1299	\N	\N	98523215	\N	 (000) 0000000	SERGIO CARDONA	SERGIO CARDONA	\N	\N	SERGIO CARDONA	\N	sercarm68@gmail.com	\N	\N	1
1300	\N	\N	8319220	\N	 (000) 0000000	SERGIO GARCIA HERNANDEZ	SERGIO GARCIA HERNANDEZ	\N	\N	SERGIO GARCIA HERNANDEZ	\N	jgarcia1938@gmail.com	\N	\N	1
1301	\N	\N	71193309	\N	\N	SERGIO HERMINSON ZAPATA ZAPATA	SERGIO HERMINSON ZAPATA ZAPATA	\N	\N	SERGIO HERMINSON ZAPATA ZAPATA	\N	sergiozapa.co@gmail.com	\N	\N	1
1302	\N	\N	98631391	\N	 (000) 0000000	SERGIO IVAN MOLINA MOLINA	SERGIO IVAN MOLINA MOLINA	\N	\N	SERGIO IVAN MOLINA MOLINA	\N	sergioivan.molina@hotmail.com	\N	\N	1
1303	\N	\N	3593830	\N	 (000) 0000000	SERGIO PINZON	SERGIO PINZON	\N	\N	SERGIO PINZON	\N	sejole@gmail.com	\N	\N	1
1304	\N	\N	901556211	\N	 (000) 0000000	SERNA BOTERO S.A.S.	SERNA BOTERO S.A.S.	\N	\N	SERNA BOTERO S.A.S.	\N	hotellaleyenda1860@gmail.com	\N	\N	1
1305	\N	\N	901553054	\N	 (00) 3148470234	SERVIAGRO YARUMAL ANT ZOMAC S.A.S	SERVIAGRO YARUMAL ANT ZOMAC S.A.S	\N	\N	SERVIAGRO YARUMAL ANT ZOMAC S.A.S	\N	recepcion.fecompras@gmail.com	\N	\N	1
1306	\N	\N	901200609	\N	 (000) 0000000	SERVICIOS DE INGENIERIA S.A.S	ISABEL MUÑOZ	\N	\N	ISABEL MUÑOZ	\N	FACTURACIONCIDSAS@GMAIL.COM	\N	\N	1
1307	\N	\N	890933726	\N	 (000) 0000000	SERVICIOS MEDICOS SAN IGNACIO SAS	SERVICIOS MEDICOS SAN IGNACIO SAS	\N	\N	SERVICIOS MEDICOS SAN IGNACIO SAS	\N	smsi@smsi.com.co	\N	\N	1
1308	\N	\N	901085534	\N	 (000) 0000000	SERVICIOS PORTUARIOS INTERNACIONALES SAS	SERVICIOS PORTUARIOS INTERNACIONALES SAS	\N	\N	SERVICIOS PORTUARIOS INTERNACIONALES SAS	\N	FINANCIERA@SERVIPORTUARIOS.COM	\N	\N	1
1309	\N	\N	901312338	\N	 (000) 0000000	SERVICOMPRESORES J.D S.A.S	SERVICOMPRESORES J.D S.A.S	\N	\N	SERVICOMPRESORES J.D S.A.S	\N	servicompresores@gmail.com	\N	\N	1
1310	\N	\N	800134939	\N	 (000) 0000000	SERVICREDITO S.A	SERVICREDITO S.A	\N	\N	SERVICREDITO S.A	\N	direccioncontable@servicredito.com.co	\N	\N	1
1311	\N	\N	860512330	\N	 (000) 0000000	SERVIENTREGA S.A	SERVIENTREGA S.A	\N	\N	SERVIENTREGA S.A	\N	\N	\N	\N	1
1312	\N	\N	901691522	\N	 (00) 0000000	SERVIGIL LOGISTICA SAS	SERVIGIL LOGISTICA SAS	\N	\N	SERVIGIL LOGISTICA SAS	\N	CONTACTO@SERVIGIL.COM	\N	\N	1
1313	\N	\N	811015158	\N	 (000) 0000000	SHIRLEY ZULUAGA SALAZAR Y CIA S.A.S.	SHIRLEY ZULUAGA SALAZAR Y CIA S.A.S.	\N	\N	SHIRLEY ZULUAGA SALAZAR Y CIA S.A.S.	\N	\N	\N	\N	1
1314	\N	\N	900400177	\N	 (000) 0000000	SICON SOCIEDAD POR ACCIONES SIMPLIFICADA	NORMA	\N	\N	NORMA	\N	contabilidad@gruposicol.com.co	\N	\N	1
1315	\N	\N	890980084	\N	 (000) 0000000	SIERVAS DEL SANTISIIMO Y DE LA CARIDAD	SIERVAS DEL SANTISIIMO Y DE LA CARIDAD	\N	\N	SIERVAS DEL SANTISIIMO Y DE LA CARIDAD	\N	hogarsanjose19@gmail.com	\N	\N	1
1316	\N	\N	901237330	\N	 (000) 0000000	SIGMAPLASTICOS MEDELLIN SAS	SIGMAPLASTICOS MEDELLIN SAS	\N	\N	SIGMAPLASTICOS MEDELLIN SAS	\N	\N	\N	\N	1
1317	\N	\N	900196000	\N	 (000) 0000000	SIHELEC S.A.S	SIHELS S.A.S	\N	\N	SIHELS S.A.S	\N	sihelecsa@yahoo.com	\N	\N	1
1318	\N	\N	830048145	\N	 (000) 5802606	SIIGO S.A. S	SIIGO S.A. S	\N	\N	SIIGO S.A. S	\N	reclamaciones@siigo.com	\N	\N	1
1319	\N	\N	901532204	\N	 (000) 0000000	SISTEMAS HIDRÁULICOS Y NEUMÁTICOS S.A.S.	SISTEMAS HIDRÁULICOS Y NEUMÁTICOS S.A.S.	\N	\N	SISTEMAS HIDRÁULICOS Y NEUMÁTICOS S.A.S.	\N	sishidraulicosyneumaticos@gmail.com	\N	\N	1
1320	\N	\N	901611304	\N	3188705954	SOCIEDAD AGROPECUARIA DEL OCCIDENTE ANTIOQUEÑO S.A.S.	\N	\N	\N	\N	\N	contabilidad.hassgardens@gmail.com	\N	\N	1
1321	\N	\N	901744110	\N	 (000) 0000000	SOCIEDAD AGROPECUARIA RIOYUMA S.A.S	SOCIEDAD AGROPECUARIA RIOYUMA S.A.S	\N	\N	SOCIEDAD AGROPECUARIA RIOYUMA S.A.S	\N	info@agroyuma.com	\N	\N	1
1322	\N	\N	901922181	\N	 (000) 0000000	SOCIEDAD APIQUE LAS DELICIAS S.A.S.	SOCIEDAD APIQUE LAS DELICIAS S.A.S.	\N	\N	SOCIEDAD APIQUE LAS DELICIAS S.A.S.	\N	sociedadapiquelasdelicias@gmail.com	\N	\N	1
1323	\N	\N	900082011	\N	 (000) 0000000	SOCIEDAD HERRERA Y CIA SAS	SOCIEDAD HERRERA Y CIA SAS	\N	\N	SOCIEDAD HERRERA Y CIA SAS	\N	CONTABILIDAD@GANADERIAPRADO.COM	\N	\N	1
1324	\N	\N	900884924	\N	 (000) 0000000	SOCIEDAD HOTELETA COUNTRY SAS	SOCIEDAD HOTELETA COUNTRY SAS	\N	\N	SOCIEDAD HOTELETA COUNTRY SAS	\N	MIFACTURA.BARRANQUILLA@BHHOTELES.COM	\N	\N	1
1325	\N	\N	901693999	\N	 (000) 0000000	SOCIEDAD INVERSIONES RAE S.A.S	SOCIEDAD INVERSIONES RAE S.A.S	\N	\N	SOCIEDAD INVERSIONES RAE S.A.S	\N	rafajara1234@gmail.com	\N	\N	1
1326	\N	\N	900969356	\N	 (000) 0000000	SOCIEDAD MINERA TRES Y MEDIA S.A.S	SOCIEDAD MINERA TRES Y MEDIA S.A.S	\N	\N	SOCIEDAD MINERA TRES Y MEDIA S.A.S	\N	smineratresymedia@gmail.com	\N	\N	1
1327	\N	\N	900969356	\N	\N	SOCIEDAD MINERA TRES Y MEDIA S.A.S	Smineratresymedia@gmail.com	\N	\N	Smineratresymedia@gmail.com	\N	Smineratresymedia@gmail.com	\N	\N	1
1328	\N	\N	901201160	\N	 (000) 0000000	SOCIEDAD PORCICOLA LA UNION SAS	SOCIEDAD PORCICOLA LA UNION SAS	\N	\N	SOCIEDAD PORCICOLA LA UNION SAS	\N	CONTABILIDADSPLU@GMAIL.COM	\N	\N	1
1329	\N	\N	800200969	\N	 (00) 0000000	SOCIEDAD PORTUARIA REGIONAL DE CARTAGENA S.A.	SOCIEDAD PORTUARIA REGIONAL DE CARTAGENA S.A.	\N	\N	SOCIEDAD PORTUARIA REGIONAL DE CARTAGENA S.A.	\N	\N	\N	\N	1
1330	\N	\N	811006516	\N	\N	SOCIEDAD TRANSPORTADORA DE URRAO S.A.S	SOCIEDAD TRANSPORTADORA DE URRAO S.A.S	\N	\N	SOCIEDAD TRANSPORTADORA DE URRAO S.A.S	\N	sotraursa@hotmail.com	\N	\N	1
1331	\N	\N	800242106	\N	 (000) 0000000	SODIMAC COLOMBIA S.A	SODIMAC COLOMBIA S.A	\N	\N	SODIMAC COLOMBIA S.A	\N	\N	\N	\N	1
1332	\N	\N	900802615	\N	 (000) 0000000	SOLARPLUS ENERGY SAS	SOLARPLUS ENERGY SAS	\N	\N	SOLARPLUS ENERGY SAS	\N	\N	\N	\N	1
1333	\N	\N	901815274	\N	 (000) 0000000	SOLOPERACIONES S.A.S.	SOLOPERACIONES S.A.S.	\N	\N	SOLOPERACIONES S.A.S.	\N	soloperaciones@hotmail.com	\N	\N	1
1334	\N	\N	900501401	\N	 (000) 0000000	SOLU FERRETEROS S.A.S	SOLU FERRETEROS S.A.S	\N	\N	SOLU FERRETEROS S.A.S	\N	\N	\N	\N	1
1335	\N	\N	900906969	\N	 (000) 0000000	SOLUCIONES EN SEGURIDAD Y SALUD EN EL TRABAJO S3 SAS	SOLUCIONES EN SEGURIDAD Y SALUD EN EL TRABAJO S3 SAS	\N	\N	SOLUCIONES EN SEGURIDAD Y SALUD EN EL TRABAJO S3 SAS	\N	carteras3soluciones@gmail.com	\N	\N	1
1336	\N	\N	901171483	\N	 (000) 0000000	SOLUCIONES INTEGRALES EN CONSTRUCCION CALI SOCIEDAD POR ACCIONES SIMPLIFICADA	SOLUCIONES INTEGRALES EN CONSTRUCCION CALI SOCIEDAD POR ACCIONES SIMPLIFICADA	\N	\N	SOLUCIONES INTEGRALES EN CONSTRUCCION CALI SOCIEDAD POR ACCIONES SIMPLIFICADA	\N	contabilidad@gruposicol.com.co	\N	\N	1
1337	\N	\N	901069569	\N	 (000) 0000000	SOLUCIONES PLASTICAS MARCAR SAS	SOLUCIONES PLASTICAS MARCAR SAS	\N	\N	SOLUCIONES PLASTICAS MARCAR SAS	\N	sjoyce769@gmail.com	\N	\N	1
1338	\N	\N	901092411	\N	 (000) 0000000	SOLUCIONES Y MANEJO EMPRESARIAL SAS	SOLUCIONES Y MANEJO EMPRESARIAL SAS	\N	\N	SOLUCIONES Y MANEJO EMPRESARIAL SAS	\N	solucionesymanejoemp@gmail.com	\N	\N	1
1339	\N	\N	43608431	\N	3247936	SONIA CEBALLOS ORREGO	SONIA CEBALLOS ORREGO	\N	\N	SONIA CEBALLOS ORREGO	\N	soniaco0314@gmail.com	\N	\N	1
1340	\N	\N	21250064	\N	 (000) 0000000	SONIA GUTIERREZ CASTRO	SONIA GUTIERREZ CASTRO	\N	\N	SONIA GUTIERREZ CASTRO	\N	sandraatenea@hotmail.com	\N	\N	1
1341	\N	\N	1001813013	\N	 (000) 0000000	STIVEN MEDINA TORRES	STIVEN MEDINA TORRES	\N	\N	STIVEN MEDINA TORRES	\N	\N	\N	\N	1
1342	\N	\N	811013257	\N	 (000) 0000000	SUMINISTROS NEUMATICOS S.A.S.	SUMINISTROS NEUMATICOS S.A.S.	\N	\N	SUMINISTROS NEUMATICOS S.A.S.	\N	ventas@suministrosneumaticos.com.co	\N	\N	1
1343	\N	\N	900943243	\N	 (000) 0000000	SURAMERICA COMERCIAL S.A.S	SURAMERICA COMERCIAL S.A.S	\N	\N	SURAMERICA COMERCIAL S.A.S	\N	facturaelectronicacolombia@dollarcity.com	\N	\N	1
1344	\N	\N	890903407	\N	 (000) 0000000	Suramericana	Suramericana	\N	\N	Suramericana	\N	\N	\N	\N	1
1345	\N	\N	900012357	\N	 (000) 0000000	SUROMOTOS S.A.	SUROMOTOS S.A.	\N	\N	SUROMOTOS S.A.	\N	suromotos@yahoo.com	\N	\N	1
1346	\N	\N	900223651	\N	 (000) 0000000	SYSTEMATIZED SHEET METAL ENGINEERING S.A.S	SYSTEMATIZED SHEET METAL ENGINEERING S.A.S	\N	\N	SYSTEMATIZED SHEET METAL ENGINEERING S.A.S	\N	contabilidad@ess.com.co	\N	\N	1
1347	\N	\N	811044793	\N	 (000) 0000000	TAPICERIA JAIROS Y CIA LTDA	TAPICERIA JAIROS Y CIA LTDA	\N	\N	TAPICERIA JAIROS Y CIA LTDA	\N	\N	\N	\N	1
1348	\N	\N	1007227784	\N	 (000) 0000000	TATIANA DE LA PAVA PULGARIN	TATIANA DE LA PAVA PULGARIN	\N	\N	TATIANA DE LA PAVA PULGARIN	\N	\N	\N	\N	1
1349	\N	\N	860016640	\N	 (000) 0000000	TCC SAS	TCC SAS	\N	\N	TCC SAS	\N	\N	\N	\N	1
1350	\N	\N	900929914	\N	 (000) 0000000	TECNI LAVAR S.A.S.	TECNI LAVAR S.A.S.	\N	\N	TECNI LAVAR S.A.S.	\N	info@tecnilavar.com	\N	\N	1
1351	\N	\N	800004326	\N	 (000) 0000000	TECNIBOMBAS S.A.S.	TECNIBOMBAS S.A.S.	\N	\N	TECNIBOMBAS S.A.S.	\N	tecnibombas2010@hotmail.com	\N	\N	1
1352	\N	\N	890914432	\N	 (000) 0000000	TECNICAS GUILLERMO ALVAREZ PELAEZ LIMITADA	TECNICAS GUILLER	\N	\N	TECNICAS GUILLER	\N	tecnigal@tecnigal.com.co	\N	\N	1
1353	\N	\N	890927088	\N	 (000) 0000000	TECNI-GAS S.A.S	TECNI-GAS S.A.S	\N	\N	TECNI-GAS S.A.S	\N	contacto@tecnigas.co	\N	\N	1
1354	\N	\N	70056000	\N	 (000) 0000000	TECNIMOTORES	TECNIMOTORES	\N	\N	TECNIMOTORES	\N	pausgon52@gmail.com	\N	\N	1
1355	\N	\N	811000784	\N	 (000) 0000000	TERMINAL SUR DE MEDELLIN PH	TERMINAL SUR DE MEDELLIN PH	\N	\N	TERMINAL SUR DE MEDELLIN PH	\N	\N	\N	\N	1
1356	\N	\N	900813618	\N	 (000) 0000000	TESTLAB LABORATORIO ANALISIS ALIMENTOS Y AGUAS SAS	TESTLAB LABORATORIO ANALISIS ALIMENTOS Y AGUAS SAS	\N	\N	TESTLAB LABORATORIO ANALISIS ALIMENTOS Y AGUAS SAS	\N	COMERCIAL@TESTLAB-LABORATORIO.COM	\N	\N	1
1357	\N	\N	900698570	\N	 (000) 0000000	THE PARKING S.A.S	THE PARKING S.A.S	\N	\N	THE PARKING S.A.S	\N	cartera@theparking.com.co	\N	\N	1
1358	\N	\N	890929922	\N	 (000) 0000000	TIENDAS S.A.	TIENDAS S.A.	\N	\N	TIENDAS S.A.	\N	financiera.tiendas@gmail.com	\N	\N	1
1359	\N	\N	811028262	\N	4139528	TIERRA PASTOS & GANADO LTDA	\N	\N	\N	\N	\N	tierrapastosygana@gmail.com	\N	\N	1
1360	\N	\N	901730598	\N	 (00) 0000000	T-LAVA S.A.S	T-LAVA S.A.S	\N	\N	T-LAVA S.A.S	\N	contabilidadtlava@gmail.com	\N	\N	1
1361	\N	\N	900252156	\N	 (000) 0000000	TODO EN ARTES S.A.S	TODO EN ARTES S.A.S	\N	\N	TODO EN ARTES S.A.S	\N	\N	\N	\N	1
1362	\N	\N	811045694	\N	 (000) 0000000	TODOVALVULAS  S.A.S.	TODOVALVULAS  S.A.S.	\N	\N	TODOVALVULAS  S.A.S.	\N	fe@todovalvulas.com	\N	\N	1
1363	\N	\N	8157285	\N	 (000) 0000000	TOMAS FELIPE ZAPATA CORREA	TOMAS FELIPE ZAPATA CORREA	\N	\N	TOMAS FELIPE ZAPATA CORREA	\N	logisticaaqp3@gmail.com	\N	\N	1
1364	\N	\N	901528097	\N	 (00) 0000000	TOMATERA GAVIRIA URREA S.A.S	TOMATERA GAVIRIA URREA S.A.S	\N	\N	TOMATERA GAVIRIA URREA S.A.S	\N	tomateragaviriaurrea@gmail.com	\N	\N	1
1365	\N	\N	800112440	\N	 (000) 0000000	TORNILLOS Y PARTES PLAZA S.A.	TORNILLOS Y PARTES PLAZA S.A.	\N	\N	TORNILLOS Y PARTES PLAZA S.A.	\N	pvmedellin@tornillosypartes.com	\N	\N	1
1366	\N	\N	901605592	\N	 (000) 0000000	TPG LUPE SAS	TPG LUPE SAS	\N	\N	TPG LUPE SAS	\N	\N	\N	\N	1
1367	\N	\N	800241469	\N	 (000) 0000000	TRANSBORDER S A S	TRANSBORDER S A S	\N	\N	TRANSBORDER S A S	\N	facturaelectronicavalpre@ptesa.com	\N	\N	1
1368	\N	\N	901850260	\N	 (000) 0000000	TRANSFORMADORES VASQUEZ S.A.S	TRANSFORMADORES VASQUEZ S.A.S	\N	\N	TRANSFORMADORES VASQUEZ S.A.S	\N	transformadoresvasquezsas@gmail.com	\N	\N	1
1369	\N	\N	890301067	\N	 (000) 0000000	TRANSPORTADORA LA PRENSA DEL VALLE S,A,S	TRANSPORTADORA LA PRENSA DEL VALLE S,A,S	\N	\N	TRANSPORTADORA LA PRENSA DEL VALLE S,A,S	\N	TRANSPRENSA@TRANSPRENSA.COM.CO	\N	\N	1
1370	\N	\N	900393742	\N	 (000) 0000000	TRANSPORTES CI S.A.S.	TRANSPORTES CI S.A.S.	\N	\N	TRANSPORTES CI S.A.S.	\N	facturas@transportesci.com.co	\N	\N	1
1371	\N	\N	890902875	\N	 (000) 0000000	TRANSPORTES RAPIDO OCHOA SA	TRANSPORTES RAPIDO OCHOA SA	\N	\N	TRANSPORTES RAPIDO OCHOA SA	\N	\N	\N	\N	1
1372	\N	\N	890920990	\N	 (000) 0000000	TRANSPORTES SAFERBO S.A	TRANSPORTES SAFERBO S.A	\N	\N	TRANSPORTES SAFERBO S.A	\N	correorespuesta@factureinbox.co	\N	\N	1
1373	\N	\N	830058315	\N	 (000) 0000000	TREFILADOS DE COLOMBIA S.A.S	TREFILADOS DE COLOMBIA S.A.S	\N	\N	TREFILADOS DE COLOMBIA S.A.S	\N	\N	\N	\N	1
1374	\N	\N	901267083	\N	 (000) 0000000	TRUCHAS DE ANTIOQUIA S.A.S	TRUCHAS DE ANTIOQUIA S.A.S	\N	\N	TRUCHAS DE ANTIOQUIA S.A.S	\N	TRUCHASANTIOQUIA2019@gmail.com	\N	\N	1
1375	\N	\N	900092385	\N	 (000) 4444115	UNE EPM TELECOMUNICACIONES S.A.	UNE EPM TELECOMUNICACIONES S.A.	\N	\N	UNE EPM TELECOMUNICACIONES S.A.	\N	info@info.tigo.com.co	\N	\N	1
1376	\N	\N	890913861	\N	 (000) 0000000	UNIFORMES INDUSTRIALES ROPA Y CALZADO QUIN LOP S.A.S	UNIFORMES INDUSTRIALES ROPA Y CALZADO QUIN LOP S.A	\N	\N	UNIFORMES INDUSTRIALES ROPA Y CALZADO QUIN LOP S.A	\N	secreventas@uniroca.com	\N	\N	1
1377	\N	\N	901753512	\N	 (000) 0000000	UNION CADISA S.A.S	UNION CADISA S.A.S	\N	\N	UNION CADISA S.A.S	\N	unioncadisa@gmail.com	\N	\N	1
1378	\N	\N	901896023	\N	 (000) 0000000	UNION TEMPORAL ESPACIOS DEPORTIVOS DEL NORTE UTED	UNION TEMPORAL ESPACIOS DEPORTIVOS DEL NORTE UTED	\N	\N	UNION TEMPORAL ESPACIOS DEPORTIVOS DEL NORTE UTED	\N	uniontemporaluted@gmail.com	\N	\N	1
1379	\N	\N	900947845	\N	 (000) 0000000	UNIVERSO FERRETERO RPJ S.A.S	UNIVERSO FERRETERO RPJ S.A.S	\N	\N	UNIVERSO FERRETERO RPJ S.A.S	\N	contabilidad@universoferreterorpj.com	\N	\N	1
1380	\N	\N	901485741	\N	 (000) 0000000	UPM LA ROCA S.A.S	UPM LA ROCA S.A.S	\N	\N	UPM LA ROCA S.A.S	\N	UPMLAROCA@GMAIL.COM	\N	\N	1
1381	\N	\N	900400551	\N	 (000) 0000000	UPS SERVICIOS EXPRESOS S.A.S.	UPS SERVICIOS EXPRESOS S.A.S.	\N	\N	UPS SERVICIOS EXPRESOS S.A.S.	\N	contactcenter@ups.com	\N	\N	1
1382	\N	\N	8064278	\N	 (000) 0000000	URIEL BAUTISTA LONDOÑO RAIGOZA	URIEL BAUTISTA LONDOÑO RAIGOZA	\N	\N	URIEL BAUTISTA LONDOÑO RAIGOZA	\N	urielbautista278@hotmail.com	\N	\N	1
1383	\N	\N	71620184	\N	 (000) 0000000	URIEL JOSE ALZATE RENDON	URIEL JOSE ALZATE RENDON	\N	\N	URIEL JOSE ALZATE RENDON	\N	HERRAMIENTA.UJAR@GMAIL.COM	\N	\N	1
1384	\N	\N	900625814	\N	 (000) 0000000	V Y P CONSTRUCCIONES S.A.S	V Y P CONSTRUCCIONES S.A.S	\N	\N	V Y P CONSTRUCCIONES S.A.S	\N	CONTABILIDAD@VYPCONSTRUCCIONES.COM	\N	\N	1
1385	\N	\N	900792157	\N	 (000) 0000000	VALECAR S.A.S	VALECAR S.A.S VALECAR S.A.S	\N	\N	VALECAR S.A.S VALECAR S.A.S	\N	EDS.LA33@TERPEL.COM	\N	\N	1
1386	\N	\N	900478207	\N	 (000) 0000000	VALHOR INVERSIONES S.A.S	VALHOR INVERSIONES S.A.S	\N	\N	VALHOR INVERSIONES S.A.S	\N	\N	\N	\N	1
1387	\N	\N	1045021049	\N	 (000) 0000000	VANESSA ARISTIZABAL GOMEZ	VANESSA ARISTIZABAL GOMEZ	\N	\N	VANESSA ARISTIZABAL GOMEZ	\N	CONTABILIDADCREACIONESVAG@GMAIL.COM	\N	\N	1
1388	\N	\N	900826964	\N	 (000) 0000000	VANTU CONSULTORES S.A.S	VANTU CONSULTORES S.A.S	\N	\N	VANTU CONSULTORES S.A.S	\N	CONTACTO@VANTU.COM.CO	\N	\N	1
1389	\N	\N	841000033	\N	8272035	VELEZ SUAREZ Y COMPAÑIA LTDA	\N	\N	\N	\N	\N	velezsuarezycia@hotmail.com	\N	\N	1
1390	\N	\N	1035235834	\N	\N	VERONICA GARCIA SALAZAR	VERONICA GARCIA SALAZAR	\N	\N	VERONICA GARCIA SALAZAR	\N	veronicagarciasalazar46@gmail.com	\N	\N	1
1391	\N	\N	70827128	\N	 (000) 0000000	VICTOR ALONSO GOMEZ ARISTIZABAL	VICTOR ALONSO GOMEZ ARISTIZABAL	\N	\N	VICTOR ALONSO GOMEZ ARISTIZABAL	\N	feninolandia@gmail.com	\N	\N	1
1392	\N	\N	1017204384	\N	 (000) 0000000	Victor Hugo Galvez Sanchez	Victor Hugo Galvez Sanchez	\N	\N	Victor Hugo Galvez Sanchez	\N	victorhugo.galvez@hotmail.com	\N	\N	1
1393	\N	\N	70109540	\N	 (000) 0000000	victor hugo ramirez	victor hugo ramirez	\N	\N	victor hugo ramirez	\N	TORVI1257@GMAIL.COM	\N	\N	1
1394	\N	\N	901471940	\N	 (000) 0000000	VITRICRISTALES SAS	VITRICRISTALES SAS	\N	\N	VITRICRISTALES SAS	\N	\N	\N	\N	1
1395	\N	\N	1128453570	\N	 (000) 0000000	VIVIANA BUSTAMANTE ESCOBAR	VIVIANA BUSTAMANTE ESCOBAR	\N	\N	VIVIANA BUSTAMANTE ESCOBAR	\N	viviana_1103@hotmail.com	\N	\N	1
1396	\N	\N	1028121135	\N	 (000) 0000000	VIVIANA MARIA VELEZ LOPERA	VIVIANA MARIA VELEZ LOPERA	\N	\N	VIVIANA MARIA VELEZ LOPERA	\N	VVELEZLOPERA@GMAIL.COM	\N	\N	1
1397	\N	\N	71645018	\N	 (000) 0000000	WBEL DUARTE	WBEL DUARTE	\N	\N	WBEL DUARTE	\N	gerencia@gentevp.com	\N	\N	1
1398	\N	\N	1007615456	\N	 (000) 0000000	WHILDER ROLDAN GUTIERREZ	WHILDER YAMID ROLDAN GUTIERREZ	\N	\N	WHILDER YAMID ROLDAN GUTIERREZ	\N	\N	\N	\N	1
1399	\N	\N	70690702	\N	 (000) 0000000	WILLERMO LEON CASTAÑO	WILLERMO LEON CASTAÑO	\N	\N	WILLERMO LEON CASTAÑO	\N	willermoleoncastano1@gmail.com	\N	\N	1
1400	\N	\N	3521505	\N	 (000) 0000000	WILLIAM AGUDELO RENDON	WILLIAM AGUDELO RENDON	\N	\N	WILLIAM AGUDELO RENDON	\N	marioluna.15@hotmail.com	\N	\N	1
1401	\N	\N	71618339	\N	\N	WILLIAM CARVAJAL VALENCIA	WILLIAM CARVAJAL VALENCIA	\N	\N	WILLIAM CARVAJAL VALENCIA	\N	stevengalvis0406@gmail.com	\N	\N	1
1402	\N	\N	71607273	\N	 (000) 0000000	WILLIAM COSSIO QUINTERO	WILLIAM COSSIO QUINTERO	\N	\N	WILLIAM COSSIO QUINTERO	\N	william.cossio@gmail.com	\N	\N	1
1403	\N	\N	71718691	\N	 (000) 0000000	WILLIAM DE JESUS LOAIZA	WILLIAM DE JESUS LOAIZA	\N	\N	WILLIAM DE JESUS LOAIZA	\N	facturaacquapack@gmail.com	\N	\N	1
1404	\N	\N	15489943	\N	 (000) 0000000	WILLIAM DE JESUS URREGO GIRALDO	WILLIAM DE JESUS URREGO GIRALDO	\N	\N	WILLIAM DE JESUS URREGO GIRALDO	\N	urregogiraldowiliam12481@gmail.com	\N	\N	1
1405	\N	\N	15274362	\N	 (000) 0000000	WILLIAM HERNAN MESA TORRES	WILLIAM HERNAN MESA TORRES	\N	\N	WILLIAM HERNAN MESA TORRES	\N	\N	\N	\N	1
1406	\N	\N	3479667	\N	 (000) 0000000	WILLIAM LOPEZ CARDONA	WILLIAM LOPEZ CARDONA	\N	\N	WILLIAM LOPEZ CARDONA	\N	william1214h@gmail.com	\N	\N	1
1407	\N	\N	71790019	\N	3135125223	WILLINGTON JAVIER HERNANDEZ HENAO	WILLINGTON HERNANDEZ HENAO	\N	\N	WILLINGTON HERNANDEZ HENAO	\N	solucionessaim@gmail.com	\N	\N	1
1408	\N	\N	1046902472	\N	 (000) 0000000	WILMAR HUMBERTO URIBE GAVIRIA	WILMAR URIBE	\N	\N	WILMAR URIBE	\N	facturacionaqp1@gmail.com	\N	\N	1
1409	\N	\N	71020164	\N	 (00) 8595473	WILMAR JOSE TOBON PUERTA	WILMAR JOSE TOBON PUERTA	\N	\N	WILMAR JOSE TOBON PUERTA	\N	JOSEWTOBON@HOTMAIL.COM	\N	\N	1
1410	\N	\N	1017213968	\N	 (000) 0000000	WILSON ARLEY PEREZ RAMIREZ	WILSON ARLEY PEREZ RAMIREZ	\N	\N	WILSON ARLEY PEREZ RAMIREZ	\N	\N	\N	\N	1
1411	\N	\N	89006095	\N	 (000) 0000000	WILSON BALERO	WILSON BALERO	\N	\N	WILSON BALERO	\N	\N	\N	\N	1
1412	\N	\N	15489065	\N	 (00) 3104294053	WILSON DARIO VARGAS VARELA	WILSON DARIO VARGAS VARELA	\N	\N	WILSON DARIO VARGAS VARELA	\N	tributariosmedellin01@hotmail.com	\N	\N	1
1413	\N	\N	15321835	\N	 (000) 0000000	WILSON DE JESÚS ARROYAVE VÁSQUEZ	WILSON DE JESÚS ARROYAVE VÁSQUEZ	\N	\N	WILSON DE JESÚS ARROYAVE VÁSQUEZ	\N	\N	\N	\N	1
1414	\N	\N	1039078301	\N	\N	WILSON DE JESUS CASTAÑO BAUTISTA	WILSON DE JESUS CASTAÑO BAUTISTA	\N	\N	WILSON DE JESUS CASTAÑO BAUTISTA	\N	narvaezkevin542@gmail.com	\N	\N	1
1415	\N	\N	1035126008	\N	 (000) 0000000	WILSON DE JESUS VASQUEZ ARANGO	WILSON DE JESUS VASQUEZ ARANGO	\N	\N	WILSON DE JESUS VASQUEZ ARANGO	\N	wilvas2007@yahoo.es	\N	\N	1
1416	\N	\N	98472278	\N	 (000) 0000000	WILSON DE JESUS ZULUAGA SANCHEZ	WILSON DE JESUS ZULUAGA SANCHEZ	\N	\N	WILSON DE JESUS ZULUAGA SANCHEZ	\N	granjalaunionsanroque@gmail.com	\N	\N	1
1417	\N	\N	8154910	\N	 (000) 0000000	WILSON RAMIRO RODRIGUEZ VILLA	WILSON RAMIRO RODRIGUEZ VILLA	\N	\N	WILSON RAMIRO RODRIGUEZ VILLA	\N	facturacionaqp1@gmail.com	\N	\N	1
1418	\N	\N	8355983	\N	 (000) 0000000	WILSON URIEL ALZATE	WILSON URIEL ALZATE	\N	\N	WILSON URIEL ALZATE	\N	WILSONALZATE1984@GMAIL.COM	\N	\N	1
1419	\N	\N	70505751	\N	3205723995	WINGTON HERNANDEZ ARANGO	WINGTON HERNANDEZ ARANGO	\N	\N	WINGTON HERNANDEZ ARANGO	\N	hernandezycia@hotmail.com	\N	\N	1
1420	\N	\N	79342546	\N	 (000) 0000000	YANCO GERMAN REVELO BELTRAN	YANCO GERMAN REVELO BELTRAN	\N	\N	YANCO GERMAN REVELO BELTRAN	\N	YANCO11@HOTMAIL.COM	\N	\N	1
1421	\N	\N	1111776034	\N	 (000) 0000000	YEISON ARLEY SIERRA ROJAS	YEISON ARLEY SIERRA ROJAS	\N	\N	YEISON ARLEY SIERRA ROJAS	\N	mallranchograndesd@gmail.com	\N	\N	1
1422	\N	\N	1035127268	\N	 (000) 0000000	YEISON SANCHEZ ZAPATA	YEISON SANCHEZ ZAPATA	\N	\N	YEISON SANCHEZ ZAPATA	\N	facturacionaqp1@gmail.com	\N	\N	1
1423	\N	\N	71744687	\N	 (000) 0000000	YESID OSWALDO GOMEZ LARGO	YESID OSWALDO GOMEZ LARGO	\N	\N	YESID OSWALDO GOMEZ LARGO	\N	yesidgomez899@gmail.com	\N	\N	1
1424	\N	\N	1045048455	\N	 (000) 0000000	YOHAN OSORIO DUQUE	YOHAN OSORIO DUQUE	\N	\N	YOHAN OSORIO DUQUE	\N	jdos21@hotmail.com	\N	\N	1
1425	\N	\N	1041630240	\N	 (000) 0000000	YOINER FERNANDO HENAO VARGAS	YOINER FERNANDO HENAO VARGAS	\N	\N	YOINER FERNANDO HENAO VARGAS	\N	\N	\N	\N	1
1426	\N	\N	1048020151	\N	 (000) 0000000	YORMAN ESNEIDER SANMARTIN SEPULVEDA	YORMAN ESNEIDER SANMARTIN SEPULVEDA	\N	\N	YORMAN ESNEIDER SANMARTIN SEPULVEDA	\N	Urraomisfrutos12@gmail.com	\N	\N	1
1427	\N	\N	1040514199	\N	 (00) 3174399679	YULIZA NILETH VIDAL MUÑOZ	YULIZA NILETH VIDAL MUÑOZ	\N	\N	YULIZA NILETH VIDAL MUÑOZ	\N	contabilidadaqp9@gmail.com	\N	\N	1
1428	\N	\N	7975352	\N	 (000) 0000000	YVAN GADEAU	YVAN GADEAU	\N	\N	YVAN GADEAU	\N	\N	\N	\N	1
1429	\N	\N	900047755	\N	 (000) 0000000	ZAPLAST LTDA	ZAPLAST LTDA	\N	\N	ZAPLAST LTDA	\N	\N	\N	\N	1
1430	\N	\N	901829083	\N	 (000) 0000000	ZIMIENTTO INGENIERIA Y CONTRUCCION S.A.S	ZIMIENTTO INGENIERIA Y CONTRUCCION S.A.S	\N	\N	ZIMIENTTO INGENIERIA Y CONTRUCCION S.A.S	\N	zimientto@gmail.com	\N	\N	1
1431	\N	\N	1128468480	\N	4177199	ZULAY PLATA SEPULVEDA	ZULAY PLATA SEPULVEDA	\N	\N	ZULAY PLATA SEPULVEDA	\N	zupase303@hotmail.com	\N	\N	1
1432	\N	\N	830094751	7	(000) 0000000	ZX VENTURES COLOMBIA SAS	ZX VENTURES COLOMBIA SAS	124	\N	ZX VENTURES COLOMBIA SAS	\N	\N	\N	\N	1
\.


--
-- Data for Name: detalle_deducciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.detalle_deducciones (id_detalle_deducciones, id_nomina, id_tipo_deduccion, valor_deduccion, observaciones) FROM stdin;
1	1	1	8900.00	de la deuda
2	2	3	28334.04	\N
3	2	4	28334.04	\N
4	2	2	97676.00	\N
5	2	1	67565.00	DE LA MOTO QUE LE ROBARON
6	3	3	4775.04	\N
7	3	4	4775.04	\N
\.


--
-- Data for Name: detalle_dotacion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.detalle_dotacion (detalle_dotacion, id_entregas_dotacion, id_tipo_prendas, cantidad, talla_entregada) FROM stdin;
\.


--
-- Data for Name: detalle_factura; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.detalle_factura (id_detalle_factura, id_factura, id_producto, cantidad, precio_unitario, descuento, subtotal, id_iva, iva_valor, id_retefuente, retefuente_valor, valor_total, porcentaje_descuento, costo_unitario_con_impuesto) FROM stdin;
1	1	1113	1.00	8770.00	1315.50	7454.50	3	0.00	16	0.00	7454.50	15.00	7454.50
2	1	1614	1.00	352720.00	52908.00	299812.00	3	0.00	16	0.00	299812.00	15.00	299812.00
3	1	1869	1.00	65370.00	9805.50	55564.50	3	0.00	16	0.00	55564.50	15.00	55564.50
\.


--
-- Data for Name: detalle_nomina; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.detalle_nomina (id_detalle_nomina, id_nomina, id_tipo_hora, valor_hora, cantidad_horas, total) FROM stdin;
1	1	1	7959.00	122.00	970998.00
2	1	8	17111.00	12.00	205332.00
3	1	10	20294.00	48.00	974112.00
4	2	1	7959.00	89.00	708351.00
5	3	2	9948.00	12.00	119376.00
\.


--
-- Data for Name: detalle_salida; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.detalle_salida (id_detalle_salida, id_salida, id_producto, cantidad, precio_unitario, descuento, subtotal, id_iva, iva_valor, id_retefuente, retefuente_valor, valor_total, precio_unitario_con_impuesto) FROM stdin;
\.


--
-- Data for Name: entregas_dotaciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.entregas_dotaciones (id_entregas_dotaciones, id_usuarios, fecha_entrega, foto_acta) FROM stdin;
\.


--
-- Data for Name: eps; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.eps (id_eps, nombre) FROM stdin;
1	EPS Sura
2	EPS Sanitas
3	Nueva EPS
4	Salud Total EPS
5	Compensar EPS
6	Famisanar EPS
7	Coosalud EPS
8	Salud Bolívar EPS
9	Aliansalud EPS
10	Servicio Occidental de Salud (S.O.S.)
11	Savia Salud EPS
12	Mutual SER
13	Asmet Salud
14	Emssanar EPS
15	Capital Salud
16	Cajacopi EPS
17	Comfenalco Valle
18	Comfachocó
19	Comfaoriente
20	Capresoca EPS
21	Mallamas EPS
22	Anas Wayuu
23	AIC (Asociación Indígena del Cauca)
24	Pijaos Salud
25	Dusakawi EPS
26	Fondo de Pasivo Social de Ferrocarriles
27	Sanidad Militar
28	Sanidad Policía Nacional
29	Ecopetrol (Régimen Especial)
30	Magisterio (Fondo Nacional de Prestaciones Sociales)
31	No aplica (N/A)
\.


--
-- Data for Name: estado; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.estado (id_estado, nombre, modulo, color, descripcion) FROM stdin;
1	Activo	Global	#28a745	El registro está habilitado y funcional en el sistema
2	Inactivo	Global	#dc3545	El registro está bloqueado o deshabilitado temporalmente
4	Disponible	Inventario	#28a745	Producto con stock suficiente para la venta
5	Agotado	Inventario	#dc3545	Producto sin existencias físicas (Stock 0)
6	Baja Existencia	Inventario	#ffc107	Quedan pocas unidades, se requiere reposición urgente
7	Descontinuado	Inventario	#343a40	Producto que ya no se volverá a comprar ni vender
8	En Cuarentena	Inventario	#17a2b8	Producto apartado para revisión de calidad o devolución
9	Pagada	Facturación	#28a745	La factura ha sido cobrada/pagada en su totalidad
10	Pendiente	Facturación	#ffc107	La factura está emitida pero falta pago (Crédito)
11	Anulada	Facturación	#dc3545	Factura cancelada por error contable o devolución total
12	Vencida	Facturación	#fd7e14	Factura pendiente que superó la fecha límite de pago
13	En Preparación	Logística	#ffc107	El pedido se está empacando en bodega
14	En Ruta	Logística	#007bff	El pedido salió de bodega y va hacia el cliente
15	Entregado	Logística	#28a745	El cliente recibió la mercancía satisfactoriamente
16	Devuelto	Logística	#dc3545	La mercancía fue rechazada y regresó a bodega
3	Archivado	Global	#6c757d	Borrado lógico (papelera de reciclaje)
17	Pendiente	compras	#ffc107	La factura ha sido ingresada pero no se ha pagado al proveedor
18	Pagada	compras	#28a745	El pago se realizó en su totalidad
19	Vencida	compras	#dc3545	Se pasó la fecha límite de pago
20	Anulada	compras	#6c757d	Factura cancelada por error o devolución
21	Pendiente	tareas	#FFA500	Tarea asignada pero aún no iniciada
22	En Proceso	tareas	#3498DB	Tarea que se está realizando actualmente
23	Terminada	tareas	#2ECC71	Tarea finalizada y entregada
24	Borrador	nomina	#94a3b8	Nómina en proceso de creación, aún no calculada
25	Calculada	nomina	#3b82f6	Nómina calculada y lista para revisión
26	Aprobada	nomina	#10b981	Nómina aprobada y lista para pago
27	Pagada	nomina	#059669	Nómina pagada al empleado
28	Anulada	nomina	#ef4444	Nómina anulada, no se procesará el pago
29	En Revisión	nomina	#f59e0b	Nómina en proceso de revisión
\.


--
-- Data for Name: estado_civil; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.estado_civil (id_estado_civil, nombre) FROM stdin;
1	Soltero(a)
2	Casado(a)
3	Unión Libre / Compañero(a) Permanente
4	Divorciado(a)
5	Viudo(a)
6	Separado(a)
\.


--
-- Data for Name: facturas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.facturas (id_facturas, id_usuarios, fecha_creacion, id_proveedor, numero_factura_proveedor, total_subtotal, total_descuento, total_iva, total_retencion, total_factura, id_estado, observaciones) FROM stdin;
1	3	2026-02-19	142	RM348656	426860.00	64029.00	0.00	0.00	362831.00	1	\N
\.


--
-- Data for Name: familia_producto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.familia_producto (id_familia_producto, nombre) FROM stdin;
1	Wiplas
2	Comercial
3	Proyecto
\.


--
-- Data for Name: fondo_pensiones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.fondo_pensiones (id_fondo_pensiones, nombre) FROM stdin;
1	Colpensiones
2	Porvenir
3	Protección
4	Colfondos
5	Skandia
6	No aplica (N/A)
\.


--
-- Data for Name: grupos_productos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.grupos_productos (id_grupos_productos, nombre) FROM stdin;
3	Accesorios Internos Aluminio
4	Accesorios Internos PP
5	Accesorios OPW
7	Accesorios Riego
9	Correas Industriales
10	Mangueras Industriales
12	Sistemas de Bombeo y Accesorios
13	Sistemas de Riego
14	Tanques y Rotomoldeo
2	Accesorios Hidraulicos y Racores
6	Accesorios Rapidos PP
8	Cerca Electrica
11	Producto Ferreteria
15	Tuberia PEBD Wiplas
16	Tuberias y Accesorios Galvanizados
17	Tuberias y Accesorios PEAD
18	Tuberias y Accesorios PVC
19	Valvulas
1	Abrazaderas
20	Peletizado AQP
21	Aglutinado AQP
22	Lavado AQP
23	Plasticos
\.


--
-- Data for Name: inventario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inventario (id_inventario, id_bodega, id_producto, id_proveedor, fecha_ingreso, id_factura, cantidad_lote, costo_producto, id_traslado) FROM stdin;
1	1	1113	142	2026-02-19	1	1.00	7454.50	\N
2	1	1614	142	2026-02-19	1	1.00	299812.00	\N
3	1	1869	142	2026-02-19	1	1.00	55564.50	\N
4	1	1113	\N	2026-02-27	\N	2.00	20000.00	\N
\.


--
-- Data for Name: ivas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ivas (id_iva, nombre, valor) FROM stdin;
1	IVA General (19%)	19.00
2	IVA Reducido (5%)	5.00
3	Exento / Excluido (0%)	0.00
\.


--
-- Data for Name: maquinas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.maquinas (id_maquina, id_tipo_maquina, nombre, observaciones) FROM stdin;
1	1	Aglutinadora001	primer y unica aglutinadora de momento
2	2	Peletizadora001	primer peletizadora
3	3	Extrusora001	extrusora numero 1
4	3	Extrusora002	extrusora numero 2
5	3	Extrusora003	extrusora numero 3
6	3	extrusora004	extrusora numero 4
7	3	extrusora005	extrusora numero 5
\.


--
-- Data for Name: medida; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.medida (id_medida, nombre) FROM stdin;
1	Unidad
2	Metros
3	Rollo
4	cm
5	Kilogramos
\.


--
-- Data for Name: movimiento_caja; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.movimiento_caja (id_movimiento_caja, id_caja, id_tipo_movimiento, monto, descripcion, fecha_hora, id_usuario, observaciones, id_estado, created_at, updated_at) FROM stdin;
1	1	1	1200000.00	pago de sistema de riego san juan	2026-02-19 11:10:39.848106+00	2	Pago de remisión, falta por entregar 2 rollos de 3/4	1	2026-02-19 16:10:39.848106	2026-02-19 16:10:39.848106
2	1	2	250000.00	Pago gorras para dotaciones	2026-02-19 11:11:30.970264+00	2	abono final. valor todal de gorras $500.0000	1	2026-02-19 16:11:30.970264	2026-02-19 16:11:30.970264
3	1	1	1000.00	prueba bd	2026-02-24 19:19:09.207918+00	1	\N	1	2026-02-25 00:19:09.207918	2026-02-25 00:19:09.207918
\.


--
-- Data for Name: movimientos_kardex; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.movimientos_kardex (id_movimientos, id_bodega, id_producto, tipo_movimiento, tipo_flujo, cantidad, costo_unitario, costo_total_movimiento, "fecha ") FROM stdin;
1	1	1113	Entrada por Factura	Entrada	1.00	7454.50	7454.50	2026-02-19 17:44:17.464434
2	1	1614	Entrada por Factura	Entrada	1.00	299812.00	299812.00	2026-02-19 17:44:17.464434
3	1	1869	Entrada por Factura	Entrada	1.00	55564.50	55564.50	2026-02-19 17:44:17.464434
4	1	1113	Ajuste Salida	Salida	1.00	7454.50	7454.50	2026-02-27 00:31:36.445734
5	1	1113	Ajuste Entrada	Entrada	2.00	10000.00	20000.00	2026-02-27 00:32:13.048574
\.


--
-- Data for Name: nomina; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.nomina (id_nomina, id_usuario_trabajador, total_bruto_nomina, periodo_inicio, periodo_fin, fecha_nomina, id_estado, id_usuario_creador, total_deducciones, total_pagar, observaciones, fecha_creacion, valor_auxilio_transporte, dias_trabajados) FROM stdin;
1	3	2150442.00	2026-02-01	2026-02-15	2026-02-04	25	1	8900.00	2390637.00	this is amazing	2026-02-04 21:53:23.549622	249095.00	\N
2	3	708351.00	2026-02-01	2026-02-15	2026-02-09	25	1	221909.08	736346.92	DUKBV	2026-02-10 00:02:00.570818	249905.00	\N
3	13	119376.00	2026-02-16	2026-02-28	2026-02-26	27	1	9550.08	126431.92	\N	2026-02-26 20:39:33.464512	16606.00	2
\.


--
-- Data for Name: notas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notas (id_notas, titulo, nota, id_usuario, fecha_creacion, fecha_actualizacion, id_usuario_creador) FROM stdin;
1	factura fc-1	se autorizo la entrcega pero me entego jordin, no fredy ojito 	4	2026-02-10 00:27:48.873567	2026-02-10 00:27:48.873567	1
2	entrega guantes	le entregue guantes a jesus david 	3	2026-02-10 00:28:25.233489	2026-02-10 00:28:25.233489	1
3	Selección de material 	Se hace prueba con material de recicle: \ntotal kilos comprados: \ntotal kilos plástico después de selección \nTotal kilos de PP \nTotal kilos de cartón \nTotal kilos de basura	2	2026-03-26 17:05:17.807353	2026-04-03 22:40:47.626471	2
\.


--
-- Data for Name: produccion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.produccion (id_produccion, id_producto, id_maquina, id_usuario, id_turno, fecha_hora) FROM stdin;
2	2703	2	17	1	2026-02-04 17:17:02.767
3	2700	2	14	2	2026-02-09 19:17:35.143
1	49	7	20	1	2026-02-04 10:29:51.434
\.


--
-- Data for Name: produccion_medida; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.produccion_medida (id_produccion_medida, id_produccion, id_medida, cantidad) FROM stdin;
3	2	5	150.00
4	3	5	85.00
1	1	5	75.00
2	1	2	100.00
\.


--
-- Data for Name: producto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.producto (id_producto, codigo, id_grupos_producto, nombre, id_familia, existencia, codigo_barras, cantidad_total, cantidad_minima, cantidad_maxima, id_estado, id_medida) FROM stdin;
2	13GAL243TUB	16	TUBO GALV 1/2 X CM	2	f	1001098	0.00	0.00	0.00	1	4
3	13GAL250TUB	16	TUBO GALV 3  x CM	2	f	1001109	0.00	0.00	0.00	1	4
4	13GAL251TUB	16	TUBO GALV 4  x CM	2	f	1001110	0.00	0.00	0.00	1	4
5	13GAL252TUB	16	TUBO GALV A/C 1/2 X CM	2	f	1001111	0.00	0.00	0.00	1	4
6	13GAL253TUB	16	TUBO GALV  A/C 3/4 X CM	2	f	1001112	0.00	0.00	0.00	1	4
7	13GAL254TUB	16	TUBO GALV  A/C 1  X CM	2	f	1001113	0.00	0.00	0.00	1	4
8	13GAL255TUB	16	TUBO GALV  A/C  1 1/4 X CM	2	f	1001114	0.00	0.00	0.00	1	4
9	13GAL257TUB	16	TUBO GALV  A/C 2 X CM	2	f	1001116	0.00	0.00	0.00	1	4
10	13GAL247TUB	16	TUBO GALV 1 1/2 x CM	2	f	1001105	0.00	0.00	0.00	1	4
11	13GAL244TUB	16	TUBO GALV 3/4 x CM	2	f	1001100	0.00	0.00	0.00	1	4
12	13GAL242TUB	16	TUBO GALV 3/8  X CM	2	f	1001096	0.00	0.00	0.00	1	4
13	13GAL245TUB	16	TUBO GALV 1 x CM	2	f	1001102	0.00	0.00	0.00	1	4
14	13GAL248TUB	16	TUBO GALV 2 x CM	2	f	1001106	0.00	0.00	0.00	1	4
15	31PE-10	12	TUBO PVC PLASTIMEC/PAVCO/TECNOSA/DURMA 1/2	3	f	1002349	0.00	0.00	0.00	1	4
16	13GAL246TUB	16	TUBO GALV 1 1/42 x CM	2	f	1001104	0.00	0.00	0.00	1	4
17	13GAL256TUB	16	TUBO GALV  A/C 1 1/2 X CM	2	f	1001115	0.00	0.00	0.00	1	4
18	W10251607	15	TUB WIPLAS 25MM (3/4) PN16 (CAL60) x MT	1	f	1002668	0.00	0.00	0.00	1	\N
19	W102520BIC36	15	TUB WIPLAS BICOLOR(CE) 25MM(3/4) PN20 x MT	1	f	1002669	0.00	0.00	0.00	1	\N
20	W10252508	15	TUB WIPLAS 25MM(3/4) PN25 x MT (FUMI)	1	f	1002670	0.00	0.00	0.00	1	\N
21	W10252509	15	TUB WIPLAS 25MM(3/4) PN20 x MT (FUMI)	1	f	1002671	0.00	0.00	0.00	1	\N
22	W10252510	15	TUB WIPLAS 25MM(3/4) PN32 x MT (FUMI)	1	f	1002672	0.00	0.00	0.00	1	\N
23	W10321009	15	TUB WIPLAS 32MM(1) PN10 x MT	1	f	1002673	0.00	0.00	0.00	1	\N
24	W10321210	15	TUB WIPLAS 32MM(1) PN12.5 (CAL40) x MT	1	f	1002674	0.00	0.00	0.00	1	\N
25	W10321611	15	TUB WIPLAS 32MM(1) PN16 CAL60) x MT	1	f	1002675	0.00	0.00	0.00	1	\N
26	W103220BIC37	15	TUB WIPLAS BICOLOR(CE) 32MM(1) PN20 x MT	1	f	1002676	0.00	0.00	0.00	1	\N
27	W10322512	15	TUB WIPLAS 32MM(1) x MT (FUMIDUCTO)	1	f	1002677	0.00	0.00	0.00	1	\N
28	W10401013	15	TUB WIPLAS 40MM(1 1/4) PN10 x MT	1	f	1002678	0.00	0.00	0.00	1	\N
29	W10401214	15	TUB WIPLAS 40MM(1 1/4) PN12.5(CAL40) x MT	1	f	1002679	0.00	0.00	0.00	1	\N
30	W10401615	15	TUB WIPLAS 40MM(1 1/4) PN16 (CAL60) x MT	1	f	1002680	0.00	0.00	0.00	1	\N
31	W10501016	15	TUB WIPLAS 50MM(1 1/2) PN10 x MT	1	f	1002681	0.00	0.00	0.00	1	\N
32	W10501217	15	TUB WIPLAS 50MM(1 1/2) PN12.5(CAL40) x MT	1	f	1002682	0.00	0.00	0.00	1	\N
33	W10501618	15	TUB WIPLAS 50MM(1 1/2) PN16 (CAL60) x MT	1	f	1002683	0.00	0.00	0.00	1	\N
34	W10502019	15	TUB WIPLAS 50MM(1 1/2) PN20(CAL80) x MT	1	f	1002684	0.00	0.00	0.00	1	\N
35	W10631020	15	TUB WIPLAS 63MM(2) PN10 x MT	1	f	1002685	0.00	0.00	0.00	1	\N
36	W10631221	15	TUB WIPLAS 63MM(2) PN12.5(CAL40) x MT	1	f	1002686	0.00	0.00	0.00	1	\N
37	W10631622	15	TUB WIPLAS 63MM(2) PN16 (CAL60) x MT	1	f	1002687	0.00	0.00	0.00	1	\N
38	W10632023	15	TUB WIPLAS 63MM(2) PN20 (CAL80) x MT	1	f	1002688	0.00	0.00	0.00	1	\N
39	W10751024	15	TUB WIPLAS 75MM(21/2) PN10 x MT	1	f	1002689	0.00	0.00	0.00	1	\N
40	W10751225	15	TUB WIPLAS 75MM(21/2) PN12.5(CAL40) x MT	1	f	1002690	0.00	0.00	0.00	1	\N
41	W10901229	15	TUB WIPLAS 90MM(3) PN12.5(181PSI) x MT	1	f	1002694	0.00	0.00	0.00	1	\N
42	W10751626	15	TUB WIPLAS 75MM(2 1/2) PN16(CAL60) x MT	1	f	1002691	0.00	0.00	0.00	1	\N
43	W10901028	15	TUB WIPLAS 90MM(3) PN10(145PSI) x MT	1	f	1002693	0.00	0.00	0.00	1	\N
44	W10900827	15	TUB WIPLAS 90MM(3) PN8(115PSI) x MT	1	f	1002692	0.00	0.00	0.00	1	\N
45	W101100830	15	TUB WIPLAS 110MM(4) PN8(115PSI) X MT	1	f	1002654	0.00	0.00	0.00	1	\N
46	W101101031	15	TUB WIPLAS 110MM(4) PN10(145PSI) x MT	1	f	1002655	0.00	0.00	0.00	1	\N
47	W101101232	15	TUB WIPLAS 110MM(4) PN12.5(181PSI) x MT	1	f	1002656	0.00	0.00	0.00	1	\N
48	W101101633	15	TUB WIPLAS 110MM(4) PN16(232PSI) x MT	1	f	1002657	0.00	0.00	0.00	1	\N
49	W10161034	15	TUB WIPLAS 16MM PN10 x MT	1	f	1002658	0.00	0.00	0.00	1	\N
50	W10161035	15	TUB WIPLAS 50MM PN25 x MT	1	f	1002659	0.00	0.00	0.00	1	\N
51	W10161036	15	TUB WIPLAS 50MM PN32 x MT	1	f	1002660	0.00	0.00	0.00	1	\N
52	W10201001	15	TUB WIPLAS 20MM(1/2) PN10 x MT	1	f	1002661	0.00	0.00	0.00	1	\N
53	W10201202	15	TUB WIPLAS 20MM(1/2) PN12.5 (CAL40) x MT	1	f	1002662	0.00	0.00	0.00	1	\N
54	W10201603	15	TUB WIPLAS 20MM(1/2) PN16 (CAL 60) x MT	1	f	1002663	0.00	0.00	0.00	1	\N
55	W102020BIC35	15	TUB WIPLAS BICOLOR(CE) 20MM(1/2) PN20 x MT	1	f	1002664	0.00	0.00	0.00	1	\N
56	W10202504	15	TUB WIPLAS 20MM(1/2) PN25 x MT (FUMI)	1	f	1002665	0.00	0.00	0.00	1	\N
57	W10251005	15	TUB WIPLAS 25MM(3/4) PN 10 x MT	1	f	1002666	0.00	0.00	0.00	1	\N
58	W10251206	15	TUB WIPLAS 25MM(3/4) PN12.5(CAL40) x MT	1	f	1002667	0.00	0.00	0.00	1	\N
59	25MIND-67	10	MANGUERA HIDRAULICA R12 1/2	2	f	1001896	0.00	0.00	0.00	1	2
60	25MIND-68	10	MANGUERA HIDRAULICA R12 3/4	2	f	1001897	0.00	0.00	0.00	1	2
61	25MIND-69	10	MANGUERA HIDRAULICA R12 5/8	2	f	1001898	0.00	0.00	0.00	1	2
62	25MIND-70	10	MANGUERA HIDRAULICA R13 1	2	f	1001899	0.00	0.00	0.00	1	2
63	25MIND-71	10	MANGUERA HIDRAULICA R13 1/2	2	f	1001900	0.00	0.00	0.00	1	2
64	25MIND-72	10	MANGUERA HIDRAULICA R13 3/4	2	f	1001901	0.00	0.00	0.00	1	2
65	25MIND-73	10	MANGUERA HIDRAULICA R13 5/8	2	f	1001902	0.00	0.00	0.00	1	2
66	25MIND-74	10	MANGUERA HIDRAULICA R2 1 1/2	2	f	1001903	0.00	0.00	0.00	1	2
67	25MIND-75	10	MANGUERA HIDRAULICA R2 1 1/4	2	f	1001904	0.00	0.00	0.00	1	2
68	25MIND-76	10	MANGUERA HIDRAULICA R2 1	2	f	1001905	0.00	0.00	0.00	1	2
69	25MIND-77	10	MANGUERA HIDRAULICA R2 1/2	2	f	1001906	0.00	0.00	0.00	1	2
70	25MIND-78	10	MANGUERA HIDRAULICA R2 1/4	2	f	1001907	0.00	0.00	0.00	1	2
71	25MIND-79	10	MANGUERA HIDRAULICA R2 2	2	f	1001908	0.00	0.00	0.00	1	2
72	25MIND-80	10	MANGUERA HIDRAULICA R2 3/4	2	f	1001909	0.00	0.00	0.00	1	2
73	25MIND-81	10	MANGUERA HIDRAULICA R2 3/8	2	f	1001910	0.00	0.00	0.00	1	2
74	25MIND-82	10	MANGUERA HIDRAULICA R2 5/16	2	f	1001911	0.00	0.00	0.00	1	2
75	25MIND-83	10	MANGUERA HIDRAULICA R2 5/8	2	f	1001912	0.00	0.00	0.00	1	2
76	25MIND-84	10	MANGUERA NT REFUERZO ALAMBRE  4	2	f	1001913	0.00	0.00	0.00	1	2
77	25MIND-85	10	MANGUERA NT REFUERZO ALAMBRE  5/8	2	f	1001914	0.00	0.00	0.00	1	2
78	25MIND-86	10	MANGUERA NT REFUERZO ALAMBRE 1 1/2	2	f	1001915	0.00	0.00	0.00	1	2
79	25MIND-87	10	MANGUERA NT REFUERZO ALAMBRE 1 1/4	2	f	1001916	0.00	0.00	0.00	1	2
80	25MIND-88	10	MANGUERA NT REFUERZO ALAMBRE 1	2	f	1001917	0.00	0.00	0.00	1	2
81	25MIND-89	10	MANGUERA NT REFUERZO ALAMBRE 1/2	2	f	1001918	0.00	0.00	0.00	1	2
82	25MIND-90	10	MANGUERA NT REFUERZO ALAMBRE 2	2	f	1001919	0.00	0.00	0.00	1	2
83	25MIND-91	10	MANGUERA NT REFUERZO ALAMBRE 3	2	f	1001920	0.00	0.00	0.00	1	2
84	25MIND-92	10	MANGUERA NT REFUERZO ALAMBRE 3/4	2	f	1001921	0.00	0.00	0.00	1	2
85	25MIND-93	10	MANGUERA OXICORTE 1/4	2	f	1001922	0.00	0.00	0.00	1	2
86	25MIND-94	10	MANGUERA PLANA AZUL 1 1/2	2	f	1001923	0.00	0.00	0.00	1	2
87	25MIND-95	10	MANGUERA PLANA AZUL 1	2	f	1001924	0.00	0.00	0.00	1	2
88	25MIND-96	10	MANGUERA PLANA AZUL 2	2	f	1001925	0.00	0.00	0.00	1	2
89	25MIND-97	10	MANGUERA PLANA AZUL 3	2	f	1001926	0.00	0.00	0.00	1	2
90	25MIND-98	10	MANGUERA PLANA AZUL 4	2	f	1001927	0.00	0.00	0.00	1	2
91	25MIND-99	10	MANGUERA PLANA ROJA 1 1/2	2	f	1001928	0.00	0.00	0.00	1	2
92	14PETUB-04	17	TUB PEAD-100 16mm RDE 7.4 PN 16 x MT	2	f	1001244	0.00	0.00	0.00	1	2
93	14PETUB-05	17	TUB PEAD-100 20mm RDE 11 PN 16 x MT	2	f	1001245	0.00	0.00	0.00	1	2
94	14PETUB-06	17	TUB PEAD-100 20mm RDE7 PN25 x MT	2	f	1001246	0.00	0.00	0.00	1	2
95	14PETUB-07	17	TUB PEAD-100 20mm RDE9 PN20 x MT	2	f	1001247	0.00	0.00	0.00	1	2
96	14PETUB-08	17	TUB PEAD-100 25mm RD7.4 PN25  x MT	2	f	1001248	0.00	0.00	0.00	1	2
97	14PETUB-09	17	TUB PEAD-100 25mm RDE 11 PN 16  x MT	2	f	1001249	0.00	0.00	0.00	1	2
98	14PETUB-10	17	TUB PEAD-100 25mm RDE 11 PN 25 x MT	2	f	1001250	0.00	0.00	0.00	1	2
99	14PETUB-11	17	TUB PEAD-100 32mm RDE 11 PN 16 x MT	2	f	1001251	0.00	0.00	0.00	1	2
100	14PETUB-12	17	TUB PEAD-100 32mm RDE 7 PN 25 x MT	2	f	1001252	0.00	0.00	0.00	1	2
101	14PETUB-13	17	TUB PEAD-100 63mm RDE11 PN16 x MT	2	f	1001253	0.00	0.00	0.00	1	2
102	14PETUB-14	17	TUB PEAD-100 75mm RDE11 PN16  x MT	2	f	1001254	0.00	0.00	0.00	1	2
103	14PETUB-15	17	TUB PEAD-100 90mm RDE11 PN16 x MT	2	f	1001255	0.00	0.00	0.00	1	2
104	14PETUB-16	17	TUB PEAD-100 40 mm RDE11 PN16 x MT	2	f	1001256	0.00	0.00	0.00	1	2
105	14PETUB-17	17	TUB PEAD-100 50 mm RDE11 PN16 x MT	2	f	1001257	0.00	0.00	0.00	1	2
106	16CE17CAB	8	CABLE AISLADO X 50 MT	2	f	1001343	0.00	0.00	0.00	1	2
107	16CE18CIN	8	CINTA ELECTRICA AZUL X 200MT	2	f	1001344	0.00	0.00	0.00	1	2
108	14PETUB-18	17	TUB PEAD-100 63mm RDE 11 GAS x MT	2	f	1001258	0.00	0.00	0.00	1	2
109	16CE19CIN	8	CINTA CERCA MOVIL 5HILOS ACEROINOX	2	f	1001346	0.00	0.00	0.00	1	2
110	14PETUB-19	17	TUB PEAD-80 16mm RD9 x MT	2	f	1001259	0.00	0.00	0.00	1	2
111	0012023	\N	SALDOS INICIALES	\N	f	1001	0.00	0.00	0.00	1	2
112	14PETUB-20	17	TUB PEAD-100 32mm RDE 7 PN 20 x MT	2	f	1001260	0.00	0.00	0.00	1	2
113	14PETUB-21	17	TUB PEAD-100 32mm  PN 20 x MT	2	f	1001261	0.00	0.00	0.00	1	2
114	14PETUB-22	17	TUB PEAD-100 25mm  PN 32 x MT	2	f	1001262	0.00	0.00	0.00	1	2
115	14PETUB-23	17	TUB PEAD-100 25mm  PN 20 x MT	2	f	1001263	0.00	0.00	0.00	1	2
118	16CE32MCE	8	MANGUERA CERCA ELECTRICA X 100MT	2	f	1001362	0.00	0.00	0.00	1	2
119	16CE33MCE	8	MANGUERA CERCA ELECTRICA X 25MT	2	f	1001363	0.00	0.00	0.00	1	2
120	16CE34MCE	8	MANGUERA CERCA ELECTRICA X 50MT	2	f	1001364	0.00	0.00	0.00	1	2
121	14PETUB-01	17	TUB PEAD-100 110mm RD11 PN16 x MT	2	f	1001241	0.00	0.00	0.00	1	2
122	14PETUB-02	17	TUB PEAD-100 160mm RD11 PN16 x MT	2	f	1001242	0.00	0.00	0.00	1	2
123	14PETUB-03	17	TUB PEAD-100 160mm RD17 PN10 x MT	2	f	1001243	0.00	0.00	0.00	1	2
124	25MIND-01	10	MANGUERA AIRE VACIO 1 1/2	2	f	1001776	0.00	0.00	0.00	1	2
125	25MIND-02	10	MANGUERA AIRE VACIO 1 1/4	2	f	1001777	0.00	0.00	0.00	1	2
126	25MIND-03	10	MANGUERA AIRE VACIO 1	2	f	1001778	0.00	0.00	0.00	1	2
127	25MIND-04	10	MANGUERA AIRE VACIO 2	2	f	1001779	0.00	0.00	0.00	1	2
128	25MIND-05	10	MANGUERA AIRE VACIO 3	2	f	1001780	0.00	0.00	0.00	1	2
129	25MIND-06	10	MANGUERA AIRE VACIO 4	2	f	1001781	0.00	0.00	0.00	1	2
130	25MIND-07	10	MANGUERA AIRE VACIO 6	2	f	1001782	0.00	0.00	0.00	1	2
131	25MIND-08	10	MANGUERA AIRE VACIO 8	2	f	1001783	0.00	0.00	0.00	1	2
132	25MIND-09	10	MANGUERA ALIMENTO SUPERFLEX 1 NT	2	f	1001784	0.00	0.00	0.00	1	2
134	25MIND-148	10	MICROMANGUERA	2	f	1001838	0.00	0.00	0.00	1	2
135	25MIND-101	10	MANGUERA PLANA ROJA 3	2	f	1001787	0.00	0.00	0.00	1	2
136	25MIND-102	10	MANGUERA PLANA ROJA 4	2	f	1001788	0.00	0.00	0.00	1	2
137	25MIND-103	10	MANGUERA S96 1 1/2	2	f	1001789	0.00	0.00	0.00	1	2
138	25MIND-104	10	MANGUERA S96 1 1/4	2	f	1001790	0.00	0.00	0.00	1	2
139	25MIND-105	10	MANGUERA SILICONA 7/8 AZUL	2	f	1001791	0.00	0.00	0.00	1	2
140	25MIND-106	10	MANGUERA SILICONA AZUL 3	2	f	1001792	0.00	0.00	0.00	1	2
141	25MIND-107	10	MANGUERA SUCCION Y DESC 1 X 3MT	2	f	1001793	0.00	0.00	0.00	1	2
142	25MIND-108	10	MANGUERA SUCCION Y DESC 1 X 6MT	2	f	1001794	0.00	0.00	0.00	1	2
143	25MIND-109	10	MANGUERA SUCCION Y DESC 1 1/2 X 3MT	2	f	1001795	0.00	0.00	0.00	1	2
144	25MIND-11	10	MANGUERA BICOLOR TECC 1/2	2	f	1001796	0.00	0.00	0.00	1	2
577	12PVC105	18	CODO CPVC 1/2	2	f	100579	0.00	0.00	0.00	1	1
145	25MIND-110	10	MANGUERA SUCCION Y DESC 1 1/2 X 6MT	2	f	1001797	0.00	0.00	0.00	1	2
146	25MIND-111	10	MANGUERA SUCCION Y DESC 1 1/4 X 3MT	2	f	1001798	0.00	0.00	0.00	1	2
147	25MIND-112	10	MANGUERA SUCCION Y DESC 1 1/4 X 6MT	2	f	1001799	0.00	0.00	0.00	1	2
148	25MIND-113	10	MANGUERA SUCCION Y DESC 2	2	f	1001800	0.00	0.00	0.00	1	2
149	25MIND-114	10	MANGUERA SUCCION Y DESC 2 X 3MT	2	f	1001801	0.00	0.00	0.00	1	2
150	25MIND-115	10	MANGUERA SUCCION Y DESC 2 X 6MT	2	f	1001802	0.00	0.00	0.00	1	2
151	25MIND-116	10	MANGUERA SUCCION Y DESC 3 X 3MT	2	f	1001803	0.00	0.00	0.00	1	2
152	25MIND-117	10	MANGUERA SUCCION Y DESC 3 X 6MT	2	f	1001804	0.00	0.00	0.00	1	2
153	25MIND-118	10	MANGUERA SUCCION Y DESC 4 X 3MT	2	f	1001805	0.00	0.00	0.00	1	2
154	25MIND-119	10	MANGUERA SUCCION Y DESC 4 X 6MT	2	f	1001806	0.00	0.00	0.00	1	2
155	25MIND-12	10	MANGUERA BICOLOR TECC 3/4	2	f	1001807	0.00	0.00	0.00	1	2
156	25MIND-120	10	MANGUERA SUCCION Y DESC 5 X 6 MT	2	f	1001808	0.00	0.00	0.00	1	2
157	25MIND-121	10	MANGUERA SUCCION Y DESC 5 X 6MT	2	f	1001809	0.00	0.00	0.00	1	2
158	25MIND-122	10	MANGUERA SUCCION Y DESC 6 X 3MT	2	f	1001810	0.00	0.00	0.00	1	2
159	25MIND-123	10	MANGUERA SUCCION Y DESC 6 X 6MT	2	f	1001811	0.00	0.00	0.00	1	2
160	25MIND-124	10	MANGUERA SUCCION Y DESC 8 X 3MT	2	f	1001812	0.00	0.00	0.00	1	2
161	25MIND-125	10	MANGUERA SUCCION Y DESC 8 X 6MT	2	f	1001813	0.00	0.00	0.00	1	2
162	25MIND-126	10	MANGUERA SUCCION Y DESC COMBUST 2	2	f	1001814	0.00	0.00	0.00	1	2
163	25MIND-127	10	MANGUERA SUCCION Y DESC COMBUST 3	2	f	1001815	0.00	0.00	0.00	1	2
164	25MIND-128	10	MANGUERA SUCCION Y DESC DE COMBUSTIBLE 3	2	f	1001816	0.00	0.00	0.00	1	2
165	25MIND-129	10	MANGUERA SUCCIÓN Y DESCARGUE COMBU	2	f	1001817	0.00	0.00	0.00	1	2
166	25MIND-13	10	MANGUERA C/L 150PSI NEGRA 3	2	f	1001818	0.00	0.00	0.00	1	2
167	25MIND-130	10	MANGUERA SUPER FLEX	2	f	1001819	0.00	0.00	0.00	1	2
168	25MIND-131	10	MANGUERA SUPERFLEX 1/2	2	f	1001820	0.00	0.00	0.00	1	2
169	25MIND-132	10	MANGUERA SUPERFLEX 1/4	2	f	1001821	0.00	0.00	0.00	1	2
170	25MIND-133	10	MANGUERA SUPERFLEX 3/8	2	f	1001822	0.00	0.00	0.00	1	2
171	25MIND-134	10	MANGUERA SUPERFLEX 5/8	2	f	1001823	0.00	0.00	0.00	1	2
172	25MIND-135	10	MANGUERA SWAN 1/2	2	f	1001824	0.00	0.00	0.00	1	2
173	25MIND-136	10	MANGUERA SWAN 3/4	2	f	1001825	0.00	0.00	0.00	1	2
174	25MIND-137	10	MANGUERA SWANK 170 PSI X 30 MT	2	f	1001826	0.00	0.00	0.00	1	2
175	25MIND-138	10	MANGUERA TERRANO 1 1/2	2	f	1001827	0.00	0.00	0.00	1	2
176	25MIND-139	10	MANGUERA TERRANO 1 1/4	2	f	1001828	0.00	0.00	0.00	1	2
177	25MIND-14	10	MANGUERA C/L 300PSI AMARILLA 1 1/2	2	f	1001829	0.00	0.00	0.00	1	2
178	25MIND-140	10	MANGUERA TERRANO 2	2	f	1001830	0.00	0.00	0.00	1	2
179	25MIND-141	10	MANGUERA TERRANO 3	2	f	1001831	0.00	0.00	0.00	1	2
180	25MIND-142	10	MANGUERA TIPO ALIMENTOS AZUL 1 1/2	2	f	1001832	0.00	0.00	0.00	1	2
181	25MIND-143	10	MANGUERA TIPO ALIMENTOS AZUL 2	2	f	1001833	0.00	0.00	0.00	1	2
182	25MIND-144	10	MANGUERA TIPO ALIMENTOS AZUL 3	2	f	1001834	0.00	0.00	0.00	1	2
183	25MIND-145	10	MANGUERA TIPO ALIMENTOS BLANCA 1 1/2	2	f	1001835	0.00	0.00	0.00	1	2
184	25MIND-146	10	MANGUERA TIPO ALIMENTOS BLANCA 2	2	f	1001836	0.00	0.00	0.00	1	2
185	25MIND-147	10	MANGUERA TIPO ALIMENTOS BLANCA 3	2	f	1001837	0.00	0.00	0.00	1	2
186	25MIND-100	10	MANGUERA PLANA ROJA 2	2	f	1001786	0.00	0.00	0.00	1	2
187	25MIND-149	10	SOLDADURA 1 1/4 ARGON	2	f	1001839	0.00	0.00	0.00	1	2
188	25MIND-15	10	MANGUERA C/L 300PSI AMARILLA 1	2	f	1001840	0.00	0.00	0.00	1	2
189	25MIND-150	10	MANG. TUBING NYLON 6MM LECHOZA	2	f	1001841	0.00	0.00	0.00	1	2
190	25MIND-151	10	MANGUERA POLIETILENO LECHOSA 1/4	2	f	1001842	0.00	0.00	0.00	1	2
191	25MIND-152	10	MANGUERA DE RETORNO ESTACIONARIA	2	f	1001843	0.00	0.00	0.00	1	2
192	25MIND-153	10	MANGUERA TIPO ALIMENTO 3/4	2	f	1001844	0.00	0.00	0.00	1	2
193	25MIND-16	10	MANGUERA C/L 300PSI AMARILLA 2	2	f	1001845	0.00	0.00	0.00	1	2
194	25MIND-17	10	MANGUERA C/L 300PSI AMARILLA 3	2	f	1001846	0.00	0.00	0.00	1	2
195	25MIND-18	10	MANGUERA C/L 300PSI AMARILLA 3/4	2	f	1001847	0.00	0.00	0.00	1	2
196	25MIND-19	10	MANGUERA C/L 300PSI NEGRA 1 1/2	2	f	1001848	0.00	0.00	0.00	1	2
197	25MIND-20	10	MANGUERA C/L 300PSI NEGRA 1 1/4	2	f	1001849	0.00	0.00	0.00	1	2
198	25MIND-21	10	MANGUERA C/L 300PSI NEGRA 1	2	f	1001850	0.00	0.00	0.00	1	2
199	25MIND-22	10	MANGUERA C/L 300PSI NEGRA 1/2	2	f	1001851	0.00	0.00	0.00	1	2
200	25MIND-23	10	MANGUERA C/L 300PSI NEGRA 1/4	2	f	1001852	0.00	0.00	0.00	1	2
201	25MIND-24	10	MANGUERA C/L 300PSI NEGRA 2	2	f	1001853	0.00	0.00	0.00	1	2
202	25MIND-25	10	MANGUERA C/L 300PSI NEGRA 3	2	f	1001854	0.00	0.00	0.00	1	2
203	25MIND-26	10	MANGUERA C/L 300PSI NEGRA 3/4	2	f	1001855	0.00	0.00	0.00	1	2
204	25MIND-27	10	MANGUERA C/L 300PSI NEGRA 3/8	2	f	1001856	0.00	0.00	0.00	1	2
205	25MIND-28	10	MANGUERA C/L 300PSI NEGRA 5/16	2	f	1001857	0.00	0.00	0.00	1	2
206	25MIND-29	10	MANGUERA C/L 300PSI NEGRA 5/8	2	f	1001858	0.00	0.00	0.00	1	2
207	25MIND-30	10	MANGUERA C/L 300PSI ROJA 1	2	f	1001859	0.00	0.00	0.00	1	2
208	25MIND-31	10	MANGUERA C/L 300PSI ROJA 1/2	2	f	1001860	0.00	0.00	0.00	1	2
209	25MIND-32	10	MANGUERA C/L 300PSI ROJA 3/4	2	f	1001861	0.00	0.00	0.00	1	2
210	25MIND-33	10	MANGUERA C/L 300PSI ROJA 5/8	2	f	1001862	0.00	0.00	0.00	1	2
211	25MIND-34	10	MANGUERA CRISTAL TRANSPARENTE 1	2	f	1001863	0.00	0.00	0.00	1	2
212	25MIND-35	10	MANGUERA CRISTAL TRANSPARENTE 1/2	2	f	1001864	0.00	0.00	0.00	1	2
213	25MIND-36	10	MANGUERA CRISTAL TRANSPARENTE 1/4	2	f	1001865	0.00	0.00	0.00	1	2
214	25MIND-37	10	MANGUERA CRISTAL TRANSPARENTE 1/8	2	f	1001866	0.00	0.00	0.00	1	2
215	25MIND-38	10	MANGUERA CRISTAL TRANSPARENTE 3/16	2	f	1001867	0.00	0.00	0.00	1	2
216	25MIND-39	10	MANGUERA CRISTAL TRANSPARENTE 3/4	2	f	1001868	0.00	0.00	0.00	1	2
217	25MIND-40	10	MANGUERA CRISTAL TRANSPARENTE 3/8	2	f	1001869	0.00	0.00	0.00	1	2
218	25MIND-41	10	MANGUERA CRISTAL TRANSPARENTE 5/16	2	f	1001870	0.00	0.00	0.00	1	2
219	25MIND-42	10	MANGUERA CRISTAL TRANSPARENTE 5/8	2	f	1001871	0.00	0.00	0.00	1	2
220	25MIND-43	10	MANGUERA DESCARGUE CEMENTO 4 X MT	2	f	1001872	0.00	0.00	0.00	1	2
221	25MIND-44	10	MANGUERA FENIX 1	2	f	1001873	0.00	0.00	0.00	1	2
222	25MIND-45	10	MANGUERA FENIX 1/2	2	f	1001874	0.00	0.00	0.00	1	2
223	25MIND-46	10	MANGUERA FENIX 3/4	2	f	1001875	0.00	0.00	0.00	1	2
224	25MIND-47	10	MANGUERA FENIX AC x 20 MT	2	f	1001876	0.00	0.00	0.00	1	2
225	25MIND-48	10	MANGUERA FENIX AC x 30 MT	2	f	1001877	0.00	0.00	0.00	1	2
226	25MIND-49	10	MANGUERA FUMIGACION AMARILLA X100 MT	2	f	1001878	0.00	0.00	0.00	1	2
227	25MIND-50	10	MANGUERA FUMIGACION CAFE 8.5	2	f	1001879	0.00	0.00	0.00	1	2
228	25MIND-51	10	MANGUERA FUMIGACION FLEXCO 1/2	2	f	1001880	0.00	0.00	0.00	1	2
229	25MIND-52	10	MANGUERA FUMIGACION FLEXCO 3/4	2	f	1001881	0.00	0.00	0.00	1	2
230	25MIND-53	10	MANGUERA FUMIGACION FLEXCO 3/8	2	f	1001882	0.00	0.00	0.00	1	2
231	25MIND-54	10	MANGUERA FUMIGACION FLEXCO 8.5	2	f	1001883	0.00	0.00	0.00	1	2
232	25MIND-55	10	MANGUERA HIDRAULICA R1 1 1/2	2	f	1001884	0.00	0.00	0.00	1	2
233	25MIND-56	10	MANGUERA HIDRAULICA R1 1 1/4	2	f	1001885	0.00	0.00	0.00	1	2
234	25MIND-57	10	MANGUERA HIDRAULICA R1 1	2	f	1001886	0.00	0.00	0.00	1	2
235	25MIND-58	10	MANGUERA HIDRAULICA R1 1 HYPRRES	2	f	1001887	0.00	0.00	0.00	1	2
236	25MIND-59	10	MANGUERA HIDRAULICA R1 1/2	2	f	1001888	0.00	0.00	0.00	1	2
237	25MIND-60	10	MANGUERA HIDRAULICA R1 1/4	2	f	1001889	0.00	0.00	0.00	1	2
238	25MIND-61	10	MANGUERA HIDRAULICA R1 2	2	f	1001890	0.00	0.00	0.00	1	2
239	25MIND-62	10	MANGUERA HIDRAULICA R1 3/4	2	f	1001891	0.00	0.00	0.00	1	2
240	25MIND-63	10	MANGUERA HIDRAULICA R1 3/8	2	f	1001892	0.00	0.00	0.00	1	2
241	25MIND-64	10	MANGUERA HIDRAULICA R1 5/16	2	f	1001893	0.00	0.00	0.00	1	2
242	25MIND-65	10	MANGUERA HIDRAULICA R1 5/8	2	f	1001894	0.00	0.00	0.00	1	2
243	25MIND-66	10	MANGUERA HIDRAULICA R12 1	2	f	1001895	0.00	0.00	0.00	1	2
244	16CE15ALA	11	ALAMBRE GALV CAL 14 x KILO	2	f	1001341	0.00	0.00	0.00	1	3
245	16CE14ALA	11	ALAMBRE GALV CAL 12.5  x KILO	2	f	1001340	0.00	0.00	0.00	1	3
246	16CE13ALA	11	ALAMBRE 10/70 GALV CAL 12 x KILO	2	f	1001339	0.00	0.00	0.00	1	3
247	11ARMAC-21	6	MACHO RAPIDO 32mm (1) ERA	2	f	100249	0.00	0.00	0.00	1	1
248	11ARMAC-22	6	MACHO RAPIDO 32mm x 3/4 INTER	2	f	100250	0.00	0.00	0.00	1	1
249	11ARMAC-23	6	MACHO RAPIDO 40mm (1 1/4)  INTER	2	f	100251	0.00	0.00	0.00	1	1
250	11ARMAC-24	6	MACHO RAPIDO 40mm (1 1/4) ERA	2	f	100252	0.00	0.00	0.00	1	1
251	11ARMAC-25	6	MACHO RAPIDO 50 X 1 1/2  SAB	2	f	100253	0.00	0.00	0.00	1	1
252	11ARMAC-26	6	MACHO RAPIDO 50 X 2 SAB	2	f	100254	0.00	0.00	0.00	1	1
253	11ARMAC-27	6	MACHO RAPIDO 50mm (1 1/2)  INTER	2	f	100255	0.00	0.00	0.00	1	1
254	11ARMAC-28	6	MACHO RAPIDO 50mm (1 1/2) ERA	2	f	100256	0.00	0.00	0.00	1	1
255	11ARMAC-29	6	MACHO RAPIDO 50mm X 2 INTER	2	f	100257	0.00	0.00	0.00	1	1
256	11ARMAC-30	6	MACHO RAPIDO 63 mm x 50mm INTER	2	f	100258	0.00	0.00	0.00	1	1
257	11ARMAC-31	6	MACHO RAPIDO 63mm (2)  INTER	2	f	100259	0.00	0.00	0.00	1	1
258	11ARMAC-32	6	MACHO RAPIDO 63mm (2) ERA	2	f	100260	0.00	0.00	0.00	1	1
259	11ARMAC-33	6	MACHO RAPIDO 75 X 2 1/2 SAB	2	f	100261	0.00	0.00	0.00	1	1
260	11ARMAC-34	6	MACHO RAPIDO 75mm (2 1/2)  INTER	2	f	100262	0.00	0.00	0.00	1	1
261	11ARMAC-35	6	MACHO RAPIDO 90 X 4  SAB	2	f	100263	0.00	0.00	0.00	1	1
262	11ARMAC-36	6	MACHO RAPIDO 90mm (3)  INTER	2	f	100264	0.00	0.00	0.00	1	1
263	11ARMAC-37	6	MACHO RAPIDO 90mm (3) ERA	2	f	100265	0.00	0.00	0.00	1	1
264	11ARMAC-38	6	MACHO RAPIDO 90mm X 4 INTER	2	f	100266	0.00	0.00	0.00	1	1
265	11ARMAC-39	6	MACHO RAPIDO 20 x 1/2  AQP	2	f	100267	0.00	0.00	0.00	1	1
266	11ARMAC-40	6	MACHO RAPIDO 25 x 3/4 AQP	2	f	100268	0.00	0.00	0.00	1	1
267	11ARMAC-41	6	MACHO RAPIDO 32 x 1 AQP	2	f	100269	0.00	0.00	0.00	1	1
268	11ARMAC-42	6	MACHO RAPIDO 40 x 11/4 AQP	2	f	100270	0.00	0.00	0.00	1	1
269	11ARMAC-43	6	MACHO RAPIDO 50 x 11/2 AQP	2	f	100271	0.00	0.00	0.00	1	1
270	11ARMAC-44	6	MACHO RAPIDO 63 x 2 AQP	2	f	100272	0.00	0.00	0.00	1	1
271	11ARMAC-45	6	MACHO RAPIDO 90 x 3 AQP	2	f	100273	0.00	0.00	0.00	1	1
272	11ARMAC-46	6	MACHO RAPIDO 110 x 4 AQP	2	f	100274	0.00	0.00	0.00	1	1
273	11ARMAC-47	6	MACHO RAPIDO 90 X 3  SAB	2	f	100275	0.00	0.00	0.00	1	1
274	11ARREP-01	6	ARANDELA PRENSA O-RING  110 mm SAB	2	f	100276	0.00	0.00	0.00	1	1
275	11ARREP-02	6	ARANDELA PRENSA O-RING  20 mm SAB	2	f	100277	0.00	0.00	0.00	1	1
276	11ARREP-03	6	ARANDELA PRENSA O-RING  25 mm SAB	2	f	100278	0.00	0.00	0.00	1	1
277	11ARREP-04	6	ARANDELA PRENSA O-RING  32 mm SAB	2	f	100279	0.00	0.00	0.00	1	1
278	11ARREP-05	6	ARANDELA PRENSA O-RING  40 mm SAB	2	f	100280	0.00	0.00	0.00	1	1
279	11ARREP-06	6	ARANDELA PRENSA O-RING  50 mm SAB	2	f	100281	0.00	0.00	0.00	1	1
280	11ARREP-07	6	ARANDELA PRENSA O-RING  63 mm SAB	2	f	100282	0.00	0.00	0.00	1	1
281	11ARREP-08	6	BUJE ROSCADO SAB 3 X 1 1/2 SAB	2	f	100283	0.00	0.00	0.00	1	1
282	11ARREP-09	6	BUJE ROSCADO SAB 3 X 1 SAB	2	f	100284	0.00	0.00	0.00	1	1
283	11ARREP-10	6	BUJE ROSCADO SAB 3 X 2 SAB	2	f	100285	0.00	0.00	0.00	1	1
284	11ARREP-11	6	CONO PARTIDO 110 mm SAB	2	f	100286	0.00	0.00	0.00	1	1
285	11ARREP-12	6	CONO PARTIDO 20 mm SAB	2	f	100287	0.00	0.00	0.00	1	1
286	11ARREP-13	6	CONO PARTIDO 25 mm SAB	2	f	100288	0.00	0.00	0.00	1	1
287	11ARREP-14	6	CONO PARTIDO 32 mm SAB	2	f	100289	0.00	0.00	0.00	1	1
288	11ARREP-15	6	CONO PARTIDO 40 mm SAB	2	f	100290	0.00	0.00	0.00	1	1
289	11ARREP-16	6	CONO PARTIDO 50 mm SAB	2	f	100291	0.00	0.00	0.00	1	1
290	11ARREP-17	6	CONO PARTIDO 63 mm SAB	2	f	100292	0.00	0.00	0.00	1	1
291	11ARREP-18	6	CONO PARTIDO 90 mm SAB	2	f	100293	0.00	0.00	0.00	1	1
292	11ARREP-19	6	DADO 110 mm SAB	2	f	100294	0.00	0.00	0.00	1	1
293	11ARREP-20	6	DADO 20 mm SAB	2	f	100295	0.00	0.00	0.00	1	1
294	11ARREP-21	6	DADO 25 mm SAB	2	f	100296	0.00	0.00	0.00	1	1
295	11ARREP-22	6	DADO 32 mm SAB	2	f	100297	0.00	0.00	0.00	1	1
296	11ARREP-23	6	DADO 40 mm SAB	2	f	100298	0.00	0.00	0.00	1	1
297	11ARREP-24	6	DADO 50 mm SAB	2	f	100299	0.00	0.00	0.00	1	1
298	11ARREP-25	6	DADO 63 mm SAB	2	f	100300	0.00	0.00	0.00	1	1
299	11ARREP-26	6	DADO 90 mm SAB	2	f	100301	0.00	0.00	0.00	1	1
300	11ARREP-27	6	O-RING  110 mm SAB	2	f	100302	0.00	0.00	0.00	1	1
301	11ARREP-28	6	O-RING  25 mm SAB	2	f	100303	0.00	0.00	0.00	1	1
302	11ARREP-29	6	O-RING  40 mm SAB	2	f	100304	0.00	0.00	0.00	1	1
303	11ARREP-30	6	O-RING  50 mm SAB	2	f	100305	0.00	0.00	0.00	1	1
304	11ARREP-31	6	O-RING  63 mm SAB	2	f	100306	0.00	0.00	0.00	1	1
305	11ARREP-32	6	O-RING  90 mm SAB	2	f	100307	0.00	0.00	0.00	1	1
306	11ARREP-33	6	O-RING 110mm INTER	2	f	100308	0.00	0.00	0.00	1	1
307	11ARREP-34	6	O-RING 20mm INTER	2	f	100309	0.00	0.00	0.00	1	1
308	11ARREP-35	6	O-RING 25mm INTER	2	f	100310	0.00	0.00	0.00	1	1
309	11ARREP-36	6	O-RING 32mm INTER	2	f	100311	0.00	0.00	0.00	1	1
310	11ARREP-37	6	O-RING 40mm INTER	2	f	100312	0.00	0.00	0.00	1	1
311	11ARREP-38	6	O-RING 50mm INTER	2	f	100313	0.00	0.00	0.00	1	1
312	11ARREP-39	6	O-RING 63mm INTER	2	f	100314	0.00	0.00	0.00	1	1
313	11ARREP-40	6	O-RING 90mm INTER	2	f	100315	0.00	0.00	0.00	1	1
314	11ARREP-41	6	O-RING  20 mm AQP	2	f	100316	0.00	0.00	0.00	1	1
315	11ARREP-42	6	O-RING  25 mm AQP	2	f	100317	0.00	0.00	0.00	1	1
316	11ARREP-43	6	O-RING  32 mm AQP	2	f	100318	0.00	0.00	0.00	1	1
317	11ARREP-44	6	O-RING  40 mm AQP	2	f	100319	0.00	0.00	0.00	1	1
318	11ARREP-45	6	O-RING  50 mm AQP	2	f	100320	0.00	0.00	0.00	1	1
319	11ARREP-46	6	O-RING  63 mm AQP	2	f	100321	0.00	0.00	0.00	1	1
320	11ARREP-47	6	O-RING  90 mm AQP	2	f	100322	0.00	0.00	0.00	1	1
321	11ARREP-48	6	O-RING  110 mm AQP	2	f	100323	0.00	0.00	0.00	1	1
322	11ARTEE-01	6	TEE RAPIDA 110mm (4)  INTER	2	f	100324	0.00	0.00	0.00	1	1
323	11ARTEE-02	6	TEE RAPIDA 110mm (4) ERA	2	f	100325	0.00	0.00	0.00	1	1
324	11ARTEE-03	6	TEE RAPIDA 110mm SAB	2	f	100326	0.00	0.00	0.00	1	1
325	11ARTEE-04	6	TEE RAPIDA 16mm (3/8)  INTER	2	f	100327	0.00	0.00	0.00	1	1
326	11ARTEE-05	6	TEE RAPIDA 16mm(3/8) ERA	2	f	100328	0.00	0.00	0.00	1	1
327	11ARTEE-06	6	TEE RAPIDA 20mm (1/2)  INTER	2	f	100329	0.00	0.00	0.00	1	1
328	11ARTEE-07	6	TEE RAPIDA 20mm (1/2) ERA	2	f	100330	0.00	0.00	0.00	1	1
329	11ARTEE-08	6	TEE RAPIDA 25mm (3/4)  INTER	2	f	100331	0.00	0.00	0.00	1	1
330	11ARTEE-09	6	TEE RAPIDA 25mm (3/4) ERA	2	f	100332	0.00	0.00	0.00	1	1
331	11ARTEE-10	6	TEE RAPIDA 32mm (1)  INTER	2	f	100333	0.00	0.00	0.00	1	1
332	11ARTEE-11	6	TEE RAPIDA 32mm (1) ERA	2	f	100334	0.00	0.00	0.00	1	1
333	11ARTEE-12	6	TEE RAPIDA 40mm (1 1/4)  INTER	2	f	100335	0.00	0.00	0.00	1	1
334	11ARTEE-13	6	TEE RAPIDA 40mm (1 1/4) ERA	2	f	100336	0.00	0.00	0.00	1	1
335	11ARTEE-14	6	TEE RAPIDA 50mm (1 1/2)  INTER	2	f	100337	0.00	0.00	0.00	1	1
336	11ARTEE-15	6	TEE RAPIDA 50mm (1 1/2) ERA	2	f	100338	0.00	0.00	0.00	1	1
337	11ARTEE-16	6	TEE RAPIDA 50mm SAB	2	f	100339	0.00	0.00	0.00	1	1
338	11ARTEE-17	6	TEE RAPIDA 63mm (2)  INTER	2	f	100340	0.00	0.00	0.00	1	1
339	11ARTEE-18	6	TEE RAPIDA 63mm (2) ERA	2	f	100341	0.00	0.00	0.00	1	1
340	11ARTEE-19	6	TEE RAPIDA 90mm (3)  INTER	2	f	100342	0.00	0.00	0.00	1	1
341	11ARTEE-20	6	TEE RAPIDA 90mm (3) ERA	2	f	100343	0.00	0.00	0.00	1	1
342	11ARTEE-21	6	TEE RAPIDA 90mm SAB	2	f	100344	0.00	0.00	0.00	1	1
343	11ARTEE-22	6	TEE RAPIDA 20mm (1/2) AQP	2	f	100345	0.00	0.00	0.00	1	1
344	11ARTEE-23	6	TEE RAPIDA 25mm (3/4) AQP	2	f	100346	0.00	0.00	0.00	1	1
345	11ARTEE-24	6	TEE RAPIDA 32mm (1) AQP	2	f	100347	0.00	0.00	0.00	1	1
346	11ARTEE-25	6	TEE RAPIDA 40mm (1 1/4) AQP	2	f	100348	0.00	0.00	0.00	1	1
347	11ARTEE-26	6	TEE RAPIDA 63mm (2) AQP	2	f	100349	0.00	0.00	0.00	1	1
348	11ARTEE-27	6	TEE RAPIDA 50mm AQP	2	f	100350	0.00	0.00	0.00	1	1
349	11ARTEE-28	6	TEE RAPIDA 90mm AQP	2	f	100351	0.00	0.00	0.00	1	1
350	11ARTEE-29	6	TEE RAPIDA 110mm AQP	2	f	100352	0.00	0.00	0.00	1	1
351	11ARTRH-01	6	TEE RAPIDA HEMBRA 110 X 4 X 110 INTER	2	f	100353	0.00	0.00	0.00	1	1
352	11ARTRH-02	6	TEE RAPIDA HEMBRA 110 X 4 X 110mm ERA	2	f	100354	0.00	0.00	0.00	1	1
353	11ARTRH-03	6	TEE RAPIDA HEMBRA 20 X 1/2 X 20mm ERA	2	f	100355	0.00	0.00	0.00	1	1
354	11ARTRH-04	6	TEE RAPIDA HEMBRA 20 X 1/2 X 20 INTER	2	f	100356	0.00	0.00	0.00	1	1
355	11ARTRH-05	6	TEE RAPIDA HEMBRA 25 X 3/4 X 25mm ERA	2	f	100357	0.00	0.00	0.00	1	1
356	11ARTRH-06	6	TEE RAPIDA HEMBRA 25 X 3/4 X 25 INTER	2	f	100358	0.00	0.00	0.00	1	1
357	11ARTRH-07	6	TEE RAPIDA HEMBRA 32 X 1 X 32 INTER	2	f	100359	0.00	0.00	0.00	1	1
358	11ARTRH-08	6	TEE RAPIDA HEMBRA 32 X 1 X 32mm ERA	2	f	100360	0.00	0.00	0.00	1	1
359	11ARTRH-09	6	TEE RAPIDA HEMBRA 40 X 1 1/4 X 40 INTER	2	f	100361	0.00	0.00	0.00	1	1
360	11ARTRH-10	6	TEE RAPIDA HEMBRA 40 X 1 1/4 X 40mm ERA	2	f	100362	0.00	0.00	0.00	1	1
361	11ARTRH-11	6	TEE RAPIDA HEMBRA 50 X 1 1/2 X 50 INTER	2	f	100363	0.00	0.00	0.00	1	1
362	11ARTRH-12	6	TEE RAPIDA HEMBRA 50 X 1 1/2 X 50mm ERA	2	f	100364	0.00	0.00	0.00	1	1
363	11ARTRH-13	6	TEE RAPIDA HEMBRA 63 X 2 X 63 INTER	2	f	100365	0.00	0.00	0.00	1	1
364	11ARTRH-14	6	TEE RAPIDA HEMBRA 63 X 2 X 63mm ERA	2	f	100366	0.00	0.00	0.00	1	1
578	12PVC106	18	CODO CPVC 2	2	f	100580	0.00	0.00	0.00	1	1
365	11ARTRH-15	6	TEE RAPIDA HEMBRA 90 X 3 X 90 INTER	2	f	100367	0.00	0.00	0.00	1	1
366	11ARTRH-16	6	TEE RAPIDA HEMBRA 90 X 3 X 90mm ERA	2	f	100368	0.00	0.00	0.00	1	1
367	11ARTRR-01	6	TEE RAPIDA REDUCIDA 25X20X25 SAB	2	f	100369	0.00	0.00	0.00	1	1
368	11ARTRR-02	6	TEE RAPIDA REDUCIDA 32X25X32 SAB	2	f	100370	0.00	0.00	0.00	1	1
369	11ARTRR-03	6	TEE RAPIDA REDUCIDA 50X40X50 SAB	2	f	100371	0.00	0.00	0.00	1	1
370	11ARTRR-04	6	TEE RAPIDA REDUCIDA 20X16X20 SAB	2	f	100372	0.00	0.00	0.00	1	1
371	11ARTRRO-01	6	TEE RAPIDA ROSCADA 110X3X110 SAB	2	f	100373	0.00	0.00	0.00	1	1
372	11ARTRRO-02	6	TEE RAPIDA ROSCADA 110X4X110 SAB	2	f	100374	0.00	0.00	0.00	1	1
373	11ARTRRO-03	6	TEE RAPIDA ROSCADA 20X3/4X20 SAB	2	f	100375	0.00	0.00	0.00	1	1
374	11ARTRRO-04	6	TEE RAPIDA ROSCADA 25X1/2X25 SAB	2	f	100376	0.00	0.00	0.00	1	1
375	11ARTRRO-05	6	TEE RAPIDA ROSCADA 25X1X25 SAB	2	f	100377	0.00	0.00	0.00	1	1
376	11ARTRRO-06	6	TEE RAPIDA ROSCADA 32X1/2X32 SAB	2	f	100378	0.00	0.00	0.00	1	1
377	11ARTRRO-07	6	TEE RAPIDA ROSCADA 32X3/4X32 SAB	2	f	100379	0.00	0.00	0.00	1	1
378	11ARTRRO-08	6	TEE RAPIDA ROSCADA 90X2 1/2X90 SAB	2	f	100380	0.00	0.00	0.00	1	1
379	11ARTRRO-09	6	TEE RAPIDA ROSCADA 20X1/2X20 AQP	2	f	100381	0.00	0.00	0.00	1	1
380	11ARTRRO-10	6	TEE RAPIDA ROSCADA 25X3/4X25 AQP	2	f	100382	0.00	0.00	0.00	1	1
381	11ARTRRO-11	6	TEE RAPIDA ROSCADA 50X 1 1/2X50 AQP	2	f	100383	0.00	0.00	0.00	1	1
382	11ARTRRO-12	6	TEE RAPIDA ROSCADA 63X 11/2X 63 AQP	2	f	100384	0.00	0.00	0.00	1	1
383	11ARTRRO-13	6	TEE RAPIDA ROSCADA 63X 2X 63 AQP	2	f	100385	0.00	0.00	0.00	1	1
384	11ARTRRO-14	6	TEE RAPIDA ROSCADA 90 X 3X 90 AQP	2	f	100386	0.00	0.00	0.00	1	1
385	11ARUNI-01	6	UNION RAPIDA  110mm (4)  INTER	2	f	100387	0.00	0.00	0.00	1	1
386	11ARUNI-02	6	UNION RAPIDA 16mm (3/8) INTER	2	f	100388	0.00	0.00	0.00	1	1
387	11ARUNI-03	6	UNION RAPIDA  20mm (1/2)  INTER	2	f	100389	0.00	0.00	0.00	1	1
388	11ARUNI-04	6	UNION RAPIDA  25mm (3/4)  INTER	2	f	100390	0.00	0.00	0.00	1	1
389	11ARUNI-05	6	UNION RAPIDA  32mm (1)  INTER	2	f	100391	0.00	0.00	0.00	1	1
390	11ARUNI-06	6	UNION RAPIDA  40mm (1 1/4)  INTER	2	f	100392	0.00	0.00	0.00	1	1
391	11ARUNI-07	6	UNION RAPIDA 50mm (1 1/2) INTER	2	f	100393	0.00	0.00	0.00	1	1
392	11ARUNI-08	6	UNION RAPIDA  63mm (2)  INTER	2	f	100394	0.00	0.00	0.00	1	1
393	11ARUNI-09	6	UNION RAPIDA  75mm (2 1/2)  INTER	2	f	100395	0.00	0.00	0.00	1	1
394	11ARUNI-10	6	UNION RAPIDA  90mm (3)  INTER	2	f	100396	0.00	0.00	0.00	1	1
395	11ARUNI-11	6	UNION RAPIDA 110mm (4) ERA	2	f	100397	0.00	0.00	0.00	1	1
396	11ARUNI-12	6	UNION RAPIDA 16mm(3/8) ERA	2	f	100398	0.00	0.00	0.00	1	1
397	11ARUNI-13	6	UNION RAPIDA 20mm (1/2) ERA	2	f	100399	0.00	0.00	0.00	1	1
398	11ARUNI-14	6	UNION RAPIDA 25mm (3/4) ERA	2	f	100400	0.00	0.00	0.00	1	1
399	11ARUNI-15	6	UNION RAPIDA 32mm (1) ERA	2	f	100401	0.00	0.00	0.00	1	1
400	11ARUNI-16	6	UNION RAPIDA 40mm (1 1/4) ERA	2	f	100402	0.00	0.00	0.00	1	1
401	11ARUNI-17	6	UNION RAPIDA 50mm (1 1/2) ERA	2	f	100403	0.00	0.00	0.00	1	1
402	11ARUNI-18	6	UNION RAPIDA 63mm (2) ERA	2	f	100404	0.00	0.00	0.00	1	1
403	11ARUNI-19	6	UNION RAPIDA 63mm SAB	2	f	100405	0.00	0.00	0.00	1	1
404	11ARUNI-20	6	UNION RAPIDA 75mm (2 1/2) ERA	2	f	100406	0.00	0.00	0.00	1	1
405	11ARUNI-21	6	UNION RAPIDA 90mm (3) ERA	2	f	100407	0.00	0.00	0.00	1	1
406	11ARUNI-22	6	UNION RAPIDA 20mm (1/2) AQP	2	f	100408	0.00	0.00	0.00	1	1
407	11ARUNI-23	6	UNION RAPIDA 25mm (3/4) AQP	2	f	100409	0.00	0.00	0.00	1	1
408	11ARUNI-24	6	UNION RAPIDA 32mm (1) AQP	2	f	100410	0.00	0.00	0.00	1	1
409	11ARUNI-25	6	UNION RAPIDA 50mm (1 1/2) AQP	2	f	100411	0.00	0.00	0.00	1	1
410	11ARUNI-26	6	UNION RAPIDA 63mm (2) AQP	2	f	100412	0.00	0.00	0.00	1	1
411	11ARUNI-27	6	UNION RAPIDA 90mm (3) AQP	2	f	100413	0.00	0.00	0.00	1	1
412	11ARUNI-28	6	UNION RAPIDA 110mm (4) AQP	2	f	100414	0.00	0.00	0.00	1	1
413	11ARUNI-29	6	UNION RAPIDA 40mm SAB	2	f	100415	0.00	0.00	0.00	1	1
414	11ARUNI-30	6	UNION RAPIDA 16mm SAB	2	f	100416	0.00	0.00	0.00	1	1
415	11ARUNI-31	6	UNION RAPIDA 40mm AQP	2	f	100417	0.00	0.00	0.00	1	1
416	11ARUNI-32	6	UNION RAPIDA 75mm AQP	2	f	100418	0.00	0.00	0.00	1	1
417	11ARUNI-33	6	UNION RAPIDA 16mm AQP	2	f	100419	0.00	0.00	0.00	1	1
418	11ARURR-01	6	UNION REDUCIDA   63mm X 40mm ERA	2	f	100420	0.00	0.00	0.00	1	1
419	11ARURR-02	6	UNION REDUCIDA  110mm X 63mm ERA	2	f	100421	0.00	0.00	0.00	1	1
420	11ARURR-03	6	UNION REDUCIDA  110mm X 90mm ERA	2	f	100422	0.00	0.00	0.00	1	1
421	11ARURR-04	6	UNION REDUCIDA  110X63mm SAB	2	f	100423	0.00	0.00	0.00	1	1
422	11ARURR-05	6	UNION REDUCIDA  110X75mm SAB	2	f	100424	0.00	0.00	0.00	1	1
423	11ARURR-06	6	UNION REDUCIDA  20mm X 16mm ERA	2	f	100425	0.00	0.00	0.00	1	1
424	11ARURR-07	6	UNION REDUCIDA  25mm X 20mm ERA	2	f	100426	0.00	0.00	0.00	1	1
425	11ARURR-08	6	UNION REDUCIDA  32mm X 20mm ERA	2	f	100427	0.00	0.00	0.00	1	1
426	11ARURR-09	6	UNION REDUCIDA  32mm X 25mm ERA	2	f	100428	0.00	0.00	0.00	1	1
427	11ARURR-10	6	UNION REDUCIDA  40mm X 25mm ERA	2	f	100429	0.00	0.00	0.00	1	1
428	11ARURR-11	6	UNION REDUCIDA  40mm X 32mm ERA	2	f	100430	0.00	0.00	0.00	1	1
429	11ARURR-12	6	UNION REDUCIDA  40X25mm SAB	2	f	100431	0.00	0.00	0.00	1	1
430	11ARURR-13	6	UNION REDUCIDA  40X32mm SAB	2	f	100432	0.00	0.00	0.00	1	1
431	11ARURR-14	6	UNION REDUCIDA  50mm X 32mm ERA	2	f	100433	0.00	0.00	0.00	1	1
432	11ARURR-15	6	UNION REDUCIDA  50mm X 40mm ERA	2	f	100434	0.00	0.00	0.00	1	1
433	11ARURR-16	6	UNION REDUCIDA  50X40mm SAB	2	f	100435	0.00	0.00	0.00	1	1
434	11ARURR-17	6	UNION REDUCIDA  63mm X 32mm ERA	2	f	100436	0.00	0.00	0.00	1	1
435	11ARURR-18	6	UNION REDUCIDA  63mm X 50mm ERA	2	f	100437	0.00	0.00	0.00	1	1
436	11ARURR-19	6	UNION REDUCIDA  63X40mm SAB	2	f	100438	0.00	0.00	0.00	1	1
437	11ARURR-20	6	UNION REDUCIDA  75X50mm SAB	2	f	100439	0.00	0.00	0.00	1	1
438	11ARURR-21	6	UNION REDUCIDA  75X63mm SAB	2	f	100440	0.00	0.00	0.00	1	1
439	11ARURR-22	6	UNION REDUCIDA  90mm X 50mm ERA	2	f	100441	0.00	0.00	0.00	1	1
440	11ARURR-23	6	UNION REDUCIDA  90mm X 63mm ERA	2	f	100442	0.00	0.00	0.00	1	1
441	11ARURR-24	6	UNION REDUCIDA 20 X 16mm SAB	2	f	100443	0.00	0.00	0.00	1	1
442	11ARURR-25	6	UNION REDUCIDA 25 X 16mm SAB	2	f	100444	0.00	0.00	0.00	1	1
443	11ARURR-26	6	UNION REDUCIDA 32mm x 20mm AQP	2	f	100445	0.00	0.00	0.00	1	1
444	11ARURR-27	6	UNION REDUCIDA 50mm x 32mm AQP	2	f	100446	0.00	0.00	0.00	1	1
445	11ARURR-28	6	UNION REDUCIDA 63mm x 32mm AQP	2	f	100447	0.00	0.00	0.00	1	1
446	11ARURR-29	6	UNION REDUCIDA 63mm x 50mm AQP	2	f	100448	0.00	0.00	0.00	1	1
447	11ARURR-30	6	UNION REDUCIDA 90mm x 63mm AQP	2	f	100449	0.00	0.00	0.00	1	1
448	11ARURR-31	6	UNION REDUCIDA 110mm x 90mm AQP	2	f	100450	0.00	0.00	0.00	1	1
449	11ARURR-32	6	UNION REDUCIDA 25 X 20mm SAB	2	f	100451	0.00	0.00	0.00	1	1
450	11ARURR-33	6	UNION REDUCIDA 25 X 20mm AQP	2	f	100452	0.00	0.00	0.00	1	1
451	11ARURR-34	6	UNION REDUCIDA 32 X 25mm AQP	2	f	100453	0.00	0.00	0.00	1	1
452	11ARURR-35	6	UNION REDUCIDA 50 X 40mm AQP	2	f	100454	0.00	0.00	0.00	1	1
453	11ARURR-36	6	UNION REDUCIDA 110 X 63mm AQP	2	f	100455	0.00	0.00	0.00	1	1
454	11ARVAL-01	6	VALVULA RAPIDA 20mm ERA	2	f	100456	0.00	0.00	0.00	1	1
455	11ARVAL-02	6	VALVULA RAPIDA 25mm ERA	2	f	100457	0.00	0.00	0.00	1	1
456	11ARVAL-03	6	VALVULA RAPIDA 32mm  ERA	2	f	100458	0.00	0.00	0.00	1	1
457	11ARVAL-04	6	VALVULA RAPIDA 50mm ERA	2	f	100459	0.00	0.00	0.00	1	1
458	11ARVAL-05	6	VALVULA RAPIDA 63mm ERA	2	f	100460	0.00	0.00	0.00	1	1
459	11ARVAL-06	6	VALVULA RAPIDA 90mm ERA	2	f	100461	0.00	0.00	0.00	1	1
460	11ARVAL-07	6	VALVULA RAPIDA 20mm AQP	2	f	100462	0.00	0.00	0.00	1	1
461	11ARVAL-08	6	VALVULA RAPIDA 25mm AQP	2	f	100463	0.00	0.00	0.00	1	1
462	11ARVAL-09	6	VALVULA RAPIDA 32mm AQP	2	f	100464	0.00	0.00	0.00	1	1
463	11ARVAL-10	6	VALVULA RAPIDA 40mm AQP	2	f	100465	0.00	0.00	0.00	1	1
464	11ARVAL-11	6	VALVULA RAPIDA 50mm AQP	2	f	100466	0.00	0.00	0.00	1	1
465	11ARVAL-12	6	VALVULA RAPIDA 63mm AQP	2	f	100467	0.00	0.00	0.00	1	1
466	11ARVEN-01	6	VALVULA VENTOSA 1/2	2	f	100468	0.00	0.00	0.00	1	1
467	11ARVEN-02	6	VALVULA VENTOSA 1	2	f	100469	0.00	0.00	0.00	1	1
468	11ARVEN-03	6	VALVULA VENTOSA 3/4	2	f	100470	0.00	0.00	0.00	1	1
469	11ARVEN-04	6	VALVULA VENTOSA DOBLE EFECTO 2 SAB	2	f	100471	0.00	0.00	0.00	1	1
470	11ARVEN-05	6	VALVULA VENTOSA DOBLE EFECTO 1	2	f	100472	0.00	0.00	0.00	1	1
471	11ARVEN-06	6	VALVULA VENTOSA DOBLE EFECTO 3/4 DURMAN	2	f	100473	0.00	0.00	0.00	1	1
472	11ARVEN-07	6	VALVULA VENTOSA DOBLE EFECTO 3/4 BERMAD	2	f	100474	0.00	0.00	0.00	1	1
473	12PVC001	\N	ABASTO PLASTICO	\N	f	100475	0.00	0.00	0.00	1	1
474	12PVC002	18	ADAPTADOR LIMPIEZA SANIT 2 PAVCO	2	f	100476	0.00	0.00	0.00	1	1
475	12PVC003	18	BRIDA PVC DE 2 1/2 SOLDADO	2	f	100477	0.00	0.00	0.00	1	1
476	12PVC004	18	BRIDA PVC GIRATORIA DE 2 SOLDADO	2	f	100478	0.00	0.00	0.00	1	1
477	12PVC005	18	BUJE PVC PRESION ROSCADO 1 1/2 X 1 1/4	2	f	100479	0.00	0.00	0.00	1	1
478	12PVC006	18	BUJE PVC PRESION ROSCADO 1 1/2 X 1	2	f	100480	0.00	0.00	0.00	1	1
479	12PVC007	18	BUJE PVC PRESION ROSCADO 1 1/2 x 1 PAVCO	2	f	100481	0.00	0.00	0.00	1	1
480	12PVC008	18	BUJE PVC PRESION ROSCADO 1 1/2 X 1/2	2	f	100482	0.00	0.00	0.00	1	1
481	12PVC009	18	BUJE PVC PRESION ROSCADO 1 1/2 X 3/4	2	f	100483	0.00	0.00	0.00	1	1
482	12PVC010	18	BUJE PVC PRESION ROSCADO 1 1/2 x 3/4 PAVCO	2	f	100484	0.00	0.00	0.00	1	1
483	12PVC011	18	BUJE PVC PRESION ROSCADO 1 1/4 X 1	2	f	100485	0.00	0.00	0.00	1	1
484	12PVC012	18	BUJE PVC PRESION ROSCADO 1 1/4 X 1/2	2	f	100486	0.00	0.00	0.00	1	1
485	12PVC013	18	BUJE PVC PRESION ROSCADO 1 1/4 X 3/4	2	f	100487	0.00	0.00	0.00	1	1
486	12PVC014	18	BUJE PVC PRESION ROSCADO 1 X 1/2	2	f	100488	0.00	0.00	0.00	1	1
487	12PVC015	18	BUJE PVC PRESION ROSCADO 1 X 1/2 PAVCO	2	f	100489	0.00	0.00	0.00	1	1
488	12PVC016	18	BUJE PVC PRESION ROSCADO 1 X 3/4	2	f	100490	0.00	0.00	0.00	1	1
489	12PVC017	18	BUJE PVC PRESION ROSCADO 1/2 x 1/4 PAVCO	2	f	100491	0.00	0.00	0.00	1	1
490	12PVC018	18	BUJE PVC PRESION ROSCADO 2 x 11/4 PAVCO	2	f	100492	0.00	0.00	0.00	1	1
491	12PVC019	18	BUJE PVC PRESION ROSCADO 2 X 1 1/2	2	f	100493	0.00	0.00	0.00	1	1
492	12PVC020	18	BUJE PVC PRESION ROSCADO 2 x 1 1/2 PAVCO	2	f	100494	0.00	0.00	0.00	1	1
493	12PVC021	18	BUJE PVC PRESION ROSCADO 2 X 1 1/4	2	f	100495	0.00	0.00	0.00	1	1
494	12PVC022	18	BUJE PVC PRESION ROSCADO 2 X 1	2	f	100496	0.00	0.00	0.00	1	1
495	12PVC023	18	BUJE PVC PRESION ROSCADO 2 x 1 PAVCO	2	f	100497	0.00	0.00	0.00	1	1
496	12PVC024	18	BUJE PVC PRESION ROSCADO 2 X 1/2	2	f	100498	0.00	0.00	0.00	1	1
497	12PVC025	18	BUJE PVC PRESION ROSCADO 2 X 3/4	2	f	100499	0.00	0.00	0.00	1	1
498	12PVC026	18	BUJE PVC PRESION ROSCADO 3 X 1 1/2	2	f	100500	0.00	0.00	0.00	1	1
499	12PVC027	18	BUJE PVC PRESION ROSCADO 3 X 1 1/4	2	f	100501	0.00	0.00	0.00	1	1
500	12PVC028	18	BUJE PVC PRESION ROSCADO 3 X 1	2	f	100502	0.00	0.00	0.00	1	1
501	12PVC029	18	BUJE PVC PRESION ROSCADO 3 X 1/2	2	f	100503	0.00	0.00	0.00	1	1
502	12PVC030	18	BUJE PVC PRESION ROSCADO 3 X 2	2	f	100504	0.00	0.00	0.00	1	1
503	12PVC031	18	BUJE PVC PRESION ROSCADO 3 X 2 PAVCO	2	f	100505	0.00	0.00	0.00	1	1
504	12PVC032	18	BUJE PVC PRESION ROSCADO 3 X 3/4	2	f	100506	0.00	0.00	0.00	1	1
505	12PVC033	18	BUJE PVC PRESION ROSCADO 3/4 X 1/2	2	f	100507	0.00	0.00	0.00	1	1
506	12PVC034	18	BUJE PVC PRESION ROSCADO 3/4 X 1/2 PAVCO	2	f	100508	0.00	0.00	0.00	1	1
728	12PVC255	18	TEE PVC PRESION 1/2	2	f	100730	0.00	0.00	0.00	1	1
507	12PVC035	18	BUJE PVC PRESION ROSCADO 4 X 1 1/2	2	f	100509	0.00	0.00	0.00	1	1
508	12PVC036	18	BUJE PVC PRESION ROSCADO 4 X 1 1/4	2	f	100510	0.00	0.00	0.00	1	1
509	12PVC037	18	BUJE PVC PRESION ROSCADO 4 X 1	2	f	100511	0.00	0.00	0.00	1	1
510	12PVC038	18	BUJE PVC PRESION ROSCADO 4 X 1/2	2	f	100512	0.00	0.00	0.00	1	1
511	12PVC039	18	BUJE PVC PRESION ROSCADO 4 X 2	2	f	100513	0.00	0.00	0.00	1	1
512	12PVC040	18	BUJE PVC PRESION ROSCADO 4 X 3 PAVCO	2	f	100514	0.00	0.00	0.00	1	1
513	12PVC041	18	BUJE PVC PRESION ROSCADO 4 X 3/4	2	f	100515	0.00	0.00	0.00	1	1
514	12PVC042	18	BUJE PVC PRESION SOLDADO 1 1/2 X 1 1/4	2	f	100516	0.00	0.00	0.00	1	1
515	12PVC043	18	BUJE PVC PRESION SOLDADO 1 1/2 X 1	2	f	100517	0.00	0.00	0.00	1	1
516	12PVC044	18	BUJE PVC PRESION SOLDADO 1 1/2 x 1  PAVCO	2	f	100518	0.00	0.00	0.00	1	1
517	12PVC045	18	BUJE PVC PRESION SOLDADO 1 1/2 X 1/2	2	f	100519	0.00	0.00	0.00	1	1
518	12PVC046	18	BUJE PVC PRESION SOLDADO 1 1/2 X 3/4	2	f	100520	0.00	0.00	0.00	1	1
519	12PVC047	18	BUJE PVC PRESION SOLDADO 1 1/4 X 1	2	f	100521	0.00	0.00	0.00	1	1
520	12PVC048	18	BUJE PVC PRESION SOLDADO 1 1/4 X 1/2	2	f	100522	0.00	0.00	0.00	1	1
521	12PVC049	18	BUJE PVC PRESION SOLDADO 1 1/4 X 3/4	2	f	100523	0.00	0.00	0.00	1	1
522	12PVC050	18	BUJE PVC PRESION SOLDADO 1 X 1/2	2	f	100524	0.00	0.00	0.00	1	1
523	12PVC051	18	BUJE PVC PRESION SOLDADO 1 x 1/2 PAVCO	2	f	100525	0.00	0.00	0.00	1	1
524	12PVC052	18	BUJE PVC PRESION SOLDADO 1 X 3/4	2	f	100526	0.00	0.00	0.00	1	1
525	12PVC053	18	BUJE PVC PRESION SOLDADO 2 1/2 x 1 1/2	2	f	100527	0.00	0.00	0.00	1	1
526	12PVC054	18	BUJE PVC PRESION SOLDADO 2 1/2 X 2	2	f	100528	0.00	0.00	0.00	1	1
527	12PVC055	18	BUJE PVC PRESION SOLDADO 2 x 11/4 PAVCO	2	f	100529	0.00	0.00	0.00	1	1
528	12PVC056	18	BUJE PVC PRESION SOLDADO 2 X 1 1/2	2	f	100530	0.00	0.00	0.00	1	1
529	12PVC057	18	BUJE PVC PRESION SOLDADO 2 X 1 1/4	2	f	100531	0.00	0.00	0.00	1	1
530	12PVC058	18	BUJE PVC PRESION SOLDADO 2 X 1	2	f	100532	0.00	0.00	0.00	1	1
531	12PVC059	18	BUJE PVC PRESION SOLDADO 2 X 1/2	2	f	100533	0.00	0.00	0.00	1	1
532	12PVC060	18	BUJE PVC PRESION SOLDADO 2 X 3/4	2	f	100534	0.00	0.00	0.00	1	1
533	12PVC061	18	BUJE PVC PRESION SOLDADO 3 x 2 1/2 PAVCO	2	f	100535	0.00	0.00	0.00	1	1
534	12PVC062	18	BUJE PVC PRESION SOLDADO 3 X 1 1/2	2	f	100536	0.00	0.00	0.00	1	1
535	12PVC063	18	BUJE PVC PRESION SOLDADO 3 X 1 1/4	2	f	100537	0.00	0.00	0.00	1	1
536	12PVC064	18	BUJE PVC PRESION SOLDADO 3 X 1	2	f	100538	0.00	0.00	0.00	1	1
537	12PVC065	18	BUJE PVC PRESION SOLDADO 3 X 1/2	2	f	100539	0.00	0.00	0.00	1	1
538	12PVC066	18	BUJE PVC PRESION SOLDADO 3 x 2 PAVCO	2	f	100540	0.00	0.00	0.00	1	1
539	12PVC067	18	BUJE PVC PRESION SOLDADO 3 X 3/4	2	f	100541	0.00	0.00	0.00	1	1
540	12PVC068	18	BUJE PVC PRESION SOLDADO 3X 2	2	f	100542	0.00	0.00	0.00	1	1
541	12PVC069	18	BUJE PVC PRESION SOLDADO 3/4 X 1/2	2	f	100543	0.00	0.00	0.00	1	1
542	12PVC070	18	BUJE PVC PRESION SOLDADO 4 X 1 1/2	2	f	100544	0.00	0.00	0.00	1	1
543	12PVC071	18	BUJE PVC PRESION SOLDADO 4 X 1 1/4	2	f	100545	0.00	0.00	0.00	1	1
544	12PVC072	18	BUJE PVC PRESION SOLDADO 4 X 1	2	f	100546	0.00	0.00	0.00	1	1
545	12PVC073	18	BUJE PVC PRESION SOLDADO 4 X 1/2	2	f	100547	0.00	0.00	0.00	1	1
546	12PVC074	18	BUJE PVC PRESION SOLDADO 4 x 2 1/2 PAVCO	2	f	100548	0.00	0.00	0.00	1	1
547	12PVC075	18	BUJE PVC PRESION SOLDADO 4 x 2 1/2 PAVCO	2	f	100549	0.00	0.00	0.00	1	1
548	12PVC076	18	BUJE PVC PRESION SOLDADO 4 X 2	2	f	100550	0.00	0.00	0.00	1	1
549	12PVC077	18	BUJE PVC PRESION SOLDADO 4 X 2 PAVCO	2	f	100551	0.00	0.00	0.00	1	1
550	12PVC078	18	BUJE PVC PRESION SOLDADO 4 X 3	2	f	100552	0.00	0.00	0.00	1	1
551	12PVC079	18	BUJE PVC PRESION SOLDADO 4 x 3 PAVCO	2	f	100553	0.00	0.00	0.00	1	1
552	12PVC080	18	BUJE PVC PRESION SOLDADO 4 X 3/4	2	f	100554	0.00	0.00	0.00	1	1
553	12PVC081	18	BUJE PVC PRESION SOLDADO 6 x 4 PAVCO	2	f	100555	0.00	0.00	0.00	1	1
554	12PVC082	18	BUJE PVC SANITARIO SOLDADO 4 x 2 PAVCO	2	f	100556	0.00	0.00	0.00	1	1
555	12PVC083	18	BUJE PVC SANITARIO SOLDADO 4 x 3 PAVCO	2	f	100557	0.00	0.00	0.00	1	1
556	12PVC084	18	BUJE ROSCA ROSCA 1 1/2 x 1	2	f	100558	0.00	0.00	0.00	1	1
557	12PVC085	18	BUJE ROSCA ROSCA 1 1/2 x 1 1/4	2	f	100559	0.00	0.00	0.00	1	1
558	12PVC086	18	BUJE ROSCA ROSCA 1 1/4 x 1	2	f	100560	0.00	0.00	0.00	1	1
559	12PVC087	18	BUJE ROSCA ROSCA 2 x 1 1/2	2	f	100561	0.00	0.00	0.00	1	1
560	12PVC088	18	BUJE ROSCA ROSCA 3/4 x 1/2	2	f	100562	0.00	0.00	0.00	1	1
561	12PVC089	18	BUJE SANITARIO PVC 2 X 1/2	2	f	100563	0.00	0.00	0.00	1	1
562	12PVC090	18	BUJE SANITARIO PVC 2 x 11/2	2	f	100564	0.00	0.00	0.00	1	1
563	12PVC091	18	BUJE SANITARIO PVC 3 X 1 1/2	2	f	100565	0.00	0.00	0.00	1	1
564	12PVC092	18	BUJE SANITARIO PVC 3 X 2	2	f	100566	0.00	0.00	0.00	1	1
565	12PVC093	18	BUJE SANITARIO PVC 4 X 1 1/2	2	f	100567	0.00	0.00	0.00	1	1
566	12PVC094	18	BUJE SANITARIO PVC 4 X 2	2	f	100568	0.00	0.00	0.00	1	1
567	12PVC095	18	BUJE SANITARIO PVC 4 X 3	2	f	100569	0.00	0.00	0.00	1	1
568	12PVC096	18	BUJE SANITARIO PVC 6 X 1 1/2	2	f	100570	0.00	0.00	0.00	1	1
569	12PVC097	18	BUJE SANITARIO PVC 6 X 2	2	f	100571	0.00	0.00	0.00	1	1
570	12PVC098	18	BUJE SANITARIO PVC 6 X 3	2	f	100572	0.00	0.00	0.00	1	1
571	12PVC099	18	BUJE SANITARIO PVC 6 x 4	2	f	100573	0.00	0.00	0.00	1	1
572	12PVC100	18	BUJE SOLDADO CPVC 1 X 3/4	2	f	100574	0.00	0.00	0.00	1	1
573	12PVC101	18	BUJE SOLDADO CPVC 2 X 1	2	f	100575	0.00	0.00	0.00	1	1
574	12PVC102	18	BUJE SOLDADO CPVC 2 X 1	2	f	100576	0.00	0.00	0.00	1	1
575	12PVC103	18	CINTA TEFLON INDUSTRIAL 3/4  x 50 MT	2	f	100577	0.00	0.00	0.00	1	1
576	12PVC104	18	CINTA TEFLON PEQUEÑA 3/4 x 20 MT PAVCO	2	f	100578	0.00	0.00	0.00	1	1
579	12PVC107	18	CODO PVC PRESION 1 1/2	2	f	100581	0.00	0.00	0.00	1	1
580	12PVC108	18	CODO PVC PRESION 1 1/4	2	f	100582	0.00	0.00	0.00	1	1
581	12PVC109	18	CODO PVC PRESION 1	2	f	100583	0.00	0.00	0.00	1	1
582	12PVC110	18	CODO PVC PRESION 1/2	2	f	100584	0.00	0.00	0.00	1	1
583	12PVC111	18	CODO PVC PRESION 1/2 PAVCO	2	f	100585	0.00	0.00	0.00	1	1
584	12PVC112	18	CODO PVC PRESION 2 1/2 PAVCO	2	f	100586	0.00	0.00	0.00	1	1
585	12PVC113	18	CODO PVC PRESION 2	2	f	100587	0.00	0.00	0.00	1	1
586	12PVC114	18	CODO PVC PRESION 2 PAVCO	2	f	100588	0.00	0.00	0.00	1	1
587	12PVC115	18	CODO PVC PRESION 3	2	f	100589	0.00	0.00	0.00	1	1
588	12PVC116	18	CODO PVC PRESION 3 PAVCO	2	f	100590	0.00	0.00	0.00	1	1
589	12PVC117	18	CODO PVC PRESION 3/4	2	f	100591	0.00	0.00	0.00	1	1
590	12PVC118	18	CODO PVC PRESION 4	2	f	100592	0.00	0.00	0.00	1	1
591	12PVC119	18	CODO PVC PRESION 4 PAVCO	2	f	100593	0.00	0.00	0.00	1	1
592	12PVC120	18	CODO PVC PRESION 6	2	f	100594	0.00	0.00	0.00	1	1
593	12PVC121	18	CODO PVC PRESION 6 PAVCO	2	f	100595	0.00	0.00	0.00	1	1
594	12PVC122	18	CODO PVC PRESION ROSCA HEM 1/2	2	f	100596	0.00	0.00	0.00	1	1
595	12PVC123	18	CODO PVC PRESION 3 DURMAN	2	f	100597	0.00	0.00	0.00	1	1
596	12PVC124	18	CODO PVC SANITARIO 1 1/2	2	f	100598	0.00	0.00	0.00	1	1
597	12PVC125	18	CODO PVC SANITARIO 2 1/2 PAVCO	2	f	100599	0.00	0.00	0.00	1	1
598	12PVC126	18	CODO PVC SANITARIO 2	2	f	100600	0.00	0.00	0.00	1	1
599	12PVC127	18	CODO PVC SANITARIO 3	2	f	100601	0.00	0.00	0.00	1	1
600	12PVC128	18	CODO PVC SANITARIO 3 C X E	2	f	100602	0.00	0.00	0.00	1	1
601	12PVC129	18	CODO PVC SANITARIO 4	2	f	100603	0.00	0.00	0.00	1	1
602	12PVC130	18	CODO PVC SANITARIO 4 PAVCO	2	f	100604	0.00	0.00	0.00	1	1
603	12PVC131	18	CODO PVC SANITARIO 6	2	f	100605	0.00	0.00	0.00	1	1
604	12PVC132	18	COLLAR DERIVACION PVC 3 x 1/2	2	f	100606	0.00	0.00	0.00	1	1
605	12PVC133	18	CRUZ PVC PRESION SOLDADA 1/2	2	f	100607	0.00	0.00	0.00	1	1
606	12PVC134	18	EMPAQUE  FLANCHE 2 1/2	2	f	100608	0.00	0.00	0.00	1	1
607	12PVC135	18	EMPAQUE FLOTADOR NEGRO	2	f	100609	0.00	0.00	0.00	1	1
608	12PVC136	18	EMPAQUE FLOTADOR PIN NEGRO	2	f	100610	0.00	0.00	0.00	1	1
609	12PVC137	18	FLANCHE PVC 1 1/2	2	f	100611	0.00	0.00	0.00	1	1
610	12PVC138	18	FLANCHE PVC GIRATORIO SOLD 2	2	f	100612	0.00	0.00	0.00	1	1
611	12PVC139	18	FLANCHE PVC GIRATORIO ROSCADO 3	2	f	100613	0.00	0.00	0.00	1	1
612	12PVC140	18	FLANCHE PVC GIRATORIO ROSCADO 4	2	f	100614	0.00	0.00	0.00	1	1
613	12PVC141	18	FLANCHE PVC GIRATORIO SOLDADO 2 1/2	2	f	100615	0.00	0.00	0.00	1	1
614	12PVC142	18	FLOTADOR  BOLA PLASTICA DE 3/4	2	f	100616	0.00	0.00	0.00	1	1
615	12PVC143	18	FLOTADOR PARA BEBEDERO	2	f	100617	0.00	0.00	0.00	1	1
616	12PVC144	18	FLOTADOR TANQUE ALTO DE 1/2 BRONCE	2	f	100618	0.00	0.00	0.00	1	1
617	12PVC145	18	HEMBRA PVC PRESION  2 1/2  PAVCO	2	f	100619	0.00	0.00	0.00	1	1
618	12PVC-145	18	FLOTADOR LC PVC 1	2	f	100620	0.00	0.00	0.00	1	1
619	12PVC146	18	HEMBRA PVC PRESION 1 1/2	2	f	100621	0.00	0.00	0.00	1	1
620	12PVC-146	18	FLOTADOR LD PVC 3/4	2	f	100622	0.00	0.00	0.00	1	1
621	12PVC147	18	HEMBRA PVC PRESION 1 1/4	2	f	100623	0.00	0.00	0.00	1	1
622	12PVC148	18	HEMBRA PVC PRESION 1	2	f	100624	0.00	0.00	0.00	1	1
623	12PVC149	18	HEMBRA PVC PRESION 1/2	2	f	100625	0.00	0.00	0.00	1	1
624	12PVC150	18	HEMBRA PVC PRESION 2	2	f	100626	0.00	0.00	0.00	1	1
625	12PVC151	18	HEMBRA PVC PRESION 2 PAVCO	2	f	100627	0.00	0.00	0.00	1	1
626	12PVC152	18	HEMBRA PVC PRESION 3	2	f	100628	0.00	0.00	0.00	1	1
627	12PVC153	18	HEMBRA PVC PRESION 3 PAVCO	2	f	100629	0.00	0.00	0.00	1	1
628	12PVC154	18	HEMBRA PVC PRESION 3/4	2	f	100630	0.00	0.00	0.00	1	1
629	12PVC155	18	HEMBRA PVC PRESION 4	2	f	100631	0.00	0.00	0.00	1	1
630	12PVC156	18	HEMBRA PVC PRESION 6 PAVCO	2	f	100632	0.00	0.00	0.00	1	1
631	12PVC157	18	HEMBRA PVC PRESION SOLDADO 3 DURMAN	2	f	100633	0.00	0.00	0.00	1	1
632	12PVC158	18	LIMPIADOR PVC 1/128	2	f	100634	0.00	0.00	0.00	1	1
633	12PVC159	18	LIMPIADOR PVC 1/16	2	f	100635	0.00	0.00	0.00	1	1
634	12PVC160	18	LIMPIADOR PVC 1/4	2	f	100636	0.00	0.00	0.00	1	1
635	12PVC161	18	LIMPIADOR PVC PAVCO 1/4GLN	2	f	100637	0.00	0.00	0.00	1	1
636	12PVC162	18	LIMPIADOR PVC PAVCO 1/8GLN	2	f	100638	0.00	0.00	0.00	1	1
637	12PVC163	18	MACHO CPVC 3/4 ROSCADO	2	f	100639	0.00	0.00	0.00	1	1
638	12PVC164	18	MACHO PVC PRESION  1 1/4	2	f	100640	0.00	0.00	0.00	1	1
639	12PVC165	18	MACHO PVC PRESION  1	2	f	100641	0.00	0.00	0.00	1	1
640	12PVC166	18	MACHO PVC PRESION  1/2	2	f	100642	0.00	0.00	0.00	1	1
641	12PVC167	18	MACHO PVC PRESION  2 1/2	2	f	100643	0.00	0.00	0.00	1	1
642	12PVC168	18	MACHO PVC PRESION  2 1/2 TIGRE	2	f	100644	0.00	0.00	0.00	1	1
643	12PVC169	18	MACHO PVC PRESION  2	2	f	100645	0.00	0.00	0.00	1	1
644	12PVC170	18	MACHO PVC PRESION  2 PAVCO	2	f	100646	0.00	0.00	0.00	1	1
645	12PVC171	18	MACHO PVC PRESION  3	2	f	100647	0.00	0.00	0.00	1	1
646	12PVC172	18	MACHO PVC PRESION  3/4	2	f	100648	0.00	0.00	0.00	1	1
647	12PVC173	18	MACHO PVC PRESION 4	2	f	100649	0.00	0.00	0.00	1	1
648	12PVC174	18	MACHO PVC PRESION 1 1/2	2	f	100650	0.00	0.00	0.00	1	1
649	12PVC175	18	MACHO PVC PRESION 1/2 MORGAN	2	f	100651	0.00	0.00	0.00	1	1
650	12PVC176	18	MACHO PVC PRESION 2 1/2 PAVCO	2	f	100652	0.00	0.00	0.00	1	1
651	12PVC177	18	MACHO PVC PRESION 6 PAVCO	2	f	100653	0.00	0.00	0.00	1	1
652	12PVC179	18	MACHO PVC PRESION 3 DURMAN	2	f	100654	0.00	0.00	0.00	1	1
653	12PVC180	18	NIPLE PVC ROSCADO 1	2	f	100655	0.00	0.00	0.00	1	1
654	12PVC181	18	NIPLE PVC ROSCADO1/2	2	f	100656	0.00	0.00	0.00	1	1
655	12PVC182	18	NIPLE PVCROSCADO 3/4	2	f	100657	0.00	0.00	0.00	1	1
656	12PVC183	18	PASAMURO PVC 1	2	f	100658	0.00	0.00	0.00	1	1
657	12PVC184	18	PASAMURO PVC 1/2	2	f	100659	0.00	0.00	0.00	1	1
658	12PVC185	18	PASAMURO PVC 2	2	f	100660	0.00	0.00	0.00	1	1
659	12PVC186	18	PASAMURO PVC 3/4	2	f	100661	0.00	0.00	0.00	1	1
660	12PVC187	18	SEMICODO PVC PRESION 1 1/2	2	f	100662	0.00	0.00	0.00	1	1
661	12PVC188	18	SEMICODO PVC PRESION 1 1/4	2	f	100663	0.00	0.00	0.00	1	1
662	12PVC189	18	SEMICODO PVC PRESION 1	2	f	100664	0.00	0.00	0.00	1	1
663	12PVC190	18	SEMICODO PVC PRESION 1/2	2	f	100665	0.00	0.00	0.00	1	1
664	12PVC191	18	SEMICODO PVC PRESION 2 1/2	2	f	100666	0.00	0.00	0.00	1	1
665	12PVC192	18	SEMICODO PVC PRESION 2	2	f	100667	0.00	0.00	0.00	1	1
666	12PVC193	18	SEMICODO PVC PRESION 3	2	f	100668	0.00	0.00	0.00	1	1
667	12PVC194	18	SEMICODO PVC PRESION 3	2	f	100669	0.00	0.00	0.00	1	1
668	12PVC195	18	SEMICODO PVC PRESION 3/4	2	f	100670	0.00	0.00	0.00	1	1
669	12PVC196	18	SEMICODO PVC PRESION 4	2	f	100671	0.00	0.00	0.00	1	1
670	12PVC197	18	SEMICODO PVC PRESION 4 PAVCO	2	f	100672	0.00	0.00	0.00	1	1
671	12PVC198	18	SEMICODO PVC PRESION 6	2	f	100673	0.00	0.00	0.00	1	1
672	12PVC199	18	SEMICODO PVC SANITARIO C X C 1 1/2	2	f	100674	0.00	0.00	0.00	1	1
673	12PVC200	18	SEMICODO PVC SANITARIO C X C 2	2	f	100675	0.00	0.00	0.00	1	1
674	12PVC201	18	SEMICODO PVC SANITARIO C X C 3	2	f	100676	0.00	0.00	0.00	1	1
675	12PVC202	18	SEMICODO PVC SANITARIO C X C 4	2	f	100677	0.00	0.00	0.00	1	1
676	12PVC203	18	SEMICODO PVC SANITARIO C X C 6	2	f	100678	0.00	0.00	0.00	1	1
677	12PVC204	18	SEMICODO PVC SANITARIO C x E 1 1/2	2	f	100679	0.00	0.00	0.00	1	1
678	12PVC205	18	SOLDADURA CPVC 1/4 GLN	2	f	100680	0.00	0.00	0.00	1	1
679	12PVC206	18	SOLDADURA PVC  1/16 GLN	2	f	100681	0.00	0.00	0.00	1	1
680	12PVC207	18	SOLDADURA PVC  1/32 GLN	2	f	100682	0.00	0.00	0.00	1	1
681	12PVC208	18	SOLDADURA PVC  1/8 GLN	2	f	100683	0.00	0.00	0.00	1	1
682	12PVC209	18	SOLDADURA PVC 1/4	2	f	100684	0.00	0.00	0.00	1	1
683	12PVC210	18	SOLDADURA PVC DURMAN 1/4 VERDEE	2	f	100685	0.00	0.00	0.00	1	1
684	12PVC211	18	SOLDADURA PVC PALCO 1/4 GLN	2	f	100686	0.00	0.00	0.00	1	1
685	12PVC212	18	SOLDADURA PVC PALCO 1/8 GLN	2	f	100687	0.00	0.00	0.00	1	1
686	12PVC213	18	SOLDADURA PVC PAVCO 1/16 GLN	2	f	100688	0.00	0.00	0.00	1	1
687	12PVC214	18	SOLDADURA PVC PAVCO 1/4 GLN	2	f	100689	0.00	0.00	0.00	1	1
688	12PVC215	18	SOLDADURA PVC PAVCO 1/8 GLN	2	f	100690	0.00	0.00	0.00	1	1
689	12PVC216	18	TAPON PVC  PRUEBA SANITARIO  1 1/2	2	f	100691	0.00	0.00	0.00	1	1
690	12PVC217	18	TAPON PVC  PRUEBA SANITARIO  2	2	f	100692	0.00	0.00	0.00	1	1
691	12PVC218	18	TAPON PVC  PRUEBA SANITARIO  3	2	f	100693	0.00	0.00	0.00	1	1
692	12PVC219	18	TAPON PVC  PRUEBA SANITARIO  4	2	f	100694	0.00	0.00	0.00	1	1
693	12PVC220	18	TAPON PVC  PRUEBA SANITARIO  6	2	f	100695	0.00	0.00	0.00	1	1
694	12PVC221	18	TAPON PVC LIMPIEZA 2	2	f	100696	0.00	0.00	0.00	1	1
695	12PVC222	18	TAPON PVC LIMPIEZA 3	2	f	100697	0.00	0.00	0.00	1	1
696	12PVC223	18	TAPON PVC LIMPIEZA 4	2	f	100698	0.00	0.00	0.00	1	1
697	12PVC224	18	TAPON PVC LIMPIEZA 6	2	f	100699	0.00	0.00	0.00	1	1
698	12PVC225	18	TAPON PVC MACHO ROSCABLE 1/2	2	f	100700	0.00	0.00	0.00	1	1
699	12PVC226	18	TAPON PVC MACHO ROSCADO 3/4	2	f	100701	0.00	0.00	0.00	1	1
700	12PVC227	18	TAPON PVC PRESION 3/4 PAVCO	2	f	100702	0.00	0.00	0.00	1	1
701	12PVC228	18	TAPON PVC PRESION ROSCADO 1 1/2	2	f	100703	0.00	0.00	0.00	1	1
702	12PVC229	18	TAPON PVC PRESION ROSCADO 1 1/4	2	f	100704	0.00	0.00	0.00	1	1
703	12PVC230	18	TAPON PVC PRESION ROSCADO 1	2	f	100705	0.00	0.00	0.00	1	1
704	12PVC231	18	TAPON PVC PRESION ROSCADO 1	2	f	100706	0.00	0.00	0.00	1	1
705	12PVC232	18	TAPON PVC PRESION ROSCADO 1/2	2	f	100707	0.00	0.00	0.00	1	1
706	12PVC233	18	TAPON PVC PRESION ROSCADO 1C1/2	2	f	100708	0.00	0.00	0.00	1	1
707	12PVC234	18	TAPON PVC PRESION ROSCADO 2	2	f	100709	0.00	0.00	0.00	1	1
708	12PVC235	18	TAPON PVC PRESION ROSCADO 2	2	f	100710	0.00	0.00	0.00	1	1
709	12PVC236	18	TAPON PVC PRESION ROSCADO 3	2	f	100711	0.00	0.00	0.00	1	1
710	12PVC237	18	TAPON PVC PRESION ROSCADO 3 PAVCO	2	f	100712	0.00	0.00	0.00	1	1
711	12PVC238	18	TAPON PVC PRESION ROSCADO 3/4	2	f	100713	0.00	0.00	0.00	1	1
712	12PVC239	18	TAPON PVC PRESION ROSCADO 4	2	f	100714	0.00	0.00	0.00	1	1
713	12PVC240	18	TAPON PVC PRESION SOLDADO 1 1/2	2	f	100715	0.00	0.00	0.00	1	1
714	12PVC241	18	TAPON PVC PRESION SOLDADO 1 1/4	2	f	100716	0.00	0.00	0.00	1	1
715	12PVC242	18	TAPON PVC PRESION SOLDADO 1	2	f	100717	0.00	0.00	0.00	1	1
716	12PVC243	18	TAPON PVC PRESION SOLDADO 1/2	2	f	100718	0.00	0.00	0.00	1	1
717	12PVC244	18	TAPON PVC PRESION SOLDADO 2	2	f	100719	0.00	0.00	0.00	1	1
718	12PVC245	18	TAPON PVC PRESION SOLDADO 3	2	f	100720	0.00	0.00	0.00	1	1
719	12PVC246	18	TAPON PVC PRESION SOLDADO 3/4	2	f	100721	0.00	0.00	0.00	1	1
720	12PVC247	18	TAPON PVC PRESION SOLDADO 4	2	f	100722	0.00	0.00	0.00	1	1
721	12PVC248	18	TAPON PVC PRUEBA 3/4 PAVCO	2	f	100723	0.00	0.00	0.00	1	1
722	12PVC249	18	TAPON PVC PRUEBA 6 PAVCO	2	f	100724	0.00	0.00	0.00	1	1
723	12PVC250	18	TAPON PVC PRUEBA SANITARIO 1 1/2	2	f	100725	0.00	0.00	0.00	1	1
724	12PVC251	18	TEE CPVC 2	2	f	100726	0.00	0.00	0.00	1	1
725	12PVC252	18	TEE PVC PRESION 1 1/2	2	f	100727	0.00	0.00	0.00	1	1
726	12PVC253	18	TEE PVC PRESION 1 1/4	2	f	100728	0.00	0.00	0.00	1	1
727	12PVC254	18	TEE PVC PRESION 1	2	f	100729	0.00	0.00	0.00	1	1
729	12PVC256	18	TEE PVC PRESION 2 1/2 PAVCO	2	f	100731	0.00	0.00	0.00	1	1
730	12PVC257	18	TEE PVC PRESION 2	2	f	100732	0.00	0.00	0.00	1	1
731	12PVC258	18	TEE PVC PRESION 2 PAVCO	2	f	100733	0.00	0.00	0.00	1	1
732	12PVC259	18	TEE PVC PRESION 3	2	f	100734	0.00	0.00	0.00	1	1
733	12PVC260	18	TEE PVC PRESION 3/4	2	f	100735	0.00	0.00	0.00	1	1
734	12PVC261	18	TEE PVC PRESION 4	2	f	100736	0.00	0.00	0.00	1	1
735	12PVC262	18	TEE PVC PRESION ROSCADA 1/2 DURMAN	2	f	100737	0.00	0.00	0.00	1	1
736	12PVC263	18	TEE PVC SANITARIA 1 1/2	2	f	100738	0.00	0.00	0.00	1	1
737	12PVC264	18	TEE PVC SANITARIA 2	2	f	100739	0.00	0.00	0.00	1	1
738	12PVC265	18	TEE PVC SANITARIA 3	2	f	100740	0.00	0.00	0.00	1	1
739	12PVC266	18	TEE PVC SANITARIA 4	2	f	100741	0.00	0.00	0.00	1	1
740	12PVC267	18	TEE PVC SANITARIA 6	2	f	100742	0.00	0.00	0.00	1	1
741	12PVC268	18	TEE PVC SANITARIO 4 PAVCO	2	f	100743	0.00	0.00	0.00	1	1
742	12PVC269	18	TUBO ALCANTARILLADO 24 DURMAN AMARILLO	2	f	100744	0.00	0.00	0.00	1	1
743	12PVC270	18	TUBO ALCANTARILLADO 30 DURMAN AMARILLO	2	f	100745	0.00	0.00	0.00	1	1
744	12PVC271	18	TUBO CPVC 1/2 X 3 MT	2	f	100746	0.00	0.00	0.00	1	1
745	12PVC272	18	TUBO CPVC RDEE 11 DE 2 X 6 MT	2	f	100747	0.00	0.00	0.00	1	1
746	12PVC273	18	TUBO CPVC RDEE 11 DE 3/4 X 6 MT	2	f	100748	0.00	0.00	0.00	1	1
747	12PVC274	18	TUBO PVC PRESION RDE11 DE 3/4 X 6 MT T (400LB)	2	f	100749	0.00	0.00	0.00	1	1
748	12PVC275	18	TUBO PVC PRESION RDE13.5 DE 1 X 6 MT T(315L)	2	f	100750	0.00	0.00	0.00	1	1
749	12PVC276	18	TUBO PVC PRESION RDE21 DE 1 1/2 X MT T PAVCO	2	f	100751	0.00	0.00	0.00	1	1
750	12PVC277	18	TUBO PVC PRESION RDE21 DE 1 1/4 X 6 MT T PAVCO	2	f	100752	0.00	0.00	0.00	1	1
751	12PVC278	18	TUBO PVC PRESION RDE21 DE 1 1/2 X 6 MT (200LB)	2	f	100753	0.00	0.00	0.00	1	1
752	12PVC279	18	TUBO PVC PRESION RDE21 DE 2 1/2 X MT PAVCO	2	f	100754	0.00	0.00	0.00	1	1
753	12PVC280	18	TUBO PVC PRESION RDE21 DE 2 X MT T	2	f	100755	0.00	0.00	0.00	1	1
754	12PVC281	18	TUBO PVC PRESION RDE21 DE 2 X  MT  PAVCO	2	f	100756	0.00	0.00	0.00	1	1
755	12PVC282	18	TUBO PVC PRESION RDE21 DE 3 x 6 MT T DURMAN	2	f	100757	0.00	0.00	0.00	1	1
756	12PVC283	18	TUBO PVC PRESION RDE21 DE 3 X MT PAVCO	2	f	100758	0.00	0.00	0.00	1	1
757	12PVC284	18	TUBO PVC PRESION RDE21 DE 4 X 6 MT T PAVCO	2	f	100759	0.00	0.00	0.00	1	1
758	12PVC285	18	TUBO PVC PRESION RDE21 DE 6 X 6 MT T PAVCO	2	f	100760	0.00	0.00	0.00	1	1
759	12PVC286	18	TUBO PVC PRESION RDE9 DE 1/2 X MT T(500L)	2	f	100761	0.00	0.00	0.00	1	1
760	12PVC287	18	TUBO PVC SANITARIO  LIVIANO 1 1/2 X 6 MT	2	f	100762	0.00	0.00	0.00	1	1
761	12PVC288	18	TUBO PVC SANITARIO  LIVIANO 2 X 6 MT	2	f	100763	0.00	0.00	0.00	1	1
762	12PVC289	18	TUBO PVC SANITARIO  LIVIANO 3 X 6 MT	2	f	100764	0.00	0.00	0.00	1	1
763	12PVC290	18	TUBO PVC SANITARIO  LIVIANO 4 X 6 MT	2	f	100765	0.00	0.00	0.00	1	1
764	12PVC291	18	TUBO PVC SANITARIO  PESADO 1 1/2 X 6 MT	2	f	100766	0.00	0.00	0.00	1	1
765	12PVC292	18	TUBO PVC SANITARIO  PESADO 2 X 6 MT	2	f	100767	0.00	0.00	0.00	1	1
766	12PVC293	18	TUBO PVC SANITARIO  PESADO 3 X 6 MT	2	f	100768	0.00	0.00	0.00	1	1
767	12PVC294	18	TUBO PVC SANITARIO  PESADO 4 X 6 MT	2	f	100769	0.00	0.00	0.00	1	1
768	12PVC295	18	TUBO PVC SANITARIO  PESADO 6 X 6 MT	2	f	100770	0.00	0.00	0.00	1	1
769	12PVC296	18	TUBO PVC SANITARIO  SEMIPESADO 1 1/2 X 6 MT	2	f	100771	0.00	0.00	0.00	1	1
770	12PVC297	18	TUBO PVC SANITARIO  SEMIPESADO 2 X 6 MT	2	f	100772	0.00	0.00	0.00	1	1
771	12PVC298	18	TUBO PVC SANITARIO  SEMIPESADO 3 X 6 MT	2	f	100773	0.00	0.00	0.00	1	1
772	12PVC299	18	TUBO PVC SANITARIO  SEMIPESADO 4 X 6 MT	2	f	100774	0.00	0.00	0.00	1	1
773	12PVC300	18	TUBO PVC SANITARIO  SEMIPESADO 6 X 6 MT	2	f	100775	0.00	0.00	0.00	1	1
774	12PVC301	18	TUBO PVC SANITARIO 4 X 6 MT T PAVCO	2	f	100776	0.00	0.00	0.00	1	1
775	12PVC302	18	UNION CPVC 1/2	2	f	100777	0.00	0.00	0.00	1	1
776	12PVC303	18	UNION PVC  SANITARIA  2	2	f	100778	0.00	0.00	0.00	1	1
777	12PVC304	18	UNION PVC  SANITARIA  3	2	f	100779	0.00	0.00	0.00	1	1
778	12PVC305	18	UNION PVC  SANITARIA  4	2	f	100780	0.00	0.00	0.00	1	1
779	12PVC306	18	UNION PVC  SANITARIA  6	2	f	100781	0.00	0.00	0.00	1	1
780	12PVC307	18	UNION PVC PRESION 1 1/2 PAVCO	2	f	100782	0.00	0.00	0.00	1	1
781	12PVC308	18	UNION PVC PRESION 1 1/2	2	f	100783	0.00	0.00	0.00	1	1
782	12PVC309	18	UNION PVC PRESION 1 1/4	2	f	100784	0.00	0.00	0.00	1	1
783	12PVC310	18	UNION PVC PRESION 1	2	f	100785	0.00	0.00	0.00	1	1
784	12PVC311	18	UNION PVC PRESIÓN 1/2	2	f	100786	0.00	0.00	0.00	1	1
785	12PVC312	18	UNION PVC PRESION 2 1/2 PAVCO	2	f	100787	0.00	0.00	0.00	1	1
786	12PVC313	18	UNION PVC PRESION 2	2	f	100788	0.00	0.00	0.00	1	1
787	12PVC314	18	UNION PVC PRESION 2 PAVCO	2	f	100789	0.00	0.00	0.00	1	1
788	12PVC315	18	UNION PVC PRESION 3	2	f	100790	0.00	0.00	0.00	1	1
789	12PVC316	18	UNION PVC PRESION 3 PAVCO	2	f	100791	0.00	0.00	0.00	1	1
790	12PVC318	18	UNION PVC PRESION 3/4	2	f	100792	0.00	0.00	0.00	1	1
791	12PVC319	18	UNION PVC PRESION 4	2	f	100793	0.00	0.00	0.00	1	1
792	12PVC320	18	UNION PVC PRESION 4 PAVCO	2	f	100794	0.00	0.00	0.00	1	1
793	12PVC321	18	UNION PVC PRESION 6	2	f	100795	0.00	0.00	0.00	1	1
794	12PVC322	18	UNION PVC PRESION 6 PAVCO	2	f	100796	0.00	0.00	0.00	1	1
795	12PVC323	18	UNION PVC SANITARIA  1 1/2	2	f	100797	0.00	0.00	0.00	1	1
796	12PVC324	18	UNIVERSAL PVC ROSCADA DE 1 1/2	2	f	100798	0.00	0.00	0.00	1	1
797	12PVC325	18	UNIVERSAL PVC ROSCADA DE 1 1/4	2	f	100799	0.00	0.00	0.00	1	1
798	12PVC326	18	UNIVERSAL PVC ROSCADA DE 1	2	f	100800	0.00	0.00	0.00	1	1
799	12PVC327	18	UNIVERSAL PVC ROSCADA DE 1/2	2	f	100801	0.00	0.00	0.00	1	1
800	12PVC328	18	UNIVERSAL PVC ROSCADA DE 2	2	f	100802	0.00	0.00	0.00	1	1
801	12PVC329	18	UNIVERSAL PVC ROSCADA DE 3	2	f	100803	0.00	0.00	0.00	1	1
802	12PVC330	18	UNIVERSAL PVC ROSCADA DE 3/4	2	f	100804	0.00	0.00	0.00	1	1
803	12PVC331	18	UNIVERSAL PVC ROSCADA DE 4	2	f	100805	0.00	0.00	0.00	1	1
804	12PVC332	18	UNIVERSAL PVC SOLDADA DE 1 1/2	2	f	100806	0.00	0.00	0.00	1	1
805	12PVC333	18	UNIVERSAL PVC SOLDADA DE 1 1/4	2	f	100807	0.00	0.00	0.00	1	1
806	12PVC334	18	UNIVERSAL PVC SOLDADA DE 1	2	f	100808	0.00	0.00	0.00	1	1
807	12PVC335	18	UNIVERSAL PVC SOLDADA DE 1/2	2	f	100809	0.00	0.00	0.00	1	1
808	12PVC336	18	UNIVERSAL PVC SOLDADA DE 2 1/2	2	f	100810	0.00	0.00	0.00	1	1
809	12PVC337	18	UNIVERSAL PVC SOLDADA DE 2	2	f	100811	0.00	0.00	0.00	1	1
810	12PVC338	18	UNIVERSAL PVC SOLDADA DE 3	2	f	100812	0.00	0.00	0.00	1	1
811	12PVC339	18	UNIVERSAL PVC SOLDADA DE 3/4	2	f	100813	0.00	0.00	0.00	1	1
812	12PVC340	18	UNIVERSAL PVC SOLDADA DE 4	2	f	100814	0.00	0.00	0.00	1	1
813	12PVC341	18	TUBO PVC PRESION RD21 DE 2 CELTA X MT (200PSI)	2	f	100815	0.00	0.00	0.00	1	1
814	12PVC342	18	FLOTADOR LD PVC 1/2	2	f	100816	0.00	0.00	0.00	1	1
815	12PVC343	18	FLANCHE PVC GIRATORIO SOLDADO 6	2	f	100817	0.00	0.00	0.00	1	1
816	12PVC344	18	CINTA TEFLON TVR x 12M	2	f	100818	0.00	0.00	0.00	1	1
817	12PVC345	18	HEMBRA PVC PRESION 4 PAVCO	2	f	100819	0.00	0.00	0.00	1	1
818	12PVC346	18	TUBO PVC PRESION RDE9 DE 1/2 X CM KIT BEBEDERO	2	f	100820	0.00	0.00	0.00	1	1
819	12PVC347	18	TUBO PVC PRESION RDE21 DE 6 x 6 MT T DURMAN POZO PROFUNDO	2	f	100821	0.00	0.00	0.00	1	1
820	12PVC348	18	TUBO PVC PRESION RDE21 DE 8 x 6 MT T DURMAN POZO PROFUNDO	2	f	100822	0.00	0.00	0.00	1	1
821	12PVC349	18	MACHO PVC PRESIÓN ROSCA LARGA	2	f	100823	0.00	0.00	0.00	1	1
822	12PVC350	18	TUBO PVC PRESIÓN DE 3 RD21 UNIÓN MECÁNICA 	2	f	100824	0.00	0.00	0.00	1	1
823	12PVC351	18	TAPON PVC ROSCA 1 PAVCO	2	f	100825	0.00	0.00	0.00	1	1
824	12PVC353	18	SELLANTE FUERZA MEDIA	2	f	100826	0.00	0.00	0.00	1	1
825	12PVC354	18	TAPON PVC ROSCA PAVCO 2	2	f	100827	0.00	0.00	0.00	1	1
826	12PVC355	18	FLOTADOR BR HELBERT 1	2	f	100828	0.00	0.00	0.00	1	1
827	12PVC356	18	UNION HEMBRA PVC 1/2	2	f	100829	0.00	0.00	0.00	1	1
828	12PVC357	18	BOLA COBRE 1 - 1-1/2	2	f	100830	0.00	0.00	0.00	1	1
829	12PVC358	18	CUERPO VALV FLOTADOR 	2	f	100831	0.00	0.00	0.00	1	1
830	12PVC359	18	VARILLA VALV FLOTADOR	2	f	100832	0.00	0.00	0.00	1	1
831	12PVC360	18	BOLA COBRE DE 2	2	f	100833	0.00	0.00	0.00	1	1
832	12PVC361	18	CUERPO VALV FLOTADOR HELBERT BR HEMBRA 2	2	f	100834	0.00	0.00	0.00	1	1
833	12PVC362	18	VARILLA VALV FLOT 2	2	f	100835	0.00	0.00	0.00	1	1
834	12PVC363	18	UNION HEMBRA PVC 3/4	2	f	100836	0.00	0.00	0.00	1	1
835	12PVC364	18	UNION HEMBRA PVC 1	2	f	100837	0.00	0.00	0.00	1	1
836	12PVC365	18	UNION HEMBRA PVC 11/2	2	f	100838	0.00	0.00	0.00	1	1
837	12PVC366	18	UNION HEMBRA PVC 2	2	f	100839	0.00	0.00	0.00	1	1
838	12PVC367	18	CINTA TEFLON PEQUEÑA 3/4 x 15 MT AZUL	2	f	100840	0.00	0.00	0.00	1	1
839	12PVC368	18	TUBO PVC PRESION RDE21 DE 1 1/2 X MT T	2	f	100841	0.00	0.00	0.00	1	1
840	12PVC369	18	BUJE PVC SANITARIO SOLDADO PAVCO 6 x 4	2	f	100842	0.00	0.00	0.00	1	1
841	12PVC370	18	BUJE PVC PRESION SOLDADO 2 x 3/4 PAVCO	2	f	100843	0.00	0.00	0.00	1	1
842	12PVC371	18	UNION PVC SANIT PAVCO 4	2	f	100844	0.00	0.00	0.00	1	1
843	12PVC372	18	EMPAQUE FLANCHE 2	2	f	100845	0.00	0.00	0.00	1	1
844	12PVC373	18	EMPAQUE FLANCHE 3	2	f	100846	0.00	0.00	0.00	1	1
845	12PVC374	18	EMPAQUE FLANCHE 4	2	f	100847	0.00	0.00	0.00	1	1
846	12PVC375	18	FLANCHE PVC GIRATORIO SOLDAR 3	2	f	100848	0.00	0.00	0.00	1	1
847	12PVC376	18	FLANCHE PVC GIRATORIO SOLDAR 4	2	f	100849	0.00	0.00	0.00	1	1
848	12PVC377	18	TUBO PVC PRESION RDE21 DE 4 X MT T PAVCO	2	f	100850	0.00	0.00	0.00	1	1
849	12PVC378	18	TUBO PVC PRESION RDE21 DE 1 1/4 X 6 MT (200LB)	2	f	100851	0.00	0.00	0.00	1	1
850	12PVC379	18	FLOTADOR TANQUE ALTO DE 3/4 BRONCE	2	f	100852	0.00	0.00	0.00	1	1
851	12PVC380	18	FLOTADOR TANQUE ALTO DE 1 BRONCE	2	f	100853	0.00	0.00	0.00	1	1
852	12PVC381	18	TAPON PVC  PRUEBA SANITARIO  3 PAVCO	2	f	100854	0.00	0.00	0.00	1	1
853	12PVC382	18	MACHO PVC PRESIÓN DE 3 CELTA	2	f	100855	0.00	0.00	0.00	1	1
854	12PVC383	18	BUJE PVC PRESION SOLDADO 11/4 X 3/4 PAVCO	2	f	100856	0.00	0.00	0.00	1	1
855	12PVC384	18	TUBO PVC SANITARIO 6 X 6 MT T PAVCO	2	f	100857	0.00	0.00	0.00	1	1
856	12PVC385	18	TEE PVC PRESION 4 PAVCO	2	f	100858	0.00	0.00	0.00	1	1
857	12PVC386	18	MACHO PVC PRESIÓN DE 4 PAVCO	2	f	100859	0.00	0.00	0.00	1	1
858	12PVC387	18	JUEGO ACCESORIOS TANQUE 	2	f	100860	0.00	0.00	0.00	1	1
859	12PVC388	18	PASAMURO 11/2	2	f	100861	0.00	0.00	0.00	1	1
860	12PVC389	18	FLOTADOR BR HELBERT 2	2	f	100862	0.00	0.00	0.00	1	1
861	12PVC390	18	LIMPIADOR PVC 1/32	2	f	100863	0.00	0.00	0.00	1	1
862	12PVC391	18	TAPON PRESOLDADO 1	2	f	100864	0.00	0.00	0.00	1	1
863	12PVC392	18	SEMICODO 1/8 CXC SANIT PAVCO 4	2	f	100865	0.00	0.00	0.00	1	1
864	12PVC393	18	BUJE PVC PRESION SOLDADO 2 X 1 1/2 PAVCO	2	f	100866	0.00	0.00	0.00	1	1
865	12PVC394	18	TEE PVC PRESION 1 PAVCO	2	f	100867	0.00	0.00	0.00	1	1
866	12PVC395	18	UNION PRESION DE 3 CELTA 	2	f	100868	0.00	0.00	0.00	1	1
867	12PVC396	18	TEE PRESION DE 3 CELTA 	2	f	100869	0.00	0.00	0.00	1	1
868	12PVC397	18	TUBO PVC PRESION RDE21 DE 3 CXE  CELTA	2	f	100870	0.00	0.00	0.00	1	1
869	12PVC398	18	FLOTADOR BR HELBERT 1 1/2	2	f	100871	0.00	0.00	0.00	1	1
870	12PVC399	18	SOLDADURA PVC 1/8 DURMAN	2	f	100872	0.00	0.00	0.00	1	1
871	12PVC400	18	TEE CRUZ PVC  1/2	2	f	100873	0.00	0.00	0.00	1	1
872	12PVC401	18	BUJE PVC PRESIÓN ROSCADO 3/4 x 1/2 DURMAN	2	f	100874	0.00	0.00	0.00	1	1
873	12PVC402	18	BUJE PVC PRESIÓN ROSCADO 1 x 1/2 DURMAN	2	f	100875	0.00	0.00	0.00	1	1
874	12PVC403	18	CODO PVC ROSCADO 1/2 DURMAN	2	f	100876	0.00	0.00	0.00	1	1
875	12PVC404	18	SOLDADURA PVC 1/4 DURMAN	2	f	100877	0.00	0.00	0.00	1	1
876	12PVC405	18	BUJE PVC SOLDADO 3 X 2  DURMAN	2	f	100878	0.00	0.00	0.00	1	1
877	12PVC406	18	BUJE PVC PRESIÓN SOLDADO  2 x 1 1/2 DURMAN	2	f	100879	0.00	0.00	0.00	1	1
878	12PVC407	18	BUJE PVC PRESIÓN DE 1/4 A 1	2	f	100880	0.00	0.00	0.00	1	1
879	12PVC408	18	TAPON ROSCA PVC 1 1/2 PAVCO	2	f	100881	0.00	0.00	0.00	1	1
880	12PVC409	18	SEMICODO PVC 3 PAVCO	2	f	100882	0.00	0.00	0.00	1	1
881	12PVC410	18	TUBO PVC PRESION DE RD21 4 UNIÓN MECANIA	2	f	100883	0.00	0.00	0.00	1	1
882	12PVC411	18	BUJE PVC PRESION ROSCADO 11/4 X 1 PAVCO	2	f	100884	0.00	0.00	0.00	1	1
883	12PVC412	18	FLOTADOR BR HELBERT 3/4	2	f	100885	0.00	0.00	0.00	1	1
884	12PVC413	18	FLOTADOR NA- NC AMPERAJE	2	f	100886	0.00	0.00	0.00	1	1
885	12PVC414	18	EMPAQUE FLANCHE 11/2	2	f	100887	0.00	0.00	0.00	1	1
886	12PVC415	18	BUJE PVC PRESION ROSCADO 2 X 3/4 PAVCO	2	f	100888	0.00	0.00	0.00	1	1
887	12PVC416	18	TUBO SNAP 6 MTS. RDE 51 10	2	f	100889	0.00	0.00	0.00	1	1
888	12PVC417	18	TUBO PVC PRESION RDE21 DE 1 X MT  PAVCO	2	f	100890	0.00	0.00	0.00	1	1
889	12PVC418	18	YEE PVC 3	2	f	100891	0.00	0.00	0.00	1	1
890	12PVC419	18	HEMBRA PVC PRESION 11/2 PAVCO	2	f	100892	0.00	0.00	0.00	1	1
891	12PVC420	18	TEE PVC 1 1/2 PAVCO	2	f	100893	0.00	0.00	0.00	1	1
892	12PVC421	18	MACHO PVC PRESION 2 1/2 DURMAN	2	f	100894	0.00	0.00	0.00	1	1
893	12PVC422	18	BUJE PVC PRESION SOLDADO 3 X 2 1/2 DURMAN	2	f	100895	0.00	0.00	0.00	1	1
894	12PVC423	18	TEE PVC PRESION 3 DURMAN	2	f	100896	0.00	0.00	0.00	1	1
895	12PVC424	18	BUJE PVC PRESIÓN SOLDADO 3 X 2 DURMAN	2	f	100897	0.00	0.00	0.00	1	1
896	12PVC425	18	SOLDADURA PVC 1/8 VERDE DURMAN	2	f	100898	0.00	0.00	0.00	1	1
897	12PVC426	18	SOLDADURA PVC 1/16 VERDE DURMAN	2	f	100899	0.00	0.00	0.00	1	1
898	12PVC427	18	LIMPIADOR PVC-CPVC X  1/4 DURMAN	2	f	100900	0.00	0.00	0.00	1	1
899	12PVC428	18	SEMICODO PVC PRESION 3 DURMAN	2	f	100901	0.00	0.00	0.00	1	1
900	12PVC429	18	BUJE PVC PRESIÓN SOLDADO 1 1/2 X 1/2 DURMAN	2	f	100902	0.00	0.00	0.00	1	1
902	12PVC431	18	TUBO PVC PRESION RDE21 DE  11/2 X MT  DURMAN	2	f	100904	0.00	0.00	0.00	1	1
903	12PVC432	18	BUJE PVC PRESIÓN SOLDADO 4 X 3 DURMAN	2	f	100905	0.00	0.00	0.00	1	1
904	12PVC433	18	MACHO PVC PRESION 4 DURMAN	2	f	100906	0.00	0.00	0.00	1	1
905	12PVC434	18	FLANCHE PARA TANQUE AGUA FRIA/CALIENTE NPT 1 1/2	2	f	100907	0.00	0.00	0.00	1	1
906	12PVC435	18	HEMBRA PVC PRESION 11/4 PAVCO	2	f	100908	0.00	0.00	0.00	1	1
907	12PVC436	18	FLANCHE PARA TANQUE AGUA FRIA/CALIENTE NPT 2	2	f	100909	0.00	0.00	0.00	1	1
908	12PVC438	18	TUBO PVC PRESION RDE21 DE 1 X MT DURMAN	2	f	100910	0.00	0.00	0.00	1	1
909	12PVC439	18	YEE SANITARIO 4	2	f	100911	0.00	0.00	0.00	1	1
910	12PVC440	18	TUBO PVC PRESION RDE9 DE 1/2 X MT  PAVCO	2	f	100912	0.00	0.00	0.00	1	1
911	12PVC441	18	SOLDADURA PVC PALCO 1/16 GLN	2	f	100913	0.00	0.00	0.00	1	1
912	12PVC442	18	MACHO PVC PRESION 3 PAVCO	2	f	100914	0.00	0.00	0.00	1	1
913	12PVC444	18	REDUCCION TUERCA PVC 3/4 x 1/2	2	f	100915	0.00	0.00	0.00	1	1
914	12PVC445	18	REDUCCION TUERCA PVC 1 x 1/2	2	f	100916	0.00	0.00	0.00	1	1
915	12PVC446	18	REDUCCION TUERCA PVC 1 x 3/4	2	f	100917	0.00	0.00	0.00	1	1
916	12PVC447	18	EMPAQUE FLANCHE 11/4	2	f	100918	0.00	0.00	0.00	1	1
917	13GAL01AC	16	UNION AC LISA ROSCA 1 1/4 X 300L	2	f	100919	0.00	0.00	0.00	1	1
918	13GAL01BUS	16	BUSHING GALV 3/8 X 1/4	2	f	100920	0.00	0.00	0.00	1	1
919	13GAL02AC	16	COPA AC ROSCA 2 x 1 1/2 X 150L	2	f	100921	0.00	0.00	0.00	1	1
920	13GAL02BUS	16	BUSHING GALV 1/2 X 1/4	2	f	100922	0.00	0.00	0.00	1	1
921	13GAL03AC	16	FLANCHE AC S.O 2 1/2 x 150L	2	f	100923	0.00	0.00	0.00	1	1
922	13GAL03BUS	16	BUSHING GALV 1/2 X 3/8	2	f	100924	0.00	0.00	0.00	1	1
923	13GAL04AC	16	FLANCHE AC ROSCA  1 1/2 x 150L	2	f	100925	0.00	0.00	0.00	1	1
924	13GAL04BUS	16	BUSHING GALV 3/4 X 1/4	2	f	100926	0.00	0.00	0.00	1	1
925	13GAL05AC	16	UNION AC LISA ROSCA 1/2 X 300L	2	f	100927	0.00	0.00	0.00	1	1
926	13GAL05BUS	16	BUSHING GALV 3/4 X 3/8	2	f	100928	0.00	0.00	0.00	1	1
927	13GAL06AC	16	FLANCHE AC S.O 1 1/2 x 150L	2	f	100929	0.00	0.00	0.00	1	1
928	13GAL06BUS	16	BUSHING GALV 3/4 X 1/2	2	f	100930	0.00	0.00	0.00	1	1
929	13GAL07AC	16	FLANCHE AC ROSCA 3 x 150L	2	f	100931	0.00	0.00	0.00	1	1
930	13GAL07BUS	16	BUSHING GALV 1 X 1/4	2	f	100932	0.00	0.00	0.00	1	1
931	13GAL08AC	16	FLANCHE AC ROSCA 4 x 150L	2	f	100933	0.00	0.00	0.00	1	1
932	13GAL08BUS	16	BUSHING GALV 1 X 3/8	2	f	100934	0.00	0.00	0.00	1	1
933	13GAL09AC	16	FLANCHE AC ROSCA 2 x 150L	2	f	100935	0.00	0.00	0.00	1	1
934	13GAL09BUS	16	BUSHING GALV 1 X/1/2	2	f	100936	0.00	0.00	0.00	1	1
935	13GAL100COD	16	CODO GALV 4	2	f	100937	0.00	0.00	0.00	1	1
936	13GAL101COD	16	CODO GALV 6	2	f	100938	0.00	0.00	0.00	1	1
937	13GAL102CMA	16	CODO MACHO GALV 1/4	2	f	100939	0.00	0.00	0.00	1	1
938	13GAL103CMA	16	CODO MACHO GALV 3/8	2	f	100940	0.00	0.00	0.00	1	1
939	13GAL104CMA	16	CODO MACHO GALV 1/2	2	f	100941	0.00	0.00	0.00	1	1
940	13GAL105CMA	16	CODO MACHO GALV 3/4	2	f	100942	0.00	0.00	0.00	1	1
941	13GAL106CMA	16	CODO MACHO GALV 1	2	f	100943	0.00	0.00	0.00	1	1
942	13GAL107CMA	16	CODO MACHO GALV 1 1/4	2	f	100944	0.00	0.00	0.00	1	1
943	13GAL108CMA	16	CODO MACHO GALV 1 1/2	2	f	100945	0.00	0.00	0.00	1	1
944	13GAL109CMA	16	CODO MACHO GALV 2	2	f	100946	0.00	0.00	0.00	1	1
945	13GAL10AC	16	FLANCHE AC ROSCA 1 1/4 x 150L	\N	f	100947	0.00	0.00	0.00	1	1
946	13GAL10BUS	16	BUSHING GALV 1 X 3/4	2	f	100948	0.00	0.00	0.00	1	1
947	13GAL110CMA	16	CODO MACHO GALV 2 1/2	2	f	100949	0.00	0.00	0.00	1	1
948	13GAL111CRG	16	CODO REDUCIDO GALV 1/2 X 1/4	2	f	100950	0.00	0.00	0.00	1	1
949	13GAL112CRG	16	CODO REDUCIDO GALV 1/2 X 3/8	2	f	100951	0.00	0.00	0.00	1	1
950	13GAL113CRG	16	CODO REDUCIDO GALV 3/4 X 1/2	2	f	100952	0.00	0.00	0.00	1	1
951	13GAL114CRG	16	CODO REDUCIDO GALV 1 X 1/2	2	f	100953	0.00	0.00	0.00	1	1
952	13GAL115CRG	16	CODO REDUCIDO GALV 1 X 3/4	2	f	100954	0.00	0.00	0.00	1	1
953	13GAL116CRG	16	CODO REDUCIDO GALV 1 1/4 X 1/2	2	f	100955	0.00	0.00	0.00	1	1
954	13GAL117CRG	16	CODO REDUCIDO GALV 1 1/4 X 1	2	f	100956	0.00	0.00	0.00	1	1
955	13GAL118CRG	16	CODO REDUCIDO GALV 1 1/2 X 3/4	2	f	100957	0.00	0.00	0.00	1	1
956	13GAL119CRG	16	CODO REDUCIDO GALV 2 X 1 1/2	2	f	100958	0.00	0.00	0.00	1	1
957	13GAL11BUS	16	BUSHING GALV 1 1/4 X 3/8	2	f	100959	0.00	0.00	0.00	1	1
958	13GAL120CRU	16	CRUZ GALV 1/4	2	f	100960	0.00	0.00	0.00	1	1
959	13GAL121CRU	16	CRUZ GALV 3/8	2	f	100961	0.00	0.00	0.00	1	1
960	13GAL122CRU	16	CRUZ GALV 1/2	2	f	100962	0.00	0.00	0.00	1	1
961	13GAL123CRU	16	CRUZ GALV 3/4	2	f	100963	0.00	0.00	0.00	1	1
962	13GAL124CRU	16	CRUZ GALV 1	2	f	100964	0.00	0.00	0.00	1	1
963	13GAL125CRU	16	CRUZ GALV 1 1/4	2	f	100965	0.00	0.00	0.00	1	1
964	13GAL126CRU	16	CRUZ GALV 1 1/2	2	f	100966	0.00	0.00	0.00	1	1
965	13GAL127CRU	16	CRUZ GALV 2	2	f	100967	0.00	0.00	0.00	1	1
966	13GAL128CRU	16	CRUZ GALV 2 1/2	2	f	100968	0.00	0.00	0.00	1	1
967	13GAL129CRU	16	CRUZ GALV 3	2	f	100969	0.00	0.00	0.00	1	1
968	13GAL12BUS	16	BUSHING GALV 1 1/4 X 1/2	2	f	100970	0.00	0.00	0.00	1	1
969	13GAL130CRU	16	CRUZ GALV 4	2	f	100971	0.00	0.00	0.00	1	1
970	13GAL131TEE	16	TEE GALV 1/4	2	f	100972	0.00	0.00	0.00	1	1
971	13GAL132TEE	16	TEE GALV 3/8	2	f	100973	0.00	0.00	0.00	1	1
972	13GAL133TEE	16	TEE GALV 1/2	2	f	100974	0.00	0.00	0.00	1	1
973	13GAL134TEE	16	TEE GALV 3/4	2	f	100975	0.00	0.00	0.00	1	1
974	13GAL135TEE	16	TEE GALV 1	2	f	100976	0.00	0.00	0.00	1	1
975	13GAL136TEE	16	TEE GALV 1 1/4	2	f	100977	0.00	0.00	0.00	1	1
976	13GAL137TEE	16	TEE GALV 1 1/2	2	f	100978	0.00	0.00	0.00	1	1
977	13GAL138TEE	16	TEE GALV 2	\N	f	100979	0.00	0.00	0.00	1	1
978	13GAL139TEE	16	TEE GALV 2 1/2	2	f	100980	0.00	0.00	0.00	1	1
979	13GAL13BUS	16	BUSHING GALV 1 1/4 X 3/4	2	f	100981	0.00	0.00	0.00	1	1
980	13GAL140TEE	16	TEE GALV 3	2	f	100982	0.00	0.00	0.00	1	1
981	13GAL141TEE	16	TEE GALV 4	2	f	100983	0.00	0.00	0.00	1	1
982	13GAL142TEE	16	TEE GALV 6	2	f	100984	0.00	0.00	0.00	1	1
983	13GAL143TEE	16	TEE HO ROSCA 3 x 150L	\N	f	100985	0.00	0.00	0.00	1	1
984	13GAL143TRG	16	TEE REDUCIDA GALV 1/2 X 3/8	2	f	100986	0.00	0.00	0.00	1	1
985	13GAL144TRG	16	TEE REDUCIDA GALV 3/4 X 1/2	2	f	100987	0.00	0.00	0.00	1	1
986	13GAL145TRG	16	TEE REDUCIDA GALV 1 X 1/2	2	f	100988	0.00	0.00	0.00	1	1
987	13GAL146TRG	16	TEE REDUCIDA GALV 1 X 3/4	2	f	100989	0.00	0.00	0.00	1	1
988	13GAL147TRG	16	TEE REDUCIDA GALV 1 1/4 X 1/2	2	f	100990	0.00	0.00	0.00	1	1
989	13GAL148TRG	16	TEE REDUCIDA GALV 1 1/4 X 1	2	f	100991	0.00	0.00	0.00	1	1
990	13GAL149TRG	16	TEE REDUCIDA GALV 3 X 2	2	f	100992	0.00	0.00	0.00	1	1
991	13GAL14BUS	16	BUSHING GALV 1 1/4 X 1	2	f	100993	0.00	0.00	0.00	1	1
992	13GAL150TCG	16	TAPON COPA GALV 1/4	2	f	100994	0.00	0.00	0.00	1	1
993	13GAL151TCG	16	TAPON COPA GALV 3/8	2	f	100995	0.00	0.00	0.00	1	1
994	13GAL152TCG	16	TAPON COPA GALV 1/2	2	f	100996	0.00	0.00	0.00	1	1
995	13GAL153TCG	16	TAPON COPA GALV 3/4	2	f	100997	0.00	0.00	0.00	1	1
996	13GAL154TCG	16	TAPON COPA GALV 1	2	f	100998	0.00	0.00	0.00	1	1
997	13GAL155TCG	16	TAPON COPA GALV 1 1/4	2	f	100999	0.00	0.00	0.00	1	1
998	13GAL156TCG	16	TAPON COPA GALV 1 1/2	2	f	1001000	0.00	0.00	0.00	1	1
999	13GAL157TCG	16	TAPON COPA GALV 2	2	f	1001001	0.00	0.00	0.00	1	1
1000	13GAL158TCG	16	TAPON COPA GALV 2 1/2	2	f	1001002	0.00	0.00	0.00	1	1
1001	13GAL159TCG	16	TAPON COPA GALV 3	2	f	1001003	0.00	0.00	0.00	1	1
1002	13GAL15BUS	16	BUSHING GALV 1 1/2 X 1/2	2	f	1001004	0.00	0.00	0.00	1	1
1003	13GAL160TCG	16	TAPON COPA GALV 4	2	f	1001005	0.00	0.00	0.00	1	1
1004	13GAL161TCG	16	TAPON COPA GALV 6	2	f	1001006	0.00	0.00	0.00	1	1
1005	13GAL162TMG	16	TAPON MACHO GALV 1/4	2	f	1001007	0.00	0.00	0.00	1	1
1006	13GAL163TMG	16	TAPON MACHO GALV 3/8	2	f	1001008	0.00	0.00	0.00	1	1
1007	13GAL164TMG	16	TAPON MACHO GALV 1/2	2	f	1001009	0.00	0.00	0.00	1	1
1008	13GAL165TMG	16	TAPON MACHO GALV 3/4	2	f	1001010	0.00	0.00	0.00	1	1
1009	13GAL166TMG	16	TAPON MACHO GALV 1	2	f	1001011	0.00	0.00	0.00	1	1
1010	13GAL167TMG	16	TAPON MACHO GALV 1 1/4	2	f	1001012	0.00	0.00	0.00	1	1
1011	13GAL168TMG	16	TAPON MACHO GALV 1 1/2	2	f	1001013	0.00	0.00	0.00	1	1
1012	13GAL169TMG	16	TAPON MACHO GALV 2	2	f	1001014	0.00	0.00	0.00	1	1
1013	13GAL16BUS	16	BUSHING GALV 1 1/2 X 3/4	2	f	1001015	0.00	0.00	0.00	1	1
1014	13GAL170TMG	16	TAPON MACHO GALV 2 1/2	2	f	1001016	0.00	0.00	0.00	1	1
1015	13GAL171TMG	16	TAPON MACHO GALV 3	\N	f	1001017	0.00	0.00	0.00	1	1
1016	13GAL172TMG	16	TAPON MACHO GALV 4	2	f	1001018	0.00	0.00	0.00	1	1
1017	13GAL173TMG	16	TAPON MACHO GALV 6	2	f	1001019	0.00	0.00	0.00	1	1
1018	13GAL174UNI	16	UNION GALV 1/4	2	f	1001020	0.00	0.00	0.00	1	1
1019	13GAL175UNI	16	UNION GALV 3/8	2	f	1001021	0.00	0.00	0.00	1	1
1020	13GAL176UNI	16	UNION GALV 1/2	2	f	1001022	0.00	0.00	0.00	1	1
1021	13GAL177UNI	16	UNION GALV 3/4	2	f	1001023	0.00	0.00	0.00	1	1
1022	13GAL178UNI	16	UNION GALV 1	2	f	1001024	0.00	0.00	0.00	1	1
1023	13GAL179UNI	16	UNION GALV 1 1/4	2	f	1001025	0.00	0.00	0.00	1	1
1024	13GAL17BUS	16	BUSHING GALV 1 1/2 X 1	2	f	1001026	0.00	0.00	0.00	1	1
1025	13GAL180UNI	16	UNION GALV 1 1/2	2	f	1001027	0.00	0.00	0.00	1	1
1026	13GAL181UNI	16	UNION GALV 2	\N	f	1001028	0.00	0.00	0.00	1	1
1027	13GAL182UNI	16	UNION GALV 2 1/2	2	f	1001029	0.00	0.00	0.00	1	1
1028	13GAL183UNI	16	UNION GALV 3	2	f	1001030	0.00	0.00	0.00	1	1
1029	13GAL184UNI	16	UNION GALV 4	2	f	1001031	0.00	0.00	0.00	1	1
1030	13GAL185UNI	16	UNION GALV 6	2	f	1001032	0.00	0.00	0.00	1	1
1031	13GAL186UNV	16	UNIVERSAL GALV 1/4	2	f	1001033	0.00	0.00	0.00	1	1
1032	13GAL187UNV	16	UNIVERSAL GALV 3/8	2	f	1001034	0.00	0.00	0.00	1	1
1033	13GAL188UNV	16	UNIVERSAL GALV 1/2	2	f	1001035	0.00	0.00	0.00	1	1
1034	13GAL189UNV	16	UNIVERSAL GALV 3/4	2	f	1001036	0.00	0.00	0.00	1	1
1035	13GAL18BUS	16	BUSHING GALV 1 1/2 X 1 1/4	2	f	1001037	0.00	0.00	0.00	1	1
1036	13GAL190UNV	16	UNIVERSAL GALV 1	2	f	1001038	0.00	0.00	0.00	1	1
1037	13GAL191UNV	16	UNIVERSAL GALV 1 1/4	2	f	1001039	0.00	0.00	0.00	1	1
1038	13GAL192UNV	16	UNIVERSAL GALV 1 1/2	\N	f	1001040	0.00	0.00	0.00	1	1
1039	13GAL193UNV	16	UNIVERSAL GALV 2	2	f	1001041	0.00	0.00	0.00	1	1
1040	13GAL194UNV	16	UNIVERSAL GALV 2 1/2	2	f	1001042	0.00	0.00	0.00	1	1
1041	13GAL195UNV	16	UNIVERSAL GALV 3	2	f	1001043	0.00	0.00	0.00	1	1
1042	13GAL196UNV	16	UNIVERSAL GALV 4	2	f	1001044	0.00	0.00	0.00	1	1
1043	13GAL197YEE	16	YEE GALV 3/4	2	f	1001045	0.00	0.00	0.00	1	1
1044	13GAL198NIP	16	NIPLE GALV 1/4 X 5CM	2	f	1001046	0.00	0.00	0.00	1	1
1045	13GAL199NIP	16	NIPLE GALV 1/4 X 10CM	2	f	1001047	0.00	0.00	0.00	1	1
1046	13GAL19BUS	16	BUSHING GALV 2 X 1/2	2	f	1001048	0.00	0.00	0.00	1	1
1047	13GAL200NIP	16	NIPLE GALV 3/8  X 5CM	2	f	1001049	0.00	0.00	0.00	1	1
1048	13GAL201NIP	16	NIPLE GALV 3/8  X 10CM	2	f	1001050	0.00	0.00	0.00	1	1
1049	13GAL202NIP	16	NIPLE GALV 3/8  x 15CM	2	f	1001051	0.00	0.00	0.00	1	1
1050	13GAL203NIP	16	NIPLE GALV 3/8  x 20CM	2	f	1001052	0.00	0.00	0.00	1	1
1051	13GAL204NIP	16	NIPLE GALV 1/2 X 5CM	2	f	1001053	0.00	0.00	0.00	1	1
1052	13GAL205NIP	16	NIPLE GALV 1/2 X 10CM	2	f	1001054	0.00	0.00	0.00	1	1
1053	13GAL206NIP	16	NIPLE GALV 1/2 X 15CM	2	f	1001055	0.00	0.00	0.00	1	1
1054	13GAL207NIP	16	NIPLE GALV 1/2 X 20CM	2	f	1001056	0.00	0.00	0.00	1	1
1055	13GAL208NIP	16	NIPLE GALV 3/4 X 5CM	2	f	1001057	0.00	0.00	0.00	1	1
1056	13GAL209NIP	16	NIPLE GALV 3/4 X 10CM	2	f	1001058	0.00	0.00	0.00	1	1
1057	13GAL20BUS	16	BUSHING GALV 2 X 3/4	\N	f	1001059	0.00	0.00	0.00	1	1
1058	13GAL210NIP	16	NIPLE GALV 3/4 X 15CM	2	f	1001060	0.00	0.00	0.00	1	1
1059	13GAL211NIP	16	NIPLE GALV 3/4 X 20CM	2	f	1001061	0.00	0.00	0.00	1	1
1060	13GAL212NIP	16	NIPLE GALV 1 X 5CM	2	f	1001062	0.00	0.00	0.00	1	1
1061	13GAL213NIP	16	NIPLE GALV 1 X 10CM	2	f	1001063	0.00	0.00	0.00	1	1
1062	13GAL214NIP	16	NIPLE GALV 1 X 15CM	2	f	1001064	0.00	0.00	0.00	1	1
1063	13GAL215NIP	16	NIPLE GALV 1 X 20CM	2	f	1001065	0.00	0.00	0.00	1	1
1064	13GAL216NIP	16	NIPLE GALV 1 1/4 X 5CM	2	f	1001066	0.00	0.00	0.00	1	1
1065	13GAL217NIP	16	NIPLE GALV 1 1/4 X 10CM	2	f	1001067	0.00	0.00	0.00	1	1
1066	13GAL218NIP	16	NIPLE GALV 1 1/4 X 15CM	\N	f	1001068	0.00	0.00	0.00	1	1
1067	13GAL219NIP	16	NIPLE GALV 1 1/4 X 20CM	2	f	1001069	0.00	0.00	0.00	1	1
1068	13GAL21BUS	16	BUSHING GALV 2 X 1	2	f	1001070	0.00	0.00	0.00	1	1
1069	13GAL220NIP	16	NIPLE GALV 1 1/2 X 5CM	2	f	1001071	0.00	0.00	0.00	1	1
1070	13GAL221NIP	16	NIPLE GALV 1 1/2 X 10CM	2	f	1001072	0.00	0.00	0.00	1	1
1071	13GAL222NIP	16	NIPLE GALV 1 1/2 X 15CM	2	f	1001073	0.00	0.00	0.00	1	1
1072	13GAL223NIP	16	NIPLE GALV 1 1/2 X 20CM	\N	f	1001074	0.00	0.00	0.00	1	1
1073	13GAL224NIP	16	NIPLE GALV 2 X 5CM	2	f	1001075	0.00	0.00	0.00	1	1
1074	13GAL225NIP	16	NIPLE GALV 2 X 10CM	2	f	1001076	0.00	0.00	0.00	1	1
1075	13GAL226NIP	16	NIPLE GALV 2 X 15CM	2	f	1001077	0.00	0.00	0.00	1	1
1076	13GAL227NIP	16	NIPLE GALV 2 X 20CM	2	f	1001078	0.00	0.00	0.00	1	1
1077	13GAL228NIP	16	NIPLE GALV 2 1/2 X 5CM	2	f	1001079	0.00	0.00	0.00	1	1
1078	13GAL229NIP	16	NIPLE GALV 2 1/2 X 10CM	\N	f	1001080	0.00	0.00	0.00	1	1
1079	13GAL22BUS	16	BUSHING GALV 2 X 1 1/4	2	f	1001081	0.00	0.00	0.00	1	1
1080	13GAL230NIP	16	NIPLE GALV 2 1/2 X 15CM	2	f	1001082	0.00	0.00	0.00	1	1
1081	13GAL231NIP	16	NIPLE GALV 2 1/2 X 20CM	2	f	1001083	0.00	0.00	0.00	1	1
1082	13GAL232NIP	16	NIPLE GALV 3 X 5CM	2	f	1001084	0.00	0.00	0.00	1	1
1083	13GAL233NIP	16	NIPLE GALV 3 X 10CM	2	f	1001085	0.00	0.00	0.00	1	1
1084	13GAL234NIP	16	NIPLE GALV 3 X 15CM	2	f	1001086	0.00	0.00	0.00	1	1
1085	13GAL235NIP	16	NIPLE GALV 3 X 20CM	2	f	1001087	0.00	0.00	0.00	1	1
1086	13GAL236NIP	16	NIPLE GALV 3 X 30 CM	2	f	1001088	0.00	0.00	0.00	1	1
1087	13GAL237NIP	16	NIPLE GALV 3 X 40 CM	2	f	1001089	0.00	0.00	0.00	1	1
1088	13GAL238NIP	16	NIPLE GALV 4 X 5CM	2	f	1001090	0.00	0.00	0.00	1	1
1089	13GAL239NIP	16	NIPLE GALV 4 X 10CM	2	f	1001091	0.00	0.00	0.00	1	1
1090	13GAL23BUS	16	BUSHING GALV 2 X 1 1/2	2	f	1001092	0.00	0.00	0.00	1	1
1091	13GAL240NIP	16	NIPLE GALV 4 X 15CM	2	f	1001093	0.00	0.00	0.00	1	1
1092	13GAL241NIP	16	NIPLE GALV 4 X 20CM	2	f	1001094	0.00	0.00	0.00	1	1
1093	13GAL242NIP	16	NIPLE GALV 1/2 X 25CM	\N	f	1001095	0.00	0.00	0.00	1	1
1094	13GAL243NIP	16	NIPLE GALV 1/2 X 7,5CM	\N	f	1001097	0.00	0.00	0.00	1	1
1095	13GAL244NIP	16	NIPLE GALV 1/2 X 40CM	\N	f	1001099	0.00	0.00	0.00	1	1
1096	13GAL245NIP	16	NIPLE GALV 1/2 X 50CM	\N	f	1001101	0.00	0.00	0.00	1	1
1097	13GAL246NIP	16	NIPLE GALV 1/2 X 80CM	\N	f	1001103	0.00	0.00	0.00	1	1
1098	13GAL24BUS	16	BUSHING GALV 2 1/2 X 1	2	f	1001108	0.00	0.00	0.00	1	1
1099	13GAL258TUB	16	TUBO DE CERRAMIENTO 3MM 1-1/2  X 6 MT	2	f	1001117	0.00	0.00	0.00	1	1
1100	13GAL259NIP	16	NIPLE BARRIL GALV 3	2	f	1001118	0.00	0.00	0.00	1	1
1101	13GAL259TUB	16	TUBERIA AC SCH40 3 X TRAMOS DE CMS	2	f	1001119	0.00	0.00	0.00	1	1
1102	13GAL25BUS	16	BUSHING GALV 2 1/2 X 1 1/4	2	f	1001120	0.00	0.00	0.00	1	1
1103	13GAL260INOX	16	CODO INOX ROSCA 2 	2	f	1001121	0.00	0.00	0.00	1	1
1104	13GAL260NIP	16	NIPLE BARRIL GALV 1	2	f	1001122	0.00	0.00	0.00	1	1
1105	13GAL260TUB	16	TUBERIA AC SCH40 4 X  TRAMOS CM	2	f	1001123	0.00	0.00	0.00	1	1
1106	13GAL261INOX	16	SEMICODO INOX ROSC 2	2	f	1001124	0.00	0.00	0.00	1	1
1107	13GAL261NIP	16	NIPLE BARRIL GALV 2	2	f	1001125	0.00	0.00	0.00	1	1
1108	13GAL262INOX	16	NIPLE INOX 2 x 1.50 MT 2 ROSCAS	2	f	1001126	0.00	0.00	0.00	1	1
1109	13GAL262NIP	16	NIPLE BARRIL GALV 4	2	f	1001127	0.00	0.00	0.00	1	1
1110	13GAL263INOX	16	NIPLE INOX 2 x 20 CM	2	f	1001128	0.00	0.00	0.00	1	1
1111	13GAL263NIP	16	NIPLE GALV 1 1/2 X 60CM	2	f	1001129	0.00	0.00	0.00	1	1
1112	13GAL264INOX	16	NIPLE INOX304 3/4 x 35CM 	2	f	1001130	0.00	0.00	0.00	1	1
1114	13GAL264RN	16	RANURA AC4	2	f	1001132	0.00	0.00	0.00	1	1
1115	13GAL265INOX	16	NIPLE INOX 1/4 X 10CM	2	f	1001133	0.00	0.00	0.00	1	1
1116	13GAL265NIP	16	NIPLE BARRIL GALV 1/4	2	f	1001134	0.00	0.00	0.00	1	1
1117	13GAL266INOX	16	NIPLE BARRIL INOX GALV 2 1/2	2	f	1001135	0.00	0.00	0.00	1	1
1118	13GAL267INOX	16	CODO INOX ROSC 3/4	2	f	1001136	0.00	0.00	0.00	1	1
1119	13GAL26BUS	16	BUSHING GALV 2 1/2 X 1 1/2	2	f	1001137	0.00	0.00	0.00	1	1
1120	13GAL27BUS	16	BUSHING GALV 3 X 1	2	f	1001138	0.00	0.00	0.00	1	1
1121	13GAL28BUS	16	BUSHING GALV 3 X 1 1/2	2	f	1001139	0.00	0.00	0.00	1	1
1122	13GAL29BUS	16	BUSHING GALV 3 X 2	2	f	1001140	0.00	0.00	0.00	1	1
1123	13GAL30BUS	16	BUSHING GALV 3 X1 1/2	2	f	1001141	0.00	0.00	0.00	1	1
1124	13GAL31BUS	16	BUSHING GALV 4 X 1/2	2	f	1001142	0.00	0.00	0.00	1	1
1125	13GAL32BUS	16	BUSHING GALV 4 X 1	2	f	1001143	0.00	0.00	0.00	1	1
1126	13GAL33BUS	16	BUSHING GALV 4 X 1 1/4	2	f	1001144	0.00	0.00	0.00	1	1
1127	13GAL34BUS	16	BUSHING GALV 4 X 1 1/2	2	f	1001145	0.00	0.00	0.00	1	1
1128	13GAL35BUS	16	BUSHING GALV 4 X 2	2	f	1001146	0.00	0.00	0.00	1	1
1129	13GAL36BUS	16	BUSHING GALV 4 X1 1/2	2	f	1001147	0.00	0.00	0.00	1	1
1130	13GAL37BUS	16	BUSHING GALV 4 X 3	2	f	1001148	0.00	0.00	0.00	1	1
1131	13GAL38BUS	16	BUSHING GALV 6 X 2	2	f	1001149	0.00	0.00	0.00	1	1
1132	13GAL39BUS	16	BUSHING GALV 6 X 3	2	f	1001150	0.00	0.00	0.00	1	1
1133	13GAL40BUS	16	BUSHING GALV 6 X 4	2	f	1001151	0.00	0.00	0.00	1	1
1134	13GAL41BUS	16	BUSHING HO ROSCA 3 x 2 X 150L	2	f	1001152	0.00	0.00	0.00	1	1
1135	13GAL41COP	16	COPA GALV 3/8 X 1/4	2	f	1001153	0.00	0.00	0.00	1	1
1136	13GAL42COP	16	COPA GALV 1/2 X 1/4	2	f	1001154	0.00	0.00	0.00	1	1
1137	13GAL43COP	16	COPA GALV 1/2 X 3/8	2	f	1001155	0.00	0.00	0.00	1	1
1138	13GAL44COP	16	COPA GALV 3/4 X 1/4	2	f	1001156	0.00	0.00	0.00	1	1
1139	13GAL45COP	16	COPA GALV 3/4 X 3/8	2	f	1001157	0.00	0.00	0.00	1	1
1140	13GAL46COP	16	COPA GALV 3/4 X 1/2	2	f	1001158	0.00	0.00	0.00	1	1
1141	13GAL47COP	16	COPA GALV 1 X 1/4	2	f	1001159	0.00	0.00	0.00	1	1
1142	13GAL48COP	16	COPA GALV 1 X 3/8	2	f	1001160	0.00	0.00	0.00	1	1
1143	13GAL49COP	16	COPA GALV 1 X 1/2	2	f	1001161	0.00	0.00	0.00	1	1
1144	13GAL50COP	16	COPA GALV 1 X 3/4	2	f	1001162	0.00	0.00	0.00	1	1
1145	13GAL51COP	16	COPA GALV 1 1/4 X 1/2	2	f	1001163	0.00	0.00	0.00	1	1
1146	13GAL52COP	16	COPA GALV 1 1/4 X 3/4	2	f	1001164	0.00	0.00	0.00	1	1
1147	13GAL53COP	16	COPA GALV 1 1/4 X 1	2	f	1001165	0.00	0.00	0.00	1	1
1148	13GAL54COP	16	COPA GALV 1 1/2X 1/2	2	f	1001166	0.00	0.00	0.00	1	1
1149	13GAL55COP	16	COPA GALV 1 1/2 X 3/4	2	f	1001167	0.00	0.00	0.00	1	1
1150	13GAL56COP	16	COPA GALV 1 1/2 X 1	2	f	1001168	0.00	0.00	0.00	1	1
1151	13GAL57COP	16	COPA GALV 1 1/2X 1 1/4	\N	f	1001169	0.00	0.00	0.00	1	1
1152	13GAL58COP	16	COPA GALV 2 X 1/2	2	f	1001170	0.00	0.00	0.00	1	1
1153	13GAL59COP	16	COPA GALV 2 X 3/4	2	f	1001171	0.00	0.00	0.00	1	1
1154	13GAL60COP	16	COPA GALV 2 X 1	2	f	1001172	0.00	0.00	0.00	1	1
1155	13GAL61COP	16	COPA GALV 2 X 1 1/4	\N	f	1001173	0.00	0.00	0.00	1	1
1156	13GAL62COP	16	COPA GALV 2 X 1 1/2	2	f	1001174	0.00	0.00	0.00	1	1
1157	13GAL63COP	16	COPA GALV 2 1/2 X 1	2	f	1001175	0.00	0.00	0.00	1	1
1158	13GAL64COP	16	COPA GALV 2 1/2 X 1 1/4	2	f	1001176	0.00	0.00	0.00	1	1
1159	13GAL65COP	16	COPA GALV 2 1/2 X 1 1/2	2	f	1001177	0.00	0.00	0.00	1	1
1160	13GAL66COP	16	COPA GALV 2 1/2 X 2	2	f	1001178	0.00	0.00	0.00	1	1
1161	13GAL67COP	16	COPA GALV 3 X 1	2	f	1001179	0.00	0.00	0.00	1	1
1162	13GAL68COP	16	COPA GALV 3 X 1 1/2	2	f	1001180	0.00	0.00	0.00	1	1
1163	13GAL69COP	16	COPA GALV 3 X 2	2	f	1001181	0.00	0.00	0.00	1	1
1164	13GAL70COP	16	COPA GALV 3 X2 1/2	2	f	1001182	0.00	0.00	0.00	1	1
1165	13GAL71COP	16	COPA GALV 4 X 1 1/2	2	f	1001183	0.00	0.00	0.00	1	1
1166	13GAL72COP	16	COPA GALV 4 X 2	2	f	1001184	0.00	0.00	0.00	1	1
1167	13GAL73COP	16	COPA GALV 4 X1 1/2	2	f	1001185	0.00	0.00	0.00	1	1
1168	13GAL74COP	16	COPA GALV 4 X 3	2	f	1001186	0.00	0.00	0.00	1	1
1169	13GAL75COP	16	COPA GALV 6X 2	2	f	1001187	0.00	0.00	0.00	1	1
1170	13GAL76COP	16	COPA GALV 6 X 3	2	f	1001188	0.00	0.00	0.00	1	1
1171	13GAL77COP	16	COPA GALV 6 X 4	2	f	1001189	0.00	0.00	0.00	1	1
1172	13GAL78SEM	16	SEMICODO GALV 1/4	2	f	1001190	0.00	0.00	0.00	1	1
1173	13GAL79SEM	16	SEMICODO GALV 3/8	2	f	1001191	0.00	0.00	0.00	1	1
1174	13GAL80SEM	16	SEMICODO GALV 1/2	2	f	1001192	0.00	0.00	0.00	1	1
1175	13GAL81SEM	16	SEMICODO GALV 3/4	2	f	1001193	0.00	0.00	0.00	1	1
1176	13GAL82SEM	16	SEMICODO GALV 1	2	f	1001194	0.00	0.00	0.00	1	1
1177	13GAL83SEM	16	SEMICODO GALV 1 1/4	2	f	1001195	0.00	0.00	0.00	1	1
1178	13GAL84SEM	16	SEMICODO GALV 1 1/2	2	f	1001196	0.00	0.00	0.00	1	1
1179	13GAL85SEM	16	SEMICODO GALV 2	2	f	1001197	0.00	0.00	0.00	1	1
1180	13GAL86SEM	16	SEMICODO GALV 2 1/2	2	f	1001198	0.00	0.00	0.00	1	1
1181	13GAL87SEM	16	SEMICODO GALV 3	2	f	1001199	0.00	0.00	0.00	1	1
1182	13GAL88SEM	16	SEMICODO GALV 4	2	f	1001200	0.00	0.00	0.00	1	1
1183	13GAL89SEM	16	SEMICODO GALV 6	2	f	1001201	0.00	0.00	0.00	1	1
1184	13GAL90COD	16	CODO GALV 1/4	2	f	1001202	0.00	0.00	0.00	1	1
1185	13GAL91COD	16	CODO GALV 3/8	2	f	1001203	0.00	0.00	0.00	1	1
1186	13GAL92COD	16	CODO GALV 1/2	2	f	1001204	0.00	0.00	0.00	1	1
1187	13GAL93COD	16	CODO GALV 3/4	2	f	1001205	0.00	0.00	0.00	1	1
1188	13GAL94COD	16	CODO GALV 1	2	f	1001206	0.00	0.00	0.00	1	1
1189	13GAL95COD	16	CODO GALV 1 1/4	2	f	1001207	0.00	0.00	0.00	1	1
1190	13GAL96COD	16	CODO GALV 1 1/2	2	f	1001208	0.00	0.00	0.00	1	1
1191	13GAL97COD	16	CODO GALV 2	2	f	1001209	0.00	0.00	0.00	1	1
1192	13GAL98COD	16	CODO GALV 2 1/2	2	f	1001210	0.00	0.00	0.00	1	1
1193	13GAL99COD	16	CODO GALV 3	2	f	1001211	0.00	0.00	0.00	1	1
1194	14PEAC-01	17	TUB PEAD ALCANTARILLADO CORRUGADO 200mm xMT	2	f	1001212	0.00	0.00	0.00	1	1
1195	14PEAC-02	17	TUB PEAD ALCANTARILLADO CORRUGADO 350mm x MT(14)	2	f	1001213	0.00	0.00	0.00	1	1
1196	14PEAC-03	17	TUB PEAD ALCANTARILLADO CORRUGADO 450mm x MT(18)	2	f	1001214	0.00	0.00	0.00	1	1
1197	14PEAC-04	17	TUB PEAD ALCANTARILLADO CORRUGADO 250mm x MT	2	f	1001215	0.00	0.00	0.00	1	1
1198	14PEAC-06	17	TUB PEAD ALCANTARILLADO CORRUGADO 500mm x MT	2	f	1001216	0.00	0.00	0.00	1	1
1199	14PEBR-01	17	BRIDA METÁLICA DN 2 ANSI CL 150	2	f	1001217	0.00	0.00	0.00	1	1
1200	14PEBR-02	17	BRIDA METÁLICA DN 110MM ANSI CL150	2	f	1001218	0.00	0.00	0.00	1	1
1201	14PEBR-03	17	BRIDA PVC GIRATORIA DE 4 SOLDAR	2	f	1001219	0.00	0.00	0.00	1	1
1202	14PEBR-04	17	BRIDA METÁLICA DN 90MM ANSI CL150	2	f	1001220	0.00	0.00	0.00	1	1
1203	14PEBR-05	17	BRIDA METÁLICA 250MM	2	f	1001221	0.00	0.00	0.00	1	1
1204	14PECO-01	17	CODO PE 110mm X 90° PE 100	2	f	1001222	0.00	0.00	0.00	1	1
1205	14PECO-02	17	CODO PE 160mm x 45° PE 100 RD17 PN10	2	f	1001223	0.00	0.00	0.00	1	1
1206	14PECO-03	17	CODO PE 160mm X 90° PE 100	2	f	1001224	0.00	0.00	0.00	1	1
1207	14PECO-04	17	CODO PE 160mm x 90° PE 100 RD17 PN10	2	f	1001225	0.00	0.00	0.00	1	1
1208	14PECO-05	17	CODO PE 200mm x 45° PE 100 RD17 PN10	2	f	1001226	0.00	0.00	0.00	1	1
1209	14PECO-06	17	CODO PE 250mm 	2	f	1001227	0.00	0.00	0.00	1	1
1210	14PEPO-01	17	PORTABRIDA 63mm RDE 17 PN 10 TOPE	2	f	1001228	0.00	0.00	0.00	1	1
1211	14PEPO-02	17	PORTABRIDA 110MM PE100 RD17 PN10 TOPE	2	f	1001229	0.00	0.00	0.00	1	1
1212	14PEPO-03	17	PORTABRIDA 75mm RDE 17 PN 10 TOPE	2	f	1001230	0.00	0.00	0.00	1	1
1213	14PEPO-04	17	PORTABRIDA AC 110mm X 150L606	2	f	1001231	0.00	0.00	0.00	1	1
1214	14PEPO-05	17	PORTABRIDA 90mm PN 16 TOPE	2	f	1001232	0.00	0.00	0.00	1	1
1215	14PEPO-06	17	14PEPO-03	2	f	1001233	0.00	0.00	0.00	1	1
1216	14PEPO-07	17	PORTABRIDA PE 100 PN16 50MM	2	f	1001234	0.00	0.00	0.00	1	1
1217	14PEPO-08	17	PORTABRIDA 250MM	2	f	1001235	0.00	0.00	0.00	1	1
1218	14PEPO-09	17	PORTABRIDA PE TERMO PN16 75mm 	2	f	1001236	0.00	0.00	0.00	1	1
1219	14PERE-01	17	REDUCCION 160mm x 110mm PN10 TOPE	2	f	1001237	0.00	0.00	0.00	1	1
1220	14PESE-01	17	SEMICODO PE 160mm X 22.5 PN10	2	f	1001238	0.00	0.00	0.00	1	1
1221	14PETE-01	17	TEE PE100 75MM RD11 PN16	2	f	1001239	0.00	0.00	0.00	1	1
1222	14PETE-02	17	TEE PP 75MM MECANICO PN16	2	f	1001240	0.00	0.00	0.00	1	1
1223	15AT01	14	ARMOTANQUE 49.6 M3 DOBLE CHAPA	2	f	1001264	0.00	0.00	0.00	1	1
1224	15RM01AT	14	AQUATANQUE 25.000 LT	2	f	1001265	0.00	0.00	0.00	1	1
1225	15RM01BB	14	BEBEDERO 1.000 LT AQP	2	f	1001266	0.00	0.00	0.00	1	1
1226	15RM01FF	14	FALSO FONDO 2000LT	2	f	1001267	0.00	0.00	0.00	1	1
1227	15RM01TP	14	TAPA TANQUE 1000LT	2	f	1001268	0.00	0.00	0.00	1	1
1228	15RM02AT	14	ARMOTANQUE 25.000 LT	2	f	1001269	0.00	0.00	0.00	1	1
1229	15RM02BB	14	BEBEDERO 1.000LT CON KIT AQP	2	f	1001270	0.00	0.00	0.00	1	1
1230	15RM03AT	14	TANQUE HIDRONEUM F.E MEMBRANA 140LT V	2	f	1001271	0.00	0.00	0.00	1	1
1231	15RM03BB	14	BEBEDERO 1.000LT NEGRO ROTOPLAST	2	f	1001272	0.00	0.00	0.00	1	1
1232	15RM04AT	14	ARMOTANQUE 220.000 LT DOBLE CHAPA/SISTEMA RIEGO	2	f	1001273	0.00	0.00	0.00	1	1
1233	15RM04BB	14	BEBEDERO 250 LT CON KIT AQP	2	f	1001274	0.00	0.00	0.00	1	1
1234	15RM05AT	14	ARMOTANQUE 25.200LT /SISTEMA RIEGO	2	f	1001275	0.00	0.00	0.00	1	1
1235	15RM05BB	14	BEBEDERO 250LTS AQP	2	f	1001276	0.00	0.00	0.00	1	1
1236	15RM06BB	14	BEBEDERO 500 LTS NEGRO ROTOPLAST	2	f	1001277	0.00	0.00	0.00	1	1
1237	15RM07BB	14	BEBEDERO 500LTS AQP	2	f	1001278	0.00	0.00	0.00	1	1
1238	15RM08BB	14	BEBEDERO 2.000 LTS NEGRO ROTOPLAST	2	f	1001279	0.00	0.00	0.00	1	1
1239	15RM08IT	14	ISOTANQUE 1000 LT	2	f	1001280	0.00	0.00	0.00	1	1
1240	15RM09BB	14	BEBEDERO 500 LT CON KIT AQP	2	f	1001281	0.00	0.00	0.00	1	1
1241	15RM09KIT	14	KIT ACCESORIOS SISTEMA SEPTICO 1.000LT	2	f	1001282	0.00	0.00	0.00	1	1
1242	15RM10BB	14	BEBEDERO 250 CON KIT 	2	f	1001283	0.00	0.00	0.00	1	1
1243	15RM10KIT	14	KIT ACCESORIOS SISTEMA SEPTICO 2.000LT	2	f	1001284	0.00	0.00	0.00	1	1
1244	15RM11BB	14	BEBEDERO 500 LT CON KIT	2	f	1001285	0.00	0.00	0.00	1	1
1245	15RM11KIT	14	KIT BEBEDERO	2	f	1001286	0.00	0.00	0.00	1	1
1246	15RM12ROS	14	MATERIAL FILTRANTE PLASTICO (ROSETON) X UND	2	f	1001287	0.00	0.00	0.00	1	1
1247	15RM13SS	14	SISTEMA SEPTICO 1.000LT (COMPUESTO) AQP	2	f	1001288	0.00	0.00	0.00	1	1
1248	15RM14SS	14	SISTEMA SEPTICO 2.000LT (COMPUESTO) AQP	2	f	1001289	0.00	0.00	0.00	1	1
1249	15RM15SS	14	SISTEMA SEPTICO 3.000LT (COMPUESTO) AQP	2	f	1001290	0.00	0.00	0.00	1	1
1250	15RM16SS	14	SISTEMA SEPTICO INTEGRADO 10.000 AQP	2	f	1001291	0.00	0.00	0.00	1	1
1251	15RM17SS	14	SISTEMA SEPTICO INTEGRADO 2.000 AQP	2	f	1001292	0.00	0.00	0.00	1	1
1252	15RM18SS	14	SISTEMA SEPTICO 5.000LT (COMPUESTO) AQP	2	f	1001293	0.00	0.00	0.00	1	1
1253	15RM18TB	14	TANQUE BOTELLA DE 300LT NEGRO/AZUL	2	f	1001294	0.00	0.00	0.00	1	1
1254	15RM19SS	14	SISTEMA SEPTICO 6.000LT (COMPUESTO) AQP	2	f	1001295	0.00	0.00	0.00	1	1
1255	15RM19TB	14	TANQUE BOTELLA DE 1.100LT NEGRO/AZUL	2	f	1001296	0.00	0.00	0.00	1	1
1256	15RM20SS	14	SISTEMA SEPTICO INTEGRADO 5.000 AQP	2	f	1001297	0.00	0.00	0.00	1	1
1257	15RM20TH	14	TANQUE CILINDRICO HORIZONTAL 3.000LT AQP	2	f	1001298	0.00	0.00	0.00	1	1
1258	15RM21SS	14	SISTEMA SEPTICO INTEGRADO 6.000 AQP	2	f	1001299	0.00	0.00	0.00	1	1
1259	15RM21TC	14	TANQUE CONICO 1.000LT CON TAPA AQP	2	f	1001300	0.00	0.00	0.00	1	1
1260	15RM21TH	14	TANQUE CILINDRICO HORIZONTAL 18.000LT AQP	2	f	1001301	0.00	0.00	0.00	1	1
1261	15RM22SS	14	SISTEMA SEPTICO INTEGRADO 1.650 LT AQP	2	f	1001302	0.00	0.00	0.00	1	1
1262	15RM22TC	14	TANQUE CONICO 1.000LT NATURAL AQP	2	f	1001303	0.00	0.00	0.00	1	1
1263	15RM22TH	14	TANQUE CILINDRICO HORIZONTAL 20.000LT AQP	2	f	1001304	0.00	0.00	0.00	1	1
1264	15RM23SS	14	SISTEMA SEPTICO INTEGRADO 3.000 AQP	2	f	1001305	0.00	0.00	0.00	1	1
1265	15RM23TC	14	TANQUE CONICO 10.000 LT CON TAPA AQP	2	f	1001306	0.00	0.00	0.00	1	1
1266	15RM23TH	14	TANQUE CILINDRICO HORIZONTAL 30.000LT AQP	2	f	1001307	0.00	0.00	0.00	1	1
1267	15RM24TC	14	TANQUE CONICO 2.000 LT CON TAPA AQP	2	f	1001308	0.00	0.00	0.00	1	1
1268	15RM25TC	14	TANQUE CONICO 250 LT CON TAPA AQP	2	f	1001309	0.00	0.00	0.00	1	1
1269	15RM26TC	14	TANQUE CONICO 500 LT CON TAPA AQP	2	f	1001310	0.00	0.00	0.00	1	1
1270	15RM27TC	14	TANQUE CONICO 5.000 LT CON TAPA AQP	2	f	1001311	0.00	0.00	0.00	1	1
1271	15RM28TC	14	TANQUE ROTOPLAST 1.000LT C.T	2	f	1001312	0.00	0.00	0.00	1	1
1272	15RM29TC	14	TANQUE ROTOPLAST 500LT C.T	2	f	1001313	0.00	0.00	0.00	1	1
1273	15RM30TC	14	TANQUE ROTOPLAST BICAPA 2.000LT C.T	2	f	1001314	0.00	0.00	0.00	1	1
1274	15RM31TC	14	TANQUE ROTOPLAST UNICAPA 10.000 LT NEGRO	2	f	1001315	0.00	0.00	0.00	1	1
1275	15RM32TC	14	TANQUE ROTOPLAST 250LT C.T	2	f	1001316	0.00	0.00	0.00	1	1
1276	15RM32TV	14	TOLVA CLASIFICADORA PARA CAFE 660KG	2	f	1001317	0.00	0.00	0.00	1	1
1277	15RM33TC	14	TANQUE CONICO BICAPA 3.000 LT CON TAPA AQP	2	f	1001318	0.00	0.00	0.00	1	1
1278	15RM33TG	14	TRAMPA DE GRASA 105LT	2	f	1001319	0.00	0.00	0.00	1	1
1279	15RM34TC	14	TANQUE PRECARGADO ALTAPRO XLB 119	2	f	1001320	0.00	0.00	0.00	1	1
1280	15RM34TG	14	TRAMPA DE GRASA 500LT	2	f	1001321	0.00	0.00	0.00	1	1
1281	15RM35TC	14	TANQUE CONICO 5.000 LT  NATURAL AQP	2	f	1001322	0.00	0.00	0.00	1	1
1282	15RM35TG	14	TRAMPA DE GRASA 250LT	2	f	1001323	0.00	0.00	0.00	1	1
1283	15RM38TC	14	TANQUE CONICO 2.000 LT C/T NATURAL AQP	2	f	1001324	0.00	0.00	0.00	1	1
1284	15RMT	14	TANQUE BOTELLA DE 600LT NEGRO/AZUL CT/A	2	f	1001325	0.00	0.00	0.00	1	1
1285	16CE00AIS	8	AISLADOR CERCA VIVA NEGRO	2	f	1001326	0.00	0.00	0.00	1	1
1286	16CE01AIS	8	AISLADOR CINTA CORDON AMARRILLO	2	f	1001327	0.00	0.00	0.00	1	1
1287	16CE02AIS	8	AISLADOR DISTANCIADOR AMARILLO	2	f	1001328	0.00	0.00	0.00	1	1
1288	16CE03AIS	8	AISLADOR OVALADO TIPO PERA AMARILLO	2	f	1001329	0.00	0.00	0.00	1	1
1289	16CE04AIS	8	AISLADOR OVALADO TIPO PERA NEGRO	2	f	1001330	0.00	0.00	0.00	1	1
1290	16CE05AIS	8	AISLADOR PIBOTE NEGRO	2	f	1001331	0.00	0.00	0.00	1	1
1291	16CE06AIS	8	AISLADOR PIBOTE PUNTILLA AMARILLO	2	f	1001332	0.00	0.00	0.00	1	1
1292	16CE07AIS	8	AISLADOR PUNTILLA PLANO AMARILLO	2	f	1001333	0.00	0.00	0.00	1	1
1293	16CE08AIS	8	AISLADOR PUNTILLA PLANO NEGRO	2	f	1001334	0.00	0.00	0.00	1	1
1294	16CE09AIS	8	AISLADOR TORNILLO AMARILLO	2	f	1001335	0.00	0.00	0.00	1	1
1295	16CE10AIS	8	AISLADOR TORNILLO NEGRO	2	f	1001336	0.00	0.00	0.00	1	1
1296	16CE11AIS	8	AISLADOR TORNILLO TIPO YOYO	2	f	1001337	0.00	0.00	0.00	1	1
1297	16CE12AIS	8	AISLADOR VARILLA MOVIL	2	f	1001338	0.00	0.00	0.00	1	1
1298	16CE16AVI	8	AVISO REFLECTIVO CERCA ELECTRICA	2	f	1001342	0.00	0.00	0.00	1	1
1299	16CE19CDT	8	CUCHILLA DOBLE TIRO	2	f	1001345	0.00	0.00	0.00	1	1
1300	16CE20DES	8	DESVIADOR DE RAYO AUXILIAR	2	f	1001347	0.00	0.00	0.00	1	1
1301	16CE21DES	8	DESVIADOR DE RAYO PRINCIPAL	2	f	1001348	0.00	0.00	0.00	1	1
1302	16CE22DIS	8	DISPENSADOR DE CINTA ELECTRICA	2	f	1001349	0.00	0.00	0.00	1	1
1303	16CE23GVC	8	GRAPA PARA VARILLA COOPERWELL	2	f	1001350	0.00	0.00	0.00	1	1
1304	16CE24IMP	8	IMPULSOR CERCA ELECTRICA 150 KM	2	f	1001351	0.00	0.00	0.00	1	1
1305	16CE25IMP	8	IMPULSOR CERCA ELECTRICA 200 KM	2	f	1001352	0.00	0.00	0.00	1	1
1306	16CE26IMP	8	IMPULSOR CERCA ELECTRICA 30 KM	2	f	1001353	0.00	0.00	0.00	1	1
1307	16CE27IMP	8	IMPULSOR CERCA ELECTRICA 350 KM	2	f	1001354	0.00	0.00	0.00	1	1
1308	16CE28IMP	8	IMPULSOR CERCA ELECTRICA 50 KM	2	f	1001355	0.00	0.00	0.00	1	1
1309	16CE29IMP	8	IMPULSOR CERCA ELECTRICA 5 KM	2	f	1001356	0.00	0.00	0.00	1	1
1310	16CE29KIT	8	KIT PORTILLO X 3MT	2	f	1001357	0.00	0.00	0.00	1	1
1311	16CE30KIT	8	KIT PORTILLO x 5 MT	2	f	1001358	0.00	0.00	0.00	1	1
1312	16CE31KIT	8	KIT SOLAR F1 300KM(PANEL, CAJA,BATERI.REGU)	2	f	1001359	0.00	0.00	0.00	1	1
1313	16CE31LLT	8	LLAVE TENSORA CERCA ELECTRICA	2	f	1001360	0.00	0.00	0.00	1	1
1314	16CE32KIT	8	KIT SOLAR F1 50KM(PANEL, CAJA,BATERI.REGU)	2	f	1001361	0.00	0.00	0.00	1	1
1315	16CE35MPO	8	MANIGUETA PORTILLO AMARILLA	2	f	1001365	0.00	0.00	0.00	1	1
1316	16CE36MPO	8	MANIGUETA PORTILLO NEGRO	2	f	1001366	0.00	0.00	0.00	1	1
1317	16CE37RMQ	8	RECIBIDOR MANIGUETA AMARILLO	2	f	1001367	0.00	0.00	0.00	1	1
1318	16CE38RMN	8	RECIBIDOR MANIGUETA NEGRO	2	f	1001368	0.00	0.00	0.00	1	1
1319	16CE39RES	8	RESORTE PORTILLO x 3 MT	2	f	1001369	0.00	0.00	0.00	1	1
1320	16CE40RES	8	RESORTE PORTILLO x 5 MT	2	f	1001370	0.00	0.00	0.00	1	1
1321	16CE41SWI	8	SWICHE INTERRUPTOR AMARILLO	2	f	1001371	0.00	0.00	0.00	1	1
1322	16CE42TGC	8	TENSOR GALV GRANDE CALIENTE	2	f	1001372	0.00	0.00	0.00	1	1
1323	16CE43TGF	8	TENSOR GALV GRANDE FRIO	2	f	1001373	0.00	0.00	0.00	1	1
1324	16CE44TGC	8	TENSOR GALV PEQUENO CALIENTE	2	f	1001374	0.00	0.00	0.00	1	1
1325	16CE45TGF	8	TENSOR GALV PEQUENO FRIO	2	f	1001375	0.00	0.00	0.00	1	1
1326	16CE46VAR	8	VARILLA COPPERWELD 1.80MT	2	f	1001376	0.00	0.00	0.00	1	1
1327	16CE47VAR	8	VARILLA COPPERWELD 1.20MT	2	f	1001377	0.00	0.00	0.00	1	1
1328	16CE48VAR	8	VARILLA COPPERWELD 1.50MT	2	f	1001378	0.00	0.00	0.00	1	1
1329	16CE49VAR	8	VARILLA COPPERWELD 2.40MT	2	f	1001379	0.00	0.00	0.00	1	1
1330	16CE50VAR	8	VARILLA MOVIL CINTA CORDON	2	f	1001380	0.00	0.00	0.00	1	1
1331	16CE51VOL	8	VOLTIMETRO DE LUCES	2	f	1001381	0.00	0.00	0.00	1	1
1332	16CE52VOL	8	VOLTIMETRO DIGITAL	2	f	1001382	0.00	0.00	0.00	1	1
1333	16CE53VOL	8	KIT DESVIADOR DE RAYOS CON RESORTE	2	f	1001383	0.00	0.00	0.00	1	1
1334	16CE54VOL	8	TENSOR TERMINAL 	2	f	1001384	0.00	0.00	0.00	1	1
1335	16CERP01	8	REPARACIÓN IMPULSOR	2	f	1001385	0.00	0.00	0.00	1	1
1336	170PWDC56	5	ACOPLE OPW ALUMINIO PARTE DC 1/2	2	f	1001386	0.00	0.00	0.00	1	1
1337	170PWDC57	5	ACOPLE OPW ALUMINIO PARTE DC 3/4	2	f	1001387	0.00	0.00	0.00	1	1
1338	170PWDC58	5	ACOPLE OPW ALUMINIO PARTE DC 1	2	f	1001388	0.00	0.00	0.00	1	1
1339	170PWDC59	5	ACOPLE OPW ALUMINIO PARTE DC 1 1/2	2	f	1001389	0.00	0.00	0.00	1	1
1340	170PWDC60	5	ACOPLE OPW ALUMINIO PARTE DC 2	2	f	1001390	0.00	0.00	0.00	1	1
1341	170PWDC61	5	ACOPLE OPW ALUMINIO PARTE DC 3	2	f	1001391	0.00	0.00	0.00	1	1
1342	170PWDC62	5	ACOPLE OPW ALUMINIO PARTE DC 4	2	f	1001392	0.00	0.00	0.00	1	1
1343	170PWDP49	5	ACOPLE OPW ALUMINIO PARTE DP 1/2	2	f	1001393	0.00	0.00	0.00	1	1
1344	170PWDP50	5	ACOPLE OPW ALUMINIO PARTE DP 3/4	2	f	1001394	0.00	0.00	0.00	1	1
1345	170PWDP51	5	ACOPLE OPW ALUMINIO PARTE DP 1	2	f	1001395	0.00	0.00	0.00	1	1
1346	170PWDP52	5	ACOPLE OPW ALUMINIO PARTE DP 1 1/4	2	f	1001396	0.00	0.00	0.00	1	1
1347	170PWDP53	5	ACOPLE OPW ALUMINIO PARTE DP 1 1/2	2	f	1001397	0.00	0.00	0.00	1	1
1348	170PWDP54	5	ACOPLE OPW ALUMINIO PARTE DP 2	2	f	1001398	0.00	0.00	0.00	1	1
1349	170PWDP55	5	ACOPLE OPW ALUMINIO PARTE DP 4	2	f	1001399	0.00	0.00	0.00	1	1
1350	170PWEM63	5	EMPAQUE PLANO OPW 1/2	2	f	1001400	0.00	0.00	0.00	1	1
1351	170PWEM64	5	EMPAQUE PLANO OPW 3/4	2	f	1001401	0.00	0.00	0.00	1	1
1352	170PWEM65	5	EMPAQUE PLANO OPW 1	2	f	1001402	0.00	0.00	0.00	1	1
1353	170PWEM66	5	EMPAQUE PLANO OPW 1 1/4	2	f	1001403	0.00	0.00	0.00	1	1
1354	170PWEM67	5	EMPAQUE PLANO OPW 1 1/2	2	f	1001404	0.00	0.00	0.00	1	1
1355	170PWEM68	5	EMPAQUE PLANO OPW 2	2	f	1001405	0.00	0.00	0.00	1	1
1356	170PWEM69	5	EMPAQUE PLANO OPW 3	2	f	1001406	0.00	0.00	0.00	1	1
1357	170PWEM70	5	EMPAQUE PLANO OPW 4	2	f	1001407	0.00	0.00	0.00	1	1
1358	170PWEM71	5	EMPAQUE PLANO OPW 6	2	f	1001408	0.00	0.00	0.00	1	1
1359	170PWIN77	5	ACOPLE OPW INOX PARTE C 3	2	f	1001409	0.00	0.00	0.00	1	1
1360	170PWIN78	5	ACOPLE OPW INOX PARTE C 4	2	f	1001410	0.00	0.00	0.00	1	1
1361	170PWIN79	5	ACOPLE OPW INOX PARTE E 4	2	f	1001411	0.00	0.00	0.00	1	1
1362	170PWIN80	5	ACOPLE OPW INOX PARTE C 1 1/2	2	f	1001412	0.00	0.00	0.00	1	1
1363	170PWPA01	5	ACOPLE OPW ALUMINIO PARTE A 1/2	2	f	1001413	0.00	0.00	0.00	1	1
1364	170PWPA02	5	ACOPLE OPW ALUMINIO PARTE A 3/4	2	f	1001414	0.00	0.00	0.00	1	1
1365	170PWPA03	5	ACOPLE OPW ALUMINIO PARTE A 1	2	f	1001415	0.00	0.00	0.00	1	1
1366	170PWPA04	5	ACOPLE OPW ALUMINIO PARTE A 1 1/4	2	f	1001416	0.00	0.00	0.00	1	1
1367	170PWPA05	5	ACOPLE OPW ALUMINIO PARTE A 1 1/2	2	f	1001417	0.00	0.00	0.00	1	1
1368	170PWPA06	5	ACOPLE OPW ALUMINIO PARTE A 2	2	f	1001418	0.00	0.00	0.00	1	1
1369	170PWPA07	5	ACOPLE OPW ALUMINIO PARTE A 3	2	f	1001419	0.00	0.00	0.00	1	1
1370	170PWPA08	5	ACOPLE OPW ALUMINIO PARTE A 4	2	f	1001420	0.00	0.00	0.00	1	1
1371	170PWPB09	5	ACOPLE OPW ALUMINIO PARTE B 1/2	2	f	1001421	0.00	0.00	0.00	1	1
1372	170PWPB10	5	ACOPLE OPW ALUMINIO PARTE B 3/4	2	f	1001422	0.00	0.00	0.00	1	1
1373	170PWPB11	5	ACOPLE OPW ALUMINIO PARTE B 1	2	f	1001423	0.00	0.00	0.00	1	1
1374	170PWPB12	5	ACOPLE OPW ALUMINIO PARTE B 1 1/4	2	f	1001424	0.00	0.00	0.00	1	1
1375	170PWPB13	5	ACOPLE OPW ALUMINIO PARTE B 1 1/2	2	f	1001425	0.00	0.00	0.00	1	1
1376	170PWPB14	5	ACOPLE OPW ALUMINIO PARTE B 2	2	f	1001426	0.00	0.00	0.00	1	1
1377	170PWPB15	5	ACOPLE OPW ALUMINIO PARTE B 3	2	f	1001427	0.00	0.00	0.00	1	1
1378	170PWPB16	5	ACOPLE OPW ALUMINIO PARTE B 4	2	f	1001428	0.00	0.00	0.00	1	1
1379	170PWPC17	5	ACOPLE OPW ALUMINIO PARTE C 1/2	2	f	1001429	0.00	0.00	0.00	1	1
1380	170PWPC18	5	ACOPLE OPW ALUMINIO PARTE C 3/4	2	f	1001430	0.00	0.00	0.00	1	1
1381	170PWPC19	5	ACOPLE OPW ALUMINIO PARTE C 1	2	f	1001431	0.00	0.00	0.00	1	1
1382	170PWPC20	5	ACOPLE OPW ALUMINIO PARTE C 1 1/4	2	f	1001432	0.00	0.00	0.00	1	1
1383	170PWPC21	5	ACOPLE OPW ALUMINIO PARTE C 1 1/2	2	f	1001433	0.00	0.00	0.00	1	1
1384	170PWPC22	5	ACOPLE OPW ALUMINIO PARTE C 2	2	f	1001434	0.00	0.00	0.00	1	1
1385	170PWPC23	5	ACOPLE OPW ALUMINIO PARTE C 3	2	f	1001435	0.00	0.00	0.00	1	1
1386	170PWPC24	5	ACOPLE OPW ALUMINIO PARTE C 4	2	f	1001436	0.00	0.00	0.00	1	1
1387	170PWPD25	5	ACOPLE OPW ALUMINIO PARTE D 1/2	2	f	1001437	0.00	0.00	0.00	1	1
1388	170PWPD26	5	ACOPLE OPW ALUMINIO PARTE D 3/4	2	f	1001438	0.00	0.00	0.00	1	1
1389	170PWPD27	5	ACOPLE OPW ALUMINIO PARTE D 1	2	f	1001439	0.00	0.00	0.00	1	1
1390	170PWPD28	5	ACOPLE OPW ALUMINIO PARTE D 1 1/4	2	f	1001440	0.00	0.00	0.00	1	1
1391	170PWPD29	5	ACOPLE OPW ALUMINIO PARTE D 1 1/2	2	f	1001441	0.00	0.00	0.00	1	1
1392	170PWPD30	5	ACOPLE OPW ALUMINIO PARTE D 2	2	f	1001442	0.00	0.00	0.00	1	1
1393	170PWPD31	5	ACOPLE OPW ALUMINIO PARTE D 3	2	f	1001443	0.00	0.00	0.00	1	1
1394	170PWPD32	5	ACOPLE OPW ALUMINIO PARTE D 4	2	f	1001444	0.00	0.00	0.00	1	1
1395	170PWPE33	5	ACOPLE OPW ALUMINIO PARTE E 1/2	2	f	1001445	0.00	0.00	0.00	1	1
1396	170PWPE34	5	ACOPLE OPW ALUMINIO PARTE E 3/4	2	f	1001446	0.00	0.00	0.00	1	1
1397	170PWPE35	5	ACOPLE OPW ALUMINIO PARTE E 1	2	f	1001447	0.00	0.00	0.00	1	1
1398	170PWPE36	5	ACOPLE OPW ALUMINIO PARTE E 1 1/4	2	f	1001448	0.00	0.00	0.00	1	1
1399	170PWPE37	5	ACOPLE OPW ALUMINIO PARTE E 1 1/2	2	f	1001449	0.00	0.00	0.00	1	1
1400	170PWPE38	5	ACOPLE OPW ALUMINIO PARTE E 2	2	f	1001450	0.00	0.00	0.00	1	1
1401	170PWPE39	5	ACOPLE OPW ALUMINIO PARTE E 3	2	f	1001451	0.00	0.00	0.00	1	1
1402	170PWPE40	5	ACOPLE OPW ALUMINIO PARTE E 4	2	f	1001452	0.00	0.00	0.00	1	1
1403	170PWPF41	5	ACOPLF OPW ALUMINIO PARTE F 1/2	2	f	1001453	0.00	0.00	0.00	1	1
1404	170PWPF42	5	ACOPLF OPW ALUMINIO PARTE F 3/4	2	f	1001454	0.00	0.00	0.00	1	1
1405	170PWPF43	5	ACOPLF OPW ALUMINIO PARTE F 1	2	f	1001455	0.00	0.00	0.00	1	1
1406	170PWPF44	5	ACOPLF OPW ALUMINIO PARTE F 1 1/4	2	f	1001456	0.00	0.00	0.00	1	1
1407	170PWPF45	5	ACOPLF OPW ALUMINIO PARTE F 1 1/2	2	f	1001457	0.00	0.00	0.00	1	1
1408	170PWPF46	5	ACOPLF OPW ALUMINIO PARTE F 2	2	f	1001458	0.00	0.00	0.00	1	1
1409	170PWPF47	5	ACOPLF OPW ALUMINIO PARTE F 3	2	f	1001459	0.00	0.00	0.00	1	1
1410	170PWPF48	5	ACOPLF OPW ALUMINIO PARTE F 4	2	f	1001460	0.00	0.00	0.00	1	1
1411	170PWPOL72	5	ACOPLE OPW POLIPROPILENO PARTE D 1/2	2	f	1001461	0.00	0.00	0.00	1	1
1412	170PWPOL73	5	ACOPLE OPW POLIPROPILENO PARTE F 1/2	2	f	1001462	0.00	0.00	0.00	1	1
1413	170PWPOL74	5	ACOPLE OPW POLIPROPILENO PARTE E 1/2	2	f	1001463	0.00	0.00	0.00	1	1
1414	170PWPOL75	5	ACOPLE OPW POLIPROPILENO PARTE D 2	2	f	1001464	0.00	0.00	0.00	1	1
1415	170PWPOL76	5	ACOPLE OPW POLIPROPILENO PARTE F 2	2	f	1001465	0.00	0.00	0.00	1	1
1416	18AI01COD	4	CODO INTERNO 1	2	f	1001466	0.00	0.00	0.00	1	1
1417	18AI02COD	4	CODO INTERNO 1/2	2	f	1001467	0.00	0.00	0.00	1	1
1418	18AI03COD	4	CODO INTERNO 3/4	2	f	1001468	0.00	0.00	0.00	1	1
1419	18AI04INS	4	INSERTO 1 1/2	2	f	1001469	0.00	0.00	0.00	1	1
1420	18AI05INS	4	INSERTO 1 1/4	2	f	1001470	0.00	0.00	0.00	1	1
1421	18AI06INS	4	INSERTO 1	2	f	1001471	0.00	0.00	0.00	1	1
1422	18AI07INS	4	INSERTO 1/2	2	f	1001472	0.00	0.00	0.00	1	1
1423	18AI08INS	4	INSERTO 2	2	f	1001473	0.00	0.00	0.00	1	1
1424	18AI09INS	4	INSERTO 3/4	2	f	1001474	0.00	0.00	0.00	1	1
1425	18AI10MPG	4	MACHO INTERNO PG 4	2	f	1001475	0.00	0.00	0.00	1	1
1426	18AI11MPG	4	MACHO INTERNO PG 1 1/2	2	f	1001476	0.00	0.00	0.00	1	1
1427	18AI12MPG	4	MACHO INTERNO PG 1 1/2 X 3/4	2	f	1001477	0.00	0.00	0.00	1	1
1428	18AI13MPG	4	MACHO INTERNO PG 1	2	f	1001478	0.00	0.00	0.00	1	1
1429	18AI14MPG	4	MACHO INTERNO PG 1/2	2	f	1001479	0.00	0.00	0.00	1	1
1430	18AI15MPG	4	MACHO INTERNO PG 2	2	f	1001480	0.00	0.00	0.00	1	1
1431	18AI17MPG	4	MACHO INTERNO PG 2 X 3/4	2	f	1001481	0.00	0.00	0.00	1	1
1432	18AI18MPG	4	MACHO INTERNO PG 3	2	f	1001482	0.00	0.00	0.00	1	1
1433	18AI19MPG	4	MACHO INTERNO PG 3 X 1 1/2	2	f	1001483	0.00	0.00	0.00	1	1
1434	18AI20MPG	4	MACHO INTERNO PG 3/4	2	f	1001484	0.00	0.00	0.00	1	1
1435	18AI21TEE	4	TEE INTERNA  1 1/2	2	f	1001485	0.00	0.00	0.00	1	1
1436	18AI22TEE	4	TEE INTERNA  1 1/4	2	f	1001486	0.00	0.00	0.00	1	1
1437	18AI23TEE	4	TEE INTERNA  1	2	f	1001487	0.00	0.00	0.00	1	1
1438	18AI24TEE	4	TEE INTERNA  2	2	f	1001488	0.00	0.00	0.00	1	1
1439	18AI25TEE	4	TEE INTERNA  3	2	f	1001489	0.00	0.00	0.00	1	1
1440	18AI26TEE	4	TEE INTERNA  3/4	2	f	1001490	0.00	0.00	0.00	1	1
1441	18AI27TEE	4	TEE INTERNA  4	2	f	1001491	0.00	0.00	0.00	1	1
1442	18AI28TEE	4	TEE INTERNA 1/2	2	f	1001492	0.00	0.00	0.00	1	1
1443	18AI29UI	4	UNION INTERNA 1 1/2	2	f	1001493	0.00	0.00	0.00	1	1
1444	18AI30UI	4	UNION INTERNA 1 1/4	2	f	1001494	0.00	0.00	0.00	1	1
1445	18AI31UI	4	UNION INTERNA 1	2	f	1001495	0.00	0.00	0.00	1	1
1446	18AI32UI	4	UNION INTERNA 1/2	2	f	1001496	0.00	0.00	0.00	1	1
1447	18AI33UI	4	UNION INTERNA 2	2	f	1001497	0.00	0.00	0.00	1	1
1448	18AI34UI	4	UNION INTERNA 3	2	f	1001498	0.00	0.00	0.00	1	1
1449	18AI35UI	4	UNION INTERNA 3/4	2	f	1001499	0.00	0.00	0.00	1	1
1450	18AI36UI	4	UNION INTERNA 4	2	f	1001500	0.00	0.00	0.00	1	1
1451	18AI37URI	4	UNION REDUCCION INTERNA 1 1/2 X 1	2	f	1001501	0.00	0.00	0.00	1	1
1452	18AI38URI	4	UNION REDUCCION INTERNA 1 1/2 X 1/2	2	f	1001502	0.00	0.00	0.00	1	1
1453	18AI39URI	4	UNION REDUCCION INTERNA 1 1/2 X 3/4	2	f	1001503	0.00	0.00	0.00	1	1
1454	18AI40URI	4	UNION REDUCCION INTERNA 1 X 1/2	2	f	1001504	0.00	0.00	0.00	1	1
1455	18AI41URI	4	UNION REDUCCION INTERNA 1 X 3/4	2	f	1001505	0.00	0.00	0.00	1	1
1456	18AI42URI	4	UNION REDUCCION INTERNA 2 X 1 1/2	2	f	1001506	0.00	0.00	0.00	1	1
1457	18AI43URI	4	UNION REDUCCION INTERNA 2 X 1	2	f	1001507	0.00	0.00	0.00	1	1
1458	18AI44URI	4	UNION REDUCCION INTERNA 2 X 1/2	2	f	1001508	0.00	0.00	0.00	1	1
1459	18AI45URI	4	UNION REDUCCION INTERNA 2 X 3/4	2	f	1001509	0.00	0.00	0.00	1	1
1460	18AI46URI	4	UNION REDUCCION INTERNA 3 X 1 1/2	2	f	1001510	0.00	0.00	0.00	1	1
1461	18AI47URI	4	UNION REDUCCION INTERNA 3 X 2	2	f	1001511	0.00	0.00	0.00	1	1
1462	18AI48URI	4	UNION REDUCCION INTERNA 3/4 X 1/2	2	f	1001512	0.00	0.00	0.00	1	1
1463	19ALUM-01	3	BOQUILLA PUNTA BRONCE 1 1/2	2	f	1001513	0.00	0.00	0.00	1	1
1464	19ALUM-02	3	BOQUILLA PUNTA BRONCE 1	2	f	1001514	0.00	0.00	0.00	1	1
1465	19ALUM-03	3	BOQUILLA PUNTA BRONCE 2	2	f	1001515	0.00	0.00	0.00	1	1
1466	19ALUM-04	3	BOQUILLA PUNTA BRONCE 3	2	f	1001516	0.00	0.00	0.00	1	1
1467	19ALUM-05	3	BOQUILLA PUNTA BRONCE 3/4	2	f	1001517	0.00	0.00	0.00	1	1
1468	19ALUM-06	3	MACHO DE ALUMINIO 1	2	f	1001518	0.00	0.00	0.00	1	1
1469	19ALUM-07	3	MACHO DE ALUMINIO 1 1/2	2	f	1001519	0.00	0.00	0.00	1	1
1470	19ALUM-08	3	MACHO DE ALUMINIO 1 1/4	2	f	1001520	0.00	0.00	0.00	1	1
1471	19ALUM-09	3	MACHO DE ALUMINIO 1/2	2	f	1001521	0.00	0.00	0.00	1	1
1472	19ALUM-10	3	MACHO DE ALUMINIO 2	2	f	1001522	0.00	0.00	0.00	1	1
1473	19ALUM-11	3	MACHO DE ALUMINIO 2 x 1 1/2	2	f	1001523	0.00	0.00	0.00	1	1
1474	19ALUM-12	3	MACHO DE ALUMINIO 3	2	f	1001524	0.00	0.00	0.00	1	1
1475	19ALUM-13	3	MACHO DE ALUMINIO 3/4	2	f	1001525	0.00	0.00	0.00	1	1
1476	19ALUM-14	3	MACHO DE ALUMINIO 4	2	f	1001526	0.00	0.00	0.00	1	1
1477	19ALUM-15	3	MACHO DE ALUMINIO 6	2	f	1001527	0.00	0.00	0.00	1	1
1478	19ALUM-16	3	MACHO DE ALUMUNIO 3 A 2	2	f	1001528	0.00	0.00	0.00	1	1
1479	19ALUM-17	3	TEE DE ALUMINIO 1 1/2	2	f	1001529	0.00	0.00	0.00	1	1
1480	19ALUM-18	3	TEE DE ALUMINIO 1 1/4	2	f	1001530	0.00	0.00	0.00	1	1
1481	19ALUM-19	3	TEE DE ALUMINIO 1	2	f	1001531	0.00	0.00	0.00	1	1
1482	19ALUM-20	3	TEE DE ALUMINIO 1/2	2	f	1001532	0.00	0.00	0.00	1	1
1483	19ALUM-21	3	TEE DE ALUMINIO 2	2	f	1001533	0.00	0.00	0.00	1	1
1484	19ALUM-22	3	TEE DE ALUMINIO 3	2	f	1001534	0.00	0.00	0.00	1	1
1485	19ALUM-23	3	TEE DE ALUMINIO 3/4	2	f	1001535	0.00	0.00	0.00	1	1
1486	19ALUM-24	3	TEE DE ALUMINIO 4	2	f	1001536	0.00	0.00	0.00	1	1
1487	19ALUM-25	3	UNION DE ALUMINIO 1 1/2	2	f	1001537	0.00	0.00	0.00	1	1
1488	19ALUM-26	3	UNION DE ALUMINIO 1 1/4	2	f	1001538	0.00	0.00	0.00	1	1
1489	19ALUM-27	3	UNION DE ALUMINIO 1	2	f	1001539	0.00	0.00	0.00	1	1
1490	19ALUM-28	3	UNION DE ALUMINIO 1/2	2	f	1001540	0.00	0.00	0.00	1	1
1491	19ALUM-29	3	UNION DE ALUMINIO 2	2	f	1001541	0.00	0.00	0.00	1	1
1492	19ALUM-30	3	UNION DE ALUMINIO 3	2	f	1001542	0.00	0.00	0.00	1	1
1493	19ALUM-31	3	UNION DE ALUMINIO 3/4	2	f	1001543	0.00	0.00	0.00	1	1
1494	19ALUM-32	3	UNION DE ALUMINIO 4	2	f	1001544	0.00	0.00	0.00	1	1
1495	19ALUM-33	3	UNION REDUCCION ALUMINIO 6 x 4	2	f	1001545	0.00	0.00	0.00	1	1
1496	19ALUM-34	3	UNION REDUCION ALUMINIO 1 1/2 x 1	2	f	1001546	0.00	0.00	0.00	1	1
1497	19ALUM-35	3	UNION REDUCION ALUMINIO 1 1/2 x 3/4	2	f	1001547	0.00	0.00	0.00	1	1
1498	19ALUM-36	3	UNION REDUCION ALUMINIO 1 x 1/2	2	f	1001548	0.00	0.00	0.00	1	1
1499	19ALUM-37	3	UNION REDUCION ALUMINIO 1 x 3/4	2	f	1001549	0.00	0.00	0.00	1	1
1500	19ALUM-38	3	UNION REDUCION ALUMINIO 2 x 1 1/2	2	f	1001550	0.00	0.00	0.00	1	1
1501	19ALUM-39	3	UNION REDUCION ALUMINIO 2 x 1	2	f	1001551	0.00	0.00	0.00	1	1
1502	19ALUM-40	3	UNION REDUCION ALUMINIO 2 x 3/4	2	f	1001552	0.00	0.00	0.00	1	1
1503	19ALUM-41	3	UNION REDUCION ALUMINIO 3 x 1 1/2	2	f	1001553	0.00	0.00	0.00	1	1
1504	19ALUM-42	3	UNION REDUCION ALUMINIO 3 x 2	2	f	1001554	0.00	0.00	0.00	1	1
1505	19ALUM-43	3	UNION REDUCION ALUMINIO 3/4 x 1/2	2	f	1001555	0.00	0.00	0.00	1	1
1506	19ALUM-44	3	UNION REDUCION ALUMINIO 4 x 2	2	f	1001556	0.00	0.00	0.00	1	1
1507	19ALUM-45	3	UNION REDUCION ALUMINIO 4 x 3	2	f	1001557	0.00	0.00	0.00	1	1
1508	21SR-01	13	SISTEMA DE RIEGO	3	f	1001558	0.00	0.00	0.00	1	1
1509	21SR-02	13	TANQUE  AUSTRALIANO 25.22M3 / 5.22MT	3	f	1001559	0.00	0.00	0.00	1	1
1510	21SR-03	13	PLANTA DE TRATAMIENTO DE AGUA POTABLE (PTAP)	3	f	1001560	0.00	0.00	0.00	1	1
1511	21SR-04	19	FUMIDUCTO LA MANSIÓN FASE 2	2	f	1001561	0.00	0.00	0.00	1	1
1512	22VALAG-01	19	VALV GAS/AGUA 1	2	f	1001562	0.00	0.00	0.00	1	1
1513	22VALAG-02	19	VALV GAS/AGUA 1/2	2	f	1001563	0.00	0.00	0.00	1	1
1514	22VALAG-03	19	VALV GAS/AGUA 3/4	2	f	1001564	0.00	0.00	0.00	1	1
1515	22VALBBR-01	19	VALV BOLA BR 1 1/2	2	f	1001565	0.00	0.00	0.00	1	1
1516	22VALBBR-02	19	VALV BOLA BR 1 1/4	2	f	1001566	0.00	0.00	0.00	1	1
1517	22VALBBR-03	19	VALV BOLA BR 1	2	f	1001567	0.00	0.00	0.00	1	1
1518	22VALBBR-04	19	VALV BOLA BR 1/2	2	f	1001568	0.00	0.00	0.00	1	1
1519	22VALBBR-05	19	VALV BOLA BR 1/4	2	f	1001569	0.00	0.00	0.00	1	1
1520	22VALBBR-06	19	VALV BOLA BR 2	2	f	1001570	0.00	0.00	0.00	1	1
1521	22VALBBR-07	19	VALV BOLA BR 3	2	f	1001571	0.00	0.00	0.00	1	1
1522	22VALBBR-08	19	VALV BOLA BR 3/4	2	f	1001572	0.00	0.00	0.00	1	1
1523	22VALBBR-09	19	VALV BOLA BR 3/8	2	f	1001573	0.00	0.00	0.00	1	1
1524	22VALBBR-10	19	VALV BOLA BR 4	2	f	1001574	0.00	0.00	0.00	1	1
1525	22VALC-01	19	VALV CORTINA HO V/F FLAN/CORT/ELAS 10 	2	f	1001575	0.00	0.00	0.00	1	1
1526	22VALC-02	19	VALV. CHECK/PIE 2 BRONCE DESMONTABLE	2	f	1001576	0.00	0.00	0.00	1	1
1527	22VALCAN-01	19	CANILLA DE 1/2	2	f	1001577	0.00	0.00	0.00	1	1
1528	22VALCBR-01	19	VALV COMPUERTA AC 150L FLG 6	2	f	1001578	0.00	0.00	0.00	1	1
1529	22VALCBR-02	19	VALV COMPUERTA BR 1 1/2	2	f	1001579	0.00	0.00	0.00	1	1
1530	22VALCBR-03	19	VALV COMPUERTA BR 1 1/4	2	f	1001580	0.00	0.00	0.00	1	1
1531	22VALCBR-04	19	VALV COMPUERTA BR 1	2	f	1001581	0.00	0.00	0.00	1	1
1532	22VALCBR-05	19	VALV COMPUERTA BR 1/2	2	f	1001582	0.00	0.00	0.00	1	1
1533	22VALCBR-06	19	VALV COMPUERTA BR 2	2	f	1001583	0.00	0.00	0.00	1	1
1534	22VALCBR-07	19	VALV COMPUERTA BR 3	2	f	1001584	0.00	0.00	0.00	1	1
1535	22VALCBR-08	19	VALV COMPUERTA BR 3/4	2	f	1001585	0.00	0.00	0.00	1	1
1536	22VALCBR-09	19	VALV COMPUERTA BR 4	2	f	1001586	0.00	0.00	0.00	1	1
1537	22VALCHE-01	19	CHEQUE COMPUERTA BR 1 1/2	2	f	1001587	0.00	0.00	0.00	1	1
1538	22VALCHE-02	19	CHEQUE COMPUERTA BR 1 1/4	2	f	1001588	0.00	0.00	0.00	1	1
1539	22VALCHE-03	19	CHEQUE COMPUERTA BR 1	2	f	1001589	0.00	0.00	0.00	1	1
1540	22VALCHE-04	19	CHEQUE COMPUERTA BR 1/2	2	f	1001590	0.00	0.00	0.00	1	1
1541	22VALCHE-05	19	CHEQUE COMPUERTA BR 2 1/2	2	f	1001591	0.00	0.00	0.00	1	1
1542	22VALCHE-06	19	CHEQUE COMPUERTA BR 2	2	f	1001592	0.00	0.00	0.00	1	1
1543	22VALCHE-07	19	CHEQUE COMPUERTA BR 3	2	f	1001593	0.00	0.00	0.00	1	1
1544	22VALCHE-08	19	CHEQUE COMPUERTA BR 3/4	2	f	1001594	0.00	0.00	0.00	1	1
1545	22VALCHE-09	19	CHEQUE COMPUERTA BR 4	2	f	1001595	0.00	0.00	0.00	1	1
1546	22VALCHE-10	19	CHEQUE VERTICAL BR 3	2	f	1001596	0.00	0.00	0.00	1	1
1547	22VALCHE-11	19	CHEQUE VERTICAL BR 1	2	f	1001597	0.00	0.00	0.00	1	1
1548	22VALCHE-12	19	CHEQUE VERTICAL BR 11/2	2	f	1001598	0.00	0.00	0.00	1	1
1549	22VALCHE-13	19	CHEQUE VERTICAL BR 2	2	f	1001599	0.00	0.00	0.00	1	1
1550	22VALCHE-14	19	CHEQUE BLOWER 1.5 PVC	2	f	1001600	0.00	0.00	0.00	1	1
1551	22VALCHE-15	19	CHEQUE P/L AC FLANCHE 150L 4	2	f	1001601	0.00	0.00	0.00	1	1
1552	22VALCON-01	19	CONTADOR AGUA BR R100 2 CHORRO	2	f	1001602	0.00	0.00	0.00	1	1
1553	22VALCON-02	19	MEDIDOR DE AGUA FLANCHADO 3	2	f	1001603	0.00	0.00	0.00	1	1
1554	22VALCON-03	19	CONTADOR AGUA BR R160 1 VL	2	f	1001604	0.00	0.00	0.00	1	1
1555	22VALCON-04	19	CONTADOR AGUA WOLTMAN FLANCHE R100	2	f	1001605	0.00	0.00	0.00	1	1
1556	22VALCON-05	19	MEDIDOR DE AGUA 2	2	f	1001606	0.00	0.00	0.00	1	1
1557	22VALCON-06	19	MEDIDOR R80 2 CHORRO MULTIPLE	2	f	1001607	0.00	0.00	0.00	1	1
1558	22VALCON-07	19	CONTADOR AGUA BR CHORRO R100 1 	2	f	1001608	0.00	0.00	0.00	1	1
1559	22VALCON-08	19	CONTADOR AGUA BR CHORRO R100 1/2	2	f	1001609	0.00	0.00	0.00	1	1
1560	22VALCON-09	19	CONTADOR AGUA BR CHORRO R100 1 1/2	2	f	1001610	0.00	0.00	0.00	1	1
1561	22VALDUNI-01	19	VALVULA DOBLE UNIVERSAL 1 1/2	2	f	1001611	0.00	0.00	0.00	1	1
1562	22VALDUNI-02	19	VALVULA DOBLE UNIVERSAL 1	2	f	1001612	0.00	0.00	0.00	1	1
1563	22VALDUNI-03	19	VALVULA DOBLE UNIVERSAL 2	2	f	1001613	0.00	0.00	0.00	1	1
1564	22VALF-01	19	VALVULA FLOTADOR 1 HELMAN	2	f	1001614	0.00	0.00	0.00	1	1
1565	22VALF-02	19	FLOTADOR ACUAMETAL	2	f	1001615	0.00	0.00	0.00	1	1
1566	22VALFUM-02	19	VALV M/H DE FUMIGACION 8.5mm	2	f	1001616	0.00	0.00	0.00	1	1
1567	22VALGRA-01	19	GRANADA ALUMINIO 2	2	f	1001617	0.00	0.00	0.00	1	1
1568	22VALGRA-02	19	GRANADA ALUMINIO 3	2	f	1001618	0.00	0.00	0.00	1	1
1569	22VALGRA-03	19	GRANADA ALUMINIO 4	2	f	1001619	0.00	0.00	0.00	1	1
1570	22VALGRA-04	19	GRANADA ALUMINIO 6	2	f	1001620	0.00	0.00	0.00	1	1
1571	22VALGRA-05	19	GRANDADA METALICA 2	2	f	1001621	0.00	0.00	0.00	1	1
1572	22VALGRA-06	19	GRANADA ALUMINIO 11/2	2	f	1001622	0.00	0.00	0.00	1	1
1573	22VALMAR-01	19	VALV MARIPOSA PVC 2	2	f	1001623	0.00	0.00	0.00	1	1
1574	22VALPCP-01	19	VALV PCP ROSCADA 1 NARANJA	2	f	1001624	0.00	0.00	0.00	1	1
1575	22VALPCP-02	19	VALV PCP ROSCADA 1/2 NARANJA	2	f	1001625	0.00	0.00	0.00	1	1
1576	22VALPCP-03	19	VALV PCP ROSCADA 2 NARANJA	2	f	1001626	0.00	0.00	0.00	1	1
1577	22VALPCP-04	19	VALV PCP ROSCADA 3/4 NARANJA	2	f	1001627	0.00	0.00	0.00	1	1
1578	22VALPCP-05	19	VALV PCP SOLDADA 1 NARANJA	2	f	1001628	0.00	0.00	0.00	1	1
1579	22VALPCP-06	19	VALV PCP SOLDADA 1/2 NARANJA	2	f	1001629	0.00	0.00	0.00	1	1
1580	22VALPCP-07	19	VALV PCP SOLDADA 3/4 NARANJA	2	f	1001630	0.00	0.00	0.00	1	1
1581	22VALPCP-08	19	VALV PCP ROSCADA 1-1/2 NARANJA 	2	f	1001631	0.00	0.00	0.00	1	1
1582	22VALPCP-09	19	VALV PCP SOLDADA 1-1/2  NARANJA	2	f	1001632	0.00	0.00	0.00	1	1
1583	22VALPIE-01	19	VALVULA DE PIE ALUMINO 1	2	f	1001633	0.00	0.00	0.00	1	1
1584	22VALPIE-02	19	VALVULA DE PIE ALUMINO 1 1/4	2	f	1001634	0.00	0.00	0.00	1	1
1585	22VALPIE-03	19	VALVULA DE PIE ALUMINO 1 1/2	2	f	1001635	0.00	0.00	0.00	1	1
1586	22VALPIE-04	19	VALVULA DE PIE ALUMINO 2	2	f	1001636	0.00	0.00	0.00	1	1
1587	22VALPIE-05	19	VALVULA DE PIE ALUMINO 3	2	f	1001637	0.00	0.00	0.00	1	1
1588	22VALPIE-06	19	VALVULA DE PIE ALUMINO 4	2	f	1001638	0.00	0.00	0.00	1	1
1589	22VALPIE-07	19	VALVULA DE PIE ALUMINO 6	2	f	1001639	0.00	0.00	0.00	1	1
1590	22VALPIE-08	19	VALV DE PIE PVC 1 1/2	2	f	1001640	0.00	0.00	0.00	1	1
1591	22VALPIE-09	19	VALV DE PIE PVC 1	2	f	1001641	0.00	0.00	0.00	1	1
1592	22VALPIE-10	19	VALV DE PIE PVC 2	2	f	1001642	0.00	0.00	0.00	1	1
1593	22VALPIE-11	19	VALV DE PIE PVC 3	2	f	1001643	0.00	0.00	0.00	1	1
1594	22VALPIE-12	19	VALV DE PIE PVC 4	2	f	1001644	0.00	0.00	0.00	1	1
1595	22VALPVC-01	19	VALV PVC ROSCADA  1 1/2	2	f	1001645	0.00	0.00	0.00	1	1
1596	22VALPVC-02	19	VALV PVC ROSCADA  1 1/4	2	f	1001646	0.00	0.00	0.00	1	1
1597	22VALPVC-03	19	VALV PVC ROSCADA  1	2	f	1001647	0.00	0.00	0.00	1	1
1598	22VALPVC-04	19	VALV PVC ROSCADA  1/2	2	f	1001648	0.00	0.00	0.00	1	1
1599	22VALPVC-05	19	VALV PVC ROSCADA  2	2	f	1001649	0.00	0.00	0.00	1	1
1600	22VALPVC-06	19	VALV PVC ROSCADA 3	2	f	1001650	0.00	0.00	0.00	1	1
1601	22VALPVC-07	19	VALV PVC ROSCADA  3/4	2	f	1001651	0.00	0.00	0.00	1	1
1602	22VALPVC-08	19	VALV PVC ROSCADA  4	2	f	1001652	0.00	0.00	0.00	1	1
1603	22VALPVC-09	19	VALV PVC SOLDADA 1 1/2	2	f	1001653	0.00	0.00	0.00	1	1
1604	22VALPVC-10	19	VALV PVC SOLDADA 1 1/4	2	f	1001654	0.00	0.00	0.00	1	1
1605	22VALPVC-11	19	VALV PVC SOLDADA 1	2	f	1001655	0.00	0.00	0.00	1	1
1606	22VALPVC-12	19	VALV PVC SOLDADA 1/2	2	f	1001656	0.00	0.00	0.00	1	1
1607	22VALPVC-13	19	VALV PVC SOLDADA 2 1/2	2	f	1001657	0.00	0.00	0.00	1	1
1608	22VALPVC-14	19	VALV PVC SOLDADA 2	2	f	1001658	0.00	0.00	0.00	1	1
1609	22VALPVC-15	19	VALV PVC SOLDADA 3	2	f	1001659	0.00	0.00	0.00	1	1
1610	22VALPVC-16	19	VALV PVC SOLDADA 3/4	2	f	1001660	0.00	0.00	0.00	1	1
1611	22VALPVC-17	19	VALV PVC SOLDADA 4	2	f	1001661	0.00	0.00	0.00	1	1
1612	22VALPVC-18	19	VALV PVC RADIAL SOLDADA 1 1/2	2	f	1001662	0.00	0.00	0.00	1	1
1613	22VALRB-01	19	VALV REGULADORA BR 2	2	f	1001663	0.00	0.00	0.00	1	1
1615	22VALRB-03	19	VALV REGULADORA BR 1	2	f	1001665	0.00	0.00	0.00	1	1
1616	22VALRB-05	19	VALV REGULADORA BR 3/4	2	f	1001666	0.00	0.00	0.00	1	1
1617	22VALSOL-01	19	VALV SOLENOIDE 1 1/2	2	f	1001667	0.00	0.00	0.00	1	1
1618	22VALSOL-02	19	VALV SOLENOIDE 2	2	f	1001668	0.00	0.00	0.00	1	1
1619	22VALSOL-03	19	VALV SOLENOIDE 3/4	2	f	1001669	0.00	0.00	0.00	1	1
1620	22VALUNI-01	19	VALV UNIVERSAL ROSCADA 1 1/2	2	f	1001670	0.00	0.00	0.00	1	1
1621	22VALUNI-02	19	VALV UNIVERSAL ROSCADA 1 1/4	2	f	1001671	0.00	0.00	0.00	1	1
1622	22VALUNI-03	19	VALV UNIVERSAL ROSCADA 1/2	2	f	1001672	0.00	0.00	0.00	1	1
1623	22VALUNI-04	19	VALV UNIVERSAL ROSCADA 2	2	f	1001673	0.00	0.00	0.00	1	1
1624	22VALUNI-05	19	VALV UNIVERSAL ROSCADA 3	2	f	1001674	0.00	0.00	0.00	1	1
1625	22VALUNI-06	19	VALV UNIVERSAL ROSCADA 4	2	f	1001675	0.00	0.00	0.00	1	1
1626	22VALUNI-07	19	VALV UNIVERSAL SOLDADA 1 1/2	2	f	1001676	0.00	0.00	0.00	1	1
1627	22VALUNI-08	19	VALV UNIVERSAL SOLDADA 1 1/4	2	f	1001677	0.00	0.00	0.00	1	1
1628	22VALUNI-09	19	VALV UNIVERSAL SOLDADA 1	2	f	1001678	0.00	0.00	0.00	1	1
1629	22VALUNI-10	19	VALV UNIVERSAL SOLDADA 1/2	2	f	1001679	0.00	0.00	0.00	1	1
1630	22VALUNI-11	19	VALV UNIVERSAL SOLDADA 2	2	f	1001680	0.00	0.00	0.00	1	1
1631	22VALUNI-12	19	VALV UNIVERSAL SOLDADA 3	2	f	1001681	0.00	0.00	0.00	1	1
1632	22VALUNI-13	19	VALV UNIVERSAL SOLDADA 3/4	2	f	1001682	0.00	0.00	0.00	1	1
1633	22VALUNI-14	19	VALV UNIVERSAL SOLDADA 4	2	f	1001683	0.00	0.00	0.00	1	1
1634	23ABAR01	19	ABRAZADERA ALUMINIO RIZADA 2 ALAS 1/2	2	f	1001684	0.00	0.00	0.00	1	1
1635	23ABAR02	1	ABRAZADERA DOBLE ALAS 2 1/2	2	f	1001685	0.00	0.00	0.00	1	1
1636	23ABAR03	1	ABRAZADERA ALUMINIO RIZADA 2 ALAS 2	2	f	1001686	0.00	0.00	0.00	1	1
1637	23ABAR04	1	ABRAZADERA ALUMINIO RIZADA 2 ALAS 4	2	f	1001687	0.00	0.00	0.00	1	1
1638	23ABCR01	1	ABRAZADERA CREMALLERA T04	2	f	1001688	0.00	0.00	0.00	1	1
1639	23ABCR02	1	ABRAZADERA CREMALLERA T06 (3/8)	2	f	1001689	0.00	0.00	0.00	1	1
1640	23ABCR03	1	ABRAZADERA CREMALLERA T08 (1/2)	2	f	1001690	0.00	0.00	0.00	1	1
1641	23ABCR04	1	ABRAZADERA CREMALLERA T10 (5/8)	2	f	1001691	0.00	0.00	0.00	1	1
1642	23ABCR05	1	ABRAZADERA CREMALLERA T12 (1)	2	f	1001692	0.00	0.00	0.00	1	1
1643	23ABCR06	1	ABRAZADERA CREMALLERA T14	2	f	1001693	0.00	0.00	0.00	1	1
1644	23ABCR07	1	ABRAZADERA CREMALLERA T16	2	f	1001694	0.00	0.00	0.00	1	1
1645	23ABCR08	1	ABRAZADERA CREMALLERA T18	2	f	1001695	0.00	0.00	0.00	1	1
1646	23ABCR09	1	ABRAZADERA CREMALLERA T20	2	f	1001696	0.00	0.00	0.00	1	1
1647	23ABCR10	1	ABRAZADERA CREMALLERA T24 (1 1/4)	2	f	1001697	0.00	0.00	0.00	1	1
1648	23ABCR11	1	ABRAZADERA CREMALLERA T26	2	f	1001698	0.00	0.00	0.00	1	1
1649	23ABCR12	1	ABRAZADERA CREMALLERA T28	2	f	1001699	0.00	0.00	0.00	1	1
1650	23ABCR13	1	ABRAZADERA CREMALLERA T30	2	f	1001700	0.00	0.00	0.00	1	1
1651	23ABCR14	1	ABRAZADERA CREMALLERA T32 (2)	2	f	1001701	0.00	0.00	0.00	1	1
1652	23ABCR15	1	ABRAZADERA CREMALLERA T34	2	f	1001702	0.00	0.00	0.00	1	1
1653	23ABCR16	1	ABRAZADERA CREMALLERA T36	2	f	1001703	0.00	0.00	0.00	1	1
1654	23ABCR17	1	ABRAZADERA CREMALLERA T38	2	f	1001704	0.00	0.00	0.00	1	1
1655	23ABCR18	1	ABRAZADERA CREMALLERA T40	2	f	1001705	0.00	0.00	0.00	1	1
1656	23ABCR19	1	ABRAZADERA CREMALLERA T42	2	f	1001706	0.00	0.00	0.00	1	1
1657	23ABCR20	1	ABRAZADERA CREMALLERA T44	2	f	1001707	0.00	0.00	0.00	1	1
1658	23ABCR21	1	ABRAZADERA CREMALLERA T46	2	f	1001708	0.00	0.00	0.00	1	1
1659	23ABCR22	1	ABRAZADERA CREMALLERA T48	2	f	1001709	0.00	0.00	0.00	1	1
1660	23ABCR23	1	ABRAZADERA CREMALLERA T50	2	f	1001710	0.00	0.00	0.00	1	1
1661	23ABIN01	1	ABRAZADERA INDUSTRIAL T501	2	f	1001711	0.00	0.00	0.00	1	1
1662	23ABIN02	1	ABRAZADERA INDUSTRIAL T502	2	f	1001712	0.00	0.00	0.00	1	1
1663	23ABIN03	1	ABRAZADERA INDUSTRIAL T503 (1)	2	f	1001713	0.00	0.00	0.00	1	1
1664	23ABIN04	1	ABRAZADERA INDUSTRIAL T504	2	f	1001714	0.00	0.00	0.00	1	1
1665	23ABIN05	1	ABRAZADERA INDUSTRIAL T505	2	f	1001715	0.00	0.00	0.00	1	1
1666	23ABIN06	1	ABRAZADERA INDUSTRIAL T506 (1 1/4)	2	f	1001716	0.00	0.00	0.00	1	1
1667	23ABIN07	1	ABRAZADERA INDUSTRIAL T507 (11/2)	2	f	1001717	0.00	0.00	0.00	1	1
1668	23ABIN08	1	ABRAZADERA INDUSTRIAL T508	2	f	1001718	0.00	0.00	0.00	1	1
1669	23ABIN09	1	ABRAZADERA INDUSTRIAL T509	2	f	1001719	0.00	0.00	0.00	1	1
1670	23ABIN10	1	ABRAZADERA INDUSTRIAL T510 (2)	2	f	1001720	0.00	0.00	0.00	1	1
1671	23ABIN11	1	ABRAZADERA INDUSTRIAL T511	2	f	1001721	0.00	0.00	0.00	1	1
1672	23ABIN12	1	ABRAZADERA INDUSTRIAL T512	2	f	1001722	0.00	0.00	0.00	1	1
1673	23ABIN13	1	ABRAZADERA INDUSTRIAL T513	2	f	1001723	0.00	0.00	0.00	1	1
1674	23ABIN14	1	ABRAZADERA INDUSTRIAL T514 (3)	2	f	1001724	0.00	0.00	0.00	1	1
1675	23ABIN15	1	ABRAZADERA INDUSTRIAL T515	2	f	1001725	0.00	0.00	0.00	1	1
1676	23ABIN16	1	ABRAZADERA INDUSTRIAL T516	2	f	1001726	0.00	0.00	0.00	1	1
1677	23ABIN17	1	ABRAZADERA INDUSTRIAL T517 (4)	2	f	1001727	0.00	0.00	0.00	1	1
1678	23ABIN18	1	ABRAZADERA INDUSTRIAL T518	2	f	1001728	0.00	0.00	0.00	1	1
1679	23ABIN19	1	ABRAZADERA INDUSTRIAL T519	2	f	1001729	0.00	0.00	0.00	1	1
1680	23ABIN20	1	ABRAZADERA INDUSTRIAL T520	2	f	1001730	0.00	0.00	0.00	1	1
1681	23ABIN21	1	ABRAZADERA INDUSTRIAL T521	2	f	1001731	0.00	0.00	0.00	1	1
1682	23ABIN22	1	ABRAZADERA INDUSTRIAL T522	2	f	1001732	0.00	0.00	0.00	1	1
1683	23ABIN23	1	ABRAZADERA INDUSTRIAL T523	2	f	1001733	0.00	0.00	0.00	1	1
1684	23ABIN24	1	ABRAZADERA INDUSTRIAL T524	2	f	1001734	0.00	0.00	0.00	1	1
1685	23ABIN25	1	ABRAZADERA INDUSTRIAL T525	2	f	1001735	0.00	0.00	0.00	1	1
1686	23ABIN26	1	ABRAZADERA INDUSTRIAL T817	2	f	1001736	0.00	0.00	0.00	1	1
1687	23ABIN27	1	ABRAZADERA INDUSTRIAL GALV DE 6	2	f	1001737	0.00	0.00	0.00	1	1
1688	23ABINOX01	1	ABRAZADERA CREMALLERA INOX T08 (1/2)	2	f	1001738	0.00	0.00	0.00	1	1
1689	23ABM-01	1	ABRAZADERA MARIPOSA ALUMINIO 1/2	2	f	1001739	0.00	0.00	0.00	1	1
1690	23ABPVC01	1	ABRAZADERA 2 ALAS PVC 1 1/2	2	f	1001740	0.00	0.00	0.00	1	1
1691	24CORRVA-01	9	CORREA EN V TIPO A 30	2	f	1001741	0.00	0.00	0.00	1	1
1692	24CORRVA-02	9	CORREA EN V TIPO A 32	2	f	1001742	0.00	0.00	0.00	1	1
1693	24CORRVA-03	9	CORREA EN V TIPO A 33	2	f	1001743	0.00	0.00	0.00	1	1
1694	24CORRVA-04	9	CORREA EN V TIPO A 34	2	f	1001744	0.00	0.00	0.00	1	1
1695	24CORRVA-05	9	CORREA EN V TIPO A 35	2	f	1001745	0.00	0.00	0.00	1	1
1696	24CORRVA-06	9	CORREA EN V TIPO A 36	2	f	1001746	0.00	0.00	0.00	1	1
1697	24CORRVA-07	9	CORREA EN V TIPO A 38	2	f	1001747	0.00	0.00	0.00	1	1
1698	24CORRVA-08	9	CORREA EN V TIPO A 39	2	f	1001748	0.00	0.00	0.00	1	1
1699	24CORRVA-09	9	CORREA EN V TIPO A 40	2	f	1001749	0.00	0.00	0.00	1	1
1700	24CORRVA-10	9	CORREA EN V TIPO A 41	2	f	1001750	0.00	0.00	0.00	1	1
1701	24CORRVA-11	9	CORREA EN V TIPO A 42	2	f	1001751	0.00	0.00	0.00	1	1
1702	24CORRVA-12	9	CORREA EN V TIPO A 43	2	f	1001752	0.00	0.00	0.00	1	1
1703	24CORRVA-13	9	CORREA EN V TIPO A 44	2	f	1001753	0.00	0.00	0.00	1	1
1704	24CORRVA-14	9	CORREA EN V TIPO A 45	2	f	1001754	0.00	0.00	0.00	1	1
1705	24CORRVA-15	9	CORREA EN V TIPO A 46	2	f	1001755	0.00	0.00	0.00	1	1
1706	24CORRVA-16	9	CORREA EN V TIPO A 47	2	f	1001756	0.00	0.00	0.00	1	1
1707	24CORRVA-17	9	CORREA EN V TIPO A 48	2	f	1001757	0.00	0.00	0.00	1	1
1708	24CORRVA-18	9	CORREA EN V TIPO A 52	2	f	1001758	0.00	0.00	0.00	1	1
1709	24CORRVA-19	9	CORREA EN V TIPO A 37	2	f	1001759	0.00	0.00	0.00	1	1
1710	24CORRVA-20	9	CORREA EN V TIPO A 60 OPTIBELT	2	f	1001760	0.00	0.00	0.00	1	1
1711	24CORRVB-01	9	CORREA EN V TIPO B 100	2	f	1001761	0.00	0.00	0.00	1	1
1712	24CORRVB-02	9	CORREA EN V TIPO B 101	2	f	1001762	0.00	0.00	0.00	1	1
1713	24CORRVB-03	9	CORREA EN V TIPO B 105	2	f	1001763	0.00	0.00	0.00	1	1
1714	24CORRVB-04	9	CORREA EN V TIPO B 107	2	f	1001764	0.00	0.00	0.00	1	1
1715	24CORRVB-05	9	CORREA EN V TIPO B 108	2	f	1001765	0.00	0.00	0.00	1	1
1716	24CORRVB-06	9	CORREA EN V TIPO B 69	2	f	1001766	0.00	0.00	0.00	1	1
1717	24CORRVB-07	9	CORREA EN V TIPO B 74	2	f	1001767	0.00	0.00	0.00	1	1
1718	24CORRVB-08	9	CORREA EN V TIPO B 75	2	f	1001768	0.00	0.00	0.00	1	1
1719	24CORRVB-09	9	CORREA EN V TIPO B 77	2	f	1001769	0.00	0.00	0.00	1	1
1720	24CORRVB-10	9	CORREA EN V TIPO B 80	2	f	1001770	0.00	0.00	0.00	1	1
1721	24CORRVB-11	9	CORREA EN V TIPO B 96	2	f	1001771	0.00	0.00	0.00	1	1
1722	24CORRVB-12	9	CORREA EN V TIPO B 97	2	f	1001772	0.00	0.00	0.00	1	1
1723	24CORRVB-13	9	CORREA EN V TIPO B 98	2	f	1001773	0.00	0.00	0.00	1	1
1724	24CORRVB-14	9	CORREA EN V TIPO B 43	2	f	1001774	0.00	0.00	0.00	1	1
1725	24CORRVB-15	9	CORREA EN V TIPO B 64	2	f	1001775	0.00	0.00	0.00	1	1
1726	26HYR-02	2	ACOPLE MEDIA VUELTA HEMBRA 1	2	f	1001929	0.00	0.00	0.00	1	1
1727	26HYR-03	2	ACOPLE MEDIA VUELTA HEMBRA 1/2	2	f	1001930	0.00	0.00	0.00	1	1
1728	26HYR-04	2	ACOPLE MEDIA VUELTA HEMBRA 3/4	2	f	1001931	0.00	0.00	0.00	1	1
1729	26HYR-05	2	ACOPLE MEDIA VUELTA MACHO 1	2	f	1001932	0.00	0.00	0.00	1	1
1730	26HYR-06	2	ACOPLE MEDIA VUELTA MACHO 1/2	2	f	1001933	0.00	0.00	0.00	1	1
1731	26HYR-07	2	ACOPLE MEDIA VUELTA MACHO 3/4	2	f	1001934	0.00	0.00	0.00	1	1
1732	26HYR-08	2	ACOPLE MEDIA VUELTA VASTAGO 1	2	f	1001935	0.00	0.00	0.00	1	1
1733	26HYR-09	2	ACOPLE MEDIA VUELTA VASTAGO 1/2	2	f	1001936	0.00	0.00	0.00	1	1
1734	26HYR-10	2	ACOPLE MEDIA VUELTA VASTAGO 3/4	2	f	1001937	0.00	0.00	0.00	1	1
1735	26HYR-11	2	ACOPLE RAPIDO DE AIRE 1/4	2	f	1001938	0.00	0.00	0.00	1	1
1736	26HYR-12	2	ACOPLE RAPIDO PASO LIBRE BR 1/2	2	f	1001939	0.00	0.00	0.00	1	1
1737	26HYR-13	2	ACOPLE RAPIDO PASO LIBRE BR 1/4	2	f	1001940	0.00	0.00	0.00	1	1
1738	26HYR-14	2	ACOPLE RAPIDO PASO LIBRE BR 3/8	2	f	1001941	0.00	0.00	0.00	1	1
1739	26HYR-15	2	ADAPTADOR FUMIGACION 1/2 X 1/4	2	f	1001942	0.00	0.00	0.00	1	1
1740	26HYR-16	2	CONECTOR HEMBRA BI 3/4	2	f	1001943	0.00	0.00	0.00	1	1
1741	26HYR-17	2	CONECTOR MACHO BI 3/4	2	f	1001944	0.00	0.00	0.00	1	1
1742	26HYR-18	2	RACOR DE ALARGUE 1/2 X 1/2 NPT	2	f	1001945	0.00	0.00	0.00	1	1
1743	26HYR-19	2	PITON 1	2	f	1001946	0.00	0.00	0.00	1	1
1744	26HYR-20	2	HEMBRA JIC R2 5/16 x 9/16	2	f	1001947	0.00	0.00	0.00	1	1
1745	26HYR-21	2	ADAPTADOR M NPT- M JIC 1/2 x 9/16	2	f	1001948	0.00	0.00	0.00	1	1
1746	26HYR-22	2	UNION HEMBRA NPT BR 1/4	2	f	1001949	0.00	0.00	0.00	1	1
1747	26HYR-23	2	UNION REDUCCION HEMBRA NPT BR 1/2 X1/4	2	f	1001950	0.00	0.00	0.00	1	1
1748	26HYR-24	2	PITORRA	2	f	1001951	0.00	0.00	0.00	1	1
1749	26HYR-25	2	HEMBRA JIC R2 5/16 x 9/16 90°	2	f	1001952	0.00	0.00	0.00	1	1
1750	26HYR-26	2	HEMBRA NPT 3/4 x 3/4	2	f	1001953	0.00	0.00	0.00	1	1
1751	26HYR-27	2	MACHO BI 5/16 x 1/4 NPT BR	2	f	1001954	0.00	0.00	0.00	1	1
1752	26HYR-28	2	MACHO BI 5/16 X 1/2 NPT	2	f	1001955	0.00	0.00	0.00	1	1
1753	26HYR-29	2	HEMBRA NPT 1/2 x 1/2 90°	2	f	1001956	0.00	0.00	0.00	1	1
1754	26HYR-30	2	ACOPLE R9 3/4 x 1 1/16 H JIC	2	f	1001957	0.00	0.00	0.00	1	1
1755	26HYR-31	2	MACHO NPT R9 1/2 x 3/4	2	f	1001958	0.00	0.00	0.00	1	1
1756	26HYR-32	2	FERRUL 1/2 ALUMINIO	2	f	1001959	0.00	0.00	0.00	1	1
1757	26HYR-33	2	FERRUL 20MM	2	f	1001960	0.00	0.00	0.00	1	1
1758	26HYR-34	2	FERRUL 37MM	2	f	1001961	0.00	0.00	0.00	1	1
1759	26HYR-35	2	MACHO JARDIN	2	f	1001962	0.00	0.00	0.00	1	1
1760	26HYR-36	2	CAPSULA R2 1	2	f	1001963	0.00	0.00	0.00	1	1
1761	26HYR-37	2	ACOPLE R9 1 X 1 NPT	2	f	1001964	0.00	0.00	0.00	1	1
1762	26HYR-38	2	FERRUL 15MM	2	f	1001965	0.00	0.00	0.00	1	1
1763	26HYR-39	2	FERRUL 12 ESPECIAL	2	f	1001966	0.00	0.00	0.00	1	1
1764	26HYR-40	2	MACHO B.I 3/4 x 3/4 NPT BR	2	f	1001967	0.00	0.00	0.00	1	1
1765	26HYR-41	2	MACHO B.I 3/4 x 1/2 NPT BR	2	f	1001968	0.00	0.00	0.00	1	1
1766	26HYR-42	2	HEMBRA JARDIN	2	f	1001969	0.00	0.00	0.00	1	1
1767	26HYR-43	2	BOQUILLA DE BR 1/4	2	f	1001970	0.00	0.00	0.00	1	1
1768	26HYR-44	2	MACHO NPT 3/8 x 1/4 	2	f	1001971	0.00	0.00	0.00	1	1
1769	26HYR-45	2	MACHO NPT 3/4 x 1/2	2	f	1001972	0.00	0.00	0.00	1	1
1770	26HYR-46	2	HEMBRA NPT 3/8 x 3/8	2	f	1001973	0.00	0.00	0.00	1	1
1771	26HYR-49	2	MACHO NPT R9 3/4 X 3/4	2	f	1001974	0.00	0.00	0.00	1	1
1772	26HYR-50	2	MACHO BI 5/16 X 3/8 NPT	2	f	1001975	0.00	0.00	0.00	1	1
1773	26HYR-51	2	HEMBRA  1/2  X 3/8 NPT	2	f	1001976	0.00	0.00	0.00	1	1
1774	26HYR-52	2	MACHO NPT 1/2 x 1/4	2	f	1001977	0.00	0.00	0.00	1	1
1775	26HYR-53	2	MACHO NPT 1/4 x 1/4	2	f	1001978	0.00	0.00	0.00	1	1
1776	26HYR-54	2	CAPSULA R2 1/2	2	f	1001979	0.00	0.00	0.00	1	1
1777	26HYR-55	2	MACHO NPT 1/2 x 1/2	2	f	1001980	0.00	0.00	0.00	1	1
1778	26HYR-56	2	MACHO NPT 1/4 x 1/8	2	f	1001981	0.00	0.00	0.00	1	1
1779	26HYR-57	2	GRAFADO CAPSULA 4	2	f	1001982	0.00	0.00	0.00	1	1
1780	26HYR-58	2	CAPSULAS FAITHING 4	2	f	1001983	0.00	0.00	0.00	1	1
1781	26HYR-59	2	HEMBRA JIC R2 1/2 x 7/8	2	f	1001984	0.00	0.00	0.00	1	1
1782	26HYR-60	2	ACOPLE RAPIDO TIPO AGUJA 1/2	2	f	1001985	0.00	0.00	0.00	1	1
1783	26HYR-61	2	BOQUILLA 1/8 WL 90° BRASS	2	f	1001986	0.00	0.00	0.00	1	1
1784	26HYR-62	2	BOQUILLA 1/4 65° BRASS	2	f	1001987	0.00	0.00	0.00	1	1
1785	26HYR-63	2	HEMBRA NPT R9 1	2	f	1001988	0.00	0.00	0.00	1	1
1786	26HYR-64	2	MACHO NPT R9 1	2	f	1001989	0.00	0.00	0.00	1	1
1787	26HYR-65	2	BOQUILLA ACERO 1/2	2	f	1001990	0.00	0.00	0.00	1	1
1788	26HYR-66	2	MACHO R2 NPT 5/16 x 1/2	2	f	1001991	0.00	0.00	0.00	1	1
1789	26HYR-67	2	RACOR OD RECTO x 1/4 NPT	2	f	1001992	0.00	0.00	0.00	1	1
1790	26HYR-68	2	FERRUL 3/4 ALUMINIO	2	f	1001993	0.00	0.00	0.00	1	1
1791	26HYR-69	2	UNION R2 3/4	2	f	1001994	0.00	0.00	0.00	1	1
1792	26HYR-70	2	MACHO NPT R9 1/2 x 3/8	2	f	1001995	0.00	0.00	0.00	1	1
1793	26HYR-71	2	RACOR YEE 1/4 OD 	2	f	1001996	0.00	0.00	0.00	1	1
1794	26HYR-72	2	FERRUL 1 ESPECIAL	2	f	1001997	0.00	0.00	0.00	1	1
1795	26HYR-73	2	FERRUL 5/16 ALUMINIO	2	f	1001998	0.00	0.00	0.00	1	1
1796	26HYR-74	2	MACHO NPT  R2  3/8 x 1/2	2	f	1001999	0.00	0.00	0.00	1	1
1797	26HYR-75	2	FERRUL  3/8	2	f	1002000	0.00	0.00	0.00	1	1
1798	26HYR-76	2	ACOPLE R9 NPT 3/4 x 3/4	2	f	1002001	0.00	0.00	0.00	1	1
1799	26HYR-77	2	PITON ACERO 3/4	2	f	1002002	0.00	0.00	0.00	1	1
1800	26HYR-78	2	ACOPLE MARIPOSA FUMIGACION	2	f	1002003	0.00	0.00	0.00	1	1
1801	26HYR-79	2	RACOR RECTO 1/4 OD x 1/2 NPT	2	f	1002004	0.00	0.00	0.00	1	1
1802	26HYR-80	2	RACOR RECTO 1/4 OD x 1/2 NPT	2	f	1002005	0.00	0.00	0.00	1	1
1803	26HYR-81	2	FERRUL  1/4  ALUMINIO	2	f	1002006	0.00	0.00	0.00	1	1
1804	26HYR-82	2	HEMBRA NPT R2 5/16 x 1/4 	2	f	1002007	0.00	0.00	0.00	1	1
1805	26HYR-83	2	MACHO NPT R9 3/4 x 1	2	f	1002008	0.00	0.00	0.00	1	1
1806	26HYR-84	2	BOQUILLA EN BRONCE 300CC RC350B101X	2	f	1002009	0.00	0.00	0.00	1	1
1807	26HYR-85	2	TE DE CONEXIÓN METALICA RC-521X	2	f	1002010	0.00	0.00	0.00	1	1
1808	26HYR-86	2	MACHO NPT R9 1 x 1	2	f	1002011	0.00	0.00	0.00	1	1
1809	29ACCR-01	7	ASPERSO BRONCE 3/4	2	f	1002012	0.00	0.00	0.00	1	1
1810	29ACCR-02	7	ASPERSOR BAILARINA	2	f	1002013	0.00	0.00	0.00	1	1
1811	29ACCR-03	7	EMISOR DE RIEGO	2	f	1002014	0.00	0.00	0.00	1	1
1812	29ACCR-04	7	ASPERSOR HEMBRA VERDE 1 METALICO	2	f	1002015	0.00	0.00	0.00	1	1
1813	29ACCR-05	7	ASPERSOR PLASTICO ANGULO AJUSTABLE x1/2	2	f	1002016	0.00	0.00	0.00	1	1
1814	29ACCR-06	7	ASPERSOR PLASTICO BLANCO Y NEGRO x 3/4	2	f	1002017	0.00	0.00	0.00	1	1
1815	29ACCR-07	7	ASPERSOR PLASTICO BOQ BRONCE VERDE 1/2	2	f	1002018	0.00	0.00	0.00	1	1
1816	29ACCR-08	7	ASPERSOR PLASTICO BOQ BRONCE VERDE 3/4	2	f	1002019	0.00	0.00	0.00	1	1
1817	29ACCR-09	7	ASPERSOR PLASTICO NEGRO DE 1/2	2	f	1002020	0.00	0.00	0.00	1	1
1818	29ACCR-10	7	ASPERSOR PLASTICO PESA METALICA 3/4	2	f	1002021	0.00	0.00	0.00	1	1
1819	29ACCR-11	7	ASPERSOR SENNINGER MINIWOBLER 1/2	2	f	1002022	0.00	0.00	0.00	1	1
1820	29ACCR-12	7	BLOWER AIREADOR 2HP	2	f	1002023	0.00	0.00	0.00	1	1
1821	29ACCR-14	7	CANON DE BRONCE 1 1/2	2	f	1002024	0.00	0.00	0.00	1	1
1822	29ACCR-15	7	ATOM 35 DE 1 1/2 NPT (YZK075)	2	f	1002025	0.00	0.00	0.00	1	1
1823	29ACCR-16	7	CINTA GOTEO 8 MIL 0.72 LT/H 10CM	2	f	1002026	0.00	0.00	0.00	1	1
1824	29ACCR-17	7	CINTA GOTEO 8MIL 0.72 LT/H 20 CM	2	f	1002027	0.00	0.00	0.00	1	1
1825	29ACCR-18	7	CODO DE 16mm	2	f	1002028	0.00	0.00	0.00	1	1
1826	29ACCR-19	7	CONECTOR DENTADO 16mm x 3/4 MACHO	2	f	1002029	0.00	0.00	0.00	1	1
1827	29ACCR-20	7	CONECTOR INTERNO 16mm x 1/2 MACHO	2	f	1002030	0.00	0.00	0.00	1	1
1828	29ACCR-21	7	CONECTOR GOTEO 16mm CINTA-CINTA	2	f	1002031	0.00	0.00	0.00	1	1
1829	29ACCR-22	7	CONECTOR INICIAL 16 mm	2	f	1002032	0.00	0.00	0.00	1	1
1830	29ACCR-23	7	FILTRO ANILLO 3/4	2	f	1002033	0.00	0.00	0.00	1	1
1831	29ACCR-24	7	FILTRO DE ANILLOS DE 2  ALTO CAUDAL	2	f	1002034	0.00	0.00	0.00	1	1
1832	29ACCR-25	7	GOTERO AUTOCOMPENSADO 2 L/H	2	f	1002035	0.00	0.00	0.00	1	1
1833	29ACCR-26	7	GOTERO AUTOCOMPENSADO 4 L/H	2	f	1002036	0.00	0.00	0.00	1	1
1834	29ACCR-27	7	GOTERO AUTOCOMPENSADO 8 L/H	2	f	1002037	0.00	0.00	0.00	1	1
1835	29ACCR-28	7	GOTERO GRADUABLE	2	f	1002038	0.00	0.00	0.00	1	1
1836	29ACCR-29	7	GOTERO PC JUNIOR 1.2 L/H	2	f	1002039	0.00	0.00	0.00	1	1
1837	29ACCR-30	7	MANGUERA 16mm AUTOC/ANTID GOT 20CM	2	f	1002040	0.00	0.00	0.00	1	1
1838	29ACCR-31	7	MANGUERA GOTEO DE 16mm	2	f	1002041	0.00	0.00	0.00	1	1
1839	29ACCR-32	7	MANGUERA/ TUBO 5mm x MT	2	f	1002042	0.00	0.00	0.00	1	1
1840	29ACCR-33	7	MANGUERA 16mm AUTC 20CM GOT 15CM	2	f	1002043	0.00	0.00	0.00	1	1
1841	29ACCR-34	7	MANIFOLD 4 SALIDAS	2	f	1002044	0.00	0.00	0.00	1	1
1842	29ACCR-35	7	NEBULIZADOR COMPLETO 4 SALIDAS	2	f	1002045	0.00	0.00	0.00	1	1
1843	29ACCR-36	7	OBTURADOR GOTEO DE 16mm	2	f	1002046	0.00	0.00	0.00	1	1
1844	29ACCR-37	7	PERFORADOR	2	f	1002047	0.00	0.00	0.00	1	1
1845	29ACCR-38	7	PERFORADOR Y LLAVE GOTERO	2	f	1002048	0.00	0.00	0.00	1	1
1846	29ACCR-39	7	PONCHADORA PARA MANGUERA 16mm	2	f	1002049	0.00	0.00	0.00	1	1
1847	29ACCR-40	7	SILLETA CORTA 16mm	2	f	1002050	0.00	0.00	0.00	1	1
1848	29ACCR-41	7	SILLETA LARGA 16mm	2	f	1002051	0.00	0.00	0.00	1	1
1849	29ACCR-42	7	TEE 16mm	2	f	1002052	0.00	0.00	0.00	1	1
1850	29ACCR-43	7	UNION CINTA-CINTA 16mm	2	f	1002053	0.00	0.00	0.00	1	1
1851	29ACCR-44	7	UNION GOTEO DE 16 mm	2	f	1002054	0.00	0.00	0.00	1	1
1852	29ACCR-45	7	UNION SILLETA-MANGUERA 16mm	2	f	1002055	0.00	0.00	0.00	1	1
1853	29ACCR-46	7	VALVULA CINT-MANGUERA 16mm	2	f	1002056	0.00	0.00	0.00	1	1
1854	29ACCR-47	7	VALVULA CINTA-CINTA 16mm	2	f	1002057	0.00	0.00	0.00	1	1
1855	29ACCR-48	7	VALVULA MANGUERA 16mm	2	f	1002058	0.00	0.00	0.00	1	1
1856	29ACCR-49	7	GOTERO INUNDADOR 0-55 LPH	2	f	1002059	0.00	0.00	0.00	1	1
1857	29ACCR-50	7	FILTRO MALLA 3/4	2	f	1002060	0.00	0.00	0.00	1	1
1858	29ACCR-51	7	ASPERSOR NAAN 3/4	2	f	1002061	0.00	0.00	0.00	1	1
1859	29ACCR-52	7	PROGRAMADOR RB ESP-TM2	2	f	1002062	0.00	0.00	0.00	1	1
1860	29ACCR-53	7	BLOWER INDUSTRIAL 1.2HP/220V-60HZ MONOF	2	f	1002063	0.00	0.00	0.00	1	1
1861	29ACCR-54	7	TAPON FINAL 16mm	2	f	1002064	0.00	0.00	0.00	1	1
1862	29ACCR-55	7	MANGUERA DISFUSORA DE 25 x 1/2	2	f	1002065	0.00	0.00	0.00	1	1
1863	29ACCR-56	7	VALVULA MANGUERA 16MM x ROSCA 1/2	2	f	1002066	0.00	0.00	0.00	1	1
1864	29ACCR-57	7	UNION CINTA- MANGUERERA 16MM	2	f	1002067	0.00	0.00	0.00	1	1
1865	29ACCR-58	7	FILTRO DE ANILLO DE 3 ALTO CAUDAL	2	f	1002068	0.00	0.00	0.00	1	1
1866	29ACCR-59	7	FILTRO DE ANILLO DE 2 G. Y HF C/A	2	f	1002069	0.00	0.00	0.00	1	1
1867	29ACCR-60	7	MANGUERA R.B 16MM  BAJA DENSIDAD	2	f	1002070	0.00	0.00	0.00	1	1
1868	29ACCR-61	7	ASPERSOR METALICO 1	2	f	1002071	0.00	0.00	0.00	1	1
1870	29ACCR-63	7	TRIPODE 1	2	f	1002073	0.00	0.00	0.00	1	1
1871	29ACCR-64	7	ASPERSOR IMPACTO ATOM22 1	2	f	1002074	0.00	0.00	0.00	1	1
1872	29ACCR-65	7	ATOM 40	2	f	1002075	0.00	0.00	0.00	1	1
1873	29ACCR-66	7	TRIPODE 2	2	f	1002076	0.00	0.00	0.00	1	1
1874	29ACCR-67	7	VENTURY MASSEY 3/4	2	f	1002077	0.00	0.00	0.00	1	1
1875	29ACCR-68	7	FILTRO DE ANILLOS DE 2 P RF FLF FILTRO DE DISCOS AZUD 2	2	f	1002078	0.00	0.00	0.00	1	1
1876	29ACCR-69	7	FILTRO ANILLOS ARKAL 3	2	f	1002079	0.00	0.00	0.00	1	1
1877	29ACCR-70	7	MINI ECO 1 TRIPODE	2	f	1002080	0.00	0.00	0.00	1	1
1878	29ACCR-71	7	UNION INTERNA DE 16MM AQP	2	f	1002081	0.00	0.00	0.00	1	1
1879	29ACCR-72	7	MACHO INTERNO DE 16MM X 1/2 AQP	2	f	1002082	0.00	0.00	0.00	1	1
1880	29ACCR-73	7	TEE INTERNA DE 16MM AQP	2	f	1002083	0.00	0.00	0.00	1	1
1881	29ACCR-74	7	CODO INTERNO DE 16MM AQP	2	f	1002084	0.00	0.00	0.00	1	1
1882	29ACCR-75	7	FILTRO MALLA 3/4 AQP	2	f	1002085	0.00	0.00	0.00	1	1
1883	29ACCR-76	7	FILTRO MALLA 1 AQP	2	f	1002086	0.00	0.00	0.00	1	1
1884	29ACCR-77	7	FILTRO MALLA 11/2 AQP	2	f	1002087	0.00	0.00	0.00	1	1
1885	29ACCR-78	7	FILTRO MALLA 2 AQP	2	f	1002088	0.00	0.00	0.00	1	1
1886	29ACCR-79	7	FILTRO ANILLO 11/2 AQP	2	f	1002089	0.00	0.00	0.00	1	1
1887	29ACCR-80	7	FILTRO ANILLO 2 AQP	2	f	1002090	0.00	0.00	0.00	1	1
1888	29ACCR-81	7	TRIPODE RIEGO DE 1-1/2	2	f	1002091	0.00	0.00	0.00	1	1
1889	29ACCR-82	7	FILTRO BR ROSCA 150L 2	2	f	1002092	0.00	0.00	0.00	1	1
1890	29ACCR-83	7	ESTACA LABERINTO	2	f	1002093	0.00	0.00	0.00	1	1
1891	29ACCR-84	7	FILTRO BR ROSCA 150L 1	2	f	1002094	0.00	0.00	0.00	1	1
1892	29ACCR-85	7	NEBULIZADOR ASPERSOR ANTIGOTEO 7.8LT/H	2	f	1002095	0.00	0.00	0.00	1	1
1893	29ACCR-86	7	ATOM 30 PC 1 1/2	2	f	1002096	0.00	0.00	0.00	1	1
1894	29ACCR-87	7	ATOM 28 1 1/2	2	f	1002097	0.00	0.00	0.00	1	1
1895	29ACCR-88	7	BOQUILLA GOMA	2	f	1002098	0.00	0.00	0.00	1	1
1896	29ACCR-89	7	POP-UP UNISPRAY 1/2 R.B	2	f	1002099	0.00	0.00	0.00	1	1
1897	29ACCR-90	7	CAJA PLASTICA CIRCULAR DE 6	2	f	1002100	0.00	0.00	0.00	1	1
1898	29ACCR-92	7	ATOM 30 FC 1 1/2	2	f	1002101	0.00	0.00	0.00	1	1
1899	29ACCR-93	7	ASPERSOR GOLONDRINA 901 EST.	2	f	1002102	0.00	0.00	0.00	1	1
1900	30BOM-01	12	MOTOBOMBA AUTOCEBANTE 13HP 4x4 DIESEL	3	f	1002103	0.00	0.00	0.00	1	1
1901	30BOM-02	12	BOMBA PRESS. FI x 1 HP 115V	3	f	1002104	0.00	0.00	0.00	1	1
1902	30BOM-03	12	MANOMETRO GLIC 0/500 CT	3	f	1002105	0.00	0.00	0.00	1	1
1903	30BOM-04	12	MOTOR EB LAPICERO 3.0HP 220V 3F	3	f	1002106	0.00	0.00	0.00	1	1
1904	30BOM-05	12	ESTACIONARIA ELECT MOTOR 5HP 	3	f	1002107	0.00	0.00	0.00	1	1
1905	30BOM-06	12	MANOMETRO GLIC 0/300 V	3	f	1002108	0.00	0.00	0.00	1	1
1906	30BOM-07	12	BOMBA SUPERFICIE  2HP MONOFASICA 	3	f	1002109	0.00	0.00	0.00	1	1
1907	30BOM-08	12	VARCO F-DSOLMP 460V25A	3	f	1002110	0.00	0.00	0.00	1	1
1908	30BOM-09	12	CARTUCHO POLIPROPILENO 20X2.5	3	f	1002111	0.00	0.00	0.00	1	1
1909	30BOM-10	12	CARTUCHO CARBON ACT 2.5	3	f	1002112	0.00	0.00	0.00	1	1
1910	30BOM-100	12	SISTEMA DE DESCARGA Y BOQUILLAS 	3	f	1002113	0.00	0.00	0.00	1	1
1911	30BOM-101	12	SOPORTE TUBERÍA GALVANIZADA	3	f	1002114	0.00	0.00	0.00	1	1
1912	30BOM-102	12	ELECTROBOMBA SUMEGY 3HP 220	3	f	1002115	0.00	0.00	0.00	1	1
1913	30BOM-103	12	KIT REPARACIÓN B.SURMERGIBLE 15HP	3	f	1002116	0.00	0.00	0.00	1	1
1914	30BOM-104	12	BOMBA SUM. ROBUST/LODOS 1HP F230VF	3	f	1002117	0.00	0.00	0.00	1	1
1915	30BOM-105	12	VARIADOR MONOFASICO 7.5HP 220V	3	f	1002118	0.00	0.00	0.00	1	1
1916	30BOM-106	12	MANOMETRO GLIC 0/1000 CT	3	f	1002119	0.00	0.00	0.00	1	1
1917	30BOM-107	12	KIT DE PRESIÓN ESTACIONARIA	3	f	1002120	0.00	0.00	0.00	1	1
1918	30BOM-108	12	TANQUE PRECARGADO ALTAPRO XLB26 98.4LT	3	f	1002121	0.00	0.00	0.00	1	1
1919	30BOM-109	12	VARIADOR FORWARDN MP 3X460V 32A	3	f	1002122	0.00	0.00	0.00	1	1
1920	30BOM-11	12	CARTUCHO CARBON ACT CTO 20X2.5 MICRAS	3	f	1002123	0.00	0.00	0.00	1	1
1921	30BOM-110	12	R-PK-LAMPARA PHILIPS UV 75 WATTS	3	f	1002124	0.00	0.00	0.00	1	1
1922	30BOM-111	12	BIOGP03 OZONO 7GR	3	f	1002125	0.00	0.00	0.00	1	1
1923	30BOM-112	12	MEZCLADOR ESTATICO	3	f	1002126	0.00	0.00	0.00	1	1
1924	30BOM-113	12	HIDROFLOW LEO/1.5HP 1F/110-220V/TANQUE 100CTT	3	f	1002127	0.00	0.00	0.00	1	1
1925	30BOM-114	12	FILTRO GRANADA 4	3	f	1002128	0.00	0.00	0.00	1	1
1926	30BOM-115	12	ALFARDA TRATADA 12X600	3	f	1002129	0.00	0.00	0.00	1	1
1927	30BOM-116	12	KIT ACCESORIO PVC Y GALVANIZADO	3	f	1002130	0.00	0.00	0.00	1	1
1928	30BOM-117	12	BOMBA WEG ESTERCO 3.0 HP 230V	3	f	1002131	0.00	0.00	0.00	1	1
1929	30BOM-118	12	TECHO EN GEOMEMBRANA	3	f	1002132	0.00	0.00	0.00	1	1
1930	30BOM-119	12	BOMBA PEDROLLO 1HP 220V MONO 62GMP 1 1/2x11/2	3	f	1002133	0.00	0.00	0.00	1	1
1931	30BOM-12	12	R-PK-LAMPARA PHILIPS UV 40WATTS	3	f	1002134	0.00	0.00	0.00	1	1
1932	30BOM-120	12	MOTOBOMBA CENT. HORIZ. INOX 2HP 3X230/460V	3	f	1002135	0.00	0.00	0.00	1	1
1933	30BOM-121	12	MATERIALES INSTALACIÓN SUMINISTRO AGUA 4LT, EN PARCELACIÓN YARUMITO (BARBOSA)	3	f	1002136	0.00	0.00	0.00	1	1
1934	30BOM-122	12	SISTEMA DE FLOCULACIÓN MANUAL PARA AGUA 	3	f	1002137	0.00	0.00	0.00	1	1
1935	30BOM-123	12	Fumiducto BEMAT de Colombia finca Cañaveral (Lotes Casa Roja y la Esperanza)	3	f	1002138	0.00	0.00	0.00	1	1
1936	30BOM-124	12	SISTEMA BOMBEO KOLOSAL/BOMBA MOTOR 4 PANELES	3	f	1002139	0.00	0.00	0.00	1	1
1937	30BOM-127	12	TANQUE PRECARGADO ALTAPRO XLB20 75.7LT	3	f	1002140	0.00	0.00	0.00	1	1
1938	30BOM-128	12	TANQUE PRECARGADO ALTAPRO XLB45 170.3LT	3	f	1002141	0.00	0.00	0.00	1	1
1939	30BOM-129	12	TANQUE PRECARGADO ALTAPRO XLB65 246LT	3	f	1002142	0.00	0.00	0.00	1	1
1940	30BOM-13	12	MOT. SUMERGIBLE ALT. SERIE RT6 15HP 3X460V	3	f	1002143	0.00	0.00	0.00	1	1
1941	30BOM-130	12	TANQUE PRECARGADO MEMBRANA  24LT	3	f	1002144	0.00	0.00	0.00	1	1
1942	30BOM-131	12	TANQUE PRECARGADO MEMBRANA  50LT	3	f	1002145	0.00	0.00	0.00	1	1
1943	30BOM-132	12	B. SUMERGIBLE ALT 15HP AC.INX AC6	3	f	1002146	0.00	0.00	0.00	1	1
1944	30BOM-133	12	SISTEMA DE BOMBEO Y RESERVA MANGOS LA ESPERANZA	3	f	1002147	0.00	0.00	0.00	1	1
1945	30BOM-134	12	EB EBARA MULTIE HORIZ PX-15/4FI M38-121 7.5HP/3F	3	f	1002148	0.00	0.00	0.00	1	1
1946	30BOM-135	12	VARIADOR DE VELOCIDAD THETA 7.5HP 5.5 KW 1F SALIDA 3F	3	f	1002149	0.00	0.00	0.00	1	1
1947	30BOM-136	12	INSTALACIÓN ELECTRICA	3	f	1002150	0.00	0.00	0.00	1	1
1948	30BOM-137	12	EB CENTRIFUGADA LEO 0.5HP 1F 110/220V	3	f	1002151	0.00	0.00	0.00	1	1
1949	30BOM-138	12	MOTOR EB LAPICERO LEO 4XR7/28-5.5 7.5HP 3F 220V	3	f	1002152	0.00	0.00	0.00	1	1
1950	30BOM-139	12	MOTOR SUM. AQUA. ACEITE 7.5HP 230V 3F	3	f	1002153	0.00	0.00	0.00	1	1
1951	30BOM-14	12	ELECTROBOMBA CENTRIFUGADA 1.5HP 110-220V	3	f	1002154	0.00	0.00	0.00	1	1
1952	30BOM-140	12	MOTOBOMBA IHM 20H-30TW 220V 	3	f	1002155	0.00	0.00	0.00	1	1
1953	30BOM-142	12	OXIFLOC FLOCULANTE POR CUÑETE (25Kg)	3	f	1002156	0.00	0.00	0.00	1	1
1954	30BOM-143	12	PRESOSTATO DANFOSS KPI36 (2A14,DIF0,7A4BAR)	3	f	1002157	0.00	0.00	0.00	1	1
1955	30BOM-144	12	B. SUMERGIBLE AQUA 5HP P/4DEC.AC.INOX	3	f	1002158	0.00	0.00	0.00	1	1
1956	30BOM-145	12	B SUM. ROBUSTA3 P/LODOS 3HP3F 230V	3	f	1002159	0.00	0.00	0.00	1	1
1957	30BOM-146	12	ARRANCADOR ENERWELL T.PLENA 7-10A 220V	3	f	1002160	0.00	0.00	0.00	1	1
1958	30BOM-147	12	TANQUE FIBRA  DE VIDRIO 21X6--7 4PIES CUBIC	3	f	1002161	0.00	0.00	0.00	1	1
1959	30BOM-148	12	CARTUCHO CARBON ACT GAC 20x4.5	3	f	1002162	0.00	0.00	0.00	1	1
1960	30BOM-149	12	PRESURIZADOR SCALAX100-5 2HP 1F 230V PRES16	3	f	1002163	0.00	0.00	0.00	1	1
1962	30BOM-150	12	LAMPARA UV PLATINUM 40GPM FOCO PHILIPS	3	f	1002165	0.00	0.00	0.00	1	1
1963	30BOM-151	12	LAMPARA UV PLATINUM 40GPM FOCO PHILIPS	3	f	1002166	0.00	0.00	0.00	1	1
1964	30BOM-155	12	PISTON TS28	3	f	1002167	0.00	0.00	0.00	1	1
1965	30BOM-157	12	KIT CABEZOTE FUREKY YN580 	3	f	1002168	0.00	0.00	0.00	1	1
1966	30BOM-158	12	REGULADOR COMP. FS22/FS28	3	f	1002169	0.00	0.00	0.00	1	1
1967	30BOM-159	12	HIDROLAVADORA 3WZ-1522-3S4 3HP 2200PSI	3	f	1002170	0.00	0.00	0.00	1	1
1968	30BOM-160	12	CANASTILLAS FUMIGADORA 130	3	f	1002171	0.00	0.00	0.00	1	1
1969	30BOM-161	12	EMPAQUE EN V 130	3	f	1002172	0.00	0.00	0.00	1	1
1970	30BOM-162	12	EMPAQUE CANASTILLA 130	3	f	1002173	0.00	0.00	0.00	1	1
1971	30BOM-164	12	SERVICIO INSTALACIÓN SISTEMA DE RIEGO	3	f	1002174	0.00	0.00	0.00	1	1
1972	30BOM-165	12	ACCESORIOS REPARACIONES BOMBAS	3	f	1002175	0.00	0.00	0.00	1	1
1973	30BOM-166	12	VARIADOR 10HP EN GABINETE VENTILADO 	3	f	1002176	0.00	0.00	0.00	1	1
1974	30BOM-167	12	CABEZOTE 50 LT AUTOLUBRICADO	3	f	1002177	0.00	0.00	0.00	1	1
1975	30BOM-168	12	REPARACIÓN EQUIPO OZONO 7GH	3	f	1002178	0.00	0.00	0.00	1	1
1976	30BOM-169	12	EMSAMBLE BOMBA FUMIGADORA CON MOTOR 5HP	3	f	1002179	0.00	0.00	0.00	1	1
1977	30BOM-17	12	EMPAQUE VÁLVULA 	3	f	1002180	0.00	0.00	0.00	1	1
1978	30BOM-170	12	HIDRANTE PVC	3	f	1002181	0.00	0.00	0.00	1	1
1979	30BOM-171	12	REPARACIÓN MOTOR HONDA GX160	3	f	1002182	0.00	0.00	0.00	1	1
1980	30BOM-172	12	EB EBARA CENTRIF THSI-181 M 63-123/2,26 T IP21/BAR	3	f	1002183	0.00	0.00	0.00	1	1
1981	30BOM-173	12	EB WEG CENTRIF THSI-181 M 63-179/9.3 220/440V 12,5 HP 3F	3	f	1002184	0.00	0.00	0.00	1	1
1982	30BOM-174	12	REFAC. CONTROLADOR KOLOSAL 1500W-110VDC	3	f	1002185	0.00	0.00	0.00	1	1
1983	30BOM-175	12	CAJA P/PANEL FOTOVOLTAICO 610W	3	f	1002186	0.00	0.00	0.00	1	1
1984	30BOM-176	12	SWITCHNIVEL ALTAMIRA 16A C/CONTROL 10M CAB	3	f	1002187	0.00	0.00	0.00	1	1
1985	30BOM-177	12	MOTOR SUM. AQUA. ACEITE 5HP 230V 3F	3	f	1002188	0.00	0.00	0.00	1	1
1986	30BOM-178	12	PRES. SCALAX100-5 2 HP 1F 230V PRES16	3	f	1002189	0.00	0.00	0.00	1	1
1987	30BOM-179	12	KIT ACCESORIO HIDRAULICO/CONEXIÓN MANGUERA 3	3	f	1002190	0.00	0.00	0.00	1	1
1988	30BOM-18	12	LLAVE PRENSA ESTOPA	3	f	1002191	0.00	0.00	0.00	1	1
1989	30BOM-180	12	SWITCHNIVEL ALTAMIRA 16A C/CONTROL 7M CAB	3	f	1002192	0.00	0.00	0.00	1	1
1990	30BOM-181	12	SERVICIO MTTO TANQUE GEOMEMBRANA	3	f	1002193	0.00	0.00	0.00	1	1
1991	30BOM-182	12	MOTOR SUM. AQUA. ACEITE 5 HP 230V 3F	3	f	1002194	0.00	0.00	0.00	1	1
1992	30BOM-183	12	MOTOBOMBA DIESEL FORTE 13HP 3X3	3	f	1002195	0.00	0.00	0.00	1	1
1993	30BOM-184	12	MOTOBOMBA CENT. HORIZ. ALT. INOX 3HP 3X230/460V	3	f	1002196	0.00	0.00	0.00	1	1
1994	30BOM-185	12	EB PEARL SUTIDOR ESTERCOLERA ALT/PRESS 5.0HP 230V 1F 27A	3	f	1002197	0.00	0.00	0.00	1	1
1995	30BOM-186	12	CONECTOR M P/CABLE MC4 CAL 10/12 IP68	3	f	1002198	0.00	0.00	0.00	1	1
1996	30BOM-187	12	TANQUE FIBRA  DE VIDRIO 30X72-15PIES CUBIC	3	f	1002199	0.00	0.00	0.00	1	1
1997	30BOM-188	12	KIT P/PRES.AUTOM. ALTAMIRA 16A 110-240V	3	f	1002200	0.00	0.00	0.00	1	1
1998	30BOM-189	12	RECTIFICADA FLANCHE	3	f	1002201	0.00	0.00	0.00	1	1
1999	30BOM-19	12	MANOMETRO GLIC 0/100 V	3	f	1002202	0.00	0.00	0.00	1	1
2000	30BOM-190	12	PANEL SOLAR CONNERA 610WP 132CEL HC	3	f	1002203	0.00	0.00	0.00	1	1
2001	30BOM-191	12	TANQUE SALMUERA 200LT	3	f	1002204	0.00	0.00	0.00	1	1
2002	30BOM-193	12	VALV REGULADORA COMPL. BOMBA WHALE BEST	3	f	1002205	0.00	0.00	0.00	1	1
2003	30BOM-194	12	HIDROLAVADORA GASOLINA 3600A	3	f	1002206	0.00	0.00	0.00	1	1
2004	30BOM-195	12	COLADERA 3 	3	f	1002207	0.00	0.00	0.00	1	1
2005	30BOM-196	12	CAJA SUMERGIBLE AQUAPAK 2HP	3	f	1002208	0.00	0.00	0.00	1	1
2006	30BOM-197	12	TRANSICIÓN DE 6 CORRUGAD X 4 PVC	3	f	1002209	0.00	0.00	0.00	1	1
2007	30BOM-199	12	SPOOL PARA TUBERIA DE PEAD DE  250MM PN16 	3	f	1002210	0.00	0.00	0.00	1	1
2008	30BOM-20	12	MTB.SUMERG 5HP1X230V	3	f	1002211	0.00	0.00	0.00	1	1
2009	30BOM-200	12	SERVICIO TERMOFUSIÓN	3	f	1002212	0.00	0.00	0.00	1	1
2010	30BOM-202	12	REPUESTO ESTACIONARIA FUMI TS28	3	f	1002213	0.00	0.00	0.00	1	1
2011	30BOM-203	12	REPUESTO BOMBA WHALE BEST A GROM	3	f	1002214	0.00	0.00	0.00	1	1
2012	30BOM-204	12	BLOWER INDUSTRIAL ENAIRGYDE 1.2HP MONO	3	f	1002215	0.00	0.00	0.00	1	1
2013	30BOM-205	12	FILTRO ESTANDAR PARA BLOWER ENAIRGY 1.2HP	3	f	1002216	0.00	0.00	0.00	1	1
2014	30BOM-206	12	EMPAQUE VALVULA HL-120	3	f	1002217	0.00	0.00	0.00	1	1
2015	30BOM-207	12	VALVULA COMPLETA HL-120	3	f	1002218	0.00	0.00	0.00	1	1
2016	30BOM-208	12	SOLDADURA OREJAS UNIÓN 1-1/4	3	f	1002219	0.00	0.00	0.00	1	1
2017	30BOM-21	12	CAJA CONTROL ACQUAPAK 5HP 230V	3	f	1002220	0.00	0.00	0.00	1	1
2018	30BOM-211	12	ESTRUCTURA BOMBEO SOLAR 	3	f	1002221	0.00	0.00	0.00	1	1
2019	30BOM-212	12	ACCESORIOS TANQUE ESTERCOLERO	3	f	1002222	0.00	0.00	0.00	1	1
2020	30BOM-213	12	SOPORTE PANELES SOLARES LOS FIERROS	3	f	1002223	0.00	0.00	0.00	1	1
2021	30BOM-214	12	MATERIALES ELECTRICOS INSTALACIÓN BOMBEO SOLAR	3	f	1002224	0.00	0.00	0.00	1	1
2022	30BOM-215	12	CABLE SOLAR NEGRO 1500V	3	f	1002225	0.00	0.00	0.00	1	1
2023	30BOM-216	12	B. SUMERGIBLE  ALTAMIRA 1HP AC.INOX AC4	3	f	1002226	0.00	0.00	0.00	1	1
2024	30BOM-217	12	MOTOR SUM. AQUA. ACEITE 1 HP 230V 3F	3	f	1002227	0.00	0.00	0.00	1	1
2025	30BOM-218	12	ANTIVIBRATORIO	3	f	1002228	0.00	0.00	0.00	1	1
2026	30BOM-219	12	TANQUE FIBRA DE VIDRIO 18X65-5PIES CUBIC	3	f	1002229	0.00	0.00	0.00	1	1
2027	30BOM-22	12	B. SUMERGIBLE ALT 5 HP AC. INOX AC4	3	f	1002230	0.00	0.00	0.00	1	1
2028	30BOM-220	12	LAMPARA UV PLATINUM 60GPM FOCO PHILIPS	3	f	1002231	0.00	0.00	0.00	1	1
2029	30BOM-221	12	PRES.LOTUS 1.2HP 1F 230V 	3	f	1002232	0.00	0.00	0.00	1	1
2030	30BOM-222	12	VALVULA FILTRO 5 PIE3 18X65	3	f	1002233	0.00	0.00	0.00	1	1
2031	30BOM-223	12	PRESURIZADOR LOTUS 200-2 3HP 2X230V XLB65	3	f	1002234	0.00	0.00	0.00	1	1
2032	30BOM-224	12	FABRICACIÓN/MAQUILA ACCESORIOS ESTACIONARIA	3	f	1002235	0.00	0.00	0.00	1	1
2033	30BOM-225	12	VARIADOR 20 HP	3	f	1002236	0.00	0.00	0.00	1	1
2034	30BOM-226	12	SOPORTE PARA LÁMPARA	3	f	1002237	0.00	0.00	0.00	1	1
2035	30BOM-227	12	SERVICIO MECANIZADO	3	f	1002238	0.00	0.00	0.00	1	1
2036	30BOM-228	12	POLEA EN ALUMINIO 2EJE 1/2	3	f	1002239	0.00	0.00	0.00	1	1
2037	30BOM-229	12	BOMBA ESTACIONARIA ANNOVI REVERBERI 3.5HP	3	f	1002240	0.00	0.00	0.00	1	1
2038	30BOM-23	12	BALASTRA PLATINUM 18	3	f	1002241	0.00	0.00	0.00	1	1
2039	30BOM-230	12	MOTOR WEG ELECTRICO 220V 5HP	3	f	1002242	0.00	0.00	0.00	1	1
2040	30BOM-231	12	T06X/T2X SELL MECANICO/VITON	3	f	1002243	0.00	0.00	0.00	1	1
2041	30BOM-233	12	GENERADOR GASOLINA 2.2. KW 120-240V	3	f	1002244	0.00	0.00	0.00	1	1
2042	30BOM-234	12	COMANDO DE PRESION YN-580 (80-4122)	3	f	1002245	0.00	0.00	0.00	1	1
2043	30BOM-235	12	FABRICACIÓN FLANCHE BOMBA 	3	f	1002246	0.00	0.00	0.00	1	1
2044	30BOM-236	12	POLEA EN ALUMINIO 2EJE 1	3	f	1002247	0.00	0.00	0.00	1	1
2045	30BOM-237	12	SAL HIDROSAL	3	f	1002248	0.00	0.00	0.00	1	1
2046	30BOM-238	12	TUB. P/COLUMNA ADEM 3/ 150M CARGA	3	f	1002249	0.00	0.00	0.00	1	1
2047	30BOM-239	12	KIT ADAPTADORES PARA TUBO 150M 3	3	f	1002250	0.00	0.00	0.00	1	1
2048	30BOM-24	12	EB SUPERTFICIE VERTICAL 15.0 HP 3F	3	f	1002251	0.00	0.00	0.00	1	1
2049	30BOM-240	12	JUEGO DE ARNES PARA TUBO 150M 3	3	f	1002252	0.00	0.00	0.00	1	1
2050	30BOM-241	12	TUBO ROLADO REDONDO	3	f	1002253	0.00	0.00	0.00	1	1
2051	30BOM-242	12	TUBO CERNE	3	f	1002254	0.00	0.00	0.00	1	1
2052	30BOM-243	12	STICKER 4X13 ACRILICO	3	f	1002255	0.00	0.00	0.00	1	1
2053	30BOM-244	12	BASE UNIVERSAL NEGRA	3	f	1002256	0.00	0.00	0.00	1	1
2054	30BOM-245	12	SWITCHNIVEL ALTAMIRA 16(4)A/250V	3	f	1002257	0.00	0.00	0.00	1	1
2055	30BOM-246	12	SWITCH PRES. ALTAMIRA 30-50PSI 20AMP MACHO ALTAMIR	3	f	1002258	0.00	0.00	0.00	1	1
2056	30BOM-247	12	CABLE FORRADO 1/8	3	f	1002259	0.00	0.00	0.00	1	1
2057	30BOM-248	12	KIT MEDIDOR	3	f	1002260	0.00	0.00	0.00	1	1
2058	30BOM-249	12	AGITADOR PARA ESTIERCOL CON MOTOR HR 10HP	3	f	1002261	0.00	0.00	0.00	1	1
2059	30BOM-25	12	PRESURIZ MINI SMART 3HP	3	f	1002262	0.00	0.00	0.00	1	1
2060	30BOM-250	12	TUB. P/COLUMNA ADEM 2/ 150M CARGA	3	f	1002263	0.00	0.00	0.00	1	1
2061	30BOM-252	12	EB. MULTIETAPAS LEO LVS 3-25 TF 5.0HP 3F 220V	3	f	1002264	0.00	0.00	0.00	1	1
2062	30BOM-253	12	MANOMETRO GLIC 0/150 V	3	f	1002265	0.00	0.00	0.00	1	1
2063	30BOM-254	12	MANGUERA HIDROFLOW ALTA PRESIÓN	3	f	1002266	0.00	0.00	0.00	1	1
2064	30BOM-26	12	KIT ADAPTADORES PARA TUBERIA POZO PROFUNDO	3	f	1002267	0.00	0.00	0.00	1	1
2065	30BOM-27	12	CAJA CONTROL BOMBA 220 DE 1HP	3	f	1002268	0.00	0.00	0.00	1	1
2066	30BOM-28	12	BOMBA TO. 6 XE30-23	3	f	1002269	0.00	0.00	0.00	1	1
2067	30BOM-29	12	MOTOR SUM. AQUA. ACEITE 5 HP 230V 1F	3	f	1002270	0.00	0.00	0.00	1	1
2068	30BOM-30	12	CAJA SUMERGIBLE AQUAPACK 5HP	3	f	1002271	0.00	0.00	0.00	1	1
2069	30BOM-31	12	MANOMETRO GLIC 0/600 CT	3	f	1002272	0.00	0.00	0.00	1	1
2070	30BOM-32	12	EMPAQUE PRESIÓN 	3	f	1002273	0.00	0.00	0.00	1	1
2071	30BOM-33	12	PRESOSTATO PS-02C 30-PSI	3	f	1002274	0.00	0.00	0.00	1	1
2072	30BOM-34	12	SISTEMA DE OSMOSIS INVERSA DE 13.000GPD ( PROD DE 14.400GDP)	3	f	1002275	0.00	0.00	0.00	1	1
2073	30BOM-35	12	PRETRATAMIENTO PARA OSMOSIS INVERSA 20GPM 	3	f	1002276	0.00	0.00	0.00	1	1
2074	30BOM-36	12	SERVICIO INSTALACIÓN TRATAMIENTO DE AGUA ( OSMOSIS INVERSA)	3	f	1002277	0.00	0.00	0.00	1	1
2075	30BOM-38	12	B. SUMERGIBLE ALT 7.5 HP INOX.AC	3	f	1002278	0.00	0.00	0.00	1	1
2076	30BOM-39	12	MOTOR SUM. ACQUA. ACEITE 7.5 HP 230V 3F	3	f	1002279	0.00	0.00	0.00	1	1
2077	30BOM-40	12	VARIADOR FORWARDN MP 3X230V 30A	3	f	1002280	0.00	0.00	0.00	1	1
2078	30BOM-41	12	CABLE SOLAR CONNERA 10AWG (6MM2)	3	f	1002281	0.00	0.00	0.00	1	1
2079	30BOM-42	12	CONECTOR H P/CABLE MC4 CAL 10/12	3	f	1002282	0.00	0.00	0.00	1	1
2080	30BOM-43	12	SUP.PICOS3P 1000V40KAP	3	f	1002283	0.00	0.00	0.00	1	1
2081	30BOM-44	12	CARTUCHO CARBON ACT 20X4.5	3	f	1002284	0.00	0.00	0.00	1	1
2082	30BOM-45	12	CARTUCHO CARBON ACT 20X4.5 5 MICRAS	3	f	1002285	0.00	0.00	0.00	1	1
2083	30BOM-46	12	LAMPARA UV PLATINUM 30GPM FOCO PHILIPS	3	f	1002286	0.00	0.00	0.00	1	1
2084	30BOM-47	12	PORTAFILTRO BIG BLUE 20X1.5 PURGA	3	f	1002287	0.00	0.00	0.00	1	1
2085	30BOM-48	12	CARTUCHO POLIPROPILENO 20x4.5 5 MICRAS	3	f	1002288	0.00	0.00	0.00	1	1
2086	30BOM-49	12	PRES. LOTUS 1HP 1F 230V	3	f	1002289	0.00	0.00	0.00	1	1
2087	30BOM-50	12	VALVULA FILTRO 3 PIE2 14X65	3	f	1002290	0.00	0.00	0.00	1	1
2088	30BOM-51	12	TANQUE FIBRA  DE VIDRIO 15X65 3PIES	3	f	1002291	0.00	0.00	0.00	1	1
2089	30BOM-52	12	1FT3 ZEOLITA MINERAL	3	f	1002292	0.00	0.00	0.00	1	1
2090	30BOM-54	12	CARBON ACTIVADO 1240 14KG	3	f	1002293	0.00	0.00	0.00	1	1
2091	30BOM-55	12	BOMBA DOSIFICADORA PERIFERICA 115V	3	f	1002294	0.00	0.00	0.00	1	1
2092	30BOM-56	12	BOMBA MULT. VERT ALT 3HP 	3	f	1002295	0.00	0.00	0.00	1	1
2093	30BOM-57	12	CONTRABRIDA 25BAR	3	f	1002296	0.00	0.00	0.00	1	1
2094	30BOM-58	12	MOTOR ALT 3HP 230V 	3	f	1002297	0.00	0.00	0.00	1	1
2095	30BOM-59	12	MOTOBOMBA ALT JOB 3.5L 5.5HP 3x230/460V	3	f	1002298	0.00	0.00	0.00	1	1
2096	30BOM-60	12	SWITCH PRES. ALTAMIRA 3.116PSI CONEX-HEMB	3	f	1002299	0.00	0.00	0.00	1	1
2097	30BOM-61	12	VALVULA FILTRO 7 PIE3 21X62	3	f	1002300	0.00	0.00	0.00	1	1
2098	30BOM-62	12	LAMPARA UV PLATINUM 80GPM FOCO PHILIPS	3	f	1002301	0.00	0.00	0.00	1	1
2099	30BOM-63	12	PANEL SOLAR ASTRALX 545WP 144CEL HC	3	f	1002302	0.00	0.00	0.00	1	1
2100	30BOM-64	12	KATALOX X KILOS 	3	f	1002303	0.00	0.00	0.00	1	1
2101	30BOM-65	12	FLOTADOR 3MT KRIPAL	3	f	1002304	0.00	0.00	0.00	1	1
2102	30BOM-66	12	BOMBA MULT. VERT ALT 15HP 	3	f	1002305	0.00	0.00	0.00	1	1
2103	30BOM-67	12	T3.5 KIT CONTRABRIDA 25BAR	3	f	1002306	0.00	0.00	0.00	1	1
2104	30BOM-68	12	MOTOR ALT. PREMIUM 15HP 230/460V	3	f	1002307	0.00	0.00	0.00	1	1
2105	30BOM-69	12	MANOMETRO GLIC 0/200 CT	3	f	1002308	0.00	0.00	0.00	1	1
2106	30BOM-70	12	BOMBA SUMERGIBLE ALT 2HP 	3	f	1002309	0.00	0.00	0.00	1	1
2107	30BOM-71	12	MOTOR SUM. AQUA. ACEITE 2HP 230V 1F	3	f	1002310	0.00	0.00	0.00	1	1
2108	30BOM-72	12	CAJA DE CONTROL ACQUAPAK 2HP 230V	3	f	1002311	0.00	0.00	0.00	1	1
2109	30BOM-73	12	HIDRANTE CRUCETA DE 1/2	3	f	1002312	0.00	0.00	0.00	1	1
2110	30BOM-74	12	HIDRANTE DE PASO 1/2	3	f	1002313	0.00	0.00	0.00	1	1
2111	30BOM-75	12	HIDRANTE TERMINAL DE 1/2	3	f	1002314	0.00	0.00	0.00	1	1
2112	30BOM-76	12	CARTUCHO POLIPROPILENO 20X4.5 10 MICRAS	3	f	1002315	0.00	0.00	0.00	1	1
2113	30BOM-77	12	PRESURIZADOR. FIX15E 1.5HP 1F 127V PRES16	3	f	1002316	0.00	0.00	0.00	1	1
2114	30BOM-78	12	CLORADOR AUT. PASTIL EN LINEA C/VAL 2KG	3	f	1002317	0.00	0.00	0.00	1	1
2115	30BOM-79	12	VALVULA FILTRO 4 PIE3 16X65	3	f	1002318	0.00	0.00	0.00	1	1
2116	30BOM-80	12	TANQUE FIBRA  DE VIDRIO 16X65 4PIES CUBIC	3	f	1002319	0.00	0.00	0.00	1	1
2117	30BOM-81	12	1FT3 CARBON ACTIVADO 1240 14KG	3	f	1002320	0.00	0.00	0.00	1	1
2118	30BOM-82	12	KIT ACCESORIOS HIDRÁULICOS	3	f	1002321	0.00	0.00	0.00	1	1
2119	30BOM-83	12	TANQUE VERTICAL ALT. ACERO 18L	3	f	1002322	0.00	0.00	0.00	1	1
2120	30BOM-84	12	CONECTOR MC4 M-H 50618	3	f	1002323	0.00	0.00	0.00	1	1
2121	30BOM-85	12	CABLE FOTOVOLTAICO 6MM	3	f	1002324	0.00	0.00	0.00	1	1
2122	30BOM-86	12	MATERIALES ELECTRICOS INSTALACIÓN BLOWERS	3	f	1002325	0.00	0.00	0.00	1	1
2123	30BOM-87	12	CAMISA PROTECCIÓN BOMBA SUMERGIBLE	3	f	1002326	0.00	0.00	0.00	1	1
2124	30BOM-88	12	KIT MANÓMETRO 	3	f	1002327	0.00	0.00	0.00	1	1
2125	30BOM-89	12	HIDRANTE PRINCIPAL 1/2	3	f	1002328	0.00	0.00	0.00	1	1
2126	30BOM-90	12	ABRAZADERA TIPO MARIPOSA 11/2	3	f	1002329	0.00	0.00	0.00	1	1
2127	30BOM-91	12	ABRAZADERA TIPO MARIPOSA 1	3	f	1002330	0.00	0.00	0.00	1	1
2128	30BOM-92	12	ANCLAJES HIDRANTES 	3	f	1002331	0.00	0.00	0.00	1	1
2129	30BOM-93	12	ARRANCADOR MONOFÁSICO ESTACIONARIA 5HP	3	f	1002332	0.00	0.00	0.00	1	1
2130	30BOM-94	12	ARRANCADOR MONOFÁSICO MEZCLADOR 	3	f	1002333	0.00	0.00	0.00	1	1
2131	30BOM-95	12	KIT HERRAMIENTAS 	3	f	1002334	0.00	0.00	0.00	1	1
2132	30BOM-96	12	KIT DE REPUESTOS	3	f	1002335	0.00	0.00	0.00	1	1
2133	30BOM-97	12	HIDRANTE PRINCIPAL SALIDA 7 ZONAS	3	f	1002336	0.00	0.00	0.00	1	1
2134	30BOM-98	12	SISTEMA ELECTRICO	3	f	1002337	0.00	0.00	0.00	1	1
2135	30BOM-99	12	SISTEMA DE BOMBEO TANQUE 7	3	f	1002338	0.00	0.00	0.00	1	1
2136	30PE-25	12	TOMA 3 X 50 MURO HEMAR	3	f	1002339	0.00	0.00	0.00	1	1
2137	31PE-01	12	CABLE ENCAUCHETADO 5 X16 NEGRO	3	f	1002340	0.00	0.00	0.00	1	1
2138	31PE-02	12	CONTROL SUITCHE/NIVEL/ FLOTADOR 10A	3	f	1002341	0.00	0.00	0.00	1	1
2139	31PE-03	12	CABLE ILUMINACIÓN 105 #12 NETRO CELTENSA	3	f	1002342	0.00	0.00	0.00	1	1
2140	31PE-04	12	ROLLO CINTA AUTOFUNDENTE 	3	f	1002343	0.00	0.00	0.00	1	1
2141	31PE-05	12	TUBO PVC PLASTIMEC/TECNOSA/ 3/4	3	f	1002344	0.00	0.00	0.00	1	1
2142	31PE-06	12	CAJA EMPALME TERMOPLASTICA 10x10x7 CMTS	3	f	1002345	0.00	0.00	0.00	1	1
2143	31PE-07	12	ADAPTADOR PVC PAVCO 3/4 GRIS	3	f	1002346	0.00	0.00	0.00	1	1
2144	31PE-08	12	UNION PVC PAVCO 3/4 GRIS	3	f	1002347	0.00	0.00	0.00	1	1
2145	31PE-09	12	CURVA PAVCO 3/4 2 CAMP CIELO	3	f	1002348	0.00	0.00	0.00	1	1
2146	31PE-11	12	ADAPTADOR PVC TERCOL 3/4	3	f	1002350	0.00	0.00	0.00	1	1
2147	31PE-12	12	CABLE THHN/THWN 14 NEGRO	3	f	1002351	0.00	0.00	0.00	1	1
2148	31PE-13	12	CURVA PLASTIMEC 1/2 DOBLE CAMPANA	3	f	1002352	0.00	0.00	0.00	1	1
2149	31PE-14	12	ADAPTADOR PVC TERCOL/TECNOSA 1/2	3	f	1002353	0.00	0.00	0.00	1	1
2150	31PE-15	12	COOPEX O CORAZA MET 1/2	3	f	1002354	0.00	0.00	0.00	1	1
2151	31PE-16	12	CONECTOR METALICO RECTA 1/2	3	f	1002355	0.00	0.00	0.00	1	1
2152	31PE-17	12	PRENSA ESTOPA DEXSON 1/2	3	f	1002356	0.00	0.00	0.00	1	1
2153	31PE-18	12	JG/CM/TERCOL/SOMELECT	3	f	1002357	0.00	0.00	0.00	1	1
2154	31PE-20	12	CONECTOR PVC RECTO 1/2 CON TUERCA GRIS	3	f	1002359	0.00	0.00	0.00	1	1
2155	31PE-21	12	GRAPA 1/2 DOBLE OJO GALV/SOMELECT	3	f	1002360	0.00	0.00	0.00	1	1
2156	31PE-22	12	CORREA PLASTICA DEXSON 20CMS PAQ/100 UND NEGRA	3	f	1002361	0.00	0.00	0.00	1	1
2157	31PE-23	12	GENESIS TOMA DOBLE P/T 15AMP	3	f	1002362	0.00	0.00	0.00	1	1
2158	31PE-24	12	CAJA RECTANGULAR PARA CANALETA	3	f	1002363	0.00	0.00	0.00	1	1
2159	31PE-26	12	ENCHUFE 3 X 50 HEMAR	3	f	1002364	0.00	0.00	0.00	1	1
2160	31PE-27	12	CAJA EMPALME TERMOPLASTICA	3	f	1002365	0.00	0.00	0.00	1	1
2161	31PE-28	12	CONTROL STECK TERMICO	3	f	1002366	0.00	0.00	0.00	1	1
2162	31PE-29	12	GRAPA 3/4 GALV SOMELECT	3	f	1002367	0.00	0.00	0.00	1	1
2163	31PE-30	12	EMT-ENTRADA CAJA 3/4 ACERO GALV	3	f	1002368	0.00	0.00	0.00	1	1
2164	31PE-31	12	CABLE CENTELFLEX ENCAUCHETADO 3x10 CENTELSA	3	f	1002369	0.00	0.00	0.00	1	1
2165	31PE-32	12	CURVA EMT 3/4 METALICA	3	f	1002370	0.00	0.00	0.00	1	1
2166	31PE-33	12	TUBO EMT 3/4	3	f	1002371	0.00	0.00	0.00	1	1
2167	31PE-34	12	UNION EMT 3/4 ACERADO	3	f	1002372	0.00	0.00	0.00	1	1
2168	31PE-35	12	CONECTOR EMT 3/4 ACERADO	3	f	1002373	0.00	0.00	0.00	1	1
2169	31PE-36	12	CONTROL STECK  CONTACTOR 32/AC3	3	f	1002374	0.00	0.00	0.00	1	1
2170	31PE-37	12	CABLE VEHICULO/ILUMINACIÓN No. 14 AWG	3	f	1002375	0.00	0.00	0.00	1	1
2171	31PE-38	12	CABLE VEHICULO/ILUMINACIÓN No. 12 AWG	3	f	1002376	0.00	0.00	0.00	1	1
2172	31PE-39	12	CANALETA PLASTICA 25X25X2MTS	3	f	1002377	0.00	0.00	0.00	1	1
2173	31PE-40	12	BREAKER RIEL 1X32A 	3	f	1002378	0.00	0.00	0.00	1	1
2174	31PE-41	12	CONTROL SELECTOR MULETILLA 3 POS 6 A	3	f	1002379	0.00	0.00	0.00	1	1
2175	31PE-42	12	PILOTO CIRCULAR ELECT POWER EBC	3	f	1002380	0.00	0.00	0.00	1	1
2176	31PE-43	12	BREAKER RIEL 2X32 10KA	3	f	1002381	0.00	0.00	0.00	1	1
2177	31PE-44	12	COFRE INTERIOR 50X40X25	3	f	1002382	0.00	0.00	0.00	1	1
2178	31PE-45	12	GABINETE ELÉCTRICO	3	f	1002383	0.00	0.00	0.00	1	1
2179	31PE-46	12	CABLE #8 7H CENTELSA	3	f	1002384	0.00	0.00	0.00	1	1
2180	31PE-47	12	CABLE #12 7H CELTELSA	3	f	1002385	0.00	0.00	0.00	1	1
2181	31PE-48	12	CONTROL DE NIVEL FLOTADOR 16AMP	3	f	1002386	0.00	0.00	0.00	1	1
2182	31PE-49	12	CABLE ENCAUCHETADO 2X12	3	f	1002387	0.00	0.00	0.00	1	1
2183	31PE-50	12	MATERIALES ELECTRICOS PLANTA TRATAMIENTO	3	f	1002388	0.00	0.00	0.00	1	1
2184	31PE-51	12	VENTILADOR EXTRACTOR 4	3	f	1002389	0.00	0.00	0.00	1	1
2185	31PE-52	12	PROTECTOR VENTILADOR	3	f	1002390	0.00	0.00	0.00	1	1
2186	31PE-53	12	TABLERO CONTROL ELECTRICO CON 8 PROGRAMAS	3	f	1002391	0.00	0.00	0.00	1	1
2187	31PE-54	12	GUANTES DIELECTRICO	3	f	1002392	0.00	0.00	0.00	1	1
2188	31PE-55	12	TERMINAL EMT 3/4	3	f	1002393	0.00	0.00	0.00	1	1
2189	31PE-56	12	INTERRUPTOR AUTOMATICA	3	f	1002394	0.00	0.00	0.00	1	1
2190	31PE-58	12	BREAKER DE PROTECCIÓN 2 X 40AMP	3	f	1002395	0.00	0.00	0.00	1	1
2191	31PE-59	12	CABLE ENCAUCHETADO 2X10	3	f	1002396	0.00	0.00	0.00	1	1
2192	31PE-61	12	CABLE CENTELFLEX ENCAUCHETADO 4x10 CENTELSA	3	f	1002397	0.00	0.00	0.00	1	1
2193	31PE-62	12	CABLE #10	3	f	1002398	0.00	0.00	0.00	1	1
2194	31PE-63	12	CABLE ILUMINACIÓN 105 #16 NETRO CELTENSA	3	f	1002399	0.00	0.00	0.00	1	1
2195	31PE-64	12	VARILLA COBRIZADA 1.80M	3	f	1002400	0.00	0.00	0.00	1	1
2196	31PE-65	12	SUICHE STIOP GX140	3	f	1002401	0.00	0.00	0.00	1	1
2197	31PE-66	12	ARRANQUE COMPLETO MOTOR	3	f	1002402	0.00	0.00	0.00	1	1
2198	31PE-67	12	ARRANCADOR DIRECTO 30-40A	3	f	1002403	0.00	0.00	0.00	1	1
2199	31PE-68	12	CABLE ENCAUCHETADO 4X12	3	f	1002404	0.00	0.00	0.00	1	1
2200	31PE-69	12	ACCESORIOS ELECTRICOS	3	f	1002405	0.00	0.00	0.00	1	1
2201	31PE-70	12	CABLE ENCAUCHETADO 3X14	3	f	1002406	0.00	0.00	0.00	1	1
2202	31PE-71	12	CABLE FIBRA VIDRIO	3	f	1002407	0.00	0.00	0.00	1	1
2203	31PE-72	12	CABLE SOLDADOR SMS	3	f	1002408	0.00	0.00	0.00	1	1
2204	31PE-73	12	COFRE CON PROTECCIÓN TERMICA	3	f	1002409	0.00	0.00	0.00	1	1
2205	31PE-74	12	RELE 24 VTS 8 PIES	3	f	1002410	0.00	0.00	0.00	1	1
2206	31PE-75	12	BREAKER RIEL 3X50	3	f	1002411	0.00	0.00	0.00	1	1
2207	31PE-76	12	TEMPORIZADOR 12 SEG SIN BASE	3	f	1002412	0.00	0.00	0.00	1	1
2208	31PE-77	12	BASE RIEL 8 PINES	3	f	1002413	0.00	0.00	0.00	1	1
2209	32AF-01	12	ACOPLE MANGUERA ESCUALIZABLE	3	f	1002414	0.00	0.00	0.00	1	1
2210	32AF-02	12	VÁLVULA FUMIGACIÓN 1/4 	3	f	1002415	0.00	0.00	0.00	1	1
2211	32AF-03	12	FILTRO PARA BOQUILLA FUMIGACIÓN	3	f	1002416	0.00	0.00	0.00	1	1
2212	32AF-04	12	EMPAQUE EN V ( PISTON) 30	3	f	1002417	0.00	0.00	0.00	1	1
2213	32AF-05	12	EMPAQUE VÁLVULA CHEQUE 	3	f	1002418	0.00	0.00	0.00	1	1
2214	32AF-06	12	PISTOLA BOQUILLA PA 30	3	f	1002419	0.00	0.00	0.00	1	1
2215	32AF-08	12	MANG. FUMI CONEXIÓN HIDRANTE	3	f	1002420	0.00	0.00	0.00	1	1
2216	32AF-09	12	MANG. HIDRAULICA 1/2 CONEXIÓN FUMI	3	f	1002421	0.00	0.00	0.00	1	1
2217	32AF-12	12	PISTOLA PREMIUM BR 	3	f	1002422	0.00	0.00	0.00	1	1
2218	32AF-13	12	LANZA CON POMA 16 NARANJA	3	f	1002423	0.00	0.00	0.00	1	1
2219	32AF-14	12	VALVULA M/M FUMIGACIÓN	3	f	1002424	0.00	0.00	0.00	1	1
2220	32AF-15	12	YEE FUMIGACIÓN BR	3	f	1002425	0.00	0.00	0.00	1	1
2221	32AF-16	12	JUEGO HM FUMIGACION 5/16	3	f	1002426	0.00	0.00	0.00	1	1
2222	32AF-17	12	BOMBA FUMIGACIÓN SIN REDUCTOR	3	f	1002427	0.00	0.00	0.00	1	1
2223	32AF-18	12	GRUPO COMANDO MEDIA Y ALTA PRESIÓN	3	f	1002428	0.00	0.00	0.00	1	1
2224	32AF-19	12	LANZA METÁLICA RC-346EX	3	f	1002429	0.00	0.00	0.00	1	1
2225	32AF-20	12	BOQUILLA BRONCE RC-350A151X 1000	3	f	1002430	0.00	0.00	0.00	1	1
2226	32AF-21	12	PORTABOQUILLA HERBICIDA RC-830EX	3	f	1002431	0.00	0.00	0.00	1	1
2227	32AF-22	12	EMBOLO COMPLETO RC-400EX	3	f	1002432	0.00	0.00	0.00	1	1
2228	32AF-23	12	TUBO BOMBA CLASICA RC-105X	3	f	1002433	0.00	0.00	0.00	1	1
2229	32AF-24	12	BOQUILLA BRONCE 600 RC-355EX	3	f	1002434	0.00	0.00	0.00	1	1
2230	32AF-25	12	ACOPLE PARA MANGUERA JARDIN	3	f	1002435	0.00	0.00	0.00	1	1
2231	33PF-01	12	PLATINA 1 1/8X6MTS	3	f	1002436	0.00	0.00	0.00	1	1
2232	33PF-02	12	KILO SOLD WEST ARCO	3	f	1002437	0.00	0.00	0.00	1	1
2233	33PF-03	12	DISCO FLAP 4./12	3	f	1002438	0.00	0.00	0.00	1	1
2234	33PF-04	12	DISCO ABRACOL	3	f	1002439	0.00	0.00	0.00	1	1
2235	33PF-05	12	PINT ANTICO NEGRO	3	f	1002440	0.00	0.00	0.00	1	1
2236	33PF-06	12	TUBO MEC. CUAD 11/2 C/8 X 6MT	3	f	1002441	0.00	0.00	0.00	1	1
2237	33PF-07	12	ESTRUCTURA 1 X7X7 TREN POLIMIENTO	3	f	1002442	0.00	0.00	0.00	1	1
2238	33PF-08	12	ANGULO 11/2 X 1/8 X 6MT	3	f	1002443	0.00	0.00	0.00	1	1
2239	33PF-09	12	CANDADO DE SEGURIDAD	3	f	1002444	0.00	0.00	0.00	1	1
2240	33PF-10	12	CLAVO VARETA GL 3 1/2 X 25	3	f	1002445	0.00	0.00	0.00	1	1
2241	33PF-100	12	KIT ACCESORIOS 362D 28 HUSQ LIQUIDOS	3	f	1002446	0.00	0.00	0.00	1	1
2242	33PF-101	12	PLASTICO NEGRO X 4M DE ANCHO CAL 6	3	f	1002447	0.00	0.00	0.00	1	1
2243	33PF-102	12	CUBIERTA MACHETE 18	3	f	1002448	0.00	0.00	0.00	1	1
2244	33PF-103	12	MACHETE GAVILAN COLORADO 18	3	f	1002449	0.00	0.00	0.00	1	1
2245	33PF-104	12	CONTROL SEMANARIO	3	f	1002450	0.00	0.00	0.00	1	1
2246	33PF-105	12	TLLO AUTOP. 10 X 1	3	f	1002451	0.00	0.00	0.00	1	1
2247	33PF-106	12	CABO PALA 	3	f	1002452	0.00	0.00	0.00	1	1
2248	33PF-107	12	CABO PICA	3	f	1002453	0.00	0.00	0.00	1	1
2249	33PF-108	12	TLLO GALV HEX 5/8 X 4-1/2	3	f	1002454	0.00	0.00	0.00	1	1
2250	33PF-109	12	LLAVE BUJIA PALA STIHL	3	f	1002455	0.00	0.00	0.00	1	1
2251	33PF-11	12	CLAVO VARETA GL 4 X 25	3	f	1002456	0.00	0.00	0.00	1	1
2252	33PF-110	12	LIMATON STIHL 3/8	3	f	1002457	0.00	0.00	0.00	1	1
2253	33PF-111	12	PUNTILLA PUMA C/C 3 X 1 LBS	3	f	1002458	0.00	0.00	0.00	1	1
2254	33PF-112	12	CHAZO 5/16 X 17/8	3	f	1002459	0.00	0.00	0.00	1	1
2255	33PF-113	12	CAMISETA DE PRESIÓN 3/4	3	f	1002460	0.00	0.00	0.00	1	1
2256	33PF-114	12	PIE DE AMIGO BLANCO 12X14	3	f	1002461	0.00	0.00	0.00	1	1
2257	33PF-115	12	TLLO PARA PANEL DE YESO 10 X 1 1/2	3	f	1002462	0.00	0.00	0.00	1	1
2258	33PF-116	12	PALA REDONDA #2	3	f	1002463	0.00	0.00	0.00	1	1
2259	33PF-117	12	REFLECTOR LED 200W 100-240V	3	f	1002464	0.00	0.00	0.00	1	1
2260	33PF-118	12	CAJA HTA 17 TOTAL	3	f	1002465	0.00	0.00	0.00	1	1
2261	33PF-119	12	LLAVE MIXTA 12MM	3	f	1002466	0.00	0.00	0.00	1	1
2262	33PF-12	12	GRAPA CERCA PROALAMBRES 11/4 X 9 X 25	3	f	1002467	0.00	0.00	0.00	1	1
2263	33PF-120	12	LLAVE MIXTA 14MM	3	f	1002468	0.00	0.00	0.00	1	1
2264	33PF-121	12	DADO MAGNETICO 12MM	3	f	1002469	0.00	0.00	0.00	1	1
2265	33PF-122	12	JUEGO SIERRA COPAS	3	f	1002470	0.00	0.00	0.00	1	1
2266	33PF-123	12	ESTRIBO 20 X 20 3/8	3	f	1002471	0.00	0.00	0.00	1	1
2267	33PF-13	12	GRAPA CERCA 1X12X25	3	f	1002472	0.00	0.00	0.00	1	1
2268	33PF-14	12	PALA CUADRADA N°4	3	f	1002473	0.00	0.00	0.00	1	1
2269	33PF-15	12	PALIN HOYADOR 	3	f	1002474	0.00	0.00	0.00	1	1
2270	33PF-16	12	PUNTILLA C/C 4 X 1000 25KLS	3	f	1002475	0.00	0.00	0.00	1	1
2271	33PF-17	12	PUNTILLA C/C 2 1/2 X 500 50LBS	3	f	1002476	0.00	0.00	0.00	1	1
2272	33PF-18	12	PUNTILLA C/C 31/2X 500 50LBS	3	f	1002477	0.00	0.00	0.00	1	1
2273	33PF-19	12	GRAPA CERCA 1X9X25	3	f	1002478	0.00	0.00	0.00	1	1
2274	33PF-20	12	PUNTILLA C/C 2 X 500 50LBS	3	f	1002479	0.00	0.00	0.00	1	1
2275	33PF-21	12	PUNTILLA C/C 3 X 500 50LBS	3	f	1002480	0.00	0.00	0.00	1	1
2276	33PF-22	12	CHAZO 1/4 X 11/2	3	f	1002481	0.00	0.00	0.00	1	1
2277	33PF-23	12	TLLO EMSAMBLE 11/2-2-21/2	3	f	1002482	0.00	0.00	0.00	1	1
2278	33PF-24	12	ARANDELA 3/16	3	f	1002483	0.00	0.00	0.00	1	1
2279	33PF-25	12	PIEZA EN LASSER	3	f	1002484	0.00	0.00	0.00	1	1
2280	33PF-26	12	TLLO FLANGE 10X20	3	f	1002485	0.00	0.00	0.00	1	1
2281	33PF-27	12	GUASA 10MM	3	f	1002486	0.00	0.00	0.00	1	1
2282	33PF-28	12	TUERCA HEX 10MM	3	f	1002487	0.00	0.00	0.00	1	1
2283	33PF-30	12	TLLO GALV HEX 5/8 x 3	3	f	1002488	0.00	0.00	0.00	1	1
2284	33PF-31	12	CHAPETA 5X5	3	f	1002489	0.00	0.00	0.00	1	1
2285	33PF-32	12	CHAPETA 4X4	3	f	1002490	0.00	0.00	0.00	1	1
2286	33PF-33	12	PORTADIABLO 	3	f	1002491	0.00	0.00	0.00	1	1
2287	33PF-34	12	CANDADODE 60MM	3	f	1002492	0.00	0.00	0.00	1	1
2288	33PF-35	12	HOJA DE SIERRA/SEGUETA	3	f	1002493	0.00	0.00	0.00	1	1
2289	33PF-36	12	LIMA TRIANGULAR C/M	3	f	1002494	0.00	0.00	0.00	1	1
2290	33PF-37	12	LLAVE TUBO 24	3	f	1002495	0.00	0.00	0.00	1	1
2291	33PF-38	12	MARCO SIERRA  12	3	f	1002496	0.00	0.00	0.00	1	1
2292	33PF-39	12	MARTILLO MANGO 29MM	3	f	1002497	0.00	0.00	0.00	1	1
2293	33PF-40	12	PATECABRA 	3	f	1002498	0.00	0.00	0.00	1	1
2294	33PF-41	12	VARILLA ROSC ZINCADA 3/8	3	f	1002499	0.00	0.00	0.00	1	1
2295	33PF-42	12	TUERCA HEX 3/8-16	3	f	1002500	0.00	0.00	0.00	1	1
2296	33PF-43	12	ARANDELA PLANA 3/8	3	f	1002501	0.00	0.00	0.00	1	1
2297	33PF-44	12	ARANDELA PLANA 5/16	3	f	1002502	0.00	0.00	0.00	1	1
2298	33PF-45	12	PUNTILLA C/C 5 X 500 50LBS	3	f	1002503	0.00	0.00	0.00	1	1
2299	33PF-46	12	CLAVO VARETA CORSAN 5	3	f	1002504	0.00	0.00	0.00	1	1
2300	33PF-47	12	GEOMEMBRANA 40MILS	3	f	1002505	0.00	0.00	0.00	1	1
2301	33PF-48	12	BROCA PARA BERBIQUI 1/2	3	f	1002506	0.00	0.00	0.00	1	1
2302	33PF-49	12	BROCA PARA BERBIQUI 3/8	3	f	1002507	0.00	0.00	0.00	1	1
2303	33PF-50	12	BROCA PARA BERBIQUI 5/16	3	f	1002508	0.00	0.00	0.00	1	1
2304	33PF-51	12	BARRETON	3	f	1002509	0.00	0.00	0.00	1	1
2305	33PF-52	12	ALICATE DIABLO	3	f	1002510	0.00	0.00	0.00	1	1
2306	33PF-53	12	CARRETA BUGUI	3	f	1002511	0.00	0.00	0.00	1	1
2307	33PF-54	12	HACHA	3	f	1002512	0.00	0.00	0.00	1	1
2308	33PF-55	12	BERBIQUI	3	f	1002513	0.00	0.00	0.00	1	1
2309	33PF-56	12	CHAZO PLASTICO 1/4 x 1 1/4	3	f	1002514	0.00	0.00	0.00	1	1
2310	33PF-57	12	DISCO CORTE 4 1/2 x 7/8	3	f	1002515	0.00	0.00	0.00	1	1
2311	33PF-58	12	COVERTEX LAMINADA NATURAL 100GR ANCHO 4.00MTS	3	f	1002516	0.00	0.00	0.00	1	1
2312	33PF-59	12	TLLO BROCA 8X12	3	f	1002517	0.00	0.00	0.00	1	1
2313	33PF-60	12	FUMIGADORA CLASICA 20LT	3	f	1002518	0.00	0.00	0.00	1	1
2314	33PF-61	12	CHAZO 3/8 x 2 1/2	3	f	1002519	0.00	0.00	0.00	1	1
2315	33PF-63	12	DESBROZADORA MOTOGUADAÑA HUSQ	3	f	1002520	0.00	0.00	0.00	1	1
2316	33PF-65	12	PULVERIZADOR HUSQV	3	f	1002521	0.00	0.00	0.00	1	1
2317	33PF-68	12	CANECAS PLASTICAS 5GLS TR	3	f	1002522	0.00	0.00	0.00	1	1
2318	33PF-69	12	TORNILLO ENSAMBLE 8 x 11/2 x 100	3	f	1002523	0.00	0.00	0.00	1	1
2319	33PF-70	12	TORNILLO EMSAMBLE 6x 1/2 x 100	3	f	1002524	0.00	0.00	0.00	1	1
2320	33PF-71	12	CHAZO 5/16 X 3	3	f	1002525	0.00	0.00	0.00	1	1
2321	33PF-72	12	REJILLA 4 x4 CON FILTRO	3	f	1002526	0.00	0.00	0.00	1	1
2322	33PF-73	12	ARRANCADOR 50 AMP	3	f	1002527	0.00	0.00	0.00	1	1
2323	33PF-75	12	CABLE ENCAUCHETADO 3X12	3	f	1002528	0.00	0.00	0.00	1	1
2324	33PF-76	12	CABLE #14	3	f	1002529	0.00	0.00	0.00	1	1
2325	33PF-77	12	ARRANCADOR 17-25	3	f	1002530	0.00	0.00	0.00	1	1
2326	33PF-78	12	CINTA AISLANTE	3	f	1002531	0.00	0.00	0.00	1	1
2327	33PF-80	12	CANECA PLASTICA 15 GL	3	f	1002532	0.00	0.00	0.00	1	1
2328	33PF-81	12	MANILA ROLLO X250	3	f	1002533	0.00	0.00	0.00	1	1
2329	33PF-82	12	A G2 3/8*1	3	f	1002534	0.00	0.00	0.00	1	1
2330	33PF-83	12	ALICATE 8	3	f	1002535	0.00	0.00	0.00	1	1
2331	33PF-84	12	PALA DRAGA MANGO MADERA	3	f	1002536	0.00	0.00	0.00	1	1
2332	33PF-85	12	PALA DRAGA MANGO METALICO	3	f	1002537	0.00	0.00	0.00	1	1
2333	33PF-86	12	CANECAS METALICA DE 55 GLS	3	f	1002538	0.00	0.00	0.00	1	1
2334	33PF-87	12	CANECAS PLASTICA DE 30GLS 	3	f	1002539	0.00	0.00	0.00	1	1
2335	33PF-88	12	GRASAPOWERFULL	3	f	1002540	0.00	0.00	0.00	1	1
2336	33PF-89	12	TORNILLO ENSAMBLE 6 X 1 X 100	3	f	1002541	0.00	0.00	0.00	1	1
2337	33PF-90	12	LLAVE EN Y 10 12 14	3	f	1002542	0.00	0.00	0.00	1	1
2338	33PF-91	12	LLAVE MIXTA 10MM	3	f	1002543	0.00	0.00	0.00	1	1
2339	33PF-92	12	TLLO AUTOPERFORANTE 10-11/2	3	f	1002544	0.00	0.00	0.00	1	1
2340	33PF-93	12	BROCA ESPADA 1/2	3	f	1002545	0.00	0.00	0.00	1	1
2341	33PF-94	12	TLLO 8X1	3	f	1002546	0.00	0.00	0.00	1	1
2342	33PF-95	12	TLLO 8X 11/2	3	f	1002547	0.00	0.00	0.00	1	1
2343	33PF-96	12	CUCHILLA GUADAÑA 351625 BELLOTA	3	f	1002548	0.00	0.00	0.00	1	1
2344	33PF-97	12	CUCHILLA GUADAÑA 35X20 BELLOTA	3	f	1002549	0.00	0.00	0.00	1	1
2345	33PF-98	12	AHOYADORA 541 HUSQVARNA	3	f	1002550	0.00	0.00	0.00	1	1
2346	33PF-99	12	FUMIGADORA SEMBRADORA 362D 28 HUSQ	3	f	1002551	0.00	0.00	0.00	1	1
2347	34EF-01	12	UNION ELECTROFUSIÓN PEAD 110MM	3	f	1002552	0.00	0.00	0.00	1	1
2348	99VAR-01	12	POLISOMBRA 80% 4.2MT x MT	2	f	1002553	0.00	0.00	0.00	1	1
2349	99VAR-02	14	CANECA 55 GLN X UND SELLADA	2	f	1002554	0.00	0.00	0.00	1	1
2350	99VAR-03	12	WINCHE MALACATE 1000KG TRUPER	3	f	1002555	0.00	0.00	0.00	1	1
2351	99VAR-04	12	BROCA HSS 7/16 IRWIN	3	f	1002556	0.00	0.00	0.00	1	1
2352	99VAR-05	12	BROCA HSS 5/16 IRWIN	3	f	1002557	0.00	0.00	0.00	1	1
2353	99VAR-06	12	SIERRA NICHOLSON 12	3	f	1002558	0.00	0.00	0.00	1	1
2354	99VAR-07	12	ENCAUCHETADO 4x14 AWG	3	f	1002559	0.00	0.00	0.00	1	1
2355	99VAR-08	12	WINCHE C/CABLE 2000LBS	3	f	1002560	0.00	0.00	0.00	1	1
2356	99VAR-09	12	PLUVIOMETRO MEDIDOR LLUVIA	3	f	1002561	0.00	0.00	0.00	1	1
2357	99VAR-10	12	CABLE ALMA FIBRA 1/8 GALV	3	f	1002562	0.00	0.00	0.00	1	1
2358	99VAR-100	12	BASE METALICA DIFERENCIAL	3	f	1002563	0.00	0.00	0.00	1	1
2359	99VAR-101	12	MALLA ESLAB. C 10 DE 2 OJO	3	f	1002564	0.00	0.00	0.00	1	1
2360	99VAR-102	12	TLLO GALV HEX 1/2 x 2-1/2	3	f	1002565	0.00	0.00	0.00	1	1
2361	99VAR-103	12	TUERCA GALV 1/2	3	f	1002566	0.00	0.00	0.00	1	1
2362	99VAR-104	12	ARANDELA GALV 1/2	3	f	1002567	0.00	0.00	0.00	1	1
2363	99VAR-105	12	WASA GALV 1/2	3	f	1002568	0.00	0.00	0.00	1	1
2364	99VAR-11	12	GRILLETE 3/16	3	f	1002569	0.00	0.00	0.00	1	1
2365	99VAR-110	12	ACOPLE SH40 A/C GRAF+TERMOF 110M	3	f	1002570	0.00	0.00	0.00	1	1
2366	99VAR-12	12	CABLE CENTELFLEX ENCAUCHETADO 4x8 CELTELSA	3	f	1002571	0.00	0.00	0.00	1	1
2367	99VAR-13	12	CAJA HERRAMIENTAS PQ	3	f	1002572	0.00	0.00	0.00	1	1
2368	99VAR-14	12	ESTACA GANADERA x 1,2MT	3	f	1002573	0.00	0.00	0.00	1	1
2369	99VAR-15	12	JUEGO DESTORNILLADOR SENCILLO	3	f	1002574	0.00	0.00	0.00	1	1
2370	99VAR-16	12	LLAVE DE AGUA No. 12	3	f	1002575	0.00	0.00	0.00	1	1
2371	99VAR-17	12	HOMBRE SOLO DE CADENA	3	f	1002576	0.00	0.00	0.00	1	1
2372	99VAR-18	12	TIJERA CORTA PVC 	3	f	1002577	0.00	0.00	0.00	1	1
2373	99VAR-19	12	CONECTOR TUBULAR 8 AWG	3	f	1002578	0.00	0.00	0.00	1	1
2374	99VAR-20	12	GABINETE METALICO 40x40x20 CBN	3	f	1002579	0.00	0.00	0.00	1	1
2375	99VAR-21	12	RIEL OMEGA PERFORADOR	3	f	1002580	0.00	0.00	0.00	1	1
2376	99VAR-22	12	PISTOLA AGUA METALICA	3	f	1002581	0.00	0.00	0.00	1	1
2377	99VAR-23	12	ESTOPA LIMPIEZA	3	f	1002582	0.00	0.00	0.00	1	1
2378	99VAR-24	12	PAQUETE AMARRES PLASTICAS	3	f	1002583	0.00	0.00	0.00	1	1
2379	99VAR-25	12	ANÁLISIS FISICOQUÍMICO DE AGUA COMPLETO	3	f	1002584	0.00	0.00	0.00	1	1
2380	99VAR-27	12	GLICERINA USP 1.9L	3	f	1002585	0.00	0.00	0.00	1	1
2381	99VAR-28	12	WINCHE C/CABLE 600 LBS TRUPER	3	f	1002586	0.00	0.00	0.00	1	1
2382	99VAR-29	12	GABINETE METÁLICO 40X40X25	3	f	1002587	0.00	0.00	0.00	1	1
2383	99VAR-30	12	GRILLETE 1/8 TIPO PESADO	3	f	1002588	0.00	0.00	0.00	1	1
2384	99VAR-31	12	TENSOR 1/4	3	f	1002589	0.00	0.00	0.00	1	1
2385	99VAR-32	12	WINCHE C/CABLE 3000 LBS	3	f	1002590	0.00	0.00	0.00	1	1
2386	99VAR-33	12	TORNILLO ENSAMBLE 6x 11/2 x100 	3	f	1002591	0.00	0.00	0.00	1	1
2387	99VAR-34	12	CAJA RECTANGULAR CONTADOR	3	f	1002592	0.00	0.00	0.00	1	1
2388	99VAR-35	12	POST EN BRUT DESCORTEZADO 8 x 5 CM	3	f	1002593	0.00	0.00	0.00	1	1
2389	99VAR-38	12	TLLO GALV HEX 5/8 x 2-1/2	3	f	1002594	0.00	0.00	0.00	1	1
2390	99VAR-39	12	TLLO GALV HEX 5/8 3-1/2	3	f	1002595	0.00	0.00	0.00	1	1
2391	99VAR-40	12	TIJERA FLORICULTURA 8 DE ACERO	3	f	1002596	0.00	0.00	0.00	1	1
2392	99VAR-41	12	TUERCA GALV 5/8	3	f	1002597	0.00	0.00	0.00	1	1
2393	99VAR-42	12	ARANDELA GALV 5/8	3	f	1002598	0.00	0.00	0.00	1	1
2394	99VAR-43	12	WASA GALV 5/8	3	f	1002599	0.00	0.00	0.00	1	1
2395	99VAR-44	12	LLAVE DOBLE PP DE 40MM X 63MM	3	f	1002600	0.00	0.00	0.00	1	1
2396	99VAR-45	12	TLLO EMSAMBLE 7x2	3	f	1002601	0.00	0.00	0.00	1	1
2397	99VAR-46	12	TLLO EMSAMBLE 6x2	3	f	1002602	0.00	0.00	0.00	1	1
2398	99VAR-47	12	MALLA SOMBRA NEGRO 80% CL4,20x100	3	f	1002603	0.00	0.00	0.00	1	1
2399	99VAR-48	12	CABLE ALMA ACERO 1/4 GAL	3	f	1002604	0.00	0.00	0.00	1	1
2400	99VAR-49	12	GRILLETE 5/16	3	f	1002605	0.00	0.00	0.00	1	1
2401	99VAR-50	12	TENSOR 1/2	3	f	1002606	0.00	0.00	0.00	1	1
2402	99VAR-51	12	MANGUERA CAL 40 2 X100 MT	2	f	1002607	0.00	0.00	0.00	1	1
2403	99VAR-52	12	MANGUERA CAL 40 1 1/2 X100 MT	2	f	1002608	0.00	0.00	0.00	1	1
2404	99VAR-53	12	LLAVE DOBLE PP 20MMX63MM	3	f	1002609	0.00	0.00	0.00	1	1
2405	99VAR-54	12	POSTE BRUTP DESALB TRATADO 12CMx 600CMS	3	f	1002610	0.00	0.00	0.00	1	1
2406	99VAR-55	12	GABINETE METÁLICO 60 x40 x25 CMS	3	f	1002611	0.00	0.00	0.00	1	1
2407	99VAR-56	12	GABINETE METÁLICO 50x 40 x 25 CMS	3	f	1002612	0.00	0.00	0.00	1	1
2408	99VAR-57	12	FABRICACIÓN PILOTE 	3	f	1002613	0.00	0.00	0.00	1	1
2409	99VAR-58	12	PLUVIOMETRO LHAURA	3	f	1002614	0.00	0.00	0.00	1	1
2410	99VAR-59	12	POST EN BRUT DESCORTEZADO 3CM  	3	f	1002615	0.00	0.00	0.00	1	1
2411	99VAR-60	12	HIPOCLORITO SODIO 15% G X 24KL	3	f	1002616	0.00	0.00	0.00	1	1
2412	99VAR-61	12	PASTILLAS REXCHLOR CLORO 20GR 90-91%	3	f	1002617	0.00	0.00	0.00	1	1
2413	99VAR-62	12	PRISIONERO 5/16	3	f	1002618	0.00	0.00	0.00	1	1
2414	99VAR-63	12	ACEITE	3	f	1002619	0.00	0.00	0.00	1	1
2415	99VAR-64	12	INSUMOS	3	f	1002620	0.00	0.00	0.00	1	1
2416	99VAR-65	14	CANECA PLASTICA 55 GL TAPA ARAÑA	2	f	1002621	0.00	0.00	0.00	1	1
2417	99VAR-66	12	PLANCHA TERMOFUSION 20MM-63MM 229V	3	f	1002622	0.00	0.00	0.00	1	1
2418	99VAR-67	12	ESTIBA PLÁSTICA	3	f	1002623	0.00	0.00	0.00	1	1
2419	99VAR-68	12	GABINETE METALICO 90 x 60 x 30 CMS	3	f	1002624	0.00	0.00	0.00	1	1
2420	99VAR-70	12	PRODUCTOS LAVADO DE TANQUE	3	f	1002625	0.00	0.00	0.00	1	1
2421	99VAR-72	12	ARANDELA NEOPRENO	3	f	1002626	0.00	0.00	0.00	1	1
2422	99VAR-73	12	MATERIALES DE CONSTRUCCIÓN	3	f	1002627	0.00	0.00	0.00	1	1
2423	99VAR-74	12	PASTILLAS REXCHLOR CLORO 200GR 90-91% X KG	3	f	1002628	0.00	0.00	0.00	1	1
2424	99VAR-75	12	CLORINADOR  FLOTANTE(PATO) 3	3	f	1002629	0.00	0.00	0.00	1	1
2425	99VAR-76	12	APOYO PUBLICITARIO	3	f	1002630	0.00	0.00	0.00	1	1
2426	99VAR-77	12	CLORADOR FLOTANTE	3	f	1002631	0.00	0.00	0.00	1	1
2427	99VAR-78	12	HIPOCLORITO PASTIÑÑAS 91% KG	3	f	1002632	0.00	0.00	0.00	1	1
2428	99VAR-79	12	SILICONA	3	f	1002633	0.00	0.00	0.00	1	1
2429	99VAR-80	12	ALMA ACERO 3/16 X MT	3	f	1002634	0.00	0.00	0.00	1	1
2430	99VAR-81	12	TLLO  8*11/4	3	f	1002635	0.00	0.00	0.00	1	1
2431	99VAR-82	12	GABINETE METALICO 50 x 40 x 20 CMS	3	f	1002636	0.00	0.00	0.00	1	1
2432	99VAR-83	12	POST EN BRUT DESCORTEZADO 12x 250 CM	3	f	1002637	0.00	0.00	0.00	1	1
2433	99VAR-84	12	DESENGRASANTE JOM X LT	3	f	1002638	0.00	0.00	0.00	1	1
2434	99VAR-85	12	DESENGRASANTE X 3800 ML	3	f	1002639	0.00	0.00	0.00	1	1
2435	99VAR-86	12	ACCESORIOS SEGURIDAD	3	f	1002640	0.00	0.00	0.00	1	1
2436	99VAR-87	12	MANGUERA POLIETILENO 1/2	3	f	1002641	0.00	0.00	0.00	1	1
2437	99VAR-88	12	VASELINA X LIBRA	3	f	1002642	0.00	0.00	0.00	1	1
2438	99VAR-89	12	PORTE EN BRUTO DESCORTEZADO TRATADO 12X235-260	3	f	1002643	0.00	0.00	0.00	1	1
2439	99VAR-90	12	POSTE EN BRUTO DESALBURADO GANADERO TRTT 3CMX300CM	3	f	1002644	0.00	0.00	0.00	1	1
2440	99VAR-91	12	TABLA PLÁSTICA RF 10,5X2.4X300 CMS	3	f	1002645	0.00	0.00	0.00	1	1
2441	99VAR-92	12	ESTACON 4X300	3	f	1002646	0.00	0.00	0.00	1	1
2442	99VAR-93	12	TAPA RECIPIENTE NUEVA RM-202X	3	f	1002647	0.00	0.00	0.00	1	1
2443	99VAR-94	12	ACEITE STHIL 1 GL	3	f	1002648	0.00	0.00	0.00	1	1
2444	99VAR-95	12	REFRIGERANTE VERDE GL	3	f	1002649	0.00	0.00	0.00	1	1
2445	99VAR-96	12	CLORO PASTAS X 1000GR	3	f	1002650	0.00	0.00	0.00	1	1
2446	99VAR-97	12	VIATICOS	3	f	1002651	0.00	0.00	0.00	1	1
2447	99VAR-98	12	COLADERA 3	3	f	1002652	0.00	0.00	0.00	1	1
2448	99VAR-99	12	CABLE ALMA DE FIBRA 3/16	3	f	1002653	0.00	0.00	0.00	1	1
2449	31PE-19	12	CABLE ENCAUCHETADO 2x14 NEGRO	3	f	1002358	0.00	0.00	0.00	1	1
2451	11ARBAY-02	6	BAYONETA 3/4 SAB	2	f	1005	0.00	0.00	0.00	1	1
2452	11ARCOD-01	6	CODO RAPIDO 110mm INTER	2	f	1006	0.00	0.00	0.00	1	1
2453	11ARCOD-02	6	CODO RAPIDO 16mm INTER	2	f	1007	0.00	0.00	0.00	1	1
2455	11ARCOD-04	6	CODO RAPIDO 20mm SAB	2	f	1009	0.00	0.00	0.00	1	1
2456	11ARCOD-05	6	CODO RAPIDO 25mm INTER	2	f	10010	0.00	0.00	0.00	1	1
2457	11ARCOD-06	6	CODO RAPIDO 32mm INTER	2	f	10011	0.00	0.00	0.00	1	1
2458	11ARCOD-07	6	CODO RAPIDO 32mm SAB	2	f	10012	0.00	0.00	0.00	1	1
2459	11ARCOD-08	6	CODO RAPIDO 40mm INTER	2	f	10013	0.00	0.00	0.00	1	1
2460	11ARCOD-09	6	CODO RAPIDO 40mm SAB	2	f	10014	0.00	0.00	0.00	1	1
2461	11ARCOD-10	6	CODO RAPIDO 50mm INTER	2	f	10015	0.00	0.00	0.00	1	1
2462	11ARCOD-11	6	CODO RAPIDO 63mm INTER	2	f	10016	0.00	0.00	0.00	1	1
2463	11ARCOD-12	6	CODO RAPIDO 63mm SAB	2	f	10017	0.00	0.00	0.00	1	1
2464	11ARCOD-13	6	CODO RAPIDO 75mm INTER	2	f	10018	0.00	0.00	0.00	1	1
2465	11ARCOD-14	6	CODO RAPIDO 90mm INTER	2	f	10019	0.00	0.00	0.00	1	1
2466	11ARCOD-15	6	CODO RAPIDO 90mm ERA	2	f	10020	0.00	0.00	0.00	1	1
2467	11ARCOD-16	6	CODO RAPIDO 20mm ERA	2	f	10021	0.00	0.00	0.00	1	1
2468	11ARCOD-17	6	CODO RAPIDO 25mm ERA	2	f	10022	0.00	0.00	0.00	1	1
2469	11ARCOD-18	6	CODO RAPIDO 25mm SAB	2	f	10023	0.00	0.00	0.00	1	1
2470	11ARCOD-19	6	CODO RAPIDO 32mm ERA	2	f	10024	0.00	0.00	0.00	1	1
2471	11ARCOD-20	6	CODO RAPIDO 50mm ERA	2	f	10025	0.00	0.00	0.00	1	1
2472	11ARCOD-21	6	CODO RAPIDO 63mm ERA	2	f	10026	0.00	0.00	0.00	1	1
2473	11ARCOLL-01	6	COLLAR DERIVACION RAPIDO  110X2 SAB	2	f	10027	0.00	0.00	0.00	1	1
2474	11ARCOLL-02	6	COLLAR DERIVACION RAPIDO  110X3/4 SAB	2	f	10028	0.00	0.00	0.00	1	1
2475	11ARCOLL-03	6	COLLAR DERIVACION RAPIDO  160X1 1/4 SAB	2	f	10029	0.00	0.00	0.00	1	1
2476	11ARCOLL-04	6	COLLAR DERIVACION RAPIDO  160X1/2 SAB	2	f	10030	0.00	0.00	0.00	1	1
2477	11ARCOLL-05	6	COLLAR DERIVACION RAPIDO  160X3/4 SAB	2	f	10031	0.00	0.00	0.00	1	1
2478	11ARCOLL-06	6	COLLAR DERIVACION RAPIDO  25X3/4 SAB	2	f	10032	0.00	0.00	0.00	1	1
2479	11ARCOLL-07	6	COLLAR DERIVACION RAPIDO  32X1 SAB	2	f	10033	0.00	0.00	0.00	1	1
2480	11ARCOLL-08	6	COLLAR DERIVACION RAPIDO  32X3/4 SAB	2	f	10034	0.00	0.00	0.00	1	1
2481	11ARCOLL-09	6	COLLAR DERIVACION RAPIDO  40X 3/4 SAB	2	f	10035	0.00	0.00	0.00	1	1
2482	11ARCOLL-10	6	COLLAR DERIVACION RAPIDO  40X1	2	f	10036	0.00	0.00	0.00	1	1
2483	11ARCOLL-100	6	COLLAR DERIVACION RAPIDO 75 X 2 INTER	2	f	10037	0.00	0.00	0.00	1	1
2484	11ARCOLL-101	6	COLLAR DERIVACION RAPIDO 75 X 2 ERA	2	f	10038	0.00	0.00	0.00	1	1
2485	11ARCOLL-102	6	COLLAR DERIVACION RAPIDO 75 X 3/4 INTER	2	f	10039	0.00	0.00	0.00	1	1
2486	11ARCOLL-103	6	COLLAR DERIVACION RAPIDO 75 X 3/4 ERA	2	f	10040	0.00	0.00	0.00	1	1
2489	11ARCOLL-106	6	COLLAR DERIVACION RAPIDO 90 X 1 INTER	2	f	10043	0.00	0.00	0.00	1	1
2490	11ARCOLL-107	6	COLLAR DERIVACION RAPIDO 90 X 1 ERA	2	f	10044	0.00	0.00	0.00	1	1
2492	11ARCOLL-109	6	COLLAR DERIVACION RAPIDO 90 X 1/2 ERA	2	f	10046	0.00	0.00	0.00	1	1
2493	11ARCOLL-11	6	COLLAR DERIVACION RAPIDO  40X1/2 SAB	2	f	10047	0.00	0.00	0.00	1	1
2494	11ARCOLL-110	6	COLLAR DERIVACION RAPIDO 90 X 1/4 INTER	2	f	10048	0.00	0.00	0.00	1	1
2495	11ARCOLL-111	6	COLLAR DERIVACION RAPIDO 90 X 1/4 ERA	2	f	10049	0.00	0.00	0.00	1	1
2496	11ARCOLL-112	6	COLLAR DERIVACION RAPIDO 90 X 2 INTER	2	f	10050	0.00	0.00	0.00	1	1
2497	11ARCOLL-113	6	COLLAR DERIVACION RAPIDO 90 X 2 ERA	2	f	10051	0.00	0.00	0.00	1	1
2498	11ARCOLL-114	6	COLLAR DERIVACION RAPIDO 90 X 3 INTER	2	f	10052	0.00	0.00	0.00	1	1
2499	11ARCOLL-115	6	COLLAR DERIVACION RAPIDO 90 X 3 ERA	2	f	10053	0.00	0.00	0.00	1	1
2500	11ARCOLL-116	6	COLLAR DERIVACION RAPIDO 90 X 3/4 INTER	2	f	10054	0.00	0.00	0.00	1	1
2501	11ARCOLL-117	6	COLLAR DERIVACION RAPIDO 90 X 3/4 ERA	2	f	10055	0.00	0.00	0.00	1	1
2502	11ARCOLL-118	6	COLLAR DERIVACION RAPIDO CON REFUERZO 32 x 1/2 AQP	2	f	10056	0.00	0.00	0.00	1	1
2503	11ARCOLL-119	6	COLLAR DERIVACION RAPIDO CON REFUERZO 50 x 1/2 AQP	2	f	10057	0.00	0.00	0.00	1	1
2504	11ARCOLL-12	6	COLLAR DERIVACION RAPIDO  63X1 1/4 SAB	2	f	10058	0.00	0.00	0.00	1	1
2505	11ARCOLL-120	6	COLLAR DERIVACION RAPIDO CON REFUERZO 50 x 3/4 AQP	2	f	10059	0.00	0.00	0.00	1	1
2506	11ARCOLL-121	6	COLLAR DERIVACION RAPIDO CON REFUERZO 50 x 1 AQP	2	f	10060	0.00	0.00	0.00	1	1
2507	11ARCOLL-122	6	COLLAR DERIVACION RAPIDO CON REFUERZO 63 x 1/2 AQP	2	f	10061	0.00	0.00	0.00	1	1
2508	11ARCOLL-123	6	COLLAR DERIVACION RAPIDO CON REFUERZO 63 x 3/4 AQP	2	f	10062	0.00	0.00	0.00	1	1
2509	11ARCOLL-124	6	COLLAR DERIVACION RAPIDO CON REFUERZO 63 x 11/2 AQP	2	f	10063	0.00	0.00	0.00	1	1
2510	11ARCOLL-125	6	COLLAR DERIVACION RAPIDO CON REFUERZO 90 x 1/2 AQP	2	f	10064	0.00	0.00	0.00	1	1
2511	11ARCOLL-126	6	COLLAR DERIVACION RAPIDO CON REFUERZO 90 x 3/4 AQP	2	f	10065	0.00	0.00	0.00	1	1
2491	11ARCOLL-108	6	COLLAR DERIVACION RAPIDO 90 X 1/2 INTER	2	f	10045	0.00	0.00	0.00	1	1
2512	11ARCOLL-127	6	COLLAR DERIVACION RAPIDO CON REFUERZO 90 x 1 AQP	2	f	10066	0.00	0.00	0.00	1	1
2513	11ARCOLL-128	6	COLLAR DERIVACION RAPIDO CON REFUERZO 110 x 1/2 AQP	2	f	10067	0.00	0.00	0.00	1	1
2514	11ARCOLL-129	6	COLLAR DERIVACION RAPIDO CON REFUERZO 110 x 2 AQP	2	f	10068	0.00	0.00	0.00	1	1
2515	11ARCOLL-13	6	COLLAR DERIVACION RAPIDO  75X1 1/4 SAB	2	f	10069	0.00	0.00	0.00	1	1
2516	11ARCOLL-130	6	COLLAR DERIVACION RAPIDO  63X1  SAB	2	f	10070	0.00	0.00	0.00	1	1
2517	11ARCOLL-131	6	COLLAR DERIVACION RAPIDO  160X1 1/2 SAB	2	f	10071	0.00	0.00	0.00	1	1
2518	11ARCOLL-132	6	COLLAR DERIVACION RAPIDO  75X3/4 SAB	2	f	10072	0.00	0.00	0.00	1	1
2519	11ARCOLL-133	6	COLLAR DERIVACION RAPIDO  63X1/2 SAB	2	f	10073	0.00	0.00	0.00	1	1
2520	11ARCOLL-134	6	COLLAR DERIVACION RAPIDO CON REFUERZO 25 X 1/2 AQP	2	f	10074	0.00	0.00	0.00	1	1
2521	11ARCOLL-135	6	COLLAR DERIVACION RAPIDO CON REFUERZO 25 X 3/4 AQP	2	f	10075	0.00	0.00	0.00	1	1
2522	11ARCOLL-136	6	COLLAR DERIVACION RAPIDO CON REFUERZO 32 X 3/4 AQP	2	f	10076	0.00	0.00	0.00	1	1
2523	11ARCOLL-137	6	COLLAR DERIVACION RAPIDO CON REFUERZO 50 X 11/4 AQP	2	f	10077	0.00	0.00	0.00	1	1
2524	11ARCOLL-138	6	COLLAR DERIVACION RAPIDO CON REFUERZO 63 X 1 AQP	2	f	10078	0.00	0.00	0.00	1	1
2525	11ARCOLL-139	6	COLLAR DERIVACION RAPIDO CON REFUERZO 90 X 1 1/2 AQP	2	f	10079	0.00	0.00	0.00	1	1
2526	11ARCOLL-14	6	COLLAR DERIVACION RAPIDO  75X1 SAB	2	f	10080	0.00	0.00	0.00	1	1
2527	11ARCOLL-140	6	COLLAR DERIVACION RAPIDO CON REFUERZO 90 X 2 AQP	2	f	10081	0.00	0.00	0.00	1	1
2528	11ARCOLL-141	6	COLLAR DERIVACION RAPIDO CON REFUERZO 110 X 3/4 AQP	2	f	10082	0.00	0.00	0.00	1	1
2529	11ARCOLL-142	6	COLLAR DERIVACION RAPIDO CON REFUERZO 110 X 1 AQP	2	f	10083	0.00	0.00	0.00	1	1
2530	11ARCOLL-143	6	COLLAR DERIVACION RAPIDO CON REFUERZO 110 X 1 1/2 AQP	2	f	10084	0.00	0.00	0.00	1	1
2531	11ARCOLL-145	6	COLLAR DERIVACION RAPIDO  32X1/2 SAB	2	f	10085	0.00	0.00	0.00	1	1
2532	11ARCOLL-15	6	COLLAR DERIVACION RAPIDO  75X2 SAB	2	f	10086	0.00	0.00	0.00	1	1
2533	11ARCOLL-16	6	COLLAR DERIVACION RAPIDO  90X1 1/2 SAB	2	f	10087	0.00	0.00	0.00	1	1
2534	11ARCOLL-17	6	COLLAR DERIVACION RAPIDO  90X1 1/4 SAB	2	f	10088	0.00	0.00	0.00	1	1
2535	11ARCOLL-18	6	COLLAR DERIVACION RAPIDO 110 X 1 1/2 INTER	2	f	10089	0.00	0.00	0.00	1	1
2536	11ARCOLL-19	6	COLLAR DERIVACION RAPIDO 110 X 1 1/2 ERA	2	f	10090	0.00	0.00	0.00	1	1
2537	11ARCOLL-20	6	COLLAR DERIVACION RAPIDO 110 X 1 INTER	2	f	10091	0.00	0.00	0.00	1	1
2538	11ARCOLL-21	6	COLLAR DERIVACION RAPIDO 110 X 1 ERA	2	f	10092	0.00	0.00	0.00	1	1
2539	11ARCOLL-22	6	COLLAR DERIVACION RAPIDO 110 X 1/2 INTER	2	f	10093	0.00	0.00	0.00	1	1
2540	11ARCOLL-23	6	COLLAR DERIVACION RAPIDO 110 X 1/2 ERA	2	f	10094	0.00	0.00	0.00	1	1
2541	11ARCOLL-24	6	COLLAR DERIVACION RAPIDO 110 X 1/4 INTER	2	f	10095	0.00	0.00	0.00	1	1
2542	11ARCOLL-25	6	COLLAR DERIVACION RAPIDO 110 X 1/4 ERA	2	f	10096	0.00	0.00	0.00	1	1
2543	11ARCOLL-26	6	COLLAR DERIVACION RAPIDO 110 X 2 INTER	2	f	10097	0.00	0.00	0.00	1	1
2544	11ARCOLL-27	6	COLLAR DERIVACION RAPIDO 110 X 2 ERA	2	f	10098	0.00	0.00	0.00	1	1
2545	11ARCOLL-28	6	COLLAR DERIVACION RAPIDO 110 X 3 INTER	2	f	10099	0.00	0.00	0.00	1	1
2546	11ARCOLL-29	6	COLLAR DERIVACION RAPIDO 110 X 3 ERA	2	f	100100	0.00	0.00	0.00	1	1
2547	11ARCOLL-30	6	COLLAR DERIVACION RAPIDO 110 X 3/4 INTER	2	f	100101	0.00	0.00	0.00	1	1
2548	11ARCOLL-31	6	COLLAR DERIVACION RAPIDO 110 X 3/4 ERA	2	f	100102	0.00	0.00	0.00	1	1
2549	11ARCOLL-32	6	COLLAR DERIVACION RAPIDO 110X1 1/2 SAB	2	f	100103	0.00	0.00	0.00	1	1
2550	11ARCOLL-33	6	COLLAR DERIVACION RAPIDO 110X1 1/4 SAB	2	f	100104	0.00	0.00	0.00	1	1
2551	11ARCOLL-34	6	COLLAR DERIVACION RAPIDO 160 X 1 1/2 INTER	2	f	100105	0.00	0.00	0.00	1	1
2552	11ARCOLL-35	6	COLLAR DERIVACION RAPIDO 160 X 1 1/2 ERA	2	f	100106	0.00	0.00	0.00	1	1
2553	11ARCOLL-36	6	COLLAR DERIVACION RAPIDO 160 X 1 1/4 INTER	2	f	100107	0.00	0.00	0.00	1	1
2554	11ARCOLL-37	6	COLLAR DERIVACION RAPIDO 160 X 1 INTER	2	f	100108	0.00	0.00	0.00	1	1
2555	11ARCOLL-38	6	COLLAR DERIVACION RAPIDO 160 X 1 ERA	2	f	100109	0.00	0.00	0.00	1	1
2556	11ARCOLL-39	6	COLLAR DERIVACION RAPIDO 160 X 1/2 INTER	2	f	100110	0.00	0.00	0.00	1	1
2557	11ARCOLL-40	6	COLLAR DERIVACION RAPIDO 160 X 1/2 ERA	2	f	100111	0.00	0.00	0.00	1	1
2558	11ARCOLL-41	6	COLLAR DERIVACION RAPIDO 160 X 1/4 ERA	2	f	100112	0.00	0.00	0.00	1	1
2559	11ARCOLL-42	6	COLLAR DERIVACION RAPIDO 160 X 2 INTER	2	f	100113	0.00	0.00	0.00	1	1
2560	11ARCOLL-43	6	COLLAR DERIVACION RAPIDO 160 X 2 ERA	2	f	100114	0.00	0.00	0.00	1	1
2561	11ARCOLL-44	6	COLLAR DERIVACION RAPIDO 160 X 3/4 INTER	2	f	100115	0.00	0.00	0.00	1	1
2562	11ARCOLL-45	6	COLLAR DERIVACION RAPIDO 160 X 3/4 ERA	2	f	100116	0.00	0.00	0.00	1	1
2563	11ARCOLL-46	6	COLLAR DERIVACION RAPIDO 20 X 1/2 INTER	2	f	100117	0.00	0.00	0.00	1	1
2564	11ARCOLL-47	6	COLLAR DERIVACION RAPIDO 20 X 1/2 ERA	2	f	100118	0.00	0.00	0.00	1	1
2565	11ARCOLL-48	6	COLLAR DERIVACION RAPIDO 25 X 1 INTER	2	f	100119	0.00	0.00	0.00	1	1
2566	11ARCOLL-49	6	COLLAR DERIVACION RAPIDO 25 X 1 ERA	2	f	100120	0.00	0.00	0.00	1	1
2567	11ARCOLL-50	6	COLLAR DERIVACION RAPIDO 25 X 1/2 INTER	2	f	100121	0.00	0.00	0.00	1	1
2568	11ARCOLL-51	6	COLLAR DERIVACION RAPIDO 25 X 1/2 ERA	2	f	100122	0.00	0.00	0.00	1	1
2569	11ARCOLL-52	6	COLLAR DERIVACION RAPIDO 25 X 3/4 INTER	2	f	100123	0.00	0.00	0.00	1	1
2570	11ARCOLL-53	6	COLLAR DERIVACION RAPIDO 25 X 3/4 ERA	2	f	100124	0.00	0.00	0.00	1	1
2571	11ARCOLL-54	6	COLLAR DERIVACION RAPIDO 32 X 1 INTER	2	f	100125	0.00	0.00	0.00	1	1
2572	11ARCOLL-55	6	COLLAR DERIVACION RAPIDO 32 X 1 ERA	2	f	100126	0.00	0.00	0.00	1	1
2573	11ARCOLL-56	6	COLLAR DERIVACION RAPIDO 32 X 1/2 INTER	2	f	100127	0.00	0.00	0.00	1	1
2574	11ARCOLL-57	6	COLLAR DERIVACION RAPIDO 32 X 1/2 ERA	2	f	100128	0.00	0.00	0.00	1	1
2575	11ARCOLL-58	6	COLLAR DERIVACION RAPIDO 32 X 1/4 INTER	2	f	100129	0.00	0.00	0.00	1	1
2576	11ARCOLL-59	6	COLLAR DERIVACION RAPIDO 32 X 1/4 ERA	2	f	100130	0.00	0.00	0.00	1	1
2577	11ARCOLL-60	6	COLLAR DERIVACION RAPIDO 32 X 3/4 INTER	2	f	100131	0.00	0.00	0.00	1	1
2578	11ARCOLL-61	6	COLLAR DERIVACION RAPIDO 32 X 3/4 ERA	2	f	100132	0.00	0.00	0.00	1	1
2579	11ARCOLL-62	6	COLLAR DERIVACION RAPIDO 40 X 1 1/4 INTER	2	f	100133	0.00	0.00	0.00	1	1
2580	11ARCOLL-63	6	COLLAR DERIVACION RAPIDO 40 X 1 INTER	2	f	100134	0.00	0.00	0.00	1	1
2581	11ARCOLL-64	6	COLLAR DERIVACION RAPIDO 40 X 1 ERA	2	f	100135	0.00	0.00	0.00	1	1
2582	11ARCOLL-65	6	COLLAR DERIVACION RAPIDO 40 X 1/2 INTER	2	f	100136	0.00	0.00	0.00	1	1
2583	11ARCOLL-66	6	COLLAR DERIVACION RAPIDO 40 X 1/2 ERA	2	f	100137	0.00	0.00	0.00	1	1
2584	11ARCOLL-67	6	COLLAR DERIVACION RAPIDO 40 X 1/4 ERA	2	f	100138	0.00	0.00	0.00	1	1
2585	11ARCOLL-68	6	COLLAR DERIVACION RAPIDO 40 X 3/4 INTER	2	f	100139	0.00	0.00	0.00	1	1
2586	11ARCOLL-69	6	COLLAR DERIVACION RAPIDO 40 X 3/4 ERA	2	f	100140	0.00	0.00	0.00	1	1
2587	11ARCOLL-70	6	COLLAR DERIVACION RAPIDO 50 X 1 1/2 INTER	2	f	100141	0.00	0.00	0.00	1	1
2588	11ARCOLL-71	6	COLLAR DERIVACION RAPIDO 50 X 1 1/2 ERA	2	f	100142	0.00	0.00	0.00	1	1
2589	11ARCOLL-72	6	COLLAR DERIVACION RAPIDO 50 X 1 INTER	2	f	100143	0.00	0.00	0.00	1	1
2590	11ARCOLL-73	6	COLLAR DERIVACION RAPIDO 50 X 1 ERA	2	f	100144	0.00	0.00	0.00	1	1
2591	11ARCOLL-74	6	COLLAR DERIVACION RAPIDO 50 X 1/2 INTER	2	f	100145	0.00	0.00	0.00	1	1
2592	11ARCOLL-75	6	COLLAR DERIVACION RAPIDO 50 X 1/2 ERA	2	f	100146	0.00	0.00	0.00	1	1
2593	11ARCOLL-76	6	COLLAR DERIVACION RAPIDO 50 X 1/4 INTER	2	f	100147	0.00	0.00	0.00	1	1
2594	11ARCOLL-77	6	COLLAR DERIVACION RAPIDO 50 X 1/4 ERA	2	f	100148	0.00	0.00	0.00	1	1
2595	11ARCOLL-78	6	COLLAR DERIVACION RAPIDO 50 X 3/4 INTER	2	f	100149	0.00	0.00	0.00	1	1
2596	11ARCOLL-79	6	COLLAR DERIVACION RAPIDO 50 X 3/4 ERA	2	f	100150	0.00	0.00	0.00	1	1
2597	11ARCOLL-80	6	COLLAR DERIVACION RAPIDO 63 X 1 1/2 INTER	2	f	100151	0.00	0.00	0.00	1	1
2598	11ARCOLL-81	6	COLLAR DERIVACION RAPIDO 63 X 1 1/2 ERA	2	f	100152	0.00	0.00	0.00	1	1
2599	11ARCOLL-82	6	COLLAR DERIVACION RAPIDO 63 X 1 INTER	2	f	100153	0.00	0.00	0.00	1	1
2600	11ARCOLL-83	6	COLLAR DERIVACION RAPIDO 63 X 1 ERA	2	f	100154	0.00	0.00	0.00	1	1
2601	11ARCOLL-84	6	COLLAR DERIVACION RAPIDO 63 X 1/2 INTER	2	f	100155	0.00	0.00	0.00	1	1
2602	11ARCOLL-85	6	COLLAR DERIVACION RAPIDO 63 X 1/2 ERA	2	f	100156	0.00	0.00	0.00	1	1
2603	11ARCOLL-86	6	COLLAR DERIVACION RAPIDO 63 X 1/4 INTER	2	f	100157	0.00	0.00	0.00	1	1
2604	11ARCOLL-87	6	COLLAR DERIVACION RAPIDO 63 X 1/4 ERA	2	f	100158	0.00	0.00	0.00	1	1
2605	11ARCOLL-88	6	COLLAR DERIVACION RAPIDO 63 X 2 INTER	2	f	100159	0.00	0.00	0.00	1	1
2606	11ARCOLL-89	6	COLLAR DERIVACION RAPIDO 63 X 2 ERA	2	f	100160	0.00	0.00	0.00	1	1
2607	11ARCOLL-90	6	COLLAR DERIVACION RAPIDO 63 X 3/4 INTER	2	f	100161	0.00	0.00	0.00	1	1
2608	11ARCOLL-91	6	COLLAR DERIVACION RAPIDO 63 X 3/4 ERA	2	f	100162	0.00	0.00	0.00	1	1
2609	11ARCOLL-92	6	COLLAR DERIVACION RAPIDO 75 X 1 1/2 INTER	2	f	100163	0.00	0.00	0.00	1	1
2610	11ARCOLL-93	6	COLLAR DERIVACION RAPIDO 75 X 1 1/2 ERA	2	f	100164	0.00	0.00	0.00	1	1
2611	11ARCOLL-94	6	COLLAR DERIVACION RAPIDO 75 X 1 INTER	2	f	100165	0.00	0.00	0.00	1	1
2612	11ARCOLL-95	6	COLLAR DERIVACION RAPIDO 75 X 1 ERA	2	f	100166	0.00	0.00	0.00	1	1
2613	11ARCOLL-96	6	COLLAR DERIVACION RAPIDO 75 X 1/2 INTER	2	f	100167	0.00	0.00	0.00	1	1
2614	11ARCOLL-97	6	COLLAR DERIVACION RAPIDO 75 X 1/2 ERA	2	f	100168	0.00	0.00	0.00	1	1
2615	11ARCOLL-98	6	COLLAR DERIVACION RAPIDO 75 X 1/4 INTER	2	f	100169	0.00	0.00	0.00	1	1
2616	11ARCOLL-99	6	COLLAR DERIVACION RAPIDO 75 X 1/4 ERA	2	f	100170	0.00	0.00	0.00	1	1
2617	11ARHEM-01	6	HEMBRA RAPIDA 110 X 3 SAB	2	f	100171	0.00	0.00	0.00	1	1
2618	11ARHEM-02	6	HEMBRA RAPIDA 110mm (4) ERA	2	f	100172	0.00	0.00	0.00	1	1
2619	11ARHEM-03	6	HEMBRA RAPIDA 110mm X 2 1/2 INTER	2	f	100173	0.00	0.00	0.00	1	1
2620	11ARHEM-04	6	HEMBRA RAPIDA 110mm X 2 INTER	2	f	100174	0.00	0.00	0.00	1	1
2621	11ARHEM-05	6	HEMBRA RAPIDA 110mm X 3 INTER	2	f	100175	0.00	0.00	0.00	1	1
2622	11ARHEM-06	6	HEMBRA RAPIDA 16mm X 1/2 INTER	2	f	100176	0.00	0.00	0.00	1	1
2623	11ARHEM-07	6	HEMBRA RAPIDA 16mm X 3/4 INTER	2	f	100177	0.00	0.00	0.00	1	1
2624	11ARHEM-08	6	HEMBRA RAPIDA 16mm(3/8) ERA	2	f	100178	0.00	0.00	0.00	1	1
2625	11ARHEM-09	6	HEMBRA RAPIDA 16mmX 3/4 SAB	2	f	100179	0.00	0.00	0.00	1	1
2626	11ARHEM-10	6	HEMBRA RAPIDA 20 X 3/4 SAB	2	f	100180	0.00	0.00	0.00	1	1
2627	11ARHEM-11	6	HEMBRA RAPIDA 20mm (1/2) ERA	2	f	100181	0.00	0.00	0.00	1	1
2628	11ARHEM-12	6	HEMBRA RAPIDA 20mm X 3/4 INTER	2	f	100182	0.00	0.00	0.00	1	1
2629	11ARHEM-13	6	HEMBRA RAPIDA 25 X 1 SAB	2	f	100183	0.00	0.00	0.00	1	1
2630	11ARHEM-14	6	HEMBRA RAPIDA 25 X 1/2 SAB	2	f	100184	0.00	0.00	0.00	1	1
2631	11ARHEM-15	6	HEMBRA RAPIDA 25mm (3/4) ERA	2	f	100185	0.00	0.00	0.00	1	1
2632	11ARHEM-16	6	HEMBRA RAPIDA 25mm X 1/2 INTER	2	f	100186	0.00	0.00	0.00	1	1
2633	11ARHEM-17	6	HEMBRA RAPIDA 25mm x 1/2 ERA	2	f	100187	0.00	0.00	0.00	1	1
2634	11ARHEM-18	6	HEMBRA RAPIDA 32 X 3/4 SAB	2	f	100188	0.00	0.00	0.00	1	1
2635	11ARHEM-19	6	HEMBRA RAPIDA 32mm (1) ERA	2	f	100189	0.00	0.00	0.00	1	1
2636	11ARHEM-20	6	HEMBRA RAPIDA 32mm X 1 1/4 INTER	2	f	100190	0.00	0.00	0.00	1	1
2637	11ARHEM-21	6	HEMBRA RAPIDA 32mm X 1/2 INTER	2	f	100191	0.00	0.00	0.00	1	1
2638	11ARHEM-22	6	HEMBRA RAPIDA 32mm X 3/4 INTER	2	f	100192	0.00	0.00	0.00	1	1
2639	11ARHEM-23	6	HEMBRA RAPIDA 32mm x 3/4 ERA	2	f	100193	0.00	0.00	0.00	1	1
2640	11ARHEM-24	6	HEMBRA RAPIDA 40 X 1 SAB	2	f	100194	0.00	0.00	0.00	1	1
2642	11ARHEM-26	6	HEMBRA RAPIDA 40mm X 1 INTER	2	f	100196	0.00	0.00	0.00	1	1
2643	11ARHEM-27	6	HEMBRA RAPIDA 40mm X 3/4 INTER	2	f	100197	0.00	0.00	0.00	1	1
2644	11ARHEM-28	6	HEMBRA RAPIDA 50 X 1 1/4 SAB	2	f	100198	0.00	0.00	0.00	1	1
2645	11ARHEM-29	6	HEMBRA RAPIDA 50mm (1 1/2) ERA	2	f	100199	0.00	0.00	0.00	1	1
2646	11ARHEM-30	6	HEMBRA RAPIDA 50mm X 1 1/4 INTER	2	f	100200	0.00	0.00	0.00	1	1
2647	11ARHEM-31	6	HEMBRA RAPIDA 50mm X 1 INTER	2	f	100201	0.00	0.00	0.00	1	1
2648	11ARHEM-32	6	HEMBRA RAPIDA 50mm X 2 INTER	2	f	100202	0.00	0.00	0.00	1	1
2649	11ARHEM-33	6	HEMBRA RAPIDA 50mm X 3/4 INTER	2	f	100203	0.00	0.00	0.00	1	1
2650	11ARHEM-34	6	HEMBRA RAPIDA 63mm X 1 1/2 INTER	2	f	100204	0.00	0.00	0.00	1	1
2651	11ARHEM-35	6	HEMBRA RAPIDA 63mm (2) ERA	2	f	100205	0.00	0.00	0.00	1	1
2652	11ARHEM-36	6	HEMBRA RAPIDA 63mm X 1 1/4 INTER	2	f	100206	0.00	0.00	0.00	1	1
2653	11ARHEM-37	6	HEMBRA RAPIDA 75 X 2 SAB	2	f	100207	0.00	0.00	0.00	1	1
2654	11ARHEM-38	6	HEMBRA RAPIDA 90 X 2 1/2 SAB	2	f	100208	0.00	0.00	0.00	1	1
2655	11ARHEM-39	6	HEMBRA RAPIDA 90mm (3) ERA	2	f	100209	0.00	0.00	0.00	1	1
2656	11ARHEM-40	6	HEMBRA RAPIDA 90mm X 1 1/2 INTER	2	f	100210	0.00	0.00	0.00	1	1
2657	11ARHEM-41	6	HEMBRA RAPIDA 90mm X 2 INTER	2	f	100211	0.00	0.00	0.00	1	1
2658	11ARHEM-42	6	HEMBRA RAPIDA 90mm X 4 INTER	2	f	100212	0.00	0.00	0.00	1	1
2659	11ARHEM-43	6	HEMBRA RAPIDA CON REFUERZO 20 x 1/2 AQP	2	f	100213	0.00	0.00	0.00	1	1
2660	11ARHEM-44	6	HEMBRA RAPIDA CON REFUERZO 32 x 1 AQP	2	f	100214	0.00	0.00	0.00	1	1
2661	11ARHEM-45	6	HEMBRA RAPIDA CON REFUERZO 50 x 11/2 AQP	2	f	100215	0.00	0.00	0.00	1	1
2662	11ARHEM-46	6	HEMBRA RAPIDA CON REFUERZO 63 x 11/2 AQP	2	f	100216	0.00	0.00	0.00	1	1
2663	11ARHEM-47	6	HEMBRA RAPIDA CON REFUERZO 63 x 2 AQP	2	f	100217	0.00	0.00	0.00	1	1
2664	11ARHEM-48	6	HEMBRA RAPIDA CON REFUERZO 25mm X 3/4 AQP	2	f	100218	0.00	0.00	0.00	1	1
2665	11ARHEM-49	6	HEMBRA RAPIDA CON REFUERZO 40 X 11/4 AQP	2	f	100219	0.00	0.00	0.00	1	1
2666	11ARHEM-50	6	HEMBRA RAPIDA CON REFUERZO 90 X 3 AQP	2	f	100220	0.00	0.00	0.00	1	1
2667	11ARHEM-51	6	HEMBRA RAPIDA CON REFUERZO 110 X 4 AQP	2	f	100221	0.00	0.00	0.00	1	1
2668	11ARHID-01	6	HIDRANTE 1 ACUAMETAL	2	f	100222	0.00	0.00	0.00	1	1
2669	11ARHID-02	6	HIDRANTE 3/4 ACUAMETAL	2	f	100223	0.00	0.00	0.00	1	1
2670	11ARHID-03	6	HIDRANTE + BAYONETA 1	2	f	100224	0.00	0.00	0.00	1	1
2671	11ARHID-04	6	HIDRANTE + BAYONETA 3/4	2	f	100225	0.00	0.00	0.00	1	1
2672	11ARHID-05	6	HIDRANTE +BAYONETA 3/4 AQP	2	f	100226	0.00	0.00	0.00	1	1
2673	11ARMAC-01	6	MACHO PF + UAD 16mm x 1/2 ERA	2	f	100227	0.00	0.00	0.00	1	1
2675	11ARMAC-03	6	MACHO RAPIDO 110mm (4) ERA	2	f	100229	0.00	0.00	0.00	1	1
2676	11ARMAC-04	6	MACHO RAPIDO 16mm (1/2) INTER	2	f	100230	0.00	0.00	0.00	1	1
2677	11ARMAC-05	6	MACHO RAPIDO 16mm(3/8) ERA	2	f	100231	0.00	0.00	0.00	1	1
2678	11ARMAC-06	6	MACHO RAPIDO 16mmX 1/2 SAB	2	f	100232	0.00	0.00	0.00	1	1
2679	11ARMAC-07	6	MACHO RAPIDO 16mmX 3/4 SAB	2	f	100233	0.00	0.00	0.00	1	1
2680	11ARMAC-08	6	MACHO RAPIDO 20 X 3/4 SAB	2	f	100234	0.00	0.00	0.00	1	1
2681	11ARMAC-09	6	MACHO RAPIDO 20mm (1/2)  INTER	2	f	100235	0.00	0.00	0.00	1	1
2682	11ARMAC-10	6	MACHO RAPIDO 20mm (1/2) ERA	2	f	100236	0.00	0.00	0.00	1	1
2683	11ARMAC-11	6	MACHO RAPIDO 20mm x 3/4 INTER	2	f	100237	0.00	0.00	0.00	1	1
2684	11ARMAC-12	6	MACHO RAPIDO 25 X 1 SAB	2	f	100238	0.00	0.00	0.00	1	1
2685	11ARMAC-13	6	MACHO RAPIDO 25mm (1/2) ERA	2	f	100239	0.00	0.00	0.00	1	1
2686	11ARMAC-130	6	MACHO RAPIDO 25 X 1/2 AQP	2	f	100240	0.00	0.00	0.00	1	1
2687	11ARMAC-131	6	MACHO RAPIDO 75 X 2 1/2 AQP	2	f	100241	0.00	0.00	0.00	1	1
2688	11ARMAC-14	6	MACHO RAPIDO 25mm (3/4)  INTER	2	f	100242	0.00	0.00	0.00	1	1
2689	11ARMAC-15	6	MACHO RAPIDO 25mm (3/4) ERA	2	f	100243	0.00	0.00	0.00	1	1
2690	11ARMAC-16	6	MACHO RAPIDO 25mm x 1/2 INTER	2	f	100244	0.00	0.00	0.00	1	1
2691	11ARMAC-17	6	MACHO RAPIDO 32 X 1 1/4 SAB	2	f	100245	0.00	0.00	0.00	1	1
2692	11ARMAC-18	6	MACHO RAPIDO 32 X 1  SAB	2	f	100246	0.00	0.00	0.00	1	1
2693	11ARMAC-19	6	MACHO RAPIDO 32 X 3/4 SAB	2	f	100247	0.00	0.00	0.00	1	1
2694	11ARMAC-20	6	MACHO RAPIDO 32mm (1)  INTER	2	f	100248	0.00	0.00	0.00	1	1
1	13GAL249TUB	16	TUBO GALV 2 1/2  x CM	2	f	1001107	0.00	0.00	0.00	1	4
2696	joselin	3	josehermoso	3	f	1002695	0.00	23.00	122.00	3	4
2641	11ARHEM-25	6	HEMBRA RAPIDA 40mm (1 1/4) ERA	2	f	100195	0.00	0.00	0.00	1	1
2488	11ARCOLL-105	6	COLLAR DERIVACION RAPIDO 90 X 1 1/2 ERA	2	f	10042	0.00	0.00	0.00	1	1
133	25MIND-10	10	MANGUERA BICOLOR FLEXCO 1	2	f	1001785	0.00	0.00	0.00	1	2
2450	11ARBAY-01	6	BAYONETA 3/4 ACUAMETAL	2	f	1004	0.00	0.00	0.00	1	1
2454	11ARCOD-03	6	CODO RAPIDO 20mm INTER	2	f	1008	0.00	0.00	0.00	1	1
2698	102PBL-04	20	PELETIZADO BLANCO LECHE AQP	1	f	1002698	0.00	0.00	0.00	1	5
2674	11ARMAC-02	6	MACHO RAPIDO 110mm (4)  INTER	2	f	100228	0.00	0.00	0.00	1	1
1113	13GAL264NIP	16	NIPLE BARRIL GALV 11/2	2	f	1001131	1.00	0.00	0.00	1	1
2699	102PM-05	20	PELETIZADO MIXTO AQP	1	f	1002699	0.00	0.00	0.00	1	5
2700	102PA-06	20	PELETIZADO AMARILLO AQP	1	f	1002700	0.00	0.00	0.00	1	5
2701	102DA-07	20	DEVOLUCION AGLUTINADORA AQP	1	f	1002701	0.00	0.00	0.00	1	5
116	102PO-02	20	PELETIZADO OPACO AQP	1	f	1003	0.00	0.00	0.00	1	5
901	12PVC430	18	TUBO PVC PRESION RDE21 DE 2 1/2 X MT  DURMAN	2	f	100903	0.00	0.00	0.00	1	1
2697	102PR-03	20	PELETIZADO REMOLIDO AQP	1	f	1002697	0.00	0.00	0.00	1	5
2487	11ARCOLL-104	6	COLLAR DERIVACION RAPIDO 90 X 1 1/2 INTER	2	f	10041	0.00	0.00	0.00	1	1
1961	30BOM-15	12	BOMBA LAPICERO 3HP 	3	f	1002164	0.00	0.00	0.00	1	1
1614	22VALRB-02	19	VALV REGULADORA BR 11/2	2	f	1001664	1.00	0.00	0.00	1	1
1869	29ACCR-62	7	FILTRO BR ROSCA 150L 11/2	2	f	1002072	1.00	0.00	0.00	1	1
2704	101AP-02	21	AGLUTINADO POLICOLOR	1	f	1002704	0.00	0.00	0.00	1	5
117	102PP-01	20	PELETIZADO POLICOLOR AQP	1	f	1002	0.00	0.00	0.00	1	5
2703	102TL-09	20	TORTA LIMPIA	1	f	1002703	0.00	0.00	0.00	1	5
2705	101AO-01	21	AGLUTINADO OPACO	1	f	1002705	0.00	0.00	0.00	1	5
2702	102TS-08	20	TORTA SUCIA	1	f	1002702	0.00	0.00	0.00	1	5
2707	100PL-01	22	PLASTICO LAVADO	1	f	1002707	0.00	0.00	0.00	1	5
2708	01PSO-02	23	PLASTICO SUCIO OPACO	1	f	1002708	0.00	0.00	0.00	1	5
2706	01PSP-01	23	PLASTICO SUCIO POLICOLOR	1	f	1002706	0.00	0.00	0.00	1	5
2709	01PLP-03	23	01PLP-03	1	f	1002709	0.00	0.00	0.00	1	5
2710	01PLO-04	23	PLASTICO LIMPIO OPACO	1	f	1002710	0.00	0.00	0.00	1	5
\.


--
-- Data for Name: producto_x_proveedor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.producto_x_proveedor (id_producto_x_proveedor, id_producto, id_proveedor, costo) FROM stdin;
1	1113	142	8770.00
2	1614	142	352720.00
3	1869	142	65370.00
\.


--
-- Data for Name: proveedor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.proveedor (id_proveedor, id_tipo_entidad, id_tipo_identificacion, identificacion, dv, telefono, razon_social, nombre_comercial, id_ciudad, direccion, nombre_contacto, apellido_contacto, correo_electronico, id_tipo_regimen_iva, id_responsabilidad_fiscal, id_estado) FROM stdin;
2	2	3	1041631221	9	32313233	jose sas	josesito sasaqs	166	Calle 79c #75-37	Gustavo Correa	cor	josemigeul44@gmail.com	1	1	1
3	\N	\N	811046408	\N	 (00) 3222090	ACUEDUCTOS E IRRIGACIONES S.A.S.	ACUEDUCTOS E IRRIGACIONES S.A.S.	\N	\N	ACUEDUCTO E IRRIGACIONES SAS	\N	recepcionfac.acueductos@gmail.com	\N	\N	1
4	\N	\N	900564918	\N	42852325	AGENCIA DE ABARROTES LA ESQUINA AZUL S.A.S	AGENCIA DE ABARROTES LA ESQUINA AZUL S.A.S	\N	\N	\N	\N	esquinaazul25@gmail.com	\N	\N	1
5	\N	\N	900575115	\N	 (00) 48670035	AGROEQUIPOS ENTRERRIOS S.A.S.	AGROEQUIPOS ENTRERRIOS S.A.S.	\N	\N	AGROEQUIPOS ENTRERRIOS S.A.S.	\N	compras@agroequiposentrerrios.com	\N	\N	1
6	\N	\N	901865945	\N	 (00) 0000000	AGROSERVIS PUENTE IGLESIAS S.A.S.	AGROSERVIS PUENTE IGLESIAS S.A.S.	\N	\N	AGROSERVIS PUENTE IGLESIAS S.A.S.	\N	agroservispuenteiglesias111625@gmail.com	\N	\N	1
7	\N	\N	800097960	\N	3735086	ALEJANDRO ARBOLEDA Y CIA S.A.S.	ALEJANDRO ARBOLEDA Y CIA S.A.S.	\N	\N	\N	\N	aaaecia@une.net.co	\N	\N	1
8	\N	\N	811037574	\N	6044443449	ALMACEN EL CONSTRUCTOR BOLIVAR S A	ALMACEN EL CONSTRUCTOR BOLIVAR S A	\N	\N	\N	\N	construbolivar.sa@hotmail.com	\N	\N	1
9	\N	\N	900321578	\N	5718219230	ALTAMIRA WATER LTDA	ALTAMIRA WATER LTDA	\N	\N	\N	\N	estadocuenta1@altamirawater.com	\N	\N	1
10	\N	\N	901003327	\N	 (00) 0000000	Amazon Web Services Colombia S A S	Amazon Web Services Colombia S A S	\N	\N	Amazon Web Services Colombia S A S	\N	\N	\N	\N	1
11	\N	\N	1017127740	\N	 (00) 0000000	ANDRES ALEJANDRO ARAQUE LOPERA	ANDRES ALEJANDRO ARAQUE LOPERA	\N	\N	ANDRES ALEJANDRO ARAQUE LOPERA	\N	araquelopera27@gmail.com	\N	\N	1
12	\N	\N	800256312	\N	4442473	ANTIOQUEÑA DE RODACHINAS LTDA	ANTIOQUEÑA DE RODACHINAS LTDA	\N	\N	\N	\N	antderodachinas@gmail.com	\N	\N	1
13	\N	\N	890900044	\N	4489343	ANTOPELAEZ S.A.S	ANTOPELAEZ S.A.S	\N	\N	\N	\N	antopelaezfacturacion@hotmail.com	\N	\N	1
14	\N	\N	900992162	\N	3222010	AQA GROUP S.A.S	AQA GROUP S.A.S	\N	\N	\N	\N	contacto@aqagroup.com.co	\N	\N	1
15	\N	\N	901663172	\N	3042991514	ASOCIACIÓN MUÑOZ PINEDA	ASOCIACIÓN MUÑOZ PINEDA	\N	\N	\N	\N	asociacion.munozpineda@gmail.com	\N	\N	1
16	\N	\N	890904615	\N	4441121	AUTOAMERICA S.A.	AUTOAMERICA S.A.	\N	\N	\N	\N	notificaciona-autoamerica@autoamerica.com	\N	\N	1
17	\N	\N	900269840	\N	 (00) 0000000	BBG COLOMBIA S A S	BBG COLOMBIA S A S	\N	\N	BBG COLOMBIA S A S	\N	contabilidad@basculasbbg.com	\N	\N	1
18	\N	\N	900844064	\N	 (00) 0000000	BOBINADOS AMC S.A.S.	BOBINADOS AMC S.A.S.	\N	\N	BOBINADOS AMC S.A.S.	\N	AMCBOBINADOS@HOTMAIL.COM	\N	\N	1
19	\N	\N	901269934	\N	2328895	CAJA ABRASIVA S.A.S	CAJA ABRASIVA S.A.S	\N	\N	\N	\N	cartera@cajaabrasiva.com	\N	\N	1
20	\N	\N	890905080	\N	44448822	CAMARA DE COMERCIO DE MEDELLIN PARA ANTIOQUIA	CAMARA DE COMERCIO DE MEDELLIN PARA ANTIOQUIA	\N	\N	\N	\N	correorespuesta@factureinbox.co	\N	\N	1
21	\N	\N	890900223	\N	4446767	CAMILO ALBERTO MEJIA & CIA S.A.S.	CAMILO ALBERTO MEJIA & CIA S.A.S.	\N	\N	\N	\N	info@camejia.com	\N	\N	1
22	\N	\N	1128426147	\N	 (00) 0000000	CAMILO ESTEBAN RODRIGUEZ MONTOYA	CAMILO ESTEBAN RODRIGUEZ MONTOYA	\N	\N	CAMILO ESTEBAN RODRIGUEZ MONTOYA	\N	crodriguezmontoya@gmail.com	\N	\N	1
23	\N	\N	900378773	\N	6043229460	CAMPO ESTRATEGICO SAS	CAMPO ESTRATEGICO SAS	\N	\N	\N	\N	daguilar@campoestrategico.com	\N	\N	1
24	\N	\N	900059604	\N	2610822	CENTRO ESPECIALIZADO EN GUAYAS SOCIEDAD POR ACCIONES SIMPLIFICADAS	CENTRO ESPECIALIZADO EN GUAYAS SOCIEDAD POR ACCIONES SIMPLIFICADAS	\N	\N	\N	\N	facturasceg.guayas@gmail.com	\N	\N	1
25	\N	\N	830089945	\N	3176488160	CENTRO JURIDICO INTERNACIONAL S.A.S.	CENTRO JURIDICO INTERNACIONAL S.A.S.	\N	\N	\N	\N	cartera@centrojuridicointernacional.com	\N	\N	1
26	\N	\N	901118257	\N	 (00) 0000000	COCOROLLO EL LIMONAR SAS	COCOROLLO EL LIMONAR SAS	\N	\N	COCOROLLO EL LIMONAR SAS	\N	MANTENIMIENTO@COCOROLLO.COM	\N	\N	1
27	\N	\N	860501682	\N	43607088	CODIFER S.A S	CODIFER S.A S	\N	\N	\N	\N	cartera@codifer.com.co	\N	\N	1
28	\N	\N	890932704	\N	 (00) 4443849	CODISTRIBELT S.A.S.	CODISTRIBELT S.A.S.	\N	\N	CODISTRIBELT S.A.S.	\N	facturacodistribelt@gmail.com	\N	\N	1
29	\N	\N	901254889	\N	3013483728	COMERCIALIZADORA EL NUEVO MILENIUM 2020 SAS	COMERCIALIZADORA EL NUEVO MILENIUM 2020 SAS	\N	\N	\N	\N	gerencia1510@outlook.com	\N	\N	1
30	\N	\N	901031400	\N	3220428	COMERCIALIZADORA FERROPARTES S.A.S.	COMERCIALIZADORA FERROPARTES S.A.S.	\N	\N	\N	\N	cferropartes@gmail.com	\N	\N	1
31	\N	\N	900355110	\N	4486769	COMERCIALIZADORA GENERAL POSADA HERMANOS S.A.S	COMERCIALIZADORA GENERAL POSADA HERMANOS S.A.S	\N	\N	\N	\N	facturacion@comercializadorageneral.com	\N	\N	1
32	\N	\N	800153993	\N	43786666	COMUNICACION CELULAR S A COMCEL S A	COMUNICACION CELULAR S A COMCEL S A	\N	\N	\N	\N	support@Claro.com	\N	\N	1
33	\N	\N	901388834	\N	3188010322	CONEXMAN CV S.A.S	CONEXMAN CV S.A.S	\N	\N	\N	\N	cartera@conexmancv.com	\N	\N	1
34	\N	\N	811035667	\N	3146614894	CONSTRUCASTOR S. A. S	CONSTRUCASTOR S. A. S	\N	\N	\N	\N	construcastors@gmail.com	\N	\N	1
35	\N	\N	900297110	\N	4075014	CONSTRUCCIONES INMUNIZADAS DE COLOMBIA S.A.S.	CONSTRUCCIONES INMUNIZADAS DE COLOMBIA S.A.S.	\N	\N	\N	\N	facturacion@construinmunizada.com	\N	\N	1
36	\N	\N	811047187	\N	44481704	CONTACTORES Y BREAKERS S.A.S.	CONTACTORES Y BREAKERS S.A.S.	\N	\N	\N	\N	contabilidad@contactoresybreakers.co	\N	\N	1
37	\N	\N	811026010	\N	 (000) 0000000	COOPERATIVA DE TRABAJO ASOCIADO PLANETA VERDE	COOPERATIVA DE TRABAJO ASOCIADO PLANETA VERDE	\N	\N	COOPERATIVA DE TRABAJO ASOCIADO PLANETA VERDE	\N	cooplanetaverde@gmail.com	\N	\N	1
38	\N	\N	800183807	\N	4446268	CORTE Y GRAFADO S.A.S	CORTE Y GRAFADO S.A.S	\N	\N	\N	\N	ventas@corteygrafado.com	\N	\N	1
39	\N	\N	900276962	\N	\N	D1 S A S	D1 S A S	\N	\N	\N	\N	atencion.cliente@koba-group.com	\N	\N	1
40	\N	\N	900966398	\N	 (00) 3504616416	DEL AGRO SOLUCIONES PARA EL CAMPO SAS	DEL AGRO SOLUCIONES PARA EL CAMPO SAS	\N	\N	DEL AGRO SOLUCIONES PARA EL CAMPO SAS	\N	Delagrosoluciones@gmail.com	\N	\N	1
41	\N	\N	900131512	\N	2145657	DISTRIBUCIONES AGROPECUARIAS DEL VALLE S.A.	DISTRIBUCIONES AGROPECUARIAS DEL VALLE S.A.	\N	\N	\N	\N	info@diagroval.co	\N	\N	1
42	\N	\N	811037988	\N	4480019	DISTRIBUCIONES FARGO S.A.S	DISTRIBUCIONES FARGO S.A.S	\N	\N	\N	\N	distribucionesfargosa@hotmail.com	\N	\N	1
43	\N	\N	900238094	\N	3172646790	DISTRIBUCIONES HEGEL E.U	DISTRIBUCIONES HEGEL E.U	\N	\N	\N	\N	distribucioneshegeleu@hotmail.com	\N	\N	1
44	\N	\N	901184813	\N	 (00) 0000000	DISTRIRUEDAS SOLUCIONES EN MOVILIDAD SAS	DISTRIRUEDAS SOLUCIONES EN MOVILIDAD SAS	\N	\N	DISTRIRUEDAS SOLUCIONES EN MOVILIDAD SAS	\N	admon@hotmail.com	\N	\N	1
45	\N	\N	800194997	\N	4445861	DOCUPRINT S.A.S.	DOCUPRINT S.A.S.	\N	\N	\N	\N	docuprintcontabilidad@gmail.com	\N	\N	1
46	\N	\N	800033159	\N	 (00) 8200200	DURMAN COLOMBIA S.A.S	DURMAN COLOMBIA S.A.S	\N	\N	DURMAN COLOMBIA S.A.S	\N	colombia@aliaxis-la.com	\N	\N	1
47	\N	\N	890901352	\N	3315252	EL COLOMBIANO S.A.S.	EL COLOMBIANO S.A.S.	\N	\N	\N	\N	efacturaelcolombiano@elcolombiano.com.co	\N	\N	1
48	\N	\N	901441061	\N	3221806	ELECTRO CROMOS S.A.S.	ELECTRO CROMOS S.A.S.	\N	\N	\N	\N	electrocromos1@gmail.com	\N	\N	1
49	\N	\N	900594873	\N	 (00) 4300658777	ELECTRONICAS AVANZADAS SAS	ELECTRONICAS AVANZADAS SAS	\N	\N	ELECTRONICAS AVANZADAS SAS	\N	desarrollo@electrovan.co	\N	\N	1
50	\N	\N	900188685	\N	5132221	ELECTROSERVIMOS S.A.	ELECTROSERVIMOS S.A.	\N	\N	\N	\N	electroservimos@une.net.co	\N	\N	1
51	\N	\N	890904996	\N	4444115	EMPRESAS PUBLICAS DE MEDELLIN E.S.P.	EMPRESAS PUBLICAS DE MEDELLIN E.S.P.	\N	\N	\N	\N	alumbredopublicomed@medellin.gov.co	\N	\N	1
52	\N	\N	901558080	\N	3146590171	ENCOMIENDAS ORIENTE S.A.S	ENCOMIENDAS ORIENTE S.A.S	\N	\N	\N	\N	encomiendasonrientesas@outlook.com	\N	\N	1
53	\N	\N	800051319	\N	 (00) 3786100	ENERGIA Y POTENCIA S.A.S	ENERGIA Y POTENCIA S.A.S	\N	\N	ENERGIA Y POTENCIA S.A.S	\N	contabilidad@energiaypotencia.com	\N	\N	1
54	\N	\N	811039517	\N	2626254	EQUIPOS BOMBAS Y ACCESORIOS S.A.S	EQUIPOS BOMBAS Y ACCESORIOS S.A.S	\N	\N	\N	\N	equiposbomba@gmail.com	\N	\N	1
55	\N	\N	901089388	\N	6044114115	EXTINTORES DELTA S.A.S	EXTINTORES DELTA S.A.S	\N	\N	\N	\N	factura@extintoresdelta.com	\N	\N	1
56	\N	\N	900219834	\N	3222021	F2X S.A.S.	F2X S.A.S.	\N	\N	\N	\N	INFO@F2X.COM.CO	\N	\N	1
57	\N	\N	890910244	\N	2320914	FERRETERIA EL PEDALISTA S.A.S	FERRETERIA EL PEDALISTA S.A.S	\N	\N	\N	\N	ferrepedalista@une.net.co	\N	\N	1
58	\N	\N	890928960	\N	 (00) 4481200	FERRETERIA FERROVALVULAS S.A.S	FERRETERIA FERROVALVULAS S.A.S	\N	\N	FERRETERIA FERROVALVULAS S.A.S	\N	jhurtado@ferrovalvulas.com	\N	\N	1
59	\N	\N	800240121	\N	42625716	FERRETERIA Y HERRAMIENTAS LIMITADA	FERRETERIA Y HERRAMIENTAS LIMITADA	\N	\N	\N	\N	herrafer@une.net.co	\N	\N	1
60	\N	\N	900307086	\N	2327201	FERRETRUPER S.A.S	FERRETRUPER S.A.S	\N	\N	\N	\N	ferretrupersas@hotmail.com	\N	\N	1
61	\N	\N	900708560	\N	6043706192	FIGUCORTES Y LAMINAS SAS	FIGUCORTES Y LAMINAS SAS	\N	\N	\N	\N	figucortesmedellin@gmail.com	\N	\N	1
62	\N	\N	901882958	\N	 (00) 0000000	FRES CHILLERS INC SAS	FRES CHILLERS INC SAS	\N	\N	FRES CHILLERS INC SAS	\N	chillerespecializado@gmail.com	\N	\N	1
63	\N	\N	900732861	\N	2168406	GIRALDO EQUIPOS G.V. S.A.S	GIRALDO EQUIPOS G.V. S.A.S	\N	\N	\N	\N	giraldoequipos@gmail.com	\N	\N	1
64	\N	\N	900390986	\N	4795807	GLOBAL SERVICES SOLUTIONS CENTER SAS	GLOBAL SERVICES SOLUTIONS CENTER SAS	\N	\N	\N	\N	gs.facturae@hotmail.com	\N	\N	1
65	\N	\N	901482950	\N	3115489249	GRUPO EMPRESARIAL DRG S.A.S.	GRUPO EMPRESARIAL DRG S.A.S.	\N	\N	\N	\N	dayanrendongomez@gmail.com	\N	\N	1
66	\N	\N	900555944	\N	3108182540	GRUPO PRIME S.A.S	GRUPO PRIME S.A.S	\N	\N	\N	\N	asistentegpcolombia@gmail.com	\N	\N	1
67	\N	\N	900012857	\N	3007743606	HELICOIL MOTRIZ S.A.S.	HELICOIL MOTRIZ S.A.S.	\N	\N	\N	\N	helicoilmotrizsas@gmail.com	\N	\N	1
68	\N	\N	805007404	\N	6046688	ICOMALLAS S. A.	ICOMALLAS S. A.	\N	\N	\N	\N	cartera@icomallas.com	\N	\N	1
69	\N	\N	900930787	\N	6191735	IMCORK S.A.S.	IMCORK S.A.S.	\N	\N	\N	\N	jose.scoronado@gmail.com	\N	\N	1
70	\N	\N	800173805	\N	2620520	IMPORTADORA ROTAMOS S.A.	IMPORTADORA ROTAMOS S.A.	\N	\N	\N	\N	ROTAMOS@UNE.NET.CO	\N	\N	1
71	\N	\N	900567566	\N	3116338418	IMPRESOS CRIPTON DIGITAL S.A.S.	IMPRESOS CRIPTON DIGITAL S.A.S.	\N	\N	\N	\N	cesarchaverra@gmail.com	\N	\N	1
72	\N	\N	900072161	\N	42609027	INDUSTRIAS BIMAQ SAS	INDUSTRIAS BIMAQ SAS	\N	\N	\N	\N	industriasbimaq@yahoo.com.co	\N	\N	1
73	\N	\N	900259734	\N	4448369	INDUSTRIAS PLASTICAS DE MEDELLIN S.A.S	INDUSTRIAS PLASTICAS DE MEDELLIN S.A.S	\N	\N	\N	\N	ventas@ipmedellin.com.co	\N	\N	1
74	\N	\N	800075425	\N	2317759	INDUSTRIAS TEZZAROL S.A.S.	INDUSTRIAS TEZZAROL S.A.S.	\N	\N	\N	\N	contabilidad@tezzarol.com	\N	\N	1
75	\N	\N	890928476	\N	2622561	INTERNACIONAL DE PLÁSTICOS S.A.S.	INTERNACIONAL DE PLÁSTICOS S.A.S.	\N	\N	\N	\N	info@interplast.com.co	\N	\N	1
76	\N	\N	900515326	\N	2628045	INVERSIONES SALAZAR HERMANOS Y CIA LIMITADA	INVERSIONES SALAZAR HERMANOS Y CIA LIMITADA	\N	\N	\N	\N	tornillosyfabricaciones@hotmail.com	\N	\N	1
77	\N	\N	901038007	\N	7206200	ITMCOL SAS	ITMCOL SAS	\N	\N	\N	\N	auxcontable@itmcol.com	\N	\N	1
78	\N	\N	79995971	\N	3103978026	JOSE ANDRES MOLINA GACHA	JOSE ANDRES MOLINA GACHA	\N	\N	JOSE ANDRES MOLINA GACHA	\N	jandresmg24@gmail.com	\N	\N	1
79	\N	\N	890923402	\N	2852884	JOSE FELIX ESCOBAR H Y CIA LTDA	JOSE FELIX ESCOBAR H Y CIA LTDA	\N	\N	\N	\N	felixescobar@une.net.co	\N	\N	1
80	\N	\N	1037570736	\N	 (00) 0000000	JUAN ESTEBAN GONZALEZ GIRALDO	JUAN ESTEBAN GONZALEZ GIRALDO	\N	\N	JUAN ESTEBAN GONZALEZ GIRALDO	\N	\N	\N	\N	1
81	\N	\N	1044506925	\N	 (00) 45743745	JUAN FERNANDO ROJAS QUINTERO	JUAN FERNANDO ROJAS QUINTERO	\N	\N	JUAN FERNANDO ROJAS QUINTERO	\N	proelectrodecolombia@gmail.com	\N	\N	1
82	\N	\N	811019894	\N	4417741	LUBRITEXAS S.A	LUBRITEXAS S.A	\N	\N	\N	\N	facturacion@lubritexas.com.co	\N	\N	1
83	\N	\N	901539866	\N	3116045595	LUCASA PINTURAS SAS	LUCASA PINTURAS SAS	\N	\N	\N	\N	lucasapinturas@hotmail.com	\N	\N	1
84	\N	\N	901279860	\N	3104554127	M&J ARTE Y REGISTRO S.A.S	M&J ARTE Y REGISTRO S.A.S	\N	\N	\N	\N	alesandraospina1182@gmail.com	\N	\N	1
85	\N	\N	811028650	\N	 (00) 0000000	MADECENTRO COLOMBIA SAS	MADECENTRO COLOMBIA SAS	\N	\N	MADECENTRO COLOMBIA SAS	\N	\N	\N	\N	1
86	\N	\N	900059238	\N	6781616	MAKRO SUPERMAYORISTA S.A.S	MAKRO SUPERMAYORISTA S.A.S	\N	\N	\N	\N	contacto@fymtech.com	\N	\N	1
87	\N	\N	900240607	\N	6044299	MANUFACTURAS LATINOAMERICANAS DE CAUCHO S.A.S.	MANUFACTURAS LATINOAMERICANAS DE CAUCHO S.A.S.	\N	\N	\N	\N	comercial@malaca.co	\N	\N	1
88	\N	\N	79669761	\N	3212473553	MARCO ANTONIO ZARATE CIFUENTE	MARCO ANTONIO ZARATE CIFUENTE	\N	\N	MARCO ANTONIO ZARATE CIFUENTE	\N	zalloplast2014@hotmail.com	\N	\N	1
89	\N	\N	22211441	\N	 (000) 0000000	MARGARITA ORTIZ GRANDA	MARGARITA ORTIZ GRANDA	\N	\N	MARGARITA ORTIZ GRANDA	\N	3D@3DDISENO.COM	\N	\N	1
90	\N	\N	900437333	\N	44446312	MATERIALES Y RACORES S.A.S	MATERIALES Y RACORES S.A.S	\N	\N	\N	\N	materialesyracores@hotmail.com	\N	\N	1
91	\N	\N	900159362	\N	4488284	MAYORISTA DE MATERIALES S.A.S	MAYORISTA DE MATERIALES S.A.S	\N	\N	\N	\N	giraldoequipos@gmail.com	\N	\N	1
92	\N	\N	901306797	\N	45399022	MEDIDORES Y VALVULAS SAS	MEDIDORES Y VALVULAS SAS	\N	\N	\N	\N	medidoresyvalvulassas@gmail.com	\N	\N	1
93	\N	\N	79993184	\N	 (000) 0000000	MIGUEL ANGEL LANCHEROS HERRERA	MIGUEL ANGEL LANCHEROS HERRERA	\N	\N	MIGUEL ANGEL LANCHEROS HERRERA	\N	\N	\N	\N	1
94	\N	\N	890900137	\N	6043380	MIGUEL GOMEZ Y COMPAÑIA S.A.S	MIGUEL GOMEZ Y COMPAÑIA S.A.S	\N	\N	\N	\N	facturacionelectronica@miguelgomez.com.co	\N	\N	1
95	\N	\N	811037702	\N	 (00) 4121232	MOTOBOMBAS J.V. S.A.	MOTOBOMBAS J.V. S.A.	\N	\N	MOTOBOMBAS J.V. S.A.	\N	motobombasjvsa@hotmail.com	\N	\N	1
96	\N	\N	901281148	\N	3772889	MPORT RONNY S.A.S.	MPORT RONNY S.A.S.	\N	\N	\N	\N	importronny@gmail.com	\N	\N	1
97	\N	\N	901848619	\N	 (00) 0000000	MULTI GRUPO MEDELLIN SAS	MULTI GRUPO MEDELLIN SAS	\N	\N	MULTI GRUPO MEDELLIN SAS	\N	multidescuentosayacucho@gmail.com	\N	\N	1
98	\N	\N	900754611	\N	3322524	MULTITRADEX S.A.S.	MULTITRADEX S.A.S.	\N	\N	\N	\N	aecheverri@multitradex.com.co	\N	\N	1
99	\N	\N	800254400	\N	2669113	NEMCO LTDA	NEMCO LTDA	\N	\N	\N	\N	nemcoltda@une.net.co	\N	\N	1
100	\N	\N	890300012	\N	46644205	NETAFIM COLOMBIA S.A.S.	NETAFIM COLOMBIA S.A.S.	\N	\N	\N	\N	martha.vanegas@netafim.com	\N	\N	1
101	\N	\N	900347290	\N	42794461	PARATUAGRO S.A.S.	PARATUAGRO S.A.S.	\N	\N	\N	\N	paratuagro@gmail.com	\N	\N	1
102	\N	\N	890911905	\N	44483792	PIHEZA METALICAS S.A.S	PIHEZA METALICAS S.A.S	\N	\N	\N	\N	pihezam@une.net.co	\N	\N	1
103	\N	\N	890917961	\N	43221079	PINTURAS INDUSTRIALES S.A.S	PINTURAS INDUSTRIALES S.A.S	\N	\N	\N	\N	palace@grupoideasa.com	\N	\N	1
104	\N	\N	811008778	\N	4448102	PINTURAS Y YESOS S.A.S.	PINTURAS Y YESOS S.A.S.	\N	\N	\N	\N	cartera@pinturasyyesos.com	\N	\N	1
105	\N	\N	811021515	\N	 (00) 3612711	PLASTICOS Y PIGMENTOS SAS	PLASTICOS Y PIGMENTOS SAS	\N	\N	PLASTICOS Y PIGMENTOS SAS	\N	lina.ramirez@plasticosypigmentos.com	\N	\N	1
106	\N	\N	900879394	\N	42862791	PLASTICOS Y PROCESOS S.A.S.	PLASTICOS Y PROCESOS S.A.S.	\N	\N	\N	\N	plasticosyprocesos@hotmail.com	\N	\N	1
107	\N	\N	800174039	\N	3138054459	PLASTIMUNDO S.A.S	PLASTIMUNDO S.A.S	\N	\N	\N	\N	silvia.monsalve@plastimundo.com.co	\N	\N	1
108	\N	\N	830512140	\N	44447289	PLASTINES S.A.S	PLASTINES S.A.S	\N	\N	\N	\N	plastinesltda@hotmail.com	\N	\N	1
109	\N	\N	890903939	\N	3152004717	POSTOBON S.A.	POSTOBON S.A.	\N	\N	\N	\N	recepcionfe@postobon.com.co	\N	\N	1
110	\N	\N	890900161	\N	3609500	PRODUCTOS FAMILIA S.A.	PRODUCTOS FAMILIA S.A.	\N	\N	\N	\N	servicioalcliente@grupofamilia.com	\N	\N	1
111	\N	\N	900310356	\N	47371129	PRODUCTOS INDUSTRIALES STARFLEX SOCIEDAD POR ACCIONES SIMPLIFICADA	PRODUCTOS INDUSTRIALES STARFLEX SOCIEDAD POR ACCIONES SIMPLIFICADA	\N	\N	\N	\N	isabelchica@proindustar.com	\N	\N	1
112	\N	\N	900822209	\N	5710002	PROVEEDORES DE PVC S.A.S	PROVEEDORES DE PVC S.A.S	\N	\N	\N	\N	ventas@proveedoresdepvcsas.com	\N	\N	1
113	\N	\N	800091085	\N	6043092133	RECONSTRUCTORA DE CANECAS Y TAMBORES SAS	RECONSTRUCTORA DE CANECAS Y TAMBORES SAS	\N	\N	\N	\N	contabilidad@recatam.com	\N	\N	1
114	\N	\N	900892145	\N	3136290552	RED AGROCOMERCIAL S.A.S	RED AGROCOMERCIAL S.A.S	\N	\N	\N	\N	redagrocomercial@gmail.com	\N	\N	1
115	\N	\N	800071543	\N	2622555	RENO ARANGO Y CIA. S. A. S.	RENO ARANGO Y CIA. S. A. S.	\N	\N	\N	\N	facturae@renoarango.com.co	\N	\N	1
116	\N	\N	900712677	\N	3148899126	RIEGOS E INVERNADEROS S.A.S	RIEGOS E INVERNADEROS S.A.S	\N	\N	\N	\N	contabilidad@riesgoseinvernaderos.com.co	\N	\N	1
117	\N	\N	900934289	\N	 (00) 44796191	RODATRAN S.A.S.	RODATRAN S.A.S.	\N	\N	RODATRAN S.A.S.	\N	Info@rodatran.co	\N	\N	1
118	\N	\N	890942987	\N	4481101	ROTOPLAST S.A.S.	ROTOPLAST S.A.S.	\N	\N	\N	\N	facturacion@rotoplast.com.co	\N	\N	1
119	\N	\N	901273252	\N	3228804268	ROTOVEL SAS	ROTOVEL SAS	\N	\N	\N	\N	jorge.velez1@outlook.es	\N	\N	1
120	\N	\N	0213895041	\N	 (00) 0000000	SAB S.p.A.	SAB S.p.A.	\N	\N	SAB S.p.A.	\N	\N	\N	\N	1
121	\N	\N	1038337216	\N	 (00) 0000000	SARA RUA MARTINEZ	SARA RUA MARTINEZ	\N	\N	SARA RUA MARTINEZ	\N	sary.rua14@gmail.com	\N	\N	1
122	\N	\N	890903790	\N	4378888	SEGUROS DE VIDA SURAMERICANA S.A.	SEGUROS DE VIDA SURAMERICANA S.A.	\N	\N	\N	\N	suracomunicaciones@sura.com.co	\N	\N	1
123	\N	\N	900562794	\N	5805981	SERFATY PACHECO ASESORES S.A.S.	SERFATY PACHECO ASESORES S.A.S.	\N	\N	\N	\N	factura.electronica.spa@gmail.com	\N	\N	1
124	\N	\N	890939895	\N	3156695220	SERVIGUANTES S.A.S.	SERVIGUANTES S.A.S.	\N	\N	\N	\N	serviguante@gmail.com	\N	\N	1
125	\N	\N	890911179	\N	2321440	SERVI-TRACTOR S.A.S.	SERVI-TRACTOR S.A.S.	\N	\N	\N	\N	servitractor@une.net.co	\N	\N	1
126	\N	\N	901051009	\N	 (00) 3004848963	SISTEMAS TECNIFICADOS ACUÍCOLAS S.A.S	SISTEMAS TECNIFICADOS ACUÍCOLAS S.A.S	\N	\N	SISTEMAS TECNIFICADOS ACUÍCOLAS S.A.S	\N	comercial@ecoan.co	\N	\N	1
127	\N	\N	901051009	\N	\N	SISTEMAS TECNIFICADOS ACUÍCOLAS S.A.S	SISTEMAS TECNIFICADOS ACUÍCOLAS S.A.S	\N	\N	SISTEMAS TECNIFICADOS ACUÍCOLAS S.A.S	\N	comercial@ecoan.co	\N	\N	1
128	\N	\N	900363864	\N	3114757124	SKY CORD S.A.S	SKY CORD S.A.S	\N	\N	\N	\N	skycordsas@hotmail.com	\N	\N	1
129	\N	\N	900736783	\N	3185062044	SOLAR CERCAS S.A.S	SOLAR CERCAS S.A.S	\N	\N	\N	\N	solarcentercas40@yahoo.es	\N	\N	1
130	\N	\N	901250791	\N	3222356	SOLUCIONES AGROPECUARIAS INDUSTRIALES Y MINERAS S.A.S	SOLUCIONES AGROPECUARIAS INDUSTRIALES Y MINERAS S.A.S	\N	\N	\N	\N	solucionessaim@gmail.com	\N	\N	1
131	\N	\N	901922115	\N	 (00) 0000000	STEEL FORM SOLUCIONES S.A.S	STEEL FORM SOLUCIONES S.A.S	\N	\N	Bernardo  Florez	\N	STEELFORMSOLUCIONES@GMAIL.COM	\N	\N	1
132	\N	\N	890800788	\N	3516660	SUMATEC S. A. S BIC	SUMATEC S. A. S BIC	\N	\N	\N	\N	aux.caja.medellin@sumatec.co	\N	\N	1
133	\N	\N	900421677	\N	4114022	SUMINOX ACEROS SAS	SUMINOX ACEROS SAS	\N	\N	\N	\N	intercambio@getfel.co	\N	\N	1
134	\N	\N	901347861	\N	4448871	SUPER FOX S.A.S.	SUPER FOX S.A.S.	\N	\N	\N	\N	super.fox@hotmail.com	\N	\N	1
135	\N	\N	800113024	\N	4486363	SUS MEDICOS S.A.S.	SUS MEDICOS S.A.S.	\N	\N	\N	\N	susmedik@hotmail.com	\N	\N	1
136	\N	\N	901079686	\N	3233361391	SYS FMQ S.A.S.	SYS FMQ S.A.S.	\N	\N	\N	\N	contabilidad@sysfmq.com	\N	\N	1
137	\N	\N	900365097	\N	3004120	T&T INTERACTIVA S.A.S	T&T INTERACTIVA S.A.S	\N	\N	\N	\N	soporte@dominioya.com.co	\N	\N	1
138	\N	\N	900691450	\N	\N	T.G.V. DE COLOMBIA SAS	T.G.V. DE COLOMBIA SAS	\N	\N	\N	\N	dyepes@tgv.com.co	\N	\N	1
139	\N	\N	900344738	\N	3504395780	TAXPLAS S.A.S.	TAXPLAS S.A.S.	\N	\N	\N	\N	taxplassas@hotmail.com	\N	\N	1
140	\N	\N	900550030	\N	4442906	TECNICENTRO LLANTAS Y LUJOS H&H S.A.S.	TECNICENTRO LLANTAS Y LUJOS H&H S.A.S.	\N	\N	\N	\N	imporyadorahyh@gmail.com	\N	\N	1
141	\N	\N	800121327	\N	42620517	TECNIEMPAQUES S.A.S.	TECNIEMPAQUES S.A.S.	\N	\N	\N	\N	compras@tecniempaques.com	\N	\N	1
142	\N	\N	800185764	\N	 (00) 2626233	TECNIFLUIDOS S.A.S.	TECNIFLUIDOS S.A.S.	\N	\N	TECNIFLUIDO	\N	tecnifluidosfe@gmail.com	\N	\N	1
143	\N	\N	800185764	\N	\N	TECNIFLUIDOS S.A.S.	TECNIFLUIDOS S.A.S.	\N	\N	contabilidadaqp9 @gmail.com	\N	asistente.admin@tecnifluidos.com.co	\N	\N	1
144	\N	\N	811038238	\N	 (00) 6043234	TECNIHIDRAULICA S.A.S.	TECNIHIDRAULICA S.A.S.	\N	\N	TECNIHIDRAULICA S.A.S.	\N	facturacion@tecnihidraulica.com	\N	\N	1
145	\N	\N	811038238	\N	\N	TECNIHIDRAULICA S.A.S.	TECNIHIDRAULICA S.A.S.	\N	\N	facturacion @tecnihidraulica.com	\N	facturacion@tecnihidraulica.com	\N	\N	1
146	\N	\N	830512589	\N	 (00) 0000000	TECNOBORDA S.A.S.	TECNOBORDA S.A.S.	\N	\N	TECNOBORDA S.A.S.	\N	\N	\N	\N	1
147	\N	\N	900029056	\N	5621180	TRANSFERENCIA AGRICOLA COLOMBIA S.A.S	TRANSFERENCIA AGRICOLA COLOMBIA S.A.S	\N	\N	\N	\N	contabilidad@transferenia.co	\N	\N	1
148	\N	\N	901270603	7	3118735894	ZUNCHOS KEOPS S.A.S.	ZUNCHOS KEOPS S.A.S.	\N	\N	\N	\N	zunchoskeops@gmail.com	\N	\N	1
\.


--
-- Data for Name: responsabilidad_fiscal; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.responsabilidad_fiscal (id_responsabilidad_fiscal, nombre, codigo) FROM stdin;
1	Gran contribuyente	O-13
2	Autorretenedor	O-15
3	Agente de retención IVA	O-23
4	Régimen simple de tributación	O-47
5	No aplica - Otros	R-99-PN
\.


--
-- Data for Name: retefuente; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.retefuente (id_retefuente, nombre, valor) FROM stdin;
1	Retefuente Hon. 11%	11.00
2	Rte Fte Comision 11%	11.00
3	Retefuente Hon. 10%	10.00
4	Rte Fte Comision 10%	10.00
5	Retefuente 7%	7.00
6	Rte Fte Servicios 6%	6.00
7	Rte Fte Servicios 4%	4.00
8	Rte Fte Arrendamiento 4%	4.00
9	Rendimientos financieros 4%	4.00
10	Retefuente 3.5%	3.50
11	Rte Fte Servicios 3.5%	3.50
12	Rte Fte Arrendamiento 3.5%	3.50
13	Retefuente 2.5%	2.50
14	Retefuente 2%	2.00
15	Rte Fte Servicios 1%	1.00
16	No Aplica / Base insuficiente	0.00
\.


--
-- Data for Name: rol; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rol (id_rol, nombre) FROM stdin;
1	Auxiliar de Facturación
2	Líder de Logística y Ventas
3	Comercial de Ventas
4	Contador(a)
5	Revisor Fiscal
6	Auxiliar de Bodega
8	Auxiliar Operativo - Extrusora
9	Auxiliar Operativo - Aglutinadora
10	Auxiliar Operativo - Peletizadora
11	Auxiliar Operativo de Producción
12	Líder de Mantenimiento
13	Líder de Gestión Humana
14	Líder de Seguridad y Salud (SST)
15	Auxiliar de SST
16	Jefe de Proyectos
17	Líder de Proyectos
18	Asistente de Proyectos
19	Auxiliar Operativo de Proyectos
20	Super Administrador
7	Líder de Producción y logistica
21	Gerente
22	Auxiliar operativo supernumerario
23	Auxiliar de producción y logística
\.


--
-- Data for Name: salidas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.salidas (id_salida, id_usuario, fecha_creacion, id_cliente, total_subtotal, total_descuento, total_iva, total_retencion, total_factura, observaciones) FROM stdin;
\.


--
-- Data for Name: tallas_empleados; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tallas_empleados (id_tallas_empleados, id_usuarios, id_tipo_prendas, talla) FROM stdin;
\.


--
-- Data for Name: tareas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tareas (id_tareas, id_usuarios, descripcion, fecha_asignacion, id_estado, id_usuario_creador) FROM stdin;
2	1	Darle a la tía Mary un subsidio por se la mejor tía del mundo	2026-02-19 16:09:30.869	23	2
31	2	PERSONAL: Imprimir los examenes de don Horacio	2026-04-04 00:19:36.246	23	2
10	2	GESTION HUMANA: Hablar con don Edgar y revisar lo de la induccion a la máquina	2026-04-03 23:36:29.251	21	2
19	2	GESTION HUMANA: Continuar con las acciones del grupo de produccion	2026-04-04 00:13:17.089	21	2
20	2	GESTION HUMANA: ,Hacer la papeleria y los todo el proceso documental de los nuevos	2026-04-04 00:13:46.675	21	2
1	18	Entregar a la oficina de recursos humanos los documentos firmados de la Licencia no remunerada	2026-02-19 16:08:40.525	23	2
21	2	GESTION HUMANA: Programar acciones con los líderes	2026-04-04 00:14:12.283	21	2
22	2	CONTABILIDAD: Recibir los préstamos y gestionar el pago de los impuestos	2026-04-04 00:14:51.355	21	2
28	2	PERSONAL: Pagar a Yuli y Parqueadero	2026-04-04 00:18:08.007	23	2
44	2	ingresar al bebe de don edgar a confama	2026-04-08 21:16:33.924	23	2
8	2	GESTIÓN HUMANA: Llamar a don Antonio para el peletizador.	2026-03-27 18:59:39.874	23	2
23	2	PRODUCCION: Seguimiento a la maquina aglutinadora	2026-04-04 00:15:01.886	21	2
25	2	GESTION HUMANA: Revisar con mario los turnos de la próxima semana y comunicar	2026-04-04 00:16:55.025	23	2
4	2	GESTIÓN HUMANA. Llamar a la abogada para gestionar el proceso de descargos y lo demás del proceso. Sebastian renuncio	2026-03-27 18:32:32.742	23	2
29	2	COLEGIO: Enviar alcancia	2026-04-04 00:18:23.44	21	2
32	2	PERSONAL: organizar la carpeta del papá y pedir las citas enviadas por el internista	2026-04-04 00:20:08.604	21	2
3	2	GESTIÓN HUMANA. Hacer el otro sí de don Edgar para la reintegración al puesto de trabajo, luego de ingresar por licencia de paternidad.	2026-03-27 18:26:18.369	23	2
34	2	GESTION HUMANA: Comprar las dotaciones de este mes	2026-04-04 00:21:11.703	21	2
9	2	GESTION HUMANA: Leer nuevamente el otro si, firmarlo y dejarlo en carpera	2026-04-03 23:32:08.899	21	2
35	2	MANTENIMIENTO: Pasar los cuadros a un lugar más apropiado	2026-04-04 00:21:41.845	21	2
36	2	JURIDICO: Hacer los pagares y  revisar los clientes en DATACREDITO	2026-04-04 00:22:26.535	21	2
41	2	JURÍDICO: Solicitar actualizacion del caso de augusto restrepo y de mateo	2026-04-04 00:29:02.133	23	2
40	2	JURIDICA: Llamar a abogados para saber porque no se ha generado el cobro a Sebastian Mariquita ni a Daniel Cañas	2026-04-04 00:28:18.323	22	2
12	2	ORGANIZAR EL LOCKERS DE LOS CELULARES. CON LA CAMARA .	2026-04-03 23:38:13.423	21	2
13	2	MANTENIMIENTO: Organizar los lockers de la ropa de cada uno y marcarlo	2026-04-03 23:38:47.627	21	2
14	2	GESTION HUMANO: Hacer firmar las dotaciones pasadas y organizar a quienes les falta	2026-04-03 23:39:18.274	21	2
37	2	VENTAS: Realizar la estrategia con Milo para la venta de los accesorios en COLANTA	2026-04-04 00:22:30.498	21	2
43	2	Hacer los certificados de renomax	2026-04-07 22:24:21.212	23	2
33	2	GESTION HUMANA: Organizar las gorras	2026-04-04 00:20:38.478	23	2
38	2	MANTENIMIENTO: Poner en marcha con Bayron las partes que faltan de la maquina grande	2026-04-04 00:24:45.262	23	2
5	2	GESTIÓN HUMANA: Hacer los documentos de salida de Sebastián Muñoz	2026-03-27 18:44:17.999	23	2
16	2	Hacer el informe de recicle y tomar decisiones	2026-04-03 23:45:08.567	23	2
7	2	MANTENIMIENTO: Llamar a Oscar para arreglar el malacate. Esta tarea esta modificada, las puertas las hará el mono de donde Alex	2026-03-27 18:49:07.961	21	2
39	5	Gestionar con Mary la lista y los pagaré para la creación o modificación de clientes	2026-04-04 00:27:10.241	21	2
42	2	PERSONAL: Desalojo de la casa de cabañas.	2026-04-05 19:55:09.856	21	2
24	2	GESTION HUMANA: llamar a Yanes para reingreso de accidente laboral	2026-04-04 00:16:22.412	23	2
15	2	GESTION HUMANA: Enviar las dotaciones de los proyectos, para el día de la visita	2026-04-03 23:40:45.895	23	2
18	2	GESTION HUMANA: CIRCULAR DE CELULALES	2026-04-04 00:11:55.619	23	2
27	2	PERSONAL: Pagar la salud de abril de edilma	2026-04-04 00:17:40.559	23	2
26	2	GESTION HUMANA: informar las novedades de salud	2026-04-04 00:17:23.038	23	2
17	2	PRODUCCIÓN: Terminar el informe de recicle con carta	2026-04-04 00:11:03.66	23	2
6	2	COSTO: Llamar a doña Sonia para dictarle los costos de marzo	2026-03-27 18:44:39.405	21	2
30	2	COLEGIO: Hacer la tarea con el nombre y los dibujos, comprar las loncheras y almuerzos del 6 al 11 de abril	2026-04-04 00:19:16.763	23	2
11	2	COSTOS Y PRODUCCIÓN: Preparar materia prima para el inicio de la semana	2026-04-03 23:36:57.353	23	2
\.


--
-- Data for Name: tipo_contrato; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tipo_contrato (id_tipo_contrato, nombre) FROM stdin;
1	A término fijo
2	A término indefinido
3	Obra o labor
4	Prestación de servicios
5	sin paga
\.


--
-- Data for Name: tipo_deduccion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tipo_deduccion (id_tipo_deduccion, nombre, descripcion, id_estado) FROM stdin;
1	Deuda	Cuando se realiza un prestamo a un trabajador 	1
2	Retención	retención	1
3	Fondo de Salud	el 4% de su salario corresponde a su salud	1
4	Fondo de Pensión	el 4% de su salario corresponde al fondo de pensión	1
\.


--
-- Data for Name: tipo_entidad; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tipo_entidad (id_tipo_entidad, nombre) FROM stdin;
1	Persona Natural
2	Empresa
\.


--
-- Data for Name: tipo_hora; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tipo_hora (id_tipo_hora, nombre, horario, recargo, valor_hora, id_estado) FROM stdin;
2	Hora extra diurna	Después de jornada diurna	+25%	9948.00	1
3	Hora ordinaria nocturna	7:00 p.m. – 6:00 a.m.	+35%	10744.00	1
4	Hora extra nocturna	Después de jornada nocturna	+75%	13927.00	1
7	Hora diurna en jornada dominical o festiva	6:00 a.m. – 7:00 p.m.	+75%	14325.00	1
8	Hora nocturna en jornada dominical o festiva	7:00 p.m. – 6:00 a.m.	+110%	17111.00	1
9	Hora extra diurna en jornada dominical o festiva	Después de jornada diurna en domingo/festivo	+100%	16315.00	1
10	Hora extra nocturna en jornada dominical o festiva	Después de jornada nocturna en domingo/festivo	+150%	20294.00	1
1	Hora ordinaria diurna	6:00 a.m. – 7:00 p.m.	0% (sin recargo)	7959.00	1
\.


--
-- Data for Name: tipo_identificacion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tipo_identificacion (id_tipo_identificacion, nombre) FROM stdin;
1	Cédula de Ciudadanía (CC)
2	NIT (Número de Identificación Tributaria)
3	Cédula de Extranjería (CE)
4	Tarjeta de Identidad (TI)
6	Registro Civil (RC)
7	Permiso por Protección Temporal (PPT)
8	Permiso Especial de Permanencia (PEP)
9	Tarjeta de Extranjería (TE)
10	Identificación del Exterior (IE)
5	Pasaporte (PA)
\.


--
-- Data for Name: tipo_maquina; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tipo_maquina (id_tipo_maquina, nombre, descripcion) FROM stdin;
1	Aglutinadora	Transformar residuos plásticos en un material homogéneo y compacto que pueda ser reprocesado en nuevas aplicaciones
2	Peletizadora	Transformar plásticos reciclados en pellets (gránulos) que sirven como materia prima para fabricar nuevos productos.
3	Extrusora	Procesar plásticos fundidos y darles forma continua mediante un molde o boquilla.
4	Lavadora	funciona para lavar el plastico sucio antes de empezar el proceso en aglutinadora
\.


--
-- Data for Name: tipo_movimiento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tipo_movimiento (id_tipo_movimiento, nombre, created_at, updated_at) FROM stdin;
1	Ingresos	2026-02-14 15:16:37.482039	2026-02-14 15:16:37.482039
2	Egresos	2026-02-14 15:16:37.482039	2026-02-14 15:16:37.482039
\.


--
-- Data for Name: tipo_prendas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tipo_prendas (id_tipo_prendas, nombre) FROM stdin;
1	Camisa
2	Pantalón
3	Botas
\.


--
-- Data for Name: tipo_regimen_iva; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tipo_regimen_iva (id_regimen_iva, nombre) FROM stdin;
1	Responsable de IVA
2	No Responsable de IVA
\.


--
-- Data for Name: traslados; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.traslados (id_traslado, fecha_traslado, id_usuario, bodega_origen_id, bodega_destino_id, observacion) FROM stdin;
\.


--
-- Data for Name: turno; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.turno (id_turno, nombre, horario) FROM stdin;
1	Diurno	06:00 - 18:00
2	Nocturno	18:00 - 06:00
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id_usuarios, id_tipo_identificacion, documento, nombre, apellido, dia_ingreso, id_tipo_contrato, id_estado_civil, id_arl, arl_fecha_ingreso, id_eps, eps_fecha_ingreso, id_caja_compensacion, id_fondo_pensiones, induccion_sst, induccion_puesto_trabajo, afiliacion_a_beneficiarios, nombre_contacto, telefono_contacto, direccion, celular, correo_electronico, firma_reglamento_interno_trabajo, firma_elementos_proteccion, firma_contrato, fecha_nacimiento, password, id_estado) FROM stdin;
1	1	1041631221	Jose Miguel	Correa Sanchez	2024-11-11	4	1	2	2025-12-16	31	2025-12-16	3	6	t	t	f	Gustavo Correa	3104549244	Calle 79c #75-37	3247798602	josemigeul44@gmail.com	t	t	t	2000-10-04	1041631221	1
2	1	1042762168	Maricela	Sanchez Gutiérrez 	2017-01-02	2	2	1	2017-01-02	1	2017-01-02	2	1	t	t	t	Mario Andres Rojas Ortiz 	3006528169	calle 75 #72b-201	3176416524	rhacquapack@gmail.com	t	t	t	1986-03-30	1042762168	1
5	1	32562500	Sandra Milena 	Sánchez Gutiérrez 	2026-01-07	1	6	\N	2026-01-05	1	2026-11-07	2	3	t	t	f	María Paula Pérez Sánchez 	3113940328	Calle 27b # 50a 93 	3104699484	sandrapatinar@gmail.com	t	t	t	1981-01-19	32562500	1
4	1	1092851078	Michel Dayanna	Pastrana Ramirez 	2025-04-11	1	1	1	2025-04-10	4	2025-04-10	2	1	t	t	f	Tatiana Rendon Morales	3003229907	calle 77AC # 80-40 (robledo)	3148352020	micheframirez1517@gmail.com	t	t	t	2004-12-30	1092851078	1
6	1	1026130172	Karol Milena	Toro Taborda	2025-05-01	2	1	1	2025-05-01	1	2025-05-02	2	1	t	t	f	Marta Taborda	\N	calle 126A sur #50-15 (Apto 606)	3113545571	kmtorot@gmail.com	t	t	t	1985-12-03	1026130172	1
7	1	1040514199	Yuliza Nileth	Vidal Muñoz	2021-09-01	2	1	1	2021-09-01	7	2021-09-01	2	2	t	t	f	Yuleima Vidal Muñoz	3128385286	calle 114 #70-23	3105991032	yulizavidal9@gmail.com	t	t	t	1995-10-15	1040514199	1
8	1	1128440969	Daniel	Castaño Grisales	2022-08-06	2	1	1	2022-08-05	1	2025-03-18	2	3	t	t	t	Argemiro Castaño	3132221025	carrera48b #83-59 (segundo piso)	3016782467	dcastano074@gmail.com	t	t	t	1991-09-06	1128440969	1
3	1	3662956	Mario Andres	Rojas Ortiz 	2017-01-02	2	2	1	2017-01-02	1	2017-01-02	2	1	t	t	t	Maricela Sanchez Gutiérrez 	3176416524	calle 75 #72b-201	3006528169	soluicionessai@gmail.com	t	t	t	1985-08-20	3662956	1
9	1	1089718253	Jordin Alonso	Alvarez Peña	2025-02-20	1	1	1	2025-02-19	3	2025-02-19	2	1	t	t	f	Alonso Alvarez	3116352213	vereda hato viejo, bello	3116352213	joridinalvarez2004@gmail.com	t	t	t	2004-08-28	1089718253	1
12	1	1214717951	Carlos Esteban	Mejia Monsalve	2023-06-14	2	3	1	2023-06-14	1	2023-06-13	2	2	t	t	t	Ingrid Aguirre Manco	3246338945	calle 106b # 27b-23 (interior 202) 	3004041752	estebanmejiamechas317@gmail.com	t	t	t	1992-12-17	1214717951	1
13	1	70119204	Bayron	Areiza Giraldo	2021-09-01	2	1	1	2021-09-15	1	2021-09-14	2	1	t	t	t	Nicole Areiza Berrio 	3167056365	calle 24 # 65GG-29	3044152728	byronareiza57@gmail.com	t	t	t	1957-12-30	70119204	1
14	1	1017171245	Pedro Luis	Murillo Posada	2024-12-02	2	2	1	2024-12-03	3	\N	2	2	t	t	t	Nancy García	3023660138	Calle21E # 41-19 (interior 105)	3024151509(CAMBIAR)	pedroposada212@gmail.com	t	f	t	1981-03-19	1017171245	1
15	1	1039095466	Dainer	Pacheco Bautista	2017-01-03	2	3	1	2018-06-09	1	2022-02-01	2	3	t	t	t	Yulieth Betancur	3126806995	Carrera 45A #93-171	3002057885	daineropacheco2017@gmail.com	t	t	t	1993-01-21	1039095466	1
17	1	1193137485	Sebastián	De ossa Aristizabal	2023-11-22	2	3	1	2023-11-22	1	2023-11-22	2	3	t	t	t	Deisy Natalia Higuita 	3126312202	Carrera44 #20B-12 (segundo piso)	3011914623	deossasebastian20@gmail.com	t	t	t	1997-08-11	1193137485	1
20	1	18396272	Fredy Alberto	Acevedo Cano	\N	\N	1	\N	\N	\N	\N	\N	\N	f	f	f	Samuel Acevedo	3147665231	carrera 72 # 45-18	3225358207	\N	f	f	f	1974-04-15	18396272	1
10	1	98714750	Diego Vicente	Lasso Murcia	2021-09-01	2	1	1	2021-09-01	1	2021-09-01	2	2	t	f	f	Ruth Murcia 	3128787622	carrera 66 #93-97	3015101680	dlassomurcia24@gmail.com	t	t	t	1985-07-24	98714750	1
16	1	1039078301	Wilson De Jesus 	Castaño Bautista	2024-12-19	1	1	1	2024-12-19	3	2024-12-20	2	2	t	t	t	Lucy Bautista Mendoza	3217841350	Calle 59 # 42-63	3147498478	wilsoncastanobautista@gmail.com	f	t	t	1985-12-03	1039078301	1
11	7	4996164	Edgar Enrique	Castaño Grisales	2025-09-17	1	2	1	2025-09-16	1	2025-09-17	2	3	t	t	t	Solange Carolina Garcia	3023142095	Barrio Santarita	3226277094	edgartalavera025@gmail.com	t	t	t	1992-03-11	4996164	1
22	1	70422291	Johan Alonso	Taborda Taborda	2022-09-01	2	2	1	2022-09-13	1	2022-09-15	2	1	t	t	t	Maria Victoria 	3147449879	carrera 50 # 52A - 07	3126803828	tabordajohanalonso@gmail.com	t	t	t	1985-07-20	70422291	1
23	1	15490901	Jose Bolivar 	Alvarez Moreno	2026-01-02	3	1	1	2026-01-08	11	\N	2	3	t	t	f	\N	\N	Carrera 30A # 35-65	3108343244	\N	t	t	t	1984-05-13	15490901	1
24	1	1026061349	Jhonier 	Rivera Gonzalez	2025-07-25	3	1	1	2025-04-21	7	2025-04-22	2	2	t	t	f	\N	\N	Ciudad Bolivar	3205143711	jhonierrivera9@gmail.com	t	t	f	2006-02-23	1026061349	1
21	1	1041630675	Maria Paula	Pérez Sánchez	\N	\N	1	\N	\N	\N	\N	\N	\N	f	f	f	Sandra Sanchez	3104699484	Calle 27b # 50a 93	3113940328	mariapaulaperezsanchez54@gmail.com	f	f	f	2004-12-10	1041630675	1
18	1	98581982	Ancizar 	Arango Rendon	2017-01-03	2	3	1	2017-01-23	2	2014-03-01	2	1	t	t	f	Marina Lujan De David	604 2877476	carrera 49B # 254-30 (apto 130)	3003743035	\N	t	t	t	1970-07-15	98581982	1
19	1	1067909086	Jesus David	Estrella Avilez	2025-07-01	1	3	1	2025-07-02	1	2025-07-01	2	6	t	t	f	\N	\N	carrera 46A #104A - 25	3507359706	\N	t	t	t	1997-10-24	1067909086	2
\.


--
-- Data for Name: usuarios_x_rol; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios_x_rol (id_usuarios_x_rol, id_usuarios, id_rol) FROM stdin;
1	1	20
2	2	13
3	2	14
4	2	20
8	5	3
10	4	1
11	6	18
12	7	4
13	8	7
14	3	16
15	3	20
16	3	21
17	9	22
21	12	9
22	12	11
24	13	12
25	13	11
26	14	11
27	14	10
28	15	11
29	15	8
32	17	11
33	17	10
36	19	11
37	19	8
38	20	22
39	10	2
40	16	8
41	16	11
42	11	9
43	11	11
45	22	19
46	23	19
47	24	19
48	21	15
49	18	8
50	18	11
\.


--
-- Data for Name: vacaciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vacaciones (id_vacaciones, id_usuarios, fecha_inicio, fecha_fin) FROM stdin;
\.


--
-- Data for Name: valor_auxilio_transporte; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.valor_auxilio_transporte (id, nombre, valor) FROM stdin;
1	Valor dia auxilio de transporte 2026	8303.00
\.


--
-- Name: arl_id_arl_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.arl_id_arl_seq', 2, true);


--
-- Name: bodegas_id_bodega_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bodegas_id_bodega_seq', 38, true);


--
-- Name: caja_compensacion_id_caja_compensacion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.caja_compensacion_id_caja_compensacion_seq', 3, true);


--
-- Name: cajas_id_caja_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cajas_id_caja_seq', 1, true);


--
-- Name: ciudad_id_ciudad_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ciudad_id_ciudad_seq', 232, true);


--
-- Name: clientes_id_cliente_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.clientes_id_cliente_seq', 1432, true);


--
-- Name: detalle_deducciones_id_detalle_deducciones_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.detalle_deducciones_id_detalle_deducciones_seq', 7, true);


--
-- Name: detalle_dotacion_detalle_dotacion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.detalle_dotacion_detalle_dotacion_seq', 1, false);


--
-- Name: detalle_factura_id_detalle_factura_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.detalle_factura_id_detalle_factura_seq', 3, true);


--
-- Name: detalle_nomina_id_detalle_nomina_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.detalle_nomina_id_detalle_nomina_seq', 5, true);


--
-- Name: detalle_salida_id_detalle_salida_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.detalle_salida_id_detalle_salida_seq', 1, false);


--
-- Name: entregas_dotaciones_id_entregas_dotaciones_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.entregas_dotaciones_id_entregas_dotaciones_seq', 1, false);


--
-- Name: eps_id_eps_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.eps_id_eps_seq', 31, true);


--
-- Name: estado_civil_id_estado_civil_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.estado_civil_id_estado_civil_seq', 6, true);


--
-- Name: estado_id_estado_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.estado_id_estado_seq', 29, true);


--
-- Name: facturas_id_facturas_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.facturas_id_facturas_seq', 1, true);


--
-- Name: familia_producto_id_familia_producto_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.familia_producto_id_familia_producto_seq', 4, true);


--
-- Name: fondo_pensiones_id_fondo_pensiones_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.fondo_pensiones_id_fondo_pensiones_seq', 6, true);


--
-- Name: grupos_productos_id_grupos_productos_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.grupos_productos_id_grupos_productos_seq', 23, true);


--
-- Name: inventario_id_inventario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inventario_id_inventario_seq', 4, true);


--
-- Name: ivas_id_iva_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ivas_id_iva_seq', 3, true);


--
-- Name: maquinas_id_maquina_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.maquinas_id_maquina_seq', 7, true);


--
-- Name: medida_id_medida_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.medida_id_medida_seq', 5, true);


--
-- Name: movimiento_caja_id_movimiento_caja_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.movimiento_caja_id_movimiento_caja_seq', 3, true);


--
-- Name: movimientos_kardex_id_movimientos_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.movimientos_kardex_id_movimientos_seq', 5, true);


--
-- Name: nomina_id_nomina_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.nomina_id_nomina_seq', 3, true);


--
-- Name: notas_id_notas_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notas_id_notas_seq', 1, false);


--
-- Name: produccion_id_produccion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.produccion_id_produccion_seq', 3, true);


--
-- Name: produccion_medida_id_produccion_medida_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.produccion_medida_id_produccion_medida_seq', 4, true);


--
-- Name: producto_id_producto_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.producto_id_producto_seq', 2710, true);


--
-- Name: producto_x_proveedor_id_producto_x_proveedor_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.producto_x_proveedor_id_producto_x_proveedor_seq', 3, true);


--
-- Name: proveedor_id_proveedor_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.proveedor_id_proveedor_seq', 148, true);


--
-- Name: responsabilidad_fiscal_id_responsabilidad_fiscal_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.responsabilidad_fiscal_id_responsabilidad_fiscal_seq', 5, true);


--
-- Name: retefuente_id_retefuente_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.retefuente_id_retefuente_seq', 17, true);


--
-- Name: rol_id_rol_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rol_id_rol_seq', 23, true);


--
-- Name: salidas_id_salida_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.salidas_id_salida_seq', 1, false);


--
-- Name: tallas_empleados_id_tallas_empleados_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tallas_empleados_id_tallas_empleados_seq', 1, false);


--
-- Name: tareas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tareas_id_seq', 1, false);


--
-- Name: tipo_contrato_id_tipo_contrato_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tipo_contrato_id_tipo_contrato_seq', 5, true);


--
-- Name: tipo_deduccion_id_tipo_deduccion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tipo_deduccion_id_tipo_deduccion_seq', 4, true);


--
-- Name: tipo_entidad_id_tipo_entidad_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tipo_entidad_id_tipo_entidad_seq', 2, true);


--
-- Name: tipo_hora_id_tipo_hora_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tipo_hora_id_tipo_hora_seq', 11, true);


--
-- Name: tipo_identificacion_id_tipo_identificacion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tipo_identificacion_id_tipo_identificacion_seq', 10, true);


--
-- Name: tipo_maquina_id_tipo_maquina_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tipo_maquina_id_tipo_maquina_seq', 4, true);


--
-- Name: tipo_movimiento_id_tipo_movimiento_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tipo_movimiento_id_tipo_movimiento_seq', 4, true);


--
-- Name: tipo_prendas_id_tipo_prendas_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tipo_prendas_id_tipo_prendas_seq', 3, true);


--
-- Name: tipo_regimen_iva_id_regimen_iva_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tipo_regimen_iva_id_regimen_iva_seq', 2, true);


--
-- Name: traslados_id_traslado_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.traslados_id_traslado_seq', 1, false);


--
-- Name: turno_id_turno_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.turno_id_turno_seq', 2, true);


--
-- Name: usuarios_id_usuarios_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_usuarios_seq', 24, true);


--
-- Name: usuarios_x_rol_id_usuarios_x_rol_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_x_rol_id_usuarios_x_rol_seq', 50, true);


--
-- Name: vacaciones_id_vacaciones_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.vacaciones_id_vacaciones_seq', 1, false);


--
-- Name: valor_auxilio_transporte_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.valor_auxilio_transporte_id_seq', 1, true);


--
-- Name: arl arl_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.arl
    ADD CONSTRAINT arl_pkey PRIMARY KEY (id_arl);


--
-- Name: bodegas bodegas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bodegas
    ADD CONSTRAINT bodegas_pkey PRIMARY KEY (id_bodega);


--
-- Name: caja_compensacion caja_compensacion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.caja_compensacion
    ADD CONSTRAINT caja_compensacion_pkey PRIMARY KEY (id_caja_compensacion);


--
-- Name: cajas cajas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cajas
    ADD CONSTRAINT cajas_pkey PRIMARY KEY (id_caja);


--
-- Name: ciudad ciudad_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ciudad
    ADD CONSTRAINT ciudad_pkey PRIMARY KEY (id_ciudad);


--
-- Name: clientes clientes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT clientes_pkey PRIMARY KEY (id_cliente);


--
-- Name: detalle_deducciones detalle_deducciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_deducciones
    ADD CONSTRAINT detalle_deducciones_pkey PRIMARY KEY (id_detalle_deducciones);


--
-- Name: detalle_dotacion detalle_dotacion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_dotacion
    ADD CONSTRAINT detalle_dotacion_pkey PRIMARY KEY (detalle_dotacion);


--
-- Name: detalle_factura detalle_factura_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_factura
    ADD CONSTRAINT detalle_factura_pkey PRIMARY KEY (id_detalle_factura);


--
-- Name: detalle_nomina detalle_nomina_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_nomina
    ADD CONSTRAINT detalle_nomina_pkey PRIMARY KEY (id_detalle_nomina);


--
-- Name: detalle_salida detalle_salida_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_salida
    ADD CONSTRAINT detalle_salida_pkey PRIMARY KEY (id_detalle_salida);


--
-- Name: entregas_dotaciones entregas_dotaciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.entregas_dotaciones
    ADD CONSTRAINT entregas_dotaciones_pkey PRIMARY KEY (id_entregas_dotaciones);


--
-- Name: eps eps_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.eps
    ADD CONSTRAINT eps_pkey PRIMARY KEY (id_eps);


--
-- Name: estado_civil estado_civil_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estado_civil
    ADD CONSTRAINT estado_civil_pkey PRIMARY KEY (id_estado_civil);


--
-- Name: estado estado_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estado
    ADD CONSTRAINT estado_pkey PRIMARY KEY (id_estado);


--
-- Name: facturas facturas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.facturas
    ADD CONSTRAINT facturas_pkey PRIMARY KEY (id_facturas);


--
-- Name: familia_producto familia_producto_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.familia_producto
    ADD CONSTRAINT familia_producto_pkey PRIMARY KEY (id_familia_producto);


--
-- Name: fondo_pensiones fondo_pensiones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fondo_pensiones
    ADD CONSTRAINT fondo_pensiones_pkey PRIMARY KEY (id_fondo_pensiones);


--
-- Name: grupos_productos grupos_productos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grupos_productos
    ADD CONSTRAINT grupos_productos_pkey PRIMARY KEY (id_grupos_productos);


--
-- Name: inventario inventario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventario
    ADD CONSTRAINT inventario_pkey PRIMARY KEY (id_inventario);


--
-- Name: ivas ivas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ivas
    ADD CONSTRAINT ivas_pkey PRIMARY KEY (id_iva);


--
-- Name: maquinas maquinas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.maquinas
    ADD CONSTRAINT maquinas_pkey PRIMARY KEY (id_maquina);


--
-- Name: medida medida_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medida
    ADD CONSTRAINT medida_pkey PRIMARY KEY (id_medida);


--
-- Name: movimiento_caja movimiento_caja_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movimiento_caja
    ADD CONSTRAINT movimiento_caja_pkey PRIMARY KEY (id_movimiento_caja);


--
-- Name: movimientos_kardex movimientos_kardex_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movimientos_kardex
    ADD CONSTRAINT movimientos_kardex_pkey PRIMARY KEY (id_movimientos);


--
-- Name: nomina nomina_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nomina
    ADD CONSTRAINT nomina_pkey PRIMARY KEY (id_nomina);


--
-- Name: notas notas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notas
    ADD CONSTRAINT notas_pkey PRIMARY KEY (id_notas);


--
-- Name: produccion_medida produccion_medida_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produccion_medida
    ADD CONSTRAINT produccion_medida_pkey PRIMARY KEY (id_produccion_medida);


--
-- Name: produccion produccion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produccion
    ADD CONSTRAINT produccion_pkey PRIMARY KEY (id_produccion);


--
-- Name: producto producto_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producto
    ADD CONSTRAINT producto_pkey PRIMARY KEY (id_producto);


--
-- Name: producto_x_proveedor producto_x_proveedor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producto_x_proveedor
    ADD CONSTRAINT producto_x_proveedor_pkey PRIMARY KEY (id_producto_x_proveedor);


--
-- Name: proveedor proveedor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proveedor
    ADD CONSTRAINT proveedor_pkey PRIMARY KEY (id_proveedor);


--
-- Name: responsabilidad_fiscal responsabilidad_fiscal_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.responsabilidad_fiscal
    ADD CONSTRAINT responsabilidad_fiscal_pkey PRIMARY KEY (id_responsabilidad_fiscal);


--
-- Name: retefuente retefuente_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.retefuente
    ADD CONSTRAINT retefuente_pkey PRIMARY KEY (id_retefuente);


--
-- Name: rol rol_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol
    ADD CONSTRAINT rol_pkey PRIMARY KEY (id_rol);


--
-- Name: salidas salidas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.salidas
    ADD CONSTRAINT salidas_pkey PRIMARY KEY (id_salida);


--
-- Name: tallas_empleados tallas_empleados_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tallas_empleados
    ADD CONSTRAINT tallas_empleados_pkey PRIMARY KEY (id_tallas_empleados);


--
-- Name: tareas tareas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tareas
    ADD CONSTRAINT tareas_pkey PRIMARY KEY (id_tareas);


--
-- Name: tipo_contrato tipo_contrato_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_contrato
    ADD CONSTRAINT tipo_contrato_pkey PRIMARY KEY (id_tipo_contrato);


--
-- Name: tipo_deduccion tipo_deduccion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_deduccion
    ADD CONSTRAINT tipo_deduccion_pkey PRIMARY KEY (id_tipo_deduccion);


--
-- Name: tipo_entidad tipo_entidad_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_entidad
    ADD CONSTRAINT tipo_entidad_pkey PRIMARY KEY (id_tipo_entidad);


--
-- Name: tipo_hora tipo_hora_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_hora
    ADD CONSTRAINT tipo_hora_pkey PRIMARY KEY (id_tipo_hora);


--
-- Name: tipo_identificacion tipo_identificacion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_identificacion
    ADD CONSTRAINT tipo_identificacion_pkey PRIMARY KEY (id_tipo_identificacion);


--
-- Name: tipo_maquina tipo_maquina_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_maquina
    ADD CONSTRAINT tipo_maquina_pkey PRIMARY KEY (id_tipo_maquina);


--
-- Name: tipo_movimiento tipo_movimiento_nombre_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_movimiento
    ADD CONSTRAINT tipo_movimiento_nombre_key UNIQUE (nombre);


--
-- Name: tipo_movimiento tipo_movimiento_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_movimiento
    ADD CONSTRAINT tipo_movimiento_pkey PRIMARY KEY (id_tipo_movimiento);


--
-- Name: tipo_prendas tipo_prendas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_prendas
    ADD CONSTRAINT tipo_prendas_pkey PRIMARY KEY (id_tipo_prendas);


--
-- Name: tipo_regimen_iva tipo_regimen_iva_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_regimen_iva
    ADD CONSTRAINT tipo_regimen_iva_pkey PRIMARY KEY (id_regimen_iva);


--
-- Name: traslados traslados_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.traslados
    ADD CONSTRAINT traslados_pkey PRIMARY KEY (id_traslado);


--
-- Name: turno turno_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.turno
    ADD CONSTRAINT turno_pkey PRIMARY KEY (id_turno);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id_usuarios);


--
-- Name: usuarios_x_rol usuarios_x_rol_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios_x_rol
    ADD CONSTRAINT usuarios_x_rol_pkey PRIMARY KEY (id_usuarios_x_rol);


--
-- Name: vacaciones vacaciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vacaciones
    ADD CONSTRAINT vacaciones_pkey PRIMARY KEY (id_vacaciones);


--
-- Name: valor_auxilio_transporte valor_auxilio_transporte_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.valor_auxilio_transporte
    ADD CONSTRAINT valor_auxilio_transporte_pkey PRIMARY KEY (id);


--
-- Name: idx_cajas_estado; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_cajas_estado ON public.cajas USING btree (id_estado);


--
-- Name: idx_detalle_deducciones_id_nomina; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_detalle_deducciones_id_nomina ON public.detalle_deducciones USING btree (id_nomina);


--
-- Name: idx_detalle_nomina_id_nomina; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_detalle_nomina_id_nomina ON public.detalle_nomina USING btree (id_nomina);


--
-- Name: idx_maquinas_tipo_maquina; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_maquinas_tipo_maquina ON public.maquinas USING btree (id_tipo_maquina);


--
-- Name: idx_movimiento_caja_caja; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_movimiento_caja_caja ON public.movimiento_caja USING btree (id_caja);


--
-- Name: idx_movimiento_caja_estado; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_movimiento_caja_estado ON public.movimiento_caja USING btree (id_estado);


--
-- Name: idx_movimiento_caja_fecha; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_movimiento_caja_fecha ON public.movimiento_caja USING btree (fecha_hora);


--
-- Name: idx_movimiento_caja_tipo_movimiento; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_movimiento_caja_tipo_movimiento ON public.movimiento_caja USING btree (id_tipo_movimiento);


--
-- Name: idx_movimiento_caja_usuario; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_movimiento_caja_usuario ON public.movimiento_caja USING btree (id_usuario);


--
-- Name: idx_nomina_fecha_nomina; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_nomina_fecha_nomina ON public.nomina USING btree (fecha_nomina);


--
-- Name: idx_nomina_id_usuario_trabajador; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_nomina_id_usuario_trabajador ON public.nomina USING btree (id_usuario_trabajador);


--
-- Name: idx_nomina_periodo; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_nomina_periodo ON public.nomina USING btree (periodo_inicio, periodo_fin);


--
-- Name: idx_notas_id_usuario; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_notas_id_usuario ON public.notas USING btree (id_usuario);


--
-- Name: idx_notas_titulo; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_notas_titulo ON public.notas USING btree (titulo);


--
-- Name: idx_produccion_fecha_hora; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_produccion_fecha_hora ON public.produccion USING btree (fecha_hora);


--
-- Name: idx_produccion_maquina; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_produccion_maquina ON public.produccion USING btree (id_maquina);


--
-- Name: idx_produccion_medida_medida; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_produccion_medida_medida ON public.produccion_medida USING btree (id_medida);


--
-- Name: idx_produccion_medida_produccion; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_produccion_medida_produccion ON public.produccion_medida USING btree (id_produccion);


--
-- Name: idx_produccion_producto; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_produccion_producto ON public.produccion USING btree (id_producto);


--
-- Name: idx_produccion_turno; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_produccion_turno ON public.produccion USING btree (id_turno);


--
-- Name: idx_produccion_usuario; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_produccion_usuario ON public.produccion USING btree (id_usuario);


--
-- Name: cajas fk_cajas_estado; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cajas
    ADD CONSTRAINT fk_cajas_estado FOREIGN KEY (id_estado) REFERENCES public.estado(id_estado) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: clientes fk_clientes_estado; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT fk_clientes_estado FOREIGN KEY (id_estado) REFERENCES public.estado(id_estado);


--
-- Name: detalle_deducciones fk_detalle_deducciones_nomina; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_deducciones
    ADD CONSTRAINT fk_detalle_deducciones_nomina FOREIGN KEY (id_nomina) REFERENCES public.nomina(id_nomina) ON DELETE CASCADE;


--
-- Name: detalle_deducciones fk_detalle_deducciones_tipo_deduccion; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_deducciones
    ADD CONSTRAINT fk_detalle_deducciones_tipo_deduccion FOREIGN KEY (id_tipo_deduccion) REFERENCES public.tipo_deduccion(id_tipo_deduccion);


--
-- Name: detalle_nomina fk_detalle_nomina_nomina; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_nomina
    ADD CONSTRAINT fk_detalle_nomina_nomina FOREIGN KEY (id_nomina) REFERENCES public.nomina(id_nomina) ON DELETE CASCADE;


--
-- Name: detalle_nomina fk_detalle_nomina_tipo_hora; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_nomina
    ADD CONSTRAINT fk_detalle_nomina_tipo_hora FOREIGN KEY (id_tipo_hora) REFERENCES public.tipo_hora(id_tipo_hora);


--
-- Name: facturas fk_facturas_estado; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.facturas
    ADD CONSTRAINT fk_facturas_estado FOREIGN KEY (id_estado) REFERENCES public.estado(id_estado);


--
-- Name: inventario fk_inventario_traslado; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventario
    ADD CONSTRAINT fk_inventario_traslado FOREIGN KEY (id_traslado) REFERENCES public.traslados(id_traslado) ON DELETE SET NULL;


--
-- Name: maquinas fk_maquinas_tipo_maquina; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.maquinas
    ADD CONSTRAINT fk_maquinas_tipo_maquina FOREIGN KEY (id_tipo_maquina) REFERENCES public.tipo_maquina(id_tipo_maquina) NOT VALID;


--
-- Name: movimiento_caja fk_movimiento_caja_caja; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movimiento_caja
    ADD CONSTRAINT fk_movimiento_caja_caja FOREIGN KEY (id_caja) REFERENCES public.cajas(id_caja) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: movimiento_caja fk_movimiento_caja_estado; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movimiento_caja
    ADD CONSTRAINT fk_movimiento_caja_estado FOREIGN KEY (id_estado) REFERENCES public.estado(id_estado) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: movimiento_caja fk_movimiento_caja_tipo_movimiento; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movimiento_caja
    ADD CONSTRAINT fk_movimiento_caja_tipo_movimiento FOREIGN KEY (id_tipo_movimiento) REFERENCES public.tipo_movimiento(id_tipo_movimiento) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: movimiento_caja fk_movimiento_caja_usuario; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movimiento_caja
    ADD CONSTRAINT fk_movimiento_caja_usuario FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id_usuarios) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: nomina fk_nomina_estado; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nomina
    ADD CONSTRAINT fk_nomina_estado FOREIGN KEY (id_estado) REFERENCES public.estado(id_estado);


--
-- Name: nomina fk_nomina_usuario_creador; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nomina
    ADD CONSTRAINT fk_nomina_usuario_creador FOREIGN KEY (id_usuario_creador) REFERENCES public.usuarios(id_usuarios);


--
-- Name: nomina fk_nomina_usuario_trabajador; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nomina
    ADD CONSTRAINT fk_nomina_usuario_trabajador FOREIGN KEY (id_usuario_trabajador) REFERENCES public.usuarios(id_usuarios);


--
-- Name: notas fk_notas_usuario; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notas
    ADD CONSTRAINT fk_notas_usuario FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id_usuarios) ON DELETE CASCADE;


--
-- Name: notas fk_notas_usuario_creador; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notas
    ADD CONSTRAINT fk_notas_usuario_creador FOREIGN KEY (id_usuario_creador) REFERENCES public.usuarios(id_usuarios) NOT VALID;


--
-- Name: produccion fk_produccion_maquina; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produccion
    ADD CONSTRAINT fk_produccion_maquina FOREIGN KEY (id_maquina) REFERENCES public.maquinas(id_maquina) NOT VALID;


--
-- Name: produccion_medida fk_produccion_medida_medida; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produccion_medida
    ADD CONSTRAINT fk_produccion_medida_medida FOREIGN KEY (id_medida) REFERENCES public.medida(id_medida) NOT VALID;


--
-- Name: produccion_medida fk_produccion_medida_produccion; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produccion_medida
    ADD CONSTRAINT fk_produccion_medida_produccion FOREIGN KEY (id_produccion) REFERENCES public.produccion(id_produccion) ON DELETE CASCADE NOT VALID;


--
-- Name: produccion fk_produccion_producto; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produccion
    ADD CONSTRAINT fk_produccion_producto FOREIGN KEY (id_producto) REFERENCES public.producto(id_producto) NOT VALID;


--
-- Name: produccion fk_produccion_turno; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produccion
    ADD CONSTRAINT fk_produccion_turno FOREIGN KEY (id_turno) REFERENCES public.turno(id_turno) NOT VALID;


--
-- Name: produccion fk_produccion_usuario; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produccion
    ADD CONSTRAINT fk_produccion_usuario FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id_usuarios) NOT VALID;


--
-- Name: proveedor fk_proveedor_estado; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proveedor
    ADD CONSTRAINT fk_proveedor_estado FOREIGN KEY (id_estado) REFERENCES public.estado(id_estado);


--
-- Name: tareas fk_tareas_estado; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tareas
    ADD CONSTRAINT fk_tareas_estado FOREIGN KEY (id_estado) REFERENCES public.estado(id_estado);


--
-- Name: tareas fk_tareas_usuario_creador; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tareas
    ADD CONSTRAINT fk_tareas_usuario_creador FOREIGN KEY (id_usuario_creador) REFERENCES public.usuarios(id_usuarios) NOT VALID;


--
-- Name: tipo_deduccion fk_tipo_deduccion_estado; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_deduccion
    ADD CONSTRAINT fk_tipo_deduccion_estado FOREIGN KEY (id_estado) REFERENCES public.estado(id_estado);


--
-- Name: tipo_hora fk_tipo_hora_estado; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_hora
    ADD CONSTRAINT fk_tipo_hora_estado FOREIGN KEY (id_estado) REFERENCES public.estado(id_estado);


--
-- Name: usuarios id_arl; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT id_arl FOREIGN KEY (id_arl) REFERENCES public.arl(id_arl) NOT VALID;


--
-- Name: inventario id_bodega; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventario
    ADD CONSTRAINT id_bodega FOREIGN KEY (id_bodega) REFERENCES public.bodegas(id_bodega) NOT VALID;


--
-- Name: movimientos_kardex id_bodegas; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movimientos_kardex
    ADD CONSTRAINT id_bodegas FOREIGN KEY (id_bodega) REFERENCES public.bodegas(id_bodega) NOT VALID;


--
-- Name: usuarios id_caja_compensacion; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT id_caja_compensacion FOREIGN KEY (id_caja_compensacion) REFERENCES public.caja_compensacion(id_caja_compensacion) NOT VALID;


--
-- Name: proveedor id_ciudad; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proveedor
    ADD CONSTRAINT id_ciudad FOREIGN KEY (id_ciudad) REFERENCES public.ciudad(id_ciudad) NOT VALID;


--
-- Name: clientes id_ciudad; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT id_ciudad FOREIGN KEY (id_ciudad) REFERENCES public.ciudad(id_ciudad) NOT VALID;


--
-- Name: salidas id_cliente; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.salidas
    ADD CONSTRAINT id_cliente FOREIGN KEY (id_cliente) REFERENCES public.clientes(id_cliente) NOT VALID;


--
-- Name: detalle_dotacion id_entregas_dotacion; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_dotacion
    ADD CONSTRAINT id_entregas_dotacion FOREIGN KEY (id_entregas_dotacion) REFERENCES public.entregas_dotaciones(id_entregas_dotaciones) NOT VALID;


--
-- Name: usuarios id_eps; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT id_eps FOREIGN KEY (id_eps) REFERENCES public.eps(id_eps) NOT VALID;


--
-- Name: usuarios id_estado; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT id_estado FOREIGN KEY (id_estado) REFERENCES public.estado(id_estado) NOT VALID;


--
-- Name: producto id_estado; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producto
    ADD CONSTRAINT id_estado FOREIGN KEY (id_estado) REFERENCES public.estado(id_estado) NOT VALID;


--
-- Name: bodegas id_estado; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bodegas
    ADD CONSTRAINT id_estado FOREIGN KEY (id_estado) REFERENCES public.estado(id_estado) NOT VALID;


--
-- Name: usuarios id_estado_civil; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT id_estado_civil FOREIGN KEY (id_estado_civil) REFERENCES public.estado_civil(id_estado_civil) NOT VALID;


--
-- Name: detalle_factura id_factura; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_factura
    ADD CONSTRAINT id_factura FOREIGN KEY (id_factura) REFERENCES public.facturas(id_facturas) NOT VALID;


--
-- Name: inventario id_factura; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventario
    ADD CONSTRAINT id_factura FOREIGN KEY (id_factura) REFERENCES public.facturas(id_facturas) NOT VALID;


--
-- Name: producto id_familia_productos; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producto
    ADD CONSTRAINT id_familia_productos FOREIGN KEY (id_familia) REFERENCES public.familia_producto(id_familia_producto) NOT VALID;


--
-- Name: usuarios id_fondo_pensiones; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT id_fondo_pensiones FOREIGN KEY (id_fondo_pensiones) REFERENCES public.fondo_pensiones(id_fondo_pensiones) NOT VALID;


--
-- Name: producto id_grupos_producto; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producto
    ADD CONSTRAINT id_grupos_producto FOREIGN KEY (id_grupos_producto) REFERENCES public.grupos_productos(id_grupos_productos) NOT VALID;


--
-- Name: detalle_factura id_iva; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_factura
    ADD CONSTRAINT id_iva FOREIGN KEY (id_iva) REFERENCES public.ivas(id_iva) NOT VALID;


--
-- Name: detalle_salida id_iva; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_salida
    ADD CONSTRAINT id_iva FOREIGN KEY (id_iva) REFERENCES public.ivas(id_iva) NOT VALID;


--
-- Name: producto id_medida; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producto
    ADD CONSTRAINT id_medida FOREIGN KEY (id_medida) REFERENCES public.medida(id_medida);


--
-- Name: producto_x_proveedor id_producto; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producto_x_proveedor
    ADD CONSTRAINT id_producto FOREIGN KEY (id_producto) REFERENCES public.producto(id_producto) NOT VALID;


--
-- Name: detalle_factura id_producto; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_factura
    ADD CONSTRAINT id_producto FOREIGN KEY (id_producto) REFERENCES public.producto(id_producto) NOT VALID;


--
-- Name: inventario id_producto; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventario
    ADD CONSTRAINT id_producto FOREIGN KEY (id_producto) REFERENCES public.producto(id_producto) NOT VALID;


--
-- Name: detalle_salida id_producto; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_salida
    ADD CONSTRAINT id_producto FOREIGN KEY (id_producto) REFERENCES public.producto(id_producto) NOT VALID;


--
-- Name: movimientos_kardex id_productos; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movimientos_kardex
    ADD CONSTRAINT id_productos FOREIGN KEY (id_producto) REFERENCES public.producto(id_producto) NOT VALID;


--
-- Name: producto_x_proveedor id_proveedor; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producto_x_proveedor
    ADD CONSTRAINT id_proveedor FOREIGN KEY (id_proveedor) REFERENCES public.proveedor(id_proveedor) NOT VALID;


--
-- Name: facturas id_proveedor; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.facturas
    ADD CONSTRAINT id_proveedor FOREIGN KEY (id_proveedor) REFERENCES public.proveedor(id_proveedor) NOT VALID;


--
-- Name: inventario id_proveedor; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventario
    ADD CONSTRAINT id_proveedor FOREIGN KEY (id_proveedor) REFERENCES public.proveedor(id_proveedor) NOT VALID;


--
-- Name: proveedor id_responsabilidad_fiscal; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proveedor
    ADD CONSTRAINT id_responsabilidad_fiscal FOREIGN KEY (id_responsabilidad_fiscal) REFERENCES public.responsabilidad_fiscal(id_responsabilidad_fiscal) NOT VALID;


--
-- Name: clientes id_responsabilidad_fiscal; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT id_responsabilidad_fiscal FOREIGN KEY (id_responsabilidad_fiscal) REFERENCES public.responsabilidad_fiscal(id_responsabilidad_fiscal) NOT VALID;


--
-- Name: detalle_factura id_retefuente; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_factura
    ADD CONSTRAINT id_retefuente FOREIGN KEY (id_retefuente) REFERENCES public.retefuente(id_retefuente) NOT VALID;


--
-- Name: detalle_salida id_retefuente; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_salida
    ADD CONSTRAINT id_retefuente FOREIGN KEY (id_retefuente) REFERENCES public.retefuente(id_retefuente) NOT VALID;


--
-- Name: usuarios_x_rol id_rol; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios_x_rol
    ADD CONSTRAINT id_rol FOREIGN KEY (id_rol) REFERENCES public.rol(id_rol) NOT VALID;


--
-- Name: detalle_salida id_salida; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_salida
    ADD CONSTRAINT id_salida FOREIGN KEY (id_salida) REFERENCES public.salidas(id_salida) NOT VALID;


--
-- Name: usuarios id_tipo_contrato; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT id_tipo_contrato FOREIGN KEY (id_tipo_contrato) REFERENCES public.tipo_contrato(id_tipo_contrato) NOT VALID;


--
-- Name: proveedor id_tipo_entidad; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proveedor
    ADD CONSTRAINT id_tipo_entidad FOREIGN KEY (id_tipo_entidad) REFERENCES public.tipo_entidad(id_tipo_entidad) NOT VALID;


--
-- Name: clientes id_tipo_entidad; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT id_tipo_entidad FOREIGN KEY (id_tipo_entidad) REFERENCES public.tipo_entidad(id_tipo_entidad) NOT VALID;


--
-- Name: usuarios id_tipo_identificacion; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT id_tipo_identificacion FOREIGN KEY (id_tipo_identificacion) REFERENCES public.tipo_identificacion(id_tipo_identificacion) NOT VALID;


--
-- Name: proveedor id_tipo_identificacion; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proveedor
    ADD CONSTRAINT id_tipo_identificacion FOREIGN KEY (id_tipo_identificacion) REFERENCES public.tipo_identificacion(id_tipo_identificacion) NOT VALID;


--
-- Name: clientes id_tipo_identificacion; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT id_tipo_identificacion FOREIGN KEY (id_tipo_identificacion) REFERENCES public.tipo_identificacion(id_tipo_identificacion) NOT VALID;


--
-- Name: tallas_empleados id_tipo_prendas; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tallas_empleados
    ADD CONSTRAINT id_tipo_prendas FOREIGN KEY (id_tipo_prendas) REFERENCES public.tipo_prendas(id_tipo_prendas) NOT VALID;


--
-- Name: detalle_dotacion id_tipo_prendas; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_dotacion
    ADD CONSTRAINT id_tipo_prendas FOREIGN KEY (id_tipo_prendas) REFERENCES public.tipo_prendas(id_tipo_prendas) NOT VALID;


--
-- Name: proveedor id_tipo_regimen_iva; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proveedor
    ADD CONSTRAINT id_tipo_regimen_iva FOREIGN KEY (id_tipo_regimen_iva) REFERENCES public.tipo_regimen_iva(id_regimen_iva) NOT VALID;


--
-- Name: clientes id_tipo_regimen_iva; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT id_tipo_regimen_iva FOREIGN KEY (id_tipo_regimen_iva) REFERENCES public.tipo_regimen_iva(id_regimen_iva) NOT VALID;


--
-- Name: salidas id_usuario; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.salidas
    ADD CONSTRAINT id_usuario FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id_usuarios) NOT VALID;


--
-- Name: tallas_empleados id_usuarios; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tallas_empleados
    ADD CONSTRAINT id_usuarios FOREIGN KEY (id_usuarios) REFERENCES public.usuarios(id_usuarios) NOT VALID;


--
-- Name: vacaciones id_usuarios; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vacaciones
    ADD CONSTRAINT id_usuarios FOREIGN KEY (id_usuarios) REFERENCES public.usuarios(id_usuarios) NOT VALID;


--
-- Name: entregas_dotaciones id_usuarios; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.entregas_dotaciones
    ADD CONSTRAINT id_usuarios FOREIGN KEY (id_usuarios) REFERENCES public.usuarios(id_usuarios) NOT VALID;


--
-- Name: usuarios_x_rol id_usuarios; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios_x_rol
    ADD CONSTRAINT id_usuarios FOREIGN KEY (id_usuarios) REFERENCES public.usuarios(id_usuarios) NOT VALID;


--
-- Name: facturas id_usuarios; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.facturas
    ADD CONSTRAINT id_usuarios FOREIGN KEY (id_usuarios) REFERENCES public.usuarios(id_usuarios) NOT VALID;


--
-- Name: tareas id_usuarios; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tareas
    ADD CONSTRAINT id_usuarios FOREIGN KEY (id_usuarios) REFERENCES public.usuarios(id_usuarios);


--
-- PostgreSQL database dump complete
--

-- \unrestrict M7CURbdxdUaUzry42CfolQhDLCIm7jeFVqJkmzvL3MipeG091ORJZ4vASK4eX85

