ssh -t admin@111.111.11.111  -i ../keys/server-key "cd /opt/server && git restore . && git pull ; yarn restart"

