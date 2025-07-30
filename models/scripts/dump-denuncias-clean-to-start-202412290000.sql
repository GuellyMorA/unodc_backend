


-- Paso 1: Crear la base de datos denuncias2 (esto se ejecuta en la base de datos predeterminada, por ejemplo, postgres)
CREATE DATABASE denuncias2 WITH TEMPLATE = template0 ENCODING = 'UTF8';

-- Paso 2: Conectar manualmente a la base de datos denuncias2 en DBeaver antes de ejecutar el resto del script.
-- En DBeaver, selecciona la base de datos denuncias2 en el menú de conexión.

-- o alternativamente usar el comando \c (que es específico de psql, la línea de comandos de PostgreSQL) para cambiar de base de datos dentro de un script.
--  \connect denuncias


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Paso 3: Ejecutar el resto del script en la base de datos denuncias2.

-- Crear el esquema public
-- CREATE SCHEMA public;



-- Asignar el ownership del esquema public al usuario postgres
ALTER SCHEMA public OWNER TO postgres;




--
-- TOC entry 280 (class 1259 OID 101371)
-- Name: seq_actividades_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_actividades_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_actividades_id OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 326 (class 1259 OID 101463)
-- Name: actividades; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.actividades (
    id bigint DEFAULT nextval('public.seq_actividades_id'::regclass) NOT NULL,
	    sigla character varying(30),
    actividad character varying(255),
    tipo character varying(30),
    denuncia_personas_id bigint,
    control_id bigint,
    seguimiento_id bigint,
    usuarios_id bigint,
    descripcion character varying(255) NOT NULL,
    fec_registro timestamp without time zone DEFAULT now(),
    informe character varying(1000),
    estado character varying(30) DEFAULT 'ELABORADO'::character varying,
    transaccion character varying(30) DEFAULT 'CREAR'::character varying,
    usu_cre character varying(30) DEFAULT "current_user"(),
    fec_cre timestamp without time zone DEFAULT now() NOT NULL,
    usu_mod character varying(30),
    fec_mod timestamp without time zone,
    host_creacion character varying(30) DEFAULT inet_client_addr() NOT NULL,
    host_modificacion character varying(30)

);


ALTER TABLE public.actividades OWNER TO postgres;

--
-- TOC entry 303 (class 1259 OID 101417)
-- Name: seq_actividades_aud_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_actividades_aud_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_actividades_aud_id OWNER TO postgres;

--
-- TOC entry 327 (class 1259 OID 101476)
-- Name: actividades_aud; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.actividades_aud (
    id bigint DEFAULT nextval('public.seq_actividades_aud_id'::regclass) NOT NULL,
    actividades_id bigint NOT NULL,
		    sigla character varying(30),
    actividad character varying(255),
    tipo character varying(30),
    denuncia_personas_id bigint NOT NULL,
    control_id bigint NOT NULL,
    seguimiento_id bigint NOT NULL,
    usuarios_id bigint NOT NULL,
    observacion character varying(255) NOT NULL,
    fec_registro timestamp without time zone DEFAULT now() NOT NULL,
    informe character varying(1000),
    estado character varying(30) DEFAULT 'ELABORADO'::character varying,
    transaccion character varying(30) DEFAULT 'CREAR'::character varying,
    usu_cre character varying(30) DEFAULT "current_user"(),
    fec_cre timestamp without time zone DEFAULT now() NOT NULL,
    usu_mod character varying(30),
    fec_mod timestamp without time zone,
    host_creacion character varying(30) DEFAULT inet_client_addr() NOT NULL,
    host_modificacion character varying(30)
);


ALTER TABLE public.actividades_aud OWNER TO postgres;

--
-- TOC entry 281 (class 1259 OID 101373)
-- Name: seq_control_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_control_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_control_id OWNER TO postgres;

--
-- TOC entry 328 (class 1259 OID 101489)
-- Name: control; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.control (
    id bigint DEFAULT nextval('public.seq_control_id'::regclass) NOT NULL,
    denuncia_personas_id bigint NOT NULL,
    usuario_revisor_id bigint NOT NULL,
    analisis_denuncia character varying(1000) NOT NULL,
    recomendacion character varying(255) NOT NULL,
    fec_registro timestamp without time zone DEFAULT now() NOT NULL,
    estado character varying(30) DEFAULT 'ELABORADO'::character varying,
    transaccion character varying(30) DEFAULT 'CREAR'::character varying,
    usu_cre character varying(30) DEFAULT "current_user"(),
    fec_cre timestamp without time zone DEFAULT now() NOT NULL,
    usu_mod character varying(30),
    fec_mod timestamp without time zone,
    host_creacion character varying(30) DEFAULT inet_client_addr() NOT NULL,
    host_modificacion character varying(30)
);


ALTER TABLE public.control OWNER TO postgres;

--
-- TOC entry 304 (class 1259 OID 101419)
-- Name: seq_control_aud_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_control_aud_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_control_aud_id OWNER TO postgres;

--
-- TOC entry 329 (class 1259 OID 101502)
-- Name: control_aud; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.control_aud (
    id bigint DEFAULT nextval('public.seq_control_aud_id'::regclass) NOT NULL,
    control_id bigint NOT NULL,
    denuncia_personas_id bigint NOT NULL,
    usuario_revisor_id bigint NOT NULL,
    analisis_denuncia character varying(1000) NOT NULL,
    recomendacion character varying(255) NOT NULL,
    fec_registro timestamp without time zone DEFAULT now() NOT NULL,
    estado character varying(30),
    transaccion character varying(30),
    usu_cre character varying(30),
    fec_cre timestamp without time zone NOT NULL,
    usu_mod character varying(30),
    fec_mod timestamp without time zone,
    host_creacion character varying(30) NOT NULL,
    host_modificacion character varying(30)
);


ALTER TABLE public.control_aud OWNER TO postgres;

--
-- TOC entry 282 (class 1259 OID 101375)
-- Name: seq_denuncia_personas_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_denuncia_personas_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_denuncia_personas_id OWNER TO postgres;

--
-- TOC entry 330 (class 1259 OID 101510)
-- Name: denuncia_personas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.denuncia_personas (
    id bigint DEFAULT nextval('public.seq_denuncia_personas_id'::regclass) NOT NULL,
    nivel_geografico_id bigint NOT NULL,
    sigla character varying(10),
	    nivel_geografico_sigla character varying(10),
    modulos_sigla_amp_1 character varying(30),
    fec_ampliacion_1 timestamp without time zone,
    modulos_sigla_amp_2 character varying(30),
    fec_ampliacion_2 timestamp without time zone,
    cod_denuncia character varying(30) NOT NULL,
    denuncia_anonima boolean NOT NULL,
    reserva_identidad boolean NOT NULL,
    lugar_hecho character varying(255),
    fec_registro_hecho timestamp without time zone DEFAULT now() NOT NULL,
    hora_registro_hecho character varying(20) NOT NULL,
    detalle_hecho character varying(1000) NOT NULL,
    estado character varying(30) DEFAULT 'SOLICITADO'::character varying,
    transaccion character varying(30) DEFAULT 'CREAR'::character varying,
    usu_cre character varying(30) DEFAULT "current_user"(),
    fec_cre timestamp without time zone DEFAULT now() NOT NULL,
    usu_mod character varying(30),
    fec_mod timestamp without time zone,
    host_creacion character varying(30) DEFAULT inet_client_addr() NOT NULL,
    host_modificacion character varying(30)

);


ALTER TABLE public.denuncia_personas OWNER TO postgres;

--
-- TOC entry 305 (class 1259 OID 101421)
-- Name: seq_denuncia_personas_aud_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_denuncia_personas_aud_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_denuncia_personas_aud_id OWNER TO postgres;

--
-- TOC entry 331 (class 1259 OID 101523)
-- Name: denuncia_personas_aud; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.denuncia_personas_aud (
    id bigint DEFAULT nextval('public.seq_denuncia_personas_aud_id'::regclass) NOT NULL,
    denuncia_personas_id bigint NOT NULL,
    nivel_geografico_id bigint NOT NULL,
    sigla character varying(10),
	    nivel_geografico_sigla character varying(10),
    modulos_sigla_amp_1 character varying(30),
    fec_ampliacion_1 timestamp without time zone,
    modulos_sigla_amp_2 character varying(30),
    fec_ampliacion_2 timestamp without time zone,
    cod_denuncia character varying(30) NOT NULL,
    denuncia_anonima boolean NOT NULL,
    reserva_identidad boolean NOT NULL,
    lugar_hecho character varying(255),
    fec_registro_hecho timestamp without time zone DEFAULT now() NOT NULL,
    hora_registro_hecho character varying(20) NOT NULL,
    detalle_hecho character varying(1000) NOT NULL,
    estado character varying(30),
    transaccion character varying(30),
    usu_cre character varying(30),
    fec_cre timestamp without time zone NOT NULL,
    usu_mod character varying(30),
    fec_mod timestamp without time zone,
    host_creacion character varying(30) NOT NULL,
    host_modificacion character varying(30)
);


ALTER TABLE public.denuncia_personas_aud OWNER TO postgres;

--
-- TOC entry 283 (class 1259 OID 101377)
-- Name: seq_derivacion_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_derivacion_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_derivacion_id OWNER TO postgres;

--
-- TOC entry 332 (class 1259 OID 101531)
-- Name: derivacion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.derivacion (
    id bigint DEFAULT nextval('public.seq_derivacion_id'::regclass) NOT NULL,
    denuncia_personas_id bigint NOT NULL,
    control_id bigint NOT NULL,
    usuarios_id bigint NOT NULL,
    observacion character varying(255) NOT NULL,
    fec_registro timestamp without time zone DEFAULT now() NOT NULL,
    estado character varying(30) DEFAULT 'ELABORADO'::character varying,
    transaccion character varying(30) DEFAULT 'CREAR'::character varying,
    usu_cre character varying(30) DEFAULT "current_user"(),
    fec_cre timestamp without time zone DEFAULT now() NOT NULL,
    usu_mod character varying(30),
    fec_mod timestamp without time zone,
    host_creacion character varying(30) DEFAULT inet_client_addr() NOT NULL,
    host_modificacion character varying(30)
);


ALTER TABLE public.derivacion OWNER TO postgres;

--
-- TOC entry 306 (class 1259 OID 101423)
-- Name: seq_derivacion_aud_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_derivacion_aud_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_derivacion_aud_id OWNER TO postgres;

--
-- TOC entry 333 (class 1259 OID 101541)
-- Name: derivacion_aud; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.derivacion_aud (
    id bigint DEFAULT nextval('public.seq_derivacion_aud_id'::regclass) NOT NULL,
    derivacion_id bigint NOT NULL,
    denuncia_personas_id bigint NOT NULL,
    control_id bigint NOT NULL,
    usuarios_id bigint NOT NULL,
    observacion character varying(255) NOT NULL,
    fec_registro timestamp without time zone DEFAULT now() NOT NULL,
    estado character varying(30),
    transaccion character varying(30),
    usu_cre character varying(30),
    fec_cre timestamp without time zone NOT NULL,
    usu_mod character varying(30),
    fec_mod timestamp without time zone,
    host_creacion character varying(30) NOT NULL,
    host_modificacion character varying(30)
);


ALTER TABLE public.derivacion_aud OWNER TO postgres;

--
-- TOC entry 284 (class 1259 OID 101379)
-- Name: seq_documentos_path_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_documentos_path_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_documentos_path_id OWNER TO postgres;

--
-- TOC entry 334 (class 1259 OID 101546)
-- Name: documentos_path; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.documentos_path (
    id bigint DEFAULT nextval('public.seq_documentos_path_id'::regclass) NOT NULL,
    denuncia_personas_id bigint,
    usuarios_id bigint,
    seguimiento_id bigint,
    denunciante_id bigint,
    orden bigint NOT NULL,
    origen character varying(30) NOT NULL,
    documento_path character varying(255) NOT NULL,
    descripcion character varying(255) NOT NULL,
    justificacion_legal character varying(255) NOT NULL,
    fec_registro timestamp without time zone DEFAULT now() NOT NULL,
    estado character varying(30) DEFAULT 'ELABORADO'::character varying,
    transaccion character varying(30) DEFAULT 'CREAR'::character varying,
    usu_cre character varying(30) DEFAULT "current_user"(),
    fec_cre timestamp without time zone DEFAULT now() NOT NULL,
    usu_mod character varying(30),
    fec_mod timestamp without time zone,
    host_creacion character varying(30) DEFAULT inet_client_addr() NOT NULL,
    host_modificacion character varying(30)
);


ALTER TABLE public.documentos_path OWNER TO postgres;

--
-- TOC entry 307 (class 1259 OID 101425)
-- Name: seq_documentos_path_aud_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_documentos_path_aud_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_documentos_path_aud_id OWNER TO postgres;

--
-- TOC entry 335 (class 1259 OID 101559)
-- Name: documentos_path_aud; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.documentos_path_aud (
    id bigint DEFAULT nextval('public.seq_documentos_path_aud_id'::regclass) NOT NULL,
    documentos_path_id bigint NOT NULL,
    denuncia_personas_id bigint,
    usuarios_id bigint,
    actividades_id bigint,
    denunciante_id bigint,
    orden bigint NOT NULL,
    origen character varying(30) NOT NULL,
    documento_path character varying(255) NOT NULL,
    descripcion character varying(255) NOT NULL,
    justificacion_legal character varying(255) NOT NULL,
    fec_registro timestamp without time zone DEFAULT now() NOT NULL,
    estado character varying(30),
    transaccion character varying(30),
    usu_cre character varying(30),
    fec_cre timestamp without time zone NOT NULL,
    usu_mod character varying(30),
    fec_mod timestamp without time zone,
    host_creacion character varying(30) NOT NULL,
    host_modificacion character varying(30)
);


ALTER TABLE public.documentos_path_aud OWNER TO postgres;

--
-- TOC entry 285 (class 1259 OID 101381)
-- Name: seq_event_log_operaciones_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_event_log_operaciones_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_event_log_operaciones_id OWNER TO postgres;

--
-- TOC entry 336 (class 1259 OID 101567)
-- Name: event_log_operaciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event_log_operaciones (
    id bigint DEFAULT nextval('public.seq_event_log_operaciones_id'::regclass) NOT NULL,
    sesion_log_id bigint,
    fec_registro timestamp without time zone DEFAULT now() NOT NULL,
    operacion_realizada character varying(5000),
    observacion character varying(5000),
    estado character varying(30) DEFAULT 'ELABORADO'::character varying,
    transaccion character varying(30) DEFAULT 'CREAR'::character varying,
    usu_cre character varying(30) DEFAULT "current_user"(),
    fec_cre timestamp without time zone DEFAULT now() NOT NULL,
    usu_mod character varying(30),
    fec_mod timestamp without time zone,
    host_creacion character varying(30) DEFAULT inet_client_addr() NOT NULL,
    host_modificacion character varying(30)
);


ALTER TABLE public.event_log_operaciones OWNER TO postgres;

--
-- TOC entry 286 (class 1259 OID 101383)
-- Name: seq_genero_sexo_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_genero_sexo_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_genero_sexo_id OWNER TO postgres;

--
-- TOC entry 337 (class 1259 OID 101577)
-- Name: genero_sexo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.genero_sexo (
    id bigint DEFAULT nextval('public.seq_genero_sexo_id'::regclass) NOT NULL,
    sigla character varying(10),
    descripcion character varying(255) NOT NULL,
    estado character varying(30) DEFAULT 'ELABORADO'::character varying,
    transaccion character varying(30) DEFAULT 'CREAR'::character varying,
    usu_cre character varying(30) DEFAULT "current_user"(),
    fec_cre timestamp without time zone DEFAULT now() NOT NULL,
    usu_mod character varying(30),
    fec_mod timestamp without time zone,
    host_creacion character varying(30) DEFAULT inet_client_addr() NOT NULL,
    host_modificacion character varying(30)
);


ALTER TABLE public.genero_sexo OWNER TO postgres;

--
-- TOC entry 309 (class 1259 OID 101429)
-- Name: seq_genero_sexo_aud_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_genero_sexo_aud_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_genero_sexo_aud_id OWNER TO postgres;

--
-- TOC entry 338 (class 1259 OID 101586)
-- Name: genero_sexo_aud; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.genero_sexo_aud (
    id bigint DEFAULT nextval('public.seq_genero_sexo_aud_id'::regclass) NOT NULL,
    genero_sexo_id bigint NOT NULL,
    sigla character varying(10),
    descripcion character varying(255) NOT NULL,
    estado character varying(30),
    transaccion character varying(30),
    usu_cre character varying(30),
    fec_cre timestamp without time zone NOT NULL,
    usu_mod character varying(30),
    fec_mod timestamp without time zone,
    host_creacion character varying(30) NOT NULL,
    host_modificacion character varying(30)
);


ALTER TABLE public.genero_sexo_aud OWNER TO postgres;

--
-- TOC entry 287 (class 1259 OID 101385)
-- Name: seq_grados_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_grados_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_grados_id OWNER TO postgres;

--
-- TOC entry 339 (class 1259 OID 101590)
-- Name: grados; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.grados (
    id bigint DEFAULT nextval('public.seq_grados_id'::regclass) NOT NULL,
    sigla character varying(10) NOT NULL,
    grado character varying(30) NOT NULL,
    descripcion character varying(255) NOT NULL,
    estado character varying(30) DEFAULT 'ELABORADO'::character varying,
    transaccion character varying(30) DEFAULT 'CREAR'::character varying,
    usu_cre character varying(30) DEFAULT "current_user"(),
    fec_cre timestamp without time zone DEFAULT now() NOT NULL,
    usu_mod character varying(30),
    fec_mod timestamp without time zone,
    host_creacion character varying(30) DEFAULT inet_client_addr() NOT NULL,
    host_modificacion character varying(30)
);


ALTER TABLE public.grados OWNER TO postgres;

--
-- TOC entry 310 (class 1259 OID 101431)
-- Name: seq_grados_aud_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_grados_aud_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_grados_aud_id OWNER TO postgres;

--
-- TOC entry 340 (class 1259 OID 101599)
-- Name: grados_aud; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.grados_aud (
    id bigint DEFAULT nextval('public.seq_grados_aud_id'::regclass) NOT NULL,
    grados_id bigint NOT NULL,
    sigla character varying(10) NOT NULL,
    grado character varying(30) NOT NULL,
    descripcion character varying(255) NOT NULL,
    estado character varying(30),
    transaccion character varying(30),
    usu_cre character varying(30),
    fec_cre timestamp without time zone NOT NULL,
    usu_mod character varying(30),
    fec_mod timestamp without time zone,
    host_creacion character varying(30) NOT NULL,
    host_modificacion character varying(30)
);


ALTER TABLE public.grados_aud OWNER TO postgres;

--
-- TOC entry 288 (class 1259 OID 101387)
-- Name: seq_menus_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_menus_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_menus_id OWNER TO postgres;

--
-- TOC entry 341 (class 1259 OID 101603)
-- Name: menus; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.menus (
    id bigint DEFAULT nextval('public.seq_menus_id'::regclass) NOT NULL,
    modulos_sigla character varying(10) NOT NULL,
    sigla character varying(10) NOT NULL,
    menu character varying(30) NOT NULL,
    descripcion character varying(255) NOT NULL,
    nivel bigint NOT NULL,
    padre_id bigint NOT NULL,
    estado character varying(30) DEFAULT 'ELABORADO'::character varying,
    transaccion character varying(30) DEFAULT 'CREAR'::character varying,
    usu_cre character varying(30) DEFAULT "current_user"(),
    fec_cre timestamp without time zone DEFAULT now() NOT NULL,
    usu_mod character varying(30),
    fec_mod timestamp without time zone,
    host_creacion character varying(30) DEFAULT inet_client_addr() NOT NULL,
    host_modificacion character varying(30)
);


ALTER TABLE public.menus OWNER TO postgres;

--
-- TOC entry 311 (class 1259 OID 101433)
-- Name: seq_menus_aud_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_menus_aud_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_menus_aud_id OWNER TO postgres;

--
-- TOC entry 342 (class 1259 OID 101615)
-- Name: menus_aud; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.menus_aud (
    id bigint DEFAULT nextval('public.seq_menus_aud_id'::regclass) NOT NULL,
    menus_id bigint NOT NULL,
    modulos_sigla character varying(10) NOT NULL,
    sigla character varying(10) NOT NULL,
    menu character varying(30) NOT NULL,
    descripcion character varying(255) NOT NULL,
    nivel bigint NOT NULL,
    padre_id bigint NOT NULL,
    estado character varying(30),
    transaccion character varying(30),
    usu_cre character varying(30),
    fec_cre timestamp without time zone NOT NULL,
    usu_mod character varying(30),
    fec_mod timestamp without time zone,
    host_creacion character varying(30) NOT NULL,
    host_modificacion character varying(30)
);


ALTER TABLE public.menus_aud OWNER TO postgres;

--
-- TOC entry 289 (class 1259 OID 101389)
-- Name: seq_modulos_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_modulos_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_modulos_id OWNER TO postgres;

