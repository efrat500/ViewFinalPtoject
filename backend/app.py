from dataclasses import field
from email.policy import default
from operator import ne
from posixpath import split
from turtle import title
from flask import Flask, jsonify, request, abort, session
from flask_session import Session 
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from pyparsing import Word
from sqlalchemy import JSON, Integer, update
from models import db, User, UsersSchema, StoriesSchema, Story, Words, WordsSchema, Report, ReportSchema, PersonalStory, PersonalStoriesSchema
from config import ApplicationConfig
from flask_bcrypt import Bcrypt
from googletrans import Translator
import speech_recognition as sr
import pyttsx3
import json
from difflib import SequenceMatcher
from io import BytesIO
import requests
import sounddevice as sd
from scipy.io.wavfile import write
import wavio as wv



app = Flask(__name__)
app.config.from_object(ApplicationConfig)


bcrypt = Bcrypt(app)
# server to current session and get data on this session
server_session = Session(app)
db.init_app(app)

with app.app_context():
    db.create_all()


###################### users ########################

user_schema = UsersSchema()
users_schema = UsersSchema(many=True)


@app.route("/@me")
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error":"Unauthorized" }),401
    
    user = User.query.filter_by(id=user_id).first()
    return jsonify({
        "id": user.id,
        "username": user.username
    })

# add new user
@app.route('/register', methods = ['POST'])
def register_user():
    print("new user is insert")
    username = request.json['username']
    password = request.json['password']
    email = request.json['email']
    question = request.json['question']

    username_exists = User.query.filter_by(username=username).first() is not None

    if username_exists:
        return jsonify({"error":"The username already exists" }),501

    email_exists = User.query.filter_by(email=email).first() is not None

    if email_exists:
        return jsonify({"error":"This email is already in use" }),501

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(username=username, password=hashed_password,email=email,question=question)
    db.session.add(new_user)

    new_user_words = Words(username=username, words_list_general=[], words_list_translating=[], words_list_reading=[], words_dict=dict(), dict_title_grade=dict())
    db.session.add(new_user_words)

    new_user_report = Report(username=username ,current_level='easy')
    db.session.add(new_user_report)

    db.session.commit()

    return jsonify({
        "id": new_user.id,
        "username": new_user.username,
        "words_general":  new_user_words.words_list_general,
        "words_translating": new_user_words.words_list_translating,
        "words_reading": new_user_words.words_list_reading, 
        "words_dict": new_user_words.words_dict,
    }),200


@app.route('/forgotpassword', methods = ['POST'])
def forgot_password():
    print('enter')
    username = request.json['username']
    email = request.json['email']
    question = request.json['question']
    print(username)
    print(email)
    print(question)
    requested_user = User.query.get(username)
    print("s")
    print(requested_user.username)
    print(requested_user.question)
    print(requested_user.email)
    if requested_user.username == username and requested_user.question == question and requested_user.email == email:
        return jsonify({
            "check": 'ok'
        }),200
    else:
        print('in else')
        return jsonify({
            "check": 'please try again!'
        }),200
# login to exists user

@app.route('/login', methods = ['POST'])
def login_user():
    username = request.json['username']
    password = request.json['password']
    print(username)
    print(password)
    user = User.query.filter_by(username=username).first() 
    print(user)
    # if the username isn't exists in the database
    if user is None:
        return jsonify({"error":"Unauthorized" }),502

    # if the password not correct
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error":"Unauthorized" }),503
    
    session["user_id"] = user.id

    return jsonify({
        "id": user.id,
        "username": user.username
    }),200

# change password
@app.route('/updatepassword', methods = ['PUT'])
def update_password():
    username = request.json['username']
    user = User.query.get(username)
    password = request.json['password']
    # if the username isn't exists in the database
    if user is None:
        return jsonify({"error":"Unauthorized" }),502
    else:
        hashed_password = bcrypt.generate_password_hash(password)
        user.password = hashed_password
        db.session.commit()
        return jsonify({
            "username": user.username
        }),200

# change username
@app.route('/updateusername', methods = ['PUT'])
def update_username():
    old_username = request.json['oldUsername']
    user = User.query.get(old_username)
    user_words = Words.query.get(old_username)
    new_username = request.json['newUsername']
    # if the username isn't exists in the database
    if user is None:
        return jsonify({"error":"Unauthorized" }),502
    else:
        user.username = new_username
        user_words.username = new_username
        db.session.commit()
        return jsonify({
            "id": user.id,
            "username": user.username,
            "username": user_words.username,
            "allWords": user_words.words_list
            
        }),200

