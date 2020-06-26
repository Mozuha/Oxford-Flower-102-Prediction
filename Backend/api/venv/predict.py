import base64
import numpy as np
import io
from PIL import Image
# import tensorflow.keras
# from tensorflow.keras import backend as K
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array
from flask import request, Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

global label_names
label_names = ['alpine sea holly', 'anthurium', 'artichoke', 'azalea', 'ball moss', 
                'balloon flower', 'bearberton daisy', 'bearded iris', 'bee balm', 
                'bird of paradise', 'bishop of llandaff', 'black-eyed susan', 
                'blackberry lily', 'blanket flower', 'bolero deep blue', 'bougainvillea', 
                'bromelia', 'buttercup', 'california poppy', 'camellia', 'canna lily', 
                'canterbury bells', 'cape flower', 'carnation', 'cautleya spicata', 
                'clematis', "colt's foot", 'columbine', 'common dandelion', 'corn poppy', 
                'cyclamen', 'daffodil', 'desert rose', 'english marigold', 'fire lily', 
                'foxglove', 'frangipani', 'fritillary', 'garden phlox', 'gaula', 'gazania', 
                'geranium', 'giant white arum lily', 'globe thistle', 'globe-flower', 
                'grape hyacinth', 'great masterwort', 'hard-leaved pocket orchid', 'hibiscus', 
                'hippeastrum', 'japanese anemone', 'king protea', 'lenten rose', 'lotus', 
                'love in the mist', 'magnolia', 'mallow', 'marigold', 'mexican aster', 
                'mexican petunia', 'monkshood', 'moon orchid', 'morning glory', 'orange dahlia', 
                'osteospermum', 'oxeye daisy', 'passion flower', 'pelargonium', 'peruvian lily', 
                'petunia', 'pincushion flower', 'pink primrose', 'pink-yellow dahlia', 
                'poinsetia', 'primula', 'prince of wales feathers', 'purple coneflower', 
                'red ginger', 'rose', 'ruby-lipped cattleya', 'siam tulip', 'silverbush', 
                'snapdragon', 'spear thistle', 'spring crocus', 'stemless gentian', 'sunflower', 
                'sweet pea', 'sweet william', 'sword lily', 'thorn apple', 'tiger lily', 
                'toad lily', 'tree mallow', 'tree poppy', 'trumpet creeper', 'wallflower', 
                'water lily', 'watercress', 'wild pansy', 'windflower', 'yellow iris']

def get_model():
    global model
    model = load_model('oxflower_local_waug_ResNet50_fullfine.h5')
    print(' * Model loaded')

def preprocess_image(image, target_size):
    if image.mode != 'RGB':
        image = image.convert('RGB')
    image = image.resize(target_size)
    image = img_to_array(image)
    image = np.expand_dims(image, axis=0)
    image = image.astype('float32')
    image = image / 255.0
    
    return image

print(' * Loading Keras model...')
get_model()

@app.route('/api/predict', methods=['POST'])
def predict():
    message = request.get_json()
    encoded = message['image']
    decoded = base64.b64decode(encoded)
    image = Image.open(io.BytesIO(decoded))
    processed_image = preprocess_image(image, target_size=(224, 224))

    prediction = model.predict(processed_image)
    highest_pred = np.argmax(prediction)
    idx2name = label_names[highest_pred]
    response = idx2name

    print(response)
    return jsonify(response)

if __name__ == '__main__':
    app.run()