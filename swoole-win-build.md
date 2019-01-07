# Use swoole on Windows

## cygwin

1. Download cygwin from sourceforge, install it with php7, nghttp2 and it's developement package with setup.exe (or package manager you like)
2. Use `pecl` to install swoole: `pecl install swoole`

## msys

1. Build php7 with pear phar and pecl: `(at php7 source directory)# ./configure --with-phar --enable-phar`
2. Use `pecl` to install swoole: `pecl install swoole`

## native (msvc)

not possible yet

## Windows Subsystem Linux (Win 10 1803)
