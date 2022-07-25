from dataclasses import field
from email.policy import default
from enum import unique
from uuid import uuid4
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from sqlalchemy import ForeignKey, PickleType
from sqlalchemy import Integer


db = SQLAlchemy()
ma = Marshmallow()

def get_uuid():
    return uuid4().hex

class User(db.Model):
    __tablename__ = 'users'
    # id = db.Column(db.Integer, unique=True, primary_key=True)
    #id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    username = db.Column(db.String(100), unique=True, primary_key=True)
    id = db.Column(db.String(32), unique=True, default=get_uuid)
    password = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100))
    question = db.Column(db.String(100))
    

class UsersSchema(ma.Schema):
    class Meta:
        fields = ('id','username', 'password', 'email')


class Story(db.Model):
    __tablename__ = 'stories'
    title = db.Column(db.String(100), unique=True, primary_key=True)
    story = db.Column(db.Text)
    level = db.Column(db.String(100), nullable=False)
   

class StoriesSchema(ma.Schema):
    class Meta:
        fields = ('title','story', 'level')


class PersonalStory(db.Model):
    __tablename__ = 'personal_stories'
    username = db.Column(db.String(100),unique=True, primary_key=True)
    # list_title = db.Column(db.PickleType,nullable=False)
    # list_story = db.Column(db.PickleType,nullable=False)
    title = db.Column(db.String(100))
    story = db.Column(db.Text)
   

class PersonalStoriesSchema(ma.Schema):
    class Meta:
        fields = ('username','title', 'story')


class Words(db.Model):
    __tablename__ = 'words'
    username = db.Column(db.String(100),unique=True, primary_key=True)
    words_list_general = db.Column(db.PickleType,nullable=False)
    words_list_translating = db.Column(db.PickleType,nullable=False)
    words_list_reading = db.Column(db.PickleType,nullable=False)
    words_dict = db.Column(db.PickleType,nullable=False)
    dict_title_grade = db.Column(db.PickleType,nullable=False)

    
class WordsSchema(ma.Schema):
    class Meta:
        fields = ('username','words_list_general','words_list_translating','words_list_reading','words_dict','dict_title_grade')


class Report(db.Model):
    __tablename__ = 'report'
    username = db.Column(db.String(100),unique=True, primary_key=True)
    current_level = db.Column(db.String(100))

class ReportSchema(ma.Schema):
    class Meta:
        fields = ('username','current_level')
    