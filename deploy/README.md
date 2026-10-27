# Oracle Cloud VM 部署手冊

正式來源分支是 `rebuild`，網站由 GitHub Actions 建置並部署至 `161.33.175.126`。VM 只負責 Caddy 靜態檔案服務。以下操作需由有 VM、Cloudflare 與 GitHub repository 管理權限的人執行；先記錄現況，再切換流量。

## 1. VM 與網路

1. 用既有的 `opc` 管理金鑰登入 VM，辨識系統版本，檢查 `sudo ss -ltnp | grep -E ':(80|443)\b'`。若埠已被占用，先確認既有服務與用途，再調整配置。
2. 建立專用帳號及目錄，授權部署帳號寫入版本目錄。以下命令須在 VM 上以具備 sudo 權限的帳號執行：

   ```sh
   sudo useradd --create-home --shell /bin/bash wormdeploy
   sudo install -d -o wormdeploy -g wormdeploy -m 755 /srv/wormbakery
   sudo install -d -o wormdeploy -g wormdeploy -m 755 /srv/wormbakery/releases
   sudo install -d -o wormdeploy -g wormdeploy -m 700 /home/wormdeploy/.ssh
   sudo touch /home/wormdeploy/.ssh/authorized_keys
   sudo chown wormdeploy:wormdeploy /home/wormdeploy/.ssh/authorized_keys
   sudo chmod 600 /home/wormdeploy/.ssh/authorized_keys
   ```

   產生**另一組只供 Actions 部署使用**的 Ed25519 金鑰；將公鑰加入 `authorized_keys`，私鑰填入 GitHub secret `VM_SSH_PRIVATE_KEY`。不把管理員私鑰或任何私鑰放進倉庫。部署帳號不需 sudo。將該帳號的 SSH 登入限制在所需來源；若採 GitHub hosted runner，來源 IP 可能變動，需依組織網路政策決定限制方式。SSH 仍保留管理員的必要來源。

