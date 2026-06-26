FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY . .

RUN dotnet restore TransactionSimulator.API/TransactionSimulator.API.csproj
RUN dotnet publish TransactionSimulator.API/TransactionSimulator.API.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "TransactionSimulator.API.dll"]