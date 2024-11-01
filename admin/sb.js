import { Text, View } from 'react-native';
import { storage } from './firebase.config';

export default function TestUpload() {
  const exteriorData = {
    images: [
      'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540quizpaw%252Fclient-admin/ImagePicker/802a52d2-6d6f-447e-b046-8decc257ca16.jpeg',
      'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540quizpaw%252Fclient-admin/ImagePicker/74fd4819-c5e4-4890-805c-10c8a4aabf9c.jpeg',
    ],
  };
  const uploadImages = async () => {
    const uploadedImageUrls = [];
    for (const uri of exteriorData.images) {
      const response = await fetch(uri);
      const blob = await response.blob();

      const ref = storage.ref().child(`Images/${Date.now()}.jpg`);
      await ref.put(blob);

      const downloadUrl = await ref.getDownloadURL();
      uploadedImageUrls.push(downloadUrl);
    }
    return uploadedImageUrls;
  };

  const submitForm = async () => {
    const uploadedImageUrls = await uploadImages();
    // Menggunakan link download URL yang diunggah ke Firebase Storage
    console.log(uploadedImageUrls);

    // Lakukan pembaruan atau operasi lainnya dengan link download URL
  };

  return (
    <View>
      <Text>Test</Text>
    </View>
  );
}

const data = {
  components: {
    aki: { status: '', title: 'Aki' },
    belts: { status: '', title: 'Belt Mesin' },
    dinamo: { status: '', title: 'Dinamo' },
    engine: { status: '', title: 'Mesin' },
    engineIdling: { status: '', title: 'Mesin Idle' },
    engineStarling: { status: '', title: 'Mesin Starling' },
    kipasRadiator: { status: '', title: 'Kipas Radiator' },
    mesinAkselerasi: { status: '', title: 'Mesin Akselereasi' },
    moutingTransmisi: { status: '', title: 'Mounting Transmisi' },
    photo: ['https://firebasestorage.googleapis.com/v0/b/vehicheck-id.appspot.com/o/Images%2F1685999993946.jpg?alt=media&token=8f84b92d-fbfa-436a-b265-175ac31993a1'],
    radiator: { status: '', title: 'Radiator' },
    suaraMesin: { status: '', title: 'Suara Mesin' },
    tangkiRadiator: { status: '', title: 'Tangki Radiator' },
    tutupRadiator: { status: '', title: 'Tutup Radiator' },
  },
  exterior: {
    bemperBelakang: { status: '', title: 'Bemper Belakang' },
    bemperDepan: { status: '', title: 'Bemper Depan' },
    kapBagasi: { status: '', title: 'Kap Bagasi' },
    kapMesin: { status: '', title: 'Kap Mesin' },
    photo: ['https://firebasestorage.googleapis.com/v0/b/vehicheck-id.appspot.com/o/Images%2F1685999993084.jpg?alt=media&token=8557da6c-e491-4c10-b7d6-3f4dda4f05ff'],
    pintuBelakang: { status: '', title: 'Pintu Belakang' },
    pintuDepan: { status: '', title: 'Pintu Depan' },
  },
  interior: {
    ac: { status: '', title: 'Air Conditioner' },
    jokDriver: { status: '', title: 'Jok Driver' },
    kameraMundur: { status: '', title: 'Kamera Mundur' },
    laciDashboard: { status: '', title: 'Laci Dashboard' },
    pemutarAudio: { status: '', title: 'Pemutar Audio' },
    photo: ['https://firebasestorage.googleapis.com/v0/b/vehicheck-id.appspot.com/o/Images%2F1685999993648.jpg?alt=media&token=a5969d46-8975-4034-b204-2668456978da'],
    speaker: { status: '', title: 'Jok Driver' },
  },
  tesJalan: {
    bunyiTransisi: { status: '', title: 'Bunyi Transimis' },
    perpindahanTransmisi: { status: '', title: 'Perpindahan Transmisi' },
    photo: ['https://firebasestorage.googleapis.com/v0/b/vehicheck-id.appspot.com/o/Images%2F1685999994128.jpg?alt=media&token=348ea620-98b3-4945-b91a-63c433770159'],
    rodaPenggerak: { status: '', title: 'Roda Penggerak' },
    sistemKopling: { status: '', title: 'Sistem Kopling' },
    sistemTuasRem: { status: '', title: 'Sistem Tuas Rem' },
  },
};
