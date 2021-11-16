import { PDFDownloadLink } from '@react-pdf/renderer';

import React, { useEffect, useState } from 'react';

import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

import QRCode from 'qrcode.react';

import codes from '../public/googleCodes';
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
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      maxWidth: Math.floor(500 / pxToMm),
    },
    section1: {
      display: 'flex',
      justifyContent: 'center',
      marginLeft: Math.floor(28 / pxToMm),
    },
    logo: {
      width: Math.floor(125 / pxToMm),
      height: Math.floor(40 / pxToMm),
    },
    section2: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      marginRight: Math.floor(28 / pxToMm),
    },
    textWrapper: {
      display: 'flex',
      flexDirection: 'column',
      width: Math.floor(53 / pxToMm),
      justifyContent: 'flex-end',
      textAlign: 'left',
      marginRight: Math.floor(16 / pxToMm),
    },
    img: {
      width: Math.floor(60 / pxToMm),
      height: Math.floor(60 / pxToMm),
    },
    text1: {
      fontSize: Math.floor(12 / pxToMm),
      fontWeight: 400,
      opacity: 0.5,
      marginBottom: Math.floor(4 / pxToMm),
    },
    text2: {
      fontSize: Math.floor(20 / pxToMm),
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
              size={Math.floor(60 / pxToMm)}
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
              size={{ width: Math.floor(500 / pxToMm), height: Math.floor(99 / pxToMm) }}
              style={styles.page}
            >
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
