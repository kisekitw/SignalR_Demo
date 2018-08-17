# # This Dockerfile uses nightly preview builds for .NET Core
# # It will be updated to .NET Core 2.2 shortly
# FROM microsoft/dotnet-nightly:2.1-sdk AS build
# WORKDIR /app

# # copy csproj and restore as distinct layers
# COPY *.csproj ./
# RUN dotnet restore

# # copy everything else and build app
# COPY . ./
# WORKDIR /app/
# RUN dotnet publish -c Release -o out -r linux-arm


# FROM microsoft/dotnet-nightly:2.1-aspnetcore-runtime AS runtime
# WORKDIR /app
# COPY --from=build /app/out .
# ENTRYPOINT ["dotnet", "server.dll"]
# ---------------------------------------------v2
FROM microsoft/dotnet:2.1-sdk AS build-env
WORKDIR /app

# copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore

# copy everything else and build
COPY . ./
RUN dotnet publish -c Release -r linux-arm -o out

# build runtime image
FROM microsoft/dotnet:2.1.2-runtime-stretch-slim-arm32v7
WORKDIR /app
COPY --from=build-env /app/out ./
CMD ["dotnet", "server.dll"]
