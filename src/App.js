// Gerekli kütüphanelerin eklenmesi
import React, { useState } from 'react';
import { TextField, Box} from '@mui/material';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";




function App() {

  // New title içerisine yazılacak olan text için değişken tanımlama
  const [title, setTitle] = useState('New title');

  // New description içerisine yazılacak olan text için değişken tanımlama
  const [description, setDescription] = useState('New description');

  // Görsel içerisine yüklenecek olan görsel için değişken tanımlama
  const [image, setImage] = useState(null);

  // Bütün inputlar alındıktan sonra sayfanın altında tutulması için flag
  // Flag (true değerini aldığında içerikler gösterilecek)
  const [showDetails, setShowDetails] = useState(false);

  // Database içerisine kaydedilecek New title, New description ve image verilerini tutan obje
  const [data, setData] = useState(null);

  
  // Firebase konfigürasyonu (User should enter his/her configuration data in here)
  const firebaseConfig = {
    apiKey: "your_api_key",
    authDomain: "your_auth_domain",
    projectId: "your_project_id",
    storageBucket: "your_storage_bucket",
    messagingSenderId: "yor_messaging_sender_id",
    appId: "your_app_id",
    measurementId: "your_measurement_id",
    databaseURL: "your_database_url"
  };

  // Initialize Firebase (Firebase aktif etme)
  const app = initializeApp(firebaseConfig);


  // Initialize Realtime Database and get a reference to the service
  const db = getDatabase(app);

  // Kullanıcı, New title kısmına değer eklediğinde title değişkenine kullanıcının girdiği metni atama
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  // Kullanıcı, New description kısmına değer eklediğinde description değişkenine kullanıcının girdiği metni atama
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };


  // Kullanıcı sayfanın en altındaki tamamla butonuna tıkladığında verileri firebase' e yükleme; sonrasında verileri firebase' den okuyup üst kısmı sıfırlama
  const handleButtonClick = () => {
    setShowDetails(true);
    // Save the data to Firebase
    set(ref(db), {
      title_db: title,
      description_db: description,
      image_db : image
    }).then(() => {
      // Read the data from Firebase
      const read_title = ref(db);
      onValue(read_title, (snapshot) => {
        const newData = snapshot.val();
        setData(newData);
        setTitle("New title");
        setDescription("New description");
        setImage(null);
      });
    });
  };

  // Kullanıcı, Görsel kısmına görsel yüklediğinde image değişkenine kullanıcının yüklediği görseli atama
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      setImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  
  return (
    <Box>
      {/* New title textbox' ının oluşturulması */}
      <Box component="div">
        <TextField
          id="editable"
          defaultValue="New title"
          variant="outlined"
          value={title}
          /* New title textbox' ında kullanıcı değer girdiğinde, handleTitleChange fonksiyonu çağırılır */
          onChange={handleTitleChange}
          InputProps={{
            sx: {
              '& .MuiInputBase-input': {
                color: 'orange',
                fontWeight: 'bold',
                shrink: true,
              },
            },
          }}
        />
      </Box>
      
      {/* New description textbox' ının oluşturulması */}
      <Box component="div">
        <TextField
          id="editable2"
          defaultValue="New description"
          variant="outlined"
          multiline="true"
          rows={20}
          value={description}
          /* New description textbox' ında kullanıcı değer girdiğinde, handleDescriptionChange fonksiyonu çağırılır */
          onChange={handleDescriptionChange}
          InputProps={{
            sx: {
              '& .MuiInputBase-input': {
                margin: 'top',
                color: 'black',
                whiteSpace: 'pre-wrap',
              },
            },
          }}
        />
      </Box>
      
      {/* Görsel dosya yükleme butonunun oluşturulması */}
      <Box component="div" id="image-upload">
        <label htmlFor="file-input">
          <Box component="div" className="upload-box">
            <span>+</span>
            <Box component="div" className="gorsel-text">
              GÖRSEL
            </Box>
          </Box>
        </label>
        <input
          id="file-input"
          type="file"
          style={{ display: 'none' }}
          /* Görsel kısmında kullanıcı görsel yüklediğinde, handleImageChange fonksiyonu çağırılır */
          onChange={handleImageChange}
        />
        {/* Yüklenen görseli kutucuğa sığdırarak gösterme */}
        {image && (
          <img
            id="preview-image"
            src={image}
            style={{ display: 'block', maxWidth: '100%' }}
            alt="Preview"
          />
        )}
      </Box>
      
      {/* Tamamla butonunun tanımlanması ve tıklandığında handleButtonClick fonsksiyonunun çağırılması */}
      <div id="input-fields">
      <button id="save-btn" onClick={handleButtonClick}></button>
      </div>
      
      {/* Tamamla butonuna tıklandıkan sonra kullanıcının sağladığı verilerin sayfanın alt kısmında gösterilmesi */}
      {showDetails && data && (
        <div>
          <Box component="div">
        <TextField
          id="editable"
          variant="outlined"
          value={data.title_db}
          InputProps={{
            readOnly: true,
            sx: {
              '& .MuiInputBase-input': {
                color: 'orange',
                fontWeight: 'bold',
                shrink: true,
              },
            },
          }}
        />
      </Box>
      <Box component="div">
        <TextField
          id="editable2"
          defaultValue="New description"
          variant="outlined"
          multiline="true"
          rows={20}
          value={data.description_db}
          InputProps={{
            readOnly: true,
            sx: {
              '& .MuiInputBase-input': {
                margin: 'top',
                color: 'black',
                whiteSpace: 'pre-wrap',
              },
            },
          }}
        />
      </Box>
          <Box component="div" id="image-upload">
        {data.image_db && (
          <img
            id="preview-image"
            src={data.image_db}
            style={{ display: 'block', maxWidth: '100%' }}
            alt="Preview"
          />
        )}
      </Box>
        </div>
      )}
    </Box>
  );
}

export default App;

