# SignalR_Demo
Asp.net core 2.1 SignalR on Respberry Pi 3+ deploy by Docker.

# 必要條件
安裝下列軟體：
* [.NET Core SDK 2.1或更新版本](https://www.microsoft.com/net/core)
* [Visual Studio Code](https://code.visualstudio.com/download)
* [C# for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode.csharp)
* [npm](https://www.npmjs.com/get-npm)(Node.js的套件管理員)

硬體：
* Raspberry Pi 3+ with Docker environment * 2(client and server)
* [Docker](http://blog.itist.tw/2017/06/how-to-install-docker-ce-with-raspbian-jessie.html)

# 於本機建立裝載 SignalR 用戶端和伺服器的 ASP.NET Core 專案
1. 建立signalR_Demo，並在其中分別建立server、client資料夾

# Server端
1. 在[整合式終端機]執行下列指令
  ```dotnet cli
    dotnet new webapp
  ```
2. 

# Client端
1. 在[整合式終端機]執行下列指令
  ```dotnet cli
    dotnet new webapp
  ```
2. 使用npm安裝JavaScript用戶端程式
  ```npm
  npm init -y
  npm install @aspnet/signalr
  ```
3. 在wwwroot/lib下建立"signalr"資料夾，將
