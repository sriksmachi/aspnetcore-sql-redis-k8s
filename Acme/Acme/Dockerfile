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
ENV AppSettings:APIServer=apiserver
ENTRYPOINT ["dotnet", "Acme.dll"]

# docker run -d -p 8080:80 -e AppSettings:APIServer='http://172.26.136.1:81/' --name myacmeapp vishwanathsrikanth/acme:latest