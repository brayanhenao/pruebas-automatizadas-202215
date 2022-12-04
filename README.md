# Ghost E2E Testing - MISW4103-202215

Este repositorio contiene todo el contenido de código asociado a la implementación de la estrategia final de pruebas
para la materia de Pruebas automatizadas de software de la Universidad de Los Andes.

## Integrantes

| Nombre                          |  Correo                    | Usuario                                       |
|---------------------------------|----------------------------| ----------------------------------------------|
| Andres Felipe Cerquera Calderon | a.cerquera@uniandes.edu.co | [pipeCer](https://github.com/pipeCer)         |
| Brayan Henao                    | b.henaoc@uniandes.edu.co   | [brayanhenao](https://github.com/brayanhenao) |
| Erik Fernando Loaiza Patiño     | ef.loaiza@uniandes.edu.co  | [erikloaiza](https://github.com/erikloaiza)   |
| Rodrigo Escobar Lopez           | r.escobarl@uniandes.edu.co | [ocralo](https://github.com/ocralo)           |

--------------------------------------------------------

## Instrucciones

Este repositorio contiene los scripts de pruebas E2E de ghost CMS.

Se recomienda utilizar una instalación en limpio, ya que los scripts hacen purga de la base de datos en cada suite con
el objetivo de mantenerlas isoladas.

Las pruebas se desarrollaron con las herramientas Cypress y Kraken Node, para instrucciones específicas de cómo ejecutar
cada herramienta ingresar a sus respectivos README:


- [Inventario de Pruebas Manuales](https://docs.google.com/spreadsheets/d/1PC4l-Ccp4obLqa6EbeyzhxhE_JP0u3C_/edit#gid=1110783667)
- [Instrucciones Cypress (versión nueva y actual)](cypress/README.md)
- [Instrucciones Kraken](kraken/README.md)
- [Instrucciones Kraken usando una nueva versión de Ghost para VRT](kraken-ghost-new-version/README.md)
- [Instrucción para usar Resemble y visualizar el reporte](regresion-visual/resemble/README.md)
- [Instrucción para usar cypress con estrategias de generación de datos (apriori, pseudo aleatorio y aleatorio)](/cypress/README.md#generación-de-datos)

## Ghost versión 5.22.9

### Funcionalidades

|    Funcionalidad    	| Descripcion                                                                                                                                                                                                                         	| Código 	|
|:-------------------:	|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|--------	|
|      Crear Post     	| Crear un post con los campos título y contenido (texto plano, WYSYWIG, embebidos, archivos, etc), y su estado (borrador, publicado, publicación programada), acceso (miembros, miembros pagos, publico), asignarle tags y metadata    	| F1     	|
|     Listar Posts    	| Visualizar una lista de posts creados y filtrarlos según estado, acceso, autores, tags y ordenarlo según la fecha                                                                                                                     	| F2     	|
|      Crear Tag      	| Crear un tag con los campos nombre, color, imagen, slug, descripcion, metadata.                                                                                                                                                     	| F3     	|
|     Crear Página    	| Crear una página con los campos titulo y contenido (texto plano, WYSYWIG, embebidos, archivos, etc), y su estado (borrador, publicado, publicación programada), acceso (miembros, miembros pagos, publico), asignarle tags, y metadata 	| F4     	|
|    Listar Paginas   	| Visualizar una lista de paginas creadas y filtrarla según estado, acceso, autores, tags y ordenarlo según la fecha                                                                                                                  	| F5     	|
|    Crear Miembro    	| Crear un miembro con los campos nombre, correo, labels, nota y si se encuentra o no suscrito al "newsletter"                                                                                                                        	| F6     	|
|   Listar Miembros   	| Visualizar una lista de miembros creados y aplicar uno o más filtros en cualquiera de sus campos (es, contiene, empieza con, termina con)                                                                                           	| F7     	|
| Inyección de Código 	| Inyectar código HTML5 en el inicio y final de la página                                                                                                                                                                             	| F8     	|

## Ghost versión 3.42.9 (Utilizada para VRT)

### Funcionalidades

| Funcionalidad    	  | Descripcion                                                                                                                                                                                                                         	       | Código 	  |
|:-------------------:|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|
|  Crear Post     	   | Crear un post con los campos título y contenido (texto plano, WYSYWIG, embebidos, archivos, etc), y su estado (borrador, publicado, publicación programada), acceso (miembros, miembros pagos, publico), asignarle tags y metadata    	     | F1     	  |
|  Listar Posts    	  | Visualizar una lista de posts creados y filtrarlos según estado, acceso, autores, tags y ordenarlo según la fecha                                                                                                                     	     | F2     	  |
|  Crear Tag      	   | Crear un tag con los campos nombre, color, imagen, slug, descripcion, metadata.                                                                                                                                                     	       | F3     	  |
|  Crear Página    	  | Crear una página con los campos titulo y contenido (texto plano, WYSYWIG, embebidos, archivos, etc), y su estado (borrador, publicado, publicación programada), acceso (miembros, miembros pagos, publico), asignarle tags, y metadata 	    | F4     	  |
| Listar Paginas   	  | Visualizar una lista de paginas creadas y filtrarla según estado, acceso, autores, tags y ordenarlo según la fecha                                                                                                                  	       | F5     	  |
| Crear Miembro    	  | Crear un miembro con los campos nombre, correo, labels, nota y si se encuentra o no suscrito al "newsletter"                                                                                                                        	       | F6     	  |
| Inyección de Código | Inyectar código HTML5 en el inicio y final de la página                                                                                                                                                                                     | F8        |
