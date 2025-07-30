-- DROP SCHEMA public;

CREATE SCHEMA public AUTHORIZATION postgres;

DROP SEQUENCE public.seq_actividades_aud_id;

CREATE SEQUENCE public.seq_actividades_aud_id
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
DROP SEQUENCE public.seq_actividades_id;

CREATE SEQUENCE public.seq_actividades_id
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
DROP SEQUENCE public.seq_control_aud_id;

CREATE SEQUENCE public.seq_control_aud_id
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
DROP SEQUENCE public.seq_control_id;

CREATE SEQUENCE public.seq_control_id
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
DROP SEQUENCE public.seq_denuncia_personas_aud_id;

CREATE SEQUENCE public.seq_denuncia_personas_aud_id
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
DROP SEQUENCE public.seq_denuncia_personas_id;

CREATE SEQUENCE public.seq_denuncia_personas_id
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
DROP SEQUENCE public.seq_derivacion_aud_id;

CREATE SEQUENCE public.seq_derivacion_aud_id
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
DROP SEQUENCE public.seq_derivacion_id;

CREATE SEQUENCE public.seq_derivacion_id
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
DROP SEQUENCE public.seq_documentos_path_aud_id;

CREATE SEQUENCE public.seq_documentos_path_aud_id
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
DROP SEQUENCE public.seq_documentos_path_id;

CREATE SEQUENCE public.seq_documentos_path_id
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
DROP SEQUENCE public.seq_event_log_operaciones_aud_id;

CREATE SEQUENCE public.seq_event_log_operaciones_aud_id
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
DROP SEQUENCE public.seq_event_log_operaciones_id;

CREATE SEQUENCE public.seq_event_log_operaciones_id
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
DROP SEQUENCE public.seq_genero_sexo_aud_id;

CREATE SEQUENCE public.seq_genero_sexo_aud_id
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
DROP SEQUENCE public.seq_genero_sexo_id;

CREATE SEQUENCE public.seq_genero_sexo_id
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
DROP SEQUENCE public.seq_grados_aud_id;

CREATE SEQUENCE public.seq_grados_aud_id
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
DROP SEQUENCE public.seq_grados_id;

CREATE SEQUENCE public.seq_grados_id
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
DROP SEQUENCE public.seq_menus_aud_id;

CREATE SEQUENCE public.seq_menus_aud_id
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
DROP SEQUENCE public.seq_menus_id;

CREATE SEQUENCE public.seq_menus_id
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
DROP SEQUENCE public.seq_modulos_aud_id;

CREATE SEQUENCE public.seq_modulos_aud_id
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
DROP SEQUENCE public.seq_modulos_id;

CREATE SEQUENCE public.seq_modulos_id
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
DROP SEQUENCE public.seq_nivel_geografico_aud_id;

CREATE SEQUENCE public.seq_nivel_geografico_aud_id
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
DROP SEQUENCE public.seq_nivel_geografico_id;

CREATE SEQUENCE public.seq_nivel_geografico_id
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
DROP SEQUENCE public.seq_notificaciones_aud_id;

CREATE SEQUENCE public.seq_notificaciones_aud_id
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
DROP SEQUENCE public.seq_notificaciones_id;

CREATE SEQUENCE public.seq_notificaciones_id
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
DROP SEQUENCE public.seq_operaciones_aud_id;

CREATE SEQUENCE public.seq_operaciones_aud_id
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
DROP SEQUENCE public.seq_operaciones_id;

CREATE SEQUENCE public.seq_operaciones_id
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
DROP SEQUENCE public.seq_parametros_aud_id;

CREATE SEQUENCE public.seq_parametros_aud_id
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
DROP SEQUENCE public.seq_parametros_id;

CREATE SEQUENCE public.seq_parametros_id
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
DROP SEQUENCE public.seq_personas_aud_id;

CREATE SEQUENCE public.seq_personas_aud_id
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
DROP SEQUENCE public.seq_personas_id;

CREATE SEQUENCE public.seq_personas_id
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
DROP SEQUENCE public.seq_puestos_aud_id;

CREATE SEQUENCE public.seq_puestos_aud_id
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
DROP SEQUENCE public.seq_puestos_id;

CREATE SEQUENCE public.seq_puestos_id
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
DROP SEQUENCE public.seq_rol_menus_operaciones_aud_id;

CREATE SEQUENCE public.seq_rol_menus_operaciones_aud_id
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
DROP SEQUENCE public.seq_rol_menus_operaciones_id;

CREATE SEQUENCE public.seq_rol_menus_operaciones_id
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
DROP SEQUENCE public.seq_roles_aud_id;

CREATE SEQUENCE public.seq_roles_aud_id
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
DROP SEQUENCE public.seq_roles_id;

CREATE SEQUENCE public.seq_roles_id
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
DROP SEQUENCE public.seq_seguimiento_aud_id;

CREATE SEQUENCE public.seq_seguimiento_aud_id
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
DROP SEQUENCE public.seq_seguimiento_id;

CREATE SEQUENCE public.seq_seguimiento_id
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
DROP SEQUENCE public.seq_sesion_log_aud_id;

CREATE SEQUENCE public.seq_sesion_log_aud_id
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
DROP SEQUENCE public.seq_sesion_log_id;

CREATE SEQUENCE public.seq_sesion_log_id
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
DROP SEQUENCE public.seq_unidad_policial_aud_id;

CREATE SEQUENCE public.seq_unidad_policial_aud_id
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
DROP SEQUENCE public.seq_unidad_policial_id;

CREATE SEQUENCE public.seq_unidad_policial_id
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
DROP SEQUENCE public.seq_usuarios_aud_id;

CREATE SEQUENCE public.seq_usuarios_aud_id
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
DROP SEQUENCE public.seq_usuarios_id;

CREATE SEQUENCE public.seq_usuarios_id
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
DROP SEQUENCE public.seq_usuarios_rol_aud_id;

CREATE SEQUENCE public.seq_usuarios_rol_aud_id
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
DROP SEQUENCE public.seq_usuarios_rol_id;

CREATE SEQUENCE public.seq_usuarios_rol_id
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;-- public.event_log_operaciones definition

-- Drop table

-- DROP TABLE public.event_log_operaciones;

CREATE TABLE public.event_log_operaciones (
	id int8 NOT NULL DEFAULT nextval('public.seq_event_log_operaciones_id'::regclass),
	sesion_log_id int8 NULL,
	fec_registro timestamp NOT NULL DEFAULT now(),
	operacion_realizada varchar(5000) NULL,
	observacion varchar(5000) NULL,
	estado varchar(30) NULL DEFAULT 'ELABORADO'::character varying,
	transaccion varchar(30) NULL DEFAULT 'CREAR'::character varying,
	usu_cre varchar(30) NULL DEFAULT "current_user"(),
	fec_cre timestamp NOT NULL DEFAULT now(),
	usu_mod varchar(30) NULL,
	fec_mod timestamp NULL,
	host_creacion varchar(30) NOT NULL DEFAULT inet_client_addr(),
	host_modificacion varchar(30) NULL,
	CONSTRAINT pk_event_log_operaciones_id PRIMARY KEY (id)
);


-- public.genero_sexo definition

-- Drop table

-- DROP TABLE public.genero_sexo;

CREATE TABLE public.genero_sexo (
	id int8 NOT NULL DEFAULT nextval('public.seq_genero_sexo_id'::regclass),
	sigla varchar(10) NULL,
	descripcion varchar(255) NOT NULL,
	estado varchar(30) NULL DEFAULT 'ELABORADO'::character varying,
	transaccion varchar(30) NULL DEFAULT 'CREAR'::character varying,
	usu_cre varchar(30) NULL DEFAULT "current_user"(),
	fec_cre timestamp NOT NULL DEFAULT now(),
	usu_mod varchar(30) NULL,
	fec_mod timestamp NULL,
	host_creacion varchar(30) NOT NULL DEFAULT inet_client_addr(),
	host_modificacion varchar(30) NULL,
	CONSTRAINT pk_genero_sexo_id PRIMARY KEY (id),
	CONSTRAINT uk_genero_sexo_sigla UNIQUE (sigla)
);


-- public.grados definition

-- Drop table

-- DROP TABLE public.grados;