###################### stories ########################
# add new story
@app.route('/addstory', methods = ['POST'])
def add_story():
    print("new story is insert")
    title = request.json['title']
    title_exists = Story.query.filter_by(title=title).first() is not None

    if title_exists:
        return jsonify({"error":"The story already exists, press again" }),501
    story = request.json['story']
    level = request.json['level']

    new_story = Story(title=title, story=story,level=level)
    db.session.add(new_story)
    db.session.commit()
    return jsonify({
        "title": new_story.title,
        "story": new_story.story
    }),200

@app.route('/addstoryadvenc', methods = ['POST'])
def add_story2():
    print("new story is insert")
    username = request.json['username']
    print(username)
    r = requests.get("https://shortstories-api.herokuapp.com/")
    s = r.text
    t = s.partition('"title":')[2]
    x = t.split(',')
    title = x[0].replace('"', "")
    l = s.partition('"story":')[2]
    story = l.partition('"moral":')[0]
    print(story)
    story = story.replace('\ "', "")
    story = story.replace('\, ', "")
    story = story.replace('"\"', "")
    story = story.replace('"', "")
    story = story.replace(',.', "")
    story = story.replace(':', "")
    final_story = story.replace('.,.', ".")
    print(story)
   
    # if the username is exists in PersonalStory
    username_exists = PersonalStory.query.filter_by(username=username).first() is not None
    # is exists
    if username_exists:
        requested_user = PersonalStory.query.get(username)
        requested_user.title = title
        requested_user.story = final_story
        db.session.commit()
    # no exists
    else:
        new_story = PersonalStory(username=username, title=title, story=final_story)
        db.session.add(new_story)
        db.session.commit()
    db.session.commit()
    
    return jsonify({
        "username": requested_user.username,
        "title": requested_user.title,
        "story": requested_user.story
    }),200

# get story by title
@app.route('/getstory', methods = ['POST'])
def get_story():
    print('get a new story')
    username = request.json['username']
    title_story = request.json['title_story']
    print(title_story)
    current_level = get_current_level(username)
    if current_level=='advanced':
        print("here")
        story_exists = PersonalStory.query.filter_by(title=title_story).first() is not None
        # is exists
        if story_exists:
            requested_story = PersonalStory.query.get(username)
        else:
            # if the story isn't exists in the database
            requested_story = Story.query.get(title_story)
    else:
        print("ddd")
        requested_story = Story.query.get(title_story)
    print(requested_story)
    # if the story isn't exists in the database
    # line = "<html><head>"
    # d = ">"
    # s =  [e+d for e in line.split(d) if e]
    # print(s)
    d = "."
    storyInArray = [s+d for s in requested_story.story.split('.') if s]
    # storyInArray.pop()
    storyInList = list(storyInArray)
    print(storyInArray)
    return jsonify({
        "title": requested_story.title,
        "story": storyInArray
    }),200
    # return jsonify(json_dict)
        
personal_story_schema = PersonalStoriesSchema()
personal_stories_schema = PersonalStoriesSchema(many=True)

story_schema = StoriesSchema()
stories_schema = StoriesSchema(many=True)


@app.route('/getallstories', methods = ['POST'])
def get_all_stories():
    print('4')
    current_level = request.json['current_level']
    username = request.json['username']
    print(current_level)
    if current_level=='advanced':
        missing = PersonalStory.query.filter_by(username=username)
        print("missing= " + missing)
        results = personal_stories_schema.dump(missing)
    else:
        missing = Story.query.filter_by(level=current_level)
        print(missing)
        results = stories_schema.dump(missing)
    return jsonify(results)


# delet story
@app.route('/deletestory', methods = ['POST'])
def delete_user(): 
    title_story = request.json['title_story']
    delete_story = Story.query.get(title_story)
    if delete_story is None:
        return jsonify({"error":"Unauthorized" }),502
    db.session.delete(delete_story)
    db.session.commit()
    return story_schema.jsonify(delete_story)

###################### words ########################

words_schema = WordsSchema()
allwords_schema = WordsSchema(many=True)

@app.route('/adduserwords', methods = ['POST'])
def add_userwords():
    print("new word is insert")
    username = request.json['username']
    new_user = Words(username=username, words_list=[])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({
        "username": new_user.username,
        "words": new_user.words_list
    }),200


