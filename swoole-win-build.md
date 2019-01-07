# Use swoole on Windows

## cygwin

1. Download cygwin from sourceforge, install it with php7, nghttp2 and it's developement package with setup.exe (or package manager you like)
2. Use `pecl` to install swoole: `pecl install swoole`

## msys

1. Build php7 with pear phar and pecl: `(at php7 source directory)# ./configure --with-pear --enable-phar`
2. Use `pecl` to install swoole: `pecl install swoole`

## native (msvc)

not possible yet

## Windows Subsystem Linux (Win 10 1607+, Win Server 1709+, Win 10 LTSC 2019+)

just use like on linux:

1. enable wsl: [Win 10(client)](https://docs.microsoft.com/en-us/windows/wsl/install-win10) [Win Server/LTSC](https://docs.microsoft.com/en-us/windows/wsl/install-on-server)
2. on `bash` use your package manager install dependencies, then install, for example:
(on Win 10 1809, with debian distro)
```bash
sudo apt install php=1:7.0+49 php-dev=1:7.0+49 libnghttp2=1.18.1-1
# input passphare when prompt
# use pecl:
pecl install swoole
# from source:
# clone from github or oschina
git clone $upstream swoole-src
cd swoole-src
./make.sh
sudo make install
# benchmark it
php -dextension=swoole.so benchmark/benchmark.php
```
