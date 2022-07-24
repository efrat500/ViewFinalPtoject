from tkinter.tix import Tree
from dotenv import load_dotenv
import os
import redis

load_dotenv()


class ApplicationConfig:

    SECRET_KEY = os.environ["SECRET_KEY"]
    #stop useless messages
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # SQLALCHEMY_ECHO = True
    SQLALCHEMY_DATABASE_URI = 'mysql://root@localhost/flaskdb'

    SESSION_TYPE = "redis"
    SESSION_PERMANENT = False
    SESSION_USE_SIGNE = True
    SESSION_REDIS = redis.from_url("redis://127.0.0.1:6379")
