FROM microsoft/dotnet:sdk AS build-env
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY . ./
RUN dotnet publish -c Debug -o out

# Build runtime image
FROM microsoft/dotnet:aspnetcore-runtime
WORKDIR /app
COPY --from=build-env /app/out .
ENV ConnectionString=sqlconnectionstring
ENV AppSettings:RedisConnectionString=redisconnectionstring
ENTRYPOINT ["dotnet", "Acme.API.dll"]

# docker run -d -p 8080:80 -e ConnectionString='Data Source=172.26.136.1;Initial Catalog=Acme;User ID=sa;Password=Password@123' -e AppSettings:RedisConnectionString='172.26.136.1:6379' --name myacmeapi acmeapi:sriks