CREATE TABLE public.grados (
	id int8 NOT NULL DEFAULT nextval('public.seq_grados_id'::regclass),
	sigla varchar(10) NOT NULL,
	grado varchar(30) NOT NULL,
	descripcion varchar(255) NOT NULL,
	estado varchar(30) NULL DEFAULT 'ELABORADO'::character varying,
	transaccion varchar(30) NULL DEFAULT 'CREAR'::character varying,
	usu_cre varchar(30) NULL DEFAULT "current_user"(),
	fec_cre timestamp NOT NULL DEFAULT now(),
	usu_mod varchar(30) NULL,
	fec_mod timestamp NULL,
	host_creacion varchar(30) NOT NULL DEFAULT inet_client_addr(),
	host_modificacion varchar(30) NULL,
	CONSTRAINT pk_grados_id PRIMARY KEY (id),
	CONSTRAINT uk_grados_sigla UNIQUE (sigla)
);


-- public.modulos definition

-- Drop table

-- DROP TABLE public.modulos;

CREATE TABLE public.modulos (
	id int8 NOT NULL DEFAULT nextval('public.seq_modulos_id'::regclass),
	sigla varchar(10) NOT NULL,
	modulo varchar(30) NOT NULL,
	descripcion varchar(255) NOT NULL,
	estado varchar(30) NULL DEFAULT 'ELABORADO'::character varying,
	transaccion varchar(30) NULL DEFAULT 'CREAR'::character varying,
	usu_cre varchar(30) NULL DEFAULT "current_user"(),
	fec_cre timestamp NOT NULL DEFAULT now(),
	usu_mod varchar(30) NULL,
	fec_mod timestamp NULL,
	host_creacion varchar(30) NOT NULL DEFAULT inet_client_addr(),
	host_modificacion varchar(30) NULL,
	CONSTRAINT pk_modulos_id PRIMARY KEY (id),
	CONSTRAINT uk_modulos_sigla UNIQUE (sigla)
);


-- public.nivel_geografico definition

-- Drop table

-- DROP TABLE public.nivel_geografico;

CREATE TABLE public.nivel_geografico (
	id int8 NOT NULL DEFAULT nextval('public.seq_nivel_geografico_id'::regclass),
	sigla varchar(10) NULL,
	sigla_padre varchar(10) NULL,
	nivel_geografico varchar(10) NULL,
	descripcion varchar(255) NOT NULL,
	estado varchar(30) NULL DEFAULT 'ELABORADO'::character varying,
	transaccion varchar(30) NULL DEFAULT 'CREAR'::character varying,
	usu_cre varchar(30) NULL DEFAULT "current_user"(),
	fec_cre timestamp NOT NULL DEFAULT now(),
	usu_mod varchar(30) NULL,
	fec_mod timestamp NULL,
	host_creacion varchar(30) NOT NULL DEFAULT inet_client_addr(),
	host_modificacion varchar(30) NULL,
	CONSTRAINT pk_nivel_geografico_id PRIMARY KEY (id),
	CONSTRAINT uk_nivel_geografico_sigla UNIQUE (sigla)
);


-- public.operaciones definition

-- Drop table

-- DROP TABLE public.operaciones;

CREATE TABLE public.operaciones (
	id int8 NOT NULL DEFAULT nextval('public.seq_operaciones_id'::regclass),
	sigla varchar(10) NOT NULL,
	operacion varchar(30) NOT NULL,
	descripcion varchar(255) NOT NULL,
	estado varchar(30) NULL DEFAULT 'ELABORADO'::character varying,
	transaccion varchar(30) NULL DEFAULT 'CREAR'::character varying,
	usu_cre varchar(30) NULL DEFAULT "current_user"(),
	fec_cre timestamp NOT NULL DEFAULT now(),
	usu_mod varchar(30) NULL,
	fec_mod timestamp NULL,
	host_creacion varchar(30) NOT NULL DEFAULT inet_client_addr(),
	host_modificacion varchar(30) NULL,
	CONSTRAINT pk_operaciones_id PRIMARY KEY (id),
	CONSTRAINT uk_operaciones_sigla UNIQUE (sigla)
);


-- public.parametros definition

-- Drop table

-- DROP TABLE public.parametros;

CREATE TABLE public.parametros (
	id int8 NOT NULL DEFAULT nextval('public.seq_parametros_id'::regclass),
	modulos_sigla varchar(30) NULL,
	sigla varchar(30) NOT NULL,
	descripcion varchar(100) NULL,
	orden int8 NOT NULL,
	param_numerico_ini varchar(30) NULL,
	param_numerico_fin varchar(30) NULL,
	param_caracter_ini varchar(30) NULL,
	param_fecha_ini varchar(30) NULL,
	param_fecha_fin varchar(30) NULL,
	fec_ini timestamp NOT NULL,
	fec_fin timestamp NOT NULL,
	estado varchar(30) NULL DEFAULT 'ELABORADO'::character varying,
	transaccion varchar(30) NULL DEFAULT 'CREAR'::character varying,
	usu_cre varchar(30) NULL DEFAULT "current_user"(),
	fec_cre timestamp NOT NULL DEFAULT now(),
	usu_mod varchar(30) NULL,
	fec_mod timestamp NULL,
	host_creacion varchar(30) NOT NULL DEFAULT inet_client_addr(),
	host_modificacion varchar(30) NULL,
	CONSTRAINT pk_parametros_id PRIMARY KEY (id),
	CONSTRAINT uk_parametros_sigla UNIQUE (sigla)
);


-- public.puestos definition

-- Drop table

-- DROP TABLE public.puestos;

CREATE TABLE public.puestos (
	id int8 NOT NULL DEFAULT nextval('public.seq_puestos_id'::regclass),
	sigla varchar(10) NOT NULL,
	puesto varchar(30) NOT NULL,
	descripcion varchar(255) NOT NULL,
	estado varchar(30) NULL DEFAULT 'ELABORADO'::character varying,
	transaccion varchar(30) NULL DEFAULT 'CREAR'::character varying,
	usu_cre varchar(30) NULL DEFAULT "current_user"(),
	fec_cre timestamp NOT NULL DEFAULT now(),
	usu_mod varchar(30) NULL,
	fec_mod timestamp NULL,
	host_creacion varchar(30) NOT NULL DEFAULT inet_client_addr(),
	host_modificacion varchar(30) NULL,
	CONSTRAINT pk_puestos_id PRIMARY KEY (id),
	CONSTRAINT uk_puestos_sigla UNIQUE (sigla)
);


-- public.sesion_log definition

-- Drop table

-- DROP TABLE public.sesion_log;

CREATE TABLE public.sesion_log (
	id int8 NOT NULL DEFAULT nextval('public.seq_sesion_log_id'::regclass),
	user_login_sigla varchar(30) NOT NULL,
	pin varchar(10) NOT NULL,
	pin_estado varchar(30) NOT NULL,
	pin_hora_expiracion varchar(30) NOT NULL,
	fec_sesion timestamp NOT NULL DEFAULT now(),
	nombre_device varchar(100) NULL,
	estado varchar(30) NULL DEFAULT 'ELABORADO'::character varying,
	transaccion varchar(30) NULL DEFAULT 'CREAR'::character varying,
	usu_cre varchar(30) NULL DEFAULT "current_user"(),
	fec_cre timestamp NOT NULL DEFAULT now(),
	usu_mod varchar(30) NULL,
	fec_mod timestamp NULL,
	host_creacion varchar(30) NOT NULL DEFAULT inet_client_addr(),
	host_modificacion varchar(30) NULL,
	CONSTRAINT pk_sesion_log_id PRIMARY KEY (id)
);


-- public.denuncia_personas definition

-- Drop table

-- DROP TABLE public.denuncia_personas;