# add new word
@app.route('/addwordpostman', methods = ['POST'])
def add_word_postman():
    username = request.json['username']
    title_story = request.json['title_story']
    new_word = request.json['new_word']
    requested_user = Words.query.get(username)
    in_dict = False
    in_general_list = False

    if requested_user is None:
        return jsonify({"error":"Unauthorized" }),502

    if title_story in requested_user.words_dict:
        if new_word in requested_user.words_dict[title_story]:
            print("in_dict = True")
            in_dict = True
        else:
            print('the word not in the dict')
            requested_user.words_dict[title_story].append(new_word)
            print("upadte dict" + str(requested_user.words_dict))
    else:
        print("the title not in the dict")
        requested_user.words_dict[title_story] = [new_word]
        print("upadte dict" + str(requested_user.words_dict))
    
    # the word is in the dict already
    if in_dict:
        print("if of the word in dict")
        return jsonify({
            "username": requested_user.username,
            "words_list_general": requested_user.words_list_general,
            "words_translating": requested_user.words_list_translating,
            "words_reading": requested_user.words_list_reading, 
            "words_dict": requested_user.words_dict
        }),200

     #  if the word is in the general list already
    if new_word not in requested_user.words_list_general:
        print("not in list general")
        # update general list
        general_words = list(requested_user.words_list_general)
        general_words.append(new_word)
        requested_user.words_list_general = general_words
        print("upadte general" + str(requested_user.words_list_general))
        
        # update translating list
        translating_words = list(requested_user.words_list_translating)
        translating_words.append(new_word)
        requested_user.words_list_translating = translating_words
        print("upadte translating" + str(requested_user.words_list_translating))
        
        # update reading list
        reading_words = list(requested_user.words_list_reading)
        print("reaging dict")
        print(new_word)
        reading_words.append(new_word)
        requested_user.words_list_reading = reading_words
        print("upadte reading" + str(requested_user.words_list_reading))
    
    print("upadte dict" + str(requested_user.words_dict))
    new = Words(username=username, words_list_general=requested_user.words_list_general, words_list_translating=requested_user.words_list_translating, words_list_reading=requested_user.words_list_reading, words_dict=requested_user.words_dict, dict_title_grade=requested_user.dict_title_grade)
    db.session.delete(requested_user)
    db.session.add(new)
    db.session.commit()
    return jsonify({
        "username": requested_user.username,
        "words_list_general": requested_user.words_list_general,
        "words_list_translating": requested_user.words_list_translating,
        "words_list_reading": requested_user.words_list_reading,
        "words_dict": requested_user.words_dict
    }),200

# add new word
@app.route('/addword', methods = ['POST'])
def add_word(username,title_story,new_word ):
    # username = request.json['username']
    # title_story = request.json['title_story']
    # new_word = request.json['new_word']
    requested_user = Words.query.get(username)
    in_dict = False
    in_general_list = False
    new_word = new_word.lower()

    if requested_user is None:
        return jsonify({"error":"Unauthorized" }),502

    if title_story in requested_user.words_dict:
        if new_word in requested_user.words_dict[title_story]:
            print("in_dict = True")
            in_dict = True
        else:
            print('the word not in the dict')
            requested_user.words_dict[title_story].append(new_word)
            print("upadte dict" + str(requested_user.words_dict))
    else:
        print("the title not in the dict")
        requested_user.words_dict[title_story] = [new_word]
        print("upadte dict" + str(requested_user.words_dict))
    
    # the word is in the dict already
    if in_dict:
        print("if of the word in dict")
        return jsonify({
            "username": requested_user.username,
            "words_list_general": requested_user.words_list_general,
            "words_translating": requested_user.words_list_translating,
            "words_reading": requested_user.words_list_reading, 
            "words_dict": requested_user.words_dict
        }),200

     #  if the word is in the general list already
    if new_word not in requested_user.words_list_general:
        print("not in list general")
        # update general list
        general_words = list(requested_user.words_list_general)
        general_words.append(new_word)
        requested_user.words_list_general = general_words
        print("upadte general" + str(requested_user.words_list_general))
        
        # update translating list
        translating_words = list(requested_user.words_list_translating)
        translating_words.append(new_word)
        requested_user.words_list_translating = translating_words
        print("upadte translating" + str(requested_user.words_list_translating))
        
        # update reading list
        reading_words = list(requested_user.words_list_reading)
        reading_words.append(new_word)
        requested_user.words_list_reading = reading_words
        print("upadte reading" + str(requested_user.words_list_reading))
    
    print("upadte dict" + str(requested_user.words_dict))
    new = Words(username=username, words_list_general=requested_user.words_list_general, words_list_translating=requested_user.words_list_translating, words_list_reading=requested_user.words_list_reading, words_dict=requested_user.words_dict, dict_title_grade=requested_user.dict_title_grade)
    db.session.delete(requested_user)
    db.session.add(new)
    db.session.commit()
       
    return jsonify({
        "username": requested_user.username,
        "words_list_general": requested_user.words_list_general,
        "words_list_translating": requested_user.words_list_translating,
        "words_list_reading": requested_user.words_list_reading,
        "words_dict": requested_user.words_dict
    }),200


