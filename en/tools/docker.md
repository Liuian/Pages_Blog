# [Mac]透過Docker運行MSSQL
## 1. 到官網下載mac安裝包
- [Install Docker Desktop on Mac](https://docs.docker.com/desktop/setup/install/mac-install/#install-interactively)

## 2. 開啟Docker軟體，登入後確認記憶體是否有開到4GB以上
- ![image](/pages-blog/assets/images/tools/docker4.jpg)

## 3. Termial 下載MSSQL映像檔
`sudo docker pull mcr.microsoft.com/mssql/server:2022-latest`
- ![image](/pages-blog/assets/images/tools/docker3.jpg)

## 4. 啟動Linux container image
``` bash
sudo docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=<YourStrong@Passw0rd>" \
   -p 1433:1433 --name sql1 --hostname sql1 \
   -d \
   mcr.microsoft.com/mssql/server:2022-latest
```
完成後會在continers欄位看到"sql1"
- ![image](/pages-blog/assets/images/tools/docker2.jpg)

## 5. 確認安裝成功
```bash
sudo docker ps -a
```

- ![image](/pages-blog/assets/images/tools/docker1.jpg)

## 6. 更改密碼
```bash
sudo docker exec -it sql1 /opt/mssql-tools/bin/sqlcmd \
-S localhost -U SA \
 -P "$(read -sp "Enter current SA password: "; echo "${REPLY}")" \
 -Q "ALTER LOGIN SA WITH PASSWORD=\"$(read -sp "Enter new SA password: "; echo "${REPLY}")\""
```

## 7. 連到SQL Server
```bash
sudo docker exec -it sql1 "bash"
```
- 連進SQL CMD
```bash
/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "<YourNewStrong@Passw0rd>"
```

- 如果成功的話會看到 `1>`

## References
- [Docker: Install containers for SQL Server on Linux - SQL Server](https://learn.microsoft.com/en-us/sql/linux/quickstart-install-connect-docker?view=sql-server-ver16&pivots=cs1-bash&source=post_page-----2875e46a8bfa---------------------------------------&tabs=cli)
- [How to Install SQL Server Management Studio on a Mac](https://builtin.com/software-engineering-perspectives/sql-server-management-studio-mac?source=post_page-----2875e46a8bfa---------------------------------------)
- Reference from my own artical on medium: [[Mac]透過Docker運行MSSQL](https://medium.com/@LiuIan/mac-%E9%80%8F%E9%81%8Edocker%E9%81%8B%E8%A1%8Cmssql-2875e46a8bfa)
