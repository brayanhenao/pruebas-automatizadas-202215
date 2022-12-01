# Ghost E2E Testing - MISW4103 - Cypress

# Instalación

Asegurarse que se encuentra en el directorio `./cypress`  (NO `./cypress/cypress`), utilizando una versión reciente de node (14 o superior) y su respectiva versión de npm

```
 npm install
```

Modificar el archivo [admin.json](cypress/fixtures/admin.json) con las credenciales correspondientes a su instalación local de `ghost`
```
{
	"user": "admin@test.com",
	"password": "Pa$$word123"
}

```
Verificar que ghost está corriendo en el puerto 2368 o 2369.

# Ejecución

Se proveen 2 scripts para la ejecución de pruebas:

Ejecución Headless (Recomendado)
```
 npm run test
```

Ejecución Headed
```
 npm run test:headed
```

### Screenshots

Además de los reportes, los features generan screenshots del paso a paso. Estos pueden ser encontrados en la
carpeta `screenshots/`  en la cual, luego de la ejecución, se encontrará una carpeta por cada feature corrido
con los screenshots de cada escenario.

------

## Generación de Datos
Se añaden 3 estrategias de generación de datos (i) pool de datos a-priori, (ii) pool de datos (pseudo) aleatorio dinámico y (iii) escenario aleatorio, mediante el uso de faker.js así como de [herramientas](cypress/helpers/) para la generación automática de datos basado en las entidades requeridas en las suites de pruebas establecidas.

### Generación de datos a-priori
Para ejecutar las pruebas con datos apriori es necesario ejecutar el siguiente comando, el cual generará el archivo [data-pool.json](/cypress/fixtures/data-pool.json)
```
 npm run data-pool:generate
```
*Nota:* este comando tiene preconfigurada una semilla `2000` para garantizar la estabilidad de los tados, pero puede configurarse con cualquier valor, hace uso de la generación de `Pool de datos (pseudo) aleatorio dinámico` pero almacenando un archivo estático persistente todo el tiempo

### Pool de datos (pseudo) aleatorio dinámico
Para esta estrategia se crearon 2 funciones por cada interfaz: `generateManyValidEntity` y `generateManyInvalidValidEntity` (donde `Entity` corresponde al nombre de cada entidad), el primero recibe cómo parámetro la cantidad de entradas validas que se desean generar mientras que el segundo retorna todas las posibles combinaciones de datos invalidos de la siguiente manera:

- Válidos: Para esta estrategia se generaron funciones que retornan instancias de cada entidad con sus datos generados semialeatoriamente, usando como valores de referencia sus otros valores asignados
- Inválidos:
  - Tipos de datos incorrectos: Itera por cada una de los atributos de cada entidad asignándole cada uno de los 8 tipos disponibles en el generador: (`bigInt`,`boolean`,`email`,`null`,`number`,`json`,`string`,`text`,`word` y `date`) asignando todos los que no correspondan al tipo correcto
  - Ausencia de atributos: Itera por cada uno de los atributos en cada entidad, eliminando cada una de ellos, creando así nuevas entradas pero con 1 atributo eliminado
  - Casos de borde: itera por cada uno de los campos que tienen valores máximos (`m`) y retorna los casos para `m-1`, `m` y `m+1`


	De esta forma se generan multiples escenarios cuya cantidad varía según la entidad seleccionada de la siguiente forma

	| Entidad       	| Tipo de dato incorrecto (total atributos * total tipos de dato -1)  	| Ausensia de atributos (Total atributos) 	| Casos de borde (total atributos con máximo * 3) 	|
	|---------------	|---------------------------------------------------------------------	|-----------------------------------------	|-------------------------------------------------	|
	| Member        	| 46                                                                  	| 5                                       	| 12                                              	|
	| Post          	| 94                                                                  	| 9                                       	| 12                                              	|
	| Page          	| 94                                                                  	| 9                                       	| 12                                              	|
	| Tag           	| 37                                                                  	| 4                                       	| 9                                               	|
	| CodeInjection 	| 18                                                                  	| 2                                       	| 6                                               	|

	*Total Posibles Escenarios a Generar* = 369

### Escenario Aleatorio
Esta estrategia hace uso directo de la librería faker.js, sin semilla definida y sin relación de datos, aumentando así la aleatoriedad de las salidas generadas.