--
-- TOC entry 343 (class 1259 OID 101622)
-- Name: modulos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.modulos (
    id bigint DEFAULT nextval('public.seq_modulos_id'::regclass) NOT NULL,
    sigla character varying(10) NOT NULL,
    modulo character varying(30) NOT NULL,
    descripcion character varying(255) NOT NULL,
    estado character varying(30) DEFAULT 'ELABORADO'::character varying,
    transaccion character varying(30) DEFAULT 'CREAR'::character varying,
    usu_cre character varying(30) DEFAULT "current_user"(),
    fec_cre timestamp without time zone DEFAULT now() NOT NULL,
    usu_mod character varying(30),
    fec_mod timestamp without time zone,
    host_creacion character varying(30) DEFAULT inet_client_addr() NOT NULL,
    host_modificacion character varying(30)
);


ALTER TABLE public.modulos OWNER TO postgres;

--
-- TOC entry 312 (class 1259 OID 101435)
-- Name: seq_modulos_aud_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_modulos_aud_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_modulos_aud_id OWNER TO postgres;

--
-- TOC entry 344 (class 1259 OID 101631)
-- Name: modulos_aud; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.modulos_aud (
    id bigint DEFAULT nextval('public.seq_modulos_aud_id'::regclass) NOT NULL,
    modulos_id bigint NOT NULL,
    sigla character varying(10) NOT NULL,
    modulo character varying(30) NOT NULL,
    descripcion character varying(255) NOT NULL,
    estado character varying(30) DEFAULT 'ELABORADO'::character varying,
    transaccion character varying(30) DEFAULT 'CREAR'::character varying,
    usu_cre character varying(30) DEFAULT "current_user"(),
    fec_cre timestamp without time zone DEFAULT now() NOT NULL,
    usu_mod character varying(30),
    fec_mod timestamp without time zone,
    host_creacion character varying(30) DEFAULT inet_client_addr() NOT NULL,
    host_modificacion character varying(30)
);


ALTER TABLE public.modulos_aud OWNER TO postgres;

--
-- TOC entry 290 (class 1259 OID 101391)
-- Name: seq_nivel_geografico_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_nivel_geografico_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_nivel_geografico_id OWNER TO postgres;

--
-- TOC entry 345 (class 1259 OID 101640)
-- Name: nivel_geografico; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.nivel_geografico (
    id bigint DEFAULT nextval('public.seq_nivel_geografico_id'::regclass) NOT NULL,
    sigla character varying(10),
    sigla_padre character varying(10),
    nivel_geografico character varying(10),
    descripcion character varying(255) NOT NULL,
    estado character varying(30) DEFAULT 'ELABORADO'::character varying,
    transaccion character varying(30) DEFAULT 'CREAR'::character varying,
    usu_cre character varying(30) DEFAULT "current_user"(),
    fec_cre timestamp without time zone DEFAULT now() NOT NULL,
    usu_mod character varying(30),
    fec_mod timestamp without time zone,
    host_creacion character varying(30) DEFAULT inet_client_addr() NOT NULL,
    host_modificacion character varying(30)
);


ALTER TABLE public.nivel_geografico OWNER TO postgres;

--
-- TOC entry 313 (class 1259 OID 101437)
-- Name: seq_nivel_geografico_aud_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_nivel_geografico_aud_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_nivel_geografico_aud_id OWNER TO postgres;

--
-- TOC entry 346 (class 1259 OID 101649)
-- Name: nivel_geografico_aud; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.nivel_geografico_aud (
    id bigint DEFAULT nextval('public.seq_nivel_geografico_aud_id'::regclass) NOT NULL,
    nivel_geografico_id bigint NOT NULL,
    sigla character varying(10),
    sigla_padre character varying(10),
    nivel_geografico character varying(10),
    descripcion character varying(255) NOT NULL,
    estado character varying(30),
    transaccion character varying(30),
    usu_cre character varying(30),
    fec_cre timestamp without time zone NOT NULL,
    usu_mod character varying(30),
    fec_mod timestamp without time zone,
    host_creacion character varying(30) NOT NULL,
    host_modificacion character varying(30)
);


ALTER TABLE public.nivel_geografico_aud OWNER TO postgres;

--
-- TOC entry 291 (class 1259 OID 101393)
-- Name: seq_notificaciones_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_notificaciones_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_notificaciones_id OWNER TO postgres;

--
-- TOC entry 347 (class 1259 OID 101653)
-- Name: notificaciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notificaciones (
    id bigint DEFAULT nextval('public.seq_notificaciones_id'::regclass) NOT NULL,
    user_login_sigla character varying(30) NOT NULL,
    sigla character varying(10) NOT NULL,
    notificacion character varying(30) NOT NULL,
    descripcion character varying(255) NOT NULL,
    fec_inicio timestamp with time zone DEFAULT now() NOT NULL,
    fec_fin timestamp with time zone DEFAULT now() NOT NULL,
    estado character varying(30) DEFAULT 'ELABORADO'::character varying,
    transaccion character varying(30) DEFAULT 'CREAR'::character varying,
    usu_cre character varying(30) DEFAULT "current_user"(),
    fec_cre timestamp without time zone DEFAULT now() NOT NULL,
    usu_mod character varying(30),
    fec_mod timestamp without time zone,
    host_creacion character varying(30) DEFAULT inet_client_addr() NOT NULL,
    host_modificacion character varying(30)
);


ALTER TABLE public.notificaciones OWNER TO postgres;

--
-- TOC entry 314 (class 1259 OID 101439)
-- Name: seq_notificaciones_aud_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_notificaciones_aud_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_notificaciones_aud_id OWNER TO postgres;

--
-- TOC entry 348 (class 1259 OID 101667)
-- Name: notificaciones_aud; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notificaciones_aud (
    id bigint DEFAULT nextval('public.seq_notificaciones_aud_id'::regclass) NOT NULL,
    notificaciones_id bigint NOT NULL,
    user_login_sigla character varying(30) NOT NULL,
    sigla character varying(10) NOT NULL,
    notificacion character varying(30) NOT NULL,
    descripcion character varying(255) NOT NULL,
    fec_inicio timestamp with time zone DEFAULT now() NOT NULL,
    fec_fin timestamp with time zone DEFAULT now() NOT NULL,
    estado character varying(30),
    transaccion character varying(30),
    usu_cre character varying(30),
    fec_cre timestamp without time zone NOT NULL,
    usu_mod character varying(30),
    fec_mod timestamp without time zone,
    host_creacion character varying(30) NOT NULL,
    host_modificacion character varying(30)
);


ALTER TABLE public.notificaciones_aud OWNER TO postgres;

--
-- TOC entry 292 (class 1259 OID 101395)
-- Name: seq_operaciones_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_operaciones_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_operaciones_id OWNER TO postgres;

--
-- TOC entry 349 (class 1259 OID 101676)
-- Name: operaciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.operaciones (
    id bigint DEFAULT nextval('public.seq_operaciones_id'::regclass) NOT NULL,
    sigla character varying(10) NOT NULL,
    operacion character varying(30) NOT NULL,
    descripcion character varying(255) NOT NULL,
    estado character varying(30) DEFAULT 'ELABORADO'::character varying,
    transaccion character varying(30) DEFAULT 'CREAR'::character varying,
    usu_cre character varying(30) DEFAULT "current_user"(),
    fec_cre timestamp without time zone DEFAULT now() NOT NULL,
    usu_mod character varying(30),
    fec_mod timestamp without time zone,
    host_creacion character varying(30) DEFAULT inet_client_addr() NOT NULL,
    host_modificacion character varying(30)
);


ALTER TABLE public.operaciones OWNER TO postgres;

--
-- TOC entry 315 (class 1259 OID 101441)
-- Name: seq_operaciones_aud_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_operaciones_aud_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_operaciones_aud_id OWNER TO postgres;

--
-- TOC entry 350 (class 1259 OID 101685)
-- Name: operaciones_aud; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.operaciones_aud (
    id bigint DEFAULT nextval('public.seq_operaciones_aud_id'::regclass) NOT NULL,
    operaciones_id bigint NOT NULL,
    sigla character varying(10) NOT NULL,
    operacion character varying(30) NOT NULL,
    descripcion character varying(255) NOT NULL,
    estado character varying(30),
    transaccion character varying(30),
    usu_cre character varying(30),
    fec_cre timestamp without time zone NOT NULL,
    usu_mod character varying(30),
    fec_mod timestamp without time zone,
    host_creacion character varying(30) NOT NULL,
    host_modificacion character varying(30)
);


ALTER TABLE public.operaciones_aud OWNER TO postgres;

--
-- TOC entry 302 (class 1259 OID 101415)
-- Name: seq_parametros_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_parametros_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_parametros_id OWNER TO postgres;

--
-- TOC entry 368 (class 1259 OID 101838)
-- Name: parametros; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.parametros (
    id bigint DEFAULT nextval('public.seq_parametros_id'::regclass) NOT NULL,
    modulos_sigla character varying(30),
    sigla character varying(30) NOT NULL,
    descripcion character varying(100),
    orden bigint NOT NULL,
    param_numerico_ini character varying(30),
    param_numerico_fin character varying(30),
    param_caracter_ini character varying(30),
    param_fecha_ini character varying(30),
    param_fecha_fin character varying(30),
    fec_ini timestamp without time zone NOT NULL,
    fec_fin timestamp without time zone NOT NULL,
    estado character varying(30) DEFAULT 'ELABORADO'::character varying,
    transaccion character varying(30) DEFAULT 'CREAR'::character varying,
    usu_cre character varying(30) DEFAULT "current_user"(),
    fec_cre timestamp without time zone DEFAULT now() NOT NULL,
    usu_mod character varying(30),
    fec_mod timestamp without time zone,
    host_creacion character varying(30) DEFAULT inet_client_addr() NOT NULL,
    host_modificacion character varying(30)
);


ALTER TABLE public.parametros OWNER TO postgres;

--
-- TOC entry 325 (class 1259 OID 101461)
-- Name: seq_parametros_aud_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_parametros_aud_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_parametros_aud_id OWNER TO postgres;

--
-- TOC entry 369 (class 1259 OID 101850)
-- Name: parametros_aud; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.parametros_aud (
    id bigint DEFAULT nextval('public.seq_parametros_aud_id'::regclass) NOT NULL,
    parametros_id bigint NOT NULL,
    modulos_sigla character varying(30),
    sigla character varying(30) NOT NULL,
    descripcion character varying(100),
    orden bigint NOT NULL,
    param_numerico_ini character varying(30),
    param_numerico_fin character varying(30),
    param_caracter_ini character varying(30),
    param_fecha_ini character varying(30),
    param_fecha_fin character varying(30),
    fec_ini timestamp without time zone NOT NULL,
    fec_fin timestamp without time zone NOT NULL,
    estado character varying(30) DEFAULT 'ELABORADO'::character varying,
    transaccion character varying(30) DEFAULT 'CREAR'::character varying,
    usu_cre character varying(30) DEFAULT "current_user"(),
    fec_cre timestamp without time zone DEFAULT now() NOT NULL,
    usu_mod character varying(30),
    fec_mod timestamp without time zone,
    host_creacion character varying(30) DEFAULT inet_client_addr() NOT NULL,
    host_modificacion character varying(30)
);


ALTER TABLE public.parametros_aud OWNER TO postgres;

--
-- TOC entry 293 (class 1259 OID 101397)
-- Name: seq_personas_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_personas_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_personas_id OWNER TO postgres;

--
-- TOC entry 351 (class 1259 OID 101689)
-- Name: personas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.personas (
    id bigint DEFAULT nextval('public.seq_personas_id'::regclass) NOT NULL,
    denuncia_personas_id bigint NOT NULL,
    genero_sexo_sigla character varying(10) NOT NULL,
    grados_sigla character varying(10) NOT NULL,
    orden bigint NOT NULL,
    puesto_cargo_funcion character varying(1000),
    unidad_policial_desc character varying(255),
    sigla character varying(10),
    cod_activo character varying(30),
    tipo_personas character varying(30) NOT NULL,
    password_hash character varying(60),
    nombres character varying(100) NOT NULL,
    apellido_pat character varying(100) NOT NULL,
    apellido_mat character varying(100) NOT NULL,
    email character varying(100),
    telefono character varying(100),
    direccion character varying(255),
    fecha_nacimiento timestamp without time zone DEFAULT now(),
    ci_y_complemento character varying(20),
    ci_expedido character varying(4),
    foto_img_path character varying(500),
    estado character varying(30) DEFAULT 'ELABORADO'::character varying,
    transaccion character varying(30) DEFAULT 'CREAR'::character varying,
    usu_cre character varying(30) DEFAULT "current_user"(),
    fec_cre timestamp without time zone DEFAULT now() NOT NULL,
    usu_mod character varying(30),
    fec_mod timestamp without time zone,
    host_creacion character varying(30) DEFAULT inet_client_addr() NOT NULL,
    host_modificacion character varying(30)
);


ALTER TABLE public.personas OWNER TO postgres;

--
-- TOC entry 316 (class 1259 OID 101443)
-- Name: seq_personas_aud_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_personas_aud_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_personas_aud_id OWNER TO postgres;

--
-- TOC entry 352 (class 1259 OID 101702)
-- Name: personas_aud; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.personas_aud (
    id bigint DEFAULT nextval('public.seq_personas_aud_id'::regclass) NOT NULL,
    personas_id bigint NOT NULL,
    denuncia_personas_id bigint NOT NULL,
    genero_sexo_sigla character varying(10) NOT NULL,
    grados_sigla character varying(10) NOT NULL,
    orden bigint NOT NULL,
    puestos_sigla character varying(10),
    unidad_policial_desc character varying(255),
    sigla character varying(10),
    cod_activo character varying(30),
    tipo_personas character varying(30) NOT NULL,
    password_hash character varying(60) NOT NULL,
    nombres character varying(100) NOT NULL,
    apellido_pat character varying(100) NOT NULL,
    apellido_mat character varying(100) NOT NULL,
    email character varying(100),
    telefono character varying(100),
    direccion character varying(255),
    fecha_nacimiento timestamp without time zone DEFAULT now(),
    ci_y_complemento character varying(20),
    ci_expedido character varying(4),
    foto_img_path character varying(500),
    estado character varying(30),
    transaccion character varying(30),
    usu_cre character varying(30),
    fec_cre timestamp without time zone NOT NULL,
    usu_mod character varying(30),
    fec_mod timestamp without time zone,
    host_creacion character varying(30) NOT NULL,
    host_modificacion character varying(30)

);


ALTER TABLE public.personas_aud OWNER TO postgres;

--
-- TOC entry 301 (class 1259 OID 101413)
-- Name: seq_puestos_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_puestos_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_puestos_id OWNER TO postgres;

--
-- TOC entry 366 (class 1259 OID 101820)
-- Name: puestos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.puestos (
    id bigint DEFAULT nextval('public.seq_puestos_id'::regclass) NOT NULL,
    sigla character varying(10) NOT NULL,
    puesto character varying(30) NOT NULL,
    descripcion character varying(255) NOT NULL,
    estado character varying(30) DEFAULT 'ELABORADO'::character varying,
    transaccion character varying(30) DEFAULT 'CREAR'::character varying,
    usu_cre character varying(30) DEFAULT "current_user"(),
    fec_cre timestamp without time zone DEFAULT now() NOT NULL,
    usu_mod character varying(30),
    fec_mod timestamp without time zone,
    host_creacion character varying(30) DEFAULT inet_client_addr() NOT NULL,
    host_modificacion character varying(30)
);


ALTER TABLE public.puestos OWNER TO postgres;

--
-- TOC entry 324 (class 1259 OID 101459)
-- Name: seq_puestos_aud_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_puestos_aud_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_puestos_aud_id OWNER TO postgres;

--
-- TOC entry 367 (class 1259 OID 101829)
-- Name: puestos_aud; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.puestos_aud (
    id bigint DEFAULT nextval('public.seq_puestos_aud_id'::regclass) NOT NULL,
    puestos_id bigint NOT NULL,
    sigla character varying(10) NOT NULL,
    puesto character varying(30) NOT NULL,
    descripcion character varying(255) NOT NULL,
    estado character varying(30) DEFAULT 'ELABORADO'::character varying,
    transaccion character varying(30) DEFAULT 'CREAR'::character varying,
    usu_cre character varying(30) DEFAULT "current_user"(),
    fec_cre timestamp without time zone DEFAULT now() NOT NULL,
    usu_mod character varying(30),
    fec_mod timestamp without time zone,
    host_creacion character varying(30) DEFAULT inet_client_addr() NOT NULL,
    host_modificacion character varying(30)
);


ALTER TABLE public.puestos_aud OWNER TO postgres;

--
-- TOC entry 294 (class 1259 OID 101399)
-- Name: seq_rol_menus_operaciones_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_rol_menus_operaciones_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_rol_menus_operaciones_id OWNER TO postgres;

--
-- TOC entry 353 (class 1259 OID 101710)
-- Name: rol_menus_operaciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rol_menus_operaciones (
    id bigint DEFAULT nextval('public.seq_rol_menus_operaciones_id'::regclass) NOT NULL,
    roles_sigla character varying(10) NOT NULL,
    menus_sigla character varying(10) NOT NULL,
    operaciones_sigla character varying(10) NOT NULL,
    descripcion character varying(255) NOT NULL,
    estado character varying(30) DEFAULT 'ELABORADO'::character varying,
    transaccion character varying(30) DEFAULT 'CREAR'::character varying,
    usu_cre character varying(30) DEFAULT "current_user"(),
    fec_cre timestamp without time zone DEFAULT now() NOT NULL,
    usu_mod character varying(30),
    fec_mod timestamp without time zone,
    host_creacion character varying(30) DEFAULT inet_client_addr() NOT NULL,
    host_modificacion character varying(30)
);


ALTER TABLE public.rol_menus_operaciones OWNER TO postgres;

--
-- TOC entry 317 (class 1259 OID 101445)
-- Name: seq_rol_menus_operaciones_aud_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_rol_menus_operaciones_aud_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_rol_menus_operaciones_aud_id OWNER TO postgres;

--
-- TOC entry 354 (class 1259 OID 101719)
-- Name: rol_menus_operaciones_aud; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rol_menus_operaciones_aud (
    id bigint DEFAULT nextval('public.seq_rol_menus_operaciones_aud_id'::regclass) NOT NULL,
    rol_menus_operaciones_id bigint NOT NULL,
    roles_sigla character varying(10) NOT NULL,
    menus_sigla character varying(10) NOT NULL,
    operaciones_sigla character varying(10) NOT NULL,
    descripcion character varying(255) NOT NULL,
    estado character varying(30),
    transaccion character varying(30),
    usu_cre character varying(30),
    fec_cre timestamp without time zone NOT NULL,
    usu_mod character varying(30),
    fec_mod timestamp without time zone,
    host_creacion character varying(30) NOT NULL,
    host_modificacion character varying(30)
);


ALTER TABLE public.rol_menus_operaciones_aud OWNER TO postgres;

--
-- TOC entry 295 (class 1259 OID 101401)
-- Name: seq_roles_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_roles_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_roles_id OWNER TO postgres;

--
-- TOC entry 355 (class 1259 OID 101723)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id bigint DEFAULT nextval('public.seq_roles_id'::regclass) NOT NULL,
    sigla character varying(10) NOT NULL,
    rol character varying(30) NOT NULL,
    descripcion character varying(255) NOT NULL,
    nivel_geografico_id bigint,
	  nivel_geografico_sigla character varying(10),
    modulo_sigla character varying(10) NOT NULL,
    estado character varying(30) DEFAULT 'ELABORADO'::character varying,
    transaccion character varying(30) DEFAULT 'CREAR'::character varying,
    usu_cre character varying(30) DEFAULT "current_user"(),
    fec_cre timestamp without time zone DEFAULT now() NOT NULL,
    usu_mod character varying(30),
    fec_mod timestamp without time zone,
    host_creacion character varying(30) DEFAULT inet_client_addr() NOT NULL,
    host_modificacion character varying(30)
  
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 318 (class 1259 OID 101447)
-- Name: seq_roles_aud_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_roles_aud_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_roles_aud_id OWNER TO postgres;

--
-- TOC entry 356 (class 1259 OID 101735)
-- Name: roles_aud; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles_aud (
    id bigint DEFAULT nextval('public.seq_roles_aud_id'::regclass) NOT NULL,
    roles_id bigint NOT NULL,
    sigla character varying(10) NOT NULL,
    rol character varying(30) NOT NULL,
    descripcion character varying(255) NOT NULL,
	  nivel_geografico_sigla character varying(10),
    modulo_sigla character varying(10) NOT NULL,
    estado character varying(30),
    transaccion character varying(30),
    usu_cre character varying(30),
    fec_cre timestamp without time zone NOT NULL,
    usu_mod character varying(30),
    fec_mod timestamp without time zone,
    host_creacion character varying(30) NOT NULL,
    host_modificacion character varying(30)
);


ALTER TABLE public.roles_aud OWNER TO postgres;

--
-- TOC entry 296 (class 1259 OID 101403)
-- Name: seq_seguimiento_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_seguimiento_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_seguimiento_id OWNER TO postgres;

--
-- TOC entry 357 (class 1259 OID 101742)
-- Name: seguimiento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.seguimiento (
    id bigint DEFAULT nextval('public.seq_seguimiento_id'::regclass) NOT NULL,
    denuncia_personas_id bigint NOT NULL,
    control_id bigint,
    usuarios_id bigint NOT NULL,
	    actividades_id bigint,
    observacion character varying(255) NOT NULL,
    fec_registro timestamp without time zone DEFAULT now() NOT NULL,
    estado character varying(30) DEFAULT 'ELABORADO'::character varying,
    transaccion character varying(30) DEFAULT 'CREAR'::character varying,
    usu_cre character varying(30) DEFAULT "current_user"(),
    fec_cre timestamp without time zone DEFAULT now() NOT NULL,
    usu_mod character varying(30),
    fec_mod timestamp without time zone,
    host_creacion character varying(30) DEFAULT inet_client_addr() NOT NULL,
    host_modificacion character varying(30)

);


