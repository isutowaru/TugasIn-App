import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, EmptyState, Heading, Page } from '../../components/UI';
import TaskCard from '../../components/TaskCard';
import { C } from '../../constants/theme';
import { useTasks } from '../../context/TaskContext';

export default function Home() {
  const { tasks, user } = useTasks();
  const done = tasks.filter((task) => task.status === 'Completed').length;
  const pending = tasks.length - done;
  const percent = tasks.length ? Math.round(done / tasks.length * 100) : 0;
  const upcoming = tasks.filter((task) => task.status !== 'Completed').sort((a, b) => a.deadline.localeCompare(b.deadline)).slice(0, 3);
  const now = new Date();
  const greeting = now.getHours() < 11 ? 'Selamat pagi,' : now.getHours() < 15 ? 'Selamat siang,' : now.getHours() < 19 ? 'Selamat sore,' : 'Selamat malam,';
  const date = now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' });
  const stats = [
    { label: 'Total tugas', value: tasks.length, icon: 'layers-outline', color: C.primary },
    { label: 'Selesai', value: done, icon: 'checkmark-circle-outline', color: C.success },
    { label: 'Belum selesai', value: pending, icon: 'time-outline', color: C.warning },
  ];

  return (
    <Page>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 23 }}>
        <View style={{ flex: 1, paddingRight: 12 }}>
          <Text style={{ color: C.muted, fontSize: 13, fontWeight: '600' }}>{greeting}</Text>
          <Text style={{ color: C.text, fontSize: 25, fontWeight: '900', marginTop: 4 }}>{user.name.split(' ')[0]}</Text>
          <Text style={{ color: C.muted, fontSize: 12, marginTop: 6 }}>{date}</Text>
        </View>
        <View style={{ width: 48, height: 48, borderRadius: 17, backgroundColor: C.white, borderWidth: 1, borderColor: C.border, alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name="notifications-outline" size={21} color={C.primary} />
        </View>
      </View>

      <Card style={{ backgroundColor: C.primary, borderColor: C.primary, padding: 20, overflow: 'hidden' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View>
            <Text style={{ color: '#E4E8FF', fontSize: 13, fontWeight: '600' }}>Progress tugas</Text>
            <Text style={{ color: C.white, fontSize: 31, fontWeight: '900', marginTop: 5 }}>{percent}<Text style={{ fontSize: 17 }}>%</Text><Text style={{ fontSize: 13, fontWeight: '500' }}>  selesai</Text></Text>
          </View>
          <View style={{ width: 54, height: 54, borderRadius: 19, backgroundColor: 'rgba(255,255,255,0.16)', alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="trending-up" size={26} color={C.white} />
          </View>
        </View>
        <View style={{ height: 8, backgroundColor: '#8294FF', borderRadius: 9, marginTop: 17, overflow: 'hidden' }}>
          <View style={{ height: '100%', width: `${percent}%`, backgroundColor: C.white, borderRadius: 9 }} />
        </View>
        <Text style={{ color: '#E4E8FF', fontSize: 12, marginTop: 9 }}>{done} dari {tasks.length} tugas sudah diselesaikan</Text>
      </Card>

      <View style={{ flexDirection: 'row', gap: 9, marginTop: 13, marginBottom: 27 }}>
        {stats.map((stat) => (
          <Card key={stat.label} style={{ flex: 1, padding: 12, marginBottom: 0 }}>
            <View style={{ width: 30, height: 30, borderRadius: 10, backgroundColor: `${stat.color}18`, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
              <Ionicons name={stat.icon} size={16} color={stat.color} />
            </View>
            <Text style={{ fontSize: 20, fontWeight: '900', color: C.text }}>{stat.value}</Text>
            <Text style={{ fontSize: 10, color: C.muted, marginTop: 4 }}>{stat.label}</Text>
          </Card>
        ))}
      </View>

      <Heading title="Tugas mendatang" subtitle="Tenggat terdekat yang perlu diperhatikan" right={<Pressable onPress={() => router.push('/(tabs)/tasks')}><Text style={{ color: C.primary, fontSize: 12, fontWeight: '800' }}>Lihat semua</Text></Pressable>} />
      {upcoming.map((task) => <TaskCard key={task.id} task={task} onPress={() => router.push(`/task/${task.id}`)} />)}
      {upcoming.length === 0 ? <EmptyState icon={tasks.length ? 'checkmark-done-outline' : 'clipboard-outline'} title={tasks.length ? 'Semua tugas selesai!' : 'Belum ada tugas'} description={tasks.length ? 'Keren, kamu sudah menyelesaikan semua tugas. Tambahkan tugas baru saat ada hal penting.' : 'Tambahkan tugas pertamamu dan mulai atur aktivitas dengan lebih terarah.'} /> : null}
      <Button title="Tambah tugas baru" icon="add" onPress={() => router.push('/task/add')} style={{ marginTop: 8 }} />
    </Page>
  );
}
