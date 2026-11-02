import React, { useState } from 'react';
import { Alert, Pressable, Text } from 'react-native';
import { router } from 'expo-router';
import { Button, Field, Page } from '../../components/UI';
import { C } from '../../constants/theme';

export default function ForgotPassword() { const [email, setEmail] = useState(''); const submit = () => email.includes('@') ? Alert.alert('Cek email kamu', `Instruksi reset password demo dikirim ke ${email}.`) : Alert.alert('Email tidak valid', 'Masukkan alamat email yang benar.'); return <Page contentStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 28 }}><Text style={{ fontSize: 28, fontWeight: '900', color: C.text }}>Lupa password?</Text><Text style={{ color: C.muted, fontSize: 14, lineHeight: 22, marginTop: 10, marginBottom: 28 }}>Masukkan email yang terdaftar. Kami akan mengirimkan instruksi untuk mengatur ulang password.</Text><Field label="Email" value={email} onChangeText={setEmail} placeholder="nama@email.com" keyboardType="email-address" autoCapitalize="none" /><Button title="Reset Password" onPress={submit} /><Pressable onPress={() => router.replace('/(auth)/login')} style={{ padding: 20, alignItems: 'center' }}><Text style={{ color: C.primary, fontWeight: '800' }}>‹  Kembali ke Login</Text></Pressable></Page>; }
