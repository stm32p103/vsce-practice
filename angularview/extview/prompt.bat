set NPM_DIR=E:\node\9_5_0\npm_global
set NODE_DIR=E:\node\9_5_0
set MY_GIT_DIR=C:\Program Files\Git\bin
set PYTHON=E:\Python\2_7\python.exe
set PYTHON_DIR=E:\Python\2_7
set GOPATH=I:\go
set GOROOT=E:\go\181206
set PATH=%NODE_DIR%;%NPM_DIR%;%MY_GIT_DIR%;%ANT_DIR%;%PYTHON_DIR%;%GOROOT%\bin;%PATH%

cd /d %~dp0
cmd /K npm config set prefix %NPM_DIR%


