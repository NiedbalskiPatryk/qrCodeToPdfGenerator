import { PDFDownloadLink } from '@react-pdf/renderer';

import React, { useEffect, useState } from 'react';

import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

import QRCode from 'qrcode.react';

import codes from '../public/codes';
import logo from '../public/google.png';

const Index = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const styles = StyleSheet.create({
    page: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      maxWidth: 1890,
    },
    section1: {
      display: 'flex',
      justifyContent: 'center',
      marginLeft: 106,
    },
    logo: {
      width: 472,
      height: 151,
    },
    section2: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      marginRight: 106,
    },
    textWrapper: {
      display: 'flex',
      flexDirection: 'column',
      width: 200,
      justifyContent: 'flex-end',
      textAlign: 'left',
      marginRight: 60,
    },
    img: {
      width: 227,
      height: 227,
    },
    text1: {
      fontSize: 45,
      fontWeight: 400,
      opacity: 0.5,
      marginBottom: 15,
    },
    text2: {
      fontSize: 76,
      fontWeight: 500,
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
              size={227}
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
            <Page key={i} size={{ width: 1890, height: 374 }} style={styles.page}>
              <View style={styles.section1}>
                <Image
                  alt='googleLogo'
                  style={styles.logo}
                  src={{ uri: 'http://localhost:3000/google.png' }}
                />
              </View>
              <View style={styles.section2}>
                {/* <Text style={styles.text}>{qr['nr miejsca']}</Text> */}
                <View style={styles.textWrapper}>
                  <Text style={styles.text1}>Place</Text>
                  <Text style={styles.text2}>{qr['nr miejsca']}</Text>
                </View>
                <Image
                  alt='qr'
                  style={styles.img}
                  allowDangerousPaths
                  src={{ uri: qrCodeDataUri }}
                />
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
