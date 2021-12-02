import os
import csv
import string

################################################################################
# create dictionary {word: count} for song titles 
################################################################################

# get file path to data, set up reader
pathName = os.getcwd()
csvFilePath = pathName + '/data.csv'
print(csvFilePath)
file = open(csvFilePath)
reader = csv.reader(file, delimiter=',')
print("\n\n\n\n\n\n")

# # first get all chars to see what needs to be excluded/cleaned (IE parens, hyphens)
# allChars = set()

# # loop through each row to get song title, and each letter of the song title into allChars
# for row in reader:
#     name = row[2] # song name is row 3 (zero index)
#     for c in name: 
#         allChars.add(c)

# print('allChars:')
# print(allChars)

# # remove uppercase & lowercase alphabet letters to see what the ~weird~ bois are
# weirdChars = set()
# for c in allChars: 
#     if c not in string.ascii_uppercase and c not in string.ascii_lowercase: 
#         weirdChars.add(c)

# print("weirdChars:")
# print(weirdChars)

# now build up wordCounts {word:countOccurences} for the wordCloud
wordCounts2001 = dict()
wordCounts2002 = dict()
wordCounts2003 = dict()
wordCounts2004 = dict()
wordCounts2005 = dict()
wordCounts2006 = dict()
wordCounts2007 = dict()
wordCounts2008 = dict()
wordCounts2009 = dict()
wordCounts2010 = dict()
wordCounts2011 = dict()
wordCounts2012 = dict()
wordCounts2013 = dict()
wordCounts2014 = dict()
wordCounts2015 = dict()
wordCounts2016 = dict()
wordCounts2017 = dict()
wordCounts2018 = dict()
wordCounts2019 = dict()

blacklistedWords = {"feat", "the", "my", "i", "you", "a", "it", "me", "we", "by", "of", "in", "im", "radio", "edit", "is", "your", "and", "on", "for", "are", "version", "to", "from", "be", "let", "with", "this", "as", "its", "if"}


# helper for the loop later
def addNameToWordCounts(name, wordCounts): # name is a (possibly) multi-word, space-separated string with possible weirdChars
    for word in name.split(" "):
        word = ''.join(c for c in word if c.isalnum()) # remove non-alphanum chars
        if word.lower() not in blacklistedWords: 
            wordCounts[word] = wordCounts.get(word, 0) + 1 # adds 1 to word's count (creates if didn't exist)
    
# loop through each row to get song title, and each word of the song title into dict
rowCounter = 1
for row in reader:
    name = row[2] # song name is row 3 (zero index)

    if (rowCounter == 1): 
        pass # first row is the header
    elif (rowCounter <= 101):
        addNameToWordCounts(name, wordCounts2001)
    elif (rowCounter <= 201):
        addNameToWordCounts(name, wordCounts2002)
    elif (rowCounter <= 301):
        addNameToWordCounts(name, wordCounts2003)
    elif (rowCounter <= 401):
        addNameToWordCounts(name, wordCounts2004)
    elif (rowCounter <= 501):
        addNameToWordCounts(name, wordCounts2005)
    elif (rowCounter <= 601):
        addNameToWordCounts(name, wordCounts2006)
    elif (rowCounter <= 701):
        addNameToWordCounts(name, wordCounts2007)
    elif (rowCounter <= 801):
        addNameToWordCounts(name, wordCounts2008)
    elif (rowCounter <= 901):
        addNameToWordCounts(name, wordCounts2009)
    elif (rowCounter <= 1001):
        addNameToWordCounts(name, wordCounts2010)
    elif (rowCounter <= 1101):
        addNameToWordCounts(name, wordCounts2011)
    elif (rowCounter <= 1201):
        addNameToWordCounts(name, wordCounts2012)
    elif (rowCounter <= 1301):
        addNameToWordCounts(name, wordCounts2013)
    elif (rowCounter <= 1401):
        addNameToWordCounts(name, wordCounts2014)
    elif (rowCounter <= 1501):
        addNameToWordCounts(name, wordCounts2015)
    elif (rowCounter <= 1601):
        addNameToWordCounts(name, wordCounts2016)
    elif (rowCounter <= 1701):
        addNameToWordCounts(name, wordCounts2017)
    elif (rowCounter <= 1801):
        addNameToWordCounts(name, wordCounts2018)
    else:
        addNameToWordCounts(name, wordCounts2019)
    rowCounter += 1

# todo: potentially extra dict cleaning? 
# https://stackoverflow.com/questions/41290028/removing-non-english-words-from-text-using-python
    # maybe remove words like "the"

################################################################################
# create word cloud from wordCount dictionary 
################################################################################
# # inspo: https://stackoverflow.com/questions/43145199/create-wordcloud-from-dictionary-values

from PIL import Image
import matplotlib.pyplot as plt 
from wordcloud import WordCloud

wc = WordCloud(background_color="white", width=1000, height=1000, max_words=20,relative_scaling=0.5, normalize_plurals=False).generate_from_frequencies(wordCounts2010)
plt.figure(figsize=(15,8))
plt.imshow(wc) 
plt.show()

wc = WordCloud(background_color="white", width=1000, height=1000, max_words=20,relative_scaling=0.5, normalize_plurals=False).generate_from_frequencies(wordCounts2011)
plt.figure(figsize=(15,8))
plt.imshow(wc) 
plt.show()

wc = WordCloud(background_color="white", width=1000, height=1000, max_words=20,relative_scaling=0.5, normalize_plurals=False).generate_from_frequencies(wordCounts2012)
plt.figure(figsize=(15,8))
plt.imshow(wc) 
plt.show()

wc = WordCloud(background_color="white", width=1000, height=1000, max_words=20,relative_scaling=0.5, normalize_plurals=False).generate_from_frequencies(wordCounts2013)
plt.figure(figsize=(15,8))
plt.imshow(wc) 
plt.show()

wc = WordCloud(background_color="white", width=1000, height=1000, max_words=20,relative_scaling=0.5, normalize_plurals=False).generate_from_frequencies(wordCounts2014)
plt.figure(figsize=(15,8))
plt.imshow(wc) 
plt.show()

wc = WordCloud(background_color="white", width=1000, height=1000, max_words=20,relative_scaling=0.5, normalize_plurals=False).generate_from_frequencies(wordCounts2015)
plt.figure(figsize=(15,8))
plt.imshow(wc) 
plt.show()

wc = WordCloud(background_color="white", width=1000, height=1000, max_words=20,relative_scaling=0.5, normalize_plurals=False).generate_from_frequencies(wordCounts2016)
plt.figure(figsize=(15,8))
plt.imshow(wc) 
plt.show()

wc = WordCloud(background_color="white", width=1000, height=1000, max_words=20,relative_scaling=0.5, normalize_plurals=False).generate_from_frequencies(wordCounts2017)
plt.figure(figsize=(15,8))
plt.imshow(wc) 
plt.show()

wc = WordCloud(background_color="white", width=1000, height=1000, max_words=20,relative_scaling=0.5, normalize_plurals=False).generate_from_frequencies(wordCounts2018)
plt.figure(figsize=(15,8))
plt.imshow(wc) 
plt.show()

wc = WordCloud(background_color="white", width=1000, height=1000, max_words=20,relative_scaling=0.5, normalize_plurals=False).generate_from_frequencies(wordCounts2019)
plt.figure(figsize=(15,8))
plt.imshow(wc) 
plt.show()
# RUN THROUGH TERMINAL (not VSCODE)