import json
from itertools import groupby

# Read the JSON file
with open('/Users/ethanpotts/Documents/GitHub/conference-conundrum/src/teams.json') as file:
    data = json.load(file)

# Sort the schools by conference
data.sort(key=lambda x: x['conference'])

# Group the schools by conference
grouped_data = {conference: list(schools) for conference, schools in groupby(data, key=lambda x: x['conference'])}

# Save the grouped data as a new JSON file
with open('/Users/ethanpotts/Documents/GitHub/conference-conundrum/src/grouped_teams.json', 'w') as file:
    json.dump(grouped_data, file)

# Print the grouped data
for conference, schools in grouped_data.items():
    print(f"Conference: {conference}")
    for school in schools:
        print(f"School: {school['school']}")
