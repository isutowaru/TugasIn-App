import React, { useMemo, useState } from 'react';
import { Text, View, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, EmptyState, Heading, Page } from '../../components/UI';
import TaskCard from '../../components/TaskCard';
import { C } from '../../constants/theme';
import { useTasks } from '../../context/TaskContext';

const keyDate = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
export default function Calendar() {
  const [month, setMonth] = useState(() => { const date = new Date(); return new Date(date.getFullYear(), date.getMonth(), 1); });
  const [selected, setSelected] = useState(keyDate(new Date()));
  const { tasks } = useTasks();
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const count = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const offset = (first.getDay() + 6) % 7;
  const days = Array(offset).fill(null).concat(Array.from({ length: count }, (_, index) => index + 1));
  const selectedTasks = useMemo(() => tasks.filter((task) => task.deadline === selected), [tasks, selected]);
  const taskDays = new Set(tasks.map((task) => task.deadline));
  const shift = (amount) => setMonth(new Date(month.getFullYear(), month.getMonth() + amount, 1));
  const selectedLabel = new Date(`${selected}T12:00:00`).toLocaleDateString('id-ID', { day: 'numeric', month: 'long' });

  return (
    <Page>
      <Heading title="Kalender" subtitle="Lihat jadwal dan tenggat tugasmu" />
      <Card style={{ padding: 17 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <Pressable onPress={() => shift(-1)} hitSlop={10} style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: C.surface, alignItems: 'center', justifyContent: 'center' }}><Ionicons name="chevron-back" size={19} color={C.text} /></Pressable>
          <Text style={{ color: C.text, fontWeight: '800', fontSize: 16 }}>{month.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}</Text>
          <Pressable onPress={() => shift(1)} hitSlop={10} style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: C.surface, alignItems: 'center', justifyContent: 'center' }}><Ionicons name="chevron-forward" size={19} color={C.text} /></Pressable>
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 8 }}>
          {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map((day) => <Text key={day} style={{ width: `${100 / 7}%`, textAlign: 'center', color: C.muted, fontSize: 10, fontWeight: '800' }}>{day}</Text>)}
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {days.map((day, index) => {
            if (!day) return <View key={`blank-${index}`} style={{ width: `${100 / 7}%`, height: 44 }} />;
            const dateKey = keyDate(new Date(month.getFullYear(), month.getMonth(), day));
            const active = dateKey === selected;
            const hasTasks = taskDays.has(dateKey);
            return (
              <Pressable key={day} onPress={() => setSelected(dateKey)} style={{ width: `${100 / 7}%`, height: 44, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ width: 34, height: 34, borderRadius: 13, alignItems: 'center', justifyContent: 'center', backgroundColor: active ? C.primary : 'transparent' }}>
                  <Text style={{ color: active ? C.white : C.text, fontWeight: active ? '800' : '500', fontSize: 13 }}>{day}</Text>
                </View>
                {hasTasks ? <View style={{ position: 'absolute', bottom: 1, width: 4, height: 4, borderRadius: 2, backgroundColor: active ? C.white : C.primary }} /> : null}
              </Pressable>
            );
          })}
        </View>
      </Card>
      <View style={{ marginTop: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <Text style={{ color: C.text, fontSize: 17, fontWeight: '800' }}>Tugas · {selectedLabel}</Text>
          <Text style={{ color: C.muted, fontSize: 12 }}>{selectedTasks.length} tugas</Text>
        </View>
        {selectedTasks.map((task) => <TaskCard key={task.id} task={task} onPress={() => router.push(`/task/${task.id}`)} compact />)}
        {selectedTasks.length === 0 ? <EmptyState icon="sunny-outline" title="Hari yang lebih lega" description="Belum ada tugas terjadwal pada tanggal ini." action={<Button title="Tambah tugas" icon="add" onPress={() => router.push('/task/add')} outline style={{ marginTop: 15 }} />} /> : null}
      </View>
    </Page>
  );
}