CREATE TABLE public.denuncia_personas (
	id int8 NOT NULL DEFAULT nextval('public.seq_denuncia_personas_id'::regclass),
	nivel_geografico_id int8 NOT NULL,
	sigla varchar(10) NULL,
	cod_denuncia varchar(30) NOT NULL,
	denuncia_anonima bool NOT NULL,
	reserva_identidad bool NOT NULL,
	lugar_hecho varchar(255) NULL,
	fec_registro_hecho timestamp NOT NULL DEFAULT now(),
	hora_registro_hecho varchar(20) NOT NULL,
	detalle_hecho varchar(1000) NOT NULL,
	estado varchar(30) NULL DEFAULT 'SOLICITADO'::character varying,
	transaccion varchar(30) NULL DEFAULT 'CREAR'::character varying,
	usu_cre varchar(30) NULL DEFAULT "current_user"(),
	fec_cre timestamp NOT NULL DEFAULT now(),
	usu_mod varchar(30) NULL,
	fec_mod timestamp NULL,
	host_creacion varchar(30) NOT NULL DEFAULT inet_client_addr(),
	host_modificacion varchar(30) NULL,
	nivel_geografico_sigla varchar(10) NULL,
	modulos_sigla_amp_1 varchar(30) NULL,
	fec_ampliacion_1 timestamp NULL,
	modulos_sigla_amp_2 varchar(30) NULL,
	fec_ampliacion_2 timestamp NULL,
	CONSTRAINT pk_denuncia_personas_id PRIMARY KEY (id),
	CONSTRAINT uk_denuncia_personas_cod_denuncia UNIQUE (cod_denuncia),
	CONSTRAINT fk_denuncia_personas_nivel_geografico_id FOREIGN KEY (nivel_geografico_id) REFERENCES public.nivel_geografico(id) ON DELETE RESTRICT ,
	CONSTRAINT fk_denuncia_personas_nivel_geografico_sigla FOREIGN KEY (nivel_geografico_sigla) REFERENCES public.nivel_geografico(sigla) ON DELETE RESTRICT 
);


-- public.denuncia_personas_aud definition

-- Drop table

-- DROP TABLE public.denuncia_personas_aud;

CREATE TABLE public.denuncia_personas_aud (
	id int8 NOT NULL DEFAULT nextval('public.seq_denuncia_personas_aud_id'::regclass),
	denuncia_personas_id int8 NOT NULL,
	nivel_geografico_id int8 NOT NULL,
	sigla varchar(10) NULL,
	cod_denuncia varchar(30) NOT NULL,
	denuncia_anonima bool NOT NULL,
	reserva_identidad bool NOT NULL,
	lugar_hecho varchar(255) NULL,
	fec_registro_hecho timestamp NOT NULL DEFAULT now(),
	hora_registro_hecho varchar(20) NOT NULL,
	detalle_hecho varchar(1000) NOT NULL,
	estado varchar(30) NULL,
	transaccion varchar(30) NULL,
	usu_cre varchar(30) NULL,
	fec_cre timestamp NOT NULL,
	usu_mod varchar(30) NULL,
	fec_mod timestamp NULL,
	host_creacion varchar(30) NOT NULL,
	host_modificacion varchar(30) NULL,
	nivel_geografico_sigla varchar(10) NULL,
	CONSTRAINT pk_denuncia_personas_aud_id PRIMARY KEY (id),
	CONSTRAINT fk_denuncia_personas_aud_denuncia_personas_id FOREIGN KEY (denuncia_personas_id) REFERENCES public.denuncia_personas(id) ON DELETE RESTRICT 
);


-- public.genero_sexo_aud definition

-- Drop table

-- DROP TABLE public.genero_sexo_aud;

CREATE TABLE public.genero_sexo_aud (
	id int8 NOT NULL DEFAULT nextval('public.seq_genero_sexo_aud_id'::regclass),
	genero_sexo_id int8 NOT NULL,
	sigla varchar(10) NULL,
	descripcion varchar(255) NOT NULL,
	estado varchar(30) NULL,
	transaccion varchar(30) NULL,
	usu_cre varchar(30) NULL,
	fec_cre timestamp NOT NULL,
	usu_mod varchar(30) NULL,
	fec_mod timestamp NULL,
	host_creacion varchar(30) NOT NULL,
	host_modificacion varchar(30) NULL,
	CONSTRAINT pk_genero_sexo_aud_id PRIMARY KEY (id),
	CONSTRAINT fk_genero_sexo_aud_genero_sexo_id FOREIGN KEY (genero_sexo_id) REFERENCES public.genero_sexo(id) ON DELETE RESTRICT 
);


-- public.grados_aud definition

-- Drop table

-- DROP TABLE public.grados_aud;

CREATE TABLE public.grados_aud (
	id int8 NOT NULL DEFAULT nextval('public.seq_grados_aud_id'::regclass),
	grados_id int8 NOT NULL,
	sigla varchar(10) NOT NULL,
	grado varchar(30) NOT NULL,
	descripcion varchar(255) NOT NULL,
	estado varchar(30) NULL,
	transaccion varchar(30) NULL,
	usu_cre varchar(30) NULL,
	fec_cre timestamp NOT NULL,
	usu_mod varchar(30) NULL,
	fec_mod timestamp NULL,
	host_creacion varchar(30) NOT NULL,
	host_modificacion varchar(30) NULL,
	CONSTRAINT pk_grados_aud_id PRIMARY KEY (id),
	CONSTRAINT fk_grados_aud_grados_id FOREIGN KEY (grados_id) REFERENCES public.grados(id) ON DELETE RESTRICT 
);


-- public.menus definition

-- Drop table

-- DROP TABLE public.menus;

CREATE TABLE public.menus (
	id int8 NOT NULL DEFAULT nextval('public.seq_menus_id'::regclass),
	modulos_sigla varchar(10) NOT NULL,
	sigla varchar(10) NOT NULL,
	menu varchar(30) NOT NULL,
	descripcion varchar(255) NOT NULL,
	nivel int8 NOT NULL,
	padre_id int8 NOT NULL,
	estado varchar(30) NULL DEFAULT 'ELABORADO'::character varying,
	transaccion varchar(30) NULL DEFAULT 'CREAR'::character varying,
	usu_cre varchar(30) NULL DEFAULT "current_user"(),
	fec_cre timestamp NOT NULL DEFAULT now(),
	usu_mod varchar(30) NULL,
	fec_mod timestamp NULL,
	host_creacion varchar(30) NOT NULL DEFAULT inet_client_addr(),
	host_modificacion varchar(30) NULL,
	CONSTRAINT pk_menus_id PRIMARY KEY (id),
	CONSTRAINT uk_menus_sigla UNIQUE (sigla),
	CONSTRAINT fk_menus_modulos_id FOREIGN KEY (modulos_sigla) REFERENCES public.modulos(sigla) ON DELETE RESTRICT 
);


-- public.menus_aud definition

-- Drop table

-- DROP TABLE public.menus_aud;

CREATE TABLE public.menus_aud (
	id int8 NOT NULL DEFAULT nextval('public.seq_menus_aud_id'::regclass),
	menus_id int8 NOT NULL,
	modulos_sigla varchar(10) NOT NULL,
	sigla varchar(10) NOT NULL,
	menu varchar(30) NOT NULL,
	descripcion varchar(255) NOT NULL,
	nivel int8 NOT NULL,
	padre_id int8 NOT NULL,
	estado varchar(30) NULL,
	transaccion varchar(30) NULL,
	usu_cre varchar(30) NULL,
	fec_cre timestamp NOT NULL,
	usu_mod varchar(30) NULL,
	fec_mod timestamp NULL,
	host_creacion varchar(30) NOT NULL,
	host_modificacion varchar(30) NULL,
	CONSTRAINT pk_menus_aud_id PRIMARY KEY (id),
	CONSTRAINT fk_menus_aud_menus_id FOREIGN KEY (menus_id) REFERENCES public.menus(id) ON DELETE RESTRICT 
);


-- public.modulos_aud definition

-- Drop table

-- DROP TABLE public.modulos_aud;

CREATE TABLE public.modulos_aud (
	id int8 NOT NULL DEFAULT nextval('public.seq_modulos_aud_id'::regclass),
	modulos_id int8 NOT NULL,
	sigla varchar(10) NOT NULL,
	modulo varchar(30) NOT NULL,
	descripcion varchar(255) NOT NULL,
	estado varchar(30) NULL DEFAULT 'ELABORADO'::character varying,
	transaccion varchar(30) NULL DEFAULT 'CREAR'::character varying,
	usu_cre varchar(30) NULL DEFAULT "current_user"(),
	fec_cre timestamp NOT NULL DEFAULT now(),
	usu_mod varchar(30) NULL,
	fec_mod timestamp NULL,
	host_creacion varchar(30) NOT NULL DEFAULT inet_client_addr(),
	host_modificacion varchar(30) NULL,
	CONSTRAINT pk_modulos_aud_id PRIMARY KEY (id),
	CONSTRAINT fk_modulos_aud_modulos_id FOREIGN KEY (modulos_id) REFERENCES public.modulos(id) ON DELETE RESTRICT 
);