# delete word
# @app.route('/deleteword', methods = ['POST'])
def delete_word(username, old_word, which_list):
    requested_user = Words.query.get(username)
    if requested_user is None:
        return jsonify({"error":"Unauthorized" }),502

    list_general = list(requested_user.words_list_general)
    list_translating = list(requested_user.words_list_translating)
    list_reading = list(requested_user.words_list_reading)

    if which_list=='words_list_translating':
        list_translating.remove(old_word)
        requested_user.words_list_translating = list_translating
    
    if which_list=='words_list_reading':
        print("ssss")
        print(old_word)
        list_reading.remove(old_word)
        requested_user.words_list_reading = list_reading

    # if old_word not in requested_user.words_list_reading and old_word not in requested_user.words_list_translating:
    #     list_general.remove(old_word)
    #     requested_user.words_list_general = list_general

    db.session.commit()

    return jsonify({
        "username": requested_user.username,
        "words_list_general": requested_user.words_list_general,
        "words_list_translating": requested_user.words_list_translating,
        "words_list_reading": requested_user.words_list_reading,
        "words_dict": requested_user.words_dict
    }),200


# get list of translating words of specific user
@app.route('/getwordstranslating', methods = ['POST'])
def get_words_translating():
    username = request.json['username']
    requested_user = Words.query.get(username)
    if requested_user is None:
        return jsonify({"error":"Unauthorized" }),502
    json_dict = {"allwords": [{"word": value} for value in requested_user.words_list_translating]}
    print(json_dict)
    return json_dict
    # return jsonify({
    #     "username": requested_user.username,
    #     "words_list_general": requested_user.words_list_general,
    #     "words_list_translating": requested_user.words_list_translating,
    #     "words_list_reading": requested_user.words_list_reading,
    #     "words_dict": requested_user.words_dict,
    #     "dict_title_grade": requested_user.dict_title_grade
    # }),200


# get list of general words of specific user
@app.route('/getwordsgeneral', methods = ['POST'])
def get_words_general():
    username = request.json['username']
    print(username)
    requested_user = Words.query.get(username)
    if requested_user is None:
        return jsonify({"error":"Unauthorized" }),502
    json_dict = {"allwords": [{"word": value} for value in requested_user.words_list_general]}
    print(json_dict)
    return json_dict

# get list of reading words of specific user
@app.route('/getwordsreading', methods = ['POST'])
def get_words_reading():
    username = request.json['username']
    requested_user = Words.query.get(username)
    if requested_user is None:
        return jsonify({"error":"Unauthorized" }),502
    json_dict = {"allwords": [{"word": value} for value in requested_user.words_list_reading]}
    print(json_dict)
    return json_dict


################# report ###############
def get_current_level(username):
    requested_user_report = Report.query.get(username)
    current_level = requested_user_report.current_level
    return current_level


@app.route('/getdatareport', methods = ['POST'])
def get_data_report():
    username = request.json['username']
    requested_user_report = Report.query.get(username)
    requested_user_words = Words.query.get(username)
    list_titles = requested_user_words.dict_title_grade.keys()
    json_dict_titles = {"alltitles": [title for title in list_titles]}
    list_grades = requested_user_words.dict_title_grade.values()
    print(list_grades)
    print(list_titles)
    json_dict_grades = {"allgrades": [grade for grade in list_grades]}
    num_stories = len(list_titles)
    size_list_general = len(requested_user_words.words_list_general)
    size_list_reading = len(requested_user_words.words_list_reading)
    print(size_list_reading)
    print(size_list_general)
    print(json_dict_grades)
    print(json_dict_titles)
    size_list_translating = len(requested_user_words.words_list_translating)
    return jsonify({
        "username": requested_user_report.username,
        "current_level": requested_user_report.current_level,
        "list_titles": json_dict_titles,
        "list_grades": json_dict_grades,
        "num_stories": num_stories,
        "size_list_general": size_list_general,
        "size_list_reading": size_list_reading,
        "size_list_translating": size_list_translating

    }),200


