FROM microsoft/aspnetcore:1.1 AS base
WORKDIR /app
EXPOSE 80

FROM microsoft/aspnetcore-build:1.1 AS build
WORKDIR /src
COPY AngularApp/AngularApp.csproj AngularApp/
RUN dotnet restore AngularApp/AngularApp.csproj
COPY . .
WORKDIR /src/AngularApp
RUN dotnet build AngularApp.csproj -c Release -o /app

FROM build AS publish
RUN dotnet publish AngularApp.csproj -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "AngularApp.dll"]
