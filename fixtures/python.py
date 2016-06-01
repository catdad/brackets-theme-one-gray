#!/usr/bin/env python

kmh = int(raw_input("Enter km/h: "))
mph =  0.6214 * kmh
print "Speed:", kmh, "KM/H = ", mph, "MPH"

#Importing the modules
import urllib2
import json

def my_function_with_args(username, greeting):
    print "Hello, %s , From My Function!, I wish you %s"%(username, greeting)
    
my_func_with_args("stringOne", "stringTwo")

screen_name = "wordpress"

url = "http://api.twitter.com/1/statuses/user_timeline.json?screen_name=" + screen_name

data = json.load(urllib2.urlopen(url))

print len(data), "tweets"

for tweet in data:
    print tweet['text']

logfile = open("/var/log/syslog", "r")
for line in logfile:
    line_split = line.split()
    print line_split
    list = line_split[0], line_split[1], line_split[2], line_split[4]
    print list