3. 安裝 `caddy`、`rsync`、`coreutils`。依 VM 的發行版使用 [Caddy 官方安裝步驟](https://caddyserver.com/docs/install)，先以 `caddy version`、`rsync --version`、`sha256sum --version` 確認。Caddy 服務帳號必須能讀取 `/srv/wormbakery/current` 與其版本目錄。若 VM 啟用 SELinux，也要確認 `/srv/wormbakery` 的安全標籤允許 Caddy 讀取，不能僅靠 Unix 權限判斷。
4. 在 OCI VCN 的 subnet security list 或 NSG，以及 VM 的防火牆，開放外部 TCP 80/443。確認雲端與主機兩層規則；不要為了網站開放其他埠。Caddy 取得公開憑證需要網域指向 VM 且 80/443 可達。
5. 先把本目錄的 `Caddyfile.preflight` 安裝為 `/etc/caddy/Caddyfile`，執行 `sudo caddy validate --config /etc/caddy/Caddyfile` 後啟動或重載 Caddy。初次部署前 `current` 尚不存在，網站暫時回 404 是預期情況。

## 2. GitHub Actions 的 SSH 信任設定

- `VM_SSH_PRIVATE_KEY`：專用部署金鑰的完整私鑰內容。
- `VM_SSH_KNOWN_HOSTS`：**已透過另一可信管道核對指紋**的 VM SSH 主機公鑰紀錄，格式如 `161.33.175.126 ssh-ed25519 AAAA...`。可用 `ssh-keyscan -t ed25519 161.33.175.126` 取得候選紀錄，再於 VM 主控台讀取 `/etc/ssh/ssh_host_ed25519_key.pub` 或其指紋，比對一致後才存入 secret。不能直接信任未核對的 `ssh-keyscan` 輸出。
- `NOTION_TOKEN` 與 `NOTION_DATA_SOURCE_ID` 沿用原有設定。

`workflow_dispatch` 與每日 `schedule` 都要求 workflow 存在**預設分支**。目前預設分支是 `main`，且 `main` 沒有 `.github/workflows/deploy.yml`。手動觸發和每日更新前，須將 `rebuild` 設為預設分支，或將同一 workflow 同步到 `main`。若採後者，必須保持 `checkout ref: rebuild`，並在往後修改部署流程時同步兩份檔案。若無法完成此項，手動與每日排程驗收尚未成立。參見 [GitHub 手動觸發規則](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/manually-run-a-workflow)及[排程事件規則](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule)。

手動觸發一次 workflow，確認 `Activated release <run-id>-<attempt>` 出現在部署日誌。部署失敗會在切換 `current` 前中止，既有版本仍在服務中。檢查 `readlink /srv/wormbakery/current`、`sudo journalctl -u caddy -n 100 --no-pager` 及 Actions 執行日誌。

## 3. DNS 切換

1. 在 Cloudflare 記錄 `@`、`www` 的現有 A/AAAA/CNAME 值、TTL 與代理狀態，並檢查有無仍指向 GitHub Pages 的衝突記錄。保留舊 Pages 作為短期回復途徑。2026-10-27 從本機 DNS resolver 查到的舊值為 `@` A：`185.199.108.153`、`185.199.109.153`、`185.199.110.153`、`185.199.111.153`（TTL 300），`www` CNAME：`bread806.github.io`（TTL 300），未查到 `@` AAAA。此紀錄僅供對照；切換前仍須在 Cloudflare 控制台核對權威設定與代理狀態。
2. 先用暫時的 HTTP Caddyfile 及指定 Host header 測試 VM，包含首頁、各路由與實際資源：

   ```sh
   curl -fsS -H 'Host: wormbakery.com' http://161.33.175.126/ -o /dev/null
   curl -fsS -H 'Host: wormbakery.com' http://161.33.175.126/works/ -o /dev/null
   curl -fsS -H 'Host: wormbakery.com' http://161.33.175.126/profile/ -o /dev/null
   ```

   另從 `dist/` 找到一張實際圖片和一個音訊資源 URL 逐一測試；若音訊由外部平台提供，則在瀏覽器確認其播放。
3. 把正式的 `deploy/Caddyfile` 安裝到 `/etc/caddy/Caddyfile`，執行 `sudo caddy validate --config /etc/caddy/Caddyfile`、`sudo systemctl reload caddy`。將 Cloudflare 主網域 A 記錄改為 `161.33.175.126`，`www` 設為指向主網域的 CNAME；移除同名且指向舊站的衝突 A/AAAA/CNAME。初次切換設為 **DNS only**，等 Caddy 取得正式憑證。
4. 驗證 `curl -IL http://wormbakery.com/`、`curl -IL http://www.wormbakery.com/works/` 與 `curl -I https://wormbakery.com/`，確認最後落在主網域 HTTPS。逐頁檢查 `/`、`/profile/`、`/works/`、`/sns/`、`/commission/` 與實際圖片、音訊。在瀏覽器檢查混合內容與破圖。HTTPS 正常後，若要啟用 Cloudflare 代理，SSL/TLS 模式須為 **Full (strict)**。

## 4. 回復與收尾

部署版本位於 `/srv/wormbakery/releases/<run-id>-<attempt>`。若新版本有問題，在 VM 上切回已驗證的上一版：

```sh
sudo -u wormdeploy ln -s releases/<previous-id> /srv/wormbakery/.rollback
sudo -u wormdeploy mv -Tf /srv/wormbakery/.rollback /srv/wormbakery/current
```

確認 `readlink /srv/wormbakery/current` 並重新測試網站。若 VM 或 HTTPS 故障，先依第 3 節記錄的原值還原 Cloudflare DNS；舊 Pages 在遷移穩定前應繼續可用。新站、手動部署與每日排程均驗證成功後，才在 GitHub Settings → Pages 停用發布並移除自訂網域設定。保留至少一個已知正常的舊版本目錄。
