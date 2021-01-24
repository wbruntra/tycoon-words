import json

with open('words.txt') as f:
    words = f.read()

words = words.splitlines()

with open('words.json', 'w') as f:
    f.write(json.dumps(words))

