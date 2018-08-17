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
3. 在wwwroot/lib下建立"signalr"資料夾，將ode_modules\@aspnet\signalr\dist\browser下的signalr.js複製到該資料夾下
