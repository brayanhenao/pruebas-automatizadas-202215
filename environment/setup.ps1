### Verify if Java is installed

$java = Get-Command java -ErrorAction SilentlyContinue
if ($java -eq $null)
{
    Write-Host "Java is not installed. Installing Java..."
    Install-Chocolatey
    choco install jre8 -y

    $java = Get-Command java -ErrorAction SilentlyContinue
    if ($java -eq $null)
    {
        Write-Host "Java installation failed. Please install Java manually and try again."
        exit
    }
}

### Verify if JAVA_HOME is set

if ($env:JAVA_HOME -eq $null)
{
    Write-Host "JAVA_HOME is not set. Setting JAVA_HOME..."
    $javaHome = $java.Path.Substring(0,$java.Path.LastIndexOf("\bin\java.exe"))
    setx JAVA_HOME $javaHome
}

### Install node version from .nvmrc

$nodeVersion = Get-Content .nvmrc
Write-Host "Installing node version $nodeVersion..."
nvm install $nodeVersion
nvm use $nodeVersion

### Install npm global packages

Write-Host "Installing npm global packages..."
Install-NPM-Packages

### Install ADB

Install-ADB

function Install-NPM-Packages
{
    ### Verify if kraken-node is installed globally

    $krakenNode = Get-Command kraken-node -ErrorAction SilentlyContinue
    if ($krakenNode -eq $null)
    {
        Write-Host "kraken-node is not installed. Installing kraken-node..."
        npm install -g kraken-node
    }

    ### Verify if appium is installed globally

    $appium = Get-Command appium -ErrorAction SilentlyContinue
    if ($appium -eq $null)
    {
        Write-Host "appium is not installed. Installing appium..."
        npm install -g appium
    }
}

function Install-ADB
{
    ### Verify if adb is installed

    $adb = Get-Command adb -ErrorAction SilentlyContinue
    if ($adb -eq $null)
    {
        Write-Host "adb is not installed. Installing adb..."
        choco install android-sdk -y
        $androidHome = $env:ANDROID_HOME
        $platformTools = "$androidHome\platform-tools"
        $tools = "$androidHome\tools"
        $toolsBin = "$androidHome\tools\bin"
        $path = "$platformTools;$tools;$toolsBin"
        setx PATH $path
    }
}


## Function that downloads and installs Chocolatey
function Install-Chocolatey
{
    Write-Host "Installing Chocolatey..."
    $chocoExe = Join-Path $env:TEMP "chocolatey.zip"
    $chocoInstall = Join-Path $env:TEMP "chocolatey"
    Invoke-WebRequest "https://chocolatey.org/install.ps1" -OutFile $chocoExe
    Expand-Archive $chocoExe $chocoInstall
    & $chocoInstall\chocolateyInstall.ps1
    Remove-Item $chocoExe -Force
    Remove-Item $chocoInstall -Force -Recurse
}