-- public.nivel_geografico_aud definition

-- Drop table

-- DROP TABLE public.nivel_geografico_aud;

CREATE TABLE public.nivel_geografico_aud (
	id int8 NOT NULL DEFAULT nextval('public.seq_nivel_geografico_aud_id'::regclass),
	nivel_geografico_id int8 NOT NULL,
	sigla varchar(10) NULL,
	sigla_padre varchar(10) NULL,
	nivel_geografico varchar(10) NULL,
	descripcion varchar(255) NOT NULL,
	estado varchar(30) NULL,
	transaccion varchar(30) NULL,
	usu_cre varchar(30) NULL,
	fec_cre timestamp NOT NULL,
	usu_mod varchar(30) NULL,
	fec_mod timestamp NULL,
	host_creacion varchar(30) NOT NULL,
	host_modificacion varchar(30) NULL,
	CONSTRAINT pk_nivel_geografico_aud_id PRIMARY KEY (id),
	CONSTRAINT fk_nivel_geografico_aud_nivel_geografico_id FOREIGN KEY (nivel_geografico_id) REFERENCES public.nivel_geografico(id) ON DELETE RESTRICT 
);


-- public.operaciones_aud definition

-- Drop table

-- DROP TABLE public.operaciones_aud;

CREATE TABLE public.operaciones_aud (
	id int8 NOT NULL DEFAULT nextval('public.seq_operaciones_aud_id'::regclass),
	operaciones_id int8 NOT NULL,
	sigla varchar(10) NOT NULL,
	operacion varchar(30) NOT NULL,
	descripcion varchar(255) NOT NULL,
	estado varchar(30) NULL,
	transaccion varchar(30) NULL,
	usu_cre varchar(30) NULL,
	fec_cre timestamp NOT NULL,
	usu_mod varchar(30) NULL,
	fec_mod timestamp NULL,
	host_creacion varchar(30) NOT NULL,
	host_modificacion varchar(30) NULL,
	CONSTRAINT pk_operaciones_aud_id PRIMARY KEY (id),
	CONSTRAINT fk_operaciones_aud_operaciones_id FOREIGN KEY (operaciones_id) REFERENCES public.operaciones(id) ON DELETE RESTRICT 
);


-- public.parametros_aud definition

-- Drop table

-- DROP TABLE public.parametros_aud;

CREATE TABLE public.parametros_aud (
	id int8 NOT NULL DEFAULT nextval('public.seq_parametros_aud_id'::regclass),
	parametros_id int8 NOT NULL,
	modulos_sigla varchar(30) NULL,
	sigla varchar(30) NOT NULL,
	descripcion varchar(100) NULL,
	orden int8 NOT NULL,
	param_numerico_ini varchar(30) NULL,
	param_numerico_fin varchar(30) NULL,
	param_caracter_ini varchar(30) NULL,
	param_fecha_ini varchar(30) NULL,
	param_fecha_fin varchar(30) NULL,
	fec_ini timestamp NOT NULL,
	fec_fin timestamp NOT NULL,
	estado varchar(30) NULL DEFAULT 'ELABORADO'::character varying,
	transaccion varchar(30) NULL DEFAULT 'CREAR'::character varying,
	usu_cre varchar(30) NULL DEFAULT "current_user"(),
	fec_cre timestamp NOT NULL DEFAULT now(),
	usu_mod varchar(30) NULL,
	fec_mod timestamp NULL,
	host_creacion varchar(30) NOT NULL DEFAULT inet_client_addr(),
	host_modificacion varchar(30) NULL,
	CONSTRAINT pk_parametros_aud_id PRIMARY KEY (id),
	CONSTRAINT fk_parametros_aud_parametros_id FOREIGN KEY (parametros_id) REFERENCES public.parametros(id) ON DELETE RESTRICT 
);


-- public.personas definition

-- Drop table

-- DROP TABLE public.personas;

CREATE TABLE public.personas (
	id int8 NOT NULL DEFAULT nextval('public.seq_personas_id'::regclass),
	denuncia_personas_id int8 NOT NULL,
	genero_sexo_sigla varchar(10) NOT NULL,
	grados_sigla varchar(10) NOT NULL,
	orden int8 NOT NULL,
	puesto_cargo_funcion varchar(1000) NULL,
	unidad_policial_desc varchar(255) NULL,
	sigla varchar(10) NULL,
	cod_activo varchar(30) NULL,
	tipo_personas varchar(30) NOT NULL,
	password_hash varchar(60) NULL,
	nombres varchar(100) NOT NULL,
	apellido_pat varchar(100) NOT NULL,
	apellido_mat varchar(100) NOT NULL,
	email varchar(100) NULL,
	telefono varchar(100) NULL,
	direccion varchar(255) NULL,
	fecha_nacimiento timestamp NULL DEFAULT now(),
	ci_y_complemento varchar(20) NULL,
	ci_expedido varchar(4) NULL,
	foto_img_path varchar(500) NULL,
	estado varchar(30) NULL DEFAULT 'ELABORADO'::character varying,
	transaccion varchar(30) NULL DEFAULT 'CREAR'::character varying,
	usu_cre varchar(30) NULL DEFAULT "current_user"(),
	fec_cre timestamp NOT NULL DEFAULT now(),
	usu_mod varchar(30) NULL,
	fec_mod timestamp NULL,
	host_creacion varchar(30) NOT NULL DEFAULT inet_client_addr(),
	host_modificacion varchar(30) NULL,
	CONSTRAINT pk_personas_id PRIMARY KEY (id),
	CONSTRAINT uk_personas_sigla UNIQUE (ci_y_complemento),
	CONSTRAINT fk_personas_denuncia_personas_id FOREIGN KEY (denuncia_personas_id) REFERENCES public.denuncia_personas(id) ON DELETE RESTRICT ,
	CONSTRAINT fk_personas_genero_sexo_id FOREIGN KEY (genero_sexo_sigla) REFERENCES public.genero_sexo(sigla) ON DELETE RESTRICT ,
	CONSTRAINT fk_personas_grados_id FOREIGN KEY (grados_sigla) REFERENCES public.grados(sigla) ON DELETE RESTRICT 
);


-- public.personas_aud definition

-- Drop table

-- DROP TABLE public.personas_aud;

CREATE TABLE public.personas_aud (
	id int8 NOT NULL DEFAULT nextval('public.seq_personas_aud_id'::regclass),
	personas_id int8 NOT NULL,
	denuncia_personas_id int8 NOT NULL,
	genero_sexo_sigla varchar(10) NOT NULL,
	grados_sigla varchar(10) NOT NULL,
	orden int8 NOT NULL,
	puestos_sigla varchar(10) NULL,
	unidad_policial_desc varchar(255) NULL,
	sigla varchar(10) NULL,
	cod_activo varchar(30) NULL,
	tipo_personas varchar(30) NOT NULL,
	password_hash varchar(60) NOT NULL,
	nombres varchar(100) NOT NULL,
	apellido_pat varchar(100) NOT NULL,
	apellido_mat varchar(100) NOT NULL,
	email varchar(100) NULL,
	telefono varchar(100) NULL,
	direccion varchar(255) NULL,
	fecha_nacimiento timestamp NULL DEFAULT now(),
	ci_y_complemento varchar(20) NULL,
	ci_expedido varchar(4) NULL,
	foto_img_path varchar(500) NULL,
	estado varchar(30) NULL,
	transaccion varchar(30) NULL,
	usu_cre varchar(30) NULL,
	fec_cre timestamp NOT NULL,
	usu_mod varchar(30) NULL,
	fec_mod timestamp NULL,
	host_creacion varchar(30) NOT NULL,
	host_modificacion varchar(30) NULL,
	CONSTRAINT pk_personas_aud_id PRIMARY KEY (id),
	CONSTRAINT fk_personas_aud_personas_id FOREIGN KEY (personas_id) REFERENCES public.personas(id) ON DELETE RESTRICT 
);


-- public.puestos_aud definition

-- Drop table

-- DROP TABLE public.puestos_aud;