################# algorithms ###############
@app.route('/calcaverage', methods = ['POST'])
def calc_average():
    username = request.json['username']
    requested_user_words = Words.query.get(username)
    all_grades = requested_user_words.dict_title_grade.values()
    list_grades = list(all_grades)
    sum_grades = 312
    l=len(requested_user_words.dict_title_grade.keys())
    if sum_grades == 0 or l == 0:
        average = 0
    else:
        average = sum_grades/l
    return jsonify({
        "average":average
    }),200


# check if the user can pass to other level
@app.route('/checkpasslevel', methods = ['POST'])
def check_pass_level():
    username = request.json['username']
    print(username)
    requested_user_words = Words.query.get(username)
    if requested_user_words is None:
        return jsonify({"error":"Unauthorized" }),502
    all_grades = requested_user_words.dict_title_grade.values()
    list_grades = list(all_grades)
    sum_grades = 90
    l=len(requested_user_words.dict_title_grade.keys())
    if sum_grades==0 or l==0:
        ave = 0
    else:
        ave = sum_grades/l
    requested_user_report = Report.query.get(username)
    current_level = requested_user_report.current_level
    average= 80
    num_stories = len(requested_user_words.dict_title_grade.keys())
    pass_level_medium = 0
    pass_level_hard = 0
    pass_level_advenc = 0
    if current_level=='easy':
        print("enter easy")
        # if average > 80 and num_stories > 3:
        if average > 85:
            pass_level_medium = 1
            pass_level_hard = 0
            requested_user_report.current_level = 'medium' 
            new = Words(username=username, words_list_general=requested_user_words.words_list_general, words_list_translating=requested_user_words.words_list_translating, words_list_reading=requested_user_words.words_list_reading, words_dict=requested_user_words.words_dict, dict_title_grade=dict())
            db.session.delete(requested_user_words)
            db.session.add(new)
            db.session.commit()
    elif current_level=='medium':
        pass_level_medium = 1
        print(average)
        if average > 94 :
            pass_level_hard = 1
            pass_level_advenc = 0
            requested_user_report.current_level = 'hard'
            new = Words(username=username, words_list_general=requested_user_words.words_list_general, words_list_translating=requested_user_words.words_list_translating, words_list_reading=requested_user_words.words_list_reading, words_dict=requested_user_words.words_dict, dict_title_grade=dict())
            db.session.delete(requested_user_words)
            db.session.add(new)
            db.session.commit()
    elif current_level=='hard':
        pass_level_hard = 1
        pass_level_medium = 1
        if average > 94 :
            pass_level_medium = 1
            pass_level_hard = 1
            pass_level_advenc = 1
            requested_user_report.current_level = 'advence'
            new = Words(username=username, words_list_general=requested_user_words.words_list_general, words_list_translating=requested_user_words.words_list_translating, words_list_reading=requested_user_words.words_list_reading, words_dict=requested_user_words.words_dict, dict_title_grade=dict())
            db.session.delete(requested_user_words)
            db.session.add(new)
            db.session.commit()    
    elif current_level=='advanced':    
        pass_level_medium = 1
        pass_level_hard = 1
        pass_level_advenc = 1
    return jsonify({
        "s":sum_grades,
        'l':l,
        'pass_level_medium':pass_level_medium,
        'pass_level_hard':pass_level_hard,
        'pass_level_advenc': pass_level_advenc
    }),200


# get translat for some word
@app.route('/translatWord', methods = ['POST'])
def get_translator():
    word_required = request.json['word_required']
    print(word_required)
    translator = Translator()
    translation = translator.translate(word_required, dest="iw")
    word_translated = translation.text
    print(word_translated)
    return jsonify({
        "translated": word_translated
    }),200

