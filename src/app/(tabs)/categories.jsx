import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Card, EmptyState, Heading, Page } from '../../components/UI';
import { categories, C } from '../../constants/theme';
import { useTasks } from '../../context/TaskContext';

const info = [
  { icon: 'book-outline', tint: C.primary },
  { icon: 'heart-outline', tint: C.danger },
  { icon: 'people-outline', tint: C.purple },
  { icon: 'briefcase-outline', tint: C.success },
];
export default function Categories() {
  const { tasks } = useTasks();
  return (
    <Page>
      <Heading title="Kategori" subtitle="Kelompokkan tugas berdasarkan aktivitas" />
      {categories.map((name, index) => {
        const categoryTasks = tasks.filter((task) => task.category === name);
        const count = categoryTasks.length;
        const done = categoryTasks.filter((task) => task.status === 'Completed').length;
        return (
          <Pressable key={name} onPress={() => router.push({ pathname: '/(tabs)/tasks', params: { category: name } })} style={({ pressed }) => pressed && { opacity: .78 }}>
            <Card style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
              <View style={{ width: 50, height: 50, borderRadius: 17, backgroundColor: `${info[index].tint}18`, alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name={info[index].icon} size={23} color={info[index].tint} />
              </View>
              <View style={{ flex: 1, marginLeft: 14 }}>
                <Text style={{ color: C.text, fontSize: 15, fontWeight: '800' }}>{name}</Text>
                <Text style={{ color: C.muted, fontSize: 12, marginTop: 5 }}>{count} tugas · {done} selesai</Text>
                <View style={{ height: 4, borderRadius: 4, backgroundColor: C.surface, marginTop: 9, overflow: 'hidden' }}>
                  <View style={{ height: '100%', width: `${count ? done / count * 100 : 0}%`, backgroundColor: info[index].tint, borderRadius: 4 }} />
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color={C.muted} style={{ marginLeft: 11 }} />
            </Card>
          </Pressable>
        );
      })}
      {tasks.length === 0 ? <EmptyState icon="folder-open-outline" title="Kategori siap digunakan" description="Tugas yang kamu buat akan otomatis dikelompokkan di sini." /> : null}
    </Page>
  );
}
