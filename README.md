# SignalR_Demo
Asp.net core 2.1 SignalR on Respberry Pi 3+ deploy by Docker.

# 必要條件
軟體：
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
2. 建立Hubs資料夾，並在其中建立StreamHub.cs，
  ```C#
  using System.Threading.Tasks;
  using Microsoft.AspNetCore.SignalR;

  namespace server.Hubs
  {
      public class StreamHub : Hub
      {
          // Client端呼叫GetStream
          public async Task GetStream(string ip, string port) {
              // Client端監聽ReceiveStream事件
              await Clients.All.SendAsync("ReceiveStream", ip, port);
          }

      }
  }
  ```
# 設定專案使用SignalR
1. 註冊服務開啟跨來源資源共用(CORS)，修改Startup.cs的ConfigureServices方法
  ``` C#
  services.AddCors(options => options.AddPolicy("CorsPolicy", 
            builder => 
            {
                // 權限全開
                builder
                    .AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials();
            }));
  ```
2. 註冊SignalR服務
  ```C#
  services.AddSignalR();
  ```
3. 設定CORS、SignalR服務
   ```C#
   app.UseCors("CorsPolicy");

   app.UseSignalR(routes => {
      routes.MapHub<StreamHub>("/streamHub");
   })
   ```
   
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
3. 在wwwroot/lib下建立"signalr"資料夾，將node_modules\@aspnet\signalr\dist\browser下的signalr.js複製到該資料夾下
4. 新增streaming.js至wwwroot/js/，程式碼如下：
  ```javascript
  "use strict";
// 建立SignalR連線
var connection = new signalR.HubConnectionBuilder()
                    // 要改成動態傳入ip、port參數
                    .withUrl("http://10.192.200.174:8081/streamHub")
                    .build();
console.log(connection);
// 監聽Server端發出的ReceiveStream事件，取得事件回傳的資訊並處理
connection.on("ReceiveStream", function (ip, port) {
    var encodedMsg = `Get ${ip}:${port} streaming.`
    var li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById("messagesList").appendChild(li);
});

connection.start().catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("ipInput").value;
    var message = document.getElementById("portInput").value;
    connection.invoke("GetStream", user, message).catch(function (err) {
        return console.log(err);
    });
    event.preventDefault();
});
  ```
# 準備Server端與Client端Dockerfile
1. 在資料夾下新增Dockerfile檔案
2. 依照專案名稱調整Dockerfile檔案內容
  ``` Dockerfile
  FROM microsoft/dotnet:2.1-sdk AS build-env
  WORKDIR /app

  # copy csproj and restore as distinct layers
  COPY *.csproj ./
  RUN dotnet restore

  # copy everything else and build
  COPY . ./
  RUN dotnet publish -c Release -r linux-arm -o out

  # build runtime image
  # Stretch is the development codename for Debian 9
  # Respberry 
  FROM microsoft/dotnet:2.1.2-runtime-stretch-slim-arm32v7
  WORKDIR /app
  COPY --from=build-env /app/out ./
  
  # 專案名稱為client、server，或其他專案名稱
  # Respberry上需用CMD，不可用Endpoint，否則找不到執行路徑
  CMD ["dotnet", "[專案名稱].dll"]
  ```
3.


# 重要連結
1. [在樹莓派(Raspberry PI)中使用Docker運行aspnetcore/dotnetcore 應用](https://hk.saowen.com/a/a0c4f1f9b45866d9934fc0b56cf2db6eae68b33bd9bb3207f0b0ed0e48eb0a32)自行編譯dotnet core 2.1版本映像檔