# convert speech to writing
@app.route('/speechToWriting', methods = ['POST'])
def convert_speech():
    print("speechToFunc")
    # Initialize the recognizer
    r = sr.Recognizer()
    r.energy_threshold = 50
    title_story = request.json['title_story']
    current_index = request.json['current_index']
    username = request.json['username']
    requested_user = Words.query.get(username)
    print(current_index)
    current_level = get_current_level(username)
    if current_level=='advanced':
        requested_story = PersonalStory.query.get(username)
    else:
        requested_story = Story.query.get(title_story)
    storyInArray = requested_story.story.split('.')
    print("the story is")
    print(storyInArray)
    # Loop infinitely for user to speak
    while (1):

        # Exception handling to handle
        # exceptions at the runtime
        try:

            # use the microphone as source for input.
            with sr.Microphone() as source2:

                # wait for a second to let the recognizer
                # adjust the energy threshold based on
                # the surrounding noise level
                r.adjust_for_ambient_noise(source2, duration=0.7)

                # listens for the user's input
                audio2 = r.listen(source2)

                # Using google to recognize audio
                MyText = r.recognize_google(audio2)
                MyText = MyText.lower()
                print("what i say:" + MyText)
                print(storyInArray[current_index])
                percent = SequenceMatcher(None, MyText, storyInArray[current_index]).ratio()
                print(percent)
                if percent > 0.7:
                    return jsonify({
                        "translated": "good"
                    }),200
                else:
                    need_say= storyInArray[current_index].split(' ')
                    print(need_say)
                    user_say= MyText.split(' ')
                    print(user_say)
                    special_characters = ['!',':','"','%',',',')','(','?',']',' ',']','_']
                    for word in need_say:
                        if word not in user_say:
                            if len(word) > 2:
                                #using for loop and replace to remove special characters
                                for i in special_characters:
                                    word.replace(i,'')
                                word.replace(" ", "")
                                print(word)
                                add_word(username,title_story,word)
                    print(str(requested_user.words_dict))

                    return jsonify({
                        "translated": MyText
                    }),200

        except sr.UnknownValueError:
            print("unknown error occured")

@app.route('/speechToText', methods = ['POST'])
def speech_to_text():
    print("speechToFunc")
    counterWorng = request.json['counterWorng']
    print(counterWorng)
    title_story = request.json['title_story']
    current_index = request.json['current_index']
    username = request.json['username']
    requested_user = Words.query.get(username)
    print(current_index)
    current_level = get_current_level(username)
    if current_level=='advanced':
        requested_story = PersonalStory.query.get(username)
    else:
        requested_story = Story.query.get(title_story)
    storyInArray = requested_story.story.split('.')
    print(storyInArray)
    # create file audio
    freq = 44100  # Sampling frequency
    duration = 5  # Recording duration
    # Start recorder with the given values of duration and sample frequency
    recording = sd.rec(int(duration * freq),samplerate=freq, channels=2)
    print("start")
    # record audio for the given number of seconds
    sd.wait()
    print("finish audio")
    # This will convert the numpy array to an audio  file with the given sampling frequency
    write("recording0.wav", freq, recording)
    # convert the numpy array to audio file
    wv.write("recording1.wav", recording, freq, sampwidth=2)
    
    # Initialize recognizer class (for recognizing the speech)
    r = sr.Recognizer()
    # Reading Audio file as source
    with sr.AudioFile('recording1.wav') as source:
        # listening the audio file and store in audio_text variable
        audio_text = r.listen(source)
        # recoginize_() method will throw a request error if the API is unreachable, hence using exception handling
        try:
            # using google speech recognition and present all the possible options
            text = r.recognize_google(audio_text, show_all=True)
            print('Converting audio transcripts into text ...')
            s = list(text.values())[0]
            print(s)
            percent = 0
            index_percent = 0
            for index,value in enumerate(s):
                print((index, value))
                if index == 0:
                    if list(value.values())[1] > 0.93:
                        print('good')
                        isay = list(value.values())[0]
                        percent = SequenceMatcher(None, list(value.values())[0], storyInArray[current_index]).ratio()
                        print(percent)
                        break
                temp = SequenceMatcher(None, list(value.values())[0], storyInArray[current_index]).ratio()
                if temp > percent:
                    percent = temp
                    index_percent = index
                    isay = list(value.values())[0]
                    print(percent)
            if percent > 0.4:
                return jsonify({
                    "translated": "good"
                }), 200
            #  there is mistake
            else:
                print("worng")
                print(current_index)
                print(storyInArray[current_index].split(' '))
                need_say = storyInArray[current_index].split(' ')
                # isay_lower = isay.lower()
                user_say = isay.split(' ')
                # print(user_say)
                special_characters = ['!',':','"','%',",",')','(','?',']',' ',']','_']
                worng_words = []
                for word in need_say:
                    if word not in user_say:
                        if len(word) > 2:
                            #using for loop and replace to remove special characters
                            for i in special_characters:
                                word = word.replace(i,'')
                                word = word.lower()
                            print(word)
                            if counterWorng==1:
                                add_word(username,title_story,word)
                            if word not in worng_words:
                                worng_words.append(word)
                print(str(requested_user.words_dict))
                print(worng_words)
                print("befor return")
            return jsonify({
                "translated": "worng",
                "list_worng": worng_words
            }), 200
        except:
            print('Sorry.. run again...')
            return jsonify({
                "translated": 'press again'
            }), 500