ALTER TABLE public.seguimiento OWNER TO postgres;

--
-- TOC entry 319 (class 1259 OID 101449)
-- Name: seq_seguimiento_aud_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_seguimiento_aud_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_seguimiento_aud_id OWNER TO postgres;

--
-- TOC entry 358 (class 1259 OID 101752)
-- Name: seguimiento_aud; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.seguimiento_aud (
    id bigint DEFAULT nextval('public.seq_seguimiento_aud_id'::regclass) NOT NULL,
    seguimiento_id bigint NOT NULL,
    denuncia_personas_id bigint NOT NULL,
    control_id bigint NOT NULL,
    usuarios_id bigint NOT NULL,
	    actividades_id bigint,
    observacion character varying(255) NOT NULL,
    fec_registro timestamp without time zone DEFAULT now() NOT NULL,
    estado character varying(30),
    transaccion character varying(30),
    usu_cre character varying(30),
    fec_cre timestamp without time zone NOT NULL,
    usu_mod character varying(30),
    fec_mod timestamp without time zone,
    host_creacion character varying(30) NOT NULL,
    host_modificacion character varying(30)
);


ALTER TABLE public.seguimiento_aud OWNER TO postgres;

--
-- TOC entry 308 (class 1259 OID 101427)
-- Name: seq_event_log_operaciones_aud_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_event_log_operaciones_aud_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_event_log_operaciones_aud_id OWNER TO postgres;

--
-- TOC entry 320 (class 1259 OID 101451)
-- Name: seq_sesion_log_aud_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_sesion_log_aud_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_sesion_log_aud_id OWNER TO postgres;

--
-- TOC entry 297 (class 1259 OID 101405)
-- Name: seq_sesion_log_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_sesion_log_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_sesion_log_id OWNER TO postgres;

--
-- TOC entry 321 (class 1259 OID 101453)
-- Name: seq_unidad_policial_aud_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_unidad_policial_aud_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_unidad_policial_aud_id OWNER TO postgres;

--
-- TOC entry 298 (class 1259 OID 101407)
-- Name: seq_unidad_policial_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_unidad_policial_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_unidad_policial_id OWNER TO postgres;

--
-- TOC entry 322 (class 1259 OID 101455)
-- Name: seq_usuarios_aud_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_usuarios_aud_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_usuarios_aud_id OWNER TO postgres;

--
-- TOC entry 299 (class 1259 OID 101409)
-- Name: seq_usuarios_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_usuarios_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_usuarios_id OWNER TO postgres;

--
-- TOC entry 323 (class 1259 OID 101457)
-- Name: seq_usuarios_rol_aud_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_usuarios_rol_aud_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_usuarios_rol_aud_id OWNER TO postgres;

--
-- TOC entry 300 (class 1259 OID 101411)
-- Name: seq_usuarios_rol_id; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seq_usuarios_rol_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.seq_usuarios_rol_id OWNER TO postgres;

--
-- TOC entry 359 (class 1259 OID 101757)
-- Name: sesion_log; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sesion_log (
    id bigint DEFAULT nextval('public.seq_sesion_log_id'::regclass) NOT NULL,
    user_login_sigla character varying(30) NOT NULL,
    pin character varying(10) NOT NULL,
    pin_estado character varying(30) NOT NULL,
    pin_hora_expiracion character varying(30) NOT NULL,
    fec_sesion timestamp without time zone DEFAULT now() NOT NULL,
    nombre_device character varying(100),
    estado character varying(30) DEFAULT 'ELABORADO'::character varying,
    transaccion character varying(30) DEFAULT 'CREAR'::character varying,
    usu_cre character varying(30) DEFAULT "current_user"(),
    fec_cre timestamp without time zone DEFAULT now() NOT NULL,
    usu_mod character varying(30),
    fec_mod timestamp without time zone,
    host_creacion character varying(30) DEFAULT inet_client_addr() NOT NULL,
    host_modificacion character varying(30)
);


ALTER TABLE public.sesion_log OWNER TO postgres;

--
-- TOC entry 360 (class 1259 OID 101767)
-- Name: unidad_policial; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.unidad_policial (
    id bigint DEFAULT nextval('public.seq_unidad_policial_id'::regclass) NOT NULL,
    nivel_geografico_id bigint NOT NULL,
    sigla character varying(10) NOT NULL,
    unidad_policial character varying(30) NOT NULL,
    descripcion character varying(255) NOT NULL,
    direccion character varying(255) NOT NULL,
    estado character varying(30) DEFAULT 'ELABORADO'::character varying,
    transaccion character varying(30) DEFAULT 'CREAR'::character varying,
    usu_cre character varying(30) DEFAULT "current_user"(),
    fec_cre timestamp without time zone DEFAULT now() NOT NULL,
    usu_mod character varying(30),
    fec_mod timestamp without time zone,
    host_creacion character varying(30) DEFAULT inet_client_addr() NOT NULL,
    host_modificacion character varying(30)
);


ALTER TABLE public.unidad_policial OWNER TO postgres;

--
-- TOC entry 361 (class 1259 OID 101779)
-- Name: unidad_policial_aud; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.unidad_policial_aud (
    id bigint DEFAULT nextval('public.seq_unidad_policial_aud_id'::regclass) NOT NULL,
    unidad_policial_id bigint NOT NULL,
    nivel_geografico_id bigint NOT NULL,
    sigla character varying(10) NOT NULL,
    unidad_policial character varying(30) NOT NULL,
    descripcion character varying(255) NOT NULL,
    direccion character varying(255) NOT NULL,
    estado character varying(30),
    transaccion character varying(30),
    usu_cre character varying(30),
    fec_cre timestamp without time zone NOT NULL,
    usu_mod character varying(30),
    fec_mod timestamp without time zone,
    host_creacion character varying(30) NOT NULL,
    host_modificacion character varying(30)
);


ALTER TABLE public.unidad_policial_aud OWNER TO postgres;

--
-- TOC entry 362 (class 1259 OID 101786)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id bigint DEFAULT nextval('public.seq_usuarios_id'::regclass) NOT NULL,
    grados_sigla character varying(10) NOT NULL,
    puestos_sigla character varying(10),
    genero_sexo_sigla character varying(10),
	   nivel_geografico_id bigint,
    nivel_geografico_sigla character varying(10),
    user_login character varying(30) NOT NULL,
    password_hash character varying(60) NOT NULL,
    nombres character varying(100) NOT NULL,
    apellido_pat character varying(100) NOT NULL,
    apellido_mat character varying(100),
    email character varying(100) NOT NULL,
    telefono character varying(100),
    direccion character varying(255),
    reset_key character varying(20),
    reset_date timestamp without time zone,
    fecha_nacimiento timestamp without time zone,
    ci_y_complemento character varying(20) NOT NULL,
    ci_expedido character varying(4) NOT NULL,
    foto_img_path character varying(500),
    estado character varying(30) DEFAULT 'ELABORADO'::character varying,
    transaccion character varying(30) DEFAULT 'CREAR'::character varying,
    usu_cre character varying(30) DEFAULT "current_user"(),
    fec_cre timestamp without time zone DEFAULT now() NOT NULL,
    usu_mod character varying(30),
    fec_mod timestamp without time zone,
    host_creacion character varying(30) DEFAULT inet_client_addr() NOT NULL,
    host_modificacion character varying(30)
 
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 363 (class 1259 OID 101799)
-- Name: usuarios_aud; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios_aud (
    id bigint DEFAULT nextval('public.seq_usuarios_aud_id'::regclass) NOT NULL,
    usuarios_id bigint NOT NULL,
    grados_sigla character varying(10) NOT NULL,
    puestos_sigla character varying(10),
    genero_sexo_sigla character varying(10),
	    nivel_geografico_id bigint,
    nivel_geografico_sigla character varying(10),
    user_login character varying(30) NOT NULL,
    password_hash character varying(60) NOT NULL,
    nombres character varying(100) NOT NULL,
    apellido_pat character varying(100) NOT NULL,
    apellido_mat character varying(100),
    email character varying(100) NOT NULL,
    telefono character varying(100),
    direccion character varying(255),
    reset_key character varying(20),
    reset_date timestamp without time zone,
    fecha_nacimiento timestamp without time zone DEFAULT now() NOT NULL,
    ci_y_complemento character varying(20) NOT NULL,
    ci_expedido character varying(4) NOT NULL,
    foto_img_path character varying(500),
    estado character varying(30),
    transaccion character varying(30),
    usu_cre character varying(30),
    fec_cre timestamp without time zone NOT NULL,
    usu_mod character varying(30),
    fec_mod timestamp without time zone,
    host_creacion character varying(30) NOT NULL,
    host_modificacion character varying(30)

);


ALTER TABLE public.usuarios_aud OWNER TO postgres;

--
-- TOC entry 364 (class 1259 OID 101807)
-- Name: usuarios_rol; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios_rol (
    id bigint DEFAULT nextval('public.seq_usuarios_rol_id'::regclass) NOT NULL,
    usuarios_id bigint NOT NULL,
    roles_sigla character varying(10) NOT NULL,
    descripcion character varying(255) NOT NULL,
    estado character varying(30) DEFAULT 'ELABORADO'::character varying,
    transaccion character varying(30) DEFAULT 'CREAR'::character varying,
    usu_cre character varying(30) DEFAULT "current_user"(),
    fec_cre timestamp without time zone DEFAULT now() NOT NULL,
    usu_mod character varying(30),
    fec_mod timestamp without time zone,
    host_creacion character varying(30) DEFAULT inet_client_addr() NOT NULL,
    host_modificacion character varying(30)
);


ALTER TABLE public.usuarios_rol OWNER TO postgres;

--
-- TOC entry 365 (class 1259 OID 101816)
-- Name: usuarios_rol_aud; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios_rol_aud (
    id bigint DEFAULT nextval('public.seq_usuarios_rol_aud_id'::regclass) NOT NULL,
    usuarios_rol_id bigint NOT NULL,
    usuarios_id bigint NOT NULL,
    roles_sigla character varying(10) NOT NULL,
    descripcion character varying(255) NOT NULL,
    estado character varying(30),
    transaccion character varying(30),
    usu_cre character varying(30),
    fec_cre timestamp without time zone NOT NULL,
    usu_mod character varying(30),
    fec_mod timestamp without time zone,
    host_creacion character varying(30) NOT NULL,
    host_modificacion character varying(30)
);


ALTER TABLE public.usuarios_rol_aud OWNER TO postgres;

INSERT INTO public.actividades (  denuncia_personas_id, control_id, seguimiento_id, usuarios_id, descripcion, fec_registro, informe, estado, transaccion , sigla, actividad, tipo) VALUES( NULL, NULL, NULL, NULL, 'SOLICITUD DE AMPLIACION DE PLAZO PARA SEGUIMIENTO CON ADICION DE OBSERVACIONES', '2024-10-19 14:16:40.866', NULL, 'ACTIVO', 'ACTIVAR', 'DEN_SOL_AMPLIACION', 'SOLICITUD DE AMPLIACION (DENTRO 45 DIAS)', 'SEGUIMIENTO');
INSERT INTO public.actividades (  denuncia_personas_id, control_id, seguimiento_id, usuarios_id, descripcion, fec_registro, informe, estado, transaccion , sigla, actividad, tipo) VALUES( NULL, NULL, NULL, NULL, 'CARGA DE INFORME FINAL', '2024-10-20 14:16:40.866', NULL, 'ACTIVO', 'ACTIVAR'        ,   'DEN_CARGAR_INFOR_FINAL', 'CARGA DE INFORME FINAL', 'SEGUIMIENTO');
INSERT INTO public.actividades (  denuncia_personas_id, control_id, seguimiento_id, usuarios_id, descripcion, fec_registro, informe, estado, transaccion , sigla, actividad, tipo) VALUES( NULL, NULL, NULL, NULL, 'CARGA DE ARCHIVO DE EVIDENCIAS', '2024-10-21 14:16:40.866', NULL, 'ACTIVO', 'ACTIVAR',   'DEN_CARGAR_ARCHIVO ', 'CARGA DE ARCHIVO DE EVIDENCIAS', 'SEGUIMIENTO');
INSERT INTO public.actividades (  denuncia_personas_id, control_id, seguimiento_id, usuarios_id, descripcion, fec_registro, informe, estado, transaccion , sigla, actividad, tipo) VALUES( NULL, NULL, NULL, NULL, 'DENUNCIA ACEPTADA', '2024-10-21 14:16:40.866', NULL, 'ACTIVO', 'ACTIVAR'             ,   'DEN_ACEPTAR', 'DENUNCIA ACEPTADA', 'CONCLUSION');
INSERT INTO public.actividades (  denuncia_personas_id, control_id, seguimiento_id, usuarios_id, descripcion, fec_registro, informe, estado, transaccion , sigla, actividad, tipo) VALUES( NULL, NULL, NULL, NULL, 'DENUNCIA RECHAZADA', '2024-10-21 14:16:40.866', NULL, 'ACTIVO', 'ACTIVAR'            ,   'DEN_RECHAZAR', 'DENUNCIA RECHAZADA', 'CONCLUSION');
INSERT INTO public.actividades (  denuncia_personas_id, control_id, seguimiento_id, usuarios_id, descripcion, fec_registro, informe, estado, transaccion , sigla, actividad, tipo) VALUES( NULL, NULL, NULL, NULL, 'DENUNCIA ARCHIVADA', '2024-10-21 14:16:40.866', NULL, 'INACTIVO', 'INACTIVAR'        ,   'DEN_ARCHIVAR', 'DENUNCIA ARCHIVADA', 'CONCLUSION');
INSERT INTO public.actividades (  denuncia_personas_id, control_id, seguimiento_id, usuarios_id, descripcion, fec_registro, informe, estado, transaccion , sigla, actividad, tipo) VALUES( NULL, NULL, NULL, NULL, 'DERIVACION', '2024-12-01 14:16:40.866', NULL, 'ACTIVO', 'ACTIVAR'                    ,   'DEN_DERIVAR', 'DERIVACION A INVESTIGADOR', 'ASIGNADO');
INSERT INTO public.actividades (  denuncia_personas_id, control_id, seguimiento_id, usuarios_id, descripcion, fec_registro, informe, estado, transaccion , sigla, actividad, tipo) VALUES( NULL, NULL, NULL, NULL, 'ETAPA DE SEGUIMIENTO CON ADICION DE OBSERVACIONES', '2024-10-21 14:16:40.866', NULL, 'ACTIVO', 'ACTIVAR',  'DEN_CONTROLAR_SEGUIMIENTO', 'SEGUIMIENTO CON ADICION DE OBSERVACIONES', 'SEGUIMIENTO');
INSERT INTO public.actividades (  denuncia_personas_id, control_id, seguimiento_id, usuarios_id, descripcion, fec_registro, informe, estado, transaccion , sigla, actividad, tipo) VALUES( NULL, NULL, NULL, NULL, 'DENUNCIA RECHAZADA INICIO ', '2024-10-21 14:16:40.866', NULL, 'ACTIVO', 'ACTIVAR'    ,  'DEN_ACEPTAR_SEG', 'SEGUIMIENTO DENUNCIA ADMISIÓN', 'SEGUIMIENTO');
INSERT INTO public.actividades (  denuncia_personas_id, control_id, seguimiento_id, usuarios_id, descripcion, fec_registro, informe, estado, transaccion , sigla, actividad, tipo) VALUES(  NULL, NULL, NULL, NULL, 'DENUNCIA ACEPTADA INICIO', '2024-10-21 14:16:40.866', NULL, 'ACTIVO', 'ACTIVAR'     ,  'DEN_RECHAZAR_SEG', 'SEGUIMIENTO DENUNCIA RECHAZADA', 'SEGUIMIENTO');
INSERT INTO public.actividades (  denuncia_personas_id, control_id, seguimiento_id, usuarios_id, descripcion, fec_registro, informe, estado, transaccion , sigla, actividad, tipo) VALUES(  NULL, NULL, NULL, NULL, 'NOTIFICACION', '2024-10-21 14:16:40.866', NULL, 'ACTIVO', 'ACTIVAR'                 ,  'NOT_PART_DENUN', 'NOTIFICACION PARTE DENUNCIANTE', 'SEGUIMIENTO');
INSERT INTO public.actividades (  denuncia_personas_id, control_id, seguimiento_id, usuarios_id, descripcion, fec_registro, informe, estado, transaccion , sigla, actividad, tipo) VALUES(  NULL, NULL, NULL, NULL, 'NOTIFICACION DENUNCIADOS', '2024-10-21 14:16:40.866', NULL, 'ACTIVO', 'ACTIVAR'     ,  'NOT_DENUN', 'NOTIFICACION PARTE DENUNCIADOS', 'SEGUIMIENTO');
INSERT INTO public.actividades (  denuncia_personas_id, control_id, seguimiento_id, usuarios_id, descripcion, fec_registro, informe, estado, transaccion , sigla, actividad, tipo) VALUES(  NULL, NULL, NULL, NULL, '45 DIAS SOLICITUD DE AMPLIACION DE PLAZO PARA SEGUIMIENTO CON ADICION DE OBSERVACIONES', '2024-10-19 14:16:40.866', NULL, 'ACTIVO', 'ACTIVAR' , 'DEN_SOL_AMPLIACION_POST_45', 'SOLICITUD DE AMPLIACION (POST. 45 DIAS)', 'SEGUIMIENTO');

--
-- TOC entry 3724 (class 0 OID 101577)
-- Dependencies: 337
-- Data for Name: genero_sexo; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.genero_sexo ( sigla, descripcion, estado, transaccion) VALUES (  'M', 'MASCULINO', 'ELABORADO', 'CREAR' );
INSERT INTO public.genero_sexo ( sigla, descripcion, estado, transaccion) VALUES (  'F', 'FEMENINO', 'ELABORADO', 'CREAR'  ); 
INSERT INTO public.genero_sexo ( sigla, descripcion, estado, transaccion) VALUES (  'O', 'OTRO', 'ELABORADO', 'CREAR'      );


INSERT INTO public.grados (sigla, grado, descripcion, estado, transaccion) VALUES (  'TTE', 'TENIENTE', 'TENIENTE DE POLICIA', 'ELABORADO', 'CREAR'            );
INSERT INTO public.grados (sigla, grado, descripcion, estado, transaccion) VALUES (  'SUB-OF-1RO', 'SUB OFICIAL 1RO', 'SUB OFICIAL 1ERO', 'ELABORADO', 'CREAR' );
INSERT INTO public.grados (sigla, grado, descripcion, estado, transaccion) VALUES (  'SUB-OF-2DO', 'SUB OFICIAL 2DO', 'SUB OFICIAL 2DO', 'ELABORADO', 'CREAR'  );
INSERT INTO public.grados (sigla, grado, descripcion, estado, transaccion) VALUES (  'CAP', 'CAPITAN', 'CAPITAN DE POLICIA', 'ELABORADO', 'CREAR'              );
INSERT INTO public.grados (sigla, grado, descripcion, estado, transaccion) VALUES (  'CIVIL', 'NINGUNO', 'CIVIL SIN GRADO', 'ELABORADO', 'CREAR'               );

