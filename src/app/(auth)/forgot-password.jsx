import React, { useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Field, Page } from '../../components/UI';
import { C } from '../../constants/theme';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const submit = () => email.includes('@') ? Alert.alert('Cek email kamu', `Instruksi reset password demo dikirim ke ${email}.`) : Alert.alert('Email tidak valid', 'Masukkan alamat email yang benar.');
  return (
    <Page contentStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24 }}>
      <Card style={{ padding: 22, marginBottom: 0 }}>
        <View style={{ width: 50, height: 50, borderRadius: 16, backgroundColor: C.pale, alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
          <Ionicons name="lock-open-outline" size={24} color={C.primary} />
        </View>
        <Text style={{ fontSize: 26, fontWeight: '900', color: C.text }}>Lupa password?</Text>
        <Text style={{ color: C.muted, fontSize: 14, lineHeight: 22, marginTop: 9, marginBottom: 22 }}>Masukkan email yang terdaftar untuk menerima instruksi mengatur ulang password.</Text>
        <Field label="Email" value={email} onChangeText={setEmail} placeholder="nama@email.com" keyboardType="email-address" autoCapitalize="none" autoCorrect={false} />
        <Button title="Kirim instruksi" icon="paper-plane-outline" onPress={submit} />
      </Card>
      <Pressable onPress={() => router.replace('/(auth)/login')} style={{ padding: 20, alignItems: 'center' }}>
        <Text style={{ color: C.primary, fontWeight: '800' }}>‹  Kembali ke login</Text>
      </Pressable>
    </Page>
  );
}