CREATE TABLE public.puestos_aud (
	id int8 NOT NULL DEFAULT nextval('public.seq_puestos_aud_id'::regclass),
	puestos_id int8 NOT NULL,
	sigla varchar(10) NOT NULL,
	puesto varchar(30) NOT NULL,
	descripcion varchar(255) NOT NULL,
	estado varchar(30) NULL DEFAULT 'ELABORADO'::character varying,
	transaccion varchar(30) NULL DEFAULT 'CREAR'::character varying,
	usu_cre varchar(30) NULL DEFAULT "current_user"(),
	fec_cre timestamp NOT NULL DEFAULT now(),
	usu_mod varchar(30) NULL,
	fec_mod timestamp NULL,
	host_creacion varchar(30) NOT NULL DEFAULT inet_client_addr(),
	host_modificacion varchar(30) NULL,
	CONSTRAINT pk_puestos_aud_id PRIMARY KEY (id),
	CONSTRAINT fk_puestos_aud_puestos_id FOREIGN KEY (puestos_id) REFERENCES public.puestos(id) ON DELETE RESTRICT 
);


-- public.roles definition

-- Drop table

-- DROP TABLE public.roles;

CREATE TABLE public.roles (
	id int8 NOT NULL DEFAULT nextval('public.seq_roles_id'::regclass),
		nivel_geografico_sigla varchar(10) NULL,
	sigla varchar(10) NOT NULL,
	rol varchar(30) NOT NULL,
	descripcion varchar(255) NOT NULL,
	nivel_geografico_id int8 NULL,
	modulo_sigla varchar(10) NOT NULL,
	estado varchar(30) NULL DEFAULT 'ELABORADO'::character varying,
	transaccion varchar(30) NULL DEFAULT 'CREAR'::character varying,
	usu_cre varchar(30) NULL DEFAULT "current_user"(),
	fec_cre timestamp NOT NULL DEFAULT now(),
	usu_mod varchar(30) NULL,
	fec_mod timestamp NULL,
	host_creacion varchar(30) NOT NULL DEFAULT inet_client_addr(),
	host_modificacion varchar(30) NULL,
	CONSTRAINT pk_roles_id PRIMARY KEY (id),
	CONSTRAINT uk_roles_sigla UNIQUE (sigla),
	CONSTRAINT fk_roles_nivel_geografico_sigla FOREIGN KEY (nivel_geografico_sigla) REFERENCES public.nivel_geografico(sigla) ON DELETE RESTRICT 
);


-- public.roles_aud definition

-- Drop table

-- DROP TABLE public.roles_aud;

CREATE TABLE public.roles_aud (
	id int8 NOT NULL DEFAULT nextval('public.seq_roles_aud_id'::regclass),
	roles_id int8 NOT NULL,
	nivel_geografico_sigla varchar(10) NULL,
	sigla varchar(10) NOT NULL,
	rol varchar(30) NOT NULL,
	descripcion varchar(255) NOT NULL,
	nivel_geografico_id int8 NULL,
	modulo_sigla varchar(10) NOT NULL,	
	estado varchar(30) NULL,
	transaccion varchar(30) NULL,
	usu_cre varchar(30) NULL,
	fec_cre timestamp NOT NULL,
	usu_mod varchar(30) NULL,
	fec_mod timestamp NULL,
	host_creacion varchar(30) NOT NULL,
	host_modificacion varchar(30) NULL,
	CONSTRAINT pk_roles_aud_id PRIMARY KEY (id),
	CONSTRAINT fk_roles_aud_roles_id FOREIGN KEY (roles_id) REFERENCES public.roles(id) ON DELETE RESTRICT 
);


-- public.unidad_policial definition

-- Drop table

-- DROP TABLE public.unidad_policial;

CREATE TABLE public.unidad_policial (
	id int8 NOT NULL DEFAULT nextval('public.seq_unidad_policial_id'::regclass),
	nivel_geografico_id int8 NOT NULL,
	sigla varchar(10) NOT NULL,
	unidad_policial varchar(30) NOT NULL,
	descripcion varchar(255) NOT NULL,
	direccion varchar(255) NOT NULL,
	estado varchar(30) NULL DEFAULT 'ELABORADO'::character varying,
	transaccion varchar(30) NULL DEFAULT 'CREAR'::character varying,
	usu_cre varchar(30) NULL DEFAULT "current_user"(),
	fec_cre timestamp NOT NULL DEFAULT now(),
	usu_mod varchar(30) NULL,
	fec_mod timestamp NULL,
	host_creacion varchar(30) NOT NULL DEFAULT inet_client_addr(),
	host_modificacion varchar(30) NULL,
	CONSTRAINT pk_unidad_policial_id PRIMARY KEY (id),
	CONSTRAINT fk_unidad_policial_nivel_geografico_id FOREIGN KEY (nivel_geografico_id) REFERENCES public.nivel_geografico(id) ON DELETE RESTRICT 
);


-- public.unidad_policial_aud definition

-- Drop table

-- DROP TABLE public.unidad_policial_aud;

CREATE TABLE public.unidad_policial_aud (
	id int8 NOT NULL DEFAULT nextval('public.seq_unidad_policial_aud_id'::regclass),
	unidad_policial_id int8 NOT NULL,
	nivel_geografico_id int8 NOT NULL,
	sigla varchar(10) NOT NULL,
	unidad_policial varchar(30) NOT NULL,
	descripcion varchar(255) NOT NULL,
	direccion varchar(255) NOT NULL,
	estado varchar(30) NULL,
	transaccion varchar(30) NULL,
	usu_cre varchar(30) NULL,
	fec_cre timestamp NOT NULL,
	usu_mod varchar(30) NULL,
	fec_mod timestamp NULL,
	host_creacion varchar(30) NOT NULL,
	host_modificacion varchar(30) NULL,
	CONSTRAINT pk_unidad_policial_aud_id PRIMARY KEY (id),
	CONSTRAINT fk_unidad_policial_aud_unidad_policial_id FOREIGN KEY (unidad_policial_id) REFERENCES public.unidad_policial(id) ON DELETE RESTRICT 
);


-- public.usuarios definition

-- Drop table

-- DROP TABLE public.usuarios;

CREATE TABLE public.usuarios (
	id int8 NOT NULL DEFAULT nextval('public.seq_usuarios_id'::regclass),
		nivel_geografico_id int8 NULL,
	nivel_geografico_sigla varchar(10) NULL,
	grados_sigla varchar(10) NOT NULL,
	puestos_sigla varchar(10) NULL,
	genero_sexo_sigla varchar(10) NULL,
	user_login varchar(30) NOT NULL,
	password_hash varchar(60) NOT NULL,
	nombres varchar(100) NOT NULL,
	apellido_pat varchar(100) NOT NULL,
	apellido_mat varchar(100) NULL,
	email varchar(100) NOT NULL,
	telefono varchar(100) NULL,
	direccion varchar(255) NULL,
	reset_key varchar(20) NULL,
	reset_date timestamp NULL,
	fecha_nacimiento timestamp NULL,
	ci_y_complemento varchar(20) NOT NULL,
	ci_expedido varchar(4) NOT NULL,
	foto_img_path varchar(500) NULL,
	estado varchar(30) NULL DEFAULT 'ELABORADO'::character varying,
	transaccion varchar(30) NULL DEFAULT 'CREAR'::character varying,
	usu_cre varchar(30) NULL DEFAULT "current_user"(),
	fec_cre timestamp NOT NULL DEFAULT now(),
	usu_mod varchar(30) NULL,
	fec_mod timestamp NULL,
	host_creacion varchar(30) NOT NULL DEFAULT inet_client_addr(),
	host_modificacion varchar(30) NULL,
	CONSTRAINT pk_usuarios_id PRIMARY KEY (id),
	CONSTRAINT uk_usuarios_sigla UNIQUE (user_login),
	CONSTRAINT fk_usuarios_grados_id FOREIGN KEY (grados_sigla) REFERENCES public.grados(sigla) ON DELETE RESTRICT ,
	CONSTRAINT fk_usuarios_nivel_geografico_id FOREIGN KEY (nivel_geografico_id) REFERENCES public.nivel_geografico(id) ON DELETE RESTRICT ,
	CONSTRAINT fk_usuarios_nivel_geografico_sigla FOREIGN KEY (nivel_geografico_sigla) REFERENCES public.nivel_geografico(sigla) ON DELETE RESTRICT 
);


-- public.usuarios_aud definition

-- Drop table

-- DROP TABLE public.usuarios_aud;

