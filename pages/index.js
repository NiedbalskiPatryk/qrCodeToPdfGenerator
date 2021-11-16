import { PDFDownloadLink } from '@react-pdf/renderer';

import React, { useEffect, useState } from 'react';

import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';

Font.register({
  family: 'Merriweather Sans',
  fonts: [
    { src: '/Merriweather_Sans/static/MerriweatherSans-Regular.ttf' }, // font-style: normal, font-weight: normal
    {
      src: '/Merriweather_Sans/static/MerriweatherSans-ExtraBold.ttf',
      fontWeight: 800,
    },
    {
      src: '/Merriweather_Sans/static/MerriweatherSans-Bold.ttf',
      fontWeight: 700,
    },
  ],
});

import QRCode from 'qrcode.react';

import codes from '../public/codes';
import logo from '../public/google.png';

const Index = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const pxToMm = 0.35196;

  const styles = StyleSheet.create({
    page: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      maxHeight: Math.floor(420 / pxToMm),
      maxWidth: Math.floor(594 / pxToMm),
      marginLeft: Math.floor(28 / pxToMm),
      marginTop: Math.floor(28 / pxToMm),
      marginBottom: Math.floor(28 / pxToMm),
      fontFamily: 'Merriweather Sans',
    },
    section1: {
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'nowrap',
      width: Math.floor(238 / pxToMm),
      paddingRight: Math.floor(36 / pxToMm),
      borderRight: `${Math.floor(4 / pxToMm)} solid #9D9D9C`,
      maxHeight: Math.floor(361 / pxToMm),
      marginRight: Math.floor(32 / pxToMm),
    },
    img: {
      width: Math.floor(198 / pxToMm),
      height: Math.floor(198 / pxToMm),
      marginBottom: Math.floor(16 / pxToMm),
    },
    textSection1: {
      fontSize: Math.floor(12 / pxToMm),
      fontWeight: 700,
      textAlign: 'center',
    },
    section2: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      maxHeight: Math.floor(380 / pxToMm),
      marginRight: Math.floor(28 / pxToMm),
    },
    textWrapper: {
      display: 'flex',
      flexDirection: 'column',
    },
    textWrapper2: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      flexWrap: 'nowrap',
    },
    text1: {
      fontSize: Math.floor(24 / pxToMm),
      fontWeight: 800,
      marginRight: Math.floor(8 / pxToMm),
    },
    text2: {
      fontSize: Math.floor(24 / pxToMm),
      fontWeight: 800,

      opacity: 0.5,
    },
    text3: {
      marginTop: Math.floor(8 / pxToMm),
      fontSize: Math.floor(84 / pxToMm),
      fontWeight: 800,
    },
  });

  const GenerateQr = () => (
    <>
      {codes?.map((qr, i) => {
        return (
          <div key={i} style={{ marginBottom: 10 }}>
            <QRCode
              id={qr.qr}
              value={qr.qr}
              size={Math.floor(198 / pxToMm)}
              bgColor={'#fff'}
              fgColor={'#000'}
            />
          </div>
        );
      })}
    </>
  );

  const GenerateDocs = () => {
    return (
      <Document>
        {codes?.map((qr, i) => {
          const qrCodeCanvas = document.getElementById(qr.qr);
          const qrCodeDataUri = qrCodeCanvas.toDataURL('image/jpg', 0.3);

          return (
            <Page
              key={i}
              size={{ width: Math.floor(594 / pxToMm), height: Math.floor(420 / pxToMm) }}
              style={styles.page}
            >
              <View style={styles.section1}>
                <Image
                  alt='qr'
                  style={styles.img}
                  allowDangerousPaths
                  src={{ uri: qrCodeDataUri }}
                />
                <Text style={styles.textSection1}>Kod do zeskanowania w aplikacji</Text>
                <Text style={styles.textSection1}>budynkowej</Text>
              </View>
              <View style={styles.section2}>
                <View style={styles.textWrapper}>
                  <View style={styles.textWrapper2}>
                    <Text style={styles.text1}>Miejsce</Text>
                    <Text style={styles.text2}>Place</Text>
                  </View>
                  <Text style={styles.text3}>{qr['nr miejsca']}</Text>
                </View>
              </View>
            </Page>
          );
        })}
      </Document>
    );
  };

  return (
    <>
      {isClient && (
        <PDFDownloadLink document={<GenerateDocs />} fileName='qrCodes.pdf'>
          {({ blob, url, loading, error }) =>
            loading ? 'Loading document...' : 'Download pdf'
          }
        </PDFDownloadLink>
      )}
      {GenerateQr()}
    </>
  );
};

export default Index;