@app.route('/addGrade', methods = ['POST'])
def add_grade():
    title_story = request.json['title_story']
    username = request.json['username']
    requested_user = Words.query.get(username)
    grade = 86
    requested_user.dict_title_grade[title_story] = grade
    new = Words(username=username, words_list_general=requested_user.words_list_general, words_list_translating=requested_user.words_list_translating, words_list_reading=requested_user.words_list_reading, words_dict=requested_user.words_dict, dict_title_grade=requested_user.dict_title_grade)
    print(requested_user.dict_title_grade)
    db.session.delete(requested_user)
    db.session.add(new)
    print(requested_user.dict_title_grade)
    db.session.commit()
    return jsonify({
        "username": requested_user.username,
        "grade": 86
    }),200


@app.route('/deleteGrade', methods = ['POST'])
def delete_grade():
    title_story = request.json['title_story']
    username = request.json['username']
    requested_user = Words.query.get(username)
    requested_user.dict_title_grade.pop(title_story)
    new = Words(username=username, words_list_general=requested_user.words_list_general, words_list_translating=requested_user.words_list_translating, words_list_reading=requested_user.words_list_reading, words_dict=requested_user.words_dict, dict_title_grade=requested_user.dict_title_grade)
    print(requested_user.dict_title_grade)
    db.session.delete(requested_user)
    db.session.add(new)
    print(requested_user.dict_title_grade)
    db.session.commit()
    return jsonify({
        "username": requested_user.username
    }),200

# get translat for some word
@app.route('/calculateGrade', methods = ['POST'])
def calculat_grade():
    print('calculateGrade')
    title_story = request.json['title_story']
    username = request.json['username']
    requested_user = Words.query.get(username)
    if title_story not in  requested_user.words_dict:
        grade = 100
    else:
        words_wrong = requested_user.words_dict[title_story]
        size_worng_words = len(words_wrong)
        print(size_worng_words)
        current_level = get_current_level(username)
        if current_level=='advanced':
            requested_story = PersonalStory.query.get(username)
        else:
            requested_story = Story.query.get(title_story)
        storyInArray = requested_story.story.split(' ')
        storyInList = list(storyInArray)
        size_words_story = len(storyInList)
        print(size_words_story)
        print(size_worng_words)
        print(size_words_story)
        grade = ((size_words_story-size_worng_words)/size_words_story) * 100
    print(int(grade))
    requested_user.dict_title_grade[title_story] = [int(grade)]
    new = Words(username=username, words_list_general=requested_user.words_list_general, words_list_translating=requested_user.words_list_translating, words_list_reading=requested_user.words_list_reading, words_dict=requested_user.words_dict, dict_title_grade=requested_user.dict_title_grade)
    print(requested_user.dict_title_grade)
    db.session.delete(requested_user)
    db.session.add(new)
    print(requested_user.dict_title_grade)
    db.session.commit()
    return jsonify({
        "username": requested_user.username,
        "grade": 86
    }),200

# comper between translate word to the word
@app.route('/comperTransletetWord', methods = ['POST'])
def comper_translate_word():
    username = request.json['username']
    word_english = request.json['word_english']
    translate = request.json['translate']
    which_list = request.json['which_list']
    print("my text")
    print(translate)
    translator = Translator()
    translation = translator.translate( word_english, dest="iw")
    word_translated = translation.text
    print("translate")
    print(word_translated)
    percent = SequenceMatcher(None, word_translated, translate).ratio()
    print(percent)
    if percent > 0.4:
        delete_word(username, word_english, which_list)  
        return jsonify({
            "feedback": "You succeeded"
        }),200
    else:
        return jsonify({
            "feedback": "Try again"
        }),200


