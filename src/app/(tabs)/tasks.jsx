import React, { useMemo, useState } from 'react';
import { ScrollView, Text, TextInput, View, Pressable } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Chip, EmptyState, Heading, Page } from '../../components/UI';
import TaskCard from '../../components/TaskCard';
import { C, categories } from '../../constants/theme';
import { useTasks } from '../../context/TaskContext';

const filters = ['All', 'To Do', 'In Progress', 'Completed'];
export default function Tasks() {
  const { tasks } = useTasks();
  const params = useLocalSearchParams();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [category, setCategory] = useState(params.category || '');
  const list = useMemo(() => tasks.filter((task) =>
    (filter === 'All' || task.status === filter) &&
    (!category || task.category === category) &&
    task.title.toLowerCase().includes(search.toLowerCase())
  ), [tasks, filter, category, search]);

  return (
    <Page>
      <Heading
        title="Daftar Tugas"
        subtitle={`${list.length} tugas untuk kamu`}
        right={<Pressable onPress={() => router.push('/task/add')} style={{ backgroundColor: C.primary, width: 44, height: 44, borderRadius: 15, alignItems: 'center', justifyContent: 'center' }}><Ionicons name="add" size={25} color={C.white} /></Pressable>}
      />
      <View style={{ height: 52, flexDirection: 'row', alignItems: 'center', backgroundColor: C.white, borderRadius: 15, paddingHorizontal: 14, borderWidth: 1, borderColor: C.border, marginBottom: 18 }}>
        <Ionicons name="search-outline" size={19} color={C.muted} />
        <TextInput value={search} onChangeText={setSearch} placeholder="Cari tugas..." placeholderTextColor={C.muted} style={{ flex: 1, paddingHorizontal: 10, color: C.text, fontSize: 14 }} returnKeyType="search" />
        {search ? <Pressable onPress={() => setSearch('')} hitSlop={8}><Ionicons name="close-circle" size={18} color={C.muted} /></Pressable> : null}
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexGrow: 0, marginBottom: 14 }} contentContainerStyle={{ gap: 8, paddingRight: 4 }}>
        {filters.map((value) => <Chip key={value} label={value === 'All' ? 'Semua status' : value} active={filter === value} onPress={() => setFilter(value)} />)}
      </ScrollView>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 19 }}>
        <Chip label="Semua kategori" active={!category} onPress={() => setCategory('')} />
        {categories.map((value) => <Chip key={value} label={value} active={category === value} onPress={() => setCategory(category === value ? '' : value)} />)}
      </View>
      {list.map((task) => <TaskCard key={task.id} task={task} onPress={() => router.push(`/task/${task.id}`)} />)}
      {list.length === 0 ? (
        <EmptyState
          icon={tasks.length ? 'search-outline' : 'clipboard-outline'}
          title={tasks.length ? 'Tugas tidak ditemukan' : 'Belum ada tugas'}
          description={tasks.length ? 'Coba ubah kata kunci atau filter yang dipilih.' : 'Catat tugas pertamamu agar semua rencana tersusun rapi.'}
          action={!tasks.length ? <Pressable onPress={() => router.push('/task/add')} style={{ marginTop: 16, flexDirection: 'row', alignItems: 'center', gap: 6 }}><Ionicons name="add-circle" size={18} color={C.primary} /><Text style={{ color: C.primary, fontWeight: '800', fontSize: 13 }}>Tambah tugas</Text></Pressable> : null}
        />
      ) : null}
    </Page>
  );
}
