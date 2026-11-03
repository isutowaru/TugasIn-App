import React from 'react';
import { Alert, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Heading, Page } from '../../components/UI';
import { StatusBadge } from '../../components/TaskCard';
import { C } from '../../constants/theme';
import { useTasks } from '../../context/TaskContext';

export default function TaskDetail() {
  const { id } = useLocalSearchParams();
  const { tasks, deleteTask } = useTasks();
  const task = tasks.find((item) => item.id === id);
  if (!task) return <Page><Heading title="Tugas tidak ditemukan" /><Button title="Kembali" icon="arrow-back" onPress={() => router.back()} /></Page>;
  const remove = () => Alert.alert('Hapus tugas?', `“${task.title}” akan dihapus.`, [
    { text: 'Batal', style: 'cancel' },
    { text: 'Hapus', style: 'destructive', onPress: () => { deleteTask(task.id); router.replace('/(tabs)/tasks'); } },
  ]);
  const item = (icon, label, value, last = false) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: last ? 0 : 1, borderColor: C.border }}>
      <View style={{ width: 34, height: 34, borderRadius: 11, backgroundColor: C.pale, alignItems: 'center', justifyContent: 'center' }}>
        <Ionicons name={icon} size={17} color={C.primary} />
      </View>
      <Text style={{ color: C.muted, marginLeft: 11, flex: 1, fontSize: 13 }}>{label}</Text>
      <Text style={{ color: C.text, fontWeight: '700', fontSize: 13 }}>{value}</Text>
    </View>
  );
  return (
    <Page>
      <Heading title="Detail Tugas" subtitle="Informasi lengkap tugas" />
      <Card style={{ padding: 20 }}>
        <Text style={{ color: C.text, fontSize: 23, fontWeight: '900', lineHeight: 31 }}>{task.title}</Text>
        <Text style={{ color: C.muted, fontSize: 14, lineHeight: 22, marginTop: 12 }}>{task.description || 'Belum ada deskripsi untuk tugas ini.'}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 17 }}>
          <StatusBadge value={task.status} />
          <StatusBadge value={task.priority} priority />
        </View>
      </Card>
      <Card style={{ paddingHorizontal: 16 }}>
        {item('calendar-outline', 'Deadline', task.deadline)}
        {item('folder-outline', 'Kategori', task.category)}
        {item('flag-outline', 'Prioritas', task.priority)}
        {item('checkmark-circle-outline', 'Status', task.status, true)}
      </Card>
      <Button title="Edit tugas" icon="create-outline" onPress={() => router.push(`/task/edit/${task.id}`)} style={{ marginBottom: 11 }} />
      <Button title="Hapus tugas" icon="trash-outline" outline danger onPress={remove} />
    </Page>
  );
}
