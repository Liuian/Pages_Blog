## 建置環境
1. 安裝 `jabba` - 環境管理工具
    - 執行 `iwr -useb https://github.com/shyiko/jabba/raw/master/install.ps1 | iex`
    - 安裝位置 `C:\Users\{account}\.jabba`
    - 關閉 powershell 並重開，確認jabba有裝成功
    -   ```bash
        >> jabba --version
        0.11.2
        ```
        
2. 用 `jabba` 安裝 `java 8`
    - 安裝java 8
        ```bash
        jabba install adopt@1.8.0-292
        ```
    - 切換版本
        ```
        jabba use temurin@1.8.0-292
        ```
    - 確認版本
        ```
        >> java -version
        openjdk version "1.8.0_292" 
        OpenJDK Runtime Environment (AdoptOpenJDK)(build 1.8.0_292-b10)
        OpenJDK 64-Bit Server VM (AdoptOpenJDK)(build 25.292-b10, mixed mode)
        ```

3. 安裝 `gradle`
    - 安裝 `scoop`
        ```bash
        iwr -useb get.scoop.sh | iex
        ```
    - 用 Scoop 安裝 Gradle：
        ```
        scoop install gradle
        ```
    - 安裝完成後，輸入以下確認 Gradle 安裝成功及版本。
        ```
        >> gradle -v
        ```

4. 在vsCode中執行
    - 確認 VS Code 使用的 Java 版本 - 打開 VS Code 的命令面板（Ctrl+Shift+P），輸入以下指令並執行：
        ```
        Java: Configure Java Runtime
        ```

5. 執行java
    - 先在專案目錄執行
        ```
        gradle wrapper
        ```
    - 執行專案
        ```
        .\gradlew.bat run --args="..."
        ```