--
-- TOC entry 3727 (class 0 OID 101599)
-- Dependencies: 340
-- Data for Name: grados_aud; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3728 (class 0 OID 101603)
-- Dependencies: 341
-- Data for Name: menus; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.menus ( modulos_sigla, sigla, menu, descripcion, nivel, padre_id, estado, transaccion ) VALUES( 'ROOT', 'M_ROOT', 'MENU RAIZ', 'MENU RAIZ - NODO ORIGEN', 0, 0, 'ACTIVO', 'ACTIVAR'                                    );
INSERT INTO public.menus ( modulos_sigla, sigla, menu, descripcion, nivel, padre_id, estado, transaccion ) VALUES( 'LOGIN', 'M_LOGIN', 'PANTALLA DE LOGIN', 'ACCESO EXTERNO DIRECTO A LA PANTALLA DE LOGIN', 0, 0, 'ACTIVO', 'ACTIVAR'    );
INSERT INTO public.menus ( modulos_sigla, sigla, menu, descripcion, nivel, padre_id, estado, transaccion ) VALUES( 'DEN_FORM', 'M_DEN_FORM', 'FORMULARIO DENUNCIAS (EXTERNO)', 'MENU Y ACCESO EXTERNO AL FORMULARIO GESTION DENUNCIAS', 0, 0, 'ACTIVO', 'ACTIVAR' );
INSERT INTO public.menus ( modulos_sigla, sigla, menu, descripcion, nivel, padre_id, estado, transaccion ) VALUES( 'DEN_DERIV', 'M_DEN_DERI', 'DERIVACION DENUNCIAS ', 'MENU FORMULARIO DERIVACION  DENUNCIAS', 0, 0, 'ACTIVO', 'ACTIVAR' );
INSERT INTO public.menus ( modulos_sigla, sigla, menu, descripcion, nivel, padre_id, estado, transaccion ) VALUES( 'DEN_SEG', 'M_DEN_SEG', 'SEGUIMIENTO DENUNCIAS', 'MENU FORMULARIO  DEN_SEG DENUNCIAS', 0, 0, 'ACTIVO', 'ACTIVAR'       );
INSERT INTO public.menus ( modulos_sigla, sigla, menu, descripcion, nivel, padre_id, estado, transaccion ) VALUES( 'DEN_CONC', 'M_DEN_CON', 'CONCLUSION DENUNCIAS', 'MENU FORMULARIO  DEN_CONC  DENUNCIAS', 0, 0, 'ACTIVO', 'ACTIVAR'     );
INSERT INTO public.menus ( modulos_sigla, sigla, menu, descripcion, nivel, padre_id, estado, transaccion ) VALUES( 'ADM_USU', 'M_ADM_USU', 'ADMINISTRACION DENUNCIAS', 'MENU FORMULARIO  DENUNCIAS', 0, 0, 'ACTIVO', 'ACTIVAR'            );
INSERT INTO public.menus ( modulos_sigla, sigla, menu, descripcion, nivel, padre_id, estado, transaccion ) VALUES( 'ADM_ROL', 'M_ADM_ROL', 'ADMINISTRACION ', 'MENU FORMULARIO  ADM_ROL  DENUNCIAS', 0, 0, 'ACTIVO', 'ACTIVAR'            );
INSERT INTO public.menus ( modulos_sigla, sigla, menu, descripcion, nivel, padre_id, estado, transaccion ) VALUES(  'ADM_PERFIL', 'M_ADM_PERF', 'ADMINISTRACION ', 'MENU FORMULARIO   ADM_PERFIL DENUNCIAS', 0, 0, 'ACTIVO', 'ACTIVAR'    );
INSERT INTO public.menus ( modulos_sigla, sigla, menu, descripcion, nivel, padre_id, estado, transaccion ) VALUES(  'DEN_REP', 'M_DEN_REP', 'REPORTES', 'MENU FORMULARIO  DEN_REP  DENUNCIAS', 0, 0, 'ACTIVO', 'ACTIVAR'                  );
INSERT INTO public.menus ( modulos_sigla, sigla, menu, descripcion, nivel, padre_id, estado, transaccion ) VALUES(  'DEN_REP_E', 'M_DE_REP_E', 'REPORTES ESTADISTICOS', 'MENU FORMULARIO DEN_REP_E   DENUNCIAS', 0, 0, 'ACTIVO','ACTIVAR' );
INSERT INTO public.menus ( modulos_sigla, sigla, menu, descripcion, nivel, padre_id, estado, transaccion ) VALUES(  'DEN_REP_M', 'M_DE_REP_M', 'REPORTE MAPA DENUNCIAS', 'MENU FORMULARIO DEN_REP_M   DENUNCIAS', 0, 0,'ACTIVO','ACTIVAR' );
INSERT INTO public.menus ( modulos_sigla, sigla, menu, descripcion, nivel, padre_id, estado, transaccion ) VALUES(  'ADM_PER', 'M_ADM_PER', 'ADMINISTRACION ', 'MENU FORMULARIO  ADM_ROL  DENUNCIAS', 0, 0, 'ACTIVO', 'ACTIVAR'           );
																																																										  

--
INSERT INTO public.modulos (sigla, modulo, descripcion, estado, transaccion) VALUES('ROOT', 'MODULO_ROOT', 'MODULO ROOT PARA ADMIN CON ACCESO A TODO EL SISTEMA DENUNCIAS', 'ACTIVO', 'ACTIVAR');
INSERT INTO public.modulos (sigla, modulo, descripcion, estado, transaccion) VALUES('DEN_FORM', 'MODULO_DEN_FORMULARIO', 'FORMULARIO DE GESTION DE DENUNCIAS', 'ACTIVO', 'ACTIVAR'             );
INSERT INTO public.modulos (sigla, modulo, descripcion, estado, transaccion) VALUES('DEN_SEG', 'MODULO_DEN_SEGUIMIENTO', 'FORMULARIO DE SEGUIMIENTO DE DENUNCIAS', 'ACTIVO', 'ACTIVAR'         );
INSERT INTO public.modulos (sigla, modulo, descripcion, estado, transaccion) VALUES('LOGIN', 'MODULO_DEN_LOGIN', 'FORMULARIO DE AUTENTICACION', 'ACTIVO', 'ACTIVAR');
INSERT INTO public.modulos (sigla, modulo, descripcion, estado, transaccion) VALUES('DEN_DERIV', 'MODULO_DEN_DERIVACION', 'FORMULARIO DE DERIVACION DE DENUNCIAS', 'ACTIVO', 'ACTIVAR');
INSERT INTO public.modulos (sigla, modulo, descripcion, estado, transaccion) VALUES('DEN_CONC', 'MODULO_DEN_CONCLUSION', 'FORMULARIO DE CONCLUSION DE DENUNCIAS', 'ACTIVO', 'ACTIVAR' );
INSERT INTO public.modulos (sigla, modulo, descripcion, estado, transaccion) VALUES('ADM_USU', 'MODULO_ADM_USUARIOS', 'FORMULARIO DE ADMINISTRACION DE USUARIOS', 'ACTIVO', 'ACTIVAR' );
INSERT INTO public.modulos (sigla, modulo, descripcion, estado, transaccion) VALUES('ADM_ROL', 'MODULO_ADM_ROLES', 'FORMULARIO DE ROLES DE USUARIOS', 'ACTIVO', 'ACTIVAR'             );
INSERT INTO public.modulos (sigla, modulo, descripcion, estado, transaccion) VALUES( 'ADM_PERFIL', 'MODULO_ADM_PERFILES', 'FORMULARIO DE PERFILES ASIGNADOS A UN ROL', 'ACTIVO', 'ACTIVAR');
INSERT INTO public.modulos (sigla, modulo, descripcion, estado, transaccion) VALUES( 'DEN_REP', 'MODULO_REP_REPORTES', 'REPORTES DENUNCIAS NIVEL ROOT PARA ADMIN CON ACCESO A TODOS LOS REPORTES', 'ACTIVO', 'ACTIVAR');
INSERT INTO public.modulos (sigla, modulo, descripcion, estado, transaccion) VALUES( 'DEN_REP_E', 'MODULO_REP_ESTADISTICAS', 'REPORTES ESTADISTICOS', 'ACTIVO', 'ACTIVAR'        );
INSERT INTO public.modulos (sigla, modulo, descripcion, estado, transaccion) VALUES( 'DEN_REP_M', 'MODULO_REP_MAPA', 'REPORTE MAPA NACIONAL', 'ACTIVO', 'ACTIVAR'                );
INSERT INTO public.modulos (sigla, modulo, descripcion, estado, transaccion) VALUES( 'ADM_PER', 'MODULO_ADM_PERFILES', 'FORMULARIO DE PERFILES DE USUARIOS', 'ACTIVO', 'ACTIVAR' );

-- nivel geografico

INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('BOL', NULL, 'NAL', 'Bolivia', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('DPTO_CH', 'BOL', 'DPTO', 'Chuquisaca', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('DPTO_LP', 'BOL', 'DPTO', 'La Paz', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('DPTO_CO', 'BOL', 'DPTO', 'Cochabamba', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('DPTO_OR', 'BOL', 'DPTO', 'Oruro', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('DPTO_PO', 'BOL', 'DPTO', 'Potosi', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('DPTO_TA', 'BOL', 'DPTO', 'Tarija', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('DPTO_SC', 'BOL', 'DPTO', 'Santa Cruz', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('DPTO_BE', 'BOL', 'DPTO', 'Beni', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('DPTO_PA', 'BOL', 'DPTO', 'Pando', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_1', 'DPTO_CH', 'MUN', 'SUCRE', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_2', 'DPTO_CH', 'MUN', 'YOTALA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_3', 'DPTO_CH', 'MUN', 'AZURDUY', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_4', 'DPTO_CH', 'MUN', 'TARVITA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_5', 'DPTO_CH', 'MUN', 'ZUDAÑEZ', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_6', 'DPTO_CH', 'MUN', 'ICLA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_7', 'DPTO_CH', 'MUN', 'PADILLA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_8', 'DPTO_CH', 'MUN', 'TOMINA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_9', 'DPTO_CH', 'MUN', 'SOPACHUY', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_10', 'DPTO_CH', 'MUN', 'MONTEAGUDO', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_11', 'DPTO_CH', 'MUN', 'HUACARETA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_12', 'DPTO_CH', 'MUN', 'CAMARGO', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_13', 'DPTO_CH', 'MUN', 'SAN LUCAS', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_14', 'DPTO_CH', 'MUN', 'INCAHUASI', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_15', 'DPTO_CH', 'MUN', 'VILLA CHARCAS', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_16', 'DPTO_CH', 'MUN', 'VILLA SERRANO', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_17', 'DPTO_CH', 'MUN', 'CULPINA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_18', 'DPTO_CH', 'MUN', 'LAS CARRERAS', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_19', 'DPTO_CH', 'MUN', 'MUYUPAMPA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_20', 'DPTO_CH', 'MUN', 'MACHARETÍ', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_21', 'DPTO_LP', 'MUN', 'NUESTRA SEÑORA DE LA PAZ', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_22', 'DPTO_LP', 'MUN', 'PALCA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_23', 'DPTO_LP', 'MUN', 'ACHOCALLA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_24', 'DPTO_LP', 'MUN', 'EL ALTO', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_25', 'DPTO_LP', 'MUN', 'ACHACACHI', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_26', 'DPTO_LP', 'MUN', 'ANCORAIMES', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_27', 'DPTO_LP', 'MUN', 'CHUA COCANI', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_28', 'DPTO_LP', 'MUN', 'HUARINA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_29', 'DPTO_LP', 'MUN', 'SANTIAGO DE HUATA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_30', 'DPTO_LP', 'MUN', 'CORO CORO', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_31', 'DPTO_LP', 'MUN', 'CAQUIAVIRI', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_32', 'DPTO_LP', 'MUN', 'WALDO BALLIVIAN', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_33', 'DPTO_LP', 'MUN', 'PUERTO ACOSTA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_34', 'DPTO_LP', 'MUN', 'MOCOMOCO', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_35', 'DPTO_LP', 'MUN', 'PUERTO CARABUCO', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_36', 'DPTO_LP', 'MUN', 'HUMANATA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_37', 'DPTO_LP', 'MUN', 'ESCOMA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_38', 'DPTO_LP', 'MUN', 'CHUMA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_39', 'DPTO_LP', 'MUN', 'AYATA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_40', 'DPTO_LP', 'MUN', 'SORATA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_41', 'DPTO_LP', 'MUN', 'GUANAY', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_42', 'DPTO_LP', 'MUN', 'TACACOMA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_43', 'DPTO_LP', 'MUN', 'MAPIRI', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_44', 'DPTO_LP', 'MUN', 'TEOPONTE', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_45', 'DPTO_LP', 'MUN', 'APOLO', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_46', 'DPTO_LP', 'MUN', 'PELECHUCO', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_47', 'DPTO_LP', 'MUN', 'VIACHA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_48', 'DPTO_LP', 'MUN', 'TIAHUANACU', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_49', 'DPTO_LP', 'MUN', 'JESUS DE MACHAKA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_50', 'DPTO_LP', 'MUN', 'LURIBAY', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_51', 'DPTO_LP', 'MUN', 'SAPAHAQUI', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_52', 'DPTO_LP', 'MUN', 'YACO', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_53', 'DPTO_LP', 'MUN', 'CAIROMA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_54', 'DPTO_LP', 'MUN', 'INQUISIVI', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_55', 'DPTO_LP', 'MUN', 'QUIME', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_56', 'DPTO_LP', 'MUN', 'CAJUATA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_57', 'DPTO_LP', 'MUN', 'COLQUIRI', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_58', 'DPTO_LP', 'MUN', 'ICHOCA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_59', 'DPTO_LP', 'MUN', 'LICOMAPAMPA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_60', 'DPTO_LP', 'MUN', 'CHULUMANI', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_61', 'DPTO_LP', 'MUN', 'PALOS BLANCOS', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_62', 'DPTO_LP', 'MUN', 'LA ASUNTA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_63', 'DPTO_LP', 'MUN', 'PUCARANI', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_64', 'DPTO_LP', 'MUN', 'LAJA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_65', 'DPTO_LP', 'MUN', 'BATALLAS', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_66', 'DPTO_LP', 'MUN', 'PUERTO PÉREZ', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_67', 'DPTO_LP', 'MUN', 'SICA SICA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_68', 'DPTO_LP', 'MUN', 'UMALA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_69', 'DPTO_LP', 'MUN', 'AYO AYO', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_70', 'DPTO_LP', 'MUN', 'CALAMARCA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_71', 'DPTO_LP', 'MUN', 'PATACAMAYA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_72', 'DPTO_LP', 'MUN', 'COLQUENCHA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_73', 'DPTO_LP', 'MUN', 'COROICO', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_74', 'DPTO_LP', 'MUN', 'CORIPATA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_75', 'DPTO_LP', 'MUN', 'IXIAMAS', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_76', 'DPTO_LP', 'MUN', 'SAN BUENAVENTURA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_77', 'DPTO_LP', 'MUN', 'CHARAZANI', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_78', 'DPTO_LP', 'MUN', 'COPACABANA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_79', 'DPTO_LP', 'MUN', 'SAN PEDRO DE TIQUINA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_80', 'DPTO_LP', 'MUN', 'SAN PEDRO DE CURAHUARA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_81', 'DPTO_LP', 'MUN', 'PAPEL PAMPA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_82', 'DPTO_LP', 'MUN', 'SANTIAGO DE MACHACA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_83', 'DPTO_LP', 'MUN', 'CATACORA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_84', 'DPTO_LP', 'MUN', 'CARANAVI', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_85', 'DPTO_LP', 'MUN', 'ALTO BENI', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_86', 'DPTO_CO', 'MUN', 'COCHABAMBA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_87', 'DPTO_CO', 'MUN', 'AIQUILE', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_88', 'DPTO_CO', 'MUN', 'INDEPENDENCIA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_89', 'DPTO_CO', 'MUN', 'TARATA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_90', 'DPTO_CO', 'MUN', 'ANZALDO', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_91', 'DPTO_CO', 'MUN', 'SACABAMBA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_92', 'DPTO_CO', 'MUN', 'ARANI', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_93', 'DPTO_CO', 'MUN', 'ARQUE', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_94', 'DPTO_CO', 'MUN', 'CAPINOTA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_95', 'DPTO_CO', 'MUN', 'SANTIVAÑEZ', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_96', 'DPTO_CO', 'MUN', 'CLIZA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_97', 'DPTO_CO', 'MUN', 'TOLATA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_98', 'DPTO_CO', 'MUN', 'QUILLACOLLO', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_99', 'DPTO_CO', 'MUN', 'SIPE SIPE', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_100', 'DPTO_CO', 'MUN', 'TIQUIPAYA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_101', 'DPTO_CO', 'MUN', 'VINTO', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_102', 'DPTO_CO', 'MUN', 'COLCAPIRHUA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_103', 'DPTO_CO', 'MUN', 'SACABA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_104', 'DPTO_CO', 'MUN', 'COLOMI', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_105', 'DPTO_CO', 'MUN', 'VILLA TUNARI', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_106', 'DPTO_CO', 'MUN', 'TOTORA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_107', 'DPTO_CO', 'MUN', 'POJO', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_108', 'DPTO_CO', 'MUN', 'CHIMORE', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_109', 'DPTO_CO', 'MUN', 'PUERTO VILLARROEL', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_110', 'DPTO_CO', 'MUN', 'ENTRE RIOS', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_111', 'DPTO_CO', 'MUN', 'MIZQUE', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_112', 'DPTO_CO', 'MUN', 'PUNATA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_113', 'DPTO_CO', 'MUN', 'VILLA RIVERO', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_114', 'DPTO_CO', 'MUN', 'VILLA QUINTIN MENDOZA (SAN BENITO)', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_115', 'DPTO_CO', 'MUN', 'BOLIVAR', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_116', 'DPTO_CO', 'MUN', 'TIRAQUE', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_117', 'DPTO_CO', 'MUN', 'SHINAHOTA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_118', 'DPTO_OR', 'MUN', 'ORURO', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_119', 'DPTO_OR', 'MUN', 'CARACOLLO', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_120', 'DPTO_OR', 'MUN', 'EL CHORO', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_121', 'DPTO_OR', 'MUN', 'SORACACHI', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_122', 'DPTO_OR', 'MUN', 'CHALLAPATA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_123', 'DPTO_OR', 'MUN', 'QUILLACAS', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_124', 'DPTO_OR', 'MUN', 'CORQUE', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_125', 'DPTO_OR', 'MUN', 'TURCO', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_126', 'DPTO_OR', 'MUN', 'ESCARA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_127', 'DPTO_OR', 'MUN', 'CRUZ DE MACHACAMARCA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_128', 'DPTO_OR', 'MUN', 'VILLA POOPÓ', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_129', 'DPTO_OR', 'MUN', 'PAZÑA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_130', 'DPTO_OR', 'MUN', 'HUANUNI', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_131', 'DPTO_OR', 'MUN', 'MACHACAMARCA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_132', 'DPTO_OR', 'MUN', 'SALINAS DE GARCI MENDOZA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_133', 'DPTO_OR', 'MUN', 'SABAYA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_134', 'DPTO_OR', 'MUN', 'COIPASA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_135', 'DPTO_OR', 'MUN', 'TOLEDO', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_136', 'DPTO_OR', 'MUN', 'EUCALIPTUS', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_137', 'DPTO_OR', 'MUN', 'SAN PEDRO DE TOTORA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_138', 'DPTO_OR', 'MUN', 'HUARI', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_139', 'DPTO_OR', 'MUN', 'HUAYLLAMARCA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_140', 'DPTO_PO', 'MUN', 'POTOSÍ', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_141', 'DPTO_PO', 'MUN', 'TINGUIPAYA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_142', 'DPTO_PO', 'MUN', 'YOCALLA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_143', 'DPTO_PO', 'MUN', 'URMIRI', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_144', 'DPTO_PO', 'MUN', 'UNCIA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_145', 'DPTO_PO', 'MUN', 'CHAYANTA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_146', 'DPTO_PO', 'MUN', 'LLALLAGUA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_147', 'DPTO_PO', 'MUN', 'CHUQUIHUTA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_148', 'DPTO_PO', 'MUN', 'BETANZOS', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_149', 'DPTO_PO', 'MUN', 'CHAQUÍ', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_150', 'DPTO_PO', 'MUN', 'COLQUECHACA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_151', 'DPTO_PO', 'MUN', 'RAVELO', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_152', 'DPTO_PO', 'MUN', 'POCOATA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_153', 'DPTO_PO', 'MUN', 'SAN PEDRO DE BUENA VISTA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_154', 'DPTO_PO', 'MUN', 'TORO TORO', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_155', 'DPTO_PO', 'MUN', 'COTAGAITA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_156', 'DPTO_PO', 'MUN', 'VITICHI', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_157', 'DPTO_PO', 'MUN', 'VILLA DE SACACA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_158', 'DPTO_PO', 'MUN', 'CARIPUYO', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_159', 'DPTO_PO', 'MUN', 'TUPIZA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_160', 'DPTO_PO', 'MUN', 'ATOCHA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_161', 'DPTO_PO', 'MUN', 'COLCHA K', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_162', 'DPTO_PO', 'MUN', 'SAN PABLO DE LIPEZ', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_163', 'DPTO_PO', 'MUN', 'PUNA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_164', 'DPTO_PO', 'MUN', 'CAIZA D', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_165', 'DPTO_PO', 'MUN', 'CKOCHAS', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_166', 'DPTO_PO', 'MUN', 'UYUNI', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_167', 'DPTO_PO', 'MUN', 'TOMAVE', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_168', 'DPTO_PO', 'MUN', 'PORCO', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_169', 'DPTO_PO', 'MUN', 'ACASIO', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_170', 'DPTO_PO', 'MUN', 'TAHUA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_171', 'DPTO_PO', 'MUN', 'VILLAZÓN ', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_172', 'DPTO_PO', 'MUN', 'SAN AGUSTÍN ', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_173', 'DPTO_TA', 'MUN', 'TARIJA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_174', 'DPTO_TA', 'MUN', 'PADCAYA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_175', 'DPTO_TA', 'MUN', 'BERMEJO', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_176', 'DPTO_TA', 'MUN', 'YACUIBA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_177', 'DPTO_TA', 'MUN', 'CARAPARÍ', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_178', 'DPTO_TA', 'MUN', 'VILLAMONTES', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_179', 'DPTO_TA', 'MUN', 'URIONDO', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_180', 'DPTO_TA', 'MUN', 'YUNCHARÁ', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_181', 'DPTO_TA', 'MUN', 'VILLA SAN LORENZO', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_182', 'DPTO_TA', 'MUN', 'ENTRE RÍOS', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_183', 'DPTO_SC', 'MUN', 'PUERTO SUÁREZ', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_184', 'DPTO_SC', 'MUN', 'SANTA CRUZ DE LA SIERRA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_185', 'DPTO_SC', 'MUN', 'COTOCA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_186', 'DPTO_SC', 'MUN', 'LA GUARDIA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_187', 'DPTO_SC', 'MUN', 'WARNES', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_188', 'DPTO_SC', 'MUN', 'GENERAL SAAVEDRA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_189', 'DPTO_SC', 'MUN', 'BUENA VISTA', 'ELABORADO', 'CREAR');
INSERT INTO public.nivel_geografico (sigla, sigla_padre, nivel_geografico, descripcion, estado, transaccion) VALUES('MUN_190', 'DPTO_SC', 'MUN', 'SAN CARLOS', 'ELABORADO', 'CREAR');


--
--

INSERT INTO public.operaciones (sigla, operacion, descripcion, estado, transaccion) VALUES ( 'ALTA', 'OPERACION ALTA', 'INSERCION DE REGISTRO', 'ACTIVO', 'ACTIVAR'            );
INSERT INTO public.operaciones (sigla, operacion, descripcion, estado, transaccion) VALUES ( 'BAJA', 'OPERACION BAJA', 'ELIMINACION DE REGISTRO', 'ACTIVO', 'ACTIVAR'          );
INSERT INTO public.operaciones (sigla, operacion, descripcion, estado, transaccion) VALUES ( 'EDICION', 'OPERACION EDICION', 'MODIFICACION DE REGISTRO', 'ACTIVO', 'ACTIVAR'   );
INSERT INTO public.operaciones (sigla, operacion, descripcion, estado, transaccion) VALUES ( 'CONSULTA', 'OPERACION CONSULTA', 'CONSULTA DE REGISTRO', 'ACTIVO', 'ACTIVAR'     );



INSERT INTO public.parametros ( modulos_sigla, sigla, descripcion, orden, param_numerico_ini, param_numerico_fin, param_caracter_ini, param_fecha_ini, param_fecha_fin, fec_ini, fec_fin, estado, transaccion) VALUES('DEN_SEG_PLAZO_5_DIAS', 'RANGO_1_D_R', 'RANGO ROJO 1 DIAS. AMPLIACION DE PLAZO DE ATENCION DE 5 DIAS', 0, '5', '5', 'ROJO', NULL, NULL, '2024-01-12 00:00:00.000', '2025-12-12 00:00:00.000', 'INACTIVO', 'INACTIVAR'          );
INSERT INTO public.parametros ( modulos_sigla, sigla, descripcion, orden, param_numerico_ini, param_numerico_fin, param_caracter_ini, param_fecha_ini, param_fecha_fin, fec_ini, fec_fin, estado, transaccion) VALUES('DEN_SEG_PLAZO_5_DIAS', 'RANGO_5_D_V', 'RANGO VERDE 3 DIAS. AMPLIACION DE PLAZO DE ATENCION DE 5 DIAS', 0, '1', '3', 'VERDE', NULL, NULL, '2024-01-12 00:00:00.000', '2025-12-12 00:00:00.000', 'INACTIVO', 'INACTIVAR'        );
INSERT INTO public.parametros ( modulos_sigla, sigla, descripcion, orden, param_numerico_ini, param_numerico_fin, param_caracter_ini, param_fecha_ini, param_fecha_fin, fec_ini, fec_fin, estado, transaccion) VALUES('DEN_SEG_PLAZO_5_DIAS', 'RANGO_1_D_A', 'RANGO AMARILLO 1 DIAS. AMPLIACION DE PLAZO DE ATENCION DE 5 DIAS', 0, '4', '4', 'AMARILLO', NULL, NULL, '2024-01-12 00:00:00.000', '2025-12-12 00:00:00.000', 'INACTIVO', 'INACTIVAR'  );
INSERT INTO public.parametros ( modulos_sigla, sigla, descripcion, orden, param_numerico_ini, param_numerico_fin, param_caracter_ini, param_fecha_ini, param_fecha_fin, fec_ini, fec_fin, estado, transaccion) VALUES('DEN_SEG_PLAZO_10_DIAS', 'RANGO_3_D_A', 'RANGO AMARILLO 3 DIAS. AMPLIACION DE PLAZO DE ATENCION DE 5 DIAS', 0, '6', '8', 'AMARILLO', NULL, NULL, '2024-01-12 00:00:00.000', '2025-12-12 00:00:00.000', 'INACTIVO', 'INACTIVAR' );
INSERT INTO public.parametros ( modulos_sigla, sigla, descripcion, orden, param_numerico_ini, param_numerico_fin, param_caracter_ini, param_fecha_ini, param_fecha_fin, fec_ini, fec_fin, estado, transaccion) VALUES('DEN_SEG_PLAZO_10_DIAS', 'RANGO_2_D_R', 'RANGO ROJO 2 DIAS. AMPLIACION DE PLAZO DE ATENCION DE 5 DIAS', 0, '9', '10', 'ROJO', NULL, NULL, '2024-01-12 00:00:00.000', '2025-12-12 00:00:00.000', 'INACTIVO', 'INACTIVAR'        );
INSERT INTO public.parametros ( modulos_sigla, sigla, descripcion, orden, param_numerico_ini, param_numerico_fin, param_caracter_ini, param_fecha_ini, param_fecha_fin, fec_ini, fec_fin, estado, transaccion) VALUES('DEN_SEG_PLAZO_10_DIAS', 'RANGO_10_D_F_V', 'RANGO VERDE 10 DIAS. AMPLIACION DE PLAZO DE ATENCION DE 5 DIAS', 0, '1', '5', 'VERDE', NULL, NULL, '2024-01-12 00:00:00.000', '2025-12-12 00:00:00.000', 'INACTIVO', 'INACTIVAR'   );
INSERT INTO public.parametros ( modulos_sigla, sigla, descripcion, orden, param_numerico_ini, param_numerico_fin, param_caracter_ini, param_fecha_ini, param_fecha_fin, fec_ini, fec_fin, estado, transaccion) VALUES('DEN_SEG_PLAZO_10_DIAS', 'RANGO_6_D_F_A', 'RANGO AMARILLO 6 DIAS. AMPLIACION DE PLAZO DE ATENCION DE 5 DIAS', 0, '6', '8', 'AMARILLO', NULL, NULL, '2024-01-12 00:00:00.000', '2025-12-12 00:00:00.000', 'INACTIVO', 'INACTIVAR');
INSERT INTO public.parametros ( modulos_sigla, sigla, descripcion, orden, param_numerico_ini, param_numerico_fin, param_caracter_ini, param_fecha_ini, param_fecha_fin, fec_ini, fec_fin, estado, transaccion) VALUES( 'DEN_SEG_PLAZO_10_DIAS', 'RANGO_4_D_F_R', 'RANGO ROJO 4 DIAS. AMPLIACION DE PLAZO DE ATENCION DE 5 DIAS', 0, '9', '10', 'ROJO', NULL, NULL, '2024-01-12 00:00:00.000', '2025-12-12 00:00:00.000', 'INACTIVO', 'INACTIVAR'      );
INSERT INTO public.parametros ( modulos_sigla, sigla, descripcion, orden, param_numerico_ini, param_numerico_fin, param_caracter_ini, param_fecha_ini, param_fecha_fin, fec_ini, fec_fin, estado, transaccion) VALUES('DEN_SEG_PLAZO_10_DIAS', 'RANGO_10_D_V', 'RANGO VERDE 10 DIAS. AMPLIACION DE PLAZO DE ATENCION DE 5 DIAS', 0, '1', '5', 'VERDE', NULL, NULL, '2024-01-12 00:00:00.000', '2025-12-12 00:00:00.000', 'INACTIVO', 'INACTIVAR'      );
INSERT INTO public.parametros ( modulos_sigla, sigla, descripcion, orden, param_numerico_ini, param_numerico_fin, param_caracter_ini, param_fecha_ini, param_fecha_fin, fec_ini, fec_fin, estado, transaccion) VALUES( 'DEN_SEG_AMP_5_DIAS', 'AMP_5_D', '5 DIAS. AMPLIACION DE PLAZO DE ATENCION DE 5 DIAS', 1, '5', '5', '''5 day''', NULL, NULL, '2024-01-12 00:00:00.000', '2025-12-12 00:00:00.000', 'ACTIVO', 'ACTIVAR'                          );
INSERT INTO public.parametros ( modulos_sigla, sigla, descripcion, orden, param_numerico_ini, param_numerico_fin, param_caracter_ini, param_fecha_ini, param_fecha_fin, fec_ini, fec_fin, estado, transaccion) VALUES( 'DEN_SEG_AMP_45_DIAS', 'AMP_45_D', '45 DIAS. AMPLIACION DE PLAZO DE ATENCION DE 45 DIAS', 3, '45', '45', '''45 day''', NULL, NULL, '2024-01-12 00:00:00.000', '2025-12-12 00:00:00.000', 'ACTIVO', 'ACTIVAR'                   );
INSERT INTO public.parametros ( modulos_sigla, sigla, descripcion, orden, param_numerico_ini, param_numerico_fin, param_caracter_ini, param_fecha_ini, param_fecha_fin, fec_ini, fec_fin, estado, transaccion) VALUES( 'DEN_SEG_AMP_10_DIAS', 'AMP_10_D', '10 DIAS. AMPLIACION DE PLAZO DE ATENCION DE 5 DIAS', 2, '10', '10', '''10 day''', NULL, NULL, '2024-01-12 00:00:00.000', '2025-12-12 00:00:00.000', 'ACTIVO', 'ACTIVAR'                    );


--

--
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('ADMIN', 'M_ADM_USU', 'ALTA', 'CREACION DE REGISTRO',      'ACTIVO', 'ACTIVAR');
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('ADMIN', 'M_ADM_USU', 'EDICION', 'EDICION DE REGISTRO',    'ACTIVO', 'ACTIVAR');
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('ADMIN', 'M_ADM_USU', 'CONSULTA', 'CONSULTA DE REGISTRO',  'ACTIVO', 'ACTIVAR');
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('ADMIN', 'M_ADM_USU', 'BAJA', 'ELIMINACION DE REGISTRO','INACTIVO', 'INACTIVAR');
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('ADMIN', 'M_DEN_SEG', 'ALTA', 'CREACION DE REGISTRO', 'ACTIVO', 'ACTIVAR'     );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('ADMIN', 'M_DEN_SEG', 'CONSULTA', 'CONSULTA DE REGISTRO', 'ACTIVO', 'ACTIVAR' );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('ADMIN', 'M_DE_REP_E', 'CONSULTA', 'CONSULTA DE REPORTE', 'ACTIVO', 'ACTIVAR' );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('ADMIN', 'M_DEN_SEG', 'EDICION', 'EDICION DE REGISTRO', 'ACTIVO', 'ACTIVAR'   );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('ADMIN', 'M_ADM_ROL', 'ALTA', 'CREACION DE REGISTRO', 'ACTIVO', 'ACTIVAR'     );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('ADMIN', 'M_ADM_ROL', 'EDICION', 'EDICION DE REGISTRO', 'ACTIVO', 'ACTIVAR'   );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('ADMIN', 'M_ADM_ROL', 'CONSULTA', 'CONSULTA DE REGISTRO', 'ACTIVO', 'ACTIVAR' );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('ADMIN', 'M_ADM_PER', 'ALTA', 'CREACION DE REGISTRO', 'ACTIVO', 'ACTIVAR'     );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('ADMIN', 'M_ADM_PER', 'EDICION', 'EDICION DE REGISTRO', 'ACTIVO', 'ACTIVAR'   );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('ADMIN', 'M_ADM_PER', 'CONSULTA', 'CONSULTA DE REGISTRO', 'ACTIVO', 'ACTIVAR' );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('ADMIN', 'M_DEN_DERI', 'ALTA', 'CREACION DE REGISTRO', 'ACTIVO', 'ACTIVAR'    );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('ADMIN', 'M_DEN_DERI', 'CONSULTA', 'CONSULTA DE REGISTRO', 'ACTIVO', 'ACTIVAR');
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('ADMIN', 'M_DEN_DERI', 'EDICION', 'EDICION DE REGISTRO', 'ACTIVO', 'ACTIVAR'  );

INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES( 'DIRECT_NAL', 'M_DEN_DERI', 'CONSULTA', ' MODULO_DEN_DERIVACION: CONSULTA ', 'INACTIVO', 'INACTIVAR');
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('DIRECT_NAL', 'M_DEN_DERI', 'EDICION', ' MODULO_DEN_DERIVACION', 'INACTIVO', 'INACTIVAR'             );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES( 'DIRECT_NAL', 'M_DEN_SEG', 'EDICION', 'EDICION DE REGISTRO', 'INACTIVO', 'INACTIVAR'                );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('DIRECT_NAL', 'M_DEN_DERI', 'ALTA', ' MODULO_DEN_DERIVACION: ALTA ', 'INACTIVO', 'INACTIVAR'         );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES( 'DIRECT_NAL', 'M_DEN_SEG', 'CONSULTA', ' MODULO_DEN_SEGUIMIENTO: CONSULTA ', 'ACTIVO', 'ACTIVAR'    );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES( 'DIRECT_NAL', 'M_DEN_SEG', 'ALTA', ' MODULO_DEN_SEGUIMIENTO: ALTA ', 'INACTIVO', 'INACTIVAR'        );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES( 'GES_DEP_BE', 'M_DEN_DERI', 'ALTA', ' MODULO_DEN_DERIVACION: ALTA ', 'INACTIVO', 'INACTIVAR'        );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES( 'GES_DEP_BE', 'M_DEN_SEG', 'EDICION', ' MODULO_DEN_SEGUIMIENTO: EDICION ', 'ACTIVO', 'ACTIVAR'      );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES( 'GES_DEP_BE', 'M_DEN_CON', 'ALTA', 'MODULO_DEN_CONCLUSION: ALTA ', 'ACTIVO', 'ACTIVAR'              );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES( 'GES_DEP_BE', 'M_DEN_SEG', 'ALTA', ' MODULO_DEN_SEGUIMIENTO: ALTA ', 'INACTIVO', 'INACTIVAR'        );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES( 'GES_DEP_BE', 'M_DEN_SEG', 'CONSULTA', ' MODULO_DEN_SEGUIMIENTO: CONSULTA ', 'INACTIVO', 'INACTIVAR');
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES( 'GES_DEP_BE', 'M_DEN_CON', 'EDICION', 'MODULO_DEN_CONCLUSION: EDICION ', 'ACTIVO', 'ACTIVAR'        );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES( 'GES_DEP_BE', 'M_DEN_DERI', 'EDICION', ' MODULO_DEN_DERIVACION: EDICION ', 'INACTIVO', 'INACTIVAR'  );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES( 'GES_DEP_BE', 'M_DEN_DERI', 'CONSULTA', ' MODULO_DEN_DERIVACION: CONSULTA ', 'INACTIVO', 'INACTIVAR');
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES( 'GES_DEP_BE', 'M_DEN_CON', 'CONSULTA', 'MODULO_DEN_CONCLUSION: CONSULTA ', 'INACTIVO', 'INACTIVAR'  );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('GES_DEP_CH', 'M_DEN_DERI', 'ALTA', ' MODULO_DEN_DERIVACION: ALTA ', 'INACTIVO', 'INACTIVAR'         );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('GES_DEP_CH', 'M_DEN_SEG', 'EDICION', ' MODULO_DEN_SEGUIMIENTO: EDICION ', 'ACTIVO', 'ACTIVAR'       );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('GES_DEP_CH', 'M_DEN_CON', 'ALTA', 'MODULO_DEN_CONCLUSION: ALTA ', 'ACTIVO', 'ACTIVAR'               );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('GES_DEP_CH', 'M_DEN_SEG', 'ALTA', ' MODULO_DEN_SEGUIMIENTO: ALTA ', 'INACTIVO', 'INACTIVAR'         );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('GES_DEP_CH', 'M_DEN_SEG', 'CONSULTA', ' MODULO_DEN_SEGUIMIENTO: CONSULTA ', 'INACTIVO', 'INACTIVAR' );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('GES_DEP_CH', 'M_DEN_CON', 'EDICION', 'MODULO_DEN_CONCLUSION: EDICION ', 'ACTIVO', 'ACTIVAR'         );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('GES_DEP_CH', 'M_DEN_DERI', 'EDICION', ' MODULO_DEN_DERIVACION: EDICION ', 'INACTIVO', 'INACTIVAR'   );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('GES_DEP_CH', 'M_DEN_DERI', 'CONSULTA', ' MODULO_DEN_DERIVACION: CONSULTA ', 'INACTIVO', 'INACTIVAR' );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('GES_DEP_CH', 'M_DEN_CON', 'CONSULTA', 'MODULO_DEN_CONCLUSION: CONSULTA ', 'INACTIVO', 'INACTIVAR'   );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('GES_DEP_CO', 'M_DEN_DERI', 'ALTA', ' MODULO_DEN_DERIVACION: ALTA ', 'INACTIVO', 'INACTIVAR'         );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('GES_DEP_CO', 'M_DEN_SEG', 'EDICION', ' MODULO_DEN_SEGUIMIENTO: EDICION ', 'ACTIVO', 'ACTIVAR'       );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('GES_DEP_CO', 'M_DEN_CON', 'ALTA', 'MODULO_DEN_CONCLUSION: ALTA ', 'ACTIVO', 'ACTIVAR'               );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('GES_DEP_CO', 'M_DEN_SEG', 'ALTA', ' MODULO_DEN_SEGUIMIENTO: ALTA ', 'INACTIVO', 'INACTIVAR'         );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('GES_DEP_CO', 'M_DEN_SEG', 'CONSULTA', ' MODULO_DEN_SEGUIMIENTO: CONSULTA ', 'INACTIVO', 'INACTIVAR' );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('GES_DEP_CO', 'M_DEN_CON', 'EDICION', 'MODULO_DEN_CONCLUSION: EDICION ', 'ACTIVO', 'ACTIVAR'         );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('GES_DEP_CO', 'M_DEN_DERI', 'EDICION', ' MODULO_DEN_DERIVACION: EDICION ', 'INACTIVO', 'INACTIVAR'   );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('GES_DEP_CO', 'M_DEN_DERI', 'CONSULTA', ' MODULO_DEN_DERIVACION: CONSULTA ', 'INACTIVO', 'INACTIVAR' );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('GES_DEP_CO', 'M_DEN_CON', 'CONSULTA', 'MODULO_DEN_CONCLUSION: CONSULTA ', 'INACTIVO', 'INACTIVAR'   );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('GES_DEP_LP', 'M_DEN_CON', 'EDICION', 'EDICION DE REGISTRO', 'ACTIVO', 'ACTIVAR'                     );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('GES_DEP_LP', 'M_DEN_DERI', 'ALTA', 'MODULO_DEN_DERIVACION: ALTA ', 'INACTIVO', 'INACTIVAR'          );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('GES_DEP_LP', 'M_DEN_SEG', 'ALTA', ' MODULO_DEN_SEGUIMIENTO: ALTA ', 'ACTIVO', 'ACTIVAR'             );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('GES_DEP_LP', 'M_DEN_DERI', 'EDICION', 'MODULO_DEN_DERIVACION: EDICION ', 'ACTIVO', 'ACTIVAR'        );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('GES_DEP_LP', 'M_DEN_SEG', 'EDICION', ' MODULO_DEN_SEGUIMIENTO: EDICION ', 'INACTIVO', 'INACTIVAR'   );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('GES_DEP_LP', 'M_DEN_DERI', 'CONSULTA', 'MODULO_DEN_DERIVACION: CONSULTA ', 'ACTIVO', 'ACTIVAR'      );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('GES_DEP_LP', 'M_DEN_CON', 'ALTA', 'MODULO_DEN_CONCLUSION: ALTA ', 'ACTIVO', 'ACTIVAR'               );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('GES_DEP_LP', 'M_DEN_CON', 'CONSULTA', 'MODULO_DEN_CONCLUSION: CONSULTA ', 'ACTIVO', 'ACTIVAR'       );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('GES_DEP_LP', 'M_DEN_SEG', 'CONSULTA', ' MODULO_DEN_SEGUIMIENTO: CONSULTA ', 'ACTIVO', 'ACTIVAR'     );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('GES_DEP_OR', 'M_DEN_DERI', 'ALTA', ' MODULO_DEN_DERIVACION: ALTA ', 'INACTIVO', 'INACTIVAR'         );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('GES_DEP_OR', 'M_DEN_SEG', 'EDICION', ' MODULO_DEN_SEGUIMIENTO: EDICION ', 'ACTIVO', 'ACTIVAR'       );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('GES_DEP_OR', 'M_DEN_CON', 'ALTA', 'MODULO_DEN_CONCLUSION: ALTA ', 'ACTIVO', 'ACTIVAR'               );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('GES_DEP_OR', 'M_DEN_SEG', 'ALTA', ' MODULO_DEN_SEGUIMIENTO: ALTA ', 'INACTIVO', 'INACTIVAR'         );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('GES_DEP_OR', 'M_DEN_SEG', 'CONSULTA', ' MODULO_DEN_SEGUIMIENTO: CONSULTA ', 'INACTIVO', 'INACTIVAR' );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('GES_DEP_OR', 'M_DEN_CON', 'EDICION', 'MODULO_DEN_CONCLUSION: EDICION ', 'ACTIVO', 'ACTIVAR'         );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES( 'GES_DEP_OR', 'M_DEN_DERI', 'EDICION', ' MODULO_DEN_DERIVACION: EDICION ', 'INACTIVO', 'INACTIVAR'  );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES( 'GES_DEP_OR', 'M_DEN_DERI', 'CONSULTA', ' MODULO_DEN_DERIVACION: CONSULTA ', 'INACTIVO', 'INACTIVAR');
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES( 'GES_DEP_OR', 'M_DEN_CON', 'CONSULTA', 'MODULO_DEN_CONCLUSION: CONSULTA ', 'INACTIVO', 'INACTIVAR'  );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES( 'GES_DEP_PA', 'M_DEN_DERI', 'ALTA', ' MODULO_DEN_DERIVACION: ALTA ', 'INACTIVO', 'INACTIVAR'        );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES( 'GES_DEP_PA', 'M_DEN_SEG', 'EDICION', ' MODULO_DEN_SEGUIMIENTO: EDICION ', 'ACTIVO', 'ACTIVAR'      );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES( 'GES_DEP_PA', 'M_DEN_CON', 'ALTA', 'MODULO_DEN_CONCLUSION: ALTA ', 'ACTIVO', 'ACTIVAR'              );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES( 'GES_DEP_PA', 'M_DEN_SEG', 'ALTA', ' MODULO_DEN_SEGUIMIENTO: ALTA ', 'INACTIVO', 'INACTIVAR'        );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES( 'GES_DEP_PA', 'M_DEN_SEG', 'CONSULTA', ' MODULO_DEN_SEGUIMIENTO: CONSULTA ', 'INACTIVO', 'INACTIVAR');
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES( 'GES_DEP_PA', 'M_DEN_CON', 'EDICION', 'MODULO_DEN_CONCLUSION: EDICION ', 'ACTIVO', 'ACTIVAR'        );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES( 'GES_DEP_PA', 'M_DEN_DERI', 'EDICION', ' MODULO_DEN_DERIVACION: EDICION ', 'INACTIVO', 'INACTIVAR'  );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES( 'GES_DEP_PA', 'M_DEN_DERI', 'CONSULTA', ' MODULO_DEN_DERIVACION: CONSULTA ', 'INACTIVO', 'INACTIVAR');
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES( 'GES_DEP_PA', 'M_DEN_CON', 'CONSULTA', 'MODULO_DEN_CONCLUSION: CONSULTA ', 'INACTIVO', 'INACTIVAR'  );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES( 'GES_DEP_PO', 'M_DEN_DERI', 'ALTA', ' MODULO_DEN_DERIVACION: ALTA ', 'INACTIVO', 'INACTIVAR'        );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES( 'GES_DEP_PO', 'M_DEN_SEG', 'EDICION', ' MODULO_DEN_SEGUIMIENTO: EDICION ', 'ACTIVO', 'ACTIVAR'      );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES( 'GES_DEP_PO', 'M_DEN_CON', 'ALTA', 'MODULO_DEN_CONCLUSION: ALTA ', 'ACTIVO', 'ACTIVAR'              );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES( 'GES_DEP_PO', 'M_DEN_SEG', 'ALTA', ' MODULO_DEN_SEGUIMIENTO: ALTA ', 'INACTIVO', 'INACTIVAR'        );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES( 'GES_DEP_PO', 'M_DEN_SEG', 'CONSULTA', ' MODULO_DEN_SEGUIMIENTO: CONSULTA ', 'INACTIVO', 'INACTIVAR');
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES( 'GES_DEP_PO', 'M_DEN_CON', 'EDICION', 'MODULO_DEN_CONCLUSION: EDICION ', 'ACTIVO', 'ACTIVAR'        );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES( 'GES_DEP_PO', 'M_DEN_DERI', 'EDICION', ' MODULO_DEN_DERIVACION: EDICION ', 'INACTIVO', 'INACTIVAR'  );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES( 'GES_DEP_PO', 'M_DEN_DERI', 'CONSULTA', ' MODULO_DEN_DERIVACION: CONSULTA ', 'INACTIVO', 'INACTIVAR');
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES( 'GES_DEP_PO', 'M_DEN_CON', 'CONSULTA', 'MODULO_DEN_CONCLUSION: CONSULTA ', 'INACTIVO', 'INACTIVAR'  );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('GES_DEP_SC', 'M_DEN_CON', 'EDICION', 'EDICION DE REGISTRO', 'ACTIVO', 'ACTIVAR'                     );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('GES_DEP_SC', 'M_DEN_DERI', 'ALTA', 'MODULO_DEN_DERIVACION: ALTA ', 'INACTIVO', 'INACTIVAR'          );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('GES_DEP_SC', 'M_DEN_SEG', 'ALTA', ' MODULO_DEN_SEGUIMIENTO: ALTA ', 'ACTIVO', 'ACTIVAR'             );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('GES_DEP_SC', 'M_DEN_DERI', 'EDICION', 'MODULO_DEN_DERIVACION: EDICION ', 'ACTIVO', 'ACTIVAR'        );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('GES_DEP_SC', 'M_DEN_SEG', 'EDICION', ' MODULO_DEN_SEGUIMIENTO: EDICION ', 'INACTIVO', 'INACTIVAR'   );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('GES_DEP_SC', 'M_DEN_DERI', 'CONSULTA', 'MODULO_DEN_DERIVACION: CONSULTA ', 'ACTIVO', 'ACTIVAR'      );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('GES_DEP_SC', 'M_DEN_CON', 'ALTA', 'MODULO_DEN_CONCLUSION: ALTA ', 'ACTIVO', 'ACTIVAR'               );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('GES_DEP_SC', 'M_DEN_CON', 'CONSULTA', 'MODULO_DEN_CONCLUSION: CONSULTA ', 'ACTIVO', 'ACTIVAR'       );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('GES_DEP_SC', 'M_DEN_SEG', 'CONSULTA', ' MODULO_DEN_SEGUIMIENTO: CONSULTA ', 'ACTIVO', 'ACTIVAR'     );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('GES_DEP_TA', 'M_DEN_DERI', 'ALTA', ' MODULO_DEN_DERIVACION: ALTA ', 'INACTIVO', 'INACTIVAR'         );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('GES_DEP_TA', 'M_DEN_SEG', 'EDICION', ' MODULO_DEN_SEGUIMIENTO: EDICION ', 'ACTIVO', 'ACTIVAR'       );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('GES_DEP_TA', 'M_DEN_CON', 'ALTA', 'MODULO_DEN_CONCLUSION: ALTA ', 'ACTIVO', 'ACTIVAR'               );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('GES_DEP_TA', 'M_DEN_SEG', 'ALTA', ' MODULO_DEN_SEGUIMIENTO: ALTA ', 'INACTIVO', 'INACTIVAR'         );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('GES_DEP_TA', 'M_DEN_SEG', 'CONSULTA', ' MODULO_DEN_SEGUIMIENTO: CONSULTA ', 'INACTIVO', 'INACTIVAR' );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('GES_DEP_TA', 'M_DEN_CON', 'EDICION', 'MODULO_DEN_CONCLUSION: EDICION ', 'ACTIVO', 'ACTIVAR'         );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('GES_DEP_TA', 'M_DEN_DERI', 'EDICION', ' MODULO_DEN_DERIVACION: EDICION ', 'INACTIVO', 'INACTIVAR'   );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('GES_DEP_TA', 'M_DEN_DERI', 'CONSULTA', ' MODULO_DEN_DERIVACION: CONSULTA ', 'INACTIVO', 'INACTIVAR' );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('GES_DEP_TA', 'M_DEN_CON', 'CONSULTA', 'MODULO_DEN_CONCLUSION: CONSULTA ', 'INACTIVO', 'INACTIVAR'   );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES( 'SEG_DEP_BE', 'M_DEN_SEG', 'EDICION', 'EDICION DE REGISTRO', 'ACTIVO', 'ACTIVAR'                   );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES( 'SEG_DEP_BE', 'M_DEN_SEG', 'ALTA', 'CREACION DE REGISTRO', 'ACTIVO', 'ACTIVAR'    );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES( 'SEG_DEP_BE', 'M_DEN_SEG', 'CONSULTA', 'CONSULTA DE REGISTRO', 'ACTIVO', 'ACTIVAR');
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('SEG_DEP_CH', 'M_DEN_SEG', 'ALTA', 'CREACION DE REGISTRO', 'ACTIVO', 'ACTIVAR'     );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('SEG_DEP_CH', 'M_DEN_SEG', 'CONSULTA', 'CONSULTA DE REGISTRO', 'ACTIVO', 'ACTIVAR' );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('SEG_DEP_CH', 'M_DEN_SEG', 'EDICION', 'EDICION DE REGISTRO', 'ACTIVO', 'ACTIVAR'   );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('SEG_DEP_CO', 'M_DEN_SEG', 'ALTA', 'CREACION DE REGISTRO', 'ACTIVO', 'ACTIVAR'     );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('SEG_DEP_CO', 'M_DEN_SEG', 'CONSULTA', 'CONSULTA DE REGISTRO', 'ACTIVO', 'ACTIVAR' );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('SEG_DEP_CO', 'M_DEN_SEG', 'EDICION', 'EDICION DE REGISTRO', 'ACTIVO', 'ACTIVAR'   );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('SEG_DEP_LP', 'M_DEN_SEG', 'ALTA', 'CREACION DE REGISTRO', 'ACTIVO', 'ACTIVAR'     );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('SEG_DEP_LP', 'M_DEN_SEG', 'CONSULTA', 'CONSULTA DE REGISTRO', 'ACTIVO', 'ACTIVAR' );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('SEG_DEP_LP', 'M_DEN_SEG', 'EDICION', 'EDICION DE REGISTRO', 'ACTIVO', 'ACTIVAR'   );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES( 'SEG_DEP_OR', 'M_DEN_SEG', 'EDICION', 'EDICION DE REGISTRO', 'ACTIVO', 'ACTIVAR'  );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES( 'SEG_DEP_OR', 'M_DEN_SEG', 'ALTA', 'CREACION DE REGISTRO', 'ACTIVO', 'ACTIVAR'    );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES( 'SEG_DEP_OR', 'M_DEN_SEG', 'CONSULTA', 'CONSULTA DE REGISTRO', 'ACTIVO', 'ACTIVAR');
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES( 'SEG_DEP_PA', 'M_DEN_SEG', 'ALTA', 'CREACION DE REGISTRO', 'ACTIVO', 'ACTIVAR'    );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES( 'SEG_DEP_PA', 'M_DEN_SEG', 'CONSULTA', 'CONSULTA DE REGISTRO', 'ACTIVO', 'ACTIVAR');
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES( 'SEG_DEP_PA', 'M_DEN_SEG', 'EDICION', 'EDICION DE REGISTRO', 'ACTIVO', 'ACTIVAR'  );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES( 'SEG_DEP_PO', 'M_DEN_SEG', 'EDICION', 'EDICION DE REGISTRO', 'ACTIVO', 'ACTIVAR'  );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES( 'SEG_DEP_PO', 'M_DEN_SEG', 'ALTA', 'CREACION DE REGISTRO', 'ACTIVO', 'ACTIVAR'    );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES( 'SEG_DEP_PO', 'M_DEN_SEG', 'CONSULTA', 'CONSULTA DE REGISTRO', 'ACTIVO', 'ACTIVAR');
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('SEG_DEP_SC', 'M_DEN_SEG', 'ALTA', 'CREACION DE REGISTRO', 'ACTIVO', 'ACTIVAR'     );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('SEG_DEP_SC', 'M_DEN_SEG', 'CONSULTA', 'CONSULTA DE REGISTRO', 'ACTIVO', 'ACTIVAR' );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('SEG_DEP_SC', 'M_DEN_SEG', 'EDICION', 'EDICION DE REGISTRO', 'ACTIVO', 'ACTIVAR'   );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('SEG_DEP_TA', 'M_DEN_SEG', 'EDICION', 'EDICION DE REGISTRO', 'ACTIVO', 'ACTIVAR'   );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('SEG_DEP_TA', 'M_DEN_SEG', 'ALTA', 'CREACION DE REGISTRO', 'ACTIVO', 'ACTIVAR'     );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('SEG_DEP_TA', 'M_DEN_SEG', 'CONSULTA', 'CONSULTA DE REGISTRO', 'ACTIVO', 'ACTIVAR' );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('TRANSP_NAL', 'M_ADM_USU', 'ALTA', 'CREACION DE REGISTRO', 'ACTIVO', 'ACTIVAR'     );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('TRANSP_NAL', 'M_ADM_USU', 'EDICION', 'EDICION DE REGISTRO', 'ACTIVO', 'ACTIVAR'   );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('TRANSP_NAL', 'M_ADM_USU', 'CONSULTA', 'CONSULTA DE REGISTRO', 'ACTIVO', 'ACTIVAR' );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('TRANSP_NAL', 'M_DEN_SEG', 'ALTA', 'CREACION DE REGISTRO', 'ACTIVO', 'ACTIVAR'     );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('TRANSP_NAL', 'M_DEN_SEG', 'CONSULTA', 'CONSULTA DE REGISTRO', 'ACTIVO', 'ACTIVAR' );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('TRANSP_NAL', 'M_DE_REP_E', 'CONSULTA', 'CONSULTA DE REPORTE', 'ACTIVO', 'ACTIVAR' );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('TRANSP_NAL', 'M_DEN_SEG', 'EDICION', 'EDICION DE REGISTRO', 'ACTIVO', 'ACTIVAR'   );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('TRANSP_NAL', 'M_ADM_ROL', 'ALTA', 'CREACION DE REGISTRO', 'ACTIVO', 'ACTIVAR'     );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('TRANSP_NAL', 'M_ADM_ROL', 'EDICION', 'EDICION DE REGISTRO', 'ACTIVO', 'ACTIVAR'   );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('TRANSP_NAL', 'M_ADM_ROL', 'CONSULTA', 'CONSULTA DE REGISTRO', 'ACTIVO', 'ACTIVAR' );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('TRANSP_NAL', 'M_ADM_PER', 'ALTA', 'CREACION DE REGISTRO', 'ACTIVO', 'ACTIVAR'     );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('TRANSP_NAL', 'M_ADM_PER', 'EDICION', 'EDICION DE REGISTRO', 'ACTIVO', 'ACTIVAR'   );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('TRANSP_NAL', 'M_ADM_PER', 'CONSULTA', 'CONSULTA DE REGISTRO', 'ACTIVO', 'ACTIVAR' );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('TRANSP_NAL', 'M_DEN_DERI', 'ALTA', 'CREACION DE REGISTRO', 'ACTIVO', 'ACTIVAR'    );
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('TRANSP_NAL', 'M_DEN_DERI', 'CONSULTA', 'CONSULTA DE REGISTRO', 'ACTIVO', 'ACTIVAR');
INSERT INTO public.rol_menus_operaciones ( roles_sigla, menus_sigla, operaciones_sigla, descripcion, estado, transaccion) VALUES('TRANSP_NAL', 'M_DEN_DERI', 'EDICION', 'EDICION DE REGISTRO', 'ACTIVO', 'ACTIVAR'  );


--


-- roles
INSERT INTO public.roles ( sigla, rol, descripcion, nivel_geografico_id, modulo_sigla, estado, transaccion, nivel_geografico_sigla) VALUES('ADMIN', 'ADMIN', 'ADMINISTRADOR DEL SISTEMA', 0, 'DENUN', 'ACTIVO', 'ACTIVAR', 'BOL');
INSERT INTO public.roles ( sigla, rol, descripcion, nivel_geografico_id, modulo_sigla, estado, transaccion, nivel_geografico_sigla) VALUES('GES_DEP_LP', 'GESTOR DPTAL. LP.(DERIVADOR)', 'GESTOR DEPARTAMENTAL (ASIGNA DENUNCIAS A UN INVESTIGADOR)', 7, 'DENUN', 'ACTIVO', 'ACTIVAR' ,'DPTO_LP');
INSERT INTO public.roles ( sigla, rol, descripcion, nivel_geografico_id, modulo_sigla, estado, transaccion, nivel_geografico_sigla) VALUES('DIRECT_NAL', 'DIRECTOR NACIONAL', 'DIRECTOR NACIONAL', 0, 'DENUN', 'ACTIVO', 'ACTIVAR', 'BOL');
INSERT INTO public.roles ( sigla, rol, descripcion, nivel_geografico_id, modulo_sigla, estado, transaccion, nivel_geografico_sigla) VALUES('TRANSP_NAL', 'DIRECTOR NAL. TRANSPARENCIA', 'DIRECTOR NACIONAL TRANSPARENCIA', 0, 'DENUN', 'ACTIVO', 'ACTIVAR', 'BOL');
INSERT INTO public.roles ( sigla, rol, descripcion, nivel_geografico_id, modulo_sigla, estado, transaccion, nivel_geografico_sigla) VALUES('SEG_DEP_LP', 'GESTOR SEGUIMIENTO DPTAL. LP.', 'GESTOR DEPARTAMENTAL SEGUIMIENTO (REALIZA LA INVESTIGACION DEL CASO)', 7, 'DENUN', 'ACTIVO', 'ACTIVAR','DPTO_LP');
INSERT INTO public.roles ( sigla, rol, descripcion, nivel_geografico_id, modulo_sigla, estado, transaccion, nivel_geografico_sigla) VALUES('GES_DEP_CH', 'GESTOR DPTAL. CH.(DERIVADOR)', 'GESTOR DEPARTAMENTAL (ASIGNA DENUNCIAS A UN INVESTIGADOR)', 6, 'DENUN', 'ACTIVO', 'ACTIVAR', 'DPTO_CH');
INSERT INTO public.roles ( sigla, rol, descripcion, nivel_geografico_id, modulo_sigla, estado, transaccion, nivel_geografico_sigla) VALUES('SEG_DEP_CH', 'GESTOR SEGUIMIENTO DPTAL. CH.', 'GESTOR DEPARTAMENTAL SEGUIMIENTO (REALIZA LA INVESTIGACION DEL CASO)', 6, 'DENUN', 'ACTIVO', 'ACTIVAR',   'DPTO_CH');
INSERT INTO public.roles ( sigla, rol, descripcion, nivel_geografico_id, modulo_sigla, estado, transaccion, nivel_geografico_sigla) VALUES('GES_DEP_OR', 'GESTOR DPTAL. OR.(DERIVADOR)', 'GESTOR DEPARTAMENTAL (ASIGNA DENUNCIAS A UN INVESTIGADOR)', 9, 'DENUN', 'ACTIVO', 'ACTIVAR',               'DPTO_OR');
INSERT INTO public.roles ( sigla, rol, descripcion, nivel_geografico_id, modulo_sigla, estado, transaccion, nivel_geografico_sigla) VALUES('SEG_DEP_OR', 'GESTOR SEGUIMIENTO DPTAL. OR.', 'GESTOR DEPARTAMENTAL SEGUIMIENTO (REALIZA LA INVESTIGACION DEL CASO)', 9, 'DENUN', 'ACTIVO', 'ACTIVAR',   'DPTO_OR');
INSERT INTO public.roles ( sigla, rol, descripcion, nivel_geografico_id, modulo_sigla, estado, transaccion, nivel_geografico_sigla) VALUES( 'GES_DEP_SC', 'GESTOR DPTAL. SC.(DERIVADOR)', 'GESTOR DEPARTAMENTAL (ASIGNA DENUNCIAS A UN INVESTIGADOR)', 12, 'DENUN', 'ACTIVO', 'ACTIVAR',             'DPTO_SC');
INSERT INTO public.roles ( sigla, rol, descripcion, nivel_geografico_id, modulo_sigla, estado, transaccion, nivel_geografico_sigla) VALUES( 'SEG_DEP_SC', 'GESTOR SEGUIMIENTO DPTAL. SC.', 'GESTOR DEPARTAMENTAL SEGUIMIENTO (REALIZA LA INVESTIGACION DEL CASO)', 12, 'DENUN', 'ACTIVO', 'ACTIVAR', 'DPTO_SC');
INSERT INTO public.roles ( sigla, rol, descripcion, nivel_geografico_id, modulo_sigla, estado, transaccion, nivel_geografico_sigla) VALUES( 'GES_DEP_CO', 'GESTOR DPTAL. CBB.(DERIVADOR)', 'GESTOR DEPARTAMENTAL (ASIGNA DENUNCIAS A UN INVESTIGADOR)', 8, 'DENUN', 'ACTIVO', 'ACTIVAR',             'DPTO_CO');
INSERT INTO public.roles ( sigla, rol, descripcion, nivel_geografico_id, modulo_sigla, estado, transaccion, nivel_geografico_sigla) VALUES( 'SEG_DEP_CO', 'GESTOR SEGUIMIENTO DPTAL. CBB.', 'GESTOR DEPARTAMENTAL SEGUIMIENTO (REALIZA LA INVESTIGACION DEL CASO)', 8, 'DENUN', 'ACTIVO', 'ACTIVAR', 'DPTO_CO');
INSERT INTO public.roles ( sigla, rol, descripcion, nivel_geografico_id, modulo_sigla, estado, transaccion, nivel_geografico_sigla) VALUES( 'GES_DEP_BE', 'GESTOR DPTAL. BE.(DERIVADOR)', 'GESTOR DEPARTAMENTAL (ASIGNA DENUNCIAS A UN INVESTIGADOR)', 13, 'DENUN', 'ACTIVO', 'ACTIVAR',             'DPTO_BE');
INSERT INTO public.roles ( sigla, rol, descripcion, nivel_geografico_id, modulo_sigla, estado, transaccion, nivel_geografico_sigla) VALUES( 'GES_DEP_TA', 'GESTOR DPTAL. TAR.(DERIVADOR)', 'GESTOR DEPARTAMENTAL (ASIGNA DENUNCIAS A UN INVESTIGADOR)', 11, 'DENUN', 'ACTIVO', 'ACTIVAR',            'DPTO_TA');
INSERT INTO public.roles ( sigla, rol, descripcion, nivel_geografico_id, modulo_sigla, estado, transaccion, nivel_geografico_sigla) VALUES( 'GES_DEP_PA', 'GESTOR DPTAL. PA.(DERIVADOR)', 'GESTOR DEPARTAMENTAL (ASIGNA DENUNCIAS A UN INVESTIGADOR)', 14, 'DENUN', 'ACTIVO', 'ACTIVAR',             'DPTO_PA');
INSERT INTO public.roles ( sigla, rol, descripcion, nivel_geografico_id, modulo_sigla, estado, transaccion, nivel_geografico_sigla) VALUES( 'GES_DEP_PO', 'GESTOR DPTAL. PO.(DERIVADOR)', 'GESTOR DEPARTAMENTAL (ASIGNA DENUNCIAS A UN INVESTIGADOR)', 10, 'DENUN', 'ACTIVO', 'ACTIVAR',             'DPTO_PO');
INSERT INTO public.roles ( sigla, rol, descripcion, nivel_geografico_id, modulo_sigla, estado, transaccion, nivel_geografico_sigla) VALUES( 'SEG_DEP_BE', 'GESTOR SEGUIMIENTO DPTAL. BE.', 'GESTOR DEPARTAMENTAL SEGUIMIENTO (REALIZA LA INVESTIGACION DEL CASO)', 13, 'DENUN', 'ACTIVO', 'ACTIVAR', 'DPTO_BE');
INSERT INTO public.roles ( sigla, rol, descripcion, nivel_geografico_id, modulo_sigla, estado, transaccion, nivel_geografico_sigla) VALUES( 'SEG_DEP_TA', 'GESTOR SEGUIMIENTO DPTAL. TAR.', 'GESTOR DEPARTAMENTAL SEGUIMIENTO (REALIZA LA INVESTIGACION DEL CASO)', 11, 'DENUN', 'ACTIVO', 'ACTIVAR','DPTO_TA');
INSERT INTO public.roles ( sigla, rol, descripcion, nivel_geografico_id, modulo_sigla, estado, transaccion, nivel_geografico_sigla) VALUES( 'SEG_DEP_PA', 'GESTOR SEGUIMIENTO DPTAL. PA.', 'GESTOR DEPARTAMENTAL SEGUIMIENTO (REALIZA LA INVESTIGACION DEL CASO)', 14, 'DENUN', 'ACTIVO', 'ACTIVAR', 'DPTO_PA');
INSERT INTO public.roles ( sigla, rol, descripcion, nivel_geografico_id, modulo_sigla, estado, transaccion, nivel_geografico_sigla) VALUES( 'SEG_DEP_PO', 'GESTOR SEGUIMIENTO DPTAL. PO.', 'GESTOR DEPARTAMENTAL SEGUIMIENTO (REALIZA LA INVESTIGACION DEL CASO)', 10, 'DENUN', 'ACTIVO', 'ACTIVAR', 'DPTO_PO');


-- unidad policial

INSERT INTO public.unidad_policial (nivel_geografico_id, sigla, unidad_policial, descripcion, direccion, estado, transaccion  ) VALUES(7, 'FELCC', 'FELCC', 'FUERZA ESPECIAL DE LUCHA CONTRA EL CRIMEN', 'AV PANDO LA PAZ', 'ELABORADO', 'CREAR');

-- usuarios  pw: 123456

INSERT INTO public.usuarios (grados_sigla, puestos_sigla, genero_sexo_sigla, user_login, password_hash, nombres, apellido_pat, apellido_mat, email, telefono, direccion, reset_key, reset_date, fecha_nacimiento, ci_y_complemento, ci_expedido, foto_img_path, estado, transaccion  , nivel_geografico_id, nivel_geografico_sigla) VALUES('CIVIL', NULL, 'F', 'gmorales', 'e10adc3949ba59abbe56e057f20f883e', 'GUELY', 'MORALES', 'ARAMAYO', 'gmorales@policia.bo', '78118181', NULL, 'CAMBIADO', '2024-12-26 17:05:35.040', NULL, '1221121', 'LP', NULL, 'ACTIVO', 'MODIFICAR', 2, 'MUN_122');


-- usuarios_rol

INSERT INTO public.usuarios_rol ( usuarios_id, roles_sigla, descripcion, estado, transaccion  ) VALUES(1,'ADMIN', 'Cambio de rol', 'ACTIVO', 'MODIFICAR');


--
-- TOC entry 3762 (class 0 OID 0)
-- Dependencies: 303
-- Name: seq_actividades_aud_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--
/*
SELECT pg_catalog.setval('public.seq_actividades_aud_id', 1, false);


--
-- TOC entry 3763 (class 0 OID 0)
-- Dependencies: 280
-- Name: seq_actividades_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.seq_actividades_id', 1, true);


--
-- TOC entry 3764 (class 0 OID 0)
-- Dependencies: 304
-- Name: seq_control_aud_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.seq_control_aud_id', 1, false);


--
-- TOC entry 3765 (class 0 OID 0)
-- Dependencies: 281
-- Name: seq_control_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.seq_control_id', 1, true);


--
-- TOC entry 3766 (class 0 OID 0)
-- Dependencies: 305
-- Name: seq_denuncia_personas_aud_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.seq_denuncia_personas_aud_id', 1, false);


--
-- TOC entry 3767 (class 0 OID 0)
-- Dependencies: 282
-- Name: seq_denuncia_personas_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.seq_denuncia_personas_id', 1, true);


--
-- TOC entry 3768 (class 0 OID 0)
-- Dependencies: 306
-- Name: seq_derivacion_aud_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.seq_derivacion_aud_id', 1, false);


--
-- TOC entry 3769 (class 0 OID 0)
-- Dependencies: 283
-- Name: seq_derivacion_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.seq_derivacion_id', 1, true);


--
-- TOC entry 3770 (class 0 OID 0)
-- Dependencies: 307
-- Name: seq_documentos_path_aud_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.seq_documentos_path_aud_id', 1, false);


--
-- TOC entry 3771 (class 0 OID 0)
-- Dependencies: 284
-- Name: seq_documentos_path_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.seq_documentos_path_id', 1, true);


--
-- TOC entry 3772 (class 0 OID 0)
-- Dependencies: 308
-- Name: seq_event_log_operaciones_aud_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.seq_event_log_operaciones_aud_id', 1, false);


--
-- TOC entry 3773 (class 0 OID 0)
-- Dependencies: 285
-- Name: seq_event_log_operaciones_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.seq_event_log_operaciones_id', 1, true);


--
-- TOC entry 3774 (class 0 OID 0)
-- Dependencies: 309
-- Name: seq_genero_sexo_aud_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.seq_genero_sexo_aud_id', 1, false);


--
-- TOC entry 3775 (class 0 OID 0)
-- Dependencies: 286
-- Name: seq_genero_sexo_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.seq_genero_sexo_id', 1, true);


--
-- TOC entry 3776 (class 0 OID 0)
-- Dependencies: 310
-- Name: seq_grados_aud_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.seq_grados_aud_id', 1, false);


--
-- TOC entry 3777 (class 0 OID 0)
-- Dependencies: 287
-- Name: seq_grados_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.seq_grados_id', 1, false);


--
-- TOC entry 3778 (class 0 OID 0)
-- Dependencies: 311
-- Name: seq_menus_aud_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.seq_menus_aud_id', 1, false);


--
-- TOC entry 3779 (class 0 OID 0)
-- Dependencies: 288
-- Name: seq_menus_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.seq_menus_id', 1, true);


--
-- TOC entry 3780 (class 0 OID 0)
-- Dependencies: 312
-- Name: seq_modulos_aud_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.seq_modulos_aud_id', 1, false);


--
-- TOC entry 3781 (class 0 OID 0)
-- Dependencies: 289
-- Name: seq_modulos_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.seq_modulos_id', 1, true);


--
-- TOC entry 3782 (class 0 OID 0)
-- Dependencies: 313
-- Name: seq_nivel_geografico_aud_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.seq_nivel_geografico_aud_id', 1, false);


--
-- TOC entry 3783 (class 0 OID 0)
-- Dependencies: 290
-- Name: seq_nivel_geografico_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.seq_nivel_geografico_id', 1, false);


--
-- TOC entry 3784 (class 0 OID 0)
-- Dependencies: 314
-- Name: seq_notificaciones_aud_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.seq_notificaciones_aud_id', 1, false);


--
-- TOC entry 3785 (class 0 OID 0)
-- Dependencies: 291
-- Name: seq_notificaciones_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.seq_notificaciones_id', 1, true);


--
-- TOC entry 3786 (class 0 OID 0)
-- Dependencies: 315
-- Name: seq_operaciones_aud_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.seq_operaciones_aud_id', 1, false);


--
-- TOC entry 3787 (class 0 OID 0)
-- Dependencies: 292
-- Name: seq_operaciones_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.seq_operaciones_id', 1, false);


--
-- TOC entry 3788 (class 0 OID 0)
-- Dependencies: 325
-- Name: seq_parametros_aud_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.seq_parametros_aud_id', 1, false);


--
-- TOC entry 3789 (class 0 OID 0)
-- Dependencies: 302
-- Name: seq_parametros_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.seq_parametros_id', 1, true);


--
-- TOC entry 3790 (class 0 OID 0)
-- Dependencies: 316
-- Name: seq_personas_aud_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.seq_personas_aud_id', 1, false);


--
-- TOC entry 3791 (class 0 OID 0)
-- Dependencies: 293
-- Name: seq_personas_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.seq_personas_id', 1, true);


--
-- TOC entry 3792 (class 0 OID 0)
-- Dependencies: 324
-- Name: seq_puestos_aud_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.seq_puestos_aud_id', 1, false);


--
-- TOC entry 3793 (class 0 OID 0)
-- Dependencies: 301
-- Name: seq_puestos_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.seq_puestos_id', 1, false);


--
-- TOC entry 3794 (class 0 OID 0)
-- Dependencies: 317
-- Name: seq_rol_menus_operaciones_aud_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.seq_rol_menus_operaciones_aud_id', 1, false);


--
-- TOC entry 3795 (class 0 OID 0)
-- Dependencies: 294
-- Name: seq_rol_menus_operaciones_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.seq_rol_menus_operaciones_id', 1, true);


--
-- TOC entry 3796 (class 0 OID 0)
-- Dependencies: 318
-- Name: seq_roles_aud_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.seq_roles_aud_id', 1, false);


--
-- TOC entry 3797 (class 0 OID 0)
-- Dependencies: 295
-- Name: seq_roles_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.seq_roles_id', 1, true);


--
-- TOC entry 3798 (class 0 OID 0)
-- Dependencies: 319
-- Name: seq_seguimiento_aud_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.seq_seguimiento_aud_id', 1, false);


--
-- TOC entry 3799 (class 0 OID 0)
-- Dependencies: 296
-- Name: seq_seguimiento_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.seq_seguimiento_id', 1, true);


--
-- TOC entry 3800 (class 0 OID 0)
-- Dependencies: 320
-- Name: seq_sesion_log_aud_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.seq_sesion_log_aud_id', 1, false);


--
-- TOC entry 3801 (class 0 OID 0)
-- Dependencies: 297
-- Name: seq_sesion_log_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.seq_sesion_log_id', 1, true);


--
-- TOC entry 3802 (class 0 OID 0)
-- Dependencies: 321
-- Name: seq_unidad_policial_aud_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.seq_unidad_policial_aud_id', 1, false);


--
-- TOC entry 3803 (class 0 OID 0)
-- Dependencies: 298
-- Name: seq_unidad_policial_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.seq_unidad_policial_id', 1, false);


--
-- TOC entry 3804 (class 0 OID 0)
-- Dependencies: 322
-- Name: seq_usuarios_aud_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.seq_usuarios_aud_id', 1, false);


--
-- TOC entry 3805 (class 0 OID 0)
-- Dependencies: 299
-- Name: seq_usuarios_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.seq_usuarios_id', 1, true);


--
-- TOC entry 3806 (class 0 OID 0)
-- Dependencies: 323
-- Name: seq_usuarios_rol_aud_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.seq_usuarios_rol_aud_id', 1, false);


--
-- TOC entry 3807 (class 0 OID 0)
-- Dependencies: 300
-- Name: seq_usuarios_rol_id; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.seq_usuarios_rol_id', 1, true);

*/
--
-- TOC entry 3380 (class 2606 OID 101909)
-- Name: actividades_aud pk_actividades_aud_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.actividades_aud
    ADD CONSTRAINT pk_actividades_aud_id PRIMARY KEY (id);


--
-- TOC entry 3378 (class 2606 OID 101863)
-- Name: actividades pk_actividades_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.actividades
    ADD CONSTRAINT pk_actividades_id PRIMARY KEY (id);


--
-- TOC entry 3384 (class 2606 OID 101911)
-- Name: control_aud pk_control_aud_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.control_aud
    ADD CONSTRAINT pk_control_aud_id PRIMARY KEY (id);


--
-- TOC entry 3382 (class 2606 OID 101865)
-- Name: control pk_control_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.control
    ADD CONSTRAINT pk_control_id PRIMARY KEY (id);


--
-- TOC entry 3390 (class 2606 OID 101913)
-- Name: denuncia_personas_aud pk_denuncia_personas_aud_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.denuncia_personas_aud
    ADD CONSTRAINT pk_denuncia_personas_aud_id PRIMARY KEY (id);


--
-- TOC entry 3386 (class 2606 OID 101867)
-- Name: denuncia_personas pk_denuncia_personas_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.denuncia_personas
    ADD CONSTRAINT pk_denuncia_personas_id PRIMARY KEY (id);


--
-- TOC entry 3394 (class 2606 OID 101915)
-- Name: derivacion_aud pk_derivacion_aud_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.derivacion_aud
    ADD CONSTRAINT pk_derivacion_aud_id PRIMARY KEY (id);


--
-- TOC entry 3392 (class 2606 OID 101869)
-- Name: derivacion pk_derivacion_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.derivacion
    ADD CONSTRAINT pk_derivacion_id PRIMARY KEY (id);


--
-- TOC entry 3398 (class 2606 OID 101917)
-- Name: documentos_path_aud pk_documentos_path_aud_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documentos_path_aud
    ADD CONSTRAINT pk_documentos_path_aud_id PRIMARY KEY (id);


--
-- TOC entry 3396 (class 2606 OID 101871)
-- Name: documentos_path pk_documentos_path_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documentos_path
    ADD CONSTRAINT pk_documentos_path_id PRIMARY KEY (id);


--
-- TOC entry 3400 (class 2606 OID 101873)
-- Name: event_log_operaciones pk_event_log_operaciones_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_log_operaciones
    ADD CONSTRAINT pk_event_log_operaciones_id PRIMARY KEY (id);


--
-- TOC entry 3406 (class 2606 OID 101919)
-- Name: genero_sexo_aud pk_genero_sexo_aud_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genero_sexo_aud
    ADD CONSTRAINT pk_genero_sexo_aud_id PRIMARY KEY (id);


--
-- TOC entry 3402 (class 2606 OID 101875)
-- Name: genero_sexo pk_genero_sexo_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genero_sexo
    ADD CONSTRAINT pk_genero_sexo_id PRIMARY KEY (id);


--
-- TOC entry 3412 (class 2606 OID 101921)
-- Name: grados_aud pk_grados_aud_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grados_aud
    ADD CONSTRAINT pk_grados_aud_id PRIMARY KEY (id);


--
-- TOC entry 3408 (class 2606 OID 101877)
-- Name: grados pk_grados_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grados
    ADD CONSTRAINT pk_grados_id PRIMARY KEY (id);


--
-- TOC entry 3418 (class 2606 OID 101923)
-- Name: menus_aud pk_menus_aud_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menus_aud
    ADD CONSTRAINT pk_menus_aud_id PRIMARY KEY (id);


--
-- TOC entry 3414 (class 2606 OID 101879)
-- Name: menus pk_menus_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menus
    ADD CONSTRAINT pk_menus_id PRIMARY KEY (id);


--
-- TOC entry 3424 (class 2606 OID 101925)
-- Name: modulos_aud pk_modulos_aud_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modulos_aud
    ADD CONSTRAINT pk_modulos_aud_id PRIMARY KEY (id);


--
-- TOC entry 3420 (class 2606 OID 101881)
-- Name: modulos pk_modulos_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modulos
    ADD CONSTRAINT pk_modulos_id PRIMARY KEY (id);


--
-- TOC entry 3430 (class 2606 OID 101927)
-- Name: nivel_geografico_aud pk_nivel_geografico_aud_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nivel_geografico_aud
    ADD CONSTRAINT pk_nivel_geografico_aud_id PRIMARY KEY (id);


--
-- TOC entry 3426 (class 2606 OID 101883)
-- Name: nivel_geografico pk_nivel_geografico_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nivel_geografico
    ADD CONSTRAINT pk_nivel_geografico_id PRIMARY KEY (id);


--
-- TOC entry 3434 (class 2606 OID 101929)
-- Name: notificaciones_aud pk_notificaciones_aud_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notificaciones_aud
    ADD CONSTRAINT pk_notificaciones_aud_id PRIMARY KEY (id);


--
-- TOC entry 3432 (class 2606 OID 101885)
-- Name: notificaciones pk_notificaciones_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notificaciones
    ADD CONSTRAINT pk_notificaciones_id PRIMARY KEY (id);


--
-- TOC entry 3440 (class 2606 OID 101931)
-- Name: operaciones_aud pk_operaciones_aud_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.operaciones_aud
    ADD CONSTRAINT pk_operaciones_aud_id PRIMARY KEY (id);


--
-- TOC entry 3436 (class 2606 OID 101887)
-- Name: operaciones pk_operaciones_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.operaciones
    ADD CONSTRAINT pk_operaciones_id PRIMARY KEY (id);


--
-- TOC entry 3488 (class 2606 OID 101949)
-- Name: parametros_aud pk_parametros_aud_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parametros_aud
    ADD CONSTRAINT pk_parametros_aud_id PRIMARY KEY (id);


--
-- TOC entry 3484 (class 2606 OID 101907)
-- Name: parametros pk_parametros_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parametros
    ADD CONSTRAINT pk_parametros_id PRIMARY KEY (id);


--
-- TOC entry 3446 (class 2606 OID 101933)
-- Name: personas_aud pk_personas_aud_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personas_aud
    ADD CONSTRAINT pk_personas_aud_id PRIMARY KEY (id);


--
-- TOC entry 3442 (class 2606 OID 101889)
-- Name: personas pk_personas_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personas
    ADD CONSTRAINT pk_personas_id PRIMARY KEY (id);


--
-- TOC entry 3482 (class 2606 OID 101947)
-- Name: puestos_aud pk_puestos_aud_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.puestos_aud
    ADD CONSTRAINT pk_puestos_aud_id PRIMARY KEY (id);


--
-- TOC entry 3478 (class 2606 OID 101905)
-- Name: puestos pk_puestos_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.puestos
    ADD CONSTRAINT pk_puestos_id PRIMARY KEY (id);


--
-- TOC entry 3450 (class 2606 OID 101935)
-- Name: rol_menus_operaciones_aud pk_rol_menus_operaciones_aud_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol_menus_operaciones_aud
    ADD CONSTRAINT pk_rol_menus_operaciones_aud_id PRIMARY KEY (id);


--
-- TOC entry 3448 (class 2606 OID 101891)
-- Name: rol_menus_operaciones pk_rol_menus_operaciones_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol_menus_operaciones
    ADD CONSTRAINT pk_rol_menus_operaciones_id PRIMARY KEY (id);


--
-- TOC entry 3456 (class 2606 OID 101937)
-- Name: roles_aud pk_roles_aud_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles_aud
    ADD CONSTRAINT pk_roles_aud_id PRIMARY KEY (id);


--
-- TOC entry 3452 (class 2606 OID 101893)
-- Name: roles pk_roles_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT pk_roles_id PRIMARY KEY (id);


--
-- TOC entry 3460 (class 2606 OID 101939)
-- Name: seguimiento_aud pk_seguimiento_aud_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.seguimiento_aud
    ADD CONSTRAINT pk_seguimiento_aud_id PRIMARY KEY (id);


--
-- TOC entry 3458 (class 2606 OID 101895)
-- Name: seguimiento pk_seguimiento_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.seguimiento
    ADD CONSTRAINT pk_seguimiento_id PRIMARY KEY (id);


--
-- TOC entry 3462 (class 2606 OID 101897)
-- Name: sesion_log pk_sesion_log_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sesion_log
    ADD CONSTRAINT pk_sesion_log_id PRIMARY KEY (id);


--
-- TOC entry 3466 (class 2606 OID 101941)
-- Name: unidad_policial_aud pk_unidad_policial_aud_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.unidad_policial_aud
    ADD CONSTRAINT pk_unidad_policial_aud_id PRIMARY KEY (id);


--
-- TOC entry 3464 (class 2606 OID 101899)
-- Name: unidad_policial pk_unidad_policial_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.unidad_policial
    ADD CONSTRAINT pk_unidad_policial_id PRIMARY KEY (id);


--
-- TOC entry 3472 (class 2606 OID 101943)
-- Name: usuarios_aud pk_usuarios_aud_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios_aud
    ADD CONSTRAINT pk_usuarios_aud_id PRIMARY KEY (id);


--
-- TOC entry 3468 (class 2606 OID 101901)
-- Name: usuarios pk_usuarios_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT pk_usuarios_id PRIMARY KEY (id);


--
-- TOC entry 3476 (class 2606 OID 101945)
-- Name: usuarios_rol_aud pk_usuarios_rol_aud_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios_rol_aud
    ADD CONSTRAINT pk_usuarios_rol_aud_id PRIMARY KEY (id);


--
-- TOC entry 3474 (class 2606 OID 101903)
-- Name: usuarios_rol pk_usuarios_rol_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios_rol
    ADD CONSTRAINT pk_usuarios_rol_id PRIMARY KEY (id);


--
-- TOC entry 3388 (class 2606 OID 118621)
-- Name: denuncia_personas uk_denuncia_personas_cod_denuncia; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.denuncia_personas
    ADD CONSTRAINT uk_denuncia_personas_cod_denuncia UNIQUE (cod_denuncia);


--
-- TOC entry 3404 (class 2606 OID 101951)
-- Name: genero_sexo uk_genero_sexo_sigla; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genero_sexo
    ADD CONSTRAINT uk_genero_sexo_sigla UNIQUE (sigla);


--
-- TOC entry 3410 (class 2606 OID 101953)
-- Name: grados uk_grados_sigla; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grados
    ADD CONSTRAINT uk_grados_sigla UNIQUE (sigla);


--
-- TOC entry 3416 (class 2606 OID 101955)
-- Name: menus uk_menus_sigla; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menus
    ADD CONSTRAINT uk_menus_sigla UNIQUE (sigla);


--
-- TOC entry 3422 (class 2606 OID 101957)
-- Name: modulos uk_modulos_sigla; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modulos
    ADD CONSTRAINT uk_modulos_sigla UNIQUE (sigla);


--
-- TOC entry 3428 (class 2606 OID 101959)
-- Name: nivel_geografico uk_nivel_geografico_sigla; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nivel_geografico
    ADD CONSTRAINT uk_nivel_geografico_sigla UNIQUE (sigla);


--
-- TOC entry 3438 (class 2606 OID 101961)
-- Name: operaciones uk_operaciones_sigla; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.operaciones
    ADD CONSTRAINT uk_operaciones_sigla UNIQUE (sigla);


--
-- TOC entry 3486 (class 2606 OID 101971)
-- Name: parametros uk_parametros_sigla; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parametros
    ADD CONSTRAINT uk_parametros_sigla UNIQUE (sigla);


--
-- TOC entry 3444 (class 2606 OID 101963)
-- Name: personas uk_personas_sigla; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personas
    ADD CONSTRAINT uk_personas_sigla UNIQUE (ci_y_complemento);


--
-- TOC entry 3480 (class 2606 OID 101969)
-- Name: puestos uk_puestos_sigla; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.puestos
    ADD CONSTRAINT uk_puestos_sigla UNIQUE (sigla);


--
-- TOC entry 3454 (class 2606 OID 101965)
-- Name: roles uk_roles_sigla; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT uk_roles_sigla UNIQUE (sigla);


--
-- TOC entry 3470 (class 2606 OID 101967)
-- Name: usuarios uk_usuarios_sigla; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT uk_usuarios_sigla UNIQUE (user_login);


--
-- TOC entry 3493 (class 2606 OID 101972)
-- Name: actividades_aud fk_actividades_aud_actividades_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.actividades_aud
    ADD CONSTRAINT fk_actividades_aud_actividades_id FOREIGN KEY (actividades_id) REFERENCES public.actividades(id) MATCH FULL ON DELETE RESTRICT;


--
-- TOC entry 3490 (class 2606 OID 102082)
-- Name: actividades fk_actividades_control_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.actividades
    ADD CONSTRAINT fk_actividades_control_id FOREIGN KEY (control_id) REFERENCES public.control(id) MATCH FULL ON DELETE RESTRICT;


--
-- TOC entry 3489 (class 2606 OID 102077)
-- Name: actividades fk_actividades_denuncia_personas_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.actividades
    ADD CONSTRAINT fk_actividades_denuncia_personas_id FOREIGN KEY (denuncia_personas_id) REFERENCES public.denuncia_personas(id) MATCH FULL ON DELETE RESTRICT;


--
-- TOC entry 3491 (class 2606 OID 102087)
-- Name: actividades fk_actividades_seguimiento_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.actividades
    ADD CONSTRAINT fk_actividades_seguimiento_id FOREIGN KEY (seguimiento_id) REFERENCES public.seguimiento(id) MATCH FULL ON DELETE RESTRICT;


--
-- TOC entry 3492 (class 2606 OID 102092)
-- Name: actividades fk_actividades_usuarios_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.actividades
    ADD CONSTRAINT fk_actividades_usuarios_id FOREIGN KEY (usuarios_id) REFERENCES public.usuarios(id) MATCH FULL ON DELETE RESTRICT;


--
-- TOC entry 3496 (class 2606 OID 101977)
-- Name: control_aud fk_control_aud_control_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.control_aud
    ADD CONSTRAINT fk_control_aud_control_id FOREIGN KEY (control_id) REFERENCES public.control(id) MATCH FULL ON DELETE RESTRICT;


--
-- TOC entry 3494 (class 2606 OID 102097)
-- Name: control fk_control_denuncia_personas_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.control
    ADD CONSTRAINT fk_control_denuncia_personas_id FOREIGN KEY (denuncia_personas_id) REFERENCES public.denuncia_personas(id) MATCH FULL ON DELETE RESTRICT;


--
-- TOC entry 3495 (class 2606 OID 102102)
-- Name: control fk_control_usuarios_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.control
    ADD CONSTRAINT fk_control_usuarios_id FOREIGN KEY (usuario_revisor_id) REFERENCES public.usuarios(id) MATCH FULL ON DELETE RESTRICT;


--
-- TOC entry 3499 (class 2606 OID 101982)
-- Name: denuncia_personas_aud fk_denuncia_personas_aud_denuncia_personas_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.denuncia_personas_aud
    ADD CONSTRAINT fk_denuncia_personas_aud_denuncia_personas_id FOREIGN KEY (denuncia_personas_id) REFERENCES public.denuncia_personas(id) MATCH FULL ON DELETE RESTRICT;


--
-- TOC entry 3498 (class 2606 OID 102127)
-- Name: denuncia_personas fk_denuncia_personas_nivel_geografico_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.denuncia_personas
    ADD CONSTRAINT fk_denuncia_personas_nivel_geografico_id FOREIGN KEY (nivel_geografico_id) REFERENCES public.nivel_geografico(id) MATCH FULL ON DELETE RESTRICT;


--
-- TOC entry 3497 (class 2606 OID 110468)
-- Name: denuncia_personas fk_denuncia_personas_nivel_geografico_sigla; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.denuncia_personas
    ADD CONSTRAINT fk_denuncia_personas_nivel_geografico_sigla FOREIGN KEY (nivel_geografico_sigla) REFERENCES public.nivel_geografico(sigla) MATCH FULL ON DELETE RESTRICT;


--
-- TOC entry 3503 (class 2606 OID 101987)
-- Name: derivacion_aud fk_derivacion_aud_derivacion_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.derivacion_aud
    ADD CONSTRAINT fk_derivacion_aud_derivacion_id FOREIGN KEY (derivacion_id) REFERENCES public.derivacion(id) MATCH FULL ON DELETE RESTRICT;


--
-- TOC entry 3501 (class 2606 OID 102117)
-- Name: derivacion fk_derivacion_control_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.derivacion
    ADD CONSTRAINT fk_derivacion_control_id FOREIGN KEY (control_id) REFERENCES public.control(id) MATCH FULL ON DELETE RESTRICT;


--
-- TOC entry 3500 (class 2606 OID 102112)
-- Name: derivacion fk_derivacion_denuncia_personas_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.derivacion
    ADD CONSTRAINT fk_derivacion_denuncia_personas_id FOREIGN KEY (denuncia_personas_id) REFERENCES public.denuncia_personas(id) MATCH FULL ON DELETE RESTRICT;


--
-- TOC entry 3502 (class 2606 OID 102122)
-- Name: derivacion fk_derivacion_usuarios_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.derivacion
    ADD CONSTRAINT fk_derivacion_usuarios_id FOREIGN KEY (usuarios_id) REFERENCES public.usuarios(id) MATCH FULL ON DELETE RESTRICT;


--
-- TOC entry 3507 (class 2606 OID 101992)
-- Name: documentos_path_aud fk_documentos_path_aud_documentos_path_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documentos_path_aud
    ADD CONSTRAINT fk_documentos_path_aud_documentos_path_id FOREIGN KEY (documentos_path_id) REFERENCES public.documentos_path(id) MATCH FULL ON DELETE RESTRICT;


--
-- TOC entry 3505 (class 2606 OID 102212)
-- Name: documentos_path fk_documentos_path_denuncia_personas_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documentos_path
    ADD CONSTRAINT fk_documentos_path_denuncia_personas_id FOREIGN KEY (denuncia_personas_id) REFERENCES public.denuncia_personas(id) MATCH FULL ON DELETE RESTRICT;


--
-- TOC entry 3504 (class 2606 OID 126831)
-- Name: documentos_path fk_documentos_path_seguimiento_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documentos_path
    ADD CONSTRAINT fk_documentos_path_seguimiento_id FOREIGN KEY (seguimiento_id) REFERENCES public.seguimiento(id) MATCH FULL ON DELETE RESTRICT;


--
-- TOC entry 3506 (class 2606 OID 102217)
-- Name: documentos_path fk_documentos_path_usuarios_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documentos_path
    ADD CONSTRAINT fk_documentos_path_usuarios_id FOREIGN KEY (usuarios_id) REFERENCES public.usuarios(id) MATCH FULL ON DELETE RESTRICT;


--
-- TOC entry 3508 (class 2606 OID 101997)
-- Name: genero_sexo_aud fk_genero_sexo_aud_genero_sexo_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genero_sexo_aud
    ADD CONSTRAINT fk_genero_sexo_aud_genero_sexo_id FOREIGN KEY (genero_sexo_id) REFERENCES public.genero_sexo(id) MATCH FULL ON DELETE RESTRICT;


--
-- TOC entry 3509 (class 2606 OID 102002)
-- Name: grados_aud fk_grados_aud_grados_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grados_aud
    ADD CONSTRAINT fk_grados_aud_grados_id FOREIGN KEY (grados_id) REFERENCES public.grados(id) MATCH FULL ON DELETE RESTRICT;


--
-- TOC entry 3511 (class 2606 OID 102007)
-- Name: menus_aud fk_menus_aud_menus_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menus_aud
    ADD CONSTRAINT fk_menus_aud_menus_id FOREIGN KEY (menus_id) REFERENCES public.menus(id) MATCH FULL ON DELETE RESTRICT;


--
-- TOC entry 3510 (class 2606 OID 102192)
-- Name: menus fk_menus_modulos_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menus
    ADD CONSTRAINT fk_menus_modulos_id FOREIGN KEY (modulos_sigla) REFERENCES public.modulos(sigla) MATCH FULL ON DELETE RESTRICT;


--
-- TOC entry 3512 (class 2606 OID 102012)
-- Name: modulos_aud fk_modulos_aud_modulos_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modulos_aud
    ADD CONSTRAINT fk_modulos_aud_modulos_id FOREIGN KEY (modulos_id) REFERENCES public.modulos(id) MATCH FULL ON DELETE RESTRICT;


--
-- TOC entry 3513 (class 2606 OID 102017)
-- Name: nivel_geografico_aud fk_nivel_geografico_aud_nivel_geografico_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nivel_geografico_aud
    ADD CONSTRAINT fk_nivel_geografico_aud_nivel_geografico_id FOREIGN KEY (nivel_geografico_id) REFERENCES public.nivel_geografico(id) MATCH FULL ON DELETE RESTRICT;


--
-- TOC entry 3515 (class 2606 OID 102022)
-- Name: notificaciones_aud fk_notificaciones_aud_notificaciones_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notificaciones_aud
    ADD CONSTRAINT fk_notificaciones_aud_notificaciones_id FOREIGN KEY (notificaciones_id) REFERENCES public.notificaciones(id) MATCH FULL ON DELETE RESTRICT;


--
-- TOC entry 3514 (class 2606 OID 102187)
-- Name: notificaciones fk_notificaciones_usuarios_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notificaciones
    ADD CONSTRAINT fk_notificaciones_usuarios_id FOREIGN KEY (user_login_sigla) REFERENCES public.usuarios(user_login) MATCH FULL ON DELETE RESTRICT;


--
-- TOC entry 3516 (class 2606 OID 102027)
-- Name: operaciones_aud fk_operaciones_aud_operaciones_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.operaciones_aud
    ADD CONSTRAINT fk_operaciones_aud_operaciones_id FOREIGN KEY (operaciones_id) REFERENCES public.operaciones(id) MATCH FULL ON DELETE RESTRICT;


--
-- TOC entry 3540 (class 2606 OID 102072)
-- Name: parametros_aud fk_parametros_aud_parametros_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parametros_aud
    ADD CONSTRAINT fk_parametros_aud_parametros_id FOREIGN KEY (parametros_id) REFERENCES public.parametros(id) MATCH FULL ON DELETE RESTRICT;


--
-- TOC entry 3520 (class 2606 OID 102032)
-- Name: personas_aud fk_personas_aud_personas_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personas_aud
    ADD CONSTRAINT fk_personas_aud_personas_id FOREIGN KEY (personas_id) REFERENCES public.personas(id) MATCH FULL ON DELETE RESTRICT;


--
-- TOC entry 3517 (class 2606 OID 102197)
-- Name: personas fk_personas_denuncia_personas_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personas
    ADD CONSTRAINT fk_personas_denuncia_personas_id FOREIGN KEY (denuncia_personas_id) REFERENCES public.denuncia_personas(id) MATCH FULL ON DELETE RESTRICT;


--
-- TOC entry 3519 (class 2606 OID 102207)
-- Name: personas fk_personas_genero_sexo_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personas
    ADD CONSTRAINT fk_personas_genero_sexo_id FOREIGN KEY (genero_sexo_sigla) REFERENCES public.genero_sexo(sigla) MATCH FULL ON DELETE RESTRICT;


--
-- TOC entry 3518 (class 2606 OID 102202)
-- Name: personas fk_personas_grados_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personas
    ADD CONSTRAINT fk_personas_grados_id FOREIGN KEY (grados_sigla) REFERENCES public.grados(sigla) MATCH FULL ON DELETE RESTRICT;


--
-- TOC entry 3539 (class 2606 OID 102067)
-- Name: puestos_aud fk_puestos_aud_puestos_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.puestos_aud
    ADD CONSTRAINT fk_puestos_aud_puestos_id FOREIGN KEY (puestos_id) REFERENCES public.puestos(id) MATCH FULL ON DELETE RESTRICT;


--
-- TOC entry 3524 (class 2606 OID 102037)
-- Name: rol_menus_operaciones_aud fk_rol_menus_operaciones_aud_rol_menus_operaciones_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol_menus_operaciones_aud
    ADD CONSTRAINT fk_rol_menus_operaciones_aud_rol_menus_operaciones_id FOREIGN KEY (rol_menus_operaciones_id) REFERENCES public.rol_menus_operaciones(id) MATCH FULL ON DELETE RESTRICT;


--
-- TOC entry 3522 (class 2606 OID 102137)
-- Name: rol_menus_operaciones fk_rol_menus_operaciones_menus_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol_menus_operaciones
    ADD CONSTRAINT fk_rol_menus_operaciones_menus_id FOREIGN KEY (menus_sigla) REFERENCES public.menus(sigla) MATCH FULL ON DELETE RESTRICT;


--
-- TOC entry 3523 (class 2606 OID 102142)
-- Name: rol_menus_operaciones fk_rol_menus_operaciones_operaciones_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol_menus_operaciones
    ADD CONSTRAINT fk_rol_menus_operaciones_operaciones_id FOREIGN KEY (operaciones_sigla) REFERENCES public.operaciones(sigla) MATCH FULL ON DELETE RESTRICT;


--
-- TOC entry 3521 (class 2606 OID 102132)
-- Name: rol_menus_operaciones fk_rol_menus_operaciones_roles_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol_menus_operaciones
    ADD CONSTRAINT fk_rol_menus_operaciones_roles_id FOREIGN KEY (roles_sigla) REFERENCES public.roles(sigla) MATCH FULL ON DELETE RESTRICT;


--
-- TOC entry 3526 (class 2606 OID 102042)
-- Name: roles_aud fk_roles_aud_roles_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles_aud
    ADD CONSTRAINT fk_roles_aud_roles_id FOREIGN KEY (roles_id) REFERENCES public.roles(id) MATCH FULL ON DELETE RESTRICT;


--
-- TOC entry 3525 (class 2606 OID 135027)
-- Name: roles fk_roles_nivel_geografico_sigla; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT fk_roles_nivel_geografico_sigla FOREIGN KEY (nivel_geografico_sigla) REFERENCES public.nivel_geografico(sigla) MATCH FULL ON DELETE RESTRICT;


--
-- TOC entry 3527 (class 2606 OID 126836)
-- Name: seguimiento fk_seguimiento_actividades_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.seguimiento
    ADD CONSTRAINT fk_seguimiento_actividades_id FOREIGN KEY (actividades_id) REFERENCES public.actividades(id) MATCH FULL ON DELETE RESTRICT;


--
-- TOC entry 3530 (class 2606 OID 102047)
-- Name: seguimiento_aud fk_seguimiento_aud_seguimiento_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.seguimiento_aud
    ADD CONSTRAINT fk_seguimiento_aud_seguimiento_id FOREIGN KEY (seguimiento_id) REFERENCES public.seguimiento(id) MATCH FULL ON DELETE RESTRICT;


--
-- TOC entry 3528 (class 2606 OID 102147)
-- Name: seguimiento fk_seguimiento_denuncia_personas_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.seguimiento
    ADD CONSTRAINT fk_seguimiento_denuncia_personas_id FOREIGN KEY (denuncia_personas_id) REFERENCES public.denuncia_personas(id) MATCH FULL ON DELETE RESTRICT;


--
-- TOC entry 3529 (class 2606 OID 102157)
-- Name: seguimiento fk_seguimiento_usuarios_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.seguimiento
    ADD CONSTRAINT fk_seguimiento_usuarios_id FOREIGN KEY (usuarios_id) REFERENCES public.usuarios(id) MATCH FULL ON DELETE RESTRICT;


--
-- TOC entry 3532 (class 2606 OID 102052)
-- Name: unidad_policial_aud fk_unidad_policial_aud_unidad_policial_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.unidad_policial_aud
    ADD CONSTRAINT fk_unidad_policial_aud_unidad_policial_id FOREIGN KEY (unidad_policial_id) REFERENCES public.unidad_policial(id) MATCH FULL ON DELETE RESTRICT;


--
-- TOC entry 3531 (class 2606 OID 102172)
-- Name: unidad_policial fk_unidad_policial_nivel_geografico_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.unidad_policial
    ADD CONSTRAINT fk_unidad_policial_nivel_geografico_id FOREIGN KEY (nivel_geografico_id) REFERENCES public.nivel_geografico(id) MATCH FULL ON DELETE RESTRICT;


--
-- TOC entry 3535 (class 2606 OID 102057)
-- Name: usuarios_aud fk_usuarios_aud_usuarios_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios_aud
    ADD CONSTRAINT fk_usuarios_aud_usuarios_id FOREIGN KEY (usuarios_id) REFERENCES public.usuarios(id) MATCH FULL ON DELETE RESTRICT;


--
-- TOC entry 3534 (class 2606 OID 102182)
-- Name: usuarios fk_usuarios_grados_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT fk_usuarios_grados_id FOREIGN KEY (grados_sigla) REFERENCES public.grados(sigla) MATCH FULL ON DELETE RESTRICT;


--
-- TOC entry 3533 (class 2606 OID 103816)
-- Name: usuarios fk_usuarios_nivel_geografico_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT fk_usuarios_nivel_geografico_id FOREIGN KEY (nivel_geografico_id) REFERENCES public.nivel_geografico(id) MATCH FULL ON DELETE RESTRICT;


--
-- TOC entry 3538 (class 2606 OID 102062)
-- Name: usuarios_rol_aud fk_usuarios_rol_aud_usuarios_rol_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios_rol_aud
    ADD CONSTRAINT fk_usuarios_rol_aud_usuarios_rol_id FOREIGN KEY (usuarios_rol_id) REFERENCES public.usuarios_rol(id) MATCH FULL ON DELETE RESTRICT;


--
-- TOC entry 3537 (class 2606 OID 102167)
-- Name: usuarios_rol fk_usuarios_rol_roles_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios_rol
    ADD CONSTRAINT fk_usuarios_rol_roles_id FOREIGN KEY (roles_sigla) REFERENCES public.roles(sigla) MATCH FULL ON DELETE RESTRICT;


--
-- TOC entry 3536 (class 2606 OID 102162)
-- Name: usuarios_rol fk_usuarios_rol_usuarios_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios_rol
    ADD CONSTRAINT fk_usuarios_rol_usuarios_id FOREIGN KEY (usuarios_id) REFERENCES public.usuarios(id) MATCH FULL ON DELETE RESTRICT;


-- Completed on 2025-02-17 21:47:11

--
-- PostgreSQL database dump complete
--

