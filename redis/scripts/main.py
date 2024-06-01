import redis
import csv

file_path = 'files/bataxi.csv'

id_viaje_r = 0
origen_viaje_x = 5
origen_viaje_y = 6

KEY = 'bataxi'


places = {
    'Parque Chas': { 'lon' : -58.479258,'lat': -34.582497},
    'UTN' :  {'lon' :-58.468606, 'lat':-34.658304},
    'ITBA Madero':{'lon' :-58.367862,'lat':-34.602938}
}

with open(file_path, 'r') as file:
    reader = csv.reader(file)
    next(reader)
    with redis.Redis(host='localhost', port=6379, decode_responses=True) as r:
        count = 0
        print('====IMPORTING====')
        for row in reader:
            lon = float(row[origen_viaje_x])
            lat = float(row[origen_viaje_y])
            member = row[id_viaje_r]
            count += r.geoadd(KEY, [lon, lat, member])
        print('Added', count, ' members to ', KEY)
        print('====EXERCISE1====')
        for place in places:
            lon = places[place]['lon']
            lat = places[place]['lat']
            response = r.geosearch(
                KEY,
                longitude=lon,
                latitude=lat,
                radius=1,
                unit="km"
            )
            print('Trips near ', place,': ',len(response))
        print('====EXERCISE2====')
        print('Members in ', KEY, ': ', r.zcard(KEY))
        print('====EXERCISE3====')
        print('Keyspace info -> ammount of keys:', r.info('keyspace')['db0']['keys'])
        print('Wish to delete key?[y/N]')
        if (input() == 'y'):
            r.delete(KEY)
        exit()