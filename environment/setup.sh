# /env/bin/bash

## Function that setups the environment for the project (Using macOS)
function setup_env_macos {

    ## Verify java
    if ! command -v java &> /dev/null
    then
        echo "Java could not be found. Installing Java..."
        brew install openjdk
    else
        echo "Java is already installed"
    fi

    ## Verify JAVA_HOME is set
    if [ -z "$JAVA_HOME" ]; then
        echo "JAVA_HOME is not set. Setting JAVA_HOME..."
        export JAVA_HOME="$(/usr/libexec/java_home)"
    else
        echo "JAVA_HOME is already set"
    fi

    ## Verify Node
    nvm install $(cat .nvmrc)
    nvm use $(cat .nvmrc)

    setup_env_npm

    ## Verify ADB
    if ! command -v adb &> /dev/null
    then
        echo "ADB could not be found. Installing ADB..."
        brew install android-platform-tools
    else
        echo "ADB is already installed"
    fi
}

## Function that setups the environment for the project (Using Linux)
function setup_env_linux {

    ## Verify java
    if ! command -v java &> /dev/null
    then
        echo "Java could not be found. Installing Java..."
        sudo apt install openjdk-11-jdk
    else
        echo "Java is already installed"
    fi

    ## Verify JAVA_HOME is set
    if [ -z "$JAVA_HOME" ]; then
        echo "JAVA_HOME is not set. Setting JAVA_HOME..."
        export JAVA_HOME="$(/usr/libexec/java_home)"
    else
        echo "JAVA_HOME is already set"
    fi

    ## Verify Node
    if ! command -v node &> /dev/null
    then
        echo "Node could not be found. Installing Node..."

        ## Install node version from .nvmrc
        nvm install $(cat .nvmrc)
        nvm use $(cat .nvmrc)
    else
        echo "Node is already installed"
    fi

    setup_env_npm

    ## Verify ADB
    if ! command -v adb &> /dev/null
    then
        echo "ADB could not be found. Installing ADB..."
        sudo apt install android-tools-adb
    else
        echo "ADB is already installed"
    fi
}

## Function that installs npm dependencies
function setup_env_npm {

    ## Verify if kraken-node is installed globally
    if ! command -v kraken-node &> /dev/null
    then
        echo "kraken-node could not be found. Installing kraken-node..."
        npm install -g kraken-node
    else
        echo "kraken-node is already installed"
    fi

    ## Verify if appium is installed globally
    if ! command -v appium &> /dev/null
    then
        echo "appium could not be found. Installing appium..."
        npm install -g appium
    else
        echo "appium is already installed"
    fi

    ## Verify if ghost-cli is installed globally
    if ! command -v ghost &> /dev/null
    then
        echo "ghost-cli could not be found. Installing ghost-cli..."
        npm install ghost-cli@latest -g
    else
        echo "ghost-cli is already installed"
    fi

    ## Setup ghost url to port 2368
    ghost config url http://localhost:2368
}

### Main function
main () {

    ## Verify if the OS is macOS
    if [[ "$OSTYPE" == "darwin"* ]]; then
        setup_env_macos
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        setup_env_linux
    else
        echo "OS not supported"
    fi
}

main