CREATE TABLE public.usuarios_aud (
	id int8 NOT NULL DEFAULT nextval('public.seq_usuarios_aud_id'::regclass),
	usuarios_id int8 NOT NULL,
		nivel_geografico_id int8 NULL,
	nivel_geografico_sigla varchar(10) NULL,
	grados_sigla varchar(10) NOT NULL,
	puestos_sigla varchar(10) NULL,
	genero_sexo_sigla varchar(10) NULL,
	user_login varchar(30) NOT NULL,
	password_hash varchar(60) NOT NULL,
	nombres varchar(100) NOT NULL,
	apellido_pat varchar(100) NOT NULL,
	apellido_mat varchar(100) NULL,
	email varchar(100) NOT NULL,
	telefono varchar(100) NULL,
	direccion varchar(255) NULL,
	reset_key varchar(20) NULL,
	reset_date timestamp NULL,
	fecha_nacimiento timestamp NOT NULL DEFAULT now(),
	ci_y_complemento varchar(20) NOT NULL,
	ci_expedido varchar(4) NOT NULL,
	foto_img_path varchar(500) NULL,
	estado varchar(30) NULL,
	transaccion varchar(30) NULL,
	usu_cre varchar(30) NULL,
	fec_cre timestamp NOT NULL,
	usu_mod varchar(30) NULL,
	fec_mod timestamp NULL,
	host_creacion varchar(30) NOT NULL,
	host_modificacion varchar(30) NULL,
	CONSTRAINT pk_usuarios_aud_id PRIMARY KEY (id),
	CONSTRAINT fk_usuarios_aud_usuarios_id FOREIGN KEY (usuarios_id) REFERENCES public.usuarios(id) ON DELETE RESTRICT 
);


-- public.usuarios_rol definition

-- Drop table

-- DROP TABLE public.usuarios_rol;

CREATE TABLE public.usuarios_rol (
	id int8 NOT NULL DEFAULT nextval('public.seq_usuarios_rol_id'::regclass),
	usuarios_id int8 NOT NULL,
	roles_sigla varchar(10) NOT NULL,
	descripcion varchar(255) NOT NULL,
	estado varchar(30) NULL DEFAULT 'ELABORADO'::character varying,
	transaccion varchar(30) NULL DEFAULT 'CREAR'::character varying,
	usu_cre varchar(30) NULL DEFAULT "current_user"(),
	fec_cre timestamp NOT NULL DEFAULT now(),
	usu_mod varchar(30) NULL,
	fec_mod timestamp NULL,
	host_creacion varchar(30) NOT NULL DEFAULT inet_client_addr(),
	host_modificacion varchar(30) NULL,
	CONSTRAINT pk_usuarios_rol_id PRIMARY KEY (id),
	CONSTRAINT fk_usuarios_rol_roles_id FOREIGN KEY (roles_sigla) REFERENCES public.roles(sigla) ON DELETE RESTRICT ,
	CONSTRAINT fk_usuarios_rol_usuarios_id FOREIGN KEY (usuarios_id) REFERENCES public.usuarios(id) ON DELETE RESTRICT 
);


-- public.usuarios_rol_aud definition

-- Drop table

-- DROP TABLE public.usuarios_rol_aud;

CREATE TABLE public.usuarios_rol_aud (
	id int8 NOT NULL DEFAULT nextval('public.seq_usuarios_rol_aud_id'::regclass),
	usuarios_rol_id int8 NOT NULL,
	usuarios_id int8 NOT NULL,
	roles_sigla varchar(10) NOT NULL,
	descripcion varchar(255) NOT NULL,
	estado varchar(30) NULL,
	transaccion varchar(30) NULL,
	usu_cre varchar(30) NULL,
	fec_cre timestamp NOT NULL,
	usu_mod varchar(30) NULL,
	fec_mod timestamp NULL,
	host_creacion varchar(30) NOT NULL,
	host_modificacion varchar(30) NULL,
	CONSTRAINT pk_usuarios_rol_aud_id PRIMARY KEY (id),
	CONSTRAINT fk_usuarios_rol_aud_usuarios_rol_id FOREIGN KEY (usuarios_rol_id) REFERENCES public.usuarios_rol(id) ON DELETE RESTRICT 
);


-- public."control" definition

-- Drop table

-- DROP TABLE public."control";

CREATE TABLE public."control" (
	id int8 NOT NULL DEFAULT nextval('public.seq_control_id'::regclass),
	denuncia_personas_id int8 NOT NULL,
	usuario_revisor_id int8 NOT NULL,
	analisis_denuncia varchar(1000) NOT NULL,
	recomendacion varchar(255) NOT NULL,
	fec_registro timestamp NOT NULL DEFAULT now(),
	estado varchar(30) NULL DEFAULT 'ELABORADO'::character varying,
	transaccion varchar(30) NULL DEFAULT 'CREAR'::character varying,
	usu_cre varchar(30) NULL DEFAULT "current_user"(),
	fec_cre timestamp NOT NULL DEFAULT now(),
	usu_mod varchar(30) NULL,
	fec_mod timestamp NULL,
	host_creacion varchar(30) NOT NULL DEFAULT inet_client_addr(),
	host_modificacion varchar(30) NULL,
	CONSTRAINT pk_control_id PRIMARY KEY (id),
	CONSTRAINT fk_control_denuncia_personas_id FOREIGN KEY (denuncia_personas_id) REFERENCES public.denuncia_personas(id) ON DELETE RESTRICT ,
	CONSTRAINT fk_control_usuarios_id FOREIGN KEY (usuario_revisor_id) REFERENCES public.usuarios(id) ON DELETE RESTRICT 
);


-- public.control_aud definition

-- Drop table

-- DROP TABLE public.control_aud;

CREATE TABLE public.control_aud (
	id int8 NOT NULL DEFAULT nextval('public.seq_control_aud_id'::regclass),
	control_id int8 NOT NULL,
	denuncia_personas_id int8 NOT NULL,
	usuario_revisor_id int8 NOT NULL,
	analisis_denuncia varchar(1000) NOT NULL,
	recomendacion varchar(255) NOT NULL,
	fec_registro timestamp NOT NULL DEFAULT now(),
	estado varchar(30) NULL,
	transaccion varchar(30) NULL,
	usu_cre varchar(30) NULL,
	fec_cre timestamp NOT NULL,
	usu_mod varchar(30) NULL,
	fec_mod timestamp NULL,
	host_creacion varchar(30) NOT NULL,
	host_modificacion varchar(30) NULL,
	CONSTRAINT pk_control_aud_id PRIMARY KEY (id),
	CONSTRAINT fk_control_aud_control_id FOREIGN KEY (control_id) REFERENCES public."control"(id) ON DELETE RESTRICT 
);


-- public.derivacion definition

-- Drop table

-- DROP TABLE public.derivacion;

CREATE TABLE public.derivacion (
	id int8 NOT NULL DEFAULT nextval('public.seq_derivacion_id'::regclass),
	denuncia_personas_id int8 NOT NULL,
	control_id int8 NOT NULL,
	usuarios_id int8 NOT NULL,
	observacion varchar(255) NOT NULL,
	fec_registro timestamp NOT NULL DEFAULT now(),
	estado varchar(30) NULL DEFAULT 'ELABORADO'::character varying,
	transaccion varchar(30) NULL DEFAULT 'CREAR'::character varying,
	usu_cre varchar(30) NULL DEFAULT "current_user"(),
	fec_cre timestamp NOT NULL DEFAULT now(),
	usu_mod varchar(30) NULL,
	fec_mod timestamp NULL,
	host_creacion varchar(30) NOT NULL DEFAULT inet_client_addr(),
	host_modificacion varchar(30) NULL,
	CONSTRAINT pk_derivacion_id PRIMARY KEY (id),
	CONSTRAINT fk_derivacion_control_id FOREIGN KEY (control_id) REFERENCES public."control"(id) ON DELETE RESTRICT ,
	CONSTRAINT fk_derivacion_denuncia_personas_id FOREIGN KEY (denuncia_personas_id) REFERENCES public.denuncia_personas(id) ON DELETE RESTRICT ,
	CONSTRAINT fk_derivacion_usuarios_id FOREIGN KEY (usuarios_id) REFERENCES public.usuarios(id) ON DELETE RESTRICT 
);


-- public.derivacion_aud definition

-- Drop table

-- DROP TABLE public.derivacion_aud;

