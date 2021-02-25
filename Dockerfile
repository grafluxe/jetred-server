FROM mysql:8.0
ENV MYSQL_DATABASE="grafluxe_jetred"
ENV MYSQL_USER="testUsr"
ENV MYSQL_PASSWORD="testPwd"
ENV MYSQL_ALLOW_EMPTY_PASSWORD="yes"
CMD [\
  "--character-set-server=utf8",\
  "--collation-server=utf8_general_ci",\
  "--skip-character-set-client-handshake"\
]
COPY ./setup/tables /docker-entrypoint-initdb.d/
