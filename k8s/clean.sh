#set -e
./undeploy.sh
remote_sudo.sh 'rm -rf /data/logs/erp'
remote_sudo.sh 'rm -rf /data/logsdb/erp'
remote_sudo.sh 'rm -rf /data/postgres/erp'
remote_sudo.sh 'rm -rf /data/.erp'
#./deploy.sh
