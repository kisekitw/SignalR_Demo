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
CMD ["dotnet", "client.dll"]