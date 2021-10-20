import { PDFDownloadLink } from '@react-pdf/renderer';

import React, { useEffect, useState } from 'react';

import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

import QRCode from 'qrcode.react';

import codes from '../public/codes';

const Index = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
    },
    section1: {
      width: '100%',
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    img: {
      marginRight: 10,
      width: 550,
    },
    text: {
      fontSize: 40,
      textAlign: 'center',
      marginBottom: 20,
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
              size={550}
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
            <Page key={i} size='A4' style={styles.page}>
              <View style={styles.section1}>
                <Image
                  alt='qr'
                  style={styles.img}
                  allowDangerousPaths
                  src={{ uri: qrCodeDataUri }}
                />
              </View>
              <View>
                <Text style={styles.text}>{qr['nr miejsca']}</Text>
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