CREATE TABLE public.derivacion_aud (
	id int8 NOT NULL DEFAULT nextval('public.seq_derivacion_aud_id'::regclass),
	derivacion_id int8 NOT NULL,
	denuncia_personas_id int8 NOT NULL,
	control_id int8 NOT NULL,
	usuarios_id int8 NOT NULL,
	observacion varchar(255) NOT NULL,
	fec_registro timestamp NOT NULL DEFAULT now(),
	estado varchar(30) NULL,
	transaccion varchar(30) NULL,
	usu_cre varchar(30) NULL,
	fec_cre timestamp NOT NULL,
	usu_mod varchar(30) NULL,
	fec_mod timestamp NULL,
	host_creacion varchar(30) NOT NULL,
	host_modificacion varchar(30) NULL,
	CONSTRAINT pk_derivacion_aud_id PRIMARY KEY (id),
	CONSTRAINT fk_derivacion_aud_derivacion_id FOREIGN KEY (derivacion_id) REFERENCES public.derivacion(id) ON DELETE RESTRICT 
);


-- public.notificaciones definition

-- Drop table

-- DROP TABLE public.notificaciones;

CREATE TABLE public.notificaciones (
	id int8 NOT NULL DEFAULT nextval('public.seq_notificaciones_id'::regclass),
	user_login_sigla varchar(30) NOT NULL,
	sigla varchar(10) NOT NULL,
	notificacion varchar(30) NOT NULL,
	descripcion varchar(255) NOT NULL,
	fec_inicio timestamptz NOT NULL DEFAULT now(),
	fec_fin timestamptz NOT NULL DEFAULT now(),
	estado varchar(30) NULL DEFAULT 'ELABORADO'::character varying,
	transaccion varchar(30) NULL DEFAULT 'CREAR'::character varying,
	usu_cre varchar(30) NULL DEFAULT "current_user"(),
	fec_cre timestamp NOT NULL DEFAULT now(),
	usu_mod varchar(30) NULL,
	fec_mod timestamp NULL,
	host_creacion varchar(30) NOT NULL DEFAULT inet_client_addr(),
	host_modificacion varchar(30) NULL,
	CONSTRAINT pk_notificaciones_id PRIMARY KEY (id),
	CONSTRAINT fk_notificaciones_usuarios_id FOREIGN KEY (user_login_sigla) REFERENCES public.usuarios(user_login) ON DELETE RESTRICT 
);


-- public.notificaciones_aud definition

-- Drop table

-- DROP TABLE public.notificaciones_aud;

CREATE TABLE public.notificaciones_aud (
	id int8 NOT NULL DEFAULT nextval('public.seq_notificaciones_aud_id'::regclass),
	notificaciones_id int8 NOT NULL,
	user_login_sigla varchar(30) NOT NULL,
	sigla varchar(10) NOT NULL,
	notificacion varchar(30) NOT NULL,
	descripcion varchar(255) NOT NULL,
	fec_inicio timestamptz NOT NULL DEFAULT now(),
	fec_fin timestamptz NOT NULL DEFAULT now(),
	estado varchar(30) NULL,
	transaccion varchar(30) NULL,
	usu_cre varchar(30) NULL,
	fec_cre timestamp NOT NULL,
	usu_mod varchar(30) NULL,
	fec_mod timestamp NULL,
	host_creacion varchar(30) NOT NULL,
	host_modificacion varchar(30) NULL,
	CONSTRAINT pk_notificaciones_aud_id PRIMARY KEY (id),
	CONSTRAINT fk_notificaciones_aud_notificaciones_id FOREIGN KEY (notificaciones_id) REFERENCES public.notificaciones(id) ON DELETE RESTRICT 
);


-- public.rol_menus_operaciones definition

-- Drop table

-- DROP TABLE public.rol_menus_operaciones;

CREATE TABLE public.rol_menus_operaciones (
	id int8 NOT NULL DEFAULT nextval('public.seq_rol_menus_operaciones_id'::regclass),
	roles_sigla varchar(10) NOT NULL,
	menus_sigla varchar(10) NOT NULL,
	operaciones_sigla varchar(10) NOT NULL,
	descripcion varchar(255) NOT NULL,
	estado varchar(30) NULL DEFAULT 'ELABORADO'::character varying,
	transaccion varchar(30) NULL DEFAULT 'CREAR'::character varying,
	usu_cre varchar(30) NULL DEFAULT "current_user"(),
	fec_cre timestamp NOT NULL DEFAULT now(),
	usu_mod varchar(30) NULL,
	fec_mod timestamp NULL,
	host_creacion varchar(30) NOT NULL DEFAULT inet_client_addr(),
	host_modificacion varchar(30) NULL,
	CONSTRAINT pk_rol_menus_operaciones_id PRIMARY KEY (id),
	CONSTRAINT fk_rol_menus_operaciones_menus_id FOREIGN KEY (menus_sigla) REFERENCES public.menus(sigla) ON DELETE RESTRICT ,
	CONSTRAINT fk_rol_menus_operaciones_operaciones_id FOREIGN KEY (operaciones_sigla) REFERENCES public.operaciones(sigla) ON DELETE RESTRICT ,
	CONSTRAINT fk_rol_menus_operaciones_roles_id FOREIGN KEY (roles_sigla) REFERENCES public.roles(sigla) ON DELETE RESTRICT 
);


-- public.rol_menus_operaciones_aud definition

-- Drop table

-- DROP TABLE public.rol_menus_operaciones_aud;

CREATE TABLE public.rol_menus_operaciones_aud (
	id int8 NOT NULL DEFAULT nextval('public.seq_rol_menus_operaciones_aud_id'::regclass),
	rol_menus_operaciones_id int8 NOT NULL,
	roles_sigla varchar(10) NOT NULL,
	menus_sigla varchar(10) NOT NULL,
	operaciones_sigla varchar(10) NOT NULL,
	descripcion varchar(255) NOT NULL,
	estado varchar(30) NULL,
	transaccion varchar(30) NULL,
	usu_cre varchar(30) NULL,
	fec_cre timestamp NOT NULL,
	usu_mod varchar(30) NULL,
	fec_mod timestamp NULL,
	host_creacion varchar(30) NOT NULL,
	host_modificacion varchar(30) NULL,
	CONSTRAINT pk_rol_menus_operaciones_aud_id PRIMARY KEY (id),
	CONSTRAINT fk_rol_menus_operaciones_aud_rol_menus_operaciones_id FOREIGN KEY (rol_menus_operaciones_id) REFERENCES public.rol_menus_operaciones(id) ON DELETE RESTRICT 
);


-- public.actividades definition

-- Drop table

-- DROP TABLE public.actividades;

CREATE TABLE public.actividades (
	id int8 NOT NULL DEFAULT nextval('public.seq_actividades_id'::regclass),
	denuncia_personas_id int8 NULL,
	control_id int8 NULL,
	seguimiento_id int8 NULL,
	usuarios_id int8 NULL,
		sigla varchar(30) NULL,
	actividad varchar(255) NULL,
	tipo varchar(30) NULL,
	descripcion varchar(255) NOT NULL,
	fec_registro timestamp NULL DEFAULT now(),
	informe varchar(1000) NULL,
	estado varchar(30) NULL DEFAULT 'ELABORADO'::character varying,
	transaccion varchar(30) NULL DEFAULT 'CREAR'::character varying,
	usu_cre varchar(30) NULL DEFAULT "current_user"(),
	fec_cre timestamp NOT NULL DEFAULT now(),
	usu_mod varchar(30) NULL,
	fec_mod timestamp NULL,
	host_creacion varchar(30) NOT NULL DEFAULT inet_client_addr(),
	host_modificacion varchar(30) NULL,
	CONSTRAINT pk_actividades_id PRIMARY KEY (id)
);


-- public.actividades_aud definition

-- Drop table

-- DROP TABLE public.actividades_aud;

CREATE TABLE public.actividades_aud (
	id int8 NOT NULL DEFAULT nextval('public.seq_actividades_aud_id'::regclass),
	actividades_id int8 NOT NULL,
	denuncia_personas_id int8 NOT NULL,
	control_id int8 NOT NULL,
	seguimiento_id int8 NOT NULL,
	usuarios_id int8 NOT NULL,
		sigla varchar(30) NULL,
	actividad varchar(255) NULL,
	tipo varchar(30) NULL,
	descripcion varchar(255) NOT NULL,
	fec_registro timestamp NOT NULL DEFAULT now(),
	informe varchar(1000) NULL,
	estado varchar(30) NULL DEFAULT 'ELABORADO'::character varying,
	transaccion varchar(30) NULL DEFAULT 'CREAR'::character varying,
	usu_cre varchar(30) NULL DEFAULT "current_user"(),
	fec_cre timestamp NOT NULL DEFAULT now(),
	usu_mod varchar(30) NULL,
	fec_mod timestamp NULL,
	host_creacion varchar(30) NOT NULL DEFAULT inet_client_addr(),
	host_modificacion varchar(30) NULL,
	CONSTRAINT pk_actividades_aud_id PRIMARY KEY (id)
);


