# Ghost E2E Visual Regression Testing - MISW4103 - Resemble

## Pre-requisitos

### NodeJS

Asegúrese de estar usando la versión de node especificada en el archivo [.nvmrc](../../.nvmrc)

## Instalación

En el directorio de resemble, instale los módulos necesarios con el comando

```bash
 npm install
```

## Ejecución

Para ejecutar el script de generación de las diferencias, ejecute el comando

```bash
 npm start
```

## Resultados

Los resultados del script son los siguientes:

- `images/diff` : Carpeta con las diferencias generadas por ResembleJS para cada Scenario.
- `report.html` : Reporte generado para mostar las diferencias de cada Scenario.

`Nota: Por defecto pueden encontrar unas imágenes de diferencia (resultado del testing) y el reporte html, así que para visualizar los resultados, no es mandatorio ejecutar el script.`
