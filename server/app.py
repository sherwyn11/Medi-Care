from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import datetime
import ipfshttpclient
from PIL import Image
import urllib.request as urllib
import io
import pytesseract
import requests


app = Flask(__name__)
CORS(app)

client = ipfshttpclient.connect('/ip4/127.0.0.1/tcp/5001/http')

def query_raw(text, url='https://bern.korea.ac.kr/plain'):
    return requests.post(url, data={'sample_text': text}).json()

@app.route('/')
@app.route('/home', methods=['GET', 'POST'])
def home():
    return 'Test Works!'


@app.route('/upload', methods=['POST'])
def upload():
    if (request.method == 'POST'):
        file = request.files['file']
        res = client.add(file)
        print(res)
        return res['Hash']

@app.route('/analyze', methods=['POST'])
def analyze():
    if (request.method == 'POST'):

        data = request.get_json()
        recv_hash = data['hash']
        fd = urllib.urlopen('http://localhost:8080/ipfs/' + recv_hash)
        image_file = io.BytesIO(fd.read())
        im = Image.open(image_file)
        text = pytesseract.image_to_string(im)
        a = query_raw(text)
        dict_obj = {'Diseases': [], 'Drugs': []}
        length = len(a['denotations'])
        for span in range(length):
            label = a['denotations'][span]['obj']
            begin_end = a['denotations'][span]['span']
            word = text[begin_end['begin']: begin_end['end'] + 1]
            if label[1] == 'i':
                mesh_id = a['denotations'][span]['id'][0][5:]
                if mesh_id[0] == 'D':
                    dict_obj['Diseases'].append([word.rstrip(), mesh_id])
            else:
                mesh_id = a['denotations'][span]['id'][0][6:]
                dict_obj['Drugs'].append([word.rstrip(), mesh_id])

        print(dict_obj)
        return json.dumps(dict_obj)

if __name__ == '__main__':
    app.run(debug=True)
    app.run(host='0.0.0.0')