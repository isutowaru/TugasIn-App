import React, { useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Button, Card, Field, Page } from '../../components/UI';
import { C } from '../../constants/theme';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const submit = () => {
    if (!name.trim() || !email.includes('@') || password.length < 4 || password !== confirm) return Alert.alert('Data belum valid', 'Lengkapi nama, email valid, password min. 4 karakter, dan konfirmasi password.');
    Alert.alert('Berhasil!', 'Akun demo berhasil dibuat. Silakan login.', [{ text: 'Ke Login', onPress: () => router.replace('/(auth)/login') }]);
  };
  return (
    <Page contentStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24 }}>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ color: C.text, fontSize: 27, fontWeight: '900' }}>Buat akun</Text>
        <Text style={{ color: C.muted, fontSize: 13, lineHeight: 20, marginTop: 7 }}>Mulai atur tugasmu dengan lebih mudah.</Text>
      </View>
      <Card style={{ padding: 20, marginBottom: 0 }}>
        <Field label="Nama lengkap" value={name} onChangeText={setName} placeholder="Nama kamu" autoCapitalize="words" />
        <Field label="Email" value={email} onChangeText={setEmail} placeholder="nama@email.com" keyboardType="email-address" autoCapitalize="none" autoCorrect={false} />
        <Field label="Password" value={password} onChangeText={setPassword} placeholder="Minimal 4 karakter" secureTextEntry />
        <Field label="Konfirmasi password" value={confirm} onChangeText={setConfirm} placeholder="Ulangi password" secureTextEntry />
        <Button title="Buat akun" icon="person-add-outline" onPress={submit} />
      </Card>
      <Pressable onPress={() => router.replace('/(auth)/login')} style={{ alignItems: 'center', padding: 20 }}>
        <Text style={{ color: C.muted }}>Sudah punya akun? <Text style={{ color: C.primary, fontWeight: '800' }}>Masuk</Text></Text>
      </Pressable>
    </Page>
  );
}