# convert one word of speech to text and chack
@app.route('/speechWordToWriting', methods = ['POST'])
def convert_speech_word():
    speech_word = request.json['speech_word']
    username = request.json['username']
    which_list = request.json['which_list']
    requested_user = Words.query.get(username)
    
    # create file audio
    freq = 44100  # Sampling frequency
    duration = 3  # Recording duration
    # Start recorder with the given values of duration and sample frequency
    recording = sd.rec(int(duration * freq),samplerate=freq, channels=2)
    print("start")
    # record audio for the given number of seconds
    sd.wait()
    print("finish audio")
    # This will convert the numpy array to an audio  file with the given sampling frequency
    write("recording0.wav", freq, recording)
    # convert the numpy array to audio file
    wv.write("recording1.wav", recording, freq, sampwidth=2)

    # Initialize recognizer class (for recognizing the speech)
    r = sr.Recognizer()
    # Reading Audio file as source
    with sr.AudioFile('recording1.wav') as source:
        # listening the audio file and store in audio_text variable
        audio_text = r.listen(source)
        # recoginize_() method will throw a request error if the API is unreachable, hence using exception handling
        try:
            # using google speech recognition and present all the possible options
            text = r.recognize_google(audio_text, show_all=True)
            print('Converting audio transcripts into text ...')
            # s = list(text.values())[0]
            print( list(text.values())[0])
            print("a")
            percent = 0
            for index,value in enumerate(list(text.values())[0]):
                print((index, value))
                if index == 0:
                    if list(value.values())[1] > 0.93:
                        isay = list(value.values())[0]
                        percent = SequenceMatcher(None, isay, speech_word).ratio()
                        break
                temp = SequenceMatcher(None, list(value.values())[0], speech_word).ratio()
                if temp > percent:
                    percent = temp
                    index_percent = index
                    isay = list(value.values())[0]
            print(percent)
            if percent > 0.3:
                print(requested_user.words_list_reading)
                delete_word(username, speech_word, which_list)  
                print(requested_user.words_list_reading)
                print("delete word")
                return jsonify({
                    "feedback": "You succeeded"
                }),200
            #  there is mistake
            else:
                print("worng")
            return jsonify({
                "feedback": "Try again"
            }),200
        except:
            print('Sorry.. run again...')
            return jsonify({
                "translated": 'press again'
            }), 500


# # convert one word of speech to text and chack
# @app.route('/speechWordToWriting', methods = ['POST'])
# def convert_speech_word():
#     speech_word = request.json['speech_word']
#     username = request.json['username']
#     which_list = request.json['which_list']
#     requested_user = Words.query.get(username)
#     r = sr.Recognizer()
#     try:
#         # use the microphone as source for input.
#         with sr.Microphone() as source2:
#             # wait for a second to let the recognizer adjust the energy threshold based on
#             # the surrounding noise level
#             r.adjust_for_ambient_noise(source2, duration=0.2)
#             # listens for the user's input
#             audio2 = r.listen(source2)
#             MyText = r.recognize_google(audio2)
#             MyText = MyText.lower()
#             print(MyText)
#             percent = SequenceMatcher(None, MyText, speech_word).ratio()
#             print(percent)
#             if percent > 0.4: 
#                 print(requested_user.words_list_reading)
#                 delete_word(username, speech_word, which_list)  
#                 print(requested_user.words_list_reading)
#                 print("delete word")
#                 return jsonify({
#                     "feedback": "You succeeded"
#                 }),200
#             else:
#                 return jsonify({
#                     "feedback": "Try again"
#                 }),200
#     except sr.UnknownValueError:
#         print("unknown error occured")
#         return jsonify({
#                 "feedback": "Try again"
#         }),200


def SpeakText(command):
    # Initialize the engine
    engine = pyttsx3.init()
    engine.setProperty("rate",100)
    engine.say(command)
    try:
        engine.runAndWait()
    except:
        print("error")

    

# listen to word
@app.route('/convertWriting', methods = ['POST'])
def convert_writing():
    word_required = request.json['word_required']
    SpeakText(word_required)
    return jsonify({
        "Playback": word_required
    }),200

@app.route('/listenStory', methods = ['POST'])
def listenToStory():
    title_story = request.json['title_story']
    current_index = request.json['current_index']
    username = request.json['username']
    print(current_index)
    current_level = get_current_level(username)
    if current_level=='advanced':
        requested_story = PersonalStory.query.get(username)
    else:
        requested_story = Story.query.get(title_story)
    storyInArray = requested_story.story.split('.')
    sentence_required = storyInArray[current_index]
    SpeakText(sentence_required)
    print(current_index)
    return jsonify({
        "Playback": sentence_required
    }),200
    
        
if __name__ == "__main__":
    app.run(host = '192.168.1.21', port=5000, debug=True)
    # app.run(debug=True)
