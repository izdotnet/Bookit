FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["Bookit.Api/Bookit.Api.csproj", "Bookit.Api/"]
RUN dotnet restore "Bookit.Api/Bookit.Api.csproj"
COPY . .
WORKDIR "/src/Bookit.Api"
RUN dotnet build "Bookit.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Bookit.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Bookit.Api.dll"]