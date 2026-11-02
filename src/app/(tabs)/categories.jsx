import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Card, Heading, Page } from '../../components/UI';
import { categories, C } from '../../constants/theme';
import { useTasks } from '../../context/TaskContext';

const info = [{ icon: 'book-outline', tint: '#536DFE' }, { icon: 'heart-outline', tint: '#E45B67' }, { icon: 'people-outline', tint: '#A05BDB' }, { icon: 'briefcase-outline', tint: '#22A06B' }];
export default function Categories() { const { tasks } = useTasks(); return <Page><Heading title="Kategori" subtitle="Atur tugas berdasarkan aktivitas" />{categories.map((name, i) => { const count = tasks.filter((t) => t.category === name).length; return <Pressable key={name} onPress={() => router.push({ pathname: '/(tabs)/tasks', params: { category: name } })}><Card style={{ flexDirection: 'row', alignItems: 'center', padding: 18 }}><View style={{ width: 50, height: 50, borderRadius: 16, backgroundColor: `${info[i].tint}18`, alignItems: 'center', justifyContent: 'center' }}><Ionicons name={info[i].icon} size={23} color={info[i].tint} /></View><View style={{ flex: 1, marginLeft: 14 }}><Text style={{ color: C.text, fontSize: 15, fontWeight: '800' }}>{name}</Text><Text style={{ color: C.muted, fontSize: 12, marginTop: 5 }}>{count} tugas</Text></View><Ionicons name="chevron-forward" size={18} color={C.muted} /></Card></Pressable>; })}</Page>; }
