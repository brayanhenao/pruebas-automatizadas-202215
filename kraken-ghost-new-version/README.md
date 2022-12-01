# Ghost E2E Testing - MISW4103

Esta configuración de Kraken está diseñada para la versión de Ghost 3.42.9 (Utilizada par VRTT)

## Prerrequisitos

### NodeJS

Asegúrese de estar usando la versión de node especificada en el archivo [.nvmrc](../.nvmrc)

## Instalación

En el directorio de kraken, instale los módulos necesarios con el comando

```bash
 npm install
```

## Config files

Modifique el archivo [properties.json](properties.json) con los datos:

```json
{
  "EMAIL": "<Email del usuario admin de su instalación local de ghost>",
  "PASSWORD": "<Password del usuario admin de su instalación local de ghost>",
  "GHOST_BASE_URL": "<URL de su instalación local de ghost (con puerto)>"
}
```

## Ejecución

Para ejecutar todos los features escritos para Kraken, utilice el comando

```bash
 npm run kraken
```

## Resultados

### Reports

Kraken genera un reporte de ejecución en la carpeta `reports/`

### Screenshots

Además de los reportes, los features generan screenshots del paso a paso. Estos pueden ser encontrados en la
carpeta `screenshots/`  en la cual, luego de la ejecución, se encontrará una carpeta por cada feature corrido
con los screenshots de cada escenario en el formato `SCENARIONUMBER_STEPNUMBER.png`