-- public.documentos_path definition

-- Drop table

-- DROP TABLE public.documentos_path;

CREATE TABLE public.documentos_path (
	id int8 NOT NULL DEFAULT nextval('public.seq_documentos_path_id'::regclass),
	denuncia_personas_id int8 NULL,
	usuarios_id int8 NULL,
	seguimiento_id int8 NULL,
	denunciante_id int8 NULL,
	orden int8 NOT NULL,
	origen varchar(30) NOT NULL,
	documento_path varchar(255) NOT NULL,
	descripcion varchar(255) NOT NULL,
	justificacion_legal varchar(255) NOT NULL,
	fec_registro timestamp NOT NULL DEFAULT now(),
	estado varchar(30) NULL DEFAULT 'ELABORADO'::character varying,
	transaccion varchar(30) NULL DEFAULT 'CREAR'::character varying,
	usu_cre varchar(30) NULL DEFAULT "current_user"(),
	fec_cre timestamp NOT NULL DEFAULT now(),
	usu_mod varchar(30) NULL,
	fec_mod timestamp NULL,
	host_creacion varchar(30) NOT NULL DEFAULT inet_client_addr(),
	host_modificacion varchar(30) NULL,
	CONSTRAINT pk_documentos_path_id PRIMARY KEY (id)
);


-- public.documentos_path_aud definition

-- Drop table

-- DROP TABLE public.documentos_path_aud;

CREATE TABLE public.documentos_path_aud (
	id int8 NOT NULL DEFAULT nextval('public.seq_documentos_path_aud_id'::regclass),
	documentos_path_id int8 NOT NULL,
	denuncia_personas_id int8 NULL,
	usuarios_id int8 NULL,
	actividades_id int8 NULL,
	denunciante_id int8 NULL,
	orden int8 NOT NULL,
	origen varchar(30) NOT NULL,
	documento_path varchar(255) NOT NULL,
	descripcion varchar(255) NOT NULL,
	justificacion_legal varchar(255) NOT NULL,
	fec_registro timestamp NOT NULL DEFAULT now(),
	estado varchar(30) NULL,
	transaccion varchar(30) NULL,
	usu_cre varchar(30) NULL,
	fec_cre timestamp NOT NULL,
	usu_mod varchar(30) NULL,
	fec_mod timestamp NULL,
	host_creacion varchar(30) NOT NULL,
	host_modificacion varchar(30) NULL,
	CONSTRAINT pk_documentos_path_aud_id PRIMARY KEY (id)
);


-- public.seguimiento definition

-- Drop table

-- DROP TABLE public.seguimiento;

CREATE TABLE public.seguimiento (
	id int8 NOT NULL DEFAULT nextval('public.seq_seguimiento_id'::regclass),
	denuncia_personas_id int8 NOT NULL,
	control_id int8 NULL,
	usuarios_id int8 NOT NULL,
	observacion varchar(255) NOT NULL,
	fec_registro timestamp NOT NULL DEFAULT now(),
	estado varchar(30) NULL DEFAULT 'ELABORADO'::character varying,
	transaccion varchar(30) NULL DEFAULT 'CREAR'::character varying,
	usu_cre varchar(30) NULL DEFAULT "current_user"(),
	fec_cre timestamp NOT NULL DEFAULT now(),
	usu_mod varchar(30) NULL,
	fec_mod timestamp NULL,
	host_creacion varchar(30) NOT NULL DEFAULT inet_client_addr(),
	host_modificacion varchar(30) NULL,
	actividades_id int8 NULL,
	CONSTRAINT pk_seguimiento_id PRIMARY KEY (id)
);


-- public.seguimiento_aud definition

-- Drop table

-- DROP TABLE public.seguimiento_aud;

CREATE TABLE public.seguimiento_aud (
	id int8 NOT NULL DEFAULT nextval('public.seq_seguimiento_aud_id'::regclass),
	seguimiento_id int8 NOT NULL,
	denuncia_personas_id int8 NOT NULL,
	control_id int8 NOT NULL,
	usuarios_id int8 NOT NULL,
	observacion varchar(255) NOT NULL,
	fec_registro timestamp NOT NULL DEFAULT now(),
	estado varchar(30) NULL,
	transaccion varchar(30) NULL,
	usu_cre varchar(30) NULL,
	fec_cre timestamp NOT NULL,
	usu_mod varchar(30) NULL,
	fec_mod timestamp NULL,
	host_creacion varchar(30) NOT NULL,
	host_modificacion varchar(30) NULL,
	CONSTRAINT pk_seguimiento_aud_id PRIMARY KEY (id)
);


-- public.actividades foreign keys

ALTER TABLE public.actividades ADD CONSTRAINT fk_actividades_control_id FOREIGN KEY (control_id) REFERENCES public."control"(id) ON DELETE RESTRICT ;
ALTER TABLE public.actividades ADD CONSTRAINT fk_actividades_denuncia_personas_id FOREIGN KEY (denuncia_personas_id) REFERENCES public.denuncia_personas(id) ON DELETE RESTRICT ;
ALTER TABLE public.actividades ADD CONSTRAINT fk_actividades_seguimiento_id FOREIGN KEY (seguimiento_id) REFERENCES public.seguimiento(id) ON DELETE RESTRICT ;
ALTER TABLE public.actividades ADD CONSTRAINT fk_actividades_usuarios_id FOREIGN KEY (usuarios_id) REFERENCES public.usuarios(id) ON DELETE RESTRICT ;


-- public.actividades_aud foreign keys

ALTER TABLE public.actividades_aud ADD CONSTRAINT fk_actividades_aud_actividades_id FOREIGN KEY (actividades_id) REFERENCES public.actividades(id) ON DELETE RESTRICT ;


-- public.documentos_path foreign keys

ALTER TABLE public.documentos_path ADD CONSTRAINT fk_documentos_path_denuncia_personas_id FOREIGN KEY (denuncia_personas_id) REFERENCES public.denuncia_personas(id) ON DELETE RESTRICT ;
ALTER TABLE public.documentos_path ADD CONSTRAINT fk_documentos_path_seguimiento_id FOREIGN KEY (seguimiento_id) REFERENCES public.seguimiento(id) ON DELETE RESTRICT ;
ALTER TABLE public.documentos_path ADD CONSTRAINT fk_documentos_path_usuarios_id FOREIGN KEY (usuarios_id) REFERENCES public.usuarios(id) ON DELETE RESTRICT ;


-- public.documentos_path_aud foreign keys

ALTER TABLE public.documentos_path_aud ADD CONSTRAINT fk_documentos_path_aud_documentos_path_id FOREIGN KEY (documentos_path_id) REFERENCES public.documentos_path(id) ON DELETE RESTRICT ;


-- public.seguimiento foreign keys

ALTER TABLE public.seguimiento ADD CONSTRAINT fk_seguimiento_actividades_id FOREIGN KEY (actividades_id) REFERENCES public.actividades(id) ON DELETE RESTRICT ;
ALTER TABLE public.seguimiento ADD CONSTRAINT fk_seguimiento_denuncia_personas_id FOREIGN KEY (denuncia_personas_id) REFERENCES public.denuncia_personas(id) ON DELETE RESTRICT ;
ALTER TABLE public.seguimiento ADD CONSTRAINT fk_seguimiento_usuarios_id FOREIGN KEY (usuarios_id) REFERENCES public.usuarios(id) ON DELETE RESTRICT ;


-- public.seguimiento_aud foreign keys

ALTER TABLE public.seguimiento_aud ADD CONSTRAINT fk_seguimiento_aud_seguimiento_id FOREIGN KEY (seguimiento_id) REFERENCES public.seguimiento(id) ON DELETE RESTRICT ;


-- 11/02/2025
ALTER TABLE public.usuarios DROP CONSTRAINT fk_usuarios_nivel_geografico_sigla;


