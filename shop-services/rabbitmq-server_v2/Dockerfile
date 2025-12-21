FROM rabbitmq:3.8.0-management

COPY rabbitmq.conf /etc/rabbitmq/
ENV RABBITMQ_NODENAME=rabbit@localhost

# Load env vars
ENV RABBITMQ_DEFAULT_USER=${RABBITMQ_DEFAULT_USER}
ENV RABBITMQ_DEFAULT_PASS=${RABBITMQ_DEFAULT_PASS}
ENV RABBITMQ_ERLANG_COOKIE=${RABBITMQ_ERLANG_COOKIE}

RUN chown rabbitmq:rabbitmq /etc/rabbitmq/rabbitmq.conf

USER rabbitmq:rabbitmq
