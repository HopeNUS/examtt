import csv 

filename = '/Users/jeremiah-ang/Downloads/Venue Meeting Point - Venues (3).csv'

with open(filename) as csv_file:
	csv_reader = csv.reader(csv_file, delimiter=',')
	print('const MEETING_POINT = [')
	for row in csv_reader:
		location = row[3]
		print('\t"{}",'.format(location))
	print(']')
